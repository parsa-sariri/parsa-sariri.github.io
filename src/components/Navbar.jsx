import { useState, useEffect } from 'react';
import { Network, Menu, X, Languages } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function Navbar({ reducedMotion, onToggleMotion }) {
  const { t, lang, toggleLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: t.nav.nexus, href: '#nexus' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.stack, href: '#stack' },
    { label: t.nav.trajectory, href: '#trajectory' },
    { label: t.nav.connect, href: '#connect' },
  ];

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-strong py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#nexus" className="flex items-center gap-2 group">
          <div className="relative">
            <Network className="w-6 h-6 text-[hsl(var(--primary))] transition-transform group-hover:rotate-12" />
            <div className="absolute inset-0 blur-md text-[hsl(var(--primary))] opacity-50">
              <Network className="w-6 h-6" />
            </div>
          </div>
          <span className="font-heading font-bold text-sm tracking-widest text-[hsl(var(--foreground))]">
            PARSA<span className="text-[hsl(var(--primary))]">.</span>SARIRI
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-xs font-heading font-semibold tracking-widest text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-[hsl(var(--primary))] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <button
            onClick={toggleLang}
            className="ml-2 flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-heading font-semibold tracking-widest border border-[hsl(var(--border))] rounded-md text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary))] transition-colors"
            aria-label="Toggle language"
          >
            <Languages className="w-3.5 h-3.5" />
            {lang === 'en' ? 'EN' : 'فا'}
          </button>
          <button
            onClick={onToggleMotion}
            className="px-3 py-1.5 text-[10px] font-heading font-semibold tracking-widest border border-[hsl(var(--border))] rounded-md text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--accent))] hover:border-[hsl(var(--accent))] transition-colors"
            title="Toggle reduced motion"
          >
            {reducedMotion ? t.nav.motionOff : t.nav.motionOn}
          </button>
        </div>

        <button
          className="md:hidden text-[hsl(var(--foreground))]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden glass-strong mt-3 mx-4 rounded-xl p-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 text-sm font-heading font-semibold tracking-widest text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-2 px-4 py-2">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 text-xs font-heading font-semibold tracking-widest text-[hsl(var(--primary))]"
            >
              <Languages className="w-4 h-4" />
              {lang === 'en' ? 'English' : 'فارسی'}
            </button>
            <span className="text-[hsl(var(--border))]">|</span>
            <button
              onClick={() => {
                onToggleMotion();
                setMenuOpen(false);
              }}
              className="text-xs font-heading font-semibold tracking-widest text-[hsl(var(--accent))]"
            >
              {reducedMotion ? t.nav.motionOff : t.nav.motionOn}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}