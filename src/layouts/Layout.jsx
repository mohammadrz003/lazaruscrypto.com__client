import React, { useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const changeSidebarStatusHandler = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className={`${styles.layout} flex w-full min-h-screen dark:bg-palette-dark dark:text-palette-white`}>
      <Sidebar
        isSidebarVisible={isSidebarVisible}
        onChangeSidebarStatus={changeSidebarStatusHandler}
      />
      <div className="w-full flex flex-col flex-1">
        <Navbar
          isSidebarVisible={isSidebarVisible}
          onChangeSidebarStatus={changeSidebarStatusHandler}
        />
        <main className="w-full h-full">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
