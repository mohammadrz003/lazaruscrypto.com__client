import React from "react";

import Post from "./Post";

import { posts as dummyPosts } from "../../data/posts";

const Posts = () => {
  return (
    <div className="w-full xl:w-4/5 bg-[#262726]">
      <ul className="p-7">
        {dummyPosts.map((post) => {
          return <Post post={post} />;
        })}
      </ul>
    </div>
  );
};

export default Posts;
