import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { EffectCards } from "swiper";

import styles from "./Slider.module.css";

import { posts as dummyPosts } from "../../data/posts";

export default function Slider() {
  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className={styles.homeSwiper}
      >
        {dummyPosts.map((post) => {
          return (
            <SwiperSlide key={post.id} className={styles.homeSwiperSlide}>
              <img
                className="object-cover w-full h-48 rounded-lg"
                src={post.image}
                alt="nature"
              />
              <span className="font-semibold text-gray-800 text-sm md:text-lg md:mt-3 lg:text-sm xl:text-base 2xl:text-lg mt-2 xl:mt-3">
                {post.date}
              </span>
              <h4 className="font-bold text-gray-900 lg:text-base md:text-xl mdmt-3 xl:text-lg 2xl:text-xl mt-2 xl:mt-3">
                {post.title.length > 50
                  ? `${post.title.substring(0, 50)}...`
                  : post.title}
              </h4>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
