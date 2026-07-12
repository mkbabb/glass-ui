# BI.W-CONSTELLATION-DEDUPE — the constellation demo census + the interactive-background standard

Band B5 (substrates). The duplicative constellation demos collapse; EVERY background viz on a demo page
becomes interactive (the standard).

## §Mandate

Discharges (registry rows this wave OWNS):
- **UF-E5** — "/substrates/constellation is good, but several demos are duplicative. And the core background
  constellation must be interactive—all background visualizations in any demo page should be."
- **UF-F10 (constellation half)** — "several demos are duplicative" (constellation).
- **D-VIZ §5 G10** — the constellation demo dedup (UNOWNED by every design family; a decision artifact, not
  a prototype) + the interactive-background standard.

## §Design

Decided mechanism — D-VIZ PASS-1 §3.6 (the constellation dedup is a demo CENSUS + the named collapse plan) +
Layer 0.5 (`useRoutePointer`) as the structural interactive-background answer. NO re-litigating the field-core
architecture (W-FIELD-CORE owns the mechanism; this wave is the constellation demo surface + the standard).

- **The census + collapse plan:** enumerate the constellation demo surfaces in `demo/stories/` (the
  `constellation.vue` story exhibits + any peers), name the DUPLICATIVE set, retire the redundant exhibits,
  keep the surviving distinct ones — a recorded decision artifact (`docs/tranches/BI/audit/W-CONSTELLATION-DEDUPE-census.md`).
- **The interactive-background STANDARD:** every full-bleed background viz on a demo page reads
  `useRoutePointer` (W-FIELD-CORE's broadcaster) and feeds its own `field.setPointer()` — the canvas stays
  `pointer-events:none` (a background is not a click target), so the well/warp/wander response is SUBTLE
  (background influence ~2–6%, longer half-life). The constellation background gets its
  `constellationWellMapping` wire; the standard binds to ALL background vizzes (aurora/constellation/fourier)
  via StoryHero, not a per-story fork.
- The constellation's per-NODE integrators (`constellationWell.ts` / `constellationInteraction.ts`
  well/warp/wander) are KEPT untouched — the pointer feeds them, it does not replace them.

## §Work

- `demo/stories/substrates/constellation.vue` — remove the duplicative exhibits per the census; keep the
  surviving distinct set; wire the background exhibit to the interactive standard.
- `demo/.../StoryHero.vue` — the interactive-background standard: thread `useRoutePointer` into every
  full-bleed background viz (the constellation background gets `constellationWellMapping`); the `pointer-events:none`
  canvas stays (the broadcaster is the source).
- `docs/tranches/BI/audit/W-CONSTELLATION-DEDUPE-census.md` — the retire/keep decision artifact.
- `demo/stories/manifest.ts` — drop the folded exhibit rows (coordinate with B6 story-band IA so no folded
  member deep-link 404s without a redirect note).

## §Acceptance

Gate: **`proof:constellation-dedup`** (NEW) — the census + the interactive-background standard.
Born-RED at HEAD: the duplicative exhibits are present AND background vizzes are `pointer-events:none` with
NO broadcaster feed (dead to the pointer). GREEN here.
- CD1 — the census artifact exists on disk; the named duplicative exhibits DEFINITION-ABSENT; the surviving
  distinct exhibits present.
- CD2 — every full-bleed background viz reads `useRoutePointer` (the interactive-background standard) — a
  background viz with NO broadcaster feed REDs; the canvas stays `pointer-events:none` (no click theft).
- CD3 — the constellation per-node integrators untouched (the pointer feeds them; byte-frozen).
- Self-test bite: a planted duplicate constellation exhibit REDs; a planted background viz with no
  broadcaster wire REDs.

## §π/DELTA

`tests-visual/viz-constellation.spec.ts` (extend; LOCAL real-GPU):
- The background constellation responds to the pointer: a well/warp forms subtly on pointer-over the
  full-bleed field (not a centroid teleport); the response is subtle (2–6% influence) and reads over content.
- The deduped story: the surviving exhibits are distinct (no two demos showing the same mechanism).
- Chrome + real WebKit, both modes. Rides the W-PI-IN-CLOSE battery + the W-GESTALT-LEDGER-FILE substrate
  verdict.

## §Obligations

- **Device run (SAF-1):** the interactive-background feed over content + scrolled page on real WebKit
  (capture-phase correctness; shared with W-FIELD-CORE's broadcaster capture).
- **Cross-repo (recorded):** the constellation subpath has TWO consumers (slides + atlas — the BG note
  omitted atlas); this wave touches DEMO surfaces only (no subpath API change), so no consumer relay is owed
  — but the confirm-clause stands that BG-WS5's viz-subpath migration enrolls BOTH constellation consumers
  (slides + atlas), not slides-only. `dis:constellation-carry-confirm` seam.

## §Dispositions

- **The interactive-background standard is the discharge of "all background visualizations… should be
  interactive"** — a STANDARD (via `useRoutePointer`), not a per-viz opt-in. Terminal; a future background
  viz inherits it by construction.
- The constellation per-node integrators stay (no fold onto the field core — they are per-NODE forces, not
  pointer smoothing; the D-VIZ §4 KEEP list). Recorded.
