# BC Deferral Sweep — the cross-tranche DEFERRAL-LEDGER seed (research corpus)

> Assignment: machine/docs sweep of AX/AY/AZ/BA/BB for the deferral vocabulary (BOOKED, booked-to,
> successor, HELD, deferred, next-tranche, pending, SPEC, rides W-REFLECT3, W-CLOSE, the
> DISPOSITION-REGISTER rows, the BB never-run batches). Each deferral: id · what+evidence · origin ·
> status · a DECIDED BC disposition mapped to a BC band. Grounded — every row carries a file:line or
> a measured wave-state. This is the DEFERRAL-LEDGER content for BC.

---

## §0 — THE ROOT FINDING (the disease, named)

**BB never closed.** There is NO `docs/tranches/BB/FINAL.md` (every other tranche A→BA has one). The
authoritative run-state is `docs/tranches/BB/PROGRESS.md` (the spec-header `**Status**: SPEC` line is
stale authoring-state — many SPEC-headed waves are `complete` in PROGRESS; PROGRESS is the truth).

**The single structural root cause of "source-green but visually-broken":** `BB.W-REFLECT3` (Batch 7)
— the *SINGLE authorized gestalt-verdict-flipper* and the *binding-π capture conductor* for the entire
BB visual band — **was NEVER RUN** (`PROGRESS.md` W-REFLECT3 → `SPEC`; `BB.W-REFLECT3.md:14`
`**Status**: SPEC`). 48 BB wave specs reference W-REFLECT3 (measured:
`grep -rlE 'W-REFLECT3' docs/tranches/BB/waves/ | wc -l` = 48). EVERY one of them closed `complete`
source-side with the explicit deferral that its **binding π** AND its **`proof:ba-gestalt` verdict**
"ride W-REFLECT3":

- W-DOCK-MORPH-FAMILY (PROGRESS:72): *"π `tests-visual/dock-morph-family.spec.ts` rides W-REFLECT3"*
- W-BORDER-PROGRESS (PROGRESS:60): *"Binding π … + the gestalt verdict ride W-REFLECT3"*
- W-ON-GLASS-FG (PROGRESS:73): *"binding live capture rides W-REFLECT3"*
- W-LENSING (PROGRESS:123): *"π tests-visual/lensing.spec.ts (LOCAL real-GPU, rides W-REFLECT3)"*
- W-LIQUIDHOVER (PROGRESS:76): *"rides W-REFLECT3 … re-earned at W-REFLECT2/3"*
- W-LIQUID-REVEAL (PROGRESS:121): *"ba-gestalt overlay verdict deferred to W-REFLECT3"*
- W-AURORA-SWRASTER (PROGRESS:74): *"the whole-page capture ride W-REFLECT3"*
- W-FLOWFIELD / W-AURORA-WGPU / W-GOOBLOB-WGPU / W-VIZ-POINTER / W-PHASE-PALETTE: *"the binding
  live-π … gestalt capture rides W-REFLECT3"* (the entire WebGPU-first viz suite).

So the `proof:ba-gestalt` holistic acceptance gate — the structural answer BA *built* to kill the
per-mechanism-green/page-wrong close-class (P-1) — was **itself deferred to a wave that never ran**.
The dock+shell rows sit at an honest REVOKED FAIL (W-CHIP-GRAZE Batch 1 revoked their PASS;
W-DOCK-RAIL-SEAT-FINAL Batch 2 re-architected but is *not* the authorized flipper —
`BB.W-DOCK-RAIL-SEAT-FINAL.md:152`). The roster never grew to the BB primitives. The visual-π runner
`--run pi` never ran on a real device. **W-REFLECT3 IS the most important deferral in the entire
sweep — its non-execution is the direct mechanical cause the user observed.** It maps to BC **Band 0**
(BC.W-GESTALT-FIRST / BC.W-PAINT-GATE) — per-wave gestalt-first verification must SUPERSEDE the
single-terminal-reflect; the ride-W-REFLECT3 pattern is structurally forbidden in BC.

`BB.W-CLOSE` (the 4.1.0 honest cut + the chronic-fold disposition table) likewise never ran
(`PROGRESS.md` → SPEC); BB has no terminal close ceremony, so no chronic was ever DECIDED-at-close.

