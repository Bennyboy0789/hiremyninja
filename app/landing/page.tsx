import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-white dark:bg-black">
      <Image
        src="/crawlspace ninja logo 1.png"
        alt="Crawl Space Ninja"
        width={323}
        height={156}
        priority
      />
    </div>
  );
}
