# PASS-2 REVERIFY QUEUE — checks needing live paint, queued by cure seats for the re-verify seat

One heading per seat; each row carries exact steps + acceptance numbers. Append under your own
heading only.

## F3

verified-model: claude-fable-5 (system-context model ID, verbatim). Cure seat F3, 2026-07-18 —
no browser owned this seat. Page: `prototypes/f3-channel-conductor/index.html` via `file://`.
All bands below are the shipped BANDS block bands (printed = gated).

1. **Paint-side battery, both engines (closes G9).** Steps: load page → check "paint-side
   sampling (computed-style)" → Run full battery. Then uncheck and run again (internal mode).
   Do this in Chrome ≥150 and WebKit/Safari ≥26. Acceptance: 12/12 gates PASS in paint-side
   mode on each engine; fade t90 ∈ 133–267 ms; geometry t99 ∈ 583–667 ms; per timing row
   |paint-side − internal| ≤ 17 ms (±1 frame @60 Hz; on faster displays use that display's
   frame interval). The summary line must say "sampling: PAINT-SIDE".
2. **Chrome style-recalc attribution on the stress page (the G2 ruling's second-engine
   deepening).** Steps: DevTools Performance trace ≥6 s while running "Stress ×3"; repeat with
   960 injected descendant consumers reading the channel vars inside `.stage` (paste in console:
   `const s=document.querySelector(".stage");for(let i=0;i<960;i++){const d=document.createElement("i");d.style.cssText="position:absolute;width:1px;height:1px;opacity:calc(var(--ch-content))";s.appendChild(d)}`).
   Acceptance: style-recalc attributed to the var writes avg ≤ 6 ms/frame at +960 consumers;
   no frame > 24 ms (parity with the WebKit differential: avg 14.7 ms total frame, worst 18 ms).
3. **Sub-sat medium exhibit, Chrome arm (G4 parity — WebKit exhibit exists:
   `f3-wk-held-near-closed.png`).** Steps: open fully; drag toward closed and HOLD near-closed
   at g ≈ 0.10 (readout g between 0.08–0.11); sample
   `getComputedStyle(document.querySelector(".stage .scrim")).opacity`. Acceptance: computed
   scrim opacity = g/0.12 ±0.02 at the held g (0.833 at g=0.10); screenshot shows home icons
   readable through visibly THINNED blur vs the full-open state.
4. **Tempo-rebuild velocity carry (G13).** Steps: click Open; ~150 ms into the flight toggle
   "slow-mo ×4". Acceptance: motion continues from its live position WITHOUT an arrest/dead
   stop (the pre-cure behavior seated the rebuild at zero velocity); conductor state readout
   stays "running" across the toggle; geometry proceeds monotonically to 1.000.

## F1

verified-model: claude-fable-5 (system-context model ID, verbatim). Cure seat F1, 2026-07-18 —
no browser owned this seat. Page: `prototypes/f1-scalar-spine/index.html` via `file://`. The
pass-1 live columns (Chrome 150) and the safari-arm columns (WebKit 26.5) predate the pass-2
constants re-fit (medium clocks 20/120ms; overpull register (0.35, ζ0.80); projected-momentum
catch; intent latch) — every row below re-measures under the corrected physics. Sim reference:
`node check.mjs` = 38/38 PASS at queue time. The demo objects are reachable for scripted
sampling as top-level bindings `maps`, `cc`, `F1` (classic-script global lexical scope); both
badges print `intent=` live.

