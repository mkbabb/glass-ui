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
