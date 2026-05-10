"use client";

import { useState, useRef } from "react";

// ---------------------------------------------------------------------------
// Pricing tables — update these to reflect actual Raleigh pricing
// ---------------------------------------------------------------------------
const SERVICES = [
  {
    id: "encapsulation",
    label: "Crawl Space Encapsulation",
    description: "Full vapor barrier & encapsulation system",
    icon: "🏠",
    perSqft: true,
    lowPerSqft: 3,
    highPerSqft: 7,
  },
  {
    id: "insulation",
    label: "Insulation",
    description: "Crawl space insulation replacement or install",
    icon: "🌡️",
    perSqft: true,
    lowPerSqft: 1.5,
    highPerSqft: 4,
  },
  {
    id: "mold",
    label: "Mold Removal",
    description: "Eco-friendly mold remediation",
    icon: "🧹",
    perSqft: true,
    lowPerSqft: 15,
    highPerSqft: 30,
  },
  {
    id: "waterproofing",
    label: "Waterproofing / Drainage",
    description: "Interior drainage system & sump pump",
    icon: "💧",
    perSqft: false,
    flatLow: 2500,
    flatHigh: 2500,
    extraLow: 1,
    extraHigh: 2,
  },
] as const;

type ServiceId = (typeof SERVICES)[number]["id"];

const CONDITIONS = [
  { value: "good", label: "Good — minor issues only", multiplier: 1.0 },
  { value: "moderate", label: "Moderate — visible damage / moisture", multiplier: 1.2 },
  { value: "poor", label: "Poor — significant damage or mold", multiplier: 1.5 },
] as const;

