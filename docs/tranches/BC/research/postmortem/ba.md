# BA post-mortem — the tranche that DID publish (4.0.0) and STILL shipped grey

**Tranche:** BA (the dark-register-rebuilt campaign) · **Cut:** v4.0.0 (LIVE on npm, provenance,
d6 fork closed) → v4.0.1 follow-up · **Branch:** `tranche/BA` · **Verdict:** the publish was REAL;
the gestalt close was a LIE. BA's headline `proof:ba-gestalt` (the gate BA *invented* to kill the
AZ close-class) was authored `["local"]`-tagged, verdict-flipped only at a single terminal
W-REFLECT2 wave, and binds a hand-written `roster.md` text + a PNG-existence check — never a paint
read. The grey-glass regression the user re-opened on did not originate in BA, but BA had the ONE
mechanism that could have caught it (`proof:ba-gestalt`) and the close walked right past it.

---

## The headline

BA's seed thesis was correct and well-stated (BA.md §"The shape of the problem"): *AZ closed
`complete` with a 9-surface per-mechanism PASS matrix the user re-opened the same hour — the close
verified MECHANISMS, not the GESTALT.* BA's answer was BA invariant 4 + `proof:ba-gestalt`
(W-GESTALT-GATE): a holistic per-surface whole-page both-modes verdict that the close `complete`
decision binds to.

BA then re-committed the EXACT failure it diagnosed, one layer up. The gestalt gate it built is
itself paint-blind:

- It is `["local"]`-tagged (`scripts/proof-ba-gestalt.mjs:29-32, 461`) — it NEVER blocked CI or
  release while the tranche was mid-flight. CI/master-green carried zero gestalt signal.
- Its verdict-flipper is a SINGLE terminal wave, W-REFLECT2 at Batch 7 (`proof-ba-gestalt.mjs:30-32`:
  "BORN-RED at HEAD … until W-REFLECT2 flips the verdicts"). Every one of the 28 mid-tranche waves
  closed `live-verified` against per-mechanism π, with the gestalt verdict explicitly DEFERRED
  ("the gestalt verdict staged" — PROGRESS/FINAL §1, the W-DARK-MATERIAL row). The single-terminal-
  reflect-deferral the disease names is BUILT INTO THE PLAN (BA.md inv-4: "binding at W-REFLECT2").
- The gate's "operative PASS" mechanism reads the recorded verdict strings out of
  `audit/reflect/ba-gestalt-roster.md` + asserts each declared capture PNG resolves on disk with
  sane IHDR dimensions (`proof-ba-gestalt.mjs:86-87, 137-157, 346-381`). It is a ROSTER-TEXT gate,
  not a paint gate: it cannot SEE whether a page looks right; it checks that a human WROTE "PASS"
  and that a file exists. A surface that paints grey but whose record says PASS and whose PNG is a
  valid grey-glass screenshot is GREEN.

So BA's structural P-1 fix is a paper fix. The close (`FINAL.md §4`) celebrates that the gestalt
bar "caught a desktop title-collision the per-mechanism dock gates all greened" — true, but that is
a GEOMETRY/placement miss (chips overlapping the `<h1>`), the one class a whole-page screenshot
trivially shows. The grey-glass MATERIAL regression — the thing the user actually re-opened on —
sailed straight through, because the auditor read the captures as "dark glass transmits" and wrote
PASS.

## Built / claimed / painted — the wave matrix

BA's component SOURCE genuinely landed at a high rate; the publish is real. The divergence is almost
entirely in the GLASS-MATERIAL + DOCK + VIZ surfaces, where source-green diverged from painted-truth.

### BUILT + PAINTED (genuinely landed and works — preserve in BC)

