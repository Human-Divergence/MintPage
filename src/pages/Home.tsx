import React, { useEffect, useState } from "react";
import { Capsules } from "../components";
import Checkout from "../components/web3/Checkout";
import { ShoppingCart } from "../utils/types/home";

function Home() {
  const [capsuleCart, setCapsuleCart] = useState<ShoppingCart>({
    onyx: 0,
    gold: 0,
    diamond: 0,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col ">
      <Checkout capsuleCart={capsuleCart} />
      <Capsules capsuleCart={capsuleCart} setCapsuleCart={setCapsuleCart} />
    </div>
  );
}

export default Home;
