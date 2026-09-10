import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function CopyButton({ text, className = '' }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard API unavailable — fail silently, button simply won't confirm.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded font-mono text-[10px] tracking-wide border transition-colors ${
        copied
          ? 'border-emerald-500/40 text-emerald-300 bg-emerald-950/30'
          : 'border-[#1f2430] text-slate-500 hover:text-cyan-300 hover:border-cyan-500/40'
      } ${className}`}
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? t.writeups.copied : t.writeups.copyCode}
    </button>
  );
}
