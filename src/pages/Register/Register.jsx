import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Input } from "../../components/common/Input";
import { registerUser } from "../../services/registerService";
import { useEffect } from "react";
import AuthContext from "../../context/auth-context";

const Register = () => {
  const navigate = useNavigate();
  const userData = useContext(AuthContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userData.user) {
      return navigate("/", {
        state: {
          toastMessage: {
            type: "error",
            message: "You are already logged in.",
          },
        },
      });
    }
  }, [userData.user, navigate]);

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    onSubmit: async (values) => {
      const { name, username, email, password } = values;
      const userData = {
        name,
        username,
        email,
        password,
      };
      try {
        const { data } = await registerUser(userData);
        setError(null);
        return navigate("/login", {
          state: {
            toastMessage: {
              type: "custom",
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
      name: Yup.string()
        .required("Name is required")
        .min(3, "Name's length must be at least 3 character"),
      username: Yup.string()
        .required("Username is required")
        .min(3, "Username's length must be at least 3 character"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password's length must be at least 6 character"),
      passwordConfirmation: Yup.string()
        .required("Password confirmation is required")
        .oneOf([Yup.ref("password"), null], "Password must match"),
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
        <Input label="Name" name="name" formik={formik} />
        <Input label="Username" name="username" formik={formik} />
        <Input label="Email" name="email" type="email" formik={formik} />
        <Input
          label="Password"
          name="password"
          type="password"
          formik={formik}
        />
        <Input
          label="Password Confirmation"
          name="passwordConfirmation"
          type="password"
          formik={formik}
        />
        <button
          className="btn w-full bg-blue-700 hover:bg-blue-800 mt-6 dark:text-white"
          type="submit"
          disabled={!formik.isValid}
        >
          Register
        </button>
        <Link to="/login" className="inline-block mt-3 text-sm">
          ِAlready have an account?
        </Link>
      </form>
    </div>
  );
};

export default Register;
