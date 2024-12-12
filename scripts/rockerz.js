// Import Navbar and Footer
import main_navbar from "./components.js";
import { footer } from "./footer.js";

// ==========================
// NAVBAR SETUP
// ==========================
const navbarContainer = document.getElementById("main_navbar");
navbarContainer.innerHTML = main_navbar();

// ==========================
// SIDEBAR SETUP
// ==========================
const filter = document.getElementById("filter1");
const sidebar = document.getElementById("sidebar");
const toggle = document.getElementById("toggle");

toggle.onclick = () => {
  filter.classList.remove("active");
  sidebar.classList.remove("active");
};

filter.onclick = () => {
  filter.classList.toggle("active");
  sidebar.classList.toggle("active");
};

// ==========================
// PRODUCT DATA
// ==========================
const products = [
  {
    label: "You save 57%",
    img: "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/ed46e58c-9643-43e0-b350-9539d293aa51_400x.png?v=1625045114",
    img2: "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/c2386af9-4349-432f-8ba5-2b6aa06025c8_400x.png?v=1642405569",
    title: "TRebl boAt Headphone 131",
    rating: "4.6",
    reviews: "1112",
    price: 1699,
    discountprice: "2990",
    save: "1891",
    quantity: 1,
  },
  {
    label: "You save 60%",
    img: "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/245v2_main_4_400x.png?v=1655719698",
    img2: "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/c2386af9-4349-432f-8ba5-2b6aa06025c8_400x.png?v=1642405569",
    title: "boAt Headphone 411 ANC",
    rating: "4.8",
    reviews: "56",
    price: 1999,
    discountprice: "4990",
    save: "2991",
    quantity: 1,
  },
];

// ==========================
// FUNCTION TO TOGGLE SORT BUTTONS
// ==========================
document
  .querySelector("#krushna")
  .addEventListener("click", () => sortProducts(products, true));
document
  .querySelector("#krushna2")
  .addEventListener("click", () => sortProducts(products, false));

function sortProducts(products, ascending = true) {
  appendProducts(
    products.sort((a, b) => (ascending ? a.price - b.price : b.price - a.price))
  );
}

// ==========================
// FUNCTION TO APPEND PRODUCTS TO THE DOM
// ==========================
function appendProducts(productList) {
  const container = document.getElementById("products_data");
  container.innerHTML = "";

  productList.forEach((product) => {
    const productCard = createProductCard(product);
    container.appendChild(productCard);
  });
}

// Create product card dynamically
function createProductCard(product) {
  const mainDiv = document.createElement("div");
  mainDiv.className = "product-card";

  const imgContainer = document.createElement("div");
  const img1 = document.createElement("img");
  img1.src = product.img;
  const img2 = document.createElement("img");
  img2.src = product.img2;

  imgContainer.append(img1, img2);

  const infoDiv = document.createElement("div");
  infoDiv.className = "product-info";

  const title = document.createElement("h3");
  title.innerText = product.title;

  const priceEl = document.createElement("p");
  priceEl.innerText = `₹${product.price}`;

  const discountEl = document.createElement("p");
  discountEl.innerText = `Discount: ₹${product.discountprice}`;

  const saveEl = document.createElement("p");
  saveEl.innerText = `Save: ₹${product.save}`;

  const addBtn = document.createElement("button");
  addBtn.innerText = "ADD TO CART";
  addBtn.addEventListener("click", () => addToCart(product));

  infoDiv.append(title, priceEl, discountEl, saveEl, addBtn);
  mainDiv.append(imgContainer, infoDiv);

  return mainDiv;
}

// ==========================
// ADD TO CART FUNCTIONALITY
// ==========================
function addToCart(product) {
  const cartItems = JSON.parse(localStorage.getItem("cart_items")) || [];
  cartItems.push(product);
  localStorage.setItem("cart_items", JSON.stringify(cartItems));

  alert(`${product.title} added to the cart`);
}

// ==========================
// FOOTER SETUP
// ==========================
document.getElementById("footer_part").innerHTML = footer();
