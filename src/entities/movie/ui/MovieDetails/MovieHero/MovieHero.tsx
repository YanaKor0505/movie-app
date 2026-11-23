import { useState } from "react";
import type { MovieDetailDto } from "../../../model";
import styles from "./MovieHero.module.scss";

type Props = {
  movie: MovieDetailDto;
  trailerKey?: string;
};

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

export const MovieHero = ({ movie, trailerKey }: Props) => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const {
    title,
    backdrop_path,
    vote_average,
    release_date,
    genres,
    production_countries,
    runtime,
  } = movie;

  const releaseYear = release_date
    ? new Date(release_date).getFullYear()
    : null;

  const genreNames = genres.map((genre) => genre.name);
  const countryNames = production_countries.map((country) => country.name);

  const formatRuntime = (minutes: number | null) => {
    if (!minutes) return null;

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours} ч ${remainingMinutes} мин`;
  };

  const formattedRuntime = formatRuntime(runtime);

  return (
    <div className={styles.hero}>
      {backdrop_path && (
        <img
          className={styles.backdrop}
          src={`${IMAGE_BASE_URL}original${backdrop_path}`}
          alt={title}
        />
      )}

      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>

          <div className={styles.metadata}>
            <span className={styles.rating}>★ {vote_average.toFixed(1)}</span>

            <span>
              {[
                releaseYear,
                genreNames.length > 0 ? genreNames.join(", ") : null,
                countryNames.length > 0 ? countryNames.join(", ") : null,
                formattedRuntime,
              ]
                .filter(Boolean)
                .join(" · ")}
            </span>
          </div>

          <div className={styles.actions}>
            <button
              className={styles.watchButton}
              type="button"
              disabled
              title="Источник для просмотра фильма пока не подключён"
            >
              Смотреть фильм
            </button>

            <button
              className={styles.trailerButton}
              type="button"
              disabled={!trailerKey}
              onClick={() => setIsTrailerOpen(true)}
            >
              Трейлер
            </button>

            <button className={styles.favoriteButton} type="button">
              ♡ В избранное
            </button>
          </div>
        </div>
      </div>

      {isTrailerOpen && trailerKey && (
        <div
          className={styles.trailerOverlay}
          onClick={() => setIsTrailerOpen(false)}
        >
          <div
            className={styles.trailerModal}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              type="button"
              onClick={() => setIsTrailerOpen(false)}
              aria-label="Закрыть трейлер"
            >
              ×
            </button>

            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title={`Трейлер фильма ${title}`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};
