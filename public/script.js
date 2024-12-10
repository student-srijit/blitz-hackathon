const socket = io();
const map = L.map("map").setView([0, 0], 13); // Initialize the map with a default center
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

let userMarker; // To store the user's dynamic marker
let otherMarkers = {}; // To store markers for other users

// Function to update the user's own marker
function updateUserMarker(latitude, longitude) {
  if (userMarker) {
    // If the user's marker already exists, update its position
    userMarker.setLatLng([latitude, longitude]);
  } else {
    // Create a new marker for the user if none exists
    userMarker = L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup("You are here")
      .openPopup();
  }
}

// Handle geolocation and send location to the server
if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      // Send the location to the server
      socket.emit("send-location", { latitude, longitude });

      // Update the map view and marker for this user
      map.setView([latitude, longitude], 13); // Pan the map to the new location
      updateUserMarker(latitude, longitude);
    },
    (error) => {
      console.error("Geolocation error:", error);
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
  );
} else {
  console.error("Geolocation is not supported by this browser.");
}

// Handle receiving location updates for other users
socket.on("receive-location", (data) => {
  const { id, latitude, longitude } = data;

  // If the other user's marker doesn't exist, create it
  if (!otherMarkers[id]) {
    otherMarkers[id] = L.marker([latitude, longitude]).addTo(map);
    otherMarkers[id].bindPopup("Other user").openPopup();
  } else {
    // If the other user's marker exists, update its position
    otherMarkers[id].setLatLng([latitude, longitude]);
  }
});

// Handle the removal of markers when a user disconnects
socket.on("remove-location", (userId) => {
  if (otherMarkers[userId]) {
    map.removeLayer(otherMarkers[userId]); // Remove the marker from the map
    delete otherMarkers[userId]; // Remove it from the storage
  }
});
