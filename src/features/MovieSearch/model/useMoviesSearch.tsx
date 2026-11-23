import { moviesApi } from "@/entities";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useMoviesSearch = ({ query }: { query: string }) => {
  const normalizedQuery = query.trim();

  const queryResult = useInfiniteQuery(
    moviesApi.getSearchMoviesInfiniteQueryOptions({
      query: normalizedQuery,
    }),
  );

  const movies = queryResult.data?.pages.flatMap((page) => page.results) ?? [];

  return { ...queryResult, movies };
};
