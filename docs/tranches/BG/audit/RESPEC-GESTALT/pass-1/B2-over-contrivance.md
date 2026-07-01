# LENS B2 — Over-contrivance in the shipped machine

**Audit:** RESPEC-GESTALT pass-1 · **Branch:** tranche/BG · **HEAD:** 976dc890 · **Date:** 2026-07-01
**Charge:** the user's verdict names *"over contrivance"* as a first-order failure. This lens tests the specific hypothesis that **the MACHINE grew instead of the product** — that verification apparatus, ceremony gates, single-consumer primitives, and speculative opt-in axes accreted faster than user-visible value.

---

## VERDICT

The hypothesis is confirmed on disk, hard. glass-ui ships **360 `proof-*.mjs` gate scripts totalling 127,269 lines of code** — a verification machine roughly the size of a mid-sized application, guarding a component library. The gate corpus grew at a cadence of **~1 gate per wave**: the biggest gate (`proof-animation-coherence.mjs`) is 1,284 lines; the top-14 gates alone exceed 11,000 lines. **202 of 360 gates (56%) carry "born-RED" self-test theater** and **172 (48%) carry a "self-test bite"** — the gate proving *itself* rather than the product. **97 gates (27%) assert a `docs/tranches/*` audit document EXISTS** — process-about-process. A hard subset (~35 gates) lock nothing a user can see: they lock JSON-register dispositions, doc-completeness of coordination relays, and the immutable history of already-shipped tranches.

The primitive surface tells the same story from the src side. The **≥2-consumer bar is structurally gamed** by a `docs/consumer-evidence/` mechanism (31 booking docs) that counts *opt-in-default-false couplings* and *booked future sibling-repo consumers* as real consumers — and at least one booking doc (`use-haptic.md`) **lies**: it claims two live couplings that do not exist on disk (`grep pulse( ` in the two named files returns nothing). Three primitives are outright orphans: `useVizChoreography` (defined, never exported, zero imports), `useHaptic` (barrel-exported, zero call-sites), `useCelebrationBurst` (zero demo/component consumers). Multiple opt-in axes have **zero opt-ins** in the entire demo corpus: `:duotone`, `:pressable`, `:liquid`, and `warpMode:"curl"` as a live prop.

This is the mechanical signature of the user's charge. The fix is not more gates — it is a **family-consolidation of the gate corpus (360 → ~50 family gates)**, a **retirement of the closed-tranche and register-lock ceremony**, a **prune of orphan/opt-in-dead primitives**, and an **amendment to the ≥2-consumer precept** so the gaming vector (booked + default-off couplings, self-attested in an unverified markdown doc) is closed.

---

## FINDINGS (ranked by severity)

### F1 — The gate machine is 127K LOC / 360 scripts, growing ~1-per-wave (CRITICAL, systemic)
`ls scripts/proof-*.mjs | wc -l` → **360**. `cat scripts/proof-*.mjs | wc -l` → **127,269**. The registry (`scripts/gates.mjs`) is itself **2,640 lines** carrying **378 gate rows** (`package.json` exposes **379** `proof:*` npm scripts). Size distribution (`wc -l … | sort -rn`):
- `proof-animation-coherence.mjs` 1,284 · `proof-no-gray.mjs` 949 · `proof-no-layout-animation.mjs` 934 · `proof-ba-gestalt.mjs` 906 · `proof-motion-one-clock.mjs` 881 · `proof-dock-animation-live.mjs` 853 · `proof-suffuse.mjs` 789 · `proof-button-glass.mjs` 782 · `proof-storybook-meta.mjs` 773 · `proof-live-verified-ledger.mjs` 771.

The mean gate is ~353 lines. A component library does not need a 127K-line proof engine; the ratio of verification-code to product-code is inverted. This is the load-bearing evidence for "the machine grew instead of the product."

