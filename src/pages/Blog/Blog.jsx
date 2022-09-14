import React, { useState } from "react";

import Layout from "../../layouts/Layout";
import styles from "./Blog.module.css";
import CategorySlider from "./CategorySlider";
import Posts from "./Posts";

const Blog = () => {
  const [filteredBy, setFilteredBy] = useState("newer");

  const changeFilteredByHandler = (value) => {
    setFilteredBy(value);
  };

  return (
    <Layout>
      <div className="container mx-auto flex flex-col items-center px-6 py-6 relative">
        <h1
          className={`${styles.stroke_text_white} text-7xl sm:text-8xl md:9xl lg:text-[9rem] text-center tracking-widest leading-none mb-14`}
        >
          BLOG
        </h1>
        <div className="w-full xl:w-4/5 mb-10">
          <CategorySlider
            filteredBy={filteredBy}
            onSetFilteredBy={changeFilteredByHandler}
          />
        </div>
        <Posts filteredBy={filteredBy} />
      </div>
    </Layout>
  );
};

export default Blog;
