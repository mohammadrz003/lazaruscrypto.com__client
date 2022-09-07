import React from "react";

export const Input = ({ label, name, formik, type = "text" }) => {
  return (
    <div className="form-control w-full">
      <label htmlFor={name} className="label">
        <span className="label-text dark:text-[#eee]">{label}</span>
        {formik.errors[name] && formik.touched[name] && (
          <span className="label-text text-red-500">{formik.errors[name]}</span>
        )}
      </label>
      <input
        id={name}
        type={type}
        placeholder="Type here"
        className="input input-bordered w-full"
        {...formik.getFieldProps(name)}
        name={name}
      />
    </div>
  );
};
