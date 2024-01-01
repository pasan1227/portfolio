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
    title: "Graduated bootcamp",
    location: "Miami, FL",
    description:
      "I graduated after 6 months of studying. I immediately found a job as a front-end developer.",
    icon: React.createElement(LuGraduationCap),
    date: "2019",
  },
  {
    title: "Front-End Developer",
    location: "Orlando, FL",
    description:
      "I worked as a front-end developer for 2 years in 1 job and 1 year in another job. I also upskilled to the full stack.",
    icon: React.createElement(CgWorkAlt),
    date: "2019 - 2021",
  },
  {
    title: "Full-Stack Developer",
    location: "Houston, TX",
    description:
      "I'm now a full-stack developer working as a freelancer. My stack includes React, Next.js, TypeScript, Tailwind, Prisma and MongoDB. I'm open to full-time opportunities.",
    icon: React.createElement(FaReact),
    date: "2021 - present",
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
  "Git",
  "Tailwind",
  "Prisma",
  "MongoDB",
  "Redux",
  "GraphQL",
  "Apollo",
  "Express",
  "PostgreSQL",
  "Python",
  "Django",
  "Framer Motion",
] as const;
