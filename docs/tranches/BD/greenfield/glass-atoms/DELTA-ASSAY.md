# GLASS ATOMS — DELTA-ASSAY (golden vs current → the UNION path)

> **Badge** (+ metric-badge) · **Slider** · **IconChip** · **StackedIconGroup** — the four small
> glass atoms that ALL consume ONE shared warm-glass register. Assays the GOLDEN
> (`glass-atoms/GOLDEN.md`) against the CURRENT `src/` implementation, FOLDS the three challenge
> hardenings (`challenge/1.md`, `2.md`, `3.md`), and resolves the UNION path: the deft integration
> that evolves the current toward the golden reusing extant primitives. KISS · DRY · NO LEGACY ·
> survival of the fittest. Live-grounded 2026-06-24 — the born-RED ledger is confirmed by all THREE
> challenges independently (`getComputedStyle` over `/display/badge`, `/forms/slider`,
> `/display/stacked-icons` + grep over `src/` + read of `golden/spike.html`).

---

## 0. THE VERDICT — REFINE-dominant + 1 RE-INVENT (the stack arc) + 2 EXCISE (the `+N` hardcode, the slider default tint)

**Disposition: REFINE.** Nothing in the four atoms is broken at the architecture level. The
two-register split (loud opaque identity pill vs quiet transmissive glass lozenge) is correct, the
event plumbing (slider `useDockHold`/`useTouchGate`/invisible-thumb, IconChip reveal/bloom, badge
CVA) is FIT, and — the decisive finding — **the slider fill is NOT a flat bar**: it already carries
the W52 glass blur + `--glass-material-rim` + a `color-mix(…transparent)` toward `--slider-range-bg`,
its ONLY defect is the default TINT (`--primary` dark, `Slider.vue:225`). The golden's "re-invent the
slider material" framing oversells (challenge #1 R3, #2/#3 R2 unanimous): the material plumbing is
extant; the fix is **one default-tint flip + the new weight-train MOTION**, not a material rewrite.

The ONE genuine RE-INVENT is the **StackedIcon fan-out**: today a flat `translate-x-1.5 scale-105` on
`ease-spring-snappy` (a stiff slide) → the golden's **arc** (per-index `transition-delay` stagger +
bounded rotate on `--ease-cartoon-punch`). The TWO EXCISEs: the `+N` chip's
`bg-[color-mix(…--background…)]` + `shadow-cartoon-sm` hardcode (no-legacy), and the slider
`--primary` default tint.

**Convergence: ~74%.** The remaining 26% is build-time: the `.glass-atom` recipe (DEPENDs on the
sibling-greenfield capsule/field/edge/cartoon/motion waves, NONE of which ship at HEAD — the honest
born-RED-over-flat condition), the slider weight-train (1 new bridge composable + the consumed inert
caster), the arc, and the painted-pixel paired-engine π.

---

## 1. THE BORN-RED LEDGER (live-verified to the byte — what the current does WRONG)

All four atoms paint these defects on HEAD; all three challenges captured them identically, so they
are the gate's anchor (NOT a rubber stamp):

