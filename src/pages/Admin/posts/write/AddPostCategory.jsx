import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { AddGeneralCategory } from "./AddGeneralCategory";

export const AddPostCategory = ({ categories, setCategories }) => {
  const [allCategories, setAllCategories] = useState([]);
  const [randomNumber, setRandomNumber] = useState(Math.random());

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/categories");
        setAllCategories(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [randomNumber]);

  const addCategoriesHandle = (name, _id) => {
    setCategories((previousState) => {
      return [...previousState, { name, _id }];
    });
  };

  const deleteCategoryHandler = (id) => {
    const cloneArray = categories.map((item) => {
      return { ...item };
    });
    const indexOfObject = cloneArray.findIndex((object) => {
      return object._id === id;
    });
    cloneArray.splice(indexOfObject, 1);
    setCategories(cloneArray);
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto space-y-4 bg-white shadow-md p-5 rounded-md">
      <AddGeneralCategory setRandomNumber={setRandomNumber} />
      {/* POST CATEGORIES */}
      <div className="flex flex-col space-y-4">
        {/* selected categories */}
        <div className="flex flex-col space-y-3">
          <h6>Selected Categories</h6>
          {!categories.length ? (
            <p className="text-red-400">Nothing has found</p>
          ) : (
            <ul className="flex flex-wrap w-full space-x-4">
              {categories.map((category) => {
                return (
                  <li
                    key={category._id}
                    className="bg-blue-200 rounded-full py-2 px-4 indicator"
                  >
                    <span className="indicator-item badge bg-red-500">
                      <AiOutlineClose
                        className="text-white cursor-pointer"
                        onClick={() => deleteCategoryHandler(category._id)}
                      />
                    </span>
                    <span>{category.name}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        {/* all categories */}
        <div className="flex flex-col space-y-2">
          <h6>All categories (remained)</h6>
          <ul className="flex flex-wrap w-full space-x-2">
            {allCategories
              .filter(
                ({ _id: id1 }) =>
                  !categories.some(({ _id: id2 }) => id2 === id1)
              )
              .map((filteredCategory) => {
                return (
                  <li
                    key={filteredCategory._id}
                    className="bg-gray-200 rounded-full py-2 px-4 cursor-pointer"
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
          </ul>
        </div>
      </div>
    </div>
  );
};
