# MCOC Commander — Phase-Wise Build Plan

---

## Phase 1 — Foundation & Setup
> **Goal**: Initialize Next.js project, design system, layout, navigation

### Tasks
- [ ] Initialize Next.js 14 (App Router) project via `npx create-next-app`
- [ ] Configure Google Fonts (Rajdhani + Inter)
- [ ] Create `globals.css` — full design token system (colors, spacing, shadows, glass effects)
- [ ] Build `Navbar` component — animated, sticky, Marvel-themed with logo
- [ ] Build root `layout.tsx` — font injection, global nav, metadata/SEO
- [ ] Create 404 & loading pages

### Files
```
app/layout.tsx
app/not-found.tsx
app/loading.tsx
components/Navbar.tsx
components/Footer.tsx
styles/globals.css
public/logo.svg
```

---

## Phase 2 — Data Layer
> **Goal**: Build all static data files that power the app logic

### Tasks
- [ ] `champions.json` — 120+ champions with: name, class, tier (S/A/B/C/D), star rarity range, key abilities, immunities, best use-case, counters, awakening priority
- [ ] `masteries.json` — Full mastery tree: all masteries across 3 trees (Offense, Defense, Proficiency), point costs, stat effects, prerequisites, recommended levels
- [ ] `synergies.json` — Champion synergy pairs and team synergies with bonus descriptions
- [ ] `nodes.json` — Common quest nodes/modifiers and which champion abilities counter them
- [ ] `quests.json` — Story act map, event quest types, difficulty tiers
- [ ] `purchases.json` — In-game offers, crystal types, value ratings

### Files
```
data/champions.json
data/masteries.json
data/synergies.json
data/nodes.json
data/quests.json
data/purchases.json
```

---

## Phase 3 — Core Pages
> **Goal**: Build the main 4 feature pages with full functionality

### 3A — Dashboard (`/`)
- [ ] Animated hero banner with particle/glow effects
- [ ] Progress tier selector (Uncollected → Cavalier → Paragon → Valiant)
- [ ] Summary stat cards (Roster size, Mastery score, Spending grade)
- [ ] Feature navigation tiles with hover animations
- [ ] Tips & daily checklist section

### 3B — My Roster (`/roster`)
- [ ] Add champion modal (search, select star & rank, awakened toggle)
- [ ] Champion grid with class-colored cards and tier badges
- [ ] Filter bar: by class, tier, rank, awakened status
- [ ] Rank-up priority recommender (gaps analysis)
- [ ] localStorage persistence for roster data

### 3C — Champion Database (`/champions`)
- [ ] Searchable, filterable champion grid (150+ champs)
- [ ] Filter by: Class, Tier, Role (Attacker/Defender/Utility)
- [ ] Champion detail sheet: abilities, immunities, counters, synergy partners
- [ ] Tier list view toggle (grid vs list)
- [ ] "Add to Roster" shortcut button

### 3D — Mastery Advisor (`/masteries`)
- [ ] Visual mastery tree (3-column: Offense / Defense / Proficiency)
- [ ] Point allocator with live cost counter (Total: X / Y points spent)
- [ ] Preset builds: Standard, Suicide, Inequity, Beginner, Battlegrounds
- [ ] Trap mastery warnings
- [ ] Export summary of chosen build

### Files
```
app/page.tsx
app/roster/page.tsx
app/champions/page.tsx
app/masteries/page.tsx
components/ChampionCard.tsx
components/ChampionModal.tsx
components/MasteryNode.tsx
components/TierBadge.tsx
components/StatCard.tsx
```

---

## Phase 4 — Advanced Feature Pages
> **Goal**: Build the intelligent advisor pages

### 4A — Quest Team Builder (`/quest-builder`)
- [ ] Quest type selector (Story / Event / Abyss / Necropolis / Battlegrounds)
- [ ] Node modifier multi-select (Buffet, Poison, Power Shield, Aspect of War, etc.)
- [ ] AI-logic recommendation engine: picks best champions from roster against selected nodes
- [ ] Class advantage display with wheel visualization
- [ ] Team synergy score calculator
- [ ] "Copy Team" export

### 4B — Synergy Finder (`/synergies`)
- [ ] Champion search → displays all synergies
- [ ] Team builder mode: add 5 champs, see combined synergy score
- [ ] "Best Synergy Teams" quick picks (pre-built optimal teams)
- [ ] Synergy type tags (Attack / Defense / Utility / Health)

### 4C — Purchase Guide (`/purchase-guide`)
- [ ] Unit spending priority flowchart (Mastery Cores → Energy → Crystals)
- [ ] "Is this worth it?" offer checker
- [ ] Crystal value ratings with expected pull quality
- [ ] Monthly event guidance
- [ ] Do's and Don'ts card list with animated reveals

### Files
```
app/quest-builder/page.tsx
app/synergies/page.tsx
app/purchase-guide/page.tsx
components/TeamBuilder.tsx
components/NodeSelector.tsx
components/SynergyCard.tsx
components/PurchaseAdvisor.tsx
```

---

## Phase 5 — Polish & Deploy
> **Goal**: Finalize aesthetics, performance, SEO, and deploy

### Tasks
- [ ] Add loading skeletons & shimmer effects
- [ ] Add page transition animations
- [ ] Full responsive design (mobile-first)
- [ ] SEO: meta tags, OG images, structured titles per page
- [ ] Performance: image optimization, lazy loading
- [ ] `vercel.json` config (if needed)
- [ ] Final `npm run build` — zero errors/warnings
- [ ] Deploy to Vercel

### Files
```
vercel.json
next.config.js
public/og-image.png
```

---

## Summary Timeline

| Phase | Content | Scope |
|-------|---------|-------|
| **Phase 1** | Foundation & Setup | Layout, nav, design system |
| **Phase 2** | Data Layer | All JSON data files |
| **Phase 3** | Core Pages | Dashboard, Roster, Champions, Masteries |
| **Phase 4** | Advanced Pages | Quest Builder, Synergies, Purchase Guide |
| **Phase 5** | Polish & Deploy | Animations, SEO, Vercel deploy |

---

> **Note**: Each phase builds on the previous. Data (Phase 2) powers all feature pages (Phases 3 & 4). Approve to begin Phase 1.