| # | atom | live read (HEAD) | source | golden arm |
|---|---|---|---|---|
| **B1** | Badge (loud) | every non-glass pill: `backdropFilter:none`, `boxShadow:none`, `border rgba(0,0,0,0)/1px` (transparent); `secondary` = `rgb(237,230,222)` sand → **melts into a cream panel** | `badge/index.ts` (`border-transparent` on every variant) | A2 defined-edge |
| **B2** | Slider fill | `.slider-range` bg = `oklab(0.216 0.0035 0.0052/0.88)` → L≈0.22, C≈0.006 **dark low-chroma muddy** (NOT "black" — challenge R2: the `saturate(1.4)` pulls *some* field chroma; the real defect is L+C too low) | `Slider.vue:225` (`--slider-range-bg, var(--primary)`) | A4 slider-fill-warm |
| **B3** | Slider press | `.glass-slider:active .slider-range { transform: scale(0.97) }` — **uniform shrink, not a squash** | `Slider.vue:311` | A6 squash-not-shrink |
| **B4** | metric-badge | hover `scale: 1.04` uniform + `:active scale: 0.96` uniform; hover cast `--shadow-cartoon-sm` | `utilities/components.css:7+` | A6 + A3 |
| **B5** | K5 cast (dark) | `--shadow-cartoon` mixes `var(--foreground)`; in dark `--shadow-color = --foreground` → `srgb 0.914 0.9 0.886/0.1` L≈0.90 **near-white chroma≈0 sticker-glow** | `shadow.css:9` + `literals.css` (`--shadow-color:--foreground` dark) | A3 cartoon-cast-not-white |
| **B6** | `+N` chip | `bg-[color-mix(in_srgb,var(--background)_96%,transparent)]` + `shadow-cartoon-sm`, `boxShadow` zeroed live, `backdrop:none`, `transition-delay:0s` — **flat near-white plate, hardcoded** | `StackedIconGroup.vue:36` | A1 + A3 (EXCISE the hardcode) |
| **B7** | stack fan | `group-hover/stack:translate-x-1.5 scale-105` on `ease-spring-snappy` — **flat slide, no rotate, no per-index delay** | `StackedIconGroup.vue:20-21,42-43` | A7 arc |
| **B8** | IconChip | `0 backdrop-filter` in `icon-chip.css`; no `surface` prop (glass register absent) | `icon-chip.css` / `IconChip.vue` | (owned by `BD.W-ICONCHIP-GLASS`) |

**Build-DAG honesty (grep-verified, all 3 challenges):** `.glass-capsule`=0, `.glass-chip`=0,
`.glass-atom`=0, `--motion-weight`=0, `--ease-cartoon-punch`=0, `--cartoon-ink`=0 in `src/`. The
register IS a spec, not shipped. The gate ERRORS (no-such-token), not fails, on the glass/punch arms
until the DEPENDs merge — the correct honest sequencing.

---

## 2. KEEP / REFINE / RE-INVENT / EXCISE (survival of the fittest)

### KEEP (fit — byte-untouched)
- **The two-register architecture.** Loud opaque identity pill (`default`/`destructive`/`success`/
  `warning`/`info`/section-tone, AA-ratified incl. the AY.W-PRIM-POLISH D4 dark-destructive
  deepening) vs quiet transmissive glass lozenge (`surface="glass"` opt-in). A `success` badge MUST
  NOT be see-through — all three challenges confirm this is UX-correct, not a fork.
- **The badge CVA shape** (`badgeVariants`) — the size √φ comfort ladder (`--control-text-sm`/
  `--control-text`/`--type-body × --ui-scale`), the `--ui-glyph-sm` register, `rounded-badge`. No CVA
  re-fork; no `tone` axis minted on the CVA (design.md §867 fence — the section ramp stays a consumer
  recipe via `--section-color-N`).
- **The slider event plumbing** — `useDockHold` (AX.W03 native-listener, the reka forwardRef-drop
  fix), `useTouchGate` scroll-vs-drag arbitration, the invisible-thumb (`width:0;opacity:0`, the
  fill-edge IS the handle), the `data-held` halo, the spectrum `@supports(corner-shape)` squircle +
  gradient track, the 44px `touch-hit-area::before` with `pointer-events:none` (AY.W-SCALE2). The
  greenfield touches ONLY the fill MATERIAL + the drag FEEL, never the event plumbing.
- **The slider fill MATERIAL plumbing** (challenge R3, decisive) — `.slider-range` ALREADY carries
  `backdrop-filter: var(--glass-blur-quiet)` + `box-shadow: var(--glass-material-rim), …` +
  `color-mix(in oklab, <tint> 88%, transparent)`. The blur/rim/color-mix-toward-transparent are FIT
  and EXTANT. KEEP all of it.
- **IconChip** — the `in srgb` brand-overlay plate (AW.W26 fence — NOT forced through `.accent-tone`'s
  `in oklab`), the reveal/`vReveal` + hover-bloom on `--spring-snappy`/`-smooth` (`icon-chip.css:131`,
  already alive), the `--icon-chip-glyph-ratio` chip≤glyph floor, the tone XOR section arms.
- **StackedIconGroup** — the layout (the `+N` summary is a real focusable element, the `info` slot,
  the `--stack-overlap-*` overlap tokens, the size rungs); only the `+N` MATERIAL + the fan-out MOTION
  change.
