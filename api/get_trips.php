<?php
header("Content-Type: application/json");
require 'db_connect.php';

$userId = $_GET['user_id'];

// Get all trips for this user, newest first
$sql = "SELECT * FROM trips WHERE user_id='$userId' ORDER BY created_at DESC";
$result = $conn->query($sql);

$trips = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $tripId = $row['id'];
        
        // Fetch the stops (cities) for this specific trip
        $stopSql = "SELECT city FROM stops WHERE trip_id='$tripId'";
        $stopResult = $conn->query($stopSql);
        
        $stops = [];
        while($stop = $stopResult->fetch_assoc()) {
            $stops[] = $stop['city'];
        }

        // Add the stops array to the trip object
        $row['stops'] = $stops;
        $trips[] = $row;
    }
}

echo json_encode($trips);

$conn->close();
?>