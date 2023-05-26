import React, { useEffect, useState } from "react";
import { Capsules } from "../components";
import Amount from "../components/web3/Amount";
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
      <Amount capsuleCart={capsuleCart} />
      <Capsules capsuleCart={capsuleCart} setCapsuleCart={setCapsuleCart} />
    </div>
  );
}

export default Home;
