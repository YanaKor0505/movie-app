import { Slider } from "@/shared";
import { MovieCard, type MovieDto } from "@/entities";
import styles from "./MovieSlider.module.scss";

type MovieSliderProps = {
  moviesFilter: MovieDto[];
  onReachEnd: () => void;
};

export const MovieSlider = ({ moviesFilter, onReachEnd }: MovieSliderProps) => {
  return (
    <div>
      <Slider
        items={moviesFilter}
        getKey={(movie) => movie.id}
        renderSlide={(movie) => (
          <div className={styles.slide}>
            <MovieCard key={movie.id} movie={movie} loading="eager" />
          </div>
        )}
        slidesPerView={3}
        spaceBetween={-40}
        centeredSlides
        slideToClickedSlide
        loop
        speed={600}
        onSlideChange={(swiper) => {
          if (swiper.activeIndex >= moviesFilter.length - 10) {
            onReachEnd();
          }
        }}
        className={styles.swiper}
      />
    </div>
  );
};
