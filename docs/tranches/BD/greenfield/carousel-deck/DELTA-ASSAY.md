# CAROUSEL · DECK · PAGER-DOTS — the DELTA-ASSAY (golden-vs-current → the UNION path)

> The survival-of-the-fittest delta against the LIVE HEAD implementation (`prototype/liquid-dock`,
> the `W-GOO-CAROUSEL-DECK-FIX2` build). Reference: [`GOLDEN.md`](./GOLDEN.md) hardened by
> `challenge/{1,2,3}.md`. Method: keep what is FIT, REFINE what is weak, RE-INVENT only what is
> broken. KISS · DRY · NO LEGACY · a UNION with the shipped ecosystem, never a fork.
> Orchestrator live-verified on `:5173` (Chrome) — every born-RED below is a real readback, not a
> doc claim. The depended foundation is the goo-morph barbell amendment
> ([`../goo-morph/WAVE-AMENDMENT.md`](../goo-morph/WAVE-AMENDMENT.md), `BD.W-GOO-BARBELL-NECK`).

---

## 0. THE LIVE GROUND-TRUTH (orchestrator readback, this pass)

HEAD ships the FIX2 build (N-plate bed + single worm + dark warm-ink arm + travel-gate). The
barbell is NOT yet on HEAD — it is a planned wave. So every born-RED the golden + challenges quote
is CURRENT-accurate. Captured this pass:

| probe (live `:5173`, Chrome) | reading | verdict |
|---|---|---|
| `/navigation/carousel` `.carousel-goo-plate` count | **12** + ONE `.carousel-goo-worm` | the N-plate bed is REAL — RE-INVENT target |
| real Next-click worm peak | `scaleX 1.181 / scaleY 0.92`, `lenRatio 1.181` | shallow CONVEX slab, `hasLocalMinimum=false` — RE-INVENT |
| layer opacity across the whole travel | **flat 0.55** (every sampled frame) | dead-slab dwell (timer-gated, not neck) — REFINE |
| **distinct worm-`scaleX` frames across travel** | **6 distinct / 7 total** (~6 fps) | the route slideshow is REAL — see §5 below |
| `GlassGooFilter` graph | `feGaussianBlur=10`, `feColorMatrix … 24 -11`, sRGB, no `var(` | static, Safari-safe — KEEP (retune slope) |
| `backdrop-filter:url` rules | **0** | §L7 holds — KEEP |
| carousel slide bg (the §3 field) | `rgba(0,0,0,0)`, `bgImage:none` | slide has no field of its own (rides the route aurora) |
| `/motion/deck` slide panel bg | **`oklab(0.793 0.005 0.012 / 0.84)`, `bgImage:none`** | C≈0.0128 flat taupe, NO colorful field — REFINE (§3) |
| deck goo layer at rest | `opacity 0` (gate fires only `[data-traveling]`) | rest-slab fix HOLDS — KEEP |
| `useGooMorph` ref contract | single `morphRef`, `girthFloor` pinch | single-element — RE-INVENT (barbell) |
| `PagerDots.vue` filter | inline `<svg id="pager-goo">` + N `.goo-dot` + ONE `.goo-worm` | hand-rolled 3rd shell, single-worm — RE-INVENT (de-dup) |

**The §0 flow-token correction stands.** `--carousel-goo-flow` (0.95s, +1.5% overshoot) and
`--deck-goo-flow` (1.1s, no overshoot) SHIP (`scheme-motion.css:289/306`). The brainstorm lenses'
"empty flow → falls through to the dot curve" born-RED is STALE — the golden correctly retired it.
The real inertia work is calibration + the cartoon pre-dip, NOT author-the-missing-curve.

**The challenge-corrected provenance stands.** `--shadow-cartoon` (+ `-sm/md/lg`) SHIP
(`bridges.css:298`, `components.css:300`, `cards.css:180`) — the cartoon-cast REUSES them (DRY win).
Only `--motion-weight` + `--ease-cartoon-punch` are genuinely absent (grep-empty) — the two honest
sibling deps. The golden §6 absence-claim is trimmed to those two (challenge-1 R3).

---

## 1. THE DELTA — KEEP / REFINE / RE-INVENT (survival of the fittest)

### KEEP (fit — reuse verbatim)
- **The Layer-3 surfaces stay DISTINCT.** embla `useCarousel` (drag/momentum/±peek) and `useDeck`
  (index/keyboard/`aria-live`) are GENUINELY distinct cadences. Forcing a merge puts bounce on a
  content-scroller (T13) or strips drag. The de-dup is at Layer 2, never Layer 3. **Correct — do not
  touch.**
