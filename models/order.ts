import CartItem from "./cart-item";

class Order {
  public id: string;
  public items: CartItem[];
  public totalAmount: number;
  public date: Date
  constructor(id: string, items: CartItem[], totalAmount: number, date: Date) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount
    this.date = date;
  }


  public get readableDate(): string {
    return this.date.toLocaleDateString('en-EN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

}

export default Order;