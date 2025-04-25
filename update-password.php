<?php 
require 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $token = $_POST['token'];
    $new_password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    // Check if token is valid
    $stmt = $conn->prepare("SELECT * FROM users WHERE reset_token = ? AND token_expiry > NOW()");
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user) {
        // Update the new password in the database
        $stmt = $conn->prepare("UPDATE users SET password = ?, reset_token = NULL, token_expiry = NULL WHERE reset_token = ?");
        $stmt->bind_param("ss", $new_password, $token);
        $stmt->execute();

        echo "Your password has been reset successfully.";
    } else {
        echo "Invalid or expired token.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
</head>
<body>
    <h2>Reset Password</h2>
    <form action="reset-password.php" method="POST">
        <input type="hidden" name="token" value="<?php echo $_GET['token']; ?>">
        <input type="password" name="password" placeholder="Enter new password" required>
        <button type="submit">Update Password</button>
    </form>
</body>
</html>
