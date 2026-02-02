import { Routes } from '@angular/router';

export const routes: Routes = [

      {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },

  //rutas privadas
  {
    path:'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)

  },
  {
    path:'contactos',
    loadChildren: () => import('./features/contacts/contacts.routes').then(m => m.CONTACTS_ROUTES)
  },
  {path:'indicadores',
    loadChildren:() => import('./features/indicators/indicator.routes').then( m => m.INDICATOR_ROUTE)
  },
  {
    path:'*',
    redirectTo:'auth/login'
  }
];
