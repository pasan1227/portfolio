'use client';

import React from 'react';
import { motion } from 'framer-motion';

import SectionHeading from './SectionHeading';
import { useSectionInView } from '@/lib/hooks';

export default function About() {
  const { ref } = useSectionInView('About');

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>

      <p className="mb-3">
        I am a passionate and driven{' '}
        <span className="font-medium">
          BSc (Hons) Computer Science graduate from Staffordshire University,{' '}
        </span>{' '}
        specializing in <span className="italic">full-stack development</span>{' '}
        with a strong emphasis on{' '}
        <span className="underline">front-end technologies.</span> With{' '}
        <span className="font-medium">one year of hands-on experience</span> in
        the field, I have honed my skills and expertise in crafting seamless
        user experiences using cutting-edge technologies. My core stack is{' '}
        <span className="font-medium">
          React, Next.js, Node.js, and MongoDB
        </span>
      </p>

      <p>
        <span className="italic">When I'm not coding</span>, I enjoy playing
        video games, watching movies, and playing with my dog. I also enjoy{' '}
        <span className="font-medium">learning new things</span>.
      </p>
    </motion.section>
  );
}

// I am a passionate and driven <span className="font-medium">BSc (Hons) Computer Science graduate from Staffordshire University, </span> specializing in  <span className="italic">full-stack development</span> with a strong emphasis on <span className="underline">front-end technologies.</span> With <span className="font-medium">one year of hands-on experience</span> in the field, I have honed my skills and expertise in crafting seamless user experiences using cutting-edge technologies.

// Driven by a relentless curiosity and a commitment to continuous learning, I am always seeking to expand my knowledge and stay abreast of the latest developments in the ever-evolving landscape of technology. I am excited about the opportunities that lie ahead and am eager to contribute my skills to innovative projects and teams. Let's connect and explore how we can collaborate to bring ideas to life.
