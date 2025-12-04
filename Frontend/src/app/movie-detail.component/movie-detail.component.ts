// src/app/movie-detail/movie-detail.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie.model';
import { Showtime } from '../models/showtime.model';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | undefined;
  city: string | null = null;
  showtimesByCinema: { cinemaName: string; showtimes: Showtime[] }[] = [];

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.city = params.get('city');

      this.movie = this.movieService.getMovieById(id);
      const all = this.movieService.getShowtimesForMovieInCity(id, this.city);

      // group by cinema like your screenshot
      const byCinema: Record<string, Showtime[]> = {};
      for (const s of all) {
        if (!byCinema[s.cinemaName]) {
          byCinema[s.cinemaName] = [];
        }
        byCinema[s.cinemaName].push(s);
      }
      this.showtimesByCinema = Object.keys(byCinema).map((name) => ({
        cinemaName: name,
        showtimes: byCinema[name],
      }));
    });
  }

  scrollToShowtimes(event: Event) {
    event.preventDefault(); // stop the router / navigation
    const el = document.getElementById('showtimes');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // used to build a nice date label: e.g. "Tor, 27/11"
  formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('da-DK', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
    });
  }
}
