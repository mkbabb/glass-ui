# BB.W-METAL-SHIMMER — the brand-metal TRIAD + the parameterized shimmer sweep — DELTA

The BINDING π readback (the cardinal-lesson DELTA, captured own-surface, the AY
W-LIVE1 LOCAL-ONLY π half). Per-mechanism M1-M6 greens do NOT close this visual wave
alone (BB inv-4) — the gestalt verdict below is operative-PASS.

## Freshness header

- **Capture date**: 2026-06-17
- **HEAD sha**: `966720e53ce8e8dd62ca3baec8d7de93a1bee683` (`BB.W-GLASS-ACCENT` — the rim seam `.metal-rainbow-rim` composes; W-METAL-SHIMMER lands on it)
- **Dev box**: darwin 25.4.0 (Apple Metal GPU), demo vite dev server `:5199`
- **Chromium**: Playwright 1.60.0 (chromium-headless-new desktop 1280×800)
- **Route**: `/substrates/glass-material` (the W-GLASS-ACCENT consumer surface — the metal-triad specimen home, consumers #1 (text-clip triad) + #2 (border/rainbow rim))
- **Ground**: the pre-wave gold-only tree (`6c8eb429`) — bronze ABSENT, `gold-shimmer-slide` the live keyframe, no `--duration-metal`, no `.metal-*` utilities.

## §0 RE-GROUND drift (recorded before any edit)

The wave spec grounded its cites at `13abb3e2` and re-grounded at `6c8eb429`. **This
agent re-grounded at the CURRENT HEAD `966720e5` and found the cite-drift below:**

- **The `.1` token + recipe cluster was ALREADY LANDED at HEAD** (by a predecessor in
  the same fleet). The bronze quad (across all four cascade arms), `--duration-metal:
  6s`, `@keyframes metal-shimmer-sweep`, the `--metal-shimmer-color` channel, the
  `metal.css` partial, the `.gold-shimmer` re-point, and the `gold-shimmer-slide`
  retirement all read as the spec mandates. `@keyframes gold-shimmer-slide` is GONE
  (only `metal-shimmer-sweep` exists in `animations.css`). So this wave's primary
  remaining work was `.2` (the gate + π + DELTA + canon).
- **TWO `.1` gaps were found + fixed within the recipe-cluster bounds:**
  1. **`metal.css` was NOT `@import`-ed** in `utilities.css` (the thin @import root over
     the utilities partials) — the partial existed on disk but never compiled into the
     `/styles` bundle. Wired in right after `base-misc.css` (its `.gold-shimmer`
     sibling — both `@layer components` metal registers). The `utilities` monolith
     `order` array in `scripts/read-css-monoliths.mjs` was updated in lockstep so
     `assertMonolithImportOrder` (consumed by `proof:no-god-module`) stays sound.
  2. **`scale-paper.css` grew 519→551** from `.1`'s §13c bronze quad, tripping the
     `proof:no-god-module` ratchet (a grandfathered file may not grow past its
     baseline). REBASELINED 519→551 on the EXISTING `BOOK(BB.W-CARVE4)` row (the
     carve target unchanged — the metal triad completion recorded on the same book).
     Reported in `overBoundFiles`.
- **`--duration-seal` confirmed ABSENT** (the §0-recorded phantom — never landed, no
  retirement comment authored; the gate's M6 clause reds a re-mint).

## The gate (proof:metal-shimmer) — born-RED → GREEN

Device-free SOURCE arm, six clauses (the comment-strip + pure-detector house pattern,
mirroring `proof-glass-accent.mjs`/`proof-no-gray.mjs`):

| Clause | What it asserts | pre-wave (`6c8eb429`) | HEAD |
|---|---|---|---|
| M1 | the THREE metal quads PARALLEL across the four cascade arms (raw+alias · @theme · light-dark · dark-arm), `-deep` mode-invariant | ✗ (bronze absent from all four) | ✓ |
| M2 | bronze warm-brown METAL (OKLch hue 48-62°, chroma ≥ 0.020 STRONG_FLOOR) | ✗ (no bronze) | ✓ (C 0.072-0.112, hue 50-60°) |
| M3 | ONE metal-PARAMETERIZED keyframe (pure position, stops off `--metal-stop-*`), no per-metal fork | ✗ (gold-baked `gold-shimmer-slide` only) | ✓ |
| M4 | `gold-shimmer-slide` RETIRED everywhere + `.gold-shimmer`/`--animate-gold-shimmer` re-point onto `metal-shimmer-sweep` | ✗ (live gold-only keyframe) | ✓ |
| M5 | the PRM-static bracket — every metal `animation:` inside `@media (prefers-reduced-motion: no-preference)`, the static gradient un-bracketed | ✗ (no metal utilities) | ✓ |
| M6 | the metal family CALM (no disco token), the slow `--duration-metal` (≥6s) clock | ✗ (no `--duration-metal`) | ✓ |

**Born-RED reconstruction**: the gate run against the reconstructed pre-wave tree
(`6c8eb429`) reds with 21 violations across M1-M6 + the WIRE clause (every metal
surface absent). The `--self-test` bite arm proves each clause has teeth (a low-chroma
bronze reds M2; a gold-hue bronze reds M2; a forked `silver-shimmer-slide` reds M3; a
baked metal color in the keyframe body reds M3; a surviving `gold-shimmer-slide` reds
M4; an unconditional metal animation reds M5; a `✦`/sub-second clock reds M6). GREEN at
HEAD (`966720e5`): all six pass, the self-test passes, the WIRE clause confirms
`metal.css` is `@import`-ed.

`tags: ["local","ci","release"]` (device-free static src-scan — carries `ci` so
`proof:tag-parity` stays green + `release` for the 4.1.0 cut). The π readback below is
the LOCAL-ONLY binding visual truth, backstopped on CI by `proof:live-verified-ledger`.

## The π binding readback (the painted truth)

The three π tests PASS on the real demo, BOTH modes (light + dark):

### (a) THE THREE METALS read DISTINCT + (b) the swept sweep on the slow clock
- `.metal-gold` / `.metal-silver` / `.metal-bronze` each clip to text + paint a
  gradient (`color: transparent`, `background-clip: text`); the three gradients are
  mutually distinct.
- **silver carries the LOWEST chroma** (cool steel) < gold AND < bronze; **bronze
  carries real chroma > 0.02** (a warm metal, NOT a neutral — the W-NO-GRAY exception
  holds in the PAINT).
- `.metal-gold` runs `metal-shimmer-sweep` at the slow `--duration-metal` (≥5.5s
  measured, the 6s clock) with the 250% over-sized gradient that gives the sweep its
  sheen.
- Captures: `W-METAL-SHIMMER-triad-{light,dark}.png`, `W-METAL-SHIMMER-gestalt-{light,dark}.png`.

### (c) the border/mask swept RIM + (d) the rainbow rim
- `.metal-gold-border` / `.metal-bronze-border` each paint a `border-image` gradient (a
  swept metallic RIM, NOT a text fill — the §N6 selected-item-border consumer); the
  gold rim ≠ the bronze rim.
- `.metal-rainbow-rim` engages `--glass-accent` at a non-transparent metal hue + a
  non-zero `--glass-accent-strength` (45%), composing W-GLASS-ACCENT's rim seam (it
  does NOT re-author the rim) + the prismatic rainbow band.
- Captures: `W-METAL-SHIMMER-rim-{light,dark}.png`.

### (e) PRM-STATIC
- Under emulated `prefers-reduced-motion: reduce`, EVERY metal utility resolves
  `animation-name` WITHOUT `metal-shimmer-sweep` (the slide is GATED) AND the static
  metal gradient still PAINTS (the metal READS as metal — the load-bearing visual is
  un-bracketed). Captures: `W-METAL-SHIMMER-prm-{light,dark}.png`.

## The gestalt verdict (proof:ba-gestalt brand-metal/figures — operative-PASS)

> "Does the triad read as three DISTINCT brand metals — gold·silver·bronze — with a
> calm dignified metallic sheen, as a page, or as a flat gold-or-gray smear?"

**VERDICT: PASS (both modes).** The gestalt capture (`W-METAL-SHIMMER-gestalt-*.png`)
shows **Au** (warm gold-yellow), **Ag** (cool steel-silver), **Bz** (warm-brown bronze)
as three immediately-distinguishable brand metals — the medal triad reads. The border
rims confirm: a gold rim, a clearly-distinct warm-brown bronze rim (NOT a dark gold),
and the prismatic rainbow rim sweeping magenta→orange→amber. The bronze is polished
warm metal, never a muddy desaturated cast (the W-NO-GRAY "warm-not-tinted" bar held).
In dark mode the dark-arm-lifted bronze reads on the deep canvas without washing to
brown-grey. No disco, no sparkle — a calm slow 6s patina pass. The §Triumvirate
gamut-fidelity trigger did NOT fire (the warm-brown reads as a distinct polished metal
at the chroma floor on the first calibration).

## Fences held

- **The gold + silver quads + the `.gold-shimmer` gold READ + the PRM bracket** —
  byte-preserved (gold survives, silver survives; only the keyframe NAME generalized).
- **The `--glass-accent` rim seam** — COMPOSED, not re-authored (`.metal-rainbow-rim`
  binds the accent channel + strength; W-GLASS-ACCENT owns the rim `color-mix`/`::before`).
- **The W-NO-GRAY warm floor + the silver cool-neutral sanction** — bronze is the THIRD
  brand metal on the SAME exception (chroma ABOVE the floor); silver untouched.
- **The calm-CTA register (BA.W-GLASS-CAL)** — the metal sweep is CALM (PRM=static, slow
  6s one-pass); the disco family stays gone.
- **Sibling gates GREEN after the metal family**: `proof:no-gray` ✓, `proof:glass-cal`
  ✓, `proof:glass-accent` ✓, `proof:shadow-contract` ✓, `proof:no-god-module` ✓
  (post-rebaseline). `npm run typecheck` ✓.

## Named successors (booked, NOT in scope)

- **`<MetalBadge>`** — a per-metal animated-RIM medal/badge primitive composing
  `.metal-*-border` + the triad, once the §N6 selected-item-border + the record-badges
  accrue ≥2 component consumers (the ≥2-component-consumer bar).
- **The static metal-tint rim register** (`--glass-accent: var(--bronze)` default-off) —
  owned by the W-GLASS-ACCENT consumer roadmap (the accent channel accepting a metal
  token), NOT this wave.
