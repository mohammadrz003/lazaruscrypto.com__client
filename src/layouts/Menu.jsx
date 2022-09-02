import React from "react";
import { IoMdClose } from "react-icons/io";

const Menu = (props) => {
  return (
    <nav
      className={`fixed inset-0 dark:bg-palette-dark dark:text-palette-white z-40 flex justify-center items-center`}
    >
      <button onClick={props.onCloseMenu} className="fixed top-5 right-5">
        <IoMdClose className="w-8 h-8" />
      </button>
      <ul className="flex flex-col items-center space-y-5">
        <li className="font-semibold uppercase lg:text-3xl">Home</li>
        <li className="font-semibold uppercase lg:text-3xl">Setting</li>
        <li className="font-semibold uppercase lg:text-3xl">Portfolio</li>
        <li className="font-semibold uppercase lg:text-3xl">Managet</li>
        <li className="font-semibold uppercase lg:text-3xl">Blog</li>
      </ul>
    </nav>
  );
};

export default Menu;
