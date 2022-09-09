import defaultHttp from "./defaultHttpService";
import authenticatedHttp from "./authenticatedHttpService";

export const getAllPosts = async () => {
  return defaultHttp.get("/posts");
};

export const getSinglePost = async (id) => {
  return defaultHttp.get(`/posts/${id}`);
};

export const getAllComments = async () => {
  return authenticatedHttp.get("/comments/get-comments");
};
