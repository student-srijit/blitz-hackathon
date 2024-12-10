document.addEventListener("DOMContentLoaded", function () {
  // Initialize the map and set its default location (Bangalore, India)
  const map = L.map("map").setView([12.9716, 77.5946], 13);

  // Add OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  // Form submission handler
  document
    .getElementById("fuel-delivery-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const location = document.getElementById("location").value;

      // Use the OpenStreetMap Nominatim API for geocoding
      fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          location
        )}`,
        {
          headers: {
            "User-Agent": "OnRoadMechanix/1.0 (https://example.com)", // Custom User-Agent
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            const { lat, lon } = data[0];

            // Center the map to the geocoded location
            map.setView([lat, lon], 14);

            // Add a marker for the user's location
            L.marker([lat, lon])
              .addTo(map)
              .bindPopup("Your Location")
              .openPopup();
          } else {
            alert("Location not found. Please enter a valid address.");
          }
        })
        .catch((error) => {
          console.error("Error fetching geocode data:", error);
          alert("Failed to fetch location. Please try again.");
        });
    });
});
