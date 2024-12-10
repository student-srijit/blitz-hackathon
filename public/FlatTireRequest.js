document
  .getElementById("flatTireForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Gather form data
    const customerName = document.getElementById("customer-name").value;
    const contactNumber = document.getElementById("contact-number").value;
    const location = document.getElementById("location").value;
    const carMake = document.getElementById("car-make").value;
    const carModel = document.getElementById("car-model").value;
    const carYear = document.getElementById("car-year").value;
    const tireCondition = document.getElementById("tire-condition").value;
    const additionalDetails =
      document.getElementById("additional-details").value;

    // Log form data to console (for now)
    console.log("Flat Tire Service Request Received:");
    console.log(`Name: ${customerName}`);
    console.log(`Contact: ${contactNumber}`);
    console.log(`Location: ${location}`);
    console.log(`Car Make: ${carMake}`);
    console.log(`Car Model: ${carModel}`);
    console.log(`Car Year: ${carYear}`);
    console.log(`Tire Condition: ${tireCondition}`);
    console.log(`Additional Details: ${additionalDetails}`);

    // Example: Sending form data to an API (not implemented here)
    // Example: fetch('/api/flat-tire-request', { method: 'POST', body: JSON.stringify(formData) });

    alert("Your flat tire service request has been submitted!");
  });
