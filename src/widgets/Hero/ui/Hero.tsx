import { GenreCatalog } from "../../GenreCatalog";
import { MovieList } from "../../MovieList";
import styles from "./Hero.module.scss";

export const Hero = () => {
  return (
    <div className={styles.wrapper}>
      <MovieList />

      <GenreCatalog />
    </div>
  );
};
