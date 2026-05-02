"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Will someone try to upsell me when they arrive?",
    a: "No. Our quotes are based on what we actually find — nothing more. We price the job before we start and stick to it. If something unexpected comes up, we tell you before touching it.",
  },
  {
    q: "How long does crawl space encapsulation take?",
    a: "Most jobs take 1–2 days for a standard Raleigh-area home. You don't need to vacate — we work in the crawl space, not inside your home. You can go about your day normally.",
  },
  {
    q: "How do I know if my crawl space really needs this?",
    a: "If you have any musty smell, high humidity, visible mold, soft floors, or you simply haven't had it inspected in the last 5 years, the answer is almost certainly yes. Raleigh's climate makes crawl space moisture issues extremely common.",
  },
  {
    q: "Do I need to be home during the work?",
    a: "You need to be present at the start so we can access the crawl space, but you don't need to stay. Most customers go to work and come back to a finished job.",
  },
  {
    q: "Is the estimate really free with no commitment?",
    a: "100%. The calculator gives you an instant range and our team follows up with an exact number — both are completely free. There's no obligation to book and no salesperson pressure.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-14 px-4 bg-[#F0F0F0]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-black mb-2">
            Common Questions
          </h2>
          <p className="text-[#4E4E4E]">
            Straight answers — no fluff.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
              >
                <span className="font-bold text-black text-sm sm:text-base pr-4">
                  {faq.q}
                </span>
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`w-5 h-5 text-[#EB1717] flex-shrink-0 transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-sm text-[#4E4E4E] leading-relaxed border-t border-gray-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
