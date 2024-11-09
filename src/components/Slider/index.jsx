import { Navigation } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import styles from "./slider.module.css";


const slides = [
    {
        importantTitle: "Stan Smith",
        title: ", Forever!",
        imgUrl: "img/frog.png"
    },
    {
        importantTitle: "Nike Air",
        title: ", Forever!",
        imgUrl: "img/frog.png"
    },

    {
        importantTitle: "Mid Suede",
        title: ", Forever!",
        imgUrl: "img/frog.png"
    },

    {
        importantTitle: "Aka Boku",
        title: ", Forever!",
        imgUrl: "img/frog.png"
    },

]

export const Slider = () => {
  return (
    <div className={styles.container}>
    <Swiper modules={[Navigation]} navigation className={styles.slider}>
      {
        slides.map((obj, index) =>(
            <SwiperSlide className={styles.slide} key = {index}>
        <div className={styles.content}>
          <img className={styles.logo} src="img/sliderLogo.png" alt="adidas disney" />
          <h2 className={styles.title}>
            <span className={styles.span}>{obj.importantTitle}</span>{obj.title}
          </h2>
          <button className={styles.button}>Купить</button>
        </div>
        <div className={styles.imgWrapper}>
        <img className={styles.img} src={obj.imgUrl} alt="frog sneakers" />
        </div>
      </SwiperSlide>
        ))
         }
    </Swiper>
    </div>
  );
};

