import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import type {
  MovieCreditsDto,
  MovieDetailDto,
  MovieGenresDto,
  MovieRatingsDto,
  MovieReviewsDto,
  MoviesDto,
  MovieVideosDto,
} from "../model";

const TMDB_BASE_URL = "https://api.themoviedb.org/3/";

const tmdbRequestOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
};

export const moviesApi = {
  getPopularMovies: ({ page }: { page: number }) => {
    return fetch(
      `${TMDB_BASE_URL}movie/popular?language=en-US&page=${page}`,
      tmdbRequestOptions,
    ).then((res) => res.json() as Promise<MoviesDto>);
  },

  getPopularMoviesInfiniteQueryOptions: () => {
    return infiniteQueryOptions({
      queryKey: ["movies", "popular"],
      queryFn: ({ pageParam }) =>
        moviesApi.getPopularMovies({ page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.total_pages) {
          return lastPage.page + 1;
        }

        return undefined;
      },
    });
  },

  getMovieById: ({ movieId }: { movieId: number }) => {
    return fetch(`${TMDB_BASE_URL}movie/${movieId}`, tmdbRequestOptions).then(
      (res) => res.json() as Promise<MovieDetailDto>,
    );
  },

  getMovieByIdQueryOptions: ({ movieId }: { movieId: number }) => {
    return queryOptions({
      queryKey: ["movie", { movieId }],
      queryFn: () => moviesApi.getMovieById({ movieId }),
    });
  },

  getSearchMovies: ({ query, page }: { query: string; page: number }) => {
    const params = new URLSearchParams({
      query,
      include_adult: "false",
      language: "en-US",
      page: String(page),
    });

    return fetch(
      `${TMDB_BASE_URL}search/multi?${params}`,
      tmdbRequestOptions,
    ).then((res) => res.json() as Promise<MoviesDto>);
  },

  getSearchMoviesInfiniteQueryOptions: ({ query }: { query: string }) => {
    return infiniteQueryOptions({
      queryKey: ["movies", "search", query],
      queryFn: ({ pageParam }) =>
        moviesApi.getSearchMovies({
          query,
          page: pageParam,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.total_pages) {
          return lastPage.page + 1;
        }

        return undefined;
      },
      enabled: query.trim().length >= 2,
    });
  },

  getMovieGenres: () => {
    return fetch(`${TMDB_BASE_URL}genre/movie/list`, tmdbRequestOptions).then(
      (res) => res.json() as Promise<MovieGenresDto>,
    );
  },

  getMoviesByGenre: ({ genreId, page }: { genreId: number; page: number }) => {
    const params = new URLSearchParams({
      include_adult: "false",
      include_video: "false",
      language: "ru-RU",
      page: String(page),
      sort_by: "popularity.desc",
      with_genres: String(genreId),
    });

    return fetch(
      `${TMDB_BASE_URL}discover/movie?${params}`,
      tmdbRequestOptions,
    ).then((res) => res.json() as Promise<MoviesDto>);
  },

  getMovieGenresQueryOptions: () => {
    return queryOptions({
      queryKey: ["movies", "genres"],
      queryFn: () => moviesApi.getMovieGenres(),
      staleTime: Infinity,
      select: (result) => result.genres ?? [],
    });
  },

  getMoviesByGenreInfiniteQueryOptions: ({ genreId }: { genreId: number }) => {
    return infiniteQueryOptions({
      queryKey: ["movies", "genre", genreId],
      queryFn: ({ pageParam }) =>
        moviesApi.getMoviesByGenre({
          genreId,
          page: pageParam,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return lastPage.page < lastPage.total_pages
          ? lastPage.page + 1
          : undefined;
      },
      select: (result) => {
        const movies = result.pages.flatMap((page) => page.results);

        return movies.filter(
          (movie, index, array) =>
            Array.isArray(movie.genre_ids) &&
            array.findIndex((item) => item.id === movie.id) === index,
        );
      },
    });
  },

  // Актёры и съёмочная группа
  getMovieCredits: ({ movieId }: { movieId: number }) => {
    return fetch(
      `${TMDB_BASE_URL}movie/${movieId}/credits`,
      tmdbRequestOptions,
    ).then((res) => res.json() as Promise<MovieCreditsDto>);
  },

  getMovieCreditsQueryOptions: ({ movieId }: { movieId: number }) => {
    return queryOptions({
      queryKey: ["movie", movieId, "credits"],
      queryFn: () => moviesApi.getMovieCredits({ movieId }),
    });
  },

  // Видео и трейлеры
  getMovieVideos: ({ movieId }: { movieId: number }) => {
    return fetch(
      `${TMDB_BASE_URL}movie/${movieId}/videos`,
      tmdbRequestOptions,
    ).then((res) => res.json() as Promise<MovieVideosDto>);
  },

  getMovieVideosQueryOptions: ({ movieId }: { movieId: number }) => {
    return queryOptions({
      queryKey: ["movie", movieId, "videos"],
      queryFn: () => moviesApi.getMovieVideos({ movieId }),
    });
  },

  // Рецензии
  getMovieReviews: ({ movieId, page }: { movieId: number; page: number }) => {
    return fetch(
      `${TMDB_BASE_URL}movie/${movieId}/reviews?page=${page}`,
      tmdbRequestOptions,
    ).then((res) => res.json() as Promise<MovieReviewsDto>);
  },

  getMovieReviewsInfiniteQueryOptions: ({ movieId }: { movieId: number }) => {
    return infiniteQueryOptions({
      queryKey: ["movie", movieId, "reviews"],
      queryFn: ({ pageParam }) =>
        moviesApi.getMovieReviews({ movieId, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return lastPage.page < lastPage.total_pages
          ? lastPage.page + 1
          : undefined;
      },
      select: (result) => result.pages.flatMap((page) => page.results),
    });
  },

  // Похожие фильмы
  getSimilarMovies: ({ movieId, page }: { movieId: number; page: number }) => {
    return fetch(
      `${TMDB_BASE_URL}movie/${movieId}/similar?page=${page}`,
      tmdbRequestOptions,
    ).then((res) => res.json() as Promise<MoviesDto>);
  },

  getSimilarMoviesQueryOptions: ({ movieId }: { movieId: number }) => {
    return infiniteQueryOptions({
      queryKey: ["movie", movieId, "similar"],
      queryFn: ({ pageParam }) =>
        moviesApi.getSimilarMovies({ movieId, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return lastPage.page < lastPage.total_pages
          ? lastPage.page + 1
          : undefined;
      },
      select: (result) => {
        const movies = result.pages.flatMap((page) => page.results);

        return movies.filter(
          (movie, index, array) =>
            Array.isArray(movie.genre_ids) &&
            array.findIndex((item) => item.id === movie.id) === index,
        );
      },
    });
  },

  // Рейтинги IMDb и Кинопоиска
  getMovieRatings: ({ movieId }: { movieId: number }) => {
    return fetch(`/api/movie-ratings?movieId=${movieId}`).then(
      (res) => res.json() as Promise<MovieRatingsDto>,
    );
  },

  getMovieRatingsQueryOptions: ({ movieId }: { movieId: number }) => {
    return queryOptions({
      queryKey: ["movie", movieId, "ratings"],
      queryFn: () => moviesApi.getMovieRatings({ movieId }),
    });
  },
};