type Condition = (typeof CONDITIONS)[number]["value"];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function formatUSD(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function calcRange(
  selected: ServiceId[],
  sqft: number,
  condition: Condition
): [number, number] {
  const mult = CONDITIONS.find((c) => c.value === condition)!.multiplier;
  let low = 0;
  let high = 0;
  for (const id of selected) {
    const svc = SERVICES.find((s) => s.id === id)!;
    if (svc.perSqft) {
      low += svc.lowPerSqft * sqft * mult;
      high += svc.highPerSqft * sqft * mult;
    } else {
      const wSvc = svc as typeof SERVICES[3];
      low += (wSvc.flatLow + wSvc.extraLow * sqft) * mult;
      high += (wSvc.flatHigh + wSvc.extraHigh * sqft) * mult;
    }
  }
  return [Math.round(low), Math.round(high)];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function PriceCalculator() {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<ServiceId[]>([]);
  const [sqft, setSqft] = useState("");
  const [condition, setCondition] = useState<Condition | "">("");
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function toggleService(id: ServiceId) {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  function computePrice() {
    const sq = parseInt(sqft, 10);
    if (!sq || sq < 100 || !condition) return;
    const range = calcRange(selectedServices, sq, condition as Condition);
    setPriceRange(range);
    setStep(3);
  }

  function handleFiles(files: FileList | null) {
    if (!files) return;
    setPhotos((prev) => [...prev, ...Array.from(files)].slice(0, 10));
  }

  function removePhoto(idx: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError("");
    try {
      const fd = new FormData();
      fd.append("name", name);
      fd.append("phone", phone);
      fd.append("services", selectedServices.join(", "));
      fd.append("sqft", sqft);
      fd.append("condition", condition);
      fd.append("priceRange", priceRange ? `${formatUSD(priceRange[0])} – ${formatUSD(priceRange[1])}` : "");
      photos.forEach((f) => fd.append("photos", f));

      const res = await fetch("/api/submit-quote", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Submission failed");
      setStep(6);
    } catch {
      setSubmitError("Something went wrong. Please call us at (919) 533-5666.");
    } finally {
      setSubmitting(false);
    }
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <section id="calculator" className="py-16 px-4 bg-[#F0F0F0]">
      <div className="max-w-2xl mx-auto">
        {/* heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-black mb-2">
            Get Your Instant Price Estimate
          </h2>
          <p className="text-[#4E4E4E]">
            3 quick questions · takes about 2 minutes
          </p>
          <p className="text-sm text-[#4E4E4E] mt-1">
            Join 700+ Raleigh homeowners who&apos;ve used this calculator
          </p>
        </div>

        {/* progress bar */}
        {step < 6 && (
          <div className="flex gap-1 mb-8">
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  n <= step ? "bg-[#EB1717]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">

          {/* ── Step 1: Service Selection ── */}
          {step === 1 && (
            <div>
              <h3 className="text-xl font-bold text-black mb-1">
                What do you need help with?
              </h3>
              <p className="text-sm text-[#4E4E4E] mb-5">Select all that apply.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {SERVICES.map((svc) => {
                  const active = selectedServices.includes(svc.id);
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => toggleService(svc.id)}
                      className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                        active
                          ? "border-[#EB1717] bg-red-50"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <span className="text-2xl mt-0.5">{svc.icon}</span>
                      <div>
                        <div className="font-bold text-black text-sm">{svc.label}</div>
                        <div className="text-xs text-[#4E4E4E]">{svc.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* not sure option */}
              <button
                type="button"
                onClick={() => {
                  setSelectedServices(["encapsulation"]);
                  setStep(2);
                }}
                className="w-full mb-4 py-3 px-4 border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-xl text-sm text-[#4E4E4E] hover:text-black transition-all"
              >
                🤔 Not sure what I need — start with an encapsulation estimate
              </button>

              <button
                onClick={() => setStep(2)}
                disabled={selectedServices.length === 0}
                className="w-full bg-[#EB1717] hover:bg-[#C41313] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors"
              >
                Calculate My Price →
              </button>
            </div>
          )}

          {/* ── Step 2: Square Footage + Condition ── */}
          {step === 2 && (
            <div>
              <h3 className="text-xl font-bold text-black mb-5">
                Tell us about your crawl space
              </h3>
              <div className="mb-5">
                <label className="block text-sm font-semibold text-black mb-1">
                  Approximate square footage of crawl space
                </label>
                <input
                  type="number"
                  min={100}
                  max={10000}
                  value={sqft}
                  onChange={(e) => setSqft(e.target.value)}
                  placeholder="e.g. 1200"
                  className="w-full border-2 border-gray-200 focus:border-[#EB1717] rounded-lg px-4 py-3 text-black outline-none transition-colors"
                />
                <p className="text-xs text-[#4E4E4E] mt-1">
                  Not sure? Your home&apos;s square footage is a close estimate.
                </p>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-black mb-2">
                  Current crawl space condition
                </label>
                <div className="flex flex-col gap-2">
                  {CONDITIONS.map((c) => (
                    <label
                      key={c.value}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        condition === c.value
                          ? "border-[#EB1717] bg-red-50"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="condition"
                        value={c.value}
                        checked={condition === c.value}
                        onChange={() => setCondition(c.value)}
                        className="accent-[#EB1717]"
                      />
                      <span className="text-sm font-medium text-black">{c.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border-2 border-gray-300 text-black font-bold py-3 rounded-lg hover:border-gray-500 transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={computePrice}
                  disabled={!sqft || parseInt(sqft) < 100 || !condition}
                  className="flex-[2] bg-[#EB1717] hover:bg-[#C41313] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors"
                >
                  Calculate My Price →
                </button>
              </div>
            </div>
          )}

          {/* ── Step 3: Price Range ── */}
          {step === 3 && priceRange && (
            <div className="text-center">
              <h3 className="text-xl font-bold text-black mb-1">
                Your Estimated Price Range
              </h3>
              <p className="text-sm text-[#4E4E4E] mb-5">
                Based on {sqft} sq ft ·{" "}
                {CONDITIONS.find((c) => c.value === condition)?.label.split("—")[0].trim()} condition ·{" "}
                {selectedServices.map((id) => SERVICES.find((s) => s.id === id)!.label).join(", ")}
              </p>
              <div className="bg-black text-white rounded-2xl py-6 px-4 mb-2">
                <div className="text-4xl sm:text-5xl font-extrabold">
                  {formatUSD(priceRange[0])} – {formatUSD(priceRange[1])}
                </div>
              </div>
              <p className="text-xs text-[#4E4E4E] mb-4">
                This is a preliminary estimate based on typical Raleigh area pricing.
                Exact costs depend on your specific situation.
              </p>

              {/* call escape valve */}
              <p className="text-sm text-[#4E4E4E] mb-5">
                Questions about this estimate?{" "}
                <a
                  href="tel:+19195335666"
                  className="text-[#EB1717] font-semibold hover:underline"
                >
                  Call us: (919) 533-5666
                </a>
              </p>

              {/* urgency block */}
              <div className="flex items-center justify-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-5">
                <span className="text-[#EB1717] text-lg">⏱</span>
                <p className="text-sm text-[#1E293B]">
                  <strong>Our Raleigh team books 2–3 weeks out.</strong> Lock in your spot before the schedule fills.
                </p>
              </div>

              <div className="bg-[#F0F0F0] rounded-xl p-5 mb-6 text-left">
                <h4 className="font-bold text-black mb-1">
                  Want an exact quote?
                </h4>
                <p className="text-sm text-[#4E4E4E]">
                  Send us a few photos of your crawl space and we&apos;ll give you a
                  precise number — usually within 2 hours, no visit required.
                </p>
              </div>
              <button
                onClick={() => setStep(4)}
                className="w-full bg-[#EB1717] hover:bg-[#C41313] text-white font-bold py-3 rounded-lg transition-colors"
              >
                Get My Exact Quote →
              </button>
              <button
                onClick={() => setStep(2)}
                className="mt-3 text-sm text-[#4E4E4E] hover:text-black underline"
              >
                ← Adjust my inputs
              </button>
            </div>
          )}

          {/* ── Step 4: Contact Form ── */}
          {step === 4 && (
            <div>
              <h3 className="text-xl font-bold text-black mb-1">
                What&apos;s the best number to reach you?
              </h3>
              <p className="text-sm text-[#4E4E4E] mb-6">
                We&apos;ll call with your exact quote — usually within 2 hours.
              </p>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-black mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  className="w-full border-2 border-gray-200 focus:border-[#EB1717] rounded-lg px-4 py-3 text-black outline-none transition-colors"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-black mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(919) 555-0100"
                  className="w-full border-2 border-gray-200 focus:border-[#EB1717] rounded-lg px-4 py-3 text-black outline-none transition-colors"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 border-2 border-gray-300 text-black font-bold py-3 rounded-lg hover:border-gray-500 transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(5)}
                  disabled={!name || !phone}
                  className="flex-[2] bg-[#EB1717] hover:bg-[#C41313] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors"
                >
                  Add Photos →
                </button>
              </div>
              <p className="text-xs text-[#4E4E4E] text-center mt-3">
                No spam. No pressure. We&apos;ll call once to confirm your quote.
              </p>
            </div>
          )}

          {/* ── Step 5: Photo Upload ── */}
          {step === 5 && (
            <div>
              <h3 className="text-xl font-bold text-black mb-1">
                Upload crawl space photos
              </h3>
              <p className="text-sm text-[#4E4E4E] mb-1">
                A few photos help us give you the most accurate quote. Up to 10 images.
              </p>
              <p className="text-xs text-[#4E4E4E] mb-5">
                🔒 Photos are used only to prepare your quote — never shared or published.
              </p>

              {/* drop zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFiles(e.dataTransfer.files);
                }}
                className="border-2 border-dashed border-gray-300 hover:border-[#EB1717] rounded-xl p-8 text-center cursor-pointer transition-colors mb-4"
              >
                <div className="text-4xl mb-2">📷</div>
                <p className="font-semibold text-black text-sm">
                  Click to browse or drag &amp; drop photos here
                </p>
                <p className="text-xs text-[#4E4E4E] mt-1">
                  JPG, PNG, HEIC — up to 10 MB each
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </div>

              {/* previews */}
              {photos.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-4">
                  {photos.map((f, i) => (
                    <div key={i} className="relative group aspect-square">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={URL.createObjectURL(f)}
                        alt={f.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removePhoto(i)}
                        className="absolute top-0.5 right-0.5 bg-black bg-opacity-70 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {submitError && (
                <p className="text-[#EB1717] text-sm mb-3">{submitError}</p>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(4)}
                  className="flex-1 border-2 border-gray-300 text-black font-bold py-3 rounded-lg hover:border-gray-500 transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-[2] bg-[#EB1717] hover:bg-[#C41313] disabled:opacity-60 text-white font-bold py-3 rounded-lg transition-colors"
                >
                  {submitting ? "Sending…" : "Submit for Exact Quote →"}
                </button>
              </div>
              <p className="text-xs text-[#4E4E4E] text-center mt-3">
                No photos? No problem — hit Submit anyway and we&apos;ll follow up.
              </p>
            </div>
          )}

          {/* ── Step 6: Confirmation ── */}
          {step === 6 && (
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-4xl mb-5">
                ✅
              </div>
              <h3 className="text-2xl font-extrabold text-black mb-3">
                We&apos;ve Got Your Request!
              </h3>
              <p className="text-[#4E4E4E] mb-2">
                Our Raleigh team will review your photos and reach out within{" "}
                <strong className="text-black">2 business hours</strong> with
                your exact quote.
              </p>
              <p className="text-[#4E4E4E] mb-8">
                Questions in the meantime? Call us at{" "}
                <a
                  href="tel:+19195335666"
                  className="text-[#EB1717] font-bold hover:underline"
                >
                  (919) 533-5666
                </a>
                .
              </p>
              <div className="bg-[#F0F0F0] rounded-xl p-5 text-left">
                <p className="text-sm text-[#4E4E4E]">
                  <strong className="text-black">Your estimate summary:</strong>
                  <br />
                  Services: {selectedServices.map((id) => SERVICES.find((s) => s.id === id)!.label).join(", ")}
                  <br />
                  Square footage: {sqft} sq ft
                  <br />
                  Estimated range:{" "}
                  {priceRange && `${formatUSD(priceRange[0])} – ${formatUSD(priceRange[1])}`}
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
