import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import edjsHTML from "editorjs-html";
import Parser from "html-react-parser";

import Layout from "../../layouts/Layout";
import { getSinglePost } from "../../services/postServices";
import { MEDIA_FOLDER } from "../../data/constants";
import PostComment from "../../components/comment/PostComment";
import AllComments from "../../components/comment/AllComments";
import { getUserData } from "../../services/userServices";
import AuthContext from "../../context/auth-context";

// Utilities
const edjsParser = edjsHTML();
const ConvertInToHtml = ({ item }) => {
  return Parser(item);
};

const SinglePost = () => {
  const { id: postId } = useParams();
  const { user: userData } = useContext(AuthContext);
  const [postData, setPostData] = useState(null);
  const [userInformation, setUserInformation] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getSinglePost(postId);
        setPostData(data);
      } catch (error) {
        toast.error("something went wrong");
        console.log(error);
      }
    })();
  }, [postId]);

  useEffect(() => {
    (async () => {
      const { data } = await getUserData();
      setUserInformation(data.user);
    })();
  }, [userData]);

  if (!postData) {
    return <h3 className="text-center text-3xl">Loading...</h3>;
  }

  return (
    <Layout>
      <div className="h-full w-full">
        <div className="w-full max-w-screen-md mx-auto py-10 px-5">
          <ul className="flex justify-center space-x-3 text-center text-palette-green font-semibold text-xl mb-7">
            {postData.categories.map((category) => {
              return <li key={category._id}>{category.name}</li>;
            })}
          </ul>
          <h1 className="capitalize text-center text-5xl font-bold mb-12">
            {postData.title}
          </h1>
          <img
            className="rounded-lg mb-7"
            src={`${MEDIA_FOLDER}/${postData.photo}`}
            alt="nature"
          />
          <div className="flex flex-col space-x-1 lg:flex-row justify-between mb-12">
            <p>Author: {postData.user.username}</p>
            <p>On: {new Date(postData.createdAt).toDateString()}</p>
          </div>
          <article className="prose dark:prose-invert lg:prose-lg max-w-none">
            {postData.desc &&
              edjsParser.parse(postData.desc).map((item, index) => {
                return <ConvertInToHtml key={index} item={item} />;
              })}
          </article>
          {/* Comment section */}
          <div className="py-14">
            <h4 className="dark:text-palette-java text-4xl font-semibold mb-8">
              Write comment
            </h4>
            <PostComment userInformation={userInformation} post={postData} />
            <h4 className="dark:text-palette-java text-4xl font-semibold my-8">
              Comments
            </h4>
            <AllComments userInformation={userInformation} post={postData} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SinglePost;
