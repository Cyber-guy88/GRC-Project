<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
// Remove login check for testing
// if (!isset($_SESSION['user_id'])) {
//     die("Please login first");
// }

try {
    $dbFile = __DIR__ . '/database.sqlite';

    // ========== ADD GOOGLE COLUMNS SECTION ==========
    echo "<h2>Database Migration: Adding Google Authentication Columns</h2>";
    
    // Check if database file exists
    if (!file_exists($dbFile)) {
        die("Database file not found at: " . $dbFile);
    }

    $pdo = new PDO("sqlite:$dbFile", null, null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
    
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
    
    echo "<h3>Success!</h3>";
    echo "Database has been updated with all required columns. Google login/signup should now work correctly.<br><br>";
    // ========== END ADD GOOGLE COLUMNS SECTION ==========

    // Debug information
    echo "Database file path: " . $dbFile . "<br>";
    echo "File exists: " . (file_exists($dbFile) ? 'Yes' : 'No') . "<br>";

    // Get list of tables
    $tables = $pdo->query("SELECT name FROM sqlite_master WHERE type='table'")->fetchAll();

    echo "<html><head><title>Database Viewer</title>";
    echo "<style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f4f4f4; }
        h2 { color: #333; margin-top: 20px; }
        .debug { background: #f8f8f8; padding: 10px; margin: 10px 0; }
    </style>";
    echo "</head><body>";

    // Display each table
    foreach ($tables as $table) {
        $tableName = $table['name'];
        echo "<h2>Table: $tableName</h2>";
        
        // Get table data
        $rows = $pdo->query("SELECT * FROM $tableName")->fetchAll();
        
        if (empty($rows)) {
            echo "<p>No data in this table.</p>";
            continue;
        }

        echo "<table>";
        // Headers
        echo "<tr>";
        foreach (array_keys($rows[0]) as $column) {
            echo "<th>" . htmlspecialchars($column) . "</th>";
        }
        echo "</tr>";

        // Data
        foreach ($rows as $row) {
            echo "<tr>";
            foreach ($row as $value) {
                echo "<td>" . htmlspecialchars($value) . "</td>";
            }
            echo "</tr>";
        }
        echo "</table>";
    }

    echo "<h2>Users Table (All Columns):</h2>";
    try {
        $sql = "SELECT * FROM users";
        $stmt = $pdo->query($sql);
        
        if ($stmt->rowCount() > 0) {
            // Get column names from first row
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            echo "<table border='1'>";
            echo "<tr>";
            foreach (array_keys($row) as $column) {
                echo "<th>" . htmlspecialchars($column) . "</th>";
            }
            echo "</tr>";
            
            // Add the first row
            echo "<tr>";
            foreach ($row as $value) {
                echo "<td>" . htmlspecialchars($value) . "</td>";
            }
            echo "</tr>";
            
            // Add remaining rows
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                echo "<tr>";
                foreach ($row as $value) {
                    echo "<td>" . htmlspecialchars($value) . "</td>";
                }
                echo "</tr>";
            }
            echo "</table>";
        } else {
            echo "<p>No users found in database</p>";
        }
    } catch(PDOException $e) {
        echo "Error: " . $e->getMessage();
    }

    echo "<h2>Password Resets Table:</h2>";
    try {
        $sql = "SELECT * FROM password_resets";
        $stmt = $pdo->query($sql);
        
        if ($stmt->rowCount() > 0) {
            // Get column names from first row
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            echo "<table border='1'>";
            echo "<tr>";
            foreach (array_keys($row) as $column) {
                echo "<th>" . htmlspecialchars($column) . "</th>";
            }
            echo "</tr>";
            
            // Add the first row
            echo "<tr>";
            foreach ($row as $value) {
                echo "<td>" . htmlspecialchars($value) . "</td>";
            }
            echo "</tr>";
            
            // Add remaining rows
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                echo "<tr>";
                foreach ($row as $value) {
                    echo "<td>" . htmlspecialchars($value) . "</td>";
                }
                echo "</tr>";
            }
            echo "</table>";
        } else {
            echo "<p>No password resets found in database</p>";
        }
    } catch(PDOException $e) {
        echo "Error displaying password resets table: " . $e->getMessage();
    }

    echo "</body></html>";

} catch (PDOException $e) {
    die("Database Error: " . $e->getMessage());
} catch (Exception $e) {
    die("General Error: " . $e->getMessage());
}
?> 