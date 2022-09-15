import React from "react";

import Layout from "../../layouts/Layout";
import ContactForm from "./ContactForm";
import ReachOutUs from "./ReachOutUs";

const Contact = () => {
  return (
    <Layout>
      <div className="flex flex-col lg:flex-row lg:justify-evenly lg:items-center lg:space-x-10 w-full h-full px-6 py-5">
        <div className="text-center lg:text-left py-7 space-y-5 lg:w-1/2">
          <h1 className="font-semibold text-5xl lg:text-6xl lg:leading-tight">
            Get in touch <br /> with us
          </h1>
          <div className="dark:text-gray-400 lg:text-lg">
            <p>We provide a complete service for the sale</p>
            <p>purchase or rental of real state</p>
          </div>
          <div className="hidden lg:block">
            <ReachOutUs />
          </div>
        </div>
        <div className="w-full max-w-xl lg:w-1/2 mx-auto lg:mx-0">
          <ContactForm />
        </div>
        <div className="w-full max-w-xl mx-auto mt-10 lg:hidden">
          <ReachOutUs />
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
