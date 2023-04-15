import { Darksule, Diaground, Diamond, Or, Orground, Unground } from "../assets";

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

export const capsulesDatas = [
  {
    title: "Or",
    image: Or,
    description:"QUELOZ ONYX CAPSULE",
    time: "23H:59M:59S",
    color: "#8f4d00",
    background: Orground,
    price: 25,
    count:1,
    open: true,
  },
  {
    title: "Diamond",
    image: Diamond,
    description:"TRIA DIAMOND CAPSULE",
    time: "23H:59M:59S",
    color: "#004A8F",
    background: Diaground,
    price: 130,
    count:1,
    open:true
  },
  {
    title: "unOpen",
    image: Darksule,
    description:"QUELOZ UNKNOWN CAPSULE",
    time: "23H:59M:59S",
    color: "",
    background: Unground,
    price: 130,
    count:1,
    open:false
  },
];
