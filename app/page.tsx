import About from "@/components/About";
import Contact from "@/components/Contact";
import DualTrack from "@/components/DualTrack";
import Experience from "@/components/Experience";
import Intro from "@/components/Intro";
import Marquee from "@/components/Marquee";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

const marqueeItems = [
  "Full-stack Engineer",
  "React · Next.js · Node",
  "Production-grade web",
  "Open to roles",
  "Freelance-ready",
  "TypeScript",
];

export default function Home() {
  return (
    <>
      <Intro />
      <Marquee items={marqueeItems} />
      <DualTrack />
      <Projects />
      <Skills />
      <Experience />
      <About />
      <Contact />
    </>
  );
}
