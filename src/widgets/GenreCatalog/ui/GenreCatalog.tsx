import { useState } from "react";
import { GenreSection } from "../../GenreSection";
import { useGenreMovies } from "../model";
import styles from "./GenreCatalog.module.scss";

const INITIAL_GENRE_IDS = [
  35, // Комедии
  18, // Драмы
  9648, // Детективы
  53, // Триллеры
  14, // Фэнтези
];

export const GenreCatalog = () => {
  const [showAllGenres, setShowAllGenres] = useState(false);

  const { genres, isPending, isError } = useGenreMovies();

  if (isPending) {
    return <div>Загрузка жанров...</div>;
  }

  if (isError) {
    return <div>Ошибка загрузки жанров</div>;
  }

  if (!genres?.length) {
    return <div>Жанров не найдено</div>;
  }

  // Получаем первые пять жанров в нужном нам порядке
  const initialGenres = INITIAL_GENRE_IDS.map((id) =>
    genres.find((genre) => genre.id === id),
  ).filter((genre) => genre !== undefined);

  // Если нажали кнопку — показываем весь список
  const displayedGenres = showAllGenres ? genres : initialGenres;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Каталог фильмов и сериалов</h1>

      {displayedGenres.map((genre) => (
        <GenreSection
          key={genre.id}
          title={genre.name}
          genreId={genre.id}
          genres={genres}
        />
      ))}

      <button
        className={styles.btn}
        type="button"
        onClick={() => setShowAllGenres((prev) => !prev)}
      >
        {showAllGenres ? "Скрыть остальные жанры" : "Посмотреть всё"}
      </button>
    </div>
  );
};
