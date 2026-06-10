# FD-deferral-currency — the rolling deferral audit (post-hc2 owed-ledger at HEAD)

**Lane** FD-deferral-currency · **Date** 2026-06-09 · **Branch** `at-dock-convergence` (Batch-2 + hc2 complete)
**Inputs read in full:** all 13 `audit/hardening/hc2/*.md`, `USER-HINGE-REGISTER.md`,
`USER-DECISIONS-2026-06-09.md` (+ the slider addendum), the §0 RG blocks of
`AY.W-{CON1,DOCK2,FF2,BLOB2}.md`, `chronic-deferrals.md` §3 (the A–G taxonomy), `EXECUTION-DAG.md`.
**Live verification this lane:** gate artefacts re-read at HEAD; mechanism greps re-run; the demo
driven on a CLEAN port (`:5187` — the foreign `sci-report/usf/web` vite STILL squats `:5173`,
PID 43028, verified live: the HC-blob port-squat trap is armed right now); 5 audit captures into
`captures/FD-deferral-currency/`.

**Verdict: DESIGN-DEFECTS** — calibrated. The Batch-2 work underneath is genuinely strong (the dock
overview reads as one coherent quiet glass system in both schemes — see §2; the constellation/blob
engine work is real craft per HC-con/HC-blob), but the CLOSE LAYER carries enough gate-passing
residue, fabricated evidence still on disk, one shipped browser regression, and one user-decision
supersession that the tranche cannot honestly publish over it. Nothing here is BROKEN; the defects
are in the seam between what shipped and what the ledger claims shipped.

---

## §0 — Currency check: what hc2 left owed vs HEAD (re-verified, not quoted)

Every load-bearing hc2 claim re-checked this lane, all CONFIRMED STILL OWED at HEAD:

| witness | HEAD state (this lane) |
|---|---|
| `W-CON1-refit-mobile-light.png` | **still 1280×721** (fabricated-mobile, IHDR re-read) |
| `W-GLASS-*.png` | **0 on disk**; `W-DOCK2-*.png` **0 on disk** |
| `.cache/gates/AY-dock-rail-cohesion.json` | **still `fail`** (stale vs landed `DockLayerGroup.vue:221` fix — never re-run) |
| `.cache/gates/AX-dock-animation-live.json` | **still `fail`** (the synthetic born-RED occupying the slot; no real-surface GREEN ever persisted) |
| `.cache/gates/AX-aurora-painterly-statistics.json` | **still `fail`** (the stale `selectOption` driver vs the reka LabeledSelect) |
| R1 IHDR assert | `grep IHDR proof-live-verified-ledger.mjs` → **0** |
| W-CARRY manifest | `deferred-ledger-manifest.json` **does not exist**; register **still 3 items** |
| R3 `user-hinge` disposition | **0 hits** in `proof-disposition-live.mjs` |
| R4 ratchet | **0 hits** (`RATCHET|baseline`) in `proof-no-god-module.mjs` |
| slides `proof-no-bespoke-constellation.mjs` | **does not exist** |
| Firefox slider-blur regression | **CONFIRMED in dist at HEAD** (built 18:47 today): `dist/glass-ui.css` 8 webkit / 5 plain decls; `.slider-range` blur ships as `-webkit-backdrop-filter:var(--slider-range-blur,…)` with **no unprefixed sibling** — broken on Firefox in the shipped artefact |
| `VISUAL-ALLOWLIST.json` | still `["W-DOCK1","W-CON1","W-DOCK2","W-BLOB2"]` — the 6 pixel-changing closes never self-added |
| `:5173` port squat | **LIVE** — any π gate re-run without `GLASS_UI_DEMO_PORT` poisons artefacts today |