- **The cross-engine posture** — these are flat capsule lenses, NOT blobs: NO `backdrop-filter:url`,
  NO SVG goo, NO metaball, NO trig. WebKit parity is the `backdrop-filter: blur()` + `box-shadow` +
  `transform` set, all Safari-native. The meatball lens is correctly N/A (challenge #2 R4).

### REFINE (weak — evolve toward the golden)
- **Badge loud register** → add the warm keyed rim (`--glass-material-rim`, the defined edge) so the
  pill stops melting (B1); the press-squish on `:active`; **an idle SOFT cel + `data-cast`
  INTENSIFIES** (challenge #1 R5 + #3 R5 — see §4 the cast-universal reconciliation). The section-tone
  ramp tints rim/cast off the SAME `--section-color-N` it fills with.
- **Badge quiet register** → NEW `<Badge surface="glass">`: the `.glass-atom` translucent capsule
  tinted via `--glass-fill-tint`. `secondary`/`outline` route through the quiet register (where the
  warm-not-gray read is won).
- **metric-badge** → consume `.glass-atom` instead of its bespoke glass decl (DRY); hover =
  vol-preserving squash-lift (`scale: 1.05 0.96` + `translate -2px`, NOT uniform `scale 1.04`) on
  `--ease-cartoon-punch × --motion-weight`, the cast lagging ~1.15× (follow-through). The K5 dark
  white-flip (B5) is fixed UPSTREAM at the token by `BD.W-CARTOON-CEL-INK` — NO metric-badge SFC edit.
  `data-just-resolved` catch-light KEPT.
- **Slider fill** → ONE default-tint flip: the library default range tint changes from `--primary` to
  the warm `--glass-fill-tint` floor; `--slider-range-bg` stays the consumer's loud override
  (presets-in-consumers). This is a REFINE (wrong default), not a re-invention (challenge R3).
- **Slider press** → the squash (`scale: 0.98 1.03` non-uniform, the calm floor) replacing the
  uniform `scale(0.97)`.
- **`+N` chip** → a quiet `.glass-atom` capsule with the K5-fixed warm cast + press-squish (EXCISE the
  hardcode).

### RE-INVENT (broken-for-the-gestalt — the one genuine re-invention)
- **StackedIcon fan-out** (B7) → the **arc**: per-index `transition-delay` stagger + a BOUNDED rotate
  (challenge #3 R4 — fixed total sweep ≤18° across the cluster regardless of N, via
  `rotate(calc(var(--i) / var(--n) * 18deg))`, NOT per-puck local `* 2.4deg` that crooks at N>4) + a
  bounded arc lift, each puck casting its own cel as it lifts off, on `--motion-weight ×
  --ease-cartoon-punch`. The cluster breathes apart like a dealt hand.

### EXCISE (no-legacy)
- The `+N` `bg-[color-mix(…--background…)]` + `shadow-cartoon-sm` hardcode (B6) → `.glass-atom`.
- The slider `--primary` default fill tint (B2) → the warm `--glass-fill-tint` floor.
- From SCOPE: any `::before`/`::after` cel cast (the slots are OCCUPIED — `glass/material.css`
  occupies `::before` moving-specular + `::after` grain on every glass body; the slider thumb's
  `::before` is the 44px tap halo). The cast rides the inert child owned by `BD.W-CARTOON-CASTER`.

---

## 3. THE UNION MECHANISM — `.glass-atom`, ONE recipe, deft Nth consumer (no fork, no new material)

The four atoms are **three faces of one lens + one loud exception** (§GOLDEN.md §1). The union path:

**`.glass-atom` is a CONSUME-ONLY recipe** (`src/styles/glass/glass-atom.css`, `@layer components`)
that declares ZERO own glass tokens. It composes:
- `.glass-capsule` (the body — the layout-NEUTRAL lozenge `BD.W-TAB-IOS-CAPSULE` extracts: body + rim
  + floor + tint ONLY, zero padding/gap/size). **Resolves challenge #1 R6 + #2 R5 (the name-race
  fork):** `.glass-atom` is NEVER `.glass-chip` — both are PEERS that compose `.glass-capsule` (a chip
  is a SIZED consumer; an atom register is the shared recipe). `BD.W-TAB-IOS-CAPSULE` is a HARD
  DEPEND (forced order, never a build-time coin-flip). The "reuse `.glass-chip` verbatim if it lands
  first" hedge is DROPPED.
- The `--glass-fill-tint`/`-strength` per-instance plate-fill axis (extant `glass.css:399`, wired by
  `BD.W-TINTED-CHIP`) — the atom is its ≥Nth consumer, never a re-mint.
- `--glass-material-rim` (the keyed directional rim, the defined edge — `BD.W-GLASS-KEY-EDGE`).
- The warm idle floor (`--atom-tint-floor`, the dormant-tint #2 cure — **NON-self-referential**, see
  §4 R8 below).
- The cartoon cel cast via the inert `.cartoon-cast` child + `useCartoonCast`
  (`BD.W-CARTOON-CASTER`), the warm `--cartoon-ink` (`BD.W-CARTOON-CEL-INK`, K5 fix).
- The motion law: `--motion-weight × --ease-cartoon-punch` (`BD.W-MOTION-WEIGHT` +
  `BD.W-CARTOON-PUNCH`). The `:active` punch is non-uniform squash (`scale: 1.04 0.94`, widen X
  compress Y — NOT a shrink).

**Consumers (the overfit bar, honest count — challenge #1 R9):** ≥2 is cleared by **metric-badge** +
**`<Badge surface="glass">`** alone (both OWNED by this wave). Slider-fill, the `+N` chip are
additional OWNED consumers; IconChip-glass is CROSS-LINKED to `BD.W-ICONCHIP-GLASS` (counted there,
not double-counted here). Don't count "track+fill" as two.

**The slider weight-train (the headline) — composes EXTANT engines + ONE honest new bridge:**
1. **ANTICIPATION (grab):** on `pointerdown`, before value moves, the fill leading edge dips ~2px
   against the pull + compresses Y (`scale 1 0.92`).
2. **OVERLAPPING-ACTION SMEAR (pull):** the leading edge LEADS, the cel cast LAGS by `--motion-weight
   × velocity`. The fill stretches in the drag axis (vol-preserving X·Y≈1) — **morph MORE the faster
   you move, BOUNDED** (challenge #3 R3: `v_eff = tanh(k·v)` / clamp ~0.7 so the smear *saturates* —
   mass wins past a threshold; a linear-unbounded ratchet is the tight-springy failure inverted). The
   track does NOT move — only the fill + cast deform (box-INVIOLATE).
3. **FOLLOW-THROUGH (release):** the fill overshoots the final value ~22% (the punch curve's >1.0
   knot) then settles; the cast recoils LATE (1.15×). A monotonic settle = FAIL.

**The velocity bridge — ONE new small composable, named honestly (challenge #1 R2 + #2 R1, the
load-bearing refutation):** `usePointerVelocityField` is a NO-OWN-rAF push-API physics model that
returns JS refs (`PointerVec2`) and emits NO CSS var; it is built for the WebGPU/Canvas viz family
that already owns a frame loop. A slider has NO renderer. The golden's OWN spike hand-rolls a
drag-window rAF loop + `--atom-drag-v` (proving the point). So a **NEW `useDragVelocity`** is
MANDATORY, not contingent: drag-window-gated rAF (`pointerdown` opens / `pointerup` tears down),
writes `--atom-drag-v`, PRM early-returns to 0. It does NOT consume `usePointerVelocityField` (wrong
shape). `useDragMorph`/`useLiquidFlex` are named in the golden ONLY if they actually contribute to
the spring/release math — verify each is wired at build or drop the name (three names where the spike
used zero is over-claiming). This composable is in the NEW-wave deliverables (NOT EXCISE), with a
no-idle-rAF teardown unit.

**The cast carrier (challenge R1/R3 across all 3 — the spike validates a FORBIDDEN surface):** the
spike puts the cel cast on `.fill::after`; §3 mandates the inert `.cartoon-cast` child because the
pseudos are OCCUPIED. **Resolution: the cast carrier is OWNED by `BD.W-CARTOON-CASTER`** (the
cartoon-shadow amendment ships `useCartoonCast` + the inert `.cartoon-cast` child as a FAMILY
primitive, cross-engine-spiked there). The glass atoms CONSUME it; they do NOT re-spike on `::after`.
This dissolves the spike-validates-wrong-surface refutation: the surface is the sibling wave's
deliverable, not this wave's. The glass-atoms `golden/spike.html` is demoted to "motion-CURVE de-risk
only (anticipation→smear→follow-through curve, arc stagger) on standalone divs; the cast-carrier +
the velocity bridge are the sibling waves' shipped surfaces, NOT the spike's `::after`/hand-rolled
loop."

**The cast-layer promotion (challenge #2 R2 — the un-promoted-translate paint hole):** the
`.cartoon-cast` child must be a PROMOTED compositor layer (`will-change: transform`) and must NOT
inherit the fill's `backdrop-filter` (it would re-rasterize the backdrop on every translate in
Safari). It is a pure 0-blur colored-shadow layer over transparent, promoted, sibling-not-child of
the blurred fill. This contract is OWNED by `BD.W-CARTOON-CASTER` (the family caster), asserted by its
paint-fence trace arm — the glass atoms inherit it.

---

## 4. THE CHALLENGE HARDENINGS — FOLDED into the union (every refutation resolved)

| ch | refutation | resolution in the union |
|---|---|---|
| **#1 R1 / #2 R3 / #3 R1** (TOP, unanimous) | the spike de-risks the cast on `::after`, the spec forbids it | the cast carrier is `BD.W-CARTOON-CASTER`'s inert `.cartoon-cast` child (sibling deliverable, cross-engine-spiked there). The glass-atoms spike is demoted to motion-CURVE de-risk only. NOT re-spiked here. |
| **#1 R2 / #2 R1** (load-bearing) | "zero new composable" is false — `usePointerVelocityField` returns JS refs, no CSS var, no slider frame loop | NEW `useDragVelocity` is MANDATORY (not contingent); it does NOT consume the viz field. Named in §4 NEW-wave deliverables + a no-idle-rAF teardown gate. §0/§5 "zero composable" headline corrected to "the press/hover core is pure CSS; the slider train requires ONE honest new bridge." |
| **#2 R2** | the cast box-shadow translate repaints on an un-promoted child (Safari paint hole) | `BD.W-CARTOON-CASTER` owns the promotion contract (`will-change: transform`, no inherited backdrop-filter); A8b paint-fence trace on Chrome + WebKit asserts ZERO Paint/Layerize on the cast layer during smear. |
| **#1 R3 / #2 R2 / #3 R2** | the slider is REFINED (one default-tint flip), not RE-INVENTED material | §0 + §2: the fill keeps its extant blur/rim/color-mix; only the default range tint flips `--primary`→`--glass-fill-tint` floor. A4 tests the PAINTED composite (L floor AND C floor), not the isolated `getComputedStyle().backgroundColor`. §5 "black fill" → "dark low-chroma muddy fill." |
| **#3 R3** | "morph MORE the faster you move" has no upper governor → rubber-band glitch | the smear SATURATES: `v_eff = tanh(k·v)` / clamp ~0.7. A5 asserts `scaleX` delta monotone-increasing but BOUNDED (high-v sample < 1.3× mid-v, not 2×). |
| **#3 R4** | the arc `rotate` is unbounded per-index → crooks at N>4 | fixed total sweep ≤18° across the cluster regardless of N (`rotate(calc(var(--i)/var(--n) * 18deg))`); bounded arc lift; `--n` count threaded to the consumer. A7 asserts the outermost puck rotation is independent of N. |
| **#1 R5 / #3 R5** | OPT-IN cast collides with cartoon-punch-UNIVERSAL (a `success` badge with no cast is a flat sticker) | the cartoon signature is UNIVERSAL-but-GRADED: every atom gets the press-squash + a hairline warm rim-cast at rest (the family floor, satisfying §L4-universal). `data-cast` INTENSIFIES the LOUD layered-offset stamp for the flagships (metric-badge, `+N`), it does NOT introduce it. Keeps "status = information" restraint WITHOUT a zero-cartoon atom. The FIAT becomes a derivation. |
| **#1 R8** | `--accent-fill-strength: max(var(--accent-fill-strength), …)` is a self-referential CSS no-op | NON-self-referential: a separate input var. The atom computes `--accent-fill-strength: max(var(--accent-fill-strength-in, 0%), var(--atom-tint-floor))`. A gate arm asserts the idle (no-field, no-accent) atom's resolved strength ≥ `--atom-tint-floor` (12%/15%) — the floor actually fires. |
| **#1 R4 / #2 R4** | A9 cross-engine never asserts warm-not-gray on WebKit; `color-mix(…transparent)` desaturates the edge in Safari | A9 runs A1 (painted warm composite, C ≥ FIELD_FLOOR, H∈[45,85]) on **webkit** as a HARD arm. The warm mixes spec `color-mix(in oklab, <warm> X%, oklch(.9 .05 60 / 0))` (transparent-WARM, not bare `transparent`) so neither engine pulls the edge to gray-black. Self-test: a planted bare-`transparent` mix REDS the webkit warm arm. |
| **#2 R4 (stack)** | non-uniform scale on a `9999px`-radius capsule makes end-caps elliptical (naive-ellipse, transposed to 2D); rotating a backdrop-filtered disc is a WebKit re-raster cliff | the squash uses a `border-radius` that tracks the scaled box (or caps the `scaleX` delta so end-caps stay within circle tolerance); A6 asserts the end-cap aspect ≥ a ratio. The stack discs DROP `backdrop-filter` during the fan (static tint while in motion, restore at rest) OR the rotate is UA-floored via `@supports`; A9 traces a rotated-backdrop-filter disc on webkit for no per-frame re-raster. |
| **#1 R7 / #3 R6** | A5 overshoot "cross past target sampled across rAF" is flaky cross-engine | A5 is deterministic: drive the release via a fixed synthetic value transition; assert the `--ease-cartoon-punch` curve's computed output >1.0 at a FIXED progress (the curve's knot is a STATIC property, provable without sampling). The rAF sample is a soft corroborator. The painted-composite reader parses `oklab()`/`color(srgb)`/`oklch()` (the paint-arm.mjs precedent — the slider fill is emitted as `oklab()`, the `+N` as `color(srgb)`). |
| **#2 R6** | PRT cast-UP may contrast-FAIL in light (warm ink near the body L) | A2b: under PRT (and `prefers-contrast: more`) the RIM ΔL vs the OPAQUE body (not the glass body) clears ≥3:1 on the painted composite. The cast-UP is a supplement; the rim is the contract. |

---

## 5. THE BUILD-DAG (the §0 honesty — the register is NOT extant)

The amendment NEVER claims the register ships. The warm read is field- + floor- + edge- + ink-
dependent — all sibling-greenfield SPECS, none at HEAD:

- **DEPEND (HARD — gate ERRORS no-such-token until merged to `src/`):**
  - `BD.W-TAB-IOS-CAPSULE` (on disk) — the layout-neutral `.glass-capsule` body EXTRACT + the warm
    floor + `--glass-capsule-fill` token. The tabs amendment already adds the warm-floor RE-INVENT to
    the capsule fill (its C6 capsule-chroma gate) — the atom CONSUMES it.
  - `BD.W-TINTED-CHIP` (on disk) — the `--glass-fill-tint` plate-fill CONSUME-wire + axis.
  - `BD.W-GLASS-FIELD` / `BD.W-PAGE-FIELD` (booked by the glass-material + page-background amendments;
    ONE `paper-field` mint at two floors) — the warm colorful field the chassis mounts (the #1
    §3-gray cure).
  - `BD.W-GLASS-KEY-EDGE` (booked by the glass-material amendment) — the `--glass-key` re-point of the
    EXISTING two-stop rim + the SHIPPED `.shadow-cartoon-*` cast; the defined edge.
  - `BD.W-MOTION-WEIGHT` + `BD.W-CARTOON-PUNCH` (booked by the motion-spring-register amendment) — the
    `--motion-weight` scalar + the `--ease-cartoon-punch` raw `linear()`. NOT re-minted here (the
    tabs/cards/buttons/select amendments all DEPEND on the same two booked tokens — the union).
  - `BD.W-CARTOON-CEL-INK` (booked by the cartoon-shadow amendment) — the warm chromatic `--cartoon-ink`
    (the K5 fix; B5 fixed at the token, no atom SFC edit).
  - `BD.W-CARTOON-CASTER` (booked by the cartoon-shadow amendment) — the inert `.cartoon-cast` child +
    `useCartoonCast` + the promotion/no-backdrop-inherit contract. The atom's loud-register cast + the
    slider cast-lag + the `+N`/arc cast all ride THIS (resolves the spike-on-`::after` refutation).
- **CONSUME (EXTANT, no re-mint):** `--glass-fill-tint`/`-strength` (`glass.css:399`),
  `--glass-bg-quiet`/`-border-quiet`/`-blur-quiet`/`-material-rim`, `.accent-tone`/`useAccentTone`,
  `--radius-control`/`-badge`/`-pill`, `--section-color-N`, `--scale-press-btn`/`--surface-tint-15`,
  `--shadow-cartoon-{sm,md,lg}`, `--slider-range-bg`, `useDockHold`, `useTouchGate`, `vReveal`.
- **NEW (this wave OWNS):** the `.glass-atom` recipe (consume-only), `useDragVelocity` (the ONE honest
  bridge), the `<Badge surface="glass">` opt-in, the slider weight-train wiring + default-tint flip,
  the `+N` glass-atom re-host, the StackedIcon arc, the `proof:glass-atom` gate +
  `tests-visual/glass-atom.spec.ts`.

**The CITATION CORRECTION (load-bearing reconciliation):** the GOLDEN §3/§4 cite DEPEND wave NAMES
`BD.W-GLASS-FIELD`/`BD.W-GLASS-KEY-EDGE`/`BD.W-MOTION-WEIGHT`/`BD.W-CARTOON-PUNCH`/`BD.W-CARTOON-CEL-INK`
as if extant. They are NOT files in the 116-wave union set — they are deliverables of the SIBLING
greenfield amendments (motion-spring-register, cartoon-shadow, glass-material, page-background), which
author them with their own born-RED gates. This amendment DEPENDs on those sibling deliverables; it
does NOT author a second field/edge/motion/ink/caster. The only files on disk today are
`BD.W-TAB-IOS-CAPSULE`, `BD.W-TINTED-CHIP`, `BD.W-ICONCHIP-GLASS`. The wave-amendment (`WAVE-AMENDMENT.md`)
encodes this DAG against the REAL filenames + the booked sibling waves.

---

## 6. THE GESTALT BAR (each atom: warm glass + congruent + liquid, both modes, both engines)

- **Warm glass:** every atom either IS a `.glass-atom` capsule (metric-badge, glass-Badge, slider
  track+fill, glass-IconChip, `+N`) tinted warm via `--glass-fill-tint` over the transmitted field,
  OR a loud opaque pill/disc wearing the SAME warm rim + warm cel cast. No gray: the slider's muddy
  dark fill and the badge's flat melting plate both die.
- **Congruent:** ONE `--radius-control` stadium, ONE `.glass-capsule` body, ONE `--glass-fill-tint`
  axis, ONE `--cartoon-ink` cast, ONE `--motion-weight` law across all four atoms AND the chip family
  AND tabs/buttons/select — the deft ≥Nth consumer, never a parallel fork.
- **Liquid:** the slider drag is the BOUNDED weight-train (anticipation → saturating smear →
  follow-through overshoot, the headline); every atom presses with a non-uniform squash + an
  overshoot; the StackedIcon expand is a BOUNDED arc with overlapping-action stagger. PRM collapses
  all of it to a STILL warm-glass floor (never a frozen mid-animation) — `--motion-weight: 0` in ONE
  assignment; the warm tint + rim + static cel STAMP persist.

The slider — the most underestimated atom — becomes the clearest proof of the
liquid-weight-universal law: a column of warm tinted glass you pull, that loads when you grab it,
smears (and saturates) toward where you drag, and overshoots when you let go. It costs ZERO new
material + ZERO new motion register — only ONE honest velocity bridge. The deft Nth consumer.
