import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import PriceCalculator from "@/components/PriceCalculator";
import PainSection from "@/components/PainSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Crawl Space Price Calculator — Raleigh, NC | Crawl Space Ninja",
  description:
    "Use our free instant price calculator to estimate crawl space repair costs in Raleigh, NC. Encapsulation, insulation, mold removal, and waterproofing. No salesperson, no pressure.",
};

export default function CalculatorPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <TrustBar />
        <PriceCalculator />
        <PainSection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <SiteFooter />
    </>
  );
}
