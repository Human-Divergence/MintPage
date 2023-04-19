import { useState } from "react";
import {
  ArrowLongLeftIcon,
  ArrowUpRightIcon,
  BeakerIcon,
  BuildingStorefrontIcon,
  InformationCircleIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import { close, logo, met, menu, divg, Or, Orground, lock } from "../assets";
import { capsulesDatas, navLinks } from "../constants";
import { IoInformation } from "react-icons/io5";
import { BsDiscord, BsInstagram, BsLinkedin, BsMedium, BsTwitter } from "react-icons/bs";
import styles from "../styles/style";

const Footer = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  return (
    <div className=" flex flex-col justify-center items-center ">
      <img src={logo} alt="img" className="w-[200px] h-40" />
      <div className="flex mb-10">
        <a href="https://www.instagram.com/human_divergence">
            <BsInstagram size={40} className=" text-black mr-10" />
        </a>
        <a href="https://twitter.com/HumanDivergence">
            <BsTwitter size={40} className=" text-black mr-10" />
        </a>
        <a href="https://discord.gg/human-divergence">
            <BsDiscord size={40} className=" text-black mr-10" />
        </a>
        <a href="https://www.linkedin.com/company/human-divergence/">
            <BsLinkedin size={40} className=" text-black mr-10" />
        </a>
        <a href="">
            <BsMedium size={40} className=" text-black mr-10" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
