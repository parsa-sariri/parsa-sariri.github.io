import { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    nav: {
      nexus: 'NEXUS', about: 'ABOUT', stack: 'STACK', trajectory: 'TRAJECTORY', connect: 'CONNECT',
      motionOn: 'MOTION: ON', motionOff: 'MOTION: OFF',
    },
    about: {
      label: 'OPERATOR_PROFILE',
      title1: 'ABOUT', title2: 'THE_ARCHITECT',
      bioPath: 'cat about.md',
      bio1: 'I am Parsa Sariri Ajili — a 19-year-old network engineering student with a deep passion for building and securing digital infrastructure.',
      bio2: 'My journey began with hardware and operating systems, evolving into network architecture across Cisco, MikroTik, and Microsoft ecosystems. Along the way, I mastered Linux administration, Python automation, and virtualization technologies.',
      bio3: 'Currently preparing to pivot into cybersecurity — transforming my networking expertise into proactive defense, threat analysis, and impenetrable security architecture.',
      statsCerts: 'CERTIFICATIONS', statsDomains: 'DOMAINS', statsAge: 'YEARS OLD', statsLearning: 'LEARNING',
    },
    hero: {
      systemOnline: 'SYSTEM ONLINE',
      tagline: 'Network Engineering & Cybersecurity Specialist',
      birthTag: 'B.2007.06.16',
      statusTag: 'STATUS: NETWORK_ARCHITECT',
      pivotTag: 'PIVOT → CYBER_SEC',
      viewStack: 'VIEW_STACK',
      initiateContact: 'INITIATE_CONTACT',
      scrollToTraverse: 'SCROLL_TO_TRAVERSE',
    },
    skills: {
      label: 'STACK_HIERARCHY',
      title1: 'CERTIFICATION',
      title2: 'RACK',
      description: 'Each blade represents a layer of technical mastery. Click to inspect the protocols within.',
      rackInfo: '/dev/certification_rack — 10 BLADES MOUNTED',
      masteryPoints: 'MASTERY_POINTS:',
    },
    certs: {
      aplus: { name: 'CompTIA A+', category: 'Infrastructure', mastery: ['Hardware diagnostics', 'PC assembly & repair', 'Mobile devices', 'Operating systems', 'Troubleshooting methodology'] },
      netplus: { name: 'CompTIA Network+', category: 'Networking', mastery: ['OSI & TCP/IP models', 'Subnetting & VLANs', 'Routing & switching', 'Network security basics', 'Wireless protocols'] },
      mcsa: { name: 'Microsoft MCSA', category: 'Microsoft', mastery: ['Windows Server administration', 'Active Directory', 'Group Policy', 'DNS/DHCP on Windows', 'Hyper-V'] },
      lpic1: { name: 'Linux LPIC-1', category: 'Linux', mastery: ['Command-line proficiency', 'File systems & permissions', 'Process management', 'Bash scripting', 'Package management'] },
      pynet: { name: 'Python for Network Engineers', category: 'Programming', mastery: ['Network automation', 'Netmiko & NAPALM', 'API interactions', 'Configuration management', 'Data parsing & analysis'] },
      ccna: { name: 'Cisco CCNA', category: 'Networking', mastery: ['IOS configuration', 'VLANs & trunking', 'OSPF & static routing', 'ACLs & NAT', 'Device security'] },
      mtcna: { name: 'MikroTik MTCNA', category: 'Networking', mastery: ['RouterOS administration', 'Firewall & NAT', 'Wireless & CAPsMAN', 'Hotspot & PPPoE', 'Queues & QoS'] },
      lpic2: { name: 'Linux LPIC-2', category: 'Linux', mastery: ['Advanced system administration', 'Kernel & boot process', 'DNS & mail servers', 'Web services', 'System security hardening'] },
      vcp: { name: 'Virtualization VCP', category: 'Virtualization', mastery: ['VMware vSphere', 'VM lifecycle management', 'Resource pools', 'vMotion & HA', 'Storage management'] },
      bm: { name: 'Backup and Monitoring', category: 'Infrastructure', mastery: ['Backup strategies', 'Disaster recovery', 'Monitoring tools', 'Alerting & thresholds', 'Log analysis'] },
    },
    trajectory: {
      label: 'THE_TRAJECTORY',
      titleFrom: 'FROM', titleNetwork: 'NETWORK', titleTo: 'TO', titleSecurity: 'SECURITY',
      subtitle: 'A continuous evolution — building the infrastructure today, securing it tomorrow.',
      currentState: 'CURRENT_STATE', networkMastery: 'Network Mastery',
      nextVector: 'NEXT_VECTOR', cybersecurity: 'Cybersecurity',
      currentGrid: { routing: 'Routing & Switching', infra: 'Infrastructure', server: 'Server Administration', defense: 'Network Defense' },
      futureGrid: { pentest: 'Penetration Testing', threat: 'Threat Analysis', secArch: 'Sec Architecture', incident: 'Incident Response' },
      currentDesc: 'Currently studying network engineering with deep hands-on expertise across Cisco, MikroTik, Linux, and Microsoft ecosystems. 10 certifications and counting.',
      futureDesc: 'Next phase: diving deep into cybersecurity — transforming network knowledge into impenetrable defense systems and proactive threat intelligence.',
      masteryLevel: 'MASTERY_LEVEL', inProgress: 'IN_PROGRESS',
    },
    contact: {
      label: 'THE_PROTOCOL',
      title1: 'ESTABLISH', title2: 'CONNECTION',
      description: 'Initialize a secure data transmission. All inputs are encrypted and logged.',
      inputName: 'INPUT_NAME:', inputEmail: 'INPUT_EMAIL:', inputMessage: 'INPUT_MESSAGE:',
      namePlaceholder: 'enter your name...', emailPlaceholder: 'enter your email...', messagePlaceholder: 'type your message...',
      execute: 'EXECUTE_SEND', transmitting: 'TRANSMITTING...', complete: 'TRANSMISSION COMPLETE',
      shellPrompt: 'parsa@secure-shell:~$',
      toastTitle: 'TRANSMISSION COMPLETE', toastDesc: 'Message received. I will respond shortly.',
      errorTitle: 'TRANSMISSION FAILED', errorDesc: 'Something went wrong. Please try again.',
    },
    footer: {
      role: 'NETWORK ENGINEER // INFRASTRUCTURE SPECIALIST',
      copyright: '© 2026 PARSA SARIRI AJILI // ALL_PROTOCOLS_RESERVED',
      builtWith: 'Built with 💙 by Parsa Sariri Ajili',
    },
  },
  fa: {
    nav: {
      nexus: 'هسته', about: 'درباره', stack: 'مهارت‌ها', trajectory: 'مسیر', connect: 'ارتباط',
      motionOn: 'حرکت: روشن', motionOff: 'حرکت: خاموش',
    },
    about: {
      label: 'پروفایل اپراتور',
      title1: 'درباره', title2: 'معمار',
      bioPath: 'cat about.md',
      bio1: 'من پارسا سریری آجیلی هستم — دانشجوی ۱۹ ساله مهندسی شبکه با علاقه‌ای عمیق به ساخت و تأمین امنیت زیرساخت‌های دیجیتال.',
      bio2: 'مسیر من از سخت‌افزار و سیستم‌عامل‌ها آغاز شد و به معماری شبکه در اکوسیستم‌های سیسکو، میکروتیک و مایکروسافت رسید. در این مسیر، مدیریت لینوکس، اتوماسیون پایتون و تکنولوژی‌های مجازی‌سازی را تسلط یافتم.',
      bio3: 'در حال حاضر برای ورود به حوزه امنیت سایبری آماده می‌شوم — تبدیل تخصص شبکه‌ام به دفاع فعال، تحلیل تهدید و معماری امنیت نفوذناپذیر.',
      statsCerts: 'گواهینامه', statsDomains: 'حوزه', statsAge: 'سال سن', statsLearning: 'یادگیری',
    },
    hero: {
      systemOnline: 'سیستم آنلاین',
      tagline: 'متخصص مهندسی شبکه و امنیت سایبری',
      birthTag: 'B.2007.06.16',
      statusTag: 'وضعیت: معمار شبکه',
      pivotTag: 'مسیر → امنیت سایبری',
      viewStack: 'مشاهده مهارت‌ها',
      initiateContact: 'برقراری ارتباط',
      scrollToTraverse: 'برای ادامه اسکرول کنید',
    },
    skills: {
      label: 'سلسله‌مراتب مهارت‌ها',
      title1: 'رک',
      title2: 'گواهینامه‌ها',
      description: 'هر تیغه نشان‌دهنده یک لایه از تسلط فنی است. برای بررسی پروتکل‌ها کلیک کنید.',
      rackInfo: '/dev/certification_rack — ۱۰ تیغه نصب شده',
      masteryPoints: 'نقاط تسلط:',
    },
    certs: {
      aplus: { name: 'CompTIA A+', category: 'زیرساخت', mastery: ['تشخیص سخت‌افزار', 'مونتاژ و تعمیر کامپیوتر', 'دستگاه‌های موبایل', 'سیستم‌عامل‌ها', 'روش‌شناسی عیب‌یابی'] },
      netplus: { name: 'CompTIA Network+', category: 'شبکه', mastery: ['مدل‌های OSI و TCP/IP', 'سابنت و VLAN', 'مسیریابی و سوئیچینگ', 'مبانی امنیت شبکه', 'پروتکل‌های بی‌سیم'] },
      mcsa: { name: 'Microsoft MCSA', category: 'مایکروسافت', mastery: ['مدیریت Windows Server', 'اکتیو دایرکتوری', 'Group Policy', 'DNS/DHCP در ویندوز', 'Hyper-V'] },
      lpic1: { name: 'Linux LPIC-1', category: 'لینوکس', mastery: ['تسلط بر خط فرمان', 'سیستم فایل و مجوزها', 'مدیریت پردازش‌ها', 'اسکریپت‌نویسی Bash', 'مدیریت بسته‌ها'] },
      pynet: { name: 'Python for Network Engineers', category: 'برنامه‌نویسی', mastery: ['اتوماسیون شبکه', 'Netmiko و NAPALM', 'تعامل با API', 'مدیریت پیکربندی', 'پردازش و تحلیل داده'] },
      ccna: { name: 'Cisco CCNA', category: 'شبکه', mastery: ['پیکربندی IOS', 'VLAN و Trunking', 'مسیریابی OSPF و استاتیک', 'ACL و NAT', 'امنیت دستگاه‌ها'] },
      mtcna: { name: 'MikroTik MTCNA', category: 'شبکه', mastery: ['مدیریت RouterOS', 'فایروال و NAT', 'بی‌سیم و CAPsMAN', 'Hotspot و PPPoE', 'صف‌ها و QoS'] },
      lpic2: { name: 'Linux LPIC-2', category: 'لینوکس', mastery: ['مدیریت پیشرفته سیستم', 'کرنل و فرآیند بوت', 'سرورهای DNS و ایمیل', 'سرویس‌های وب', 'سخت‌سازی امنیت سیستم'] },
      vcp: { name: 'Virtualization VCP', category: 'مجازی‌سازی', mastery: ['VMware vSphere', 'مدیریت چرخه حیات VM', 'استخر منابع', 'vMotion و HA', 'مدیریت ذخیره‌سازی'] },
      bm: { name: 'Backup and Monitoring', category: 'زیرساخت', mastery: ['استراتژی‌های پشتیبان‌گیری', 'بازیابی پس از فاجعه', 'ابزارهای مانیتورینگ', 'هشدار و آستانه‌ها', 'تحلیل لاگ'] },
    },
    trajectory: {
      label: 'مسیر',
      titleFrom: 'از', titleNetwork: 'شبکه', titleTo: 'تا', titleSecurity: 'امنیت',
      subtitle: 'تکامل مستمر — ساختن زیرساخت امروز، تأمین امنیت فردا.',
      currentState: 'وضعیت فعلی', networkMastery: 'تسلط بر شبکه',
      nextVector: 'مسیر بعدی', cybersecurity: 'امنیت سایبری',
      currentGrid: { routing: 'مسیریابی و سوئیچینگ', infra: 'زیرساخت', server: 'مدیریت سرور', defense: 'دفاع شبکه' },
      futureGrid: { pentest: 'تست نفوذ', threat: 'تحلیل تهدید', secArch: 'معماری امنیت', incident: 'پاسخ به حادثه' },
      currentDesc: 'در حال تحصیل مهندسی شبکه با تخصص عملی گسترده در اکوسیستم‌های سیسکو، میکروتیک، لینوکس و مایکروسافت. ۱۰ گواهینامه و در حال افزایش.',
      futureDesc: 'مرحله بعد: غوطه‌وری عمیق در امنیت سایبری — تبدیل دانش شبکه به سیستم‌های دفاعی نفوذناپذیر و هوش تهدیدات فعال.',
      masteryLevel: 'سطح تسلط', inProgress: 'در حال انجام',
    },
    contact: {
      label: 'پروتکل',
      title1: 'برقراری', title2: 'ارتباط',
      description: 'یک انتقال داده امن را آغاز کنید. تمام ورودی‌ها رمزگذاری و ثبت می‌شوند.',
      inputName: 'نام:', inputEmail: 'ایمیل:', inputMessage: 'پیام:',
      namePlaceholder: 'نام خود را وارد کنید...', emailPlaceholder: 'ایمیل خود را وارد کنید...', messagePlaceholder: 'پیام خود را تایپ کنید...',
      execute: 'ارسال', transmitting: 'در حال ارسال...', complete: 'ارسال کامل شد',
      shellPrompt: 'parsa@secure-shell:~$',
      toastTitle: 'ارسال کامل شد', toastDesc: 'پیام دریافت شد. به‌زودی پاسخ خواهم داد.',
      errorTitle: 'ارسال ناموفق', errorDesc: 'مشکلی پیش آمد. لطفاً دوباره تلاش کنید.',
    },
    footer: {
      role: 'مهندس شبکه // متخصص زیرساخت',
      copyright: '© ۲۰۲۶ پارسا سریری آجیلی // تمام حقوق محفوظ',
      builtWith: 'ساخته شده با 💙 توسط پارسا سریری آجیلی',
    },
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  const isRTL = lang === 'fa';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [lang, isRTL]);

  const toggleLang = () => setLang((l) => (l === 'en' ? 'fa' : 'en'));
  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, isRTL, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}