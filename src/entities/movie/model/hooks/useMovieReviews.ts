import { useInfiniteQuery } from "@tanstack/react-query";
import { moviesApi } from "../../api";

type Props = {
  movieId: number;
};

export const useMovieReviews = ({ movieId }: Props) => {
  return useInfiniteQuery({
    ...moviesApi.getMovieReviewsInfiniteQueryOptions({ movieId }),
  });
};
