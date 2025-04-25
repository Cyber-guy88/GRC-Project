<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Start session if not already started
if (session_status() === PHP_SESSION_INACTIVE) {
    session_start();
}

// Get user email from session or request
$userEmail = isset($_SESSION['userEmail']) ? $_SESSION['userEmail'] : 
             (isset($_SESSION['email']) ? $_SESSION['email'] : 
             (isset($_GET['email']) ? $_GET['email'] : ''));

// Handle form submission to run test operations
$message = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Connect to database
        $dbFile = __DIR__ . '/database.sqlite';
        if (!file_exists($dbFile)) {
            throw new Exception("Database file not found at: $dbFile");
        }
        
        $pdo = new PDO("sqlite:$dbFile", null, null, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);
        
        // Handle different actions
        if (isset($_POST['action'])) {
            switch ($_POST['action']) {
                case 'check_user':
                    $email = $_POST['email'] ?? $userEmail;
                    if (empty($email)) throw new Exception("No email provided");
                    
                    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
                    $stmt->execute([$email]);
                    $user = $stmt->fetch();
                    
                    if ($user) {
                        $message = "User found: " . print_r($user, true);
                    } else {
                        $message = "User not found with email: $email";
                    }
                    break;
                    
                case 'create_user':
                    $email = $_POST['email'] ?? '';
                    $username = $_POST['username'] ?? '';
                    
                    if (empty($email) || empty($username)) {
                        throw new Exception("Email and username are required");
                    }
                    
                    $password = password_hash($_POST['password'] ?? 'default_password', PASSWORD_DEFAULT);
                    
                    $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
                    $result = $stmt->execute([$username, $email, $password]);
                    
                    if ($result) {
                        $message = "User created successfully with ID: " . $pdo->lastInsertId();
                    } else {
                        $message = "Failed to create user";
                    }
                    break;
                    
                case 'update_user':
                    $currentEmail = $_POST['current_email'] ?? '';
                    $newEmail = $_POST['new_email'] ?? '';
                    $newUsername = $_POST['new_username'] ?? '';
                    
                    if (empty($currentEmail) || empty($newEmail) || empty($newUsername)) {
                        throw new Exception("Current email, new email and new username are required");
                    }
                    
                    $stmt = $pdo->prepare("UPDATE users SET username = ?, email = ? WHERE email = ?");
                    $result = $stmt->execute([$newUsername, $newEmail, $currentEmail]);
                    
                    if ($stmt->rowCount() > 0) {
                        $message = "User updated successfully";
                    } else {
                        $message = "No changes made. User with email '$currentEmail' might not exist.";
                    }
                    break;
                    
                case 'list_users':
                    $stmt = $pdo->query("SELECT * FROM users");
                    $users = $stmt->fetchAll();
                    
                    if (count($users) > 0) {
                        $message = "Users in database:\n<pre>" . print_r($users, true) . "</pre>";
                    } else {
                        $message = "No users found in database";
                    }
                    break;
            }
        }
    } catch (Exception $e) {
        $message = "Error: " . $e->getMessage();
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Database Check Tool</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 {
            color: #333;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
        }
        .section {
            background: #f9f9f9;
            border: 1px solid #ddd;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 5px;
        }
        form {
            margin: 15px 0;
        }
        label {
            display: block;
            margin: 10px 0 5px;
            font-weight: bold;
        }
        input[type="text"], input[type="email"], input[type="password"] {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 3px;
            margin-bottom: 10px;
        }
        button {
            background: #0066cc;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 3px;
            cursor: pointer;
        }
        button:hover {
            background: #0052a3;
        }
        .message {
            background: #e9f7ef;
            border: 1px solid #a3e4d7;
            padding: 10px;
            margin: 15px 0;
            border-radius: 3px;
        }
        .error {
            background: #f9ebea;
            border: 1px solid #e6b0aa;
        }
        pre {
            white-space: pre-wrap;
            background: #f8f9fa;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 3px;
            overflow: auto;
        }
    </style>
</head>
<body>
    <h1>Database Check Tool</h1>
    
    <div class="section">
        <h2>Current Status</h2>
        <p>Database File: <?php echo file_exists(__DIR__ . '/database.sqlite') ? 'Found' : 'Not Found'; ?></p>
        <p>Current User Email: <?php echo htmlspecialchars($userEmail ?: 'Not set'); ?></p>
    </div>
    
    <?php if (!empty($message)): ?>
    <div class="message <?php echo strpos($message, 'Error') === 0 ? 'error' : ''; ?>">
        <?php echo $message; ?>
    </div>
    <?php endif; ?>
    
    <div class="section">
        <h2>Check User</h2>
        <form method="post">
            <input type="hidden" name="action" value="check_user">
            <label for="check_email">Email to check:</label>
            <input type="email" id="check_email" name="email" value="<?php echo htmlspecialchars($userEmail); ?>" required>
            <button type="submit">Check User</button>
        </form>
    </div>
    
    <div class="section">
        <h2>Create User</h2>
        <form method="post">
            <input type="hidden" name="action" value="create_user">
            <label for="new_username">Username:</label>
            <input type="text" id="new_username" name="username" required>
            <label for="new_email">Email:</label>
            <input type="email" id="new_email" name="email" required>
            <label for="new_password">Password (optional):</label>
            <input type="password" id="new_password" name="password" placeholder="Default password will be used if empty">
            <button type="submit">Create User</button>
        </form>
    </div>
    
    <div class="section">
        <h2>Update User</h2>
        <form method="post">
            <input type="hidden" name="action" value="update_user">
            <label for="current_email">Current Email:</label>
            <input type="email" id="current_email" name="current_email" value="<?php echo htmlspecialchars($userEmail); ?>" required>
            <label for="new_username_update">New Username:</label>
            <input type="text" id="new_username_update" name="new_username" required>
            <label for="new_email_update">New Email:</label>
            <input type="email" id="new_email_update" name="new_email" required>
            <button type="submit">Update User</button>
        </form>
    </div>
    
    <div class="section">
        <h2>List All Users</h2>
        <form method="post">
            <input type="hidden" name="action" value="list_users">
            <button type="submit">Show All Users</button>
        </form>
    </div>
</body>
</html> 