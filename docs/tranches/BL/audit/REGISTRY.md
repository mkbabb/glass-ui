# BL—audit registry, round 1

Seat: REGISTRY. Model `claude-opus-5-5` (asserted from system identity). Read at `1c1f1f67`; every commit since `d29be90e` is docs-only, `src` is byte-identical to the published 10.0.1 (`git diff --stat v10.0.1..HEAD -- src` is empty; last `src` commit `3f9ea884`). Date 2026-09-23.

Inputs: the 19 lens reports under `round-1/`, each read in full; `INBOUND.md` and `PROMPT-RECAP-SEED.md` at HEAD. Three things landed while round 1 ran and are folded here: O-57 (fallthrough typing) and O-60 (the keyframes.js frame-by-frame animation audit, 33 glass rows) in `bf517b61`, and the owner's N-10 ("most of the animations are broken ... audit every animation and frame by frame").

## Counts

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

How to read: each accepted finding sits in exactly one family. A script checked this: 373 assigned, 0 duplicates, 0 unassigned. Families are grouped by the defect mechanism and ordered by band, not by severity. "Lenses" counts distinct reports. "(re-checked)" marks evidence I re-opened at `1c1f1f67`. A disposition is a draft for the ledger: BUILD (its own wave, or a named wave it shares), FOLD (into the named row or wave), or RETIRE (with the rationale stated). Inbound rows name the INBOUND or recap ids the family answers.

## 1. Families

### Index

| id | band | family | n | lenses | max | disposition |
|---|---|---|---|---|---|---|
| F-01 | A | The gate register counts seat names, not executables that can go red | 14 | 6 | BLOCKER | BUILD |
| F-02 | A | Detectors narrower than the claim they carry | 7 | 3 | HIGH | FOLD into W-REGISTER-COLLAPSE |
| F-03 | A | Gate fixtures pinned to a live defect | 2 | 2 | MED | FOLD into W-REGISTER-COLLAPSE |
| F-04 | A | The visual suite never entered CI, and the discharge was redefined | 6 | 5 | HIGH | BUILD |
| F-05 | A | Visual harness rot | 6 | 3 | HIGH | BUILD |
| F-06 | A | Paint evidence routed to the #10 π sink and never captured | 23 | 2 | HIGH | RETIRE the sink as a routing target |
| F-07 | A | Safari cells deferred behind an environment excuse | 5 | 4 | HIGH | BUILD |
| F-08 | A | The WebGPU primary is never paint-gated | 3 | 3 | HIGH | BUILD |
| F-09 | A | Latches and disclosures standing in for cures | 6 | 4 | HIGH | RETIRE the latch form |
| F-10 | A | Budget ratchets as literal pins, unwired | 4 | 3 | MED | BUILD |
| F-11 | B | Routing-chain drops | 10 | 4 | HIGH | FOLD into BL LEDGER formation |
| F-12 | B | Close records say what the tree does not | 19 | 8 | HIGH | FOLD into BL LEDGER formation and the close checklist |
| F-13 | B | Rulings owed above an implement seat | 13 | 5 | MED | BUILD |
| F-14 | B | Owner asks laundered through governance waves | 6 | 2 | HIGH | BUILD |
| F-15 | B | Owner asks reinterpreted or in conflict, unreconciled | 4 | 2 | MED | FOLD into the W-DECIDE band as owner-glance rows |
| F-16 | C | The dock extent morph is discontinuous; fission is split-brain | 6 | 4 | HIGH | BUILD |
| F-17 | C | Compact-on-scroll dropped; the progress rim is unseated | 1 | 1 | HIGH | BUILD |
| F-18 | C | Dock plate geometry and state residue | 3 | 3 | HIGH | BUILD |
| F-19 | C | Dock keyboard and ARIA ownership | 5 | 1 | HIGH | BUILD |
| F-20 | C | Demo shell chrome at the phone cell | 3 | 2 | MED | BUILD |
| F-21 | D | Component geometry loses the cascade to the library's own shared rules | 6 | 4 | BLOCKER | BUILD |
| F-22 | D | Overlay z-ladder inversion | 1 | 1 | MED | BUILD |
| F-23 | D | Ink calibrated to the token ground, not the painted composite | 7 | 3 | HIGH | BUILD |
| F-24 | D | Dark arm missing on decorations, shadows and fields | 3 | 2 | HIGH | BUILD |
| F-25 | D | Preview stills feed OKLCH-scale hues to hsl() | 2 | 2 | MED | BUILD |
| F-26 | D | A composite custom property resolved at :root | 1 | 1 | HIGH | BUILD |
| F-27 | D | Variant classes joined without conflict resolution | 1 | 1 | HIGH | BUILD |
| F-28 | D | The chip defect row never started | 2 | 2 | MED | BUILD |
| F-29 | D | Density: pads transpose under the width query, corners do not | 12 | 3 | HIGH | BUILD |
| F-30 | D | Radius role: multi-line holders on the stadium | 1 | 1 | LOW | BUILD |
| F-31 | D | Frost and the field well | 3 | 2 | HIGH | BUILD |
| F-32 | D | Sheet detents occlude the primary action | 1 | 1 | MED | BUILD |
| F-33 | D | Specimens lay out by viewport, not by container | 5 | 2 | HIGH | BUILD |
| F-34 | D | Demo remainder rows unbuilt | 3 | 2 | MED | BUILD |
| F-35 | D | Brand face delivery | 2 | 2 | MED | BUILD |
| F-36 | D | The pager worm reads a rem as px | 2 | 2 | HIGH | BUILD |
| F-37 | E | Modal primitives mounted inline | 4 | 2 | HIGH | BUILD |
| F-38 | E | Focus handoff at overlay close | 1 | 1 | HIGH | BUILD |
| F-39 | E | Two focus-ring registers; forced colors | 2 | 2 | MED | BUILD |
| F-40 | E | One widget, two focus models | 3 | 3 | MED | BUILD |
| F-41 | E | Toast placement and double announcement | 3 | 3 | MED | BUILD |
| F-42 | E | Small naming and keyboard seams | 6 | 1 | MED | BUILD |
| F-43 | E | Browser Back has no transition; the router seam is unowned | 3 | 3 | MED | BUILD |
| F-44 | F | Spring integrators off the one authority | 2 | 1 | HIGH | BUILD |
| F-45 | F | Non-composited motion at idle | 3 | 2 | HIGH | BUILD |
| F-46 | F | Scroll chrome follows the velocity path, not position | 2 | 2 | MED | BUILD |
| F-47 | G | The WebGPU primary paints less than the WebGL2 fallback | 5 | 5 | HIGH | BUILD |
| F-48 | G | Greenfields stopped at W0 | 4 | 3 | HIGH | BUILD |
| F-49 | G | Device-loss subscription per instance on the shared device | 1 | 1 | HIGH | BUILD |
| F-50 | G | Idle main-thread loops | 2 | 1 | HIGH | BUILD |
| F-51 | G | Synchronous costs on the mount path | 4 | 1 | MED | BUILD |
| F-52 | G | Payload does not shake | 2 | 1 | MED | BUILD |
| F-53 | G | Perf and boot chronics never started | 3 | 2 | MED | BUILD |
| F-54 | G | iOS 27 hallmarks unbuilt | 1 | 1 | MED | FOLD into the design loop's dock and motion portfolio |
| F-55 | H | The colocation chronic: settlement decided, never landed | 7 | 6 | HIGH | BUILD |
| F-56 | H | Component-owned code in global zones | 8 | 3 | HIGH | FOLD into W-COLOCATION |
| F-57 | H | Nesting by file kind; no placement grammar | 3 | 2 | MED | FOLD into W-COLOCATION |
| F-58 | H | One symbol, two doors | 7 | 3 | HIGH | FOLD into W-COLOCATION |
| F-59 | H | Cycles from contracts homed inside one consumer | 3 | 2 | HIGH | FOLD into W-COLOCATION |
| F-60 | H | Periphery structure | 8 | 2 | MED | BUILD |
| F-61 | H | Repo weight and evidence hygiene | 4 | 3 | MED | BUILD |
| F-62 | I | Meta and provenance re-accreted | 10 | 7 | HIGH | BUILD |
| F-63 | I | Docs not derived from the source of record | 20 | 10 | HIGH | BUILD |
| F-64 | I | Token hygiene | 11 | 4 | MED | BUILD |
| F-65 | I | Twin sources of record | 3 | 1 | HIGH | BUILD |
| F-66 | J | Published surface with no consumer | 7 | 4 | MED | FOLD into the P-6 overfitting audit |
| F-67 | J | Published claims not asserted on the built artefact | 4 | 2 | HIGH | BUILD |
| F-68 | J | Consumers pinned majors back; cures cannot land | 13 | 6 | BLOCKER | BUILD |
| F-69 | J | A consumer fork carries unupstreamed fixes | 1 | 1 | HIGH | BUILD |
| F-70 | J | Fallthrough attributes untyped | 2 | 2 | HIGH | BUILD |
| F-71 | J | Inbound mail never carried or answered | 12 | 3 | HIGH | BUILD |
| F-72 | J | The value.js boundary rides an unpublished cure | 1 | 1 | MED | FOLD |

