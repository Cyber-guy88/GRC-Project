<?php
session_start();
header('Content-Type: application/json');

// Database file path
$dbFile = __DIR__ . '/database.sqlite';

// Set permissions for the database file
exec('icacls ' . escapeshellarg($dbFile) . ' /grant Everyone:(F)');

try {
    $pdo = new PDO("sqlite:$dbFile");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Create users table if it doesn't exist
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT,
        google_id TEXT,
        profile_picture TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");
} catch (PDOException $e) {
    error_log('Database initialization error: ' . $e->getMessage());
    die(json_encode(['success' => false, 'message' => 'Database initialization failed']));
}

// Determine the action to take
$action = isset($_POST['action']) ? $_POST['action'] : null;

switch ($action) {
    case 'register':
        registerUser($pdo);
        break;
    case 'login':
        loginUser($pdo);
        break;
    case 'check_email':
        checkEmail($pdo);
        break;
    case 'reset_password':
        resetPassword($pdo);
        break;
    case 'google_signup':
        try {
            // Enable error reporting for debugging
            error_reporting(E_ALL);
            ini_set('display_errors', 1);
            
            if (!isset($_POST['credential']) || !isset($_POST['email']) || !isset($_POST['fullName'])) {
                echo json_encode([
                    'success' => false, 
                    'message' => 'Missing required Google sign-up data',
                    'received' => $_POST
                ]);
                exit;
            }
            
            $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
            $fullName = htmlspecialchars($_POST['fullName']);
            $picture = isset($_POST['picture']) ? $_POST['picture'] : null;
            
            // Check if user already exists
            $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->execute([$email]);
            $existingUser = $stmt->fetch();
            
            if ($existingUser) {
                echo json_encode([
                    'success' => false,
                    'message' => 'Email already registered. Please login instead.'
                ]);
                exit;
            }
            
            // Create new user
            $stmt = $pdo->prepare("INSERT INTO users (username, email, google_id, profile_picture) VALUES (?, ?, ?, ?)");
            $result = $stmt->execute([$fullName, $email, $_POST['credential'], $picture]);
            
            if ($result) {
                echo json_encode([
                    'success' => true,
                    'message' => 'Google account registered successfully',
                    'email' => $email,
                    'fullName' => $fullName
                ]);
            } else {
                echo json_encode([
                    'success' => false,
                    'message' => 'Database error during registration',
                    'error' => $pdo->errorInfo()
                ]);
            }
        } catch (PDOException $e) {
            echo json_encode([
                'success' => false,
                'message' => 'Database error: ' . $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        } catch (Exception $e) {
            echo json_encode([
                'success' => false,
                'message' => 'General error: ' . $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }
        break;
    default:
        echo json_encode(['success' => false, 'message' => 'Invalid action']);
        break;
}

/**
 * Register a new user
 */
function registerUser($pdo) {
    if (empty($_POST['fullName']) || empty($_POST['email']) || empty($_POST['password'])) {
        echo json_encode(['success' => false, 'message' => 'All fields are required']);
        return;
    }
    
    $fullName = trim($_POST['fullName']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Invalid email format']);
        return;
    }
    
    // Check if user already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetchColumn()) {
        echo json_encode(['success' => false, 'message' => 'Email already registered']);
        return;
    }
    
    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
    try {
        $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
        $stmt->execute([$fullName, $email, $hashedPassword]);
        
        if ($stmt->rowCount() > 0) {
            echo json_encode([
                'success' => true, 
                'message' => 'Registration successful',
                'redirect' => 'login.html',
                'userId' => $pdo->lastInsertId(),
                'fullName' => $fullName,
                'email' => $email
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to create user record']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Registration failed: ' . $e->getMessage()]);
    }
}

/**
 * Login a user
 */
function loginUser($pdo) {
    if (empty($_POST['email']) || empty($_POST['password'])) {
        echo json_encode(['success' => false, 'message' => 'Email and password are required']);
        return;
    }
    
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    $remember = isset($_POST['remember']) && $_POST['remember'] === '1';
    
    // Get user from database
    $stmt = $pdo->prepare("SELECT id, username, email, password FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    
    // Check if user exists and password matches
    if ($user && (password_verify($password, $user['password']) || $password === $user['password'])) {
        // If password is not hashed, hash it for future use
        if ($password === $user['password']) {
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $updateStmt = $pdo->prepare("UPDATE users SET password = ? WHERE id = ?");
            $updateStmt->execute([$hashedPassword, $user['id']]);
        }
        
        // Set session variables
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['email'] = $user['email'];
        
        echo json_encode([
            'success' => true, 
            'message' => 'Login successful',
            'userId' => $user['id'],
            'fullName' => $user['username'],
            'email' => $user['email'],
            'redirect' => 'home.html'
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
    }
}

/**
 * Check if an email exists
 */
function checkEmail($pdo) {
    if (empty($_POST['email'])) {
        echo json_encode(['success' => false, 'message' => 'Email is required']);
        return;
    }
    
    $email = trim($_POST['email']);
    
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $userExists = (bool) $stmt->fetchColumn();
    
    echo json_encode([
        'success' => true,
        'exists' => $userExists,
        'message' => $userExists ? 'Email found' : 'Email not found'
    ]);
}

/**
 * Reset a user's password
 */
function resetPassword($pdo) {
    if (empty($_POST['email']) || empty($_POST['password'])) {
        echo json_encode(['success' => false, 'message' => 'Email and password are required']);
        return;
    }
    
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    
    // Check if the user exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $userId = $stmt->fetchColumn();
    
    if (!$userId) {
        echo json_encode(['success' => false, 'message' => 'User not found']);
        return;
    }
    
    // Hash the new password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
    try {
        $stmt = $pdo->prepare("UPDATE users SET password = ? WHERE id = ?");
        $result = $stmt->execute([$hashedPassword, $userId]);
        
        if ($result && $stmt->rowCount() > 0) {
            if (isset($_SESSION['user_id']) && $_SESSION['user_id'] == $userId) {
                $_SESSION['password_reset'] = true;
            }
            
            echo json_encode([
                'success' => true, 
                'message' => 'Password updated successfully',
                'userId' => $userId
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'No changes were made to the password']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Failed to update password: ' . $e->getMessage()]);
    }
}
?>