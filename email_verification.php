<?php
/**
 * Email Verification System
 * This script handles sending verification emails to verify Gmail addresses
 */

// Set headers for AJAX response
header('Content-Type: application/json');

// Check if it's an AJAX request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

// Get action from request
$action = isset($_POST['action']) ? $_POST['action'] : '';

if ($action !== 'sendVerification') {
    echo json_encode(['success' => false, 'message' => 'Invalid action']);
    exit;
}

// Get email and verification code
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$code = isset($_POST['code']) ? trim($_POST['code']) : '';

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit;
}

// Check if it's a Gmail address
if (!preg_match('/@gmail\.com$/i', $email)) {
    echo json_encode(['success' => false, 'message' => 'Only Gmail addresses are allowed']);
    exit;
}

// Check if code is valid
if (empty($code) || !is_numeric($code) || strlen($code) !== 6) {
    echo json_encode(['success' => false, 'message' => 'Invalid verification code']);
    exit;
}

// Try to send verification email
$emailSent = sendVerificationEmail($email, $code);

if ($emailSent) {
    echo json_encode(['success' => true, 'message' => 'Verification email sent successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to send verification email']);
}

/**
 * Send verification email to the user
 * 
 * @param string $email The recipient email address
 * @param string $code The verification code
 * @return bool Whether the email was sent successfully
 */
function sendVerificationEmail($email, $code) {
    // Require PHPMailer
    require 'vendor/autoload.php';
    
    // Create a new PHPMailer instance
    $mail = new PHPMailer\PHPMailer\PHPMailer(true);
    
    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'your-email@gmail.com'; // YOUR GMAIL ADDRESS
        $mail->Password = 'your-app-password'; // YOUR APP PASSWORD (not your regular Gmail password)
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;
        
        // Set sender and recipient
        $mail->setFrom('your-email@gmail.com', 'GRC Portal');
        $mail->addAddress($email);
        
        // Content
        $mail->isHTML(true);
        $mail->Subject = 'Your GRC Portal Verification Code';
        
        // Build email content
        $emailContent = '
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h1 style="color: #2c3e50; margin-bottom: 5px;">GRC Portal</h1>
                    <p style="color: #7f8c8d; margin-top: 0;">Email Verification</p>
                </div>
                
                <div style="background-color: #f7f9fb; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
                    <h2 style="color: #2980b9; margin-top: 0;">Your Verification Code</h2>
                    <div style="background-color: #ffffff; padding: 15px; border-radius: 4px; text-align: center; font-size: 24px; letter-spacing: 5px; font-weight: bold; color: #2c3e50; border: 1px dashed #bdc3c7;">' . $code . '</div>
                    <p style="margin-top: 15px; color: #7f8c8d;">This code will expire in 5 minutes.</p>
                </div>
                
                <p style="margin-bottom: 20px; color: #34495e;">Please enter this code in the verification window to continue with your sign-in process.</p>
                
                <p style="color: #7f8c8d; font-size: 12px; text-align: center; margin-top: 30px;">
                    If you did not request this code, please ignore this email.
                </p>
            </div>
        ';
        
        $mail->Body = $emailContent;
        $mail->AltBody = "Your GRC Portal verification code is: $code\nThis code will expire in 5 minutes.";
        
        // Send email
        $mail->send();
        
        // Log successful sending
        error_log("Verification email sent to $email with code $code");
        
        return true;
    } catch (Exception $e) {
        // Log error
        error_log("Failed to send verification email: {$mail->ErrorInfo}");
        return false;
    }
} 