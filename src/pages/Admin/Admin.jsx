import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Toast } from "../../components/toast/Toast";

const Admin = () => {
  let { state } = useLocation();

  // Show email notification message that it gets when user will be redirected by register page
  useEffect(() => {
    if (state?.toastMessage) {
      Toast(state.toastMessage.type, state.toastMessage.message);
    }
  }, [state?.toastMessage]);

  return (
    <div>
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
            <div className="pt-6 px-4 min-h-screen">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Admin;
