// Import the footer component
import { footer } from "./footer.js";
document.getElementById("footer_part").innerHTML = footer();

// ========================= Sign-In Form Handling =========================
document.querySelector("form").addEventListener("submit", handleSignIn);

let clients = JSON.parse(localStorage.getItem("clientDetail")) || [];

/**
 * Handles the form submission for sign-in.
 * @param {Event} event - The form submit event.
 */
function handleSignIn(event) {
  event.preventDefault();

  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value;

  const clientData = { email, password };

  if (isValidUser(email, password)) {
    localStorage.setItem("signin", JSON.stringify(clientData));
    alert("Sign-in successful!");
    window.location.href = "index.html";
  } else {
    alert("Wrong username or password. Please try again.");
  }
}

/**
 * Checks if the provided email and password match any registered client.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {boolean} - Returns true if a match is found, false otherwise.
 */
function isValidUser(email, password) {
  return clients.some(
    (client) => client.email === email && client.password === password
  );
}
