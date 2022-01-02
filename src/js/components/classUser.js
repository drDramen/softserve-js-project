class User {
  constructor(name, money) {
    this.id = `u${Date.now()}`;
    this.name = name;
    this.money = money;
    this.orders = [];
    this.cart = this.getCart();

    this.getCart();
  }

  showOrderHistory(direction, field) {
    return this.orders.sort((a, b) => {
      if (a[field] > b[field]) {
        return direction;
      }
      if (a[field] < b[field]) {
        return -direction;
      }

      return 0;

      // let compare = (a[field] - b[field]) * direction;
      // console.log(compare);
    });
  }

  getCart() {
    return new Cart();
  }

  addOrder() {
    this.orders.push(new Order(this.cart.goods));
  }
}

class Admin extends User {
  constructor(obj) {
    super(obj);
  }

  createProduct(name, price, amount) {
    products.push(new Product(name, price, amount)); // переделать в POST запрос к БД, create
  }
}
