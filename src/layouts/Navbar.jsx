import React, { useContext } from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import Gravatar from "react-gravatar";

import logoImage from "../assets/logo.svg";
import styles from "./Navbar.module.css";
import AuthContext from "../context/auth-context";

const Navbar = () => {
  const { user: userData, setUser: setUserData } = useContext(AuthContext);

  const logoutHandler = () => {
    setUserData(null);
  };

  return (
    <header className="px-6 sticky top-0 z-30 bg-palette-dark">
      <div className="py-6 flex justify-between items-center border-b dark:border-b-gray-700">
        <div>
          <Link to="/">
            <img className={styles.logo_img} src={logoImage} alt="logo" />
          </Link>
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
          {userData ? (
            <>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} className="avatar cursor-pointer">
                  <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
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
            </>
          ) : (
            <Link to="/login" className="flex items-center space-x-2">
              <span className="font-semibold">Sign in</span>{" "}
              <HiOutlineArrowNarrowRight className="relative top-[1px] text-lg" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
