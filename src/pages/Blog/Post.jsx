import React from "react";
import { Link } from "react-router-dom";

import { BsArrowRight } from "react-icons/bs";

const Post = ({ post }) => {
  return (
    <li className="flex border-b dark:border-b-[#585b58]">
      <div className="flex items-center space-x-5 w-3/4 p-7 border-r dark:border-r-[#585b58]">
        <img
          className="w-2/5 h-auto object-cover rounded-sm"
          src={post.image}
          alt={post.id}
        />
        <div className="flex flex-col space-y-1">
          <span className="text-sm dark:text-palette-green">{post.date}</span>
          <h5 className="dark:text-palette-white font-semibold text-2xl">
            {post.title}
          </h5>
          <p className="text-sm">category</p>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center p-7">
        <Link
          className="dark:text-palette-red flex items-center space-x-2"
          to="/posts/1"
        >
          <span>VIEW MORE</span>
          <BsArrowRight className="text-xl" />
        </Link>
      </div>
    </li>
  );
};

export default Post;
