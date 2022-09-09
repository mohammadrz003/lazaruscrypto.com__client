import React from "react";
import { Link } from "react-router-dom";

import { BsArrowRight } from "react-icons/bs";
import { MEDIA_FOLDER } from "../../data/constants";

const Post = ({ post }) => {
  return (
    <li className="flex border-b dark:border-b-[#585b58]">
      <div className="flex items-center space-x-5 w-3/4 p-7 border-r dark:border-r-[#585b58]">
        <img
          className="w-2/5 h-auto object-cover rounded-sm"
          src={`${MEDIA_FOLDER}/${post.photo}`}
          alt={post._id}
        />
        <div className="flex flex-col space-y-2">
          <span className="text-sm dark:text-palette-green">
            {new Date(post.createdAt).toDateString()}
          </span>
          <h5 className="dark:text-palette-white font-semibold text-3xl">
            {post.title.length > 50
              ? `${post.title.substring(0, 50)}...`
              : post.title}
          </h5>
          <ul className="pt-1.5 text-sm w-full flex space-x-2">
            {post.categories.map((category) => {
              return (
                <li
                  key={category._id}
                  className="py-1.5 px-3 rounded-full border dark:text-palette-white dark:border-palette-white hover:dark:border-palette-green hover:dark:text-palette-white transform transition-all duration-200 font-medium cursor-pointer"
                >
                  {category.name}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center p-7">
        <Link
          className="dark:text-palette-red flex items-center space-x-2"
          to={`/post/${post._id}`}
        >
          <span>VIEW MORE</span>
          <BsArrowRight className="text-xl" />
        </Link>
      </div>
    </li>
  );
};

export default Post;
