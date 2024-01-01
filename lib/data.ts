import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import bvote from "@/public/assets/bvote.png";
import airbnb from "@/public/assets/airbnb.png";
import crown from "@/public/assets/crown.png";
import amazon from "@/public/assets/amazon.png";
import proshop from "@/public/assets/proshop.png";
import netflix from "@/public/assets/netflix.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Software Engineer Intern",
    location: "OREL IT, Maharagama",
    description:
      "As a Software Engineer Intern, I aided the Engineering team in software development and debugging. I also upskilled to a full-stack developer, mastering front-end (HTML, CSS, JavaScript, React, Figma) and back-end (Node.js, MySQL, MQTT) technologies, enhancing my overall contribution to the team.",
    icon: React.createElement(CgWorkAlt),
    date: "2022 JAN - 2022 AUG",
  },
] as const;

export const projectsData = [
  {
    title: "B-Vote",
    description:
      "A blockchain based secure voting system with the ability to Create Polls, add candidates, share poll links & vote for candidates & view poll results.",
    tags: ["React", "Near.sdk", "Bootstrap"],
    imageUrl: bvote,
  },
  {
    title: "Airbnb Clone",
    description:
      "A fully functional Airbnb clone with map search, date picker, and reservation functionality.",
    tags: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind",
      "Prisma",
      "MongoDB",
      "NextAuth",
    ],
    imageUrl: airbnb,
  },
  {
    title: "Crown Clothing",
    description:
      "A fully functional ecommerce store with cart, checkout, and payment processing.",
    tags: ["React", "Firebase", "Styled Components", "OAuth"],
    imageUrl: crown,
  },
  {
    title: "Proshop",
    description:
      "Ecommerce store with cart, checkout, and payment processing and admin dashboard to manage products, orders, and customers.",
    tags: ["React", "Node.js", "Express", "MongoDB", "Redux", "PayPal"],
    imageUrl: proshop,
  },
  {
    title: "Amazon Clone",
    description:
      "A fully functional Amazon clone with firebase authentication & stripe payments.",
    tags: ["React", "Node,js", "Firebase", "Redux"],
    imageUrl: amazon,
  },
  {
    title: "Netflix Clone",
    description:
      "A Netflix clone with firebase authentication & stripe payments.",
    tags: ["React", "firebase", "Redux", "Stripe"],
    imageUrl: netflix,
  },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Vue.js",
  "Git",
  "Tailwind",
  "Prisma",
  "MongoDB",
  "MySQL",
  "Firebase",
  "Redux",
  "Express",
  "Python",
  "Framer Motion",
] as const;
