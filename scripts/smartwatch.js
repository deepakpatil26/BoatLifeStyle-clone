// ==============================
// Navbar Integration
// ==============================
import main_navbar from "./components.js";

function loadNavbar() {
  const container = document.getElementById("main_navbar");
  const navbarHTML = main_navbar();
  container.innerHTML = navbarHTML;
}

loadNavbar();

// ==============================
// Sidebar Interaction
// ==============================
const filter = document.getElementById("filter1");
const sidebar = document.getElementById("sidebar");
const toggle = document.getElementById("toggle");

toggle.onclick = function () {
  filter.classList.remove("active");
  sidebar.classList.remove("active");
};

filter.onclick = function () {
  filter.classList.toggle("active");
  sidebar.classList.toggle("active");
};

// ==============================
// Product Data
// ==============================
const product = [
  {
    label: "You save 57%",
    img: "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/main_black_72207866-b34c-4b47-885d-998168d62245_400x.png?v=1648108781",
    img2: "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/c2386af9-4349-432f-8ba5-2b6aa06025c8_400x.png?v=1642405569",
    title: "TRebl boAt Smart Watches 131",
    rating: "4.6",
    reviews: "1112",
    price: 1699,
    discountprice: "2990",
    save: "1891",
    quantity: 1,
  },
  {
    label: "You save 60%",
    img: "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/main1_86ea6392-558a-4943-ab86-f9f12fe8f4d9_400x.png?v=1646393709",
    img2: "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/c2386af9-4349-432f-8ba5-2b6aa06025c8_400x.png?v=1642405569",
    title: "boAt Smart Watches 411 ANC",
    rating: "4.8",
    reviews: "56",
    price: 1999,
    discountprice: "4990",
    save: "2991",
    quantity: 1,
  },
];

// ==============================
// Sorting Buttons
// ==============================
document.getElementById("krushna").addEventListener("click", () => {
  sortProducts(product, "asc");
});

document.getElementById("krushna2").addEventListener("click", () => {
  sortProducts(product, "desc");
});

/**
 * Function to sort products
 * @param {Array} products - The product array
 * @param {String} order - Sorting order ('asc' or 'desc')
 */
function sortProducts(products, order) {
  const sortedProducts = products.slice(); // Clone the product array
  sortedProducts.sort((a, b) => {
    return order === "asc" ? a.price - b.price : b.price - a.price;
  });
  renderProducts(sortedProducts);
}

// ==============================
// Rendering Products to the DOM
// ==============================
/**
 * Appends products to the DOM
 * @param {Array} products - The product array to render
 */
function renderProducts(products) {
  const container = document.getElementById("products_data");
  container.innerHTML = ""; // Clear previous content

  products.forEach((element) => {
    const main_div = document.createElement("div");

    const imageDiv = document.createElement("div");
    const img1 = document.createElement("img");
    img1.src = element.img;

    const detailsDiv = document.createElement("div");
    const title = document.createElement("h4");
    const offerPrice = document.createElement("p");
    const rating = document.createElement("p");
    const price = document.createElement("p");
    const save = document.createElement("p");
    const button = document.createElement("button");

    button.innerText = "ADD TO CART";
    button.addEventListener("click", () => addToCart(element));

    title.innerText = element.title;
    offerPrice.innerText = `Offer: ₹${element.discountprice}`;
    rating.innerText = `Rating: ${element.rating} | ${element.reviews} Reviews`;
    price.innerText = `Price: ₹${element.price}`;
    save.innerText = `You Save: ₹${element.save}`;

    detailsDiv.append(title, rating, offerPrice, price, save, button);
    imageDiv.append(img1);
    main_div.append(imageDiv, detailsDiv);

    container.appendChild(main_div);
  });
}

/**
 * Adds product to localStorage cart
 * @param {Object} product - The product to add
 */
function addToCart(product) {
  let cartItems = JSON.parse(localStorage.getItem("cart_items")) || [];
  cartItems.push(product);
  localStorage.setItem("cart_items", JSON.stringify(cartItems));
  alert("Product added to cart!");
}

// Initial product rendering
renderProducts(product);
