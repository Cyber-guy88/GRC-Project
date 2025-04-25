<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h1>Database Connection Test</h1>";

try {
    // Database file path
    $dbFile = __DIR__ . '/database.sqlite';
    
    echo "<p>Database file path: $dbFile</p>";
    
    // Check if file exists
    if (file_exists($dbFile)) {
        echo "<p style='color:green'>Database file exists!</p>";
    } else {
        echo "<p style='color:red'>Database file does not exist!</p>";
        exit;
    }
    
    // Check if file is writable
    if (is_writable($dbFile)) {
        echo "<p style='color:green'>Database file is writable!</p>";
    } else {
        echo "<p style='color:red'>Database file is NOT writable! Please check permissions.</p>";
        echo "<p>Current permissions: " . substr(sprintf('%o', fileperms($dbFile)), -4) . "</p>";
        echo "<p>Owner: " . fileowner($dbFile) . "</p>";
        echo "<p>Group: " . filegroup($dbFile) . "</p>";
        exit;
    }
    
    // Try connecting to database
    $pdo = new PDO("sqlite:$dbFile", null, null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
    
    echo "<p style='color:green'>Successfully connected to database!</p>";
    
    // Try to do a test write
    echo "<h2>Testing database operations</h2>";
    
    // Begin transaction
    $pdo->beginTransaction();
    
    // Create test table if it doesn't exist
    $pdo->exec("CREATE TABLE IF NOT EXISTS test_table (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        test_value TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");
    
    echo "<p>Created test table.</p>";
    
    // Insert test data
    $stmt = $pdo->prepare("INSERT INTO test_table (test_value) VALUES (?)");
    $testValue = "Test value at " . date('Y-m-d H:i:s');
    $stmt->execute([$testValue]);
    
    echo "<p>Inserted test row with value: $testValue</p>";
    
    // Read test data back
    $stmt = $pdo->prepare("SELECT * FROM test_table ORDER BY id DESC LIMIT 1");
    $stmt->execute();
    $result = $stmt->fetch();
    
    echo "<p>Retrieved row: ID = {$result['id']}, Value = {$result['test_value']}, Created = {$result['created_at']}</p>";
    
    // Commit transaction
    $pdo->commit();
    
    echo "<p style='color:green'>All database operations completed successfully!</p>";
    
    // Check users table
    $stmt = $pdo->prepare("SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name='users'");
    $stmt->execute();
    $result = $stmt->fetch();
    
    if ($result['count'] > 0) {
        echo "<p style='color:green'>Users table exists!</p>";
        
        // Count users
        $stmt = $pdo->prepare("SELECT count(*) as count FROM users");
        $stmt->execute();
        $result = $stmt->fetch();
        
        echo "<p>Total users in database: {$result['count']}</p>";
        
        // Show user emails
        $stmt = $pdo->prepare("SELECT id, username, email FROM users LIMIT 10");
        $stmt->execute();
        $users = $stmt->fetchAll();
        
        echo "<h3>Users in database:</h3>";
        echo "<table border='1'>";
        echo "<tr><th>ID</th><th>Username</th><th>Email</th></tr>";
        
        foreach ($users as $user) {
            echo "<tr>";
            echo "<td>{$user['id']}</td>";
            echo "<td>{$user['username']}</td>";
            echo "<td>{$user['email']}</td>";
            echo "</tr>";
        }
        
        echo "</table>";
    } else {
        echo "<p style='color:red'>Users table does not exist!</p>";
    }
    
} catch (Exception $e) {
    if (isset($pdo) && $pdo->inTransaction()) {
        $pdo->rollBack();
    }
    
    echo "<p style='color:red'>Error: " . $e->getMessage() . "</p>";
    echo "<pre>" . $e->getTraceAsString() . "</pre>";
}
?> 