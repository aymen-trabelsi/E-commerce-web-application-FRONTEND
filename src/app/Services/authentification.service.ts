import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private router: Router, private httpClient : HttpClient) { }


  currentUserValue() {
    if( localStorage.getItem('currentUser') !== null )
      return true;
    return false;
  }
  currentUserType() {
    return(JSON.parse(<string>localStorage.getItem('currentUser')).role);
  }

  login(email : string, password : string ) {

      let user = {
        email: email,
        password : password
      }
    this.httpClient
       .post<any>('http://localhost:9090/user/login',user)
       .subscribe( (  ) => {
                             this.httpClient
                             .get('http://localhost:9090/user/email/'+user.email)
                             .subscribe( ( data ) => {
                                         localStorage.setItem('currentUser',JSON.stringify(data));
                                         this.router.navigate( ['/home']);
                             });
                           },(error) => {

                             if(error.status == 400){
                                console.log("your not registred yet !");
                             }else if(error.status == 404){
                                console.log("data invalid");
                             }
                           }
                 );
  }

  signUp(user : User){
    this.httpClient
      .post<any>('http://localhost:9090/user/register',user)
      .subscribe( (  )  => {
          this.router.navigate(['/login']);

        },(error) => {

          if(error.status == 400){
            console.log("your not registred yet !");
          }else if(error.status == 404){
            console.log("data invalid");
          }
        }
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
    window.location.reload();
  }
}
