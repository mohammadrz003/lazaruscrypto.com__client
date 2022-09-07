import defaultHttp from "./defaultHttpService";

export const registerUser = async (data) => {
  return defaultHttp.post("/users/register", data);
};
