import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';
import { Showtime } from '../models/showtime.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private movies: Movie[] = [
    {
      id: 1,
      title: 'Inception',
      durationMinutes: 148,
      genres: ['Sci-Fi', 'Thriller'],
      rating: '11',
      language: 'Original',
      posterUrl:
        'https://static0.moviewebimages.com/wordpress/wp-content/uploads/photo/9cBdpCabY7vdEi5ulBAe9CMcp9ttIv.jpg',
      showtimes: ['16:00', '18:30', '20:00', '22:15'],
      cities: ['København', 'Aarhus', 'Fyn'],
      isHighlight: true,
    },
    {
      id: 2,
      title: 'Interstellar',
      durationMinutes: 169,
      genres: ['Sci-Fi', 'Drama'],
      rating: '11',
      language: 'Original',
      posterUrl:
        'https://external-preview.redd.it/VnuONXAMolp-S45sBs2XnPeUbuW_-TrgyGzSsmovq2g.jpg?auto=webp&s=e7be46f8ff9ffb2ca148d3627f6b7772aadd3e3e',
      showtimes: ['15:45', '19:10', '21:40'],
      cities: ['København', 'Aalborg'],
    },
    {
      id: 3,
      title: 'The Batman',
      durationMinutes: 176,
      genres: ['Action', 'Crime'],
      rating: '15',
      language: 'Original',
      posterUrl: 'https://static.posters.cz/image/hp/66923.jpg',
      showtimes: ['14:15', '17:00', '20:30'],
      cities: ['Aarhus', 'Fyn', 'København'],
    },
  ];
  private showtimes: Showtime[] = [
    // Lyngby Kinopalæet – Inception
    {
      id: 101,
      movieId: 1,
      cinemaName: 'Lyngby Kinopalæet',
      city: 'København',
      hall: 'Bio 12',
      date: '2025-11-27',
      time: '16.00',
      format: '2D, Eng. tale',
      availability: 'HIGH',
    },
    {
      id: 102,
      movieId: 2,
      cinemaName: 'Lyngby Kinopalæet',
      city: 'København',
      hall: 'Bio 6',
      date: '2025-11-27',
      time: '19.00',
      format: '2D, Eng. tale',
      availability: 'HIGH',
    },
    {
      id: 103,
      movieId: 1,
      cinemaName: 'Lyngby Kinopalæet',
      city: 'København',
      hall: 'Bio 10',
      date: '2025-11-27',
      time: '21.15',
      format: '2D, Eng. tale',
      availability: 'MEDIUM',
    },

    // Waves – Inception
    {
      id: 201,
      movieId: 3,
      cinemaName: 'Waves',
      city: 'København',
      hall: 'Bio 6',
      date: '2025-11-27',
      time: '16.15',
      format: '2D, Eng. tale',
      availability: 'HIGH',
    },
    {
      id: 202,
      movieId: 1,
      cinemaName: 'Waves',
      city: 'København',
      hall: 'Bio 3',
      date: '2025-11-28',
      time: '17.00',
      format: '2D, Eng. tale',
      availability: 'HIGH',
    },

    // Palads – Inception
    {
      id: 301,
      movieId: 2,
      cinemaName: 'Palads',
      city: 'København',
      hall: 'Bio 10',
      date: '2025-11-27',
      time: '16.30',
      format: '2D, Eng. tale',
      availability: 'HIGH',
    },
    {
      id: 302,
      movieId: 1,
      cinemaName: 'Palads',
      city: 'København',
      hall: 'Bio 10',
      date: '2025-11-27',
      time: '19.00',
      format: '2D, Eng. tale',
      availability: 'HIGH',
    },
    {
      id: 303,
      movieId: 2,
      cinemaName: 'Palads',
      city: 'København',
      hall: 'Bio 10',
      date: '2025-11-27',
      time: '21.30',
      format: '2D, Eng. tale',
      availability: 'MEDIUM',
    },
  ];

// ID counter for newly added movies
  private nextId = 4;

  /** Returns all movies */
  getAllMovies(): Movie[] {
    return this.movies;
  }

  /** Returns movies available in a given city */
  getMoviesByCity(city: string | null): Movie[] {
    if (!city) return this.movies;
    return this.movies.filter((m) => m.cities.includes(city));
  }

  /** Returns the highlighted movie for a city (fallback to first movie) */
  getHighlightForCity(city: string | null): Movie | null {
    const moviesInCity = this.getMoviesByCity(city);
    if (!moviesInCity.length) return null;

    const highlight = moviesInCity.find((m) => m.isHighlight);
    return highlight ?? moviesInCity[0];
  }

  /** Returns a movie by its ID */
  getMovieById(id: number): Movie | undefined {
    return this.movies.find((m) => m.id === id);
  }

  /** Returns showtimes for a movie filtered by city */
  getShowtimesForMovieInCity(movieId: number, city: string | null): Showtime[] {
    return this.showtimes.filter(
      (s) => s.movieId === movieId && (!city || s.city === city)
    );
  }

  /** Returns a single showtime by ID */
  getShowtimeById(id: number): Showtime | undefined {
    return this.showtimes.find((s) => s.id === id);
  }

  /** Adds a new movie and assigns it a unique ID */
  addMovie(movieData: Omit<Movie, 'id'>): Movie {
    const movie: Movie = { ...movieData, id: this.nextId++ };
    this.movies.push(movie);
    return movie;
  }
}