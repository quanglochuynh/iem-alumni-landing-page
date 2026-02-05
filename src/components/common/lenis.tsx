'use client';
import { ReactLenis } from '@studio-freight/react-lenis';
import { PropsWithChildren } from 'react';

const Lenis = ({ children }: PropsWithChildren) => {
  return (
    <ReactLenis root options={{ duration: 2, smoothWheel: true }}>
      {children as Parameters<typeof ReactLenis>[0]['children']}
    </ReactLenis>
  );
};

export default Lenis;
