import {
  createCard,
  getCart,
  updateCartIcon,
  showLoadingScreen,
  showFetchErrorScreen,
  hideLoadingScreen,
  hideFetchErrorScreen,
} from "./global.js";

/////////////////////////////////////////////////
//////// toast //////////////////////////////////
const toastLiveExample = document.getElementById("liveToast");
////////////to top //////////////////////////////
let toTopBtn = document.getElementById("scroll-to-top");
document.addEventListener("scroll", function () {
  var scrollPosition = window.scrollY;
  if (scrollPosition > 100) {
    toTopBtn.style.display = "flex";
  } else {
    toTopBtn.style.display = "none";
  }
});

toTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

///////// slider ////////////////////////////////
let slider = document.querySelector(".slider");
let sliderBullets = document.querySelectorAll("ul.bullets li");
let sliderImgs = [
  // "https://github.com/mo3lii/my-cloud/blob/main/slider00.jpg",
  // "https://github.com/mo3lii/my-cloud/blob/main/slider01.jpg",
  // "https://github.com/mo3lii/my-cloud/blob/main/slider02.jpg",
];
for (let i = 0; i < 3; i++) {
  sliderImgs.push(`/images/slider/slider0${i}.jpg`);
}

let sliderIndex = 1;
function changeSliderImg() {
  sliderBullets.forEach(function (ele) {
    ele.classList.remove("active-bullet");
  });
  sliderBullets[sliderIndex].classList.add("active-bullet");
  slider.style.backgroundImage = `url("${sliderImgs[sliderIndex]}")`;
}
function NextsliderIndex() {
  sliderIndex = (sliderIndex + 1) % sliderImgs.length;
}
function PrevsliderIndex() {
  sliderIndex = --sliderIndex < 0 ? sliderImgs.length - 1 : sliderIndex;
}
function startInterval() {
  return setInterval(() => {
    changeSliderImg();
    NextsliderIndex();
  }, 7000);
}

let sliderInterval = startInterval();

let controls = document.querySelector(".controls");
controls.addEventListener("click", function (e) {
  if (e.target.id == "slider-left") {
    clearInterval(sliderInterval);
    sliderInterval = startInterval();
    PrevsliderIndex();
    changeSliderImg();
  } else if (e.target.id == "slider-right") {
    clearInterval(sliderInterval);
    sliderInterval = startInterval();
    NextsliderIndex();
    changeSliderImg();
  }
});
let productsBox = document.querySelector(".products");

/////////////////////////////////////////////////

///////start categories ////////////////////////////////
let catsDiv = document.querySelector(".categories-spans");
fetch("https://fakestoreapi.com/products/categories")
  .then((res) => res.json())
  .then((categories) => {
    for (let i = 0; i < categories.length; i++) {
      let span = document.createElement("span");
      span.innerHTML = categories[i];
      catsDiv.appendChild(span);
    }
    let allSpans = document.querySelectorAll(".categories-spans span");
    allSpans.forEach(function (curr, i, arr) {
      curr.addEventListener("click", (e) => {
        arr.forEach((element) => {
          element.classList.remove("active-cat");
        });
        e.target.classList.add("active-cat");
        updateProducts(e.target.innerHTML);
      });
    });
  });

///////end categories //////////////////////////////////

////////start products//////////////////////////////////

function updateProducts(category) {
  let cat = "";
  if (category) {
    if (category == "all") {
      cat = "";
    } else {
      cat = `/category/${category}`;
    }
  }

  hideFetchErrorScreen();
  showLoadingScreen();
  fetch(`https://fakestoreapi.com/products${cat}`)
    .then((res) => res.json())
    .then((products) => {
      productsBox.innerHTML = "";
      console.log(products);
      for (let i = 0; i < products.length; i++) {
        let currentProd = createCard(products[i]);
        productsBox.appendChild(currentProd);
      }
      hideLoadingScreen();
    })
    .catch(() => {
      showFetchErrorScreen();
    });
}

updateProducts();
console.log("cart:" + getCart().length);
