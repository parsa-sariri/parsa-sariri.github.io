import { useEffect, useMemo, useRef, useState } from 'react';
import { Activity, ChevronDown, ScanLine } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const FRAME_COUNT  = 80;
const FRAME_PREFIX = '/character/2_';

/*
 * HOW THIS WORKS — the professional approach:
 *
 * Instead of fighting the browser with scroll-jacking (lock/unlock, overlays,
 * overflow hacks), we USE the browser's own sticky positioning:
 *
 *  ┌─ <section>  height = 100svh + ANIM_RANGE  ──────────────────┐
 *  │  The section is taller than the viewport by ANIM_RANGE px.   │
 *  │                                                              │
 *  │  ┌─ <div sticky top-0 h-[100svh]> ──────────────────────┐   │
 *  │  │  Content pins to the top while the user scrolls       │   │
 *  │  │  through the extra ANIM_RANGE of document height.     │   │
 *  │  └────────────────────────────────────────────────────────┘   │
 *  └──────────────────────────────────────────────────────────────┘
 *
 *  scroll progress = (scrollY - sectionTop) / ANIM_RANGE  →  0 … 1
 *
 * Result: every scroll method (wheel, scrollbar, touch, keyboard) works
 * perfectly with zero JS fighting — because we're using native scroll.
 *
 * The only JS we add: a "jump-over" guard for the downward direction, so
 * a user who scrollbar-drags past the section still sees it complete at 100%.
 */
const ANIM_RANGE = 1500; // px of document scroll = full 80-frame animation

