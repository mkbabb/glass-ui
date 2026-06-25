# TIMELINE — DELTA-ASSAY (golden vs current) + the UNION path

> Reference: `docs/tranches/BD/greenfield/timeline/GOLDEN.md` (canonical) + the three
> challenges (`challenge/1.md`, `2.md`, `3.md`, all FOLDED below). Scope: `GlassTimeline`
> dispatcher + the 3 variants (`ScrubberTimeline` · `SegmentedTimeline` ·
> `ContinuousTimeline`/Rail/Markers) + `TimelineSegment` + the `#detail` slot.
> **Verdict: REFINE-dominant + 2 RE-INVENT (the gray substrate + the stiff scrub head);
> ~76%.** Tranche-dev only. A UNION — KISS/DRY, no parallel fork, NO legacy.

---

## 0. ORCH LIVE-MEASURED born-RED (Chrome :5173, my own readback)

Navigated `/data/timeline` + `/data/timeline-segmented`, `getComputedStyle` + field-count:

| measured | live value | verdict |
|---|---|---|
| `.glass-track` bg (scrubber) | `color(srgb 0.11 0.098 0.09 / 0.06)` = `--surface-tint-6` | **GRAY ink film**, chroma≈0 |
| `.glass-track` backdrop | `blur(1px) saturate(1.4)` = `--glass-blur-wash` | sub-perceptual; transmits ~nothing |
| `.glass-thumb` | `w 6px · h 16px · opacity 0 · transform matrix(1,0,0,1,-6,-8)` | **stiff + invisible-until-hover**; the matrix is the **static −50%−3px centering only** — the travel rides `style.left` inline (challenge #1/#3 R-1 label-correction CONFIRMED: NOT a transform-translate) |
| `paperFieldCount` `/data/timeline` | **0** | NO colorful field (§3 root cause #1) |
| `paperFieldCount` `/data/timeline-segmented` | **0** | same |

Source-confirmed three independent copies of the gray recipe:
`ScrubberTimeline.vue:140` · `SegmentedTimeline.vue:130` · `ContinuousRail.vue:86` — each sets
`background: var(--surface-tint-6); backdrop-filter: var(--glass-blur-wash);`. `--surface-tint-*`
is `oklch(from --foreground …)` ink-derived → grayscale by construction (§3 root cause #2).
Segmented cels paint `gradientFor(seg)` (opaque `chart-*` gradient) — `SegmentedTimeline.vue:75`.
Delta artefacts captured: `delta-scrubber-shipped-light.png`, `delta-segmented-shipped-light.png`.

---

## 1. THE DELTA — KEEP / REFINE / RE-INVENT (survival of the fittest)

| sub-part | verdict | evidence |
|---|---|---|
| `GlassTimeline.vue` dispatcher + variant enum + event surface | **FIT — KEEP verbatim** | public API; consumers untouched |
| `TimelineSegment` data shape + `types.ts` | **FIT — KEEP verbatim** | `{key/label/state/progress?/gradient?/value?/weight?}` is fit |
| `geometry.ts` stitched windowing + rounded caps + region weights + payload helpers | **FITTEST — KEEP byte-untouched** | it simply paints INSIDE the warm rail now |
| continuous Option-C a11y split (`progressbar` ⊥ `list`) + `#detail` slot + HoverPopover cadence + WCAG-2.5.5 44px halo | **FIT — KEEP verbatim** | the warm substrate + liquid scrub are a paint/motion swap UNDER unchanged DOM/ARIA |
| the 3 private `--surface-tint-6` + `--glass-blur-wash` substrates | **BROKEN (gray) — RE-INVENT** | 3-copy gray recipe; live composite flat |
| the scrubber thumb (gray bar, Material ease, `opacity:0`-until-hover, `style.left`, no squish) | **BROKEN (stiff) — RE-INVENT** | the headline interaction; Band-0 liquid-weight law violated |
| segmented↔continuous visual confusion + opaque `chart-*` cels + gap=0 | **WEAK — REFINE** | the two read confusable; cels are opaque, not tinted-glass |
| the three rail heights as arbitrary px | **WEAK — REFINE** | re-base on the √φ ladder off ONE base |

---

## 2. THE UNION PATH — deft integration, reusing extant primitives

**One move does most of the work:** delete the three private gray substrates → ONE
`.timeline-rail` warm-glass recipe in `src/styles/timeline.css` composing the **shipped** glass
ladder (`--glass-bg-resting` floor + `--glass-blur-floating` transmission + `--glass-material-rim`
+ `--glass-under-shadow-default` + `--glass-border-accent`), enrolled in the
`--glass-tint-source`/`--glass-tint-strength` ambient seam (no-op at 0%). The field is
**transmitted, not painted** — the rail consumes the route-mounted `.paper-field`. Over the field,
`saturate()` finally has chroma to concentrate → warm transmissive cream, both modes; dark GLOWS.
This is a real DRY de-dup (3 copies → 1), not a re-mint — `--card` is genuinely warm
(`hsl(30 85% 96%)`) and the shipped glass tiers already derive `color-mix(… --card …)`.

**The scrub head RE-INVENT composes shipped engines, mints no new engine:**
`useLiquidFlex` (the `"tanh"` velocity-squish, vol-preserving, cap ≤1.12) + a `SpringProgress`
position via the `useSpring` Vue wrapper (inertia/follow-through — NOT `style.left`) +
`useSpringPress`/`useLiquidPress` (grab-anticipation) + `usePointerVelocityField` (the velocity
term). The warm fill LAGS the head on a slower spring clock. Four cartoon beats
(anticipation → follow+squish → fling-overshoot → accent-flood). The opt-in `:goo` neck composes
the **already-shipped `DockGooFilter`** (static-SVG, sRGB color-interp) on a SEPARATE
backdrop-free sibling layer — never a new filter, never `backdrop-filter:url`.

**Variant differentiation is composition-only (REFINE):** gap-vs-stitch (segmented inserts
`--timeline-segment-gap`; continuous keeps gap=0 + cross-fade) + dot-seat (segmented dots float
ABOVE with their own cast; continuous dots are flush rivets with an inner keyed shadow; scrubber
has no phase dots) + tinted-GLASS cels (`color-mix(in oklab, --cel-accent ~38%, transparent)`,
the field bleeds up — NEVER opaque `chart-*`) + the √φ height/rivet/gap ladder off ONE base.

**RETIRE in the same amendment (no dual paths):** the 3 per-variant `--surface-tint-6` track
recipes; the hand-rolled scrubber `style.left`/`width` pointer-math → the `useSpring`(SpringProgress)
+ `useLiquidFlex` head, `transform: translateX()` travel + a fill `scaleX`/`clip-path` channel
(`will-change` gated to `[data-scrubbing]`, dropped at rest). NO legacy, NO alias.

---

## 3. CHALLENGE HARDENINGS — all FOLDED into the wave amendment

All three challenges concur: **the DESIGN survives** (one warm-glass rail · three postures · field
transmitted · four-beat scrub on shipped engines · DRY token-swap · no fork · correct freeze list);
the **golden's de-risk prototype + π gate do NOT** and the **born-RED claim is partly false**. Six
load-bearing folds (the wave below carries every one as a real gate arm):

1. **R1 is born-GREEN, not born-RED, as written (challenge #1 TOP).** The golden's own
   `timeline-pi.mjs` scores R1 GREEN on 3/4 engine×mode cells on the shipped route, because it
   samples rail-OVER-warm-card (inherits the card's warmth) instead of the rail's TRANSMISSION
   delta. **FOLD:** R1 must assert `C(rail-over-field) − C(bare-card-region) ≥ Δ` (a transmission
   delta, rail-only masked strip excluding the fill/head rects — challenge #2 R-4) + a chroma
   CEILING witness against the shipped `srgb 0.11/0.098/0.09 0.06` ink film. Then it is truly RED.
2. **R4-volpreserve is a vacuous GREEN (challenge #1 R-2).** `|sx·sy−1|<0.06` passes trivially on
   the stiff `sx=sy=1` thumb. **FOLD:** condition volpreserve ONLY on frames where `|sx−sy|>ε`.
3. **Position channel = `left`, the forbidden Safari path (challenges #1 R-3 / #2 R-3 / #3 R-1,
   unanimous TOP).** Both the prototype AND the shipped thumb travel on `left:%`/`width:%`
   per-frame; the prototype leaves `will-change:width` permanently on. **FOLD:** travel =
   `transform: translateX()` (squish multiplied into the SAME matrix); fill = `scaleX` on a pinned
   layer OR a `clip-path` inset, `will-change` ONLY under `[data-scrubbing]`, removed on pointerup.
   New gate arm R4b: the head matrix `e` (translate-x) moves across the frame-series while computed
   `left` stays CONSTANT.
4. **`filter:url()` ⊗ `backdrop-filter` on the same head element + no real merge (challenges #2
   R-1/R-2 / #3 R-2, the genuine WebKit trap — NOT the `backdrop-filter:url` strawman).** The
   golden prototype stacks both on `.scrub-head` AND puts `filter:url(#tl-goo)` on head + fill as
   two SEPARATE siblings (no shared filter pass → no metaball can form). **FOLD:** mirror the
   shipped `DockGooFilter`/fission topology EXACTLY — the head silhouette + neck + fill-leading-edge
   are co-children of ONE `filter:url()` host carrying NO `backdrop-filter` (`isolation:isolate`,
   opaque-alpha sandwich); the transmissive glass head rides ABOVE as a separate crisp element. New
   gate arms R4c (static scan: no `.timeline-*` element computes both `filter:url`+`backdrop-filter`)
   + R4d (sample the alpha at the head↔fill midpoint → a connected bridge mid-flight then a snap,
   the shipped fission-π waist assay) + a webkit composite-C arm (goo ON ≈ goo OFF over the field).
5. **The shared substrate is FAKED in segmented (challenge #3 R-3).** The golden prototype nulls
   `.timeline-rail` (`background:transparent;backdrop-filter:none`) for segmented and re-mints glass
   per-cel — N independent capsules, the exact parallel-fork shape the golden claims to retire.
   **FOLD (decided):** segmented PAINTS the warm lane; the cels are translucent insets and the
   `--timeline-segment-gap` reveals the RAIL (not the card) — the iOS battery/storage tinted-lane
   read. R5 asserts segmented's rail bg is the SAME `--glass-bg-*` family (NOT transparent).
6. **Phantom tokens + off-ladder head + dark unproven (challenges #1 R-4 / #2 R-5 / #3 R-5/R-6).**
   `--sqrt-phi` and `.glass-opaque` are cited as reuse but do not ship. **FOLD:** MINT `--sqrt-phi:
   1.272` ONCE at the sizing root (DRY win — typography hardcodes 1.272 in 3 places; re-point them);
   name the PRT hook as `--glass-level: 0` via `glass/a11y-fallback.css`, drop `.glass-opaque`. The
   head diameter is hardcoded `26px` and bulges PROUD of its 22.89px channel — re-anchor to seat
   φ-INSIDE the channel (`head ≈ channel/√φ ≈ 14px`; keep the 44px touch target as an invisible
   `::before` halo, decoupled from the visible bead). Raise the cel tint floor / add a keyed inner
   cel edge so segments read as defined chips, not pastel ghosts. Capture the **dark-mode** composite
   OKLab over the UN-dimmed field on BOTH engines; if C < floor, lift the dark rail to a warm-luminous
   floor (the IOS27-REFERENCE T7 / W-DARK-MATERIAL luminosity-lift) rather than a dimmed field; re-key
   the cartoon cast for dark (a luminous/edge cast, not a brown drop that vanishes).
7. **The webkit arm was never RUN (challenge #3 R-4).** No `*.png`/`*.json` artifact in `golden/`;
   the π is a self-labeled SKETCH. **FOLD:** the wave gate is a PAIRED-engine π (Chromium AND WebKit,
   both modes) with committed captured DELTA frames + the scrub-drag frame-series + the OKLab/scale
   JSON. No "both engines" prose survives without the webkit artifact on disk (the live-verify-capture
   law).

---

## 4. NO-DUP RECONCILIATION vs the 116-wave set

`ls docs/tranches/BD/union/waves/ | wc -l` = **116**. No `*TIMELINE*` wave exists today (grep
empty) → the timeline waves are NET-NEW, not a re-author. The depend-on register tokens
(`--glass-bg-*`, `--glass-blur-floating`, `--glass-material-rim`, `--glass-under-shadow-default`,
`--glass-border-accent`, `--glass-tint-source/-strength`, `--glass-level`, `--ease-cartoon-punch`,
`--motion-weight`, `.shadow-cartoon-*`, `.paper-field`) are **deliverables of the sibling band-0 /
material / page-background amendments** — confirmed ABSENT as wave FILES today (the sibling rows
cite `BD.W-GLASS-FIELD`/`BD.W-MOTION-WEIGHT`/`BD.W-CARTOON-PUNCH`/`BD.W-CARTOON-CASTER`/
`BD.W-GLASS-KEY-EDGE`/`BD.W-PAGE-FIELD` identically as booked-but-pending DEPENDs). The timeline
**CONSUMES** them, never re-mints, never re-forks (matches dock-core / cards / select / chip /
glass-atoms reconciliation). The extant engines (`useLiquidFlex`, `useSpring`/SpringProgress,
`useSpringPress`/`useLiquidPress`, `usePointerVelocityField`, `useDragMorph` for discrete marker
snap, `DockGooFilter`, `vSpecular`, `<ScrollingText>`) are composed as-is.

See `WAVE-AMENDMENT.md` for the concrete amendment (1 NEW wave + 0 augments needed + N DEPENDs).
