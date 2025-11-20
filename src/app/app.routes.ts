import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { CinemaSelector } from './cinema-selector/cinema-selector';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'cinema-selector',
    pathMatch: 'full'
  },

  {
    path: 'cinema-selector',
    component: CinemaSelector,
    title: 'Select Cinema'
  },

  {
    path: 'home',
    component: Home,
    title: 'Home Page'
  },

  {
    path: 'login',
    component: Login,
    title: 'Login Page'
  },

  {
    path: '**',
    redirectTo: 'cinema-selector',
    pathMatch: 'full'
  }
];
