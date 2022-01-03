const cartCount = document.querySelector(".cart__count");
const cartLink = document.querySelector(".cart__btn");
const makeOrder = document.querySelector(".make-order-btn");
const cartBody = document.querySelector(".cart-items tbody");
const errorMsg = document.querySelector('.make-order > .error');

let afterOrder = false;

function setCardCount() {
  if (currentUser) {
    cartCount.innerHTML = currentUser.cart.size;
    if (currentUser.cart.size) {
      cartCount.style.display = "inline-flex";
    } else {
      cartCount.style.display = "none";
    }
  }
}

function clearCart() {
  cartBody.innerHTML = "";
}

cartLink.addEventListener("click", renderCart);

makeOrder.onclick = function (event) {
  event.preventDefault();

  try {
    if (currentUser.name == undefined || currentUser.money == undefined) {
      throw new Error("Авторизуйтесь!");
    }
    if (currentUser.money < currentUser.cart.totalSum) {
      throw new Error("Не достатньо коштів!");
    }
    currentUser.cart.checkout();
    afterOrder = true;
    setCardCount();
    renderCatalog(loadingQuantity);
    renderCart();
  } catch (error) {
    errorMsg.innerHTML = error.message
  }
};

function renderCart() {
  clearCart();
  if (currentUser && currentUser.cart.size) {
    document.querySelector(".make-order").style.display = "flex";
    currentUser.cart.goods.forEach((item) => {
      const currentItem = findProduct(item.id);
      cartBody.innerHTML += `
          <tr>
            <td>
              <img class="cart-item__img" src="${currentItem.mainImg}" alt="${
        currentItem.name
      }">
            </td>
            <td><p>${currentItem.name}</p></td>
            <td><p>${
              currentItem.price
            }<span class="product__price-currency">&nbsp;&#8372;</span></p></td>
            <td>
              <div class="product__counter counter" style="display: flex" data-id="${
                currentItem.id
              }">
              <button class="btn-reset counter__btn counter__dcr" type="button">
                <svg>
                  <use xlink:href="img/sprite.svg#dcr"></use>
                </svg>
              </button>
              <input class="counter__input" type="text" value="${
                item.quantity
              }" />
              <button class="btn-reset counter__btn counter__incr" type="button" ${
                item.quantity < currentItem.amount || "disabled"
              }>
                <svg>
                  <use xlink:href="img/sprite.svg#incr"></use>
                </svg>
              </button>
            </div>
            </td>
            <td>
              <button class="btn-reset cart-item__delete" data-id="${
                item.id
              }" type="button">
                <svg>
                  <use xlink:href="img/sprite.svg#trash"></use>
                </svg>
              </button>
            </td>
          </tr>
        `;
    });

    document.querySelector(".make-order .price").innerHTML =
      currentUser.cart.totalSum;
  } else {
    cartBody.innerHTML = afterOrder
      ? `
    <tr>
      <td class="fade"><p style="padding: 30px 14px 80px;
      font-size: 36px;">Дякуємо за замовлення</p></td>
    </tr>
      `
      : `
      <tr>
        <td class="fade"><p style="padding: 30px 14px 80px;
        font-size: 36px;">Порожній кошик</p></td>
      </tr>
      `;
    afterOrder = false;
    const price = document.querySelector(".make-order .price");
    price.innerHTML = "";
    document.querySelector(".make-order").style.display = "none";
  }

  const itemDelete = document.querySelectorAll(".cart-item__delete");

  itemDelete.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      currentUser.cart.removeProduct(item.dataset.id);
      setCardCount();
      renderCart();
    });
  });
  saveToLS(currentUser);
}

cartBody.addEventListener("click", counterControl);

function counterControl(e) {
  e.stopPropagation();
  const counter = e.target.closest(".counter");

  if (counter) {
    const productId = counter.dataset.id;
    const counterInput = counter.querySelector(".counter__input");
    const incr = counter.querySelector(".counter__incr");
    const dcr = counter.querySelector(".counter__dcr");
    const productStock = findProduct(productId).amount;

    if (dcr.contains(e.target)) {
      if (counterInput.value > 1 && counterInput.value <= productStock) {
        counterInput.value--;
        incr.disabled = false;
        currentUser.cart.changeQuantity(productId, counterInput.value);
      } else {
        currentUser.cart.removeProduct(productId);
      }
      renderCart();
    } else if (incr.contains(e.target)) {
      if (counterInput.value < productStock) {
        counterInput.value++;
        currentUser.cart.changeQuantity(productId, counterInput.value);
      }
      if (counterInput.value == productStock) {
        incr.disabled = true;
      }
      renderCart();
    }
    setCardCount();
  }
}

cartBody.addEventListener("keypress", (e) => {
  if (e.target.closest(".counter__input")) {
    isNumber(e);
  }
});

cartBody.addEventListener("change", (e) => {
  if (e.target.closest(".counter__input")) {
    const counter = e.target.closest(".counter");
    const productId = counter.dataset.id;
    const incr = counter.querySelector(".counter__incr");
    const productStock = findProduct(productId).amount;

    if (e.target.value == 0) {
      currentUser.cart.removeProduct(productId);
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
    renderCart();
  }
});
