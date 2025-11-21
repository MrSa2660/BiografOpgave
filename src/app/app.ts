import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
<<<<<<< Updated upstream
import { TopNavbar } from "./components/top-navbar/top-navbar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopNavbar],
=======


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
>>>>>>> Stashed changes
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('BiografOpgave');
}
