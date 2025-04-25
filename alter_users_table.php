<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h1>Database Schema Update</h1>";

try {
    // Database file path
    $dbFile = __DIR__ . '/database.sqlite';
    
    echo "<p>Database file path: $dbFile</p>";
    
    // Check if file exists and is writable
    if (!file_exists($dbFile)) {
        echo "<p style='color:red'>Database file does not exist!</p>";
        exit;
    }
    
    if (!is_writable($dbFile)) {
        echo "<p style='color:red'>Database file is NOT writable! Please check permissions.</p>";
        exit;
    }
    
    // Connect to database
    $pdo = new PDO("sqlite:$dbFile", null, null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    
    echo "<p style='color:green'>Connected to database successfully!</p>";
    
    // Create a backup of the database
    $backupFile = __DIR__ . '/database_backup_' . date('Y-m-d_H-i-s') . '.sqlite';
    if (copy($dbFile, $backupFile)) {
        echo "<p style='color:green'>Created database backup at: $backupFile</p>";
    } else {
        echo "<p style='color:orange'>Warning: Could not create database backup!</p>";
    }
    
    // Begin transaction
    $pdo->beginTransaction();
    
    // Check if users table exists
    $stmt = $pdo->prepare("SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name='users'");
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($result['count'] == 0) {
        echo "<p style='color:red'>Error: Users table does not exist!</p>";
        exit;
    }
    
    echo "<p>Users table exists. Checking for missing columns...</p>";
    
    // Get existing columns
    $stmt = $pdo->prepare("PRAGMA table_info(users)");
    $stmt->execute();
    $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $existingColumns = array_column($columns, 'name');
    echo "<p>Existing columns: " . implode(", ", $existingColumns) . "</p>";
    
    // Columns we need to add
    $requiredColumns = [
        'phone' => 'TEXT',
        'company' => 'TEXT',
        'job_title' => 'TEXT'
    ];
    
    $columnsAdded = 0;
    
    // Add missing columns
    foreach ($requiredColumns as $column => $type) {
        if (!in_array($column, $existingColumns)) {
            $sql = "ALTER TABLE users ADD COLUMN $column $type";
            $pdo->exec($sql);
            echo "<p style='color:green'>Added column: $column ($type)</p>";
            $columnsAdded++;
        } else {
            echo "<p>Column already exists: $column</p>";
        }
    }
    
    // Commit transaction
    $pdo->commit();
    
    if ($columnsAdded > 0) {
        echo "<h2 style='color:green'>Success! Added $columnsAdded new columns to the users table.</h2>";
    } else {
        echo "<h2>No new columns needed to be added.</h2>";
    }
    
    // Show updated schema
    $stmt = $pdo->prepare("PRAGMA table_info(users)");
    $stmt->execute();
    $updatedColumns = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "<h3>Updated Users Table Schema:</h3>";
    echo "<table border='1'>";
    echo "<tr><th>ID</th><th>Name</th><th>Type</th><th>Not Null</th><th>Default</th><th>Primary Key</th></tr>";
    
    foreach ($updatedColumns as $col) {
        echo "<tr>";
        echo "<td>{$col['cid']}</td>";
        echo "<td>{$col['name']}</td>";
        echo "<td>{$col['type']}</td>";
        echo "<td>{$col['notnull']}</td>";
        echo "<td>{$col['dflt_value']}</td>";
        echo "<td>{$col['pk']}</td>";
        echo "</tr>";
    }
    
    echo "</table>";
    
    echo "<p>You can now safely use the profile editor with all fields.</p>";
    echo "<p><a href='profile.html'>Return to profile page</a></p>";
    
} catch (Exception $e) {
    // Rollback transaction if active
    if (isset($pdo) && $pdo->inTransaction()) {
        $pdo->rollBack();
    }
    
    echo "<p style='color:red'>Error: " . $e->getMessage() . "</p>";
    echo "<pre>" . $e->getTraceAsString() . "</pre>";
}
?> 