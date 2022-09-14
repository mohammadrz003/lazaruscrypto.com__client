import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";

import { getAllCategories } from "../../services/postServices.js";

const CategorySlider = (props) => {
  const [cats, setCats] = useState([]);

  const changeFilterSortsHandler = (e) => {
    const value = e.target.value;
    props.onSetFilteredBy(value);
  };

  useEffect(() => {
    (async () => {
      const res = await getAllCategories();
      setCats(res.data);
    })();
  }, []);

  return (
    <div className="w-full flex items-center justify-between space-x-3">
      <div className="dropdown">
        <label
          tabIndex={0}
          className="cursor-pointer bg-[#2A303C] py-3 px-6 rounded-md m-1 flex space-x-3 items-center"
        >
          <span>Categories</span>
          <IoMdArrowDropdown />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <Link
              className="capitalize font-medium rounded-full text-base dark:text-palette-white px-4 py-2"
              to={`/posts`}
            >
              all
            </Link>
          </li>
          {cats.map((cat) => {
            return (
              <li>
                <Link
                  className="capitalize font-medium rounded-full text-base dark:text-palette-white px-4 py-2"
                  to={`/posts/?cat=${cat.name}`}
                >
                  {cat.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <select
          value={props.filteredBy}
          onChange={changeFilterSortsHandler}
          className="select w-full sm:max-w-max"
        >
          <option value="newer">Newer</option>
          <option value="older">Older</option>
          <option value="updatedRecently">updated recently</option>
        </select>
      </div>
    </div>
  );
};

export default CategorySlider;