### F2 — Per-family gate explosion: dock=39, blob=19, aurora=18, glass=15 (CRITICAL)
Clustering the corpus by leading noun (`ls scripts/proof-*.mjs | sed -E 's|.*proof-([a-z]+).*|\1|' | sort | uniq -c | sort -rn`):
```
39 dock   19 blob   18 aurora   15 glass   14 no(-gray/-layout/…)   8 viz   7 motion
 7 constellation   6 demo   5 liquid   4 page   4 card   4 adaptive   3 spring   3 scroll
```
**Thirty-nine dock gates.** `proof:dock-opacity-lockstep`, `dock-a11y-contract`, `dock-vocabulary`, `dock-region-model`, `dock-perfection`, `dock-unify`, `dock-rail-hairline`, `dock-no-scale-pop`, `dock-tap-integrity`, `dock-taxonomy`, `dock-contextual-layers`, `dock-fission`, `dock-gallery`, `dock-sections`, `dock-context`, `dock-morph-insitu`, `dock-morph-family`, `dock-cockpit`, `dock-stack-rail`, `dock-rail-realize`, `dock-plate-clearance`, … Each wave that touched the dock minted a fresh gate rather than extending the family gate. Nineteen blob gates and eighteen aurora gates for two viz components. This is per-wave granularity fossilized into permanent CI cost.

### F3 — Ceremony gates that lock process-about-process (HIGH)
A hard subset locks nothing user-visible. Verified by reading:
- **Closed-tranche history locks** (immutable past, still in the corpus): `proof-au-final.mjs`, `proof-au-w0-reground.mjs`, `proof-au-w1-design.mjs`, `proof-au-w9-consumers.mjs`, `proof-ay-final.mjs`, `proof-ay-w0-reground.mjs`, `proof-az-final.mjs`, `proof-az-reflect.mjs`, `proof-ba-final.mjs`, `proof-bc-fold-ledger.mjs`, `proof-be-bf-ledger.mjs`, `proof-bg-deferred-ledger.mjs` — **13 gates** guarding tranches that are already shipped and cannot change.
- **Register/disposition/lineage locks**: `proof-nda-decided.mjs` (locks that a JSON row stays `retired` forever — read head: "LOCKS that terminal decision … a flip back to `book` … REDs the lock"), `proof-disposition-live.mjs`, `proof-lineage-probe.mjs`, `proof-crossrepo-asks.mjs` (locks that a coordination *markdown doc* covers every ask — "the no-silent-drop law holds: the relay covers EVERY §A3 by-name ask"), `proof-precept-current.mjs` (398 lines locking that a doc home-map matches the cascade), `proof-claude-structure-sync.mjs`. **~19 register/doc-completeness locks.**
- **Doc-existence assertions**: 97 gates read a `docs/tranches/[A-Z]` path and assert it resolves on disk. Many are the "anti-evasion floor" pattern (a PASS with a missing capture is forbidden) — legitimate for live-π gates, but for structural waves it reduces to "did the agent write the audit md."

These gates encode *governance*, not *product invariants*. They are the clearest instance of the machine auditing itself.

### F4 — The ≥2-consumer bar is structurally gamed; `docs/consumer-evidence/` is the vector (HIGH)
`docs/consumer-evidence/` holds **31 booking docs**. The mechanism: a primitive that fails the live ≥2-consumer bar ships anyway, its bar "satisfied" by (a) opt-in couplings that are default-false and byte-identical when off, and/or (b) "booked" consumers in sibling repos (foreign-tree, unverifiable here). This inverts the invariant's purpose — the bar exists to prevent substrate-without-consumer, and the doc mechanism launders exactly that.

