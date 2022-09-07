import authenticatedHttp from "./authenticatedHttpService";

export const getUserData = async () => {
  return authenticatedHttp.get("/users/authenticate");
};

export const getUserProfile = async () => {
  return authenticatedHttp.get("/profiles/my-profile");
};

export const updateUserProfile = async (data) => {
  return authenticatedHttp.put("/profiles/update-profile", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
