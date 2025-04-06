import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        children: [
            {
                path: 'login',
                loadComponent: () => import('./pages/auth/login/login.component').then(c => c.LoginComponent)
            },
            {
                path: 'register',
                loadComponent: () => import('./pages/auth/register/register.component').then(c => c.RegisterComponent)
            }
        ]
    },
    {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () => import('./layouts/dashboard/dashboard.component').then(c => c.DashboardComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
            }
        ]
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }
];