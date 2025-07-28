import { Routes } from '@angular/router';
//aquí se importa los componentes standalone
import { RegisterComponent } from './pages/register';
import { LoginComponent } from './pages/login';
import { HomeComponent } from './pages/home';
export const routes: Routes = [/*y aquí defines las rutas , /login, /register y /home*/
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  { path: 'login',
     component: LoginComponent 
  },
  {
     path: 'home', 
     component: HomeComponent 
  }
];
