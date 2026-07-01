# DEFERRAL-LEDGER — the machine-foldable deferral disposition table

**Deliverable 2 of 3, RESPEC-GESTALT audit (Lane DEV-D).** Every chronically-deferred + recently-
deferred item, consolidated from A7 + GF6/GF7/GF8 + the C2/C4 finds, each with a DISPOSITION and a
machine lock. Carrier waves use POST-RESTRUCTURE ids coordinated with SYNTHESIS-PASS1 §3 families
(F1–F8). This is the table the FOLD pass consumes. Disk-verified 2026-07-01, HEAD `306c3059`.

**Legend — DISPOSITION:** `BUILD` = build in BG/BH with the named carrier · `RETIRE` = terminal
RETIRE-with-rationale (`FOLD-LEDGER.json` flip in place, no-delete fence; a fresh ≥2-consumer trigger
re-enters the idea) · `DELETE` = clean-break code delete at the 5.0.0 major + one MIGRATION row ·
`KEEP-BOOKED` = honest external-trigger hold (trigger objective + un-MET) · `DECIDE` = run the
measurement ONCE, land-or-retire on the number.

**Fold notes (binding, SYNTHESIS §2/§3):** ruling #2 → the dead cluster is DELETE at the major (one
cut, one owner) — NOT "demote," NOT "wire-or-delete" (the exported-export middle predates the two disk
facts that the `useHaptic` evidence doc LIES and `JUBILANCE-DECIDE`'s "KEEP useCelebrationBurst (2
consumers)" is FALSE on disk = 0). Ruling #10 → RETIRE the ~6 speculative registers in place;
`DEEP-GLASS-DECIDE` runs the 20px number ONCE; the five no-carrier BD registers get real carriers.

---

## A. The dead-engine / dead-CSS DELETE cluster (SYNTHESIS ruling #2 — one clean-break cut at 5.0.0)

Each is a real orphan on disk with 0 live consumers; the major is the free break point; exported-but-
dead is a gestalt lie (the no-legacy law applies). Owned ONCE by the WS7 dead-cut wave (post-
restructure: **`W-DEAD-CUT`**, the collapse of `BG.W-SPIKE-DELETE`/`W-DEAD-COMPOSABLE-CUT`/
`W-JUBILANCE-DECIDE` per C2-FC1/FC4). Family **F5** (Motion) for the composables, **F8** for the cut.

| item | LOC (disk) | first deferred | ridden | disk-verified state | DISPOSITION | carrier wave | machine lock |
|---|---|---|---|---|---|---|---|
| `useLiquidMorph.ts` | 462 | BE | BE→BF→BG (3) | present, 0 live consumers | **DELETE** | `W-DEAD-CUT` (F8; was `BG.W-SPIKE-DELETE` 12.1) | `proof:liquid-morph` DEFINITION-ABSENT |
| `liquid-morph.css` | 850 | BE | 3 | present at `src/styles/glass/liquid-morph.css` (NOT `styles/motion/` — A7:22 path stale) | **DELETE** | `W-DEAD-CUT` | same gate, CSS arm |
| `useVizChoreography.ts` | 425 | BE | 3 | present, 0 live consumers | **DELETE** | `W-DEAD-CUT` (was `BG.W-VIZ-REVEAL-BLOOM` 6.4 gate) | gate = `useVizChoreography.ts DEFINITION-ABSENT` |
| `useDockContextSilhouette.ts` | 551 | BE | 3 | present, ONLY a COMMENT ref at `AppSwitcher.vue:3` (no import) | **DELETE** | `W-DEAD-CUT` (was `BG.W-DOCK-CUT` 4.3) | `proof:dock-cut` symbol-absent |
| `useCelebrationBurst.ts` | 261 | BE | 3 | present, **0 real src call-sites** (only `motion/index.ts` barrel + `jubilance.css:10` comment + `api/types-extra.ts` re-export) — the ledger "KEEP (2 consumers)" is FALSE on disk | **DELETE** | `W-DEAD-CUT` | `proof:dead-composable-cut` symbol-absent + MIGRATION row |
| `useHaptic.ts` | 138 | BE (absent then; landed via BG forensic work, mtime 06-25) | 3 | present, `grep -rln useHaptic src` = 0; **its consumer-evidence doc asserts couplings that never existed (a LIE)** | **DELETE** | `W-DEAD-CUT` | symbol-absent + DELETE the lying evidence doc |
| `useBloomUp.ts` | 449 | BE | 3 | present, 0 `.vue` consumers (was wired into the retired route-freeze hack) | **DELETE** (verify no live consumer at cut) | `W-DEAD-CUT` | symbol-absent |
| `useScrollPin.ts` / `useScrollScene.ts` | — | BD/BE | 2+ | both present; fold target per SYNTHESIS ruling #2 | **DELETE** (fold into the ONE scroll register) | `W-DEAD-CUT` / `W-MOTION-SPINE` (F5) | scroll-register single-source assert |

