<?php
// Start session to check if user is already logged in
session_start();
if (isset($_SESSION['user_id'])) {
    header("Location: dashboard.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>GlobeTrotter | Sign Up</title>
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>

  <div class="overlay"></div>

  <div class="login-container">
    <div class="login-card">
      <h1>🌍 Join Us</h1>
      <p class="tagline">Start your journey today</p>

      <form onsubmit="signup(event)">
        <div class="input-group">
          <input type="text" id="newName" placeholder="Full Name" required>
        </div>
        
        <div class="input-group">
          <input type="email" id="newEmail" placeholder="Email address" required>
        </div>

        <div class="input-group">
          <input type="password" id="newPassword" placeholder="Create Password" required>
        </div>

        <button type="submit" class="primary-btn">
          Sign Up
        </button>
      </form>

      <p class="footer">
        Already have an account? <a href="index.php">Login here</a>
      </p>
    </div>
  </div>

  <script src="assets/script.js"></script>
</body>
</html>