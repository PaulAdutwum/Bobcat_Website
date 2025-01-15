
document.getElementById("create-account-btn").addEventListener("click", () => {
    alert("Account creation functionality coming soon!");
  });
  
 
  document.getElementById("login-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    if (email && password) {
      alert("Logged in successfully!");
      
    } else {
      alert("Please enter your email and password.");
    }
  });
  

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
  
      
        suggestion.addEventListener("click", () => {
          input.value = match;
          suggestionsBox.innerHTML = ""; 
        });
  
        suggestionsBox.appendChild(suggestion);
      });
    }
  });
  

  let map;
  let shuttleMarker;
  
  function initMap() {
    const initialPosition = { lat: 44.105, lng: -70.208 }; 
  
    map = new google.maps.Map(document.getElementById("map"), {
      center: initialPosition,
      zoom: 14,
    });
  

    shuttleMarker = new google.maps.Marker({
      position: initialPosition,
      map: map,
      title: "Shuttle Location",
      icon: {
        url: "shuttle-icon.png", 
        scaledSize: new google.maps.Size(50, 50),
      },
    });
  
    
    trackShuttle();
  }
  
  
  function fetchShuttleLocation() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPosition = {
          lat: 44.105 + Math.random() * 0.01 - 0.005, 
          lng: -70.208 + Math.random() * 0.01 - 0.005, 
        };
        resolve(newPosition);
      }, 2000);
    });
  }
  
  
  async function trackShuttle() {
    while (true) {
      const newPosition = await fetchShuttleLocation();
      shuttleMarker.setPosition(newPosition);
      map.panTo(newPosition);
    }
  }
  
  
  window.onload = initMap;
  
  
