// FeedbackForm.js

document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll(".star");
  const ratingInput = document.getElementById("rating");

  // Add hover effect
  stars.forEach((star, index) => {
    star.addEventListener("mouseover", () => {
      highlightStars(index);
    });

    star.addEventListener("mouseout", () => {
      clearHover();
    });

    star.addEventListener("click", () => {
      selectRating(index);
    });
  });

  function highlightStars(index) {
    stars.forEach((star, i) => {
      if (i <= index) {
        star.classList.add("hovered");
      } else {
        star.classList.remove("hovered");
      }
    });
  }

  function clearHover() {
    stars.forEach((star) => {
      star.classList.remove("hovered");
    });
  }

  function selectRating(index) {
    stars.forEach((star, i) => {
      if (i <= index) {
        star.classList.add("selected");
      } else {
        star.classList.remove("selected");
      }
    });
    ratingInput.value = index + 1; // Update the hidden input value
  }

  document.getElementById("feedback-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const rating = ratingInput.value;

    if (name && email && message && rating) {
      document.getElementById("response-message").innerHTML = `
                <p>Thank you for your feedback, <strong>${name}</strong>!</p>
                <p>Your rating: <strong>${rating} Stars</strong></p>
            `;
    } else {
      alert("Please fill out all fields and provide a rating.");
    }
  });
});
