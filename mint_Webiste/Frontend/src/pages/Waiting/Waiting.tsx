import React from "react";

const Waiting = () => {
  var countDownDate = new Date("Jun 5, 2023 15:37:25").getTime();
  return (
    <div className="heigth-footer  flex items-center justify-center font-extrabold">
      <div className="flex-col space-y-4 text-[40px]">
        <p>YOUR DIVERGENTS</p>
        <p>ARE NOT READY YET</p>
        <h1 className="text-6xl">{countDownDate}</h1>
        <div className="flex items-center justify-center bg-[#00FFAE]">
          <button
            className="flex items-center justify-center font-bold"
            onClick={() => {}}
          >
            CONNECT WALLET
          </button>
        </div>
      </div>
    </div>
  );
};

export default Waiting;
