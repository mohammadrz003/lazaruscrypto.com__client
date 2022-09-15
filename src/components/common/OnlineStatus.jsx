import React, { useState } from "react";
import { useEffect } from "react";
import { MdPerson } from "react-icons/md";

const OnlineStatus = () => {
  const [onlineMembersNumber, setOnlineMembersNumber] = useState(0);
  const [randomNumber, setRandomNumber] = useState(Math.random());

  useEffect(() => {
    var d = Math.random();
    if (d < 0.34) {
      // 34% chance of being here
      setOnlineMembersNumber(Math.round(Math.random() * 500 + 500));
    } else if (d < 0.58) {
      // 24% chance of being here
      setOnlineMembersNumber(Math.round(Math.random() * 500 + 1000));
    } else if (d < 0.77) {
      // 19% chance of being here
      setOnlineMembersNumber(Math.round(Math.random() * 500 + 1500));
    } else if (d < 0.91) {
      // 14% chance of being here
      setOnlineMembersNumber(Math.round(Math.random() * 500 + 2000));
    } else {
      // 9% chance of being here
      setOnlineMembersNumber(Math.round(Math.random() * 500 + 2500));
    }
  }, [randomNumber]);

  return (
    <div
      onClick={() => setRandomNumber(Math.random())}
      className="fixed bottom-[5%] right-[5%] lg:right-[2.5%] z-[1000]"
    >
      <div class="indicator tab tab-lifted tab-active rounded-md">
        <MdPerson />
        {onlineMembersNumber}
        <span class="indicator-item badge h-3 pl-1 pr-1.5 bg-palette-green"></span>
      </div>
    </div>
  );
};

export default OnlineStatus;
