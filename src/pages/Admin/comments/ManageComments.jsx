import React, { useState, useEffect } from "react";
import Gravatar from "react-gravatar";
import { AiFillDelete } from "react-icons/ai";
import { getAllComments } from "../../../services/postServices";

const ManageComments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllComments();
        console.log(data);
        setComments(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const deleteCommentHandler = () => {
    return;
  };

  return (
    <section className="py-10 px-4 w-full bg-[#F7F7F7]">
      <div className="overflow-x-auto w-full">
        {!comments.length ? (
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
              {comments.map((comment) => {
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
