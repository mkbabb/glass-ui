# BL—audit registry, rounds 1 and 2

Seat: REGISTRY. Model `claude-opus-5-5` (asserted from system identity). Read at `1c1f1f67`; every commit since `d29be90e` is docs-only, `src` is byte-identical to the published 10.0.1 (`git diff --stat v10.0.1..HEAD -- src` is empty; last `src` commit `3f9ea884`). Date 2026-09-23.

Inputs: the 19 lens reports under `round-1/`, each read in full; `INBOUND.md` and `PROMPT-RECAP-SEED.md` at HEAD. Three things landed while round 1 ran and are folded here: O-57 (fallthrough typing) and O-60 (the keyframes.js frame-by-frame animation audit, 33 glass rows) in `bf517b61`, and the owner's N-10 ("most of the animations are broken ... audit every animation and frame by frame").

Round 2 folded at `6433284a`, 2026-09-23. Inputs: the eight seat reports under `round-2/`, each read in full, and R2-05's evidence under `captures/R2-05/` (its report was not written to disk; §6.8). Every commit since `85730eef` is docs-only, and `git diff --stat v10.0.1..HEAD -- src demo` is empty, so round 2 measured the published 10.0.1 bytes. Round 2 is recorded in each family's **Round 2** bullets, in §2 (refutations and re-checks), in §3 (the convergence map, recomputed) and in §6.

## Counts

Cumulative, after round 2:

- Findings: **498** (377 + 121). Accepted: **494**. Rejected whole: **4** (round 2 rejected none whole; its 14 refuted claims are in §2). Families: **75** (72 + F-73, F-74, F-75).
- Per severity, all findings: BLOCKER 8 · HIGH 129 · MED 244 · LOW 117. Accepted: BLOCKER 8 · HIGH 129 · MED 242 · LOW 115.
- Families by max severity: BLOCKER 3 · HIGH 42 · MED 30 · LOW 0 (F-30 LOW → MED, F-39 MED → HIGH, F-65 HIGH → MED, plus the three new families).
- Convergence: 53 families hit by 3 or more lenses, 19 by 2, 3 by 1 (§3).
- Round 2's own counts and per-seat table: §6.2.

### Round 1

- Findings: **377**. Accepted: **373**. Rejects: **4**. Families: **72**.
- Per severity, all findings: BLOCKER 4 · HIGH 84 · MED 188 · LOW 101 (the LOW count includes 2 LOW-MED and 2 annotated LOW rows).
- Per severity, accepted: BLOCKER 4 · HIGH 84 · MED 186 · LOW 99.
- Families by max severity: BLOCKER 3 · HIGH 41 · MED 27 · LOW 1.
- Convergence: 31 families hit by 3 or more lenses, 23 by 2, 18 by 1.
- Re-checks: 34 probes at `1c1f1f67`, covering all 4 BLOCKERs and the 20 highest-severity accepted findings, plus every disputed pair.

| lens | seat | findings | BLOCKER | HIGH | MED | LOW | rejected |
|---|---|---|---|---|---|---|---|
| L01a | plan vs landed (1) | 35 | 0 | 3 | 18 | 14 | 0 |
| L01b | plan vs landed (2) | 50 | 0 | 9 | 25 | 16 | 0 |
| L02 | gate soundness | 15 | 1 | 5 | 7 | 2 | 0 |
| L03a | gestalt visual (1) | 15 | 0 | 4 | 7 | 4 | 0 |
| L03b | gestalt visual (2) | 15 | 1 | 5 | 6 | 3 | 0 |
| L04 | chronic ledgers | 28 | 0 | 5 | 15 | 8 | 2 |
| L05a | prompt recap (1) | 22 | 0 | 4 | 11 | 7 | 0 |
| L05b | prompt recap (2) | 21 | 0 | 5 | 12 | 4 | 0 |
| L06 | consumer truth | 14 | 0 | 3 | 6 | 5 | 0 |
| L07 | performance | 13 | 0 | 3 | 5 | 5 | 0 |
| L08 | accessibility | 26 | 0 | 6 | 11 | 9 | 1 |
| L09 | doc drift | 19 | 0 | 7 | 11 | 1 | 0 |
| L10 | dead code and duplication | 22 | 0 | 5 | 11 | 6 | 0 |
| L11 | cross-repo mail | 12 | 0 | 4 | 7 | 1 | 0 |
| L12 | structure (1) | 12 | 0 | 3 | 6 | 3 | 0 |
| L13 | structure (2) | 16 | 0 | 3 | 9 | 4 | 0 |
| L14 | structure: periphery | 16 | 0 | 4 | 9 | 3 | 0 |
| L15a | value.js X | 12 | 1 | 3 | 6 | 2 | 1 |
| L15b | chicago + density | 14 | 1 | 3 | 6 | 4 | 0 |
| **all** | | **377** | **4** | **84** | **188** | **101** | **4** |

How to read: each accepted finding sits in exactly one family. A script checked this: 373 assigned, 0 duplicates, 0 unassigned; round 2's 121 were checked the same way (121 assigned, 0 duplicates, 494 accepted in all). Families are grouped by the defect mechanism and ordered by band, not by severity. "Lenses" counts distinct reports. "(re-checked)" marks evidence I re-opened at `1c1f1f67` (round 1) or `6433284a` (round 2). A disposition is a draft for the ledger: BUILD (its own wave, or a named wave it shares), FOLD (into the named row or wave), or RETIRE (with the rationale stated). Inbound rows name the INBOUND or recap ids the family answers.

## 1. Families

### Index

`n` and `lenses` are cumulative over rounds 1 and 2. Each family lists its round-2 members in a **Round 2** bullet and any mechanism or wave change in a **Round 2 correction** bullet. Rows are ordered by band, so the three round-2 families sit in their bands (F-75 in E, F-73 and F-74 in F).

| id | band | family | n | lenses | max | disposition |
|---|---|---|---|---|---|---|
| F-01 | A | The gate register counts seat names, not executables that can go red | 16 | 7 | BLOCKER | BUILD |
| F-02 | A | Detectors narrower than the claim they carry | 12 | 5 | HIGH | FOLD into W-REGISTER-COLLAPSE |
| F-03 | A | Gate fixtures pinned to a live defect | 2 | 2 | MED | FOLD into W-REGISTER-COLLAPSE |
| F-04 | A | The visual suite never entered CI, and the discharge was redefined | 6 | 5 | HIGH | BUILD |
| F-05 | A | Visual harness rot | 6 | 3 | HIGH | BUILD |
| F-06 | A | Paint evidence routed to the #10 π sink and never captured | 23 | 2 | HIGH | RETIRE the sink as a routing target |
| F-07 | A | Safari cells deferred behind an environment excuse | 8 | 5 | HIGH | BUILD |
| F-08 | A | The WebGPU primary is never paint-gated | 4 | 4 | HIGH | BUILD |
| F-09 | A | Latches and disclosures standing in for cures | 7 | 5 | HIGH | RETIRE the latch form |
| F-10 | A | Budget ratchets as literal pins, unwired | 5 | 4 | MED | BUILD |
| F-11 | B | Routing-chain drops | 10 | 4 | HIGH | FOLD into BL LEDGER formation |
| F-12 | B | Close records say what the tree does not | 20 | 9 | HIGH | FOLD into BL LEDGER formation and the close checklist |
| F-13 | B | Rulings owed above an implement seat | 13 | 5 | MED | BUILD |
| F-14 | B | Owner asks laundered through governance waves | 11 | 3 | HIGH | BUILD |
| F-15 | B | Owner asks reinterpreted or in conflict, unreconciled | 5 | 3 | MED | FOLD into the W-DECIDE band as owner-glance rows |
| F-16 | C | The dock extent morph is discontinuous; fission is split-brain | 13 | 7 | HIGH | BUILD |
| F-17 | C | Compact-on-scroll dropped; the progress rim is unseated | 2 | 2 | HIGH | BUILD |
| F-18 | C | Dock plate geometry and state residue | 7 | 6 | HIGH | BUILD |
| F-19 | C | Dock keyboard and ARIA ownership | 6 | 2 | HIGH | BUILD |
| F-20 | C | Demo shell chrome at the phone cell | 4 | 3 | MED | BUILD |
| F-21 | D | Component declarations lose the cascade to the library's own shared rules | 14 | 9 | BLOCKER | BUILD |
| F-22 | D | Overlay stacking and edge placement: the content seam carries neither | 3 | 2 | MED | BUILD |
| F-23 | D | Ink calibrated to the token ground, not the painted composite | 9 | 5 | HIGH | BUILD |
| F-24 | D | Dark and reduced-transparency arms missing on decorations, fields, state and emphasis | 4 | 3 | HIGH | BUILD |
| F-25 | D | Preview stills feed OKLCH-scale hues to hsl() | 2 | 2 | MED | BUILD |
| F-26 | D | A composite custom property resolved at :root | 2 | 2 | HIGH | BUILD |
| F-27 | D | `cn()` never lets a shorthand subsume its longhands | 2 | 2 | HIGH | BUILD |
| F-28 | D | The chip defect row never started | 2 | 2 | MED | BUILD |
| F-29 | D | Density: pads transpose under the width query, corners do not | 15 | 5 | HIGH | BUILD |
| F-30 | D | Radius role: the off-role 12 px rung (a); multi-line holders on the stadium (b) | 3 | 3 | MED | BUILD (two rows: F-30a, F-30b) |
| F-31 | D | Frost and the field well | 3 | 2 | HIGH | BUILD |
| F-32 | D | Sheet detents: the dock covers the live-behind sheet's action | 3 | 3 | MED | BUILD |
| F-33 | D | Specimens lay out by viewport, not by container | 8 | 3 | HIGH | BUILD |
| F-34 | D | Demo remainder rows unbuilt | 4 | 3 | MED | BUILD |
| F-35 | D | Brand face delivery | 2 | 2 | MED | BUILD |
| F-36 | D | The pager worm reads a rem as px | 3 | 3 | HIGH | BUILD |
| F-37 | E | Modal primitives mounted inline | 4 | 2 | HIGH | BUILD |
| F-38 | E | Focus handoff at overlay close | 2 | 2 | HIGH | BUILD |
| F-39 | E | Two focus-ring registers; forced colors | 4 | 3 | HIGH | BUILD |
| F-40 | E | One widget, two focus models | 3 | 3 | MED | BUILD |
| F-41 | E | Toast placement and double announcement | 3 | 3 | MED | BUILD |
| F-42 | E | Small naming and keyboard seams | 8 | 3 | MED | BUILD |
| F-43 | E | Browser Back has no transition; the router seam is unowned | 4 | 4 | MED | BUILD |
| F-75 | E | The reduced-transparency arm lifts the field it should recede | 1 | 1 | HIGH | BUILD |
| F-44 | F | Motion time off the one authority: integrators, dt policies, emitted tails, the canvas clock | 5 | 3 | HIGH | BUILD |
| F-45 | F | Non-composited motion at idle | 4 | 3 | HIGH | BUILD |
| F-46 | F | Scroll chrome follows the velocity path, not position | 4 | 4 | MED | BUILD |
| F-73 | F | The theme flip is not atomic | 1 | 1 | MED | BUILD (small) |
| F-74 | F | Spring overshoot detaches an edge-anchored sheet | 1 | 1 | MED | BUILD |
| F-47 | G | The WebGPU primary does less than the fallback arm | 7 | 7 | HIGH | BUILD |
| F-48 | G | Greenfields stopped at W0 | 6 | 5 | HIGH | BUILD |
| F-49 | G | Device-loss subscription per instance on the shared device | 3 | 3 | HIGH | BUILD |
| F-50 | G | Idle loops and the luma sampler's blocking readback | 7 | 4 | HIGH | BUILD |
| F-51 | G | Synchronous costs on the mount path | 6 | 3 | MED | BUILD |
| F-52 | G | Payload does not shake | 4 | 3 | MED | BUILD |
| F-53 | G | Perf and boot chronics never started | 6 | 3 | MED | BUILD (decide rows; the dev leg retires) |
| F-54 | G | iOS 27 hallmarks unbuilt | 2 | 2 | MED | FOLD into the design loop's dock and motion portfolio |
| F-55 | H | The colocation chronic: settlement decided, never landed | 7 | 6 | HIGH | BUILD |
| F-56 | H | Component-owned code in global zones | 8 | 3 | HIGH | FOLD into W-COLOCATION |
| F-57 | H | Nesting by file kind; no placement grammar | 3 | 2 | MED | FOLD into W-COLOCATION |
| F-58 | H | One symbol, two doors | 7 | 3 | HIGH | FOLD into W-COLOCATION |
| F-59 | H | Cycles from contracts homed inside one consumer | 3 | 2 | HIGH | FOLD into W-COLOCATION |
| F-60 | H | Periphery structure | 8 | 2 | MED | BUILD |
| F-61 | H | Repo weight and evidence hygiene | 4 | 3 | MED | BUILD |
| F-62 | I | Meta and provenance re-accreted | 11 | 8 | HIGH | BUILD |
| F-63 | I | Docs not derived from the source of record | 21 | 11 | HIGH | BUILD |
| F-64 | I | Token hygiene | 11 | 4 | MED | BUILD |
| F-65 | I | Twin sources of record | 5 | 3 | MED | BUILD |
| F-66 | J | Published surface with no consumer | 9 | 6 | MED | FOLD into the P-6 overfitting audit |
| F-67 | J | Published claims not asserted on the built artefact | 11 | 4 | HIGH | BUILD |
| F-68 | J | Consumers pinned majors back; cures cannot land | 16 | 8 | BLOCKER | BUILD |
| F-69 | J | A consumer fork carries unupstreamed fixes | 2 | 2 | HIGH | BUILD |
| F-70 | J | Stale bindings no-op silently (E-11): untyped fallthrough, unwitnessed emits, erased declarations | 7 | 6 | HIGH | BUILD |
| F-71 | J | Inbound mail never carried or answered | 15 | 5 | HIGH | BUILD |
| F-72 | J | The value.js boundary rides an unpublished cure | 2 | 2 | MED | FOLD |

### Band A—Gates and evidence

#### F-01—The gate register counts seat names, not executables that can go red

- **Mechanism**: a seat reads bound when a name matches; the absent count is pinned as a literal, so the register is green over 45 unbound seats and turns red when a gate is bound; 24 of the unbound have live executables under other names, 21 have none.
- **Members (14; 1B / 2H / 7M / 4L)**: L02-F01, L02-F02, L02-F12, L02-F14, L01b-65, L05a-08, L09-12, L01a-31, L01a-04, L01a-08, L01a-15, L01a-16, L01a-38, L13-06.
- **Round 2 (+2; 1B / 1M)**:
  - R2-05-F6 (MED, EXTENDS): type rows bite on declarations, never on wiring: `Has<'onUpdate:open'>` reads the `defineEmits` type, which survives deleting the forwarding; six runtime rows are `expectTypeOf`-only and pass under vitest with nothing checked.
  - R2-05-F9 (BLOCKER, CONFIRMS): the pins stand at HEAD (`gate-register.test.ts:172-174`, re-checked); the seat drafted the 50-entry invariant roster that replaces them (§6.8).
- **Lenses (7)**: L01a, L01b, L02, L05a, L09, L13, R2-05. **Max severity**: BLOCKER.
- **Evidence**: `tests/gates/gate-register.test.ts:172-174` pins `seats.bound` 13 and `seats.unbound` 45 (re-checked at `1c1f1f67`); L02-F02 lists the 24 unbound seats with executables under other names.
- **Disposition**: BUILD (the E-8 collapse).
- **Wave shape**: W-REGISTER-COLLAPSE: one roster of 40-60 invariants, each bound to an executable that was seen red once (a recorded bite on the shipped detector); no literal count pins; an unbound seat is RED; component test rows leave the roster, since test rows are not gates.

#### F-02—Detectors narrower than the claim they carry

- **Mechanism**: hygiene and seat detectors scan one spelling, one file or one channel; some self-test bites run a copy of the detector; the seat name promises more than the assertion checks.
- **Members (7; 2H / 3M / 2L)**: L02-F04, L02-F05, L02-F06, L02-F08, L02-F15, L05a-19, L09-19.
- **Round 2 (+5; 2H / 2M / 1L)**:
  - R2-05-F1 (HIGH, EXTENDS): 10 of 10 cascade-level mutations survive the source-text rows standing as SEALED/LANDED evidence (a longhand, a second spelling, a sibling selector, the layer, a registered root value, a typed `@property`, selector scope, the compositing premise); 6 of the 10 are not spelling variants, so F-02's spelling-set cure cannot converge on them (85 probes on disk: 42 bite, 43 survive).
  - R2-05-F2 (HIGH, seat NEW): 356 of 2,031 test rows carry a paint claim and 0 observe paint (200 source-text, 96 model, 60 happy-dom); the in-process Chromium lane (`page.setContent` inside vitest) is used by 2 of 239 files (re-checked on `captures/R2-05/census3-rows.json`). Seat-NEW, folded: a detector that cannot see what its claim names is this family's mechanism; the census is its test-layer root and the reason F-06 routed paint out.
  - R2-05-F3 (MED, EXTENDS): behavioural and model rows run the subject but pin a weaker value than their title (drain-all timers, confounded fixtures, length-only counts, a colour bounded to 0..1).
  - R2-05-F8 (LOW, CONFIRMS): the boot-graph freshness arm compares mtimes, so a byte-exact restore reddens it.
  - R2-06-06 (MED, EXTENDS): BD's `recap.mjs` checks that a carrier file exists and reports 87.3% convergence; 24 of its 29 ADDRESSED rows are open at HEAD (also executable tooling in `docs/`, F-61).
- **Lenses (5)**: L02, L05a, L09, R2-05, R2-06. **Max severity**: HIGH.
- **Evidence**: L02-F05 `G-GLASS-HAS-FROST` checks prefix pairs only; L05a-19 `backdrop-blur-sm` ×5 in the demo passes `token-hygiene` because the Tailwind spelling is never scanned.
- **Disposition**: FOLD into W-REGISTER-COLLAPSE.
- **Wave shape**: every surviving invariant states its defect class as a set of spellings and runs its bite against the shipped detector; the wall-clock and mtime checks go.
- **Round 2 correction**: R2-05-F2 names the cure path: a no-server Chromium `page.setContent` lane already runs inside vitest in CI (2 of 239 files). Rows that claim paint move onto it or drop the claim.

#### F-03—Gate fixtures pinned to a live defect

- **Mechanism**: a gate self-test uses a live violation as its fixture, so curing the violation breaks the gate.
- **Members (2; 1M / 1L)**: L12-12, L13-08.
- **Lenses (2)**: L12, L13. **Max severity**: MED.
- **Evidence**: L13-08: a fixture needs a demo-only helper to stay in `src/`; L12-12: an E-7 violation doubles as the fixture.
- **Disposition**: FOLD into W-REGISTER-COLLAPSE.
- **Wave shape**: synthetic fixtures under `tests/_support/`, so the colocation move lands without a gate edit.

#### F-04—The visual suite never entered CI, and the discharge was redefined

- **Mechanism**: C-13 was reworded from "the visual suite enters CI" to "a seat gets bound" and marked discharged; 1 of 167 specs is wired; the tag's real-paint and Safari asks live in an unenforced comment.
- **Members (6; 4H / 2M)**: L01a-09, L01b-X3, L01b-66, L02-F11, L05b-07, L14-05.
- **Lenses (5)**: L01a, L01b, L02, L05b, L14. **Max severity**: HIGH.
- **Evidence**: L02-F11: 166 of 167 visual specs unwired; L05b-07: the tag blocks on three pixel floors while the owner's paint and Safari asks sit in a comment channel.
- **Disposition**: BUILD.
- **Wave shape**: W-VISUAL-CI: a small wired set in CI (one spec per invariant family, both engines where D-4 applies); capture tools move to `scripts/` or go; the tag gate reads the wired set. Depends on the harness repair.

#### F-05—Visual harness rot

- **Mechanism**: `tests-visual/` sits outside every typecheck; routes moved while 62 skip-on-absence sites turned the loss into skips; WebKit-named specs match only the Chromium project; helpers and colour math are redeclared per file; specs write into closed tranche record dirs.
- **Members (6; 3H / 2M / 1L)**: L14-02, L14-03, L14-04, L14-06, L09-17, L01b-53.
- **Lenses (3)**: L01b, L09, L14. **Max severity**: HIGH.
- **Evidence**: `tests-visual/pi-manifest.ts:64-106` has no `substrate` getter, read at `glass-accent.spec.ts:168,210,238`; `tsconfig.json:24` includes only `src/` and `demo/`; `tests-visual/playwright.config.ts:130-133` the webkit project matches two specs, not `*.webkit.spec.ts` (all re-checked).
- **Disposition**: BUILD (the precondition of W-VISUAL-CI).
- **Wave shape**: typecheck the island; one route manifest where absence fails; `tests-visual/_support/color.ts` as the one OKLab; one scratch root for output.

#### F-06—Paint evidence routed to the #10 π sink and never captured