export default function CharacterSequence() {
  const { lang } = useLanguage();
  const sectionRef  = useRef(null);
  const progressRef = useRef(0);

  const [frameIndex, setFrameIndex] = useState(0);
  const [progress,   setProgress]   = useState(0);

  const frames = useMemo(
    () =>
      Array.from({ length: FRAME_COUNT }, (_, i) =>
        `${FRAME_PREFIX}${String(i).padStart(3, '0')}-jukebox-bg-removed.png`,
      ),
    [],
  );

  /* Preload: first 15 frames immediately, rest after 800ms */
  useEffect(() => {
    frames.slice(0, 15).forEach((src) => { const img = new Image(); img.src = src; });
    const t = setTimeout(() => {
      frames.slice(15).forEach((src) => { const img = new Image(); img.src = src; });
    }, 800);
    return () => clearTimeout(t);
  }, [frames]);

  useEffect(() => {
    const container = sectionRef.current;
    if (!container) return;

    let prevScrollY = window.scrollY;

    const onScroll = () => {
      const cur  = window.scrollY;
      const rect = container.getBoundingClientRect();

      /*
       * sectionAbsTop: absolute Y where section top aligns with viewport top.
       * This is constant regardless of current scroll position.
       */
      const sectionAbsTop = Math.round(rect.top + cur);
      const sectionAbsEnd = sectionAbsTop + ANIM_RANGE;

      /*
       * Jump-over guard (downward only):
       * If a scrollbar drag or Page-Down skipped past the entire animation
       * range in one jump, land the user at the END of the section (100%).
       * They still see the character fully revealed before continuing.
       */
      if (prevScrollY < sectionAbsTop && cur > sectionAbsEnd) {
        window.scrollTo({ top: sectionAbsEnd, behavior: 'instant' });
        prevScrollY = sectionAbsEnd;
        setProgress(1);
        progressRef.current = 1;
        setFrameIndex(FRAME_COUNT - 1);
        return;
      }

      /*
       * Normal scroll — map document position to animation progress.
       * Works identically for mouse wheel, scrollbar, touch, and keyboard.
       */
      const scrolled = cur - sectionAbsTop; // negative before section, 0–ANIM_RANGE inside
      const p = Math.max(0, Math.min(1, scrolled / ANIM_RANGE));

      if (p !== progressRef.current) {
        progressRef.current = p;
        setProgress(p);
        setFrameIndex(Math.round(p * (FRAME_COUNT - 1)));
      }

      prevScrollY = cur;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // sync with current position on mount
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const copy =
    lang === 'fa'
      ? {
          eyebrow:     'SEQUENCE_01 // OPERATOR',
          title:       'حرکت را با اسکرول',
          accent:      'کنترل کن',
          instruction: 'اسکرول کن تا کاراکتر کامل شود.',
          frame:       'فریم',
          status:      'حرکت ثبت‌شده',
          scroll:      'برای اجرای سکانس اسکرول کن',
        }
      : {
          eyebrow:     'SEQUENCE_01 // OPERATOR',
          title:       'Control motion',
          accent:      'with scroll',
          instruction: 'Scroll through to reveal the full sequence.',
          frame:       'FRAME',
          status:      'MOTION_CAPTURED',
          scroll:      'SCROLL TO PLAY SEQUENCE',
        };

  return (
    /*
     * Section is taller than the viewport by ANIM_RANGE px.
     * The sticky child stays pinned at top-0 while the user scrolls
     * through that extra document height — no JS locking required.
     */
    <section
      ref={sectionRef}
      style={{ height: `calc(100svh + ${ANIM_RANGE}px)` }}
      className="relative"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-background">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--primary)/0.12)] blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/50 to-transparent" />

        <div className="relative mx-auto flex h-full max-w-6xl flex-col px-6 pt-20 pb-8">

          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5">
                <ScanLine className="h-4 w-4 text-[hsl(var(--primary))]" />
                <span className="font-heading text-[10px] font-semibold tracking-widest text-[hsl(var(--muted-foreground))]">
                  {copy.eyebrow}
                </span>
              </div>
              <h2 className="font-heading text-3xl font-bold text-[hsl(var(--foreground))] sm:text-5xl">
                {copy.title}{' '}
                <span className="text-gradient-cobalt">{copy.accent}</span>
              </h2>
            </div>
            <div className="hidden rounded-lg glass px-3 py-2 font-heading text-[10px] tracking-widest text-[hsl(var(--muted-foreground))] sm:block">
              {copy.frame}_{String(frameIndex + 1).padStart(2, '0')}/{FRAME_COUNT}
            </div>
          </div>

          {/* Character image */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center">
            <div className="pointer-events-none absolute inset-0 m-auto h-[min(68vw,37rem)] w-[min(68vw,37rem)] rounded-full border border-[hsl(var(--primary)/0.18)]" />
            <div className="pointer-events-none absolute inset-0 m-auto h-[min(51vw,28rem)] w-[min(51vw,28rem)] rounded-full border border-dashed border-[hsl(var(--accent)/0.26)]" />

            <div className="relative h-[58svh] w-full max-w-[23rem] sm:h-[67svh] sm:max-w-[27rem]">
              <img
                src={frames[frameIndex]}
                alt={lang === 'fa' ? 'سکانس متحرک' : 'Animated sequence'}
                className="h-full w-full object-contain object-bottom drop-shadow-[0_25px_45px_rgba(0,0,0,0.55)]"
                draggable="false"
              />
            </div>

            <div className="absolute bottom-[12%] left-0 hidden max-w-[13rem] glass rounded-xl p-4 lg:block">
              <div className="mb-2 flex items-center gap-2 text-[hsl(var(--primary))]">
                <Activity className="h-4 w-4" />
                <span className="font-heading text-[10px] tracking-widest">{copy.status}</span>
              </div>
              <p className="text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">
                {copy.instruction}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mx-auto w-full max-w-xl">
            <div className="mb-3 flex items-center justify-between gap-4 font-heading text-[10px] tracking-widest text-[hsl(var(--muted-foreground))]">
              <span>{copy.scroll}</span>
              <span>{Math.round(progress * 100)}%</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-[hsl(var(--secondary))]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))]"
                style={{ width: `${progress * 100}%`, transition: 'width 40ms linear' }}
              />
            </div>
            <div className="mt-4 flex justify-center text-[hsl(var(--primary))]">
              <ChevronDown className="h-4 w-4 animate-bounce" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
