import { Capsules, Footer } from "../components";
import styles from "../styles/style";
import { eth } from "../assets";
import Amount from "../components/web3/Amount"
function Home() {

  return (
    <div className="flex-grow">
      <div className={`bg-capsule ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <div className="flex flex-col items-center w-full">
            <div className="flex flex-col items-end justify-end w-full mb-4 pr-4">
              <Amount/>
            </div>
            <Capsules />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
