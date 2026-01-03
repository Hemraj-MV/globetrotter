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
  <title>GlobeTrotter | Profile</title>
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>

  <div class="overlay"></div>

  <div class="app-container">

    <header class="glass dashboard-header" style="display: flex; justify-content: space-between; align-items: center;">
      <button class="secondary-btn" style="width: auto; padding: 10px 20px;" onclick="window.location.href='dashboard.php'">
        ← Back
      </button>
      <h1>👤 User Settings</h1>
      <div style="width: 100px;"></div>
    </header>

    <section class="glass form-card">
      <div class="form-group">
        <label>Full Name</label>
        <input type="text" id="profileName" value="Traveler One">
      </div>

      <div class="form-group">
        <label>Email Address</label>
        <input type="email" id="profileEmail" value="user@example.com" disabled style="opacity: 0.7;">
      </div>

      <div class="form-group">
        <label>Language Preference</label>
        <select id="profileLanguage">
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="Hindi">Hindi</option>
        </select>
      </div>

      <div class="form-group">
        <label>Preferred Currency</label>
        <select id="profileCurrency">
          <option value="INR">INR (₹)</option>
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
        </select>
      </div>

      <div style="display: flex; gap: 15px; margin-top: 30px; flex-wrap: wrap;">
        <button class="primary-btn" onclick="saveProfile()" style="flex: 2;">
          Save Changes
        </button>
        <button class="secondary-btn" onclick="logout()" style="flex: 1;">
          Logout
        </button>
      </div>

      <div style="margin-top: 20px; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 20px;">
        <button class="secondary-btn" style="background: rgba(255, 0, 0, 0.2); border-color: rgba(255,0,0,0.4); width: 100%;" onclick="deleteAccount()">
          Delete Account
        </button>
      </div>

    </section>

  </div>

  <script src="assets/script.js"></script>
</body>
</html>