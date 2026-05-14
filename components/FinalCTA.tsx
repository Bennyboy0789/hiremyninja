interface FinalCTAProps {
  headline?: string;
  body?: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function FinalCTA({
  headline = "Ready to See Your Price?",
  body = "Takes 60 seconds. No commitment, no salesperson, no pressure.",
  ctaText = "Get My Free Estimate →",
  ctaHref = "#calculator",
}: FinalCTAProps) {
  return (
    <section className="bg-black py-14 px-4 text-center">
      <h2 className="text-3xl font-extrabold text-white mb-3">{headline}</h2>
      <p className="text-gray-400 mb-7 max-w-md mx-auto">{body}</p>
      <a
        href={ctaHref}
        className="inline-block bg-[#EB1717] hover:bg-[#C41313] text-white font-extrabold text-lg px-10 py-4 rounded-lg shadow-lg transition-colors"
      >
        {ctaText}
      </a>
      <p className="mt-5 text-sm text-gray-500">
        Or call us directly:{" "}
        <a
          href="tel:+19195335666"
          className="text-white font-semibold hover:text-[#EB1717] transition-colors"
        >
          (919) 533-5666
        </a>
      </p>
    </section>
  );
}
