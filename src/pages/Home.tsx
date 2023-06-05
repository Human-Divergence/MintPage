import React, { useEffect, useState } from "react";

import Checkout from "../components/web3/Checkout";
import ShopCapsules from "../components/ShopCapsules";
import { Capsules } from "../utils/types/myDivergent";

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
    <div className="flex flex-col ">
      <Checkout capsuleCart={capsuleCart} />
      <ShopCapsules capsuleCart={capsuleCart} setCapsuleCart={setCapsuleCart} />
    </div>
  );
}

export default Home;
