<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Start session
session_start();

header('Content-Type: application/json');

// Get all session data
$sessionData = $_SESSION;

// Return diagnostic data
echo json_encode([
    'success' => true,
    'session' => $sessionData,
    'session_id' => session_id(),
    'cookies' => $_COOKIE,
    'server' => [
        'remote_addr' => $_SERVER['REMOTE_ADDR'],
        'php_self' => $_SERVER['PHP_SELF'],
        'script_name' => $_SERVER['SCRIPT_NAME'],
        'request_uri' => $_SERVER['REQUEST_URI'],
        'request_method' => $_SERVER['REQUEST_METHOD'],
        'http_referer' => $_SERVER['HTTP_REFERER'] ?? 'not set'
    ],
    'session_info' => [
        'name' => session_name(),
        'path' => ini_get('session.save_path'),
        'cookie_params' => session_get_cookie_params()
    ],
    'time' => date('Y-m-d H:i:s'),
    'php_version' => PHP_VERSION
]); 