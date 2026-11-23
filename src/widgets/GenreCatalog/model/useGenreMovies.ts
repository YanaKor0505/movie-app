import { useQuery } from "@tanstack/react-query";
import { moviesApi } from "@/entities";

export const useGenreMovies = () => {
  const {
    data: genres,
    isPending,
    isError,
  } = useQuery(moviesApi.getMovieGenresQueryOptions());

  return {
    genres,
    isPending,
    isError,
  };
};
