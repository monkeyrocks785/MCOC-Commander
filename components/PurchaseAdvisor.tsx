"use client";

interface Offer {
  id: string;
  name: string;
  cost: number | null;
  costType: string;
  contents: string;
  valueRating: number;
  verdict: string;
  notes: string;
}

interface Crystal {
  id: string;
  name: string;
  type: string;
  cost: number;
  costType: string;
  description: string;
  starRange: { min: number; max: number };
  valueRating: number;
  expectedQuality: string;
  bestFor: string[];
  worstFor: string[];
  tip: string;
}

interface PurchaseAdvisorProps {
  offer?: Offer;
  crystal?: Crystal;
}

export default function PurchaseAdvisor({ offer, crystal }: PurchaseAdvisorProps) {
  const item = offer || crystal;
  if (!item) return null;

  const ratingStars = Array.from({ length: 5 }, (_, i) => i < item.valueRating);

  return (
    <div className="glass rounded-xl p-4 transition-all duration-[var(--transition-normal)] hover:shadow-[var(--shadow-card)]">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="font-heading text-sm font-bold text-[var(--marvel-white)]">{item.name}</h3>
          {"cost" in item && item.cost !== null && (
            <p className="text-xs text-[var(--marvel-light-gray)]">
              {item.cost} {item.costType}
            </p>
          )}
        </div>
        {offer && (
          <span
            className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase font-heading ${
              offer.verdict === "Buy"
                ? "bg-[#4CAF50]/20 text-[#4CAF50]"
                : offer.verdict === "Maybe"
                  ? "bg-[#FF9800]/20 text-[#FF9800]"
                  : "bg-[#F44336]/20 text-[#F44336]"
            }`}
          >
            {offer.verdict}
          </span>
        )}
      </div>

      <div className="mb-2 flex gap-0.5">
        {ratingStars.map((filled, i) => (
          <span
            key={i}
            className="text-sm"
            style={{ color: filled ? "var(--marvel-gold)" : "var(--marvel-light-gray)" }}
          >
            ★
          </span>
        ))}
        {!offer && (
          <span className="ml-2 text-[10px] text-[var(--marvel-light-gray)]">
            {crystal!.expectedQuality}
          </span>
        )}
      </div>

      <p className="mb-2 text-xs text-[var(--marvel-light-gray)]">
        {"contents" in item ? item.contents : crystal!.description}
      </p>

      {offer && (
        <p className="mb-2 text-[11px] italic text-[var(--marvel-light-gray)]">{offer.notes}</p>
      )}

      {crystal && (
        <div className="space-y-1">
          <p className="text-[10px] text-[var(--marvel-light-gray)]">
            Stars: {crystal.starRange.min}★ - {crystal.starRange.max}★
          </p>
          {crystal.bestFor.length > 0 && (
            <div className="flex flex-wrap gap-1">
              <span className="text-[9px] text-[#4CAF50]">Best: </span>
              {crystal.bestFor.map((b) => (
                <span key={b} className="rounded bg-[#4CAF50]/10 px-1 py-0.5 text-[9px] text-[#4CAF50]">
                  {b}
                </span>
              ))}
            </div>
          )}
          <p className="text-[9px] italic text-[var(--marvel-light-gray)]">Tip: {crystal.tip}</p>
        </div>
      )}
    </div>
  );
}
