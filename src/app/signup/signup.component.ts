import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthentificationService} from "../Services/authentification.service";
import {User} from "../models/User";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm : FormGroup =this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    password: ['',Validators.required],
    lname: ['',Validators.required],
    fname: ['',Validators.required],
  });
  constructor(private authentificationService : AuthentificationService, private fb : FormBuilder) { }

  ngOnInit(): void {
  }

  signUp(){
     let user = new User(this.registerForm.value.fname, this.registerForm.value.lname, this.registerForm.value.email, this.registerForm.value.password)
    this.authentificationService.signUp(user);
  }
}
