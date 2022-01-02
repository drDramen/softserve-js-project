class Order {
  constructor(products) {
    this.date = new Date();
    this.sum = 0;

    this.products = products.map((item) => {
      // const currentProduct = 
      this.sum += item.product.price * item.quantity;
      return {
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      };
    });
  }
}
