# AY.W-A11Y-PERF — DELTA: W55 default-engage · webkit prefix in dist · rAF-coalesced specular · nested-backdrop budget · translucent-plate oracle

**Wave:** W-A11Y-PERF — the five disjoint root-fixes O-1…O-5.

**Gates (all GREEN):** `tests-visual/adaptive-glass.spec.ts` (G1, extended) ·
`proof:webkit-backdrop` (G2) · `tests-visual/specular-coalesce.spec.ts` (G3) ·
`tests-visual/nested-backdrop-budget.spec.ts` / `proof:nested-backdrop-budget` (G4) ·
`scripts/proof-dark-semantic-contrast.mjs` (G5, re-derived) + `proof:adaptive-glass` +
`proof:glass-cohesion` (adjacent, stay green) + `proof:live-verified-ledger` (this DELTA).

---

## O-1 — engage W55 by default (the G2 floor, live with zero consumer opt-in)

**The engine reality found + fixed:** CSS `@container style()` NEVER self-matches
(device-verified on Chrome 148) — setting `--glass-backdrop: light` on a `.glass-*`
rung darkens its DESCENDANTS, not the rung's OWN plate. AND the `:root` library default
is `--glass-backdrop: dark`, so a `@container style(--glass-backdrop: dark)` revert would
ALWAYS fire (every element has the dark `:root` as an ancestor). So the **overlay band
(`.glass-floating` / `.glass-overlay` — Dialog/Sheet/Popover/DropdownMenu/HoverCard/
Command/Tooltip/Toast/Select-content) SELF-ENGAGES the W55 darken UNCONDITIONALLY** via
a `:where(.glass-floating, .glass-overlay)` companion that re-points the SAME oklab tint
tokens (zero new compositing seam) — a floating surface floats over arbitrary,
frequently light, content (the canonical G2 case the user reported).

**Measured (π readback over synthetic white, no injected bucket):**

| surface | HEAD (no default bucket) | post-O-1 (default-engaged) | translucent? |
|---|---|---|---|
| `.glass-floating` | bg L 0.985, ~1.2:1 (G2 collapse) | bg L 0.82, tint 18%, **11.12:1** | ✓ (white shows through) |
| `.glass-overlay` | same collapse | **11.01:1** | ✓ |

The dock keeps `--glass-backdrop: light` on its shell (descendant reach + consumer
override) + the W55 `@container` ancestor engagement (the existing opt-in arm's
before/after delta) + the morph-interp resting-endpoint tint now composes the oklab axis
so the bright bucket reaches the LIVE `.variant-dock` surface when a page/consumer marks
the ancestor. The dock's default-engage-without-an-ancestor is the documented residual
(the live dock needs a page-level `--glass-backdrop: light`, which the page-redesign W60
wires) — recorded per the spec's G1-miss named successor.

The W55 **default-path byte-identity canary STAYS GREEN** (it tests glass-card/glass-
resting/glass-dock with a bare no-ancestor div; the overlay-band self-engage is scoped
OFF those KINDS) and the existing synthetic-opt-in arm stays green (the dock arm reverted
to the ancestor model). The `:root --glass-tint-strength: 0%` rest token + the in-srgb
`--surface-tint-*` family are UNTOUCHED.

## O-2 — the `-webkit-backdrop-filter` prefix in the SHIPPED dist (G2)

`vite.style-assets.ts publishStyleAssets()` gains a build pass that injects the
`-webkit-backdrop-filter:` pair into every `dist/styles/*.css` `backdrop-filter:`
declaration (the source stays unprefixed — the Lightning-CSS dedup discipline; the build
adds the pair LAST). The pass EXCLUDES `@supports`/`@container` query conditions (a
nested-paren-aware value match terminated at `;`, so it never spills across a `) or (`
query operator — the corruption class caught + fixed during dev). The `@supports not`
fallback gains GUARD 2 — the webkit-only `@supports ((-webkit-backdrop-filter: blur(1px))
and (not (backdrop-filter: blur(1px))))` — closing the Safari-17 trap at the source of
the prefix.

**Measured (the build-DIFF gate over shipped dist):** HEAD `dist/styles/glass.css`:
1 webkit / 15 backdrop-filter (parity broken) → post-O-2a: **16 webkit / 16 backdrop-
filter (parity)**, both `@supports` guards present. `proof:webkit-backdrop` GREEN.

