import { useQuery } from "@tanstack/react-query";
import { moviesApi } from "../../api";

type Props = {
  movieId: number;
};

export const useMovieVideos = ({ movieId }: Props) => {
  return useQuery({
    ...moviesApi.getMovieVideosQueryOptions({ movieId }),
  });
};
