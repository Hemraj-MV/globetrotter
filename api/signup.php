<?php
header("Content-Type: application/json");
require 'db_connect.php';

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'];
$email = $data['email'];
$password = $data['password']; 

// Check if email already exists
$checkSql = "SELECT * FROM users WHERE email='$email'";
$checkResult = $conn->query($checkSql);

if ($checkResult->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Email already registered"]);
} else {
    $sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "User registered"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
    }
}

$conn->close();
?>