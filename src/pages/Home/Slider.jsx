import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { EffectCards } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import "./styles.css";

import { posts as dummyPosts } from "../../data/posts";

export default function Slider() {
  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        {dummyPosts.map((post) => {
          return (
            <SwiperSlide>
              <img
                className="object-cover w-full h-48 rounded-lg"
                src={post.image}
                alt="nature"
              />
              <span className="font-semibold text-gray-800 text-lg mt-3">
                {post.date}
              </span>
              <h4 className="font-bold text-gray-900 text-xl mt-3">{post.title}</h4>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
