import { Routes } from '@angular/router';
import { Mainpage } from './mainpage/mainpage';
import { Liste } from './liste/liste';
import { Login } from './login/login';

export const routes: Routes = [
  { path: '', component: Mainpage },         // Startseite zeigt die Mainpage
  { path: 'liste', component: Liste }, // /liste zeigt die Liste
  { path: 'login', component: Login }, // /login zeigt den Login
  { path: '**', redirectTo: '' }             // Fängt falsche URLs ab und leitet zur Startseite
];
