// Retrieve existing cart data
let cart = JSON.parse(localStorage.getItem("cart_items")) || [];

function setData(m, a, p, r, n) {
  return {
    mobile: m,
    area: a,
    pin: p,
    road: r,
    name: n,
  };
}

function getdata() {
  let mob = document.getElementById("mobile").value.trim();
  let area = document.getElementById("area").value.trim();
  let pincode = document.getElementById("pin").value.trim();
  let road = document.getElementById("road").value.trim();
  let name = document.getElementById("name").value.trim();

  // Check if any field is empty
  if (
    mob === "" ||
    area === "" ||
    pincode === "" ||
    road === "" ||
    name === ""
  ) {
    alert("Please fill in all the details.");
    return;
  }

  // Create an order object
  let orderDetails = setData(mob, area, pincode, road, name);
  console.log(orderDetails);

  // Save orderDetails to localStorage
  localStorage.setItem("order_details", JSON.stringify(orderDetails));

  alert("Order completed. You will receive your order within 5-6 days.");

  // Redirect back to index.html
  window.location.href = "index.html";
}
