import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { routing } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { AuthGuard } from './guard/auth.guard';
import { AngularFireModule } from '@angular/fire';
import { environment } from './../environments/environment';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    routing,
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
    Ng4LoadingSpinnerModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
