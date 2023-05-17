import {
  Darksule,
  Diaground,
  Diamond,
  Or,
  Orground,
  Unground,
  Silver,
  OrBG,
  SilverBG,
  DiamondBG,
  character1,
  character2,
  character3,
  character4,
  character5,
} from "../assets";
import { Character } from "../utils/types/myDivergent";
import { Capsule } from "../utils/types/myDivergent";

export const navLinks = [
  {
    id: "products",
    title: "Subs Products",
  },
  {
    id: "usecases",
    title: "Use Cases",
  },
  {
    id: "docs",
    title: "Docs",
  },
  {
    id: "regulator",
    title: "Regulators",
  },
  {
    id: "faq",
    title: "FAQ",
  },
];

export const footerLinks = [
  {
    title: "Useful Links",
    links: [
      {
        name: "Content",
        link: "https://www.hoobank.com/content/",
      },
      {
        name: "How it Works",
        link: "https://www.hoobank.com/how-it-works/",
      },
      {
        name: "Create",
        link: "https://www.hoobank.com/create/",
      },
      {
        name: "Explore",
        link: "https://www.hoobank.com/explore/",
      },
      {
        name: "Terms & Services",
        link: "https://www.hoobank.com/terms-and-services/",
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        name: "Help Center",
        link: "https://www.hoobank.com/help-center/",
      },
      {
        name: "Partners",
        link: "https://www.hoobank.com/partners/",
      },
      {
        name: "Suggestions",
        link: "https://www.hoobank.com/suggestions/",
      },
      {
        name: "Blog",
        link: "https://www.hoobank.com/blog/",
      },
      {
        name: "Newsletters",
        link: "https://www.hoobank.com/newsletters/",
      },
    ],
  },
  {
    title: "Partner",
    links: [
      {
        name: "Our Partner",
        link: "https://www.hoobank.com/our-partner/",
      },
      {
        name: "Become a Partner",
        link: "https://www.hoobank.com/become-a-partner/",
      },
    ],
  },
];

export const characters_silver: Character[] = [
  {
    nom: "Herborist",
    faction: "Mars",
    tier: 5,
    image: character1,
    order: 11,
  },
];

export const capsulesDatas: Capsule[] = [
  {
    title: "unOpen",
    image: Silver,
    imageBG: SilverBG,
    description: "QUELOZ ONYX CAPSULE",
    time: "23H:59M:59S",
    color: "#C6C9DC",
    background: Unground,
    price: 0.03,
    count: 1,
    open: true,
    character: [
      {
        nom: "Herborist",
        faction: "Mars",
        tier: 5,
        image: character1,
        order: 11,
      },
      {
        nom: "Herborist",
        faction: "Mars",
        tier: 5,
        image: character2,
        order: 11,
      },
      {
        nom: "Herborist",
        faction: "Mars",
        tier: 5,
        image: character3,
        order: 11,
      },
    ],
  },
  {
    title: "Or",
    image: Or,
    imageBG: OrBG,
    description: "MELT GOLD CAPSULE",
    time: "23H:59M:59S",
    color: "#8f4d00",
    background: Orground,
    price: 0.055,
    count: 1,
    open: true,
    character: [
      {
        nom: "Herborist",
        faction: "Mars",
        tier: 5,
        image: character1,
        order: 11,
      },
      {
        nom: "Herborist",
        faction: "Mars",
        tier: 5,
        image: character2,
        order: 11,
      },
    ],
  },
  {
    title: "Diamond",
    image: Diamond,
    imageBG: DiamondBG,
    description: "TRIA DIAMOND CAPSULE",
    time: "23H:59M:59S",
    color: "#004A8F",
    background: Diaground,
    price: 0.1,
    count: 1,
    open: true,
    character: [
      {
        nom: "Herborist",
        faction: "Mars",
        tier: 5,
        image: character1,
        order: 11,
      },
      {
        nom: "Herborist",
        faction: "Mars",
        tier: 5,
        image: character2,
        order: 11,
      },
    ],
  },
];

export const CharacterDatas = [
  {
    title: "Marsio",
    image: character1,
    description: "QUELOZ UNKNOWN CAPSULE",
    status: true,
    percent: 10,
  },
  {
    title: "Character 2",
    image: character2,
    description: "QUELOZ UNKNOWN CAPSULE",
    status: true,
    percent: 10,
  },
  {
    title: "Character 3",
    image: character3,
    description: "QUELOZ UNKNOWN CAPSULE",
    status: true,
    percent: 10,
  },
  {
    title: "Character 4",
    image: character4,
    description: "QUELOZ UNKNOWN CAPSULE",
    status: true,
    percent: 10,
  },
  {
    title: "Character 5",
    image: character5,
    description: "QUELOZ UNKNOWN CAPSULE",
    status: true,
    percent: 10,
  },
];
