import { getCart, updateCartIcon } from "./global.js";
let cart = [];
cart = getCart();
console.log(cart);
let cartsContainer = document.getElementById("cart-container");
let subtotalDiv = document.querySelector(".cart-subtotal .subtotal");
let counter = document.querySelector("#items-counter");
let clearAllBtn = document.getElementById("clear-all-btn");
clearAllBtn.addEventListener("click", function () {
  if (cart.length > 0) {
    Swal.fire({
      title: "Are you sure?",
      text: "All cart items will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e74c3c",
      cancelButtonColor: "black",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        cart = [];
        updateCart();
        updateCartStorage();
        updateCartIcon();
        updateSubtotal();
        Swal.fire({
          title: "Deleted!",
          text: "Your item has been deleted.",
          icon: "success",
          confirmButtonColor: "black",
        });
      }
    });
  }
});

function updateCart() {
  cartsContainer.classList.remove("cart-empty");
  cartsContainer.innerHTML = "";
  if (cart.length > 0) {
    cart.forEach((element, i) => {
      cartsContainer.append(createCartProd(element, i));
    });
  } else {
    cartsContainer.classList.add("cart-empty");
    cartsContainer.innerHTML = "Cart is empty !";
  }
  updateSubtotal();
  updateCounter();
}

function createCartProd(prod, i) {
  let cartProd = document.createElement("div");
  cartProd.classList.add("cart-product");
  let imgContainer = document.createElement("div");
  imgContainer.classList.add("cart-img-container");
  let img = document.createElement("img");
  img.src = prod.product.image;
  imgContainer.append(img);
  let prodDetails = document.createElement("div");
  prodDetails.classList.add("product-details");
  let prodName = document.createElement("div");
  prodName.classList.add("product-name");
  let titleText = prod.product.title;
  if (titleText.length > 65) {
    titleText = titleText.substring(0, 65) + "...";
  }
  prodName.innerHTML = titleText;
  let controlContainer = document.createElement("div");
  controlContainer.classList.add("control-container");
  let input = document.createElement("input");
  input.type = "number";
  input.id = "quantity";
  input.value = parseFloat(prod.quantity);
  input.min = "1";
  input.classList.add("quantity-input");
  input.addEventListener("change", () => {
    cart[i].quantity = parseFloat(input.value);
    console.log(cart[i].quantity);
    console.log(input.value);
    updateSubtotal();
    updateCart();
    updateCartStorage();
    updateCart();
  });
  let quantityDiv = document.createElement("div");
  quantityDiv.classList.add("quantity-div");
  let minusBtn = document.createElement("button");
  minusBtn.innerHTML = "-";
  minusBtn.addEventListener("click", () => {
    input.value = input.value > 1 ? parseInt(input.value) - 1 : input.value;
    input.dispatchEvent(new Event("change"));
  });
  let plusBtn = document.createElement("button");
  plusBtn.innerHTML = "+";
  plusBtn.addEventListener("click", () => {
    input.value = parseFloat(input.value) + 1;
    input.dispatchEvent(new Event("change"));
  });
  quantityDiv.append(minusBtn, input, plusBtn);
  let btn = document.createElement("button");
  btn.classList.add("remove-btn");
  btn.innerHTML = "Remove";
  btn.addEventListener("click", () => {
    console.log("button clicked");
    cart.splice(i, 1);
    updateCartStorage();
    updateCounter();
    updateSubtotal();
    updateCart();
    updateCartIcon();
  });
  controlContainer.append(quantityDiv, btn);
  prodDetails.append(prodName, controlContainer);
  let price = document.createElement("div");
  price.classList.add("product-price");
  price.innerHTML = "$" + parseFloat(prod.product.price).toFixed(2);
  cartProd.append(imgContainer, prodDetails, price);
  updateSubtotal();
  return cartProd;
}

function updateCartStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateSubtotal() {
  let subtotal = 0;
  cart.forEach((element) => {
    subtotal += parseFloat(element.product.price) * parseInt(element.quantity);
  });
  subtotalDiv.innerHTML = "$" + subtotal.toFixed(2);
}

function updateCounter() {
  counter.innerHTML = `(${cart.length} items)`;
}

updateCart();