**Note (C2-FC1):** the current cursor TRIPLE-lists `useLiquidMorph`/`useVizChoreography`/
`useDockContextSilhouette` across three waves + a false-consumer `useCelebrationBurst` KEEP + a lying
`useHaptic` evidence doc = the 10.5-triple-double-claim. The fold collapses all to ONE `W-DEAD-CUT`
owning the whole clean break, one MIGRATION row each. Do NOT re-badge any of these as "demote from
export" (the export-middle is superseded by ruling #2).

---

## B. The ~6 speculative "wants-it-someday" registers → RETIRE in place (A7 F2 / GF7 / GA-6)

Each defers a NET-NEW SPECULATIVE VISUAL REGISTER on the trigger "a consumer wants it someday" — a
hope, not a trigger — with 0 consumers after ≥2 tranches. This is the J-inv-10 ≥2-consumer bar failing
INWARD (the library holds dead spec-debt). Honest verb = RETIRE (the `BB.W-NDA-DECIDE` terminal-RETIRE
discipline). Owned ONCE by **`W-SPECULATIVE-RETIRE`** (Band-0 / ledger-flip only, ZERO pixels, ZERO
mechanism). Family: F8 (ledger); the ideas live on in the BE/BF wave-spec for a fresh trigger.

| id (FOLD-LEDGER line) | register | trigger text (the hope) | first | ridden | DISPOSITION | machine lock |
|---|---|---|---|---|---|---|
| `BE/BF.W-AUR-SATIN` (:103/:143) | aurora satin medium | "a breadth consumer wants the satin register" | BE | BE→BF→BG (2) | **RETIRE** | `FOLD-LEDGER.json` `DEFER→RETIRE` flip + `rationale` + `successor: fresh ≥2-consumer trigger` |
| `BE/BF.W-AUR-PRISM` (:101/:141) | aurora prism medium | "…wants the prism register" | BE | 2 | **RETIRE** | same |
| `BE/BF.W-AUR-REACTIVE` (:102/:142) | album-hue re-seed + `uShimmer` | "an album-hue re-seed consumer + `uShimmer` lands" | BE | 2 | **RETIRE** | same |
| `BE/BF.W-TAB-IOS-CAPSULE` (:133/:170) | DockTabBar capsule arm | "a DockTabBar consumer wants the capsule arm" | BE | 2 | **RETIRE** | same |
| `BE.W-ALIVE-IDLE` (:97) | breathing-pill idle | "a real surface wants the breathing-pill idle" | BE | 2 | **RETIRE** | same |
| `BE.W-ANTICIPATE-FOLLOW` (:99) | anticipation pre-dip | "a real surface need lands" | BE | 2 | **RETIRE** | same |
| `BE.W-CONCENTRIC-RADIUS` (:108) | concentric-radius shared register | "a 2-consumer need lands" | BE | 2 | **RETIRE** (the SPECULATIVE shared register only) | same — **but KEEP the per-surface `containerConcentric` inline idiom** (SegmentedTabs track-radius); the aristotelian gate (item E5) enforces concentric radii per-surface, so the shared register is a premature abstraction over a single call site |

All 7 flip via ONE `proof:bg-deferred-ledger` re-count (the row-disposition assertion + the RETIRE-
rationale-non-empty bite). No new gate.

---

## C. The deep-glass 20px chronic → DECIDE with a number (A7 F3 / GF8 / GA-7)

| item | first | ridden | disk state | DISPOSITION | carrier | machine lock |
|---|---|---|---|---|---|---|
| deep-glass full-20px (`glass-deep.css:5,21-42`) | BB | **BB→BC→BD→BE→BF→BG (5)** | ships 16px / `saturate 1.5`; Apple ceiling `blur(20px)/saturate(1.8)` "BOOKED" since BB, gated on a `profile:budget` clearance that has **never been RUN at 20px** | **DECIDE** — run `profile:budget` at 20px/1.8 ONCE; clears → land the two-token bump (`--glass-blur-deep` 16→20, `--glass-deep-saturate` 1.5→1.8, reaching the design-language ceiling); does NOT clear → convert to **RETIRE-with-recorded-number** (16px IS the ceiling for this substrate, stated as identity not debt) | **`W-DEEP-GLASS-DECIDE`** (F2 Glass; micro-wave) | the measured `profile:budget` number recorded in the ledger; `--glass-saturate-deep-ceiling` already bakes 1.8 as the ceiling token — the wave discharges BB.W-DEEP-GLASS's own booking |

