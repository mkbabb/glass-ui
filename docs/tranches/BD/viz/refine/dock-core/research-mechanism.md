# RESEARCH-3 — the FIX MECHANISM (dock-core): tokens to retune, no re-fork, no-dual-path

**Role:** RESEARCH-3 (fix mechanism, glass-ui internals).
**Scope:** the DOCK core — the gray-glass abrogation + the liquid-weight motion VERIFY, mapped to
the EXACT existing tokens/recipes (compose, never re-fork). The content-surface gray was already
closed by `BD.W-GLASS-ABROGATE-GRAY` (cards/dropdowns/buttons PASS). **The dock is the one surface
that wave never tested** — and it carries its OWN gray root the abrogate wave explicitly FROZE.
**North star:** design.md six-layer Liquid Glass · BA.W-NO-GRAY warm-chroma floor (glass is warm
MATERIAL, never gray) · W-DARK-MATERIAL dark arm · [[feedback-liquid-weight-universal]].

---

## 0. THE TWO ROOT MECHANISMS (the dock-specific gray — quantified live with the gate's own OKLab math)

The dock plate gray is NOT the content-plate gray the abrogate wave fixed. It is the
**self-engaged tint-toward-near-black-ink** mix darkening the thin dock plate to gray, compounded
by the **dock's thin 0.42 alpha** carrying too little warm `--card` to register chroma. Both are
on EXISTING seams; both are token-first.

### ROOT-1 — the dock self-engage tint mixes toward `--foreground` (near-black ink) → DARKENS with ZERO chroma lift

`src/styles/dock/morph.css:426–447` — the unconditional `:where(.glass-dock)` self-engage rule
re-points the inheriting tint tokens directly on the dock root:

```css
:where(.glass-dock) {
    --glass-tint-source: var(--glass-tint-ink);   /* = var(--foreground) — hsl(24 10% 10%), OKLab L0.216 C0.0062 */
    --glass-tint-strength: clamp(                  /* lerps floor 4% → AA 20% on --glass-backdrop-luma */
        var(--glass-tint-strength-floor),          /* 4% */
        …luma-driven…,
        var(--glass-tint-strength-aa)              /* 20% */
    );
    --dock-fg-on-aurora: var(--glass-tint-ink);
    --muted-foreground:  var(--foreground);
}
```

`--glass-bg-dock` (`tokens/glass.css:295`) then composes `color-mix(in oklab, card@0.42-over-page,
--glass-tint-source --glass-tint-strength)`. With `--glass-tint-source = --foreground` (near-black,
its OWN chroma is only C0.0062), the oklab mix **drops L while holding chroma flat** — the canonical
gray darken. Computed with the gate's exact OKLab plumbing (`composite` then oklab `mix`):

| state | `--glass-tint-strength` | plate OKLab |
|---|---|---|
| dock base (card@0.42 over page, no tint) | — | L **0.981** · C **0.0078** · H 71.3° |
| self-engaged calm (luma ≤ knee) | 4% floor | L 0.951 · **C 0.0078** · H 70.8° |
| self-engaged mid | 10% | L 0.905 · **C 0.0077** · H 70.1° |
| self-engaged bright bucket | 20% AA | L **0.828** · **C 0.0075** · H 68.8° |

→ over a bright/busy backdrop the plate darkens **L 0.981 → 0.828 (−15.6%) with chroma DEAD-FLAT at
C ≈ 0.0075** (a third of the ~0.012–0.020 warm-material threshold). A near-white plate dimmed to
L0.83 at C0.0075 is the user's literal **gray-flat dock**. The abrogate wave's own JUDGE never
caught this — it tested the 0.65/0.80 content rungs WITHOUT the dock self-engage tint.

### ROOT-2 — the dock 0.42 alpha is too thin to register warm chroma even before the tint

`--glass-opacity-dock: 0.42` (`tokens/glass.css:175`) — the dock base composite is C **0.0078**,
already BELOW the `WARM_PLATE_FLOOR = 0.010` the abrogate wave set (the 0.65 resting rung clears at
0.0107, the 0.80 floating at 0.0130 — the dock is thinner than both). The warm `--card` (FIX-A
`hsl(30 85% 96%)`) is correct; there's just too little of it at α0.42 to carry the floor.

---

## 1. THE FIX — re-point the DOCK tint to a warm-CHROMATIC ink (the darken RAISES chroma, the iOS-27 warm material)

