import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import type { ILocaleParams } from '@/interfaces';

export default function NavLayout({ children }: ILocaleParams) {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-40rem)]">{children}</div>
      <Footer />
    </>
  );
}
