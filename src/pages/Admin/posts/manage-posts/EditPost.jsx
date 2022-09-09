import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./singlePost.css";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import SimpleImage from "@editorjs/simple-image";
import List from "@editorjs/list";


import authenticatedHttp from "../../../../services/authenticatedHttpService";
import AuthContext from "../../../../context/auth-context";
import defaultHttp from "../../../../services/defaultHttpService";
import { AddPostCategory } from "../write/AddPostCategory";

const EditPost = () => {
  const { id: postId } = useParams();

  const [post, setPost] = useState({});
  const PF = process.env.REACT_APP_FILE_FOLDER_URL;
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [categories, setCategories] = useState([]);
  const { user: userData } = useContext(AuthContext);
  const [changeDescHelper, setChangeDescHelper] = useState(Math.random());

  useEffect(() => {
    const fetchPost = async () => {
      const res = await defaultHttp.get(`/posts/${postId}`);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setCategories(res.data.categories);
      setChangeDescHelper(Math.random());
    };
    fetchPost();
  }, [postId]);

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
  }, [changeDescHelper]);

  const handleUpdate = async () => {
    try {
      await authenticatedHttp.put(`/posts/${postId}`, {
        user: userData.user._id,
        title,
        desc,
        categories,
      });
      window.location.reload();
    } catch (error) {}
  };

  return (
    <div className="w-full max-w-screen-md mx-auto">
      <div className="singlePostWrapper">
        {/* categories */}
        <div className="mb-4">
          <AddPostCategory
            categories={categories}
            setCategories={setCategories}
          />
        </div>
        <div className="w-full flex flex-col items-center mb-10">
          <input
            type="text"
            value={title}
            className="input input-bordered input-md w-full max-w-xs text-3xl font-bold"
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
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
        <div id="editPostEditorJs" className="prose lg:prose-xl max-w-none" />

        <div className="flex space-x-3">
          <Link
            to="/admin/manage-posts"
            className="px-8 py-4 text-gray-700 border border-red-500 rounded"
          >
            Cancel Edit
          </Link>

          <button
            onClick={handleUpdate}
            className="px-8 py-4 text-white bg-green-500 rounded"
          >
            Save Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