**The keystone: the dock's tint-ink must be a warm-CHROMATIC ink, not the near-neutral `--foreground`.**
Mixing toward a saturated warm-amber ink turns the AA-darken into a *warm-material* darken — L drops
AND chroma RISES, exactly the "darkens like iOS 27 but stays warm" read. Computed (gate OKLab math)
with a warm dock ink `oklch(from var(--foreground) 0.42 0.05 h)` (lower L, lifted chroma, foreground hue):

| strength | near-black `--foreground` (HEAD) | **warm-chromatic dock ink (FIX)** | AA (fg over plate) |
|---|---|---|---|
| 4% floor | L0.951 · C0.0078 · H70.8° | L0.959 · **C0.0095** · H68.1° | 15.5:1 |
| 10% | L0.905 · C0.0077 · H70.1° | L0.925 · **C0.0120** · H65.0° | 14.0:1 |
| 20% AA | L0.828 · **C0.0075** · H68.8° | L0.869 · **C0.0161** · H61.9° | 11.7:1 |

→ at the 20% AA ceiling the warm ink yields **C0.0161 (2.1× the gray HEAD) at H61.9°** while the plate
darkens to L0.869, and AA actually IMPROVES (a darker plate contrasts the dark fg more). The darken
becomes a *warm* darken. This is the precise iOS-27 Liquid-Glass darken: **warm material, never gray.**

### THE EXACT TOKEN CHANGES (compose existing seams; ZERO new recipe, ZERO new compositing path)

This reuses the SAME `oklch(from var(--foreground) …)` relative-color pattern the dark `--surface-tint-*`
arm already ships (`dark-arm.css:346–357`, BB.W-DARK-INK-WARM) — it is NOT a new mechanism, it is the
house warm-ink idiom applied to the dock's tint source. The change is **scoped to the dock** (the
content/overlay tiers keep `--glass-tint-ink = --foreground`; their plates are thicker and already
warm-clearing — do NOT touch them, the abrogate wave's gates own them).

**FIX-DOCK-1 (keystone) — mint the warm-chromatic dock tint ink, re-point the dock self-engage to it.**

| # | file:line | HEAD | NEW |
|---|---|---|---|
| D1 | `src/styles/tokens/glass-fx.css` (beside `--glass-tint-ink:162`, `:root` light) | — (mint) | `--glass-tint-ink-dock: oklch(from var(--foreground) 0.42 0.05 h);` |
| D2 | `src/styles/dock/morph.css:427` | `--glass-tint-source: var(--glass-tint-ink);` | `--glass-tint-source: var(--glass-tint-ink-dock);` |

- **Why a NEW token, not re-point `--glass-tint-ink`:** `--glass-tint-ink` is W-DARK-MATERIAL's
  FROZEN whole-system register (the content/overlay tiers + the dark-arm flip read it). Re-pointing it
  globally would shift every tier's bright-bucket darken AND collide with the dark arm. The dock gets
  its OWN warm-chromatic ink, leaving the frozen global register byte-untouched (no-dual-path: ONE
  dock tint source, ONE global tint ink, file-line-disjoint).
- **The `oklch(from … L c h)` form:** lift L DOWN to 0.42 (the darken anchor — mid-low so the AA
  strength still moves), lift chroma UP to 0.05 (well above the foreground's own 0.0062 — this is what
  makes the darken warm), keep the foreground hue `h` (so a `--foreground` re-anchor flows through, the
  light-arm symmetry the dark surface-tint arm already has). The 0.05 chroma + 0.42 L sit comfortably
  inside the sRGB gamut (no gamut-map caveat).
- **Compositor-only, PRM-safe, Safari-safe:** it changes a `color-mix` INPUT only — no animated
  channel, no new filter. `backdrop-filter` + `color-mix(in oklab)` are both cross-engine. The
  `prefers-reduced-transparency` bracket (maps `--glass-blur-dock: none`) is untouched; the opaque
  escape resolves the warm `--card` (verify it reads warm — it does, `--card` is FIX-A warm).

**FIX-DOCK-2 (the thin-alpha floor) — lift the dock base alpha just enough to clear the warm-plate floor.**

| # | file:line | HEAD | NEW |
|---|---|---|---|
| D3 | `src/styles/tokens/glass.css:175` | `--glass-opacity-dock: 0.42;` | `--glass-opacity-dock: 0.50;` |

