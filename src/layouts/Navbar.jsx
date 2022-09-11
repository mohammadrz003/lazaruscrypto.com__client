import React, { useContext } from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import Gravatar from "react-gravatar";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

import logoImage from "../assets/logoDark.png";
import styles from "./Navbar.module.css";
import AuthContext from "../context/auth-context";

const Navbar = ({ isSidebarVisible, onChangeSidebarStatus }) => {
  const { user: userData, setUser: setUserData } = useContext(AuthContext);

  const logoutHandler = () => {
    setUserData(null);
  };

  const changeSidebarStatusHandler = () => {
    onChangeSidebarStatus();
  };

  return (
    <header className="px-6 sticky top-0 z-30 bg-palette-dark">
      <div className="py-6 flex justify-between items-center border-b dark:border-b-gray-700">
        <div>
          <Link to="/">
            <img className="w-14 lg:w-20 h-auto" src={logoImage} alt="logo" />
          </Link>
        </div>
        <div className="hidden lg:block relative">
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
          {userData ? (
            <div className="flex space-x-4 items-center">
              <div className="dropdown dropdown-end transform translate-y-1">
                <div tabIndex={0} className="avatar cursor-pointer">
                  <div className="w-7 lg:w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <Gravatar email={userData.user.email} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <button onClick={logoutHandler}>Logout</button>
                  </li>
                </ul>
              </div>
              {isSidebarVisible ? (
                <IoMdClose
                  onClick={changeSidebarStatusHandler}
                  className="w-7 h-7 cursor-pointer lg:hidden"
                />
              ) : (
                <HiOutlineMenuAlt3
                  onClick={changeSidebarStatusHandler}
                  className="w-7 h-7 cursor-pointer lg:hidden"
                />
              )}
            </div>
          ) : (
            <Link to="/login" className="flex items-center space-x-2">
              <span className="font-semibold">Sign in</span>{" "}
              <HiOutlineArrowNarrowRight className=" hidden lg:block relative top-[1px] text-lg" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
