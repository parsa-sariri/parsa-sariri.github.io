import { useEffect, useRef } from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { CREDLY_BADGE_ID, CREDLY_VERIFY_URL } from '@/lib/writeupsData';

const CREDLY_SCRIPT_SRC = '//cdn.credly.com/assets/utilities/embed.js';
const CREDLY_SCRIPT_ID = 'credly-embed-utility';

/**
 * Credly verification badge embed widget.
 */
export default function CredlyBadge({
  compact = false,
  className = '',
  badgeId = CREDLY_BADGE_ID,
  verifyUrl = CREDLY_VERIFY_URL,
  label,
}) {
  const { t } = useLanguage();
  const c = t.writeups.credly;
  const badgeRef = useRef(null);
  const width = compact ? 110 : 150;
  const height = compact ? 198 : 270;

  useEffect(() => {
    const existing = document.getElementById(CREDLY_SCRIPT_ID);
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.id = CREDLY_SCRIPT_ID;
    script.type = 'text/javascript';
    script.async = true;
    script.src = CREDLY_SCRIPT_SRC;
    document.body.appendChild(script);
    // Re-run whenever the target badge changes so Credly re-scans and
    // hydrates the iframe for this specific instance.
  }, [badgeId]);

  return (
    <div className={`inline-flex flex-col items-center gap-2 ${className}`}>
      {label && (
        <span className="font-mono text-[10px] tracking-wide text-slate-400 text-center">
          {label}
        </span>
      )}
      <div className="rounded-lg bg-[#111318] border border-amber-500/20 p-2">
        <div
          ref={badgeRef}
          key={badgeId}
          data-iframe-width={width}
          data-iframe-height={height}
          data-share-badge-id={badgeId}
          data-share-badge-host="https://www.credly.com"
        />
      </div>
      <div className="flex flex-col items-center text-center gap-1">
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-amber-300">
          <ShieldCheck className="w-3 h-3" />
          {c.verified}
        </span>
        <a
          href={verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-mono text-[10px] text-slate-500 hover:text-amber-300 transition-colors"
        >
          {c.viewOnCredly}
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>
    </div>
  );
}
