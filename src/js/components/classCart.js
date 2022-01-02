class Cart {
  constructor() {
    this.goods = [];
  }

  addProduct(id, name, quantity = 1) {
    this.goods.push({
      id,
      name,
      quantity,
    });
  }

  changeQuantity(id, newQuantity) {
    this.goods.find((item) => item.id === id).quantity = newQuantity;
  }

  removeProduct(id) {
    this.goods.splice(
      this.goods.findIndex((item) => item.id === id),
      1
    );
  }

  withdraw() {
    this.goods = [];
  }

  checkout() {
    if (this.goods.length && currentUser.money > this.totalSum) {
      currentUser.money -= this.totalSum;
      this.goods.forEach((item) => {
        const currentItem = products.find((product) => product.id === item.id);
        currentItem.substractAmount(item.quantity);
      });
      currentUser.addOrder();
      this.withdraw();
    }
  }

  get totalSum() {
    return this.goods.reduce((accumulator, current) => {
      return (
        accumulator +
        products.find((product) => product.id === current.id).price *
          current.quantity
      );
    }, 0);
  }

  get size() {
    return this.goods.length;
  }
}
