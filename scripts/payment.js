// Retrieve user details from localStorage or initialize as an empty array
let userDetails = JSON.parse(localStorage.getItem("cart_items")) || [];

/**
 * Function to display the manual section
 */
const openManual = () => {
  document.getElementById("manual").style.display = "block";
};

document.getElementById("open_manual").addEventListener("click", openManual);

/**
 * Function to handle payment form submission
 */
const submitPaymentDetails = () => {
  // Collect form input values
  const fullName = document.getElementById("full_name").value.trim();
  const address = document.getElementById("address").value.trim();
  const apartment = document.getElementById("apartment").value.trim();
  const townCity = document.getElementById("town_city").value.trim();
  const state = document.getElementById("state").value.trim();
  const zipcode = document.getElementById("zipcode").value.trim();
  const contact = document.getElementById("contact").value.trim();
  const nameOnCard = document.getElementById("name_on_card").value.trim();
  const cardNumber = document.getElementById("card_number").value.trim();
  const cvv = document.getElementById("cvv_i").value.trim();

  // Validate that all fields are filled
  if (
    fullName &&
    address &&
    apartment &&
    townCity &&
    state &&
    zipcode &&
    contact &&
    nameOnCard &&
    cardNumber &&
    cvv
  ) {
    const userObj = {
      fullName,
      contact,
      cardNumber,
      cvv,
      address,
      apartment,
      townCity,
      state,
      zipcode,
    };

    // Save user details to localStorage
    userDetails[0] = userObj;
    localStorage.setItem("cart_items", JSON.stringify(userDetails));

    alert("Payment processing. Please wait...");

    // Redirect to order confirmation or processing page
    window.location.href = "opt.html";
  } else {
    alert("Please fill in all the required fields.");
  }
};

document
  .getElementById("submit_btn")
  .addEventListener("click", submitPaymentDetails);
