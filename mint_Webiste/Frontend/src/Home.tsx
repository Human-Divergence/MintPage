import { Capsules, Footer } from "./components";
import styles from "./styles/style";
import { eth } from "./assets";

function Home() {
  const totalAmount = 100;

  return (
    <div className="flex-grow">
      <div className={`bg-capsule ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <div className="flex flex-col items-center w-full">
            <div className="flex flex-col items-end justify-end w-full mb-4 pr-4">
              <div className="flex items-center mb-2">
                <span className="mr-2">Total Amount:</span>
                <img src={eth} alt="ETH Logo" className="ml-2 mr-4" />
                <span className="font-bold text-xl">{totalAmount}{"   "} ETH</span>
              </div>
              <button className="bg-[#00FFAE] text-black px-16 py-2 rounded-md font-bold mt-4">
                Checkout
              </button>
            </div>
            <Capsules />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