### Band A—Gates and evidence

#### F-01—The gate register counts seat names, not executables that can go red

- **Mechanism**: a seat reads bound when a name matches; the absent count is pinned as a literal, so the register is green over 45 unbound seats and turns red when a gate is bound; 24 of the unbound have live executables under other names, 21 have none.
- **Members (14; 1B / 2H / 7M / 4L)**: L02-F01, L02-F02, L02-F12, L02-F14, L01b-65, L05a-08, L09-12, L01a-31, L01a-04, L01a-08, L01a-15, L01a-16, L01a-38, L13-06.
- **Lenses (6)**: L01a, L01b, L02, L05a, L09, L13. **Max severity**: BLOCKER.
- **Evidence**: `tests/gates/gate-register.test.ts:172-174` pins `seats.bound` 13 and `seats.unbound` 45 (re-checked at `1c1f1f67`); L02-F02 lists the 24 unbound seats with executables under other names.
- **Disposition**: BUILD (the E-8 collapse).
- **Wave shape**: W-REGISTER-COLLAPSE: one roster of 40-60 invariants, each bound to an executable that was seen red once (a recorded bite on the shipped detector); no literal count pins; an unbound seat is RED; component test rows leave the roster, since test rows are not gates.

#### F-02—Detectors narrower than the claim they carry

- **Mechanism**: hygiene and seat detectors scan one spelling, one file or one channel; some self-test bites run a copy of the detector; the seat name promises more than the assertion checks.
- **Members (7; 2H / 3M / 2L)**: L02-F04, L02-F05, L02-F06, L02-F08, L02-F15, L05a-19, L09-19.
- **Lenses (3)**: L02, L05a, L09. **Max severity**: HIGH.
- **Evidence**: L02-F05 `G-GLASS-HAS-FROST` checks prefix pairs only; L05a-19 `backdrop-blur-sm` ×5 in the demo passes `token-hygiene` because the Tailwind spelling is never scanned.
- **Disposition**: FOLD into W-REGISTER-COLLAPSE.
- **Wave shape**: every surviving invariant states its defect class as a set of spellings and runs its bite against the shipped detector; the wall-clock and mtime checks go.

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
- **Lenses (4)**: L01a, L04, L08, L10. **Max severity**: HIGH.
- **Evidence**: `grep -rho "@supports[^{]*color-mix" dist | wc -l` gives 8 (re-checked; the block cites ~249); `color-mix-endpoints.test.ts:13-22` "KNOWN-LIVE, NOT GATED ... pending row-6's Safari π".
- **Disposition**: BUILD.
- **Wave shape**: W-SAFARI-BAND: one serialized real-Safari session (safaridriver, one browser seat, P-8) banks every owed cell; the device-Metal arm retires.

#### F-08—The WebGPU primary is never paint-gated

- **Mechanism**: the pixel-floor harness deletes `navigator.gpu`, headless has no adapter, and the aurora floor catches only near-total black; the CI `captureScreenshot` death has no owner.
- **Members (3; 1H / 2M)**: L02-F09, L03b-11, L04-F18.
- **Lenses (3)**: L02, L03b, L04. **Max severity**: HIGH.
- **Evidence**: `tests-visual/substrate-paints-color.spec.ts:373-395`; `scripts/release.sh:45-50`; `.github/workflows/ci.yml:66-68`.
- **Disposition**: BUILD.
- **Wave shape**: one GPU-backed leg (mac runner, or a `--use-angle=metal` local release leg) for aurora, blob and fourier, with a chroma floor rather than a black floor.

