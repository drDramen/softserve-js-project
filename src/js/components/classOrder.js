class Order {
  constructor(products, totalSum) {
    this.date = new Date();
    this.sum = totalSum;
    this.products = products;
  }
}
