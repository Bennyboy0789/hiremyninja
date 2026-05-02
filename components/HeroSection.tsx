export default function HeroSection() {
  return (
    <section className="relative bg-black text-white py-20 px-4 overflow-hidden min-h-[520px] flex items-center">
      {/* background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/crawl space encapsultion.jpg')" }}
      />
      {/* dark overlay so text stays readable over any photo */}
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative w-full max-w-4xl mx-auto text-center">
        <div className="inline-block bg-[#EB1717] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-5">
          Raleigh, NC
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-5">
          Find Out What Your{" "}
          <span className="text-[#EB1717]">Crawl Space Repair</span> Will Cost
          — In 60 Seconds
        </h1>

        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Serving Raleigh, Cary, Apex, Wake Forest, Garner &amp; Knightdale.
          No salesperson. No pressure. Just an honest price range built around
          your home.
        </p>

        <a
          href="#calculator"
          className="inline-block bg-[#EB1717] hover:bg-[#C41313] text-white font-extrabold text-lg px-10 py-4 rounded-lg shadow-lg transition-colors"
        >
          Get My Free Estimate →
        </a>

        <p className="mt-4 text-sm text-gray-400">
          Takes about 60 seconds · No commitment required
        </p>

        <p className="mt-5 text-sm text-gray-400">
          Or call us now:{" "}
          <a
            href="tel:+19195335666"
            className="text-white font-semibold hover:text-[#EB1717] transition-colors underline underline-offset-2"
          >
            (919) 533-5666
          </a>
        </p>
      </div>
    </section>
  );
}
