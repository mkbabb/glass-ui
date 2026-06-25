# BUILD-REPORT-1 — the liquid goo-morph WORM pager indicator (W-PAGER-GOO-MORPH)

**Status: BUILT + LIVE-VERIFIED.** The PagerDots active indicator is no longer a
width-transitioning pip — it is a LIQUID WORM that GOO-MORPHS dot-to-dot like the
Google-deck dot morph: it STRETCHES across the gap (an elongated capsule spanning
source→target), the dots it passes MERGE into it (SVG-goo metaball neck), then it
CONTRACTS + SETTLES on the target with a `--spring-bouncy` overshoot. DeckPager + the
carousel inherit it for free (≥2 consumers by construction). Compositor-only, PRM-carved,
`@supports`-gated, Safari-portable.

---

## What built (files + lines)

| File | Lines | What |
|---|---|---|
| `src/components/custom/pager-dots/useWormMorph.ts` | **278 (new)** | The colocated worm driver. The two-edge stretch-then-contract geometry (BUILD-SPEC §2a) expressed compositor-only: `transform: translate(center) scaleX(len/W) scaleY(1/√(len/W))` over a reserved footprint. Drives `--worm-t` on the bouncy `linear()` clock via a `@property`-registered CSS `transition` (NO keyframes peer — stays root-barrel-safe), reads the interpolated scalar each rAF frame, projects the worm transform. Composes `useLiquidFlex` (the ONE squish engine, `"linear"` law, live `--pager-worm-max-stretch` cap) for the reciprocal `--stretch`. `snap()` for PRM/first-paint/resize; `travel()` for the morph. |
| `src/components/custom/pager-dots/PagerDots.vue` | **447 (rewritten)** | Two layers. (1) `.pager-goo-layer` (aria-hidden, pointer-events:none, `filter: var(--pager-goo-filter)`, `opacity: var(--pager-goo-layer-opacity)`, `will-change:transform`, `contain:layout paint`, `isolation:isolate`) holding N opaque `.goo-dot` pips + the `.goo-worm` capsule — the opaque-layer technique (52% translucency ONCE at the layer, so the goo alpha-threshold sees full-opacity shapes). (2) The transparent 24px `<button>` hit-targets BYTE-KEPT above it (all a11y/role/aria/keyboard/windowFit/focus-ring/click). One hidden `<svg><filter id="pager-goo">` (blur stdDev 4 → feColorMatrix `0 0 0 18 -7` → feBlend, `color-interpolation-filters="sRGB"`, region `-50% -50% 200% 200%`). |
| `src/styles/tokens/property-regs.css` | +13 | `@property --worm-t { syntax:"<number>"; inherits:true; initial-value:0 }` — the typed registration that lets the engine INTERPOLATE the worm scalar on the bouncy `linear()` (a bare `var()` snaps). |

**Tokens (BUILD-SPEC §6).** KEPT every `--pager-dot-*`. ADDED `--pager-worm-spring`
(`var(--spring-bouncy)`), `--pager-worm-duration` (`var(--spring-bouncy-duration)`=0.57s),
`--pager-worm-max-stretch` (1.08), `--pager-goo-layer-opacity` (0.52), `--pager-goo-filter`
(`url(#pager-goo)`) — all `var(--t, fallback)` consumer-retunable, zero `:deep()`.

**Reuse (BUILD-SPEC §9, composed not forked):** `useLiquidFlex` (squish), `--spring-bouncy`
@ `--spring-bouncy-duration` (the SPRING_PRESETS bounce row — no new family), the
`pagerWindow` oracle (untouched — no third fork, `proof:deck` D3 ✓), the `morph-bridge.css`
goo filter values, the `useTabIndicator` release-at-arrival shape (0.82×clock).

---

## Live mid-travel frame evidence (chrome-devtools-mcp, http://localhost:5173)

### The worm STRETCHES (real span/scaleX ≠ 1 mid-flight) — the binding bar

`/motion/deck` (DeckPager), instrumented `--worm-t` + worm transform sampled per rAF across
a real click-driven travel on the bouncy 0.57s clock:

- **`--worm-t` GLIDES on the bouncy spring** (jump 0→5): `0 → 1.913 → 4.991 → **5.602**
  (overshoot, the +12.6% bounce) → 5.189 → 4.939 → 4.995 → 5.0` (settles). The spring
  overshoots past the target then settles back — the WEIGHT + BOUNCE.
- **Peak `scaleX` mid-flight, single-step (dot0→dot1) freeze at midpoint: `6.0`** (worm
  length 36px spanning both 6px dots 30px apart, scaleY pinched to `0.408` = 1/√6 —
  volume-preserving).
