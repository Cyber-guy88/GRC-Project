<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 0); // Turn off display errors to avoid corrupting JSON output

header('Content-Type: application/json');

// Start session if not already started
if (session_status() === PHP_SESSION_INACTIVE) {
    session_start();
}

// Initialize response array
$response = [
    'success' => false,
    'message' => '',
    'debug' => []
];

// Create or verify log directory
$logDir = __DIR__ . '/logs';
if (!file_exists($logDir)) {
    mkdir($logDir, 0755, true);
}

// Get request time for logging
$requestTime = date('Y-m-d H:i:s');
$logFile = $logDir . '/profile_debug.log';

try {
    // Log start of request
    file_put_contents($logFile, "$requestTime - PROFILE UPDATE REQUEST STARTED\n", FILE_APPEND);
    
    // Verify request method
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Invalid request method. Only POST is allowed.');
    }
    
    // Get JSON input
    $jsonData = file_get_contents('php://input');
    file_put_contents($logFile, "$requestTime - Raw input: $jsonData\n", FILE_APPEND);
    
    $data = json_decode($jsonData, true);
    
    if (!$data) {
        $jsonError = json_last_error_msg();
        file_put_contents($logFile, "$requestTime - JSON decode error: $jsonError\n", FILE_APPEND);
        throw new Exception('Invalid JSON data received: ' . $jsonError);
    }
    
    // Validate required fields
    if (empty($data['email']) || empty($data['fullName'])) {
        file_put_contents($logFile, "$requestTime - Missing required fields\n", FILE_APPEND);
        throw new Exception('Email and fullName are required fields.');
    }
    
    // Get the current user email (from request, session, or cookie)
    $currentEmail = isset($data['currentEmail']) ? $data['currentEmail'] : 
                   (isset($_SESSION['email']) ? $_SESSION['email'] : 
                   (isset($_SESSION['userEmail']) ? $_SESSION['userEmail'] : null));
    
    if (!$currentEmail) {
        file_put_contents($logFile, "$requestTime - No current email found in request or session\n", FILE_APPEND);
        throw new Exception('Current user email not found. Please log in again.');
    }
    
    // Log key information
    file_put_contents($logFile, "$requestTime - Current Email: $currentEmail\n", FILE_APPEND);
    file_put_contents($logFile, "$requestTime - New Email: {$data['email']}\n", FILE_APPEND);
    file_put_contents($logFile, "$requestTime - Full Name: {$data['fullName']}\n", FILE_APPEND);
    file_put_contents($logFile, "$requestTime - Email Changed: " . ($currentEmail !== $data['email'] ? 'Yes' : 'No') . "\n", FILE_APPEND);
    
    // Connect to the database
    $dbFile = __DIR__ . '/database.sqlite';
    
    // Check if db file exists and is writable
    if (!file_exists($dbFile)) {
        file_put_contents($logFile, "$requestTime - Database file not found at: $dbFile\n", FILE_APPEND);
        throw new Exception('Database file not found at: ' . $dbFile);
    }
    
    if (!is_writable($dbFile)) {
        file_put_contents($logFile, "$requestTime - Database file is not writable: $dbFile\n", FILE_APPEND);
        throw new Exception('Database file is not writable. Please check permissions.');
    }
    
    // Log database connection
    file_put_contents($logFile, "$requestTime - Connecting to database: $dbFile\n", FILE_APPEND);
    
    $pdo = new PDO("sqlite:$dbFile", null, null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);

    // Begin transaction for safety
    $pdo->beginTransaction();
    file_put_contents($logFile, "$requestTime - Transaction started\n", FILE_APPEND);
    
    // First check if this is an email update and if the new email already exists
    if ($currentEmail !== $data['email']) {
        // Check if new email already exists for a different user
        $stmt = $pdo->prepare("SELECT id, username, email FROM users WHERE email = ?");
        $stmt->execute([$data['email']]);
        $existingUserWithNewEmail = $stmt->fetch();
        
        if ($existingUserWithNewEmail) {
            file_put_contents($logFile, "$requestTime - Cannot update: email already exists for another user\n", FILE_APPEND);
            throw new Exception('Cannot update profile: another user with this email already exists.');
        }
        file_put_contents($logFile, "$requestTime - New email is available for use\n", FILE_APPEND);
    }
    
    // Try to find the user by current email
    $stmt = $pdo->prepare("SELECT id, username, email FROM users WHERE email = ?");
    $stmt->execute([$currentEmail]);
    $user = $stmt->fetch();
    file_put_contents($logFile, "$requestTime - User found by email: " . ($user ? 'Yes' : 'No') . "\n", FILE_APPEND);
    
    if (!$user && isset($_SESSION['user_id'])) {
        // If not found by email but we have a user ID, try finding by ID
        $stmt = $pdo->prepare("SELECT id, username, email FROM users WHERE id = ?");
        $stmt->execute([$_SESSION['user_id']]);
        $user = $stmt->fetch();
        file_put_contents($logFile, "$requestTime - User found by ID: " . ($user ? 'Yes' : 'No') . "\n", FILE_APPEND);
    }
    
    // Check which columns exist in the users table
    $stmt = $pdo->prepare("PRAGMA table_info(users)");
    $stmt->execute();
    $columns = $stmt->fetchAll();
    $existingColumns = array_column($columns, 'name');
    
    file_put_contents($logFile, "$requestTime - Existing columns: " . implode(", ", $existingColumns) . "\n", FILE_APPEND);
    
    // Additional profile fields to update - only include if column exists
    $additionalFields = '';
    $additionalValues = [];
    
    if (isset($data['phone']) && in_array('phone', $existingColumns)) {
        $additionalFields .= ", phone = ?";
        $additionalValues[] = $data['phone'];
        file_put_contents($logFile, "$requestTime - Including phone field in update\n", FILE_APPEND);
    }
    
    if (isset($data['company']) && in_array('company', $existingColumns)) {
        $additionalFields .= ", company = ?";
        $additionalValues[] = $data['company'];
        file_put_contents($logFile, "$requestTime - Including company field in update\n", FILE_APPEND);
    }
    
    if (isset($data['jobTitle']) && in_array('job_title', $existingColumns)) {
        $additionalFields .= ", job_title = ?";
        $additionalValues[] = $data['jobTitle'];
        file_put_contents($logFile, "$requestTime - Including job_title field in update\n", FILE_APPEND);
    }
    
    if ($user) {
        // User found - update by ID which is the most reliable
        $sql = "UPDATE users SET username = ?, email = ?{$additionalFields} WHERE id = ?";
        
        // Prepare parameter array
        $params = [$data['fullName'], $data['email']];
        $params = array_merge($params, $additionalValues);
        $params[] = $user['id'];
        
        file_put_contents($logFile, "$requestTime - Executing update: $sql\n", FILE_APPEND);
        file_put_contents($logFile, "$requestTime - User ID: {$user['id']}\n", FILE_APPEND);
        
        try {
            $stmt = $pdo->prepare($sql);
            $result = $stmt->execute($params);
            
            file_put_contents($logFile, "$requestTime - Update result: " . ($result ? 'success' : 'failed') . "\n", FILE_APPEND);
            file_put_contents($logFile, "$requestTime - Rows affected: " . $stmt->rowCount() . "\n", FILE_APPEND);
            
            if ($stmt->rowCount() === 0) {
                // No rows affected could mean the data is identical
                // Let's check if the user still exists
                $stmt = $pdo->prepare("SELECT id FROM users WHERE id = ?");
                $stmt->execute([$user['id']]);
                if (!$stmt->fetch()) {
                    file_put_contents($logFile, "$requestTime - User record not found after update\n", FILE_APPEND);
                    throw new Exception('User record was not found after update attempt.');
                }
                
                file_put_contents($logFile, "$requestTime - No rows affected, but user exists. Likely unchanged data.\n", FILE_APPEND);
            }
        } catch (PDOException $e) {
            file_put_contents($logFile, "$requestTime - Database error during update: " . $e->getMessage() . "\n", FILE_APPEND);
            throw $e;
        }
    } else {
        // User not found - create a new one
        $sql = "INSERT INTO users (username, email, password";
        $valuesSql = "VALUES (?, ?, ?";
        $params = [$data['fullName'], $data['email'], password_hash('default_password', PASSWORD_DEFAULT)];
        
        // Add additional fields if present AND column exists
        if (isset($data['phone']) && in_array('phone', $existingColumns)) {
            $sql .= ", phone";
            $valuesSql .= ", ?";
            $params[] = $data['phone'];
        }
        
        if (isset($data['company']) && in_array('company', $existingColumns)) {
            $sql .= ", company";
            $valuesSql .= ", ?";
            $params[] = $data['company'];
        }
        
        if (isset($data['jobTitle']) && in_array('job_title', $existingColumns)) {
            $sql .= ", job_title";
            $valuesSql .= ", ?";
            $params[] = $data['jobTitle'];
        }
        
        $sql .= ") " . $valuesSql . ")";
        
        file_put_contents($logFile, "$requestTime - Creating new user: $sql\n", FILE_APPEND);
        
        try {
            $stmt = $pdo->prepare($sql);
            $result = $stmt->execute($params);
            
            file_put_contents($logFile, "$requestTime - Insert result: " . ($result ? 'success' : 'failed') . "\n", FILE_APPEND);
            
            if ($stmt->rowCount() === 0) {
                file_put_contents($logFile, "$requestTime - Failed to create user in database\n", FILE_APPEND);
                throw new Exception('Failed to create user in database.');
            }
            
            // Store new user ID in session
            $_SESSION['user_id'] = $pdo->lastInsertId();
            file_put_contents($logFile, "$requestTime - New user created with ID: {$_SESSION['user_id']}\n", FILE_APPEND);
        } catch (PDOException $e) {
            file_put_contents($logFile, "$requestTime - Database error during insert: " . $e->getMessage() . "\n", FILE_APPEND);
            throw $e;
        }
    }
    
    // Update session data with new email and username
    $_SESSION['email'] = $data['email'];
    $_SESSION['userEmail'] = $data['email'];
    $_SESSION['userName'] = $data['fullName'];
    
    // Update other profile fields in session if available
    if (isset($data['phone'])) {
        $_SESSION['userPhone'] = $data['phone'];
    }
    
    if (isset($data['company'])) {
        $_SESSION['userCompany'] = $data['company'];
    }
    
    if (isset($data['jobTitle'])) {
        $_SESSION['userJobTitle'] = $data['jobTitle'];
    }
    
    // Commit the transaction
    $pdo->commit();
    file_put_contents($logFile, "$requestTime - Transaction committed successfully\n", FILE_APPEND);
    
    // Update response
    $response['success'] = true;
    $response['message'] = 'Profile updated successfully.';
    $response['user'] = [
        'id' => isset($user['id']) ? $user['id'] : $_SESSION['user_id'],
        'username' => $data['fullName'],
        'email' => $data['email'],
        'phone' => isset($data['phone']) ? $data['phone'] : null,
        'company' => isset($data['company']) ? $data['company'] : null,
        'jobTitle' => isset($data['jobTitle']) ? $data['jobTitle'] : null
    ];
    
    file_put_contents($logFile, "$requestTime - Profile update successful!\n", FILE_APPEND);
    
} catch (Exception $e) {
    // Rollback transaction if active
    if (isset($pdo) && $pdo->inTransaction()) {
        $pdo->rollBack();
        file_put_contents($logFile, "$requestTime - Transaction rolled back\n", FILE_APPEND);
    }
    
    $response['success'] = false;
    $response['message'] = 'Error: ' . $e->getMessage();
    $response['debug']['error'] = $e->getMessage();
    $response['debug']['trace'] = $e->getTraceAsString();
    
    file_put_contents($logFile, "$requestTime - Error: " . $e->getMessage() . "\n", FILE_APPEND);
    file_put_contents($logFile, "$requestTime - Trace: " . $e->getTraceAsString() . "\n", FILE_APPEND);
}

// Ensure no unexpected output before JSON
if (ob_get_length()) ob_clean();

// Return JSON response
file_put_contents($logFile, "$requestTime - Returning response: " . json_encode($response) . "\n", FILE_APPEND);
file_put_contents($logFile, "$requestTime - REQUEST COMPLETED\n\n", FILE_APPEND);

echo json_encode($response); 