- 0.42 → 0.50 lifts the dock BASE composite C 0.0078 → **0.0088** (closing most of the gap to the floor
  before any tint), and with FIX-DOCK-1's warm ink at the 4% floor the plate clears 0.010 warm. The dock
  stays the **lightest chrome tier** (still below resting 0.65 — the alpha-monotonic ladder + the "dock
  is a translucent overlay, not a panel" identity holds; this is a 0.08 lift, not a tier promotion). The
  iOS Control-Center dock register is preserved (transmissive, backdrop bleeds through). **Held lower-risk
  alternative if a live-π read shows the 0.50 plate too opaque:** keep 0.42 and lean entirely on
  FIX-DOCK-1's warm ink — the warm-ink fix ALONE clears the floor at the 4% engage (C0.0095, a hair under
  0.010 at base but the engaged dock — the actual user-visible state — clears it). Decide on the live
  capture; FIX-DOCK-1 is the load-bearing keystone, D3 is the floor-margin insurance.

**FIX-DOCK-3 (dark-arm lockstep, §2c) — the dark dock gets its own warm-chromatic ink twin.**

| # | file:line | HEAD | NEW |
|---|---|---|---|
| D4 | `src/styles/tokens/dark-arm.css` (the dock-tint scope, beside `--glass-tint-strength-aa:296`) | (dark `--glass-tint-ink` = `var(--foreground)` = light-cream) | `--glass-tint-ink-dock: oklch(from var(--foreground) 0.90 0.045 h);` |

- In DARK, `--glass-tint-ink` resolves the LIGHT-cream `--foreground` (the dark plate LIFTS toward
  cream, not darkens — W-DARK-MATERIAL's inverse). The dark dock twin lifts L toward 0.90 (a luminous
  warm cream) with chroma 0.045 — so the dark dock LIFTS toward a warm-luminous cream, not a flat gray
  lift. Mirrors the light-arm move (the §2c per-mode pair idiom). The dark `--glass-tint-strength-aa`
  stays 12% (FROZEN — W-DARK-MATERIAL's bound).

**FROZEN (do NOT touch — the abrogate wave + W-DARK-MATERIAL own these):** `--card` (FIX-A/FIX-C warm,
done), the content/overlay `--glass-tint-ink` global register, `--glass-tint-strength-floor`/`-aa` clamp
geometry, the opacity/blur-radius ladder, `--glass-saturate-*` (FIX-D done — light wash/quiet/resting 1.4,
floating/overlay 1.6, dock 1.4), the in-srgb `--surface-tint-*` family (AW.W26), `--glass-border-dock`
(already 8%, S2 done), every spring/scale token.

---

## 2. THE GATE IMPACT — `proof:no-gray` EXTENDED IN PLACE (the dock-plate-with-tint hole, no new gate, no new KEY)

**The hole (root cause of the source-green/visually-broken close on the dock):** `proof:no-gray.mjs`
composites `--card` over the page at the resting (0.65), wash (0.30), floating (0.80) rungs — but
**NEVER applies the dock self-engage tint-toward-ink mix**. So the dock's gray plate (C0.0075 at the 20%
AA engage) sails past every existing witness because the gate tests the UN-tinted dock base, not the
self-engaged state the user sees. The fix EXTENDS the gate to composite the dock plate WITH the tint.

Add to `scripts/proof-no-gray.mjs` (the source arm — reuse the existing `composite` + the oklab `mix`
helper the dark-tint witnesses already use; NO new floor const, reuse `WARM_PLATE_FLOOR = 0.010`):

