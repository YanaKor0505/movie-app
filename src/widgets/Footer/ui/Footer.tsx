import { MessageIcon, PhoneIcon } from "@/shared";
import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link className={styles.logo} to="/" aria-label="КиноДом — главная">
          <span>КИНО</span>
          <span className={styles.logoAccent}>ДОМ</span>
        </Link>

        <nav
          className={styles.navigation}
          aria-label="Дополнительная навигация"
        >
          <h3 className={styles.title}>Меню</h3>
          <Link to="#">Фильмы</Link>
          <Link to="#">Сериалы</Link>
          <Link to="#">Подборки</Link>
        </nav>

        <nav
          className={styles.navigation}
          aria-label="Каталог фильмов по жанрам"
        >
          <h3 className={styles.title}>Кино и сериалы</h3>
          <Link to="#">Весь каталог</Link>
          <Link to="#">Комедии</Link>
          <Link to="#">Драмы</Link>
          <Link to="#">Фэнтези</Link>
          <Link to="#">Триллеры</Link>
          <Link to="#">Детективы</Link>
        </nav>

        <address className={styles.contacts}>
          <h3 className={styles.title}>Техническая поддержка</h3>
          <a href="tel:+78008008080">
            <PhoneIcon /> +7 (800) 800-80-80
          </a>
          <a href="mailto:support@mail.ru">
            <MessageIcon /> support@mail.ru
          </a>
        </address>
      </div>

      <p className={styles.copyright}>© КиноДом 2020</p>
    </footer>
  );
};
