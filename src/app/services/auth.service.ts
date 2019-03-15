import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from './base.service';
import { Login } from '../models/login.class';
import { ToastrService } from 'ngx-toastr';
import { Token } from '../models/token.class';

import { Router } from  "@angular/router";
import { auth } from  'firebase/app';
import { User } from  'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  user:  User;

  constructor(
      protected httpClient: HttpClient,
      protected toastrService: ToastrService,
      public  router:  Router
  ) {
      super(httpClient, toastrService);
  }

  public login(login: Login): Observable<Token> {
    return this.post<Token>('login', null, login);
  }

  public logout(): Observable<Object> {
      return this.post<Object>( '/Logout', null, null);
  }
  
}
