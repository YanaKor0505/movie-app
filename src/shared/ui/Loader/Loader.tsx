import styles from "./Loader.module.scss";

type LoaderProps = {
  size?: number;
};

export const Loader = ({ size = 24 }: LoaderProps) => {
  return (
    <span
      className={styles.loader}
      style={{ width: size, height: size }}
      role="status"
      aria-label="Загрузка"
    />
  );
};
