# PROBE-NOTES—F5 OPTICAL-MEDIUM prototype

verified-model: claude-fable-5 (system-context model ID, verbatim). Prototype seat, IOS27-MICRO pass 1, 2026-07-18.

Artifact: `index.html` (this directory)—one self-contained standalone file, no build, no network, no dev server. Open it in Safari 26 and Chrome directly from disk. Status: RUNS (node parse check + full stubbed-DOM dry-run of the state machine: boot, 2-slot morph, mid-travel retarget, PRM seat, U2 open/close/flick chains—no throws).

## What the prototype claims to prove

The family's riskiest claim (SPEC-F5 §5): **the lens reads as ONE continuous body in paint—capsule de-materialize, light-barbell travel, oversized re-form—with no visible blink at either handoff and sibling labels legible throughout.**

Mechanisms on the page, each per the spec:

1. **The layer contract, literal.** One effect-free positioning ancestor (`.tabbar-region`—no filter, no opacity<1, no mask/clip, no blend); BODY = bar glass (container tier, resting .65α/7px, specular top rim) + rest capsule (control tier, own rim, brighter fill, own `backdrop-filter`); LIGHT = sibling above body, `aria-hidden`, `pointer-events: none`, `contain: layout paint`, zero backdrop sampling, ONE `mix-blend-mode: plus-lighter` composite on the layer; CONTENT (icons + labels) above the light layer—sibling legibility by construction. Goo per pager Arm A (in-document SVG filter `#f5-goo`) with the `@supports not (filter: url(…))` un-merged-barbell floor as Arm B.
2. **The travel physics are consumed, not invented.** The inline `leadTrail()` is a line-faithful port of `src/composables/motion/morph/useLeadTrail.ts`—response 0.68/ζ0.64 hand-rolled semi-implicit Euler spring (8 substeps), exponential trail τ270ms, direction-agnostic (lo, hi) edges, emergent park, PRM seats instantly. The barbell (two capsule-scale bodies + welling neck) is projected off the edges compositor-only: `translate` + `scale`, never an animated width.
3. **The choreography per MARKS §3:** press-charge (bloom past capsule bounds + whole-bar wash on pointerdown, 250ms floor, BEFORE any travel) → capsule de-materializes 60ms AFTER the barbell lights (the no-blink overlap) → travel with the source content demagnifying → oversized re-form at the emergent trigger (|lead−target|<8px AND gap<0.6·capsuleW), scale 1.15 in scale AND light, ~200ms hold → cool ~380ms. A mid-travel press retargets—the spring velocity carries. Content magnification ~6% is a transform under the capsule, not refraction. Idle specular sweep on the active lens only, off during engagement and under PRM.
4. **The desync as token ratios** (`:root`): `--clock-fade: calc(var(--clock-stretch)/4)`, medium cliff 90ms, relax 420ms, empty beat 150ms, periphery lag 100ms.
5. **U2 medium probe:** pre-mounted constant-radius medium, opacity-only, never unmounted; engaged/held/relaxing named states with the empty-medium beat on close, flick+catch interrupt (floor readout proves it never hits 0), scrub re-entry at any state, depth-graded tile travel +20%/row, periphery lag. The content wrapper never animates opacity (ancestor fade would sever tile sampling)—every tile animates its own.
6. **U3 probe:** control capsule with own `backdrop-filter` inside container glass over stripes, next to a fill-only twin.
7. **U1 probe:** chips A `blur(8px)` / B `url(#probe)` / C `blur(8px) url(#probe)` over stripes + `CSS.supports` readouts + an `@supports (backdrop-filter: url(…))`-gated custom-property flag—the shipped `glass-refract.css` gate class under live test.

## On-page readouts (the MARKS numbers encoded)