- **Mechanism**: rows sealed on source-read green with their π cells routed to #10, which never enqueued them (P-2).
- **Members (23; 2H / 6M / 15L)**: L01a-10, L01a-03, L01a-28, L01a-32, L01a-33, L01a-41, L01b-X1, L01b-46, L01b-57, L01b-68, L01b-72, L01b-73, L01b-74, L01b-77, L01b-79, L01b-80, L01b-81, L01b-83, L01b-84, L01b-86, L01b-87, L01b-88, L01b-91.
- **Lenses (2)**: L01a, L01b. **Max severity**: HIGH.
- **Evidence**: L01b-X1: paint for 16 rows routed to #10 and never enqueued; L01a-10: the sink's own dark-α leg is still owed.
- **Disposition**: RETIRE the sink as a routing target (a queue nobody drains turns debt into a label); FOLD each owed cell into its subject family's wave.
- **Wave shape**: none of its own: each BUILD wave ships its paired π and a DELTA artefact on disk (P-2).

#### F-07—Safari cells deferred behind an environment excuse

- **Mechanism**: the Safari/Metal debt rode seven closes on a block basis (~249 guards) that the built dist falsifies; every engine-specific claim since rests on Chromium alone.
- **Members (5; 1H / 2M / 2L)**: L04-F02, L04-F11, L01a-06, L10-22, L08-18.
- **Round 2 (+3; 1H / 2M)**:
  - R2-01-01 (HIGH, EXTENDS): the Safari gate at HEAD is real and owner-held: `AllowRemoteAutomation` false since 2026-09-17 18:51:49, flipped at least three times on record, and nothing reads it before a band is dispatched (re-checked with `plutil`); the ~249-guard basis stays false (8).
  - R2-01-02 (MED, EXTENDS): the owed-cell roster drifted from HEAD: #55's multiply subject is deleted, iOS-only cells need the simulator arm, the #87 P6 literal is engine-versioned (2^25 on Chromium 149, 2^24 on 150), and `scripts/safari-probe.mjs` can bank none of the named cells.
  - R2-01-09 (MED, CONFIRMS): Chromium half of L08-18: 9 scroll regions on 4 routes (4 of them `carousel-strip`) are keyboard-reachable only through Chromium's implicit scroller focus.
- **Lenses (5)**: L01a, L04, L08, L10, R2-01. **Max severity**: HIGH.
- **Evidence**: `grep -rho "@supports[^{]*color-mix" dist | wc -l` gives 8 (re-checked; the block cites ~249); `color-mix-endpoints.test.ts:13-22` "KNOWN-LIVE, NOT GATED ... pending row-6's Safari π".
- **Disposition**: BUILD.
- **Wave shape**: W-SAFARI-BAND: one serialized real-Safari session (safaridriver, one browser seat, P-8) banks every owed cell; the device-Metal arm retires.
- **Round 2 correction**: the environment excuse is now half real: the Safari gate at HEAD is one owner-held checkbox (R2-01-01). W-SAFARI-BAND gains a step 0, an owner row plus a machine check (`plutil` reads true) before dispatch; then R2-01's battery runs (`captures/R2-01/battery/`, 34 cells, one command). The roster is re-derived at HEAD (R2-01-02), and iOS-only cells run on the simulator arm.

#### F-08—The WebGPU primary is never paint-gated

- **Mechanism**: the pixel-floor harness deletes `navigator.gpu`, headless has no adapter, and the aurora floor catches only near-total black; the CI `captureScreenshot` death has no owner.
- **Members (3; 1H / 2M)**: L02-F09, L03b-11, L04-F18.
- **Round 2 (+1; 1H)**:
  - R2-07-10 (HIGH, EXTENDS): the CI `Page.captureScreenshot` death is congenital: 42 of 132 executed `pixel-floor` jobs since 2026-08-03, always the first grab on `/substrates/blob`; SwiftShader gives 0 rAF per 5 s and every capture hangs, Metal captures in 56-116 ms; BK `FINAL.md:149,192` records 6 intermittent deaths (17 are banked for 08-24 → 09-23 alone, re-checked).
- **Lenses (4)**: L02, L03b, L04, R2-07. **Max severity**: HIGH.
- **Evidence**: `tests-visual/substrate-paints-color.spec.ts:373-395`; `scripts/release.sh:45-50`; `.github/workflows/ci.yml:66-68`.
- **Disposition**: BUILD.
- **Wave shape**: one GPU-backed leg (mac runner, or a `--use-angle=metal` local release leg) for aurora, blob and fourier, with a chroma floor rather than a black floor.
- **Round 2 correction**: the capture death moves to the GPU-backed leg with the blob floor, with no retry policy; SwiftShader is disqualified for the blob as it already is for aurora and the ceiling (R2-07-10).

#### F-09—Latches and disclosures standing in for cures

- **Mechanism**: `it.fails` latches pass on any failure, so they cannot see a regression; self-disclosed holes ride three to four releases.
- **Members (6; 2H / 4M)**: L02-F03, L02-F13, L04-F04, L01a-27, L01b-58, L01b-59.
- **Round 2 (+1; 1M)**:
  - R2-05-F7 (MED, CONFIRMS): an `it.fails` latch passes while any member of its defect set remains, so growth inside its scope is invisible; only `gl-excise.test.ts`'s containment arm sees growth, and only outside its four arm files.
- **Lenses (5)**: L01a, L01b, L02, L04, R2-05. **Max severity**: HIGH.
- **Evidence**: L02-F03: all 10 `it.fails` live across 3-4 releases; L02-F13: `spring-authority.test.ts:233-247`, `token-hygiene.test.ts:70-80`.
- **Disposition**: RETIRE the latch form (an `it.fails` passes on a new failure as readily as on the old one); each latch's subject FOLDs to its family as a born-RED test.
- **Wave shape**: none of its own.

#### F-10—Budget ratchets as literal pins, unwired

- **Mechanism**: the bundle ratchet is an exact-equality literal rebound 10-11 times; the payload gate is unwired, red at HEAD, and resolves CSS one level deep; runtime-surface exactness covers 6 of 63 subpaths.
- **Members (4; 4M)**: L02-F07, L02-F10, L07-04, L14-09.
- **Round 2 (+1; 1L)**:
  - R2-07-09 (LOW, CONFIRMS): `.bundle-ratchet` equals the unpacked tarball bytes (2,916,129) and fails on ±1 B; the metric is 36.3% `.d.ts` and 12.0% MIGRATION.md.
- **Lenses (4)**: L02, L07, L14, R2-07. **Max severity**: MED.
- **Evidence**: `scripts/profile-bundle.mjs:66,255-277`; `--enforce` exits 1; `.bundle-ratchet` rebound by +353,283 B in `58f0d243`.
- **Disposition**: BUILD (collapse to one).
- **Wave shape**: W-PAYLOAD-INVARIANT: one CI invariant on gzip of root, aurora, blob, dock and the recursive styles draw; surface exactness over every subpath.

### Band B—Records, routing and owner asks

#### F-11—Routing-chain drops

- **Mechanism**: debt routed to a row that was sealed, landed, dissolved or never existed, so it lands nowhere.
- **Members (10; 2H / 4M / 4L)**: L01a-18, L01a-24, L01a-35, L01b-X2, L01b-64, L01b-71, L01b-82, L01b-85, L04-F21, L05a-03.
- **Lenses (4)**: L01a, L01b, L04, L05a. **Max severity**: HIGH.
- **Evidence**: L05a-03: the compositions prune routed #18 to #21, and #21 landed without it; L01b-82: G-F1 routed to a row that does not exist.
- **Disposition**: FOLD into BL LEDGER formation.
- **Wave shape**: the BL ledger comes from a fresh census at HEAD; a route is valid only to a BL row that exists; each dropped item re-enters as a row in its subject family.

#### F-12—Close records say what the tree does not

- **Mechanism**: class-list re-booking, SEALED and OWNER-GATED words over unlanded substance, close duties that never fired, stale line cites.
- **Members (19; 2H / 5M / 12L)**: L04-F01, L04-F05, L04-F16, L04-F22, L04-F24, L04-F25, L04-F26, L01a-07, L01a-11, L01b-49b, L01b-55, L01b-66b, L01b-70, L01b-90, L05a-09, L05b-17, L06-11, L08-26, L09-14.
- **Round 2 (+1; 1L)**:
  - R2-06-13 (LOW, CONFIRMS): the 09-17 census PARTIAL word is stale on #30 and #89 (both LANDED); with #7, #46 and #55 it misreads 5 of its 49 PARTIAL rows.
- **Lenses (9)**: L01a, L01b, L04, L05a, L05b, L06, L08, L09, R2-06. **Max severity**: HIGH.
- **Evidence**: L04-F01: the 67-row remainder re-booked by class list under a "no deferring" order; L08-26: the BK a11y record cites `DialogContent.vue:404` (the file is 237 lines).
- **Disposition**: FOLD into BL LEDGER formation and the close checklist.
- **Wave shape**: no row inherits a status word from BK without a HEAD measurement; the close runs P-6 and the archaeology duty as checklist items with artefacts.

#### F-13—Rulings owed above an implement seat

- **Mechanism**: chronics wait on a decision nobody was seated to make, and ride closes as OPEN or BLOCKED (N-2).
- **Members (13; 10M / 3L)**: L01b-51, L01b-67, L01b-78, L04-F06, L04-F07, L04-F15, L04-F17, L04-F23, L01a-37, L01a-44, L01a-45, L05a-15, L06-08.
- **Lenses (5)**: L01a, L01b, L04, L05a, L06. **Max severity**: MED.
- **Evidence**: L06-08: T-45 DEFERRED at BI, absent from BJ/BK/BL, with a live consumer workaround (value.js `demo/styles/shell.css:300-345`); L04-F06: the V-A95 retire-or-confirm rider never ran after six non-reproductions.
- **Disposition**: BUILD (one decide wave per chronic, N-2).
- **Wave shape**: W-DECIDE band: each row gets a named ruler (owner or seat) and a terminal BUILD or RETIRE; L04-F17 (Trusted Publisher) is an owner act, listed but not built.

#### F-14—Owner asks laundered through governance waves

- **Mechanism**: recap rows routed only into declined or abrogated P-waves; older corpora never carried past BI; the recap detector is unbound.
- **Members (6; 2H / 4M)**: L05b-01, L05b-02, L05b-06, L05b-16, L05b-19, L05a-14.
- **Round 2 (+5; 2H / 2M / 1L)**:
  - R2-06-01 (HIGH, seat NEW): dock composition facilities with no terminal disposition (link verbs, dock-as-hub, three-island constellation, stadium pill, ghost satellite, goo-spacing, the one-organism sequence, search-terminus bloom; 11 rows, 0 symbols at HEAD). Seat-NEW, folded: L05b-06 already names these asks, and the mechanism is this family's (asks never carried past BI).
  - R2-06-02 (MED, seat NEW): glass material registers specified and never built or retired (CLEAR variant, IconChip, GlassControl disc, Maps-card composite and expand, the coverage law, a glass control track, iOS-27 control deltas, deep glass on heroes, dashed ghost; 19 rows). Folded, same reason.
  - R2-06-03 (MED, seat NEW): source-derived colour registers never built or retired (album-art palette, colour card, protagonist, seed morph, dock hue tracking; 7 rows). Folded, same reason.
  - R2-06-05 (HIGH, seat NEW): "motion outside the dock has no owning family" (N-8d, N-10a and 10 BD rows): a coverage statement, not a mechanism. R2-02 has since placed every measured row (Select → F-21, popstate → F-43, scroll chrome → F-46, mount frame → F-51, tails and clock → F-44, theme flip → F-73, sheet overshoot → F-74); the unmeasured rows (entrance, carousel, scroll glide) are round 3's R3-01.
  - R2-06-07 (LOW, REFUTES): four of L05b-06's no-row asks are cured or retired at HEAD (dock-wide tint on open, one dock trigger, item drag-reorder, metallic aurora); logged in §2.
- **Lenses (3)**: L05a, L05b, R2-06. **Max severity**: HIGH.
- **Evidence**: L05b-01: 89 of 261 BI recap rows routed only into declined governance P-waves.
- **Inbound**: N-3.
- **Disposition**: BUILD.
- **Wave shape**: W-RECAP-CARRY: each owner ask maps to a BL family or to a DECLINE that quotes the owner; the seed gains the missing standing edicts.
- **Round 2 correction**: the subject rows the carry had nowhere to land get decide rows in the W-DECIDE band: W-DOCK-COMPOSE-DECIDE (R2-06-01, inside the dock design loop), W-GLASS-REGISTER-DECIDE (R2-06-02; the coverage law decided on merit) and W-COLOR-SOURCE-DECIDE (R2-06-03; BUILD only if a consumer names it, E-5). Each BUILD carries a born-RED e2e; each RETIRE quotes the owner. L05b-06's four cured asks leave the open list (§2).

#### F-15—Owner asks reinterpreted or in conflict, unreconciled

- **Mechanism**: shipped behaviour diverges from the owner's words with no recorded ruling, or two owner asks conflict.
- **Members (4; 2M / 2L)**: L05a-16, L05a-21, L05b-15, L05b-21.
- **Round 2 (+1; 1M)**:
  - R2-06-08 (MED, EXTENDS): "a different custom aurora per page" became one background per category (8 of 11 paper or grid), and "header text 2× smaller" was never executed (`manifest.ts:317-325`); no owner ruling records either.
- **Lenses (3)**: L05a, L05b, R2-06. **Max severity**: MED.
- **Evidence**: L05b-15: AY B.5 "must NOT be baked into the dock" vs N-7/O-55 R-2 (rim in the dock edge); L05a-21: `CHARTER.md:3-4` (no Fable seat) vs `:37,:55-57,:68` (design routed through Fable).
- **Inbound**: N-7, O-55.
- **Disposition**: FOLD into the W-DECIDE band as owner-glance rows.
- **Wave shape**: one ask per row with a capture; L05b-15 resolves as an opt-in dock seat.

### Band C—Dock

#### F-16—The dock extent morph is discontinuous; fission is split-brain

- **Mechanism**: the width is class-discrete and the visible-extent clip is a declared no-op, so collapse-to-expand holds about 600 ms and then jumps in one frame; fission, the V/H morph and Siri read RETIRED in code and OPEN in BK.
- **Members (6; 3H / 2M / 1L)**: L01b-48, L03b-04, L04-F14, L04-F27, L05b-04, L05b-05.
- **Round 2 (+7; 5H / 2M)**:
  - R2-02-01 (HIGH, EXTENDS): the first expand after load holds the collapsed width, then snaps: the flip capture (`dockMorphMeasure.ts:132`, registered before the orchestrator, `GlassDock.vue:195` vs `:218`) measures the inactive full layer, which `layers.css:233-236` makes `absolute; inset: 0`, so `--dock-expanded-px` is written equal to the collapsed width; the comment at `dockMorphMeasure.ts:82-83` assumes the inactive pane stays laid out (re-checked). Later morphs have a continuous extent (17-32 distinct widths).
  - R2-02-02 (HIGH, EXTENDS): faces are not anchored to the plate: the box is pinned to `--dock-expanded-px` and scaled on one axis (`shape.css:103-107`) while the layers counter-scale about their own centres (`:129-138`), so rows and collapsed faces paint up to 250 px outside the glass and jump at settle.
  - R2-02-03 (HIGH, EXTENDS): pressing the collapsed Play never plays: the 60 ms hover intent flips the faces under a resting pointer, and the two faces put Play 67 px apart (KFA-7, -13).
  - R2-02-05 (MED, EXTENDS): each morph holds a ~300 ms dead tail after the extent lands (settle fires on `SpringProgress.settled`, `useDockSpring.ts:108-115`), with 28 px corners squashed to ≈7 px under `scale: 0.2467 1`, then snaps (KFA-53, pose half).
  - R2-02-07 (MED, EXTENDS): the drill-in layer swap snaps the dock width in one frame and double-exposes rows for ≥130 ms; the FLIP engine is retired (`DockLayerGroup.vue:31`) while the story still promises a size FLIP (`manifest.ts:778`).
  - R2-03-03 (HIGH, EXTENDS): O-56 G-1 on the owner's composition: `DockCrossfade` sizes the box to the entering face (`inline-size: max-content`, in flow) and lays the leaving face into `absolute; inset: 0` of that box (`crossfade.css:30-60`, re-checked); 2 distinct widths, a 246.9 px one-frame jump, identical at 7.0.0 and HEAD.
  - R2-08-13 (HIGH, CONFIRMS): hold-then-jump and the "D" rest in all nine accessibility cells (D, N, P, T, dark ×2, PRM, PRT, FC); under forced colors the separator also vanishes (its skin belongs with F-39).
- **Lenses (7)**: L01b, L03b, L04, L05b, R2-02, R2-03, R2-08. **Max severity**: HIGH.
- **Evidence**: `src/components/dock/styles/dock.css:78-92`: the collapse insets are `0px`, "a corner-safe no-op" (re-checked); `GlassDock.vue:19-20` vs `BK/PORT.md:40`.
- **Inbound**: O-56 G-1; O-60 KFA-7/-8/-13/-50..-53/-109..-112/-189/-221/-222; N-8. At HEAD (R2-02): LIVE 7, 8, 13, 50 (double exposure), 53 (pose and tail), 110; CURED 51, 52, 109, 111, 221, 222; 112 not reproduced; 189 folds into 7 and 13.
- **Disposition**: BUILD (disease row, its own wave).
- **Wave shape**: W-DOCK-EXTENT: one continuous extent on `--dock-t` from one spring; the fission/orientation/Siri ruling comes first and the loser is struck everywhere; frame-strip capture in Chrome and Safari.
- **Round 2 correction**: Mechanism, corrected (R2-02): the extent is continuous after the first expand. The hold-then-jump is a poisoned endpoint on the first flip (R2-02-01). The remaining discontinuities are the pose: a box `scale` with counter-scaled faces that keep expanded-layout positions and are not clipped to the plate, a settle that waits ~300 ms past the landed extent, and a second discrete path, the layer swap, where DockCrossfade resizes the box in one frame (R2-02-07, R2-03-03). W-DOCK-EXTENT adds: measure the endpoint from the row's intrinsic extent, never from an out-of-flow layer; morph the real extent (`clip-path: inset()` with a true radius, or the inline size of one wrapper) in place of the squash; anchor both faces to the plate and clip the layers to it; clear `data-morphing` when the extent lands; give the layer swap the same extent spring; capture strips that include a first expand.

#### F-17—Compact-on-scroll dropped; the progress rim is unseated

- **Mechanism**: BD re-decided scroll-compact as BUILD; it was dropped, and HEAD code states the opposite rule.
- **Members (1; 1H)**: L05b-03.
- **Round 2 (+1; 1H)**:
  - R2-04-09 (HIGH, CONFIRMS): paint: both shell docks keep identical rects through 3,000 px of scroll at 1440 and 2,345 px at 390; no rim is mounted.
- **Lenses (2)**: L05b, R2-04. **Max severity**: HIGH.
- **Evidence**: `src/components/dock/composables/useDockSearch.ts:7-9` "the dock NEVER auto-collapses on a passive scroll" (re-checked); `useDockState.ts:30` has no scroll state.
- **Inbound**: O-55 R-1/R-2, N-7.
- **Disposition**: BUILD.
- **Wave shape**: an opt-in scroll-compact state with hysteresis on the morph orchestrator, PRM-honoured; the rim is clipped by the dock radius in every rung and orientation.

#### F-18—Dock plate geometry and state residue

- **Mechanism**: `--dock-cap-rest: 50%` on a non-square plate paints an ellipse; the state attribute never landed; the owner-rejected 10% safe-inset token still stands.
- **Members (3; 1H / 1M / 1L)**: L03b-03, L01b-47, L05b-18.
- **Round 2 (+4; 3H / 1M)**:
  - R2-01-10 (HIGH, CONFIRMS): Chromium half of the α cells at 430×848: plates paint as lenses and D shapes (`50% | calc(0% + 16px)`), runs clip their labels.
  - R2-02-06 (MED, EXTENDS): every collapsed dock rests as a "D": the inactive full layer's run is a live 56 px scroller over 157 px of seats, so the cap animations on the `--dock-run` scroll timeline resolve the end cap to `--dock-cap-cut` (`run.css:469,504-513`), against the comment at `:500-503`.
  - R2-03-01 (HIGH, EXTENDS): O-56 G-2 producer half: `.glass-dock :is(.glass-capsule, .glass-capsule-hover) { background-clip: content-box }` (`glass-capsule.css:165-167`, the owner-rejected safe-inset band-aid folded into the face token) reaches every filled capsule inside a dock, including a glass Button, so the fill squares off while the radius survives on the border; the docblock (`:148-151`) excludes only capsules outside a dock (re-checked).
  - R2-03-04 (HIGH, CONFIRMS): the settled Tools dock on the owner's composition paints a 116.5×28 ellipse cap with a cut trailing end.
- **Lenses (6)**: L01b, L03b, L05b, R2-01, R2-02, R2-03. **Max severity**: HIGH.
- **Evidence**: `src/components/dock/styles/run.css:468` `--dock-cap-rest: 50%` (re-checked).
- **Inbound**: O-56 G-2 producer half (R2-03-01).
- **Disposition**: BUILD.
- **Wave shape**: folds into W-DOCK-EXTENT: the cap reads half the block size, one state attribute, the hack token is deleted.
- **Round 2 correction**: the family now holds three cap causes: the 50% rest on a non-square plate, the cut-cap scroll timeline bound to an inactive run (R2-02-06), and the band-aid clip reaching foreign capsules (R2-03-01, O-56 G-2 producer half). The wave adds: the cap timeline reads only the active run; the content-box clip is scoped to the dock's own control recipes; born-RED: a `Button emphasis="secondary"` inside GlassDock paints mid-zone luma equal to its end-zone luma (HEAD 17.0 vs 3.6).

