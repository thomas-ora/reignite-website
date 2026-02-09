import Hero from "@/components/Hero";
import ResultsPromise from "@/components/ResultsPromise";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Guarantee from "@/components/Guarantee";
import WhoThisIsFor from "@/components/WhoThisIsFor";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ResultsPromise />
      <HowItWorks />
      <Testimonials />
      <Guarantee />
      <WhoThisIsFor />
      <CalendlyEmbed />
      <Footer />
    </main>
  );
}
