import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { CinemaSelector } from './cinema-selector/cinema-selector';
import { TopNavbar } from './components/top-navbar/top-navbar';
import { SignUp } from './sign-up/sign-up';
import { Component } from '@angular/core';
import { Admin } from './admin/admin';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'cinema-selector',
    pathMatch: 'full',
  },

  {
    path: 'cinema-selector',
    component: CinemaSelector,
    title: 'Select Cinema',
  },

  {
    path: '',
    component: TopNavbar,
    children: [
      { path: 'home/:city', component: Home, title: 'Home Page' },
      { path: 'login', component: Login, title: 'Login Page' },
      { path: 'sign-up', component: SignUp, title: 'Sign up' },
      { path: 'admin', component: Admin, title: 'Admin' },   // <-- ny
    ],
  },

  {
    path: 'sign-up',
    component: SignUp,
    title: 'Sign up'
  },

  {
    path: 'login',
    component: Login,
    title: 'Login Page'
  },
  
  // wildcard
  {
    path: '**',
    redirectTo: 'cinema-selector',
    pathMatch: 'full',
  },
];
