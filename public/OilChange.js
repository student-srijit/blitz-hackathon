document.addEventListener("DOMContentLoaded", function () {
    const oilTypeSelect = document.getElementById("oil-type");
    const oilBrandSelect = document.getElementById("oil-brand");
    const submitButton = document.getElementById("submit-btn");
    const paymentMessage = document.getElementById("payment-message");
    const paymentAmount = document.getElementById("payment-amount");

    // Initially disable the submit button
    submitButton.disabled = true;

    // Function to update price based on oil brand selection
    function updatePrice() {
        const oilBrand = oilBrandSelect.value;
        let price = 0;

        // Set price based on selected oil brand
        if (oilBrand === "brand1") {
            price = 500; // Price in Rupees
        } else if (oilBrand === "brand2") {
            price = 700;
        } else if (oilBrand === "brand3") {
            price = 900;
        }

        // Show the price on the page
        paymentAmount.innerText = `₹${price}`;
        
        // Check if all conditions are met for enabling the submit button
        validateForm();
    }

    // Function to check if the form is complete (oil type, oil brand selected, and payment made)
    function validateForm() {
        const isOilTypeSelected = oilTypeSelect.value !== "";
        const isOilBrandSelected = oilBrandSelect.value !== "";
        const isPaymentCompleted = paymentMessage.innerText === "Payment Successful";

        // Enable submit button if all conditions are met
        if (isOilTypeSelected && isOilBrandSelected && isPaymentCompleted) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }

    // Handle oil brand selection change
    oilBrandSelect.addEventListener("change", updatePrice);

    // Handle payment simulation (this would be your actual payment integration)
    const paymentButton = document.getElementById("payment-btn");

    paymentButton.addEventListener("click", function () {
        const selectedOilBrand = oilBrandSelect.value;

        if (selectedOilBrand === "") {
            alert("Please select an oil brand before proceeding with payment.");
            return;
        }

        // Simulate payment success
        paymentMessage.innerText = "Payment Successful";
        paymentMessage.style.color = "#4CAF50"; // Green color for success

        // Check if form is now valid and enable submit button
        validateForm();
    });

    // Handle form submission (for illustration purposes)
    const form = document.getElementById("oilchange-form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        
        // Here you would submit the form data to the server
        alert("Oil change request submitted successfully!");
    });
});
