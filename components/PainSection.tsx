const signs = [
  {
    icon: "👃",
    heading: "Musty Smell in Your Home",
    body: "That damp, earthy odor coming through your floors isn't just unpleasant — it means mold spores and moisture are actively moving into your living space. Up to 50% of the air you breathe indoors comes from your crawl space.",
  },
  {
    icon: "💸",
    heading: "Energy Bills That Keep Climbing",
    body: "An unencapsulated crawl space lets conditioned air escape and humid air in, forcing your HVAC to work overtime. Most Raleigh homeowners see a 15–20% drop in energy costs after encapsulation.",
  },
  {
    icon: "🏚️",
    heading: "Soft Spots or Sagging Floors",
    body: "Moisture in your crawl space slowly rots floor joists and beams. If your floors feel springy or you notice doors that suddenly don't close right, the structure beneath your home may already be compromised.",
  },
];

export default function PainSection() {
  return (
    <section className="py-14 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-black mb-2">
            Your Crawl Space Is Affecting Your Entire Home
          </h2>
          <p className="text-[#4E4E4E] max-w-xl mx-auto">
            These are the most common signs Raleigh homeowners ignore — until the
            repair bill is two or three times what it could have been.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {signs.map((s) => (
            <div key={s.heading} className="bg-[#F0F0F0] rounded-2xl p-6">
              <div className="text-4xl mb-3">{s.icon}</div>
              <h3 className="font-extrabold text-black text-lg mb-2">{s.heading}</h3>
              <p className="text-sm text-[#4E4E4E] leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#calculator"
            className="inline-block bg-[#EB1717] hover:bg-[#C41313] text-white font-extrabold px-8 py-4 rounded-lg transition-colors"
          >
            Get My Free Estimate →
          </a>
        </div>
      </div>
    </section>
  );
}
