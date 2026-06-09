# H-research-dock-anim — RESEARCH the dock animation SOTA + diagnose the shell-first/items-lag from first principles

**Lane** H-research-dock-anim (AY hardening, RED-TEAM) · **HEAD** `89edffc` · **Mode** read-only RESEARCH + diagnosis (no code) · **Date** 2026-06-09 · **Verdict** GAPS-FOUND

This lane researches the iOS/macOS dock + morph animation SOTA, then adversarially diagnoses
glass-ui's dock animation against it. The AX dock band (W01-W06, W45, W61) built a genuinely
SOTA single-scalar spring morph engine — and the corresponding hardening lane (`AX/.../hardening/CH-dock.md`)
already RED-teamed the GLASS/scale/adoption axes. This lane is DISTINCT: it red-teams the
ANIMATION axis the user named in PROMPT-CORPUS item #5 — "the inner items must fade/morph
in-and-out IN LOCKSTEP with the shell (today the shell shrinks first, items lag a few ms)" —
and asks whether the W01 single-scalar architecture ACTUALLY delivers lockstep, or whether a
residual first-principles desync survives. It DOES. Plus the SOTA reveals two whole capabilities
the dock LACKS (proximity magnification, transform-not-layout morph) and a stale README/gate set.

---

## PART 1 — THE SOTA (researched, cited)

### A. The spring is the right primitive — glass-ui already speaks it.
Apple's whole control language is ONE damped-harmonic-oscillator ODE exposed as `response` +
`dampingFraction` (WWDC18 *Designing Fluid Interfaces*; WWDC23 re-parameterized as
`duration`+`bounce`). The two load-bearing SOTA properties:
- **Springs read as instant because of SHAPE, not bounce** — a spring jumps then settles
  (most of its time gradually approaching target), unlike an ease-in-out that ramps up and feels
  delayed. glass-ui's `--spring-dock` (0.32, 0.7, ~+4.6% peak) is correctly in the iOS control band.
- **Interruptibility (velocity-continuity) is THE headline iOS property** — a retargeted spring
  carries its current velocity into the new solution; a CSS `linear()`/`transition` spring CANNOT
  (it restarts from zero). glass-ui's `SpringProgress.reset(0, inheritedVelocity)` re-seat is correct
  and is the one genuinely-iOS piece the engine keeps.

VERDICT on the spring: glass-ui is SOTA-correct here. The desync is NOT a spring-curve problem.

### B. macOS dock magnification — a capability glass-ui has ZERO of.
The canonical macOS/web-recipe dock magnification is a **Gaussian-neighbor proximity falloff**: a
max scale at the icon under the cursor, a pixel radius (~110px) within which neighbors magnify on a
distance→scale map, each icon's scale on its OWN spring so neighbors settle independently as the
cursor sweeps. The buildui.com "Magnified Dock" recipe drives per-icon `width` off cursor distance
through Framer-Motion springs. glass-ui's dock has NO proximity magnification — `grep -rn 'magnif|proximity|distance|neighbor'`
over `src/components/custom/dock/` + `src/styles/dock*` returns NOTHING but the DockIconButton
specular `--mouse-x/--mouse-y` catch-light (`DockIconButton.vue:49,70`). The only hover response is
a UNIFORM whole-shell scale (`--scale-hover-dock`, `--dock-collapsed-hover-scale`) — no per-icon
magnification, no neighbor falloff. This is the single biggest missing SOTA feature, and the user's
phrase "ios-springy" + "magnification" (AY.md §0 line 28 "the magnification") names it explicitly.

