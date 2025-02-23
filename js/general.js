// "use strict";

// ///////////////////////////////////////////////////////////
// // Set current year in footer copyright
// const yearEl = document.querySelector(".year");
// const currentYear = new Date().getFullYear();
// yearEl.textContent = currentYear;

// ///////////////////////////////////////////////////////////
// // Make mobile navigation work
// const btnNavEl = document.querySelector(".btn-mobile-nav");
// const headerEl = document.querySelector(".header");

// btnNavEl.addEventListener("click", function () {
//   headerEl.classList.toggle("nav-open");
// });

// ///////////////////////////////////////////////////////////
// // Smooth scrolling animations
// const allLinks = document.querySelectorAll("a:link");
// allLinks.forEach(function (link) {
//   link.addEventListener("click", function (e) {
//     // Close mobile navigation
//     if (link.classList.contains("main-nav-link"))
//       headerEl.classList.toggle("nav-open");
//   });
// });

// ///////////////////////////////////////////////////////////
// // Animations on scroll
// const observer = new IntersectionObserver((entries) => {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       entry.target.classList.add("show");
//     } else {
//       entry.target.classList.remove("show");
//     }
//   });
// });

// const hiddenElements = document.querySelectorAll(".hidden");
// hiddenElements.forEach((el) => observer.observe(el));

// ///////////////////////////////////////////////////////////
// // Contact Form Submission (Only runs on contact.html)
// document.addEventListener("DOMContentLoaded", function () {
//   const contactForm = document.getElementById("contactForm");

//   if (contactForm) { // ✅ Check if the form exists before running
//     contactForm.addEventListener("submit", async function(event) {
//       event.preventDefault();

//       let name = document.getElementById("name");
//       let company = document.getElementById("company");
//       let email = document.getElementById("email");
//       let phone = document.getElementById("phone");
//       let message = document.getElementById("message");
//       let responseMessage = document.getElementById("responseMessage");

//       // Show loading text
//       responseMessage.textContent = "Sending...";
//       responseMessage.className = "response-message"; // Reset class
//       responseMessage.style.display = "block";
//       responseMessage.style.opacity = "1";

//       try {
//           const response = await fetch("https://pinnakltech-backend.onrender.com/send-mail", {
//               method: "POST",
//               headers: {
//                   "Content-Type": "application/json"
//               },
//               body: JSON.stringify({
//                   name: name.value,
//                   company: company.value,
//                   email: email.value,
//                   phone: phone.value,
//                   message: message.value
//               })
//           });

//           const data = await response.json();

//           if (response.ok) {
//               responseMessage.textContent = "✅ Email sent successfully!";
//               responseMessage.classList.add("success");

//               // Clear form fields after successful submission
//               name.value = "";
//               company.value = "";
//               email.value = "";
//               phone.value = "";
//               message.value = "";
//           } else {
//               responseMessage.textContent = "❌ Failed to send message. Try again later.";
//               responseMessage.classList.add("error");
//           }
//       } catch (error) {
//           responseMessage.textContent = "❌ An error occurred. Please try again.";
//           responseMessage.classList.add("error");
//       }

//       // Hide message after 10 seconds
//       setTimeout(() => {
//           responseMessage.style.opacity = "0";
//           setTimeout(() => {
//               responseMessage.style.display = "none";
//           }, 500); // Extra delay for fade-out effect
//       }, 10000); // 🔥 Changed from 30000 (30 sec) to 10000 (10 sec)
//     });
//   }
// });

"use strict";

///////////////////////////////////////////////////////////
// Set current year in footer copyright
const yearEl = document.querySelector(".year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

///////////////////////////////////////////////////////////
// Make mobile navigation work
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

if (btnNavEl && headerEl) {
  btnNavEl.addEventListener("click", function () {
    headerEl.classList.toggle("nav-open");
  });
}

///////////////////////////////////////////////////////////
// Smooth scrolling animations
const allLinks = document.querySelectorAll("a:link");
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");

    // Smooth scroll for in-page anchor links
    if (href && href.startsWith("#") && href.length > 1) {
      e.preventDefault();
      const targetEl = document.querySelector(href);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    }

    // Close mobile navigation
    if (link.classList.contains("main-nav-link") && headerEl) {
      headerEl.classList.toggle("nav-open");
    }
  });
});

///////////////////////////////////////////////////////////
// Animations on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

///////////////////////////////////////////////////////////
// Contact Form Submission (Only runs on contact.html)
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  if (!contactForm) return; // Exit if the form doesn't exist

  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    let name = document.getElementById("name");
    let company = document.getElementById("company");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    let message = document.getElementById("message");
    let responseMessage = document.getElementById("responseMessage");

    // Show loading text
    responseMessage.textContent = "Sending...";
    responseMessage.className = "response-message"; // Reset class
    responseMessage.style.display = "block";
    responseMessage.style.opacity = "1";

    try {
      const response = await fetch("https://pinnakltech-backend.onrender.com/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.value,
          company: company.value,
          email: email.value,
          phone: phone.value,
          message: message.value,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        responseMessage.textContent = "✅ Email sent successfully!";
        responseMessage.classList.add("success");

        // Clear form fields after successful submission
        name.value = "";
        company.value = "";
        email.value = "";
        phone.value = "";
        message.value = "";
      } else {
        responseMessage.textContent = "❌ Failed to send message. Try again later.";
        responseMessage.classList.add("error");
      }
    } catch (error) {
      console.error("Error:", error); // Log error details for debugging
      responseMessage.textContent = "❌ Network error. Check your connection and try again.";
      responseMessage.classList.add("error");
    }

    // Hide message after 10 seconds
    setTimeout(() => {
      responseMessage.style.opacity = "0";
      setTimeout(() => {
        responseMessage.style.display = "none";
      }, 500); // Extra delay for fade-out effect
    }, 10000);
  });
});
