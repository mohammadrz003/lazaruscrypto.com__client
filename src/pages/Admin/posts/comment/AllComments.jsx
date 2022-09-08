import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import noUserPicture from "../../../../assets/icons/userimg.png";
import { AiOutlineDelete } from "react-icons/ai";
import { ReplyComment } from "./ReplyComment";
import authenticatedHttp from "../../../../services/authenticatedHttpService";

export const AllComments = ({ userInformation, post }) => {
  const PF = process.env.REACT_APP_FILE_FOLDER_URL;
  const userImageElementRef = useRef(null);
  const [userImageElement, setUserImageElement] = useState(null);
  const [deleteCommentReaction, setDeleteCommentReaction] = useState(false);

  useEffect(() => {
    setUserImageElement(userImageElementRef);
  }, [userImageElementRef]);

  const deleteCommentHandler = async (commentId) => {
    try {
      const { data } = await authenticatedHttp.delete(
        `/comments/delete-comment/${commentId}`
      );
      console.log(data);
      setDeleteCommentReaction(!deleteCommentReaction);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col space-y-5">
      {post?.comments?.map((comment) => {
        {
          console.log(comment);
        }
        return (
          <div
            key={comment._id}
            className="w-full flex flex-col border border-palette-nevada rounded-lg p-4 relative"
          >
            <div className="flex space-x-4 items-center">
              <img
                src={
                  comment?.user?.profile?.avatar
                    ? PF + comment?.user?.profile?.avatar
                    : noUserPicture
                }
                alt="user profile"
                className="rounded-full w-14 h-14"
                ref={userImageElementRef}
              />
              <div className="flex justify-between items-start w-full">
                <div className="flex flex-col">
                  <p className="dark:text-palette-alto capitalize">
                    {comment.user.name}
                  </p>
                  <ReactStars
                    count={5}
                    size={20}
                    edit={false}
                    value={comment.rate}
                  />
                </div>
                {userInformation?.account?._id === comment?.user?._id && (
                  <button
                    onClick={() => deleteCommentHandler(comment._id)}
                    className="cursor-pointer"
                  >
                    <AiOutlineDelete className="dark:text-red-400 text-xl" />
                  </button>
                )}
              </div>
            </div>
            <div className="flex justify-end mt-1">
              <p
                className="dark:text-palette-alto text-lg"
                style={{
                  width: `${
                    userImageElement?.current?.clientWidth
                      ? `calc(100% - 16px - ${userImageElement?.current?.clientWidth}px)`
                      : "100%"
                  }`,
                }}
              >
                {comment.desc}
              </p>
            </div>
            {/* reply */}
            <ReplyComment
              userInformation={userInformation}
              post={post}
              userImageElement={userImageElement}
              comment={comment}
              parent={comment}
            />
            {/* reply on comments */}
            <div className="flex flex-col space-y-3 mt-3">
              {comment?.comments?.map((replyComment) => {
                return (
                  <div
                    key={replyComment._id}
                    className="w-full flex flex-col border border-palette-nevada rounded-lg p-4 relative"
                  >
                    <div className="flex space-x-4 items-center">
                      <img
                        src={
                          replyComment?.user.profile.avatar
                            ? PF + replyComment?.user.profile.avatar
                            : noUserPicture
                        }
                        alt="user profile"
                        className="rounded-full w-14 h-14"
                        ref={userImageElementRef}
                      />
                      <div className="flex justify-between items-start w-full">
                        <div className="flex flex-col">
                          <p className="dark:text-slate-300 capitalize">
                            {replyComment.user.name}
                          </p>
                          <p className="dark:text-slate-300">
                            Reply On: {replyComment.replyOnUser.name}
                          </p>
                        </div>
                        {userInformation?.account?._id ===
                          replyComment?.user?._id && (
                          <button
                            onClick={() =>
                              deleteCommentHandler(replyComment._id)
                            }
                            className="cursor-pointer"
                          >
                            <AiOutlineDelete className="dark:text-red-400 text-xl" />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-end mt-1">
                      <p
                        className="dark:text-slate-300 text-lg"
                        style={{
                          width: `${
                            userImageElement?.current?.clientWidth
                              ? `calc(100% - 16px - ${userImageElement?.current?.clientWidth}px)`
                              : "100%"
                          }`,
                        }}
                      >
                        {replyComment.desc}
                      </p>
                    </div>
                    {/* reply */}
                    <ReplyComment
                      userInformation={userInformation}
                      post={post}
                      userImageElement={userImageElement}
                      comment={replyComment}
                      parent={comment}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