- press→settle wall-clock, band-checked 1150–1450ms on clean 1-slot morphs only (dry-run: 1-slot ≈1307ms in-band; 2-slot ≈1600ms, reported neutral—hop distance modulates the physics, the MARKS band was measured on adjacent-tab morphs).
- re-form trigger latency after commit (dry-run: ~317ms at 1 slot, ~610ms at 2).
- arrival scale from computed transform during the hold (target 1.10–1.20; drives at 1.15).
- oversize hold duration (target ~200ms).
- continuity monitor: min of max(capsule opacity, goo opacity) per rAF across the morph, PASS ≥0.35.
- frames sampled / worst frame dt / fps across the morph window (parked at rest—no perpetual rAF).
- sibling label contrast at bloom peak, analytic: clamped 4.7:1 PASS vs 1.3:1 with the clamp leg removed (the iOS defect reproduced numerically). Clamp tokens: bloom .55→.14 via the mask leg, wash .28→.05 in the gradient.
- U2: cliff measured (≤100ms), relax measured (~420ms), empty beat measured (~150ms), interrupt floor (>0), fade:stretch = 1:4.0.

## How to judge visually (the serialized browser seat)

1. **The blink test (the claim itself):** 12fps-equivalent screenshot burst across one full 1-slot morph and one 4-slot morph, Safari 26 AND Chrome. No frame may show zero lens presence (neither capsule nor light blob). Watch both handoffs: commit (capsule fades UNDER the lit barbell) and arrival (capsule fades in oversized while the barbell is still parked).
2. **Sibling legibility at bloom peak:** at charge and at arrival, every non-active tab label must stay readable. Compare against the readout's analytic pair.
3. **Goo anatomy:** mid-travel the blob should read as one liquid body spanning ~2.3–2.5 slots on a 1-slot hop (two bodies + welling neck merged by Arm A). In an engine without `filter: url()` the Arm B floor shows an un-merged connected barbell—degraded, not broken.
4. **U2 pair:** screenshot at rest / mid-relax—blur must decay by opacity only (no radius pump); a performance trace across open/close should show no per-frame re-raster of the medium (the U2 unknown, judged in trace).
5. **U3:** the left capsule's stripe field must read double-frosted vs the right's single frost. Identical paint = U3 red.
6. **U1:** chip C sharp while `supports=true` = whole-value drop—the shipped `glass-refract.css` gate lies on that engine (repair per the `supportsCssTimeline` harden). Chip C blurred = benign url-leg drop. All three honest per the legend on-page.
7. **Backdrop liveness:** the drifting orange ferry must show blurred through the bar at all times (idle included)—proves no ancestor severed sampling.
8. **PRM:** toggle the sim checkbox (or OS PRM): commit must seat instantly—no barbell, no oversize, charge surviving as a non-motion state; the sweep and ferry stop.

## Known dishonesties, stated loud

- **The continuity monitor reads computed style, not painted pixels.** A zero-size, fully-clipped, or blend-annihilated element would pass it while painting nothing (the σ8 defect class). The screenshot burst is the paint-true test; the monitor only brackets it. In the node dry-run it trivially reports 1.00 because CSS transitions do not run there.
- **The label-contrast pair is an analytic composite model** (declared constants: scene L≈.10 under the label band, plus-lighter approximated additive), not a paint read. The real gate is the browser seat's contrast read at bloom peak.
- **The wall-clock transition measurements (cliff/relax/fade) measure `transitionrun→transitionend`**—main-thread time, not compositor truth. A trace is the honest perf read.
- **Per-frame `getComputedStyle` in the monitor is probe instrumentation**, not a shipped idiom (the shipped integrator is zero-`getComputedStyle` by design); it runs only inside the morph window.
- **The bloom mask percentages are tuned to this bar's geometry** (label band ~54–62% of the light box); a component version derives them from measured label rects.
- **`-webkit-backdrop-filter` prefixes are belt-and-braces**; the repo posture is unprefixed (Safari 18+). Kept here because the file must run standalone on whatever the seat opens.
- **The U2 "empty beat" is timer-sequenced** (content-out estimated at 175ms), not observed from the tiles' actual transitionend—a ±15ms honesty bound on the beat readout.

## Out of scope, per the spec

H1 growth ladder and H2 overpull (the body transform tree) belong to the physics family's prototype—F5's contribution there is topology, already proven by the layer contract here. H6 momentum is consumed (F4). Pill self-centering rides `useSelectionGroup` in the component pass. Chromatic fringe stays a Chromium garnish and is deliberately absent—no masking fallback pretends refraction exists at the floor. Positional hue sampling (U4) and the concurrent-blur budget trace (U5/U6) are pass-2 items per the spec's gap table.

## VERIFIED—browser seat, pass 1

