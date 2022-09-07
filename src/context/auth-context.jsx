import React, { useState, useEffect } from "react";

const LOCAL_STORAGE_AUTH_KEY = process.env.REACT_APP_LOCAL_STORAGE_AUTH_KEY;

const AuthContext = React.createContext({
  user: {},
  setUser: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)) || null
  );

  //   useEffect(() => {
  //     (async () => {
  //       const userData =
  //         JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)) || null;

  //       if (userData) {
  //         try {
  //           await getUserProfile();
  //         } catch (error) {
  //           if (error.response.status === 401) {
  //             setUser(null);
  //           }
  //         }
  //       }
  //       setUser(userData);
  //     })();
  //   }, []);

  useEffect(() => {
    const value = JSON.stringify(user);
    localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, value);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
