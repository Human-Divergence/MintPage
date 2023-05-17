import { eth } from "../../assets";

const Amount = () => {
	const totalAmount = 100;

	const handleCheckOut = () =>
	{
		alert("Checkout");
	}

  return (
		<>
			<div className="flex items-center mb-2">
				<span className="mr-2">Total Amount:</span>
				<img src={eth} alt="ETH Logo" className="ml-2 mr-4" />
				<span className="font-bold text-xl">
					{totalAmount}{"   "} ETH
				</span>
			</div>
			<button className="bg-[#00FFAE] text-black px-16 py-2 rounded-md font-bold mt-4"
				onClick={handleCheckOut}>
				Checkout
			</button>
		</>
    )
}
export default Amount;