verified-model: claude-fable-5 (system-context model ID, verbatim). Serialized browser seat,
2026-07-18. Engine: Chrome 150 via chrome-devtools MCP, file:// direct, ~98Hz display. **Safari
not driven this pass** (MCP owns Chrome only)—and Safari is the risk engine for U1/U3/nested
sampling; those verdicts below are Chrome-only.

**Verdict: PROVES** (Chrome paint; Safari arm open).

The blink test, adapted: a true 12fps MCP screenshot burst is impossible (capture round-trip
~2–3s), so the claim was proven two ways—(a) an independent per-rAF sampler, stricter than the
page monitor: presence = opacity × (visibility ≠ hidden) × (rect area > threshold) per element,
capsule vs max over the light layer's children; (b) paint screenshots at four distinct phases
across repeated morphs.

| measure | result | target | call |
|---|---|---|---|
| min joint lens presence, 1-slot morph (177 frames) | 1.00 — light ≥1.0 through the entire capsule fade | >0 every frame | PASS |
| min joint presence, multi-slot morph (235 frames; 49 capsule-fade frames) | 1.00 | >0 | PASS |
| min joint presence, mid-travel retarget (247 frames) | 1.00; lands on the retargeted tab; page reports "(0-slot, retargeted)" | no blink through reversal | PASS |
| press→settle | 1330ms (1-slot) | 1200–1400ms | PASS; 1576–1654ms multi-slot, reported neutral per notes |
| re-form trigger | 335ms (1-slot) / 582–663ms (multi) | dry-run ~317/~610 | PASS |
| arrival scale | 1.150 computed | 1.10–1.20 | PASS |
| oversize hold | 201–202ms | ~200ms | PASS |
| page continuity monitor | 0.86–0.94 | ≥0.35 | PASS |
| morph window | 105–137 frames · worst 11.2–11.3ms · fps parked at rest | parked rAF | PASS |
| U2 cliff / relax / beat / floor / ratio | 82ms / 418ms / 150ms / 0.09-never-0 / 1:4.0 | ≤100 / ~400–450 / 100–200 / >0 / ~1:4 | PASS (see nit) |
| sibling contrast (analytic pair, on-page) | 4.7:1 PASS vs 1.3:1 FAIL unclamped | floor 4.5:1 | encoded; paint read below |

Layer contract, verified in computed style: `.tabbar-region` effect-free (filter none, opacity 1,
no mask/clip, blend normal); `.lens-light` aria-hidden, `contain: layout paint`,
`pointer-events: none`, `mix-blend-mode: plus-lighter`, zero backdrop sampling; capsule carries
its OWN backdrop-filter (blur 7 + saturate 1.4 + brightness 1.1) distinct from the bar's (blur 7
+ saturate 1.4); `.tabs` content sits after the light layer in DOM order—labels above light by
construction. At true rest the light layer is fully dark (bloom 0, wash 0, goo 0); the only idle
light motion is the capsule's ::after sweep. The orange orb near the bar in `f5-idle.png` is the
drifting ferry, not lens light—compare its positions across shots; behind the bar it reads
frosted, outside it reads sharp (backdrop liveness, no severed sampling).

Screenshots: `f5-idle.png` (rest: capsule + sweep, ferry behind bar edge), `f5-charge-travel-held.png`
(wash=1 during early travel—every sibling label plainly legible, the paint form of the 4.7:1
claim), `f5-morph-travel-b.png` (arrival: capsule re-formed with the bloom still hot beside it—
light and capsule coexist, the second handoff), `f5-morph-mid.png` (settled end state),
`f5-u3-u1.png` (U3 + U1 boards).

U3 (Chrome): the left capsule (own backdrop-filter) paints visibly smoother/deeper-frosted than
the fill-only twin over the same stripes—nested sampling works; not identical paint. GREEN here;
WebKit is the engine the probe exists for—open.

U1 (Chrome): supports url() = true, supports blur+url = true, engine enters the shipped gated
block; chip A blurred, chip B shows real displacement (the SVG filter applies), chip C blurred
AND displaced—the full value paints; the shipped gate tells the truth on this engine. The
whole-value-drop failure mode did not occur here. Safari remains the decisive engine—open.