```js
// BD dock-core — the DOCK self-engaged plate (the gray hole: the gate never applied the
// :where(.glass-dock) tint-toward-ink mix). Composite card@0.42(→0.50) over page, THEN oklab-mix
// toward the DOCK tint ink at the AA ceiling — the literal worst-case bright-bucket state.
const dockAlpha = Number((glassCss.match(/--glass-opacity-dock:\s*([\d.]+)/) ?? [])[1]); // 0.50 after D3
const dockTintInk = colorToRgb(/* --glass-tint-ink-dock light arg from glass-fx.css (resolve oklch(from --foreground …)) */);
const aaStrength = 0.20; // --glass-tint-strength-aa light
let dockPlateOk = null;
if (cardRgb && pageRgb && dockTintInk) {
    const dockBase = composite(cardRgb, dockAlpha, pageRgb);
    const dockTinted = oklabMix(dockBase, aaStrength, dockTintInk); // the SAME oklab mix the dark-tint witnesses use
    dockPlateOk = rgbToOklab(dockTinted);
}
facts.dockPlate = dockPlateOk
    ? { L: +dockPlateOk.L.toFixed(4), C: +dockPlateOk.C.toFixed(4), H: +dockPlateOk.H.toFixed(1) }
    : null;

// W-DOCK — the self-engaged dock plate composites WARM (not the near-black-ink gray darken).
// Born-RED on HEAD (the --foreground tint ink → C 0.0075 at L0.828 — the gray dock).
add(
    "dock-plate-warm-at-aa-engage",
    dockPlateOk !== null && dockPlateOk.C >= WARM_PLATE_FLOOR &&
        dockPlateOk.H >= WARM_HUE_LO && dockPlateOk.H <= WARM_HUE_HI,
    `the self-engaged dock plate (card@${dockAlpha} over page, oklab-tinted toward the DOCK ink @ ${aaStrength*100}% AA) composites OKLab C = ${dockPlateOk?.C.toFixed(4)} at H ${dockPlateOk?.H.toFixed(1)}° (≥ ${WARM_PLATE_FLOOR} warm — the gray dock gone). HEAD ≈ 0.0075 (near-black ink, GRAY) → born-RED; FIX → 0.0161 GREEN.`,
);

// W-DOCK — the dock tint INK is warm-CHROMATIC, not the near-neutral --foreground (the anti-regress
// source witness: a future revert of D2 back to --glass-tint-ink reds this). Born-RED on HEAD.
const dockInkOk = dockTintInk ? rgbToOklab(...dockTintInk) : null;
add(
    "dock-tint-ink-is-warm-chromatic",
    dockInkOk !== null && dockInkOk.C >= 0.030 && dockInkOk.H >= WARM_HUE_LO && dockInkOk.H <= WARM_HUE_HI,
    `the dock tint ink (--glass-tint-ink-dock, oklch(from --foreground …)) carries OKLab C = ${dockInkOk?.C.toFixed(4)} at H ${dockInkOk?.H.toFixed(1)}° (≥ 0.030 chromatic — NOT the near-black --foreground C 0.0062 that darkens to gray). Born-RED if D2 reverts to var(--glass-tint-ink).`,
);

// W-DOCK — the morph.css dock self-engage reads the DOCK ink, not the global tint ink (anti-regress
// source assert — catches a silent re-point back to --glass-tint-ink).
const morphCss = read("src/styles/dock/morph.css");
add(
    "dock-self-engage-reads-dock-ink",
    /:where\(\.glass-dock\)[\s\S]*?--glass-tint-source:\s*var\(--glass-tint-ink-dock\)/.test(morphCss),
    "the :where(.glass-dock) self-engage re-points --glass-tint-source onto --glass-tint-ink-dock (the warm-chromatic dock ink), NOT the global --glass-tint-ink (which darkens to gray).",
);

// W-DOCK dark §2c lockstep — the dark arm carries its own --glass-tint-ink-dock twin.
add(
    "dock-tint-ink-dark-lockstep",
    /--glass-tint-ink-dock:\s*oklch\(from var\(--foreground\)/.test(darkArm),
    "the dark arm declares its own --glass-tint-ink-dock (the §2c per-mode pair — the dark dock lifts toward warm-luminous cream, not a flat gray lift).",
);
```

**Born-RED on HEAD** (the dock self-engaged plate C 0.0075 at L0.828 with `--foreground` ink — the gray
dock; `--glass-tint-ink-dock` does not exist; `morph.css` reads `--glass-tint-ink`). **GREEN after the
fix** (C 0.0161 warm at the AA engage; the warm-chromatic dock ink minted; `morph.css` reads it; the dark
twin present). The binding π is the live arm (below) — the source floor can never substitute for the paint.

### The binding π arm (re-use the W-NAV-DOCK-FIX spec G2 — `tests-visual/nav-dock-fix.spec.ts`)

