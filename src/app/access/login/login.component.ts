import { Component } from '@angular/core';
import { Login } from '../../models/login.class';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UserService } from '../core/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService,UserService],

})
export class LoginComponent  {

  public loginData = new Login();

  errorMessage: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private loaderService: Ng4LoadingSpinnerService,
    public userService: UserService,

  ) {
  }

  tryFacebookLogin(){
    this.authService.doFacebookLogin()
    .then(res => {
      this.router.navigate(['/user']);
    })
  }

  tryTwitterLogin(){
    this.authService.doTwitterLogin()
    .then(res => {
      this.router.navigate(['/user']);
    })
  }

  tryGoogleLogin(){
    this.authService.doGoogleLogin()
    .then(res => {
      this.router.navigate(['/user']);
    })
  }

  tryLogin(){
    this.loaderService.show();
    this.authService.doLogin(this.loginData)
    .then(res => {
      this.loaderService.hide();
      this.getUser();
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }
  getUser(){
    this.userService.getCurrentUser()
    .then(res => {
      sessionStorage.setItem("token", res.uid);
      this.router.navigate(['layout/dashboard']);

    }, err => {
      this.router.navigate(['/login']);
    })
  }
}
