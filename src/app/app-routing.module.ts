import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from './guard/auth.guard';


export const appRoutes: Routes = [
  { path: '', loadChildren: './access/access.module#AccessModule' },
  { path: 'layout', loadChildren: './components/layout.module#LayoutModule', canActivate: [AuthGuard], data: {  expectedRole: 'ROLE_USER'} }


];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
