import React, { useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { EffectCards } from "swiper";
import toast from "react-hot-toast";

import styles from "./Slider.module.css";
import { getAllPosts } from "../../services/postServices";
import { MEDIA_FOLDER } from "../../data/constants";
import { Link } from "react-router-dom";

export default function Slider() {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllPosts();
        setAllPosts(data);
      } catch (error) {
        toast.error("something went wrong");
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className={`${styles.homeSwiper}`}
      >
        {allPosts.length > 0 ? (
          allPosts.slice(0, 5).map((post) => {
            return (
              <SwiperSlide key={post._id} className={styles.homeSwiperSlide}>
                <img
                  className="object-cover w-full h-48 rounded-lg"
                  src={`${MEDIA_FOLDER}/${post.photo}`}
                  alt="media"
                />
                <span className="font-semibold text-gray-800 text-sm md:text-lg md:mt-3 lg:text-sm xl:text-base 2xl:text-lg mt-2 xl:mt-3">
                  {new Date(post.createdAt).toDateString()}
                </span>
                <h4 className="font-bold text-gray-900 lg:text-base md:text-xl mdmt-3 xl:text-lg 2xl:text-xl mt-2 xl:mt-3">
                  <Link to={`/post/${post._id}`}>
                    {post.title.length > 50
                      ? `${post.title.substring(0, 50)}...`
                      : post.title}
                  </Link>
                </h4>
              </SwiperSlide>
            );
          })
        ) : (
          <SwiperSlide className={styles.homeSwiperSlide}>
            <div class="bg-slate-400 h-48 p-3 overflow-hidden animate-pulse rounded-md" />
            <div class="h- mt-3">
              <div class="grid grid-cols-3 gap-4 mt-2">
                <div class="h-8 bg-slate-400 rounded animate-pulse"></div>
                <div class="h-8 bg-slate-400 rounded animate-pulse"></div>
                <div class="h-8 bg-slate-400 rounded animate-pulse"></div>
                <div class="h-8 col-span-2 bg-slate-400 rounded animate-pulse"></div>
                <div class=" h-8 bg-slate-400 rounded animate-pulse"></div>
                <div class="..."></div>
                <div class="col-span-2 ..."></div>
              </div>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </>
  );
}
