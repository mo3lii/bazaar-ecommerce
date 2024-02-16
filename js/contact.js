let contactForm = document.querySelector(".contact-form");
let emailForm = document.querySelector(".contact-form .email input");
let namesInputs = document.querySelectorAll(".names input");
let msg = document.querySelector(".contact-form textarea");
let allInputs = document.querySelectorAll(
  "textarea, .contact-form input:not(input[type='submit'])"
);
let errors = document.querySelectorAll(".error");
console.log(allInputs);
function validateName(ele) {
  if (ele.value.trim().length > 1) {
    return true;
  }
  return false;
}

function validateMessage(ele) {
  if (ele.value.split(" ").length >= 10) {
    //10 words atleast
    return true;
  }
  return false;
}

function validateEmail(ele) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (emailRegex.exec(ele.value)) {
    return true;
  }
  return false;
}

function showErr(ele, msg) {
  ele.classList.add("error-border");
  ele.nextElementSibling.innerHTML = msg;
}

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  allInputs.forEach((e) => e.classList.remove("error-border"));
  errors.forEach((e) => (e.innerHTML = ""));
  if (!validateName(namesInputs[0])) {
    showErr(namesInputs[0], "Please use valid name");
    // return;
  }
  if (!validateName(namesInputs[1])) {
    showErr(namesInputs[1], "Please use valid name");
    // return;
  }
  if (!validateEmail(emailForm)) {
    showErr(emailForm, "Please use valid email :  example@mail.com");
    // return;
  }
  if (!validateMessage(msg)) {
    showErr(msg, "Message should be atleast 10 words");
    // return;
  } else {
    Swal.fire({
      position: "center-center",
      icon: "success",
      title: "Your Message Sent Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    allInputs.forEach((e) => (e.value = ""));
  }
});
