// Handle Account Creation Alert
document.getElementById("create-account-btn").addEventListener("click", () => {
    alert("Account creation functionality coming soon!");
  });
  
  // Handle Login Form Submission
  document.getElementById("login-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    if (email && password) {
      alert("Logged in successfully!");
      // Add login logic here (e.g., API call to verify credentials)
    } else {
      alert("Please enter your email and password.");
    }
  });
  
  // Destination Suggestions
  const destinations = [
    "Lewiston Public Library",
    "Auburn Mall",
    "Central Maine Medical Center",
    "Bates College Muskie Archives",
    "Lewiston High School",
    "Auburn Walmart",
    "Lewiston Auburn Regional Airport",
  ];
  
  const input = document.getElementById("destination");
  const suggestionsBox = document.getElementById("suggestions");
  
  // Handle input changes for autocomplete
  input.addEventListener("input", () => {
    const query = input.value.toLowerCase();
    suggestionsBox.innerHTML = "";
  
    if (query) {
      const matches = destinations.filter((place) =>
        place.toLowerCase().includes(query)
      );
  
      matches.forEach((match) => {
        const suggestion = document.createElement("div");
        suggestion.textContent = match;
  
        // Handle click on suggestion
        suggestion.addEventListener("click", () => {
          input.value = match;
          suggestionsBox.innerHTML = ""; // Clear suggestions
        });
  
        suggestionsBox.appendChild(suggestion);
      });
    }
  });
  
  // Initialize Google Map
  let map;
  let shuttleMarker;
  
  function initMap() {
    const initialPosition = { lat: 44.105, lng: -70.208 }; // Starting location
  
    // Create a map centered at the initial position
    map = new google.maps.Map(document.getElementById("map"), {
      center: initialPosition,
      zoom: 14,
    });
  
    // Add a marker for the shuttle
    shuttleMarker = new google.maps.Marker({
      position: initialPosition,
      map: map,
      title: "Shuttle Location",
      icon: {
        url: "shuttle-icon.png", // Custom icon
        scaledSize: new google.maps.Size(50, 50), // Adjust size
      },
    });
  
    // Start tracking the shuttle
    trackShuttle();
  }
  
  // Simulate fetching live shuttle location data
  function fetchShuttleLocation() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPosition = {
          lat: 44.105 + Math.random() * 0.01 - 0.005, // Simulated latitude
          lng: -70.208 + Math.random() * 0.01 - 0.005, // Simulated longitude
        };
        resolve(newPosition);
      }, 2000); // Update every 2 seconds
    });
  }
  
  // Track and update shuttle location on the map
  async function trackShuttle() {
    while (true) {
      const newPosition = await fetchShuttleLocation();
      shuttleMarker.setPosition(newPosition);
      map.panTo(newPosition);
    }
  }
  
  // Initialize the map when the window loads
  window.onload = initMap;
  
  