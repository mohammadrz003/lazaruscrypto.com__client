import React, { useState } from "react";
import ReactDOM from "react-dom";

import Menu from "./Menu";
import { RiMenu5Fill } from "react-icons/ri";
import {
  AiFillTwitterSquare,
  AiFillInstagram,
  AiFillFacebook,
} from "react-icons/ai";
import { BsTelegram } from "react-icons/bs";
import { BsFillSunFill } from "react-icons/bs";

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenuHandler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col justify-between items-center px-4 py-6 dark:bg-[#262726] w-auto">
      <div onClick={toggleMenuHandler} className="cursor-pointer">
        <RiMenu5Fill className="w-10 h-10" />
      </div>
      {isMenuOpen &&
        ReactDOM.createPortal(
          <Menu menuStatus={isMenuOpen} onCloseMenu={toggleMenuHandler} />,
          document.getElementById("overlay")
        )}
      <div className="space-y-3">
        <AiFillTwitterSquare className="w-6 h-6 dark:hover:text-palette-green transform transition-all duration-500 cursor-pointer" />
        <AiFillInstagram className="w-6 h-6 dark:hover:text-palette-green transform transition-all duration-500 cursor-pointer" />
        <AiFillFacebook className="w-6 h-6 dark:hover:text-palette-green transform transition-all duration-500 cursor-pointer" />
        <BsTelegram className="w-6 h-6 dark:hover:text-palette-green transform transition-all duration-500 cursor-pointer" />
      </div>
      <div>
        <BsFillSunFill className="w-6 h-6 cursor-pointer" />
      </div>
    </div>
  );
};

export default Sidebar;