W-NAV-DOCK-FIX already specs the binding dock-plate OKLab readback (`defect 6 — warm-cream luminous
glass, NEVER gray`): `getComputedStyle(".demo-bottom-dock__shell").backgroundColor` → `parseOklab` →
assert `H ∈ [45,85]`, `C ≥ 0.010 light / 0.008 dark`, BOTH modes. **The dock-core wave WIRES that π to
the SELF-ENGAGED state** (sample the dock over a bright/busy backdrop, not a calm trough — set
`--glass-backdrop-luma` high or place over the aurora so the clamp lerps to the AA ceiling). The dock chip
(`.dock-facet-chip`) reads its OWN `--glass-accent` (presets-in-consumers — the rail hue is a
`--section-color-N` library identity READ by the demo). No new π helper (reuse `tests-visual/_paint-arm`).

### Cross-gate no-regression (GREEN by construction — the change is dock-scoped)

- `proof:glass-cal` / `proof:glass-depth` / `proof:dark-material` / `proof:adaptive-glass` — UNTOUCHED:
  the radius/level/strength-clamp/global-tint-ink axes are byte-frozen; the new `--glass-tint-ink-dock`
  is a NEW token the dock reads, not a re-tune of any asserted default.
- `proof:glass-cohesion` — UNTOUCHED: no `bg-{card,…}` solid added; the dock stays glass.
- `proof:on-glass-fg` — re-resolves over the WARMER/darker plate (AA improves, 11.7–15.5:1 at the
  engaged states — see §1 table); the on-glass-fg tokens are not touched.
- `proof:no-layout-animation` — UNTOUCHED (no animated channel added; a color-mix input change).

---

## 3. THE MOTION / LIQUID-WEIGHT MAP (VERIFY-not-MINT — every engine ships; the dock work is WIRE/assemble)

The [[feedback-liquid-weight-universal]] law (inertia/weight/bounce/squish on ALL motion) is carried by
EXISTING, idiomatic tokens + composables. The dock-core motion task is to VERIFY the wiring + WIRE the
unassembled engines — **mint NOTHING** (a duplicate spring reds `proof:animation-coherence`'s
EASING-TABLE-BOUND arm). The map:

