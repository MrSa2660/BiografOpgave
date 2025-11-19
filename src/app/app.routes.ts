import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';


export const routes: Routes = [

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

];
