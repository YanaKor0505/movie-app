import type {
  MovieCreditsDto,
  MovieDetailDto,
  MovieRatingsDto,
} from "../../../model";
import styles from "./MovieAdditionalInfo.module.scss";

type Props = {
  movie: MovieDetailDto;
  credits?: MovieCreditsDto;
  ratings?: MovieRatingsDto;
};

export const MovieAdditionalInfo = ({ movie, credits, ratings }: Props) => {
  const { vote_average, genres, production_countries, runtime } = movie;

  // Режиссёр
  const directors = credits?.crew
    .filter((person) => person.job === "Director")
    .map((person) => person.name);

  // Актёрский состав
  const actors = credits?.cast.slice(0, 10).map((actor) => actor.name);

  // Продолжительность фильма
  const formatRuntime = (minutes: number | null) => {
    if (!minutes) return null;

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) return `${remainingMinutes} мин`;

    return remainingMinutes
      ? `${hours} ч ${remainingMinutes} мин`
      : `${hours} ч`;
  };

  const info = [
    {
      label: "Рейтинг TMDB",
      value: vote_average.toFixed(1),
    },
    {
      label: "Рейтинг IMDb",
      value: ratings?.imdb?.toFixed(1),
    },
    {
      label: "Рейтинг Кинопоиска",
      value: ratings?.kp?.toFixed(1),
    },
    {
      label: "Жанр",
      value: genres.map((genre) => genre.name).join(", "),
    },
    {
      label: "Режиссёр",
      value: directors?.join(", "),
    },
    {
      label: "Актёрский состав",
      value: actors?.join(", "),
    },
    {
      label: "Страна",
      value: production_countries.map((country) => country.name).join(", "),
    },
    {
      label: "Время",
      value: formatRuntime(runtime),
    },
  ];

  return (
    <aside className={styles.additionalInfo}>
      <dl className={styles.list}>
        {info
          .filter((item) => item.value)
          .map(({ label, value }) => (
            <div className={styles.item} key={label}>
              <dt className={styles.label}>{label}</dt>
              <dd className={styles.value}>{value}</dd>
            </div>
          ))}
      </dl>
    </aside>
  );
};
