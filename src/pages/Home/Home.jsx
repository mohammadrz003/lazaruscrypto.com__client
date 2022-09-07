import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

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
      <div className="flex px-20 py-6 h-full relative">
        <img
          className={`${styles.candleImg} z-0 absolute left-1/3 top-1/4 object-cover`}
          src={candlesImage}
          alt="candles"
        />
        <div
          className={`${styles.backgroundOverlayDark} z-[1] absolute inset-0`}
        />

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
