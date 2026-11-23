import { useInfiniteQuery } from "@tanstack/react-query";
import { moviesApi } from "../../api";

type Props = {
  movieId: number;
};

export const useSimilarMovies = ({ movieId }: Props) => {
  return useInfiniteQuery({
    ...moviesApi.getSimilarMoviesQueryOptions({ movieId }),
  });
};
