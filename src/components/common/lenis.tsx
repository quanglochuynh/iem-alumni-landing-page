'use client';
import { ReactLenis } from '@studio-freight/react-lenis';
import type { PropsWithChildren } from 'react';

const Lenis = ({ children }: PropsWithChildren) => {
  return (
    <ReactLenis root options={{ duration: 1, smoothWheel: true }}>
      {children as Parameters<typeof ReactLenis>[0]['children']}
    </ReactLenis>
  );
};

export default Lenis;
