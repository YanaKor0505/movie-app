import { MovieCard, type MovieGenreDto } from "@/entities";
import { RouteBuilder, Slider } from "@/shared";
import { Link } from "react-router-dom";
import { useMoviesByGenre } from "../model";
import styles from "./GenreSection.module.scss";

type Props = {
  title: string;
  genreId: number;
  genres: MovieGenreDto[];
};

export const GenreSection = ({ title, genreId, genres }: Props) => {
  const {
    movies,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMoviesByGenre({ genreId });

  if (isPending || isError || !movies?.length) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <Link to={RouteBuilder.genre(genreId)} className={styles.title}>
        {title}
      </Link>

      <Slider
        items={movies}
        getKey={(movie) => movie.id}
        slidesPerView={4}
        spaceBetween={20}
        onSlideChange={(swiper) => {
          if (
            hasNextPage &&
            !isFetchingNextPage &&
            swiper.activeIndex >= movies.length - 10
          ) {
            fetchNextPage();
          }
        }}
        renderSlide={(movie) => {
          const genreNames = (movie.genre_ids ?? [])
            .map((id) => genres.find((genre) => genre.id === id)?.name)
            .filter((name) => name !== undefined);
          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              variant="catalog"
              genres={genreNames}
            />
          );
        }}
      />
    </div>
  );
};
