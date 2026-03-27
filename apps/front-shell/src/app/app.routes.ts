import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/layout/components/main-layout/main-layout.component').then(m => m.MainLayoutComponent)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];