import { Link } from "react-router-dom";
import { MovieSlider } from "../../MovieSlider";
import { useMoviesPopularList } from "../model";
import { Loader } from "@/shared";
import styles from "./MovieList.module.scss";

export function MovieList() {
  const {
    moviesListPopular,
    error,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useMoviesPopularList();

  if (isPending) {
    return <Loader size={70} />;
  }

  if (error) {
    return <div>Что-то пошло не так</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Самые сочные премьеры кино — у вас дома
        </h1>
        <p className={styles.subtitle}>
          Ежедневно пополняемая библиотека с лучшими фильмами и сериалами — в
          дубляже и оригинале. Целый месяц бесплатно!
        </p>
        <Link className={styles.btn} to={"#"}>
          Смотреть бесплатно
        </Link>
      </div>

      {moviesListPopular?.length ? (
        <div className={styles.slider}>
          <MovieSlider
            moviesFilter={moviesListPopular}
            onReachEnd={() => {
              if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            }}
          />
        </div>
      ) : (
        <p>Фильм не найден</p>
      )}
    </div>
  );
}
