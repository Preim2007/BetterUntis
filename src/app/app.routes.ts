import { Routes } from '@angular/router';
import { Mainpage } from './mainpage/mainpage';
import { Liste } from './liste/liste';
import { Profil } from './profil/profil'; // <-- 1. HIER NEU IMPORTIEREN
import { Login } from './login/login';

export const routes: Routes = [
  { path: '', component: Mainpage },
  { path: 'login', component: Login },
  { path: 'liste', component: Liste },
  { path: 'profil/:id', component: Profil } // <-- 2. HIER DIE NEUE ROUTE EINTRAGEN
];
