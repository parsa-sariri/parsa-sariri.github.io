import { useMemo, useState } from 'react';
import {
  Archive, ArrowRight, BadgeAlert, BookOpen, ChevronRight, CircleDot,
  Clock3, FileText, Fingerprint, LockKeyhole, Map, MessageCircle,
  Play, RotateCcw, Search, ShieldAlert, Siren, UserRound, Volume2, X
} from 'lucide-react';

const locations = [
  { id: 'theater', name: 'تئاتر نئون', type: 'صحنه جرم', x: 51, y: 31, icon: Siren, clue: 'ticket', text: 'پشت صحنه، بوی تینر و باران مانده. بلیت پاره‌شده‌ای زیر پیانو گیر کرده است.' },
  { id: 'archive', name: 'آرشیو روزنامه', type: 'اسناد', x: 20, y: 59, icon: Archive, clue: 'article', text: 'شماره‌ی قدیمی روزنامه به قرارداد محرمانه‌ی توسعه‌ی بندر اشاره می‌کند؛ نام آریا در حاشیه‌ی آن دیده می‌شود.' },
  { id: 'pier', name: 'اسکله ۹', type: 'قرار مخفی', x: 78, y: 64, icon: Map, clue: 'recording', text: 'در کانتینر متروکه، ضبط‌صوتی پیدا می‌کنی که صدای مشاجره‌ی شب قتل را ثبت کرده است.' },
  { id: 'cafe', name: 'کافه مه‌آلود', type: 'شاهد', x: 33, y: 24, icon: MessageCircle, clue: 'matchbook', text: 'صاحب کافه می‌گوید لیا ساعت ۲۲:۴۰ آن‌جا بود؛ اما جعبه کبریتی با نشان تئاتر از جیبش افتاد.' },
];

const evidence = {
  ticket: { title: 'بلیت پاره‌شده', tag: 'زمان‌بندی', detail: 'ردّ انگشت روی بلیت متعلق به لیا مرادی است. ساعت ورود: ۲۳:۴۷.' },
  article: { title: 'بریده‌ی روزنامه', tag: 'انگیزه', detail: 'ویکتور راد، قربانی، قرار بود فساد مالی پروژه بندر را افشا کند.' },
  recording: { title: 'نوار صوتی اسکله', tag: 'شاهد شنیداری', detail: 'صدای مردی: «فایل را بده، وگرنه همه‌چیز تمام می‌شود.» سپس صدای بوق ساعت ۰۰:۰۵.' },
  matchbook: { title: 'جعبه کبریت نئون', tag: 'تناقض', detail: 'پشت آن نوشته شده: «L — من هیچ‌وقت تنها نبودم.»' },
};

const suspects = [
  { id: 'leila', name: 'لیا مرادی', role: 'خواننده‌ی تئاتر', color: '#d95d72', motive: 'ویکتور تهدید کرده بود گذشته‌ی او را فاش کند.', alibi: 'ادعا می‌کند تمام شب در کافه بوده است.', line: 'من ویکتور را دوست نداشتم؛ اما مرده برای من سودی نداشت.' },
  { id: 'arya', name: 'آریا سروش', role: 'عضو شورای شهر', color: '#c69b58', motive: 'افشای پروژه بندر، آینده سیاسی او را نابود می‌کرد.', alibi: 'می‌گوید در جلسه‌ی خیریه حاضر بوده است.', line: 'کارآگاه، شهر با داستان اداره نمی‌شود؛ با سند اداره می‌شود.' },
  { id: 'nima', name: 'نیما وکیلی', role: 'مدیر تئاتر', color: '#5b9ca9', motive: 'بدهی سنگین و قرارداد جعلی با ویکتور.', alibi: 'می‌گوید تا نیمه‌شب مشغول بستن گیشه بوده.', line: 'هر کس که در این شهر نفس می‌کشد، چیزی برای پنهان‌کردن دارد.' },
];

const initialLog = [{ speaker: 'سیستم', text: 'پرونده ۰۱ باز شد. ویکتور راد در ساعت ۰۰:۱۲ پشت صحنه‌ی تئاتر نئون پیدا شد.' }];

