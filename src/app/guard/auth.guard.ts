import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGroup } from '../models/authorization.types';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private toastr: ToastrService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        // this will be passed from the route config
        // on the data property

     
        if (!sessionStorage.getItem('token')) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
   
    }
}