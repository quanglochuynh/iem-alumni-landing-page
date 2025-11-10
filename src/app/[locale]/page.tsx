import Navbar from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Schedule } from "@/components/sections/schedule";
import { Speakers } from "@/components/sections/speakers";
import { Organisers } from "@/components/sections/organisers";
import { Sponsors } from "@/components/sections/sponsors";
import Footer from "@/components/sections/footer";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params; // locale handled by app layout elsewhere for now
  return (
    <div className="font-sans">
      <Navbar />
      <main>
        <Hero />
        <Schedule />
        <Speakers />
        <Organisers />
        <Sponsors />
      </main>
      <Footer />
    </div>
  );
}
