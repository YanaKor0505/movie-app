import { useState } from "react";
import styles from "./FavoriteButton.module.scss";

export function FavoriteButton() {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <button
      className={styles.favoriteBtn}
      onClick={() => setIsFavorite(!isFavorite)}
    >
      {isFavorite ? "💔" : "❤️"}
    </button>
  );
}
