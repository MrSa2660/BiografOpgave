import { Component } from '@angular/core';
import { TopNavbar } from '../components/top-navbar/top-navbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
