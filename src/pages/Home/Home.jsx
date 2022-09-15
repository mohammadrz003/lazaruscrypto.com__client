import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import Layout from "../../layouts/Layout";
import { Toast } from "../../components/toast/Toast";
import EyesFollowMouse from "./EyesFollowMouse";
import styles from "./Home.module.css";
import Slider from "./Slider";
import candlesImage from "../../assets/bull-candles/candles.svg";
import "./styles.css";

const Home = () => {
  let { state } = useLocation();

  // Show email notification message that it gets when user will be redirected by register page
  useEffect(() => {
    if (state?.toastMessage) {
      Toast(state.toastMessage.type, state.toastMessage.message);
    }
  }, [state?.toastMessage]);

  return (
    <Layout>
      <div className="flex flex-col items-center px-5 py-12 lg:flex-row lg:px-20 lg:py-6 h-full relative">
        <img
          className={`${styles.candleImg} z-0 absolute left-1/3 top-1/4 object-cover`}
          src={candlesImage}
          alt="candles"
        />
        <div
          className={`${styles.backgroundOverlayDark} z-[1] absolute inset-0`}
        />

        <div className={`${styles.blurCircle1} z-[2]`} />
        <div className="lg:w-1/2 mb-6 lg:mb-0 z-10 h-full flex flex-col justify-center">
          <h2 className="text-7xl md:text-8xl lg:text-8xl xl:text-9xl 2xl:text-[9rem] font-astraneo lg:leading-none">
            MARKET
          </h2>
          <EyesFollowMouse />
        </div>
        <div className="lg:w-1/2 z-10 h-full flex flex-col justify-center items-center">
          <>
            <Slider />
            <Link className="mt-4 animate-bounce" to="/posts">
              See All Posts
            </Link>
          </>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