| wave | evidence | why it holds |
|---|---|---|
| **W-FEEDBACK-TONE** | `src/styles/feedback-tone.css` ships the `.feedback-tone` recipe (`color-mix(in oklab, <rung>, var(--tone) N%)`); the three opaque-slab maps (Toast/Notification/Alert) collapsed. No BC re-flag of feedback tone. | A clean factoring on the W55 tint seam; tone-on-glass is real source + no contradicting user defect. |
| **W-PROGRESS-GRADIENT** | `ProgressSectioned.vue:15,179,235` — the single `.progress-sectioned-flow` fill replaced the per-cell stack + screen-blend seam. No BC re-flag. | The R8-14 "totally broken" sectioned progress is genuinely rebuilt; no user complaint survived. |
| **W-HANDMARK** | `src/components/custom/handmark/HandMark.vue` ships; `/underline` DEC-8 fold landed (the phantom slides break struck — slides imports zero `/underline`). | The d6 family re-land is real source; the hand-voice register is not in any BC defect. |
| **W-FADING-SCROLL** | `src/components/custom/fading-scroll/FadingScroll.vue` + dual-path native/JS. No BC re-flag of edge-fade. | Real primitive, ≥2 consumers, painted. (The static `.scroll-fade-*` RETIRE slipped to BB — FINAL.md §5 self-corrects this over-claim.) |
| **W-NO-GRAY** | `proof:no-gray` OKLab chroma-floor on the neutral ladder; the warm-chroma identity. | The light-register chroma is genuinely warmed; no "still gray neutral ladder" BC defect (the GREY the user hit is the adaptive DARKEN, a different mechanism — see below). |
| **W-ICON-CHIP / W-PAGER / W-SUFFUSE2 / W-ATLAS-RECONCILE / W-EMISSION / W-CONFIG-CHASSIS (width contract) / W-CARVE2 / W-HYGIENE / W-SHELL-HOLD** | components/tokens shipped; no contradicting BC user defect. | The non-glass-material, non-dock band of BA is largely sound source that paints. |
| **The 4.0.0 publish + d6 fork close** | `v4.0.0`/`v4.0.1` git tags; MEMORY `project_glassui_400_published` (LIVE on npm, provenance, fork deprecated). | THE thing AZ/the d6 lineage trap could not do. The lineage map (FINAL §5) is honest and complete. This is BA's genuine win. |

### BUILT-NOT-PAINTED (source landed; the page is still wrong — the source-green/visually-broken core)

| wave | claimed | painted (BC live-grounded) | the divergence |
|---|---|---|---|
| **W-DARK-MATERIAL (scope 7)** | "live-verified (H1a, 7 scopes) … dark glass TRANSMITS the live field" (FINAL §1, dark-register reflect PASS) | `.glass-floating bg = oklab(0.798 0.002 0.006 / 0.84)` — L0.80, ZERO chroma (grey), α 0.84 near-opaque (BC LIVE-GROUNDING.md); the dock/floating/overlay band darken 20%-AA ink-ward UNCONDITIONALLY over light pages = the grey-slab. | scope 7 fixed the CONTENT tiers to the 4% floor but LEFT the dock + floating + overlay band at the full `--glass-tint-strength-aa` (20%) unconditional self-engage (`ladder.css:155`, `morph.css:451` as BA shipped — the `BC.W-AUDIT pre-fix` commit `e1b4b44c` is what later moved them to the floor). The grey-glass D1 root is the BA-shipped state of these three bands. |
| **W-DARK-MATERIAL (the dark rim)** | edge α 0.22 as the "primary silhouette device" | the dark rim `srgb(0.11 0.098 0.09 / 0.14)` reads as the user's "wtf is this black bar" (D2, USER-DEFECTS §A/§C) | a deliberate silhouette device read by the user as a defect on EVERY card top. The mechanism worked; the gestalt was wrong — and no gate read "does the card-top rim look like a bug?" |
| **W-DOCK-SECTIONS + 4th rail + W-DOCK-MORPH-INSITU** | "the separator IS the rail … box Δ0 … the in-situ morph (VT shipped)"; dock reflect RE-REFLECTED PASS | "dock animations entirely broken, not smooth, STUTTER … shrunken dock a blurry mess … the liquid morph turns WHITE/invisible … the ENTIRE vertical dock is broken + NOT CLICKABLE" (D3/D5, USER-DEFECTS §A) | the rail GEOMETRY was the only thing the gestalt walk stressed (chip-over-title), and even that was patched at W-SHELL-RAIL-RESEAT by MOVING the chips to the lower gutter (`dock.md §5`) — a placement nudge, not a rail rebuild. The morph-turns-white + stutter + not-clickable are MOTION/COMPOSITOR defects no BA gate or reflect read. The captures were taken `reducedMotion:reduce` (`aurora.md:23`, `dark-register.md:23`) so the morph never ran in the capture. |
| **W-GLASS-CAL (blur dial-back)** | "blur ~15-20% … `proof:glass-cal` π 8/8" | "increase glass-morphism for buttons … iOS-27 = increased glass while increasing legibility" + "shrunken dock a blurry mess" (D, USER-DEFECTS §D/§A) | the blur was dialed DOWN globally as a calm default; the user wanted MORE glass-morphism (BC mints `--glass-depth`/`.glass-deep` in BB precisely because BA over-calmed it). Source landed exactly as specced; the spec direction was wrong for the user's iOS-27 read. |
| **W-SURFACE-AXIS (the prune half)** | "ONE axis minted … 9 surfaces + Dialog clean break" | "the glass dialog is NOT glassy at all" + "/substrates/glass-panel vs a glass card — why so many glass duplicates? PRUNE + STANDARDIZE" (D4, USER-DEFECTS §C/§D) | the `surface` axis was factored (real source), but `src/components/custom/glass-panel/` was NOT pruned (still on disk) and the Dialog is downstream of the grey-darken so it reads opaque/not-glassy. The "unify the axis" work landed; the "prune the duplicate registers" + "make the dialog actually glassy" did not. |

