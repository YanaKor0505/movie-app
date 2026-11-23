import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide, type SwiperClass } from "swiper/react";
import styles from "./Slider.module.scss";

import "swiper/css";
import "swiper/css/navigation";
import type { ReactNode } from "react";

type SliderProps<T> = {
  items: T[];
  renderSlide: (item: T) => ReactNode;
  getKey: (item: T) => string | number;
  slidesPerView?: number | "auto";
  spaceBetween?: number;
  effect?: string;
  centeredSlides?: boolean;
  onSlideChange?: (swiper: SwiperClass) => void;
  className?: string;
  slideToClickedSlide?: boolean;
  loop?: boolean;
  speed?: number;
};

export function Slider<T>({
  items,
  renderSlide,
  getKey,
  slidesPerView = 5,
  spaceBetween = 30,
  effect = "slide",
  centeredSlides = false,
  onSlideChange,
  className,
  slideToClickedSlide,
  loop,
  speed,
}: SliderProps<T>) {
  return (
    <div className={styles.slider}>
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        navigation
        effect={effect}
        slideToClickedSlide={slideToClickedSlide}
        loop={loop}
        speed={speed}
        centeredSlides={centeredSlides}
        modules={[Navigation]}
        onSlideChange={onSlideChange}
        className={className}
      >
        {items.map((item) => (
          <SwiperSlide key={getKey(item)}>{renderSlide(item)}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
