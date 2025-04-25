<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

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

try {
    // Get the email parameter
    $email = isset($_GET['email']) ? $_GET['email'] : null;
    
    if (!$email) {
        throw new Exception('Email parameter is required');
    }
    
    // Log the request
    file_put_contents('profile_debug.log', date('Y-m-d H:i:s') . ' - Fix profile request for: ' . $email . "\n", FILE_APPEND);
    
    // Connect to the database
    $dbFile = __DIR__ . '/database.sqlite';
    if (!file_exists($dbFile)) {
        throw new Exception('Database file not found at: ' . $dbFile);
    }
    
    $pdo = new PDO("sqlite:$dbFile", null, null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
    
    // Find the user by email
    $stmt = $pdo->prepare("SELECT id, username, email, phone, company, job_title FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    
    if ($user) {
        // User found in database
        $response['success'] = true;
        $response['message'] = 'User found';
        $response['user'] = [
            'id' => $user['id'],
            'username' => $user['username'],
            'email' => $user['email'],
            'phone' => $user['phone'] ?? '',
            'company' => $user['company'] ?? '',
            'jobTitle' => $user['job_title'] ?? ''
        ];
        
        // Also update the session with this data
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['email'] = $user['email'];
        $_SESSION['userEmail'] = $user['email'];
        $_SESSION['userName'] = $user['username'];
        
        if (isset($user['phone'])) {
            $_SESSION['userPhone'] = $user['phone'];
        }
        
        if (isset($user['company'])) {
            $_SESSION['userCompany'] = $user['company'];
        }
        
        if (isset($user['job_title'])) {
            $_SESSION['userJobTitle'] = $user['job_title'];
        }
        
        file_put_contents('profile_debug.log', date('Y-m-d H:i:s') . ' - User found in database: ' . $user['username'] . "\n", FILE_APPEND);
    } else {
        // If user wasn't found by email, try to find them by session user_id
        if (isset($_SESSION['user_id'])) {
            $stmt = $pdo->prepare("SELECT id, username, email, phone, company, job_title FROM users WHERE id = ?");
            $stmt->execute([$_SESSION['user_id']]);
            $user = $stmt->fetch();
            
            if ($user) {
                $response['success'] = true;
                $response['message'] = 'User found by ID';
                $response['user'] = [
                    'id' => $user['id'],
                    'username' => $user['username'],
                    'email' => $user['email'],
                    'phone' => $user['phone'] ?? '',
                    'company' => $user['company'] ?? '',
                    'jobTitle' => $user['job_title'] ?? ''
                ];
                
                // Update session with this data
                $_SESSION['email'] = $user['email'];
                $_SESSION['userEmail'] = $user['email'];
                $_SESSION['userName'] = $user['username'];
                
                if (isset($user['phone'])) {
                    $_SESSION['userPhone'] = $user['phone'];
                }
                
                if (isset($user['company'])) {
                    $_SESSION['userCompany'] = $user['company'];
                }
                
                if (isset($user['job_title'])) {
                    $_SESSION['userJobTitle'] = $user['job_title'];
                }
                
                file_put_contents('profile_debug.log', date('Y-m-d H:i:s') . ' - User found by ID: ' . $user['username'] . "\n", FILE_APPEND);
            } else {
                $response['message'] = 'User not found';
                file_put_contents('profile_debug.log', date('Y-m-d H:i:s') . ' - User not found in database for email: ' . $email . "\n", FILE_APPEND);
            }
        } else {
            $response['message'] = 'User not found and no session ID available';
            file_put_contents('profile_debug.log', date('Y-m-d H:i:s') . ' - User not found in database for email: ' . $email . "\n", FILE_APPEND);
        }
    }
    
} catch (Exception $e) {
    $response['success'] = false;
    $response['message'] = 'Error: ' . $e->getMessage();
    $response['debug']['error'] = $e->getMessage();
    $response['debug']['trace'] = $e->getTraceAsString();
    
    file_put_contents('profile_debug.log', date('Y-m-d H:i:s') . ' - Error in fix_profile: ' . $e->getMessage() . "\n", FILE_APPEND);
}

// Return JSON response
echo json_encode($response); 