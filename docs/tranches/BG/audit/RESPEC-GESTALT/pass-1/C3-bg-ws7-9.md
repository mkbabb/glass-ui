# C3 — BG plan critique: WS7 (close-machine) · WS8 (C-SAFARI/refraction) · WS9 (paper-deep)

**Lens:** C3 · **Date:** 2026-07-01 · **Branch:** `tranche/BG` @ `976dc890` · verified on real disk.

## Verdict

WS7's close-machine is the **best-shaped of the three** and its load-bearing Band-0 is already
BUILT + committed on disk (ship-attestation bypass-closer, fold-ledger DRY leaf, gestalt roster,
deferred-ledger — cursor rows 0.1-0.4 DONE), so the "source-green ≠ paint-truth" disease finally
has a real tag-blocker. That is a genuine, un-contrived architectural win. But three structural
problems cut across WS7-9: (1) **the C-SAFARI full-fidelity refraction (WS8 keystone 13.3) is
gated on a WS1↔WS8 render-target seam that STILL does not exist** — only the `getImageData`
luminance-proxy marker landed, not the in-context FBO the second-sample needs — so the ★★★
3-wave chronic is shaped to land ONLY its Tier-1 floor + SOURCE arm, with the binding real-Metal
gestalt capture still a manual close-precondition that can slip a 4th time; (2) **carve ownership
is contradictory and under-coordinated** — `useGlassBackdropLuminance` has TWO BG carve-owners
(WS4 10.13 + WS8 13.3), `createCanvasLifecycle` is simultaneously carve-scheduled (WS4 10.12) AND
"UNTOUCHED shasum-fenced" (WS8 §37), the ratchet is NOT drained (15 baselines remain despite BH
PLAN §71's "drained to ∅"), and BH B2.4b's single-landed-shape assumption is exposed to all of it;
(3) **feature builds are smuggled into the close workstream** — WS7 Band-4 (DATE-CALENDAR reka
build, CHART-FAMILY, DS-COMPLETE) is net-new component development the spec itself labels
"post-close coverage," bloating a close workstream to ~16 waves. WS9 is honest (64% converged, paint
unproven) but re-opens the exact feTurbulence mechanism the user rejected TWICE while booking the
robust raster-asset transposition as a fallback rather than the primary — the over-contrivance the
mandate condemns. Net: WS7-close is sound; WS8-C-SAFARI is de-risked but still deferral-shaped at
the fidelity ceiling; carve ownership needs a reconciliation pass before any of WS2/4/5/8 lands.

---

## Findings (severity-ranked, file:line)

### F1 [MAJOR] — WS8 keystone full-fidelity refraction is WS1-render-target-gated, and that seam is UNBUILT; only the luminance-proxy marker landed

The WS8 keystone `BG.W-GLASS-BACKDROP-SAMPLE` (cursor 13.3) needs WS1's shell aurora to expose the
**live `WebGL2RenderingContext`** so refraction can be a "second, displaced sample of the SAME field,
inside the SAME GL context" (`SPEC-pass4-converged.md:45`). The build-map states this as the WS1
contract: "WS1's shell aurora exposes the live `WebGL2RenderingContext` + `[data-glass-field-canvas]`
marker WS8 BACKDROP-SAMPLE needs" (`bg-build-map.md:106-107`).

On disk, WS1 landed ONLY the marker attribute + a `getImageData` luminance proxy, NOT the shared GL
render-target:
- `demo/layout/AppShell.vue:328` writes `data-glass-field-canvas`.
- `useGlassBackdropLuminance.ts:231` READS it: `"[data-glass-field-canvas] canvas, canvas[data-glass-field-canvas]"` — this is the downsampled-canvas `drawImage + getImageData` proxy (a pixel read), **not** an in-context FBO texel sample.
- `src/composables/glass/webgl/createRenderTarget.ts` **does not exist** (`ls` → No such file).
- WS8's own R4 admits it: "the WS1↔WS8 render-target seam DOES NOT EXIST AT HEAD AND WS1's converged spec exposes NOTHING" (`SPEC-pass4-converged.md:247`).

WS1's field waves are DONE (cursor 2.2/2.4), so the marker is FROZEN as the luminance path — the
FBO exposure was **never in WS1's landed scope**. The keystone (13.3) therefore cannot do the
in-context second-sample the "metal-flow" gestalt demands; it can only land the Tier-1 floor shader
(`glass-refract.glsl.ts`, also still absent — `ls` No such file) and the device-free SOURCE arm.
Consequence for C-SAFARI: the shape genuinely improves the odds (the Tier-1 WebGL2 floor does NOT
depend on `backdrop-filter: url()`, the thing that was Safari-impossible for 3 tranches — a real
architectural transposition), but the **binding, full-fidelity real-Metal-Safari.app gestalt capture
rides a WS1-gated keystone whose precondition WS1 did not deliver**, plus a `safaridriver-or-DROP`
escape (`SPEC-pass4-converged.md:124`). This is the honest answer to "shaped to land or defer": the
floor is shaped to land; the apotheosis is shaped to defer unless WS1 is re-opened to expose the
render-target.

### F2 [MAJOR] — `useGlassBackdropLuminance` has TWO BG carve-owners (WS4 10.13 + WS8 13.3); uncoordinated; BH B2.4b assumes ONE shape

The 534L `useGlassBackdropLuminance.ts` (currently over the 500-line bound) is claimed by two
different BG waves in two workstreams:
- **WS4** `BG.W-AMBIENT-HISTOGRAM-LEAF` (cursor 10.13, PENDING): "carve `useGlassBackdropLuminance` (542L) → `ambientHueHistogram` + `wcagLuminance`" (`bg-build-map.md:471`).
- **WS8** keystone (13.3): `createBackdropSource.ts` "brings `useGlassBackdropLuminance.ts` 542L→~340L" (`SPEC-pass4-converged.md:159`).

Both carve the SAME file on DIFFERENT axes (histogram/luminance leaf vs backdrop-source/FBO-sampler
leaf). Neither the cursor nor the build-map reconciles the two owners or sequences the residual line
count. BH then assumes a single landed shape: B2.4b "Consume/verify … `useGlassBackdropLuminance` …
match BG's landed leaf shapes" (`BH/PLAN.md:72`). If both BG carves land uncoordinated → merge seam +
double-drain accounting; if only the WS4 histogram carve lands (WS8 13.3 is the highest-risk
WS1-gated keystone, per F1) → `createBackdropSource` never ships and the FBO texel sampler has no
home. This is the intra-BG double-claim the carve-ownership audit must catch — it is NOT a BH↔BG
collision (BH's 3 carves are disjoint, see F5), it is a BG↔BG one.

### F3 [MAJOR] — `createCanvasLifecycle` is simultaneously carve-scheduled (WS4 10.12) and "UNTOUCHED shasum-fenced" (WS8 §37); the fence description is pre-carve-stale

- **WS4** `BG.W-CANVAS-LIFECYCLE-LEAVES` (cursor 10.12, PENDING): "carve `createCanvasLifecycle` (695L) + `useWebGPUCanvas` (606L); re-measure POST-WS5" (`bg-build-map.md:469`).
- **WS8** settled-fences: "`createCanvasLifecycle.ts` (695L, 0 `getContext`/FBO refs) UNTOUCHED (P1, shasum-fenced)" (`SPEC-pass4-converged.md:37`), and the two-pass FBO wiring is placed in `useWebGLCanvas.ts` + the backend closure precisely so the leaf stays untouched (`:161`, `:193`).

WS4=band 10 precedes WS8=band 13, so by the time WS8 wires the FBO the leaf will have been carved
into `lifecycle/scheduler.ts` + `visibility.ts` (the SYNTHESIS-PASS1 target shape). WS8's fence still
describes the **pre-carve 695L monolith** ("695L, 0 getContext/FBO refs") — a shasum keyed to bytes
that will no longer exist. Either the WS8 P1 fence is stale (must re-pin to the post-carve leaf set),
or the ratchet close-state can never be reached (see F4), because `createCanvasLifecycle` at 695L is
one of the un-drained baselines and it is NOT shader-exempt.

### F4 [MAJOR] — the god-module ratchet is NOT drained; BH PLAN §71 "`RATCHET_BASELINES` drained to ∅" is FALSE on disk; the close-state is coupled to ~8 pending carve waves

`proof-no-god-module.mjs:48-108` still lists ~15 grandfathered baselines on disk, incl.
`createCanvasLifecycle.ts: 695`, `useWebGPUCanvas.ts: 606`, `useDockFission.ts: 604`,
`property-regs.css: 566`, `fission-bridge.css: 552`, `useDockContextSilhouette.ts: 551`,
`useGlassBackdropLuminance.ts: 542`, `useBlobSatellites.ts: 533`, `SegmentedTabs.vue: 512`,
`useGooDotMatrix.ts: 508`, `api/index.ts: 505`. The declared close-state is
`violations == [] AND RATCHET_BASELINES == {}` (`proof-no-god-module.mjs:20,50,313`). BH PLAN §71
asserts "all <500, `RATCHET_BASELINES` drained to ∅" — but that describes ONLY the 3 BH rows
(CarouselContent/PagerDots/useBloomUp) which were deleted from the map; the ~15 BG-owned baselines
remain. The close-state is thus coupled to every one of WS2 (useDockFission), WS4 (10.12
lifecycle/webgpu, 10.13 histogram, TABS-KEYBOARD-LEAF), WS5 (blob/goo-dot), WS8 (13.3 backdrop), and
BH B2.2 (api fold-delete) LANDING. A single slipped carve (esp. the WS1-gated WS8 keystone, F1)
leaves the ratchet non-empty → `BG.W-CUT` cannot pass `--run full` with the close-state assert. The
plan does not surface this coupling as a cut-gating dependency chain.

### F5 [POSITIVE, verified] — WS9 owns NO god-module carve; BH's 3 carves are disjoint + already landed; no WS9↔BH double-claim

The assignment's "WS9 carve ownership vs BH's carve claims" resolves CLEAN on the axis asked: WS9's
FILES TOUCHED (`SPEC-pass1-converged.md:120-134`) are `paper.css` re-engineering, HandMark leaves,
`glass-fx.css`, `package.json` — **zero >500L line-count carve**. BH's 3 owned carves
(CarouselContent.vue→`useCarouselWorm.ts`, PagerDots.vue→`usePagerWorm.ts`, useBloomUp.ts→
`bloomUpField.ts`) are LANDED at `eaf2c172` and disjoint from any WS7/8/9 file
(`BH/PLAN.md:71`; SYNTHESIS-PASS2.md:57-58 "BG owns 8 of 12 src carves; BH owns 3"). The real carve
double-claim is intra-BG (F2/F3), not cross-tranche. The one WS9↔BH `package.json` seam is
EXPLICITLY coordinated: BH B2.1-swap is "the LITERAL sole `package.json` writer between WS9's pf-drop
and `BG.W-CUT`" (`BH/PLAN.md:68`) — WS9 drops `perfect-freehand`, B2.1-swap does the peer bumps, no
overlap.

### F6 [MAJOR, over-contrivance] — WS7 Band-4 census BUILDs (DATE-CALENDAR / CHART-FAMILY / DS-COMPLETE) are net-new feature development smuggled into the "close" workstream as "post-close coverage"

WS7 is chartered "Quality · Coverage · Close." Band-4 parks THREE net-new component builds inside it:
`BG.W-DATE-CALENDAR` (reka-ui BUILD), `BG.W-CHART-FAMILY` (token-SVG BUILD), `BG.W-DS-COMPLETE`
(`SPEC-pass4-converged.md:176,226`; cursor 12.10-12.12). The spec itself concedes these are "post-close
coverage — specified with verdicts, not yet built" (`:277`). Building a calendar + a chart family is
feature development, not close-machine work; routing it through the deferred-ledger's "genuinely
adjudicated FOLD-LEDGER row" mechanism dresses a scope-add as a close obligation. This bloats WS7 to
~16 waves and is exactly the "over-contrivance / wave mis-shape" the user critique names. A calendar
and a chart family each warrant their own charter (design-arm, ≥2-consumer bar, Fable/DesignSync per
the standing directive) OR an honest KEEP-BOOKED — not a fold into the close.

### F7 [MAJOR, WS9] — WS9 PAPER-GRAIN-REAL re-opens the feTurbulence mechanism the user rejected TWICE; the robust raster-asset transposition is booked as fallback, not primary

The user condemned the paper register verbatim as "disgusting metallic" (C-GRAY over-corrected to
metallic; C-FIELD regressed) — the root is `paper.css:44` `feColorMatrix type='saturate' values='0'`
over `feTurbulence` (`SPEC-pass1-converged.md:11`). WS9's primary fix swaps the colour-matrix for
`feDiffuseLighting` on the SAME `feTurbulence` height-map (`:36-55`) — a different model, but the
same SVG-noise family the eye rejected twice, carrying SEVEN open calibration mustFix (M1-M5) plus
the Safari `lighting-color` colorspace risk (unresolved `oklch()` → white → "metallic IN SAFARI
ONLY", `:180`). The engine-stable transposition — a committed warm scanned/generated tooth raster
tile ("a real scanned tooth cannot read metallic", `:170`) — is booked as a "prototype-gated
fallback," not the primary. Per the mandate ("architectural transpositions for elegance, simplicity,
performance"), leading with the raster asset is the simpler, cross-engine-robust, single-rejection-
proof move; a third procedural re-tune of the exact-rejected mechanism is the contrivance path. At
minimum the raster asset should be BUILT FIRST as the de-risk anchor, not gated behind a third
procedural attempt.

### F8 [MINOR] — the converged SPEC artifacts are stale vs the cursor's own amendments (WS8 `uDispersion`, WS7 "nothing on disk")

The developed-plan documents this audit critiques contradict the live cursor:
- WS8 `SPEC-pass4-converged.md` still says `uDispersion` (2 occurrences, 0 `uChromatic`), but the cursor amended it: "keyed on `uChromatic` (NOT the invented `uDispersion`)" (`EXECUTION-PROGRESS.md:253`) and concretized the "N≤8 panels" to "5 GL refraction sites — hero CTA + dock plate the 2 distinct" (`:253`). The coherence audit already de-drifted the cursor; the frozen SPEC was not reconciled.
- WS7 `SPEC-pass4-converged.md:270` "NOTHING is on committed `tranche/BG` disk … the dominant residual" is FALSE at HEAD: `scripts/proof-ship-attestation.mjs` (20591B), `scripts/lib/fold-ledger-core.mjs`, `scripts/proof-bg-deferred-ledger.mjs`, `scripts/lib/surface-closure.mjs` all exist; `gates.mjs:459` registers `proof:ship-attestation ["ci","release"]`; `proof-close-battery-parity.mjs` carries the matchAll/RATIFIED-full-only fix. Cursor 0.1-0.4 are DONE. A spec whose residual-gaps section contradicts disk is itself a finding (a stale plan misleads a build agent into re-doing landed work).

Neither WS8 nor WS9 has a "-converged" spec later than pass-4/pass-1 respectively; the cursor is the
current truth and the SPEC files should be marked SUPERSEDED-BY-CURSOR or reconciled.

---

## Fold candidates (for the BG/BH tranche plan)

### FC1 [prune-wave / defer-honest] — extract WS7 Band-4 census BUILDs out of the close workstream
Remove `BG.W-DATE-CALENDAR` / `BG.W-CHART-FAMILY` / `BG.W-DS-COMPLETE` (cursor 12.10-12.12) from WS7.
**Gestalt:** the close workstream closes; it does not grow the component surface. Either (a) charter a
dedicated `WS-COVERAGE` band with each build carrying its Fable design-arm + DesignSync review + the
≥2-consumer bar (the standing directive requires every VISUAL wave name these), or (b) KEEP-BOOKED in
the fold-ledger with an honest trigger (a real consumer ask). Do NOT ship a calendar/chart build as a
"FOLD-LEDGER row" adjudication side-effect. Shrinks WS7 from ~16 to ~13 waves and de-conflates
quality-close from feature-add.

### FC2 [amend-wave] — WS9 PAPER-GRAIN-REAL: promote the raster-asset tooth to primary (or build-first de-risk)
Amend `BG.W-PAPER-GRAIN-REAL` (cursor 14.1) so the committed warm raster tooth tile is the PRIMARY
close artifact and the `feDiffuseLighting` procedural path is the progressive-enhancement layer over
it. **Gestalt:** the user rejected the SVG-noise family twice; a scanned/generated warm tooth is
engine-stable by construction (kills the Safari `lighting-color` colorspace risk, the cross-engine
determinism risk, and the metallic-recurrence risk in one move — `SPEC-pass1-converged.md:170,179-182`).
If the team insists on procedural-primary, at minimum sequence the raster asset FIRST as the born-RED
anchor so the wave has a robust floor before the third procedural attempt. Same token, same
multiply/screen blend law, same seed leaf — a transposition, not a new mechanism.

### FC3 [plan-doc-edit] — reconcile the intra-BG carve double-owners + the ratchet-drain coupling
One plan-doc edit resolving F2/F3/F4: (a) name a SINGLE owner + sequence for `useGlassBackdropLuminance`
(WS4 10.13 histogram-leaf FIRST → WS8 13.3 `createBackdropSource` consumes the already-carved residual,
or fold both into one wave); (b) re-pin WS8's `createCanvasLifecycle` P1 shasum-fence to the
POST-WS4-carve leaf shape (10.12), not the pre-carve 695L monolith; (c) add an explicit
"ratchet-drain dependency chain" to `bg-build-map.md` enumerating each remaining baseline → its
owning carve wave → its band, so `BG.W-CUT`'s `RATCHET_BASELINES == {}` precondition is a visible cut
gate, not an implicit surprise; (d) correct BH PLAN §71's "drained to ∅" claim to "the 3 BH rows
drained; the 15 BG baselines drain across WS2/4/5/8 + B2.2." **Gestalt:** carve ownership is a
single-writer discipline; two owners on one file is the "poor encapsulation" the mandate names.

### FC4 [amend-wave] — make WS1 render-target exposure a HARD deliverable, or honestly scope WS8 fidelity to Tier-1-floor + DROP-WITH-TRIGGER
The WS8 keystone (13.3) cannot do the in-context FBO second-sample because WS1 shipped only the
`getImageData` luminance-proxy marker (F1). Choose ONE and record it: (a) RE-OPEN a small WS1 wave
that exposes the live `WebGL2RenderingContext` render-target off the shell `<Aurora>` (extend
`Aurora.vue:166` `defineExpose`) as the WS8 precondition — the honest way to actually close C-SAFARI
full-fidelity; OR (b) explicitly scope the WS8 apotheosis to the Tier-1 WebGL2 floor shader + the
device-free SOURCE arm as the SHIPPED artifact, and DROP-WITH-TRIGGER the FBO in-context second-sample
+ the full-drapery metal-flow gestalt to a booked successor (the seam does not exist; do not carry a
keystone that cannot execute). **Gestalt:** the ★★★ 3-wave chronic is closed by shipping the Tier-1
floor that does NOT depend on the Safari-impossible `backdrop-filter: url()` — that is the real win;
carrying an unbuildable keystone as "the binding π" is how it misses a 4th time.

### FC5 [plan-doc-edit] — mark the WS8/WS9 converged SPEC files SUPERSEDED-BY-CURSOR and reconcile the stale residual claims
Stamp `BG-WS8-glass-deep/SPEC-pass4-converged.md` (`uDispersion`→`uChromatic`, N-panels→2 GL sites)
and `BG-WS7-quality-coverage-close/SPEC-pass4-converged.md` (§residual "NOTHING on disk" — Band-0 is
DONE) as superseded by the cursor, or reconcile them. **Gestalt:** the cursor is the single source of
truth; a frozen spec that contradicts disk mis-directs the build agent into re-doing landed work
(cursor 0.1-0.4) and re-litigating settled amendments — the "N locally-correct patches" incoherence
the mandate targets.
