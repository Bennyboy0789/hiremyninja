import Image from "next/image";
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-black shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/crawlspace ninja logo 1.png"
            alt="Crawl Space Ninja"
            width={160}
            height={77}
            priority
            className="h-12 w-auto"
          />
        </Link>

        <div className="flex items-center gap-3">
          <a
            href="tel:+19195335666"
            className="flex items-center gap-2 text-white font-semibold text-sm hover:text-red-400 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                clipRule="evenodd"
              />
            </svg>
            (919) 533-5666
          </a>
          <a
            href="#calculator"
            className="bg-[#EB1717] hover:bg-[#C41313] text-white font-bold px-4 py-2 rounded text-sm transition-colors"
          >
            Get My Free Estimate →
          </a>
        </div>
      </div>
    </header>
  );
}