Ends the 5-tranche ride with ONE gate invocation instead of a sixth re-book. Either way the chronic
closes. This is a one-token change gated 5 tranches on a number nobody has run.

---

## D. The five no-carrier BD greenfield registers → get real carriers (A3 / GF6 / GA-5)

The user EXPLICITLY asked to fold chronic deferrals; these fell through with a ledger row but ZERO
buildable wave. Family: viz sub-band (WS5, currently absent from the SYNTHESIS §3 family table — see
Open Question 1 in the structured summary; DEV-A/B must home it) + demo family F7.

| item | first | ridden | de-risk status (disk-verified) | DISPOSITION | carrier wave | machine lock |
|---|---|---|---|---|---|---|
| **metallic-aurora ×2** (`DIRECTIVE-LEDGER:161`, WS5-04) | BD | BD→BG (1, but the directive rode BC too) | fully de-risked: `MEDIUM_ID` ceiling at kuwahara==7 (metal = uMedium 8/9); `structureTensorField` computes Gx,Gy and DISCARDS them (GLSL+WGSL, metal re-plumbs, zero new taps); `uLightDir` WebGL2-only | **BUILD** — metal as a MEDIUM (uMedium 8/9, mutually-exclusive ladder reading live `MEDIUM_ID`), NOT an orthogonal finish (the greenfield killed the medium×finish "configurator-lie") | **`W-AUR-METAL-FINISH`** (WS5 viz) | `proof:aur-metal` medium-ladder + GL-shader-fence (aurora.frag byte-untouched on the smooth default) |
| **blurred-image-bg** (`DIRECTIVE-LEDGER:73`, WS1-09, "no carrier" verbatim) | BD | 1 | net-new: ZERO texture/sampler in src today | **BUILD** — SHARES the ONE texture-upload primitive with `BD.W-DOT-IMAGE` (whichever lands first builds it) | **`W-AUR-IMAGE-SOURCE`** (WS5 viz) | `proof:aur-image` single-texture-upload-primitive shared with dot-image |
| **dot-flow ADVECTION `flow` register** (`BD.W-DOTFLOW-AURORA-CURRENT`) | BD | 1 | the part that "surpassed the reference": GPGPU state-texture + two-FBO trail + warm-fire ramp (hue∈[20,90], teal-navy-purge fence held) + cursor-vortex | **BUILD** — AMEND the existing `BG.W-DOTFLOW-REBUILD` (currently halftone-field ONLY) to carry the advection register | **`W-DOTFLOW-REBUILD`** (AMEND, WS5 viz) | `proof:dotflow` advection + trail-FBO + warm-fire ramp; without it dotflow is un-broken not surpassing |
| **story-page SUB-TYPE taxonomy** (`DemoStage/Specimen/Interaction/Matrix/Composition`) | BD | 1 | flattened OUT of `W-STORY-PAGE-API` (grep `DemoStage\|DemoSpecimen\|subtype` = 0 hits); the conformity-with-variation mechanism gone | **BUILD** — AMEND `W-STORY-PAGE-API` to restore the 5 sub-types as thin compositions over the chassis (each guaranteeing conformity invariants while content varies; refined from the real 156-page Pass-E classification) | **`W-STORY-PAGE-API`** (AMEND, F7 Demo) | `proof:story-page` sub-type-vocabulary assert; the direct gestalt-cohesion cure (N spec-sheets → one product with natural variation) |
| **aristotelian-proportion edict** (one of 8 core laws, ZERO wave/gate) | BD | 1 | √φ TYPE ladder exists; the LAW's other clauses (φ radii/spacing/padding/card-width; concentric radii; "nothing arbitrary") have no wave | **BUILD** — a proportion census + `proof:aristotelian` gate (every radius/spacing/padding is a √φ step off a named anchor; concentric radii verified; a raw off-ladder `rem` reds). Also enforced as ACCEPTANCE LANGUAGE in the gestalt review (GA-9), NOT N mechanical gates | **`W-ARISTOTELIAN-PROPORTION`** (F7 Demo; enforced twice — machine + review) | `proof:aristotelian` off-ladder-rem-reds bite; the `--card-pad` √φ ladder is the model universalized |

