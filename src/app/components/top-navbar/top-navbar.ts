import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-top-navbar',
  standalone: true, // if you're using standalone
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './top-navbar.html',
  styleUrl: './top-navbar.css',
})
export class TopNavbar implements OnInit {
  selectedCity: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Watch the active child route (e.g. home/:city, login, etc.)
    this.route.firstChild?.paramMap.subscribe((params) => {
      const city = params.get('city');
      if (city) {
        this.selectedCity = city; // only update if city exists
      }
      // if no city (like /app/login), keep the old selectedCity
    });
  }
}
