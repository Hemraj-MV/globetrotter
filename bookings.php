<?php
session_start();
// Security Check
if (!isset($_SESSION['user_id'])) {
    header("Location: index.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>GlobeTrotter | Bookings</title>
  <link rel="stylesheet" href="assets/style.css">
  <style>
    /* Specific styles for Booking Tabs */
    .tab-container {
      display: flex;
      gap: 15px;
      margin-bottom: 20px;
    }
    .tab-btn {
      flex: 1;
      padding: 15px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
      cursor: pointer;
      border-radius: 10px;
      font-size: 16px;
      transition: all 0.3s ease;
    }
    .tab-btn.active {
      background: #00c6ff; /* Active color */
      border-color: #00c6ff;
      font-weight: bold;
    }
    .result-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      margin-bottom: 15px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
    }
    .price-tag {
      font-size: 20px;
      font-weight: bold;
      color: #00c6ff;
    }
  </style>
</head>
<body>

  <div class="overlay"></div>

  <div class="app-container">

    <header class="glass dashboard-header" style="display: flex; justify-content: space-between; align-items: center;">
      <button class="secondary-btn" style="width: auto; padding: 10px 20px;" onclick="window.location.href='dashboard.php'">
        ← Back to Dashboard
      </button>
      <h1>✈️ Flights & Hotels</h1>
      <div style="width: 50px;"></div>
    </header>

    <section class="glass form-card">
      
      <div class="tab-container">
        <button class="tab-btn active" id="btnFlight" onclick="switchTab('flight')">✈️ Find Flights</button>
        <button class="tab-btn" id="btnHotel" onclick="switchTab('hotel')">🏨 Find Hotels</button>
      </div>

      <div id="flightForm">
        <div class="form-group-row">
          <div class="form-group">
            <label>From</label>
            <input type="text" id="flightFrom" placeholder="City or Airport">
          </div>
          <div class="form-group">
            <label>To</label>
            <input type="text" id="flightTo" placeholder="City or Airport">
          </div>
        </div>
        <div class="form-group">
           <label>Date</label>
           <input type="date">
        </div>
        <button class="primary-btn" onclick="searchFlights()">Search Flights</button>
      </div>

      <div id="hotelForm" style="display: none;">
        <div class="form-group">
            <label>Destination</label>
            <input type="text" id="hotelLoc" placeholder="City, Region or Hotel">
        </div>
        <div class="form-group-row">
          <div class="form-group">
            <label>Check-in</label>
            <input type="date">
          </div>
          <div class="form-group">
            <label>Check-out</label>
            <input type="date">
          </div>
        </div>
        <button class="primary-btn" onclick="searchHotels()">Search Hotels</button>
      </div>

    </section>

    <section id="resultsSection" style="margin-top: 30px; display: none;">
      <h2 class="section-title">Best Options For You</h2>
      <div id="resultsGrid">
        </div>
    </section>

  </div>

  <script src="assets/script.js"></script>
  <script>
    // Simple inline script for Tab Switching (UI logic)
    function switchTab(type) {
      document.getElementById('flightForm').style.display = (type === 'flight') ? 'block' : 'none';
      document.getElementById('hotelForm').style.display = (type === 'hotel') ? 'block' : 'none';
      
      document.getElementById('btnFlight').className = (type === 'flight') ? 'tab-btn active' : 'tab-btn';
      document.getElementById('btnHotel').className = (type === 'hotel') ? 'tab-btn active' : 'tab-btn';
      
      document.getElementById('resultsSection').style.display = 'none'; // Hide results on tab switch
    }
  </script>
</body>
</html>