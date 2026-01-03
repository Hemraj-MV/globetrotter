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
  <title>GlobeTrotter | Login</title>
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>

  <div class="overlay"></div>

  <div class="login-container">
    <div class="login-card">
      <h1>🌍 GlobeTrotter</h1>
      <p class="tagline">Your smart travel companion</p>

      <form onsubmit="login(event)">
        <div class="input-group">
          <input type="email" id="email" placeholder="Email address" required>
        </div>

        <div class="input-group">
          <input type="password" id="password" placeholder="Password" required>
        </div>
        
        <div style="text-align: right; margin-bottom: 20px; font-size: 13px;">
          <a href="#" onclick="alert('Reset link sent!')" style="color: #00c6ff; text-decoration: none;">Forgot Password?</a>
        </div>

        <button type="submit" class="primary-btn">
          Login
        </button>

        <div class="or-text">or</div>

        <button type="button" class="secondary-btn" onclick="guestLogin()">
          Continue as Guest
        </button>
      </form>

      <p class="footer">
        New user? <a href="signup.php">Create an account</a>
      </p>
    </div>
  </div>

  <script src="assets/script.js"></script>
</body>
</html>