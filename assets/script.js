/* =========================
   AUTH
========================= */

function login() {
  event.preventDefault();
  const email = document.querySelector('input[type="email"]').value;
  const password = document.querySelector('input[type="password"]').value;

  if (!email || !password) { alert("Please enter email and password"); return; }
  localStorage.setItem("user", JSON.stringify({ email: email, name: "Traveler One" }));
  window.location.href = "dashboard.html";
}

function guestLogin() {
  localStorage.setItem("user", JSON.stringify({ email: "guest@globetrotter.com", name: "Guest User" }));
  window.location.href = "dashboard.html";
}

function signup(event) {
  event.preventDefault();
  const name = document.getElementById("newName").value;
  localStorage.setItem("user", JSON.stringify({ name: name, email: "user@example.com" }));
  alert("Account created! Redirecting...");
  window.location.href = "dashboard.html";
}

function logout() {
  if(confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("user");
    window.location.href = "index.html";
  }
}

function deleteAccount() {
  if(confirm("⚠️ Are you sure you want to permanently delete your account?")) {
    localStorage.clear();
    window.location.href = "index.html";
  }
}

/* =========================
   DASHBOARD
========================= */

function goToPlanTrip() { window.location.href = "plan_trip.html"; }

document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;
    const user = JSON.parse(localStorage.getItem("user") || '{}');

    if (path.includes("dashboard.html")) {
        const subtitle = document.querySelector(".subtitle");
        if(subtitle && user.name) subtitle.innerText = `Welcome back, ${user.name}`;
        loadDashboardTrips();
    }

    if(document.getElementById("itineraryContainer")) loadItinerary();
    if(document.getElementById("travelCost")) loadBudget();
});

function loadDashboardTrips() {
  const history = JSON.parse(localStorage.getItem("tripHistory")) || [];
  const container = document.getElementById("recentTripsGrid");
  if (!container) return;
  container.innerHTML = "";

  if (history.length === 0) {
    container.innerHTML = `<p style="opacity:0.7; text-align:center; grid-column: 1/-1;">No trips planned yet.</p>`;
    return;
  }

  history.reverse().forEach((trip, index) => {
    const card = document.createElement("div");
    card.className = "trip-card glass";
    const tripId = trip.name ? trip.name.replace(/\s/g, '-') + "-" + index : "trip-" + index;
    // Show first 2 cities as subtitle
    const stopSummary = trip.stops && trip.stops.length ? trip.stops.join(", ") : trip.destination;

    card.innerHTML = `
      <h3>${trip.name}</h3>
      <p style="font-size:13px; opacity:0.8; margin-bottom:5px;">${trip.startDate} - ${trip.endDate}</p>
      <p>${trip.days} Days • ${stopSummary}</p>
      <p style="margin-bottom: 15px;">Total: ₹${trip.totalCost || trip.budget}</p>
      <div style="display:flex; gap:10px;">
        <button class="secondary-btn" style="flex:1;" onclick="openItinerary()">View</button>
        <button class="secondary-btn" style="width:auto; padding:0 15px;" onclick="openShareModal('${trip.name}', '${tripId}')">📤</button>
      </div>
    `;
    container.appendChild(card);
  });
}

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
   PLAN TRIP (MANUAL BUILDER)
========================= */

// Store stops temporarily
let currentStops = [];

function addStop() {
  const input = document.getElementById("cityInput");
  const city = input.value.trim();
  
  if (!city) return;
  
  currentStops.push(city);
  renderStops();
  input.value = ""; // Clear input
}

function renderStops() {
  const list = document.getElementById("stopsList");
  list.innerHTML = ""; // Clear current list
  
  currentStops.forEach((city, index) => {
    const item = document.createElement("div");
    item.style.cssText = "background: rgba(255,255,255,0.1); padding: 10px; margin-bottom: 5px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;";
    item.innerHTML = `
      <span>📍 ${city}</span>
      <button onclick="removeStop(${index})" style="background: none; border: none; color: #ff6b6b; cursor: pointer;">✕</button>
    `;
    list.appendChild(item);
  });
}

function removeStop(index) {
  currentStops.splice(index, 1);
  renderStops();
}

