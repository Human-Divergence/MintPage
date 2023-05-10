import { useState, useEffect } from "react";
import  axios  from "axios"
import {
  lock,
  polygon,
} from "../assets";
import { capsulesDatas,  } from "../constants";
import  PopUpCheckout  from "./PopUpCheckout";
import { ethers } from "ethers"

const NotWhitelist = () => {
    return(
			<>
				{capsulesDatas.map((cap, index) => (
          <div className="flex justify-center mb-8" key={index} >
          <div>
            <div className="border-solid border-r-
            [1px] border-b-[1px] border-t-[1px] border-black 
            w-full sm:w-[640px] md:w-[768px] lg:w-[1024px] h-[300px] mt-4 rounded-md  flex justify-center ">
            <div className="relative">
                <img src={cap.background} alt="bg" className=" absolute w-full h-full" />
                <img
                  src={cap.image}
                  alt="img"
                  className="relative w-[830px] max-w-full h-auto top-20 z-10
                  left-1/2 transform -translate-x-1/2 
                  sm:w-[280px] md:w-[330px] lg:w-[330px]"/>
              </div>
                <div className="flex flex-col  w-full">
                  <div className="description-wrapper">
                  <div className=" flex justify-around ">
                  </div>
                  <div className=" flex justify-around">
                    <p className=""></p>
                  </div>
                  <center>
                  <img
                  src={lock}
                  alt="bg"
									className={`w-[100px] mt-10 z-10`}
								/>
                  </center>
                  </div>
                  <div className="mt-2 h-full border-solid rounded-br-lg border-black description-container">
                <p className="text-center mt-1 font-bold text-xl">
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
                  >
                </p>
              </div>
                </div>
            </div>
          </div>
        </div>
      ))}
        </>
    );
}

export default NotWhitelist;