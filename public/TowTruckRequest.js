document
  .getElementById("towtruck-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent default form submission

    // Gather the form data
    const formData = {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      location: document.getElementById("location").value,
      "vehicle-details": document.getElementById("vehicle-details").value,
    };
  });
