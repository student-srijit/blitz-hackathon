document.addEventListener("DOMContentLoaded", function () {
    const diagnosticTypeSelect = document.getElementById("diagnostic-type");
    const submitButton = document.getElementById("submit-btn");
    const paymentMessage = document.getElementById("payment-message");
    const paymentAmount = document.getElementById("payment-amount");

    // Initially disable the submit button
    submitButton.disabled = true;

    // Function to update price based on diagnostic type selection
    function updatePrice() {
        const diagnosticType = diagnosticTypeSelect.value;
        let price = 0;

        // Set price based on selected diagnostic type
        if (diagnosticType === "basic") {
            price = 1500; // Price in Rupees
        } else if (diagnosticType === "advanced") {
            price = 2500;
        } else if (diagnosticType === "complete") {
            price = 3500;
        }

        // Show the price on the page
        paymentAmount.innerText = `₹${price}`;

        // Check if all conditions are met for enabling the submit button
        validateForm();
    }

    // Function to check if the form is complete (diagnostic type selected and payment made)
    function validateForm() {
        const isDiagnosticTypeSelected = diagnosticTypeSelect.value !== "";
        const isPaymentCompleted = paymentMessage.innerText === "Payment Successful";

        // Enable submit button if all conditions are met
        if (isDiagnosticTypeSelected && isPaymentCompleted) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }

    // Update price when diagnostic type is selected
    diagnosticTypeSelect.addEventListener("change", updatePrice);

    // Handle payment simulation
    const paymentButton = document.getElementById("payment-btn");

    paymentButton.addEventListener("click", function () {
        const selectedDiagnosticType = diagnosticTypeSelect.value;

        if (selectedDiagnosticType === "") {
            alert("Please select a diagnostic type before proceeding with payment.");
            return;
        }

        // Simulate payment success
        paymentMessage.innerText = "Payment Successful";
        paymentMessage.style.color = "#4CAF50"; // Green color for success

        // Check if form is now valid and enable submit button
        validateForm();
    });

    // Handle form submission
    const form = document.getElementById("engine-diagnostic-form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        
        // Here you would submit the form data to the server
        alert("Engine diagnostic request submitted successfully!");
    });
});
