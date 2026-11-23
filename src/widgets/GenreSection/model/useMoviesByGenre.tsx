import { moviesApi } from "@/entities";
import { useInfiniteQuery } from "@tanstack/react-query";

type Props = {
  genreId: number;
};

export const useMoviesByGenre = ({ genreId }: Props) => {
  const {
    data: movies,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    moviesApi.getMoviesByGenreInfiniteQueryOptions({ genreId }),
  );

  return {
    movies,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
