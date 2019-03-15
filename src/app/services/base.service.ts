import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

 //private baseUrl = 'http://159.89.187.129/SistemaBack/web/app.php/api/';
 private baseUrl = 'http://127.0.0.1:8000/api/';

 private token: string;

 constructor(
     protected httpClient: HttpClient,
     private toastr: ToastrService
 ) { }

 protected getAll<T>(apiMethod: string, filter: any): Observable<T[]> {
     return this.httpClient.get<T[]>(this.baseUrl + apiMethod, this.getRequestOptions())
     .catch(error => this.handleError<T[]>(error));
 }

 protected get<T>(apiMethod: string, filter: any): Observable<T> {
     return this.httpClient.get<T>(this.baseUrl + apiMethod, this.getRequestOptions())
     .catch(error => this.handleError<T>(error));
 }

 protected post<T>(apiMethod: string, filter: any, data: any): Observable<T> {
     return this.httpClient.post<T>(this.baseUrl + apiMethod, data, this.getRequestOptions())
     .catch(error => this.handleError<T>(error));
 }

 protected getRequestOptions() {
     return {
         headers: this.getHeaders()
     }
 }

 protected getHeaders(): HttpHeaders {
    let token: string = sessionStorage.getItem("token");
    if (token != null && token.length > 0) {
         return new HttpHeaders()
         .set('Content-Type', 'application/json')
         .set('Accept', 'application/json')
         .set('Authorization', 'Bearer ' + token);
     } else {
         return new HttpHeaders()
         .set('Content-Type', 'application/json')
         .set('Accept', 'application/json');
     }
 }

 protected handleError<T>(error: HttpErrorResponse): Observable<T> {
  this.toastr.error('Tu cuenta fue cerrada por seguridad!', 'Logeea nuevamente!');
   return ;
}

 protected getHttpErrorMessage(error: HttpErrorResponse) {
     if (error.error instanceof ErrorEvent) {
         return error.error.message;
     } else if (error.status === 500 ||error.status === 400 ) {
         return error.error;
     }  else  {
         return 'Ha ocurrido un error. Intente nuevamente la operacion.';
     }
 }

}

