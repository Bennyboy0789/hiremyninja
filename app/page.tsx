import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-white">
      <Image
        src="/crawlspace ninja logo 1.png"
        alt="Crawl Space Ninja"
        width={323}
        height={156}
        priority
        className="w-[min(80vw,640px)] h-auto"
      />
    </div>
  );
}
