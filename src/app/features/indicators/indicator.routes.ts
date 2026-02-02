import { Route } from "@angular/router";

export const INDICATOR_ROUTE:Route[] =[
    {
        path:'',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)

    }
]