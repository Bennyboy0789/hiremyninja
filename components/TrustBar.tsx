const trust = [
  { icon: "⭐", stat: "700+", label: "5-Star Google Reviews" },
  { icon: "🏅", stat: "Lifetime", label: "Warranty" },
  { icon: "🛡️", stat: "BBB", label: "Accredited Business" },
  { icon: "✅", stat: "Licensed", label: "& Insured" },
  { icon: "🏠", stat: "15 Years", label: "Track Record" },
];

export default function TrustBar() {
  return (
    <section className="bg-[#F0F0F0] border-b border-gray-200 py-5 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-5 gap-4">
        {trust.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="text-2xl">{item.icon}</span>
            <div>
              <div className="font-extrabold text-black text-sm leading-tight">
                {item.stat}
              </div>
              <div className="text-xs text-[#4E4E4E] leading-tight">
                {item.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
