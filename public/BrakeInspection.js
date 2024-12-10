// BrakeInspectionRequest.js

document.getElementById("brake-inspection-form").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent default form submission

    // Gather the form data
    const formData = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        location: document.getElementById("location").value,
        "inspection-type": document.getElementById("inspection-type").value,
        "inspection-brand": document.getElementById("inspection-brand").value,
        "inspection-price": document.getElementById("inspection-price").value,
        "tow-truck-time": document.getElementById("tow-truck-time").value,
    };

    try {
        // Replace with your actual Google Apps Script Web App URL
        const response = await fetch("https://script.google.com/macros/s/YOUR_SCRIPT_URL/exec", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams(formData)
        });

        const result = await response.json(); // Parse JSON response

        if (result.result === "success") {
            document.getElementById("response-message").innerHTML = `
                <p>Thank you for your Brake Inspection request, ${formData.name}! We will process your request shortly.</p>
            `;
            document.getElementById("brake-inspection-form").reset(); // Reset the form
        } else {
            alert("Error: Request failed.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    }
});

// Update price when inspection type or brand is selected
document.getElementById("inspection-brand").addEventListener("change", function () {
    const inspectionBrand = this.value;
    const inspectionPrice = document.getElementById("inspection-price");
    const paymentAmount = document.getElementById("payment-amount");
    let price;

    switch (inspectionBrand) {
        case "bosch":
            price = 1000;
            break;
        case "akebono":
            price = 1200;
            break;
        case "delphi":
            price = 1100;
            break;
        case "textar":
            price = 1300;
            break;
        default:
            price = 0;
    }

    inspectionPrice.value = `₹${price}`;
    paymentAmount.innerText = `₹${price}`;
    document.getElementById("payment-btn").disabled = false; // Enable payment button
});

// Simulate Payment and Enable Submit Button
document.getElementById("payment-btn").addEventListener("click", function () {
    // Simulate successful payment (You can replace this with a real payment gateway)
    alert("Payment Successful!");
    document.getElementById("submit-btn").disabled = false; // Enable the submit button after payment
});
