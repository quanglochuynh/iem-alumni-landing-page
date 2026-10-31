'use client';

import { useLenis } from '@studio-freight/react-lenis';
import { ArrowUp } from 'lucide-react';
import { useState } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const lenis = useLenis(({ scroll }) => {
    setIsVisible(scroll > 320);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => lenis?.scrollTo(0)}
      className="fixed right-6 bottom-6 z-[60] flex h-28 w-[4.5rem] -rotate-2 flex-col items-center gap-2 border border-foreground/50 border-dashed bg-background px-2 py-2 text-foreground shadow-lg transition-transform duration-200 hover:-translate-y-1 hover:rotate-0 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4 motion-reduce:transition-none"
    >
      <span
        aria-hidden="true"
        className="size-3 rounded-full border border-foreground/60"
      />
      <span className="w-full border-foreground/30 border-t border-dashed" />
      <span className="font-mono text-[9px] tracking-[0.2em]">IEMA</span>
      <ArrowUp aria-hidden="true" size={18} strokeWidth={1.5} />
      <span className="font-mono text-[8px] tracking-[0.18em]">BACK UP</span>
    </button>
  );
}
