import { moviesApi } from "@/entities";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useCallback, useRef } from "react";

type Props = {
  genreId: number;
};

export const useGenrePage = ({ genreId }: Props) => {
  const genresQuery = useQuery(moviesApi.getMovieGenresQueryOptions());

  const {
    data: movies,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
  } = useInfiniteQuery(
    moviesApi.getMoviesByGenreInfiniteQueryOptions({
      genreId,
    }),
  );

  const genre = genresQuery.data?.find((item) => item.id === genreId);

  const cursorRef = useIntersection(() => {
    fetchNextPage();
  });

  return {
    genre,
    movies,
    genresQuery,
    cursorRef,
    isPending,
    isError,
    hasNextPage,
    isFetchingNextPage,
  };
};

export function useIntersection(onIntersect: () => void) {
  const unsubscribe = useRef(() => {});

  return useCallback(
    (el: HTMLDivElement | null) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((intersection) => {
          if (intersection.isIntersecting) {
            onIntersect();
          }
        });
      });

      if (el) {
        observer.observe(el);
        unsubscribe.current = () => observer.disconnect();
      } else {
        unsubscribe.current();
      }
    },
    [onIntersect],
  );
}
