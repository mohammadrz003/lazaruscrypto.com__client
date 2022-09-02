import React from "react";

import Layout from "../../layouts/Layout";

const Home = () => {
  return (
    <Layout>
      <div className="flex px-20 py-6 h-full">
        <div className="lg:w-1/2 h-full flex flex-col justify-center">
          <h2 className="font-astraneo lg:leading-none lg:text-9xl xl:text-[9rem]">
            MARKET
          </h2>
        </div>
        <div className="lg:w-1/2"></div>
      </div>
    </Layout>
  );
};

export default Home;