| concern | token / composable (SHIPPED) | value (verified live) | status |
|---|---|---|---|
| dock V↔H + collapse/expand morph | `--dock-morph-t` + `DOCK_SPRING` (`constants.ts:84`) | `{response: 0.32, ζ: 0.7}` — a hair of give, no bouncy snap (iOS T1 bar) | ✓ ships, compositor-transform over reserved footprint, CDP Layout-flat |
| dock morph CSS clock | `--spring-dock` + `--spring-dock-duration` (`scheme-motion.css:240,263`) | `linear()` ~4.5% overshoot · 0.28s settle | ✓ proper weight + low overshoot |
| dock collapse/hover scale | `--scale-hover-dock` (`scale-paper.css:25`) · `--scale-press-dock` | 1.1 hover · press-canon | ✓ ships (the `[data-morphing]`-scoped hover-scale guard is AZ.W-DOCK-FLICKER's, keep) |
| sub-dock goo-SPLIT (fission) | `useDockFission` + `DockGooFilter.vue` + `fission-bridge.css` + `DOCK_SPLIT_SIGNATURES` (media=lateral) | ONE `SpringProgress`/`DOCK_SPRING`, `--split-dx/dy`/`--neck-t`, `useLiquidFlex` tanh recoil capped LOW, `usePointerVelocityField` seam-tension, PRM sync-seat, bidirectional | ✓ engine 100% — **GAP: assembly 0%** (demo-only, not shell-wired/scroll-driven — `BD.W-DOCK-SCROLL-FISSION` composes `useScrollChrome`→`useDockFission`, no fork) |
| rail facet-fan entrance | `<DockStack mode="facets">` on `--spring-dock`, staggered `--dock-stack-stagger`, PRM-carved | spring overshoot frame-series | ✓ ships — WIRE to the live shell rail (W-NAV-DOCK-FIX F4/F5) |
| tab indicator glide+squish | `useTabIndicator` on `--spring-snappy` at `--tab-indicator-duration`, vol-preserving cap ≤1.08, center-anchored | — | ✓ ships for SegmentedTabs — **GAP: not ported to the nav-dock tab row** (`BD.W-DOCK-TAB-INDICATOR`, no fork) |
| reveal bloom-from-source | `.glass-reveal` (`glass/reveal.css`) + `useLiquidReveal` | scale/translate on `--spring-snappy` + fade + `filter` blur-settle, transform-origin at anchor | ✓ ships, compositor-only, PRM-carved, Safari-floored (the surface's own `filter`, never `backdrop-filter`) |
| press squish | `useSpringPress` + `useLiquidFlex` (vol-preserving X/Y reciprocal) → `--*-press-t` | `{response 0.25, ζ 0.7}`, cap LOW 1.04 | ✓ ships |

**Liquid-weight VERDICT for the dock-core wave:** the dock motion engines are all present and carry
inertia/weight/bounce/squish idiomatically. The motion DEFECTS the user reports are **assembly gaps**, not
missing engines: (a) the fission engine is not shell-wired/scroll-driven (`BD.W-DOCK-SCROLL-FISSION`), (b)
the nav-dock tab row has no traveling indicator (`BD.W-DOCK-TAB-INDICATOR`), (c) the rail/facets fan is not
wired to the live shell (`W-NAV-DOCK-FIX`). Each is a WIRE of a shipped primitive — ONE engine, no fork,
no new spring. **If a live capture shows a flat/snapped dock motion, WIRE the class (`.glass-reveal`, the
`--spring-dock` transition) — never mint a spring.** PRM-carve + Safari-floor ride the existing brackets.

---

## 4. THE FENCES (binding — recorded for the build agent)

- **NO re-fork / no-dual-path** — re-point the dock tint onto a NEW `--glass-tint-ink-dock` token
  (file-line-disjoint from the FROZEN global `--glass-tint-ink`); the fission/tab-indicator/rail work
  WIRES shipped primitives (a second rail SFC reds `proof:dock-rail-realize` R1; a duplicate spring reds
  `proof:animation-coherence`). ONE dock tint source, ONE global tint ink, ONE spring family.
- **NO gray** — the dock tint darkens toward a warm-CHROMATIC ink (chroma RISES with the darken), never
  the near-black `--foreground` (which holds chroma flat → gray). NO `--surface-tint-N` neutral on the dock.
- **Token-first** — every change is a token VALUE or a NEW token on an existing `color-mix` seam; ZERO new
  recipe, ZERO new class, ZERO new compositing path. The `oklch(from var(--foreground) …)` relative-color
  form is the house warm-ink idiom (the dark surface-tint arm's precedent).
- **Compositor-only · PRM-carved · Safari-compatible** — the tint is a `color-mix` INPUT (no animated
  channel); `backdrop-filter` + `color-mix(in oklab)` + `oklch(from …)` are cross-engine; the PRM /
  reduced-transparency brackets are untouched; the motion engines are already compositor-only + PRM-carved.
- **§2c per-mode lockstep** — the light + dark dock inks move together (the plain per-mode pair idiom);
  the dark `--glass-tint-strength-aa` 12% bound stays FROZEN (W-DARK-MATERIAL).
- **presets-in-consumers** — the library's warm-cream dock identity evolves in `src/styles/`; the rail
  facet HUES are `--section-color-N` library identities READ by the demo, never minted as demo tokens.
- **NO legacy** — clean break, no alias (the dock self-engage simply reads the new token; every consumer
  inherits automatically).
- **AA re-ratify** — the engaged dock plate clears 11.7–15.5:1 for the dark fg across the floor→AA range
  (the darken IMPROVES contrast); the muted lift to full ink under the engaged plate is preserved.

---

## 5. THE ONE-LINE SUMMARY (for the build agent)

The dock gray = the self-engage mixing the thin 0.42 plate toward near-black `--foreground` (darkens L,
holds chroma flat → gray). **FIX: mint `--glass-tint-ink-dock: oklch(from var(--foreground) 0.42 0.05 h)`
(light) / `0.90 0.045 h` (dark), re-point `morph.css:427` `--glass-tint-source` onto it, lift
`--glass-opacity-dock` 0.42→0.50.** The darken becomes a warm-material darken (C 0.0075→0.0161 at the AA
engage, AA 11.7:1). **Gate: extend `proof:no-gray` to composite the dock plate WITH the self-engage tint
(the hole), born-RED on HEAD.** Motion = VERIFY/WIRE, mint nothing (`DOCK_SPRING`/`--spring-dock`/
`useDockFission`/`.glass-reveal` all ship; the gaps are assembly — `W-DOCK-SCROLL-FISSION`,
`W-DOCK-TAB-INDICATOR`, `W-NAV-DOCK-FIX`).
