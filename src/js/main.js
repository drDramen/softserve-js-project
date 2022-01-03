const lastSession = JSON.parse(window.localStorage.getItem("last session"));

let currentUser = serializingUser(lastSession) || new User();
let products = [];

setCardCount();
changeStatusName();

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

function isNumber(e) {
  let charCode = e.which ? e.which : e.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    e.preventDefault();
  }
}

function findProduct(id) {
  return products.find((item) => item.id === id);
}

function serializingUser(user) {
  let sUser = Object.assign(new User(), user);
  sUser.cart = Object.assign(new Cart(), sUser.cart);

  return sUser;
}

function changeStatusName() {
  const statusName = document.querySelector(".link__status-name");

  if (currentUser.name != undefined && currentUser.money != undefined) {
    console.log(currentUser.name);
    statusName.innerHTML = currentUser.name;
  } else {
    statusName.innerHTML = "Увійти";
  }
}
