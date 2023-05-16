import { capsulesDatas, CharacterDatas } from "../constants";
import { Character } from "../utils/types/myDivergent";

const Droprate = ({ CharacterData }) => {
  return (
    <div className="mt-16 px-12 py-12">
      <div className="flex justify-between items-center border-b">
        <div className=" relative w-full h-[20px] bg-[#FF005F]">
        <h1 className="absolute text-[20px] font-extrabold font-poppins bg-[#FF005F]  text-white  
        top-0 left-0 translate-y-[-100%] w-[342px] h-[32px] text-center rounded-t-lg flex justify-center items-center">
          Drop rate
        </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 bg-white bg-opacity-25 px-4 py-4">
        {CharacterData.map((Character: Character, i: number) => (
          <div key={i} className="flex flex-col items-center">
            <div>
              <img
                src={Character.image}
                className="w-full h-auto object-cover "
              />
            </div>
            <div className="w-full p-2 flex justify-center items-center bg-gray bg-opacity-20 shadow-md rounded-b-xl">
              <p className="text-[#FF005F] font-bold text-2xl">
                {Character.percent}%
              </p>
            </div>
          </div>

        ))}
      </div>
    </div>
  );
};

export default Droprate;
