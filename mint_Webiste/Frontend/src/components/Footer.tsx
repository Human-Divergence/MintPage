import { useState } from "react";
import {
  ArrowLongLeftIcon,
  ArrowUpRightIcon,
  BeakerIcon,
  BuildingStorefrontIcon,
  InformationCircleIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import { close, logo } from "../assets";
import { IoInformation } from "react-icons/io5";
import { BsDiscord, BsInstagram, BsLinkedin, BsMedium, BsTwitter } from "react-icons/bs";
import styles from "../styles/style";

const Footer = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center relative bottom-0 w-full py-4 ">
      <img src={logo} alt="img" className="w-[200px] h-40" />
      <div className="flex mb-10">
        <a href="https://www.instagram.com/human_divergence" target="_blank" rel="noopener noreferrer">
            <BsInstagram size={40} className=" text-black mr-10" />
        </a>
        <a href="https://twitter.com/HumanDivergence" target="_blank" rel="noopener noreferrer">
            <BsTwitter size={40} className=" text-black mr-10" />
        </a>
        <a href="https://discord.gg/human-divergence" target="_blank" rel="noopener noreferrer">
            <BsDiscord size={40} className=" text-black mr-10" />
        </a>
        <a href="https://www.linkedin.com/company/human-divergence/" target="_blank" rel="noopener noreferrer">
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