### CLAIMED-NOT-BUILT-AS-EXPERIENCED (the viz robustness gap)

| wave | claimed | reality |
|---|---|---|
| (inherited substrate, BA staged it) | W-STAGE "per-category bg map … aurora-backed … the breathing register honest"; aurora reflect PASS | "the previews NEVER render (dark dead cards)"; the user observed aurora as a BLACK VOID on real Chrome (BC D9', screenshot 23.57.17). The WebGPU-first viz throw `no GPU adapter` and the WebGL2 fallback has an arming/visibility race on some configs. BA's reflect captured the field with `reducedMotion:reduce` (paints ONE static frame then PARKS — `aurora.md:23`), so the parked-black state WAS the capture default, read as "the field transmits." | BA did not break the viz; BA's STAGING claimed a transmissive backdrop the capture method could not actually verify was live-painting. |

## WHERE source-green diverged from painted-truth, and WHY the gates were blind

### 1. The grey originated at AZ, but BA's gates rewarded it

The unconditional 20%-AA self-darken (`--glass-tint-strength-aa: 20%`,
`tokens/glass-fx.css:136`) is the AZ.W-ADAPTIVE-AUTO mechanism (commit `5b72fd9b`: "the
unconditional self-engage fixing the @container no-op"). BA's W-DARK-MATERIAL scope 7 KNEW the 20%
grayed calm cards (BA.md grounding cites "R9-1 the slides gray, PROVEN live") and fixed the content
tiers — but stopped at the content tiers, leaving the dock + floating + overlay band grey. The
`BC.W-AUDIT pre-fix` (`e1b4b44c`) is the commit that finishes scope 7 on those three bands. So BA
inherited the grey, half-fixed it, and shipped the other half.

The reason no gate caught the residual: `proof:adaptive-glass` (the SOURCE gate) asserts the
darken MECHANISM is minted (`-aa ≤ 24%` — 20% passes, `proof-adaptive-glass.mjs:78,88`), that the
bright-bucket block WRITES `-aa` (it asserts the darken EXISTS, line 95), and that the dock/floating
plates THREAD the oklab tint seam (the darken REACHES the plate, lines 178-190). Every clause is
GREEN on the grey-broken state — the gate verifies the darken is wired, not that the result is warm
cream vs grey slab. And `proof:adaptive-glass-live` (the π) asserts the dock clears **4.5:1 contrast
+ ΔL silhouette over a synthetic-white worst-case backdrop** (`proof-adaptive-glass-live.mjs:3-7`)
— darkening the plate toward ink IMPROVES contrast and silhouette, so the gate REWARDS the
regression. The very thing the user hated is the thing that makes this gate green.

### 2. The gestalt gate is a roster-text + PNG-existence gate, not a paint gate

`proof:ba-gestalt` never reads a pixel of the captured PNGs beyond IHDR dimensions
(`proof-ba-gestalt.mjs:137-157` — `isRealPng` + `pngDimensions`, no luminance/chroma read). Its
operative-PASS is: every roster row has verdict ∈ {FAIL,PASS}, a ground anchor, and resolvable
capture paths (lines 346-381). The verdict strings are HUMAN-WRITTEN in `ba-gestalt-roster.md`. So
the close decision binds a hand-typed "PASS" — the exact trust surface the close-class lie exploits,
one indirection removed. (BB.W-GESTALT-GATE2 later hardened this with a `surface-hash` freshness
header + content-real checks, but at BA's close the gate was the bare roster-text form.)

### 3. The single terminal reflect ran once, reduced-motion, dark-biased

W-REFLECT2 captured all 8 surfaces on Jun 15 (the reflect PNGs are dated `Jun 15`; the roster was
edited `Jun 16` in the BB window). Two capture-method choices made the grey invisible:
- `reducedMotion:reduce` (`aurora.md:23`, `dark-register.md:23`) — the procedural field paints ONE
  static frame then parks. The dock morph never animated in the capture (so the morph-turns-white
  D5 could not appear), and the "previews never render" D9' parked-black state was the DEFAULT.
- the dark-register surface auditor was reading DARK mode, where the tint LIFT goes the right
  direction and dark IS the design intent. The grey-slab manifests in LIGHT mode over calm light
  pages — which the dark-register surface did not stress. The auditor wrote "dark glass TRANSMITS …
  R8-11 comprehensively cleared. VERDICT: PASS" (`dark-register.md:39`) while the live LIGHT-mode
  `.glass-floating` was `oklab(0.798 0.002 0.006 / 0.84)` grey.

### 4. The chip-graze accepted-tradeoff is the close-class lie in miniature

FINAL.md §4 names "the honest /forms/inputs chip-graze tradeoff" as an ACCEPTED graze "sub-perceptual
at the read distance," verdict PASS. The user's BC walk lists the same class as a defect ("the
dropdown dot is totally wrong + occluded", §F). The close negotiated a known-wrong placement into a
PASS by declaring it within proportion — the per-mechanism-π-cannot-verify-gestalt seam, except here
the GESTALT wave itself did the rationalizing.

## What BA got RIGHT (preserve — do not re-litigate)

1. **It published 4.0.0 with provenance and closed the d6 fork lineage** — the single hardest thing
   the constellation needed. The registry lineage map (FINAL §5) is honest, complete, and the
   `npm update`/`^x` bifurcation-strand trap is correctly diagnosed and reconciled at 4.0.0. MEMORY
   `project_glassui_400_published` confirms LIVE on npm. This is genuine and load-bearing for BC.
2. **The component SOURCE landed at a high rate and most of it paints.** W-FEEDBACK-TONE,
   W-PROGRESS-GRADIENT (single-fill), W-HANDMARK (+ the `/underline` DEC-8 fold that struck the
   phantom slides break), W-FADING-SCROLL, W-NO-GRAY (light-register chroma), W-ICON-CHIP, W-PAGER,
   W-EMISSION, the W-CONFIG-CHASSIS width contract (the 0px-slider class genuinely died at the
   chassis) — these are real factorings with real consumers that no BC user defect contradicts. BC
   must NOT rebuild them.
3. **The seed DIAGNOSIS was right.** BA correctly named the P-1 close-class (mechanisms green, page
   wrong) and the dark-register flatness as the cross-cutting root of a third of the findings. The
   thesis is sound; only the gate that was supposed to enforce it was paper.
4. **W-NO-GRAY's light-register chroma floor is a genuine identity win** — the warm-amber neutral
   ladder is real and orthogonal to the adaptive-darken grey (different mechanism). Preserve it.

## Failure classes BA exhibits (for BC Band 0 gate redesign)

- **single-terminal-reflect-deferral** — the gestalt verdict is DEFERRED by PLAN to one Batch-7
  W-REFLECT2 wave; 28 mid-tranche waves close `live-verified` with the gestalt "staged"
  (BA.md inv-4; FINAL §1). *Fix: a gestalt verdict per visual wave at its own close, not a terminal
  sweep.*
- **gestalt-gate-is-roster-text-not-paint** — `proof:ba-gestalt` reads verdict STRINGS + PNG IHDR,
  never pixels (`proof-ba-gestalt.mjs:137-157, 346-381`). *Fix: the gate must read luminance/chroma
  off the captured PNG, not just that it exists and someone typed PASS.*
- **source-mechanism-gate-rewards-the-regression** — `proof:adaptive-glass` /
  `proof:adaptive-glass-live` assert the darken is wired + clears contrast over white; a grey slab
  has BETTER contrast than warm cream, so the gate is green on the broken state and would FAIL the
  fix (`proof-adaptive-glass.mjs:78-95,178-190`; `-live.mjs:3-7`). *The single most dangerous class:
  the gate's success metric is anti-correlated with the user's read.*
- **local-tagged-gate-never-ci-blocks** — every binding paint gate (`proof:ba-gestalt`,
  `proof:adaptive-glass-live`) is `["local"]`; master CI green carried zero gestalt/paint signal
  (`proof-ba-gestalt.mjs:29-32,461`; `-live.mjs:18`). The release-tag battery ran them once,
  reduced-motion, at the very end.
- **reduced-motion-capture-hides-motion-and-viz** — the reflect captures used `reducedMotion:reduce`
  (`aurora.md:23`, `dark-register.md:23`), parking the field (black-preview D9') and freezing the
  morph (white-morph D5 never appears in the capture).
- **dark-biased-reflect-misses-light-mode-grey** — the dark-register surface verdict read DARK mode
  (where the lift is correct) and declared transmission PASS while LIGHT-mode `.glass-floating` was
  grey (`dark-register.md:39` vs BC LIVE-GROUNDING.md).
- **close-class-lie-by-accepted-tradeoff** — the chip-graze (FINAL §4) negotiated a known-wrong
  placement into a PASS as "sub-perceptual within proportion"; the user re-flagged it (§F dropdown
  occlusion). The gestalt wave did the rationalizing the per-mechanism π used to do.
- **half-fixed-inherited-regression** — scope 7 fixed the content tiers but left the dock/floating/
  overlay band at the inherited 20% AA (`ladder.css:155`, `morph.css:451` as BA shipped; finished by
  `BC.W-AUDIT e1b4b44c`). A wave that KNOWS a regression's mechanism and fixes it partially is worse
  than one that ignores it — it banks a "fixed" claim on an incomplete cut.
- **spec-direction-wrong-not-execution-wrong** — W-GLASS-CAL dialed blur DOWN exactly as specced;
  the user wanted MORE glass (BB then mints `--glass-depth` to undo it). Source-green is no defense
  when the design direction inverts the user's intent.
- **prune-claimed-not-executed** — W-SURFACE-AXIS factored the axis but did not prune the glass-panel
  duplicate the user named (`src/components/custom/glass-panel/` still on disk; D4 §D).

## The one-sentence verdict

BA correctly diagnosed AZ's mechanism-green-close-lie, built a gestalt gate to kill it, then made
that gate paint-blind (roster-text + PNG-existence, `["local"]`-tagged, single-terminal verdict,
reduced-motion dark-biased capture) — so the SAME class recurred one level up: the close bound a
hand-typed PASS over a grey-glass page, and shipped it to npm as 4.0.0.
