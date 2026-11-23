export type MovieDto = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  name?: string;
  original_name?: string;
  media_type?: "movie" | "tv";
  first_air_date?: string;
};

export type MoviesDto = {
  page: number;
  results: MovieDto[];
  total_pages: number;
  total_results: number;
};

export type MovieDetailDto = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  } | null;
  budget: number;
  genres: MovieGenreDto[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieGenreDto = {
  id: number;
  name: string;
};

export type MovieGenresDto = {
  genres: MovieGenreDto[];
};

export type MovieCastDto = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: string;
  character: string;
  credit_id: string;
  order: number;
};

export type MovieCrewDto = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
};

export type MovieCreditsDto = {
  id: number;
  cast: MovieCastDto[];
  crew: MovieCrewDto[];
};

export type MovieVideoDto = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

export type MovieVideosDto = {
  id: number;
  results: MovieVideoDto[];
};

export type MovieReviewDto = {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number | null;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
};

export type MovieReviewsDto = {
  id: number;
  page: number;
  results: MovieReviewDto[];
  total_pages: number;
  total_results: number;
};
