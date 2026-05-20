"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const CONCERNS = [
  "Moisture / Standing Water",
  "Musty Smell",
  "Mold or Mildew",
  "Bugs, Pests, or Rodents",
  "Sagging or Soft Floors",
  "High Energy Bills",
  "Buying or Selling a Home",
  "General Inspection",
];

export default function LeadForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Step 1 — contact
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  // Step 2 — crawlspace details
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [concernDetail, setConcernDetail] = useState("");
  const [realEstate, setRealEstate] = useState("");
  const [heightOk, setHeightOk] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  // Step 3 — photos
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function toggleConcern(c: string) {
    setSelectedConcerns((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  }

  function handleFiles(files: FileList | null) {
    if (!files) return;
    setPhotos((prev) => [...prev, ...Array.from(files)].slice(0, 10));
  }

  function removePhoto(idx: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  }

  const step1Valid = name && phone && email && address;
  const step2Valid = (selectedConcerns.length > 0 || concernDetail) && realEstate && heightOk;

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError("");
    try {
      const fd = new FormData();
      fd.append("name", name);
      fd.append("phone", phone);
      fd.append("email", email);
      fd.append("address", address);
      fd.append("concerns", selectedConcerns.join(", "));
      fd.append("concernDetail", concernDetail);
      fd.append("realEstate", realEstate);
      fd.append("heightOk", heightOk);
      fd.append("additionalInfo", additionalInfo);
      photos.forEach((f) => fd.append("photos", f));

      const res = await fetch("/api/submit-lead", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Submission failed");

      // Fire Meta Pixel Lead event
      if (typeof window !== "undefined" && typeof (window as /* eslint-disable-next-line @typescript-eslint/no-explicit-any */ any).fbq === "function") {
        (window as /* eslint-disable-next-line @typescript-eslint/no-explicit-any */ any).fbq("track", "Lead", {
          content_name: "Crawl Space Assessment",
          content_category: "crawlspace",
        });
      }

      router.push("/thanks");
    } catch {
      setSubmitError("Something went wrong. Please call us at (919) 533-5666.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="calculator" className="py-16 px-4 bg-[#F0F0F0]">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-black mb-2">
            Get Your Free Crawl Space Assessment
          </h2>
          <p className="text-[#4E4E4E]">
            Tell us about your home — we&apos;ll reach out within 2 hours.
          </p>
          <p className="text-sm text-[#4E4E4E] mt-1">
            Join 700+ Triangle homeowners who&apos;ve trusted Crawl Space Ninja
          </p>
        </div>

        {/* progress bar */}
        {step < 4 && (
          <div className="flex gap-1 mb-8">
            {[1, 2, 3].map((n) => (
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

          {/* ── Step 1: Contact Info ── */}
          {step === 1 && (
            <div>
              <h3 className="text-xl font-bold text-black mb-1">Your contact info</h3>
              <p className="text-sm text-[#4E4E4E] mb-6">
                Step 1 of 3 — we&apos;ll use this to send your assessment.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-black mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Smith"
                    className="w-full border-2 border-gray-200 focus:border-[#EB1717] rounded-lg px-4 py-3 text-black outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(919) 555-0100"
                    className="w-full border-2 border-gray-200 focus:border-[#EB1717] rounded-lg px-4 py-3 text-black outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-black mb-1">Email Address *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full border-2 border-gray-200 focus:border-[#EB1717] rounded-lg px-4 py-3 text-black outline-none transition-colors"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-black mb-1">Property Address *</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Main St, Cary, NC 27511"
                  className="w-full border-2 border-gray-200 focus:border-[#EB1717] rounded-lg px-4 py-3 text-black outline-none transition-colors"
                />
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!step1Valid}
                className="w-full bg-[#EB1717] hover:bg-[#C41313] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors"
              >
                Next →
              </button>
              <p className="text-xs text-[#4E4E4E] text-center mt-3">
                No spam. No pressure. We&apos;ll call once to follow up.
              </p>
            </div>
          )}

          {/* ── Step 2: Crawlspace Details ── */}
          {step === 2 && (
            <div>
              <h3 className="text-xl font-bold text-black mb-1">About your crawl space</h3>
              <p className="text-sm text-[#4E4E4E] mb-6">Step 2 of 3</p>

              {/* concerns */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-black mb-2">
                  Main concern(s) in your crawl space *
                </label>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {CONCERNS.map((c) => {
                    const active = selectedConcerns.includes(c);
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => toggleConcern(c)}
                        className={`text-left px-3 py-2 rounded-lg border-2 text-sm transition-all ${
                          active
                            ? "border-[#EB1717] bg-red-50 font-semibold text-black"
                            : "border-gray-200 hover:border-gray-400 text-[#4E4E4E]"
                        }`}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
                <textarea
                  value={concernDetail}
                  onChange={(e) => setConcernDetail(e.target.value)}
                  placeholder="Describe what you're noticing in more detail (optional)..."
                  rows={3}
                  className="w-full border-2 border-gray-200 focus:border-[#EB1717] rounded-lg px-4 py-3 text-black outline-none transition-colors resize-none text-sm"
                />
              </div>

              {/* real estate */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-black mb-2">
                  Real estate transaction? *
                </label>
                <div className="flex flex-col gap-2">
                  {[
                    { value: "no", label: "No" },
                    { value: "buyer", label: "Yes — I am the buyer" },
                    { value: "seller", label: "Yes — I am the seller" },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        realEstate === opt.value
                          ? "border-[#EB1717] bg-red-50"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="realEstate"
                        value={opt.value}
                        checked={realEstate === opt.value}
                        onChange={() => setRealEstate(opt.value)}
                        className="accent-[#EB1717]"
                      />
                      <span className="text-sm font-medium text-black">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* height */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-black mb-2">
                  Is the crawl space at least 2 feet tall? *
                </label>
                <div className="flex gap-2">
                  {[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                    { value: "unsure", label: "Unsure" },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        heightOk === opt.value
                          ? "border-[#EB1717] bg-red-50"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="heightOk"
                        value={opt.value}
                        checked={heightOk === opt.value}
                        onChange={() => setHeightOk(opt.value)}
                        className="accent-[#EB1717]"
                      />
                      <span className="text-sm font-medium text-black">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* additional info */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-black mb-1">
                  Any additional information?{" "}
                  <span className="font-normal text-[#4E4E4E]">(optional)</span>
                </label>
                <textarea
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="Anything else we should know before calling..."
                  rows={3}
                  className="w-full border-2 border-gray-200 focus:border-[#EB1717] rounded-lg px-4 py-3 text-black outline-none transition-colors resize-none text-sm"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border-2 border-gray-300 text-black font-bold py-3 rounded-lg hover:border-gray-500 transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!step2Valid}
                  className="flex-[2] bg-[#EB1717] hover:bg-[#C41313] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors"
                >
                  Add Photos →
                </button>
              </div>
            </div>
          )}

          {/* ── Step 3: Photos ── */}
          {step === 3 && (
            <div>
              <h3 className="text-xl font-bold text-black mb-1">
                Add photos of your crawl space
              </h3>
              <p className="text-sm text-[#4E4E4E] mb-1">
                Step 3 of 3 — photos help us give you a more accurate assessment.
              </p>
              <p className="text-xs text-[#4E4E4E] mb-5">
                🔒 Photos are only used to prepare your assessment — never shared or published.
              </p>

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
                  JPG, PNG, HEIC — up to 10 MB each · max 10 photos
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
                  onClick={() => setStep(2)}
                  className="flex-1 border-2 border-gray-300 text-black font-bold py-3 rounded-lg hover:border-gray-500 transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-[2] bg-[#EB1717] hover:bg-[#C41313] disabled:opacity-60 text-white font-bold py-3 rounded-lg transition-colors"
                >
                  {submitting ? "Submitting…" : "Submit My Request →"}
                </button>
              </div>
              <p className="text-xs text-[#4E4E4E] text-center mt-3">
                No photos? No problem — hit Submit and we&apos;ll follow up.
              </p>
            </div>
          )}

          {/* ── Step 4: Confirmation ── */}
          {step === 4 && (
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-4xl mb-5">
                ✅
              </div>
              <h3 className="text-2xl font-extrabold text-black mb-3">
                We&apos;ve Got Your Request!
              </h3>
              <p className="text-[#4E4E4E] mb-2">
                Our team will review your info and reach out within{" "}
                <strong className="text-black">2 business hours</strong>.
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
              <div className="bg-[#F0F0F0] rounded-xl p-5 text-left text-sm text-[#4E4E4E]">
                <strong className="text-black">Your submission:</strong>
                <br />Name: {name}
                <br />Phone: {phone}
                <br />Address: {address}
                {selectedConcerns.length > 0 && (
                  <><br />Concerns: {selectedConcerns.join(", ")}</>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
