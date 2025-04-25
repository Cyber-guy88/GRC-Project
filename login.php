<?php
session_start();  // Always start the session at the top of the script
include 'db.php';  // Include the database connection file

// Set response header to JSON
header('Content-Type: application/json');

// Ensure that the form is submitted via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    // Check if either the email or password is empty
    if (empty($email) || empty($password)) {
        echo json_encode([
            'success' => false,
            'message' => 'Email and password are required'
        ]);
        exit();
    }

    try {
        // Prepare and execute the query to check the user's credentials
        $sql = "SELECT id, username, email, password FROM users WHERE email=?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Add debugging
        error_log("Login attempt for email: $email");
        if (!$user) {
            error_log("No user found with email: $email");
        } else {
            error_log("User found with ID: " . $user['id']);
            error_log("Password verify result: " . (password_verify($password, $user['password']) ? 'true' : 'false'));
            error_log("Direct password match: " . ($user['password'] === $password ? 'true' : 'false'));
        }

        // If the user exists and the password matches
        if ($user && password_verify($password, $user['password'])) {
            // Store user data in the session
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['email'] = $user['email'];

            // For remember me functionality (optional)
            if (isset($_POST['remember']) && $_POST['remember'] == '1') {
                $remember_token = bin2hex(random_bytes(32));
                $expires = date('Y-m-d H:i:s', strtotime('+30 days'));
                
                // Store token in database
                $stmt = $pdo->prepare("UPDATE users SET remember_token = ?, token_expires = ? WHERE id = ?");
                $stmt->execute([$remember_token, $expires, $user['id']]);
                
                // Set cookie
                setcookie('remember_token', $remember_token, time() + 60*60*24*30, '/', '', false, true);
            }

            echo json_encode([
                'success' => true,
                'message' => 'Login successful',
                'email' => $user['email'],
                'fullName' => $user['username'],
                'userId' => $user['id'],
                'redirect' => 'home.html',
                'userData' => [
                    'email' => $user['email'],
                    'fullName' => $user['username'],
                    'userId' => $user['id']
                ]
            ]);
            exit();
        } 
        // Direct password match (fallback for old stored passwords)
        else if ($user && $user['password'] === $password) {
            // Store user data in the session
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['email'] = $user['email'];

            // Upgrade the password to a hashed version
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $updateStmt = $pdo->prepare("UPDATE users SET password = ? WHERE id = ?");
            $updateStmt->execute([$hashedPassword, $user['id']]);

            echo json_encode([
                'success' => true,
                'message' => 'Login successful',
                'email' => $user['email'],
                'fullName' => $user['username'],
                'userId' => $user['id'],
                'redirect' => 'home.html',
                'userData' => [
                    'email' => $user['email'],
                    'fullName' => $user['username'],
                    'userId' => $user['id']
                ]
            ]);
            exit();
        }
        else {
            // If invalid credentials
            echo json_encode([
                'success' => false,
                'message' => 'Invalid email or password'
            ]);
            exit();
        }
    } catch (PDOException $e) {
        // Log error and return error message
        error_log("Login Error: " . $e->getMessage());
        echo json_encode([
            'success' => false,
            'message' => 'Database error. Please try again later.'
        ]);
        exit();
    }
} else {
    // If not a POST request
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method'
    ]);
    exit();
}
?>
