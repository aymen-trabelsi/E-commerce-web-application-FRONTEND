import {Component, NgIterable, OnInit} from '@angular/core';
import {AuthentificationService} from "../../Services/authentification.service";
import {ProductsService} from "../../Services/products.service";
import {Product} from "../../models/Product";
// @ts-ignore
import {Commande} from "../../models/Commande";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products : Product[]  = [] ;
  listProducts : Product[]  = [] ;
  nbProducts : Number =0;
  nbCommends : boolean = true;
  finalPrice : Number =0;
  role : string ="";
  isAdmin : boolean =true;
  commandes : Commande[] = [];

  constructor(private authentificationService : AuthentificationService,
              private productsService : ProductsService) {
    // @ts-ignore
    this.products    = this.productsService.getProducts();
    this.role = this.authentificationService.currentUserType();
    //this.isAdmin = this.role == "admin";
  }

  ngOnInit(): void {

  }
  getCommandes(){
    this.commandes = this.productsService.getCommandes();
    this.nbCommends= this.commandes.length==0;
    console.log(this.nbCommends);
  }

  logout(){
    this.authentificationService.logout();
  }

  addToCard(i : number){
    let prod  = this.products[i];
    // @ts-ignore
    this.nbProducts += 1;
    this.listProducts.push(prod);
    // @ts-ignore
    this.finalPrice += prod.price;
  }
  buy(){
    let email = JSON.parse(<string>localStorage.getItem('currentUser')).email;
    this.productsService.saveCommande(email,this.listProducts);
  }
}