### F5 — `use-haptic.md` consumer-evidence LIES; `useHaptic` has zero live consumers (HIGH)
`docs/consumer-evidence/use-haptic.md` claims two sited couplings: "`useDragMorph.onSnap → pulse('snap')`" and "W-DOCK-FISSION detent settle → `pulse('detent')`", citing `src/composables/motion/useDragMorph.ts` and `src/components/custom/dock/composables/useDockFission.ts`. On disk:
```
grep -rln useHaptic src/ demo/  →  only src/index.ts, src/composables/motion/core/index.ts,
                                   src/composables/motion/core/useHaptic.ts, src/api/index.ts (barrels+def)
grep -rn 'pulse(' useDragMorph.ts useDockFission.ts  →  (empty)
```
The two claimed couplings **do not exist**. `useHaptic` is defined, barrel-exported, and api-typed with **zero call-sites**. The consumer-evidence doc is unverified prose asserting couplings that were never wired — the ≥2-bar gaming made concrete, and a direct demonstration that the doc mechanism is not gate-checked against disk.

### F6 — Orphan primitives: `useVizChoreography`, `useCelebrationBurst` (HIGH)
- **`useVizChoreography`** (`src/composables/glass/useVizChoreography.ts`): `grep -rln VizChoreography src demo` returns ONLY its own definition. Not exported from any barrel, not imported anywhere, no demo. A fully dead primitive shipped in the tree.
- **`useCelebrationBurst`** (BD-era jubilance): live refs are only `src/styles/jubilance.css` (a CSS comment) and `src/api/types-extra.ts` (a type). Zero demo/component consumers; `grep 'jubilance|celebrat' demo/stories/**/*.vue` → empty.

