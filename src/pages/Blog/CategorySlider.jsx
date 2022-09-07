import React from "react";
import { Link } from "react-router-dom";

const CategorySlider = () => {
  return (
    <div className="w-full flex items-center justify-between space-x-3">
      <ul className="w-full flex flex-wrap space-x-5">
        <li>
          <Link
            className="text-lg font-medium rounded-full bg-palette-white text-palette-dark px-4 py-2"
            to="/posts"
          >
            Nature
          </Link>
        </li>
        <li>
          <Link
            className="text-lg font-medium rounded-full bg-palette-white text-palette-dark px-4 py-2"
            to="/posts"
          >
            Movies
          </Link>
        </li>
        <li>
          <Link
            className="text-lg font-medium rounded-full bg-palette-white text-palette-dark px-4 py-2"
            to="/posts"
          >
            Sports
          </Link>
        </li>
      </ul>
      <div>
        <select className="select max-w-max">
          <option disabled selected>
            Filtered By
          </option>
          <option>Older</option>
          <option>Newer</option>
        </select>
      </div>
    </div>
  );
};

export default CategorySlider;
