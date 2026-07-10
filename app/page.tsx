import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import LeadForm from "@/components/LeadForm";
import PainSection from "@/components/PainSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import WarrantySection from "@/components/WarrantySection";
import FinalCTA from "@/components/FinalCTA";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Crawl Space Ninja of Raleigh, NC | Free Crawl Space Assessment",
  description:
    "Request a free crawl space assessment for your Raleigh-area home. Serving Raleigh, Cary, Apex, Wake Forest, Garner & Knightdale. 700+ five-star Google reviews. No salesperson, no pressure.",
  openGraph: {
    title: "Get Your Free Crawl Space Assessment — Raleigh, NC",
    description:
      "Serving Raleigh, Cary, Apex, Wake Forest, Garner & Knightdale. Tell us about your home and we'll reach out within 2 hours.",
    url: "https://raleigh.crawlspaceninja.com",
    siteName: "Crawl Space Ninja of Raleigh",
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
              That Musty Smell in Your Home?{" "}
              <span className="text-[#EB1717]">
                It&apos;s Coming From Under Your Floor.
              </span>
            </>
          }
          subhead="Standing water, mold, and rot in your crawl space rise into the air your family breathes — and it gets worse every month you wait. Serving Raleigh, Cary, Apex, Wake Forest, Garner & Knightdale. No salesperson, no pressure."
          ctaText="Request My Free Assessment →"
          subtext="Takes 60 seconds · No commitment required"
        />
        <TrustBar />
        <PainSection />
        <LeadForm />
        <WarrantySection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTA
          headline="The Problem Doesn't Fix Itself. It Gets Worse."
          body="Every month of moisture means more mold, more rot, and a bigger repair bill down the road. A free assessment today could save you thousands — find out where you stand."
          ctaText="Request My Free Assessment →"
          ctaHref="#calculator"
        />
      </main>
      <SiteFooter />
    </>
  );
}