PRM (sim checkbox): sweep stops (animation-name none), ferry stops, no barbell travel (capsule
position jumps, no intermediate x), no oversize (transform scale 1 at arrival). Two nits: (1) the
seat is deferred ~250ms by the charge floor (capsule jumps at ~270ms, not instantly); (2) the
charge light RAMPS 0.23→0.51→0.82→1.0 over ~250ms—an animated opacity, not "charge surviving as
a non-motion state". If the PRM bar is zero in-between frames, both need a PRM branch that seats
charge+commit in one style flip.

Harness nits found: (a) pressing "flick + catch" from a CLOSED medium records interrupt floor
0.00 FAIL (there is nothing to catch)—guard it or reset the cell; (b) the U2 "cliff" cell briefly
displays the close-relax duration after a close (cell reuse); (c) a pointerdown with no
click/pointerup on a tab runs a full charge→travel→return cycle that records into press→settle
("3-slot" observed on a 2-slot geometry)—the cancel path works (lens never strands) but its slot
accounting and its readout write are both odd.

Not verified here, per scope/tooling: Safari paint entirely (U1/U3 decisive engine, the 12fps
burst, `-webkit-` belt-and-braces); the U2 re-raster trace; positional hue sampling (U4) and the
blur-budget trace (U5/U6), pass-2 items per the spec.

## PASS-2 SAFARI ARM (Playwright-WebKit 26.5, 2026-07-18)

verified-model: claude-fable-5 (system-context model ID, verbatim). Serialized browser seat,
pass 2 — Safari is this family's risk engine and this is its first WebKit drive. Engine:
repo-local Playwright 1.61.1 WebKit webkit-2311, version 26.5 (`Version/26.5
Safari/605.1.15`), headed, macOS, DPR 2, ~67Hz VRR. Harness laws proven this pass (full
statement in the F1 section): Playwright WebKit screenshots are backdrop-filter-blind — every
material verdict below rides the 25fps video/screencast path (1280×1000, 1:1 CSS px); the
ferry was frozen+hidden for all lens captures (the G2 confound eliminated); observation is
screenshot/video/computed-style only — no canvas context was ever taken.

**Verdict: the lens core PROVES-IN-WEBKIT; U1 is RED — the shipped gate LIES on this engine.**

### U1 — both forms, the lying-gate question ANSWERED (RED)

| probe | result |
|---|---|
| `CSS.supports("backdrop-filter","url(#f5-u1probe)")` | **true** |
| `CSS.supports("backdrop-filter","blur(8px) url(#…)")` | **true** |
| `CSS.supports("backdrop-filter", url("#glass-refract"))` — the shipped gate form | **true → the gated block ENGAGES** |
| `CSS.supports` on the shipped data-URI value, bare and after blur(8px) | **true / true** |
| computed values (chips B/C/D incl. injected chip D carrying the verbatim shipped `--glass-refract-filter` value after blur(8px)) | full value retained in computed style |
| **paint** (video path, stripe gradient energy; background baseline 0.0756) | chip A `blur(8px)`: **0.0018 — heavily frosted**. chip B `url(#)`: 0.0748. chip C `blur+url(#)`: **0.0749 — stone sharp**. chip D `blur+data-URI` (shipped form): **0.0748 — stone sharp** |

**WebKit 26.5 accepts `backdrop-filter: url(…)` at parse (@supports true, computed retained)
and drops the WHOLE VALUE at paint — including the blur leg.** Fragment and data-URI forms
behave identically (the G7 divergence question: no divergence — both die). Consequence for
the shipped `glass-refract.css`: on this engine the `@supports (backdrop-filter:
url("#glass-refract"))` gate engages, the gated declaration overrides the un-gated blur base,
and `.glass-lens` paints with **no backdrop filter at all** — exactly the page legend's worst
case ("the gate lies… the lens loses all blur"). This is a shipped-CSS defect against glass-ui
7.0.0 on the Safari floor, not a prototype nit: the gate must be hardened to a paint-probe
(the `supportsCssTimeline`-class runtime harden) or the url() composite dropped for WebKit.
Note the pass-1 Chrome read stands (full value paints there); the defect is WebKit-only.
Artifact: `f5-wk-u1-chips.png` (video frame — A frosted, B/C/D sharp).

### U3 — nested control-on-container sampling (GREEN)

