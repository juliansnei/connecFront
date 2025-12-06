import { Route } from "@angular/router";

export const CONTACTS_ROUTES :Route[] =[
    {
        path: '',
        loadComponent: () => import('./pages/list/list.component').then(m => m.ListComponent)
    }
]