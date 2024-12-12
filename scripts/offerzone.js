// Import and add the footer component
import { footer } from "./footer.js";
document.getElementById("footer_part").innerHTML = footer();

// Import and add the main navbar component
import main_navbar from "./components.js";
const navbarContainer = document.getElementById("main_navbar");
navbarContainer.innerHTML = main_navbar();

// ===================== Cart Management =========================

// Get the cart count and update UI
const cartItems = JSON.parse(localStorage.getItem("cart_items")) || [];
const cartCountElement = document.getElementById("num");
cartCountElement.innerText = cartItems.length;

// Add event listener to the "Add to Cart" button
document.querySelector(".add_cart").addEventListener("click", addItemToCart);

/**
 * Adds an item to the cart.
 */
function addItemToCart() {
  const product = {
    title: document.getElementById("tit").innerText.trim(),
    img: document.getElementById("img").src,
    price: document.getElementById("price").innerText.trim(),
  };

  // Add the product to the cart array
  cartItems.push(product);

  // Save the updated cart to localStorage
  localStorage.setItem("cart_items", JSON.stringify(cartItems));

  // Update the cart count in the UI
  cartCountElement.innerText = cartItems.length;

  console.log("Cart updated:", cartItems);
}
