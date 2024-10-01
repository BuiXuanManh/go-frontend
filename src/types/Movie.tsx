import Cast from './Cast';
import Crew from './Crew';

interface Movie {
  id: number;
  title: string;
  releaseDate: Date;
  certification: string;
  rating: number;
  genres: string[];
  runtime: number;
  tagline?: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  status: string;
  originalLanguage: string;
  budget: number;
  revenue: number;
  homepage: string;
  productionCountries: string;
  crews?: Crew[];
  casts?: Cast[];
}

export default Movie;
