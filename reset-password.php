<?php
session_start();
include 'db.php';

// Check if token exists and is valid
if (!isset($_GET['token'])) {
    header("Location: login.html?error=invalid_token");
    exit();
}

$token = $_GET['token'];

// Verify token and check expiration
$sql = "SELECT user_id FROM password_resets WHERE token = :token AND expires_at > datetime('now') AND used = 0";
$stmt = $pdo->prepare($sql);
$stmt->execute(['token' => $token]);
$reset = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$reset) {
    header("Location: login.html?error=invalid_token");
    exit();
}

// If form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $password = trim($_POST['password']);
    $confirm_password = trim($_POST['confirm_password']);
    
    if ($password !== $confirm_password) {
        $error = "Passwords do not match";
    } elseif (strlen($password) < 6) {
        $error = "Password must be at least 6 characters long";
    } else {
        // Update password
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $sql = "UPDATE users SET password = :password WHERE id = :user_id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            'password' => $hashed_password,
            'user_id' => $reset['user_id']
        ]);
        
        // Mark token as used
        $sql = "UPDATE password_resets SET used = 1 WHERE token = :token";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['token' => $token]);
        
        header("Location: login.html?success=password_reset");
        exit();
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .container {
            background-color: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            width: 100%;
            max-width: 400px;
        }
        h2 {
            text-align: center;
            color: #333;
            margin-bottom: 1.5rem;
        }
        .form-group {
            margin-bottom: 1rem;
        }
        label {
            display: block;
            margin-bottom: 0.5rem;
            color: #555;
        }
        input[type="password"] {
            width: 100%;
            padding: 0.8rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-sizing: border-box;
        }
        button {
            width: 100%;
            padding: 0.8rem;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
        }
        button:hover {
            background-color: #45a049;
        }
        .error {
            color: red;
            margin-bottom: 1rem;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Reset Password</h2>
        <?php if (isset($error)): ?>
            <div class="error"><?php echo htmlspecialchars($error); ?></div>
        <?php endif; ?>
        <form method="POST">
            <div class="form-group">
                <label for="password">New Password</label>
                <input type="password" id="password" name="password" required>
            </div>
            <div class="form-group">
                <label for="confirm_password">Confirm New Password</label>
                <input type="password" id="confirm_password" name="confirm_password" required>
            </div>
            <button type="submit">Reset Password</button>
        </form>
    </div>
</body>
</html>
