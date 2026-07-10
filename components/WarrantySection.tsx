export default function WarrantySection() {
  return (
    <section className="relative bg-[#EB1717] text-white py-20 px-4 overflow-hidden">
      {/* subtle texture overlay */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)", backgroundSize: "12px 12px" }}
      />

      <div className="relative max-w-5xl mx-auto">

        {/* top label */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white text-[#EB1717] text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            Industry-Leading Protection
          </div>

          {/* big headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 drop-shadow-lg">
            Lifetime Transferable
            <br />
            <span className="bg-black text-white px-4 py-1 rounded-lg inline-block mt-2">
              No-Mold Warranty
            </span>
          </h2>

          <p className="text-white/90 text-xl max-w-2xl mx-auto leading-relaxed">
            If mold ever returns after we encapsulate — we come back and fix it.
            <strong className="text-white"> Free. For life.</strong> No other crawl space
            company in Raleigh offers this.
          </p>
        </div>

        {/* divider */}
        <div className="border-t border-white/30 my-10" />

        {/* 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {[
            {
              icon: "🛡️",
              title: "Lifetime Coverage",
              body: "No time limit. No fine print cutoff. Mold comes back? We return and remediate at zero cost to you.",
            },
            {
              icon: "🏡",
              title: "Transfers When You Sell",
              body: "The warranty moves to the next homeowner — a documented selling point that sets your listing apart.",
            },
            {
              icon: "⚔️",
              title: "We Put It in Writing",
              body: "Most contractors offer 1-year workmanship coverage. We back every job with a promise that never expires.",
            },
          ].map((card) => (
            <div key={card.title} className="bg-black/25 backdrop-blur rounded-2xl p-7 text-left border border-white/20">
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="font-black text-white text-xl mb-2">{card.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>

        {/* bottom callout */}
        <div className="bg-black rounded-2xl px-8 py-6 text-center">
          <p className="text-white text-lg font-bold">
            🏅 Crawl Space Ninja — Home of the Lifetime Transferable No-Mold Warranty
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Ask about warranty documentation during your free assessment.
          </p>
        </div>

      </div>
    </section>
  );
}
