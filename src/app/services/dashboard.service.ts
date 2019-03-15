import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs/Observable';
import { Estadistica } from '../models/estadistica.class';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseService {

  constructor(
    protected httpClient: HttpClient,
    protected toastrService: ToastrService,

  ) {
    super(httpClient,toastrService);
  }


  public getEstadistica(): Observable<Estadistica[]> {
    return this.getAll<Estadistica>("estadistica", null);
  }
 
}
