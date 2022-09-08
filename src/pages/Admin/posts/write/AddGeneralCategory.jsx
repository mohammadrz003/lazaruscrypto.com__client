import React from "react";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import authenticatedHttp from "../../../../services/authenticatedHttpService";

export const AddGeneralCategory = () => {
  const [generalCategory, setGeneralCategory] = useState("");

  const submitHandle = async () => {
    try {
      await authenticatedHttp.post(
        "/categories",
        { name: generalCategory },
      );
      console.log("category added");
      setGeneralCategory("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-start">
      <input
        type="text"
        placeholder="Add General Category"
        value={generalCategory}
        onChange={(e) => setGeneralCategory(e.target.value)}
      />
      <button className="p-0.5 bg-green-600 rounded-sm" onClick={submitHandle}>
        <AiOutlinePlus color="white" fontSize={20} />
      </button>
    </div>
  );
};
