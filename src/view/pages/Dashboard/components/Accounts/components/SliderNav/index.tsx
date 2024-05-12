import { useSwiper } from "swiper/react";
import { ArrowButton } from "../../../../../../components/ArrowButton";
// Components

type SliderNavProps = {
  isBeginning: boolean,
  isEnd: boolean,
}

export function SliderNav({ isBeginning, isEnd }: SliderNavProps) {
  const swiper = useSwiper();

  return (
    <div className="flex items-center gap-1">
      <ArrowButton
        direction="left"
        disabled={isBeginning}
        onClick={() => swiper.slidePrev()}
        />

      <ArrowButton
        direction="right"
        disabled={isEnd}
        onClick={() => swiper.slideNext()}
      />
    </div>
  );
}
