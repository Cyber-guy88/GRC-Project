<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database file path
$dbFile = __DIR__ . '/database.sqlite';

try {
    // Connect to SQLite database
    $pdo = new PDO("sqlite:$dbFile", null, null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
    
    echo "<h1>Password Migration Script</h1>";
    
    // Check if users table exists
    $stmt = $pdo->query("SELECT name FROM sqlite_master WHERE type='table' AND name='users'");
    if (!$stmt->fetchColumn()) {
        die("Users table does not exist. No migration needed.");
    }
    
    // Get all users
    $users = $pdo->query("SELECT id, email, password FROM users")->fetchAll();
    
    if (empty($users)) {
        echo "<p>No users found in the database. Nothing to migrate.</p>";
        exit;
    }
    
    echo "<p>Found " . count($users) . " users in database.</p>";
    
    $migratedCount = 0;
    
    // Check each user's password and hash it if it's not already hashed
    foreach ($users as $user) {
        // Check if password is already hashed (hashed passwords start with $2y$)
        if (substr($user['password'], 0, 4) !== '$2y$') {
            // Password is plain text, hash it
            $hashedPassword = password_hash($user['password'], PASSWORD_DEFAULT);
            
            // Update user's password
            $stmt = $pdo->prepare("UPDATE users SET password = ? WHERE id = ?");
            $stmt->execute([$hashedPassword, $user['id']]);
            
            echo "<p>Migrated password for user: " . htmlspecialchars($user['email']) . "</p>";
            $migratedCount++;
        }
    }
    
    echo "<h2>Migration Complete</h2>";
    echo "<p>Migrated $migratedCount passwords.</p>";
    
} catch (PDOException $e) {
    die("Database Error: " . $e->getMessage());
}
?> 