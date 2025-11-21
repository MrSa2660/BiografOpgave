import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { TopNavbar } from './components/top-navbar/top-navbar';

export const routes: Routes = [


  // pages WITH top nav
  {
    path: '',
    component: TopNavbar,   // contains <nav> + <router-outlet>
    children: [
      { path: 'home', component: Home, title: 'Home Page' },
      { path: 'login', component: Login, title: 'Login Page' }
    ]
  },

  // wildcard
  {
    path: '**',
    redirectTo: 'cinema-selector',
    pathMatch: 'full'
  }
];
