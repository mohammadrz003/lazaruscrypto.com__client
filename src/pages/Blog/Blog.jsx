import React from "react";

import Layout from "../../layouts/Layout";
import styles from "./Blog.module.css";
import CategorySlider from "./CategorySlider";
import Posts from "./Posts";

const Blog = () => {
  return (
    <Layout>
      <div className="container mx-auto flex flex-col items-center px-6 py-6 relative">
        <h1
          className={`${styles.stroke_text_white} text-center tracking-widest lg:text-[9rem] leading-none mb-14`}
        >
          BLOG
        </h1>
        <div className="w-full xl:w-4/5 mb-10">
          <CategorySlider />
        </div>
        <Posts />
      </div>
    </Layout>
  );
};

export default Blog;
