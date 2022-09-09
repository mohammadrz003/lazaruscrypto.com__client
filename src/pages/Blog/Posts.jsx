import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

import { getAllPosts } from "../../services/postServices";

import Post from "./Post";

const Posts = () => {
  const [AllPosts, setAllPosts] = useState([]);

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
    <div className="w-full xl:w-4/5 bg-[#262726]">
      <ul className="p-7">
        {AllPosts.map((post) => {
          return <Post key={post._id} post={post} />;
        })}
      </ul>
    </div>
  );
};

export default Posts;
