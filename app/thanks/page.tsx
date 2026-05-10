import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Thank You — Crawl Space Ninja Raleigh",
  description: "We received your request. Our Raleigh team will be in touch within 2 business hours.",
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center bg-[#F0F0F0] py-20 px-4">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-4xl mb-6">
            ✅
          </div>
          <h1 className="text-3xl font-extrabold text-black mb-3">
            We&apos;ve Got Your Request!
          </h1>
          <p className="text-[#4E4E4E] mb-2 text-lg">
            Our Raleigh team will reach out within{" "}
            <strong className="text-black">2 business hours</strong>.
          </p>
          <p className="text-[#4E4E4E] mb-8">
            Questions in the meantime? We&apos;re happy to talk now.
          </p>
          <a
            href="tel:+19195335666"
            className="inline-flex items-center justify-center gap-2 bg-[#EB1717] hover:bg-[#C41313] text-white font-bold text-lg py-4 px-8 rounded-lg transition-colors mb-4 w-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
            </svg>
            Call (919) 533-5666
          </a>
          <a
            href="/"
            className="block text-sm text-[#4E4E4E] hover:text-black underline"
          >
            ← Back to home
          </a>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
