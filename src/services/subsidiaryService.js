import authenticatedHttp from "./authenticatedHttpService";

export const uploadFile = async (data) => {
  return authenticatedHttp.post("/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
