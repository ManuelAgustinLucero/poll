import { Injectable } from '@angular/core';
import { UserService } from '../core/user.service';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
    private router: Router
  ) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(user => {
        console.log(user);

        this.router.navigate(['/login']);
        return resolve(false);
      }, err => {
        console.log(err);
        return resolve(true);
      });
    });
  }

}
