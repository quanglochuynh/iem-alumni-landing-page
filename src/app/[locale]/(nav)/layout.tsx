import Navbar from '@/features/wiema2025/sections/navbar';
import type { ILocaleParams } from '@/interfaces';

export default function NavLayout({ children }: ILocaleParams) {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}
