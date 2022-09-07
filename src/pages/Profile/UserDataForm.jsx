import React, { useState, useEffect, useContext } from "react";

import Input from "./Input";
import AuthContext from "../../context/auth-context";

const UserDataForm = (props) => {
  const { user: userData, setUser: setUserData } = useContext(AuthContext);

  const [enteredData, setEnteredData] = useState({
    name: "",
    username: "",
    email: "",
    verified: false,
  });

  useEffect(() => {
    setEnteredData(props.userData);
  }, [props.userData]);

  const inputChangeHandler = (e) => {
    const value = e.target.value;
    setEnteredData((prevState) => {
      return { ...prevState, [e.target.name]: value };
    });
  };

  return (
    <form>
      <div className="flex flex-col space-y-3">
        <Input
          label="Name"
          name="name"
          value={enteredData.name}
          onChange={inputChangeHandler}
          readOnly
        />
        <Input
          label="Username"
          name="username"
          value={enteredData.username}
          onChange={inputChangeHandler}
          readOnly
        />
        <div>
          <div className="flex items-end space-x-2">
            <Input
              label="Email"
              name="email"
              value={enteredData.email}
              onChange={inputChangeHandler}
              readOnly
            />
            {enteredData.verified ? (
              <button
                className="btn dark:bg-palette-green dark:text-gray-800"
                type="button"
              >
                VERIFIED
              </button>
            ) : (
              <button
                className="btn dark:bg-blue-500 dark:text-gray-800"
                type="button"
              >
                SEND MAIL
              </button>
            )}
          </div>
          {!enteredData.verified && (
            <p className="mt-2 text-sm dark:text-red-400">
              please verify your email address
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default UserDataForm;
