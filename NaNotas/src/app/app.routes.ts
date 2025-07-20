import { Routes } from '@angular/router';
//aquí se importa los componentes standalone
import { RegisterComponent } from './pages/register';
export const routes: Routes = [/*y aquí defines las rutas , /login, /register y /home*/
      {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '**',
    redirectTo: 'register'
  }
];
