import React from "react";
import toast from "react-hot-toast";

export const Toast = (type, message) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    default:
      toast.success(message);
  }
};
