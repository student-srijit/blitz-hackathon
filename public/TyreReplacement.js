document.addEventListener("DOMContentLoaded", function () {
    const tireBrandSelect = document.getElementById("tire-brand");
    const tireSizeSelect = document.getElementById("tire-size");
    const submitButton = document.getElementById("submit-btn");
    const paymentMessage = document.getElementById("payment-message");
    const paymentAmount = document.getElementById("payment-amount");

    // Initially disable the submit button
    submitButton.disabled = true;

    // Function to update price based on tire brand selection
    function updatePrice() {
        const tireBrand = tireBrandSelect.value;
        let price = 0;

        // Set price based on selected tire brand
        if (tireBrand === "brand1") {
            price = 1500; // Price in Rupees
        } else if (tireBrand === "brand2") {
            price = 1800;
        } else if (tireBrand === "brand3") {
            price = 2000;
        }

        // Show the price on the page
        paymentAmount.innerText = `₹${price}`;

        // Check if all conditions are met for enabling the submit button
        validateForm();
    }

    // Function to check if the form is complete (tire brand, size selected, and payment made)
    function validateForm() {
        const isTireBrandSelected = tireBrandSelect.value !== "";
        const isTireSizeSelected = tireSizeSelect.value !== "";
        const isPaymentCompleted = paymentMessage.innerText === "Payment Successful";

        // Enable submit button if all conditions are met
        if (isTireBrandSelected && isTireSizeSelected && isPaymentCompleted) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }

    // Update price when tire brand is selected
    tireBrandSelect.addEventListener("change", updatePrice);

    // Handle payment simulation
    const paymentButton = document.getElementById("payment-btn");

    paymentButton.addEventListener("click", function () {
        const selectedTireBrand = tireBrandSelect.value;

        if (selectedTireBrand === "") {
            alert("Please select a tire brand before proceeding with payment.");
            return;
        }

        // Simulate payment success
        paymentMessage.innerText = "Payment Successful";
        paymentMessage.style.color = "#4CAF50"; // Green color for success

        // Check if form is now valid and enable submit button
        validateForm();
    });

    // Handle form submission
    const form = document.getElementById("tire-replacement-form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        
        // Here you would submit the form data to the server
        alert("Tire replacement request submitted successfully!");
    });
});
