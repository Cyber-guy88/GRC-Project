<?php
// email_validator.php - Secure server-side email validation using Abstract API

header('Content-Type: application/json');

// Get email from POST data
$email = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_SANITIZE_EMAIL) : '';

if (empty($email)) {
    echo json_encode(['valid' => false, 'message' => 'Email is required']);
    exit;
}

// Abstract API key
$apiKey = '309bf9976ae344829a87718d42df2dea';
$apiUrl = "https://emailvalidation.abstractapi.com/v1/?api_key={$apiKey}&email={$email}";

// Make request to Abstract API
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$response = curl_exec($ch);
$error = curl_error($ch);
curl_close($ch);

if ($error) {
    // Log error but don't expose details to client
    error_log("Abstract API Error: $error");
    echo json_encode(['valid' => false, 'message' => 'Validation service unavailable']);
    exit;
}

$data = json_decode($response, true);

// For debugging
if (!$data) {
    echo json_encode(['valid' => false, 'message' => 'Invalid response from validation service']);
    exit;
}

// Process validation results
$isValid = isset($data['deliverability']) && $data['deliverability'] === 'DELIVERABLE';
$isDisposable = isset($data['is_disposable_email']['value']) && $data['is_disposable_email']['value'] === true;
$qualityScore = isset($data['quality_score']) ? $data['quality_score'] : 0;

$result = [
    'valid' => $isValid && !$isDisposable && $qualityScore >= 0.7,
    'message' => ''
];

// Add specific error messages
if (!$isValid) {
    $result['message'] = 'This email address appears to be invalid or undeliverable';
} elseif ($isDisposable) {
    $result['message'] = 'Disposable email addresses are not allowed';
} elseif ($qualityScore < 0.7) {
    $result['message'] = 'This email address has a low quality score and may not be reliable';
}

echo json_encode($result); 