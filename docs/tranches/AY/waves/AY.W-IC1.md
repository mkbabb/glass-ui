# AY.W-IC1 — Instrument-chassis scope decision (family ≥2-consumer reconcile)

State: OPEN · Repo: glass-ui · Band D (instrument-chassis) · Depends-on: none
(decision wave; reads HEAD source + sibling consumers, no upstream wave gates it).

## Why this wave exists (the under-examination)

The seed phrasing — "slides-side removal vs glass-ui retention" — is the
*assumed* framing, and it is **wrong on the facts**. The H-wave-completeness
lane flagged this row OWNED (thin) and **UNDER-EXAMINED — no focused hardening
lane challenged it**. So this wave is the missing focused lane: it grounds the
scope decision in the ACTUAL HEAD consumer graph, finds the seed's "slides"
premise is moot, and surfaces the REAL ≥2-consumer-bar question the seed never
named — `InstrumentRail`, not the slides angle.

This is a **decision wave** in the `TRANCHE-AND-WAVE-SPEC.md §"Hard gate"`
sense whose closing artefact is an **explicit document reconciliation** (the
named legitimate artefact class for a decision) PLUS a machine deletion/orphan
proof so the decision cannot silently rot.

## Defect (verified at HEAD, file:line)

The instrument-chassis FAMILY has two members on the public surface with
**asymmetric consumer support**, and the scope was recorded without measuring
either:

### Member 1 — `InstrumentChassis` (+ `ChassisDivider`, `InstrumentChassisPhase`, `InstrumentChassisVariant`)

CLEARS the ≥2-consumer bar decisively. Verified consumer graph:

- **Binary consumer (the load-bearing one): speedtest.** FOUR live import
  sites on the `@mkbabb/glass-ui/instrument-chassis` subpath —
  `speedtest/src/App.vue:239` (the App-level persistent chassis),
  `speedtest/src/views/MapView.vue:53`, `speedtest/src/views/ChartsView.vue:132`,
  `speedtest/src/composables/useRouteTransition.ts:34` (the phase/variant type
  consumer). These mount the chassis as the App shell; it is not decorative.
- **Demo:** `demo/stories/compositions/instrument-chassis.vue:5` +
  `demo/stories/foundations/chart-chassis-palette.vue:13`.
- **Tests:** `tests/components/custom/instrument-chassis/InstrumentChassis.phase-canon.test.ts`
  + `InstrumentChassis.spine-variant.test.ts`.
- **Public surface:** root barrel (`src/index.ts:117`), `/instrument-chassis`
  subpath (`package.json:380-383` + `src/subpaths/instrument-chassis.ts`),
  and `/api` (`src/api/index.ts:100` exports `InstrumentChassisPhase`).

Verdict by the overfitting-audit canon (`docs/audits/overfitting-audit.md`):
**keep** (≥2 distinct usage sites — speedtest binary + demo + tests).

### Member 2 — `InstrumentRail` (the ACTUAL under-the-bar member the seed missed)

FAILS the ≥2-consumer bar at HEAD. Verified:

- **No binary consumer.** Speedtest DELETED its `InstrumentRail` branch —
  `speedtest/src/components/survey/SurveyWizard.vue:250-254`: *"the two-pane
  cockpit posture split is retired … the `isDesktopCockpit` breakpoint ref and
  `InstrumentRail` branch are deleted"* (AN-D6/D7/D11). Confirmed: zero
  `<InstrumentRail` / `import … InstrumentRail` matches in speedtest src.
- **One live consumer, demo-only:** `demo/stories/compositions/instrument-rail.vue:4`
  (the sole `<InstrumentRail>` mount, on the relative `../../../src/...` path).
- **Zero tests** (`tests/components/custom/instrument-rail/` does not exist).
- **Not in `/api`** (confirmed — `InstrumentRail` absent from `src/api/index.ts`).
- **Public surface:** root barrel (`src/index.ts:118`) + `/instrument-rail`
  subpath (`package.json:384-387` + `src/subpaths/instrument-rail.ts`).

