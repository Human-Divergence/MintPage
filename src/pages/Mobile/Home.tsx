import React, { useEffect, useState } from "react";
import Checkout from "../../components/web3/Checkout";
import { Capsules } from "../../utils/types/myDivergent";
import ShopCapsules from "../../components/ShopCapsules";

function Home() {
  const [capsuleCart, setCapsuleCart] = useState<Capsules>({
    onyx: 0,
    gold: 0,
    diamond: 0,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col">
      <ShopCapsules capsuleCart={capsuleCart} setCapsuleCart={setCapsuleCart} />
      <Checkout capsuleCart={capsuleCart} />
    </div>
  );
}

export default Home;
