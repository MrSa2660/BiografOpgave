// src/app/admin/admin.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
})
export class Admin {
  // simple form-model
  city: string = 'København';
  title: string = '';
  posterUrl: string = '';
  rating: string = '';
  durationMinutes: number | null = null;
  genresText: string = '';      // f.eks. "Action, Sci-Fi"
  language: string = 'English';
  showtimesText: string = '';   // f.eks. "18:30, 21:00"
  makeHighlight: boolean = false;

  message: string | null = null;

  cities = [
    'København',
    'Stor København',
    'Aarhus',
    'Aalborg',
    'Fyn',
    'Nykøbing Falster',
  ];

  constructor(private movieService: MovieService) {}

  addMovie() {
  if (!this.title || !this.posterUrl) {
    this.message = 'Title and poster URL are required.';
    return;
  }

  const genres = this.genresText
    .split(',')
    .map((g) => g.trim())
    .filter((g) => g);

  const showtimes = this.showtimesText
    .split(',')
    .map((t) => t.trim())
    .filter((t) => t);

  const movieData: Omit<Movie, 'id'> = {
    title: this.title,
    posterUrl: this.posterUrl,
    rating: this.rating || 'PG',
    durationMinutes: this.durationMinutes ?? 120,
    genres,
    showtimes,
    language: this.language || 'English',
    cities: [this.city],           // 👈 VIGTIGT: Movie kræver cities: string[]
    isHighlight: this.makeHighlight, // 👈 hvis din Movie-model har isHighlight
  };

  this.movieService.addMovie(movieData); // 👈 kun 1 argument nu

  this.message = `Movie "${this.title}" added for ${this.city}.`;

  // reset felter
  this.title = '';
  this.posterUrl = '';
  this.rating = '';
  this.durationMinutes = null;
  this.genresText = '';
  this.language = 'English';
  this.showtimesText = '';
  this.makeHighlight = false;
}
}
