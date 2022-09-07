import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./write.css";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import SimpleImage from "@editorjs/simple-image";
import List from "@editorjs/list";

import { AddGeneralCategory } from "./AddGeneralCategory";
import { AddPostCategory } from "./AddPostCategory";
import authenticatedHttp from "../../../services/authenticatedHttpService";
import { uploadFile } from "../../../services/subsidiaryService";

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
      const res = await authenticatedHttp.post("/posts", newPost);
      console.log(`post created: ${res.data}`);
      return navigate("/admin", {
        state: {
          toastMessage: {
            type: "success",
            message: "Your post is created.",
          },
        },
      });
    } catch (error) {
      console.log(error);
      return navigate("/admin", {
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
    <section className="dark:bg-palette-dark">
      <div className="container flex justify-around max-w-screen-xl mx-auto">
        <AddGeneralCategory />
        <AddPostCategory
          categories={categories}
          setCategories={setCategories}
        />
      </div>
      <div className="write">
        {file && (
          <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
        )}

        <form className="writeForm" onSubmit={handleSubmit}>
          <div className="writeFormGroup">
            <label htmlFor="fileInput">upload photo</label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <input
              className="writeInput"
              placeholder="Title"
              type="text"
              autoFocus={true}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <input
            className="writeInput"
            placeholder="Caption"
            type="text"
            onChange={(e) => setCaption(e.target.value)}
          />
          <div
            id="richTextEditor"
            className="prose dark:prose-invert lg:prose-xl max-w-none"
          />
          <button className="writeSubmit" type="submit">
            Publish
          </button>
        </form>
      </div>
    </section>
  );
}