## O-3 — rAF-coalesce the specular write + cache the PRM ref (G3)

`useSpecularTracking.ts` reworked to the AV.W7 substrate pattern: ONE cached `matchMedia`
+ `change` listener at setup (not a fresh `matchMedia` per event); `onPointerMove`
snapshots the host + coords AT EVENT TIME (a correctness bug the gate CAUGHT — reading
`event.currentTarget` in the deferred rAF returned null since `currentTarget` resets
after dispatch) and schedules ONE `requestAnimationFrame`; the rAF callback does the
single `getBoundingClientRect()` + write. `onScopeDispose` cancels the rAF + removes the
listener. The "no reflow" docstring claim is corrected.

**Measured (200-event pointer sweep over a live `.glass-card` plate):**

| metric | HEAD (per-event) | post-O-3 (rAF-coalesced) |
|---|---|---|
| `getBoundingClientRect` calls | ~200 | **1** (one read per frame) |
| `matchMedia` mints during sweep | ~200 | **0** (cached listener, minted once at setup) |

## O-4 — paint containment + the nested-backdrop budget gate (G4)

`contain: paint` lands on `.glass-card` (upgrade from `layout style` → `layout style
paint`), `.glass-btn` (`paint`), and `.glass-dock` shell (`paint`) — the nested-backdrop
sample no longer escapes the box. Device-verified that `contain: paint` clips
DESCENDANTS only — the element's own rim/drop-shadow is NOT clipped.

`proof:nested-backdrop-budget` mounts the glass-Button-in-glass-Card-in-glass-Dialog
stack over a FLAT substrate (isolating the backdrop nesting from shader cost):

| metric | measured | ceiling/budget |
|---|---|---|
| nested backdrop-filter depth | **3** | ≤ 4 (recorded; a 5th layer reds) |
| frame p50 | **8.3ms** | ≤ 16.7ms (60fps) |
| frame p95 | **8.9ms** | — |
| containment | card=`content` (incl. paint), btn=`paint` | `paint` present (source ASSERT) |

(Baseline: PERF-runtime-substrates M5 Max, contained single-glass surface holds 10.2ms
p50 / 0% over 16.7ms; the nested stack stays inside it.)

## O-5 — re-derive the dark-contrast oracle for the translucent plate (G5)

`proof-dark-semantic-contrast.mjs` composites the dark page through the translucent
`--glass-bg-wash` plate (the Alert destructive surface, opacity 0.30 at `--glass-level:1`
— the worst-case most-translucent rung) to form the EFFECTIVE backdrop, then computes the
ink contrast against THAT (not the solid `--card` upper bound).

**Measured:** the destructive ink (`hsl(0 80% 60%)`) over the translucent wash plate (card
@ 0.30 over the dark-page bleed) = **4.91:1** (≥ 4.6 floor) — vs the stale solid-card
upper bound 4.6:1. In dark mode the dark page bleeding through the translucent plate
DARKENS the effective backdrop, so the light-red ink reads BETTER than the solid-card
assumption — the re-derived number is the rendered truth, and the oracle now models the
plate. (The bite: revert the compositing step → the gate reverts to the 4.6 solid-card
upper bound.)

## Captured PNGs (own-surface, {light,dark})

- `W-A11Y-PERF-overlay-band-mobile-light.png` — the default-engaged glass-floating Dialog-like surface over white, legible warm-ink text (light mode, 390-width mobile)
- `W-A11Y-PERF-overlay-band-mobile-dark.png` — same, dark mode

## Gate verdicts

- G1 `tests-visual/adaptive-glass.spec.ts` — 9 passed (5 existing incl. canary + 2 G1 default-engaged + 2 G-CLOSE captures)
- G2 `proof:webkit-backdrop` — GREEN (16/16 parity, both `@supports` guards)
- G3 `tests-visual/specular-coalesce.spec.ts` — 1 passed (200 events → 1 rect read, matchMedia cached)
- G4 `proof:nested-backdrop-budget` — 1 passed (depth 3 ≤ 4, p50 8.3ms, containment present)
- G5 `proof:dark-semantic-contrast` — PASS (4.91:1 over the translucent plate)
- adjacent: `proof:adaptive-glass` + `proof:glass-cohesion` GREEN; `vue-tsc --noEmit` 0 errors; `npm run build` green