Video path, stripe gradient energy: sampling capsule (own `backdrop-filter: blur(7px)
saturate(1.4) brightness(1.1)`) **0.00186** vs the fill-only twin **0.00233** over the same
container glass — distinct paint, the nested sample reads ~20% smoother. Not identical ⇒ U3
green on the engine the probe exists for. Artifact: `f5-wk-u3-board.png`.

### The blink test — paint-true this time, and negative for blinks

- The 25fps compositor burst (video) across two complete morphs (1→0, then 0→4): **132 painted
  frames, min p99.5 strip luminance 0.824** (rest-capsule reference ~0.84–0.86; a lens-free
  bar would collapse far below) — no frame without a lens body, at better than the demanded
  12fps equivalence, in real paint. Artifact: `f5-wk-blink-sheet.png` (10-frame anatomy:
  charge → stretch-bridge → converge → oversized arrival → cool → rest).
- The independent per-rAF computed sampler, wash EXCLUDED (stricter than pass-1's):
  min joint presence 0.938 (1-slot, 92 frames), 0.996 (4-slot, 232), 0.966 (mid-travel
  retarget, 378 — lands "(1-slot, retargeted)").
- Goo Arm A: `CSS.supports("filter","url(#f5-goo)")` true and the filter applies — the barbell
  reads as one CONNECTED body mid-travel (two bodies + welling band, VP8-softened); never two
  separated lights, never zero.

### Choreography numbers (WebKit / Chrome)

| readout | WebKit 26.5 | Chrome 150 |
|---|---|---|
| press→settle, clean 1-slot | 1334ms (band 1150–1450) | 1330ms |
| re-form trigger | 340ms (1-slot) / 661ms (4-slot) | 335 / 582–663 |
| arrival scale | 1.150 computed | 1.150 |
| oversize hold | 201–203ms | 201–202 |
| worst morph frame | 19.0ms (1-slot) · 26.0ms once (4-slot — one long frame, noted) | 11.2–11.3 |
| page continuity monitor | 0.94 / 1.00 / 0.97 | 0.86–0.94 |

### Sibling legibility at bloom peak — first paint-side read

Charge held 240ms (wash 0.99, bloom 0.99, video frame, estimate from p97-vs-p30 luminance):
siblings **4.53 / 4.62 / 4.61 / 5.03 : 1** — all ≥ the 4.5 floor; the SOURCE label under the
lit lens itself reads ~1.9 (bright-on-bright, not a sibling — the gate is about siblings).
Calibrates the on-page analytic 4.7:1 model well. Artifact: `f5-wk-charge-held.png`.

### U2 medium

cliff 104ms (≤100 + 1 frame at 14.9ms), empty beat 150ms, relax 422ms, fade:stretch 1:4.0,
flick-caught floor 0.09 — never 0 (run from OPEN; the flick-from-closed harness nit was
avoided, not re-triggered). Medium = constant-radius `blur(18px) saturate(1.3)`, opacity-only:
video ramp 0→0.35→1 shows gradient energy falling faster than luminance (−38% vs −29%) — blur
attenuation present; the region is low-texture so the DECISIVE mechanism proof is the F1/F3
ramp artifacts, which are unequivocal on the same engine. The per-frame re-raster trace stays
TOOL-DEFER (no WebKit timeline via Playwright). `f5-wk-u2-held-mid.png` (scrub 0.50 held) is
screenshot-path — geometry/state only.

### PRM

Sweep off (capsule ::after animation-name none), goo stays 0, capsule TELEPORTS — transform
sampled at +40/+150/+310ms shows x 470 → 470 → 6 with no intermediate — but the jump lands
between +150 and +310ms: **the ~250ms charge-floor deferral (G5 nit 1) reproduces in WebKit**,
and the PRM branch fix remains unapplied. Backdrop liveness: the ferry drifts (~55px/700ms)
and reads frosted behind the bar in video frames — sampling never severed.

### Artifact provenance

Video-path (material-true): `f5-wk-u1-chips.png`, `f5-wk-u3-board.png`, `f5-wk-charge-held.png`,
`f5-wk-travel-a/b.png`, `f5-wk-arrival-a/b.png`, `f5-wk-blink-sheet.png`. Screenshot-path
(geometry only): `f5-wk-u2-held-mid.png`. All eight `-wk-` PNGs left by the crashed earlier
capture run were overwritten by these provenanced captures. Zero page errors.

## PASS-2 CURES (cure seat F5, 2026-07-18)

verified-model: claude-fable-5 (system-context model ID, verbatim). No browser this seat — every
check needing live paint is queued at `../../passes/PASS-2/reverify-queue.md` §F5. Ledger:
`../../passes/PASS-2/cures-F5.md`. Corrections are additive; voids are quoted.

### The pass-1 capture corrections (CRIT-F5 G2) — two evidence claims VOID, three files relabeled

The pass-1 VERIFIED screenshot line claimed transient states its pixels do not contain; the
orange body beside the capsule in both is the drifting ferry — the exact confound VERIFIED
itself warned about for `f5-idle.png`:

- ~~"`f5-charge-travel-held.png` (wash=1 during early travel—every sibling label plainly legible,
  the paint form of the 4.7:1 claim)"~~ VOID — the PNG shows `lens state: rest` with a completed
  1623ms 3-slot readout; no wash, no barbell, no bloom. Relabeled **`f5-rest-after-3slot.png`**.
