catalogList.addEventListener("click", (e) => {
  const productControl = e.target.closest(".product__control");

  if (productControl) {
    const productId = productControl.dataset.productId;
    const productName = productControl.dataset.productName;
    const counterInput = productControl.querySelector(".counter__input");
    const incr = productControl.querySelector(".counter__incr");
    const dcr = productControl.querySelector(".counter__dcr");
    const productStock = findProduct(productId).amount;

    if (e.target.classList.contains("product__btn")) {
      currentUser.cart.addProduct(productId, productName);
      e.target.closest(".product").classList.add("product--inCart");
    } else if (dcr.contains(e.target)) {
      if (counterInput.value > 1 && counterInput.value <= productStock) {
        counterInput.value--;
        incr.disabled = false;
        currentUser.cart.changeQuantity(productId, counterInput.value);
      } else {
        currentUser.cart.removeProduct(productId);
        e.target.closest(".product").classList.remove("product--inCart");
      }
    } else if (incr.contains(e.target)) {
      if (counterInput.value < productStock) {
        counterInput.value++;
        currentUser.cart.changeQuantity(productId, counterInput.value);
      }
      if (counterInput.value == productStock) {
        incr.disabled = true;
      }
    }
    setCardCount();
  }
});

catalogList.addEventListener("input", (e) => {
  if (e.target.closest(".counter__input")) {
    const productControl = e.target.closest(".product__control");
    const productId = productControl.dataset.productId;
    const productName = productControl.dataset.productName;
    const incr = productControl.querySelector(".counter__incr");
    const productStock = findProduct(productId).amount;

    if (e.target.value == 0) {
      currentUser.cart.removeProduct(productId);
      e.target.closest(".product").classList.remove("product--inCart");
      e.target.value = 1;
      incr.disabled = false;
    } else if (e.target.value >= productStock) {
      incr.disabled = true;
      e.target.value = productStock;
      currentUser.cart.changeQuantity(productId, e.target.value);
    } else {
      incr.disabled = false;
      currentUser.cart.changeQuantity(productId, e.target.value);
    }

    setCardCount();
  }
});

catalogList.addEventListener("keypress", (e) => {
  if (e.target.closest(".counter__input")) {
    isNumber(e);
  }
});
