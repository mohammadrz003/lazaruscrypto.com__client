import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./write.module.css";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import SimpleImage from "@editorjs/simple-image";
import List from "@editorjs/list";

import { AddGeneralCategory } from "./AddGeneralCategory";
import { AddPostCategory } from "./AddPostCategory";
import authenticatedHttp from "../../../../services/authenticatedHttpService";
import { uploadFile } from "../../../../services/subsidiaryService";
import { TbFileUpload } from "react-icons/tb";
import { createPost } from "../../../../services/admin/postsServices";

export default function Write() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [desc, setDesc] = useState({});
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const editor = new EditorJS({
      holder: "richTextEditor",
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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      desc,
      caption,
      categories,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await uploadFile(data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const res = await createPost(newPost);
      console.log(`post created: ${res.data}`);
      return navigate("/admin/manage-posts", {
        state: {
          toastMessage: {
            type: "success",
            message: "Your post is created.",
          },
        },
      });
    } catch (error) {
      console.log(error);
      return navigate("/admin/manage-posts", {
        state: {
          toastMessage: {
            type: "error",
            message: "Something went wrong!",
          },
        },
      });
    }
  };

  return (
    <section
      className={`${styles.writeContainer} py-10 px-4 w-full bg-[#F7F7F7]`}
    >
      <div className="w-full max-w-[800px] mx-auto">
        <div className="mb-4">
          <AddPostCategory
            categories={categories}
            setCategories={setCategories}
          />
        </div>
        <div className={`${styles.write}`}>
          {file && (
            <img
              className={`${styles.writeImg}`}
              src={URL.createObjectURL(file)}
              alt=""
            />
          )}

          <form className={`${styles.writeForm}`} onSubmit={handleSubmit}>
            <div className={`${styles.writeFormGroup} space-y-5`}>
              <label className={`${styles.fileInputLabel}`} htmlFor="fileInput">
                <TbFileUpload className="w-6 h-6 mb-1.5" />
                <span>{!file ? "upload photo" : "change photo"}</span>
              </label>
              <input
                id="fileInput"
                type="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
              <input
                className={`${styles.writeInput}`}
                placeholder="Title"
                type="text"
                autoFocus={true}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                className={`${styles.writeInput}`}
                placeholder="Caption"
                type="text"
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>

            <article
              id="richTextEditor"
              className="prose lg:prose-xl max-w-none"
            />
            <button className={`${styles.writeSubmit}`} type="submit">
              Publish
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
