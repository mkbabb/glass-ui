# H-constellation — adversarial hardening: Constellation root + warp + easter-eggs (AY.W-CON1/2/3)

**Verdict: GAPS-FOUND.** The AY plan + the AUDIT-LEDGER are STALE on this lane: they describe warp,
tokens, and export as PARTIAL/UNADDRESSED, but AX.W17 already SHIPPED click-to-warp, the
critically-damped spring, the full `--constellation-*` token block (both arms), the `/constellation`
subpath export, the api types, a unit test, and a live π warp spec. The REAL open work is different
from what AY.W-CON1/2/3 describe — and three concrete things are genuinely WRONG or MISSING.

---

## What the AX.W17 ship ALREADY DELIVERED (so the AY waves must be re-scoped, not re-done)

Verified at HEAD (`at-dock-convergence`):

- **Click-to-warp** — `Constellation.vue:246-254` (`warpOnClick` → `warpToField`); the imperative
  `warpTo(client|local)` expose at `:271-279`. The spring is a dt-stepped 2nd-order critically-damped
  integrator (`constellationField.ts:337-355`, `WARP_RESPONSE=0.55s`, `WARP_ZETA=1.0`), advanced
  INSIDE the substrate's one rAF (no `useSpring`, no second rAF) — `stepField:271`.
- **Nearest-node-to-cursor + degenerate-self no-op** — `nearestNode` (`:300-321`), `warpTo` excludes
  the current focal (`:387-395`). LIVE-target tracking (re-reads `nodes[targetIdx]` each frame).
- **Full token block, BOTH arms** — `tokens.css:495-512` (light) + `:2058-2071` (dark): `node`,
  `node-dim`, `line`, `accent`, `edge-alpha`, `edge-focus-alpha`, `alpha`. Plain-hsl per arm (the
  Canvas2D-rejects-`light-dark()` discipline). `--constellation-alpha` tuned per-mode (0.80 light /
  0.88 dark — the recessive midpoint).
- **Export surface** — `package.json` ships `./constellation` subpath (`:316-318`) + the dts
  typesVersions entry (`:124`); `api/index.ts:209-221` exports `ConstellationProps`/`Field`/`Warp`.
  index.ts barrel (`:1-27`) exports the engine free-functions + types.
- **Gates** — `proof:constellation-substrate-single`, `proof:constellation-tokens`,
  `proof:constellation-warp-live` (the π live readback at `tests-visual/constellation-warp-live.spec.ts`),
  `proof:constellation-field` (the unit suite, 12 cases incl. warp convergence/chase/clamp).

**Implication:** AY.W-CON2's headline ("Click WARPS ... replacing/augmenting the ripple ... PRM-gated")
is ALREADY DONE except the easter eggs. AY.W-CON1's token tuning is DONE. The AUDIT-LEDGER rows 1/2/3
(PARTIAL / UNADDRESSED / PARTIAL) are wrong and must be re-stamped before planning, or the wave
re-implements shipped code (a churn-and-regress risk on a green gate).

---

## FINDING 1 (BLOCKER-class) — resize re-fit is the bespoke copy's, NOT glass-ui's. Adopting the lib REGRESSES it.

AY.W-CON1's hard gate: "RO resize re-fits in one frame (screenshot before/after); rescale nodes on
RO, not drift-out." **This re-fit exists ONLY in the slides bespoke copy** that L.W-ADOPT is slated
to DELETE:

- Slides `constellation.ts:144-162` — on a real RO size change with prior extent, it rescales EVERY
  node proportionally (`p.x *= sx; p.y *= sy`) on the SAME frame and re-anchors the pinned anomaly.
  The comment is explicit: without this "the nodes ... drift out to fill the larger canvas at speed
  px/frame — the visible 'takes a while to expand out' lag."
