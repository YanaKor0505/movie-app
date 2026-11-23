import { GenrePage } from "@/pages";
import { MainPage } from "@/pages/MainPage";
import { MovieDetailPage } from "@/pages/MovieDetailPage";
import type { RouteProps } from "react-router-dom";

export enum AppRoutes {
  MAIN = "main",
  MOVIE_DETAIL = "movie_detail",
  GENRE = "movies_genre",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.MOVIE_DETAIL]: "/movie/:movieId",
  [AppRoutes.GENRE]: "/genres/:genreId",
};

export const routeCongig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
  },
  [AppRoutes.MOVIE_DETAIL]: {
    path: RoutePath.movie_detail,
    element: <MovieDetailPage />,
  },
  [AppRoutes.GENRE]: {
    path: RoutePath.movies_genre,
    element: <GenrePage />,
  },
};

export const RouteBuilder = {
  movieDetail: (movieId: number) => `/movie/${movieId}`,
  genre: (genreId: number) => `/genres/${genreId}`,
};
