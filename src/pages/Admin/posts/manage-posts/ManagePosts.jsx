import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import toast from "react-hot-toast";

import {
  deletePost,
  getAllPosts,
} from "../../../../services/admin/postsServices";
import { MEDIA_FOLDER } from "../../../../data/constants";

const ManagePosts = () => {
  const [posts, setPosts] = useState([]);
  const [randomNumber, setRandomNumber] = useState(Math.random());

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllPosts();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [randomNumber]);

  const deletePostHandler = async (id) => {
    try {
      const { data } = await deletePost(id);
      toast.success(data);
      setRandomNumber(Math.random());
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
      setRandomNumber(Math.random());
    }
  };

  return (
    <section className="py-10 px-4 w-full bg-[#F7F7F7]">
      <div className="overflow-x-auto w-full">
        {!posts.length ? (
          <h3 className="text-center text-3xl font-semibold">
            there's no post
          </h3>
        ) : (
          <table className="table w-full">
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th>Title</th>
                <th>Caption</th>
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => {
                return (
                  <tr key={post._id}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={`${MEDIA_FOLDER}/${post.photo}`}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{`${post.title.substring(
                            0,
                            30
                          )}...`}</div>
                        </div>
                      </div>
                    </td>
                    <td>{`${post.caption.substring(0, 40)}...`}</td>
                    <td>{new Date(post.createdAt).toDateString()}</td>
                    <th>
                      <div className="space-x-3">
                        <div className="tooltip" data-tip="Delete">
                          <button
                            onClick={() => deletePostHandler(post._id)}
                            className="btn btn-ghost"
                          >
                            <AiFillDelete className="w-6 h-6 text-red-500" />
                          </button>
                        </div>
                        <div className="tooltip" data-tip="Edit">
                          <Link
                            to={`/admin/manage-posts/edit/${post._id}`}
                            className="btn btn-ghost"
                          >
                            <AiFillEdit className="w-6 h-6 text-blue-500" />
                          </Link>
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
                <th>Title</th>
                <th>Caption</th>
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

export default ManagePosts;
