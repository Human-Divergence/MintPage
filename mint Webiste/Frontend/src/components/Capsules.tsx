import { useState, useEffect } from "react";
import  axios  from "axios"
import {
  lock,
  polygon,
} from "../assets";
import { capsulesDatas,  } from "../constants";
import  PopUpCheckout  from "./PopUpCheckout";

const Capsules = () => {
  const [buyCount, setBuyCount] = useState(capsulesDatas);
  const [pricePolygon, setPrice] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedCap, setSelectedCap] = useState(null)

  useEffect(() => {
    const res  = axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd`)
    .then((response) => {
      setPrice(response.data["matic-network"].usd);
    }
    )

  }, []);
  const handleOpenPopup = (cap:any) => { // receive cap as parameter
    setSelectedCap(cap); // set the selected cap in state
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleConfirm = () => {
    console.log("Confirmed!");
    setPopupOpen(false);
  };
  return (
    <div className="mt-20">
      {capsulesDatas.map((cap, index) => (
        <div className="flex justify-center" key={index} >
          <div className="relative">
            <img src={cap.background} alt="bg" className="w-[300px] absolute" />
            <div className="border-solid border-r-[1px] border-b-[1px] border-t-[1px] border-black w-full sm:w-[640px] md:w-[768px] lg:w-[1024px] h-[350px] mt-4 rounded-md  flex justify-center ">
              {popupOpen && 
              <PopUpCheckout  
              cap={selectedCap}
              pricePolygon={pricePolygon}
              onClose={handleClosePopup}
              onConfirm={handleConfirm} />}
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
                    <div className="mt-5 flex">
                      <img src={polygon} alt="bg" className="w-[50px]" />
                      <p className="font-bold text-lg mr-2">
                        {cap.price} MATIC{" "}
                      </p>{" "}
                    </div>
                  </div>
                  <div className=" flex justify-around">
                    <p className=""></p>
                    <p className="ml-50 ml-60"> = {(cap.price * pricePolygon).toFixed(2)} $</p>
                  </div>
                  <center>
                    <div className="flex flex-row items-center justify-between rounded-[5px] bg-[#00FFAE] ml-48  mt-5 w-[20%] h-[30%]">
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
                        className="px-3 bg-black rounded-[5px] text-white text-[18px]"
                        onClick={() => {
                          buyCount[index].count += 1;
                          setBuyCount([...buyCount]);
                        }}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className=" px-4 font-poppins bg-[#00FFAE] font-medium text-[18px] rounded-[5px] ml-48 mt-2 w-[20%] hover:text-white"
                      onClick={() => {
                        handleOpenPopup(cap);
                      }}
                    >
                      {" "}
                      BUY
                    </button>
                  </center>
                  <div className="bg-white mt-2 h-full border-solid rounded-br-lg border-t-[1px] border-black cap-description">
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
                    {/* <div className="mt-20">
                      <h1 className="text-center text-4xl font-bold font-poppins bg-[#FF005F] mb-4">Droprate</h1>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {cap.character.map((Character, i) => (
                        <div key={i} className={`flex items-center justify-center relative h-0 pb-[100%] card ${Character.lock ? "blur" : ""}`}>
                          <img src={Character.image} className="absolute top-0 left-0 w-full h-full object-cover"/>
                          <div className="absolute bottom-0 left-0 w-full p-2 flex justify-between items-end">
                            <p className="text-white font-bold">{Character.title}</p>
                            <p className="text-[#FF005F] font-bold text-2xl">{Character.percent}%</p>
                          </div>
                        </div>
                          )
                        )
                      }
                      </div>
                    </div> */}
                </div>
              )}
            </div>
            <img
              src={cap.image}
              alt="img"
              className="w-[480px] relative right-24 bottom-80 mt-5"/>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Capsules;
