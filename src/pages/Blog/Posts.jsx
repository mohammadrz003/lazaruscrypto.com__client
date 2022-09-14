import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

import { getAllPosts } from "../../services/postServices";

import Post from "./Post";

const Posts = ({ filteredBy }) => {
  const { search } = useLocation();
  const [AllPosts, setAllPosts] = useState([]);
  const [filterAllPosts, setFilterAllPosts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllPosts(search);
        setAllPosts(data);
      } catch (error) {
        toast.error("something went wrong");
        console.log(error);
      }
    })();
  }, [search]);

  useEffect(() => {
    const cloneAllPosts = AllPosts.map((item) => item);
    const updatedPostsDate = cloneAllPosts.map((item) => {
      return {
        ...item,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
      };
    });
    switch (filteredBy) {
      case "newer": {
        const sortedDesc = updatedPostsDate.sort(
          (objA, objB) => Number(objB.createdAt) - Number(objA.createdAt)
        );
        return setFilterAllPosts(sortedDesc);
      }
      case "older": {
        const sortedAsc = updatedPostsDate.sort(
          (objA, objB) => Number(objA.createdAt) - Number(objB.createdAt)
        );
        return setFilterAllPosts(sortedAsc);
      }
      case "updatedRecently": {
        const sortedDesc = updatedPostsDate.sort(
          (objA, objB) => Number(objB.updatedAt) - Number(objA.updatedAt)
        );
        return setFilterAllPosts(sortedDesc);
      }
      default:
        break;
    }
  }, [AllPosts, filteredBy]);

  return (
    <div className="w-full xl:w-4/5 lg:bg-[#262726]">
      <ul className="space-y-5 lg:space-y-0 lg:p-7">
        {filterAllPosts.map((post) => {
          return <Post key={post._id} post={post} />;
        })}
      </ul>
    </div>
  );
};

export default Posts;
