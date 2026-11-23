import { useQuery } from "@tanstack/react-query";
import { moviesApi } from "../../api";
import { MovieHero } from "./MovieHero";
import {
  useMovieCredits,
  useMovieReviews,
  useMovieVideos,
  useSimilarMovies,
} from "../../model";
import styles from "./MovieDetails.module.scss";
import { MovieOverview } from "./MovieOverview";
import { MovieAdditionalInfo } from "./MovieAdditionalInfo";
import { MovieReviews } from "./MovieReviews";
import { SimilarMovies } from "./SimilarMovies";

type Props = {
  movieId: number;
};

export function MovieDetails({ movieId }: Props) {
  // Основная информация о фильме
  const {
    data: movie,
    isPending,
    isError,
  } = useQuery(moviesApi.getMovieByIdQueryOptions({ movieId }));

  // Актёры и съёмочная группа
  const { data: credits } = useMovieCredits({ movieId });

  // Трейлеры и другие видео
  const { data: videos } = useMovieVideos({ movieId });

  const trailer =
    videos?.results.find(
      (video) =>
        video.site === "YouTube" && video.type === "Trailer" && video.official,
    ) ??
    videos?.results.find(
      (video) => video.site === "YouTube" && video.type === "Trailer",
    );

  // Рецензии
  const {
    data: reviews,
    fetchNextPage: fetchNextReviewsPage,
    hasNextPage: hasNextReviewsPage,
    isFetchingNextPage: isFetchingNextReviewsPage,
  } = useMovieReviews({ movieId });

  // Похожие фильмы
  const {
    data: similarMovies,
    fetchNextPage: fetchNextSimilarPage,
    hasNextPage: hasNextSimilarPage,
    isFetchingNextPage: isFetchingNextSimilarPage,
  } = useSimilarMovies({ movieId });

  if (isPending) {
    return <div>Загрузка фильма...</div>;
  }

  if (isError || !movie) {
    return <div>Не удалось загрузить фильм</div>;
  }

  return (
    <div className={styles.wrapper}>
      <MovieHero movie={movie} trailerKey={trailer?.key} />

      <div className={styles.content}>
        <div className={styles.mainContent}>
          <MovieOverview movie={movie} />
          <MovieReviews
            reviews={reviews ?? []}
            onLoadMore={fetchNextReviewsPage}
            hasNextPage={hasNextReviewsPage}
            isFetchingNextPage={isFetchingNextReviewsPage}
          />
        </div>

        <MovieAdditionalInfo movie={movie} credits={credits} />
      </div>

      <SimilarMovies
        movies={similarMovies ?? []}
        onLoadMore={fetchNextSimilarPage}
        hasNextPage={hasNextSimilarPage}
        isFetchingNextPage={isFetchingNextSimilarPage}
      />
    </div>
  );
}
