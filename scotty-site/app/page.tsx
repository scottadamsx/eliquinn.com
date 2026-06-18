import { IntroHero } from "@/components/IntroHero";
import { Work } from "@/components/Work";
import { About } from "@/components/About";
import { Beyond } from "@/components/Beyond";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <IntroHero />
      <Work />
      <About />
      <Beyond />
      <Footer />
    </main>
  );
}
