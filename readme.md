# 🌍 GlobeTrotter - Smart Travel Itinerary Planner

**GlobeTrotter** is a full-stack web application designed to help travelers plan multi-city trips, estimate budgets, and generate day-wise itineraries automatically. It features a modern, glassmorphism UI and a secure PHP/MySQL backend.

---

## 👥 Collaborators

This project was a collaborative effort built by:

* **[Your Name]** - *Lead Developer*
* **[Mentor Name]** - *Project Mentor & Collaborator*

---

## 🚀 Key Features

* **🔐 User Authentication:** Secure Login and Signup with session management.
* **📊 Interactive Dashboard:** View recent trips and manage your travel history.
* **✈️ Multi-City Trip Planner:** Add multiple stops (cities) to a single trip to build complex routes.
* **🗓️ Auto-Itinerary Generator:** Automatically distributes your stay duration across selected cities.
* **💰 Smart Budget Estimator:** Visualizes costs (Travel vs. Stay vs. Activities) using dynamic Pie Charts.
* **🎯 Activity Selection:** Choose interests like Trekking, Food Tours, or Beach Relaxation to customize plans.
* **🏨 Booking Simulation:** Demonstrated UI for searching Flights and Hotels with reservation simulation.
* **👤 Profile Management:** Update user preferences, change language settings, or delete account.
* **📤 Social Sharing:** Generate unique links to share trip plans with friends.

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3 (Glassmorphism), JavaScript (Vanilla ES6)
* **Backend:** PHP (Native)
* **Database:** MySQL (Relational)
* **Server Environment:** XAMPP / Apache

---

## 📂 Project Structure

```text
/globetrotter
│
├── api/                  # Backend Logic (JSON APIs)
│   ├── db_connect.php    # Database Connection
│   ├── login.php         # Auth Logic
│   ├── save_trip.php     # Trip Saving Logic
│   └── get_trips.php     # Fetch Dashboard Data
│
├── assets/               # Static Assets
│   ├── style.css         # Main Stylesheet
│   └── script.js         # Frontend Logic & Fetch Calls
│
├── index.php             # Login Page (Entry Point)
├── signup.php            # Registration Page
├── dashboard.php         # User Dashboard
├── plan_trip.php         # Trip Planner Interface
├── itinerary.php         # Itinerary View
├── activities.php        # Activity Selection
├── budget.php            # Cost Analysis
├── booking.php           # Flight & Hotel Search
├── profile.php           # User Settings
└── globetrotter_db.sql   # Database Import File

⚙️ Installation & Setup
Prerequisites
XAMPP (or WAMP/MAMP) installed on your machine.

A modern web browser.

Step 1: Clone the Repository
Move the project folder into your local server directory (usually htdocs).

Bash
cd C:\xampp\htdocs
git clone [https://github.com/your-username/globetrotter.git](https://github.com/your-username/globetrotter.git)

Step 2: Database Configuration
Open XAMPP Control Panel and start Apache and MySQL.

Go to http://localhost/phpmyadmin.

Create a new database named globetrotter_db.

Import the provided SQL file:

Click the Import tab.

Choose the file globetrotter_db.sql (located in the root directory).

Click Go.

Step 3: Run the Application
Open your browser.

Navigate to: http://localhost/globetrotter/index.php

Here is the complete and final README.md file. You can copy the entire block below and paste it directly into your GitHub repository.

Markdown

# 🌍 GlobeTrotter - Smart Travel Itinerary Planner

**GlobeTrotter** is a full-stack web application designed to help travelers plan multi-city trips, estimate budgets, and generate day-wise itineraries automatically. It features a modern, glassmorphism UI and a secure PHP/MySQL backend.

---

## 👥 Collaborators

This project was a collaborative effort built by:

* **[Your Name]** - *Lead Developer*
* **[Mentor Name]** - *Project Mentor & Collaborator*

---

## 🚀 Key Features

* **🔐 User Authentication:** Secure Login and Signup with session management.
* **📊 Interactive Dashboard:** View recent trips and manage your travel history.
* **✈️ Multi-City Trip Planner:** Add multiple stops (cities) to a single trip to build complex routes.
* **🗓️ Auto-Itinerary Generator:** Automatically distributes your stay duration across selected cities.
* **💰 Smart Budget Estimator:** Visualizes costs (Travel vs. Stay vs. Activities) using dynamic Pie Charts.
* **🎯 Activity Selection:** Choose interests like Trekking, Food Tours, or Beach Relaxation to customize plans.
* **🏨 Booking Simulation:** Demonstrated UI for searching Flights and Hotels with reservation simulation.
* **👤 Profile Management:** Update user preferences, change language settings, or delete account.
* **📤 Social Sharing:** Generate unique links to share trip plans with friends.

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3 (Glassmorphism), JavaScript (Vanilla ES6)
* **Backend:** PHP (Native)
* **Database:** MySQL (Relational)
* **Server Environment:** XAMPP / Apache

---

## 📂 Project Structure

```text
/globetrotter
│
├── api/                  # Backend Logic (JSON APIs)
│   ├── db_connect.php    # Database Connection
│   ├── login.php         # Auth Logic
│   ├── save_trip.php     # Trip Saving Logic
│   └── get_trips.php     # Fetch Dashboard Data
│
├── assets/               # Static Assets
│   ├── style.css         # Main Stylesheet
│   └── script.js         # Frontend Logic & Fetch Calls
│
├── index.php             # Login Page (Entry Point)
├── signup.php            # Registration Page
├── dashboard.php         # User Dashboard
├── plan_trip.php         # Trip Planner Interface
├── itinerary.php         # Itinerary View
├── activities.php        # Activity Selection
├── budget.php            # Cost Analysis
├── booking.php           # Flight & Hotel Search
├── profile.php           # User Settings
└── globetrotter_db.sql   # Database Import File
⚙️ Installation & Setup
Prerequisites
XAMPP (or WAMP/MAMP) installed on your machine.

A modern web browser.

Step 1: Clone the Repository
Move the project folder into your local server directory (usually htdocs).

Bash

cd C:\xampp\htdocs
git clone [https://github.com/your-username/globetrotter.git](https://github.com/your-username/globetrotter.git)
Step 2: Database Configuration
Open XAMPP Control Panel and start Apache and MySQL.

Go to http://localhost/phpmyadmin.

Create a new database named globetrotter_db.

Import the provided SQL file:

Click the Import tab.

Choose the file globetrotter_db.sql (located in the root directory).

Click Go.

Step 3: Run the Application
Open your browser.

Navigate to: http://localhost/globetrotter/index.php

🧪 Testing Credentials
You can create a new account via the Signup page, or use the default test user if you imported the SQL provided:

Email: test@gmail.com

Password: test

🔮 Future Enhancements
Integration with real-time Flight/Hotel APIs (Skyscanner/Amadeus).

Google Maps integration for visualizing stops.

PDF Export for itineraries.

📝 License
This project is open-source and available for educational purposes.