import React from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

import logoImage from "../assets/logo.svg";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <header className="px-6">
      <div className="py-6 flex justify-between items-center border-b dark:border-b-gray-700">
        <div>
          <img className={styles.logo_img} src={logoImage} alt="logo" />
        </div>
        <div className="relative">
          <div className="absolute top-1/2 left-3 transform -translate-y-1/2">
            <FiSearch />
          </div>
          <input
            className="pl-10 pr-3 py-1.5 lg:w-80 outline-none border-none rounded-md dark:bg-[#262726]"
            placeholder="Search"
            type="text"
          />
        </div>
        <div>
          <button className="flex items-center space-x-2">
            <span className="font-semibold">Sign in</span>{" "}
            <HiOutlineArrowNarrowRight className="relative top-[1px] text-lg" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
