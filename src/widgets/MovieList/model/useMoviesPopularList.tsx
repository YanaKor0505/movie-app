import { moviesApi } from "@/entities";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useMoviesPopularList() {
  const {
    data,
    error,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    ...moviesApi.getPopularMoviesInfiniteQueryOptions(),
  });

  const moviesListPopular = data?.pages.flatMap((page) => page.results);

  return {
    moviesListPopular,
    error,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };
}
