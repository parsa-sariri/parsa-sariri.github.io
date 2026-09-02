import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import CharacterSequence from '@/components/sections/CharacterSequence';
import Skills from '@/components/sections/Skills';
import Trajectory from '@/components/sections/Trajectory';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import WriteupsModal from '@/components/WriteupsModal';

export default function Home() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [writeupsOpen, setWriteupsOpen] = useState(false);

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
    <div className="relative min-h-screen bg-background text-foreground overflow-x-clip">
      {!reducedMotion && <CustomCursor />}
      <Navbar 
        reducedMotion={reducedMotion} 
        onToggleMotion={toggleMotion} 
        onOpenWriteups={() => setWriteupsOpen(true)}
      />
      <ScrollProgress />

      <main>
        <Hero reducedMotion={reducedMotion} />
        <About />
        <CharacterSequence />
        <Skills />
        <Trajectory />
        <Contact />
      </main>

      <Footer />

      <WriteupsModal 
        isOpen={writeupsOpen} 
        onClose={() => setWriteupsOpen(false)} 
      />
    </div>
  );
}
