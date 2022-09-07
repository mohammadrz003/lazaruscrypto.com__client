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
import Write from "./pages/Admin/write/Write";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="posts" element={<Blog />} />
        <Route path="posts/:id" element={<SinglePost />} />
        <Route path="admin" element={<Admin />}>
          <Route path="write-post" element={<Write />}></Route>
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
