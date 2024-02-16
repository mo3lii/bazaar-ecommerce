sessionStorage.setItem("cart", JSON.stringify(""));

///////// Nav  //////////////////////////////////
let menuBar = document.querySelector(".menu-bar");
let navList = document.querySelector("nav ul");
let toastBox = document.getElementsByClassName("toast-box")[0];
menuBar.addEventListener("click", function () {
  navList.classList.toggle("show-menu");
});

let navLi = document.querySelectorAll("nav ul li");

navLi.forEach(function (ele, index, arr) {
  ele.addEventListener("click", function (e) {
    arr.forEach((ele) => {
      ele.classList.remove("nav-active");
    });
    ele.classList.add("nav-active");
  });
});

////loading screen///////////
let loadingScreen = document.getElementById("loading-screen");
///////fetch error screen///////////
let fetchErrorScreen = document.getElementById("error-fetch-screen");
/////////////////////////////

///////////////////////////////////////////////
export function createRating(ratingObj) {
  let rating = document.createElement("div");
  rating.classList.add("rating");
  let solidStarsNum = Math.floor(ratingObj.rate);
  let outlinedStarsNum = 5 - solidStarsNum;
  for (let i = 0; i < solidStarsNum; i++) {
    let solidStar = document.createElement("i");
    solidStar.classList.add("fa-solid");
    solidStar.classList.add("fa-star");
    rating.appendChild(solidStar);
  }
  for (let i = 0; i < outlinedStarsNum; i++) {
    let outlinedStar = document.createElement("i");
    outlinedStar.classList.add("fa-regular");
    outlinedStar.classList.add("fa-star");
    rating.appendChild(outlinedStar);
  }
  let ratingCount = document.createElement("span");
  ratingCount.innerHTML = "(" + ratingObj.count + ")";
  rating.appendChild(ratingCount);
  return rating;
}

////////////////////////////////////////////////////////////
export function createCard(prod) {
  let card = document.createElement("div");
  card.classList.add("card");

  let prodImg = document.createElement("div");
  prodImg.classList.add("prod-img");

  let img = document.createElement("img");
  img.src = prod.image;
  prodImg.appendChild(img);

  let prodTitle = document.createElement("p");
  prodTitle.classList.add("prod-title");
  let maxLength = 50;
  let titleText = prod.title;
  if (titleText.length > maxLength) {
    titleText = titleText.substring(0, maxLength) + "...";
  }
  prodTitle.innerHTML = titleText;

  let rating = createRating(prod.rating);
  let price = document.createElement("span");
  price.classList.add("prod-price");
  let priceValue = parseFloat(prod.price);
  let formattedMoney = priceValue.toFixed(2);
  price.innerHTML = formattedMoney;

  //add to cart button
  let addCartBtn = document.createElement("button");
  addCartBtn.classList.add("add-to-cart");
  let cartIcon = document.createElement("i");
  let addToCartP = document.createElement("p");
  if (isExistInCart(prod)) {
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
    if (addToCartStorage(prod)) {
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Item Added to your cart",
        showConfirmButton: false,
        timer: 1500,
      });
      addCartBtn.disabled = true;
      this.innerHTML = "";
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
  card.append(prodImg, prodTitle, rating, price, addCartBtn);
  card.addEventListener("click", (e) => {
    if (
      e.target.tagName != "BUTTON" &&
      e.target.parentNode.tagName != "BUTTON"
    ) {
      console.log(e.target.tagName + " clicked");
      window.location.href = "prod-details.html?productid=" + prod.id;
    }
  });
  return card;
}

export function addToCartStorage(item) {
  // Retrieve existing cart data from sessionStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Add the new item to the cart
  let cartItem = {
    product: item,
    quantity: 1,
  };

  let isExist = cart.find((cartItem) => cartItem.product.id === item.id);

  if (!isExist) {
    cart.push(cartItem);
    // Store the updated cart data back in sessionStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    return true;
  }
}

export function isExistInCart(item) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let isExist = cart.find((cartItem) => cartItem.product.id === item.id);
  if (isExist) {
    return true;
  } else {
    return false;
  }
}

export function getCart() {
  // Retrieve cart data from sessionStorage
  return JSON.parse(localStorage.getItem("cart")) || [];
}

export function updateCartIcon() {
  let cartElement = document.querySelector(".cart");
  cartElement.style.setProperty("--content", `"${getCart().length}"`);
}

///////end products ///////////////////////////////////

export function showLoadingScreen() {
  loadingScreen.style.display = "flex";
}

export function hideLoadingScreen() {
  loadingScreen.style.display = "none";
}

///////error fetching screen/////////////////////////////

export function showFetchErrorScreen() {
  fetchErrorScreen.style.display = "flex";
}

export function hideFetchErrorScreen() {
  fetchErrorScreen.style.display = "none";
}
updateCartIcon();
