import Image from "next/image";

export default function SiteFooter() {
  return (
    <footer className="bg-black text-white py-10 px-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-12">
        <div className="flex-shrink-0">
          <Image
            src="/crawlspace ninja logo 1.png"
            alt="Crawl Space Ninja"
            width={140}
            height={67}
            className="h-14 w-auto brightness-200"
          />
        </div>

        <div className="text-sm text-gray-300 text-center sm:text-left">
          <p className="font-semibold text-white mb-1">Crawl Space Ninja — Raleigh, NC</p>
          <p>508 Hollymont Dr, Holly Springs, NC 27540</p>
          <a
            href="tel:+19195335666"
            className="text-[#EB1717] font-bold hover:underline"
          >
            (919) 533-5666
          </a>
          <p className="mt-3 text-gray-500 text-xs">
            Serving Raleigh · Cary · Apex · Wake Forest · Garner · Knightdale
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-gray-800 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} Crawl Space Ninja. All rights reserved.
      </div>
    </footer>
  );
}