Verdict by the overfitting-audit precedence (no fresh consumer-evidence doc
exists for it; `docs/consumer-evidence/` has no `instrument-rail.md`): this is
either **demo-only-private** (0 src consumers, 1 demo) or **keep-current**
(1 usage site WITH semantic value) — and `keep-current` REQUIRES a matching
`docs/consumer-evidence/instrument-rail.md` + a fresh proof grep. Today there
is no evidence doc, so the artefact sits on the public surface UNJUSTIFIED.
**This is the genuine scope question; the seed's "slides removal" angle is moot
(slides never imported either member — the one slides hit is an audit doc,
`slides/docs/audits/runs/2026-06-04-style-union/f-glassui-demo-union.md`, not a
consumer).**

### The recorded-scope defect

- `AY.md:176` (Band D) and `EXECUTION-DAG.md:142` carry W-IC1 as a one-line
  "decision recorded; consumers reconciled" row framed entirely around
  "slides-side removal vs glass-ui retention" — a premise that does not match
  the consumer graph. No document distinguishes the two family members; no
  document measures either against the bar. The scope was asserted, not derived.

## Goal criterion

The instrument-chassis FAMILY scope is settled against the ≥2-consumer bar with
the ACTUAL consumer graph, member by member: `InstrumentChassis` RETAINED on
evidence (speedtest is a live binary consumer); `InstrumentRail` given a
SINGLE explicit disposition (retire-to-demo-private OR keep-with-evidence-doc),
never left sitting on the public surface unjustified; the slides premise
formally dismissed as moot. After this wave a reader can answer "what is the
instrument-chassis scope and why?" from one decision doc, and a machine gate
prevents the chosen disposition from silently drifting.

## Objective

1. **Author the decision doc** `docs/tranches/AY/audit/W-IC1-scope-decision.md`
   recording the per-member consumer graph (the §Defect table above, with the
   re-run greps as the evidence), the ≥2-consumer verdict per member, the
   chosen `InstrumentRail` disposition, and the explicit dismissal of the
   slides premise.

2. **Reconcile `InstrumentRail` to its chosen disposition** (root-not-consumer
   — the fix lands in the library, not by leaving the public surface to rot).
   The decision picks ONE of the two precept-valid paths:

   - **Disposition A — RETIRE to demo-private (DEFAULT, per "no legacy code"
     + substrate-without-consumer-binary, L invariant 8).** `InstrumentRail`
     has no binary consumer and one demo. Retire it from the PUBLIC surface:
     drop the `src/index.ts:118` root-barrel re-export, delete
     `src/subpaths/instrument-rail.ts`, remove the `./instrument-rail` block +
     the `typesVersions` entry from `package.json` (`:112-113`, `:384-387`).
     The component file + the demo story STAY (the demo story keeps importing
     it on the relative `../../../src/...` path — it is a demo-private
     primitive now, not a shipped one). This is a clean break, no alias.

   - **Disposition B — KEEP with a consumer-evidence doc (only if a named
     binary consumer is committed THIS tranche).** Author
     `docs/consumer-evidence/instrument-rail.md` (the existing format —
     cite the consumer + a fresh proof grep), wire a SECOND distinct usage
     site so the bar is met by evidence not promise, and keep the public
     surface. This path is valid ONLY with a real second consumer; a "shipped
     for forward compatibility" keep requires the named roadmap entry per the
     overfitting canon (option (c)) and is NOT the default.

   The decision doc names which path, with the binary reason. The DEFAULT (no
   committed binary consumer at close) is **A — retire**.

3. **Bind the disposition to a machine gate** so it cannot silently drift back
   (the public surface re-grows an orphan, or the demo story is deleted leaving
   a dead re-export). See §Hard gate.

Non-goals (explicitly OUT):
- The `InstrumentChassisPhase`/`"scoring"`-member question — SETTLED at AN.W6
  (CLAUDE.md "InstrumentChassis phase canon"); the phase union is locked by
  the existing `InstrumentChassis.phase-canon.test.ts`. Not re-litigated here.
- The `spine` variant — SETTLED (AL-W1-α; `spine-variant.test.ts` locks it;
  speedtest App.vue:88 consumes it). Not touched.
- Any visual/CSS edit to `instrument-chassis.css` — this is a SCOPE decision,
  not a styling wave.

## Files / edit-sites

