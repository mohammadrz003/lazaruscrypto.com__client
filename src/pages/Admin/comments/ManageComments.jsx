import React, { useState, useEffect } from "react";
import Gravatar from "react-gravatar";
import { AiFillDelete } from "react-icons/ai";
import { AiFillCheckSquare } from "react-icons/ai";
import { TiCancel } from "react-icons/ti";
import toast from "react-hot-toast";

import {
  deleteComment,
  getAllComments,
  updateComment,
} from "../../../services/postServices";

const ManageComments = () => {
  const [filterCommentsBy, setFilterCommentsBy] = useState("notAccepted");
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [randomNumber, setRandomNumber] = useState(Math.random());

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllComments();
        setComments(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [randomNumber]);

  useEffect(() => {
    switch (filterCommentsBy) {
      case "notAccepted": {
        const updatedComments = comments.filter((item) => {
          return item.check === false;
        });
        return setFilteredComments(updatedComments);
      }

      case "accepted": {
        const updatedComments = comments.filter((item) => {
          return item.check === true;
        });
        return setFilteredComments(updatedComments);
      }
      default:
        break;
    }
  }, [filterCommentsBy, comments]);

  const changeFilterHandler = (e) => {
    const value = e.target.value;
    setFilterCommentsBy(value);
  };

  const updateCommentHandler = async (id, check) => {
    try {
      const { data } = await updateComment(id, { check });
      toast.success(check ? "comment is accepted." : "comment is cancled.");
      setRandomNumber(Math.random());
    } catch (error) {
      console.log(error);
      toast.error("something went wrong.");
    }
  };

  const deleteCommentHandler = async (id) => {
    try {
      const { data } = await deleteComment(id);
      toast.success("comment is deleted.");
      setRandomNumber(Math.random());
    } catch (error) {
      console.log(error);
      toast.error("something went wrong.");
    }
  };

  return (
    <section className="py-10 px-4 w-full bg-[#F7F7F7]">
      <div className="overflow-x-auto w-full">
        <div className="flex justify-end mb-5">
          <select
            className="select shadow-md max-w-max"
            value={filterCommentsBy}
            onChange={changeFilterHandler}
          >
            <option value="notAccepted">Not Accpeted</option>
            <option value="accepted">Accepted</option>
          </select>
        </div>
        {!filteredComments.length ? (
          <h3 className="text-center text-3xl font-semibold">
            there's no post
          </h3>
        ) : (
          <table className="table w-full">
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th>Username</th>
                <th>Content</th>
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredComments.map((comment) => {
                return (
                  <tr key={comment._id}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <Gravatar
                            email={comment.user.email}
                            alt="user profile"
                            className="rounded-full w-full h-full"
                          />
                        </div>
                        <div>
                          <div className="font-bold">
                            {comment.user.username.length > 30
                              ? `${comment.user.username.substring(0, 30)}...`
                              : comment.user.username}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {comment.desc.length > 30
                        ? `${comment.desc.substring(0, 30)}...`
                        : comment.desc}
                    </td>
                    <td>{new Date(comment.createdAt).toDateString()}</td>
                    <th>
                      <div className="space-x-3">
                        <div className="tooltip" data-tip="Delete">
                          <button
                            onClick={() => deleteCommentHandler(comment._id)}
                            className="btn btn-ghost"
                          >
                            <AiFillDelete className="w-6 h-6 text-red-500" />
                          </button>
                        </div>

                        <div className="tooltip" data-tip="Accept">
                          <button
                            onClick={() => {
                              comment.check
                                ? updateCommentHandler(comment._id, false)
                                : updateCommentHandler(comment._id, true);
                            }}
                            className="btn btn-ghost"
                          >
                            {comment.check ? (
                              <TiCancel className="w-6 h-6 text-orange-400 rounded-sm" />
                            ) : (
                              <AiFillCheckSquare className="w-6 h-6 text-green-500 rounded-sm" />
                            )}
                          </button>
                        </div>
                      </div>
                    </th>
                  </tr>
                );
              })}
            </tbody>
            {/* <!-- foot --> */}
            <tfoot>
              <tr>
                <th>Username</th>
                <th>Cotent</th>
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </tfoot>
          </table>
        )}
      </div>
    </section>
  );
};

export default ManageComments;
