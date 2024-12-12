// Import main components and footer
import main_navbar from "./components.js";
import { footer } from "./footer.js";

// Initialize the main navbar
const container = document.getElementById("main_navbar");
container.innerHTML = main_navbar();

// Sidebar functionality
const filter = document.getElementById("filter1");
const sidebar = document.getElementById("sidebar");
const toggle = document.getElementById("toggle");

// Toggle sidebar visibility
toggle.addEventListener("click", () => {
  filter.classList.remove("active");
  sidebar.classList.remove("active");
});

filter.addEventListener("click", () => {
  filter.classList.toggle("active");
  sidebar.classList.toggle("active");
});

// Retrieve cart data from local storage
let cartItems = JSON.parse(localStorage.getItem("cart_items")) || [];
const count = document.getElementById("num");
count.innerText = cartItems.length;

// Product data
const products = [
  {
    label: "You save 57%",
    img: "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/cream_400x.png?v=1642405569",
    img2: "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/c2386af9-4349-432f-8ba5-2b6aa06025c8_400x.png?v=1642405569",
    title: "TRebl boAt Airdopes 131",
    rating: "4.6",
    reviews: "1112",
    price: 1699,
    discountprice: "2990",
    save: "1891",
    quantity: 1,
  },
  {
    label: "NEW",
    img: "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/back_400x.png?v=1657869596",
    img2: "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/c2386af9-4349-432f-8ba5-2b6aa06025c8_400x.png?v=1642405569",
    title: "boAt Airdopes 121 PRO",
    rating: "4.8",
    reviews: "565",
    price: 1399,
    discountprice: "2990",
    save: "1591",
    quantity: 1,
  },
];

document
  .querySelector("#krushna")
  .addEventListener("click", () => sortProducts(products, true));
document
  .querySelector("#krushna2")
  .addEventListener("click", () => sortProducts(products, false));

// Function to sort products based on price
function sortProducts(productData, isAscending) {
  const sortedProducts = productData
    .slice()
    .sort((a, b) => (isAscending ? a.price - b.price : b.price - a.price));
  renderProducts(sortedProducts);
}

// Append products to the DOM
function renderProducts(productData) {
  const container = document.getElementById("products_data");
  container.innerHTML = ""; // Clear previous products to prevent duplication

  productData.forEach((element) => {
    const productCard = createProductCard(element);
    container.appendChild(productCard);
  });
}

// Create a product card element
function createProductCard(product) {
  const mainDiv = document.createElement("div");
  mainDiv.className = "product-card";

  const img1 = document.createElement("img");
  img1.src = product.img;

  const labelDiv = document.createElement("p");
  labelDiv.innerText = product.label;

  const title = document.createElement("h4");
  title.innerText = product.title;

  const ratingText = document.createElement("p");
  ratingText.innerText = `Rating ${product.rating} | ${product.reviews} Reviews`;

  const price = document.createElement("p");
  price.innerText = `₹ ${product.price}`;

  const discountPrice = document.createElement("p");
  discountPrice.innerText = `Offer Price: ₹ ${product.discountprice}`;

  const saveText = document.createElement("p");
  saveText.innerText = `You Save: ₹ ${product.save}`;

  const addToCartBtn = document.createElement("button");
  addToCartBtn.innerText = "ADD TO CART";
  addToCartBtn.addEventListener("click", () => addToCart(product));

  mainDiv.append(
    img1,
    labelDiv,
    title,
    ratingText,
    price,
    discountPrice,
    saveText,
    addToCartBtn
  );

  return mainDiv;
}

// Function to handle adding products to the cart
function addToCart(product) {
  const productExists = cartItems.some(
    (item) => item.productID === product.productID
  );

  if (!productExists) {
    cartItems.push(product);
    localStorage.setItem("cart_items", JSON.stringify(cartItems));
    count.innerText = cartItems.length;
    alert("Product added to cart successfully.");
  } else {
    alert("Product already exists in the cart.");
  }
}

document.getElementById("footer_part").innerHTML = footer();
