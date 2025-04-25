<?php
session_start();
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST['email']);
    
    // Check if email exists in database
    $sql = "SELECT id, username FROM users WHERE email = :email";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['email' => $email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        // Generate a unique token
        $token = bin2hex(random_bytes(32));
        $expires = date('Y-m-d H:i:s', strtotime('+1 hour'));

        // Store the reset token in the database
        $sql = "INSERT INTO password_resets (user_id, token, expires_at) VALUES (:user_id, :token, :expires_at)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            'user_id' => $user['id'],
            'token' => $token,
            'expires_at' => $expires
        ]);

        // Create reset link
        $resetLink = "http://" . $_SERVER['HTTP_HOST'] . "/try2/reset-password.php?token=" . $token;

        // Show the reset link directly on the page
        echo "<h2>Password Reset Link (For Testing)</h2>";
        echo "<p>Click the link below to reset your password:</p>";
        echo "<a href='" . htmlspecialchars($resetLink) . "'>Reset Password</a>";
        echo "<p>This link will expire in 1 hour.</p>";
        echo "<p><a href='login.html'>Back to Login</a></p>";
    } else {
        // Don't reveal if email exists or not for security
        header("Location: forgot-password.html?success=reset_link_sent");
    }
} else {
    header("Location: forgot-password.html");
}
exit();
?>