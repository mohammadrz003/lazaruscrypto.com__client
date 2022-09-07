import defaultHttp from "./defaultHttpService";

export const loginUser = async (data) => {
  return defaultHttp.post("/users/authenticate", data);
};
