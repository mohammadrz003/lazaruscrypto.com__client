import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

import Input from "./Input";

const ContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "", // Service ID
        "", // Template ID
        form.current,
        "" // Public key
      )
      .then(
        (result) => {
          console.log(result.text);
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div>
      <h3 className="mb-4 text-lg font-medium">Contact Us</h3>
      <form ref={form} onSubmit={sendEmail}>
        <div className="flex flex-col space-y-4">
          <Input type="text" name="user_name" placeholder="Your Name" />
          <Input type="email" name="user_email" placeholder="Your Email" />
          <textarea
            name="message"
            className="textarea w-full"
            placeholder="Your Message"
            rows="4"
          />
          <input
            className="btn w-full dark:bg-palette-green dark:text-palette-dark"
            type="submit"
            value="Send"
          />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