- glass-ui `Constellation.vue:149-162` — only updates `field.w/h/k`; nodes are seeded ONCE
  (`if (!field.nodes.length)`). There is NO `sx/sy` proportional rescale. `useCanvas2D.resizeTo`
  (`useCanvas2D.ts:253-266`) resizes the BACKING STORE only — it never touches the field nodes (it
  cannot; the field is the consumer's closure state).

So the glass-ui component has the EXACT drift-out lag the bespoke copy fixed. If slides deletes its
copy and adopts the lib as-is, slide-enter (where the canvas measures mid responsive-scale) drifts
out — a visible regression. **The re-fit must land in glass-ui FIRST (this is W-CON1's real content),
and the adoption is gated on it.** This is the chronic "fix at the ROOT" precept: the intelligence
lives in the consumer and must be transposed up, not deleted.

**Spec input:** the engine needs a `refitField(field, prevW, prevH)` free-function (proportional
node rescale, conserving `focalIndex` / `warp` by re-reading positions) called from the render loop's
size-change branch BEFORE the first post-resize step. The π gate must measure node-bbox-fills-canvas
within one frame of an RO resize (not a "looks right" screenshot — a numeric bbox-coverage readback,
the cardinal-lesson DELTA).

---

## FINDING 2 (GAPS-FOUND) — the anomaly SKIN + multi-instance scanner + anomaly-drift are NOT abstracted; L.W-ADOPT's "delete bespoke, warp+easter-eggs come for free" is UNDER-SPECCED and FALSE.

The slides copy is NOT just "the lib engine + a thin skin." It carries FOUR things glass-ui's
`drawOverlay`-callback model does not give a consumer for free:

1. **The anomaly skin** (`constellation.ts:326-390`, `drawAnomaly`) — pulse ring, inner ring, soft
   halo, core dot, the resolved-checkmark, AND a dashed monospace callout label. README claims this
   "stays a consumer skin" — true, but L.W-ADOPT must then RE-AUTHOR `drawAnomaly` as a slides
   `drawOverlay` fn. That is real migration work, not "free."
2. **The declarative consumption model** — slides uses `<canvas data-constellation data-anomaly
   data-resolved data-anomaly-label data-count>` markup across THREE SFCs (`SlideTitle.vue:14`,
   `SlideHandoff.vue:15`, `SlideAsk.vue:39`) + a `createConstellations(root)` SCANNER with ONE shared
   RAF across all instances + a `[data-state]` MutationObserver that runs the RAF only while a
   constellation slide is active + a `<html>.class` mode observer that re-samples the palette on a
   dark-flip. The glass-ui component is a per-instance `<Constellation>` Vue component. The migration
   is a MODEL CHANGE (markup-scanner → 3 mounted components), not a one-line import swap. None of
   L.W-ADOPT, L.W1, or AY.W-CON3 reckons with this.
3. **The anomaly drift** (`constellation.ts:209-231`, `drift`) — long jittered re-targeting of the
   pinned node, easeInOutQuad over 2.6s, clamped to ±0.14 of the seeded anchor. glass-ui has NO drift;
   its focal node only moves via `warpTo`. The README claims "the slides drift becomes 'warp to a
   periodically-chosen random node' — the same seam" — but NO ONE has implemented that auto-target
   source. It is asserted, not built. If slides adopts the lib, the wandering anomaly is GONE unless
   the auto-drift target-source lands.
4. **Bespoke tokens glass-ui does NOT ship** — `--constellation-edge-floor` (the neutral-edge alpha
   minimum, slides `deck.css:285`) and `--constellation-edge-anomaly-alpha` (the red-edge multiplier,
   `deck.css:286/817`). glass-ui's `drawEdges` (`constellationField.ts:397-430`) has NO floor and NO
   anomaly-edge concept — anomaly edges are a slides skin axis. The floor was a H.W4 light-mode
   visibility fix ("a distance-faded neutral edge composites below ~3% alpha and reads as unpainted").
   If the anomaly edge tint moves to a skin pass, the floor question for neutral edges remains open in
   glass-ui — verify the lib's edges read on cream without it, or transpose the floor.

**Spec input:** L.W-ADOPT must be split — (a) AY ships the auto-drift target-source + (optionally) the
edge-floor in the engine; (b) slides re-authors `drawAnomaly` + the resolved-check + the callout as a
`drawOverlay`; (c) slides replaces the `createConstellations` scanner with 3 `<Constellation>` mounts
(or AY ships a multi-instance/scanner convenience IF ≥2 consumers want it — else it stays slides-local
glue, which is FINE: the scanner is deck-orchestration, not field-engine, and does NOT violate the
no-bespoke-COMPONENT rule). The "no behavior delta" gate needs a before/after capture of all 3 slides
in BOTH modes — anomaly position, pulse, callout, resolved-check, drift.

---

## FINDING 3 (GAPS-FOUND) — the easter eggs are 100% UNBUILT and UNDER-SPECCED. AY.W-CON2 names them but specs neither the algorithm, the token surface, nor the ≥2-consumer bar.

`grep` confirms zero easter-egg code anywhere (`konami`/`supernova`/`gravity.well`/`flock` hit only
the workflow script that spawned THIS audit). AY.W-CON2 lists "konami-flock, double-tap supernova,
pointer-held gravity well" as examples with a hard gate "easter eggs fire; reduced-motion inert" —
but:

- **No algorithm.** Each egg is a distinct field mechanic (a transient force law on the node
  velocities). None is specced. "Pointer-held gravity well" needs a held-pointer timer + a 1/r²
  attractor added to `stepField`; "supernova" needs an outward impulse decaying over ~Ns;
  "konami-flock" needs a key-sequence detector + a boids-lite cohesion/alignment pass. These are NOT
  trivial and they touch the hot engine loop.
- **Overfitting bar UNADDRESSED.** Easter eggs are pure decoration with ONE plausible consumer (the
  deck cover). The ≥2-consumer precept (J invariant 10 / L invariant 8) says substrate-without-
  consumer is binary. Three speculative eggs in the library engine is overfit unless they are
  (a) opt-in props with a real second consumer, or (b) demo-only in the storybook. The AY plan does
  not state which. RUTHLESS read: at most ONE egg belongs in the engine as a documented prop; the
  rest are a storybook demo or are CUT. Building three field mechanics into the shared engine for one
  cover slide is exactly the overfit the precepts forbid.
- **PRM gating model unstated.** "reduced-motion inert" — but is the egg LISTENER unregistered (the
  warp precedent, `Constellation.vue:246`) or does it fire-but-freeze? The spec must pick the warp
  precedent (listener not registered under PRM) for consistency.
- **No live gate.** "easter eggs fire" is grep-bait, not a runtime observation. A fired egg must be
  measured by a π readback (node-velocity-delta after a synthetic supernova, or focal-cluster density
  after a flock) — the cardinal lesson. The current gate is unverifiable.

**Spec input:** AY.W-CON2 must DECIDE the egg scope against the ≥2-consumer bar BEFORE building. If
kept: ONE engine prop (recommend pointer-held gravity-well as the single field-coherent mechanic — it
extends the existing pointer-steer, no new event surface), specced as a transient force in `stepField`,
PRM-listener-not-registered, with a π velocity-delta readback gate. The others move to a storybook
demo route (which doubles as the W-DOC1 README example) or are CUT with rationale. A net-new
`proof:constellation-easter-egg` driving a π spec is required for the runtime claim.

---

## FINDING 4 (NOT-COHESIVE) — `proof:no-bespoke-constellation` (the AY.W-CON3 hard gate) DOES NOT EXIST and is unspecced.

`ls scripts/ | grep bespoke` → NONE. AY.W-CON3's hard gate cites `proof:no-bespoke-constellation` as
if it exists. It must be AUTHORED. And it cannot be a glass-ui-repo gate — the bespoke copy lives in
SLIDES (`/Users/mkbabb/Programming/slides/src/decks/til-briefing/constellation.ts`), a different repo.
So either: (a) it is an L-tranche (slides) gate asserting `constellation.ts` is deleted AND no
`createConstellations` import survives AND the deck imports `@mkbabb/glass-ui/constellation`; or
(b) it is a deletion-proof line in the L.W-ADOPT close. The AY.md places it in AY.W-CON3 (glass-ui) —
wrong repo. **The gate's HOME, its assertions, and its repo must be specced.** A grep-for-deletion is
insufficient per the hard-gate discipline; pair it with a slides `vite build` green + a 3-slide
capture (the behavior-delta proof).

---

## FINDING 5 (chronic-miss / language) — README + code carry mixed AW.W17/AX.W17 provenance tags and a "Research-backed" provenance blockquote that reads as version-history meta.

`README.md:15-25` is a provenance blockquote ("This README documents ... AV.W8 authored but
GATED-NOT-LANDED ... AX.W17 completes the abstraction"). Per the greenfield-no-meta + writing-style
memory entries, a shipped library README should describe what IS, not the wave archaeology. The file
headers also mix tags: `constellationField.ts:1` says "AW.W17", `index.ts:1` says "AW.W17", but the
warp comments say "AX.W17" and the README says "AV.W8 ... AX.W17". This is internal-provenance noise
in a public-surface doc. Minor, but it is the recurring meta-language leak the precepts flag.

**Spec input:** W-DOC1 strips the provenance blockquote + the inline `AX.W17`/`AW.W17` tags from the
README and the public doc-comments (keep them in the tranche docs, not the shipped surface). Cohere
the tag (the work is AX.W17; the AW.W17 headers are stale).

---

## FINDING 6 (GAPS-FOUND) — is `constellationField.ts` a 510-line god-module? It is AT the 510 line cap; AY.W-GOD1 lists it. But the carve must NOT fork the warp seam.

`wc -l` = 510 (the W-GOD1 ledger figure is current). The file is cohesive (one engine: seed/step/4
passes + the focal-warp cluster), so it is BORDERLINE not egregious. The W-GOD1 carve is reasonable —
split the focal-warp cluster (`nearestNode`/`warpStep`/`setWarpTarget`/`warpTo` + the WARP_* consts,
`:274-395`, ~120 lines) into `constellationWarp.ts`, leaving the neutral passes + seed/step. BUT: the
"return-shapes byte-identical" gate must hold AND `index.ts` re-exports must not change the public
symbol set. Risk: a careless carve breaks the `stepField → warpStep` call coupling (`:271`) or the
barrel. The carve is also COUPLED to Findings 1+2+3 — if W-CON1 adds `refitField` and W-CON2 adds an
egg force, those land in the engine and the line count moves again. **Order matters: W-GOD1 must run
AFTER the W-CON content lands, or it carves a moving target.** AY §3 says Band E (close) runs LAST, so
this is consistent — but the AY.W-GOD1 row should explicitly note the constellation carve is
downstream of W-CON1/2.

---

## Convergence criteria (what "perfected" concretely means for this lane)

1. AUDIT-LEDGER rows 1/2/3 re-stamped to reflect the AX.W17 ship (warp/tokens/export DONE; the open
   work is re-fit + drift-source + eggs + adoption).
2. `refitField` lands in the glass-ui engine; a π bbox-coverage readback proves nodes fill the new
   canvas within one frame of an RO resize (no drift-out). [FINDING 1]
3. The auto-drift target-source (the "warp to a periodically-chosen node" the README asserts) is
   BUILT in the engine so the slides wandering anomaly survives adoption. [FINDING 2]
4. Easter-egg scope DECIDED against the ≥2-consumer bar; the kept egg(s) shipped as opt-in prop(s)
   with a π velocity-delta runtime gate + PRM-listener-not-registered; the rest demo-only or cut.
   [FINDING 3]
5. `proof:no-bespoke-constellation` AUTHORED in the correct repo (slides/L) with deletion-proof +
   no-`createConstellations`-survivor + lib-import + a 3-slide both-mode behavior-delta capture.
   [FINDING 4]
6. slides DELETES `constellation.ts`, re-authors `drawAnomaly`+resolved-check+callout as a
   `drawOverlay`, mounts 3 `<Constellation>` (or keeps a slides-local scanner as deck-glue, NOT a
   field re-impl), with a captured no-behavior-delta DELTA across Title/Handoff/Ask in light+dark.
7. README provenance blockquote + inline wave tags stripped (greenfield-no-meta). [FINDING 5]
8. `constellationField.ts` carved < 500 AFTER the W-CON content, public symbols + return shapes
   byte-identical, `proof:no-god-module` green. [FINDING 6]

---

## Fold-into routing

- FINDING 1 (re-fit) → **AY.W-CON1** (this IS its real content; re-scope the wave off the stale
  "tune translucency" framing onto the re-fit transposition + the drift-source).
- FINDING 2 (anomaly skin / scanner / drift-source / edge-floor) → AY.W-CON1 (drift-source +
  edge-floor in the engine) + **L.W-ADOPT** (re-author skin + the model change).
- FINDING 3 (easter eggs) → **AY.W-CON2** (re-scope to the decided-scope egg + the π gate; pair with
  the H-proto-constellation-warp prototype lane).
- FINDING 4 (`proof:no-bespoke-constellation`) → **AY.W-CON3** moves the gate-AUTHORING note to the
  L repo + **L.W-ADOPT** owns the gate.
- FINDING 5 (README meta) → **AY.W-DOC1**.
- FINDING 6 (god-module carve) → **AY.W-GOD1** (ordered after W-CON1/2).
