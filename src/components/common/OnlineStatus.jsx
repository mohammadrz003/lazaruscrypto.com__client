import React from "react";
import { MdPerson } from "react-icons/md";

const OnlineStatus = () => {
  return (
    <div className="fixed bottom-[5%] right-[5%] lg:right-[2.5%] z-[1000]">
      <div class="indicator tab tab-lifted tab-active rounded-md">
        <MdPerson />
        120
        <span class="indicator-item badge h-3 pl-1 pr-1.5 bg-palette-green"></span>
      </div>
    </div>
  );
};

export default OnlineStatus;
