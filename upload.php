<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json'); // Ensure response is JSON

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['fileToUpload'])) {

    $target_dir = __DIR__ . "/pycharm_pro/uploads/";

    // Ensure the uploads directory exists
    if (!is_dir($target_dir)) {
        mkdir($target_dir, 0777, true);
    }

    $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);

    // Move the uploaded file
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        
        // ✅ Check OS and use appropriate Python command
        $python_command = strtoupper(substr(PHP_OS, 0, 3)) === 'WIN' ? 'python' : 'python3';
        $command = "$python_command pycharm_pro/demo.py " . escapeshellarg($target_file) . " 2>&1";

        // Execute the script and capture output
        $output = shell_exec($command);

        if ($output === null) {
            echo json_encode(["success" => false, "message" => "Failed to execute Python script."]);
            exit;
        }

        // Trim output for cleaner response
        $output = trim($output);

        // Return JSON response
        echo json_encode(["success" => true, "score" => $output]);
    } else {
        echo json_encode(["success" => false, "message" => "Error uploading file."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request."]);
}
?>
