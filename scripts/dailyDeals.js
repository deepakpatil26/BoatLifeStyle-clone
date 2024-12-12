// ================= Countdown Timer =================
var countDownDate = new Date("Aug 30, 2022 15:37:25").getTime();

var x = setInterval(function () {
  var now = new Date().getTime();
  var distance = countDownDate - now;

  // Time components
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerText = "The offer has ended";
  } else {
    document.getElementById("demo").innerText =
      "Ending In: " + hours + "h " + minutes + "m " + seconds + "s";
  }
}, 1000);

// ================= Cart Handling =================
const cartButton = document.querySelectorAll(".add_cart");
let container = document.getElementById("container");
let cart_arr = JSON.parse(localStorage.getItem("cart_items")) || [];

cartButton.forEach((box) => {
  box.addEventListener("click", function () {
    console.log("Adding item to cart");

    let productContainer = box.closest(".product"); // Assuming each product has the class 'product'
    let img = productContainer.querySelector("img").src;
    let title = productContainer.querySelector(".product-title").innerText;
    let price = Number(
      productContainer
        .querySelector(".product-price")
        .innerText.replace("₹", "")
    );
    let discount = productContainer.querySelector(".discount")?.innerText;

    let obj = {
      img: img,
      title: title,
      price: price,
      discount: discount,
      quantity: 1,
    };

    cart_arr.push(obj);
    localStorage.setItem("cart_items", JSON.stringify(cart_arr));
    window.location.reload(); // Refresh the page
  });
});

// ================= Sorting Functions =================
function sortLowToHigh() {
  cart_arr.sort((a, b) => a.price - b.price);
  localStorage.setItem("cart_items", JSON.stringify(cart_arr));
  displayCartItems();
}

function sortHighToLow() {
  cart_arr.sort((a, b) => b.price - a.price);
  localStorage.setItem("cart_items", JSON.stringify(cart_arr));
  displayCartItems();
}

// Attach Sorting Buttons
document.getElementById("sortLow").addEventListener("click", sortLowToHigh);
document.getElementById("sortHigh").addEventListener("click", sortHighToLow);

// ================= Display Cart Items Function =================
function displayCartItems() {
  let mainbox = document.querySelector("#vary");
  mainbox.innerHTML = "";
  let totalprice = 0;

  cart_arr.forEach((elem, index) => {
    let product = document.createElement("div");
    product.setAttribute("id", "product");

    let div1 = document.createElement("div");
    div1.setAttribute("id", "div1");
    let img = document.createElement("img");
    img.setAttribute("src", elem.img);

    let div2 = document.createElement("div");
    div2.setAttribute("id", "div2");
    let name = document.createElement("h1");
    name.innerText = elem.title;
    let priceTag = document.createElement("h4");
    priceTag.innerText = "₹ " + elem.price;

    let div5 = document.createElement("div");
    let incrementBtn = document.createElement("button");
    incrementBtn.innerText = "+";
    incrementBtn.addEventListener("click", () => {
      elem.quantity++;
      localStorage.setItem("cart_items", JSON.stringify(cart_arr));
      displayCartItems();
    });

    let decrementBtn = document.createElement("button");
    decrementBtn.innerText = "-";
    decrementBtn.addEventListener("click", () => {
      if (elem.quantity > 1) {
        elem.quantity--;
        localStorage.setItem("cart_items", JSON.stringify(cart_arr));
        displayCartItems();
      }
    });

    let removeBtn = document.createElement("button");
    removeBtn.innerText = "Remove";
    removeBtn.addEventListener("click", () => {
      cart_arr.splice(index, 1);
      localStorage.setItem("cart_items", JSON.stringify(cart_arr));
      displayCartItems();
    });

    div1.appendChild(img);
    div2.append(name, priceTag);
    div5.append(decrementBtn, incrementBtn);
    product.append(div1, div2, div5, removeBtn);
    mainbox.appendChild(product);

    totalprice += elem.quantity * elem.price;
    document.querySelector("#Totalpriceof").innerText = `₹ ${totalprice}`;
  });
}

// Initially display cart items
displayCartItems();
