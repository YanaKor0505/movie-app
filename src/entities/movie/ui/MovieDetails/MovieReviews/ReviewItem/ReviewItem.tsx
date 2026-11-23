import { useState } from "react";
import type { MovieReviewDto } from "../../../../model";
import styles from "./ReviewItem.module.scss";

type Props = {
  review: MovieReviewDto;
};

export const ReviewItem = ({ review }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { author, author_details, content, created_at } = review;

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

  const getAvatarUrl = (avatarPath: string | null) => {
    if (!avatarPath) return null;

    if (avatarPath.startsWith("/http")) {
      return avatarPath.slice(1);
    }

    return `${IMAGE_BASE_URL}w185${avatarPath}`;
  };

  const avatar = getAvatarUrl(author_details.avatar_path);
  const hasLongContent = content.length > 500;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <article className={styles.review}>
      <div className={styles.author}>
        {avatar ? (
          <img className={styles.avatar} src={avatar} alt="" />
        ) : (
          <div className={styles.avatarPlaceholder}>
            {author.charAt(0).toUpperCase()}
          </div>
        )}

        <div className={styles.authorInfo}>
          <span className={styles.authorName}>{author}</span>
          <time className={styles.date} dateTime={created_at}>
            {formatDate(created_at)}
          </time>
        </div>

        {author_details.rating !== null && (
          <span className={styles.rating}>★ {author_details.rating}/10</span>
        )}
      </div>

      <p
        className={`${styles.content} ${!isExpanded && hasLongContent ? styles.collapsed : ""}`}
      >
        {content}
      </p>

      {hasLongContent && (
        <button
          className={styles.expandButton}
          type="button"
          onClick={() => setIsExpanded((previous) => !previous)}
        >
          {isExpanded ? "Свернуть" : "Читать полностью"}
        </button>
      )}
    </article>
  );
};
