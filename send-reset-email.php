<?php
require 'db.php'; // Ensure database connection is initialized

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);

    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: forgot-password.html?error=Invalid email address.");
        exit();
    }

    // Check if email exists in the database
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if (!$user) {
        header("Location: forgot-password.html?error=No account found with this email.");
        exit();
    }

    // Generate token and expiry time
    $token = bin2hex(random_bytes(50));
    $expiry = date("Y-m-d H:i:s", strtotime("+1 hour"));
    $hashedToken = hash('sha256', $token);

    // Store token in the database
    $stmt = $pdo->prepare("UPDATE users SET reset_token = ?, token_expiry = ? WHERE email = ?");
    if ($stmt->execute([$hashedToken, $expiry, $email])) {
        $resetLink = "http://localhost/PhpProg/InterProj3m/reset-password.php?token=$token";

        // Configure PHPMailer
        $mail = new PHPMailer(true);
        try {
            $mail->isSMTP();
            $mail->Host = 'sandbox.smtp.mailtrap.io';
            $mail->SMTPAuth = true;
            
            $mail->Username = '7628dd755e2ce6'; // Replace with Mailtrap username
            $mail->Password = '41cab2124251b5'; // Replace with Mailtrap password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 2525;

            $mail->setFrom('udaydarji259@gmail.com', 'Your Website');
            $mail->addAddress($email);
            $mail->Subject = 'Password Reset Request';
            $mail->isHTML(true);
            $mail->Body = "
                <p>Hello,</p>
                <p>Click the link below to reset your password:</p>
                <p><a href='$resetLink'>Reset Password</a></p>
                <p>If you did not request this, please ignore this email.</p>
            ";

            $mail->send();
            header("Location: forgot-password.html?success=Password reset link sent to your email.");
            exit();

        } catch (Exception $e) {
            header("Location: forgot-password.html?error=Email could not be sent. Please try again.");
            exit();
        }
    } else {
        header("Location: forgot-password.html?error=Error saving token. Please try again.");
        exit();
    }
} else {
    header("Location: forgot-password.html?error=Invalid request.");
    exit();
}
