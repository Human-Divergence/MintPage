import React from "react";
import { HDlogo } from "../assets";
import { BsDiscord, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="relative bottom-0 flex w-full flex-col bg-[#313131] px-16 py-12">
      <div className="mb-4 flex justify-start border-b">
        <img src={HDlogo} alt="img" className="h-[120px] w-[200px]" />
      </div>
      <div className="flex justify-between">
        <div className="flex">
          <a
            href="https://www.instagram.com/human_divergence"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsInstagram size={30} className=" mr-10 text-white" />
          </a>
          <a
            href="https://twitter.com/HumanDivergence"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsTwitter size={30} className=" mr-10 text-white" />
          </a>
          <a
            href="https://discord.gg/human-divergence"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsDiscord size={30} className=" mr-10 text-white" />
          </a>
          <a
            href="https://www.linkedin.com/company/human-divergence/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsLinkedin size={30} className=" mr-10 text-white" />
          </a>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="mb-4 mr-4 flex flex-col md:mb-0">
            <a
              href="https://www.humandivergence.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 text-[20px] text-white underline"
            >
              Website
            </a>
            <a
              href="https://www.humandivergence-comics.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 text-[20px] text-white underline"
            >
              Manga
            </a>
          </div>
          <div className="flex flex-col">
            <a
              href="https://humandivergence-marketplace.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 text-[20px] text-white underline"
            >
              Marketplace
            </a>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 text-[20px] text-white underline"
            >
              Whitepaper
            </a>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 text-[20px] text-white underline"
            >
              Newsletter
            </a>
          </div>
        </div>
      </div>
      <h1 className="mt-4 text-white">
        HUMAN DIVERGENCE @ 2022 ALL RIGHTS RESERVED
      </h1>
    </div>
  );
};

export default Footer;
