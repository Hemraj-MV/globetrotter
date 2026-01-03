<?php
header("Content-Type: application/json");
require 'db_connect.php';

$data = json_decode(file_get_contents("php://input"), true);

$userId = $data['userId'];
$name = $data['name'];
$desc = $data['description'];
$start = $data['startDate'];
$end = $data['endDate'];
$days = $data['days'];
$budget = $data['budget'];
$stops = $data['stops']; // This is an array of cities (e.g., ["Paris", "London"])

// 1. Insert the main Trip info
$sql = "INSERT INTO trips (user_id, name, description, start_date, end_date, days, budget) 
        VALUES ('$userId', '$name', '$desc', '$start', '$end', '$days', '$budget')";

if ($conn->query($sql) === TRUE) {
    $tripId = $conn->insert_id; // Get the ID of the trip we just created

    // 2. Insert each Stop for this trip
    if (!empty($stops)) {
        foreach ($stops as $city) {
            $city = $conn->real_escape_string($city); // Security: clean text
            $stopSql = "INSERT INTO stops (trip_id, city) VALUES ('$tripId', '$city')";
            $conn->query($stopSql);
        }
    }

    echo json_encode(["status" => "success", "tripId" => $tripId]);
} else {
    echo json_encode(["status" => "error", "message" => "Database Error: " . $conn->error]);
}

$conn->close();
?>