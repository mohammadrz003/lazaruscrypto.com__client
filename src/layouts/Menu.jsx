import React from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

const Menu = (props) => {
  return (
    <nav
      className={`fixed inset-0 dark:bg-palette-dark dark:text-palette-white z-40 flex justify-center items-center`}
    >
      <button onClick={props.onCloseMenu} className="fixed top-5 right-5">
        <IoMdClose className="w-8 h-8" />
      </button>
      <ul className="flex flex-col items-center space-y-5">
        <li className="font-semibold uppercase lg:text-3xl">
          <Link to="/">Home</Link>
        </li>
        <li className="font-semibold uppercase lg:text-3xl">
          <Link to="/posts">Blog</Link>
        </li>
        <li className="font-semibold uppercase lg:text-3xl">Portfolio</li>
        <li className="font-semibold uppercase lg:text-3xl">Managet</li>
        <li className="font-semibold uppercase lg:text-3xl">Blog</li>
      </ul>
    </nav>
  );
};

export default Menu;
