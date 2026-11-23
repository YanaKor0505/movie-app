import { Loader, RouteBuilder, SearchIcon, useDebounce } from "@/shared";
import { useState } from "react";
import { useMoviesSearch } from "../model/useMoviesSearch";
import styles from "./MovieSearch.module.scss";
import { Link } from "react-router-dom";

type Props = {
  className?: string;
};

export function MovieSearch({ className }: Props) {
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const debouncedQuery = useDebounce(searchValue, 300);

  const { movies, isLoading, isError } = useMoviesSearch({
    query: debouncedQuery,
  });

  const isSearchActive = debouncedQuery.trim().length >= 2;

  const handleClose = () => {
    setIsOpen(false);
    setSearchValue("");
  };

  return (
    <div className={styles.search}>
      {!isOpen ? (
        <button
          className={className}
          type="button"
          onClick={() => setIsOpen(true)}
        >
          <SearchIcon />
          <span>Поиск</span>
        </button>
      ) : (
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            type="search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Поиск..."
            autoFocus
          />

          <button
            className={styles.closeButton}
            type="button"
            onClick={handleClose}
            aria-label="Закрыть поиск"
          >
            ×
          </button>
        </div>
      )}

      {isOpen && isSearchActive && (
        <div className={styles.results}>
          {isLoading && <Loader size={20} />}
          {isError && <p>Не удалось выполнить поиск</p>}

          {!isLoading && !isError && movies.length === 0 && (
            <p>Ничего не найдено</p>
          )}

          {!isLoading && !isError && movies.length > 0 && (
            <ul>
              {movies.map((movie) => (
                <li key={movie.id}>
                  <Link
                    to={RouteBuilder.movieDetail(movie.id)}
                    onClick={handleClose}
                  >
                    {movie.title ?? movie.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
