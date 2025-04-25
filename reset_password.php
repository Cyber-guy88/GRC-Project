<?php
require 'db.php'; // Include database connection

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve input values safely
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $password = isset($_POST['password']) ? trim($_POST['password']) : '';
    $confirm_password = isset($_POST['confirmPassword']) ? trim($_POST['confirmPassword']) : '';

    // Ensure all fields are filled
    if (empty($email) || empty($password) || empty($confirm_password)) {
        echo json_encode(["success" => false, "message" => "All fields are required!"]);
        exit;
    }

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["success" => false, "message" => "Invalid email format!"]);
        exit;
    }

    // Validate password strength
    if (strlen($password) < 8 || 
        !preg_match('/[A-Z]/', $password) || 
        !preg_match('/[a-z]/', $password) || 
        !preg_match('/\d/', $password) || 
        !preg_match('/[\W]/', $password)) {
        echo json_encode(["success" => false, "message" => "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character!"]);
        exit;
    }

    // Ensure passwords match
    if ($password !== $confirm_password) {
        echo json_encode(["success" => false, "message" => "Passwords do not match!"]);
        exit;
    }

    try {
        // Check if email exists
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if (!$user) {
            error_log("Password reset error: No account found for email: $email");
            echo json_encode(["success" => false, "message" => "No account found with this email address!"]);
            exit;
        }

        // Hash the new password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        error_log("Password reset: Creating hash for email: $email, user ID: " . $user['id']);

        // Update user's password in the database
        $stmt = $pdo->prepare("UPDATE users SET password = ? WHERE email = ?");
        $stmt->execute([$hashedPassword, $email]);

        if ($stmt->rowCount() > 0) {
            error_log("Password reset successful for user ID: " . $user['id']);
            echo json_encode([
                "success" => true, 
                "message" => "Password updated successfully!",
                "userId" => $user['id']
            ]);
        } else {
            error_log("Password reset failed: No rows updated for email: $email");
            echo json_encode(["success" => false, "message" => "Failed to update password. Please try again."]);
        }
        
    } catch (PDOException $e) {
        error_log("Password Reset Error: " . $e->getMessage()); // Log error
        echo json_encode(["success" => false, "message" => "Database error. Please try again later."]);
    }
    
    exit;
}
?> 