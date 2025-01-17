let user_details = JSON.parse(localStorage.getItem("cart_items")) || [];

let open_manual = () => {
  document.getElementById("manual").style.display = "block";
};
document.getElementById("open_manual").addEventListener("click", open_manual);
document.getElementById("submit").addEventListener("click", submit);

let submit = () => {
  if (
    document.getElementById("full_name").value != "" &&
    document.getElementById("address").value != "" &&
    document.getElementById("apartment").value != "" &&
    document.getElementById("town_city").value != "" &&
    document.getElementById("state").value != "" &&
    document.getElementById("zipcode").value != "" &&
    document.getElementById("contact").value != "" &&
    document.getElementById("name_on_card").value != "" &&
    document.getElementById("card_number").value != "" &&
    document.getElementById("cvv_i").value != ""
  ) {
    let user_obj = {
      name: document.getElementById("name_on_card").value,
      contact: document.getElementById("contact").value,
      card_number: document.getElementById("card_number").value,
      cvv: document.getElementById("cvv_i").value,
    };

    user_details[0] = user_obj;

    localStorage.setItem("cart_items", JSON.stringify(user_details));

    alert("payment proseccing");
    window.location.href = "opt.html";
  } else {
    alert("Please fill all the required information");
  }

  // }
};
