// Import navbar and footer
import main_navbar from "./components.js";
import { footer } from "./footer.js";

// ========================= Navbar Integration =========================
let navbarContainer = document.getElementById("main_navbar");

// Reload the page on clicking red navbar
document.getElementById("red_navbar").addEventListener("click", () => {
  window.location.reload();
});

let navbar = main_navbar();
navbarContainer.innerHTML = navbar;

// Integrating the Footer Component
document.getElementById("footer_part").innerHTML = footer();

// ========================= Slideshow =========================
let slideIndex = 0;
showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("mySlides");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;

  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

// ========================= Shop Button Hover Effect =========================
document
  .getElementById("Shop_btn")
  .addEventListener("mouseover", createShopDiv);

function createShopDiv() {
  console.log("Shop button hovered");

  let slideshowContainer = document.querySelector(".slideshow-container");
  slideshowContainer.innerHTML = null;

  let div = document.createElement("div");
  div.setAttribute("id", "shop_more_div");

  const images = [
    {
      src: "https://cdn.shopify.com/s/files/1/0057/8938/4802/collections/dropdown-TWS_540x.png?v=1612338251",
      href: "",
    },
    {
      src: "https://cdn.shopify.com/s/files/1/0057/8938/4802/collections/Rectangle271_540x.png?v=1612338387",
      href: "./rockerz.html",
    },
    {
      src: "https://cdn.shopify.com/s/files/1/0057/8938/4802/collections/pro_gear_720x.jpg?v=1648546494",
      href: "",
    },
    {
      src: "https://cdn.shopify.com/s/files/1/0057/8938/4802/collections/latest_background_b4f773ca-05d9-41cc-a7cf-3104993ae895_540x.png?v=1612338356",
      href: "",
    },
  ];

  images.forEach((imgObj) => {
    let img = document.createElement("img");
    img.setAttribute("class", "p_img");
    img.src = imgObj.src;
    if (imgObj.href) {
      img.addEventListener("click", () => {
        window.location.href = imgObj.href;
      });
    }
    div.appendChild(img);
  });

  slideshowContainer.appendChild(div);
}

// ========================= More Button Functionality =========================
document.getElementById("more_btn").addEventListener("click", showMoreItems);

function showMoreItems() {
  event.preventDefault();
  let slideshowContainer = document.querySelector(".slideshow-container");
  slideshowContainer.innerHTML = null;

  let div = document.createElement("div");
  div.setAttribute("id", "more_btn_img");

  slideshowContainer.appendChild(div);
}

// ========================= Scroll to Top Button =========================
let scrollToTopBtn = document.getElementById("myBtn");

// Show button when scrolling down
window.onscroll = () => scrollFunction();

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
}

// Scroll to the top when clicking the button
scrollToTopBtn.addEventListener("click", scrollToTop);

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// ========================= Cart Functionality =========================
let cartArr = JSON.parse(localStorage.getItem("cart_items")) || [];
document.getElementById("num").innerText = cartArr.length;

document
  .querySelector(".add_to_cart_btn")
  .addEventListener("click", addItemToCart);

function addItemToCart() {
  let img = document.querySelector(".products").src;
  let title = document.querySelector(".name").innerText;
  let reviews = document.querySelector(".reviews").innerText;
  let price = document.querySelector(".price").innerText;

  const product = {
    img,
    title,
    reviews,
    price,
    quantity: 1,
  };

  cartArr.push(product);
  localStorage.setItem("cart_items", JSON.stringify(cartArr));

  let cartCount = document.getElementById("num");
  cartCount.innerText = cartArr.length;
}

// ========================= Search Input Handling =========================
let searchInput = document.getElementById("input");

searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    let query = searchInput.value.toLowerCase().trim();

    if (query === "airpods") {
      window.location.href = "./airpods.html";
    } else if (query === "smartwatch") {
      window.location.href = "./smartwatch.html";
    } else if (query === "trending") {
      window.location.href = "../Project Files/payment/add_to_cart.html";
    }
  }
});
