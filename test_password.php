<?php
// This is a test file to verify password hashing and verification

// Test password
$password = "TestPassword123!";

// Create hash using PASSWORD_DEFAULT (which is currently BCRYPT)
$hash_default = password_hash($password, PASSWORD_DEFAULT);
echo "Hash with PASSWORD_DEFAULT: " . $hash_default . "\n";

// Create hash using PASSWORD_BCRYPT explicitly
$hash_bcrypt = password_hash($password, PASSWORD_BCRYPT);
echo "Hash with PASSWORD_BCRYPT: " . $hash_bcrypt . "\n";

// Verify with both hashes
echo "Verify default hash: " . (password_verify($password, $hash_default) ? "true" : "false") . "\n";
echo "Verify bcrypt hash: " . (password_verify($password, $hash_bcrypt) ? "true" : "false") . "\n";

// Test with different algo
$wrong_password = "WrongPassword123!";
echo "Verify wrong password with default hash: " . (password_verify($wrong_password, $hash_default) ? "true" : "false") . "\n";

// Direct string comparison
echo "Direct string comparison: " . ($password === $password ? "true" : "false") . "\n";
echo "Direct string comparison (wrong): " . ($password === $wrong_password ? "true" : "false") . "\n";
echo "Direct hash comparison: " . ($hash_default === $hash_bcrypt ? "true" : "false") . "\n";

// Test directly to see what's happening
echo "Info about hash:\n";
print_r(password_get_info($hash_default));

// Simulate database and login
$stored_hash = $hash_default;
$user_input = $password;

echo "\nSimulating login:\n";
echo "Using password_verify: " . (password_verify($user_input, $stored_hash) ? "Login success" : "Login failed") . "\n";
echo "Using direct comparison: " . ($user_input === $stored_hash ? "Login success" : "Login failed") . "\n";

// Log version info
echo "PHP Version: " . phpversion() . "\n";
?> 