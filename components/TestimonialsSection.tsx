const testimonials = [
  {
    name: "Marcus T.",
    location: "Raleigh, NC",
    text: "From the initial estimate to the final walkthrough, every step was professional and transparent. The crawl space looks completely transformed. Couldn't be happier.",
    stars: 5,
  },
  {
    name: "Edgar S.",
    location: "Cary, NC",
    text: "Worth every penny. Definitely got what I paid for — the crawlspace looks basically brand new. Very happy with the results.",
    stars: 5,
  },
  {
    name: "Cordero C.",
    location: "Apex, NC",
    text: "Caring, honest professionals. Very responsive and courteous throughout the entire process. Highly recommend to anyone in the Raleigh area.",
    stars: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 text-yellow-400 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-black mb-2">
            What Raleigh Homeowners Are Saying
          </h2>
          <p className="text-[#4E4E4E]">
            700+ five-star reviews across the Raleigh, NC area
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-[#F0F0F0] rounded-2xl p-6 flex flex-col"
            >
              <Stars count={t.stars} />
              <p className="text-[#1E293B] text-sm leading-relaxed flex-1 mb-4">
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <div className="font-bold text-black text-sm">{t.name}</div>
                <div className="text-xs text-[#4E4E4E]">{t.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
