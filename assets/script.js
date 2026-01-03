/* =========================
   AUTH (Connected to PHP)
========================= */

async function login(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch('api/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if(data.status === "success") {
      // Store user info in localStorage for easy access to Name/ID in JS
      localStorage.setItem("user", JSON.stringify(data.user)); 
      window.location.href = "dashboard.php";
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Login failed. Check console.");
  }
}

async function signup(event) {
  event.preventDefault();
  const name = document.getElementById("newName").value;
  const email = document.getElementById("newEmail").value;
  const password = document.getElementById("newPassword").value;

  try {
    const response = await fetch('api/signup.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();
    
    if(data.status === "success") {
      alert("Account created! Please login.");
      window.location.href = "index.php";
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function logout() {
  if(confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("user");
    window.location.href = "logout.php";
  }
}

/* =========================
   DASHBOARD (Fetches from DB)
========================= */

function goToPlanTrip() { window.location.href = "plan_trip.php"; }

document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;
    const user = JSON.parse(localStorage.getItem("user") || '{}');

    // 1. Dashboard Load
    if (path.includes("dashboard.php")) {
        const subtitle = document.querySelector(".subtitle");
        if(subtitle && user.name) subtitle.innerText = `Welcome back, ${user.name}`;
        
        loadDashboardTrips(user.id); // Fetch trips from DB
    }

    // 2. Auto-runners
    if(document.getElementById("itineraryContainer")) loadItinerary();
    if(document.getElementById("travelCost")) loadBudget();
});

async function loadDashboardTrips(userId) {
  const container = document.getElementById("recentTripsGrid");
  if (!container || !userId) return;
  
  container.innerHTML = "<p style='grid-column:1/-1; text-align:center;'>Loading trips from database...</p>";

  try {
    const response = await fetch(`api/get_trips.php?user_id=${userId}`);
    const trips = await response.json();

    container.innerHTML = "";

    if (trips.length === 0) {
      container.innerHTML = `<p style="opacity:0.7; text-align:center; grid-column: 1/-1;">No trips planned yet.</p>`;
      return;
    }

    trips.forEach((trip, index) => {
      const card = document.createElement("div");
      card.className = "trip-card glass";
      
      // Parse stops if it comes as a string or array
      let stopDisplay = "Multi-City Trip";
      if(trip.stops && Array.isArray(trip.stops)) {
          stopDisplay = trip.stops.join(", ");
      }

      const tripId = trip.name ? trip.name.replace(/\s/g, '-') : "trip-" + index;

      card.innerHTML = `
        <h3>${trip.name}</h3>
        <p style="font-size:13px; opacity:0.8; margin-bottom:5px;">${trip.start_date} - ${trip.end_date}</p>
        <p>${trip.days} Days • ${stopDisplay}</p>
        <p style="margin-bottom: 15px;">Budget: ₹${trip.budget}</p>
        <div style="display:flex; gap:10px;">
          <button class="secondary-btn" style="flex:1;" onclick="alert('Viewing functionality coming soon!')">View</button>
          <button class="secondary-btn" style="width:auto; padding:0 15px;" onclick="openShareModal('${trip.name}', '${tripId}')">📤</button>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading trips:", error);
    container.innerHTML = "<p>Error loading trips.</p>";
  }
}

/* =========================
   PLAN TRIP (MANUAL BUILDER)
========================= */

let currentStops = [];

function addStop() {
  const input = document.getElementById("cityInput");
  const city = input.value.trim();
  if (!city) return;
  currentStops.push(city);
  renderStops();
  input.value = ""; 
}

function renderStops() {
  const list = document.getElementById("stopsList");
  list.innerHTML = ""; 
  currentStops.forEach((city, index) => {
    const item = document.createElement("div");
    item.style.cssText = "background: rgba(255,255,255,0.1); padding: 10px; margin-bottom: 5px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;";
    item.innerHTML = `<span>📍 ${city}</span><button onclick="removeStop(${index})" style="background:none; border:none; color:#ff6b6b; cursor:pointer;">✕</button>`;
    list.appendChild(item);
  });
}

function removeStop(index) {
  currentStops.splice(index, 1);
  renderStops();
}

function generateTrip() {
  // Collect data
  const tripName = document.getElementById("tripName")?.value;
  const tripDesc = document.getElementById("tripDesc")?.value;
  const startDate = document.getElementById("startDate")?.value;
  const endDate = document.getElementById("endDate")?.value;
  const budget = document.getElementById("budget")?.value;

  if (!tripName || !startDate || !endDate || !budget) {
    alert("Please fill in Name, Dates, and Budget.");
    return;
  }
  if (currentStops.length === 0) {
    alert("Please add at least one city stop!");
    return;
  }

  // Calculate Days
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

  if (days < 1) { alert("Invalid dates"); return; }

  // Store in LocalStorage temporarily (for Itinerary/Budget calculation screens)
  // We only SAVE to Database at the very end (Budget Screen)
  const trip = {
    name: tripName,
    description: tripDesc,
    stops: currentStops,
    startDate: startDate,
    endDate: endDate,
    days: days,
    budget: parseInt(budget)
  };

  localStorage.setItem("trip", JSON.stringify(trip));
  window.location.href = "itinerary.php";
}

/* =========================
   ITINERARY
========================= */

function loadItinerary() {
  const trip = JSON.parse(localStorage.getItem("trip"));
  if (!trip) return;
  
  const container = document.getElementById("itineraryContainer");
  if (!container) return;

  document.querySelector("header h1").innerText = `🗓️ ${trip.name}`;
  document.querySelector("header p").innerText = trip.description || `Trip to ${trip.stops.join(", ")}`;

  container.innerHTML = "";
  let currentDate = new Date(trip.startDate);
  const stopsCount = trip.stops.length;
  const daysPerStop = Math.max(1, Math.floor(trip.days / stopsCount));
  
  let dayCounter = 1;
  
  trip.stops.forEach((city, index) => {
    let stayDuration = (index === stopsCount - 1) ? (trip.days - dayCounter + 1) : daysPerStop;

    for(let d = 0; d < stayDuration; d++) {
        if(dayCounter > trip.days) break;
        const dateStr = currentDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        
        const card = document.createElement("div");
        card.className = "trip-card glass";
        card.innerHTML = `
          <div style="display:flex; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:10px; margin-bottom:10px;">
            <h3 style="margin:0;">Day ${dayCounter}: ${city}</h3>
            <span style="font-size:12px; opacity:0.8">${dateStr}</span>
          </div>
          <p>Explore ${city} - City Tour & Local Attractions</p>
        `;
        container.appendChild(card);
        currentDate.setDate(currentDate.getDate() + 1);
        dayCounter++;
    }
  });
}

function goToActivities() { window.location.href = "activities.php"; }

/* =========================
   ACTIVITIES & BUDGET
========================= */

function saveActivities() {
  const selected = [];
  document.querySelectorAll("input[type='checkbox']:checked").forEach(cb => selected.push(cb.value));
  localStorage.setItem("activities", JSON.stringify(selected));
  window.location.href = "budget.php";
}

function loadBudget() {
  const trip = JSON.parse(localStorage.getItem("trip"));
  const activities = JSON.parse(localStorage.getItem("activities")) || [];

  if (!trip) return;

  const travelCost = Math.floor(trip.budget * 0.35);
  const stayCost = Math.floor(trip.budget * 0.45);
  const activityCost = Math.floor(trip.budget * 0.20);
  const total = travelCost + stayCost + activityCost;

  document.getElementById("travelCost").innerText = "₹" + travelCost;
  document.getElementById("stayCost").innerText = "₹" + stayCost;
  document.getElementById("activityCost").innerText = "₹" + activityCost;
  if(document.getElementById("chartTotal")) document.getElementById("chartTotal").innerText = "₹" + total;

  // Render Chart
  const chart = document.getElementById("budgetChart");
  if (chart) {
    const pTravel = (travelCost / total) * 100;
    const pStay = pTravel + (stayCost / total) * 100;
    chart.style.background = `conic-gradient(#00c6ff 0% ${pTravel}%, #bd34fe ${pTravel}% ${pStay}%, #ff9966 ${pStay}% 100%)`;
  }

  // Render Activities
  const listContainer = document.getElementById("selectedActivitiesList");
  if(listContainer) {
    listContainer.innerHTML = "";
    if(activities.length === 0) listContainer.innerHTML = "<li>No extra activities selected</li>";
    else activities.forEach(act => { const li = document.createElement("li"); li.innerText = "• " + act; listContainer.appendChild(li); });
  }

  trip.totalCost = total;
  localStorage.setItem("trip", JSON.stringify(trip));
}

/* =========================
   FINAL SAVE TO DB
========================= */

async function confirmTrip() {
  const trip = JSON.parse(localStorage.getItem("trip"));
  const user = JSON.parse(localStorage.getItem("user"));
  
  if(!trip || !user) {
    alert("Session error. Please login again.");
    return;
  }

  const payload = {
    userId: user.id,
    name: trip.name,
    description: trip.description,
    startDate: trip.startDate,
    endDate: trip.endDate,
    days: trip.days,
    budget: trip.budget,
    stops: trip.stops
  };

  try {
    const response = await fetch('api/save_trip.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const data = await response.json();

    if(data.status === "success") {
      alert("🎉 Trip Saved to Database!");
      localStorage.removeItem("trip");
      localStorage.removeItem("activities");
      window.location.href = "dashboard.php";
    } else {
      alert("Error saving trip: " + data.message);
    }
  } catch (error) {
    console.error("Save Error:", error);
    alert("Failed to save trip.");
  }
}

/* =========================
   SHARE MODAL
========================= */
function openShareModal(name, id) {
  document.getElementById("shareModal").style.display = "flex";
  document.getElementById("shareLinkInput").value = `https://globetrotter.app/share/${id}`;
}
function closeShareModal() { document.getElementById("shareModal").style.display = "none"; }
function copyShareLink() {
  const input = document.getElementById("shareLinkInput");
  input.select();
  navigator.clipboard.writeText(input.value);
  alert("Link copied!");
  closeShareModal();
}
/* =========================
   FEATURE 10: BOOKING DEMO
========================= */

function searchFlights() {
  const from = document.getElementById("flightFrom").value;
  const to = document.getElementById("flightTo").value;
  
  if(!from || !to) { alert("Please enter origin and destination"); return; }

  const resultsGrid = document.getElementById("resultsGrid");
  const section = document.getElementById("resultsSection");
  
  // 1. Show Loading State
  section.style.display = "block";
  resultsGrid.innerHTML = "<p style='text-align:center;'>🔍 Searching airlines...</p>";

  // 2. Simulate API Delay (1.5 seconds)
  setTimeout(() => {
    resultsGrid.innerHTML = ""; // Clear loader
    
    // Fake Data
    const flights = [
      { airline: "SkyHigh Airways", time: "10:00 AM - 1:00 PM", price: 4500 },
      { airline: "Oceanic Air", time: "2:30 PM - 5:45 PM", price: 5200 },
      { airline: "Budget Fly", time: "6:00 AM - 9:00 AM", price: 3800 }
    ];

    flights.forEach(f => {
      const card = document.createElement("div");
      card.className = "result-card";
      card.innerHTML = `
        <div>
          <h3>${f.airline}</h3>
          <p style="font-size:13px; opacity:0.8">${from} ➝ ${to} • ${f.time}</p>
        </div>
        <div style="text-align:right;">
          <div class="price-tag">₹${f.price}</div>
          <button class="primary-btn" style="padding: 5px 15px; font-size:12px; margin-top:5px;" onclick="alert('Redirecting to payment gateway... (Demo)')">Book</button>
        </div>
      `;
      resultsGrid.appendChild(card);
    });
  }, 1500);
}

function searchHotels() {
  const loc = document.getElementById("hotelLoc").value;
  if(!loc) { alert("Please enter a destination"); return; }

  const resultsGrid = document.getElementById("resultsGrid");
  const section = document.getElementById("resultsSection");

  section.style.display = "block";
  resultsGrid.innerHTML = "<p style='text-align:center;'>🏨 Finding best stays...</p>";

  setTimeout(() => {
    resultsGrid.innerHTML = "";
    
    const hotels = [
      { name: "Grand Plaza Hotel", rating: "⭐⭐⭐⭐⭐", price: 8500 },
      { name: "City Center Inn", rating: "⭐⭐⭐", price: 3200 },
      { name: "Backpackers Hostel", rating: "⭐⭐", price: 900 }
    ];

    hotels.forEach(h => {
      const card = document.createElement("div");
      card.className = "result-card";
      card.innerHTML = `
        <div>
          <h3>${h.name}</h3>
          <p style="font-size:13px; opacity:0.8">${loc} • ${h.rating}</p>
        </div>
        <div style="text-align:right;">
          <div class="price-tag">₹${h.price}<span style="font-size:12px; color:white; font-weight:normal">/night</span></div>
          <button class="primary-btn" style="padding: 5px 15px; font-size:12px; margin-top:5px;" onclick="alert('Room Reserved! (Demo)')">Reserve</button>
        </div>
      `;
      resultsGrid.appendChild(card);
    });
  }, 1500);
}