### F7 — Opt-in axes with zero opt-ins across the entire demo (MEDIUM)
Precise demo-corpus grep:
- **`:duotone`** — 0 demo prop bindings (IconChip axis, CLAUDE.md-documented, never exercised).
- **`:pressable`** — 0 demo usage (`<Card :pressable>`, the useLiquidPress consumer-#2 — the whole reason useSpringPress "cleared" its ≥2 bar — is never shown).
- **`:liquid`** — 0 demo usage (Button refraction opt-in).
- **`warpMode:"curl"`** — never bound as a live aurora prop in demo (paper-grid uses curl internally; the aurora opt-in axis itself is unexercised).
- **`surface="veil"` / `surface="opaque"`** — self-demo only (`card.vue`, `dialog.vue`), one binding each. The 11-surface enrollment (BB.W-SURFACE-AXIS-COMPLETE) is dead weight past those two demos.
- **`.glass-deep` / deep CardTier** — demo presence is only the self-referential toggle in `glass-panel.vue`/`glass-material.vue`. No content surface actually reaches for it.

Each axis carries: a token family, an @property registration, a gate, a spec paragraph, a MIGRATION line — full ceremony for zero adoption.

### F8 — 55 registry rows are `local`-only, never binding in ci/release (MEDIUM)
`grep -c 'tags: ["local"]' scripts/gates.mjs` → **55**. These gates run in the dev inner-loop but never gate a real cut. A `local`-only structural gate that locks a single wave's token is pure ceremony with a maintenance cost and no release-time value.

---

## FOLD CANDIDATES (for the AMENDED-GESTALT-PLAN)

### FC1 — merge-waves: collapse the gate corpus 360 → ~50 FAMILY gates (the headline)
**Gestalt approach, not a patch.** The idiomatic transposition is *one gate per invariant family, parameterized by a data manifest of cases* — the pattern `proof:glass-cohesion` already gestures at (it walks an inventory). Replace the per-wave gate explosion with family gates that read a per-family CASE TABLE:
- `proof:dock` (absorbs all 39 dock-* gates → one gate iterating a `dock-cases.mjs` manifest of the region-model / a11y / morph / rail / plate-clearance / cockpit assertions).
- `proof:aurora` and `proof:blob` (18+19 → 2 gates over a viz-case manifest).
- `proof:glass` (15 → 1: level/tint/accent/depth/cohesion/cal as rows).
- `proof:motion` (motion + spring + no-layout-animation + animation-coherence + motion-one-clock → 1 family with the canon as a table).
- `proof:no-gray`, `proof:surface-axis`, `proof:suffuse` stay as single family gates (already inventory-shaped).
The self-test-bite pattern moves to ONE shared harness (`gate-selftest.mjs`) that every family gate registers its synthetic-mutation cases into — not 172 re-implementations. Target: **~50 family gates, born-RED harness run ONCE**, not per-gate in CI. This is the single highest-leverage anti-contrivance move; it directly answers "the machine grew instead of the product."

### FC2 — prune-wave: RETIRE the closed-tranche + register-lock ceremony gates
Delete (clean break, no alias): the 13 closed-tranche `au/ay/az/ba/bc/be/bg -final/-reground/-w*/-ledger/-reflect` gates (immutable history needs no live gate), and demote the register-lock gates (`nda-decided`, `crossrepo-asks`, `precept-current`, `lineage-probe`, `disposition-live`) to a SINGLE `proof:registers` gate that validates the JSON schema of the disposition/lineage registers ONCE — not five 300-400-line bespoke locks. Net: ~25 gates removed, ~1,500+ LOC of process-about-process retired. The `docs/tranches/*` doc-existence assertions move OUT of ci gates into the (already existing) reflect/ledger local-only tracker arms.

### FC3 — prune-wave: the orphan/dead-primitive prune list
RETIRE with rationale (0 live consumers, no honest ≥2 trigger):
- `useVizChoreography` — DELETE (dead, unexported, unimported).
- `useHaptic` + `docs/consumer-evidence/use-haptic.md` — DELETE the primitive OR wire the two claimed couplings for real and gate them on disk. The doc as-shipped is a false claim; either state is acceptable, the current phantom is not.
- `useCelebrationBurst` / jubilance — DECIDE: wire a real demo consumer or retire.
DECIDE (opt-in, zero demo adoption): `:duotone`, `:pressable` (+ the useLiquidPress ≥2 story it props up), `:liquid`, `warpMode:"curl"`-as-prop, the `surface` axis enrollment beyond the 2 demoed surfaces, `.glass-deep` content adoption. For each: either add a REAL demo/content consumer (advancing the product gestalt), or retire the axis (clean break). This is the primitive-side mirror of FC1.

### FC4 — plan-doc-edit: amend the ≥2-consumer precept to close the gaming vector
The invariant text must state that **the consumer count is LIVE call-sites on disk, machine-verified** — NOT (a) opt-in-default-false couplings that are byte-identical when off, and NOT (b) "booked" sibling-repo consumers behind the foreign-tree fence. The `docs/consumer-evidence/*.md` doc becomes an INPUT the family gate parses and checks against `grep` on disk (the `use-haptic.md` lie is the proof this is currently unchecked). A primitive whose only consumers are default-off or booked is `substrate-without-consumer` by definition and must be held BOOKED (unshipped) until a real consumer lands — restoring the invariant's original purpose.

### FC5 — amend-wave: demote the 55 `local`-only structural gates
Audit the 55 `local`-only rows; fold each into its family gate (FC1) or retire it. A structural invariant worth locking is worth locking at release; one that isn't release-worthy is ceremony. No structural gate should be `local`-only after FC1.

---

## Census appendix (all figures verified on disk 2026-07-01)
- 360 `proof-*.mjs`; 127,269 LOC; registry 2,640 LOC / 378 rows; 379 `proof:*` npm scripts.
- born-RED: 202/360 (56%); self-test bite: 172/360 (48%); doc-existence assert: 97/360 (27%); "zero-pixels/structural/device-free" docstring: 188/360 (52%).
- Family clustering: dock 39, blob 19, aurora 18, glass 15, no-* 14, viz 8, motion 7, constellation 7.
- `local`-only registry rows: 55.
- `docs/consumer-evidence/` bookings: 31.
- Orphans: `useVizChoreography` (0 refs), `useHaptic` (0 call-sites, phantom evidence), `useCelebrationBurst` (0 consumers).
- Zero-demo opt-in axes: `:duotone`, `:pressable`, `:liquid`, `warpMode:"curl"`(prop); self-demo-only: `surface="veil/opaque"`, `.glass-deep`.
