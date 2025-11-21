import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-top-navbar',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './top-navbar.html',
  styleUrl: './top-navbar.css',
})
export class TopNavbar implements OnInit {
  selectedCity: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.firstChild?.paramMap.subscribe(params => {
      this.selectedCity = params.get('city');
    });
  }
}
