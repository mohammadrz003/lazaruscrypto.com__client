import React from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex w-full h-screen dark:bg-palette-dark dark:text-palette-white">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="h-full">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