**Reconcile note (A3-FC7):** the `DIRECTIVE-LEDGER` "every distinct directive maps cleanly / no new
workstream needed" roll-up must be edited to distinguish "tracked in the ledger" from "has a buildable
wave" — these five mapped to a ledger ROW but NOT a cursor WAVE (the narrated-done-but-unexecuted
pattern that produced the "disastrous" verdict).

---

## E. The uncarried ROOTS (new-wave carriers — GF1/GF2/GF3, the audit's three load-bearing waves)

Not "deferred" in the ledger sense — they were NEVER carried (silent-drop-by-omission). Listed here so
the fold set is complete.

| root | first surfaced | disk state | DISPOSITION | carrier wave | machine lock |
|---|---|---|---|---|---|
| composited-whole grayness (GF1) — a warm token over an achromatic page still reads gray | BC (blind spot); BD re-diagnosed by hand | `BD/greenfield/buttons/GOLDEN.md:9-20`: BC default Button rest = oklab chroma 0.0138 NEAR-GRAY | **BUILD** — capture a REAL route (not a synthetic specimen) at rest, no injected ancestor, assert the dominant hue family of the composited region is warm (reuse `paint-arm.mjs`, change WHAT it samples) | **`W-COMPOSITED-GESTALT-GATE`** (F8) | the composited-region warm-hue assert; pairs with `W-FABLE-DESIGN-ARM` (machine + human halves) |
| AX.W54 glass-first over-reach (GF2) — glass-everywhere-without-a-field is invisible-by-construction | BD `TRANCHE-GESTALT-META §3.3` | grep: NO BG wave carries the over-reach or the defined-edge-default | **BUILD** — split glass into a *transmissive* tier (current maximal, for surfaces with a colorful backdrop) + a *defined* tier (stronger rim + floor-fill + W-BUTTON-GLASS lit register) DEFAULT for controls, on the ONE `--glass-level`/edge machinery (must NOT fork the cascade) | **`W-GLASS-DEFAULT-DEFINITION`** (F2) | computed-contrast of a default `<Button>`/`.input-pill` over a FLAT page clears a legibility floor with the field OFF |
| Fable/DesignSync mandate (GF3, 2026-07-01, freshest binding directive) | 07-01 memory-edict | grep `Fable\|DesignSync` across all 4 folded plans = 0/0/0/0 | **BUILD** — schema edit: every VISUAL wave declares `fableArm` + `designSyncSurface`; a WS7 process wave stands up the `/design-sync` skill + makes "DesignSync returned a PASS gestalt verdict from Fable, not the building agent" a close precondition | **`W-FABLE-DESIGN-ARM`** (F8) | close-precondition assert per visual wave; see PROMPT-COVERAGE.md row 1 |
| god-module structural (GF5) — the ratchet normalizes 711L regrowth as fresh baselines | BB (RED at HEAD today) | `proof:no-god-module` = FAIL (ladder.css 527L, shell.css 510L, 16 grandfathered incl. GlassDock.vue 711L) | **BUILD** — decompose the dock ONCE (morph+fission+rail+hold-state+a11y are too many jobs) + harden the ratchet CONTRACT (a new grandfathered baseline requires a companion carve-successor wave-id, OR cap grandfathered-count and FAIL once exceeded) | **`W-GOD-MODULE-STRUCTURAL`** (F6) | ratchet-contract change forces drain over infinite re-baseline; shader-exemption preserved |

---

## F. The honest external-trigger holds → KEEP-BOOKED (A7, correct as-is; do NOT force into BG)

These defer on an OBJECTIVE, external trigger (foreign-tree republish, hardware, un-Baseline CSS).
Correct posture; listed for completeness so none is mistakenly promoted OR silently dropped.

