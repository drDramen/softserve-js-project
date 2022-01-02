const modalLink = document.querySelectorAll(".modal-link"),
  modalClose = document.querySelectorAll(".modal__close"),
  body = document.querySelector("body"),
  header = document.querySelector(".header");

let unlock = true;

if (modalLink.length) {
  modalLink.forEach((item) => {
    item.addEventListener("click", function (event) {
      const targetPopup = document.querySelector(this.dataset.modal);
      event.preventDefault();
      openPopup(targetPopup);
    });
  });
}

if (modalClose.length) {
  modalClose.forEach((item) => {
    item.addEventListener("click", function (event) {
      closePopup(item.closest(".modal"));
    });
  });
}

function openPopup(target) {
  const lockPaddingRight =
    window.innerWidth - document.documentElement.clientWidth + "px";
  body.classList.add("lock");
  body.style.paddingRight = lockPaddingRight;
  header.style.paddingRight = lockPaddingRight;
  target.classList.add("active");
  target.addEventListener("click", closeFromLock);
}

function closePopup(target) {
  target.classList.remove("active");
  body.classList.remove("lock");
  body.style.paddingRight = "";
  header.style.paddingRight = "";
  if (target.closest("#cart")) {
    clearCart();
    loadProducts(loadingQuantity);

    const price = document.querySelector(".make-order .price");
    price.innerHTML = "";
    document.querySelector(".make-order").style.display = "none";
  }
  target.removeEventListener("click", closeFromLock);
}

// function bodyLock() {
//   if (body.classList.contains("lock")) {
//     body.classList.remove("lock");
//   } else {
//     body.classList.add("lock");
//   }
// }

function closeFromLock(e) {
  if (!e.target.closest(".modal__area")) {
    closePopup(e.target.closest(".modal"));
  }
}
