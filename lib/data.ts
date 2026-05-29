import React from 'react';
import { CgWorkAlt } from 'react-icons/cg';
import { LuGraduationCap } from 'react-icons/lu';
import bvote from '@/public/assets/bvote.png';
import airbnb from '@/public/assets/airbnb.png';
import crown from '@/public/assets/crown.png';
import amazon from '@/public/assets/amazon.png';
import proshop from '@/public/assets/proshop.png';
import netflix from '@/public/assets/netflix.png';

export const links = [
  { name: 'Home', hash: '#home' },
  { name: 'Work', hash: '#work' },
  { name: 'Capabilities', hash: '#capabilities' },
  { name: 'Experience', hash: '#experience' },
  { name: 'About', hash: '#about' },
  { name: 'Contact', hash: '#contact' },
] as const;

export const experiencesData = [
  {
    title: 'Software Engineer',
    location: 'BotCalm (PVT) Ltd.',
    description:
      'Building a Smart School Management System (Next.js + NestJS in a Turborepo monorepo) and a large-scale Casino Compliance System frontend (Next.js, REST APIs, monitoring dashboards). Mentor junior developers on React/Next.js best practices and code quality.',
    icon: React.createElement(CgWorkAlt),
    date: 'Jul 2025 — Present',
  },
  {
    title: 'Associate Software Engineer',
    location: 'BotCalm (PVT) Ltd.',
    description:
      'Built a hotel management system (booking, inventory, customer management) and frontend for a crypto gaming platform with Next.js — responsive, interactive UI integrated with blockchain APIs.',
    icon: React.createElement(CgWorkAlt),
    date: 'Jul 2024 — Jul 2025',
  },
  {
    title: 'Junior Software Engineer',
    location: 'Sphiria Digital Studio',
    description:
      'Designed and built an NFT platform website with responsive layouts and Framer Motion animations, and shipped new features for a customer portal to improve usability and functionality.',
    icon: React.createElement(CgWorkAlt),
    date: 'Apr 2024 — Jul 2024',
  },
  {
    title: 'Trainee Software Engineer',
    location: 'Sphiria Digital Studio',
    description:
      'Improved the responsiveness and performance of a subscription-based service platform, built modules for a custom company management system, and took part in code reviews and technical discussions.',
    icon: React.createElement(CgWorkAlt),
    date: 'Jan 2024 — Apr 2024',
  },
  {
    title: 'Intern Software Engineer',
    location: 'OREL IT, Maharagama',
    description:
      'Collaborated with cross-functional teams to gather requirements and support development, and grew across the stack — front-end (HTML, CSS, JavaScript, React, Figma) and back-end (Node.js, MySQL, MQTT).',
    icon: React.createElement(CgWorkAlt),
    date: 'Jan 2022 — Aug 2022',
  },
  {
    title: 'BSc (Hons) Computer Science',
    location: 'University of Staffordshire (UK)',
    description:
      'Graduated with honours. Strong fundamentals in data structures, algorithms, and software engineering — preceded by an HND and Diploma in Software Engineering (NIBM).',
    icon: React.createElement(LuGraduationCap),
    date: '2023 — 2024',
  },
] as const;

// Real commercial / production work (no public links — client & internal systems).
export const clientWork = [
  {
    project: 'Casino Compliance System',
    company: 'BotCalm',
    year: '2025',
    description:
      'Frontend for a large-scale regulatory compliance platform — modular UI components, REST API integration, and dashboards for compliance and monitoring workflows.',
    tags: ['Next.js', 'TypeScript', 'REST APIs'],
  },
  {
    project: 'Smart School Management System',
    company: 'BotCalm',
    year: '2025',
    description:
      'Scalable frontend and backend services in a Turborepo monorepo to manage student records, attendance tracking, and school administrative workflows.',
    tags: ['Next.js', 'NestJS', 'Turborepo', 'Prisma'],
  },
  {
    project: 'Crypto Gaming Platform',
    company: 'BotCalm',
    year: '2024',
    description:
      'Frontend for a crypto gaming product — responsive, interactive UI components integrated with blockchain APIs.',
    tags: ['Next.js', 'Blockchain APIs'],
  },
  {
    project: 'NFT Platform',
    company: 'Sphiria Digital Studio',
    year: '2024',
    description:
      'An NFT platform website with responsive layouts and rich interactive animations built with Framer Motion.',
    tags: ['Next.js', 'Framer Motion'],
  },
] as const;

export const projectsData = [
  {
    title: 'B-Vote',
    description:
      'A blockchain-based secure voting system — create polls, add candidates, share poll links, vote, and view real-time results, with integrity enforced on-chain.',
    tags: ['React', 'Near.sdk', 'Bootstrap'],
    imageUrl: bvote,
    link: 'https://resonant-trifle-f823f4.netlify.app/',
  },
  {
    title: 'Airbnb Clone',
    description:
      'A full-stack booking platform with map search, date-range selection, listings, and reservations — built end-to-end with auth and a typed data layer.',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'MongoDB', 'NextAuth', 'Tailwind'],
    imageUrl: airbnb,
    link: 'https://github.com/pasan1227/airbnb-clone',
  },
  {
    title: 'ProShop',
    description:
      'An e-commerce store with cart, checkout, and PayPal/card payments, product ratings and reviews, search and pagination, plus an admin area for products, orders, and customers.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux', 'PayPal'],
    imageUrl: proshop,
    link: 'https://proshop-y96f.onrender.com/',
  },
  {
    title: 'Crown Clothing',
    description:
      'A full-stack e-commerce platform with Google & email OAuth, a Firestore-backed catalog, and a component-driven UI with dynamic routing across shop, product, and account flows.',
    tags: ['React', 'Firebase', 'Styled Components', 'OAuth'],
    imageUrl: crown,
    link: 'https://dazzling-frangipane-0d2cc8.netlify.app/',
  },
  {
    title: 'Amazon Clone',
    description:
      'An Amazon-style storefront with Firebase authentication and Stripe payments, replicating the core shopping and checkout flow.',
    tags: ['React', 'Node.js', 'Firebase', 'Redux'],
    imageUrl: amazon,
    link: 'https://clone-98547.web.app/',
  },
  {
    title: 'Netflix Clone',
    description:
      'A Netflix-style streaming UI with Firebase authentication and Stripe subscription payments, and a TMDB-powered browsing experience.',
    tags: ['React', 'Firebase', 'Redux', 'Stripe'],
    imageUrl: netflix,
    link: 'https://netflix-2-0.web.app/',
  },
] as const;

export const skillGroups = [
  {
    label: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind', 'HTML', 'CSS'],
  },
  {
    label: 'Backend & APIs',
    skills: ['Node.js', 'NestJS', 'Express', 'Prisma', 'Turborepo'],
  },
  {
    label: 'Databases',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Firebase'],
  },
] as const;
