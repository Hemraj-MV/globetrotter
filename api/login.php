<?php
session_start(); // <--- CRITICAL FIX
header("Content-Type: application/json");
require 'db_connect.php';

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'];
$password = $data['password'];

$sql = "SELECT * FROM users WHERE email='$email' AND password='$password'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    
    // <--- CRITICAL FIX: Save User to Session
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['name'] = $user['name'];
    
    echo json_encode(["status" => "success", "user" => $user]);
} else {
    echo json_encode(["status" => "error", "message" => "Invalid credentials"]);
}

$conn->close();
?>