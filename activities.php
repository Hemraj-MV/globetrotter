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
  <title>GlobeTrotter | Activities</title>
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>

  <div class="overlay"></div>

  <div class="app-container">

    <header class="glass dashboard-header">
      <h1>🎯 Select Activities</h1>
      <p class="subtitle">Choose activities you’d like to include in your trip</p>
    </header>

    <section>
      <h2 class="section-title">Available Activities</h2>

      <div class="card-grid">

        <div class="trip-card glass">
          <h3>🏖 Beach Relaxation</h3>
          <p>Enjoy beaches and sunset views</p>
          <label style="cursor: pointer; display: block; margin-top: 10px;">
            <input type="checkbox" value="Beach Relaxation">
            <span style="margin-left: 8px;">Add Activity</span>
          </label>
        </div>

        <div class="trip-card glass">
          <h3>🥾 Trekking</h3>
          <p>Adventure trails and scenic hikes</p>
          <label style="cursor: pointer; display: block; margin-top: 10px;">
            <input type="checkbox" value="Trekking">
            <span style="margin-left: 8px;">Add Activity</span>
          </label>
        </div>

        <div class="trip-card glass">
          <h3>🍴 Local Food Tour</h3>
          <p>Explore local cuisine and street food</p>
          <label style="cursor: pointer; display: block; margin-top: 10px;">
            <input type="checkbox" value="Food Tour">
            <span style="margin-left: 8px;">Add Activity</span>
          </label>
        </div>

        <div class="trip-card glass">
          <h3>🛕 Temple Visit</h3>
          <p>Spiritual and cultural experience</p>
          <label style="cursor: pointer; display: block; margin-top: 10px;">
            <input type="checkbox" value="Temple Visit">
            <span style="margin-left: 8px;">Add Activity</span>
          </label>
        </div>

        <div class="trip-card glass">
          <h3>🚤 Water Sports</h3>
          <p>Jet ski, boating and water fun</p>
          <label style="cursor: pointer; display: block; margin-top: 10px;">
            <input type="checkbox" value="Water Sports">
            <span style="margin-left: 8px;">Add Activity</span>
          </label>
        </div>

        <div class="trip-card glass">
          <h3>📸 Sightseeing</h3>
          <p>Explore famous attractions</p>
          <label style="cursor: pointer; display: block; margin-top: 10px;">
            <input type="checkbox" value="Sightseeing">
            <span style="margin-left: 8px;">Add Activity</span>
          </label>
        </div>

      </div>
    </section>

    <section style="margin-top: 40px; text-align: center;">
      <button class="primary-btn" onclick="saveActivities()">
        Continue to Budget
      </button>
    </section>

  </div>

  <script src="assets/script.js"></script>
</body>
</html>