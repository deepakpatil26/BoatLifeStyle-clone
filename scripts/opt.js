// Retrieve cart items from localStorage
const cartItems = JSON.parse(localStorage.getItem("cart_items")) || [];

// Sample card details (for comparison)
const cardNumber = "123451234512345";
const cvv = "123";

// Check if cart_items contains at least one item before accessing it
if (
  cartItems.length > 0 &&
  (cardNumber === cartItems[0]?.card_number || cvv === cartItems[0]?.cvv)
) {
  alert("Please enter your OTP: 1234 to confirm your order");
} else {
  alert("Details are invalid. Please check again.");
  window.location.href = "payment.html";
}

// Form submission event listener to handle OTP verification
document
  .querySelector("form")
  .addEventListener("submit", handleOrderConfirmation);

/**
 * Handles OTP verification and order confirmation
 * @param {Event} event - The form submit event
 */
function handleOrderConfirmation(event) {
  event.preventDefault(); // Prevent the default form submission

  const otpInput = document.querySelector("#otp").value.trim();

  if (otpInput === "1234") {
    alert(
      "Order placed successfully. It will be delivered within 7-10 business days."
    );

    // Clear relevant cart data from localStorage
    localStorage.removeItem("cart_items");
    localStorage.removeItem("cart_data");
    localStorage.removeItem("cart_total");

    // Redirect to the index page
    window.location.replace("../index.html"); // Change the path to match your project structure
  } else {
    alert("Invalid OTP. Please enter the correct OTP.");
  }
}
