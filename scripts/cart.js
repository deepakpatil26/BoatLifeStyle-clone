var mainbox = document.querySelector("#vary");
var totalpriceElem = document.querySelector("#Totalpriceof");

var cartdata = JSON.parse(localStorage.getItem("cart_items")) || [];
console.log(cartdata);

// Function to display cart items
function displaydata(cartdata) {
  mainbox.innerHTML = "";
  let totalprice = 0;

  cartdata.forEach((elem, index) => {
    const productTotal = elem.price * elem.quantity;
    totalprice += productTotal;

    // Create product DOM elements
    const product = createProductCard(elem, index);

    mainbox.appendChild(product);
  });

  totalpriceElem.innerText = `₹ ${totalprice}`;
}

// Function to create a product card
function createProductCard(elem, index) {
  const product = document.createElement("div");
  product.setAttribute("class", "product");

  const img = document.createElement("img");
  img.src = elem.img;

  const title = document.createElement("h1");
  title.innerText = elem.title;
  title.style.color = "white";

  const price = document.createElement("h4");
  price.innerText = `₹ ${elem.price}`;
  price.style.color = "white";

  const quantityDiv = document.createElement("div");
  const decrementBtn = document.createElement("button");
  decrementBtn.innerText = "-";
  decrementBtn.addEventListener("click", () => updateQuantity(index, -1));

  const quantitySpan = document.createElement("span");
  quantitySpan.innerText = elem.quantity;

  const incrementBtn = document.createElement("button");
  incrementBtn.innerText = "+";
  incrementBtn.addEventListener("click", () => updateQuantity(index, 1));

  quantityDiv.appendChild(decrementBtn);
  quantityDiv.appendChild(quantitySpan);
  quantityDiv.appendChild(incrementBtn);

  const removeBtn = document.createElement("button");
  removeBtn.innerText = "Remove";
  removeBtn.addEventListener("click", () => deleteFromCart(index));

  product.append(img, title, price, quantityDiv, removeBtn);

  return product;
}

// Function to update quantity
function updateQuantity(index, change) {
  cartdata[index].quantity = Math.max(1, cartdata[index].quantity + change);
  localStorage.setItem("cart_items", JSON.stringify(cartdata));
  displaydata(cartdata);
}

// Function to remove a product from the cart
function deleteFromCart(index) {
  cartdata.splice(index, 1);
  localStorage.setItem("cart_items", JSON.stringify(cartdata));
  displaydata(cartdata);
}

// Initial call to display cart items
displaydata(cartdata);
