// src/app/home/home.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie.model';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  city: string | null = null;
  highlightMovie: Movie | null = null;
  movies: Movie[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.city = params.get('city');

      // get data from the service, based on the city
      this.highlightMovie = this.movieService.getHighlightForCity(this.city);
      this.movies = this.movieService.getMoviesByCity(this.city);

      // Optionally, don't show the highlight movie again in the list
      if (this.highlightMovie) {
        this.movies = this.movies.filter(
          (m) => m.id !== this.highlightMovie!.id
        );
      }
    });
  }
}
