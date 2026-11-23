import { Slider } from "@/shared";
import type { MovieDto } from "../../../model";
import styles from "./SimilarMovies.module.scss";
import { MovieCard } from "../../MovieCard";

type Props = {
  movies: MovieDto[];
  onLoadMore: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

export const SimilarMovies = ({
  movies,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}: Props) => {
  if (!movies.length) return null;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Похожие фильмы</h2>

      <Slider
        items={movies}
        getKey={(movie) => movie.id}
        slidesPerView={4}
        spaceBetween={20}
        renderSlide={(movie) => (
          <MovieCard key={movie.id} movie={movie} variant="catalog" />
        )}
        onSlideChange={(swiper) => {
          if (
            hasNextPage &&
            !isFetchingNextPage &&
            swiper.activeIndex >= movies.length - 10
          ) {
            onLoadMore();
          }
        }}
      />
    </div>
  );
};
