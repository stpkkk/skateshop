import React, { useState } from "react";
import styles from "./Slider.module.scss";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { sliderData } from "./sliderData";

const Slider = ({ slides }) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const goToSlide = (slideIndex) => {
    setCurrent(slideIndex);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <div className={styles.slider}>
      <BsFillArrowLeftCircleFill
        className={styles.leftArrow}
        onClick={prevSlide}
      />
      <BsFillArrowRightCircleFill
        className={styles.rightArrow}
        onClick={nextSlide}
      />

      {sliderData.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <img
                src={slide.image}
                alt="advert"
                className={styles.slideImg}
                width={950}
                height={380}
              />
            )}
          </div>
        );
      })}
      <div className={styles.sliderDots}>
        {slides.map((slide, slideIndex) => (
          <div
            style={styles.sliderDot}
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            ●
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
