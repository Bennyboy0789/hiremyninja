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
  title: "Crawl Space Ninja Raleigh — Free Instant Price Estimate",
  description:
    "Get an instant crawl space repair estimate for your Raleigh, NC home. Encapsulation, mold removal, waterproofing & more. 700+ five-star Google reviews. No salesperson, no pressure.",
  openGraph: {
    title: "Find Out What Your Crawl Space Repair Will Cost — In 60 Seconds",
    description:
      "Serving Raleigh, Cary, Apex, Wake Forest, Garner & Knightdale. Use our free calculator to get an instant price range, then submit photos for an exact quote.",
    url: "https://raleigh.crawlspaceninja.com",
    siteName: "Crawl Space Ninja Raleigh",
    images: [
      {
        url: "/crawl space encapsultion.jpg",
        width: 1200,
        height: 630,
        alt: "Crawl Space Encapsulation — Crawl Space Ninja Raleigh",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function Home() {
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