#### F-09—Latches and disclosures standing in for cures

- **Mechanism**: `it.fails` latches pass on any failure, so they cannot see a regression; self-disclosed holes ride three to four releases.
- **Members (6; 2H / 4M)**: L02-F03, L02-F13, L04-F04, L01a-27, L01b-58, L01b-59.
- **Lenses (4)**: L01a, L01b, L02, L04. **Max severity**: HIGH.
- **Evidence**: L02-F03: all 10 `it.fails` live across 3-4 releases; L02-F13: `spring-authority.test.ts:233-247`, `token-hygiene.test.ts:70-80`.
- **Disposition**: RETIRE the latch form (an `it.fails` passes on a new failure as readily as on the old one); each latch's subject FOLDs to its family as a born-RED test.
- **Wave shape**: none of its own.

#### F-10—Budget ratchets as literal pins, unwired

- **Mechanism**: the bundle ratchet is an exact-equality literal rebound 10-11 times; the payload gate is unwired, red at HEAD, and resolves CSS one level deep; runtime-surface exactness covers 6 of 63 subpaths.
- **Members (4; 4M)**: L02-F07, L02-F10, L07-04, L14-09.
- **Lenses (3)**: L02, L07, L14. **Max severity**: MED.
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
- **Lenses (8)**: L01a, L01b, L04, L05a, L05b, L06, L08, L09. **Max severity**: HIGH.
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
- **Lenses (2)**: L05a, L05b. **Max severity**: HIGH.
- **Evidence**: L05b-01: 89 of 261 BI recap rows routed only into declined governance P-waves.
- **Inbound**: N-3.
- **Disposition**: BUILD.
- **Wave shape**: W-RECAP-CARRY: each owner ask maps to a BL family or to a DECLINE that quotes the owner; the seed gains the missing standing edicts.

#### F-15—Owner asks reinterpreted or in conflict, unreconciled

- **Mechanism**: shipped behaviour diverges from the owner's words with no recorded ruling, or two owner asks conflict.
- **Members (4; 2M / 2L)**: L05a-16, L05a-21, L05b-15, L05b-21.
- **Lenses (2)**: L05a, L05b. **Max severity**: MED.
- **Evidence**: L05b-15: AY B.5 "must NOT be baked into the dock" vs N-7/O-55 R-2 (rim in the dock edge); L05a-21: `CHARTER.md:3-4` (no Fable seat) vs `:37,:55-57,:68` (design routed through Fable).
- **Inbound**: N-7, O-55.
- **Disposition**: FOLD into the W-DECIDE band as owner-glance rows.
- **Wave shape**: one ask per row with a capture; L05b-15 resolves as an opt-in dock seat.

### Band C—Dock

#### F-16—The dock extent morph is discontinuous; fission is split-brain

- **Mechanism**: the width is class-discrete and the visible-extent clip is a declared no-op, so collapse-to-expand holds about 600 ms and then jumps in one frame; fission, the V/H morph and Siri read RETIRED in code and OPEN in BK.
- **Members (6; 3H / 2M / 1L)**: L01b-48, L03b-04, L04-F14, L04-F27, L05b-04, L05b-05.
- **Lenses (4)**: L01b, L03b, L04, L05b. **Max severity**: HIGH.
- **Evidence**: `src/components/dock/styles/dock.css:78-92`: the collapse insets are `0px`, "a corner-safe no-op" (re-checked); `GlassDock.vue:19-20` vs `BK/PORT.md:40`.
- **Inbound**: O-56 G-1; O-60 KFA-7/-8/-13/-50..-53/-109..-112/-189/-221/-222; N-8.
- **Disposition**: BUILD (disease row, its own wave).
- **Wave shape**: W-DOCK-EXTENT: one continuous extent on `--dock-t` from one spring; the fission/orientation/Siri ruling comes first and the loser is struck everywhere; frame-strip capture in Chrome and Safari.

#### F-17—Compact-on-scroll dropped; the progress rim is unseated

- **Mechanism**: BD re-decided scroll-compact as BUILD; it was dropped, and HEAD code states the opposite rule.
- **Members (1; 1H)**: L05b-03.
- **Lenses (1)**: L05b. **Max severity**: HIGH.
- **Evidence**: `src/components/dock/composables/useDockSearch.ts:7-9` "the dock NEVER auto-collapses on a passive scroll" (re-checked); `useDockState.ts:30` has no scroll state.
- **Inbound**: O-55 R-1/R-2, N-7.
- **Disposition**: BUILD.
- **Wave shape**: an opt-in scroll-compact state with hysteresis on the morph orchestrator, PRM-honoured; the rim is clipped by the dock radius in every rung and orientation.

#### F-18—Dock plate geometry and state residue

- **Mechanism**: `--dock-cap-rest: 50%` on a non-square plate paints an ellipse; the state attribute never landed; the owner-rejected 10% safe-inset token still stands.
- **Members (3; 1H / 1M / 1L)**: L03b-03, L01b-47, L05b-18.
- **Lenses (3)**: L01b, L03b, L05b. **Max severity**: HIGH.
- **Evidence**: `src/components/dock/styles/run.css:468` `--dock-cap-rest: 50%` (re-checked).
- **Disposition**: BUILD.
- **Wave shape**: folds into W-DOCK-EXTENT: the cap reads half the block size, one state attribute, the hack token is deleted.

#### F-19—Dock keyboard and ARIA ownership

- **Mechanism**: seats resolve from `run.children`, so grouped seats collapse into one; the summary role wraps slot content; `aria-pressed` is stamped inside selection groups; the search story has no combobox.
- **Members (5; 1H / 4M)**: L08-05, L08-06, L08-13, L08-16, L08-17.
- **Lenses (1)**: L08. **Max severity**: HIGH.
- **Evidence**: `useDockRun.ts:71-75` `seatsOf` = `run.children` vs `demo/shell/SidebarDock.vue:119,161` and `BottomDock.vue:154,222` `div.contents[role=group]` (re-checked); the gate `g-dock-lattice.test.ts:432-444` mounts bare buttons.
- **Disposition**: BUILD.
- **Wave shape**: W-DOCK-KEYBOARD: group-aware seat resolution (`[data-dock-seat]`), a gate fixture with groups, a born-RED e2e on the live shell.