1. **CC battery under the re-fit clocks, both engines (Chrome ≥150 AND WebKit/Safari ≥26).**
   Steps: click "run open", "run close (flick)", "run interrupt"; read the live column.
   Acceptance (live cells must color PASS): open medium 95% ≤100ms +1 display frame (the page
   encodes ≤115ms; state the display's frame interval alongside); open fade 95% 150–250ms;
   open stretch 90% 550–630ms (register lock ±1 frame); fade:stretch 1:2.4–1:4.3; close fade
   130–210ms; empty-medium beat 95–210ms; close medium gone 590–665ms; interrupt medium-min
   0.40–0.85 AND never resolving between cycles; interrupt fade-min ≤0.10. Expected drift vs
   the banked pass-1 numbers: medium 95% lands ~20ms earlier, medium gone ~60ms earlier — if a
   live number instead reproduces the pass-1 value (112/686ms class), the page is running
   stale physics and the row FAILS.
2. **Maps battery under the C2 register, both engines.** Steps: "flick open", "flick close",
   "overpull + release", "pin + release", "fast fall (catch)"; read live cells. Acceptance:
   pin covered @83ms ≥75%; pin settle ≤220ms; overpull zero-seed overshoot ≤3% of depth
   (the pass-1 32–33% class is DEAD — a repeat of it means the old register is live and the
   row FAILS); overpull settle 170–290ms; flung overshoot/velocity 0.015–0.030s; flung settle
   from rest-crossing 130–230ms; catch dwell 120–220ms, well proximity ≤0.12, landed
   571±40ms on the park metric (the 588-vs-406 cure made this gate real — a landing outside
   ±40ms of sim now FAILS).
3. **PRM regression, the G7 fix (both engines).** Steps: check "simulate
   prefers-reduced-motion"; ensure parked at rest; click Maps "flick open" → then "flick
   close"; repeat for CC open/close. Acceptance: each button seats its target in ONE poll
   (Maps t=1.000 then 0.000; CC t/m/f seat jointly), zero intermediate frames, rAF parked
   immediately after — the pre-cure no-op (t stays 0.000 on Maps flick-open from parked) must
   NOT reproduce.
4. **The intent-law live rows (G6).** Mapping: CC surface, drag DOWN = open, Δt = Δy/340px;
   ±0.04 dither = ±13.6px. Steps: (a) from settled open, pointerdown, slow-drag to t=0.500
   (≥1.5s travel), then sinusoid ±13.6px at 6Hz for 1.2s, sampling `cc.spine.intent` per rAF —
   acceptance: 0 flips; (b) same dither reached from closed (slow-drag down to t=0.500) —
   acceptance: 0 flips; (c) from (b), continue the slow drag to t≈0.75 — acceptance: exactly
   1 flip (0→1), at p=value+0.15·v̄ ≥ 0.60; (d) from parked closed, one fast downward flick
   sampled per frame — acceptance: the first frame with intent=1 has value < 0.5 (early
   commit; sim reference 0.416). Release after (a)/(b) must glide to the LATCH's target, not
   the nearest detent.
5. **R1 recalc attribution, Chrome arm (spec §4/§6-R1; the WebKit half stays TOOL-DEFER to
   desktop Safari Web Inspector).** Steps: DevTools Performance trace across the R1 panel's
   natural 180-frame run at 40 consumers. Acceptance: Recalculate Style attributed to the
   per-frame `--gl-*` writes avg ≤2ms/frame; zero frames >24ms across the run.
6. **R5 clip-path residency, Chrome arm (the H1 revert clause's decider; WebKit TOOL-DEFER).**
   Steps: DevTools Performance trace across 3 consecutive Maps flick-open/flick-close cycles;
   inspect the main thread during the growth windows. Acceptance GREEN: after each flight's
   first invalidation, growth frames show no recurring per-frame main-thread Paint entries
   attributable to the card body, and 0 frames >24ms. RED (falsifiable the other way):
   per-frame Paint on ≥50% of growth frames → SPEC-F1 §2-H1 REVERTS to reserved-footprint
   transforms + counter-transform, per the spec's stated clause.
7. **Capture law for the re-fit run (SPEC §5).** Screenshot + paired-π on both engines under
   the corrected constants: mid-growth ladder (t≈0.45 held), the empty-medium beat frame, the
   held desync frame (t≈0.5) — the existing PNGs in `prototypes/f1-scalar-spine/` predate the
   re-fit and stand as pass-1 history; stamp the new set distinctly (e.g. `f1-p2-*`).

## F4

verified-model: claude-fable-5 (system-context model ID, verbatim). Cure seat F4, 2026-07-18 —
no browser owned this seat. Page: `prototypes/f4-energy-field/index.html` via `file://`, BOTH
engines (Chrome ≥150 + WebKit/Safari ≥26) unless a row names one. WebKit law: material/blur rows
ride the video path, µs meters are unreadable there (1ms clock) — frame gaps are the cost
readout. All bounds below are shipped page/gate bounds (printed = gated), none re-fit to a probe.

1. **Scroll acceptance row, post-cure (closes G2 in paint).** Steps: click "scroll burst" →
   watch the live-field list row and the "scroll close edge" cell. Acceptance: list peak E
   ≥ 0.85 (expected ~0.90; pre-cure it pinned 0.000); close edge prints "debounce 160ms
   (primary)" — NEVER "scrollend" mid-gesture; rows visibly counter-lag with depth grading
   during the burst; writes/frame during the burst ≥ 60 (the ~33-consumer list scope actually
   publishing) with Chrome fan-out ≤ 50µs/frame and fps ≥ 0.9× display refresh.
2. **Live release jump (closes G3 in paint).** Steps: click "fling 2600"; then repeat with a
   fast MANUAL upward drag-and-release on the dock. Acceptance: the "live handoff jump" row
   prints ≤ 0.032 PASS on both (scripted expected ~0.010–0.030); the row goes red above the
   bound — confirm it is not stuck by noting two different values across the two releases.
3. **Periphery TRUE delay (closes G8 in paint; kills the pass-1 tail).** Steps: click
   "flick 1150"; capture two screenshots ~100ms apart during the decay; then wait for quiet.
   Acceptance: rail echo visibly ~100ms behind the dock (rail ≈ dock's value one capture
   earlier); after the dock row reads 0.000, the rail dots reach opacity floor (computed
   opacity 0.45, i.e. --energy 0) within 260ms (τ100 + drain hop + frame slack) — the pre-cure
   0.370-at-725ms tail must NOT reproduce. Then the strand check: manual HORIZONTAL fling on
   the dock, release — the rail must still drain to 0.45 opacity (pass-1 stranded it glowing).
4. **θ_g floor (closes G5 in paint).** Steps: run "slow place 280"; at peak sample
   `getComputedStyle(document.getElementById("dockGlow")).opacity`. Acceptance: exactly 0 at
   peak E 0.273 (the 0.30 floor holds); re-run "flick 1150": glow opacity ≥ 0.70 at peak.
   No-idle honesty: back at rest every overlay opacity is 0 and rAF is PARKED.
5. **U7 perceptual pair (the G11 queued gate — CAN fail).** Steps: capture the dock at peak of
   "flick 1150" vs "fling 2600" (same crop, field channels only — glow/smear/specular; ignore
   translate depth). Acceptance numbers: spec-overlay computed opacity 0.44–0.54 (flick) vs
   ≥ 0.80 (fling); glow-overlay 0.70–0.77 vs ≥ 0.95; AND the judge must call which is which
   blind from the pair. If the pair does not read, U7's feel pass re-tunes k/θ — the gate is
   allowed to fail; that is its job.
6. **New-verb captures (closes the G9 remainder).** (a) Scroll counter-lag mid-flick screenshot
   (rows + card smear + deepened edge fade — the L×Q7 cell); (b) N4 strain: hold the dock
   pulled deep past the bound — rim shimmer visible, computed strain-overlay opacity ≈
   0.5×|overpull| (≥ 0.35 held deep), and 0 within 500ms of release; (c) tab charge/arrival
   pair on Chrome (WebKit already captured: `f4-wk-tab-arrival.png`).
7. **Keyboard law (provision 7).** Steps: Tab-focus a tab button, press Enter. Acceptance: lens
   re-seats; ALL four live-field E rows stay 0.000 throughout; last-gesture row prints
   "keyboard … zero-seed"; rAF returns to PARKED ≤ 400ms after the travel transition ends.
8. **PRM re-check (pinZero now covers the delay line).** Steps: PRM sim ON mid-flick (toggle
   during a live fling). Acceptance: all E rows 0.000 within one frame, rail dots at floor
   opacity immediately (no delayed echo playing out), identity transform on the dock, rAF
   PARKED, gesture buttons no-op while ON.

## F5

verified-model: claude-fable-5 (system-context model ID, verbatim). Cure seat F5, 2026-07-18 —
no browser owned this seat. Page: `prototypes/f5-optical-medium/index.html` via `file://`, BOTH
engines (Chrome ≥150 + WebKit/Safari ≥26) unless a row names one. WebKit law: every material/blur
verdict rides the video/screencast path — Playwright WebKit screenshots are backdrop-filter-blind
(safari-arm §0); screenshots serve geometry/light-layer claims only. Capture hygiene is now
page-native: check "ferry off" and use the clock selector (×20 for stills) — the banded readouts
normalize to ×1 and stay honest gates. WebKit transients already exist (safari-arm, ferry-frozen);
rows below name what is still OPEN.

1. **Chrome transient-lens captures + the sibling pixel pair (G2's Chrome half).** Steps: Chrome,
   ferry off, clock ×20; (a) pointerdown-HOLD a non-active tab → capture CHARGE (state readout
   "charge"); (b) release-click → capture MID-TRAVEL (fence barbell spanning, capsule
   dematerialized under lit goo) and ARRIVAL (capsule oversized + bloom hot); stamp PNGs
   `f5-p2-*`. Acceptance: each capture's pixels show the named transient (the state cell in-frame
   is the self-label); at charge peak, pixel-sample every sibling label vs its local backdrop —
   all siblings ≥4.5:1 (WebKit read 4.53–5.03:1; analytic model 4.7:1 — a Chrome read outside
   ~4.2–5.5 means the model or the clamp legs need re-tuning, not a silent pass).
2. **The goo duel: fence vs SVG filter (the forPass2 fence demand's decider).** Steps: clock ×1,
   run a 4-slot morph (People→Me) on the DEFAULT fence arm; repeat with "goo: SVG-filter arm"
   checked; both engines; WebKit via video burst. Acceptance: fence arm — one CONNECTED liquid
   body mid-travel (no frame with two separated lights, no frame with zero lens presence; WebKit
   25fps burst min presence > 0), worst morph frame ≤ 24ms and specifically the pass-1 WebKit
   4-slot 26ms long frame must NOT reproduce; filter arm measured for comparison. Verdict rule:
   fence reads one-body AND cadence ≥ filter arm → the SVG arm RETIRES from SPEC-F5 §2-H3;
   fence fails the one-body read → the fence anatomy is re-tuned (falloff stops/overlap), not
   abandoned — the fence LAW itself is binding, only its gradient recipe is tunable.
3. **N8/U8 — the opacity-0 backdrop-filter cost (suffusion §2-N8 standing obligation).** Steps:
   U2 panel at rest (medium opacity 0); click "measure 3s cadence" with the N8 twin UNCHECKED →
   record avg/p95/worst; check "N8 twin" → re-measure; uncheck → re-measure (recovery). Both
   engines; on WebKit prefer repeated runs (1ms clock quantization — frame gaps are the honest
   readout). Acceptance: twin-mounted avg frame within 10% of unmounted AND worst ≤ 24ms →
   certify opacity-0 parking for the N8 layer; otherwise the SPEC-F5 §6-U8 row flips to
   "park via display:none" and N9/N8 consumers inherit the mandate. Either outcome closes U8.
4. **PRM one-flip re-verify (G5 — the in-between-frame check).** Steps: PRM sim ON; per-frame
   sample `getComputedStyle(capsule).transform` and bloom opacity for 600ms around a click on a
   non-active tab; then pointerdown-hold a tab (no release) and sample wash opacity. Acceptance:
   capsule translateX changes in EXACTLY one inter-frame step, landing within 1 frame of the
   click (the pre-cure +150..+310ms deferral must NOT reproduce); bloom/wash values are discrete
   flips only (0 / 0.35 / 1-class — zero interpolated intermediates; the pre-cure 0.23→0.51→0.82
   ramp is the named failure); the 220ms acknowledgment CLEAR is one discrete flip (a step is
   legal, interpolation is not); state cell prints "seated (PRM one-flip)".
5. **Harness-defect regression (G6 re-run in paint).** Steps + acceptance, each engine: (a) click
   "flick + catch" with the medium closed → cell prints "flick ignored—medium at rest", the
   interrupt-floor cell does NOT write 0.00 FAIL; (b) click open, wait, click open again, then
   close → the cliff cell keeps its open measurement (never displays ~420ms relax-class values);
   (c) pointerdown a non-active tab, drag off, release anywhere → state returns "rest", no
   press→settle write; (d) pointerdown tab A, hold 1s, slide off, release, click tab B → the
   morph runs from B's own charge floor (press→settle within the 1-slot band if B is adjacent —
   NOT inflated by A's stale 1s hold; the pre-cure "3-slot on a 2-slot geometry" class is dead).
6. **U2 Chrome pair + trace (G3's Chrome half, skipped-unnamed in pass 1 — now named).** Steps:
   Chrome; screenshot at rest-open and mid-relax (catch via "flick + catch" from open, or clock
   ×4); DevTools Performance trace across one full open→close. Acceptance: computed
   `backdrop-filter` identical in both captures (constant radius — decay is opacity-only, no
   radius pump); trace shows no recurring per-frame Paint/re-raster attributable to the medium
   after its first invalidation (the F1-R5 idiom); the WebKit re-raster trace REMAINS TOOL-DEFER
   (desktop Safari Web Inspector/Instruments — do not fake it from the proxy).
7. **The layer-contract lint, live halves (G8c).** Steps: console → `f5LintLayerContract()` on
   both engines; then `node lint-layer-contract.mjs --self-test` beside the page. Acceptance:
   in-page returns `pass: true, failures: []` on both engines (isolation:isolate present,
   region-root effect-free under the FULL enumeration, one plus-lighter composite, fence
   unbreached, tier distinctness, medium claimed + rogue claim THROWS); the node self-test prints
   both `[OK]` lines (clean passes, mutated fails — the gate can fail, proven every run).
