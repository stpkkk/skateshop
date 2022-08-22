import React from "react";
import styles from "./Slider.module.scss";

const Slider = () => {

// const [current, setCurrent] = useState(0);

  return (
    <div className={styles.slider}>
      <div className={styles.slides}>
        <input type="radio" name="radioBtn" id="radio1" />
        <input type="radio" name="radioBtn" id="radio2" />
        <input type="radio" name="radioBtn" id="radio3" />
        <input type="radio" name="radioBtn" id="radio4" />

        <div className={styles.slide}>
          <img
            src="/img/sliderImg/1.jpg"
            alt="slider"
            width={600}
            height={350}
          />
        </div>
        <div className={styles.slide}>
          <img
            src="/img/sliderImg/2.jpg"
            alt="slider"
            width={600}
            height={350}
          />
        </div>
        <div className={styles.slide}>
          <img
            src="/img/sliderImg/3.jpg"
            alt="slider"
            width={600}
            height={350}
          />
        </div>
        <div className={styles.slide}>
          <img
            src="/img/sliderImg/4.jpg"
            alt="slider"
            width={600}
            height={350}
          />
        </div>

        <div className={styles.sliderNavAuto}>
          <div className={styles.autoBtn}></div>
          <div className={styles.autoBtn}></div>
          <div className={styles.autoBtn}></div>
          <div className={styles.autoBtn}></div>
        </div>

        <div className={styles.sliderNavManual}>
          {/* <label htmlFor=""></label> */}
          <label htmlFor="radio1" className={styles.manualBtn}></label>
          <label htmlFor="radio2" className={styles.manualBtn}></label>
          <label htmlFor="radio3" className={styles.manualBtn}></label>
          <label htmlFor="radio4" className={styles.manualBtn}></label>
        </div>
      </div>
    </div>
  );
};

export default Slider;