| item | trigger (objective) | ridden | DISPOSITION | note |
|---|---|---|---|---|
| kf-snap `D27` / Oscillator / value.js `/color` / keyframes-prune-migration-dag | foreign-tree republish (the fence) | BB/BC (≥3) | **KEEP-BOOKED** | by-name coordination only. **VERIFY:** `BH.B2.1-swap` bumps kf `^5.1.0` (lands `DragOptions.snap`) → `D27` must flip **RESOLVED** at that bump, not ride into 5.0.1 |
| Metal/Safari real-box perf ×5 (`D8`/`D24`/`D25`/GOO-SPLIT-PERF/VIZ-PARITY-METAL) | a real Metal box (no CI access) | BD (3) | **KEEP-BOOKED** | the Safari CORRECTNESS gate `W-SAFARI-PARITY-GATE` IS a BUILD wave; only the p50 NUMBER defers. Honest |
| Baseline CSS features ×6 (`text-box-trim`, `interpolate-size`/`calc-size()`, `scope-state`, `cross-doc-vt`, `interestfor`, `directional-vt`) | the feature reaches Baseline | AX (≥3) | **KEEP-BOOKED** — but **RE-CHECK 2026-07 Baseline** | `interpolate-size`/`calc-size()` + `text-box-trim` reached Baseline in 2025 → the `W-DISPOSITION-RESTAMP` (DONE) n:2 re-eval must have re-checked live Baseline; graduate any now-Baseline (A7 FC5 verify-obligation) |
| `useGlassBackdropLuminance` 2nd binary consumer | a 2nd real binary consumer lands | BB (≥3) | **KEEP-BOOKED** | genuine ≥2-consumer hold; the `docs/consumer-evidence/use-glass-backdrop-luminance.md` names the trigger |
| goo `uSatColor` per-satellite derived shade | the GL color-seam fence widens | AY/BC (≥3) | **KEEP-BOOKED** | booked 4.x; fence deliberately not widened |
| aurora medium lazy-chunk split | a shader-content-edit fence-widening successor | BB (≥3) | **KEEP-BOOKED** | one monolithic `FRAGMENT_SRC` with runtime dispatch; a module split needs a shader edit the GL fence forbids |
| `glass-dialog-native-pilot` / `inline-edit-primitive` / `labeled-slider-readout` | a fresh honest ≥2-consumer trigger | AX+ | **KEEP-BOOKED** | correct ≥2-consumer holds; NOT the speculative class in §B |

---

## G. Detector-hardening (the no-silent-drop MACHINE has 2 blind spots — A7 F1/F4)

Not deferred ITEMS; latent holes in the census machine. Fold into whatever pass next touches the gate
(do NOT spawn a wave — that IS the granularity disease).

| gap | disk fact | DISPOSITION | fold |
|---|---|---|---|
| in-src detector under-counts bare-word `BOOKED` | `proof-bg-deferred-ledger.mjs:132-139` matches only `BOOKED:` (colon-label); a bare grep finds 8 markers, the detector sees 2; the 6 missed are bare-word `BOOKED` (Button.vue:94, constellation×2, dot-flow — none a live drop TODAY, but a future `// BOOKED a feature` rides invisible) | **BUILD (harden, no new wave)** — FORBID bare-word `BOOKED` in `src` (every booking uses the `BOOKED:` label the census reads — complete-by-construction) | GA-12 hygiene bundle / `W-DEAD-CUT` gate arm |
| detector is `.ts`/`.vue`-only; `.css` `BOOKED:` markers invisible | `proof-bg-deferred-ledger.mjs:122`; deep-glass 20px + chromatic-aberration lens-rim captured only by a luckily-matching wave-spec | **BUILD (harden)** — add the `.css` arm | same |
| `FOLD-LEDGER.md:173` "in-src 2" claim is disk-loose | says "(2 — .ts/.vue only)" while 8 markers exist | **plan-doc-edit** — reconcile to "(2 `BOOKED:`-label / `CONSUME()`; bare-word excluded by convention)" | GA-12 |

---

## H. Fold-set completeness attestation

Every chronically/recently-deferred item is accounted for: the built `FOLD-LEDGER.json` (135 DECIDED
rows — 12 RETIRE / 12 MET / 74 COORDINATED / 34 DEFER-with-trigger / 3 SUPERSEDED, all 30 unique
COORDINATED dest-waves verified in-cursor, 0 phantom, `proof:be-bf-ledger` GREEN) is the source of
truth; this ledger ADDS the audit's disposition DELTAS: the DELETE cluster (§A, ruling #2), the 7
RETIREs (§B), the deep-glass DECIDE (§C), the 5 no-carrier BUILDs (§D), the 4 uncarried ROOTS (§E),
the honest holds confirmed (§F), the 2 detector blind spots (§G). D6/D11 (the prior census's CRITICAL
rows) are GENUINELY CLOSED — do NOT re-open. `useLiquidMorph`/`liquidMorph.css`/`useDockContext-
Silhouette`/`useCelebrationBurst` remain on disk (~2573 dead LOC) ONLY because `W-DEAD-CUT` is PENDING —
expected mid-tranche, not a finding.
</content>
