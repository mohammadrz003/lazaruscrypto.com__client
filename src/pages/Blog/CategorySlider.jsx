import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
      <ul className="w-full flex flex-wrap space-x-5">
        <li>
          <Link
            className="text-lg font-medium rounded-full bg-palette-white text-palette-dark px-4 py-2"
            to="/posts"
          >
            All
          </Link>
        </li>
        {cats.map((cat) => {
          return (
            <li>
              <Link
                className="text-lg font-medium rounded-full bg-palette-white text-palette-dark px-4 py-2"
                to={`/posts/?cat=${cat.name}`}
              >
                {cat.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <div>
        <select
          value={props.filteredBy}
          onChange={changeFilterSortsHandler}
          className="select max-w-max"
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
