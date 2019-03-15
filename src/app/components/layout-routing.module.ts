import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

// Pantallas
import { DashboardComponent } from './dashboard/dashboard.component';
import { CrearEncuestaComponent } from './crear-encuesta/crear-encuesta.component';
import { AuthGuard } from '../guard/auth.guard';
import { EncuestasComponent } from './encuestas/encuestas.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'Home'},
            { path: 'dashboard', component: DashboardComponent },
            { path: 'crear-encuesta', component: CrearEncuestaComponent },
            { path: 'encuestas', component: EncuestasComponent },

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
