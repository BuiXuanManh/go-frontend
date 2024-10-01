export interface PaginatedMovieResponse {
  movies: MovieJson[];
  page: number;
  page_size: number;
  total_page: number;
}

export interface MovieJson {
  id: number;
  adult: boolean;
  belongs_to_collection: string;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  production_companies: { id: number; logo_path: string; name: string; origin_country: string }[];
  production_countries: { iso_3166_1: string; name: string }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  popularity: number;
  vote_average: number;
  vote_count: number;
  backdrop_path: string;
}

export interface User {
  id: number;
  username: string;
  password_hash: string;
  favorite_list: number[]; // You can replace 'any' with the actual type of 'favorite_list'
  recommendation_list: number[]; // You can replace 'any' with the actual type of 'recommendation_list'
  watch_list: number[]; // You can replace 'any' with the actual type of 'watch_list'
  picture_profile: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
