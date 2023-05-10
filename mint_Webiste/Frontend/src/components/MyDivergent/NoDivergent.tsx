import { divg } from "../../assets";
import {
  ArrowUpRightIcon,
} from "@heroicons/react/24/solid";

const NoDivergent = () => {
    return (
		<div className="flex flex-col items-center">
			<div>
				<p className="mt-20 text-[50px] font-bold">You don't have a divergent yet</p>
				<a href="/" className="">
					<div className="flex flex-row items-center mr-2 mt-8 bg-[#00FFAE] w-48">
						<img src={divg} alt="HD" className="w-full h-full bg-black" style={{ width: "60px", height: "60px" }} />
						<p className="ml-2 font-bold">GET MY DIVERGENT</p>
						<div className="">
							<ArrowUpRightIcon className="w-[20px] text-black ml-2 mr-2 font-bold" />
						</div>
					</div>
				</a>
				<div className="pyramid-loader">
					<div className="wrapper">
						<span className="side side1"></span>
						<span className="side side2"></span>
						<span className="side side3"></span>
						<span className="side side4"></span>
						<span className="shadow"></span>
					</div>
				</div>
			</div>
		</div>
		)
}

export default NoDivergent;