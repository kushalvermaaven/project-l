import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — attaches IntersectionObserver to add .visible class
 * to elements with .reveal, .reveal-left, .reveal-right, .reveal-scale,
 * or .stagger-children classes.
 */
export function useScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/**
 * useParallax — simple scroll parallax for a ref element
 * @param {number} speed - parallax speed factor (0.1 = subtle, 0.5 = strong)
 */
export function useParallax(speed = 0.2) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const offset = window.scrollY + rect.top;
      const relativeScroll = window.scrollY - offset;
      el.style.transform = `translateY(${relativeScroll * speed}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return ref;
}

export default useScrollReveal;
