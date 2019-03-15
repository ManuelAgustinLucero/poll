import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router, Params } from '@angular/router';
import { Login } from '../../models/login.class';
import { UserService } from '../core/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService,UserService],

})
export class RegisterComponent {
  
  public loginData = new Login();
  errorMessage = '';
  successMessage = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    public userService: UserService,

  ) {
   }

 

   tryFacebookLogin() {
     this.authService.doFacebookLogin()
     .then(res => {
       this.router.navigate(['/user']);
     }, err => console.log(err)
     );
   }

   tryTwitterLogin() {
     this.authService.doTwitterLogin()
     .then(res => {
       this.router.navigate(['/user']);
     }, err => console.log(err)
     );
   }

   tryGoogleLogin() {
     this.authService.doGoogleLogin()
     .then(res => {
       this.router.navigate(['/user']);
     }, err => console.log(err)
     );
   }

   tryRegister() {
     this.authService.doRegister(this.loginData)
     .then(res => {
        this.getUser();
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = '';
     });
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
