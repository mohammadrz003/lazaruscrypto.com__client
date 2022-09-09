import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Toast } from "../../components/toast/Toast";
import Footer from "./Footer";

const Admin = () => {
  let { state } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (state?.toastMessage) {
      Toast(state.toastMessage.type, state.toastMessage.message);
    }
  }, [state?.toastMessage]);

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
