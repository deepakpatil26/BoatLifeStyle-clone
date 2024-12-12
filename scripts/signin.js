// Event listener for form submission
document.querySelector("form").addEventListener("submit", handleSignup);

// Retrieve client details from localStorage or initialize an empty array
let clientArr = JSON.parse(localStorage.getItem("clientDetail")) || [];

/**
 * Handles the signup form submission
 */
function handleSignup(event) {
  event.preventDefault();

  // Collect client data from form inputs
  const clientData = {
    firstName: document.querySelector("#firstName").value.trim(),
    lastName: document.querySelector("#lastName").value.trim(),
    email: document.querySelector("#email").value.trim(),
    password: document.querySelector("#password").value.trim(),
  };

  // Validate form inputs
  if (!validateInputs(clientData)) {
    alert("Please fill in all fields correctly.");
    return;
  }

  if (isEmailExists(clientData.email)) {
    alert("Account already exists with this email.");
    return;
  }

  // Store client data in localStorage
  clientArr.push(clientData);
  localStorage.setItem("clientDetail", JSON.stringify(clientArr));

  alert("Signup successful!");
  window.location.href = "login.html";
}

/**
 * Checks if an email already exists in the client array
 * @param {string} email - The email to check
 * @returns {boolean} - True if email does not exist, false otherwise
 */
function isEmailExists(email) {
  return !clientArr.some((client) => client.email === email);
}

/**
 * Validates form input fields
 * @param {Object} data - The client data object
 * @returns {boolean} - Returns true if all fields are valid
 */
function validateInputs(data) {
  return data.firstName && data.lastName && data.email && data.password;
}
