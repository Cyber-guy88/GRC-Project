<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h2>Database Migration: Adding Google Authentication Columns</h2>";

try {
    // Database file path
    $dbFile = __DIR__ . '/database.sqlite';
    
    echo "Connecting to database: $dbFile<br>";
    
    // Check if database file exists
    if (!file_exists($dbFile)) {
        die("Error: Database file not found at: $dbFile");
    }

    // Create/connect to SQLite database
    $pdo = new PDO("sqlite:$dbFile", null, null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
    
    echo "Connected to database successfully.<br>";
    
    // Check if users table exists
    $tableExists = $pdo->query("SELECT name FROM sqlite_master WHERE type='table' AND name='users'")->fetchColumn();
    
    if (!$tableExists) {
        echo "Users table does not exist. Creating new table...<br>";
        
        // Create users table with all required columns
        $pdo->exec("CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            email TEXT UNIQUE,
            password TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            google_id TEXT,
            picture_url TEXT
        )");
        
        echo "Created users table with all columns.<br>";
    } else {
        echo "Users table exists. Checking for missing columns...<br>";
        
        // Get existing columns in the users table
        $stmt = $pdo->query("PRAGMA table_info(users)");
        $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $columnNames = array_column($columns, 'name');
        
        echo "Existing columns: " . implode(", ", $columnNames) . "<br>";
        
        // Check if google_id column exists
        if (!in_array('google_id', $columnNames)) {
            echo "Adding missing column: google_id<br>";
            $pdo->exec("ALTER TABLE users ADD COLUMN google_id TEXT");
        } else {
            echo "Column google_id already exists.<br>";
        }
        
        // Check if picture_url column exists
        if (!in_array('picture_url', $columnNames)) {
            echo "Adding missing column: picture_url<br>";
            $pdo->exec("ALTER TABLE users ADD COLUMN picture_url TEXT");
        } else {
            echo "Column picture_url already exists.<br>";
        }
    }
    
    // Verify table structure after changes
    echo "<h3>Current Table Structure:</h3>";
    $stmt = $pdo->query("PRAGMA table_info(users)");
    $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "<table border='1'>";
    echo "<tr><th>CID</th><th>Name</th><th>Type</th><th>NotNull</th><th>Default</th><th>PK</th></tr>";
    
    foreach ($columns as $column) {
        echo "<tr>";
        echo "<td>{$column['cid']}</td>";
        echo "<td>{$column['name']}</td>";
        echo "<td>{$column['type']}</td>";
        echo "<td>{$column['notnull']}</td>";
        echo "<td>{$column['dflt_value']}</td>";
        echo "<td>{$column['pk']}</td>";
        echo "</tr>";
    }
    
    echo "</table>";
    
    echo "<h3>Success!</h3>";
    echo "Database has been updated with all required columns. Google login/signup should now work correctly.";
    
} catch (PDOException $e) {
    die("Database Error: " . $e->getMessage());
} catch (Exception $e) {
    die("General Error: " . $e->getMessage());
}
?> 