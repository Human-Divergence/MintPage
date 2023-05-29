import {
  Diaground,
  Orground,
  OrBG,
  SilverBG,
  CapsulebleuPreview,
  DiamondBG,
  character1,
  character2,
  character3,
  character4,
  character5,
  CapsuleSilver,
  CapsuleOr,
  CapsuleDiamond,
} from "../../assets";
import { Character, Capsule } from "../types/myDivergent";

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
    percentage: 100,
  },
];

export const capsulesDatas: Capsule[] = [
  {
    title: "onyx",
    image: CapsuleSilver,
    imageBG: SilverBG,
    description: "QUELOZ ONYX",
    time: "23H:59M:59S",
    color: "#C6C9DC",
    background: CapsuleSilver,
    price: 0.03,
    count: 0,
    open: true,
    character: [
      {
        nom: "Herborist",
        faction: "Mars",
        tier: 5,
        image: character1,
        order: 11,
        percentage: 100,
      },
      {
        nom: "Herborist",
        faction: "Mars",
        tier: 5,
        image: character2,
        order: 11,
        percentage: 100,
      },
      {
        nom: "Herborist",
        faction: "Mars",
        tier: 5,
        image: character3,
        order: 11,
        percentage: 100,
      },
    ],
  },
  {
    title: "gold",
    image: CapsuleOr,
    imageBG: OrBG,

    description: "MELT GOLD",
    time: "23H:59M:59S",
    color: "#8f4d00",
    background: Orground,
    price: 0.055,
    count: 0,
    open: true,
    character: [
      {
        nom: "Herborist",
        faction: "Mars",
        tier: 5,
        image: character1,
        order: 11,
        percentage: 100,
      },
      {
        nom: "Herborist",
        faction: "Mars",
        tier: 5,
        image: character2,
        order: 11,
        percentage: 100,
      },
    ],
  },
  {
    title: "diamond",
    image: CapsuleDiamond,
    imageBG: DiamondBG,
    description: "TRIA DIAMOND",
    imagePreview: CapsulebleuPreview,
    time: "23H:59M:59S",
    color: "#004A8F",
    background: Diaground,
    price: 0.1,
    count: 0,
    open: true,
    character: [
      {
        nom: "Herborist",
        faction: "Mars",
        tier: 5,
        image: character1,
        order: 11,
        percentage: 100,
      },
      {
        nom: "Herborist",
        faction: "Mars",
        tier: 5,
        image: character2,
        order: 11,
        percentage: 100,
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
