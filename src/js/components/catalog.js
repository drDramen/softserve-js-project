const catalogList = document.querySelector(".catalog-list");
const catalogLoadMore = document.querySelector(".catalog__more");

let loadingQuantity = 4;
let catalogLength = null;

if (catalogList) {
  loadProducts(loadingQuantity);
  catalogLoadMore.addEventListener("click", (e) => {
    loadingQuantity += 4;

    loadProducts(loadingQuantity);

    if (loadingQuantity >= catalogLength) {
      catalogLoadMore.style.display = "none";
    } else {
      catalogLoadMore.style.display = "block";
    }
  });
}

async function loadProducts(loadingQuantity) {
  const response = await fetch("./data/products.json");

  result = await response.json();

  products = result.map((e) => Object.assign(new Product(), e));

  catalogLength = products.length;

  catalogList.innerHTML = "";

  for (let i = 0; i < catalogLength; i++) {
    if (i < loadingQuantity) {
      let item = products[i];
      let isAvailability = !!item.amount || false;

      const { isInCart, inCartValue } = isProductInCart(item.id);

      catalogList.innerHTML += `
      <li class="catalog-list__item">
        <article
          class="product ${isInCart ? "product--inCart" : ""} ${
        !isAvailability ? "product--disabled" : ""
      }">
          <div class="product__img">
            <img src="${item.mainImg}" alt="${item.name}" />
          </div>
          <div class="product__content">
            <h3 class="product__title">${item.name}</h3>
            <p class="product__description"></p>
            <div class="product__price">
              <span class="product__price-value">${item.price}</span>
              <span class="product__price-currency">&nbsp;&#8372;</span>
            </div>
            <div class="product__availability">
            ${isAvailability ? "Є в наявності" : "Немає в наявності"}
            </div>
            <div class="product__control" data-product-id="${
              item.id
            }" data-product-name="${item.name}">
              <div class="product__counter counter">
                <button
                  class="btn-reset counter__btn counter__dcr"
                  type="button"
                >
                  <svg>
                    <use xlink:href="img/sprite.svg#dcr"></use>
                  </svg>
                </button>
                <input class="counter__input" type="text" value="${
                  inCartValue || 1
                }" />
                <button
                  class="btn-reset counter__btn counter__incr"
                  type="button" ${inCartValue < item.amount || "disabled"}
                >
                  <svg>
                    <use xlink:href="img/sprite.svg#incr"></use>
                  </svg>
                </button>
              </div>
              <button class="btn-reset product__btn" type="button">В кошик</button>
            </div>
          </div>
        </article>
      </li>
      `;
    }
  }
}

function isProductInCart(id) {
  let searchElement = null;
  if (currentUser && currentUser.cart.goods.length) {
    searchElement = currentUser.cart.goods.find((e) => e.id === id);
  }

  return {
    isInCart: !!searchElement,
    inCartValue: searchElement?.quantity || 0,
  };
}
