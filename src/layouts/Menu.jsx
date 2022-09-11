import React from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

import { MENU_ITEMS } from "../data/constants";

const Menu = (props) => {
  return (
    <nav
      className={`hidden fixed inset-0 dark:bg-palette-dark dark:text-palette-white z-40 lg:flex justify-center items-center`}
    >
      <button onClick={props.onCloseMenu} className="fixed top-5 right-5">
        <IoMdClose className="w-8 h-8" />
      </button>
      <ul className="flex flex-col items-center space-y-5">
        {MENU_ITEMS.map((item) => {
          return (
            <li className="font-semibold uppercase lg:text-3xl">
              <Link to={item.link}>{item.name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Menu;
