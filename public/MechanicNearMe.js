// MechanicNearMe.js

document
  .getElementById("mechanic-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent default form submission

    // Get the location input value
    const location = document.getElementById("location").value;

    // Initialize the Google Maps Geocoder to convert the address into latitude and longitude
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address: location }, function (results, status) {
      if (status === "OK") {
        const latLng = results[0].geometry.location;

        // Call the Google Places API to find nearby mechanics
        findNearbyMechanics(latLng);
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  });

// Function to find nearby mechanics using Google Places API
function findNearbyMechanics(latLng) {
  const service = new google.maps.places.PlacesService(
    document.createElement("div")
  );

  const request = {
    location: latLng,
    radius: 5000, // Search within 5km radius
    type: ["car_repair"], // Look for car repair shops
  };

  service.nearbySearch(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      displayMechanics(results, latLng);
    } else {
      alert("Failed to find nearby mechanics.");
    }
  });
}

// Function to display mechanic details and map
function displayMechanics(mechanics, latLng) {
  const resultsList = document.getElementById("results-list");
  resultsList.innerHTML = ""; // Clear previous results

  mechanics.forEach(function (mechanic) {
    const div = document.createElement("div");
    div.innerHTML = `<strong>${mechanic.name}</strong><br>${mechanic.vicinity}<br><br>`;
    resultsList.appendChild(div);
  });

  // Initialize the map and set the center to the first result
  const map = new google.maps.Map(document.getElementById("map"), {
    center: latLng,
    zoom: 12,
  });

  // Mark each mechanic location on the map
  mechanics.forEach(function (mechanic) {
    new google.maps.Marker({
      position: mechanic.geometry.location,
      map: map,
      title: mechanic.name,
    });
  });
}