### C. Animate transform + opacity, NOT layout (the universal SOTA rule glass-ui violates).
Every modern animation authority is unanimous: **only animate `transform` and `opacity`** (they
skip layout+paint, run on the GPU/compositor); animating `width`/`height`/`padding`/`top`/`left`
per-frame is "layout thrashing" — it forces a layout recalc EVERY frame and causes jank (Emil
Kowalski's 43-rule corpus rule #1; Motion's performance tier list; Nolan Lawson). glass-ui's dock
morph writes `inline-size` (and via the chrome block, `padding-block`/`padding-inline`) per-frame on
`.dock-layers` (`layers.css:53-61`, `morph.css:88-97`) — D-tier layout-recalc-per-frame, the EXPENSIVE
corner of the 16.67ms budget. The W01 plan ACKNOWLEDGED this and justified it via the clip-reveal
aperture ("content laid out once, box-as-window, paint-bounded not reflow-per-frame"). That
justification is PARTIALLY true (the dock's OWN children are laid out once at `max-content` behind
the clip) but INCOMPLETE: changing a `position:inline` dock's `inline-size` per frame still reflows
its FLOW SIBLINGS and ancestors every frame (the dock is an in-flow centered block by default —
`.dock-inline { margin: 0 auto }`, `GlassDock.vue:514-515`). A `position:fixed` dock escapes flow
(no sibling reflow) but a `position:inline`/`sticky` dock does not. The SOTA-correct morph drives a
`transform: scaleX()` (compositor-only) with the content counter-scaled, or `interpolate-size`/
`calc-size()` for the auto→fixed interpolation.

### D. `interpolate-size`/`calc-size()` — NOT Baseline (Chrome 129+ only; no Firefox/Safari).
The native "animate width to/from `auto`/`max-content`" facility (`interpolate-size: allow-keywords`
on `:root`, or `calc-size()`) is Chrome/Edge 129+ ONLY — NOT Baseline, no Firefox, no Safari. W01
correctly REJECTED it as a per-frame co-driver (it raced the spring and froze the dock at AV.W9.0)
but correctly noted it is viable as a ONE-TIME measurement read. SOTA status confirmed: it cannot be
the morph driver until cross-engine, but the glass-ui FLIP-measure-then-spring approach is the right
cross-engine substitute — the residual defect (Part 2) is in the FLIP TIMING, not the choice of FLIP.

### E. FLIP + double-rAF is the known one-frame-lag trap.
The FLIP technique (Paul Lewis) measures first/last, inverts, plays — and the canonical
double-rAF pattern exists PRECISELY because a single rAF between a layout write and the transition
enable produces a one-frame lag/snap. The SOTA lesson: read layout metrics at the START of a frame
(batch reads, then writes) to avoid forced-reflow interleave. glass-ui's morph does a measure→arm
inside ONE rAF, then the spring's first scalar write lands the NEXT rAF — the residual lag (Part 2).

