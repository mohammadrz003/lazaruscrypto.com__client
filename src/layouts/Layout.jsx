import React from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex w-full min-h-screen dark:bg-palette-dark dark:text-palette-white">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="w-full h-full">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
