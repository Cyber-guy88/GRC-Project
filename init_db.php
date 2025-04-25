<?php
$dbFile = __DIR__ . '/database.sqlite';

try {
    // Create the database file if it doesn't exist
    if (!file_exists($dbFile)) {
        touch($dbFile);
        chmod($dbFile, 0666); // Make it writable
    }

    $pdo = new PDO("sqlite:$dbFile", null, null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false
    ]);
    
    // Create tables if they don't exist
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ");

    echo "Database initialized successfully!";
} catch (PDOException $e) {
    die("Error: " . $e->getMessage());
}
?> 