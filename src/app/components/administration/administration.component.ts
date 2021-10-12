import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from "../../Services/authentification.service";
import {Product} from "../../models/Product";
import {ProductsService} from "../../Services/products.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {
  products : Product[]  = [] ;
  addForm : FormGroup = this.fb.group({
    name: ['',Validators.required],
    description: ['',Validators.required],
    price: ['',Validators.required],
    image : [],
  });

  constructor(private authentificationService : AuthentificationService,
              private productsService : ProductsService,
              private fb : FormBuilder) {
    // @ts-ignore
    this.products    = this.productsService.getProducts();
  }

  ngOnInit(): void {
  }

  update(i : number){
    let prod  = this.products[i];
    // @ts-ignore
    this.productsService.update(prod);
  }
  delete(i : number){
    let prod  = this.products[i];
    // @ts-ignore
    this.productsService.delete(prod);
  }

  logout(){
    this.authentificationService.logout();
  }

  addProduct(){
    let str = this.addForm.value.image;
    let splitted = str.split("\\", 3);
    console.log(splitted[2]);
    let product = new Product(this.addForm.value.name,this.addForm.value.description,this.addForm.value.price,splitted[2]);
    this.productsService.addProduct(product);
  }
}
