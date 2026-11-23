import { useQuery } from "@tanstack/react-query";
import { moviesApi } from "../../api";

type Props = {
  movieId: number;
};

export const useMovieCredits = ({ movieId }: Props) => {
  return useQuery({
    ...moviesApi.getMovieCreditsQueryOptions({ movieId }),
  });
};
