import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/Product";
// @ts-ignore
import {Commande} from "../models/Commande";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products : Product[] = [];
  commandes : Commande[] = [];

  constructor(private router: Router, private httpClient : HttpClient) { }

  getProducts(){
   this.products = [];

    this.httpClient
      .get('http://localhost:9090/product/all')
      .subscribe( ( data ) => {
                                              // @ts-ignore
                                              data.map( dt => {
                                                  if(dt.etat == 0)
                                                   this.products.push(dt);
                                              });
      });
    return this.products;
  }

  getCommandes(){
    this.httpClient
      .get('http://localhost:9090/user/email/'+JSON.parse(<string>localStorage.getItem("currentUser")).email)
      .subscribe( ( data ) => {
        localStorage.setItem('currentUser',JSON.stringify(data));
        this.commandes = JSON.parse(<string>localStorage.getItem('currentUser')).commandes;
      });
    return this.commandes;
  }

  saveCommande(email: string , listProducts : Product[]){
    let command = {
      date: new Date(),
      user : {
        email : email
      },
      products : listProducts
    }
    console.log(JSON.stringify(command));
    this.httpClient
      .post<any>('http://localhost:9090/commande/create',command)
      .subscribe( (  ) => {
          this.httpClient
          window.location.reload();
        },(error) => {

          if(error.status == 400){
            console.log("your not registred yet !");
          }else if(error.status == 404){
            console.log("data invalid");
          }
        }
      );

  }

  update(prod : Product){
    alert("update service");
  }

  delete(prod : Product){
    this.httpClient
      .get('http://localhost:9090/product/delete/'+prod.id)
      .subscribe( ( data ) => {
        window.location.reload();
      });
  }

  addProduct(product : Product){
    this.httpClient
      .post<any>('http://localhost:9090/product/create',product)
      .subscribe( (  ) => {
          window.location.reload();
        },(error) => {

          if(error.status == 400){
            console.log("your not registred yet !");
          }else if(error.status == 404){
            console.log("data invalid");
          }
        }
      );
  }
}
