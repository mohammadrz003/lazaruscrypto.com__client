import React from "react";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import authenticatedHttp from "../../../../services/authenticatedHttpService";
import toast from "react-hot-toast";

export const AddGeneralCategory = (props) => {
  const [generalCategory, setGeneralCategory] = useState("");

  const submitHandle = async () => {
    try {
      await authenticatedHttp.post("/categories", { name: generalCategory });
      toast.success("category added");
      props.setRandomNumber(Math.random);
      setGeneralCategory("");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <div className="flex items-start space-x-2 w-full">
      <input
        type="text"
        className="input input-bordered flex-1 placeholder:text-gray-400 placeholder:font-semibold"
        placeholder="Add General Category"
        value={generalCategory}
        onChange={(e) => setGeneralCategory(e.target.value)}
      />
      <button className="btn bg-green-600" onClick={submitHandle}>
        <AiOutlinePlus color="white" fontSize={20} />
      </button>
    </div>
  );
};
