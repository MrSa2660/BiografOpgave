import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
<<<<<<< Updated upstream

=======
import { CinemaSelector } from './cinema-selector/cinema-selector';
import { TopNavbar } from './components/top-navbar/top-navbar';
>>>>>>> Stashed changes

export const routes: Routes = [

<<<<<<< Updated upstream
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
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/home',
        pathMatch: 'full'
    }

=======
  // pages WITHOUT top nav
  {
    path: 'cinema-selector',
    component: CinemaSelector,
    title: 'Select Cinema'
  },

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
>>>>>>> Stashed changes
];