- ~~"`f5-morph-travel-b.png` (arrival: capsule re-formed with the bloom still hot beside it—light
  and capsule coexist, the second handoff)"~~ VOID — rest state, 1653ms 4-slot readout; the
  "bloom" is the ferry. Relabeled **`f5-rest-after-4slot.png`**.
- `f5-morph-mid.png` — the VERIFIED text was honest ("settled end state") but the FILENAME
  claimed a mid-morph; relabeled **`f5-rest-settled.png`**.

Chrome consequently has ZERO transient-lens paint evidence from pass 1; the Safari arm's
video-path transients (`f5-wk-charge-held/travel-a/b/arrival-a/b/blink-sheet.png`, ferry frozen)
are the ONLY transient paint captures in the corpus. Chrome transients are queued (reverify §F5
row 1) and are now un-confoundable: the page carries ferry-off + clock ×1/×4/×20 capture toggles
(the critique's freeze-or-clock-scale disjunction, resolved to clock-scale — every clock scales
coherently and the banded readouts normalize to ×1, so the gates stay honest under capture).

### The harness cures (G5/G6) + the fence re-arm (suffusion forPass2) + G8

- **G5 PRM one-flip:** `body.prm` now suppresses every lens-channel transition (the 0.23→1.0
  charge RAMP is dead — charge is a discrete flip); `commit()` under PRM skips the charge floor
  entirely and seats in the same tick (~~the ~250ms deferral, reproduced on both engines~~ dead
  by construction). The acknowledgment bloom rides the seat flip and clears as a second DISCRETE
  flip at 220ms — a step, per suffusion §3.5 Q3/Q8. In-between-frame re-check queued (row 4).
- **G6a** flick-from-closed guarded ("flick ignored—medium at rest"); **G6b** the cliff cell can
  no longer inherit a relax duration (measure skipped when no transition will run + a disarm
  window on unarmed listeners); **G6c** the abandoned press now discharges on all three paths
  (pointerleave, pointercancel, deferred window-pointerup) and a cross-tab commit re-stamps the
  charge floor — the phantom press→settle write class is closed. Stub-DOM dry-run: boot, 1-slot
  morph, retarget, abandoned-press discharge, PRM one-flip, U2 chains + guard, writer claim — no
  throws (scratchpad `f5-p2-cure-dryrun.mjs`; geometry is stubbed, bands are live-paint gates).
- **The compositor fence (BINDING forPass2 demand):** the default goo anatomy is now
  additive-gradient metaballs — transform/opacity only, ZERO filter on the travel hot path; the
  pass-1 SVG-filter merge survives only behind the `svg-arm` duel toggle. The duel (one-body
  read + cadence, both engines, the 26ms 4-slot frame the suspect) is queued (row 2).
- **G7 chip D permanent:** the verbatim-form shipped data-URI filter value now sits on the page
  (`#u1d` + its own `CSS.supports` readout) — the safari-arm's injected probe is reproducible.
  The WebKit RED verdict is adopted on-page in the U1 legend; the repair is ROUTED to BJ
  (`docs/tranches/BJ/coordination/ios27micro-inbox-2026-07-18-glass-refract-webkit-gate-lie.md`),
  src untouched per ruling.
