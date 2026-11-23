import type { MovieReviewDto } from "../../../model";
import { ReviewItem } from "./ReviewItem";
import styles from "./MovieReviews.module.scss";
import { useState } from "react";

type Props = {
  reviews: MovieReviewDto[];
  onLoadMore: () => Promise<unknown>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

export const MovieReviews = ({
  reviews,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}: Props) => {
  const [visibleCount, setVisibleCount] = useState(3);

  const visibleReviews = reviews.slice(0, visibleCount);

  const handleShowMore = async () => {
    if (visibleCount < reviews.length) {
      setVisibleCount((count) => count + 3);
      return;
    }

    if (hasNextPage && !isFetchingNextPage) {
      const result = await onLoadMore();

      if (result) {
        setVisibleCount((count) => count + 3);
      }
    }
  };

  return (
    <div className={styles.reviews}>
      <h2 className={styles.title}>
        Рецензии
        <span className={styles.count}>{reviews.length}</span>
      </h2>

      {reviews.length > 0 ? (
        <div className={styles.list}>
          {visibleReviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>Пока нет рецензий на этот фильм.</p>
      )}

      {(visibleCount < reviews.length || hasNextPage) && (
        <button
          className={styles.loadMoreButton}
          type="button"
          onClick={handleShowMore}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Загрузка..." : "Показать ещё"}
        </button>
      )}

      {visibleCount > 3 && (
        <button
          className={styles.hideButton}
          type="button"
          onClick={() => setVisibleCount(3)}
        >
          Скрыть
        </button>
      )}
    </div>
  );
};
