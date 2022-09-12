import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Gravatar from "react-gravatar";

import Layout from "../../layouts/Layout";
import { Toast } from "../../components/toast/Toast";
import AuthContext from "../../context/auth-context";
import UserDataForm from "./UserDataForm";
import { getUserData } from "../../services/userServices";

const Profile = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    verified: false,
  });

  useEffect(() => {
    (async () => {
      const { data } = await getUserData();
      const { name, username, email, verified } = data.user;
      setUserData({ name, username, email, verified });
    })();
  }, []);

  useEffect(() => {
    if (state?.toastMessage) {
      Toast(state.toastMessage.type, state.toastMessage.message);
    }
  });

  useEffect(() => {
    if (!user) {
      return navigate("/", {
        state: {
          toastMessage: {
            type: "error",
            message: "You are not logged in yet.",
          },
        },
      });
    }
  }, [user, navigate]);

  return (
    <Layout>
      <div className="flex justify-center items-center w-full px-5 lg:px-20 py-6 h-full relative">
        <div className="flex flex-col w-full max-w-lg dark:bg-[#262726] rounded-md p-5 lg:p-8">
          <div className="avatar mb-6">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <Gravatar email={userData.email} />
            </div>
          </div>

          <div>
            <UserDataForm userData={userData} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