- **Owner witness (2026-09-23, direct, driver-measured)**: the owner sent a screenshot of the demo shell's `SidebarDock` (a vertical `GlassDock`, `shape-pill`, always expanded) painting its plate as a pointed lens inside the stadium, with "this is not right with the dock. Inspect". Reproduced on the built demo (HEAD = 10.0.1 src) in Chromium: at 1440×720 the plate is 64×576, the run overflows by 29 px (`scrollHeight` 589 vs `clientHeight` 560), the cut-cap timeline is active, and the computed corners are `calc(19.7917% + 9.66667px)` top and `50%` bottom, i.e. 32 px across by 288 px down at the bottom; at 1440×1100 nothing overflows, the timeline is inactive, and the plate is the correct `9999px` stadium. Captures and the probe: `captures/owner-2026-09-23-dock/` (owner PNG, `rail-1440x720.png`, `rail-1440x1100.png`, `rail-1440x720-midscroll.png`, `probe.mjs`). Two refinements to this family:
  1. **Wave-shape correction.** "The cap reads half the block size" holds only for a horizontal dock. The stadium corner is half the plate's CROSS-axis extent, a circular radius: the block size when horizontal, the inline size when vertical. A percentage cannot express it (it resolves per axis), and `9999px` does not interpolate (clamped until t≈0.999, `run.css:449-452`), so the rest corner must read the dock's cross-size token, per orientation.
  2. **Short-overflow overlap (new mechanism, this family).** The leading arm's range is `0 → --dock-pitch` and the trailing arm's is `100% − --dock-pitch → 100%` (`run.css:504-523`). When the scroll range is shorter than one pitch (29 px here), the two ranges overlap, both ends sit mid-interpolation at every scroll position, and neither the "more this way" cut nor the flush rest is ever reached. The born-RED must plant an overflow shorter than one pitch.
  3. **Scroll-into-view clips the first seat under the tip.** On load the run scrolls the current item into view (`scrollTop` 29), which puts the first icon (the compass) half under the lens tip in the owner's frame.

#### F-19—Dock keyboard and ARIA ownership

- **Mechanism**: seats resolve from `run.children`, so grouped seats collapse into one; the summary role wraps slot content; `aria-pressed` is stamped inside selection groups; the search story has no combobox.
- **Members (5; 1H / 4M)**: L08-05, L08-06, L08-13, L08-16, L08-17.
- **Round 2 (+1; 1H)**:
  - R2-04-10 (HIGH, CONFIRMS): DOM census: the sidebar toolbar's children are groups, so 11 and 12 tab stops per dock, 12 `role=radio` + `aria-pressed` nodes on `/dock/overflow`, and a summary `role=button` wrapping a button.
- **Lenses (2)**: L08, R2-04. **Max severity**: HIGH.
- **Evidence**: `useDockRun.ts:71-75` `seatsOf` = `run.children` vs `demo/shell/SidebarDock.vue:119,161` and `BottomDock.vue:154,222` `div.contents[role=group]` (re-checked); the gate `g-dock-lattice.test.ts:432-444` mounts bare buttons.
- **Disposition**: BUILD.
- **Wave shape**: W-DOCK-KEYBOARD: group-aware seat resolution (`[data-dock-seat]`), a gate fixture with groups, a born-RED e2e on the live shell.

#### F-20—Demo shell chrome at the phone cell

- **Mechanism**: the shell dock strip never reveals the active story; the jump control overflows at 420; sub-routes paint a bare ground.
- **Members (3; 1M / 2L)**: L03a-06, L03b-13, L03b-14.
- **Round 2 (+1; 1M)**:
  - R2-08-09 (MED, EXTENDS): at the phone cell the BottomDock story strip is 6 px wide on 36 of 40 story routes: the coarse floor grows the six fixed controls to 44 px and the strip takes the remainder.
- **Lenses (3)**: L03a, L03b, R2-08. **Max severity**: MED.
- **Evidence**: `demo/shell/BottomDock.vue:57-66,185-197` never scrolls to `aria-current`.
- **Disposition**: BUILD (small).
- **Wave shape**: one demo-shell pass.

### Band D—Surfaces, overlays, ink and density

#### F-21—Component declarations lose the cascade to the library's own shared rules

- **Mechanism**: `:where()` geometry at (0,0,0) loses to `.glass-floating` at (0,1,0) in the same layer; the coarse `[data-control-target]` floor replaces the rung's `min-block-size`; layered geometry loses to unlayered consumer rules.
- **Members (6; 2B / 1H / 2M / 1L)**: L03b-01, L15b-07, L15b-01, L15b-12, L06-09, L04-F08.
- **Round 2 (+8; 3B / 1H / 3M / 1L)**:
  - R2-01-03 (BLOCKER, CONFIRMS): Chromium half: every SheetContent computes `position: relative` at y ≥ 844 with 24 px corners on flush edges; the dialog paints 16 (re-checked).
  - R2-01-04 (LOW, EXTENDS): the Chromium-only squircle arm `.glass-floating.sheet-animate` (`squircle.css:43-49`) names a class SheetContent never carried; two comments describe an exit path that does not exist (doc half to F-63).
  - R2-02-04 (HIGH, seat NEW): the dock-run seat rules set `transition: inline-size …` (`run.css:353-367`, specificity ≥ (0,2,0)) over `.dock-icon-button`'s own list (`icon-button.css:60-71`, (0,1,0), same layer), so hover and press snap; the same change cured KFA-52 (re-checked). Seat-NEW, folded: a shared context rule replacing a component's own declaration is this family's mechanism, here on a motion property.
  - R2-02-11 (MED, EXTENDS): Select content never slides: `SelectContent.vue:85`'s `data-[side=*]:translate-*` utilities (utilities layer) beat `reveal.css:225-260` (components layer), `@starting-style` included (KFA-163).
  - R2-02-12 (MED, CONFIRMS): the sheet's open and close play entirely below the viewport.
  - R2-04-20 (BLOCKER, CONFIRMS): a default-open bottom sheet renders in flow below the fold in a clean consumer build, outside the demo.
  - R2-06-15 (MED, EXTENDS): `contain: paint` on `.glass-wash, .glass-quiet, .glass-resting, .glass-card` (`material.css:104-109`) is both the code cure five corner-aliasing asks cite and the halo clip of a shadowed control seated in a card (O-61 R-1, N-11); no rung carries `overflow-clip-margin`.
  - R2-08-14 (BLOCKER, CONFIRMS): the shell configurator opens off-screen at 390 coarse (`position: relative`, y = 844).
