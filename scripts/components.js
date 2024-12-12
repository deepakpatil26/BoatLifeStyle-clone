// Function to create and export the navbar
let main_navbar = () => {
  return `
      <div id="navbar">
          <!-- Logo -->
          <a href="./index.html">
              <img id="boat_icon" src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Boat-Logo_200x_200x_f9c79bf9-9c9a-477d-ab6a-7c889a1f2f70_170x.png?v=1646731229" alt="Boat Logo">
          </a>
  
          <!-- Buttons Section -->
          <div id="btn_div">
              <a id="Shop_btn" href="./Shop.html">Shop &#9660;</a>
              <a href="./dailyDeals.html">Daily Deals</a>
              <a href="./offerzone.html">Offer Zones</a>
              <a id="more_btn" href="../Project Files/payment/add_to_cart.html">More &#9660;</a>
          </div>
  
          <!-- Search Bar -->
          <div id="input_div">
              <input placeholder="🔍 Search products..." type="text" id="input" />
          </div>
  
          <!-- User Buttons -->
          <div id="l_g_c_btns">
              <button onclick="window.location.href='./Sign_in.html'">
                  <img id="l_img" src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/navigation-Icon4.png?v=1655206048" alt="Sign In">
              </button>
              <button onclick="window.location.href='./giftcard.html'">
                  <img id="g_img" src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/gift.png?v=1606314809" alt="Gift Card">
              </button>
              <button onclick="window.location.href='./payment/cart.html'">
                  <img id="cart_img" src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/navigation-Icon-3.png?v=1655206047" alt="Cart">
                  <p id="cart_counter">0</p>
              </button>
          </div>
      </div>
    `;
};

export default main_navbar;
