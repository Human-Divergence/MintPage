import React from "react";
import { Capsules } from "../components";
import styles from "../styles/style";
import Amount from "../components/web3/Amount";
function Home() {
  return (
    <div className="flex-grow">
      <div className={`bg-capsule ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <div className="flex w-full flex-col items-center">
            <div className="mb-4 flex w-full flex-col items-end justify-end pr-4">
              <Amount />
            </div>
            <Capsules />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
