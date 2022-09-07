import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

export const AddPostCategory = ({ categories, setCategories }) => {
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/categories");
        setAllCategories(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const addCategoriesHandle = (name, _id) => {
    setCategories((previousState) => {
      return [...previousState, { name, _id }];
    });
  };

  return (
    <div>
      <input type="text" placeholder="search category" />
      {/* selected categories */}
      <ul className="mb-5 dark:text-palette-java">
        {categories.map((category) => {
          return <li key={category._id}>{category.name}</li>;
        })}
      </ul>
      {/* all categories */}
      <ul className="dark:text-palette-gallery">
        {allCategories
          .filter(
            ({ _id: id1 }) => !categories.some(({ _id: id2 }) => id2 === id1)
          ).map((filteredCategory) => {
            return (
              <li
                key={filteredCategory._id}
                className="cursor-pointer hover:bg-green-300"
                onClick={() =>
                  addCategoriesHandle(
                    filteredCategory.name,
                    filteredCategory._id
                  )
                }
              >
                {filteredCategory.name}
              </li>
            );
          })}
        {/* {allCategories.map((category) => {
          return (
            <li
              key={category._id}
              className="cursor-pointer hover:bg-green-300"
              onClick={() => addCategoriesHandle(category.name, category._id)}
            >
              {category.name}
            </li>
          );
        })} */}
      </ul>
    </div>
  );
};
