import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./singlePost.css";
import { AiOutlinePlus } from "react-icons/ai";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import SimpleImage from "@editorjs/simple-image";
import List from "@editorjs/list";
import Parser from "html-react-parser";
import edjsHTML from "editorjs-html";

import { PostComment } from "../comment/PostComment";
import { AllComments } from "../comment/AllComments";
import authenticatedHttp from "../../../../services/authenticatedHttpService";
import AuthContext from "../../../../context/auth-context";
import defaultHttp from "../../../../services/defaultHttpService";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
const edjsParser = edjsHTML();

const ConvertInToHtml = ({ item }) => {
  return Parser(item);
};

const EditPost = () => {
  const { id: postId } = useParams();

  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = process.env.REACT_APP_FILE_FOLDER_URL;
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [userInformation, setUserInformation] = useState({});
  const { user: userData } = useContext(AuthContext);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await defaultHttp.get(`/posts/${postId}`);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    fetchPost();
  }, [path]);

  useEffect(() => {
    (async () => {
      const { data } = await authenticatedHttp.get(`/profiles/my-profile`);
      setUserInformation(data.profile);
    })();
  }, [userData]);

  useEffect(() => {
    if (post?.desc) {
      const editor = new EditorJS({
        holder: "editPostEditorJs",
        tools: {
          header: Header,
          image: SimpleImage,
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: "unordered",
            },
          },
        },
        data: desc,
        onChange: (api, event) => {
          editor
            .save()
            .then((outputData) => {
              setDesc(outputData);
            })
            .catch((error) => {
              console.log("Saving failed: ", error);
            });
        },
      });
    }
  }, [updateMode]);

  const handleDelete = async () => {
    try {
      await defaultHttp.delete(`/posts/${path}`, {
        data: { user: userData.user._id },
      });
      navigate("/");
    } catch (error) {}
  };

  const handleUpdate = async () => {
    try {
      await defaultHttp.put(`/posts/${path}`, {
        user: userData.user._id,
        title,
        desc,
      });
      window.location.reload();
    } catch (error) {}
  };

  return (
    <div className="w-full max-w-screen-md mx-auto">
      <div className="singlePostWrapper">
        {/* categories */}
        <div className="mb-6 flex justify-center space-x-3">
          <ul className="flex mt-6 space-x-3">
            {post?.categories?.map((category) => {
              return (
                <li
                  key={category?._id}
                  className="p-2 rounded-full dark:text-palette-java uppercase tracking-widest"
                >
                  <Link className="link" to={`/blog/?cat=${category?.name}`}>
                    {category?.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          {updateMode && (
            <div className="flex items-center">
              <input type="text" placeholder="add category" />
              <AiOutlinePlus className="p-0.5 bg-green-400 text-white text-2xl cursor-pointer" />
            </div>
          )}
        </div>
        <div className="w-full flex flex-col items-center mb-10">
          {updateMode ? (
            <input
              type="text"
              value={title}
              className="py-2 mb-2 text-3xl text-center text-gray-600 outline-none focus:border-b focus:border-gray-600"
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          ) : (
            <>
              <h1 className="dark:text-palette-gallery font-semibold text-5xl text-center">
                {title}
              </h1>
              {post?.user?._id === userData?.user?._id && (
                <div className="flex space-x-4 pt-3">
                  <i onClick={handleDelete}>
                    <AiFillDelete className="text-red-500 text-3xl" />
                  </i>
                  <i onClick={() => setUpdateMode(true)}>
                    <AiFillEdit className="text-green-500 text-3xl" />
                  </i>
                </div>
              )}
            </>
          )}
        </div>

        <div className="text-palette-alto w-full flex justify-center divide-x divide-palette-nevada mb-10">
          <span className="inline-block px-6">
            Author:
            <Link to={`/blog/?user=${post?.user?.name}`}>
              {" "}
              {post?.user?.name}
            </Link>
          </span>
          <span className="inline-block px-6">
            On: {new Date(post.createdAt).toDateString()}
          </span>
          <span className="inline-block px-6">5minutes Read</span>
        </div>

        {post?.photo && (
          <img
            className="w-full h-auto rounded-xl mb-10"
            src={PF + post.photo}
            alt=""
          />
        )}

        {updateMode ? (
          <div
            id="editPostEditorJs"
            className="prose dark:prose-invert lg:prose-xl max-w-none"
          />
        ) : (
          <article className="prose dark:prose-invert lg:prose-xl max-w-none">
            {desc &&
              edjsParser.parse(post.desc).map((item, index) => {
                return <ConvertInToHtml key={index} item={item} />;
              })}
          </article>
        )}

        <div className="flex space-x-3">
          {updateMode && (
            <button
              onClick={() => {
                setUpdateMode(false);
              }}
              className="px-8 py-4 text-gray-700 border border-red-500 rounded"
            >
              Cancel Edit
            </button>
          )}
          {updateMode && (
            <button
              onClick={handleUpdate}
              className="px-8 py-4 text-white bg-green-500 rounded"
            >
              Save Edit
            </button>
          )}
        </div>
        <div className="py-14">
          <h4 className="dark:text-palette-java text-4xl font-semibold mb-8">
            Write comment
          </h4>
          <PostComment userInformation={userInformation} post={post} />
          <h4 className="dark:text-palette-java text-4xl font-semibold my-8">
            Comments
          </h4>
          <AllComments userInformation={userInformation} post={post} />
        </div>
      </div>
    </div>
  );
};

export default EditPost;
