import main_navbar from "./components.js";

// Initialize navbar
let container = document.getElementById("main_navbar");
document.getElementById("red_navbar").addEventListener("click", function () {
  window.location.reload();
});
let navbar = main_navbar();
container.innerHTML = navbar;

// Optimized dropdown functionality
function initDropdown() {
  const dropdown = document.querySelector('.dropdown');
  const dropdownContent = document.querySelector('.dropdown-content');
  const dropbtn = document.querySelector('.dropbtn');
  
  if (!dropdown || !dropdownContent || !dropbtn) return;
  
  let isVisible = false;
  let hideTimeout;
  
  const showDropdown = () => {
    if (hideTimeout) clearTimeout(hideTimeout);
    if (isVisible) return;
    
    dropdownContent.style.display = 'block';
    requestAnimationFrame(() => {
      dropdownContent.style.opacity = '1';
      dropdownContent.style.visibility = 'visible';
    });
    isVisible = true;
  };
  
  const hideDropdown = (delay = 0) => {
    if (hideTimeout) clearTimeout(hideTimeout);
    if (!isVisible) return;
    
    const hide = () => {
      dropdownContent.style.opacity = '0';
      dropdownContent.style.visibility = 'hidden';
      setTimeout(() => {
        if (dropdownContent.style.opacity === '0') {
          dropdownContent.style.display = 'none';
        }
      }, 300);
      isVisible = false;
    };
    
    hideTimeout = setTimeout(hide, delay);
  };
  
  // Event listeners
  dropbtn.addEventListener('click', (e) => {
    e.stopPropagation();
    isVisible ? hideDropdown() : showDropdown();
  });
  
  dropdown.addEventListener('mouseenter', showDropdown);
  dropdown.addEventListener('mouseleave', () => hideDropdown(300));
  
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) hideDropdown();
  });
  
  dropdownContent.addEventListener('click', (e) => e.stopPropagation());
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initDropdown);

import { footer } from "./footer.js";
document.getElementById("footer_part").innerHTML = footer();

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

let more_btn = document.getElementById("more_btn");
more_btn.addEventListener("click", function () {
  more();
});

let more = () => {
  event.preventDefault();
  let con = document.querySelector(".slideshow-container");
  con.innerHTML = null;

  let div = document.createElement("div");
  div.setAttribute("id", "more_btn_img");

  con.append(div);
};

// ==============================================================
//Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", topFunction);
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

let car_arr = JSON.parse(localStorage.getItem("cart_items")) || [];
document.getElementById("num").innerText = car_arr.length;

document
  .querySelector(".add_to_cart_btn")
  .addEventListener("click", function () {
    addItemtocar();
  });

let addItemtocar = () => {
  let img = document.querySelector(".products").src;
  let title = document.querySelector(".name").innerText;
  let reviews = document.querySelector(".reviews").innerText;
  let price = document.querySelector(".price").innerText;

  console.log(img, title, reviews, price);

  function data(i, t, r, p, q) {
    this.img = i;
    this.title = t;
    this.reviews = r;
    this.price = p;
    this.quantity = q;
  }
  let p1 = new data(img, title, reviews, price, 1);
  console.log(p1);
  car_arr.push(p1);

  localStorage.setItem("cart_items", JSON.stringify(car_arr));
  let el = document.getElementById("num");
  el.innerText = null;
  el.innerText = car_arr.length;
};

//  let data = JSON.parse(localStorage.getItem("cart_items")) || [];

//  let num = data.length;
//  console.log(num);

var input = document.getElementById("input");

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    let q = input.value;
    if (q === "airpods") {
      window.location.href = "./airpods.html";
    } else if (q === "smartwatch") {
      window.location.href = "./smartwatch.html";
    } else if (q === "trending") {
      window.location.href = "../Project Files/payment/add_to_cart.html";
    }
  }
});
