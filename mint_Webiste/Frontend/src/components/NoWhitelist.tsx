import React from "react";
import { lock } from "../assets";
import { capsulesDatas } from "../constants/mockData";

const NotWhitelist = () => {
  return (
    <>
      {capsulesDatas.map((cap, index) => (
        <div className="mb-8 flex justify-center" key={index}>
          <div>
            <div
              className="border-r- [1px]
            mt-4 flex h-[300px] w-full 
            justify-center rounded-md border-b-[1px] border-t-[1px] border-solid border-black sm:w-[640px]  md:w-[768px] lg:w-[1024px] "
            >
              <div className="relative">
                <img
                  src={cap.background}
                  alt="bg"
                  className=" absolute h-full w-full"
                />
                <img
                  src={cap.image}
                  alt="img"
                  className="relative left-1/2 top-20 z-10 h-auto w-[830px]
                  max-w-full -translate-x-1/2 transform 
                  sm:w-[280px] md:w-[330px] lg:w-[330px]"
                />
              </div>
              <div className="flex w-full  flex-col">
                <div className="description-wrapper">
                  <div className=" flex justify-around "></div>
                  <div className=" flex justify-around">
                    <p className=""></p>
                  </div>
                  <center>
                    <img
                      src={lock}
                      alt="bg"
                      className={`z-10 mt-10 w-[100px]`}
                    />
                  </center>
                </div>
                <div className="description-container mt-2 h-full rounded-br-lg border-solid border-black">
                  <p className="mt-1 text-center text-xl font-bold">
                    NOT WHITELISTED
                  </p>
                  <p
                    className="text-center text-[13px] "
                    style={{
                      background: `
                    linear-gradient(
                      270deg,
                      rgba(146, 83, 9, 0) 0%,
                      ${cap.color} 49.95%,
                      rgba(146, 83, 9, 0) 100%
                      )
                    `,
                    }}
                  ></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default NotWhitelist;