---

## §1 — THE BB NEVER-RUN BATCHES (Batch 5 + Batch 7 + the perf chronic)

Authoritative PROGRESS run-state (measured 2026-06-18):

### Batch 5 — CROSS-REPO ADOPT (DRIVEN) — almost entirely SPEC
| wave | PROGRESS status | what | BC disposition |
|---|---|---|---|
| W-ADOPT-RECONCILE | **SPEC** | the cross-repo adopt loop owned as ONE close-loop (`proof:adopt-loop` aggregator over consumer-staleness + phantom-classes + resolution + the fourier `^3.1.0`→`^4.0.0` re-pin + the 4 EXT re-flags). `BB.W-ADOPT-RECONCILE.md:14`. | BC Band 10 — BC.W-SPEEDTEST-ADOPT / BC.W-FOURIER-ASK (the adopt loop is part of the 4.0.1→4.1.0 cross-repo unblock) |
| W-SLIDES-DRIVE | **SPEC** | drive slides Tranche N: Phase-1 adopt arm (4.0.0 published, executable) + Phase-2 deck consume-back at 4.1.0. `BB.W-SLIDES-DRIVE.md:14`. | BC Band 10 — BC.W-CUT (slides redeploy is EXECUTION-phase) |
| W-LEAF-MODERNIZE | **SPEC** | leaf-publisher modernization (value.js orphan-delete/1.0.0-decided, kf .npmrc-delete, pencil-boil TS6, latex-paper peers). Foreign-tree, USER-DOMAIN publishes. PROGRESS:91. | BC Band 10 — coordination-only; HOLD-with-rationale (USER-DOMAIN, by-name asks) |
| W-CONSUMER-MODERNIZE | **SPEC** | consumer modernization (fourier/speedtest/sci-report + 3 new spine consumers words-frontend/bbnf-playground/bbnf-buddy + the Atlas `^4.1.0` bump). PROGRESS:92. | BC Band 10 — BC.W-ATLAS-ASK + BC.W-SPEEDTEST-ADOPT |
| W-PEER-SPINE | FOLDED→Batch C (W-SPINE-LATEST) | the value `^0.13.0` IDENTITY widen — DONE pre-Batch-0. PROGRESS:83. | DONE (recorded — not a BC carry) |
| W-EASING-PRIMITIVE | **complete** | the C-3 fold landed; consumer #2 = value.js GradientPane (by-name CONSUME). | DONE source-side; the binding π rides W-REFLECT3 → BC Band 0/3 re-verify |
| W-LINEAGE-PROBE | **complete** | inv-11 registry-consumer probe mechanized. | DONE |
| W-CROSSREPO-ASKS | **complete** | the formalized cross-repo relay ledger. | DONE (BC reads it as the cross-repo source of truth) |

### Batch 7 — CLOSE — entirely SPEC (the close never happened)
| wave | status | what | BC disposition |
|---|---|---|---|
| W-REFLECT3 | **SPEC** | the fresh whole-page gestalt reflection; the SINGLE authorized verdict-flipper for ~48 waves; the roster-growth + the dock/shell RE-RE-REFLECTION + `--run pi` on real device. `BB.W-REFLECT3.md:14`. | **BC Band 0 — BC.W-GESTALT-FIRST + BC.W-PAINT-GATE** (the disease root; per-wave gestalt-first supersedes one-terminal-reflect) |
| W-CLOSE | **SPEC** | the 4.1.0 honest cut + the chronic-fold disposition table + the lineage map. `BB.W-CLOSE.md:14`. | BC Band 10 — BC.W-CUT (EXECUTION-phase only) |

