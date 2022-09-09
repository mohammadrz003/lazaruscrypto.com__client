import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// Import Swiper styles
import "swiper/css"; // home
import "swiper/css/effect-cards";

import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Blog from "./pages/Blog/Blog";
import SinglePost from "./pages/SinglePost/SinglePost";
import Admin from "./pages/Admin/Admin";
import Write from "./pages/Admin/posts/write/Write";
import ManagePosts from "./pages/Admin/posts/manage-posts/ManagePosts";
import EditPost from "./pages/Admin/posts/manage-posts/EditPost";
import ManageComments from "./pages/Admin/comments/ManageComments";
import "./App.css";
import Dashboard from "./pages/Admin/Dashboard";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="posts" element={<Blog />} />
        <Route path="post/:id" element={<SinglePost />} />
        <Route path="admin" element={<Admin />}>
          <Route index element={<Dashboard />}></Route>
          <Route path="write-post" element={<Write />}></Route>
          <Route path="manage-posts" element={<ManagePosts />}></Route>
          <Route path="manage-posts/edit/:id" element={<EditPost />}></Route>
          <Route path="manage-comments" element={<ManageComments />}></Route>
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
