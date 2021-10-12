import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthentificationService} from "../Services/authentification.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  currentUser : boolean = false;


  control = {email     : " ",password  : " "}

  loginForm: FormGroup =this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    password: ['',Validators.required],
  });


  ok : boolean = true;

  constructor(  private router: Router , private authentificationService : AuthentificationService, private fb : FormBuilder) {

  }

  ngOnInit(): void {
    this.currentUser =this.authentificationService.currentUserValue();
  }

  signIn(){
    const login = this.authentificationService.login(this.loginForm.value.email,this.loginForm.value.password );
    setTimeout(() => this.control.password="Vérifier vos données !" , 500);
  }
}
