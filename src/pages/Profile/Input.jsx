import React from "react";

const Input = ({ label, name, type = "text", ...props }) => {
  return (
    <div className="form-control w-full">
      <label htmlFor={name} className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type={type}
        id={name}
        name={name}
        {...props}
        className="input input-bordered w-full"
      />
    </div>
  );
};

export default Input;