- **G8a/c/d:** `isolation: isolate` added to the light layer (spec reconciled — mandated, with
  the region-root prohibition stated); the named lint exists both halves —
  `lint-layer-contract.mjs` (static: PASSES clean, FAILS on each mutated clause via --self-test)
  + `window.f5LintLayerContract()` (computed-style + the rogue-writer throw probe, queued row 7);
  the medium one-writer contract is enforced (`claimMediumWriter`, durable `data-writer` claim,
  second claimant throws; all cc writes routed through the one writer).
- **MARKS C5 adopted:** cool-down readout `roCool` gated 350–400ms (±25ms wall-clock slack);
  mid-cool re-taps re-seat through the retarget path (no reset, no blink — C5's law).
- **N8/U8 probe:** opacity-0 medium twin + 3s cadence meter on the U2 panel (row 3 prices it).

### Metrology corrections (G10)

- ~~"120 backdrop-filter declarations, 54 files"~~ (SPEC §1) reproduces under no cut; measured
  2026-07-18: 63 unprefixed `backdrop-filter:` declaration sites / 36 files, 9 `-webkit-` / 8
  files, 133 mentions / 62 files (cuts printed in the spec). The `-webkit-` prefixes on THIS page
  remain belt-and-braces for standalone judging, as stated in the dishonesty ledger.
- ~~"zero per-component DOM additions"~~ → BOUNDED, NONZERO (spec corrected: light hosts ~4,
  per-region mediums ~overlay family).
- The analytic 4.7:1 contrast model is now CALIBRATED against paint: WebKit bloom-peak siblings
  4.53/4.62/4.61/5.03:1 (the model sits inside the read); the on-page note says so. Chrome pixel
  pair queued (row 1).

## PASS-2 RE-VERIFY (queue §F5) — engine-tagged VERIFIED rows

verified-model: claude-fable-5 (system-context model ID, verbatim). Re-verify browser seat,
2026-07-18. Chrome 150.0.7871.128 (Playwright 1.61.1 channel:"chrome", headed, 120Hz) +
WebKit 26.5 (webkit-2311, headed, 60Hz), file://, DPR 2. WebKit material verdicts ride the
25fps video path per the safari-arm §0 law. Raw: scratchpad `rev/out/f5-*.json`,
`rev/vid/f5-duel-*.webm` + per-frame analyses `f5-duel-*-analysis.json`.

1. **Transient-lens captures + sibling pixels (Chrome half) — VERIFIED, one calibration flag.**
   Ferry off + clock ×20. CHARGE held to peak (wash/bloom computed 0.974, state cell "charge"
   in-frame) → `f5-p2-charge.png`; MID-TRAVEL (barbell gap 47.1px > 0.4 slot, capsule
   dematerialized 0.096 under lit goo 1.0, state "travel") → `f5-p2-midtravel.png`; ARRIVAL
   (capsule scale 1.150 computed, bloom 0.9, state "arrival") → `f5-p2-arrival.png`. Event log
   captured (down→4.7s hold→up→click→travel +342ms charge-floor remainder→arrival→cool→rest).
   Sibling label pixels (97th-vs-25th percentile luminance per label box, DPR 2): at charge
   peak People/Items/Places/Me = 15.5/15.1/15.2/15.1:1, under-lens Devices 5.86; at arrival
   the arrival-lens label People reads 2.36 (under hot bloom — not a sibling), siblings
   15.1–15.3. Every sibling ≥4.5 with huge margin — legibility PASSES. **The Chrome read sits
   far OUTSIDE the queue's ~4.2–5.5 model band: per the row's own clause this means the
   analytic 4.7:1 model needs re-calibration (the wash does not sit under sibling labels in
   Chrome stills; the WebKit 4.53–5.03 came from the hot video burst), not the clamp legs —
   the error is in the safe direction.**
2. **The goo duel — the SVG-filter arm RETIRES.** Video-burst analysis (blueness profile,
   baseline-differenced, wash-floor-subtracted, per-frame connectivity):
   - WebKit 26.5: fence 4-slot — 0 separated frames (one body throughout; min in-band presence
     0.247 above rest — burst min presence > 0 ✓); FILTER arm — 2 separated frames (neck below
     wash floor). Cadence: fence worst 30.0ms UNDER video-recording load, **18.0ms twice
     without recording** (the pass-1 26ms class does NOT reproduce off-load; ≤24 holds); filter
     32.0ms under load.
   - Chrome 150: 1-slot fence morphs — 0 separations; fence 4-slot at MAX stretch — 6 frames
     (~240ms) where the neck reads at-or-below the ambient wash floor (never a dark gap:
     absolute in-span presence ≈0.13 blueness above rest; exhibit
     `f5-p2-duel-fence-stretch.png`); FILTER arm — 6 separated frames + flat-color look
     (`f5-p2-duel-filter-separated.png`) and **worst morph frame 133.4ms vs fence 9.1ms**.
   - Verdict per the row's rule: fence reads one-body (WebKit clean; Chrome clean at 1-slot,
     thin-neck-at-wash at 4-slot max stretch — a falloff-stop/overlap re-tune rider on the
     gradient recipe, the fence LAW untouched) AND fence cadence ≥ filter on both engines →
     **the SVG arm retires from SPEC-F5 §2-H3**; the pass-1 WebKit 26ms long frame adjudicated
     as video-load artifact (18ms off-load).