| File | Edit |
|---|---|
| `docs/tranches/AY/audit/W-IC1-scope-decision.md` (NEW) | The decision doc: per-member consumer graph + re-run greps + ≥2-consumer verdict + chosen `InstrumentRail` disposition + slides-premise dismissal. |
| `src/index.ts` | (Disposition A) DELETE the `export * from "./components/custom/instrument-rail";` line (`:118`). No change for B. |
| `src/subpaths/instrument-rail.ts` | (Disposition A) DELETE the file. No change for B. |
| `package.json` | (Disposition A) DELETE the `typesVersions["*"]["instrument-rail"]` block (`:112-113`) + the `"./instrument-rail"` exports block (`:384-387`). No change for B. |
| `scripts/proof-instrument-scope.mjs` (NEW) | The gate that binds the chosen disposition (both arms below). |
| `package.json` `scripts` | ADD `"proof:instrument-scope": "node scripts/proof-instrument-scope.mjs"` + chain it into `scripts/gates.mjs` (and CI per the existing `proof:*` promotion idiom). |
| `docs/consumer-evidence/instrument-rail.md` (NEW, Disposition B ONLY) | Consumer-evidence doc per the existing format. Not created under A. |
| `docs/tranches/AY/AY.md:176`, `EXECUTION-DAG.md:142` | Re-write the W-IC1 row to point at the authored decision doc + the chosen disposition (replace the moot "slides-side removal" framing). |

If Disposition A is chosen, `dist/instrument-rail.{js,d.ts}` stops emitting —
verified by a build-diff (below), which is the deletion proof.

## The gate — `proof:instrument-scope` (exact shape)

The gate machine-locks BOTH the retained member and the chosen rail
disposition, so neither drifts. It is pure-given-source (parse + fs +
optional sibling consumer-walk reusing the shipped `constellation.mjs`
`CONSUMERS`/`resolveSibling`/`skipSibling` idiom — NO new scan harness).

**Clause 1 — CHASSIS-RETAINED (always asserted).** `InstrumentChassis` +
`ChassisDivider` are re-exported from `src/components/custom/instrument-chassis/index.ts`;
the `/instrument-chassis` subpath exists in `package.json` exports; and ≥1
BINARY consumer is found (speedtest's 4 `@mkbabb/glass-ui/instrument-chassis`
imports via the consumer-walk, gracefully skipping an absent speedtest with a
LOGGED skip — never a silent pass). Bite: delete the speedtest import sites OR
drop the subpath → RED.

**Clause 2 — RAIL-DISPOSITION (asserts the CHOSEN arm; the gate reads which
arm is live from the source itself, no flag):**

- **Arm A (retired):** assert the public surface does NOT carry
  `InstrumentRail` — no `instrument-rail` in `src/index.ts`, no
  `src/subpaths/instrument-rail.ts`, no `./instrument-rail` exports block in
  `package.json` — AND the demo story `demo/stories/compositions/instrument-rail.vue`
  still resolves (the demo-private consumer survives; the manifest row at
  `demo/stories/manifest.ts:298` is intact so `proof:storybook-ia` clause-3
  stays green). Bite: re-add the root-barrel re-export with no evidence doc →
  RED; delete the demo story leaving the component orphaned with zero
  consumers → RED (the substrate-without-consumer floor).

- **Arm B (kept):** assert `docs/consumer-evidence/instrument-rail.md` exists
  AND the consumer-walk finds ≥2 distinct `InstrumentRail` usage sites
  (the evidence-doc-cited binary consumer + the demo). Bite: keep the public
  surface with <2 consumers and no evidence doc → RED.

The gate writes a `.cache/gates/AY-instrument-scope.json` artefact recording
the chosen arm + the per-member consumer counts + the logged sibling skips.

## Hard gate (evidence-backed)

Three artefacts close this wave (the decision-reconciliation artefact + the
machine deletion proof + the gate-bite, per `§"Hard gate"`'s named classes):

1. **DECISION-RECORDED (explicit document reconciliation).**
   `docs/tranches/AY/audit/W-IC1-scope-decision.md` exists and records: the
   per-member consumer graph with the re-run greps (CHASSIS: speedtest 4
   binary sites + demo + tests; RAIL: 0 binary, 1 demo, 0 tests); the
   ≥2-consumer verdict per member (chassis **keep**; rail **demo-only-private**
   under Disposition A, the default); the explicit dismissal of the slides
   premise (slides imports neither member — the one slides hit is an audit
   doc). `AY.md:176` + `EXECUTION-DAG.md:142` are re-written to cite this doc
   and the chosen disposition. The wording in `AY.md`/`DAG` matches the
   doc's recorded disposition (a `proof:doc-consistency`-style cross-check, or
   a clause in `proof:instrument-scope` asserting the `AY.md` W-IC1 row names
   the chosen arm).