function generateTrip() {
  const tripName = document.getElementById("tripName")?.value;
  const tripDesc = document.getElementById("tripDesc")?.value;
  const tripImage = document.getElementById("tripImage")?.value;
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

  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

  if (days < 1) { alert("Invalid dates"); return; }

  const trip = {
    name: tripName,
    description: tripDesc,
    coverPhoto: tripImage,
    stops: currentStops, // Replaces single destination
    startDate: startDate,
    endDate: endDate,
    days: days,
    budget: parseInt(budget)
  };

  localStorage.setItem("trip", JSON.stringify(trip));
  window.location.href = "itinerary.html";
}

/* =========================
   ITINERARY (MULTI-CITY LOGIC)
========================= */

function loadItinerary() {
  const trip = JSON.parse(localStorage.getItem("trip"));
  if (!trip) return;
  
  const container = document.getElementById("itineraryContainer");
  if (!container) return;

  document.querySelector("header h1").innerText = `🗓️ ${trip.name}`;
  document.querySelector("header p").innerText = trip.description || `Multi-city trip: ${trip.stops.join(" ➝ ")}`;

  container.innerHTML = "";
  let currentDate = new Date(trip.startDate);
  
  // Distribute days among stops
  const stopsCount = trip.stops.length;
  const daysPerStop = Math.max(1, Math.floor(trip.days / stopsCount));
  
  let dayCounter = 1;
  
  trip.stops.forEach((city, index) => {
    // Determine how many days for this city
    // If it's the last city, give it all remaining days to avoid gaps
    let stayDuration = (index === stopsCount - 1) ? (trip.days - dayCounter + 1) : daysPerStop;

    for(let d = 0; d < stayDuration; d++) {
        if(dayCounter > trip.days) break;

        const dateStr = currentDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        
        const card = document.createElement("div");
        card.className = "trip-card glass";
        // Header: Day X in City Name
        card.innerHTML = `
          <div style="display:flex; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:10px; margin-bottom:10px;">
            <h3 style="margin:0;">Day ${dayCounter}: ${city}</h3>
            <span style="font-size:12px; opacity:0.8">${dateStr}</span>
          </div>
          <p>Explore ${city} - City Tour & Local Attractions</p>
          <p style="font-size:13px; opacity:0.6; margin-top:5px;">Estimated Daily Spend: ₹${Math.floor(trip.budget / trip.days)}</p>
        `;
        container.appendChild(card);
        
        currentDate.setDate(currentDate.getDate() + 1);
        dayCounter++;
    }
  });
}

function openItinerary() { window.location.href = "itinerary.html"; }
function goToActivities() { window.location.href = "activities.html"; }

/* =========================
   ACTIVITIES & BUDGET
========================= */

function saveActivities() {
  const selected = [];
  document.querySelectorAll("input[type='checkbox']:checked").forEach(cb => selected.push(cb.value));
  localStorage.setItem("activities", JSON.stringify(selected));
  window.location.href = "budget.html";
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

  const chart = document.getElementById("budgetChart");
  if (chart) {
    const pTravel = (travelCost / total) * 100;
    const pStay = pTravel + (stayCost / total) * 100;
    chart.style.background = `conic-gradient(#00c6ff 0% ${pTravel}%, #bd34fe ${pTravel}% ${pStay}%, #ff9966 ${pStay}% 100%)`;
  }

  const listContainer = document.getElementById("selectedActivitiesList");
  if(listContainer) {
    listContainer.innerHTML = "";
    if(activities.length === 0) listContainer.innerHTML = "<li>No extra activities selected</li>";
    else activities.forEach(act => { const li = document.createElement("li"); li.innerText = "• " + act; listContainer.appendChild(li); });
  }

  trip.totalCost = total;
  localStorage.setItem("trip", JSON.stringify(trip));
}

function confirmTrip() {
  const trip = JSON.parse(localStorage.getItem("trip"));
  if(!trip) return;
  const history = JSON.parse(localStorage.getItem("tripHistory")) || [];
  history.push(trip);
  localStorage.setItem("tripHistory", JSON.stringify(history));
  localStorage.removeItem("trip"); 
  localStorage.removeItem("activities");
  alert("🎉 Trip Saved to Dashboard!");
  window.location.href = "dashboard.html";
}

function saveProfile() {
    const name = document.getElementById("profileName").value;
    const user = JSON.parse(localStorage.getItem("user") || '{}');
    user.name = name;
    localStorage.setItem("user", JSON.stringify(user));
    alert("Profile Updated!");
}