// FAQ Accordion functionality
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

// Scroll animations for fade-in effect
const fadeElements = document.querySelectorAll(".fade-in");

const onScroll = () => {
  fadeElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (rect.top <= windowHeight && rect.bottom >= 0) {
      el.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", onScroll);
onScroll(); // Initial check for elements already in view on page load

// Smooth scroll for anchor links
const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").slice(1);
    const targetElement = document.getElementById(targetId);

    window.scrollTo({
      top: targetElement.offsetTop - 50, // 50px offset for header
      behavior: "smooth",
    });
  });
});

// Contact Form Validation
const form = document.querySelector("#contact-form");
const nameInput = document.querySelector("#contact-name");
const emailInput = document.querySelector("#contact-email");
const messageInput = document.querySelector("#contact-message");
const submitButton = document.querySelector("#contact-submit");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form submission for validation

  let valid = true;

  // Reset previous error messages
  const errorMessages = form.querySelectorAll(".error-message");
  errorMessages.forEach((msg) => msg.remove());

  // Name validation
  if (!nameInput.value.trim()) {
    showError(nameInput, "Name is required");
    valid = false;
  }

  // Email validation
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(emailInput.value.trim())) {
    showError(emailInput, "Please enter a valid email address");
    valid = false;
  }

  // Message validation
  if (!messageInput.value.trim()) {
    showError(messageInput, "Message cannot be empty");
    valid = false;
  }

  // If valid, submit the form (for now, we just log success)
  if (valid) {
    console.log("Form successfully submitted!");
    alert("Thank you for your message!");
    form.reset();
  }
});

// Function to show error messages next to input fields
function showError(input, message) {
  const errorSpan = document.createElement("span");
  errorSpan.textContent = message;
  errorSpan.classList.add("error-message");
  input.parentNode.appendChild(errorSpan);
}

// Smooth Scroll on page load for anchors with hash in URL (if any)
if (window.location.hash) {
  const target = document.querySelector(window.location.hash);
  if (target) {
    window.scrollTo({
      top: target.offsetTop - 50,
      behavior: "smooth",
    });
  }
}

// Back-to-top button functionality
const backToTopButton = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const emergencyForm = document.getElementById("emergency-booking-form");
  const submitButton = document.getElementById("submit-form");

  // Form submission logic
  emergencyForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const description = document.getElementById("description").value;

    if (name && phone && email && description) {
      alert(`Emergency Request Submitted:
              Name: ${name}
              Phone: ${phone}
              Email: ${email}
              Description: ${description}`);
      emergencyForm.reset();
    } else {
      alert("Please fill out all fields.");
    }
  });
});
