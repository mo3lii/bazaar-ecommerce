import {
  createCard,
  createRating,
  updateCartIcon,
  addToCartStorage,
  isExistInCart,
  showFetchErrorScreen,
  showLoadingScreen,
  hideFetchErrorScreen,
  hideLoadingScreen,
} from "./global.js";
updateCartIcon();
var urlParams = new URLSearchParams(window.location.search);
var productId = urlParams.get("productid");
let currentProd;
let prodImg = document.querySelector("#details-prod-img img");
let prodTitle = document.querySelector("#prod-details .prod-title");
let prodCat = document.getElementById("prod-category");
let description = document.getElementById("prod-description");
let price = document.getElementsByClassName("prod-price")[0];
let rating = document.getElementsByClassName("rating")[0];

function updateDetails(prod) {
  prodImg.src = prod.image;
  prodTitle.innerHTML = prod.title;
  prodCat.innerHTML = prod.category;
  description.innerHTML = "Description : " + prod.description;
  price.innerHTML = prod.price;

  rating.appendChild(createRating(prod.rating));
  console.log("ratee");
}

////////start products//////////////////////////////////

let productsBox = document.querySelector(".products");
let similarCat = document.querySelector("#similar-title span");
fetch(`https://fakestoreapi.com/products/${productId}`)
  .then((res) => res.json())
  .then((product) => {
    currentProd = product;
    updateDetails(product);
    addCartBtnLestiner();
    console.log(product);
    return product;
  })
  .then((product) => {
    fetch(
      `https://fakestoreapi.com/products/category/${product.category}?limit=4`
    )
      .then((res) => res.json())
      .then((products) => {
        // let filtered = products.filter((prod) => prod.id != currentProd.id);
        // console.log(products, filtered);
        similarCat.innerHTML = product.category;
        for (let i = 0; i < products.length; i++) {
          let curr = createCard(products[i]);
          productsBox.appendChild(curr);
        }
      });
  });

let addCartBtn = document.getElementsByClassName("add-to-cart")[0];

//add to cart button
// let addCartBtn = document.createElement("button");
function addCartBtnLestiner() {
  addCartBtn.classList.add("add-to-cart");
  let cartIcon = document.createElement("i");
  let addToCartP = document.createElement("p");
  if (isExistInCart(currentProd)) {
    addCartBtn.disabled = true;
    cartIcon.classList = "fa-solid fa-check";
    let addToCartP = document.createElement("p");
    addToCartP.innerHTML = "added to cart";
    addCartBtn.append(cartIcon, addToCartP);
    addCartBtn.style.backgroundColor = "gray";
  } else {
    cartIcon.classList = "fa-solid fa-cart-shopping";
    addToCartP.innerHTML = "add to cart";
  }
  addCartBtn.append(cartIcon, addToCartP);
  addCartBtn.addEventListener("click", function () {
    if (addToCartStorage(currentProd)) {
      Swal.fire({
        position: "center-ccenter",
        icon: "success",
        title: "Item Added to your cart",
        showConfirmButton: false,
        timer: 1500,
      });
      addCartBtn.disabled = true;
      addCartBtn.innerHTML = "";
      cartIcon.classList = "fa-solid fa-check";
      let addToCartP = document.createElement("p");
      addToCartP.innerHTML = "added to cart";
      addCartBtn.append(cartIcon, addToCartP);
      addCartBtn.style.backgroundColor = "gray";
      //update icon
      updateCartIcon();
    }
  });
  //end add to cart button
}
