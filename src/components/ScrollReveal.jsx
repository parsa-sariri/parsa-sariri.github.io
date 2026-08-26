import { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}