import React, { useEffect, useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Gravatar from "react-gravatar";
import toast from "react-hot-toast";

import authenticatedHttp from "../../services/authenticatedHttpService";
import AuthContext from "../../context/auth-context";

const PostComment = ({ userInformation, post }) => {
  const userImageElementRef = useRef(null);
  const [userImageElement, setUserImageElement] = useState(null);
  const [comment, setComment] = useState("");
  const [ratingStars, setRatingStars] = useState(3);
  const { user: userData } = useContext(AuthContext);

  const ratingChanged = (newRating) => {
    setRatingStars(newRating);
  };

  useEffect(() => {
    setUserImageElement(userImageElementRef);
  }, [userImageElementRef]);

  const submitHandle = async () => {
    try {
      const { data } = await authenticatedHttp.post("/comments/add-comment", {
        user: userInformation._id,
        desc: comment,
        post: post._id,
        rate: ratingStars,
      });
      setComment("");
      toast.success(
        "Comment is submitted. it will be appear after Admin's confirmation",
        { duration: 8000 }
      );
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  };

  if (userData === null || !userData?.token) {
    return (
      <div className="border dark:border-slate-600 rounded-md p-5 flex justify-between items-center">
        <p className="dark:text-palette-gallery font-medium text-2xl">
          Please Login first
        </p>
        <Link
          to="/login"
          className="dark:text-white dark:bg-[#1363DF] rounded-md px-5 py-2.5"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col border border-palette-nevada rounded-lg p-4 relative">
      <div className="flex space-x-4 items-center">
        <div className="avatar cursor-pointer" ref={userImageElementRef}>
          <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <Gravatar
              email={userData.user.email}
              alt="user profile"
              className="rounded-full w-full h-full"
            />
          </div>
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col">
            <p className="dark:text-palette-alto capitalize">
              {userInformation?.name}
            </p>
            <ReactStars
              count={5}
              value={ratingStars}
              size={20}
              onChange={ratingChanged}
            />
          </div>
          <button
            onClick={submitHandle}
            className="uppercase bg-green-600 text-white rounded-md h-fit px-5 py-2.5 hover:bg-green-700 transform transition-all duration-150"
          >
            post
          </button>
        </div>
      </div>
      <div className="flex justify-end mt-1">
        <textarea
          className="bg-transparent focus:outline-none text-palette-gallery border border-slate-500 p-5"
          style={{
            width: `${
              userImageElement?.current?.clientWidth
                ? `calc(100% - 16px - ${userImageElement?.current?.clientWidth}px)`
                : "100%"
            }`,
          }}
          cols="30"
          rows="6"
          placeholder="Write your comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
    </div>
  );
};

export default PostComment;
