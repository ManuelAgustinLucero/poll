// Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutRoutingModule } from './layout-routing.module';

import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CrearEncuestaComponent } from './crear-encuesta/crear-encuesta.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import {WebcamModule} from 'ngx-webcam';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { AuthService } from '../services/auth.service';
import { EncuestasComponent } from './encuestas/encuestas.component';

import { FirebaseService } from '../services/firebase.service';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        FormsModule,
        NgMultiSelectDropDownModule.forRoot(),
        Ng4LoadingSpinnerModule.forRoot(),
        WebcamModule,
        Ng2ImgMaxModule,
        
    ],
    declarations: [
        LayoutComponent,
        DashboardComponent,
        CrearEncuestaComponent,
        EncuestasComponent,
        
    ],
    // Servicios
    providers: [AuthService,FirebaseService],


})
export class LayoutModule {}
