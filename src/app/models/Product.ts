export class Product {

  id    : number = 0;
  name  : string ="";
  description  : string ="";
  price : number =0;
  image : string ="";
  etat  : number = 0;


  constructor(name: string, description: string, price: number, image: string) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
  }
}
