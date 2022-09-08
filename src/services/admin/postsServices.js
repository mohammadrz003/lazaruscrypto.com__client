import authenticatedHttp from "../authenticatedHttpService";
import defaultHttp from "../defaultHttpService";

export const createPost = async (data) => {
  return authenticatedHttp.post("/posts", data);
};

export const deletePost = async (id) => {
  return authenticatedHttp.delete(`/posts/${id}`);
};

export const getPost = async (id) => {
    return defaultHttp.get(`/posts/${id}`)
}

export const getAllPosts = async () => {
  return defaultHttp.get("/posts");
};