2. **DELETION PROOF (Disposition A) — build-diff.** After the public-surface
   removal, `npm run build` emits NO `dist/instrument-rail.js` and NO
   `dist/instrument-rail.d.ts` (the subpath chunk is gone), while
   `dist/instrument-chassis.{js,d.ts}` STILL emit. Captured as a before/after
   `ls dist/instrument-*` diff attached to the wave close. `npm run typecheck`
   + `npm run verify-export-types` stay green (no dangling subpath-dts probe
   for the removed entry). Under Disposition B this artefact is replaced by
   the `docs/consumer-evidence/instrument-rail.md` presence + the second live
   import site.

3. **GATE-BITE (the load-bearing falsifier).** `npm run proof:instrument-scope`
   exits 0 at HEAD post-edit. Then the captured BITE runs:
   - re-add `export * from "./components/custom/instrument-rail";` to
     `src/index.ts` (Arm A re-grows the orphan) → captured NON-ZERO with the
     violation `InstrumentRail re-exported on the public surface with no
     consumer-evidence doc and <2 consumers`; remove the line → exit 0.
   - delete the speedtest chassis imports in the consumer-walk fixture →
     Clause 1 captured NON-ZERO (`InstrumentChassis has 0 binary consumers —
     fails the retention bar`); restore → exit 0.

   The captured non-zero runs (the `VIOLATIONS:` block naming the planted
   change) are the binding artefacts — not a "the gate exists" claim.

Bite summary (the one-line falsifiers): re-export `InstrumentRail` publicly
with no evidence doc → RED; drop the `/instrument-chassis` subpath or its last
binary consumer → RED; flip the `AY.md` W-IC1 row to a disposition the decision
doc does not record → RED.

## Completion criterion

All three artefacts verify: the decision doc exists with the per-member
consumer graph + the chosen disposition + the slides dismissal, and `AY.md` +
`EXECUTION-DAG.md` cite it; the build-diff shows `dist/instrument-rail.*` gone
+ `dist/instrument-chassis.*` retained (Disposition A) OR the evidence doc +
second consumer present (Disposition B); `proof:instrument-scope` green at
HEAD with the captured BITE non-zero runs. The Band D row reads DONE with the
decision recorded and the consumers reconciled — not as a one-line assertion
but as an evidence-bearing, machine-locked disposition.

## Precept conformance

- **≥2-consumer bar (L invariant 8 / overfitting canon)** — the wave's whole
  spine: `InstrumentChassis` keeps on MEASURED binary-consumer evidence;
  `InstrumentRail` is dispositioned because it fails the bar, not retained by
  public-surface inertia (the false-negative the overfitting canon warns of).
- **Root-not-consumer** — the rail disposition lands in the LIBRARY (drop the
  re-export + subpath + package.json export), not by asking the demo to stop
  importing it; the gate lives in the library.
- **Gestalt / no-workaround** — ONE new gate binds both members; reuses the
  shipped `constellation.mjs` consumer-walk; no parallel orphan-scan harness.
- **No legacy code / clean break** — Disposition A drops the public surface
  with no alias, no deprecation shim, no migration stub (slides/speedtest
  never imported the rail subpath, so there is no consumer to migrate).
- **Cardinal DELTA** — the load-bearing artefacts are a captured build-diff
  (deletion proof) + captured non-zero gate runs (the bite), not assertions.
- **Greenfield-no-meta** — the decision doc + the gate doc-block state the
  CURRENT scope; no "retired in W-IC1" / version-history narration in source.
- **Zero-deferral** — the ONE conditional (Disposition B) names its exact
  precondition (a committed binary consumer THIS tranche) and its exact
  artefact (the evidence doc + second site); absent that, the default
  (A — retire) closes the wave cleanly with no deferral.
