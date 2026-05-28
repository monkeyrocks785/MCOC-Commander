"use client";

import { useState } from "react";
import NodeSelector from "@/components/NodeSelector";
import TeamBuilder from "@/components/TeamBuilder";

const questTypes = [
  { id: "story", label: "Story Quest" },
  { id: "event", label: "Event Quest" },
  { id: "abyss", label: "Abyss of Legends" },
  { id: "necropolis", label: "Necropolis" },
  { id: "battlegrounds", label: "Battlegrounds" },
];

export default function QuestBuilderPage() {
  const [questType, setQuestType] = useState("story");
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);

  return (
    <div className="flex-1">
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[var(--marvel-dark)] to-[var(--marvel-black)] px-4 py-8 md:px-6">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[var(--class-tech)] blur-[120px] opacity-10" />
        <div className="mx-auto max-w-7xl relative">
          <h1 className="font-heading text-3xl font-bold text-[var(--marvel-white)] animate-fade-in-up">Quest Team Builder</h1>
          <p className="mt-1 text-sm text-[var(--marvel-light-gray)] animate-fade-in stagger-2">
            Select quest type and nodes to get champion recommendations
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <div className="mb-6">
          <h2 className="mb-3 font-heading text-sm font-bold uppercase tracking-wider text-[var(--marvel-light-gray)]">
            Quest Type
          </h2>
          <div className="flex flex-wrap gap-2">
            {questTypes.map((qt) => (
              <button
                key={qt.id}
                onClick={() => setQuestType(qt.id)}
                className={`rounded-lg px-5 py-2.5 font-heading text-sm font-semibold uppercase tracking-wider transition-all ${
                  questType === qt.id
                    ? "bg-[var(--marvel-red)] text-white shadow-[var(--shadow-glow-red)]"
                    : "glass text-[var(--marvel-light-gray)] hover:text-[var(--marvel-white)]"
                }`}
              >
                {qt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-[var(--marvel-light-gray)]">
              Node Modifiers
            </h2>
            {selectedNodes.length > 0 && (
              <button
                onClick={() => setSelectedNodes([])}
                className="text-xs text-[var(--marvel-light-gray)] transition-colors hover:text-[var(--marvel-red)]"
              >
                Clear ({selectedNodes.length})
              </button>
            )}
          </div>
          <NodeSelector selected={selectedNodes} onChange={setSelectedNodes} />
        </div>

        <TeamBuilder selectedNodes={selectedNodes} />
      </section>
    </div>
  );
}
