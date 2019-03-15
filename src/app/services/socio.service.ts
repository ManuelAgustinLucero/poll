import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SociosService extends BaseService {
  constructor(
    protected httpClient: HttpClient,
    protected toastrService: ToastrService,

  ) {
    super(httpClient,toastrService);
  }


  // public getAllSocio(page:number): Observable<Socio[]> {
  //   return this.getAll<Socio>("socio/?page="+page, null);
  // }

  // public add(socio: Socio): Observable<Object> {
  //   return this.post('socio/new', null, socio);
  // }
  // public edit(socio: Socio): Observable<Socio> {
  //   return this.post('socio/'+socio.id+'/edit', null, socio);
  // }
  // public getSocio(id): Observable<Socio[]> {
  //   return this.get('socio/'+id, null);
  // }
  // public eliminar(id): Observable<Object> {
  //   return this.get('socio/'+id+'/delete', null);
  // }
  // //search
  // public search(search): Observable<Object> {
  //   return this.post('socio/?page=1', null, {search:search});
  // }

  // public getAllForSelect(): Observable<Socio[]> {
  //   return this.getAll<Socio>("socio/select/all", null);
  // }

  // public addImagen(id,imagen): Observable<Object> {
  //   return this.post('socio/cargarImagen/'+id, null, imagen);
  // }

  // public getCalles(): Observable<Calle[]> {
  //   return this.getAll<Calle>("calle", null);
  // }
}

