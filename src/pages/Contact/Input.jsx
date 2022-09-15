import React from "react";

const Input = ({
  placeholder,
  type = "text",
  name,
  ...props
}) => {
  return (
    <div>
      <input
        className="input w-full"
        name={name}
        type={type}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default Input;
