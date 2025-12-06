import { Route } from "@angular/router";

export const AUTH_ROUTES:Route[] = [
    {
        path:'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
        
    },
    {
        path:'register',
        loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
    }
]