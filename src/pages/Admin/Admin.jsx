import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Toast } from "../../components/toast/Toast";
import Footer from "./Footer";
import authenticatedHttp from "../../services/authenticatedHttpService";

const Admin = () => {
  let { state } = useLocation();
  const navigate = useNavigate();
  const [access, setAccess] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await authenticatedHttp.get(`/admin/check`);
        if (data.admin !== true) {
          return navigate("/");
        } else {
          setAccess(true);
        }
      } catch (error) {
        return navigate("/");
      }
    })();
  }, [navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (state?.toastMessage) {
      Toast(state.toastMessage.type, state.toastMessage.message);
    }
  }, [state?.toastMessage]);

  if (access === false) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <h1 className="text-5xl text-blue-600">Loading...</h1>
      </div>
    );
  }

  return (
    <div data-theme="light">
      <Navbar />
      <div className="flex overflow-hidden bg-white pt-16">
        <Sidebar />
        <div
          className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
          id="sidebarBackdrop"
        ></div>
        <div
          id="main-content"
          className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
        >
          <main>
            <div className="min-h-screen">
              <Outlet />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Admin;
