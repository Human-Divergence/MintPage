import React, { useState } from "react";
import { Capsules } from "../components";
import Amount from "../components/web3/Amount";
import { ShoppingCart } from "../utils/types/home";

function Home() {
  const [capsuleCart, setCapsuleCart] = useState<ShoppingCart>({
    onyx: 0,
    gold: 0,
    diamond: 0,
  });

  return (
    <div className={`bg-capsule`}>
      <div className="flex flex-col ">
        <Amount capsuleCart={capsuleCart} />
        <Capsules capsuleCart={capsuleCart} setCapsuleCart={setCapsuleCart} />
      </div>
    </div>
  );
}

export default Home;