#### F-20—Demo shell chrome at the phone cell

- **Mechanism**: the shell dock strip never reveals the active story; the jump control overflows at 420; sub-routes paint a bare ground.
- **Members (3; 1M / 2L)**: L03a-06, L03b-13, L03b-14.
- **Lenses (2)**: L03a, L03b. **Max severity**: MED.
- **Evidence**: `demo/shell/BottomDock.vue:57-66,185-197` never scrolls to `aria-current`.
- **Disposition**: BUILD (small).
- **Wave shape**: one demo-shell pass.

### Band D—Surfaces, overlays, ink and density

#### F-21—Component geometry loses the cascade to the library's own shared rules

- **Mechanism**: `:where()` geometry at (0,0,0) loses to `.glass-floating` at (0,1,0) in the same layer; the coarse `[data-control-target]` floor replaces the rung's `min-block-size`; layered geometry loses to unlayered consumer rules.
- **Members (6; 2B / 1H / 2M / 1L)**: L03b-01, L15b-07, L15b-01, L15b-12, L06-09, L04-F08.
- **Lenses (4)**: L03b, L04, L06, L15b. **Max severity**: BLOCKER.
- **Evidence**: `src/components/sheet/styles.css:28-33` `:where([data-slot="sheet-content"]) { position: fixed }` vs `src/styles/glass/ladder.css:124-132` `.glass-floating { position: relative }`, both in `@layer components`; `SheetContent.vue:103-105` adds only the side border and `surfaceClass("floating")` (re-checked); `utilities/responsive.css:4-8` vs `button/styles.css:49,53,74`.
- **Disposition**: BUILD.
- **Wave shape**: W-SURFACE-GEOMETRY: the surface rung declares no position or radius (geometry is the component's), or component selectors carry (0,1,0); rung-sized faces drop the second floor; born-RED browser test: sheet `position: fixed`, flush corners 0, dialog corner 24, labeled sm height == icon sm height at the coarse cell.

#### F-22—Overlay z-ladder inversion

- **Mechanism**: the tooltip rung sits below the popover and modal rungs, and all three portal to body, so a tooltip inside a host paints under it.
- **Members (1; 1M)**: L11-03.
- **Lenses (1)**: L11. **Max severity**: MED.
- **Evidence**: `src/styles/tokens/scheme-motion.css:210-212` tooltip 120, popover 130, modal 140; `TooltipContent.vue:62`, `PopoverContent.vue:127` (re-checked).
- **Disposition**: BUILD (small).
- **Wave shape**: re-rank the tooltip above its hosts; capture a tooltip inside each host in both engines.

#### F-23—Ink calibrated to the token ground, not the painted composite

- **Mechanism**: contrast is computed against the declared plate token, while the page paints a plate over a live chromatic field.
- **Members (7; 3H / 3M / 1L)**: L08-07, L08-08, L08-09, L08-24, L03b-05, L03b-12, L03a-11.
- **Lenses (3)**: L03a, L03b, L08. **Max severity**: HIGH.
- **Evidence**: L08-07: muted text fails AA on 86/92 routes in light and 24/92 in dark; L03b-05: dialog title 1.73:1, Cancel 1.54:1.
- **Disposition**: BUILD.
- **Wave shape**: W-INK-COMPOSITE: ink rungs derived against the composited plate over the live field; one rendered-contrast invariant that samples painted pixels.

#### F-24—Dark arm missing on decorations, shadows and fields

- **Mechanism**: decorations, the shadow ladder and the hero fields carry no separating dark arm.
- **Members (3; 1H / 1M / 1L)**: L03a-09, L03a-14, L03b-06.
- **Lenses (2)**: L03a, L03b. **Max severity**: HIGH.
- **Evidence**: L03b-06: hero aurora fields ignore dark mode, stage prose at 2.0-2.3:1.
- **Disposition**: BUILD.
- **Wave shape**: the dark half of W-INK-COMPOSITE.

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
- **Lenses (1)**: L03a. **Max severity**: HIGH.
- **Evidence**: declared only at `tokens/glass.css:203`; `Chip.vue:69-77` sets `--glass-fill-tint` per instance; readers `glass-chip.css:14-15`, `glass-atom.css:82-83` (re-checked).
- **Disposition**: BUILD.
- **Wave shape**: in W-CHIP: declare the composite on the reading class.

#### F-27—Variant classes joined without conflict resolution

- **Mechanism**: `joinClassValues` concatenates `px-5 py-2` and `p-0`; the longhands win in the Tailwind v4 order, crushing icon chips.
- **Members (1; 1H)**: L03a-04.
- **Lenses (1)**: L03a. **Max severity**: HIGH.
- **Evidence**: `chip/chipVariants.ts:7-17,33-43` (re-checked).
- **Disposition**: BUILD.
- **Wave shape**: in W-CHIP; sweep the other `*Variants` builders for the same join.

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
- **Lenses (3)**: L03a, L08, L15b. **Max severity**: HIGH.
- **Evidence**: `tokens/sizing.css:108-112` (the law) vs `:333-342` (six space rungs transposed, no radius); local queries at `control.css:310`, `toggle-group/styles.css:35`, `Progress.vue:149`, `segmented.css:115,308`.
- **Disposition**: BUILD (decide first).
- **Wave shape**: W-DENSITY-DECIDE (transpose corners with pads, derive pads from corners, or transpose gaps only), then one sweep; marks and handles leave the spacing register; invariant: no width-query spacing outside `tokens/sizing.css`.

#### F-30—Radius role: multi-line holders on the stadium

- **Mechanism**: multi-line selectable holders paint as stadiums although the role table rules them onto the card rung; the off-role 12 px rung is latched RED.
- **Members (1; 1L)**: L01a-23.
- **Lenses (1)**: L01a. **Max severity**: LOW.
- **Evidence**: `DESIGN.md:386` (the role table) vs the latched rung (L01a-23).
- **Inbound**: O-58, N-9; O-56 G-2 provisionally (the squared pill plates), pending R2-03.
- **Disposition**: BUILD.
- **Wave shape**: the primitive ruling (Card/Surface with a selected state, or a card shape on Chip/ToggleGroup/RadioGroup), then a role invariant replaces the latch.

#### F-31—Frost and the field well

- **Mechanism**: `--input-on-glass` is opaque, so the field's backdrop-filter is inert; the transmissive cut and the well law never landed; the blur ladder rose against F48.
- **Members (3; 1H / 2M)**: L01a-22, L01a-25, L05a-05.
- **Lenses (2)**: L01a, L05a. **Max severity**: HIGH.
- **Evidence**: `_shared/field/control.css:73-81` "OPAQUE at HEAD ... the backdrop-filter below is currently inert"; `tokens/glass.css:69-73` 10/14/16/20/22 px vs 1/7/7/11/11 at `99706211` (both re-checked).
- **Disposition**: BUILD.
- **Wave shape**: W-FROST-II: transmissive well, one frost detector over four rungs and both modes, the F48 owner glance with paired π.

#### F-32—Sheet detents occlude the primary action

- **Mechanism**: at 390×844 the detented sheet covers its primary action and the halo stops are fixed in px.
- **Members (1; 1M)**: L01a-39.
- **Lenses (1)**: L01a. **Max severity**: MED.
- **Evidence**: L01a-39: P7 RED at 390×844.
- **Disposition**: BUILD.
- **Wave shape**: the sheet half of W-SURFACE-GEOMETRY.

#### F-33—Specimens lay out by viewport, not by container

- **Mechanism**: cels and the studio envelope take viewport breakpoints, so desktop crushes specimens into third-width cells and the phone collapses controls to 0.
- **Members (5; 2H / 3L)**: L03a-01, L03a-02, L03a-12, L03a-13, L03b-15.
- **Lenses (2)**: L03a, L03b. **Max severity**: HIGH.
- **Evidence**: L03a-01: specimens crush inside ~419 px cels at 1440; L03a-02: studio controls 0 px at 420.
- **Disposition**: BUILD.
- **Wave shape**: W-CEL-CONTAINER: container queries on cels and the studio envelope.

#### F-34—Demo remainder rows unbuilt

- **Mechanism**: the configurator expression, the demo-truth remainder and the preview-card ladder were ruled and left mostly unbuilt.
- **Members (3; 3M)**: L01b-52, L01b-56, L05a-12.
- **Lenses (2)**: L01b, L05a. **Max severity**: MED.
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
- **Lenses (2)**: L03b, L15b. **Max severity**: HIGH.
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
- **Lenses (1)**: L08. **Max severity**: HIGH.
- **Evidence**: `DialogContent.vue:124-141`, `SheetContent.vue:246-263`; `tests/components/dialog/dialog-focus-return.test.ts:9-13,87`.
- **Disposition**: BUILD.
- **Wave shape**: W-FOCUS-LIFECYCLE: release the scope at logical close; a browser focusin-timeline test over dialog and four sheet sides.

#### F-39—Two focus-ring registers; forced colors

- **Mechanism**: the dock outline trio and the house box-shadow ring coexist; the box-shadow ring vanishes in forced colors.
- **Members (2; 2M)**: L08-15, L10-13.
- **Lenses (2)**: L08, L10. **Max severity**: MED.
- **Evidence**: L08-15: 14 sortable handles show no focus in forced colors.
- **Disposition**: BUILD.
- **Wave shape**: one ring register with a forced-colors arm.

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
- **Lenses (1)**: L08. **Max severity**: MED.
- **Evidence**: L08-14: the context-menu story promises Shift+F10 with no macOS opener.
- **Disposition**: BUILD (small).
- **Wave shape**: one a11y sweep.

#### F-43—Browser Back has no transition; the router seam is unowned

- **Mechanism**: popstate bypasses the route transition, and the canon figure is false.
- **Members (3; 3M)**: L01a-29, L04-F19, L05a-07.
- **Lenses (3)**: L01a, L04, L05a. **Max severity**: MED.
- **Evidence**: L05a-07: RT-29C "the router seam, unclaimed".
- **Disposition**: BUILD.
- **Wave shape**: W-ROUTE-POPSTATE with a frame capture.

### Band F—Motion

#### F-44—Spring integrators off the one authority

- **Mechanism**: five hand-rolled Euler loops sit beside the keyframes engine, three on off-table constants.
- **Members (2; 1H / 1L)**: L10-01, L10-18.
- **Lenses (1)**: L10. **Max severity**: HIGH.
- **Evidence**: `useLeadTrail.ts:212-216`, `usePointerVelocityField.ts:242-247`, `constellationInteraction.ts:164-169`, `useBlobPointer.ts:184-186`, `fourier-field/clock.ts:73-75`.
- **Inbound**: O-60 KFA-168.
- **Disposition**: BUILD.
- **Wave shape**: W-SPRING-ONE: one step-able integrator fed from `springPresets`; invariant: no `-omega * omega` outside the leaf.

#### F-45—Non-composited motion at idle

- **Mechanism**: infinite colour and SVG-group transform animations, layout-property transitions, and a flat bezier on spatial scale.
- **Members (3; 1H / 1M / 1L)**: L07-03, L07-09, L05a-11.
- **Lenses (2)**: L05a, L07. **Max severity**: HIGH.
- **Evidence**: `music-staff/styles.css:264-379`: 120 layouts/s and 609 ms/s of task at idle.
- **Disposition**: BUILD.
- **Wave shape**: compositor-only idle life, paused off-screen; gate: idle layouts/s = 0.

#### F-46—Scroll chrome follows the velocity path, not position

- **Mechanism**: the ramp anchors at the first observed position and advances only on velocity ticks, so a scroll jump leaves the chrome expanded over content.
- **Members (2; 2M)**: L03a-10, L03b-08.
- **Lenses (2)**: L03a, L03b. **Max severity**: MED.
- **Evidence**: `useScrollChrome.ts:186-222` (re-checked: the two lenses name the two halves of one mechanism).
- **Disposition**: BUILD.
- **Wave shape**: derive `t` from `scrollTop`.

### Band G—Engines and performance

#### F-47—The WebGPU primary paints less than the WebGL2 fallback

- **Mechanism**: four medium ids collapse to one Kuwahara body on WGSL while the WebGL2 arm carries the stroke cascade; masking fallbacks survive the WebGPU-only ruling.
- **Members (5; 3H / 2M)**: L05a-01, L10-02, L04-F03, L05b-09, L01b-54.
- **Lenses (5)**: L01b, L04, L05a, L05b, L10. **Max severity**: HIGH.
- **Evidence**: `aurora/constants/shaders/aurora-mediums.wgsl.ts:396-401` returns `mediumKuwahara` for ids 3, 5, 6 and 7 (re-checked).
- **Disposition**: BUILD.
- **Wave shape**: W-ONE-ENGINE: port the per-dab stroke cascade to WGSL, then delete the WebGL2 arm (E-2).

#### F-48—Greenfields stopped at W0

- **Mechanism**: the aurora and blob greenfields were specified and never built past W0.
- **Members (4; 3H / 1M)**: L01b-49, L01b-50, L05a-02, L05b-10.
- **Lenses (3)**: L01b, L05a, L05b. **Max severity**: HIGH.
- **Evidence**: `git log --since=2026-07-28 -- src/components/blob`: 3 commits (layer move, docs, export purge) (re-checked).
- **Inbound**: O-56 G-3.
- **Disposition**: BUILD (disease rows).
- **Wave shape**: W-BLOB-GREENFIELD and W-AURORA-GREENFIELD, each its own wave, the first capture heavy.

#### F-49—Device-loss subscription per instance on the shared device

- **Mechanism**: each canvas chains its own `lost.then` closure onto the process-shared device, retaining the unmounted tree.
- **Members (1; 1H)**: L07-01.
- **Lenses (1)**: L07. **Max severity**: HIGH.
- **Evidence**: `useWebGPUCanvas.ts:99` shared `sharedDevicePromise`; `:386-388` per-instance `dev.lost.then` (re-checked).
- **Inbound**: O-54.
- **Disposition**: BUILD.
- **Wave shape**: one `lost` subscription per device fanned out to a Set; a route-cycle DOM-count test; the O-54 answer rides it.

#### F-50—Idle main-thread loops

- **Mechanism**: a full-rate rAF serves as a 4 Hz timer, armed by a configured getter rather than a resolved source; drift substrates have no frame governor.
- **Members (2; 1H / 1L)**: L07-02, L07-13.
- **Lenses (1)**: L07. **Max severity**: HIGH.
- **Evidence**: `GlassDock.vue:118-133` always passes a getter as `backgroundCanvas`; `useGlassBackdropLuminance.ts:214` treats any non-null option as live (re-checked).
- **Inbound**: O-60 KFA-74.
- **Disposition**: BUILD.
- **Wave shape**: sample on the substrate's frame publish or a timer only while a source resolves.

#### F-51—Synchronous costs on the mount path

- **Mechanism**: forced style recalc per spring, synchronous GPU readback, unmemoized `cn()`, main-thread shader compile.
- **Members (4; 1M / 3L)**: L07-08, L07-10, L07-11, L07-12.
- **Lenses (1)**: L07. **Max severity**: MED.
- **Evidence**: L07-08: forced recalc on every spring construction.
- **Inbound**: O-60 KFA-23.
- **Disposition**: BUILD.
- **Wave shape**: one mount-path pass.

#### F-52—Payload does not shake

- **Mechanism**: aurora carries both backends; a one-Button consumer ships the whole stylesheet.
- **Members (2; 2M)**: L07-05, L07-06.
- **Lenses (1)**: L07. **Max severity**: MED.
- **Evidence**: L07-06: 507 KB / 161 KB gz of CSS for one Button.
- **Inbound**: O-53.
- **Disposition**: BUILD.
- **Wave shape**: a shader-free aurora derive subpath; CSS split per subpath.

#### F-53—Perf and boot chronics never started

- **Mechanism**: W-PERF, the boot shell and the Lighthouse gate were ruled and never begun.
- **Members (3; 2M / 1L)**: L01b-60, L01b-69, L05b-20.
- **Lenses (2)**: L01b, L05b. **Max severity**: MED.
- **Evidence**: L01b-60: the blank-first-paint premise still holds.
- **Disposition**: BUILD.
- **Wave shape**: decide-then-build in the W-DECIDE band.

#### F-54—iOS 27 hallmarks unbuilt

- **Mechanism**: four micro hallmarks (dock-to-card squish, magnetic overpull, stagger and others) were never built.
- **Members (1; 1M)**: L05b-14.
- **Lenses (1)**: L05b. **Max severity**: MED.
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
- **Lenses (7)**: L01a, L05a, L05b, L06, L09, L10, L14. **Max severity**: HIGH.
- **Evidence**: 12 `dist/**/*.d.ts` files carry `BK #n` or dated brackets (re-checked); MIGRATION.md 349 KB, about 119 KB gzipped (re-checked).
- **Disposition**: BUILD.
- **Wave shape**: W-DEMETA-II plus one invariant over src, dist types and MIGRATION.

#### F-63—Docs not derived from the source of record

- **Mechanism**: README, DESIGN, canon, component READMEs, MIGRATION and JSDoc name symbols, subpaths, props, tokens and return forms that the source does not carry.
- **Members (20; 5H / 11M / 4L)**: L01a-26, L01b-61, L04-F12, L05b-11, L09-01, L09-02, L09-04, L09-05, L09-06, L09-07, L09-11, L09-13, L09-15, L09-18, L03a-15, L06-06, L13-16, L15a-F8, L15a-F11, L11-07.
- **Lenses (10)**: L01a, L01b, L03a, L04, L05b, L06, L09, L11, L13, L15a. **Max severity**: HIGH.
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
- **Lenses (1)**: L10. **Max severity**: HIGH.
- **Evidence**: `tokens/light-dark.css:65-79` calls `dark-arm.css` a lockstep witness checked by `proof:glass` DA1; `package.json` has 0 `proof:*` scripts (re-checked).
- **Disposition**: BUILD.
- **Wave shape**: one arm per token type; TS tables generate CSS; one colour-resolution leaf.

### Band J—Exports, consumers and cross-repo

#### F-66—Published surface with no consumer

- **Mechanism**: exports, subpaths and artefacts with no reader outside tests.
- **Members (7; 3M / 4L)**: L05a-18, L06-10, L10-06, L10-07, L10-15, L10-21, L13-14.
- **Lenses (4)**: L05a, L06, L10, L13. **Max severity**: MED.
- **Evidence**: L10-06: 94 of 321 value exports unused; L06-10 counts 6 of 70 keys, but HEAD has 68 (figure corrected).
- **Disposition**: FOLD into the P-6 overfitting audit.
- **Wave shape**: one census, per-symbol wire-or-delete at the next major.

#### F-67—Published claims not asserted on the built artefact

- **Mechanism**: the root closure, peer declarations, the consumer token surface and DEV guards are claimed in source and false in dist.
- **Members (4; 2H / 2M)**: L09-03, L06-03, L06-04, L06-05.
- **Lenses (2)**: L06, L09. **Max severity**: HIGH.
- **Evidence**: a closure walk from `dist/glass-ui.js` reaches `@vueuse/core` and `@mkbabb/keyframes.js`; the `Button.vue:131` DEV guard is absent from `dist/button-*.js` (both re-checked).
- **Disposition**: BUILD.
- **Wave shape**: W-ROOT-CLOSURE: assert the dist import closure and the token surface on the packed artefact.

#### F-68—Consumers pinned majors back; cures cannot land

- **Mechanism**: value.js and keyframes.js install 7.0.0, fourier 8.0.0, and no consumer schedules a repin, so no BL cure reaches the owner's surfaces; consumer gates measure their own stale install as producer state.
- **Members (13; 1B / 2H / 7M / 3L)**: L15a-F4, L15a-F3, L15a-F5, L15a-F10, L15a-F12, L06-01, L06-07, L06-12, L06-13, L01b-76, L05b-13, L10-08, L11-11.
- **Lenses (6)**: L01b, L05b, L06, L10, L11, L15a. **Max severity**: BLOCKER.
- **Evidence**: value.js `package.json:88` `^7.0.0`, keyframes.js `package.json:78` `7.0.0` (re-checked); stale bindings value.js `demo/shell/dock/Dock.vue:161-164` vs `useDockShellProps.ts:5-8`.
- **Inbound**: O-56 R-5, N-6.
- **Disposition**: BUILD.
- **Wave shape**: W-LANDING: fix BL's version; per-consumer migration packets from each consumer's import graph, naming silent no-op bindings (E-11); a live relay. The repin itself is each consumer's addendum (E-6).

#### F-69—A consumer fork carries unupstreamed fixes

- **Mechanism**: scaena runs a vendored 8.0.3 whose drag-morph fixes exist only as uncommitted edits in a detached glass-ui worktree.
- **Members (1; 1H)**: L06-02.
- **Lenses (1)**: L06. **Max severity**: HIGH.
- **Evidence**: `scaena/apps/web/package.json:13` pins `vendor/npm/mkbabb-glass-ui-8.0.3.tgz`; `.worktrees/glass-ui-segmented-tabs-8.0.2` shows 25 uncommitted entries (re-checked).
- **Disposition**: BUILD.
- **Wave shape**: W-DRAG-MORPH-SETTLE with a born-RED e2e.

#### F-70—Fallthrough attributes untyped

- **Mechanism**: components with a native root do not type its attribute and listener surface, so consumers cannot enable `strictTemplates`, and the library's own strict pass rides a global shim.
- **Members (2; 1H / 1M)**: L15a-F6, L13-12.
- **Lenses (2)**: L13, L15a. **Max severity**: HIGH.
- **Evidence**: `Button.vue:48-60`; `@vue-ignore` in 3 components only.
- **Inbound**: O-57 R-1.
- **Disposition**: BUILD.
- **Wave shape**: a type-surface wave; gate: a consumer fixture under `strictTemplates` that fails on a stale prop.

#### F-71—Inbound mail never carried or answered

- **Mechanism**: letters marked SENT by the sender never reached glass-ui; routed batches went unanswered; the BL register misses them.
- **Members (12; 5H / 5M / 2L)**: L11-01, L11-02, L11-04, L11-05, L11-06, L11-08, L11-09, L11-10, L11-12, L05a-13, L15a-F1, L15a-F7.
- **Lenses (3)**: L05a, L11, L15a. **Max severity**: HIGH.
- **Evidence**: L15a-F1: ten value.js letters (O-28, O-30, O-31, O-36, O-47..O-52) have zero hits in glass-ui `docs/` or `git log --all`.
- **Inbound**: O-53..O-58, O-60.
- **Disposition**: BUILD.
- **Wave shape**: W-MAIL-INTAKE: carry the letters, row them in INBOUND, rule each row CURE/ANSWER/DECLINE into its family; BL gets its own inbox dir.

#### F-72—The value.js boundary rides an unpublished cure

- **Mechanism**: `GlassColorError` never fires for the malformed-colour class; value.js 4.1 cures it but is tagged locally only.
- **Members (1; 1M)**: L15a-F9.
- **Lenses (1)**: L15a. **Max severity**: MED.
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

## 3. Convergence map

### Saturated: 3 or more lenses

Round 1 has already located these families. Point no new discovery seat at them. Round 2 touches them only for the paint or engine cell they lack, such as Safari or frame strips.

| id | family | lenses | n |
|---|---|---|---|
| F-63 | Docs not derived from the source of record | 10: L01a, L01b, L03a, L04, L05b, L06, L09, L11, L13, L15a | 20 |
| F-12 | Close records say what the tree does not | 8: L01a, L01b, L04, L05a, L05b, L06, L08, L09 | 19 |
| F-62 | Meta and provenance re-accreted | 7: L01a, L05a, L05b, L06, L09, L10, L14 | 10 |
| F-01 | The gate register counts seat names, not executables that can go red | 6: L01a, L01b, L02, L05a, L09, L13 | 14 |
| F-55 | The colocation chronic: settlement decided, never landed | 6: L01b, L04, L05b, L12, L13, L14 | 7 |
| F-68 | Consumers pinned majors back; cures cannot land | 6: L01b, L05b, L06, L10, L11, L15a | 13 |
| F-04 | The visual suite never entered CI, and the discharge was redefined | 5: L01a, L01b, L02, L05b, L14 | 6 |
| F-13 | Rulings owed above an implement seat | 5: L01a, L01b, L04, L05a, L06 | 13 |
| F-47 | The WebGPU primary paints less than the WebGL2 fallback | 5: L01b, L04, L05a, L05b, L10 | 5 |
| F-07 | Safari cells deferred behind an environment excuse | 4: L01a, L04, L08, L10 | 5 |
| F-09 | Latches and disclosures standing in for cures | 4: L01a, L01b, L02, L04 | 6 |
| F-11 | Routing-chain drops | 4: L01a, L01b, L04, L05a | 10 |
| F-16 | The dock extent morph is discontinuous; fission is split-brain | 4: L01b, L03b, L04, L05b | 6 |
| F-21 | Component geometry loses the cascade to the library's own shared rules | 4: L03b, L04, L06, L15b | 6 |
| F-64 | Token hygiene | 4: L01a, L01b, L05a, L10 | 11 |
| F-66 | Published surface with no consumer | 4: L05a, L06, L10, L13 | 7 |
| F-02 | Detectors narrower than the claim they carry | 3: L02, L05a, L09 | 7 |
| F-05 | Visual harness rot | 3: L01b, L09, L14 | 6 |
| F-08 | The WebGPU primary is never paint-gated | 3: L02, L03b, L04 | 3 |
| F-10 | Budget ratchets as literal pins, unwired | 3: L02, L07, L14 | 4 |
| F-18 | Dock plate geometry and state residue | 3: L01b, L03b, L05b | 3 |
| F-23 | Ink calibrated to the token ground, not the painted composite | 3: L03a, L03b, L08 | 7 |
| F-29 | Density: pads transpose under the width query, corners do not | 3: L03a, L08, L15b | 12 |
| F-40 | One widget, two focus models | 3: L01a, L04, L08 | 3 |
| F-41 | Toast placement and double announcement | 3: L01a, L03b, L08 | 3 |
| F-43 | Browser Back has no transition; the router seam is unowned | 3: L01a, L04, L05a | 3 |
| F-48 | Greenfields stopped at W0 | 3: L01b, L05a, L05b | 4 |
| F-56 | Component-owned code in global zones | 3: L05a, L12, L13 | 8 |
| F-58 | One symbol, two doors | 3: L10, L12, L13 | 7 |
| F-61 | Repo weight and evidence hygiene | 3: L01b, L09, L14 | 4 |
| F-71 | Inbound mail never carried or answered | 3: L05a, L11, L15a | 12 |

### Two lenses

F-03 (L12+L13), F-06 (L01a+L01b), F-14 (L05a+L05b), F-15 (L05a+L05b), F-20 (L03a+L03b), F-24 (L03a+L03b), F-25 (L03a+L03b), F-28 (L01a+L04), F-31 (L01a+L05a), F-33 (L03a+L03b), F-34 (L01b+L05a), F-35 (L03a+L07), F-36 (L03b+L15b), F-37 (L03b+L08), F-39 (L08+L10), F-45 (L05a+L07), F-46 (L03a+L03b), F-53 (L01b+L05b), F-57 (L12+L13), F-59 (L01a+L12), F-60 (L13+L14), F-67 (L06+L09), F-70 (L13+L15a).

### Single lens: adversarial re-check candidates

| id | family | lens | max | re-checked here |
|---|---|---|---|---|
| F-17 | Compact-on-scroll dropped; the progress rim is unseated | L05b | HIGH | source confirmed |
| F-19 | Dock keyboard and ARIA ownership | L08 | HIGH | source confirmed |
| F-22 | Overlay z-ladder inversion | L11 | MED | source confirmed |
| F-26 | A composite custom property resolved at :root | L03a | HIGH | source confirmed |
| F-27 | Variant classes joined without conflict resolution | L03a | HIGH | source confirmed |
| F-30 | Radius role: multi-line holders on the stadium | L01a | LOW | no |
| F-32 | Sheet detents occlude the primary action | L01a | MED | no |
| F-38 | Focus handoff at overlay close | L08 | HIGH | no |
| F-42 | Small naming and keyboard seams | L08 | MED | no |
| F-44 | Spring integrators off the one authority | L10 | HIGH | no |
| F-49 | Device-loss subscription per instance on the shared device | L07 | HIGH | source confirmed |
| F-50 | Idle main-thread loops | L07 | HIGH | source confirmed |
| F-51 | Synchronous costs on the mount path | L07 | MED | no |
| F-52 | Payload does not shake | L07 | MED | no |
| F-54 | iOS 27 hallmarks unbuilt | L05b | MED | no |
| F-65 | Twin sources of record | L10 | HIGH | source confirmed |
| F-69 | A consumer fork carries unupstreamed fixes | L06 | HIGH | source confirmed |
| F-72 | The value.js boundary rides an unpublished cure | L15a | MED | no |

### Under-covered lenses and areas

- No real Safari anywhere in round 1. Playwright WebKit crashed on `/containers/context-menu`, and it is not Safari anyway: the engine build and the shipping app can give opposite results. Every Safari claim is open (D-4).
- Motion over time. No lens took frame strips of the dock morph, the sheet and dialog transitions, route and popstate, or pane and card transitions (N-8: "janky, double animated"). N-10 and O-60 (33 rows) ask for exactly this, and O-60 was captured on 7.0.0.
- Interaction states. Round 1 captured mostly rest states. Open overlays, hover, drag, press and focus sequences are thin outside L08 and L15b.
- The owner docket at HEAD. O-56 G-1..G-4 and O-58/N-9 were measured on consumer installs of 7.0.0, or not at all. R-5 (the landing version) is unanswered.
- GPU execution time for backdrop stacks (L07: unmeasured, not refuted), low-end devices beyond a 4× CPU throttle, SSR, and the dev server.
- Assistive tech. No real screen reader and no Windows high contrast; forced colors was emulated.
- The packed artefact. The `verify:package` pack-and-install never ran, no consumer was built against HEAD, and the 167 visual specs were read but never executed.
- Test soundness. No unit or vue-tsc row was mutation-probed, and the E-11 reka binding sweep did not run.
- Corpora. The BC, BD and AY owner corpora, N-6..N-10, the 49 PARTIAL census rows and 19 of the 27 value.js §4a rows were not traced row by row.
- Density and dark beyond chicago's surfaces. Carousel, deck, data-table, accordion, alert, slider, switch and the expanded dock were not measured at the coarse cells, and dark mode was not measured at a coarse cell.
- The demo's second half, the nested family tabs and the chassis were thinly visited.
- Evidence custody. Round 1's 1,076 capture PNGs (462 MB) live untracked on one disk, and only `captures/MANIFEST.sha256` is committed. A capture cited by a BL row has to outlive that disk (P-2).
- Over-covered seats, for contrast. Three structure seats (L12, L13, L14) all found the colocation chronic, the two plan-vs-landed seats (L01a, L01b) overlap heavily, and so do the two mail seats (L11, L15a). Round 2 spends no discovery seat on these.

## 4. Round-2 proposal

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

