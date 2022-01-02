const cartCount = document.querySelector(".cart__count");
const cartLink = document.querySelector(".cart__btn");
const makeOrder = document.querySelector(".make-order-btn");
const cartBody = document.querySelector(".cart-items tbody");

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
  currentUser.cart.checkout();

  closePopup(event.target.closest(".popup"));
  checkMoney();
  checkCart();
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
              <img class="cart-item__img" src="${currentItem.mainImg}" alt="${currentItem.name}">
            </td>
            <td><p>${currentItem.name}</p></td>
            <td><p>${currentItem.price}<span class="product__price-currency">&nbsp;&#8372;</span></p></td>
            <td>
              <div class="product__counter counter" style="display: flex">
              <button class="btn-reset counter__btn counter__dcr" type="button">
                <svg>
                  <use xlink:href="img/sprite.svg#dcr"></use>
                </svg>
              </button>
              <input class="counter__input" type="text" value="${item.quantity}" />
              <button class="btn-reset counter__btn counter__incr" type="button">
                <svg>
                  <use xlink:href="img/sprite.svg#incr"></use>
                </svg>
              </button>
            </div>
            </td>
            <td>
              <button class="btn-reset cart-item__delete" data-id="${item.id}" type="button">
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
    cartBody.innerHTML = `
      <tr>
        <td><p style="padding: 30px 14px 80px;
        font-size: 36px;">Порожній кошик</p></td>
      </tr>
    `;

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
}
