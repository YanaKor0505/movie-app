import { useQuery } from "@tanstack/react-query";
import { moviesApi } from "../../api";

export const useMovieRatings = ({ movieId }: { movieId: number }) => {
  return useQuery(moviesApi.getMovieRatingsQueryOptions({ movieId }));
};
