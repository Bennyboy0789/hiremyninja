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
        <HeroSection
          headline={
            <>
              Raleigh&apos;s Trusted{" "}
              <span className="text-[#EB1717]">Crawl Space Experts</span>
              {" "}— Get Your Free Assessment
            </>
          }
          subhead="Serving Raleigh, Cary, Apex, Wake Forest, Garner & Knightdale. No salesperson. No pressure. Just honest answers about your crawl space."
          ctaText="Request My Free Assessment →"
          subtext="Takes about 2 minutes · No commitment required"
        />
        <TrustBar />
        <LeadForm />
        <PainSection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTA
          headline="Ready for Your Free Crawl Space Assessment?"
          body="Fill out the form above and our Raleigh team will reach out within 2 hours."
          ctaText="Request My Free Assessment →"
          ctaHref="#calculator"
        />
      </main>
      <SiteFooter />
    </>
  );
}
