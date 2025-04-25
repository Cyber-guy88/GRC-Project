<?php
// Enable error reporting for debugging
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

// Start session
session_start();

// Set content type to JSON
header('Content-Type: application/json');

// Database file path
$dbFile = __DIR__ . '/database.sqlite';

try {
    // Create/connect to SQLite database
    $pdo = new PDO("sqlite:$dbFile", null, null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
    
    // Create users table if it doesn't exist
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        email TEXT UNIQUE,
        password TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        google_id TEXT,
        picture_url TEXT
    )");
    
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
        case 'google_login':
            handleGoogleLogin($pdo);
            break;
        case 'google_signup':
            handleGoogleSignup($pdo);
            break;
        default:
            echo json_encode(['success' => false, 'message' => 'Invalid action']);
            break;
    }
} catch (PDOException $e) {
    // Output error as JSON
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}

/**
 * Register a new user
 */
function registerUser($pdo) {
    // Validate required fields
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
    
    // Hash password for security
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
    // Insert new user
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
    // Validate required fields
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
            'userData' => [
                'id' => $user['id'],
                'email' => $user['email'],
                'fullName' => $user['username'],
                'password' => $password // Include plain password for local storage compatibility
            ]
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
    }
}

/**
 * Handle Google Sign-In
 */
function handleGoogleLogin($pdo) {
    // Validate required fields
    if (empty($_POST['email']) || empty($_POST['googleId'])) {
        echo json_encode(['success' => false, 'message' => 'Email and Google ID are required']);
        return;
    }
    
    $email = trim($_POST['email']);
    $fullName = trim($_POST['fullName'] ?? '');
    $googleId = $_POST['googleId'];
    $pictureUrl = $_POST['picture'] ?? '';
    
    // Log the received data for debugging (remove in production)
    error_log("Google Login Data: " . json_encode($_POST));
    
    try {
        // Begin transaction to prevent database locks from concurrent requests
        $pdo->beginTransaction();
        
        // Check if user exists by email
        $stmt = $pdo->prepare("SELECT id, username, email, google_id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        
        if ($user) {
            // User exists - update Google info if needed
            $needsUpdate = ($user['google_id'] !== $googleId || $user['username'] !== $fullName);
            
            if ($needsUpdate) {
                $updateStmt = $pdo->prepare("UPDATE users SET google_id = ?, picture_url = ?, username = ? WHERE id = ?");
                $updateStmt->execute([$googleId, $pictureUrl, $fullName, $user['id']]);
                error_log("Updated existing user with Google data: User ID " . $user['id']);
            }
            
            // Commit transaction
            $pdo->commit();
            
            // Set session variables
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $fullName ?: $user['username'];
            $_SESSION['email'] = $email;
            $_SESSION['user_picture'] = $pictureUrl;
            $_SESSION['is_google_user'] = true;
            
            echo json_encode([
                'success' => true,
                'message' => 'Google login successful',
                'userId' => $user['id'],
                'fullName' => $fullName ?: $user['username'],
                'email' => $email,
                'picture' => $pictureUrl,
                'redirect' => 'home.html' // Add redirect URL for consistency
            ]);
        } else {
            // User doesn't exist - create a new one with hashed password
            // Generate a secure random password that the user won't need (since using Google auth)
            $randomPassword = bin2hex(random_bytes(16)); // 32 character random string
            $hashedPassword = password_hash($randomPassword, PASSWORD_DEFAULT);
            
            $stmt = $pdo->prepare("INSERT INTO users (username, email, password, google_id, picture_url) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([$fullName, $email, $hashedPassword, $googleId, $pictureUrl]);
            
            // Get new user ID
            $userId = $pdo->lastInsertId();
            
            // Commit transaction
            $pdo->commit();
            
            if ($userId) {
                error_log("Created new user from Google login: User ID " . $userId);
                
                // Set session variables
                $_SESSION['user_id'] = $userId;
                $_SESSION['username'] = $fullName;
                $_SESSION['email'] = $email;
                $_SESSION['user_picture'] = $pictureUrl;
                $_SESSION['is_google_user'] = true;
                
                echo json_encode([
                    'success' => true,
                    'message' => 'Google login successful, new account created',
                    'userId' => $userId,
                    'fullName' => $fullName,
                    'email' => $email,
                    'picture' => $pictureUrl,
                    'redirect' => 'home.html' // Add redirect URL for consistency
                ]);
            } else {
                error_log("Failed to create user for Google login: " . $email);
                echo json_encode(['success' => false, 'message' => 'Failed to create user record for Google account']);
            }
        }
    } catch (PDOException $e) {
        // Rollback transaction on error
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        
        error_log("Google login error: " . $e->getMessage());
        echo json_encode(['success' => false, 'message' => 'Google login failed: ' . $e->getMessage()]);
    }
}

/**
 * Handle Google Sign-Up
 */
function handleGoogleSignup($pdo) {
    // Validate required fields
    if (empty($_POST['email']) || empty($_POST['googleId'])) {
        echo json_encode(['success' => false, 'message' => 'Email and Google ID are required']);
        return;
    }
    
    $email = trim($_POST['email']);
    $fullName = trim($_POST['fullName'] ?? '');
    $googleId = $_POST['googleId'];
    $pictureUrl = $_POST['picture'] ?? '';
    
    // Log the received data for debugging (remove in production)
    error_log("Google Signup Data: " . json_encode($_POST));
    
    try {
        // Begin transaction to prevent database locks
        $pdo->beginTransaction();
        
        // Check if user already exists by email or Google ID
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ? OR google_id = ?");
        $stmt->execute([$email, $googleId]);
        $existingUser = $stmt->fetch();
        
        if ($existingUser) {
            // Commit transaction - no changes made
            if ($pdo->inTransaction()) {
                $pdo->commit();
            }
            
            error_log("User already exists during Google signup: " . $email);
            echo json_encode([
                'success' => false, 
                'message' => 'An account with this email already exists. Please log in instead.',
                'existingUser' => true,
                'redirect' => 'login.html' // Add redirect to login
            ]);
            return;
        }
        
        // Generate a secure random password that the user won't need (since using Google auth)
        $randomPassword = bin2hex(random_bytes(16)); // 32 character random string
        $hashedPassword = password_hash($randomPassword, PASSWORD_DEFAULT);
        
        // Insert new user with Google information and hashed password
        $stmt = $pdo->prepare("INSERT INTO users (username, email, password, google_id, picture_url) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$fullName, $email, $hashedPassword, $googleId, $pictureUrl]);
        
        // Get new user ID
        $userId = $pdo->lastInsertId();
        
        // Commit transaction
        $pdo->commit();
        
        if ($userId) {
            error_log("Created new user from Google signup: User ID " . $userId);
            
            // Set session variables
            $_SESSION['user_id'] = $userId;
            $_SESSION['username'] = $fullName;
            $_SESSION['email'] = $email;
            $_SESSION['user_picture'] = $pictureUrl;
            $_SESSION['is_google_user'] = true;
            
            echo json_encode([
                'success' => true,
                'message' => 'Google signup successful',
                'userId' => $userId,
                'fullName' => $fullName,
                'email' => $email,
                'picture' => $pictureUrl,
                'redirect' => 'home.html' // Add redirect URL
            ]);
        } else {
            error_log("Failed to create user for Google signup: " . $email);
            echo json_encode(['success' => false, 'message' => 'Failed to create user record for Google account']);
        }
    } catch (PDOException $e) {
        // Rollback transaction on error
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        
        error_log("Google signup error: " . $e->getMessage());
        echo json_encode(['success' => false, 'message' => 'Google signup failed: ' . $e->getMessage()]);
    }
}

/**
 * Check if an email exists in the database
 */
function checkEmail($pdo) {
    // Validate email parameter
    if (empty($_POST['email'])) {
        echo json_encode(['success' => false, 'message' => 'Email is required']);
        return;
    }
    
    $email = trim($_POST['email']);
    
    // Check if the email exists in the database
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $userExists = (bool) $stmt->fetchColumn();
    
    // Return result
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
    // Validate required fields
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
    
    // Update the user's password
    try {
        $stmt = $pdo->prepare("UPDATE users SET password = ? WHERE id = ?");
        $result = $stmt->execute([$hashedPassword, $userId]);
        
        if ($result && $stmt->rowCount() > 0) {
            // Clear any existing session data for this user
            if (isset($_SESSION['user_id']) && $_SESSION['user_id'] == $userId) {
                // If the user is currently logged in, update their session
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