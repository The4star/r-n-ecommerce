class Product {
  public id: string;
  public ownerId: string;
  public title: string;
  public imageUrl: string;
  public description: string;
  public price: number;

  constructor(id: string, ownerId: string, title: string, imageUrl: string, description: string, price: number) {
    this.id = id;
    this.ownerId = ownerId;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
}

export default Product;