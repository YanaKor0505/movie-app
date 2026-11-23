import { MovieSearch } from "@/features";
import { AvatarIcon, PushIcon } from "@/shared";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";

export const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <Link className={styles.logo} to="/" aria-label="КиноДом — главная">
          <span>КИНО</span>
          <span className={styles.logoAccent}>ДОМ</span>
        </Link>

        <nav className={styles.navigation} aria-label="Основная навигация">
          <Link to="#">Фильмы</Link>
          <Link to="#">Сериалы</Link>
          <Link to="#">Подборки</Link>
        </nav>

        <div className={styles.actions}>
          <MovieSearch className={styles.searchButton} />

          <button
            className={styles.iconButton}
            type="button"
            aria-label="Уведомления"
          >
            <PushIcon />
          </button>

          <button
            className={styles.profileButton}
            type="button"
            aria-label="Профиль"
          >
            <AvatarIcon />
          </button>
        </div>
      </div>
    </header>
  );
};
