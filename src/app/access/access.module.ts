import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AccessRoutingModule } from './access-routing.module';


// Pantallas y componentes
import { AccessComponent } from './access.component';
import { LoginComponent } from './login/login.component';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { AuthService } from '../services/auth.service';
import { RegisterComponent } from './register/register.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AccessRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        // AngularFirestoreModule, // imports firebase/firestore, only needed for database features
        AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    ],
    declarations: [
        // Paginas principales del layout
        AccessComponent,
        LoginComponent,
        EncuestaComponent,
        RegisterComponent,
        
    ],
    providers: [AuthService],


})
export class AccessModule {}