- **Peak `scaleX` mid-flight, multi-step (live deck 0→5): `20.09`** at `--worm-t`≈1.05,
  scaleY `0.223`; carousel (consumer #2) 0→3: peak `scaleX **14.43**`, scaleY `0.263`.
- After the clock the worm **settles to `scaleX=1`** dead-on the target center.

The bare traveling pill (the REJECTED read) holds scaleX≡1. This worm's length peaks at
`1 + (B−A)/W` then collapses to 1 — the stretch-then-contract, gate-proven non-constant.

### The dots MERGE (goo) + the worm SETTLES — screenshots

Captured at 6× zoom (the live rail is a 180×24px strip) on `/motion/deck`:

| Frame | File | Read |
|---|---|---|
| 0 — rest | `frame-0-rest.png` | 6 discrete round pips; the active worm a solid pip on dot1; idle pips stay SEPARATE (the goo threshold correctly does NOT merge resting dots). |
| 1 — stretch/reach | `frame-1-stretch-reach.png` | p=0.28: the worm elongates FROM dot0 reaching toward dot1, the goo neck a tapered teardrop welling between them (leading edge travels, trailing pinned). lenRatio 3.8. |
| 2 — midpoint max stretch + MERGE | `frame-2-midpoint-stretch.png` | p=0.5: dot0+dot1 FUSED into ONE elongated capsule (the goo neck a solid connecting bar spanning both centers) while dots 2–5 stay discrete. lenRatio 6.0, center 30px. **The Google-deck worm.** |
| 3 — contract + SETTLE | `frame-3-settle.png` | p=1.0: the worm landed on dot1, contracted to a clean pip (lenRatio 1.0, center 45px); the neck pinched off, dot0 a free separated pip again. |

The merge tracks the stretch for FREE — the SVG filter is STATIC, only the opaque shapes
move (the Safari trap avoided). STRETCH→neck-up→travel-fused→pinch-off→land.

### Wiring confirmed live
- `/motion/deck`: 6 goo-dots, worm present, `filter: url("#pager-goo")` applied, `--worm-t`
  registered + transitioning, `--pager-worm-duration: 0.57s`.
- `/navigation/carousel`: 2 pager rails, worm + goo filter on both — the carousel inherits
  the worm with zero carousel change.

---

## PRM — instant, no squish (BUILD-SPEC §8 P6)

With `prefers-reduced-motion: reduce` forced (live `matchMedia` override, read fresh by
`useWormMorph.PRM()` per travel), jump 0→5: **`maxScaleX: 1`** (no squish), **`--worm-t`
stayed `5` the whole window** (`wormTUnique:[5]` — instant snap, ZERO glide/overshoot
frames). The worm `snap()`s onto the target; the CSS PRM block drops the goo filter
(`filter:none`) + pins `scale:1 1`. The pager still indicates the active dot — correctness
preserved, no liquid.

---

## a11y / windowFit / orientation — PRESERVED

- **24px hit-box** (WCAG 2.5.8) — the transparent `<button>` rail is BYTE-KEPT; the goo
  layer + worm are PRESENTATIONAL `aria-hidden`, NO role, NOT focus targets.
- **aria register split** — `pattern="tabs"` → `role="tablist"`/`role="tab"`/`aria-selected`;
  `pattern="group"` (DeckPager) → `role="group"`/`aria-current`. Unchanged.
- **windowFit** — the worm travels between MEASURED goo-dot centers (`centerOf()` off the
  live DOM, windowFit-correct); a clipped-out index anchors on the nearest shown dot. The
  `pagerWindow` oracle is the ONE source (no third fork — `proof:deck` D3 ✓).
- **Keyboard focus-survival across a window recompute** — KEPT (the worm is aria-hidden, not
  a focus target). A `traveling` guard stops a window-recompute snap from clobbering an
  in-flight glide (the deck changes active+shown in one flush).
- **Orientation** — the worm travel axis is derived off `data-orientation` (horizontal →
  translateX + stretch-X; vertical → translateY + stretch-Y, the reciprocal `--stretch`
  pairing flips). Both axes kept.
- **DeckPager** — a THIN PagerDots wrapper, ZERO change; gets the worm for free.

---

## Typecheck + gates

- `npx vue-tsc --noEmit -p tsconfig.json` — **0 errors** (no new TS errors).
- `proof:no-layout-animation` — **PASS** (52 keyframes + 233 transition legs scanned, 0
  layout-property animations off the allowlist). The worm is transform/scale/opacity/filter
  ONLY — this rewrite is partly a FIX for the OLD PagerDots `width`/`height` transition that
  violated motion-canon P5.
- `proof:pager-ring` — **PASS** (PagerDots exists, ≥2 ring consumers, `--pager-dot-*` tokens
  intact, CarouselDots retired).
- `proof:deck` — **PASS** (no third pagerWindow fork, DeckPager over PagerDots group, focus
  guarded).
- Console: no errors; the 2 pre-existing warns (TooltipProvider transition, useAurora
  deferred-init) are unrelated to this change.

---

## Constraints honored
Edited ONLY glass-ui `src/` (+ `docs/`). No sibling-tree touch, no mv/rm outside the repo,
no git commit/push/stage, no browser dialogs (console.log + evaluate_script only).

## Path decision
Built **Path A+** (BUILD-SPEC §3a) — the CSS `linear()`-transition spring drive (the
`@property --worm-t` transitioned on `--spring-bouncy`, no keyframes peer, root-barrel-safe)
PLUS a thin rAF that READS the interpolated scalar and projects the genuine two-edge
geometry. This delivers the real midpoint length-bulge (Path B fidelity) WITHOUT the
keyframes/`SpringProgress` heavy peer. The transition owns the spring physics; rAF only
samples + paints. If a future W-REFLECT judges it insufficiently liquid, Path B
(`SpringProgress` + `useLiquidFlex.drive` velocity squish) is the named successor.

## Screenshots
`docs/tranches/BD/viz/goo-morph/frame-0-rest.png`,
`docs/tranches/BD/viz/goo-morph/frame-1-stretch-reach.png`,
`docs/tranches/BD/viz/goo-morph/frame-2-midpoint-stretch.png`,
`docs/tranches/BD/viz/goo-morph/frame-3-settle.png`.