> Sources: [Apple — spring(response:dampingFraction:)](https://developer.apple.com/documentation/swiftui/animation/spring(response:dampingfraction:blenduration:)),
> [WWDC23 — Animate with springs](https://developer.apple.com/videos/play/wwdc2023/10158/),
> [buildui — Magnified Dock](https://buildui.com/recipes/magnified-dock),
> [Emil Kowalski — Great animations](https://emilkowal.ski/ui/great-animations),
> [Motion — performance tier list](https://motion.dev/magazine/web-animation-performance-tier-list),
> [Chrome — Animate to height:auto](https://developer.chrome.com/docs/css-ui/animate-to-height-auto),
> [MDN — interpolate-size](https://developer.mozilla.org/en-US/docs/Web/CSS/interpolate-size),
> [Nolan Lawson — Accurately measuring layout](https://nolanlawson.com/2018/09/25/accurately-measuring-layout-on-the-web/) — accessed 2026-06-09.

---

## PART 2 — THE DIAGNOSIS: does the single-scalar engine ACTUALLY achieve lockstep?

The W01 thesis (`AX.W01` wave, `dockMorphContext.ts`, `layers.css`, `morph.css`) is: ONE
`SpringProgress` writes ONE scalar `--dock-morph-t` once per frame to the `.glass-dock` root, and
EVERY axis (box `inline-size`, root `padding`/`background`/`border`, leaving-pane `opacity`, child
stagger) is a pure `calc()` read off that one scalar — so "co-temporal by construction." This is the
right architecture and it KILLED the old two-clock desync (the deleted root CSS-transition + the VT
fork). But "one scalar drives every read" does NOT by itself guarantee the SHELL and the ITEMS START
in the same frame. Three residual first-principles defects survive:

### D1 — The two-rAF arming gap: the SHELL pins at `from` for 2 frames before ANY motion; the children also hold at t=0, so they appear co-temporal at START but the box's first VISIBLE motion is delayed ~2 frames AND the children's reveal is keyed to a DIFFERENT scalar than the box.

Trace `dockMorphContext.onSwap` (`dockMorphContext.ts:268-341`), the exact sequence on an expand:

- **Frame T0 (synchronous, watch fires):** capture `fromSize` (`:284`); swap layer refs (`:288-289`);
  PIN container `--dock-morph-from = --dock-morph-to = fromSize` (`:313-314`); write `--dock-morph-t: 0`
  on root (`:315`); set `data-morphing` (`:316`). The box now HOLDS at `from`. The children hold at
  `--dock-expand-t` per their class endpoint. Vue flushes the `.collapsed`→`.expanded` class flip.
- **Frame T1 (one rAF later, `:324`):** clear morph vars, force `max-content`, measure `toSize`
  (`:336-338`), then `armTarget` (`:339`) → set the real from/to span (`:259-260`) → `ensureSpringRunning`
  (`:264`) → `spring.play(onFrame)` (`:221`). The box STILL holds at `from` this frame — `--dock-morph-t`
  is still `0`. `spring.play` schedules its OWN rAF; the first `onFrame` write of `--dock-morph-t`
  has NOT happened yet.
- **Frame T2 (the spring's first rAF):** the FIRST `--dock-morph-t > 0` write lands (`:221-223`). The
  box finally starts to grow.

So the box visibly holds STILL at the collapsed width for T0 AND T1 (≈2 frames / ~33ms at 60fps) before
the first motion at T2. The children, gated on the SAME `[data-morphing]` + `--dock-morph-t`, also hold
at t=0 for those frames — so the START is co-temporal (good, no shell-first), BUT:
1. **The whole morph is preceded by a ~2-frame dead hold** — a perceptible hitch on press/hover before
   anything moves (the "feels laggy to START" tell, distinct from the original shell-first desync).
   This is the SOTA double-rAF trap (Part 1.E): the measure is in T1, the spring's first write is T2.
2. **The children's reveal scalar is NOT the box's scalar.** The box-size reads `--dock-morph-t` directly
   (`layers.css:55-61`). But the child stagger reads `--dock-expand-t` (`layers.css:240`), which is
   DERIVED per-class: at rest `.expanded` → `1`, `.collapsed` → `0`, and ONLY under `[data-morphing]`
   does it track the live scalar (`morph.css:46-53`). The class flip flushes at T0; so between T0 and the
   first paint, the active pane's `--dock-expand-t` resolves through the `[data-morphing]` branch to
   `var(--dock-morph-t) = 0` for the expanding case — correct. But this is a SECOND derivation layer
   (`--dock-morph-t` → `--dock-expand-t` → child opacity) with its own `:not(.vertical)` / class-state
   selector matrix (`morph.css:37-53`), so the box and the children are co-temporal ONLY if every
   selector in that matrix matches in the same frame as the box-size rule. The summary pane is keyed to
   `--dock-morph-t` DIRECTLY (`morph.css:145-147`, the DK1 decouple) — a THIRD reveal scalar. Three
   reveal derivations (box=morph-t, full-pane children=expand-t, summary-pane=morph-t) that the W01/W45
   comments assert are "one clock" but are actually three calc chains off one clock, each with its own
   gating selector. A miss in any selector (e.g. the `:not(.vertical)` scoping, or a density/wrap
   variant that doesn't match) silently drops a layer out of lockstep. This is the under-specced surface
   the user's "items lag a few ms" lives in NOW (post-W01) — not a second timer, but a multi-hop calc
   gate that no gate measures end-to-end.

### D2 — `proof:dock-animation-live` SKIPs on the CI runner; the device-free arm catches a spring re-bounce but NOT the D1 frame-gap. The lockstep claim is unverified in CI.

`scripts/proof-dock-animation-live.mjs` measures the right thing (root box width vs `--dock-morph-t`
onset within ≤1 frame on ONE rAF timeline) — but ONLY when a Playwright harness + π workspace + demo
dev server are present (`:431-512`). On a zero-dep CI runner it SKIPs the live arm and runs only the
TOKEN-PEAK secondary (a `tokens.css` string parse of `--spring-dock`'s `linear()` peak ≤ +4.6%). That
secondary catches a spring RE-BOUNCE regression but is BLIND to the D1 two-frame arming gap and to the
box-vs-CHILD lead/lag (it never samples a child). And the live arm samples a LEAVING child's opacity
(`:summary`) vs the box — it does NOT sample the ENTERING full-pane CHILDREN's stagger reveal vs the
box, which is exactly the "items lag the shell" surface (D1.2). So the gate that is supposed to lock
the user's #5 defect is (a) not run in CI and (b) samples the wrong child even when run. Per the
cardinal lesson (MEMORY: "live-verified needs a captured DELTA") + CH-dock CHRONIC-1 (headless-green
over live-broken IS the dock case study), the lockstep claim is NOT evidence-backed at HEAD.

### D3 — The morph drives LAYOUT (`inline-size`/`padding`) per-frame on an in-flow default dock — reflowing siblings every frame (Part 1.C). On `position:inline`/`sticky` this is a per-frame forced reflow of the page region around the dock, the SOTA anti-pattern. The clip-reveal justification only covers the dock's OWN children, not its flow siblings.

`position` defaults to `"inline"` (README:182 + `GlassDock.vue:513-515`), so the default dock is an
in-flow `margin:0 auto` block whose `inline-size` changes every spring frame → the line-box / ancestor
reflows every frame. The W01 audit-feasibility note (#4) only argued the dock's INTERNAL subtree is
paint-bounded; it never addressed the EXTERNAL flow reflow. A SOTA-correct morph animates `transform`
(compositor-only) with content counter-scaled, OR pins the dock out of flow during the morph. This is
why the morph can drop frames on a busy page even though the spring math is perfect.

---

## PART 3 — THE LOCKSTEP MODEL (the path-forward for AY.W-DOCK1/W-DOCK2)

The fix is NOT to re-roll the spring (it is correct) nor to re-introduce a second clock. It is to
close the START-gap and collapse the three reveal-derivations to one, and to lift the morph off
per-frame layout. The model, in priority order:

1. **Kill the 2-frame arming gap (D1.1).** The measure (T1) and the spring's first scalar write (T2)
   must collapse to the SAME frame. Either: (a) measure the `toSize` SYNCHRONOUSLY at T0 using a
   detached/cloned measure or a `calc-size(max-content)` read (Chrome) with a cross-engine
   off-DOM-clone fallback, then start the spring at T0 — no deferred rAF; or (b) keep the one-rAF
   measure but write the spring's first frame (`--dock-morph-t` at the spring's t=dt) SYNCHRONOUSLY in
   the SAME T1 rAF callback right after `armTarget`, instead of waiting for `play`'s next-rAF
   schedule. The box must begin moving on the SAME frame the user's gesture resolves — the
   "springs-read-as-instant" SOTA property (Part 1.A) is defeated by a 2-frame pre-hold.

2. **Collapse the three reveal-derivations to ONE measured scalar (D1.2).** The box-size, the
   full-pane children stagger, AND the summary reveal must read the SAME `--dock-morph-t` (or one
   directional alias) through ONE selector that cannot drop a variant. The `--dock-morph-t` →
   `--dock-expand-t` (per-class, `[data-morphing]`-gated, `:not(.vertical)`-scoped) → child-opacity
   chain is the under-specced hop; flatten it so the children's reveal onset is provably the box's
   onset + the per-child stagger step, with NO class-state selector that can fail to match mid-morph.

3. **Lift the morph off per-frame layout (D3).** Drive the box reshape via `transform: scaleX()` +
   content counter-scale (compositor-only, the SOTA), OR make the dock `position:fixed`/out-of-flow
   for the morph duration so the per-frame `inline-size` write reflows nothing but itself. Re-verify
   the clip-reveal still reads correctly under a transform (the aperture becomes a scaled clip).

4. **Add macOS proximity magnification as the dock's hover SOTA (Part 1.B) — the user's "magnification."**
   A `pointermove` on the dock writes a cursor-X to the root; each `DockIconButton` reads its own
   distance and scales on a Gaussian falloff via `transform: scale()` (compositor-only), each on its
   own near-critical spring (ζ≈1, no bounce — magnify-follow per CH-dock SOTA-NOTE-7). PRM-gated.
   This is NET-NEW capability (the ≥2-consumer bar: every dock + the keyframes dock model).

5. **Re-author the gate to measure the ENTERING children vs the box on ONE timeline (D2), and run it
   in CI** (or capture the paired-π DELTA per CAPTURE-PROTOCOL). The lockstep gate must sample the
   full-pane child reveal onset, not just the leaving summary opacity.

6. **Fix the stale README + retired gates (W-DOC1 fold).** `README.md:75-114` still documents the
   DELETED VT path ("View-Transitions path: the browser snapshots…", "Directional intent via typed
   View-Transitions") and `proof:dock-opacity-lockstep`/`proof:dock-motion-parity` reference the
   retired two-clock `--dock-motion-resize` model. The README is the "SOURCE OF TRUTH for the dock's
   animation language" (README:8) and it describes an architecture W01 abrogated — a research-backed
   README rewrite is owed (PROMPT-CORPUS #14, AY.W-DOC1).

---

## PART 4 — SECONDARY FINDINGS

- **The `@property --dock-morph-t` uses `inherits: true` (`dock.css:61-65`), contradicting the W01
  SOTA-deepening note #1** which mandated `inherits: false` as the "inheritance-bomb guard" (a cited
  production case: 8ms/frame whole-subtree recalc over 1300 elements when an animated registered prop
  inherits). The scalar IS written locally on the `.glass-dock` root (not `:root`), so the bomb is
  SCOPED to the dock subtree — but the dock subtree on a `layout="grid"` big-dock can be dozens of
  tiles, and `inherits:true` forces a style recalc on every descendant every spring frame. The W01
  note said `inherits:false` + the children read via a small inheriting ALIAS (`--dock-expand-t`,
  `layers.css:77-79` does exactly this). So the design INTENT was `morph-t:false` + `expand-t:true`,
  but the implementation shipped `morph-t:true` — a divergence from the wave's own SOTA note that no
  gate caught. W-DOCK2 should reconcile (set `--dock-morph-t` `inherits:false`, confirm `--dock-expand-t`
  is the inheriting alias the children read).

- **`proof:dock-animation-live` does not assert the retarget/velocity-continuity arm in CI.** The
  gate's described "retarget case (velocity-continuity)" (`:header`) is in the live arm only; the
  device-free secondary cannot see it. The one genuinely-iOS property (interruptibility) is therefore
  unverified outside the π workspace.

- **README API table is stale** (`README.md:185` lists `shape: "pill"|"rounded"` but the type is
  `"pill"|"rounded"|"card"`, `GlassDock.vue:55`; `position` default listed `"inline"` matches). Minor,
  but it is the "source of truth."

---

## CHRONIC-MISS LINEAGE

The "shell shrinks first / items lag" defect (PROMPT-CORPUS #5, AUDIT-LEDGER #5 = CHRONIC) has slipped
across keyframes.js → AX (W01 fixed the GROSS two-clock desync but the RESIDUAL 2-frame arming gap +
the three-hop reveal derivation survive un-measured). AY-LEDGER lists it as the headline chronic. The
recurrence pattern is the cardinal one (CH-dock CHRONIC-1/CHRONIC-4): the engine ships `complete`/
`live-verified` on a headless-green gate that (a) SKIPs in CI and (b) samples the wrong child, so the
residual is invisible to the gate and the "lockstep achieved" claim is never falsified live. AY.W-DOCK1
MUST capture a paired-π DELTA sampling the ENTERING children vs the box, or the chronic slips again.
