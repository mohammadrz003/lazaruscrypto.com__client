import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Input } from "../../components/common/Input";
import mailImage from "../../assets/icons/mail.png";
import { useState } from "react";
import { loginUser } from "../../services/loginService";
import AuthContext from "../../context/auth-context";

const Login = () => {
  let { state } = useLocation();
  const navigate = useNavigate();
  const { user: userData } = useContext(AuthContext);
  const { setUser: setAuth } = useContext(AuthContext);

  const [error, setError] = useState(null);

  useEffect(() => {
    if (userData) {
      return navigate("/", {
        state: {
          toastMessage: {
            type: "error",
            message: "You are already logged in.",
          },
        },
      });
    }
  }, [userData, navigate]);

  // Show email notification message that it gets when user will be redirected by register page
  useEffect(() => {
    if (state?.toastMessage) {
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={mailImage}
                    alt=""
                  />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Email Sent
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {state.toastMessage.message}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        ),
        {
          duration: 20000,
          position: "top-right",
        }
      );
    }
  }, [state?.toastMessage]);

  // Control our form

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const { data } = await loginUser(values);
        const { user, token } = data;
        const account = { user, token };
        setAuth(account);
        setError(null);
        return navigate("/profile", {
          state: {
            toastMessage: {
              type: "success",
              message: data.message,
            },
          },
        });
      } catch (error) {
        if (error.response && error.response.data.message) {
          setError({ message: error.response.data.message, id: Math.random() });
        }
      }
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username is required")
        .min(3, "Username's length must be at least 3 character"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password's length must be at least 6 character"),
    }),
    validateOnMount: true,
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-[400px] p-5 border dark:border-slate-500 rounded"
      >
        <Input label="Username" name="username" formik={formik} />
        <Input
          label="Password"
          name="password"
          type="password"
          formik={formik}
        />
        <button
          className="btn w-full bg-blue-700 hover:bg-blue-800 mt-6 dark:text-white"
          type="submit"
          disabled={!formik.isValid}
        >
          Login
        </button>
        <Link to="/register" className="inline-block mt-3 text-sm">
          Have not you registered yet?
        </Link>
      </form>
    </div>
  );
};

export default Login;
