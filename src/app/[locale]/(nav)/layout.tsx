import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import type { ILocaleParams } from '@/interfaces';

export default function NavLayout({ children }: ILocaleParams) {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
