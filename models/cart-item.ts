class CartItem {
  public id: string
  public quantity: number;
  public productPrice: number;
  public productTitle: string;
  public sum: number;
  constructor(id: string, quantity: number, productPrice: number, productTitle: string, sum: number) {
    this.id = id
    this.quantity = quantity;
    this.productPrice = productPrice;
    this.productTitle = productTitle;
    this.sum = sum;
  }
}

export default CartItem;