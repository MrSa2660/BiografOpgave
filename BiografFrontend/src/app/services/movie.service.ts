import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';

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
    posterUrl: 'https://static0.moviewebimages.com/wordpress/wp-content/uploads/photo/9cBdpCabY7vdEi5ulBAe9CMcp9ttIv.jpg',
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
    posterUrl: 'https://external-preview.redd.it/VnuONXAMolp-S45sBs2XnPeUbuW_-TrgyGzSsmovq2g.jpg?auto=webp&s=e7be46f8ff9ffb2ca148d3627f6b7772aadd3e3e',
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

  constructor() {}

  /** All movies (regardless of city) */
  getAllMovies(): Movie[] {
    return this.movies;
  }

  /** Movies available in a specific city (case-sensitive match for now) */
  getMoviesByCity(city: string | null): Movie[] {
    if (!city) {
      return this.movies;
    }
    return this.movies.filter((m) => m.cities.includes(city));
  }

  /** One highlighted movie per city (fallback to any highlight, then first movie) */
  getHighlightForCity(city: string | null): Movie | null {
    const moviesInCity = this.getMoviesByCity(city);
    if (!moviesInCity.length) {
      return null;
    }

    const highlight = moviesInCity.find((m) => m.isHighlight);
    return highlight ?? moviesInCity[0];
  }

  

  
  
}
