import { Link } from "react-router-dom";
import { FavoriteButton } from "@/features";
import type { MovieDto } from "../../model";
import { RouteBuilder } from "@/shared";
import styles from "./MovieCard.module.scss";

type Props = {
  movie: MovieDto;
  variant?: "slider" | "catalog";
  genres?: string[];
  loading?: "lazy" | "eager";
};

export const MovieCard = ({
  movie,
  variant = "slider",
  genres = [],
  loading = "lazy",
}: Props) => {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const { id, poster_path, backdrop_path, title, vote_average, media_type } =
    movie;

  const imagePath =
    variant === "catalog" ? backdrop_path || poster_path : poster_path;

  return (
    <Link
      to={RouteBuilder.movieDetail(id)}
      className={`${styles.linkMovie} ${styles[variant]}`}
    >
      {imagePath && (
        <img
          className={styles.posterMovie}
          src={`${IMAGE_BASE_URL}${imagePath}`}
          width={variant === "catalog" ? 500 : 400}
          height={variant === "catalog" ? 281 : 600}
          alt={title}
          loading={loading}
          decoding="async"
        />
      )}

      {variant === "slider" ? (
        <>
          <h2 className={styles.titleMovie}>{title}</h2>
          <FavoriteButton />
        </>
      ) : (
        <div className={styles.info}>
          <p className={styles.meta}>
            <span>{vote_average.toFixed(1)}</span>
            {" · "}
            {media_type === "tv" ? "Сериал" : "Фильм"}
            {genres.length > 0 && ` · ${genres.join(", ")}`}
          </p>

          <h2 className={styles.titleMovie}>{title}</h2>
        </div>
      )}
    </Link>
  );
};
