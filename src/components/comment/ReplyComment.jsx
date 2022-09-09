import React, { useState } from "react";
import toast from "react-hot-toast";

import authenticatedHttp from "../../services/authenticatedHttpService";

export const ReplyComment = ({
  comment,
  parent,
  userInformation,
  post,
  userImageElement,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [commentValue, setCommentValue] = useState("");

  const sendReplyHandle = async () => {
    try {
      const { data } = await authenticatedHttp.post("/comments/add-comment", {
        user: userInformation?._id,
        desc: commentValue,
        post: post._id,
        rate: 0,
        parent: parent._id,
        replyOnUser: comment.user._id,
      });
      setCommentValue("");
      toast.success(
        "Comment is submitted. it will be appear after Admin's confirmation",
        { duration: 8000 }
      );
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col space-y-2 items-end">
      <button
        className="text-slate-400"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? "Cancel" : "Reply"}
      </button>
      {isVisible && (
        <>
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
            placeholder="Reply Comment"
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
          />
          <button
            onClick={sendReplyHandle}
            className="uppercase bg-green-600 text-white rounded-md h-fit px-5 py-2.5 hover:bg-green-700 transform transition-all duration-150"
          >
            post
          </button>
        </>
      )}
    </div>
  );
};
