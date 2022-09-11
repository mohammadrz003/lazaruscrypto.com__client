import defaultHttp from "./defaultHttpService";
import authenticatedHttp from "./authenticatedHttpService";

export const getAllPosts = async (search) => {
  return defaultHttp.get(`/posts${search}`);
};

export const getSinglePost = async (id) => {
  return defaultHttp.get(`/posts/${id}`);
};

export const getAllComments = async () => {
  return authenticatedHttp.get("/comments/get-comments");
};

export const updateComment = async (id, data) => {
  return authenticatedHttp.put(`/comments/update-comment/${id}`, data);
};

export const deleteComment = async (id) => {
  return authenticatedHttp.delete(`/comments/delete-comment/${id}`);
};

export const getAllCategories = async () => {
  return defaultHttp.get("/categories");
};