3. **N8/U8 opacity-0 cost — opacity-0 parking CERTIFIED, both engines.** Chrome avg/p95/worst:
   off 8.3/9.1/9.4 → twin ON 8.3/8.8/9.4 → off 8.3/8.7–8.9/9.3–9.4ms. WebKit ×3: off
   16.7/18/18–19 → ON 16.6–16.7/18/18–24 → off 16.6–16.9/18–20/19–52 (the 52ms once, twin OFF
   — ambient hitch). Twin-on avg within 10% of unmounted and worst ≤24ms on both engines →
   SPEC-F5 §6-U8 keeps opacity-0 parking; U8 CLOSED.
4. **PRM one-flip — VERIFIED both engines (G5 CLOSED).** Capsule translateX: EXACTLY one
   inter-frame step (122→6px) at +10.6ms (Chrome, ≤1 frame of the click) / +3ms (WebKit);
   scale distinct {1} (no oversize); bloom distinct {0, 0.35} with exactly two discrete
   changes — 0.35 at +11ms/+3ms and the CLEAR at +227ms/+237ms (one step, no interpolation);
   hold-press wash distinct {0, 1}; state prints "seated (PRM one-flip)". The pre-cure
   +150..+310ms deferral and the 0.23→0.51→0.82 ramp are DEAD.
5. **Harness-defect regressions (G6) — VERIFIED both engines.** (a) flick at rest → "flick
   ignored—medium at rest (nothing to catch)", floor cell stays "—"; (b) open→open→close keeps
   the cliff cell (Chrome 143ms, WebKit 100ms — never the ~420ms relax class; relax prints in
   its own cell 417/433ms); (c) press→drag-off→release elsewhere → state "rest", no
   press→settle write; (d) stale 1s hold on Places abandoned, then adjacent People commit runs
   from ITS OWN charge floor: press→settle 1331ms (Chrome) / 1325ms (WebKit), page-classed
   PASS in the 1-slot band — the "3-slot on a 2-slot geometry" class is dead. ((d) verified in
   a standalone run; the first full-run read hit a harness poll race — event-logged, not a
   page defect.)
6. **U2 Chrome pair + trace — VERIFIED.** computed backdrop-filter IDENTICAL at rest-open and
   mid-relax ("blur(18px) saturate(1.3)"; opacity 1 → 0.706) — constant radius, opacity-only
   decay (`f5-p2-u2-open/midrelax.png`). Trace across open→close: recalc avg 0.07ms/frame,
   Paint events in the medium region 0 in both windows (6 total paints/window = readout text)
   — no recurring per-frame re-raster after first invalidation (the F1-R5 idiom). WebKit
   re-raster trace REMAINS TOOL-DEFER (desktop Safari Web Inspector), not faked.
7. **Layer-contract lint, live halves — VERIFIED both engines.** In-page
   `f5LintLayerContract()` → `pass: true, failures: []` on Chrome AND WebKit;
   `node lint-layer-contract.mjs --self-test` prints both `[OK]` lines (clean pass=true,
   mutated pass=false, 5 failures) — the gate can fail, proven this run.