export default function Home() {
  const [screen, setScreen] = useState('brief');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [found, setFound] = useState([]);
  const [log, setLog] = useState(initialLog);
  const [selectedSuspect, setSelectedSuspect] = useState(null);
  const [trust, setTrust] = useState({ leila: 48, arya: 32, nima: 39 });
  const [accusation, setAccusation] = useState(null);
  const [caseClosed, setCaseClosed] = useState(false);

  const progress = Math.min(100, 22 + found.length * 17 + (selectedSuspect ? 10 : 0));
  const clues = useMemo(() => found.map((id) => evidence[id]), [found]);

  function investigate(location) {
    setSelectedLocation(location);
    if (!found.includes(location.clue)) {
      setFound((current) => [...current, location.clue]);
      setLog((current) => [...current, { speaker: 'سرنخ جدید', text: evidence[location.clue].title }]);
    }
  }

  function interrogate(suspect, pressure) {
    setSelectedSuspect(suspect.id);
    const hasAudio = found.includes('recording');
    const delta = pressure === 'soft' ? 12 : hasAudio ? 19 : -8;
    setTrust((current) => ({ ...current, [suspect.id]: Math.max(0, Math.min(100, current[suspect.id] + delta)) }));
    const reply = pressure === 'soft'
      ? `${suspect.name}: «اگر واقعاً دنبال حقیقتی، از ${suspect.id === 'arya' ? 'بندر' : 'آرشیو'} شروع کن.»`
      : hasAudio
        ? `${suspect.name} مکث می‌کند: «آن صدا… صدای من نبود. ولی می‌دانم چه کسی فایل را می‌خواست.»`
        : `${suspect.name} لبخند می‌زند: «بدون مدرک، این فقط یک نمایش است.»`;
    setLog((current) => [...current, { speaker: 'بازجویی', text: reply }]);
  }

  function submitAccusation(id) {
    setAccusation(id);
    setCaseClosed(true);
    setLog((current) => [...current, { speaker: 'نتیجه', text: id === 'arya' ? 'اتهام ثبت شد. آریا با ترکیب مدرک انگیزه و نوار صوتی، در بازجویی نهایی می‌شکند.' : 'اتهام ثبت شد؛ اما یک قطعه از پازل هنوز گم است.' }]);
  }

  function resetCase() {
    setScreen('brief'); setSelectedLocation(null); setFound([]); setLog(initialLog); setSelectedSuspect(null); setTrust({ leila: 48, arya: 32, nima: 39 }); setAccusation(null); setCaseClosed(false);
  }

  if (screen === 'brief') return <Briefing onStart={() => setScreen('game')} />;

  return (
    <main dir="rtl" className="min-h-screen overflow-hidden bg-[#080b12] text-slate-100 selection:bg-[#d49b47]/40">
      <div className="noise" />
      <header className="relative z-10 flex items-center justify-between border-b border-white/10 bg-[#0c1019]/90 px-5 py-3 backdrop-blur-xl md:px-9">
        <div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded border border-[#d49b47]/60 bg-[#d49b47]/10"><Fingerprint size={21} className="text-[#e5b765]" /></div><div><p className="text-[10px] tracking-[.3em] text-[#e5b765]">NIGHTFALL / BUREAU</p><h1 className="text-sm font-bold">پرونده‌ی ۰۱: سکوت در تئاتر نئون</h1></div></div>
        <div className="hidden items-center gap-6 text-xs text-slate-400 md:flex"><span className="flex items-center gap-2"><Clock3 size={15}/> روز اول · ۰۰:۲۸</span><span className="flex items-center gap-2 text-[#e5b765]"><CircleDot size={13} className="animate-pulse"/> پرونده فعال</span></div>
        <button onClick={resetCase} className="rounded border border-white/10 p-2 text-slate-400 transition hover:border-[#d49b47]/50 hover:text-[#e5b765]" title="شروع مجدد"><RotateCcw size={17}/></button>
      </header>

      <div className="relative z-10 grid min-h-[calc(100vh-65px)] grid-cols-1 xl:grid-cols-[280px_1fr_330px]">
        <aside className="order-2 border-l border-white/10 bg-[#0a0e16]/75 p-5 xl:order-1">
          <PanelTitle icon={BookOpen} title="دفتر کارآگاه" subtitle={`${found.length} از ۴ مدرک بازیابی شده`} />
          <div className="mt-4 h-1.5 overflow-hidden rounded bg-white/8"><div className="h-full rounded bg-[#d49b47] transition-all duration-700" style={{ width: `${progress}%` }} /></div>
          <div className="mt-5 space-y-3">{clues.length === 0 ? <Empty label="برای یافتن مدرک، یک لوکیشن را بررسی کن." /> : clues.map((clue) => <article key={clue.title} className="evidence-card"><div className="flex items-start justify-between gap-3"><FileText size={18} className="mt-0.5 text-[#e5b765]"/><span className="rounded bg-[#d49b47]/10 px-2 py-0.5 text-[9px] text-[#e5b765]">{clue.tag}</span></div><h3>{clue.title}</h3><p>{clue.detail}</p></article>)}</div>
          <button onClick={() => setScreen('board')} disabled={found.length < 2} className="mt-6 flex w-full items-center justify-center gap-2 rounded border border-[#d49b47]/50 bg-[#d49b47]/10 px-3 py-3 text-xs font-bold text-[#f5ca7f] transition hover:bg-[#d49b47]/20 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-transparent disabled:text-slate-600"><ShieldAlert size={16}/> ثبت اتهام</button>
        </aside>

        <section className="order-1 relative min-h-[540px] overflow-hidden xl:order-2">
          <div className="city-map absolute inset-0" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,#080b12_100%)]" />
          <div className="relative h-full p-5 md:p-10"><div className="flex items-center justify-between"><div><p className="text-[10px] tracking-[.28em] text-[#d49b47]">NOCTURNE CITY / DISTRICT 04</p><h2 className="mt-1 text-xl font-bold">ردپا را انتخاب کن</h2></div><div className="rounded-full border border-white/10 bg-[#0c1019]/70 px-3 py-1.5 text-xs text-slate-400"><Map size={13} className="ml-1 inline text-[#e5b765]"/> نقشه‌ی زنده</div></div>
            <div className="relative mx-auto mt-7 h-[410px] max-w-4xl">{locations.map((location) => { const Icon = location.icon; const discovered = found.includes(location.clue); return <button key={location.id} onClick={() => investigate(location)} style={{ left: `${location.x}%`, top: `${location.y}%` }} className={`map-pin ${selectedLocation?.id === location.id ? 'active' : ''}`}><span className={`pin-dot ${discovered ? 'found' : ''}`}><Icon size={17}/></span><span className="pin-label"><b>{location.name}</b><small>{discovered ? 'بررسی شد' : location.type}</small></span></button>})}</div>
            <div className="absolute bottom-6 left-5 right-5 rounded-xl border border-white/10 bg-[#0b0f19]/90 p-4 shadow-2xl backdrop-blur md:left-10 md:right-10">{selectedLocation ? <div className="flex gap-4"><Search className="mt-1 shrink-0 text-[#e5b765]" size={20}/><div><p className="text-xs text-[#d49b47]">{selectedLocation.name}</p><p className="mt-1 text-sm leading-6 text-slate-300">{selectedLocation.text}</p></div><button onClick={() => setSelectedLocation(null)} className="mr-auto self-start text-slate-500"><X size={16}/></button></div> : <p className="text-center text-sm text-slate-400">در تاریکی شهر حرکت کن. هر انتخاب، روایت پرونده را تغییر می‌دهد.</p>}</div>
          </div>
        </section>

        <aside className="order-3 border-r border-white/10 bg-[#0a0e16]/75 p-5">
          <PanelTitle icon={UserRound} title="اتاق بازجویی" subtitle="هر پاسخ یک اثر ماندگار دارد" />
          <div className="mt-4 space-y-2">{suspects.map((suspect) => <button key={suspect.id} onClick={() => setSelectedSuspect(suspect.id)} className={`suspect ${selectedSuspect === suspect.id ? 'selected' : ''}`}><span style={{ background: suspect.color }} className="avatar">{suspect.name.slice(0, 1)}</span><span className="text-right"><b>{suspect.name}</b><small>{suspect.role}</small></span><ChevronRight size={16} className="mr-auto text-slate-600"/></button>)}</div>
          {selectedSuspect ? <Interrogation suspect={suspects.find((s) => s.id === selectedSuspect)} trust={trust[selectedSuspect]} onAsk={interrogate} hasAudio={found.includes('recording')} /> : <div className="mt-5"><Empty label="یک مظنون را برای گفت‌وگو انتخاب کن." /></div>}
          <div className="mt-5 border-t border-white/10 pt-4"><p className="mb-2 text-[10px] tracking-[.2em] text-slate-500">آخرین رخدادها</p><div className="space-y-2">{log.slice(-3).reverse().map((item, index) => <p key={index} className="text-[11px] leading-5 text-slate-400"><span className="ml-1 text-[#e5b765]">{item.speaker}:</span>{item.text}</p>)}</div></div>
        </aside>
      </div>
      {caseClosed && <ResultModal accused={suspects.find((s) => s.id === accusation)} perfect={accusation === 'arya' && found.length === 4} onClose={() => setCaseClosed(false)} />}
    </main>
  );
}

function Briefing({ onStart }) { return <main dir="rtl" className="briefing min-h-screen text-slate-100"><div className="noise"/><section className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16"><div className="mb-8 flex items-center gap-3 text-[#e5b765]"><Fingerprint size={28}/><span className="text-xs tracking-[.35em]">NIGHTFALL BUREAU</span></div><p className="text-xs tracking-[.28em] text-[#d49b47]">پرونده‌ی محرمانه / ۰۱</p><h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight md:text-6xl">سکوت در<br/><span className="text-[#e5b765]">تئاتر نئون</span></h1><p className="mt-7 max-w-2xl text-base leading-8 text-slate-400">ویکتور راد، روزنامه‌نگار افشاگر، پشت صحنه‌ی تئاتر نئون مرده پیدا شده است. پلیس پرونده را خودکشی اعلام کرده؛ اما یک تماس ناشناس، تو را به خیابان‌های خیس نوکتورن کشانده.</p><div className="mt-10 grid max-w-2xl grid-cols-3 gap-3 border-y border-white/10 py-5 text-center"><Stat value="۳" label="مظنون اصلی"/><Stat value="۴" label="سرنخ پنهان"/><Stat value="چندگانه" label="پایان ممکن"/></div><button onClick={onStart} className="mt-10 flex w-fit items-center gap-3 rounded bg-[#d49b47] px-6 py-4 text-sm font-black text-[#16100a] transition hover:scale-[1.02] hover:bg-[#e5b765]"><Play size={17} fill="currentColor"/> ورود به پرونده <ArrowRight size={17}/></button><p className="mt-5 text-xs text-slate-600">تمام انتخاب‌ها ذخیره می‌شوند. حقیقت همیشه با یک جواب به‌دست نمی‌آید.</p></section></main> }
function Stat({ value, label }) { return <div><b className="block text-lg text-[#e5b765]">{value}</b><span className="text-[10px] text-slate-500">{label}</span></div> }
function PanelTitle({ icon: Icon, title, subtitle }) { return <div className="flex items-start gap-3"><div className="grid h-8 w-8 place-items-center rounded bg-white/5 text-[#e5b765]"><Icon size={16}/></div><div><h2 className="text-sm font-bold">{title}</h2><p className="mt-0.5 text-[10px] text-slate-500">{subtitle}</p></div></div> }
function Empty({ label }) { return <div className="rounded border border-dashed border-white/10 p-4 text-center text-xs leading-6 text-slate-600"><LockKeyhole size={17} className="mx-auto mb-2"/>{label}</div> }
function Interrogation({ suspect, trust, onAsk, hasAudio }) { return <div className="mt-5 rounded-lg border border-[#d49b47]/20 bg-[#d49b47]/[.045] p-4"><div className="flex items-center justify-between"><span className="text-xs text-slate-400">فشار بازجویی</span><span className="text-xs font-bold text-[#e5b765]">{trust}%</span></div><div className="mt-2 h-1 overflow-hidden rounded bg-white/10"><div className="h-full bg-[#d49b47] transition-all" style={{width:`${trust}%`}}/></div><p className="mt-4 text-xs leading-6 text-slate-300">«{suspect.line}»</p><div className="mt-4 grid grid-cols-2 gap-2"><button onClick={() => onAsk(suspect, 'soft')} className="ask"><MessageCircle size={14}/> همدلی</button><button onClick={() => onAsk(suspect, 'hard')} className="ask"><BadgeAlert size={14}/>{hasAudio ? 'مواجهه' : 'فشار'}</button></div><button className="mt-3 flex w-full items-center justify-center gap-2 text-[10px] text-slate-500"><Volume2 size={13}/> صدای شخصیت — به‌زودی</button></div> }
function ResultModal({ accused, perfect, onClose }) { return <div className="fixed inset-0 z-30 grid place-items-center bg-[#05070c]/85 p-5 backdrop-blur-sm"><div className="w-full max-w-md border border-[#d49b47]/30 bg-[#10151f] p-7 text-center shadow-2xl"><ShieldAlert className="mx-auto text-[#e5b765]" size={34}/><p className="mt-4 text-xs tracking-[.25em] text-[#d49b47]">گزارش نهایی</p><h2 className="mt-2 text-2xl font-black">اتهام علیه {accused.name}</h2><p className="mt-4 leading-7 text-sm text-slate-400">{perfect ? 'پرونده با تمام سرنخ‌ها تکمیل شد. شبکه‌ی فساد بندر، آریا را به قتل ویکتور پیوند می‌دهد.' : accused.id === 'arya' ? 'مسیر درست است، اما بخشی از حقیقت هنوز در سایه مانده. پرونده را دوباره مرور کن.' : 'پرونده بسته شد، اما حقیقت مقاومت می‌کند. شاید به مظنون اشتباهی اعتماد کرده‌ای.'}</p><button onClick={onClose} className="mt-6 w-full rounded bg-[#d49b47] py-3 text-xs font-bold text-[#16100a]">بازگشت به پرونده</button></div></div> }
