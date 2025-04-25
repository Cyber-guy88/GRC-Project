<?php
require 'db.php'; 

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // ✅ Retrieve input values safely
    $username = isset($_POST['username']) ? trim($_POST['username']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $password = isset($_POST['password']) ? trim($_POST['password']) : '';
    $confirm_password = isset($_POST['confirm_password']) ? trim($_POST['confirm_password']) : '';

    // ✅ Debugging (Uncomment for testing)
    // echo json_encode(["debug" => ["username" => $username, "email" => $email, "password" => $password, "confirm_password" => $confirm_password]]);
    // exit;

    // ✅ 1. Ensure all fields are filled
    if (empty($username) || empty($email) || empty($password) || empty($confirm_password)) {
        echo json_encode(["status" => "error", "message" => "All fields are required!"]);
        exit;
    }

    // ✅ 2. Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["status" => "error", "message" => "Invalid email format!"]);
        exit;
    }

    // ✅ 3. Validate password strength
    if (strlen($password) < 8 || 
        !preg_match('/[A-Z]/', $password) || 
        !preg_match('/[a-z]/', $password) || 
        !preg_match('/\d/', $password) || 
        !preg_match('/[\W]/', $password)) {
        echo json_encode(["status" => "error", "message" => "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character!"]);
        exit;
    }

    // ✅ 4. Ensure passwords match
    if ($password !== $confirm_password) {
        echo json_encode(["status" => "error", "message" => "Passwords do not match!"]);
        exit;
    }

    try {
        // ✅ 5. Check if username already exists
        $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
        $stmt->execute([$username]);
        if ($stmt->fetch()) {
            echo json_encode(["status" => "error", "message" => "Username is already taken!"]);
            exit;
        }

        // ✅ 6. Check if email is already registered
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            echo json_encode(["status" => "error", "message" => "Email is already registered!"]);
            exit;
        }

        // ✅ 7. Securely hash password before storing
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        // ✅ 8. Insert user into the database
        $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
        $stmt->execute([$username, $email, $hashedPassword]);

        echo json_encode(["status" => "success", "message" => "Signup successful!"]);
        exit;

    } catch (PDOException $e) {
        error_log("Signup Error: " . $e->getMessage()); // Log error
        echo json_encode(["status" => "error", "message" => "Something went wrong! Please try again."]);
        exit;
    }
}
?>
