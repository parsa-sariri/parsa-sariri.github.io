import { useState } from 'react';
import { Terminal, Send, Check, Loader2, Mail, User, MessageSquare, Github, Linkedin } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/lib/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';

export default function Contact() {
  const { t, lang } = useLanguage();
  const [name,       setName]       = useState('');
  const [email,      setEmail]      = useState('');
  const [message,    setMessage]    = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success,    setSuccess]    = useState(false);
  const [errors,     setErrors]     = useState({});
  const { toast } = useToast();

  /* ── Inline error messages (bilingual) ─────────────────────────── */
  const errMsg = {
    required: lang === 'fa' ? 'این فیلد الزامی است' : 'Required',
    email:    lang === 'fa' ? 'ایمیل معتبر نیست'    : 'Invalid email format',
  };

  function validate() {
    const e = {};
    if (!name.trim())    e.name    = errMsg.required;
    if (!email.trim())   e.email   = errMsg.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = errMsg.email;
    if (!message.trim()) e.message = errMsg.required;
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSubmitting(true);
    try {
      await base44.entities.ContactMessage.create({ name, email, message });
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      setErrors({});
      setTimeout(() => setSuccess(false), 4000);
      toast({ title: t.contact.toastTitle, description: t.contact.toastDesc });
    } catch (err) {
      toast({ title: t.contact.errorTitle, description: t.contact.errorDesc, variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  }

  const inputClasses =
    'w-full bg-transparent border-0 border-b border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] outline-none px-1 py-2 text-sm font-mono text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground)/0.4)] transition-colors';

  return (
    <section id="connect" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[hsl(var(--primary)/0.06)] rounded-full blur-3xl" />

      <div className="relative max-w-3xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 glass rounded-full">
            <Terminal className="w-4 h-4 text-[hsl(var(--primary))]" />
            <span className="text-xs font-heading font-semibold tracking-widest text-[hsl(var(--muted-foreground))]">
              {t.contact.label}
            </span>
          </div>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl text-[hsl(var(--foreground))] mb-4">
            {t.contact.title1} <span className="text-gradient-cobalt">{t.contact.title2}</span>
          </h2>
          <p className="text-[hsl(var(--muted-foreground))]">
            {t.contact.description}
          </p>
        </ScrollReveal>

        <div className="glass-strong rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-3 border-b border-[hsl(var(--border))] bg-[hsl(var(--secondary)/0.5)]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[hsl(var(--destructive)/0.6)]" />
              <span className="w-3 h-3 rounded-full bg-[hsl(var(--accent)/0.6)]" />
              <span className="w-3 h-3 rounded-full bg-[hsl(var(--primary)/0.6)]" />
            </div>
            <span className="font-heading text-xs tracking-widest text-[hsl(var(--muted-foreground))]">
              {t.contact.shellPrompt}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6" noValidate>
            {/* Name */}
            <div>
              <label className="flex items-center gap-2 mb-2 text-xs font-heading tracking-widest text-[hsl(var(--primary))]">
                <User className="w-3 h-3" />
                {t.contact.inputName}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((p) => ({ ...p, name: '' })); }}
                placeholder={t.contact.namePlaceholder}
                className={`${inputClasses} ${errors.name ? 'border-b-[hsl(var(--destructive))]' : ''}`}
              />
              {errors.name && <p className="text-xs text-[hsl(var(--destructive))] mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-2 mb-2 text-xs font-heading tracking-widest text-[hsl(var(--primary))]">
                <Mail className="w-3 h-3" />
                {t.contact.inputEmail}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: '' })); }}
                placeholder={t.contact.emailPlaceholder}
                className={`${inputClasses} ${errors.email ? 'border-b-[hsl(var(--destructive))]' : ''}`}
              />
              {errors.email && <p className="text-xs text-[hsl(var(--destructive))] mt-1">{errors.email}</p>}
            </div>

            {/* Message */}
            <div>
              <label className="flex items-center gap-2 mb-2 text-xs font-heading tracking-widest text-[hsl(var(--primary))]">
                <MessageSquare className="w-3 h-3" />
                {t.contact.inputMessage}
              </label>
              <textarea
                value={message}
                onChange={(e) => { setMessage(e.target.value); if (errors.message) setErrors((p) => ({ ...p, message: '' })); }}
                placeholder={t.contact.messagePlaceholder}
                rows={4}
                className={`${inputClasses} resize-none ${errors.message ? 'border-b-[hsl(var(--destructive))]' : ''}`}
              />
              {errors.message && <p className="text-xs text-[hsl(var(--destructive))] mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={submitting || success}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[hsl(var(--primary))] text-white font-heading text-sm font-semibold tracking-widest rounded-lg hover:bg-[hsl(var(--primary)/0.8)] transition-all disabled:opacity-60 hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]"
            >
              {submitting ? (
                <><Loader2 className="w-4 h-4 animate-spin" />{t.contact.transmitting}</>
              ) : success ? (
                <><Check className="w-4 h-4" />{t.contact.complete}</>
              ) : (
                <><Send className="w-4 h-4 rtl:scale-x-[-1]" />{t.contact.execute}</>
              )}
            </button>
          </form>
        </div>

        {/* Social links — profiles not ready yet, href="#" for now */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="w-12 h-12 glass rounded-xl flex items-center justify-center text-[hsl(var(--muted-foreground)/0.4)] cursor-not-allowed"
            aria-label="GitHub (coming soon)"
            title={lang === 'fa' ? 'به زودی' : 'Coming soon'}
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="w-12 h-12 glass rounded-xl flex items-center justify-center text-[hsl(var(--muted-foreground)/0.4)] cursor-not-allowed"
            aria-label="LinkedIn (coming soon)"
            title={lang === 'fa' ? 'به زودی' : 'Coming soon'}
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}