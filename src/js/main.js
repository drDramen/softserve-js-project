
let currentUser = null;
let products = [];

currentUser = new User("Vova", 5000);

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

function isNumber(e) {
  let charCode = e.which ? e.which : e.keyCode;
  console.log(e);
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    e.preventDefault();
  }
}

function findProduct(id) {
  return products.find((item) => item.id === id);
}
