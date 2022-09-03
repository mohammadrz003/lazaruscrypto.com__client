import React from "react";

import Layout from "../../layouts/Layout";
import EyesFollowMouse from "./EyesFollowMouse";
import styles from "./Home.module.css";
import Slider from "./Slider";
import candlesImage from "../../assets/bull-candles/candles.svg";

const Home = () => {
  return (
    <Layout>
      <div className="flex px-20 py-6 h-full relative">
        <img
          className={`${styles.candleImg} z-0 absolute left-1/3 top-1/4 object-cover`}
          src={candlesImage}
          alt="candles"
        />
        <div className={`${styles.backgroundOverlayDark} z-[1] absolute inset-0`} />

        <div className={`${styles.blurCircle1} z-[2]`} />
        <div className="lg:w-1/2 z-10 h-full flex flex-col justify-center">
          <h2 className="font-astraneo lg:leading-none lg:text-9xl xl:text-[9rem]">
            MARKET
          </h2>
          <EyesFollowMouse />
        </div>
        <div className="lg:w-1/2 z-10 h-full flex justify-center items-center">
          <Slider />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
