import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Trajectory from '@/components/sections/Trajectory';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

export default function Home() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) setReducedMotion(true);
  }, []);

  function toggleMotion() {
    setReducedMotion((prev) => {
      const next = !prev;
      document.body.classList.toggle('reduced-motion', next);
      return next;
    });
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {!reducedMotion && <CustomCursor />}
      <Navbar reducedMotion={reducedMotion} onToggleMotion={toggleMotion} />
      <ScrollProgress />

      <main>
        <Hero reducedMotion={reducedMotion} />
        <About />
        <Skills />
        <Trajectory />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}