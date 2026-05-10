import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import LeadForm from "@/components/LeadForm";
import PainSection from "@/components/PainSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Crawl Space Ninja Raleigh — Free Crawl Space Assessment",
  description:
    "Request a free crawl space assessment for your Raleigh, NC home. Serving Raleigh, Cary, Apex, Wake Forest, Garner & Knightdale. 700+ five-star Google reviews. No salesperson, no pressure.",
  openGraph: {
    title: "Get Your Free Crawl Space Assessment — Raleigh, NC",
    description:
      "Serving Raleigh, Cary, Apex, Wake Forest, Garner & Knightdale. Tell us about your home and we'll reach out within 2 hours.",
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
        <LeadForm />
        <PainSection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <SiteFooter />
    </>
  );
}