- **Lenses (9)**: L03b, L04, L06, L15b, R2-01, R2-02, R2-04, R2-06, R2-08. **Max severity**: BLOCKER.
- **Evidence**: `src/components/sheet/styles.css:28-33` `:where([data-slot="sheet-content"]) { position: fixed }` vs `src/styles/glass/ladder.css:124-132` `.glass-floating { position: relative }`, both in `@layer components`; `SheetContent.vue:103-105` adds only the side border and `surfaceClass("floating")` (re-checked); `utilities/responsive.css:4-8` vs `button/styles.css:49,53,74`.
- **Inbound**: O-60 KFA-163; O-61 R-1 and N-11 (R2-06-15).
- **Disposition**: BUILD.
- **Wave shape**: W-SURFACE-GEOMETRY: the surface rung declares no position or radius (geometry is the component's), or component selectors carry (0,1,0); rung-sized faces drop the second floor; born-RED browser test: sheet `position: fixed`, flush corners 0, dialog corner 24, labeled sm height == icon sm height at the coarse cell.
- **Round 2 correction**: the family is the cascade class, not only geometry: a shared or context rule overrides a component's own declaration (position and radius, transition, translate, containment). The wave adds W-SEAT-TRANSITION (the seat width animates on its own property or a wrapper, so the control's list survives; born-RED: a seated DockIconButton's `transition-property` lists `scale`), W-SELECT-SLIDE (drop the translate utilities so `reveal.css` owns the slide) and one containment cure row whose paired capture holds both the card-corner cell and the seated-capsule halo cell (R2-06-15).

#### F-22—Overlay stacking and edge placement: the content seam carries neither

- **Mechanism**: the tooltip rung sits below the popover and modal rungs, and all three portal to body, so a tooltip inside a host paints under it.
- **Members (1; 1M)**: L11-03.
- **Round 2 (+2; 1M / 1L)**:
  - R2-04-02 (MED, CONFIRMS): paint in a clean consumer build: a tooltip inside a Popover or Dialog sits under its host plate (`elementFromPoint` hits the host).
  - R2-04-19 (LOW, seat NEW): Tooltip, Popover and DropdownMenu pass no `collisionPadding`, so their plates sit flush at the viewport edge (reka default 0); SelectContent passes a literal 16 (`SelectContent.vue:56`), so the seat's "no glass overlay" is narrowed by re-check. Seat-NEW, folded: the overlay content seam carries neither a host-relative z nor an edge contract, and both cures land in it on one fixture.
- **Lenses (2)**: L11, R2-04. **Max severity**: MED.
- **Evidence**: `src/styles/tokens/scheme-motion.css:210-212` tooltip 120, popover 130, modal 140; `TooltipContent.vue:62`, `PopoverContent.vue:127` (re-checked).
- **Disposition**: BUILD (small).
- **Wave shape**: re-rank the tooltip above its hosts; capture a tooltip inside each host in both engines.
- **Round 2 correction**: the content seam (`overlayContentAttrs`) is where both contracts belong: a host-relative z rung, and an edge clearance token read once in place of Select's literal 16. One fixture (a tooltip inside a popover, dialog and sheet; plates near an edge) bites both.

#### F-23—Ink calibrated to the token ground, not the painted composite

- **Mechanism**: contrast is computed against the declared plate token, while the page paints a plate over a live chromatic field.
- **Members (7; 3H / 3M / 1L)**: L08-07, L08-08, L08-09, L08-24, L03b-05, L03b-12, L03a-11.
- **Round 2 (+2; 1H / 1M)**:
  - R2-01-07 (MED, EXTENDS): in every dock `--muted-foreground: contrast-color(var(--card))` (`adaptive-legibility.css:67-73`) resolves the muted ink past the foreground, to pure black or white; placed here by mechanism (ink derived without its register's weight), while L10-22's Safari cell stays in F-07.
  - R2-08-11 (HIGH, CONFIRMS): dark ink on the rendered composite: 105 failures on 16/46 routes at 1440 and 88 on 17 at 390 (muted median 2.34:1); new sites: data-table muted cells, `/navigation/tabs` labels in dark, two stage readouts.
- **Lenses (5)**: L03a, L03b, L08, R2-01, R2-08. **Max severity**: HIGH.
- **Evidence**: L08-07: muted text fails AA on 86/92 routes in light and 24/92 in dark; L03b-05: dialog title 1.73:1, Cancel 1.54:1.
- **Disposition**: BUILD.
- **Wave shape**: W-INK-COMPOSITE: ink rungs derived against the composited plate over the live field; one rendered-contrast invariant that samples painted pixels.

#### F-24—Dark and reduced-transparency arms missing on decorations, fields, state and emphasis

- **Mechanism**: decorations, the shadow ladder and the hero fields carry no separating dark arm.
- **Members (3; 1H / 1M / 1L)**: L03a-09, L03a-14, L03b-06.
- **Round 2 (+1; 1H)**:
  - R2-08-02 (HIGH, EXTENDS): selection is carried only by the veil plate (`--dock-control-active-bg: var(--glass-plate-floating)`, `sizing.css:207`), which separates 1.37-1.39:1 in light, 1.00-1.03 in dark (veil ink `oklch(0.17 0.03 70)`, `dark-arm.css:278`) and 1.00 under PRT; dark Button primary and secondary render alike (1.01-1.10).
- **Lenses (3)**: L03a, L03b, R2-08. **Max severity**: HIGH.
- **Evidence**: L03b-06: hero aurora fields ignore dark mode, stage prose at 2.0-2.3:1.
- **Disposition**: BUILD.
- **Wave shape**: the dark half of W-INK-COMPOSITE.
- **Round 2 correction**: the family covers state and emphasis, where the loss is functional (R2-08-02). Invariant: every state-bearing plate separates from its host by ≥ 3:1 on painted pixels in light, dark and PRT, born RED at 1.00.

#### F-25—Preview stills feed OKLCH-scale hues to hsl()

- **Mechanism**: a warm band authored on the OKLCH hue scale is fed to `hsla()`, where 58-95 reads yellow-green.
- **Members (2; 2M)**: L03a-08, L03b-10.
- **Lenses (2)**: L03a, L03b. **Max severity**: MED.
- **Evidence**: `demo/chassis/landing/vizPreviewStill.ts:37,50-55`.
- **Disposition**: BUILD (small).
- **Wave shape**: W-STILL-OKLCH: author the stills in OKLCH off the field palette, both modes.

#### F-26—A composite custom property resolved at :root

- **Mechanism**: `--glass-fill-tinted` is computed once at `:root`, so the per-instance `--glass-fill-tint` never reaches the paint.
- **Members (1; 1H)**: L03a-03.
- **Round 2 (+1; 1H)**:
  - R2-04-11 (HIGH, CONFIRMS): cure simulation: declaring the `color-mix` on `.glass-chip` restores 13 distinct tints from 1.
- **Lenses (2)**: L03a, R2-04. **Max severity**: HIGH.
- **Evidence**: declared only at `tokens/glass.css:203`; `Chip.vue:69-77` sets `--glass-fill-tint` per instance; readers `glass-chip.css:14-15`, `glass-atom.css:82-83` (re-checked).
- **Disposition**: BUILD.
- **Wave shape**: in W-CHIP: declare the composite on the reading class.

#### F-27—`cn()` never lets a shorthand subsume its longhands

- **Mechanism**: `joinClassValues` concatenates `px-5 py-2` and `p-0`; the longhands win in the Tailwind v4 order, crushing icon chips.
- **Members (1; 1H)**: L03a-04.
- **Round 2 (+1; 1H)**:
  - R2-04-12 (HIGH, EXTENDS): Chip does route through `cn()` (`Chip.vue:60`); the defect is `cn()`'s table: `p`, `px` and `py` are independent buckets (`class-names.ts:156-164`, re-checked), so a shorthand never subsumes its longhands (`cn("px-2 p-4")` keeps both; likewise `m`/`mx` and `inset`/`top`).
- **Lenses (2)**: L03a, R2-04. **Max severity**: HIGH.
- **Evidence**: `chip/chipVariants.ts:7-17,33-43` (re-checked).
- **Disposition**: BUILD.
- **Wave shape**: in W-CHIP; sweep the other `*Variants` builders for the same join.
- **Round 2 correction**: Mechanism, corrected (R2-04-12): conflicts are resolved per bucket, and the bucket table has no shorthand-subsumes-longhand relation. The wave adds a conflict-table row (twMerge's `conflictingClassGroups` shape), then the `*Variants` sweep; born-RED: `cn("px-2 p-4") === "p-4"`.

#### F-28—The chip defect row never started

- **Mechanism**: the 7.0.0 chip row stayed OPEN for five closes with its spec's kill targets live.
- **Members (2; 2M)**: L01a-43, L04-F13.
- **Lenses (2)**: L01a, L04. **Max severity**: MED.
- **Evidence**: L04-F13: #43 OPEN five closes.
- **Disposition**: BUILD.
- **Wave shape**: W-CHIP carries this row with the two families above.

#### F-29—Density: pads transpose under the width query, corners do not

- **Mechanism**: the pairing law `pad = r - 4` is stated for every plate, but the one width query moves every pad and no corner; hand-copied local queries (one at 640) and literal controls ride other axes; marks and handles ride the spacing register.
- **Members (12; 1H / 8M / 3L)**: L15b-02, L15b-03, L15b-04, L15b-06, L15b-08, L15b-09, L15b-10, L15b-11, L15b-13, L15b-14, L03a-05, L08-10.
- **Round 2 (+3; 3M)**:
  - R2-01-08 (MED, CONFIRMS): Chromium half of L15b-14: 57/57 demo fields compute 14 px at the phone cell and 16.4 px on desktop; the iOS zoom stays PLAUSIBLE.
  - R2-08-08 (MED, EXTENDS): coarse floors and the 1.5 type lift, with no row budget, pan whole pages at the phone cell (`/motion/deck` +54 px, `/data/virtual-section` +179 px).
  - R2-08-10 (MED, EXTENDS): L15b's pad/corner table extended to 68 plate signatures on 57 routes: 11 move pads under the width query and never their corners; `.dock-tab-button` is 38 px in every cell (no coarse floor).
- **Lenses (5)**: L03a, L08, L15b, R2-01, R2-08. **Max severity**: HIGH.
- **Evidence**: `tokens/sizing.css:108-112` (the law) vs `:333-342` (six space rungs transposed, no radius); local queries at `control.css:310`, `toggle-group/styles.css:35`, `Progress.vue:149`, `segmented.css:115,308`.
- **Disposition**: BUILD (decide first).
- **Wave shape**: W-DENSITY-DECIDE (transpose corners with pads, derive pads from corners, or transpose gaps only), then one sweep; marks and handles leave the spacing register; invariant: no width-query spacing outside `tokens/sizing.css`.
- **Round 2 correction**: the density ruling gains a row-budget clause for coarse floors (R2-08-08; invariant: `<main>` scrollWidth equals clientWidth at P on every route) and takes R2-08-10's 68-row table; `.dock-tab-button` joins the coarse floor.

#### F-30—Radius role: the off-role 12 px rung (a); multi-line holders on the stadium (b)

- **Mechanism**: multi-line selectable holders paint as stadiums although the role table rules them onto the card rung; the off-role 12 px rung is latched RED.
- **Members (1; 1L)**: L01a-23.
- **Round 2 (+2; 1M / 1L)**:
  - R2-03-09 (MED, CONFIRMS): O-58/N-9 in paint: `.toggle-group__item { border-radius: var(--radius-pill) }` (`toggle-group/styles.css:67-70`, re-checked) pins two-line 208×51.2 tiles to 9999px at 7.0.0 and HEAD, against the canon row "a box is not a stadium"; LOW → MED.
  - R2-04-04 (LOW, EXTENDS): the off-role 12 px rung paints on 21 selectors across 14 routes and its latch still fails; the family splits into F-30a (corners too square) and F-30b (multi-line holders too round).
- **Lenses (3)**: L01a, R2-03, R2-04. **Max severity**: MED.
- **Evidence**: `DESIGN.md:386` (the role table) vs the latched rung (L01a-23).
- **Inbound**: O-58, N-9 (F-30b). O-56 G-2 left this family in round 2 (producer half F-18, consumer half F-70).
- **Disposition**: BUILD.
- **Wave shape**: the primitive ruling (Card/Surface with a selected state, or a card shape on Chip/ToggleGroup/RadioGroup), then a role invariant replaces the latch.
- **Round 2 correction**: Split (R2-04-04). F-30a is the off-role 12 px rung (corners too square): re-seat the 12 px readers, then flip the latch at `radius-role-canon.test.ts:458`. F-30b is O-58/N-9 (multi-line holders too round): the primitive ruling first, then a role invariant; born-RED: a two-line ToggleGroupItem computes a radius other than 9999px, and the consumer drops `rounded-pill` in its addendum. O-56 G-2 leaves this family (§2).

#### F-31—Frost and the field well

- **Mechanism**: `--input-on-glass` is opaque, so the field's backdrop-filter is inert; the transmissive cut and the well law never landed; the blur ladder rose against F48.
- **Members (3; 1H / 2M)**: L01a-22, L01a-25, L05a-05.
- **Lenses (2)**: L01a, L05a. **Max severity**: HIGH.
- **Evidence**: `_shared/field/control.css:73-81` "OPAQUE at HEAD ... the backdrop-filter below is currently inert"; `tokens/glass.css:69-73` 10/14/16/20/22 px vs 1/7/7/11/11 at `99706211` (both re-checked).
- **Disposition**: BUILD.
- **Wave shape**: W-FROST-II: transmissive well, one frost detector over four rungs and both modes, the F48 owner glance with paired π.

#### F-32—Sheet detents: the dock covers the live-behind sheet's action

- **Mechanism**: at 390×844 the detented sheet covers its primary action and the halo stops are fixed in px.
- **Members (1; 1M)**: L01a-39.
- **Round 2 (+2; 2M)**:
  - R2-01-11 (MED, EXTENDS): #39 P1 cannot be measured at HEAD: the detented sheet is off-screen for F-21's reason.
  - R2-04-03 (MED, EXTENDS): with F-21 cured by injection, the dock covers the live-behind sheet's action (the sheet sits at `z-dock − 1`, `sheet/styles.css:89-91`, re-checked, and nothing insets its content by the dock's extent); the modal detented sheet's action is 8/9 hit-testable.
- **Lenses (3)**: L01a, R2-01, R2-04. **Max severity**: MED.
- **Evidence**: L01a-39: P7 RED at 390×844.
- **Disposition**: BUILD.
- **Wave shape**: the sheet half of W-SURFACE-GEOMETRY.
- **Round 2 correction**: Mechanism, corrected (R2-04-03): the dock covers the live-behind sheet's action; the sheet covers nothing. After W-SURFACE-GEOMETRY: a dock-reach inset on live-behind sheets and rung-relative halo stops; born-RED at 390×844: "Done" is 9/9 hit-testable at Peek, Half and Full.

#### F-33—Specimens lay out by viewport, not by container

- **Mechanism**: cels and the studio envelope take viewport breakpoints, so desktop crushes specimens into third-width cells and the phone collapses controls to 0.
- **Members (5; 2H / 3L)**: L03a-01, L03a-02, L03a-12, L03a-13, L03b-15.
- **Round 2 (+3; 1H / 1M / 1L)**:
  - R2-08-06 (HIGH, EXTENDS): the Configurator's own story paints 8 px of controls at 1440 and 18 px at 390 (`configurator/styles.css:283-289` hands the aside the `1fr` remainder, re-checked).
  - R2-08-07 (MED, seat NEW): a nested family renders `.story-nested-body`, which no stylesheet styles (section gaps 0), and the family sits as one StorySection in one 419 px cel at 1440; two families are one-tab tablists. Seat-NEW, folded: the crush is this family's cel-placement mechanism, and the unstyled seam is a sub-cause in W-CEL-CONTAINER.
  - R2-08-15 (LOW, EXTENDS): the settings composition keeps `grid-cols-[minmax(10rem,14rem)_1fr]` at 390 (84 px email input).
- **Lenses (3)**: L03a, L03b, R2-08. **Max severity**: HIGH.
- **Evidence**: L03a-01: specimens crush inside ~419 px cels at 1440; L03a-02: studio controls 0 px at 420.
- **Disposition**: BUILD.
- **Wave shape**: W-CEL-CONTAINER: container queries on cels and the studio envelope.
- **Round 2 correction**: adds the nested-family seam (R2-08-07): the nested body keeps the member's cel field or the family spans the row, and a family of one is not a tablist; the envelope gate adds `/containers/configurator` at 1440 and 390, born RED at 8 px.

#### F-34—Demo remainder rows unbuilt

- **Mechanism**: the configurator expression, the demo-truth remainder and the preview-card ladder were ruled and left mostly unbuilt.
- **Members (3; 3M)**: L01b-52, L01b-56, L05a-12.
- **Round 2 (+1; 1M)**:
  - R2-08-16 (MED, CONFIRMS): 10 of 80 story cards carry a preview across the 12 landings; the row also confirms F-25 (the Substrates still is lime and olive in dark) and F-42 (the title is constant on 184/184 loads).
- **Lenses (3)**: L01b, L05a, R2-08. **Max severity**: MED.
- **Evidence**: `demo/chassis/landing/storyTile.ts:35-39`: 70 of 80 story cards resolve to no preview (L05a-12).
- **Disposition**: BUILD.
- **Wave shape**: W-DEMO-REMAINDER: preview specimens and a size ladder, the configurator expression, π at 1440 and 390.

#### F-35—Brand face delivery

- **Mechanism**: base64 `@font-face` plus shipped files: two font paths, and `unicode-range` lazy fetch is defeated.
- **Members (2; 2M)**: L03a-07, L07-07.
- **Lenses (2)**: L03a, L07. **Max severity**: MED.
- **Evidence**: `vite.style-fold.ts:451-470`; `dist/styles/fonts.css` carries base64 woff2 next to 4 shipped `.woff2` (re-checked).
- **Disposition**: BUILD.
- **Wave shape**: one font path with `unicode-range`, preloaded.

#### F-36—The pager worm reads a rem as px

- **Mechanism**: `parseFloat` on an unregistered custom property returns the authored `.75rem` as 0.75, so the neck scales 41x.
- **Members (2; 2H)**: L03b-02, L15b-05.
- **Round 2 (+1; 1H)**:
  - R2-01-05 (HIGH, CONFIRMS): Chromium half: the neck paints 300.6 px across an 18.8 px hop (bound 42.8 px); the battery's `pager-neck` cell is the born-RED gate.
- **Lenses (3)**: L03b, L15b, R2-01. **Max severity**: HIGH.
- **Evidence**: `pager-dots/worm.ts:133-135` over `PagerDots.vue:439` `var(--space-body)` = `0.75rem` (`sizing.css:122`) (re-checked).
- **Disposition**: BUILD (small).
- **Wave shape**: a registered `@property <length>` or a measured dot; a browser gate bounds the neck by the hop span.

### Band E—Accessibility

#### F-37—Modal primitives mounted inline

- **Mechanism**: the inline Command renders reka's Combobox content, which calls `useHideOthers` and focus guards unconditionally.
- **Members (4; 2H / 2M)**: L03b-07, L08-01, L08-03, L08-04.
- **Lenses (2)**: L03b, L08. **Max severity**: HIGH.
- **Evidence**: reka `Combobox/ComboboxContentImpl.js:142` `useHideOthers(rootContext.parentElement)`; `command/CommandList.vue:34` (re-checked).
- **Disposition**: BUILD.
- **Wave shape**: W-COMMAND: the inline command takes a non-modal listbox root; the dialog palette owns focus; `aria-controls` names the listbox.

#### F-38—Focus handoff at overlay close

- **Mechanism**: the trapped FocusScope recaptures the handoff into closing content, stranding focus on body for 0.5-1.0 s; the test only checks the call.
- **Members (1; 1H)**: L08-02.
- **Round 2 (+1; 1H)**:
  - R2-04-01 (HIGH, EXTENDS): re-entrant focus: the `flush: "sync"` handoff (`DialogContent.vue:133-141`, `SheetContent.vue:255-263`) calls `trigger.focus()` while reka's trapped FocusScope listeners are attached; `handleFocusIn` re-focuses Close (`FocusScope.js:57-61`), `closingInert` blurs it to body and `handleFocusOut` returns on `relatedTarget === null` (re-checked); a Tab in the 490-800 ms window lands on "Skip to content".
- **Lenses (2)**: L08, R2-04. **Max severity**: HIGH.
- **Evidence**: `DialogContent.vue:124-141`, `SheetContent.vue:246-263`; `tests/components/dialog/dialog-focus-return.test.ts:9-13,87`.
- **Disposition**: BUILD.
- **Wave shape**: W-FOCUS-LIFECYCLE: release the scope at logical close; a browser focusin-timeline test over dialog and four sheet sides.
- **Round 2 correction**: Mechanism, sharpened (R2-04-01): re-entrant focus inside the trapped window. W-FOCUS-LIFECYCLE hands off after the trap detaches. Born-RED: after Escape, sample `activeElement` every rAF until unmount; it is never BODY, and a Tab at +100 ms lands on the trigger's successor.

#### F-39—Two focus-ring registers; forced colors

- **Mechanism**: the dock outline trio and the house box-shadow ring coexist; the box-shadow ring vanishes in forced colors.
- **Members (2; 2M)**: L08-15, L10-13.
- **Round 2 (+2; 1H / 1L)**:
  - R2-08-03 (HIGH, EXTENDS): under forced colors no scrubber Slider shows focus (0 changed px on 7/7): the ring is a track `box-shadow` (`slider/styles.css:178-180`), the thumb is 0 px at opacity 0, and neither the slider's FC arm (`:342-355`) nor the shared FC focus list names it (re-checked); overturns L08's pass.
  - R2-08-04 (LOW, EXTENDS): `accessibility.css` sets `border-width: 2px !important` on every selected, checked or current element under forced colors and `prefers-contrast: more`, so a control grows 4 px when selected.
- **Lenses (3)**: L08, L10, R2-08. **Max severity**: HIGH.
- **Evidence**: L08-15: 14 sortable handles show no focus in forced colors.
- **Disposition**: BUILD.
- **Wave shape**: one ring register with a forced-colors arm.
- **Round 2 correction**: adds the scrubber Slider (0/7 focus under forced colors) and a state edge that changes geometry (R2-08-04: an `outline` with a negative offset instead); the dock separator's forced-colors loss (R2-08-13) joins the forced-colors skin.

#### F-40—One widget, two focus models

- **Mechanism**: options take tab stops beside an `aria-activedescendant` listbox, and a unit test pins the defect.
- **Members (3; 3M)**: L01a-42, L04-F09, L08-12.
- **Lenses (3)**: L01a, L04, L08. **Max severity**: MED.
- **Evidence**: L01a-42: a test pins 12 tab stops beside `aria-activedescendant`.
- **Disposition**: BUILD.
- **Wave shape**: options take their focus model from the listbox context; the pin inverts.

#### F-41—Toast placement and double announcement

- **Mechanism**: the toast stack covers the shell dock and each toast is announced twice.
- **Members (3; 3M)**: L01a-34, L03b-09, L08-11.
- **Lenses (3)**: L01a, L03b, L08. **Max severity**: MED.
- **Evidence**: L08-11: reka per-toast `role=alert` plus the region announcer.
- **Disposition**: BUILD.
- **Wave shape**: W-TOAST (the row never started).

#### F-42—Small naming and keyboard seams

- **Mechanism**: unnamed controls, one document title, missing arrow keys and openers, demo loops that ignore PRM.
- **Members (6; 1M / 5L)**: L08-14, L08-19, L08-20, L08-21, L08-22, L08-23.
- **Round 2 (+2; 2M)**:
  - R2-04-13 (MED, CONFIRMS): all six seams stand at HEAD (title, horizontal radio arrows, ToC buttons, empty `<th>`, typewriter thumb name, no Shift+F10 opener, progress PRM).
  - R2-08-05 (MED, EXTENDS): carousel paging animates under reduced motion: `useDeckSnap.scrollTo` defaults to an explicit `behavior: "smooth"` (`useDeckSnap.ts:143`, re-checked), which beats the CSS arm.
- **Lenses (3)**: L08, R2-04, R2-08. **Max severity**: MED.
- **Evidence**: L08-14: the context-menu story promises Shift+F10 with no macOS opener.
- **Disposition**: BUILD (small).
- **Wave shape**: one a11y sweep.

#### F-43—Browser Back has no transition; the router seam is unowned

- **Mechanism**: popstate bypasses the route transition, and the canon figure is false.
- **Members (3; 3M)**: L01a-29, L04-F19, L05a-07.
- **Round 2 (+1; 1M)**:
  - R2-02-13 (MED, CONFIRMS): Back and Forward swap in one frame; one `startViewTransition` call across push, back and forward.
- **Lenses (4)**: L01a, L04, L05a, R2-02. **Max severity**: MED.
- **Evidence**: L05a-07: RT-29C "the router seam, unclaimed".
- **Disposition**: BUILD.
- **Wave shape**: W-ROUTE-POPSTATE with a frame capture.

#### F-75—The reduced-transparency arm lifts the field it should recede

- **Mechanism**: Aurora's `prefers-reduced-transparency: reduce` block writes `--aurora-ceiling-a11y: 1` (`Aurora.vue:338-341`), and the root opacity reads it before the consumer's ceiling (`:255`). Every recession a consumer set (the shell's 0.5 at `AppShell.vue:229`, dock stages 0.55, heroes 0.6) doubles to full presence under page text, for the user who asked for less transparency. The forced-colors arm beside it (`:347-355`) takes the opposite route and paints a solid ground.
- **Members (1; 1H)**: R2-08-01 (round 2, seat NEW; F-23's ink derivation does not cover an arm that inverts its own preference).
- **Lenses (1)**: R2-08. **Max severity**: HIGH.
- **Evidence**: page muted text falls from 4.26-4.51:1 to 3.56-3.89:1 on 12/12 routes (`captures/R2-08/prt.json`, `sheet-prt-ab-alert.png`); plated text improves, because `--glass-level: 0` makes plates solid. Source re-checked at `6433284a`.
- **Disposition**: BUILD.
- **Wave shape**: in W-INK-COMPOSITE: the PRT arm recedes the field (a solid ground, as the forced-colors arm does) instead of lifting it; the rendered-contrast invariant runs a PRT cell, born RED on 12/12.

### Band F—Motion

#### F-44—Motion time off the one authority: integrators, dt policies, emitted tails, the canvas clock

- **Mechanism**: five hand-rolled Euler loops sit beside the keyframes engine, three on off-table constants.
- **Members (2; 1H / 1L)**: L10-01, L10-18.
- **Round 2 (+3; 1H / 1M / 1L)**:
  - R2-02-09 (MED, EXTENDS): every emitted `--spring-*` `linear()` stops at 97.959% and appends a hard `1` (re-checked); the last segment carries 0.56-2.68% of travel at 3.8-9.6× the previous slope, visible on the tab indicator and the deck (KFA-168).
  - R2-02-16 (LOW, seat NEW): `createCanvasLifecycle.ts:266-271` rebases `startTime` to `performance.now() - 1000` on resume, so every canvas restarts at t = 1 s after a park (KFA-132, re-checked). Seat-NEW, folded: a clock with its own pause and resume policy is one more time policy off the one authority, the class R2-04-14 widened this family to.
  - R2-04-14 (HIGH, EXTENDS): five integrators, five dt policies; the pointer-field attractor alone takes an unclamped dt (`frameLoop.ts:189-194` into `usePointerVelocityField.ts:396-401`, ω = 2π/0.32) and diverges above ~100 ms frames (re-simulated from an offset of 100: −285.5 at 100 ms, −2,309.6 at 250 ms).
- **Lenses (3)**: L10, R2-02, R2-04. **Max severity**: HIGH.
- **Evidence**: `useLeadTrail.ts:212-216`, `usePointerVelocityField.ts:242-247`, `constellationInteraction.ts:164-169`, `useBlobPointer.ts:184-186`, `fourier-field/clock.ts:73-75`.
- **Inbound**: O-60 KFA-168 (LIVE, all six tokens) and KFA-132 (LIVE by bytes).
- **Disposition**: BUILD.
- **Wave shape**: W-SPRING-ONE: one step-able integrator fed from `springPresets`; invariant: no `-omega * omega` outside the leaf.
- **Round 2 correction**: the family is the time authority, not only the integrators: five dt policies (R2-04-14), the emitted `linear()` tails (R2-02-09) and the canvas lifecycle clock (R2-02-16). W-SPRING-ONE adds one dt clamp with substeps above h_max, curves continuous at 100% (last-segment slope ratio ≤ 1.5 on all six tokens), and one clock whose resume continues where it stopped.

#### F-45—Non-composited motion at idle

- **Mechanism**: infinite colour and SVG-group transform animations, layout-property transitions, and a flat bezier on spatial scale.
- **Members (3; 1H / 1M / 1L)**: L07-03, L07-09, L05a-11.
- **Round 2 (+1; 1H)**:
  - R2-09-07 (HIGH, CONFIRMS): at 6× CPU and 1366×768@1 music-staff at rest takes 976 ms/s of main thread and starves the page's other rAF work (360 → 121/s); turning backdrop-filter off does not help.
- **Lenses (3)**: L05a, L07, R2-09. **Max severity**: HIGH.
- **Evidence**: `music-staff/styles.css:264-379`: 120 layouts/s and 609 ms/s of task at idle.
- **Disposition**: BUILD.
- **Wave shape**: compositor-only idle life, paused off-screen; gate: idle layouts/s = 0.

#### F-46—Scroll chrome follows the velocity path, not position

- **Mechanism**: the ramp anchors at the first observed position and advances only on velocity ticks, so a scroll jump leaves the chrome expanded over content.
- **Members (2; 2M)**: L03a-10, L03b-08.
- **Round 2 (+2; 2M)**:
  - R2-02-14 (MED, CONFIRMS): one 900 px wheel leaves `--chrome-collapse-t: 0`; `scrollTo` to the same position gives 1.
  - R2-06-09 (MED, EXTENDS): every story page mounts `useScrollChrome(…, { collapseOnScroll: true })` (`StoryPage.vue:76`), so this defect is the owner's "hero shrinks on scroll" (BC O8, H28; BDM A9; BDF B3-D2); those asks become the wave's acceptance.
- **Lenses (4)**: L03a, L03b, R2-02, R2-06. **Max severity**: MED.
- **Evidence**: `useScrollChrome.ts:186-222` (re-checked: the two lenses name the two halves of one mechanism).
- **Disposition**: BUILD.
- **Wave shape**: derive `t` from `scrollTop`.

#### F-73—The theme flip is not atomic

- **Mechanism**: the library's own `DarkModeToggle` defaults `disableTransitions` to false (`DarkModeToggle.vue:17-20`), and `useGlobalDark` adds `no-transition` only when the flag is set (`useGlobalDark.ts:92-96`). On a flip, 37 colour, background and shadow transitions run on 120, 180, 200 and 300 ms clocks while plates and h1 ink flip in one frame.
- **Members (1; 1M)**: R2-02-08 (round 2, seat NEW; no registered family covers a theme flip).
- **Lenses (1)**: R2-02. **Max severity**: MED.
- **Evidence**: `captures/R2-02/dark-swap-120/seek50ms-sidebar-default-vs-disable.png`: at +50 ms the sidebar icons read `rgb(78,78,78)` over a dark plate by default and `rgb(255,255,255)` with the knob; 53 transitions run by default, 13 (the toggle icon) with it. Source re-checked at `6433284a`.
- **Inbound**: O-60 KFA-115.
- **Disposition**: BUILD (small).
- **Wave shape**: W-THEME-SWAP: the default flip is atomic (`no-transition` on by default, the icon exempt through its `data-allow-motion`), or one view-transition cross-fade; probe: 16 ms after a flip, only the toggle icon has a running transition.

#### F-74—Spring overshoot detaches an edge-anchored sheet

- **Mechanism**: the sheet slide rides the `panel` spring (`SheetContent.vue:123`) and writes its unclamped position to the `translate` longhand ("`p<0` overshoot IS the liquid settle", `:151-158`), which `motion.ts:17-28` maps to `p * 100%` on the side axis. The sheet sits at `right: 0` or `bottom: 0` with no bleed, so the overshoot opens a strip of scrim at the anchored edge.
- **Members (1; 1M)**: R2-02-10 (round 2, seat NEW; F-21 and F-32 cover the sheet's rest geometry, not its motion).
- **Lenses (1)**: R2-02. **Max severity**: MED.
- **Evidence**: with F-21 cured by an injected `position: fixed`, the right sheet exposes a 16.2 px strip (30 of 218 frames over 1 px) and the bottom sheet 18.8 px (31 of 215), in both modes (`captures/R2-02/sheet-overshoot/`). Source re-checked at `6433284a`.
- **Disposition**: BUILD, after W-SURFACE-GEOMETRY (the sheet is off-screen at HEAD).
- **Wave shape**: W-SHEET-BLEED: take the overshoot as a stretch from the anchored edge (`transform-origin` at the edge), or give the panel an off-edge bleed of at least the peak overshoot; probe: the anchored-edge gap stays ≤ 1 px through open and close.

### Band G—Engines and performance

#### F-47—The WebGPU primary does less than the fallback arm

- **Mechanism**: four medium ids collapse to one Kuwahara body on WGSL while the WebGL2 arm carries the stroke cascade; masking fallbacks survive the WebGPU-only ruling.
- **Members (5; 3H / 2M)**: L05a-01, L10-02, L04-F03, L05b-09, L01b-54.
- **Round 2 (+2; 1H / 1M)**:
  - R2-06-10 (MED, EXTENDS): the GPU-only asks (BC H40, H43; BD2 A10, A27-A30) reach the constellation, still on `useCanvas2D` (`useConstellation.ts:11,287`), and the aurora raster ground (`auroraFallbackGround.ts:335-360`).
  - R2-09-02 (HIGH, seat NEW): every readback of the WebGPU field returns alpha 0 (147/147), so `FIELD_ALPHA_FLOOR` (`backdropLuminanceSample.ts:52,194`, re-checked) makes the dock's live luma `sample-unavailable` forever on the shipped engine; the demo's live-path witness is a Canvas2D stand-in (`glass-material.vue:84-90`). Seat-NEW, folded: a capability that works on the fallback path and not on the primary, witnessed only off the primary, is this family's mechanism (with F-08's gating gap).
- **Lenses (7)**: L01b, L04, L05a, L05b, L10, R2-06, R2-09. **Max severity**: HIGH.
- **Evidence**: `aurora/constants/shaders/aurora-mediums.wgsl.ts:396-401` returns `mediumKuwahara` for ids 3, 5, 6 and 7 (re-checked).
- **Inbound**: O-60 KFA-133 (provisional, the masking-fallback clause; bytes unchanged since 7.0.0).
- **Disposition**: BUILD.
- **Wave shape**: W-ONE-ENGINE: port the per-dab stroke cascade to WGSL, then delete the WebGL2 arm (E-2).
- **Round 2 correction**: the mechanism generalises to capability parity: the WebGPU primary lacks what the fallback path has (the stroke cascade; readable luma, R2-09-02), and the Canvas2D and raster halves the owner asked removed survive (R2-06-10). W-ONE-ENGINE's acceptance adds the constellation engine, the raster ground, and luma published by the substrate (the aurora publishes a mean luma per frame, the dock subscribes); born-RED: the `/dock/overview` observer reads `sampled` from the WebGPU field.

#### F-48—Greenfields stopped at W0

- **Mechanism**: the aurora and blob greenfields were specified and never built past W0.
- **Members (4; 3H / 1M)**: L01b-49, L01b-50, L05a-02, L05b-10.
- **Round 2 (+2; 1H / 1M)**:
  - R2-03-07 (HIGH, CONFIRMS): O-56 G-3 look: the same matte shaded sphere with fused rim nubs at 7.0.0 and HEAD (blob diff since 7.0.0: 6 files +108/−110, non-rendering, re-checked); no satellite detaches with `fissionAmp` 0.6.
  - R2-06-04 (MED, seat NEW): the viz interaction layer (per-viz configurator, viz keyboard, draw and drag, a viz perf budget; 5 rows) has no owner. The seat's own disposition folds it here: one VizStudio contract inside the aurora and blob greenfield waves, with constellation and fourier decided BUILD or RETIRE in the same row.
- **Lenses (5)**: L01b, L05a, L05b, R2-03, R2-06. **Max severity**: HIGH.
- **Evidence**: `git log --since=2026-07-28 -- src/components/blob`: 3 commits (layer move, docs, export purge) (re-checked).
- **Inbound**: O-56 G-3 (the look; the animation half is an ANSWER row in F-71).
- **Disposition**: BUILD (disease rows).
- **Wave shape**: W-BLOB-GREENFIELD and W-AURORA-GREENFIELD, each its own wave, the first capture heavy.
- **Round 2 correction**: W-BLOB-GREENFIELD answers O-56 G-3's second question: a living glass blob lands at the BL cut at the earliest. The viz interaction contract (R2-06-04) rides both greenfields.

#### F-49—Device-loss subscription per instance on the shared device

- **Mechanism**: each canvas chains its own `lost.then` closure onto the process-shared device, retaining the unmounted tree.
- **Members (1; 1H)**: L07-01.
- **Round 2 (+2; 2H)**:
  - R2-01-06 (HIGH, CONFIRMS): an engine-portable WeakRef detector: 20 of 28 route trees alive-detached with WebGPU, 0 without, with or without CDP GC.
  - R2-04-15 (HIGH, CONFIRMS): one-edge A/B: returning a fresh unreferenced promise from `GPUDevice.prototype.lost` holds nodes flat at 1,105 while WebGPU keeps running (control 3,206 → 9,509).
- **Lenses (3)**: L07, R2-01, R2-04. **Max severity**: HIGH.
- **Evidence**: `useWebGPUCanvas.ts:99` shared `sharedDevicePromise`; `:386-388` per-instance `dev.lost.then` (re-checked).
- **Inbound**: O-54.
- **Disposition**: BUILD.
- **Wave shape**: one `lost` subscription per device fanned out to a Set; a route-cycle DOM-count test; the O-54 answer rides it.

#### F-50—Idle loops and the luma sampler's blocking readback

- **Mechanism**: a full-rate rAF serves as a 4 Hz timer, armed by a configured getter rather than a resolved source; drift substrates have no frame governor.
- **Members (2; 1H / 1L)**: L07-02, L07-13.
- **Round 2 (+5; 4H / 1M)**:
  - R2-03-06 (MED, EXTENDS): the blob never reports settled after a manual `setMood` (`Blob.vue:258-259` arms `manualOverride`; `useBlobMood.ts:173` returns false while it holds, re-checked), so the demand-loop park never engages and consumers park by wall clock (value.js HeroBlob).
  - R2-04-16 (HIGH, CONFIRMS): native trace: a default GlassDock on a page with zero canvases fires 120 `FireAnimationFrame`/s; `backdropMode: "static"` fires 0.
  - R2-09-01 (HIGH, EXTENDS): KFA-23 and KFA-74 are one defect: `getImageData` (`backdropLuminanceSample.ts:165`) after a `drawImage` of the live WebGPU canvas blocks 324-433 ms once per GPU process inside useRAFLoop's callback (the only `src` caller is `useGlassBackdropLuminance.ts:330`, re-checked), so LoAF names the loop's chunk; 4/4 runs, 0/4 with the readback removed. Re-homes KFA-23 from F-51.
  - R2-09-03 (HIGH, EXTENDS): every demo route idles 2-3 sampler loops that never sample; on `/` the getter hides the shell field canvas from auto-discovery (`backdropLuminanceSample.ts:72-77`); killing the loop takes `/substrates/aurora` from 240 to 0 rAF/s.
  - R2-09-04 (HIGH, EXTENDS): the shell aurora takes ~300 ms/s of an M5 Max GPU at rest (2.5 ms per 120 Hz frame; 0.0 under reduced motion) with no frame governor (`aurora/constants/budget.ts` caps DPR only).
- **Lenses (4)**: L07, R2-03, R2-04, R2-09. **Max severity**: HIGH.
- **Evidence**: `GlassDock.vue:118-133` always passes a getter as `backgroundCanvas`; `useGlassBackdropLuminance.ts:214` treats any non-null option as live (re-checked).
- **Inbound**: O-60 KFA-74 and KFA-23, one defect (R2-09-01).
- **Disposition**: BUILD.
- **Wave shape**: sample on the substrate's frame publish or a timer only while a source resolves.
- **Round 2 correction**: KFA-23 moves here from F-51: it is KFA-74, the sampler's blocking readback (R2-09-01). W-LUMA-EVENTED: no synchronous GPU readback on the main thread, no loop without a resolved source, luma published by the substrate (F-47). W-AURORA-CLOCK: a drift clock at ≤ 30 Hz at rest, full rate only while steered (born-RED: HEAD 120). The blob's quiescence seam lands in W-BLOB-GREENFIELD (a mood pin does not veto settle; born-RED: the hero config reports `settled` at rest).

#### F-51—Synchronous costs on the mount path

- **Mechanism**: forced style recalc per spring, synchronous GPU readback, unmemoized `cn()`, main-thread shader compile.
- **Members (4; 1M / 3L)**: L07-08, L07-10, L07-11, L07-12.
- **Round 2 (+2; 2M)**:
  - R2-02-15 (MED, EXTENDS): every overlay open costs a 59-100 ms mount frame (handler, popper layout and glass paint in one frame); the dialog enter also stalls ~200 ms in 2 of 6 opens (KFA-164, partly reproduced).
  - R2-04-06 (MED, CONFIRMS): the four mount-path costs stand (`motionTempo.ts:38`; `auroraFallbackGround.ts:335-360` rasters a PNG on 1 element of `/` and 18 of `/substrates/aurora`; `cn()` unmemoised; 5 synchronous pipeline sites and 0 `*Async`).
- **Lenses (3)**: L07, R2-02, R2-04. **Max severity**: MED.
- **Evidence**: L07-08: forced recalc on every spring construction.
- **Inbound**: O-60 KFA-164 (partly reproduced). KFA-23 moved to F-50 in round 2.
- **Disposition**: BUILD.
- **Wave shape**: one mount-path pass.

#### F-52—Payload does not shake

- **Mechanism**: aurora carries both backends; a one-Button consumer ships the whole stylesheet.
- **Members (2; 2M)**: L07-05, L07-06.
- **Round 2 (+2; 2M)**:
  - R2-04-07 (MED, CONFIRMS): built artefact: `dist/aurora.js` is one 203,503 B chunk with both backends and the derive exports, 0 dynamic imports; 0 CSS specifiers in component JS.
  - R2-07-06 (MED, EXTENDS): 0 of 63 JS entries import CSS; the scoped CSS of 16 SFCs reaches a consumer only through a stylesheet; `./styles.css` holds no Button, dock, `glass-floating`, slider or segmented-tab rule and reads 143 of its 175 custom properties without declaring them, yet the canon offers it as an alternative.
- **Lenses (3)**: L07, R2-04, R2-07. **Max severity**: MED.
- **Evidence**: L07-06: 507 KB / 161 KB gz of CSS for one Button.
- **Inbound**: O-53.
- **Disposition**: BUILD.
- **Wave shape**: a shader-free aurora derive subpath; CSS split per subpath.

#### F-53—Perf and boot chronics never started

- **Mechanism**: W-PERF, the boot shell and the Lighthouse gate were ruled and never begun.
- **Members (3; 2M / 1L)**: L01b-60, L01b-69, L05b-20.
- **Round 2 (+3; 2M / 1L)**:
  - R2-09-05 (MED, EXTENDS): backdrop-filter GPU cost, measured: with none, Chrome hands the page to CoreAnimation (0 ms GPU); each full-bleed plate costs ~0.6 ms GPU per frame, five ~2 ms; `/` runs 17,009 Metal encoders per second against 726 without.
  - R2-09-06 (MED, seat NEW): with software compositing one full-bleed plate halves the frame rate and five give 20 fps; the blur is unconditional and no capability-keyed low-power register exists. Seat-placed here as a W-PERF decide row (the family's mechanism: the perf chronic was never begun).
  - R2-09-09 (LOW, REFUTES): the dev server's cold start is not a defect (Vite 8.1.5 optimizes at startup, one load, no re-optimization reload); the dev leg of L01b-60 is refuted, logged in §2.
- **Lenses (3)**: L01b, L05b, R2-09. **Max severity**: MED.
- **Evidence**: L01b-60: the blank-first-paint premise still holds.
- **Disposition**: BUILD.
- **Wave shape**: decide-then-build in the W-DECIDE band.
- **Round 2 correction**: W-PERF gates on counts (render passes or Metal encoders per frame per route), with R2-09's tables as the baseline, and carries a decide row for a low-power glass register keyed to a capability signal. The dev-server leg retires (§2); the boot-shell premise needs a network-throttled FCP.

#### F-54—iOS 27 hallmarks unbuilt

- **Mechanism**: four micro hallmarks (dock-to-card squish, magnetic overpull, stagger and others) were never built.
- **Members (1; 1M)**: L05b-14.
- **Round 2 (+1; 1M)**:
  - R2-04-17 (MED, CONFIRMS): hallmarks 1, 2 and 6 have 0 artefacts in src, dist and dist-demo; hallmark 5 is PARTIAL (the dock's morph-keyed child stagger, `layers.css:238-257`).
- **Lenses (2)**: L05b, R2-04. **Max severity**: MED.
- **Evidence**: L05b-14.
- **Disposition**: FOLD into the design loop's dock and motion portfolio.
- **Wave shape**: none of its own.

### Band H—Structure (N-1)

#### F-55—The colocation chronic: settlement decided, never landed

- **Mechanism**: the move ledger was banked at BJ and rode two closes unstarted while the tree moved away from it.
- **Members (7; 4H / 3M)**: L01b-62, L12-01, L13-01, L14-01, L05b-08, L12-07, L04-F20.
- **Lenses (6)**: L01b, L04, L05b, L12, L13, L14. **Max severity**: HIGH.
- **Evidence**: L12-01: the banked move ledger is almost wholly unlanded at HEAD; L05b-08: god modules regrew from 9 to 17.
- **Inbound**: N-1.
- **Disposition**: BUILD (disease row, its own wave).
- **Wave shape**: W-COLOCATION: land the move ledger in one sweep, with the import DAG as the check.

#### F-56—Component-owned code in global zones

- **Mechanism**: single-owner composables, CSS, tokens and colour members live in `src/composables`, `src/styles` and the colour leaf.
- **Members (8; 2H / 4M / 2L)**: L05a-10, L12-02, L12-04, L13-02, L13-04, L13-05, L13-13, L13-15.
- **Lenses (3)**: L05a, L12, L13. **Max severity**: HIGH.
- **Evidence**: L13-02: 32 single-owner modules (about 40% of composable lines) in `src/composables/`.
- **Disposition**: FOLD into W-COLOCATION.

#### F-57—Nesting by file kind; no placement grammar

- **Mechanism**: sub-components split by file kind, not by feature; the same role has two to four spellings.
- **Members (3; 2M / 1L)**: L12-06, L12-08, L13-10.
- **Lenses (2)**: L12, L13. **Max severity**: MED.
- **Evidence**: L12-08.
- **Disposition**: FOLD into W-COLOCATION.

#### F-58—One symbol, two doors

- **Mechanism**: a symbol ships through two public barrels; two wiring channels for colocated CSS; one concept under two names.
- **Members (7; 1H / 3M / 3L)**: L12-05, L12-10, L12-11, L13-03, L13-09, L10-19, L10-20.
- **Lenses (3)**: L10, L12, L13. **Max severity**: HIGH.
- **Evidence**: `useDockCtaReceive` exported from `composables/motion/index.ts:55` and `components/dock/index.ts:82-86` (re-checked).
- **Disposition**: FOLD into W-COLOCATION (clean break, E-1).

#### F-59—Cycles from contracts homed inside one consumer

- **Mechanism**: shared contracts live in one consumer's tree and create back-edges: value SCC M02 and `dialog` <-> `sheet`.
- **Members (3; 1H / 2M)**: L12-03, L12-09, L01a-21.
- **Lenses (2)**: L01a, L12. **Max severity**: HIGH.
- **Evidence**: back-edges `_shared/overlay/participation.ts:11-14` -> `dock/composables/dockContext`; `DialogContent.vue:16` -> `sheet/motion`.
- **Disposition**: FOLD into W-COLOCATION.

#### F-60—Periphery structure

- **Mechanism**: the test tree mirrors a dead taxonomy; scripts sprawl; workflows duplicate; root config sprawls; demo colocation gaps; tooling inputs sit in closed record dirs.
- **Members (8; 8M)**: L14-07, L14-08, L14-10, L14-11, L14-12, L14-13, L13-07, L13-11.
- **Lenses (2)**: L13, L14. **Max severity**: MED.
- **Evidence**: L14-07: 86 of 256 test files mirror no `src` path.
- **Disposition**: BUILD.
- **Wave shape**: W-PERIPHERY, after W-COLOCATION fixes the target shape.

#### F-61—Repo weight and evidence hygiene

- **Mechanism**: evidence media and tooling accrete in `docs/` and the root.
- **Members (4; 2M / 2L)**: L01b-63, L09-16, L14-15, L14-16.
- **Lenses (3)**: L01b, L09, L14. **Max severity**: MED.
- **Evidence**: L09-16: `docs/` holds 8.2 GB, 2.4 GB of tracked media uncited.
- **Disposition**: BUILD (small); RETIRE the frozen record scripts with an invariant against new ones.
- **Wave shape**: one scratch root; executable tooling lives in `scripts/` or `tests-visual/`, never in `docs/`.

### Band I—Source hygiene and docs

#### F-62—Meta and provenance re-accreted

- **Mechanism**: tranche ids, dated brackets and strike-through tombstones re-entered src, periphery, published types and MIGRATION after the demeta scrub (E-10).
- **Members (10; 2H / 5M / 3L)**: L01a-17, L05a-04, L05a-22, L05b-12, L06-14, L09-08, L09-09, L09-10, L10-16, L14-14.
- **Round 2 (+1; 1M)**:
  - R2-07-08 (MED, EXTENDS): 15 `.d.ts` files carry `BK #n`, dated brackets, `~~` or `O-nn`/`W-` ids (the registry's 12 plus 3), and `DISSOLVE_DIALECTS` (exported from `./motion-core`) ships ~3 KB of roster prose as runtime string data, which no comment scrub reaches.
- **Lenses (8)**: L01a, L05a, L05b, L06, L09, L10, L14, R2-07. **Max severity**: HIGH.
- **Evidence**: 12 `dist/**/*.d.ts` files carry `BK #n` or dated brackets (re-checked); MIGRATION.md 349 KB, about 119 KB gzipped (re-checked).
- **Disposition**: BUILD.
- **Wave shape**: W-DEMETA-II plus one invariant over src, dist types and MIGRATION.

#### F-63—Docs not derived from the source of record

- **Mechanism**: README, DESIGN, canon, component READMEs, MIGRATION and JSDoc name symbols, subpaths, props, tokens and return forms that the source does not carry.
- **Members (20; 5H / 11M / 4L)**: L01a-26, L01b-61, L04-F12, L05b-11, L09-01, L09-02, L09-04, L09-05, L09-06, L09-07, L09-11, L09-13, L09-15, L09-18, L03a-15, L06-06, L13-16, L15a-F8, L15a-F11, L11-07.
- **Round 2 (+1; 1L)**:
  - R2-06-14 (LOW, EXTENDS): `BottomDock.vue:11` still describes the "NCSU-red underline/pill" the library retired for a neutral accent.
- **Lenses (11)**: L01a, L01b, L03a, L04, L05b, L06, L09, L11, L13, L15a, R2-06. **Max severity**: HIGH.
- **Evidence**: `README.md:21` imports `@mkbabb/glass-ui/forms`, absent from the 68 export keys; `README.md:56` `--glass-opacity-resting` has 0 hits in `src` (both re-checked).
- **Inbound**: O-30.
- **Disposition**: BUILD.
- **Wave shape**: W-DOC-TRUTH: two invariants (symbol/subpath existence, token existence) over README, DESIGN, canon, component READMEs and JSDoc.

#### F-64—Token hygiene

- **Mechanism**: literal fallbacks that mask or diverge, phantom and dead tokens, duplicates, legacy ladders, dead selectors.
- **Members (11; 8M / 3L)**: L01a-20, L01b-47b, L05a-06, L05a-17, L05a-20, L10-09, L10-10, L10-11, L10-12, L10-14, L10-17.
- **Lenses (4)**: L01a, L01b, L05a, L10. **Max severity**: MED.
- **Evidence**: L10-10: 67 fallbacks carry a different literal than the token; L10-09: 51 hooks read a property set nowhere.
- **Disposition**: BUILD.
- **Wave shape**: W-TOKEN-HYGIENE (E-2).

#### F-65—Twin sources of record

- **Mechanism**: TS tables are hand-mirrored in CSS, every dark colour is written twice, and colour resolution is implemented four times.
- **Members (3; 3H)**: L10-03, L10-04, L10-05.
- **Round 2 (+2; 2M)**:
  - R2-04-08 (MED, CONFIRMS): the twins exist ungated (52 of 53 `light-dark()` tokens re-declared in `.dark`, 0 `proof:*` scripts, 16 hand-mirrored TS↔CSS pairs) but agree in paint at HEAD (52/52, 16/16); the family is re-graded HIGH → MED and the threshold-drift sub-claim is refuted (§2).
  - R2-08-12 (MED, EXTENDS): the family's first paint consequence: `--card` and `--foreground` are `light-dark()` pairs while `--on-glass-muted` is dark only under `.dark` (`on-glass-fg.css:35`, `dark-arm.css:301`), so a `color-scheme: dark` scope paints light muted ink on a dark card (2.12:1).
- **Lenses (3)**: L10, R2-04, R2-08. **Max severity**: MED.
- **Evidence**: `tokens/light-dark.css:65-79` calls `dark-arm.css` a lockstep witness checked by `proof:glass` DA1; `package.json` has 0 `proof:*` scripts (re-checked).
- **Disposition**: BUILD.
- **Wave shape**: one arm per token type; TS tables generate CSS; one colour-resolution leaf.
- **Round 2 correction**: re-graded HIGH → MED (R2-04-08): no twin diverges in paint at HEAD. The ungated duplication is the hazard, and R2-08-12's scoped `color-scheme` is the one live paint consequence. W-DARK-ONE-ARM: `light-dark()` for every colour, so a scoped `color-scheme` is a complete dark scope.

### Band J—Exports, consumers and cross-repo

#### F-66—Published surface with no consumer

- **Mechanism**: exports, subpaths and artefacts with no reader outside tests.
- **Members (7; 3M / 4L)**: L05a-18, L06-10, L10-06, L10-07, L10-15, L10-21, L13-14.
- **Round 2 (+2; 1M / 1L)**:
  - R2-01-12 (LOW, EXTENDS): `.glass-top-layer` has no mounting site; its one arm is Chromium-only `@supports (overlay: auto)`.
  - R2-06-11 (MED, EXTENDS): `useLiquidReveal` ("doesn't seem to work at all") is exported with 0 call sites, and aurora `source: "image"` ships with 0 demo uses.
- **Lenses (6)**: L05a, L06, L10, L13, R2-01, R2-06. **Max severity**: MED.
- **Evidence**: L10-06: 94 of 321 value exports unused; L06-10 counts 6 of 70 keys, but HEAD has 68 (figure corrected).
- **Disposition**: FOLD into the P-6 overfitting audit.
- **Wave shape**: one census, per-symbol wire-or-delete at the next major.

#### F-67—Published claims not asserted on the built artefact

- **Mechanism**: the root closure, peer declarations, the consumer token surface and DEV guards are claimed in source and false in dist.
- **Members (4; 2H / 2M)**: L09-03, L06-03, L06-04, L06-05.
- **Round 2 (+7; 3H / 3M / 1L)**:
  - R2-07-01 (HIGH, seat NEW): `--text-sm: initial; --text-xs: initial` inside `@theme inline` (`bridges.css:28-29`, since `35a30fbb`, v8.0.0; re-checked in src and dist) joins every consumer's Tailwind compile and deletes `text-xs` and `text-sm`: loud under `@apply` (value.js's demo build fails), silent in templates (fourier's 104 sites paint nothing); 0 MIGRATION rows; the source comment calls it "BUILD-VISIBLE". Seat-NEW, folded: an undocumented change to the consumer-facing theme surface that silently kills consumer reads is L06-03's mechanism.
  - R2-07-03 (HIGH, EXTENDS): tw-animate-css is optional in metadata but `/styles` requires it: `@source "../*.js"` finds `sheet-animate`, whose `@apply …fade-in` fails without it (re-checked); `import "@mkbabb/glass-ui/styles"` from JS fails even with it; the README's Button-only claim is false.
  - R2-07-04 (HIGH, EXTENDS): `verify:package`, the only pack-and-install gate, is green on an artefact that fails consumer compiles: it installs every optional peer, imports entries in bare Node, checks CSS by existence and runs only in `release.yml` (re-checked); its detector is narrower than its claim, F-02's class.
  - R2-07-05 (MED, EXTENDS): @vueuse/core is imported statically by the root and 12 subpaths (L06-05 said 15); pnpm hands glass a hoisted 12.8.2 outside `^14.0` with no warning; vueuse 15.0.0 gets ERESOLVE; the reka floor `^2.0` is name-safe but behaviour-untested.
  - R2-07-07 (MED, EXTENDS): all 4 `import.meta.env.DEV` guards are resolved at the library build: Slider ships `onMounted(() => {})` on every instance, MusicStaff's throw and Timeline's warning are gone; value.js has 29 Button `variant` bindings the guard was written for.
  - R2-07-12 (LOW, REFUTES): the root closure reaches vueuse and keyframes, but production bundles shake it to the subpath cost (85,628 vs 85,624 B); no round-1 finding claimed payload, so nothing is rejected; W-ROOT-CLOSURE is re-scoped to peer truth and the unbundled dev graph.
  - R2-09-08 (MED, seat NEW): under SSR `useGlobalDark` writes `document.documentElement.style.colorScheme` from an immediate watcher with no environment guard (`useGlobalDark.ts:168-174`, re-checked), so DarkModeToggle and FourierField throw, while `darkModeSyncScript.ts:8,90` advertises an SSR head. Seat-NEW, folded: a capability the source advertises and the artefact fails is this family's mechanism; SSR joins the consumer matrix.
- **Lenses (4)**: L06, L09, R2-07, R2-09. **Max severity**: HIGH.
- **Evidence**: a closure walk from `dist/glass-ui.js` reaches `@vueuse/core` and `@mkbabb/keyframes.js`; the `Button.vue:131` DEV guard is absent from `dist/button-*.js` (both re-checked).
- **Disposition**: BUILD.
- **Wave shape**: W-ROOT-CLOSURE: assert the dist import closure and the token surface on the packed artefact.
- **Round 2 correction**: the family now carries the consumer compile: a theme reset that deletes consumer utilities (R2-07-01), an optional peer the stylesheet requires (R2-07-03), an optional peer the graph imports (R2-07-05), DEV guards that never ship (R2-07-07) and an SSR head the artefact cannot serve (R2-09-08). Its one gate was narrower than its claims (R2-07-04). W-PEER-TRUTH replaces `verify:package` with a consumer matrix in `ci.yml`: npm and pnpm × optional peers absent × the README CSS recipe compiled by `@tailwindcss/vite` × `./styles.css` × an SSR smoke render. W-ROOT-CLOSURE is re-scoped to peer truth and the dev graph (R2-07-12).

#### F-68—Consumers pinned majors back; cures cannot land

- **Mechanism**: value.js and keyframes.js install 7.0.0, fourier 8.0.0, and no consumer schedules a repin, so no BL cure reaches the owner's surfaces; consumer gates measure their own stale install as producer state.
- **Members (13; 1B / 2H / 7M / 3L)**: L15a-F4, L15a-F3, L15a-F5, L15a-F10, L15a-F12, L06-01, L06-07, L06-12, L06-13, L01b-76, L05b-13, L10-08, L11-11.
- **Round 2 (+3; 2H / 1M)**:
  - R2-03-10 (MED, EXTENDS): a plain value.js repin to 10.0.1 changes its dock silently: the struck `start-collapsed` mounts it collapsed, `show-rail` → `showSwitcher` paints a switcher column (56 → 108 px), `WatercolorDot` is gone, and the real Button border paints the inline `borderColor` ring.
  - R2-03-11 (HIGH, EXTENDS): O-56 R-5: every producer docket row paints the same at 7.0.0 and 10.0.1, so no row is PIN-ONLY and the landing version is the BL cut, 11.0.0; fourier's `^8` needs an explicit repin.
  - R2-07-11 (HIGH, EXTENDS): the W-LANDING packets measured against the HEAD tarball: value.js 16 hard breaks and 24 silent (47 already dead), keyframes.js 21+3 hard and 14 silent, fourier 0 hard and 6 silent; four MIGRATION removals have no row; `MIGRATION.md:2675` prescribes `:show-close`, removed at 8.0.0 (re-checked, with the absent `./watercolor-dot`, `./search`, `./forms`, `./dropdown-menu`, `./drawer`, `./canvas` keys).
- **Lenses (8)**: L01b, L05b, L06, L10, L11, L15a, R2-03, R2-07. **Max severity**: BLOCKER.
- **Evidence**: value.js `package.json:88` `^7.0.0`, keyframes.js `package.json:78` `7.0.0` (re-checked); stale bindings value.js `demo/shell/dock/Dock.vue:161-164` vs `useDockShellProps.ts:5-8`.
- **Inbound**: O-56 R-5 (answered: 11.0.0), N-6.
- **Disposition**: BUILD.
- **Wave shape**: W-LANDING: fix BL's version; per-consumer migration packets from each consumer's import graph, naming silent no-op bindings (E-11); a live relay. The repin itself is each consumer's addendum (E-6).
- **Round 2 correction**: W-LANDING's version is 11.0.0 (R2-03-11). The packets are measured (R2-07-11's appendix), and R2-03-10's four paint regressions join value.js's.

#### F-69—A consumer fork carries unupstreamed fixes

- **Mechanism**: scaena runs a vendored 8.0.3 whose drag-morph fixes exist only as uncommitted edits in a detached glass-ui worktree.
- **Members (1; 1H)**: L06-02.
- **Round 2 (+1; 1H)**:
  - R2-04-05 (HIGH, CONFIRMS): paint: the first press on the active pill throws the indicator 633.95 px (the pointer's `clientX` minus an origin of 0) for as long as it is held; the second press 0.0 px; the fork's fix is still uncommitted at `e73ec80c` (25 entries, re-checked).
- **Lenses (2)**: L06, R2-04. **Max severity**: HIGH.
- **Evidence**: `scaena/apps/web/package.json:13` pins `vendor/npm/mkbabb-glass-ui-8.0.3.tgz`; `.worktrees/glass-ui-segmented-tabs-8.0.2` shows 25 uncommitted entries (re-checked).
- **Disposition**: BUILD.
- **Wave shape**: W-DRAG-MORPH-SETTLE with a born-RED e2e.

#### F-70—Stale bindings no-op silently (E-11): untyped fallthrough, unwitnessed emits, erased declarations

- **Mechanism**: components with a native root do not type its attribute and listener surface, so consumers cannot enable `strictTemplates`, and the library's own strict pass rides a global shim.
- **Members (2; 1H / 1M)**: L15a-F6, L13-12.
- **Round 2 (+5; 3H / 1M / 1L)**:
  - R2-02-17 (LOW, EXTENDS): keyframes.js's `overflow`, `start-collapsed`, `always-expanded` and `collapse-delay` land on the GlassDock root as attributes (`inheritAttrs: false` + `v-bind="$attrs"`, `GlassDock.vue:65,338`).
  - R2-03-02 (MED, EXTENDS): O-56 G-2 consumer half: value.js binds `variant` on 49 Button tags in 21 files, a prop absent since 7.0.0, so the Login and `@mbabb` pills take the filled `secondary` emphasis; MIGRATION has no `variant` → `emphasis` row and still teaches `variant="outline"` at `:2708`.
  - R2-05-F4 (HIGH, seat NEW): 18 of 37 reka emit channels the library forwards have no runtime witness (among them Dialog and Tooltip `v-model:open`, SelectItem `@select`, the `dismiss="locked"` refusal); the emit type is declared apart from the wiring. Seat-NEW, folded: an upstream rename silently disconnecting a public emit is the E-11 silent no-op this family owns.
  - R2-05-F5 (HIGH, EXTENDS): the E-11 sweep is clean at HEAD, and `checkUnknownProps: true` (`tsconfig.json:21-23`, re-checked) rejects stale props in `src` and `demo`; stale emits, object-spread keys and attrs on renderless `inheritAttrs: false` roots stay unseen, and `checkUnknownEvents` cannot be enabled while 109 native root listeners are untyped (this family's mechanism inside the library).
  - R2-07-02 (HIGH, seat NEW): the published Chip declaration is `DefineSetupFnComponent<Record<string, any>, {}, {}, …>` since `ae17992c` (v10.0.0; an explicit `Readonly<ChipProps>` over `withDefaults(defineProps<ChipProps>())`), so every consumer Chip binding and both emits go unchecked; it is the only such dist declaration (re-checked). Seat-NEW, folded: a consumer surface that cannot see a stale binding is this family's mechanism, and its strictTemplates consumer fixture catches it.
- **Lenses (6)**: L13, L15a, R2-02, R2-03, R2-05, R2-07. **Max severity**: HIGH.
- **Evidence**: `Button.vue:48-60`; `@vue-ignore` in 3 components only.
- **Inbound**: O-57 R-1; O-56 G-2 consumer half (R2-03-02).
- **Disposition**: BUILD.
- **Wave shape**: a type-surface wave; gate: a consumer fixture under `strictTemplates` that fails on a stale prop.
- **Round 2 correction**: the family is E-11 end to end: a binding that names nothing is dropped with no error, and neither the type layer nor the test layer sees it (untyped native fallthrough, unwitnessed forwarded emits, an erased published declaration, struck props on `inheritAttrs: false` roots). The wave adds a runtime witness per forwarded reka channel, a declaration gate that fails any dist component whose `$props` resolves to `Record<string, any>`, and `checkUnknownEvents` once native listeners are typed.

#### F-71—Inbound mail never carried or answered

- **Mechanism**: letters marked SENT by the sender never reached glass-ui; routed batches went unanswered; the BL register misses them.
- **Members (12; 5H / 5M / 2L)**: L11-01, L11-02, L11-04, L11-05, L11-06, L11-08, L11-09, L11-10, L11-12, L05a-13, L15a-F1, L15a-F7.
- **Round 2 (+3; 2M / 1L)**:
  - R2-03-05 (MED, REFUTES): ANSWER row, O-56 G-3 animation half: "not animated" is value.js HeroBlob's wall-clock park (`blobPaused` after 2000 + 3300 ms, re-checked read-only); unparked, the producer blob moves at 7.0.0 and HEAD (refutation logged in §2).
  - R2-03-08 (LOW, seat NEW): ANSWER row, O-56 G-4: the glass aurora and ground paint the derived maroon, never black, at both versions, both arms and every rest condition (re-derived at HEAD: L 0.18-0.42, h 344-40); routes back to value.js's bisect. Seat-NEW (unplaced), registered as an answer: no producer mechanism exists.
  - R2-06-12 (MED, EXTENDS): the 19 unmeasured value.js §4a rows measured at HEAD: 7 live producer gaps nobody answered (F3-4, -7, -10, -11, KFW12-3 here; F3-9, -12 to F-42), 2 forced-colors gaps (F-39), 1 contrast (F-23), 1 doc (F-63), 3 met at HEAD and red only through the 7.0.0 pin (F-68).
- **Lenses (5)**: L05a, L11, L15a, R2-03, R2-06. **Max severity**: HIGH.
- **Evidence**: L15a-F1: ten value.js letters (O-28, O-30, O-31, O-36, O-47..O-52) have zero hits in glass-ui `docs/` or `git log --all`.
- **Inbound**: O-53..O-58, O-60; O-56 G-3 (animation half) and G-4 answered (R2-03-05, -08); O-61 R-2 and R-3 (R2-06's N-11b, N-11c).
- **Disposition**: BUILD.
- **Wave shape**: W-MAIL-INTAKE: carry the letters, row them in INBOUND, rule each row CURE/ANSWER/DECLINE into its family; BL gets its own inbox dir.

#### F-72—The value.js boundary rides an unpublished cure

- **Mechanism**: `GlassColorError` never fires for the malformed-colour class; value.js 4.1 cures it but is tagged locally only.
- **Members (1; 1M)**: L15a-F9.
- **Round 2 (+1; 1M)**:
  - R2-04-18 (MED, CONFIRMS): through glass's own `dist/color.js`: `cssToOklch("oklch()")` and `("rgb()")` throw `TypeError`, `("not-a-color")` throws `GlassColorError`; value.js on npm is still 4.0.0.
- **Lenses (2)**: L15a, R2-04. **Max severity**: MED.
- **Evidence**: `color/value.ts:41-43`; `npm view @mkbabb/value.js version` 4.0.0.
- **Inbound**: O-36.
- **Disposition**: FOLD (re-trigger: value.js >= 4.1.0 on npm).
- **Wave shape**: lock bump plus a born-RED test that `opaqueCssColor("oklch()")` throws `GlassColorError`.

## 2. Rejects

Each of these findings failed my re-check at `1c1f1f67`. Rejected findings sit in no family. Where part of a finding stands, the table says where that residue went.

| id | sev | claim | re-check and reason | residue |
|---|---|---|---|---|
| L04-F10 | MED | The published keyboard guard lets preset shortcuts hijack a focused slider | The registry listens on `window` in the bubble phase (`useKeyboardShortcuts.ts:351`) and returns on `e.defaultPrevented` (`:298`, landed `650297da`, in 10.0.0). reka `Slider/SliderImpl.js` calls `preventDefault()` on arrow, page, Home and End keys at the element, before the event reaches `window`. The aurora studio sliders are reka `<Slider>` (`OklchStopRow.vue:86,104,122`). The cited hijack cannot fire at HEAD. | L01b-49b (F-12) keeps the record half. The remaining hardening (an ARIA-role arm for widgets that own arrows but do not preventDefault) is a note on the dock keyboard family. O-60 KFA-95 (arrow keys handled twice) was measured at 7.0.0, before the guard, and R2-02 re-measures it at HEAD. |
| L08-25 | LOW | reka `hideOthers` aria-hides the skip link, dock and article while a modal menu is open | The lens retired it itself: focus stays trapped in the menu (its Tab probe), so no user reaches the hidden focusables, and this is reka's documented modal pattern. I agree. The inline, non-modal case is a real defect, and it lives in F-37 (L08-01). | none |
| L15a-F2 | MED | O-57 is untracked and absent from BL's INBOUND register | This was overtaken at HEAD. `bf517b61` commits the letter and adds O-57 to `INBOUND.md`. | The "BL has no inbox dir" half folds into W-MAIL-INTAKE (F-71). |
| L04-F28 | LOW | Two value.js letters (O-53, O-54) sit untracked with no receive or reply | This was overtaken at HEAD. `a97a9ddd` tracks both letters and registers them in `INBOUND.md`. | The "no reply" half is L11-06 and L05a-13 (F-71). |

### Round 2 refutations

Round 2 refuted 14 claims. None rejects a round-1 finding whole, so the reject table above stays at 4. Each row names the refuting probe and where the rest of the finding now sits.

| # | claim refuted | source | refuting probe | residue |
|---|---|---|---|---|
| 1 | Relative luminance is computed twice with different thresholds, a behavioural divergence | L10-03 (F-65) | R2-04-08: `node` over both piecewise functions; max \|Δ\| is 0 over all 256 8-bit inputs and 7.55e-7 in float, at x = 0.0393 (re-run) | the duplication stands in F-65 |
| 2 | F-65 is HIGH | F-65 max severity | R2-04-08: computed-colour A/B of the twins; 52/52 tokens and 16/16 TS↔CSS pairs agree in paint at HEAD | F-65 at MED; R2-08-12 is its one paint consequence |
| 3 | The detented sheet covers its own primary action | L01a-39 (F-32 mechanism) | R2-04-03: with F-21 cured by injection, the modal detented sheet's action is 8/9 hit-testable; the live-behind sheet sits at `z-dock − 1` (`sheet/styles.css:89-91`, re-checked) and the dock covers its action | L01a-39 stays in F-32 under the corrected mechanism |
| 4 | Hallmark 5 (the stagger) is absent | L05b-14 (F-54) | R2-04-17: the dock's morph-keyed child stagger (`layers.css:238-257`, re-checked) | hallmarks 1, 2 and 6 stand at 0 artefacts; 5 is PARTIAL |
| 5 | Four of L05b-06's asks have no row and no cure | L05b-06 (F-14) | R2-06-07: dock-wide tint on open (the recolor is deleted, `morph.css:347-349`), one dock trigger (`DockTrigger.vue:14-16`), item drag-reorder (retired, `976c8326`), metallic aurora (`presets.ts:101-102`), all re-checked | the rest of L05b-06 stands in F-14 |
| 6 | The dock width is class-discrete, so every collapse-to-expand holds, then jumps | F-16's round-1 mechanism | R2-02 frame strips: 17-32 distinct widths per morph after the first expand; the hold happens on the first expand only, from a poisoned endpoint (R2-02-01, source re-checked) | F-16's members stand; the mechanism is corrected in the family |
| 7 | The dev server's cold start re-optimizes and reloads | L01b-60, dev leg (F-53) | R2-09-09: Vite 8.1.5 optimizes at startup, one load, no re-optimization reload; no `optimizeDeps` config (re-checked) | the boot-shell premise stays in F-53 |
| 8 | O-56 G-2 (squared pill plates) is a radius-role defect | the round-1 provisional home, F-30 | R2-03-01, R2-03-02: the fill squares off under the dock's `background-clip: content-box` on foreign capsules, and value.js binds a removed `variant` | producer half F-18, consumer half F-70 |
| 9 | O-56 G-3 "not animated" is a producer defect | O-56 G-3, animation half | R2-03-05: value.js HeroBlob parks the blob by wall clock (`BLOB_IDLE_MS` 2000, `SLEEPY_POSE_MS` 3300, `HeroBlob.vue:17,211-220`, re-checked read-only); unparked, the producer blob moves at 7.0.0 and HEAD | ANSWER row in F-71; the settle seam under a manual mood is F-50 (R2-03-06) |
| 10 | O-56 G-4 (black atmosphere at rest) is a producer defect | O-56 G-4 | R2-03-08: maroon at both versions, both arms and every rest condition; `deriveAurora("lab(18.1% 32.3 9.2)", {scheme: "dark"})` from HEAD `dist/aurora.js` gives L 0.18-0.42, C 0.077-0.097, h 344-40 (re-run) | ANSWER row in F-71, routed to value.js's bisect |
| 11 | KFA-23 and KFA-74 do not reproduce at HEAD | R2-02's O-60 table | R2-09-01: one defect, 4/4 runs, 0/4 with the readback removed; the sampler is `useRAFLoop`'s only `src` caller (re-checked) | both LIVE, in F-50 |
| 12 | Every slider shows focus under forced colors | L08's forced-colors pass record | R2-08-03: 0 changed px on 7/7 scrubber sliders; no forced-colors focus rule names the slider (re-checked) | F-39 |
| 13 | vue-tsc misses a stale prop (E-11 as carried) | the E-11 premise (F-70) | R2-05-F5: `checkUnknownProps: true` (`tsconfig.json:21-23`, re-checked) rejects stale props in `src` and `demo` | stale emits, object-spread keys and attrs on renderless roots stay unseen (F-70) |
| 14 | "The engine is reachable" | L04-F02 (F-07) | R2-01-01: `AllowRemoteAutomation` false since 2026-09-17 18:51:49 (re-read with `plutil`) | L04-F02 stands on the false ~249-guard basis (8); the gate becomes an owner step 0 |

R2-07-12 bounds the root-closure consequence (production bundles shake it to the subpath cost) and refutes no round-1 claim, since none claimed payload.

### Re-check log

These probes re-opened the cited lines, or re-ran the measurement, at `1c1f1f67`. Every probe was read-only. The only file written is this one.

| finding(s) | sev | probe | result |
|---|---|---|---|
| L02-F01, L01b-65 | BLOCKER | `sed -n 160,176p tests/gates/gate-register.test.ts` | `bound).toBe(13)`, `unbound).toBe(45)`: CONFIRMED |
| L03b-01, L15b-07 | BLOCKER | `sheet/styles.css:28-33`, `glass/ladder.css:118-138`, `SheetContent.vue:96-106,284` | both rules sit in `@layer components`; `.glass-floating` (0,1,0) sets `position: relative` over the `:where()` `fixed`; SheetContent carries no `fixed` utility: CONFIRMED |
| L15a-F4 | BLOCKER | consumer `package.json` reads (read-only) | value.js `:88` `^7.0.0`, keyframes.js `:78` `7.0.0`: CONFIRMED |
| L03b-02, L15b-05 | HIGH | `worm.ts:125-140`, `PagerDots.vue:439`, `sizing.css:122` | `parseFloat(".75rem")` gives 0.75: CONFIRMED |
| L03b-03 | HIGH | `dock/styles/run.css:468` | `--dock-cap-rest: 50%`: CONFIRMED (source); the ellipse is the per-axis resolution of 50% |
| L07-01 | HIGH | `useWebGPUCanvas.ts:99,126,380-392` | shared device, per-instance `dev.lost.then`: CONFIRMED (source) |
| L07-02 | HIGH | `GlassDock.vue:80-86,114-136`, `useGlassBackdropLuminance.ts:208-216` | the default `backdropMode: "live"` always passes a getter, and `wantsLiveLoop()` returns true for any non-null option: CONFIRMED |
| L03a-03 | HIGH | `grep -rn -e '--glass-fill-tinted' src` | declared only at `tokens/glass.css:203`: CONFIRMED |
| L03a-04 | HIGH | `chipVariants.ts:5-44` | plain `joinClassValues` over `SIZE` then `SHAPE.icon`: CONFIRMED (mechanism) |
| L05a-01, L10-02 | HIGH | `aurora-mediums.wgsl.ts:385-404` | ids 3/5/6/7 all return `mediumKuwahara`: CONFIRMED |
| L08-01, L03b-07 | HIGH | reka `ComboboxContentImpl.js:136-146`, `CommandList.vue:25-40` | `useHideOthers` is unconditional: CONFIRMED |
| L08-05 | HIGH | `useDockRun.ts:66-75`, `SidebarDock.vue:119,161`, `BottomDock.vue:154,222` | seats = `run.children`, and the shell wraps seats in `div.contents[role=group]`: CONFIRMED |
| L14-03 | HIGH | `pi-manifest.ts:64-106` getters, `tsconfig.json:24` | no `substrate` getter; `tests-visual` not included: CONFIRMED |
| L14-02 | HIGH | `tests-visual/playwright.config.ts:130-133` | the webkit project `testMatch` names two other specs: CONFIRMED |
| L09-01 | HIGH | `README.md:19,21,33,140` vs `package.json` exports | `./forms` and `./instrument-chassis` absent: CONFIRMED |
| L09-02 | HIGH | `README.md:56-60`, `grep glass-opacity src` | 0 hits; README teaches 7 px, src ships 16 px: CONFIRMED |
| L09-03 | HIGH | import-closure walk from `dist/glass-ui.js` (75 files) | reaches `@vueuse/core` and `@mkbabb/keyframes.js`: CONFIRMED |
| L10-05 | HIGH | `tokens/light-dark.css:60-82`; `package.json` scripts | the lockstep claim cites `proof:glass` DA1; 0 `proof:*` scripts: CONFIRMED |
| L04-F02 | HIGH | `grep -rho "@supports[^{]*color-mix" dist \| wc -l` | 8: CONFIRMED |
| L05b-03 | HIGH | `useDockSearch.ts:5-10` | the "NEVER auto-collapses on a passive scroll" text: CONFIRMED |
| L05a-02 | HIGH | `git log --since=2026-07-28 -- src/components/blob` | 3 commits: layer move, docs, export purge: CONFIRMED |
| L05a-04 | HIGH | meta grep over `dist/**/*.d.ts` | 12 files: CONFIRMED (the lens counts hits, not files) |
| L06-02 | HIGH | `scaena/apps/web/package.json:13`; fork worktree `git status` | vendored 8.0.3 tgz; 25 dirty entries: CONFIRMED |
| L13-03 | HIGH | `grep useDockCtaReceive src/**/index.ts` | `motion/index.ts:55` and `dock/index.ts:82-86`: CONFIRMED |
| L09-08 | HIGH | `MIGRATION.md` size, gzip vs packed estimate | 349 KB raw, about 119 KB gz of about 1.1 MB: CONFIRMED (approximate) |
| L01a-22 | HIGH | `_shared/field/control.css:70-82`, `on-glass-fg.css:37` | "OPAQUE at HEAD ... backdrop-filter below is currently inert": CONFIRMED |
| L05a-05 | MED | `tokens/glass.css:66-75` vs `git show 99706211` | 10/14/16/20/22 vs 1/7/7/11/11: CONFIRMED |
| L11-03 | MED | `scheme-motion.css:206-214`, `TooltipContent.vue:62`, `PopoverContent.vue:127` | 120 < 130 < 140: CONFIRMED |
| L06-04 | MED | `Button.vue:131` vs `dist/button-*.js` | 0 `console.warn`, no retired-prop text in dist: CONFIRMED |
| L07-07 | MED | `dist/styles/fonts.css`, `find dist -name '*.woff2'` | base64 woff2 plus 4 files: CONFIRMED |
| L03a-10 vs L03b-08 | MED | `useScrollChrome.ts:168-222` | position anchor plus velocity-driven ticks; the lenses describe two halves of one mechanism: CONFIRMED, merged |
| L04-F10 vs L01b-49b | MED/LOW | `useKeyboardShortcuts.ts:176-182,290-300,351`; reka `SliderImpl.js:30-45` | bubble order plus `defaultPrevented`: L04-F10 REJECTED; L01b-49b CONFIRMED |
| L06-10 | LOW | `Object.keys(exports).length` | 68 at HEAD, not 70: figure corrected, substance stands |
| L11-12 | HIGH | `INBOUND.md` at `1c1f1f67` | now 7 rows (O-53..O-58, O-60), but the ten lost letters and the 27 accreted rows are still absent: stands |

Held as PLAUSIBLE until a Safari cell exists: L15b-14 (iOS focus zoom on 14 px field type), in family F-29. Every paint number in round 1 is Chromium unless its row says otherwise (D-4).

### Round 2 re-check log

These probes re-opened the cited lines, re-ran the computation, or re-read the seat's evidence file at `6433284a`. Every probe was read-only, and the only file written is this one. They cover all 4 round-2 BLOCKERs, the round-2 HIGH rows whose claim rests on source or on a computation, and every refutation above.

| finding(s) | sev | probe | result |
|---|---|---|---|
| R2-01-03, R2-04-20, R2-08-14 | BLOCKER | `sheet/styles.css:28-33` vs `glass/ladder.css` | `:where([data-slot="sheet-content"]) { position: fixed }` still loses to `.glass-floating`'s `position: relative` in the same layer: CONFIRMED |
| R2-05-F9 | BLOCKER | `gate-register.test.ts:172-174` | bound 13, armOnly 2, unbound 45: CONFIRMED |
| R2-01-01 | HIGH | `plutil -p ~/Library/WebDriver/com.apple.Safari.plist`; process list | `AllowRemoteAutomation => false`, mtime 2026-09-17 18:51:49; no safaridriver running: CONFIRMED |
| R2-02-01 | HIGH | `dockMorphMeasure.ts:82-101,132`; `layers.css:233-236`; `GlassDock.vue:195,218` | the inactive layer is `absolute; inset: 0`, the capture is registered before the orchestrator, and `expandedPx \|\| chrome + fullSize` falls back to the root size: CONFIRMED (source) |
| R2-02-02 | HIGH | `layers.css:116-118`; `shape.css:103-138` | one-axis box `scale` with per-layer counter-scale about the layer centre: CONFIRMED (source) |
| R2-02-04 | HIGH | `run.css:353-367`; `controls/icon-button.css:26,60-71` | same `@layer components`, higher specificity, `transition: inline-size …` replaces the control's list: CONFIRMED |
| R2-03-01 | HIGH | `glass-capsule.css:148-151,165-167` | the clip reaches every capsule inside `.glass-dock`; the docblock excludes only capsules outside one: CONFIRMED |
| R2-03-03 | HIGH | `crossfade.css:30-60` | active face in flow at `max-content`, leaving face `absolute; inset: 0`: CONFIRMED |
| R2-03-07 | HIGH | `git diff --stat v7.0.0..v10.0.1 -- src/components/blob` | 6 files, +108/−110: CONFIRMED |
| R2-04-01 | HIGH | `DialogContent.vue:133-141`; reka `FocusScope.js:57-67`; the unit row | `flush: "sync"` handoff; `handleFocusIn` re-focuses, `handleFocusOut` returns on `relatedTarget === null`; the unit row asserts only `toHaveBeenCalled`: CONFIRMED (source) |
| R2-04-05 | HIGH | `useDragMorph` origin line; the fork worktree's status | `dragOrigin.value = ensureSpring().value`; `.worktrees/glass-ui-segmented-tabs-8.0.2` at `e73ec80c`, 25 entries: CONFIRMED |
| R2-04-12 | HIGH | `class-names.ts:156-164` | `padding-x`, `padding-y` and `padding` are separate buckets: CONFIRMED |
| R2-04-14 | HIGH | `frameLoop.ts:189-194`; `usePointerVelocityField.ts:243-247,396-401`; `node` re-simulation from an offset of 100 | 17 ms → 88.9, 100 ms → −285.5, 250 ms → −2,309.6, 1 s → −38,453.1: CONFIRMED |
| R2-04-16, R2-09-03 | HIGH | `GlassDock.vue:116-134`; `useGlassBackdropLuminance.ts:209-217` | always a getter; `wantsLiveLoop` is true for any non-null canvas option: CONFIRMED (source) |
| R2-05-F1, R2-05-F2 | HIGH | `captures/R2-05/probes*.results.jsonl`, `census3-rows.json`; `grep -l setContent tests` | 85 probes, 42 bite, 43 survive; 2,031 rows, 356 paint claims (200 source-text, 96 model, 60 happy-dom), 5 real-engine rows; engine lane in 2 of 239 files: CONFIRMED |
| R2-05-F5 | HIGH | `tsconfig.json:21-23`; `captures/R2-05/sweep2-out.json` | `checkUnknownProps: true`; 348 bindings (219 fallthrough, 82 declared props, 28 declared emits, 19 native events): CONFIRMED |
| R2-07-01 | HIGH | `src/styles/theme/bridges.css:28-29`; dist | `--text-sm: initial; --text-xs: initial;` in both: CONFIRMED |
| R2-07-02 | HIGH | `Chip.vue:24`; `dist/components/chip/Chip.vue.d.ts:11`; dist grep | the only `DefineSetupFnComponent<Record<string, any>` in dist: CONFIRMED |
| R2-07-03 | HIGH | `btn.css:95-99`; tail of `dist/styles/index.css` | `@utility sheet-animate` applies fade-in; `@source "../*.js"`: CONFIRMED |
| R2-07-04 | HIGH | `grep verify:package .github/workflows` | `release.yml:52` only: CONFIRMED |
| R2-07-10 | HIGH | `ci.yml:46`; BK `FINAL.md:149,192`; `captures/R2-07/ci/failed-classes.txt` | `PI_ANGLE: swiftshader`; BK records 6 intermittent deaths; 17 are banked for 08-24 → 09-23. The 42/132 total rests on the seat's run logs: CONFIRMED in part |
| R2-07-11 | HIGH | `MIGRATION.md:2675`; `grep showClose src`; `package.json` exports | `:show-close="false"` prescribed, no dialog has it; the six named keys are absent: CONFIRMED |
| R2-08-01 | HIGH | `Aurora.vue:255,338-341`; `AppShell.vue:229` | the a11y ceiling is read first and set to 1 under PRT; the shell passes 0.5: CONFIRMED (source) |
| R2-08-02 | HIGH | `sizing.css:207`; `dark-arm.css:278` | active bg is the floating plate; veil ink `oklch(0.17 0.03 70)`: CONFIRMED (source) |
| R2-08-03 | HIGH | `slider/styles.css:178-180,342-355`; the shared forced-colors focus list | ring is a track `box-shadow`; no slider entry: CONFIRMED (source) |
| R2-08-06 | HIGH | `configurator/styles.css:283-289` | the aside takes the `1fr` remainder: CONFIRMED (source) |
| R2-09-01, R2-09-02 | HIGH | `grep -rn 'useRAFLoop(' src`; `backdropLuminanceSample.ts:52,154,165,194` | one caller (`useGlassBackdropLuminance.ts:330`); `drawImage` then `getImageData`; `FIELD_ALPHA_FLOOR = 0.02`: CONFIRMED (source) |
| R2-02-08, R2-02-09, R2-02-10, R2-02-16 | MED/LOW | `DarkModeToggle.vue:17-20`, `useGlobalDark.ts:92-96`; `scheme-spring.css:59-64`; `SheetContent.vue:120-124,150-158`; `createCanvasLifecycle.ts:266-270` | default `disableTransitions: false`; every token ends `97.959%, 1)`; unclamped panel translate; `startTime = performance.now() - 1000`: CONFIRMED |
| R2-03-06, R2-03-09, R2-04-03, R2-04-17, R2-04-19 | MED/LOW | `useBlobMood.ts:106,173`, `Blob.vue:258-259`; `toggle-group/styles.css:67-70`; `sheet/styles.css:89-91`; `layers.css:238`; `grep -rn collisionPadding src` | CONFIRMED, except R2-04-19: `SelectContent.vue:56` passes 16, so "no glass overlay" is NARROWED to Tooltip, Popover and DropdownMenu |
| R2-08-05, R2-08-07, R2-09-08 | MED | `useDeckSnap.ts:143`; `grep -rn story-nested-body`; `useGlobalDark.ts:166-175` | explicit `"smooth"` default; one site (`StoryPage.vue:81`), no style; unguarded immediate watcher: CONFIRMED |

HIGH rows not re-run here, because their claim is a paint, trace or corpus measurement and the browser seat stays with the capture seats (P-8): R2-01-05, R2-01-06, R2-01-10, R2-02-03, R2-03-04, R2-03-11, R2-04-09, R2-04-10, R2-04-11, R2-04-15, R2-05-F4, R2-06-01, R2-06-05, R2-08-11, R2-08-13, R2-09-04, R2-09-07. Each cites a capture, trace or table under `captures/R2-0x/` or in its report. None of them carries a refutation.

## 3. Convergence map

Recomputed after round 2 from each family's Lenses line. A round-2 seat counts as a lens.

### Saturated: 3 or more lenses (53)

Point no new discovery seat at these.

| id | family | lenses | n |
|---|---|---|---|
| F-63 | Docs not derived from the source of record | 11: L01a, L01b, L03a, L04, L05b, L06, L09, L11, L13, L15a, R2-06 | 21 |
| F-12 | Close records say what the tree does not | 9: L01a, L01b, L04, L05a, L05b, L06, L08, L09, R2-06 | 20 |
| F-21 | Component declarations lose the cascade to the library's own shared rules | 9: L03b, L04, L06, L15b, R2-01, R2-02, R2-04, R2-06, R2-08 | 14 |
| F-62 | Meta and provenance re-accreted | 8: L01a, L05a, L05b, L06, L09, L10, L14, R2-07 | 11 |
| F-68 | Consumers pinned majors back; cures cannot land | 8: L01b, L05b, L06, L10, L11, L15a, R2-03, R2-07 | 16 |
| F-01 | The gate register counts seat names, not executables that can go red | 7: L01a, L01b, L02, L05a, L09, L13, R2-05 | 16 |
| F-16 | The dock extent morph is discontinuous; fission is split-brain | 7: L01b, L03b, L04, L05b, R2-02, R2-03, R2-08 | 13 |
| F-47 | The WebGPU primary does less than the fallback arm | 7: L01b, L04, L05a, L05b, L10, R2-06, R2-09 | 7 |
| F-18 | Dock plate geometry and state residue | 6: L01b, L03b, L05b, R2-01, R2-02, R2-03 | 7 |
| F-55 | The colocation chronic: settlement decided, never landed | 6: L01b, L04, L05b, L12, L13, L14 | 7 |
| F-66 | Published surface with no consumer | 6: L05a, L06, L10, L13, R2-01, R2-06 | 9 |
| F-70 | Stale bindings no-op silently (E-11): untyped fallthrough, unwitnessed emits, erased declarations | 6: L13, L15a, R2-02, R2-03, R2-05, R2-07 | 7 |
| F-02 | Detectors narrower than the claim they carry | 5: L02, L05a, L09, R2-05, R2-06 | 12 |
| F-04 | The visual suite never entered CI, and the discharge was redefined | 5: L01a, L01b, L02, L05b, L14 | 6 |
| F-07 | Safari cells deferred behind an environment excuse | 5: L01a, L04, L08, L10, R2-01 | 8 |
| F-09 | Latches and disclosures standing in for cures | 5: L01a, L01b, L02, L04, R2-05 | 7 |
| F-13 | Rulings owed above an implement seat | 5: L01a, L01b, L04, L05a, L06 | 13 |
| F-23 | Ink calibrated to the token ground, not the painted composite | 5: L03a, L03b, L08, R2-01, R2-08 | 9 |
| F-29 | Density: pads transpose under the width query, corners do not | 5: L03a, L08, L15b, R2-01, R2-08 | 15 |
| F-48 | Greenfields stopped at W0 | 5: L01b, L05a, L05b, R2-03, R2-06 | 6 |
| F-71 | Inbound mail never carried or answered | 5: L05a, L11, L15a, R2-03, R2-06 | 15 |
| F-08 | The WebGPU primary is never paint-gated | 4: L02, L03b, L04, R2-07 | 4 |
| F-10 | Budget ratchets as literal pins, unwired | 4: L02, L07, L14, R2-07 | 5 |
| F-11 | Routing-chain drops | 4: L01a, L01b, L04, L05a | 10 |
| F-43 | Browser Back has no transition; the router seam is unowned | 4: L01a, L04, L05a, R2-02 | 4 |
| F-46 | Scroll chrome follows the velocity path, not position | 4: L03a, L03b, R2-02, R2-06 | 4 |
| F-50 | Idle loops and the luma sampler's blocking readback | 4: L07, R2-03, R2-04, R2-09 | 7 |
| F-64 | Token hygiene | 4: L01a, L01b, L05a, L10 | 11 |
| F-67 | Published claims not asserted on the built artefact | 4: L06, L09, R2-07, R2-09 | 11 |
| F-05 | Visual harness rot | 3: L01b, L09, L14 | 6 |
| F-14 | Owner asks laundered through governance waves | 3: L05a, L05b, R2-06 | 11 |
| F-15 | Owner asks reinterpreted or in conflict, unreconciled | 3: L05a, L05b, R2-06 | 5 |
| F-20 | Demo shell chrome at the phone cell | 3: L03a, L03b, R2-08 | 4 |
| F-24 | Dark and reduced-transparency arms missing on decorations, fields, state and emphasis | 3: L03a, L03b, R2-08 | 4 |
| F-30 | Radius role: the off-role 12 px rung (a); multi-line holders on the stadium (b) | 3: L01a, R2-03, R2-04 | 3 |
| F-32 | Sheet detents: the dock covers the live-behind sheet's action | 3: L01a, R2-01, R2-04 | 3 |
| F-33 | Specimens lay out by viewport, not by container | 3: L03a, L03b, R2-08 | 8 |
| F-34 | Demo remainder rows unbuilt | 3: L01b, L05a, R2-08 | 4 |
| F-36 | The pager worm reads a rem as px | 3: L03b, L15b, R2-01 | 3 |
| F-39 | Two focus-ring registers; forced colors | 3: L08, L10, R2-08 | 4 |
| F-40 | One widget, two focus models | 3: L01a, L04, L08 | 3 |
| F-41 | Toast placement and double announcement | 3: L01a, L03b, L08 | 3 |
| F-42 | Small naming and keyboard seams | 3: L08, R2-04, R2-08 | 8 |
| F-44 | Motion time off the one authority: integrators, dt policies, emitted tails, the canvas clock | 3: L10, R2-02, R2-04 | 5 |
| F-45 | Non-composited motion at idle | 3: L05a, L07, R2-09 | 4 |
| F-49 | Device-loss subscription per instance on the shared device | 3: L07, R2-01, R2-04 | 3 |
| F-51 | Synchronous costs on the mount path | 3: L07, R2-02, R2-04 | 6 |
| F-52 | Payload does not shake | 3: L07, R2-04, R2-07 | 4 |
| F-53 | Perf and boot chronics never started | 3: L01b, L05b, R2-09 | 6 |
| F-56 | Component-owned code in global zones | 3: L05a, L12, L13 | 8 |
| F-58 | One symbol, two doors | 3: L10, L12, L13 | 7 |
| F-61 | Repo weight and evidence hygiene | 3: L01b, L09, L14 | 4 |
| F-65 | Twin sources of record | 3: L10, R2-04, R2-08 | 5 |

### Two lenses (19)

F-03 (L12+L13), F-06 (L01a+L01b), F-17 (L05b+R2-04), F-19 (L08+R2-04), F-22 (L11+R2-04), F-25 (L03a+L03b), F-26 (L03a+R2-04), F-27 (L03a+R2-04), F-28 (L01a+L04), F-31 (L01a+L05a), F-35 (L03a+L07), F-37 (L03b+L08), F-38 (L08+R2-04), F-54 (L05b+R2-04), F-57 (L12+L13), F-59 (L01a+L12), F-60 (L13+L14), F-69 (L06+R2-04), F-72 (L15a+R2-04).

Of these, 10 have no round-2 member: F-03, F-06, F-25, F-28, F-31, F-35, F-37, F-57, F-59, F-60.

### Single lens (3)

F-73 (R2-02), F-74 (R2-02) and F-75 (R2-08) are round 2's three new families. Each rests on one seat's capture, with its source re-checked here (§2). Round 3 crosses all three: R3-01 measures motion beside F-73 and F-74, and R3-02 runs the reduced-transparency cell on overlays and controls beside F-75.

### Remaining coverage gaps (after round 2)

- Safari. 0 cells banked in either round (§6.7). Every Safari claim is open (D-4), including L15b-14, the iOS field zoom, held PLAUSIBLE.
- Motion outside the dock and the overlays. R2-02 strip-measured the dock, the overlays, route and popstate, the theme flip and the spring tails. Not measured: accordion and collapsible, carousel, the pager worm in motion, toast, typewriter, countup, handmark, tab panel switches, configurator panes, the deck, the liquid entrance, scroll reveal and scroll glide, and the owner rows that name them (N-8d, N-10a, BDM A3 and D-entrance, BDF B3-B2 and B3-C3, BDU R11 and R56). Round 3: R3-01.
- Interaction states under preferences. R2-08 measured the accessibility cells mostly at rest. Open overlays and hover, press, drag, focus, dismiss, disabled and invalid states in PRT, forced colors, `prefers-contrast: more` and dark are thin, and no seat read the accessibility tree. Round 3: R3-02.
- The demo's first half in the accessibility cells. R2-08 took the second half and the shell.
- Assistive tech. No real screen reader and no Windows high contrast; forced colors is emulated.
- Consumers. SSR hydration beyond R2-09-08's throw; webpack, rspack and esbuild builds; bindings made through `h()` or `<component :is>` outside templates; the other constellation consumers beyond value.js, keyframes.js and fourier; paint of any consumer build.
- GPU. No real low-end GPU (SwiftShader and a 6× CPU throttle are proxies), and no WebGPU readback on WebKit.
- Untouched families. 21 families have no round-2 member. The saturated ones need no seat (F-04, F-05, F-11, F-13, F-40, F-41, F-55, F-56, F-58, F-61, F-64). The two-lens ones listed above have had no second pass since round 1; F-31 and F-37 are HIGH.
- Evidence custody. Round-2 captures are git-ignored (`captures/.gitignore`) and live on one disk, and R2-05's report and roster exist only in the workflow return (§6.8). A capture a BL row cites has to outlive that disk (P-2).
- Not a finding: an untracked `.vite-temp` symlink sits at the repo root, left by the D1-C design seat.

## 4. Round-2 proposal (as proposed; §6.1 maps it to the seats that ran)

Ten seats, weighted toward the gaps above and toward adversarial re-checks of single-lens families. Round 1 used 19 of the charter's 32 audit seats; these ten bring the total to 29 and leave 3 for a convergence re-check. Browser-owning seats run serially (P-8): R2-01, R2-02, R2-03, R2-06, R2-09 and R2-10 share one browser seat in sequence.

| id | target | charter |
|---|---|---|
| R2-01 | F-07; the Safari half of F-21, F-36, F-49, F-29 | Real-Safari cell battery. One serialized browser seat (P-8) on real Safari 26.x through safaridriver, not Playwright WebKit. Bank every owed Safari cell in F-07, plus the Safari cell of each BLOCKER and HIGH paint family: sheet position and corners, the pager worm neck, the route-cycle leak (L07-01), nested color-mix, contrast-color arms, and the 14 px field focus zoom (L15b-14). Observe by screenshot and computed style only, and never call getContext() on a live canvas. Every cell writes a paired Chrome/Safari artefact to disk. |
| R2-02 | F-16, F-43, F-44, F-45, F-46; O-60; N-8; N-10 | Motion over time, frame by frame. Re-measure all 33 O-60 rows at HEAD, since they were captured on 7.0.0. Then extend to every animation the demo ships: the dock morph, sheet and dialog open and close, route and popstate, pane and card transitions (N-8), the Select slide, the dark-mode swap, and spring final frames. Take frame strips at 60 and 120 Hz in both modes. Output one row per animation, placed in its family or filed as a new row with the strip on disk. |
| R2-03 | O-56 G-1..G-4 and R-5; O-58/N-9 (F-30); F-18; F-48 | The owner docket at HEAD. Mount the surfaces the owner named against HEAD bytes in a scratch harness, the way L15b did for chicago, and stay read-only on sibling trees. The surfaces are the value.js login and @user pills, the picker hero blob, the keyframes.js preset tiles and the black atmosphere at rest. Capture each docket row and rule it a HEAD defect, a pin-only defect or consumer-side. Answer R-5 with the landing version BL implies. |
| R2-04 | every single-lens family in section 3, led by F-38, F-22, F-32, F-30, F-69, F-51, F-52, F-65 | Adversarial re-check of the single-lens families. For each one, try to refute it with a method different from the finder's: paint where the finder read source, source where it read paint. Record the probe. A refuted finding joins the reject list. A confirmed one gets a born-RED test sketch and a capture. The source-confirmed rows in section 3 still owe their paint half. |
| R2-05 | F-01, F-02, F-09, F-70; E-11 | Test rows versus gates, and the E-11 binding sweep. Mutation-probe at least 30 unit and vue-tsc rows that stand as evidence for SEALED rows: break the subject in a scratch copy and confirm the test goes red. Census the invoke-only and source-read tests that carry paint claims. Run the reka prop and emit binding sweep over every template in src and demo. Deliver the draft 40-60 invariant roster for W-REGISTER-COLLAPSE, each entry naming the executable and its recorded bite. |
| R2-06 | F-29, F-23, F-24, F-39 | Coarse pointer, reduced motion, reduced transparency, forced colors and dark mode on the surfaces L15b did not reach: carousel, deck, data-table, accordion, alert, slider, switch, and the dock in its expanded and morph states. Use the same D/N/P/T cells as L15b and extend its pad/corner table. Measure dark-α ink on the rendered composite. |
| R2-07 | F-14, F-12, F-13, F-71 | Corpora, row by row. Trace every BC, BD and AY owner ask, N-6..N-10, the 49 PARTIAL census rows and the unmeasured value.js §4a rows to a family, a reject or a new row. Nothing may drop silently (N-3). List each ask that none of the 72 families covers. |
| R2-08 | F-67, F-52, F-10, F-62, F-68; the CI captureScreenshot death in F-08 | Release and packaging on the packed artefact. Run `npm pack`, install into a clean scratch consumer, and assert the root closure, CSS delivery per subpath, the DEV guards, the peers and meta in the dist types. Root-cause the CI captureScreenshot death. Build value.js, keyframes.js and fourier against a HEAD link in scratch, read-only on their trees, to size the W-LANDING migration packet and list every silent no-op binding. |
| R2-09 | F-33, F-34, F-20, F-42 | The demo's second half, the nested family tabs and the chassis. Cover the story routes round 1 did not visit, the nested tabs, the chassis hero and preview cards, and the configurator, at 1440 and 390 in both modes. Mark each defect library or demo, and place it in a family or file a new row. |
| R2-10 | F-50, F-51, F-53, F-45 | GPU and low-end performance. Measure GPU execution time for backdrop stacks (round 1 left it unmeasured, not refuted), use a low-end proxy beyond a 4× CPU throttle, and cover SSR, the dev server, the cold load (O-60 KFA-23) and the luma sampler readback (KFA-74). Every number comes from a trace with an A/B. |

## 5. Inbound that landed during round 1

- O-57: R-1 (fallthrough typing) goes to F-70. R-2 (`.cartoon-cast` reachability) has been met since 8.0.0, when `glass.css:124` began importing `glass-atom.css` (L15a-F5); it is an ANSWER row under F-68.
- O-60 was captured on 7.0.0 and is re-measured at HEAD by R2-02. Provisional homes: the dock-morph cluster (KFA-7/-8/-13/-50..-53/-109..-112/-189/-221/-222) goes to F-16; KFA-23 (the cold-load stall in `useRAFLoop`) to F-51; KFA-74 (the synchronous GPU readback in the dock luma sampler) to F-50; KFA-168 (the `--spring-smooth` final-frame jump) to F-44. KFA-95 (arrow keys handled twice) predates the 10.0.0 `defaultPrevented` guard; see the L04-F10 reject. The remaining rows (KFA-11, -27, -37, -61, -78, -115, -132..-134, -136, -163, -164, -188, -202, -228) are placed by R2-02.
- N-10 has two halves. "Audit every animation and frame by frame" is R2-02. "Route all glass-ui changes to the glass-ui session" goes to F-71.
- Earlier inbound, for completeness. O-53 goes to F-52, O-54 to F-49, O-55 to F-17, and O-58/N-9 to F-30. O-56: G-1 goes to the dock extent family, G-2 provisionally to the radius family, G-3 to F-48, G-4 (the black ground at rest) stays unplaced until R2-03 measures it, and R-5 goes to F-68.
- Round 2 ruled or placed every row above: O-56 and O-58 in §6.5, O-60 in §6.6. O-61 (surface paint containment, the Slider spectrum fill hook, DarkModeToggle's menu-item form) landed during round 2 at `fe5df357` and was traced by R2-06: R-1 goes to F-21 (R2-06-15), R-2 and R-3 to F-71 (N-11b, N-11c).

## 6. Round 2

Read at `6433284a`, with `src` and `demo` byte-identical to the published 10.0.1. The fold is recorded once, in each family's **Round 2** bullet; the Index carries the cumulative `n`, lenses and max.

### 6.1 Seats as run

§4 proposed ten seats. Nine ran, and four ids moved:

| proposed | ran as | lens |
|---|---|---|
| R2-01 | R2-01 | Real-Safari cell battery: the Chromium halves banked, Safari owner-blocked (§6.7) |
| R2-02 | R2-02 | Motion over time, frame by frame; O-60 at HEAD |
| R2-03 | R2-03 | The owner docket at HEAD |
| R2-04 | R2-04 | Adversarial re-check of the single-lens families |
| R2-05 | R2-05 | Test rows against gates, mutation probes, the E-11 sweep, the draft roster |
| R2-06 + R2-09 | R2-08 | Coarse, reduced-motion, reduced-transparency, forced-colors and dark cells, merged with the demo's second half |
| R2-07 | R2-06 | Corpora, row by row |
| R2-08 | R2-07 | Release and packaging on the packed artefact |
| R2-10 | R2-09 | GPU and low-end performance |

Seats used: 19 + 9 = 28 of the charter's 32. Round 3 asks for 2 (§6.10).

### 6.2 Counts

- Findings: **121**. Per severity: BLOCKER 4 · HIGH 45 · MED 56 · LOW 16.
- Relation as the seats claimed it: CONFIRMS 36 · EXTENDS 61 · NEW 20 · REFUTES 4.
- Folded into existing families: **118**. That is every CONFIRMS, EXTENDS and REFUTES row, plus 17 of the 20 seat-NEW rows (16 by a shared mechanism, 1 registered as an ANSWER row; §6.3).
- Genuinely new families minted: **3** (F-73, F-74, F-75), one member each.
- Refuted claims: **14** (§2). None rejects a round-1 finding whole.
- Families touched: 51 of the 72, plus the 3 new ones. 21 have no round-2 member (§3).
- Re-checks at `6433284a`: all 4 BLOCKERs, 32 of the 49 BLOCKER and HIGH rows, and every refutation (§2).

| seat | findings | BLOCKER | HIGH | MED | LOW | CONFIRMS | EXTENDS | NEW | REFUTES |
|---|---|---|---|---|---|---|---|---|---|
| R2-01 | 12 | 1 | 4 | 5 | 2 | 6 | 6 | 0 | 0 |
| R2-02 | 17 | 0 | 4 | 11 | 2 | 3 | 10 | 4 | 0 |
| R2-03 | 11 | 0 | 5 | 5 | 1 | 3 | 6 | 1 | 1 |
| R2-04 | 20 | 1 | 9 | 8 | 2 | 14 | 5 | 1 | 0 |
| R2-05 | 9 | 1 | 4 | 3 | 1 | 3 | 4 | 2 | 0 |
| R2-06 | 15 | 0 | 2 | 10 | 3 | 1 | 8 | 5 | 1 |
| R2-07 | 12 | 0 | 6 | 4 | 2 | 1 | 8 | 2 | 1 |
| R2-08 | 16 | 1 | 6 | 7 | 2 | 4 | 10 | 2 | 0 |
| R2-09 | 9 | 0 | 5 | 3 | 1 | 1 | 4 | 3 | 1 |
| **all** | **121** | **4** | **45** | **56** | **16** | **36** | **61** | **20** | **4** |

### 6.3 The 20 seat-NEW rows

Each was first tested against the registered mechanisms. Three found none and minted a family.

| row | sev | ruling | home | reason |
|---|---|---|---|---|
| R2-02-04 | HIGH | folded | F-21 | a shared context rule replaces the component's own declaration, here `transition` |
| R2-02-08 | MED | **minted** | F-73 | no family covers a theme flip |
| R2-02-10 | MED | **minted** | F-74 | F-21 and F-32 cover the sheet at rest, not the spring's overshoot |
| R2-02-16 | LOW | folded | F-44 | a clock with its own resume policy is one more time policy off the one authority |
| R2-03-08 | LOW | answer | F-71 | no producer mechanism exists; the ANSWER row for O-56 G-4 |
| R2-04-19 | LOW | folded | F-22 | the overlay content seam carries no edge contract, as it carries no host-relative z |
| R2-05-F2 | HIGH | folded | F-02 | a detector that cannot see what its claim names |
| R2-05-F4 | HIGH | folded | F-70 | a disconnected emit no-ops silently (E-11) |
| R2-06-01 | HIGH | folded | F-14 | asks never carried past BI; L05b-06 already names them |
| R2-06-02 | MED | folded | F-14 | as R2-06-01 |
| R2-06-03 | MED | folded | F-14 | as R2-06-01 |
| R2-06-04 | MED | folded | F-48 | the seat's own disposition: one viz interaction contract inside the greenfield waves |
| R2-06-05 | HIGH | folded | F-14 | a coverage statement, not a mechanism; its measured rows are placed by R2-02, and the rest go to R3-01 |
| R2-07-01 | HIGH | folded | F-67 | an undocumented change to the consumer-facing theme surface (L06-03's mechanism) |
| R2-07-02 | HIGH | folded | F-70 | a consumer surface that cannot see a stale binding |
| R2-08-01 | HIGH | **minted** | F-75 | an arm that inverts its own preference; F-23 derives ink and does not govern the field |
| R2-08-07 | MED | folded | F-33 | cel placement; the unstyled nested seam is a sub-cause |
| R2-09-02 | HIGH | folded | F-47 | the primary lacks a capability the fallback has |
| R2-09-06 | MED | folded | F-53 | placed by the seat; the perf chronic was never begun |
| R2-09-08 | MED | folded | F-67 | a capability the source advertises and the artefact fails |

### 6.4 New families

- **F-73** (band F, MED). The theme flip is not atomic: the library's own toggle leaves 37 colour transitions running on 120-300 ms clocks while plates and h1 ink flip in one frame.
- **F-74** (band F, MED). Spring overshoot detaches an edge-anchored sheet: the panel spring's unclamped translate, with no bleed, opens a 16.2 px (right) and 18.8 px (bottom) gap at the anchored edge.
- **F-75** (band E, HIGH). The reduced-transparency arm lifts the field it should recede: `--aurora-ceiling-a11y: 1` overrides every consumer ceiling (0.5-0.6), so page muted text falls from 4.26-4.51:1 to 3.56-3.89:1 on 12/12 routes.

### 6.5 Owner docket at HEAD

| row | ruling | evidence | home |
|---|---|---|---|
| O-56 G-1 | HEAD-DEFECT | DockCrossfade resizes the box in one frame (246.9 px, identical at 7.0.0 and HEAD; R2-03-03), and the first expand holds from a poisoned endpoint (R2-02-01) | F-16 |
| O-56 G-2 | HEAD-DEFECT and CONSUMER-SIDE | producer: the dock's `background-clip: content-box` reaches every filled capsule inside a dock (R2-03-01); consumer: value.js binds `variant`, removed since 7.0.0, on 49 Button tags (R2-03-02) | F-18; F-70 |
| O-56 G-3, look | HEAD-DEFECT | the same matte shaded sphere with fused nubs at 7.0.0 and HEAD; no satellite detaches (R2-03-07) | F-48 |
| O-56 G-3, animation | CONSUMER-SIDE | value.js HeroBlob parks the blob by wall clock; the producer's settle seam under a manual mood is real (R2-03-05, R2-03-06) | ANSWER in F-71; seam in F-50 |
| O-56 G-4 | not a producer defect | maroon, never black, at both versions and both arms (R2-03-08, re-derived at HEAD) | ANSWER in F-71; back to value.js's bisect |
| O-56 R-5 | 11.0.0 | no docket row is PIN-ONLY, so the landing version is the BL cut; fourier's `^8` needs an explicit repin (R2-03-11) | F-68 |
| O-58 / N-9 | HEAD-DEFECT | `.toggle-group__item` on `--radius-pill` pins two-line tiles to 9999px at 7.0.0 and HEAD (R2-03-09) | F-30b, LOW → MED |

### 6.6 O-60 at HEAD

R2-02 re-measured the 33 rows, which were captured on 7.0.0. R2-09 corrected two of its rulings (KFA-23 and KFA-74 reproduce, as one defect).

| state | n | KFA rows |
|---|---|---|
| LIVE | 13 | 7, 8, 13, 23, 50, 53, 74, 110, 115, 132, 133, 163, 168 |
| CURED | 12 | 11, 27, 37, 51, 52, 78, 109, 111, 188 (in part), 202, 221, 222 |
| CONSUMER-SIDE | 5 | 61, 95, 134, 136, 228 |
| not reproduced or reframed | 3 | 112; 164 (in part); 189 (folds into 7 and 13) |

The cures landed in `964535cb`, `1bc09dde`, `74dfab18`, `6cad2b7e`, `9d8cd728` and `650297da`. Homes of the LIVE rows: 7, 8, 13, 50, 53 and 110 in F-16; 163 in F-21; 132 and 168 in F-44; 115 in F-73; 133 in F-47 (provisional); 23 and 74 in F-50. The reproduced part of 164 is in F-51.

### 6.7 Safari

OWNER-BLOCKED. `~/Library/WebDriver/com.apple.Safari.plist` reads `AllowRemoteAutomation => false`, unchanged since 2026-09-17 18:51:49 (re-read at fold time). Desktop Safari 26.4 refuses the session with "You must enable 'Allow remote automation'". The iOS simulator session timed out on its own Remote Automation toggle. Round 2 banked 0 Safari cells; R2-01 banked the Chromium half of each.

The owner steps are two checkboxes: Safari ▸ Settings ▸ Developer ▸ Allow Remote Automation, and in the simulator, Settings ▸ Safari ▸ Advanced ▸ Remote Automation. Then R2-01's battery (`captures/R2-01/battery/`, 34 cells) runs as `safaridriver -p 4444 & node run-safari.mjs <out>`, with `IOS=1` for the simulator cells. It has never run against a live session. W-SAFARI-BAND's step 0 reads the pref before dispatch (F-07).

### 6.8 Draft invariant gate roster

R2-05-F9 drafted a 50-entry invariant roster for W-REGISTER-COLLAPSE, each entry naming its executable and its recorded bite. It exists only in the workflow's structured return for R2-05: no R2-05 report and no roster file are on disk. It has to be rendered to a tracked file before W-REGISTER-COLLAPSE cites it. Known gaps in the draft:

- Its band-E entries need a `tests/_support` engine helper that does not exist yet.
- G-05's ceilings and G-46's file format are left to the wave.
- G-32 and G-47..G-50 carry L02's static reading, with no bite recorded.

### 6.9 Stability

Round 2 minted **3** genuinely new families: F-73, F-74 and F-75, each with one member and one lens. Two came from the motion lens (R2-02) and one from the preference-cells lens (R2-08). The other 17 seat-NEW rows shared a registered mechanism and were folded. The corpora, packaging, docket, re-check, test and GPU seats minted none.

The registry is not stable. Both lenses that measured behaviour over time or under a preference found a mechanism no round-1 lens had seen, and both left surfaces unmeasured (§3).

### 6.10 Round 3 proposal

Two fresh, independent lenses, aimed at the two areas that minted in round 2 and at the surfaces those seats did not reach. Both hold one browser seat in sequence (P-8), observe by screenshot, computed style and CDP only, and never call `getContext()` on a live canvas. Each defect is placed by mechanism in a registered family or filed NEW with its capture on disk.

| id | target | charter |
|---|---|---|
| R3-01 | Motion outside the dock and the overlays: the F-73, F-74, F-44, F-46 and F-51 neighbourhoods; N-8d, N-10a, BDM A3 and D-entrance, BDF B3-B2 and B3-C3, BDU R11 and R56 | Motion over time, the remainder. Frame-strip every animation R2-02 did not: accordion and collapsible, carousel paging and drag, the pager worm in motion, toast enter and exit, typewriter, countup, handmark, tab panel switches, configurator panes, the deck, the liquid entrance (`glass/liquid-enter.css`), scroll reveal and scroll glide. Use a per-rAF logger with a CDP screencast at 60 and 120 Hz, in light and dark, and under reduced motion (record what still moves and what snaps). Measure the owner rows named in the target. Do not re-strip what R2-02 banked. |
| R3-02 | Interaction and preference states on overlays and controls: the F-24, F-37..F-42 and F-75 neighbourhoods; the demo's first half in the accessibility cells | Interaction states under preferences. For each overlay (Dialog, Sheet, Popover, Tooltip, DropdownMenu, ContextMenu, Select, Command, Toast) and each control family (Button, Toggle, ToggleGroup, Switch, Checkbox, Radio, Slider, Input, Tabs, the dock controls), drive hover, press, drag, focus, open, dismiss, disabled and invalid states in the cells D, P, dark, reduced motion, reduced transparency, forced colors and `prefers-contrast: more`. Record painted separation and focus visibility per state, and read the CDP accessibility tree (`Accessibility.getFullAXTree`) per state as the assistive-tech proxy: names, roles, states, hidden subtrees. Also cover the demo's first-half routes in reduced transparency, forced colors and contrast-more, which R2-08 did not. Runs after R3-01. |

After round 3, 30 of 32 seats are used. If round 3 mints no family, the family set is closed for BL formation and the last 2 seats go to a convergence re-check of F-73..F-75 and whatever round 3 extended. If it mints any, the same test repeats with at most 2 seats aimed where it minted.
