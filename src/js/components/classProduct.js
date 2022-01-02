class Product {
  constructor(name, price, amount) {
    this.name = name;
    this.price = price;
    this.amount = amount;
  }

  substractAmount(quantity) {
    this.amount -= quantity;
  }
}
