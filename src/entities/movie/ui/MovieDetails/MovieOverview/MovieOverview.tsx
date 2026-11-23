import type { MovieDetailDto } from "../../../model";
import styles from "./MovieOverview.module.scss";

type Props = {
  movie: MovieDetailDto;
};

export const MovieOverview = ({ movie }: Props) => {
  return (
    <div className={styles.overview}>
      <h2 className={styles.title}>О фильме</h2>
      <p className={styles.description}>
        {movie.overview || "Описание фильма пока отсутствует."}
      </p>
    </div>
  );
};