- **The flow curves** (`--carousel-goo-flow`/`--deck-goo-flow`/`--pager-worm-flow`) — FIT. KEEP.
- **The static `#glass-goo` / `#pager-goo` graph** — sRGB, no `var(` in the graph, no
  `backdrop-filter:url`. §L7 holds. KEEP (the carousel mount retunes the threshold SLOPE only).
- **The FIX2 dark warm-ink arm** (`oklch(from var(--card) 0.68 0.05 h)` + `saturate(1.3)
  brightness(1.3)`) + the travel-gate (`previousScrollSnap()` keying) — KEEP; the light-mode
  `plus-lighter` lift is added SYMMETRIC (the golden's one net-new glassy arm).
- **The deck rest-gate** (`[data-traveling]` → 0.62, rest → 0) — KEEP.
- **The geometry oracles** — `centerOf`/`slideStep` (carousel), `pagerWindow`, the `DeckPager`
  47-line wrapper. KEEP; they become the per-consumer `centerOf`/`restSize` props of the bridge.

### REFINE (weak — calibrate, do not rebuild)
- **The dwell** — flat 0.55/0.62 timer-gated → re-point to the **neck-girth signal** (visible
  EXACTLY while the goo deforms, gone ≤80ms after settle). This is the barbell amendment's §6 work;
  the bridge inherits it.
- **The deck §3 field** — the flat taupe slide bg → adopt the carousel's warm-cream→saffron radial
  field so the goo has chroma to bleed (a **demo-surface change in `deck.vue`**, presets-in-consumers).
- **The inertia register** — add the cartoon pre-dip (`--ease-cartoon-punch`), the per-consumer
  `--goo-weight`, the velocity-couple, the moving cartoon-cast ON TOP of the shipped flow curves.

### RE-INVENT (broken — clean break, no legacy)
- **The silhouette** — the N-plate bed + single convex worm → the **barbell** (two warm-cream
  bodies + a concave-throat neck). Owned by `BD.W-GOO-BARBELL-NECK`. This GOLDEN RIDES it.
- **The SHELL** — three hand-rolled goo wirings (carousel `placePlates`+CSS, deck's own plate+timer,
  pager's inline `<svg>`+layer) → ONE `<GooBridge>` + `useGooTransition`. **This is the genuine
  de-dup the current code missed — the one thing this GOLDEN owns.**
- **The distortion** — the worm OCCLUDES at `z-index:2` with no content deform → the **transform-only
  squash-refraction** (the slide pair deforms through the waist, Safari-native).

---

## 2. THE UNION PATH (deft integration — precisely how to evolve HEAD toward the golden)

The golden is **~70% a dependency-wrapper on the barbell amendment** (challenge-2 R4 is correct: the
silhouette, the engine 3-ref re-projection, the concave throat, the dwell-follows-neck, the
3-consumer barbell migration are ALL `BD.W-GOO-BARBELL-NECK`). The NET-NEW surface this item owns is
exactly THREE things — and they must be built as a UNION over the barbell, not a parallel path:

### UNION STEP 1 — `<GooBridge>` + `useGooTransition` (the Layer-2 shell de-dup — THE owned NEW)
ONE presentational SFC `src/components/custom/goo-bridge/GooBridge.vue` + ONE thin headless
`src/composables/motion/useGooTransition.ts` — a COMPOSITION over `useGooMorph` (barbell), NOT a
second engine. It owns: the `GlassGooFilter` mount, the `bodyA`/`neck`/`bodyB` barbell DOM, the
neck-gated `data-traveling` opacity, the `.dark` warm-ink + `.light` plus-lighter arms, the
`@supports`/PRM CSS, the squash-refraction coupling, and the cartoon register. The three consumers
shrink to *measure slot centres → hand the bridge an index/fraction*:

- `CarouselContent.vue` LOSES `placePlates`/`plateEls`/`setPlate`/`plateIndices`/`markTraveling`/the
  goo CSS/the `v-for` plate bed (~150 LOC) → keeps embla wiring + `centerOf`/`slideStep` + ONE
  `<GooBridge>` mount.
- `deck.vue` LOSES its goo `<div>`+CSS+timer → ONE `<GooBridge token-prefix="deck-goo">`.
- `PagerDots.vue` LOSES the inline `<svg>` + `.pager-goo-layer` → ONE `<GooBridge
  token-prefix="pager-worm">`; keeps the interaction buttons + `pagerWindow`.

**Net-negative LOC** (challenge-1 secondary: directionally right, measure the diff-stat at close).
The `<GooBridge>` is `aria-hidden` + `pointer-events:none` ALWAYS — it cannot regress a11y.

### UNION STEP 2 — the squash-refraction, on a PER-SLIDE WRAPPER (challenge-1 R1, the load-bearing fix)
The headline distortion is transform-only squash-refraction COUPLED to the neck waist. **The
critical integration correction:** the carousel slides are children of embla's transformed container
— embla writes `transform: translate3d()` on the container every frame. The squash CANNOT overwrite
the embla-driven slide/container transform (the spike's `s.style.transform = …` is a spike-only
shortcut that stomps embla). **The squash targets a dedicated inner wrapper** (`.slide-squash`, a
child of each `CarouselItem`) via a CSS custom-prop the wrapper composes — NEVER the embla transform.
The deck is free (full-viewport `inset:0` opacity-faded slides) — the squash maps cleanly there. The
π must assert the squash reads on the wrapper WHILE embla's container translate is simultaneously
live (a real Next-click, mid-momentum).

**And it must be DIRECTIONAL** (challenge-1 R2, challenge-3 R2): the spike gave BOTH slides the
identical `sx/sy` (a synchronized in-place stretch — a fake gag). The UNION requires a SIGNED
differential: outgoing `scaleX<1` compressing TOWARD the seam (transform-origin = seam) + translating
INTO it; incoming `scaleX>1` stretching OUT of the seam + translating out — `sign(outgoing) ==
−sign(incoming)`, both keyed off the same `--goo-neck`. That is the "squeezed THROUGH the gap" read.

### UNION STEP 3 — the deck §3 warm field (presets-in-consumers, `deck.vue` only)
The deck slide bg adopts the carousel's warm-cream→saffron radial field (the `auroraFallbackGround`
static mesh or the droplet `radial-gradient` recipe generalized) so the goo has warm chroma to bleed.
The goo bodies stay opaque warm-cream domes; the NECK region carries a LOWER fill alpha so the field
reads through the thinnest part of the waist (the "field through the neck + edge" honest read). A
DEMO-surface change — NOT a library change (presets-in-consumers).

### THE INERTIA register (rides the barbell's cartoon-punch)
ON TOP of the shipped flow curves: the anticipation pre-dip (`--ease-cartoon-punch`, the entering
body buds out of the leaver), the per-consumer `--goo-weight` (carousel-Next 1.0 / deck 0.4 / pager
0.7), the √φ overshoot land, the moving cartoon-cast (`::after` casting the SHIPPED `--shadow-cartoon`
opposite the morph direction), and the dwell-follows-neck. **The driver-vs-observer carve is
load-bearing:** the explicit Next/page/dot-commit are DRIVERS (punchy); the finger-drag content-snap
is an OBSERVER (calm-overdamped, T13). "Liquid-weight universal" is read on drivers.

**The challenge-3 R5 refinement (under-fenced carve):** the drag is NOT dead — it carries WEIGHT in a
non-bouncy register (velocity-coupled neck swell + overdamped, overshoot-FREE settle). "Morph more on
move" holds on the drag (fatter neck on a fast fling) while the settle never overshoots — proving
weight ≠ bounce, not weight = absent. The velocity-couple is a neck-swell embellishment (not an
overshoot), so it does not contradict the calm carve.

---

## 3. THE SMOOTHNESS TRUTH (challenge-3 R1 + the live 6-fps readback — the ONE escalation)

Challenge-3 drove the spike and found `--goo-t` reads only THREE distinct values across a 950ms
travel — a 3-keyframe slideshow even on an empty page. **This pass reproduced it on the REAL route:
6 distinct worm-`scaleX` frames / 7 total across the whole travel (~6 fps).** The golden's §2.5(3)
thesis — "the COMPOSITOR interpolates `--goo-t` smoothly, the rAF just reads it" — is FALSE as
written: `getComputedStyle` of a mid-transition `@property` returns a COARSELY-sampled value, and the
rAF that reads it inherits the coarseness. On the 7-fps route the rAF itself only fires ~7×.

**The delta verdict:** this is NOT fatal to the de-dup (the shell + squash + field land regardless),
but the golden cannot FLAG the only mechanism that delivers smoothness (`BD.W-GOO-COMPOSITOR-DRIVE`,
the `@property` `calc()` triangle-wave) as "future" while claiming the read is fixed. The UNION
promotes a **SMOOTHNESS arm INTO the acceptance bar** (a `distinctFrameCount` / `maxDwellPerValue`
born-RED), and names the honest resolution: either (a) drive the barbell transform from the COMPOSITOR
directly via `calc()` (fps-independent — the real fix), or (b) prove the rAF-reads-`@property` path
yields ≥N distinct frames on the real route AFTER the route-chassis perf debt (the aurora +
backdrop-filters) is paid by Band-C. The 6-fps route debt is named honestly as the REAL reason the
morph reads chuggy — owned by the demo-chassis band, but the SMOOTHNESS gate is now in THIS bar.

---

## 4. THE PROOF-BAR CORRECTIONS (challenge-1/2/3 unanimous — the cardinal fence)

All three challenges land the SAME top refutation: **the golden's own spike `squash-refraction.html`
violates the §5/§7 cardinal fence** — it reads the PRE-filter transform `scaleY` and reconstructs a
synthetic alpha profile arithmetically (`fNeck = neckGirth * 0.9`, line 299), NEVER rasterizing the
`#glass-goo` `feGaussianBlur(10)+feColorMatrix(…24 −11)` output through `getImageData`. The metaball
THRESHOLD is precisely what decides whether the post-blur alpha has a concave `hasLocalMinimum` at the
rendered waist (an 11px blur can SWALLOW a thin pre-filter neck into a convex slab). The spike
de-risks the transform PROJECTION but NOT the rendered metaball waist.

**The UNION bar fix (folded into the amendment):**
1. **The π is a REAL rasterized readback** — `getImageData` over the filtered `.goo-layer` output,
   walk the post-threshold cross-axis alpha for `hasLocalMinimum` + `waistRatio ≤ 0.45`, at the neck
   peak AND the widest gap (the AA-drift worst case). NEVER `neckGirth·const`. The squash arm reads
   the `from`/`to` PAIR (not `slides[active]`, which is trivially `1.0×1.0` at rest).
2. **The squash born-RED asserts a SIGNED differential** — `sign(outgoing seam-ward) ==
   −sign(incoming)` + a real cross-seam translation, NOT just `|sx·sy−1|<0.05` (which a synchronized
   squash passes for the wrong reason — the cardinal "gate passes for the wrong reason" trap).
3. **PAIRED-engine, Chromium + real Safari-26-on-Metal**, LIVE MOTION, BOTH modes, the chroma
   readback on the actual filtered warm-cream output + the deck field + the light `plus-lighter` lift.
   The cross-engine headline must be PAINT-proven, not reasoned (challenge-2 R1 — zero Safari capture
   exists at golden stage). Probe explicitly: `@property --goo-t` land timing, `path()` clip AA, the
   `feColorMatrix 24 −11` fringe alpha per engine.
4. **The no-gray floor tightens to C ≥ 0.015** (or a hue-locked min-chroma `@utility`) on the rendered
   slide PANEL pixel, both modes (challenge-2 R6 — the live deck worm-field sits at C≈0.0109, one
   rounding-error from gray; the deck slide panel at C≈0.0128 reads taupe to the eye over the 0.010
   floor).
5. **The mount-gate uses `content-visibility:hidden` (pre-warmed) or `opacity:0 + contain:strict`,
   NOT `display:none`** (challenge-2 R5) — and pre-compiles the filter graph once (mount the `<defs>`
   always; gate only the consuming layer) so the first travel frame on the 6-fps route is not the
   filter-compile frame. Measure the TRAVEL-ONSET frame on WebKit, not just idle.

---

## 5. THE NET VERDICT

**REFINE-dominant with ONE owned NEW (the `<GooBridge>` shell de-dup) + TWO RE-INVENTs inherited
from the barbell amendment (silhouette + distortion).** The design thesis SURVIVES all three
challenges (de-dup at Layer 2, surfaces distinct, §0 honesty, warm-field diagnosis, the DRY union are
all fit). What does NOT survive is the golden's PROOF: the spike π is synthetic arithmetic, the
squash is non-differential, the motion slideshows, and there is zero Safari capture. None of those are
design reversals — they are proof-bar + integration hardenings, all folded into the WAVE-AMENDMENT.

The integration is DEFT and net-negative LOC: ONE `useGooMorph` (barbell) → ONE `<GooBridge>` → three
thin consumers, no fork, no legacy. The de-dup the prior FIX2 waves left on the table is exactly the
SHELL — and this item ships it.
