<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h2>Database Fix: Rebuilding Users Table with Google Authentication Columns</h2>";

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

    // Begin transaction for safety
    $pdo->beginTransaction();
    
    try {
        // Backup existing users data if table exists
        $users = [];
        if ($pdo->query("SELECT name FROM sqlite_master WHERE type='table' AND name='users'")->fetchColumn()) {
            echo "Backing up existing users data...<br>";
            try {
                $stmt = $pdo->query("SELECT * FROM users");
                $users = $stmt->fetchAll();
                echo "Backed up " . count($users) . " user records.<br>";
            } catch (PDOException $e) {
                echo "Warning: Could not fully backup users: " . $e->getMessage() . "<br>";
                // Continue anyway, we'll try with what we have
            }
            
            // Drop the existing table
            echo "Dropping existing users table...<br>";
            $pdo->exec("DROP TABLE IF EXISTS users");
        }
        
        // Create fresh users table with all required columns
        echo "Creating new users table with all required columns...<br>";
        $pdo->exec("CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            email TEXT UNIQUE,
            password TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            google_id TEXT,
            picture_url TEXT
        )");
        
        // Restore backed up users if we had any
        if (!empty($users)) {
            echo "Restoring user data...<br>";
            $restored = 0;
            
            foreach ($users as $user) {
                try {
                    // Create a dynamic query based on available columns
                    $columns = array_keys($user);
                    $placeholders = array_fill(0, count($columns), '?');
                    
                    $sql = "INSERT INTO users (" . implode(", ", $columns) . ") VALUES (" . implode(", ", $placeholders) . ")";
                    $stmt = $pdo->prepare($sql);
                    
                    // Execute with values from the original record
                    $stmt->execute(array_values($user));
                    $restored++;
                } catch (PDOException $e) {
                    echo "Warning: Could not restore user ID " . ($user['id'] ?? 'unknown') . ": " . $e->getMessage() . "<br>";
                }
            }
            
            echo "Restored " . $restored . " of " . count($users) . " users.<br>";
        }
        
        // Commit the transaction
        $pdo->commit();

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
        
        // Show sample data
        echo "<h3>User Data Sample:</h3>";
        $stmt = $pdo->query("SELECT * FROM users LIMIT 5");
        $users = $stmt->fetchAll();
        
        if (count($users) > 0) {
            echo "<table border='1'>";
            // Table headers
            echo "<tr>";
            foreach (array_keys($users[0]) as $header) {
                echo "<th>" . htmlspecialchars($header) . "</th>";
            }
            echo "</tr>";
            
            // Table data (hiding sensitive info)
            foreach ($users as $user) {
                echo "<tr>";
                foreach ($user as $key => $value) {
                    // Mask password and other sensitive data
                    if ($key == 'password' && !empty($value)) {
                        echo "<td>********</td>";
                    } else {
                        echo "<td>" . htmlspecialchars($value ?: 'NULL') . "</td>";
                    }
                }
                echo "</tr>";
            }
            echo "</table>";
        } else {
            echo "<p>No users in the database.</p>";
        }
        
        echo "<h3>Success!</h3>";
        echo "Database has been rebuilt with all required columns. Google login/signup should now work correctly.<br><br>";
        echo "<a href='login.html'>Go to Login Page</a>";
        
    } catch (Exception $e) {
        // If anything goes wrong, roll back the transaction
        $pdo->rollBack();
        throw $e;
    }
    
} catch (PDOException $e) {
    die("Database Error: " . $e->getMessage());
} catch (Exception $e) {
    die("General Error: " . $e->getMessage());
}
?> 