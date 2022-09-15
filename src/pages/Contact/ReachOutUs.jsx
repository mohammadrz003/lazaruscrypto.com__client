import React from "react";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { MdEmail } from "react-icons/md";

const ReachOutUs = () => {
  return (
    <div>
      <h4 className="text-lg font-medium">Social Media</h4>
      <div className="flex flex-wrap justify-between lg:justify-start space-x-2 lg:space-x-5">
        <a
          href="https://twitter.com/The_MarketWatch"
          target={"_blank"}
          rel="noreferrer"
          className="flex flex-col items-center mt-5 dark:text-palette-green bg-[#262726] rounded-md p-5"
        >
          <AiOutlineTwitter className="w-6 h-6" />
          <span>Twitter</span>
        </a>
        <a
          href="https://t.me/MarketWatch_News"
          target={"_blank"}
          rel="noreferrer"
          className="flex flex-col items-center mt-5 dark:text-palette-green bg-[#262726] rounded-md p-5"
        >
          <FaTelegramPlane className="w-6 h-6" />
          <span>Telegram</span>
        </a>
        <a
          href="https://t.me/MarketWatch_Community"
          target={"_blank"}
          rel="noreferrer"
          className="flex flex-col items-center mt-5 dark:text-palette-green bg-[#262726] rounded-md p-5"
        >
          <HiUserGroup className="w-6 h-6" />
          <span>Group</span>
        </a>
      </div>
      <div className="mt-7 pb-7">
        <h4 className="text-lg font-medium">Reach out to us at</h4>
        <div className="flex items-center space-x-3 mt-5">
          <MdEmail className="w-6 h-6 text-palette-green" />
          <a
            href="mailto:support@marketwatch.design"
            className="dark:text-gray-400"
          >
            support@marketwatch.design
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReachOutUs;
