import { useState } from "react";
import {
  lock,
  polygon,
} from "../assets";
import { capsulesDatas,  } from "../constants";

const Capsules = () => {
  const [buyCount, setBuyCount] = useState(capsulesDatas);

  return (
    <div className="mt-32 ">
      {capsulesDatas.map((cap, index) => (
        <div className="flex justify-center" key={index}>
          <div className="relative h-[350px]">
            <img src={cap.background} alt="bg" className="w-[200px] absolute" />
            <div className="border-solid border-r-[1px] border-b-[1px] border-t-[1px] border-black w-[708px] h-[220px] mt-4 rounded-md  flex justify-center ">
              {!cap.open ? (
                <center>
                  <img
                    src={lock}
                    alt="bg"
                    className={`w-[100px] mt-16 ml-32`}
                  />
                </center>
              ) : (
                <div className="flex flex-col  w-full">
                  <div className=" flex justify-around ">
                    <p className="mt-5 font-bold ml-52 "> Price </p>
                    <div className="mt-5 flex flex ">
                      <img src={polygon} alt="bg" className="w-[50px]" />
                      <p className="font-bold text-lg mr-2">
                        {cap.price} MATIC{" "}
                      </p>{" "}
                    </div>
                  </div>
                  <div className=" flex justify-around">
                    <p className=""></p>
                    <p className="ml-50 ml-60">~= 28$</p>
                  </div>
                  <center>
                    <div className="flex flex-row justify-between rounded-[5px] bg-[#00FFAE] ml-48  mt-5 w-[20%] h-[30%]">
                      <div>
                        <button
                          className=" px-3 bg-black rounded-[5px] text-white text-[18px] "
                          onClick={() => {
                            if (buyCount[index].count > 0) {
                              buyCount[index].count -= 1;
                              setBuyCount([...buyCount]);
                            }
                          }}
                        >
                          {"-"}
                        </button>
                      </div>
                      <p className="font-poppins font-medium text-[18px]   ">
                        {" "}
                        {buyCount[index].count}{" "}
                      </p>
                      <button
                        className="px-3 bg-black rounded-[5px] text-white text-[18px] "
                        onClick={() => {
                          buyCount[index].count += 1;
                          setBuyCount([...buyCount]);
                        }}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className=" px-4 font-poppins bg-[#00FFAE] font-medium text-[18px] rounded-[5px] ml-48 mt-2 w-[20%]"
                      onClick={() => {
                        console.log("Buy Here : ");
                      }}
                    >
                      {" "}
                      BUY
                    </button>
                  </center>
                  <div className="bg-white mt-2 h-full border-solid rounded-br-lg border-t-[1px] border-black">
                    <p className="text-center ml-48 mt-1 font-bold text-xl">
                      {cap.description}
                    </p>
                    <p
                      className="text-center ml-48 text-[13px] "
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
                    >
                      Offer ends in {cap.time}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <img
              src={cap.image}
              alt="img"
              className="w-[480px] relative right-24 bottom-80 mt-5"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Capsules;
