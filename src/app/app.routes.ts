import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { CinemaSelector } from './cinema-selector/cinema-selector';
import { TopNavbar } from './components/top-navbar/top-navbar';

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


  // pages WITH top nav
  {
    path: '',
    component: TopNavbar, 
    children: [
      { path: 'home/:city', component: Home, title: 'Home Page' },
      { path: 'login', component: Login, title: 'Login Page' }
    ]
  },

  // wildcard
  {
    path: '**',
    redirectTo: 'cinema-selector',
    pathMatch: 'full'
  },
];
