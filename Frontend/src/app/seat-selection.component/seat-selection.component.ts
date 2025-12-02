// src/app/seat-selection/seat-selection.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Showtime } from '../models/showtime.model';

@Component({
  selector: 'app-seat-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css'],
})
export class SeatSelectionComponent implements OnInit {
  showtime: Showtime | undefined;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('showtimeId'));
      this.showtime = this.movieService.getShowtimeById(id);
    });
  }
}
