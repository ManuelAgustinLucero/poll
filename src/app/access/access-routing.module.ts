import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessComponent } from './access.component';
import { LoginComponent } from './login/login.component';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    {
        path: '',
        component: AccessComponent,
        children: [
            { path: '', redirectTo: 'login' },
            { path: 'login', component: LoginComponent },
            { path: 'encuesta/:id', component: EncuestaComponent },
            { path: 'register', component: RegisterComponent },

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccessRoutingModule {}
