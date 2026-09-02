import { Linkedin, Mail, Network, Github } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function Footer() {
  const { t, lang } = useLanguage();
  const name = lang === 'fa' ? 'پارسا سریری آجیلی' : 'PARSA SARIRI AJILI';

  return (
    <footer className="relative pt-20 pb-8 overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-48 wireframe-floor opacity-40" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="glass-strong rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Network className="w-8 h-8 text-[hsl(var(--primary))]" />
                <div className="absolute inset-0 blur-md text-[hsl(var(--primary))] opacity-50">
                  <Network className="w-8 h-8" />
                </div>
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-[hsl(var(--foreground))]">
                  {name}
                </h3>
                <p className="text-xs font-heading tracking-widest text-[hsl(var(--muted-foreground))]">
                  {t.footer.role}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com/parsa-sariri"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 glass rounded-lg flex items-center justify-center text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary))] transition-all hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/parsa-sariri-ajili"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 glass rounded-lg flex items-center justify-center text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary))] transition-all hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#connect"
                className="w-11 h-11 glass rounded-lg flex items-center justify-center text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary))] transition-all hover:scale-110"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <p className="text-xs font-heading tracking-widest text-[hsl(var(--muted-foreground))]">
            {t.footer.copyright}
          </p>
          <p className="text-xs font-heading tracking-widest text-[hsl(var(--muted-foreground))]">
            {t.footer.builtWith}
          </p>
        </div>
      </div>
    </footer>
  );
}