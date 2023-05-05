import { capsulesDatas, CharacterDatas } from "../constants";

const Droprate = (CharacterData: any) => {
  return (
    <div className="">
      <h1 className="text-center text-4xl font-bold font-poppins bg-[#FF005F] mb-4">Droprate</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {CharacterData.map((Character, i) => (
            <div key={i} className="flex items-center justify-center relative h-0 pb-[100%] card">
              <img src={Character.image} className="absolute top-0 left-0 w-full h-full object-cover"/>
              <div className="absolute bottom-0 left-0 w-full p-2 flex justify-between items-end">
                <p className="text-white font-bold">{Character.title}</p>
                <p className="text-[#FF005F] font-bold text-2xl">{Character.percent}%</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
export default Droprate;