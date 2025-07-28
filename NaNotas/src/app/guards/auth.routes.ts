import { authGuard } from '.././guards/auth.guard';
import { Routes } from '@angular/router';
import { RegisterComponent } from '../pages/register';
import { LoginComponent } from '../pages/login';
import { HomeComponent } from '../pages/home';



export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] }, // 👈 protegido
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
