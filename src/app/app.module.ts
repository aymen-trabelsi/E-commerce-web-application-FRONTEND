import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {ProductsService} from "./Services/products.service";
import {AuthentificationService} from "./Services/authentification.service";
import {AuthGuardGuard} from "./Services/auth-guard.guard";

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AdministrationComponent } from './components/administration/administration.component';

const appRoutes: Routes = [
  { path: 'home',          canActivate : [AuthGuardGuard],              component   : HomeComponent},
  { path: 'administration',canActivate : [AuthGuardGuard],              component   : AdministrationComponent},
  { path: 'register',       component   : SignupComponent},
  { path: 'login',          component   : LoginComponent},
  { path: '**',             redirectTo  : '/login'  }

];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    AdministrationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthGuardGuard,
              AuthentificationService,
              ProductsService
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
