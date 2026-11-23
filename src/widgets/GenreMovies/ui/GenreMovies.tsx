import { MovieCard } from "@/entities";
import { Loader } from "@/shared";
import { useGenrePage } from "../model";
import styles from "./GenreMovies.module.scss";

type Props = {
  genreId: number;
};

export const GenreMovies = ({ genreId }: Props) => {
  const {
    genre,
    movies,
    genresQuery,
    cursorRef,
    isPending,
    isError,
    isFetchingNextPage,
  } = useGenrePage({ genreId });

  if (genresQuery.isPending || isPending) {
    return <Loader />;
  }

  if (genresQuery.isError || isError) {
    return <div>Ошибка загрузки фильмов</div>;
  }

  if (!genre) {
    return <div>Жанр не найден</div>;
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{genre.name}</h1>
      <div className={styles.container}>
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}

        <div ref={cursorRef}>{isFetchingNextPage && <Loader />}</div>
      </div>
    </div>
  );
};
