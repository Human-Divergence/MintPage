import React from "react";

const Waiting = () => {
  return (
    <div className="height-page  flex flex-col items-center justify-center gap-7">
      <div className="space-y-4 text-center text-[40px] font-bold">
        YOUR DIVERGENTS <br />
        ARE NOT READY YET...
      </div>
      <h1 className="text-6xl font-black">{"2d:23h:59m:59s"}</h1>
      <button
        className="flex h-[60px] w-[400px] items-center justify-center bg-[#00FFAE] text-3xl font-bold"
        onClick={() => {}}
      >
        CONNECT MY WALLET
      </button>
    </div>
  );
};

export default Waiting;
