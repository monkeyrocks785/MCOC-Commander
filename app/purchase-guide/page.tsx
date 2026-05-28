"use client";

import { useState } from "react";
import PurchaseAdvisor from "@/components/PurchaseAdvisor";
import purchasesData from "@/data/purchases.json";

export default function PurchaseGuidePage() {
  const [activeTab, setActiveTab] = useState<"crystals" | "offers" | "priority">("crystals");
  const [offerInput, setOfferInput] = useState("");
  const [offerResult, setOfferResult] = useState<string | null>(null);

  const crystals = purchasesData.crystals || [];
  const offers = purchasesData.offers || [];
  const priority = purchasesData.spendingPriority || [];

  const checkOffer = () => {
    const q = offerInput.toLowerCase();
    const found = offers.find(
      (o) =>
        o.name.toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q)
    );
    if (found) {
      setOfferResult(`${found.name}: ${found.verdict} — ${found.notes}`);
    } else {
      setOfferResult("Offer not found. Check the list below.");
    }
  };

  const dosAndDonts = [
    { type: "do", text: "Buy Mastery Cores first — they are permanent power boosts" },
    { type: "do", text: "Subscribe to the Summoner Sigil for best monthly value" },
    { type: "do", text: "Save units for Cyber Weekend and 4th of July deals" },
    { type: "do", text: "Buy Nexus crystals over basics — choice is powerful" },
    { type: "do", text: "Use energy refills during grind events" },
    { type: "dont", text: "Buy Grandmaster or Premium crystals with units" },
    { type: "dont", text: "Chase featured crystals unless you are endgame" },
    { type: "dont", text: "Buy revives from the store — earn them from events" },
    { type: "dont", text: "Spend units on crystals before finishing your masteries" },
    { type: "dont", text: "Buy weekly Carl offers — they are overpriced" },
  ];

  return (
    <div className="flex-1">
      <section className="border-b border-white/10 bg-gradient-to-b from-[var(--marvel-dark)] to-[var(--marvel-black)] px-4 py-8 md:px-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-heading text-3xl font-bold text-[var(--marvel-white)]">Purchase Guide</h1>
          <p className="mt-1 text-sm text-[var(--marvel-light-gray)]">Smart spending decisions for your MCOC account</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <button
              onClick={() => setActiveTab("crystals")}
              className={`rounded-lg px-5 py-2.5 font-heading text-sm font-semibold uppercase tracking-wider transition-all ${
                activeTab === "crystals"
                  ? "bg-[var(--marvel-red)] text-white shadow-[var(--shadow-glow-red)]"
                  : "glass text-[var(--marvel-light-gray)] hover:text-[var(--marvel-white)]"
              }`}
            >
              Crystals
            </button>
            <button
              onClick={() => setActiveTab("offers")}
              className={`rounded-lg px-5 py-2.5 font-heading text-sm font-semibold uppercase tracking-wider transition-all ${
                activeTab === "offers"
                  ? "bg-[var(--marvel-red)] text-white shadow-[var(--shadow-glow-red)]"
                  : "glass text-[var(--marvel-light-gray)] hover:text-[var(--marvel-white)]"
              }`}
            >
              Offers
            </button>
            <button
              onClick={() => setActiveTab("priority")}
              className={`rounded-lg px-5 py-2.5 font-heading text-sm font-semibold uppercase tracking-wider transition-all ${
                activeTab === "priority"
                  ? "bg-[var(--marvel-red)] text-white shadow-[var(--shadow-glow-red)]"
                  : "glass text-[var(--marvel-light-gray)] hover:text-[var(--marvel-white)]"
              }`}
            >
              Spending Priority
            </button>
          </div>

          {activeTab === "crystals" && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {crystals.map((crystal) => (
                <PurchaseAdvisor key={crystal.id} crystal={crystal} />
              ))}
            </div>
          )}

          {activeTab === "offers" && (
            <div>
              <div className="glass mb-6 flex items-center gap-2 rounded-xl px-3 py-2">
                <input
                  type="text"
                  placeholder="Check an offer (e.g. 'Cyber Weekend', 'Daily Unit')..."
                  value={offerInput}
                  onChange={(e) => setOfferInput(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-[var(--marvel-white)] placeholder-[var(--marvel-light-gray)] outline-none"
                  onKeyDown={(e) => e.key === "Enter" && checkOffer()}
                />
                <button
                  onClick={checkOffer}
                  className="rounded-lg bg-[var(--marvel-red)] px-4 py-1.5 text-xs font-bold text-white font-heading uppercase tracking-wider"
                >
                  Check
                </button>
              </div>
              {offerResult && (
                <div
                  className={`mb-6 rounded-xl p-4 text-sm ${
                    offerResult.includes("Buy")
                      ? "bg-[#4CAF50]/10 border border-[#4CAF50]/30"
                      : offerResult.includes("Maybe")
                        ? "bg-[#FF9800]/10 border border-[#FF9800]/30"
                        : "bg-white/5 border border-white/10"
                  }`}
                >
                  {offerResult}
                </div>
              )}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {offers.map((offer) => (
                  <PurchaseAdvisor key={offer.id} offer={offer} />
                ))}
              </div>
            </div>
          )}

          {activeTab === "priority" && (
            <div>
              <div className="glass mb-6 rounded-xl p-5">
                <h2 className="mb-2 font-heading text-lg font-bold text-[var(--marvel-gold)]">
                  Unit Spending Priority
                </h2>
                <p className="text-sm text-[var(--marvel-light-gray)]">
                  Follow this order to maximize the value of every unit you spend.
                </p>
              </div>
              <div className="space-y-2">
                {priority.map((item) => (
                  <div
                    key={item.rank}
                    className="glass flex items-start gap-4 rounded-xl p-4 transition-all hover:bg-white/[0.04]"
                  >
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold font-heading ${
                        item.rank <= 3
                          ? "bg-[var(--marvel-red)] text-white"
                          : item.rank <= 6
                            ? "bg-[var(--marvel-gold)] text-[var(--marvel-black)]"
                            : "bg-white/10 text-[var(--marvel-light-gray)]"
                      }`}
                    >
                      {item.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-sm font-bold text-[var(--marvel-white)]">
                        {item.category}
                      </h3>
                      <p className="text-xs text-[var(--marvel-light-gray)]">{item.description}</p>
                      {"estimatedCost" in item && item.estimatedCost && (
                        <p className="mt-1 text-[11px] text-[var(--marvel-light-gray)]">
                          Est. cost: {item.estimatedCost} {item.costType}
                        </p>
                      )}
                      <p className="mt-0.5 text-[11px] italic text-[var(--marvel-light-gray)]">
                        {item.notes}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8">
          <h2 className="mb-4 font-heading text-xl font-bold text-[var(--marvel-white)]">
            Do&apos;s and Don&apos;ts
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {dosAndDonts.map((item, i) => (
              <div
                key={i}
                className={`glass rounded-xl p-4 transition-all duration-[var(--transition-normal)] hover:scale-[1.01] ${
                  item.type === "do"
                    ? "border-l-2"
                    : "border-l-2"
                }`}
                style={{
                  borderLeftColor: item.type === "do" ? "var(--class-skill)" : "var(--marvel-red)",
                }}
              >
                <div className="flex items-start gap-2">
                  <span
                    className={`mt-0.5 text-lg ${
                      item.type === "do" ? "text-[var(--class-skill)]" : "text-[var(--marvel-red)]"
                    }`}
                  >
                    {item.type === "do" ? "✓" : "✕"}
                  </span>
                  <p
                    className={`text-sm font-medium ${
                      item.type === "do" ? "text-[var(--marvel-white)]" : "text-[var(--marvel-light-gray)]"
                    }`}
                  >
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
