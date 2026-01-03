<?php
session_start();
// Security Check: Redirect to login if user is not authenticated
if (!isset($_SESSION['user_id'])) {
    header("Location: index.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>GlobeTrotter | Itinerary</title>
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>

  <div class="overlay"></div>

  <div class="app-container">

    <header class="glass dashboard-header">
      <h1>🗓️ Your Trip Itinerary</h1>
      <p class="subtitle">Day-wise travel plan generated for you</p>
    </header>

    <section>
      <h2 class="section-title">Planned Days</h2>

      <div id="itineraryContainer" class="card-grid">
        </div>
    </section>

    <section style="margin-top: 40px; text-align: center;">
      <button class="secondary-btn" onclick="goToActivities()">
        Select Activities
      </button>
    </section>

  </div>

  <script src="assets/script.js"></script>
</body>
</html>