### The perf chronic (3-4 tranches, zero gate ever fired)
| wave | status | what | BC disposition |
|---|---|---|---|
| W-LIGHTHOUSE | **SPEC** | the 3-4-tranche perf chronic; `proof:lighthouse` (re-runnable prod `vite preview` Lighthouse floor on `:5388`). PROGRESS:38: *"the 3-4 tranche chronic, zero gate"*. | BC — Band 8/performance (the user's "renders SLOW" aurora defect; map to a BC perf wave, BUILD) |
| W-CSS-CRITICAL | **SPEC** | the render-blocking critical/deferred `/styles` split (`proof:css-critical`). PROGRESS:39. ALSO the disposition-register `styles-critical-split` book's BUILD destination (`pendingResolvedBy: BB.W-CSS-CRITICAL`). | BC — Band 8/performance, BUILD (discharges the disposition book) |
| W-PERF-PRODUCER | **WIP** (source-GREEN; π local-pending) | the value.js A′ perf-producer cluster (dock-morph `contain`, dock-glyph density, aurora-wash DPR, zombie-canvas guard). PROGRESS:41. Source landed; binding π NOT run. | BC Band 0/8 — re-verify the π; the 4 A′ fixes are live but unverified-on-paint |

### The Batch-P primitives — COMPLETE source-side, π ALL deferred to W-REFLECT3
W-BORDER-PROGRESS, W-DOCK-MORPH-FAMILY, W-ON-GLASS-FG, W-AURORA-SWRASTER, W-PHASE-PALETTE,
W-DOCKMORPH-CTA, W-DECK (the deck-subpath flip) are the net-new primitive surfaces the roster was
meant to GROW to cover. EXCEPTION: **W-DECK is itself SPEC** (PROGRESS:71 → `SPEC`) — the
`deck-subpath` chronic book TRIGGERED (speedtest survey + slides = ≥2 repos) but the lift never
executed. So `@mkbabb/glass-ui/deck` does not exist at HEAD. BC disposition: BC Band 10 (the speedtest
+ slides consume-back) — BUILD or RE-DECIDE the deck-subpath flip.

---

## §2 — THE DISPOSITION-REGISTER (`docs/tranches/AX/audit/DISPOSITION-REGISTER.json`) — 31 rows

The machine-readable BOOK/ARCHIVED/RETIRED register, the chronic-fold arm. At BB it was RE-STAMPED
(W-DISPOSITION-RESTAMP, complete) — all 31 rows DECIDED-or-honestly-held, zero silent re-book. State:
**1 retired · 2 archived · 28 booked**. Every booked row carries `reStampedAt: BB` + a `reStampNote`
that the `min-consumers n:2` trigger re-evaluates un-MET (the honest-hold long-tail). Two rows carried
a `pendingResolvedBy` BB destination (both discharged at BB).

### The retired/decided rows (terminal — NOT a BC carry, recorded for completeness)
| id | disposition | resolution | BC note |
|---|---|---|---|
| native-drawer-as-asChild | **retired** (BB.W-NDA-DECIDE) | the FOUNDING 5-tranche chronic, RETIRE-with-rationale: host pruned at AY (077fe58f), trigger 0/8, covered by `<Drawer live-behind>`. successor: `<Drawer live-behind>` + glass-dialog-native-pilot (#34). | TERMINAL — re-enters only through #34's own NEW ≥2 trigger. NO BC carry. |
| styles-critical-split | book → **pendingResolvedBy: BB.W-CSS-CRITICAL** | BUILD destination — but W-CSS-CRITICAL is **SPEC (never ran)**, so the BUILD did not land. | BC: the book is STILL OPEN (the build never happened) → BC Band 8 perf BUILD discharges it |
| css-relative-color | book → **pendingResolvedBy: BB.W-DARK-INK-WARM** | MEET destination — W-DARK-INK-WARM is `complete` (the dark `--surface-tint-*` arm re-expressed as `oklch(from …)`). | DISCHARGED (the recipe landed). NO BC carry. The 2 other prose-only `oklch(from …)` hits re-pointed. |

### The 2 archived rows (honest hold, watch active)
- `panel-host-primitive` — 1 consumer (bbnf-buddy LeftToolsDock) < 2; dock + sheet cover the need.
- `interruptible-reorder` — 0 consumers; no present consumer asks for mid-gesture re-grab.

### The 26 booked-un-MET rows (the honest-hold long-tail; each `min-consumers n:2` un-MET at BB)
deck-subpath · button-icon-sm · dock-select-clamp-label · tooltip-mono-variant · select-size ·
spring-crisp-token · metric-badge-icon · completion-seal-family · labeled-field-for-id ·
speedtest-a11y-bundle · raf-loop-demand-park · cross-document-vt · css-scope-state · css-at-function ·
interestfor-previews · css-text-box-trim · css-interpolate-size · glass-dialog-native-pilot ·
glass-native-select-pilot · inline-edit-primitive · labeled-slider-readout · directional-view-transition
· drawer-content-spring · cartoon-quiet-preset · speedtest-native-first-receive ·
keyframes-prune-migration-dag.

**BC disposition for the register:** The register is healthy (machine-locked by `proof:disposition-live`
+ the BB decided-destination clause). Most rows are correct honest-holds (genuine <2-consumer
divergence, NOT neglect — J inv-10). BC must HOLD-with-rationale the bulk and FLIP the ones a BC wave
genuinely decides:
- `deck-subpath` — the trigger is MET (speedtest+slides=2) and W-DECK was SPEC'd to discharge it but
  NEVER RAN → BC must BUILD (Band 10) or re-decide; this is a chronic that BB *claimed* but did not
  land.
- `styles-critical-split` — BUILD destination W-CSS-CRITICAL never ran → BC Band 8 BUILD.
- `spring-crisp-token` — DECIDED no-op at BB.B9 (1 live speedtest consumer self-hosting an override;
  `proof:spring-crisp` is the no-op-decision gate). HOLD-with-rationale unless a BC wave lands a 2nd.
- `inline-edit-primitive` (5-tranche carry, 3 divergent consumers) + `labeled-slider-readout` (2
  divergent) — legitimate divergence holds; HOLD unless BC converges them.
- The CSS-feature books (css-scope-state, css-at-function, interestfor-previews, css-text-box-trim,
  css-interpolate-size, cross-document-vt) — Limited/experimental Baseline; HOLD-with-rationale,
  graduate at Baseline Widely.
- The speedtest/value.js-owned books (speedtest-a11y-bundle, speedtest-native-first-receive,
  metric-badge-icon, raf-loop-demand-park, labeled-field-for-id, keyframes-prune-migration-dag) — the
  RECEIVE is the consumer's (inv-16); HOLD, re-evaluate at the BC cross-repo Band 10.

---

## §3 — THE AY-DEFERRED NAMED-SUCCESSORS (`docs/tranches/AY/FINAL.md §6`)

AY closed `complete` with named-successor deferrals (FINAL:200):
| AY-deferred wave | what (FINAL:64,86,106) | BB outcome | BC disposition |
|---|---|---|---|
| W-LIGHTHOUSE | the Lighthouse perf-budget audit (`planned`, named-successor deferred, no green run owed). | BB SPEC'd `proof:lighthouse` — **NEVER RAN** (still the 3-4-tranche zero-gate chronic). | **BC Band 8 perf — BUILD** (the chronic crosses AY→BB→BC; the user's "aurora renders SLOW") |
| W-LIQUID | the liquid-glass specular fold (`planned`, named-successor deferred). | FOLDED into W-LIQUIDHOVER + W-MORPH-SHOWCASE (useLiquidFlex) + W-LIQUID-REVEAL — all `complete` source-side. | DONE source-side; the π ride W-REFLECT3 → BC Band 0/1 re-verify |
| W-AUR-T5 | minted by W-AUR-STUDIO §6 (the T5 dead-pointer re-eval; named-successor deferred). | **DECIDED at BB.W-AUR-KUWAHARA** (complete) — BUILD: the soft anisotropic-Kuwahara medium. The 3-tranche residual ended. | DONE (Kuwahara landed); the no-pinwheel π rides W-REFLECT3 → BC re-verify |
| W-MOTION3 / W-MOTION3-residual | the live-parameterized `steppedEase(n, term)` generator (the MOTION2 G7 defer). | FOLDED into W-EASING-PRIMITIVE (the EasingPicker composes value.js `steppedEase`). | DONE source-side; π rides W-REFLECT3 |
| W-SB2/W-SB3 | storybook-meta waves (named-successor deferred). | not discharged in BB. | BC Band 9 — BC.W-STORYBOOK-META |

---

## §4 — THE AZ-DEFERRED NAMED-SUCCESSORS (`docs/tranches/AZ/FINAL.md §6`)

| AZ-deferred | what (FINAL:143-165) | BB outcome | BC disposition |
|---|---|---|---|
| W-MOTION3 | live-parameterized `steppedEase(n, term)` generator (MOTION2 G7 defer). | folded → W-EASING-PRIMITIVE. | DONE source-side |
| embla-on-overflow fold | promote the dock-rail chip strip to embla `Carousel` if a facet set overruns the inline budget (booked, not built). | not built (most carry 2-4 chips). | BC Band 2 — HOLD-with-rationale (the dock rail IS a BC focus: BC.W-DOCK-STACK-RAIL — re-evaluate whether the scrollable n-stack rail needs embla momentum) |
| SHELL-IA-N1 | the desktop double-carousel (facet strip beside sidebar AND above bottom dock; logged S3). | not built. | BC Band 2 — HOLD (a successor weighs collapsing one; defer to the dock rebuild) |
| useGlassBackdropLuminance promotion | on the booked 2nd-binary trigger (`docs/consumer-evidence/use-glass-backdrop-luminance.md`); demo-private, dock-only consumer. | re-stamped BOOK at BB; STILL demo-private. | **BC Band 1 — BC.W-ADAPTIVE-RECONCILE** (D1: the luminance observer is DECORATIVE — `--glass-backdrop-luma` is written but NOTHING reads it; BC must close the observer loop. This is the glass-too-grey root.) |
| AY W-DELTA0 stale-hash re-captures | the 5 AY DELTAs drifted hash-stale; the next tranche's Batch-0 owes the re-capture sweep. | **DISCHARGED at BB.W-DELTA-RESHOOT** (complete) — re-shot on live :5199 + re-stamped. | DONE |
| R5-9 deck PAGE-TURN primitive | lift the slides `[data-state]{active\|prev\|next}` + `--turn-*` tokens wholesale on wave cadence. | cross-linked to W-DECK (SPEC, never ran). | BC Band 10 — BUILD with W-DECK or re-decide |
| R5-10 glass menu-row + panel-section | the `.glass-menu-row` CVA + `.glass-menu-section` recipe (slides DeckSettings reference). | **DISCHARGED at BA.W-MENU-GLASS** (the menu glass register). | DONE |
| portal-capture discipline | captures of teleported portals must drive `?dark`/`?light` param, not a class toggle (precept-candidate). | not formalized as a precept. | BC Band 0 — fold into the BC.W-PAINT-GATE capture discipline |

---

## §5 — THE BA-DEFERRED NAMED-SUCCESSORS (`docs/tranches/BA/FINAL.md §6`)

| BA-deferred | what (FINAL:208-265) | BB outcome | BC disposition |
|---|---|---|---|
| The ~28 DISPOSITION-REGISTER BOOK rows | re-stamped un-MET; DISCHARGED at BB.W-DISPOSITION-RESTAMP (decided, not re-booked). | DONE (W-DISPOSITION-RESTAMP complete; see §2). | the register stands; BC holds the long-tail |
| css-relative-color opportunistic fold | the 2 `oklch(from …)` comment hits; folds when a tint recipe pays the diff. | DISCHARGED at BB.W-DARK-INK-WARM (MEET). | DONE |
| button-icon-sm + select-size | folds on a future control-size-vocabulary wave. | re-stamped BOOK un-MET. | BC Band 6 — HOLD (controls band); re-evaluate if BC.W-CONTROL-SMOOTH converges a control-size vocabulary |
| DC-EXT-1/2/3/4 (externally-owned re-flags) | tabs-migration rows (fourier ×3, words ×2) · fourier phantom-classes (Q.W4 Lane-F) · value.js self-alias · bbnf-lang/playground hard-alias. Receiver wave is in EACH CONSUMER's tranche (inv-16). | re-stamped; W-ADOPT-RECONCILE (SPEC) was meant to own the loop — NEVER RAN. | BC Band 10 — the adopt loop is OPEN; BC.W-SPEEDTEST-ADOPT / BC.W-FOURIER-ASK / BC.W-ATLAS-ASK |
| R5-9 deck PAGE-TURN + directional-view-transition | the two halves of the slides page-transition future; cross-linked, neither fires alone; `--vt-direction` driver. | both re-stamped BOOK; W-DECK (SPEC) never ran. | BC Band 10 — BUILD with W-DECK / W-SLIDES-DRIVE or re-decide |
| W-EASING-PRIMITIVE | the fourier C-3 book (StepsEditor → published EasingPicker; value.js's 3 forks = consumer #2). | **DISCHARGED at BB.W-EASING-PRIMITIVE** (complete). | DONE source-side; π rides W-REFLECT3 → re-verify |
| W-MOTION3-residual | the live-parameterized steppedEase generator. | folded → W-EASING-PRIMITIVE. | DONE source-side |
| The chip-graze | IconChip section-color chip grazing the input affordance on the densest forms route at narrowest desktop width (an accepted graze, named successor). | **DISCHARGED at BB.W-CHIP-GRAZE + W-DOCK-RAIL-SEAT-FINAL** (band-agnostic `chipOverMain:false`). | DONE source-side; the dock/shell gestalt verdict rides W-REFLECT3 (REVOKED-FAIL never re-flipped) → **BC Band 2/5 re-verify** |
| The value.js C-1 4.x block (BA-VJS-5) | per-satellite derived color (`uSatColor=0`); arm B = book to a 4.x point release (widen the GL fence via triumvirate). `src/components/custom/goo-blob/types.ts:299`. | re-stamped BOOK; the GL color-seam fence NOT widened. | BC Band 4 — HOLD-with-rationale (the goo-blob first-principles rebuild BC.W-GOOBLOB-FIRSTPRINCIPLES may absorb it; re-decide there) |
| useGlassBackdropLuminance promotion | on the booked 2nd-binary trigger (carried from AZ). | still demo-private. | BC Band 1 — BC.W-ADAPTIVE-RECONCILE (same as §4) |

---

## §6 — THE TECHNICAL SUCCESSOR BOOKINGS (live in src/ + BB wave specs)

These are concrete feature-deferrals booked to named/phantom successor waves — the user's "every
procedural animation audited + fully modernized" + "all asks addressed" demand BC to DECIDE each.

| # | id / marker | what + evidence (file:line) | origin | BC disposition |
|---|---|---|---|---|
| T1 | teardrop V↔H morph fidelity | the metaball-teardrop V↔H morph is a perf-gated PREVIEW; the VT-crossfade ships because the teardrop missed the 4×-throttle 16.7ms budget (AZ p50 13.7-15.1ms). `BA.W-DOCK-MORPH-INSITU.md:18,181`; `AZ.W-MORPH-SHOWCASE.md:150`. Always-on teardrop BOOKED with `gperf-{v2h,h2v}.json` trace. | AZ.W-MORPH-SHOWCASE → BA.W-DOCK-MORPH-INSITU (DC-REC-4) | **BC Band 2 — BC.W-LIQUID-MORPH** (the user demands arbitrary-shape morph, never-white, never-invisible; the §7 mechanical-fall discipline must be re-run on the BC engine; if BC goes WebGPU-everywhere the budget changes — re-decide the number) |
| T2 | chromatic-aberration RGB-split rim | the `--glass-lens-chroma` knob (default OFF, perf-gated, 3 per-channel SVG displacement passes — "unmistakably iOS glass"). `BB.W-LENSING.md:129,187`; `src/styles/glass-refract.css:85`. The GL-color seam fence NOT widened. | BB.W-LENSING (R1/R2 TOP-FLOURISH) | **BC Band 1 — BC.W-GLASS-LEGIBILITY-MEASURED / BC.W-BUTTON-GLASS-IOS** (the user wants increased glass-morphism; re-decide whether the chroma rim ships in the iOS-27 glass rebuild) |
| T3 | W-FOURIER-GPU | FourierField stays Canvas2D; migrate to WebGPU line-instancing when harmonic density scales to thousands of phasors. `src/components/custom/fourier-field/README.md:190`. Recorded `no-migrate` in the parity table. | BB.W-VIZ-SUITE | **BC Band 4 — BC.W-WEBGPU-EVERYWHERE + BC.W-FOURIER-ONE** (the user demands WebGPU EVERYWHERE, NO canvas anywhere, AND fourier collapses to ONE view; this DIRECTLY contradicts the no-migrate book → BC must BUILD the WebGPU migration AND kill the duplicate views) |
| T4 | W-AURORA-WGPU-MEDIUMS | the painterly-medium WGSL bodies (van-Gogh/oil/oil-pastel/Kuwahara) for the WebGPU aurora primary; a painterly-medium config on WebGPU degrades to the smooth core. `src/components/custom/aurora/constants/shaders/aurora.wgsl.ts:18,322`. | BB.W-AURORA-WGPU + BB.W-AUR-KUWAHARA | **BC Band 4 — BC.W-WEBGPU-EVERYWHERE** (if WebGPU is the only path on Safari-capable hosts, the medium bodies MUST port — no fallback to WebGL2; re-decide BUILD) |
| T5 | KF-OSCILLATOR / kf `Oscillator` loop | the EasingPicker's `loop` playback seam awaits the keyframes.js LIGHT `Oscillator`; named-successor consume, NOT a blocking dep. `src/components/custom/easing/README.md:62,65,67`; `KF-TO-GLASSUI-BB-ASKS.md:47`. | BB.W-EASING-PRIMITIVE (kf-owned) | BC Band 7 — HOLD-with-rationale (kf-owned, by-name ask; slots in when kf ships it. BC.W-MOTION-ONE-CLOCK may revisit) |
| T6 | full 20px deep-glass blur | the deep tier lands at 16px (in [14,20]); the full Apple 20px is a BOOKED successor with the recorded throttle number. `src/styles/tokens/glass-deep.css:26`. | BB.W-DEEP-GLASS | **BC Band 1 — BC.W-GLASS-IDENTITY** (the user wants iOS-27 increased glass-morphism; re-decide whether 20px ships with the measured throttle) |
| T7 | value.js 0.13.0 `oklchSpectrum` CONSUME | BorderProgress's `useBorderSpectrum` is a glass-ui-local interim; re-points onto value.js's named helper on the 0.13.0 ship (consume-and-delete). `src/components/custom/border-progress/composables/useBorderSpectrum.ts:5`. | BB.W-BORDER-PROGRESS | BC Band 10 — coordination (value.js publishes; glass-ui consumes-and-deletes). HOLD-with-rationale until value.js ships the helper |
| T8 | transform-squish-reconcile successor | W-DOCK-MORPH-FAMILY books a transform-squish reconcile. PROGRESS:72. | BB.W-DOCK-MORPH-FAMILY | BC Band 2 — fold into BC.W-DOCK-ENGINE (the morph rebuild) |
| T9 | scroll-pin JS fallback leaf | `.scroll-pin` JS fallback "BOOKED only on a material engine-gap reveal — never a JS scroll lib". `src/styles/scroll-choreography.css:223`. | BB.W-SCROLL-MOTION | BC Band 7 — HOLD (the native `timeline-scope` is the path; JS leaf only on a real engine gap) |
| T10 | base64-fonts deferred-split | the font base64 KEPT; the W1-close deferred split. `src/styles/fonts.css:36`. | BB.W-PAYLOAD-DEFER | BC Band 8 perf — HOLD (paid-diff-only) |
| T11 | useLayerTransition / DockLayerGroup → AY.W-GOD1 FLIP-engine fold | the standalone FLIP engine is BOOKED to fold onto the dock's single morph orchestrator. `src/components/custom/dock/composables/useLayerTransition.ts:37,40`; `DockLayerGroup.vue:334,342`. | AY.W-GOD1 (booked) | BC Band 2 — fold into BC.W-DOCK-ENGINE (the single-orchestrator rebuild) |
| T12 | glass-refract runtime scale-reconstruction | the data-URI `feDisplacementMap scale` cannot be CSS-`var()`-driven (CSSWG #542); the runtime scale-animation reconstruction is the booked encoding-successor. `BB.W-LENSING` PROGRESS:123; `src/styles/glass-refract.css`. | BB.W-LENSING | BC Band 1 — fold into the glass rebuild (re-decide the in-document-SVG mount path) |

---

## §7 — THE PHANTOM-SUCCESSOR + UNRESOLVED MARKERS

- **W-KF-CONSUMER** (PHANTOM — no spec exists). Cited as a successor in BB. The fourier 8 re-points +
  bbnf alias re-point landed under it at AZ batch 5 (per the recent commit log 636adeae). The
  keyframes-arm was "honestly DROPPED on the scope-reveal." BC: confirm no dangling reference; the kf
  consume is by-name (Band 10).
- **The `BB.W-AURORA-WGPU-MEDIUMS`** name appears only in src/ comments + the aurora README, never as a
  wave spec — a phantom-successor (a future-tranche name). BC Band 4 owns the decision.
- **W-BUTTON-TONE** — `BOOKED W-BUTTON-TONE` in a BB spec (the press-unify / button band). Phantom (no
  spec). BC Band 6 / Band 1 (button glass) should absorb or decide.

---

## §8 — THE PRIOR-TRANCHE ONBOARD CHAIN (AT W0-L4 → AY.W-CARRY → the register)

`docs/tranches/AY/audit/deferred-ledger-manifest.json` records the full bookId set (31 ids) AY
onboarded from the AT W0-L4 ledger + the G-4/5/6 AX-promised rows. The register is the machine MIRROR
of that ledger (the register-completeness clause cross-checks every manifest bookId). This chain is
HEALTHY (machine-locked, `uncovered:[]`). BC inherits it as-is; the only BC action is to DECIDE the
rows a BC wave genuinely lands (deck-subpath via the dock/cross-repo rebuild, styles-critical-split via
perf) and HOLD-with-rationale the rest.

---

## §9 — SYNTHESIS — the deferral classes mapped to BC bands

1. **The terminal-reflect deferral (THE ROOT).** ~48 BB visual waves deferred their binding π +
   gestalt verdict to W-REFLECT3, which never ran. → **BC Band 0** (per-wave gestalt-first, the
   ride-W-REFLECT3 pattern forbidden). The dock+shell sit at REVOKED-FAIL never re-flipped.
2. **The never-run close (Batch 5 + Batch 7).** W-ADOPT-RECONCILE, W-SLIDES-DRIVE, W-LEAF-MODERNIZE,
   W-CONSUMER-MODERNIZE, W-DECK, W-REFLECT3, W-CLOSE all SPEC. → **BC Band 10** (cross-repo + cut).
3. **The perf chronic (AY→BB→BC).** W-LIGHTHOUSE + W-CSS-CRITICAL SPEC; W-PERF-PRODUCER WIP π-pending.
   → **BC Band 8/perf** (the "renders SLOW" defect; BUILD the gates).
4. **The disposition register (28 booked).** Healthy honest-holds + 2 OPEN BUILD destinations
   (deck-subpath, styles-critical-split) the BB build never landed. → BC discharges those 2, HOLDs
   the long-tail.
5. **The glass/dock technical successors (teardrop, chroma rim, 20px, FLIP-engine fold, scale-recon).**
   → **BC Band 1/2** (the iOS-27 glass + dock rebuild absorbs/re-decides them).
6. **The viz successors (W-FOURIER-GPU, W-AURORA-WGPU-MEDIUMS, the no-migrate parity rows).** DIRECTLY
   contradict the BC "WebGPU EVERYWHERE / no canvas / fourier→ONE" mandate. → **BC Band 4** must BUILD
   (not defer) the migrations and kill the duplicates.
7. **The cross-repo by-name CONSUMEs (value.js oklchSpectrum, KF-OSCILLATOR, BA-VJS-5 satellite-color).**
   → **BC Band 10** (HOLD-with-rationale; consume-and-delete on the sibling ship).

**The binding meta-lesson for BC:** the disease was not under-specification — BB authored 71 lucid
wave specs with gates. The disease was **deferring all visual verification to a single terminal wave
(W-REFLECT3) that never ran**, so every "complete (born-RED→GREEN)" wave was source-true /
paint-unverified. BC's Band 0 (gestalt-first per wave, paint-not-source gates) is the structural
correction — and this DEFERRAL-LEDGER is the witness that every prior-tranche deferral is now folded
and DECIDED, not silently re-stamped a seventh time.