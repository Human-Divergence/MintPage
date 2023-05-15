import { HDlogo } from "../assets";
import { BsDiscord, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="flex flex-col relative bottom-0 w-full px-16 py-12 bg-[#313131]">
      <div className="flex justify-start mb-4 border-b">
        <img src={HDlogo} alt="img" className="w-[200px] h-[120px]" />
      </div>
      <div className="flex justify-between">
        <div className="flex">
          <a href="https://www.instagram.com/human_divergence" target="_blank" rel="noopener noreferrer">
            <BsInstagram size={30} className=" text-white mr-10" />
          </a>
          <a href="https://twitter.com/HumanDivergence" target="_blank" rel="noopener noreferrer">
            <BsTwitter size={30} className=" text-white mr-10" />
          </a>
          <a href="https://discord.gg/human-divergence" target="_blank" rel="noopener noreferrer">
            <BsDiscord size={30} className=" text-white mr-10" />
          </a>
          <a href="https://www.linkedin.com/company/human-divergence/" target="_blank" rel="noopener noreferrer">
            <BsLinkedin size={30} className=" text-white mr-10" />
          </a>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col mr-4 mb-4 md:mb-0">
            <a href="https://www.humandivergence.com/" target="_blank" rel="noopener noreferrer" className="mb-2 text-white text-[20px] underline">Website</a>
            <a href="https://www.humandivergence-comics.com/" target="_blank" rel="noopener noreferrer" className="mb-2 text-white text-[20px] underline">Manga</a>
          </div>
          <div className="flex flex-col">
            <a href="https://humandivergence-marketplace.com/" target="_blank" rel="noopener noreferrer" className="mb-2 text-white text-[20px] underline">Marketplace</a>
            <a href="" target="_blank" rel="noopener noreferrer" className="mb-2 text-white text-[20px] underline">Whitepaper</a>
            <a href="" target="_blank" rel="noopener noreferrer" className="mb-2 text-white text-[20px] underline">Newsletter</a>
          </div>
        </div>
      </div>
      <h1 className="text-white mt-4">
        HUMAN DIVERGENCE @ 2022 ALL RIGHTS RESERVED
      </h1>
    </div>
  );
};

export default Footer;