Plus ONE post-hc2 supersession the build queue must absorb: the **USER-DECISIONS addendum**
(`USER-DECISIONS-2026-06-09.md` §Addendum, BINDING) re-states the slider standard as the
**continuous rounded cylinder** (thumb INTEGRATED into a thick track, one continuous piece) +
the value.js spectrum reference — superseding the W-SLD1 resolution (b) round-knob AND the H7
hinge as framed. The `isCircle` gate clause likely needs its THIRD restatement.

---

## §1 — THE OWED-LEDGER (the BUILD QUEUE seed, ordered)

Class per `chronic-deferrals.md §3`: A live-capture debt · B consumer-#2/BOOK backlog ·
C cross-repo · D god-module growth · E mobile/device fidelity · F user hinge · G ledger
staleness/promise-relapse. **BLOCKS** = must be GREEN/true before W-PUB1 (via E11/E12/E15/E16 or
because publishing over it falsifies a close claim or ships a known defect). **TRAIL** = can land
after the tag without falsifying the close.

### Tier 1 — mechanisms first (small, they make every later close honest)

| # | item | owner wave | class | blocks? | size |
|---|---|---|---|---|---|
| 1 | **R1 IHDR dimension assert** in `proof-live-verified-ledger.mjs` (+ slides twin + synthetic self-test row) — kills the fabrication class machine-wide; enables the ≥2-viewport floor clause for free | W-CARDINAL-INFRA | E/A | **BLOCKS** (the W-CON1 fabricated set passes the ledger today) | ~8 lines ×2 |
| 2 | **Port-squat identity probe** before `reuseExistingServer` attach (assert the served page IS the glass-ui demo; fail-closed, never skip) — the trap is ARMED at HEAD (PID 43028 on :5173); it has already poisoned 4 blob artefacts + 1 aurora artefact once today | W-CARDINAL-INFRA | G | **BLOCKS** (every pre-close gate re-run is at risk) | ~10 lines |
| 3 | **W-CARRY as written** — manifest JSON (29 bookIds, pre-authored), completeness clause before the sibling skip, register 3→~29 onboarding; born-RED witness immediate | W-CARRY | B | **BLOCKS** (E12 — the FINAL's "zero chronic-defer carry" is gate-FALSE without it) | copy-in |
| 4 | **R4 god-module RATCHET** + CI promotion + the W-GOD1 tag flip (re-assigned to W-GOD1 step 0 per HC-god1) — violators grew 4→6 THIS tranche under the unbuilt mechanism (`mediums.glsl.ts` 528 is the new sixth) | W-GOD1 | D | **BLOCKS** (W-GOD1 is Batch-4 pre-publish; the ratchet is its step 0) | baseline JSON + ~15 lines |
| 5 | **R6 GREEN-on-real-surface clause** (ledger resolves `.cache/gates/<id>.json` cites in DELTAs, asserts `status:"pass"`) + the artefact **provenance stamp** (driven-surface field, so a fixture-arm FAIL can never ambiguously occupy the real-surface slot — the HC-sld-dock §3 hole) | W-CARDINAL-INFRA / W-CLOSE1 `proof:ay-final` | G/A | **BLOCKS** (two live instances RED right now: #9, #10) | ~20 lines |
| 6 | **R3 `user-hinge` register disposition** (schema + script arm); until landed, W-CLOSE1's FINAL must re-print USER-HINGE-REGISTER §B verbatim — that manual obligation is BINDING either way | W-CARRY / W-CLOSE1 | F | **BLOCKS** (manual fallback acceptable; silent absorption is not) | ~15 lines |
| 7 | **`proof:no-bespoke-constellation.mjs`** built in slides NOW, born-RED (spec copy-in-ready at `AY.W-CON3.md §5`); flips at L.W-ADOPT | W-CON3 spec / L.W-ADOPT | C | TRAIL (flips post-publish) — but BUILD pre-publish so the cross-repo edge has a machine row | copy-in |

### Tier 2 — the PAST-DUE and BLOCKING captures (Class A backbone)

| # | item | owner wave | class | blocks? | size |
|---|---|---|---|---|---|
| 8 | **W-DOCK2 RG1** — own-surface light+dark frame-series on `/dock/overview` (zero `W-DOCK2-*.png` at HEAD); W-COHERE G4 rides it (E16) | W-DOCK2 | A | **BLOCKS** (matrix-marked BLOCKING; W-COHERE → W-CLOSE1) | capture run |
| 9 | **W-DOCK2 RG2** — persisted GREEN `proof:dock-animation-live` on the REAL `/dock/overview` (the slot holds the synthetic 700.9ms born-RED FAIL); persist with the provenance stamp (#5) | W-DOCK2 | A/G | **BLOCKS** | gate re-run |
| 10 | **`proof:dock-rail-cohesion` re-run + persist** — the fix IS in source (`DockLayerGroup.vue:221`); the artefact has said `fail` since 16:40 while PROGRESS claims "HG5 LANDED" | W-DOCK2 finisher | G | **BLOCKS** (trivial — minutes) | re-run |
| 11 | **W-GLASS capture arm** — the 8 named PNGs (idle-tracks before/after, drawer-glass, notification-floating × {light,dark}) + a PERSISTED π PASS of `tests-visual/glass-cohesion.spec.ts`; requalify `W-GLASS-DELTA.md:114`; restamp PROGRESS `planned` → `dev-complete` (NOT live-verified) until the pixels land | W-GLASS | A/G | **BLOCKS** (E11: W-GLASS → W-CLOSE1) | capture run |
| 12 | **W-CON1 RG2** — the fabricated-mobile re-capture, PAST-DUE (trigger fired at Batch-2; the working 390-viewport protocol exists from W-CON2/3; ~30 min) | W-CON1 | E/A | **BLOCKS** (a `live-verified` row resting on fabricated evidence cannot survive an honest FINAL) | ~30 min |
| 13 | **W-BLOB2 RG2/RG3** — demonstrative mood-lean series + cream-default mood frame (the mood quad still captures the RED seed; seed move coordinates with W-COHERE E1) + the formal G3-clause transfer (HC-blob §3.5) | W-BLOB2 / W-COHERE | A | **BLOCKS** (same live-verified-on-garbage class as #12) | capture + seed edit |
| 14 | **W-BLOB3 two numbers** — re-run `blob3-interaction-capture.spec.ts`, paste the `[W-BLOB3-π]` centroid-shift lines + the G4 frame-budget number into the DELTA; fix the false "no twin" sentence; add the `"W-BLOB3"` allowlist line | W-BLOB3 finisher | A/G | **BLOCKS** (cheap close-honesty) | one re-run + doc |
| 15 | **W-SLD1 THIRD restatement** — the addendum supersedes resolution (b): spec amendment to the continuous-rounded-cylinder standard + value.js spectrum reference; the `isCircle` clause re-locked onto integrated-continuous geometry; recapture (the current PNGs also CLIP the knob's bottom arc); then the H7 ratification runs against the NEW standard, not the round knob | W-SLD1 (build phase) + FD-slider-design verdict | F/A | **BLOCKS** (publishing the round-knob register against a binding superseding user decision) | spec + build + capture |
| 16 | **W-CON1 RG3** — the shear arm (portrait→landscape transpose, sx≠sy coverage ≥0.9 both axes) in the live refit spec | W-CON1 | A | **BLOCKS** (gate-tightening named in the RG; lower priority than #12) | ~30 lines spec |

### Tier 3 — gate-truth repairs on closed waves (the hc2 headline findings)

| # | item | owner wave | class | blocks? | size |
|---|---|---|---|---|---|
| 17 | **The freeze tautology fix** (HC-con F3.1) — `overlayPulseRadius()` recomputes the expected constant; a live-`now` regression keeps the gate GREEN. Fix: `lastPaintedNow` stamped in the painter, exposed on `__constellationFreeze`, asserted `=== 0` + stable; land WITH **F3.2 the freeze park** (suspend reason + `paintStatic` — the frozen canvas currently repaints at 60fps forever) so the protocol stays honest | W-CON3 finisher | A | **BLOCKS** (a close-gate leg that cannot fail, guarding the wave's own "load-bearing fix") | ~8 lines + park |
| 18 | **The cool-tolerance regression** (HC-con F1.4) — spec says ±5%, the π gate says 6%, the binding run read 5.2%, the same file's comment still says ±5%, and mobile cooling (13.1% measured) has ZERO gate coverage. Retune to genuinely meet ±5% OR amend to the honest ±6% + add the mobile-viewport arm; fix the self-contradicting `:18` comment either way | W-CON2 finisher | A/E | **BLOCKS** (a tolerance that moved to meet the measurement) | retune or amend |
| 19 | **Asymmetric-ramp spec amendment** (HC-con F1.1/F1.2) — W-CON2 §3 still prescribes the symmetric shape; the `--constellation-well-ramp` comment LIES at both declaration sites (token governs ARM only; release is the fixed 22/s) | W-CON2 spec + W-DOC1 | G | **BLOCKS** (spec no longer describes the shipped mechanism on a live-verified wave) | doc |
| 20 | **Painterly-statistics selector fix** (HC-aurora §3) — HARD GATE arm 4 of the closed W-AUR-PAINTERLY persisted `fail`: the AX spec drives a native `selectOption` against the reka `LabeledSelect` (no native `<select>`). Re-drive via the preset buttons the arresting spec already uses; re-run to flip the artefact; the crayon-distinctness clause is NOT subsumed by the arresting spec | W-AUR-PAINTERLY finisher | A/G | **BLOCKS** (an unmet, unrecorded hard-gate arm on a live-verified row) | spec re-drive |
| 21 | **T5 dead-pointer re-route** (HC-aurora §4 / hinge H8) — the oil/oil-pastel residual routes ×4 sites into the terminally-RETIRED W-AUR-WEBGPU-DECIDE; no live owner. Default-if-silent (c)→(a): pull **#22 the −5/3 respacing lever** first; if the band still misses, encode acceptance as a register row; re-point the four dead cites UNCONDITIONALLY | W-AUR-PAINTERLY / USER-HINGE H8 | B/F | **BLOCKS** (the close must surface H8; the re-point is unconditional) | doc + hinge |
| 22 | **The −5/3 radii respacing** — `mediums.glsl.ts:385-387` byte-unchanged; the most relevant untouched single-pass lever for the oil-pastel β residual (−2.53 out of band); the matrix row re-graded OPEN-as-a-lever | W-AUR-PAINTERLY finisher | A | **BLOCKS** only as H8's default path; the band outcome may stand either way | one tuning pass |
| 23 | **Aurora gate hardening riders** (HC-aurora 2a/2b/2c) — the foreign-server sentinel (folds into #2), the razor-thin A-margin disclosure (0.0012), residual ratchet floors (oil A ≥0.30, op A ≥0.60, op β ≥−2.65) so the won ground is machine-held | W-AUR-PAINTERLY finisher | G | TRAIL (the bands hold; the ratchet is protection, not truth) | ~10 lines |

### Tier 4 — W-A11Y-PERF pre-dispatch hardening + the shipped regression

| # | item | owner wave | class | blocks? | size |
|---|---|---|---|---|---|
| 24 | **The Firefox slider-blur regression** — `dist/glass-ui.css` ships the `.slider-range` blur webkit-ONLY (the build minifier deduped the SFC hand pairs to the prefixed form; Firefox has no webkit alias). Fixed for free by O-2a IF its scope is widened to `dist/glass-ui.css` (the spec's `dist/styles/*` walk misses the SFC fold one directory up) + the SFC hand pairs stripped (`Slider.vue:206,296`, `ContinuousRail.vue:89`) | W-A11Y-PERF O-2a | A/G | **BLOCKS W-PUB1 OUTRIGHT** (a known, named, shipped engine regression in the publish artefact) | build-pass edit |
| 25 | **O-1 strict-ancestor no-op re-derivation** (HC-a11y §5) — the spec aims `--glass-backdrop: light` at the rung element itself; `@container style()` evaluates against the PARENT, so the named surface never engages while its descendants half-darken. Re-derive the edit sites (portal-wrapper/host one level up, or an attribute-gated self-arm) BEFORE a build agent runs | W-A11Y-PERF spec owner | G | **BLOCKS** (executing the spec as written lands a no-op + an incoherent half-state) | spec edit |
| 26 | **Supersede `proof:liquid-glass-material` clause 5** — the false-GREEN webkit substring regex (passes on the `@supports` CONDITION with zero painted webkit decls); G2 must widen to declaration-parity over `dist/glass-ui.css` too | W-A11Y-PERF G2 | G | **BLOCKS** (two gates asserting the same property with opposite truth) | ~10 lines |
| 27 | **O-5 contrast oracle** — passes at EXACTLY 4.6:1 over solid `--card` with zero headroom; the glass-aware re-derive is GUARANTEED born-RED and will force the dark-destructive ink lift | W-A11Y-PERF | A | **BLOCKS** (E11) | per spec |
| 28 | **C6 per-rung AA** (extend `KINDS` to all five rungs over synthetic white) + **C7 cascade-guard** (non-inheriting floor / bracket-scoped re-set + the synthetic ancestor-defeat assert) | W-A11Y-PERF / W-GLASS | A | **BLOCKS** (E11, both file:line-confirmed open) | per spec |

### Tier 5 — restamps, allowlist curation, honesty edits (Class G batch; one sitting)

| # | item | owner | class | blocks? |
|---|---|---|---|---|
| 29 | **Allowlist curation breach ×6** — add W-CON2/W-CON3/W-AUR-PAINTERLY/W-BLOB3/W-DOCK3/W-SLD1 (pixel-changing closes); makes the two FABRICATED DELTA allowlist claims (W-SLD1:113, W-DOCK3:71) retroactively true; amend the two wave-spec sentences misstating the ledger engine | W-CARDINAL-INFRA curation | G | **BLOCKS** (false claims in shipped DELTAs) |
| 30 | **R7 restamp batch** — AUDIT-LEDGER row 2 (eggs → DONE-W-CON2) + row 10 (W-DOCK3 flipped); PROGRESS W-FF2 `planned`→`live-verified` (EARNED — 4 real PNGs + persisted GREEN gates); W-GLASS `planned`→`dev-complete` (the unearned half stays open per #11); W-SLD2 "9 cases"→7; W-SLD1 carries the `gate-green, judgment-pending` rider until #15 resolves; W-DOCK3 DELTA released-frame prose re-word | finisher-settle | G | **BLOCKS** (cheap; the ledger gate is row-status-blind — two live-verified DELTAs sat at `planned` invisibly) |
| 31 | **Stale gate/source headers** — `proof-slider-two-only.mjs:6,10,435` (cylinder/AX.W59 language vs its own clause — note #15 may re-write these anyway); `Slider.vue:242` scaleX comment; `GlassDock.vue:2-6` DO-NOT-SPLIT banner (203 lines stale, actively licensing growth); `gates.mjs:370` dead W6 note; `layers.css:235` 0.55 fallback vs the shipped 0.4 | W-DOC1 / W-GOD1 | G | TRAIL (batched with their owners' next touch) |
| 32 | **`--glass-backdrop-luma` RETIRE-or-RESERVE** — zero consumers confirmed; invariant-answerable, default RETIRE (L inv 8) + correct CLAUDE.md if RESERVED | W-GLASS disposition | B | **BLOCKS** (one-line disposition record at W-GLASS close) |
| 33 | **W-DOC1 spec widening** — the aurora README ledger (ACES ×5, 5-of-10 composables tree, mediums table missing 3, gate table missing arresting, WebGPU orphan refs), blob README stale stop literal, the F1.3 22.0 derivation comment, F1.5 ease-back recipe note, soften/warp-prop asymmetry lines | W-DOC1 | G | TRAIL (W-DOC1 is pre-close but doc-only; MUST be widened BEFORE its dispatch or rows 1–5 are missed) |

### Tier 6 — user hinges to SURFACE at close (W-CLOSE1 FINAL re-prints these verbatim)

| # | hinge | default-if-silent | blocks? |
|---|---|---|---|
| 34 | **H4/H5/H6** — G-4 directional-VT / G-5 drawer-spring / G-6 cartoon-quiet: book or retire | BOOK with n:2 trigger (W-CARRY rule 3); H5 is the strongest retire candidate | **BLOCKS** W-CARRY Leg 3 (defaults dischargeable without the user) |
| 35 | **H7 slider ratification** — NOW SUPERSEDED-IN-PART by the addendum (#15); the ratification target is the cylinder restatement, not the round knob; the light-mode track-invisibility question stands (verified live this lane — §2) | per #15; track rest-tint question rides the recapture | **BLOCKS** via #15 |
| 36 | **H8 aurora ceiling** — accept single-pass A/β ceiling or fresh Kuwahara wave | (c)→(a): respacing lever (#22) then accept-as-register | **BLOCKS** as surfacing obligation only |
| 37 | **H9 feedback-coder audience lock** (slides/L) | (a) research | TRAIL (L-side) |

### Tier 7 — cross-repo trailers (slides side; gated on HINGE 1, but author the rows NOW)

| # | item | owner | class | blocks? |
|---|---|---|---|---|
| 38 | **W-DOCK3 L re-home row** — the progress-bar-off-the-dock verify-row exists in NO L doc; the DELTA's "re-homed" claim is prose-only | L.W-ADOPT / L close checklist | C | TRAIL (one line; author now so the claim is true) |
| 39 | **H3 round-4 slides row** — the no-cap poster decision has no slides-side REFINEMENT-DECISIONS row | slides round 4 | C | TRAIL (verify at L close) |
| 40 | **HC-L-deck batch** — D1 copy-gate RED (`SlideSovereignty.vue:113`, blocks every L close), D3 meta banned-frame title, D5 zero L captures (ledger vacuously green), 8-of-13 L specs stale, L PROGRESS doubly stale, D7 underline adoption unowned | L tranche | G/C | TRAIL HINGE 1 (blocks HINGE 2 / L.W5) |
| 41 | **W-LIQUID facility-build recheck** — one design-track session-list recheck (WWDC26 sessions drop through June 12); `contrast-color()` multi-candidate is BLOCKED-ON-PLATFORM (recheck trigger recorded) | W-LIQUID | — | TRAIL |

**Explicitly NOT on this ledger:** the planned-wave band (W-FF2 build, W-SCALE1/2, W-SB1-3, W-IC1,
W-CONVERGE, W-CSS1, W-LEG1, W-COLOCATE, W-LIVE1, W-NDA, W-TRIAGE, W-CONSUMER, W-DELTA0, W-GOD1
carves, W-COHERE, W-UNDERLINE, W-MOTION2, W-ANIM1, W-BLOB-GLASS, W-LIQUID) — those are SCHEDULED
work with authored specs, not deferral debt; they block W-PUB1 via E15 by construction and the DAG
already orders them. This ledger is the debt that would otherwise hide INSIDE closed/`live-verified`
rows. W-FF2's RG1–RG4 (thin-arc comet, weak bbox proxy, light floor, recession parity) ride the
planned wave and are re-confirmed live in §2.

---

## §2 — The live drive (design judgments, with the captures)

Captures: `captures/FD-deferral-currency/FD-defer-{dock-overview-light,dock-overview-dark,slider-light,blob-light,fourier-light}.png` (1280×800 @2×, driven on :5187).

- **Dock `/dock/overview` (light + dark)** — the strongest argument that the underlying work
  deserves its eventual publish. The collapsed pill set, the media-transport pill, the bottom
  morph-dock all read as ONE quiet glass system; spacing/typography hierarchy (mono section
  eyebrows → body) is confident in both schemes; the dark scheme holds the same register without a
  single muddled surface. **This surface is capture-READY — the W-DOCK2 RG1 debt (#8) is ~an hour
  of work against a surface that will grade well.** The irony of the tranche in one frame: the
  best-looking owed capture in the queue is the one that has been owed longest.
- **Slider `/forms/slider` (light)** — the H7 observation verifies on my own capture: the unfilled
  track right of the knob is near-invisible over the cream page; "Volume" reads as a dark bar with
  a bulged terminus, not a knob ON a two-tone track (the W55 over-light class on the library's own
  chrome). And against the addendum's "continuous rounded cylinder" standard, the shipped detached
  dot-on-a-thin-line reads as the WRONG register entirely — thin track, separable knob. #15 is not
  paperwork; the as-built form genuinely does not say what the user's clarified words say.
- **Fourier `/substrates/fourier-field` (light)** — gate-green and visually thin, the exact
  calibration case. `proof:fourier-field-visibility-live` is PASS 2/2 at HEAD, and the live hero
  is a faint hairline arc with pale epicycles; the `final` preset is a barely-there squiggle. The
  W-FF2 RG1 ("thin arc, not the signature comet") and RG3 (sub-perceptible on cream) verdicts are
  both visible in one capture. The wave is correctly `planned` — but anyone reading the green gate
  as "fourier is fine" should look at this frame.
- **Blob `/substrates/blob` (light)** — the WatercolorDot strip (black/red/blue/green) is bold and
  characterful; the mood hero further down still seeds RED (source-confirmed `blob.vue:32,:67`),
  so the cream-default story the W-BLOB2 close tells is still not what the mood surface shows
  (#13).
- **Process note:** this lane could only drive the demo at all by dodging the live `:5173` squat
  (#2). A design auditor should not need tribal knowledge of `GLASS_UI_DEMO_PORT` to avoid
  poisoning four gate artefacts; that is the strongest practical argument for the identity probe
  landing in Tier 1.

---

## §3 — Shape of the queue (the orchestrator's read)

- **Mechanism-first is not optional this time.** hc2's score was 1/7 mechanisms built, and TWO of
  the failure classes fired live TODAY (the port squat poisoned five artefacts; the violator set
  grew 4→6 under the unbuilt ratchet). Tiers 1 items are each ≤40 lines and every one converts a
  recurring manual catch into a machine row.
- **The blocking surface-work is small and well-lit.** Tier 2+3 is mostly capture runs, gate
  re-runs, and finisher amendments against surfaces that (per §2) are in good visual shape. The
  only real BUILD items before the publish gate are #15 (the slider third restatement), #24-28
  (W-A11Y-PERF, already specced, needing the §5/§1 spec re-derivations first), and the planned-wave
  band the DAG already orders.
- **Two items are publish-blockers in the plainest sense:** #24 (a known shipped Firefox
  regression in the artefact the tag would publish) and #15 (a binding user decision the shipped
  register contradicts). Everything else blocks through close-honesty edges that are individually
  cheap.
- **The fastest honest path to HINGE 1:** Tier 1 (one sitting) → Tier 2 captures batched on one
  dev-server session (one afternoon: #8/#9/#10 dock, #11 glass, #12 con1, #13 blob-mood, #14
  blob3 re-run) → Tier 3 finisher amendments → Tier 5 restamp batch → the planned-wave band per
  the DAG → W-CARRY/W-CLOSE1 with the Tier 6 hinges re-printed verbatim.
