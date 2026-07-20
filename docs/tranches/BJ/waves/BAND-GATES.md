# BJ BAND-GATES — the gate reformation (Family A, the 40-60 collapse)

> **REFABLE RU-03-GATES UNION (2026-07-18).** Verified model: `claude-fable-5` (this run — the
> runtime model, not the requested one). Union provenance: the opus-begat draft (RU-03 BAND-DRAFTS)
> × the Fable ANEW redo, every pin re-proven at HEAD `485891a2`. Fresh evidence authoritative; opus
> rows kept only where RATIFIED. Verdict table: `../formation/refable/REFABLE-RU-03-GATES.md`.
> Headline flips: the springProjection kill is OVERTURNED to a KEEP (RF-1 A3); the enrollment-layer
> rot rows (4 enrolled can't-fail tests, 10 vanish-guards) are added; W2 gains the
> `substrate-paints-color.spec.ts:148` false-RED cure precondition (pin 13 vs 17 presets on disk);
> W3's closure gate walks BOTH CSS channels (FABLE-COLOCATION P6); the stale 251 figure is re-pinned
> **234** (218 demo + 16 src) per RU-13 FLIP F-3.

Registry **Family A** — gate-reformation (`docs/tranches/BJ/formation/REGISTRY.md:32-45`). This band
discharges the user-mandated collapse to ~40-60 invariant gates and, in the same motion, mints the small
set of gates that CAN actually fail — the sound pixel floor wired into CI plus the NEW static-hygiene
gates authored **born-RED** against shipped violations.

This band writes NO source; the fix flips (the CSS re-home, the codemod, the ladder retune) are named as
coordination obligations to sibling waves (Family C/F) per the BI `W-AXES-GATES` "authored born-RED here,
GREEN by the sibling waves" idiom.

## §Band framing — what this band is and is not

The census verdict (`round-1/gate-soundness.md` as corrected by `REFABLE-RF-1.md`), **re-measured at HEAD
`485891a2` with counting bases stated** (the 1055/180 round-2b figure was base-unstated and does not
reproduce; any count-guard uses the bases below):

- **193** test files under `tests/` (`*.test.ts` + `*.test-d.ts` + `*.spec.ts`); **185** carry it/test blocks.
- **1032** line-anchored `^\s*(it|test)\(` blocks; **1050** word-boundary `\b(it|test)\(` occurrences;
  **248** `describe(` blocks.
- tests-visual: **171** spec files / **557** `test(` sites — the binding subset is the ENROLLMENT layer:
  **153 ENROLLED + 5 PI_EXCLUDE (rationaled) + 13 `_`-private** (`tests-visual/pi-runner-manifest.mjs`;
  its `:31` comment says "14" private — actual 13, cured in W1).

The enforced surface is ~20x the mandate and dominated by exact-literal mirror gates that red on a
legitimate design retune, while the ONE sound pixel gate (`tests-visual/substrate-paints-color.spec.ts`)
and the whole visual suite run in **no automated gate** (`grep -rn 'tests-visual\|playwright'
.github/workflows/` = **0** at HEAD; `ci.yml:20-23` = ci/typecheck/test/build; `release.yml:22-37` =
ci/typecheck/build/verify:package/test/publish; root `test` = `vitest run`, `package.json:532`).

Two motions, four waves:

| Wave | Name | Motion | Born-RED? |
|------|------|--------|-----------|
| 1 | `BJ.W-GATE-COLLAPSE` | Reduce the vitest battery to ~45-55 invariant keeps + cure the enrollment-layer rot | No — deletions; acceptance is the census delta (bases pinned) |
| 2 | `BJ.W-PIXEL-FLOOR-CI` | Wire the sound pixel floor (substrate-paints-color) into CI, after curing its stale false-RED pin | Yes — CI-wiring-absent probe + planted black-render self-test |
| 3 | `BJ.W-STATIC-HYGIENE` | Two NEW static gates: token-hygiene · orphan-CSS-partial (both-channel walk; prop-granularity FOLDED to Family C per OPEN-8) | Yes — shipped violations red each at HEAD |
| 4 | `BJ.W-RAMP-RESET` | The Tailwind default-ramp reset as the typography-lint precondition | Yes — 234 ramp-bypass sites (218 demo + 16 src) red the class-ban probe |

**Gate substrate (band-wide, `OPEN-1` — RULED: vitest-fs).** The current tree has **no** `scripts/gates.mjs`
and **no** `scripts/proof-*.mjs`; the single CI enforcement is `npm test` = `vitest run`
(`package.json:532`). The NEW static gates (waves 3-4) are **vitest tests that read the tree via `fs` and
grep** — they land in `tests/gates/` and run inside the existing `npm test` step with zero new CI wiring.
Re-erecting a standalone `gates.mjs` runner would be new machinery against the parsimony edict AND the
gates-abrogation mandate; RULED, not re-litigated. The ONE exception is wave 2 (the pixel floor is
Playwright/browser and cannot run inside vitest).

---

## Wave 1 — `BJ.W-GATE-COLLAPSE` — the invariant-set collapse to ~45-55 keeps

### §Mandate

Discharges `gate:gate-count-overshoot` + `gate:pin-implementation-literal` +
`gate:vacuous-no-assertion` + `gate:testing-the-tooling-fixture-mirror` +
`gate:redundant-surface-snapshot` (Family A roster, `REGISTRY.md:35-40`). The USER mandate: collapse to
~40-60 invariant gates (MEMORY `gates-abrogation`). `gate:mirror-implementation-self-fixture` is
**discharged by refutation** — see the KEEP flip below.

### §Design — the keep-list and the kill classes

**KEEP (~45-55 invariant gates, all verified present at HEAD):**

- `tests/styles/token-graph.test.ts` — token-graph cycle/resolution invariants.
- `verify:package` = `scripts/verify-export-types.mjs` (`package.json:534`) — packed export resolution.
- `tests/public-surface.spec.ts` — the authoritative root + per-subpath public-surface lock
  (`exactSubpathRuntimeSurfaces` defined `:365`, asserted `:514`; exact root `:492`).
- `tests/components/ui/reka-binding-idiom.test.ts` — the reka prop/emit binding render canary (the
  `:pressed`/`v-model:search-term`/`tag=` silent no-op class, MEMORY `glass_ui_binding_verification`).
- the `*.public-contracts.test-d.ts` cross-package type-parity checks.
- the per-component **behavioral contract cores** — the assertion BODIES that exercise real component
  behavior (minus the `Object.keys(Surface)` heads killed below).
- the surviving **style ordering / graph invariants**: `glass-subtlety.test.ts:89-92` (ordering
  floating>quiet), the `radius-dialog-bind` bind-GRAPH checks (`:57-62,72-73`, NOT the terminal literals),
  the `typography.test.ts` **1/√φ relationship** at `:13` (NOT the `:15` materialized constant), token-graph
  cycle.
- **`tests/composables/motion/springProjection.test.ts` — KEPT (the RF-1 A3 overturn).** The round-1
  "self-mirror, cannot fail on a generator bug" claim is REFUTED: the gate recomputes stops from
  `SPRING_PRESETS` at test time and asserts `scheme-spring.css` contains them, so it fails on (a) any
  preset-table edit without a regen re-run, (b) any springProjection code change after generation,
  (c) hand-edits — the normal limit of any generated-file sync gate, and the repo's ONLY spring
  regen-drift protection. Retiring it deletes real coverage. Rider: cure the three stale comments in
  `scripts/regen-spring-tokens.mjs` (`:200` claims "the sync gate imports `generateBlock`" — nothing in
  the repo imports it; the real sync gate is this test).
- the **wired-up** `substrate-paints-color` aurora non-black + blob coverage floors (delivered by wave 2).
- the INBOUND sibling-band newcomers, reserved in the census arithmetic — the COMPLETE standing set
  (APOTHEOSIS MECH-06/D-08): `BAND-A11Y` **W3-C**'s ONE table-driven contrast-floors gate (absorbing
  its W1-D source scan; RU-03-A11Y routing 7), `BAND-COLOCATION` W3's hygiene fence (Form B only —
  Form A folds into the audit doc and costs zero), **`BAND-PERF`'s FOUR standing `tests/gates/`
  vitest gates (boot-graph · shell-field-governance · deferred-paint · route-pending — permanent per
  its OPEN-P0 ruling)**, and this band's own W3 (2) + W4 (1) gates. W2's two pixel floors are
  Playwright in `tests-visual/`, outside the vitest base but inside the enforced surface. The
  keep-list is pinned so keeps + the enumerated newcomers ≤ 60 by arithmetic (**keeps ≤ 52**, ≤ 51
  under Form B), stated IN the count-guard test. STORY/FM/REDUCTION declare ZERO standing gates
  (posture lines landed by APOTHEOSIS); the count-guard's pinned base is the INVARIANT-GATE census
  (the keep-list files + `tests/gates/**`) — sibling ordinary per-component regression tests are
  out-of-base by the guard's stated counting method, per the mandate's own language ("~40-60
  invariant gates").

**KILL (the delta that lands the count in-band):**

| Kill class | Sites / count | Evidence (verified at HEAD `485891a2`) |
|------------|---------------|----------------------------------------|
| Literal-mirror asserts | 5 named + the broader style/demo class | `glass-subtlety.test.ts:62-88` (blur px pinned 7/7/11/11 + wash 1 + deep 16px + hidpi 17px); `dialog/graded-backdrop.test.ts:126-141` (`--glass-halo-blur:20px`, core 13rem, bloom 7rem, `blur(calc(34px))`) — CONTINGENT, see below; `demo/aurora-stage-affordance.test.ts:102` (amplitude===0.45; swirl kept as invariant); `demo/springs-story.test.ts:59-64` (`--preview-start:1.5rem` etc.); `typography.test.ts:15` (`0.7861513777574233`, redundant with the `:13` relationship) |
| Demo-fixture pins | ~2 files | `aurora-stage-affordance.test.ts`, `springs-story.test.ts` (demo config mirrors, not library contracts) |
| Zero-assert capture producers | **6 files** | `tests-visual/{_cohere-capture,_cohere-debug,_cohere-shadow-debug,_fix-glassui-dark-capture,_prim-polish-capture,_wdelta0-capture}.spec.ts` — `grep -c 'expect('` = 0 each. NOTE (RF-1 F1): all 6 are `_`-private and already OUTSIDE the enrolled binding set — they pad the raw `playwright test` run, not the enrolled census; the relocation out of the `*.spec.ts` glob is still right |
| **Enrolled can't-fail tests** | **4 tests** | ba-animate.spec.ts`:276`, card-composite.spec.ts`:251`, spring-ease.spec.ts`:296` (its comment delegates the binding assert to "proof:spring-ease S6" — a RETIRED gate; no `proof:*` script exists), stage.spec.ts`:200` — terminal `expect(true)` inside the ENROLLED binding set; convert to a real readback or excise (RF-1 F2) |
| **Vanish-guard rot audit** | **10 specs** | `test.skip(true, …)` skip-if-absent guards (affordance-map, aurora-arresting, deck-slide, disclosure-rotate, fading-scroll, lensing, press-unify, safari-webgl, viz-interaction, webgpu-everywhere) + ~5 bare `count()===0 → skip()` — a route rename converts these to pass-by-skip forever, the silent-rot twin of RED-BY-ROT (RF-1 F3); audit each for booked-successor rot, convert to fail-on-absent where the target is load-bearing |
| Tooling self-test | 1 file | `tests/scripts/profile-bundle-value-js.test.ts:48-80` — validates the `profile:bundle` dev report against its own classification table, not the shipped lib |
| Duplicate surface-lock heads | **8 files** (not "dozens") | the `Object.keys(<X>Surface).toEqual([...])` heads in `*.contract.test.ts` (e.g. `slider.contract.test.ts:8-10`) — redundant with the one `public-surface.spec.ts` lock; keep the behavioral bodies, drop the heads |
| Stale gate-infra comments | 2 cures | `pi-runner-manifest.mjs:31` "14 private" → **13**; `regen-spring-tokens.mjs:200` phantom sync-gate importer claim (rides the springProjection KEEP + the REPAIR rider in §Work). The `subpath-policy.mjs` bucket headers (`:49/:62/:68/:70` + `:99/:104`) are OWNED by `BAND-DOC-TRUTH` T26 — ONE owner (APOTHEOSIS MECH-01); this wave does not touch that file |

> **`graded-backdrop.test.ts` literal-collapse — CONTINGENT on `BAND-MATERIAL` W3 (adjudicated,
> ruling 7).** The `20px`/`13rem`/`7rem`/`34px` pins collapse into relationship checks ONLY IF
> `BAND-MATERIAL` W3 (`BJ.W-GRADED-BACKDROP-JUDGE`, OPEN-3a) rules **ADOPT**; on **DECLINE**, W3
> STRIPS the whole `--glass-halo-*` cohort + this test, so there is nothing to collapse. Do not land
> this file's kill until W3 rules adopt/decline.

### §Work

- Replace each literal-mirror head with the underlying RELATIONSHIP it guards (ordering / bind-graph /
  bounded-range) where a real invariant exists; delete it outright where the value is a free design tunable.
- **KEEP `springProjection.test.ts` intact** (the sync gate); fix the `regen-spring-tokens.mjs` stale
  comments so the rationale names the real gate. (`OPEN-2` DISSOLVED — its premise was the refuted
  round-1 claim.) **REPAIR rider (APOTHEOSIS D-10 — the "RU-33 r5 infra row" had no carrier in any
  band):** `regen-spring-tokens.mjs` is BROKEN at HEAD (`BLOCK_START_MARKER` matches nothing in
  `scheme-spring.css` — zero "§2" hits); this wave owns the repair-or-retire: re-anchor the marker so
  the curve generator emits again, OR — if the repair proves disproportionate on the diff — retire the
  generator explicitly and record `springProjection.test.ts` as the sole spring-sync mechanism. Never a
  silently-broken ship; `BAND-DOC-TRUTH` lands the hand-truth + sync pins either way.
- Convert-or-excise the 4 enrolled can't-fail capture tests; audit the 10 vanish-guards (fail-on-absent
  where the route/component is load-bearing, delete where the target is retired).
- Move the 6 zero-assert `tests-visual/*.spec.ts` OUT of the `*.spec.ts` glob (rename to `*.capture.mjs`
  or relocate to a `scripts/` producer). (Coordinate with wave 2's "fail-CLOSED" framing retire.)
- Retire `tests/scripts/profile-bundle-value-js.test.ts` from the gate suite.
- Strip the `Object.keys` surface heads from the 8 `*.contract.test.ts` files; leave the behavioral bodies.
- `canon-doc.mjs` (`OPEN-3` — RULED: retire). `scripts/lib/canon-doc.mjs` is imported by no test and no
  script (verified). Wave 3's `orphan-CSS-partial` covers the green-over-stub risk it was built for
  (`OPEN-7` folds here); parsimony rules the delete.
- Cure the stale gate-infra comments (the last kill-table row).

### §Acceptance

- **Not born-RED** — this wave is a DELETION/collapse; there is no live defect a probe reds. Its evidence
  is the census delta on the PINNED base: line-anchored `^\s*(it|test)\(` over `tests/` **1032 →
  ~45-55 keeps** (+ the enrolled-visual and sibling newcomers accounted), with the kill classes executed
  as enumerated and each contingency honored.
- `OPEN-4` — RULED: adopt the **light count-guard** (one test asserting the line-anchored census ≤ 60),
  with its counting base stated IN the test — the 1055-vs-1032 base ambiguity is the exact hazard the pin
  prevents. Born-RED at 1032; GREEN at the collapse.

### §π/DELTA

None — device-free vitest reshape; zero pixel change.

### §KISS / parsimony

Net-negative LOC. No new abstraction; the keep-list is the existing sound subset, the kills are
enumerated deletions. Gestalt, not patchwork — one collapse, not per-file patches.

### §Non-goals

- NOT authoring new gates (waves 2-4).
- NOT changing any component or style source (the demo-fixture pins are deleted, not their fixtures).

---

## Wave 2 — `BJ.W-PIXEL-FLOOR-CI` — wire the sound pixel floor into CI

### §Mandate

Discharges `gate:unwired-gate-non-execution` (π suite) + `surface:absent-gate-over-declared-enforcement` +
`chronic:liveness-enforcement-abrogated` (`REGISTRY.md:36,41`). The user-relevant defect: a black/broken
**live** render passes every enforced gate today because the only pixel-readback gate runs in no CI job.

### §Design

`tests-visual/substrate-paints-color.spec.ts:135-228` is a REAL non-black + coverage-band pixel gate
(aurora interior `maxChannel > 0`; blob coverage ~0.10-0.70) that mounts the actual component and reads
back the **composited element screenshot** (`:9-28` — the no-`getContext` discipline is already the
spec's own readback doctrine). It catches the exact blindspot the device-free vitest oracles pass (a
BLACK aurora / FLOODED blob). It executes in NO CI step; the visual workspace is invoked only by
`release.sh` as a manual human pre-tag review. Wire the **sound subset only** — the two
non-black/coverage FLOORS, not the per-preset hue/chroma parity (that is Family G's W10/W11). The wiring
target is the existing `test:substrate` script (`tests-visual/package.json:9`).

**PRECONDITION — cure the shipped false-RED (FABLE-NEW, via GF-AURORA PASS3 §3.9 / RU-07 N6).**
`substrate-paints-color.spec.ts:148` pins `expect(presetKeys.length).toBe(13)` while
`demo/stories/substrates/aurora/presets.ts` carries **17** keys at HEAD (verified by running the spec's
own `sourcePresetKeys()` parse). Wired as-is, the gate REDs on staleness, not paint — a false-RED that
would poison the born-RED discipline on day one. Cure at wire time: re-pin deliberately (the count pin is
the staleness witness; the sourced walk is the invariant), and COORDINATE with `GF-AURORA` W5
(PRESET-REDUCTION 17→10), which moves the number again — the wire-time pin must be the on-disk count, and
the GF wave re-pins at its cut.

### §Work

- Add a CI job (a job in `ci.yml`) that: installs the Playwright browser
  (`npx playwright install --with-deps chromium`), builds + serves the routed demo, and runs the
  `test:substrate` script.
- Cure the `:148` count pin first (precondition above).
- **Fail-on-SKIP (adjudicated, ruling 5):** the job MUST treat "no GL context / test SKIPped / no browser
  binary" as **RED**, not pass — assert a context was obtained AND it painted non-black. Without this,
  SwiftShader's befitting-silent skip re-creates the very `gate:unwired-gate-non-execution` this wave
  cures. Read the machine report, never the piped exit code (the pipe-trap rule).
- **Force the deterministic path:** prefer/assert the **WebGL floor path** the ubuntu runner actually
  executes (not WebGPU-on-SwiftShader, which is fragile and may skip); assert which path ran. Keep the
  floor COARSE (non-black + coverage only — already scoped).
- Retire the "fail-CLOSED" framing (`playwright.config.ts`) from any spec no gate runs — and from the 6
  zero-assert files (coordinate with wave 1's relocation).

### §Acceptance — born-RED

- **Born-RED probe (wiring-absent):** `grep -rn 'tests-visual\|playwright' .github/workflows/` = **0 at
  HEAD** (re-verified at `485891a2`). GREEN when the CI job invokes the substrate spec.
- **False-RED cured:** the `:148` pin equals the on-disk preset count at wire time; the sourced-walk
  covers every key.
- **Teeth self-test (the gate is not hollow):** a planted defect — force the aurora canvas to paint black
  (or the blob to flood) — must red the floor. Ship as a `--planted` self-test bite.
- **SKIP is RED, path is asserted (ruling 5):** a run that obtains no GL context / SKIPs / finds no
  browser binary FAILS the gate; the job asserts the WebGL floor path ran and painted non-black.

### §π/DELTA

**This wave IS the π obligation.** The evidence artefact is a captured CI run showing (a) GREEN on the
real render, (b) RED on the planted black-aurora bite — the born-RED→GREEN differential per MEMORY
`live_verify_capture` (a captured DELTA, not a commit-message claim).

### §OPEN-5 — the CI-runner GPU risk — AMENDED (ruling 5, empirical not a user preference)

`substrate-paints-color.spec.ts:14-18` documents: on a real GPU (Metal) the substrate paints; a GPU-less
CI runner SwiftShader-degrades and the driver SKIPs befitting-silent when no browser binary is installed.
`playwright.config.ts` already passes `--enable-unsafe-swiftshader --enable-features=Vulkan`. The
adjudicated posture: **fail-on-SKIP · force the WebGL floor path · keep it coarse · empirical
acceptance** (no CI-enforcement claim until a real CI run shows the planted black-render bite go RED on
the target ubuntu runner).

**The lone conditional escalation (a CONDITIONAL ASK row, not a live one):** IF the empirical probe shows
the coarse floor cannot paint non-black on ubuntu even on the WebGL path, the fallback choice —
self-hosted GPU runner (infra cost) vs keeping the floor as the pre-tag `release.sh` gate WITH a captured
artefact (never a silent skip) — surfaces as a user ASK row. Carried CONDITIONALLY; live only if the
probe fails.

### §Non-goals

- NOT the per-preset hue/chroma/parity gates (Family G).
- NOT adding new pixel assertions to the spec — wire the EXISTING sound floors only (after the `:148` cure).

---

## Wave 3 — `BJ.W-STATIC-HYGIENE` — two NEW born-RED static gates (prop-granularity folded to Family C)

### §Mandate

Discharges `canon:unenforced-token-system` + the orphan-CSS gate gap (round-2b **critical**
`orphaned-css-import-closure`, live-confirmed R3a). These are the Family A wave-candidate-3 gates
(`REGISTRY.md:44`): **token-hygiene · orphan-CSS-partial** are authored born-RED here against shipped
violations; **prop-granularity dead-config is FOLDED into Family C's overfitting audit** (a one-shot
audit line, not a standing Family-A gate — adjudicated, FINDING-5 / OPEN-8), because its defect-status is
a Family-C design ruling, not an unambiguous hygiene violation.

### §Design — two gates, one wave (vitest-fs per the RULED OPEN-1)

**(A) `gate:token-hygiene` — raw radius/blur literals off the ladder.** Grep `src/` for raw
`border-radius`/`backdrop-filter`/`blur()` literals outside the theme/tokens files; every non-exempt
literal reds. (The `font-size` arm is deferred to wave 4, which owns the type-ladder precondition.)

Born-RED violations shipped at HEAD `485891a2` (all re-verified; RU-21 routing 4 concurs):
- `src/components/drawer/styles.css:379` — `backdrop-filter: blur(14px)` (off the `--glass-blur-*` ladder).
- `src/components/sortable-list/SortableList.vue:144` — `border-radius: 999px` (raw; should be the pill token).
- `src/components/tabs/styles/segmented.css:169` — `border-radius: 0.3125rem`; `:306` — `0.25rem`.

`OPEN-6` (allowlist — stays open, wave-time Fable ruling): true circles `border-radius:50%`,
organic-blob radii, `line-height:1`/`0` inline-box resets. Too permissive and the gate is toothless; too
strict and it false-positives on deliberate geometry.

CANDIDATE second arm (RU-21 N1, noted — primary owner `BJ.W-REDUCE-TIMELINE`): element-level
`--glass-level` writes against `:root`-baked tokens (`GlassTimeline.vue:209-213` the exemplar — a
dead-write class the repo itself documents as a trap). Adopt as a lint arm only if the timeline redesign
confirms the class generalizes; do not mint it speculatively.

NOTE (corner-k, already owned — no gate here): `src/styles/theme/radius.css:112-116` claims
`--corner-k-soft/-sharp` "ARE pinned by proof:squircle-language" — **no such gate exists anywhere at
HEAD** (no `proof:*` script, no test cites it). The dead-pair delete is `BAND-MATERIAL` W1's;
`DOC-TRUTH` T6 cures the comment if MATERIAL declines (ADJUDICATION-1 ruling 9). token-hygiene does NOT
re-anchor a gate for it.

**(B) `gate:orphan-CSS-partial` — the CSS-reachability closure gate, BOTH channels.** Assert every
`.css` partial under `src/` is reachable via **either** channel: (1) the `src/styles/index.css`
`@import` closure (transitive), or (2) a component reference (`<style src=` / a JS-side import) — the
FABLE-COLOCATION P6 clause, reaffirmed by RU-11 and RU-03-COLOCATION R5. An `@import`-only walker is
wrong twice over: **19 references across 18 SFCs** consume CSS via `<style src=` at HEAD (the
NumberField family carries the double; the false-RED set is the 18-file set — APOTHEOSIS MECH-11), and a
component-dir partial referenced by neither channel would sit outside an `src/styles/`-scoped walk
entirely. Any partial reachable by NO channel reds.

Born-RED violations shipped at HEAD (re-verified — the round-2b **critical**, R3a live-confirmed):
- `src/styles/glass/glass-chip.css` + `src/styles/glass/glass-atom.css` exist; the `glass.css` `@import`
  block (`src/styles/glass.css:46-107`) omits both; the ONLY repo-wide reference is a comment
  (`dock/styles/shape.css:170`). Shipped-broken proof: 0 `.glass-chip` rules in the published dist;
  R3a live: a selectable chip toggled `aria-pressed=true` paints ZERO accent feedback.

The fix flip (re-home the two `@import`s) is **`BJ.W-CSS-CLOSURE-RESTORE` (MATERIAL W7)** — this wave
authors the GATE born-RED; the CSS re-home flips it GREEN with the dist rule-count + live accent-flood
re-verify. `OPEN-7` — RULED, folds into W1's canon-doc retire: orphan-CSS-partial covers the
green-over-stub role.

**(C) prop-granularity dead-config — FOLDED to Family C (OPEN-8 RULED, FINDING-5).** No standing
Family-A gate. The Card `grain: true` / `metal: "gold"` finding is REAL and handed to Family C
(`BAND-REDUCTION` W2 `G-CARD-DEFAULT-PAINT` owns the born-RED; the overfitting audit carries the
prop-granularity crawl at tranche close). TWO RIDERS (RF-1): (1) any prop-cut consuming the round-1
setter scans must re-derive against the 8-repo constellation first — the in-repo-only scans failed
sibling truth in 12 of 15 findings (RF-1 §B); (2) `docs/audits/overfitting-audit.md:5` claims
`proof:component-orphan` + `proof:consumer-evidence-live` "enforce continuously" — FALSE at HEAD (no
`proof:*` scripts exist); the claim is rewritten by the audit's own rerun or DOC-TRUTH — this band does
NOT mint a third gate to make the doc true (the collapse mandate cuts the other way).

### §Work

- `tests/gates/token-hygiene.test.ts` — fs-read `src/**/*.{css,vue}`, regex the raw radius/blur literals,
  assert none outside the allowlist. Self-test bite: a planted `blur(9px)` reds.
- `tests/gates/orphan-css-partial.test.ts` — build the reachability set from BOTH channels (the
  `index.css` @import graph ∪ `<style src=`/import references), assert every `src/**/*.css` partial is
  reachable. Self-test bite: a planted orphan partial reds.
- (No `tests/gates/prop-granularity.test.ts` — folded per OPEN-8.)

### §Acceptance — born-RED

- token-hygiene RED at HEAD: `drawer/styles.css:379` blur(14px) + `SortableList.vue:144` 999px +
  `segmented.css:169/:306` raw radii. GREEN when the fix waves repoint them (MATERIAL W1/W2).
- orphan-CSS-partial RED at HEAD: glass-chip.css + glass-atom.css reachable by NEITHER channel. GREEN
  when the CSS re-home lands (MATERIAL W7).
- Each gate ships a self-test bite proving it reds on a planted violation (not hollow).

### §π/DELTA

None for the gates themselves (device-free static scans). The DOWNSTREAM fix flips carry the paint
obligations in the sibling FIX waves (MATERIAL W7 owes the live chip accent-flood re-verify), NOT here.

### §KISS / parsimony

Two small fs-grep tests, no runner, no CI wiring (they ride `npm test`). Each ~20-40 lines. The gate is
the parsimony enforcer: it makes the ladders lintable so future off-ladder literals fail at build, not in
a user's eyes.

### §Non-goals

- The `font-size`/`line-height`/`letter-spacing` literal arm → wave 4.
- The blur-LADDER retune (collapse quiet==resting, document the 2dppx arm) → Family F.
- The CSS re-home, radius repoint, Card default decision → sibling FIX waves. Authored born-RED here;
  GREEN by them.

---

## Wave 4 — `BJ.W-RAMP-RESET` — the Tailwind default-ramp reset (typography-lint precondition)

### §Mandate

Discharges `default-ramp-coexists` (round-2 typography **critical**) + `default-scale-bypass` +
`self-inconsistent-canonical-scale` + `no-enforcement-infrastructure` (round-2b typography). The √φ
ladder is well-formed but **NOT enforceable**: the @theme bridge only ADDS named rungs and never resets
Tailwind v4's built-in ramp, so `text-sm` (0.875rem STATIC) and `text-xs` (0.75rem STATIC) silently
bypass the fluid clamps — a linter cannot tell the scale rung `text-small` from the off-scale `text-sm`
until the default ramp is cleared. F15's typography enforcement rides here (RF-5).

**THE FIGURE (RU-13 FLIP F-3, re-verified at HEAD `485891a2`): 234 sites = 218 demo + 16 src**, by
`grep -rEn '\btext-(sm|xs)\b' --include="*.vue" --include="*.ts" src demo`. The include filter is
LOAD-BEARING — the bare word-boundary grep returns ~257 lines, inflated by CSS token/comment hits
(`--control-text-sm` etc.). The previously standing **251** figure is STALE; every wave-time re-count
uses the filtered method or it mis-reconciles. Demo decomposition: `text-sm` ×118 + `text-xs` ×100.
The **9** arbitrary `text-[…px|rem|em]` sites are a separate named arm (verified 9 at HEAD).

### §Design — the precondition chain (three ordered edits)

1. **Tokenize the residual canonical literals** (the source-of-truth files must dogfood their own tokens,
   or a no-literal lint false-positives on them). Verified at HEAD:
   `src/styles/typography/utilities.css:59` `letter-spacing:0.02em` (orphan — no rung), `:66` `0.025em`
   (== `--type-tracking-wide`, raw), `:65,:93` `line-height:1.25`/`1` (unrung);
   `semantic.css:235,241` `line-height:1.25`/`1`. Repoint the token-equal ones; mint or exempt
   `1.25`/`0.02em`. `OPEN-9` — **RULED (APOTHEOSIS MECH-10): ownership stays HERE** as the minimal
   landability precondition; `BAND-MATERIAL` W6 consumes the tokenized canon and does not re-own it
   (its own disclaim ratifies the lean — one status, stated once).

2. **The default-ramp reset.** Add `--text-*: initial; --leading-*: initial; --tracking-*: initial`
   (the Tailwind v4 `@theme` clears) in `src/styles/theme/bridges.css` so ONLY the named √φ rungs exist.
   Verified absent at HEAD (bridges.css mints ladder bridges, no reset). **This edit cannot land
   standalone** — resetting the ramp makes `text-sm`/`text-xs` inert, so the 234 sites lose their
   font-size → visual regression. COUPLED to the codemod (§Obligations).

3. **The type-literal + utility-class ban lint** — the born-RED gate this wave authors:
   - **CSS-declaration arm:** raw `font-size`/`line-height`/`letter-spacing` literals in `src/`+`demo/`
     outside the (now-tokenized) canon. Born-RED at HEAD: `tabs/styles/segmented.css:171` `0.8125rem`,
     `:184` `0.875rem`; `dock/styles/layer-group.css:205` `0.75rem`; the `0.1em` ×2
     (`dropdown-menu/styles.css:94`, `command/styles.css:123`, == `--type-tracking-caps`).
   - **Utility-class arm:** ban Tailwind's built-in `text-(xs|sm|base|lg|xl|…|9xl)`, `leading-[…]`,
     `tracking-[…]`, and arbitrary `text-[…px|rem|em]` in `.vue`/`.ts`. Born-RED at HEAD: **234**
     filtered `text-sm`/`text-xs` sites (218 demo + 16 src) + **9** arbitrary `text-[…]`.

### §Work

- `src/styles/typography/utilities.css` + `semantic.css` — tokenize the residual literals (per `OPEN-9`).
- `src/styles/theme/bridges.css` — the `--text/leading/tracking: initial` reset (COUPLED to the codemod).
- `tests/gates/type-hygiene.test.ts` — the CSS-declaration + utility-class ban (vitest-fs), the counting
  method stated IN the test (the filtered grep). Self-test bites: a planted `text-sm` in a `.vue` and a
  planted raw `font-size:13px` both red.

### §Acceptance — born-RED

- **Utility-class arm RED at HEAD:** 234 filtered sites (218 demo + 16 src, method stated). GREEN when
  the codemod migrates them onto `text-small`/`text-caption`/`text-micro`.
- **CSS-declaration arm RED at HEAD:** `segmented.css:171/:184`, `dock/styles/layer-group.css:205`, the
  two `0.1em`. GREEN when repointed to `var(--type-*)`.
- Self-test bites prove teeth.

### §π/DELTA

None for the gate. The ramp-reset FLIP carries a real paint obligation — it can regress 234 element
sizes if landed before the codemod — so the reset+codemod pair MUST ship with a paint π (before/after on
the heaviest pages: `springs.vue`, `slider.vue`) captured by `BAND-MATERIAL` W6 (`BJ.W-TYPE-CODEMOD`),
NOT here.

### §Obligations — the reset/codemod coupling (the load-bearing coordination)

The default-ramp reset and the **234-site** codemod (`text-sm`→`text-small`, `text-xs`→`text-caption`/
`text-micro`) are ONE atomic flip — the reset alone regresses. Per the BI `W-AXES-GATES` idiom, this wave
authors the gate **born-RED**; **`BAND-MATERIAL` W6 (`BJ.W-TYPE-CODEMOD`)** owns the codemod + the
coupled reset flip + its paint π (adjudication ruling 2). **The scopes stated exactly:** the born-RED
probe THIS gate reds is the filtered 234 (218 demo + 16 src) + the 9 arbitrary `text-[…]` on the
utility arm AND the four CSS-declaration sites (`segmented.css:171/:184`, `layer-group.css:205`, the
`0.1em` ×2) on the declaration arm; the coupled FLIP W6 lands the same utility set + those four
CSS-declaration repoints (now enumerated in MATERIAL W6 §Work — APOTHEOSIS MECH-02). `OPEN-10` RULED: the gate + residual
tokenization stay here; the reset+codemod land in `BAND-MATERIAL` W6. The two waves MUST land in the same
tranche cut so the gate is never RED-at-tag (ruling 2 / CHALLENGE FINDING-3).

### §KISS / parsimony

One fs-grep gate. The reset is a handful of `initial` lines that COLLAPSE the type vocabulary to a single
source — after it, `text-sm` is a build-visible unknown, not a silent bypass.

### §Non-goals

- The 234-site codemod itself → `BAND-MATERIAL` W6 (`BJ.W-TYPE-CODEMOD`).
- The F10 story-hierarchy pass → Family D/F.
- The mono-caps caption idiom kill → Family D (a sweep + StorySection rework, not a gate).
- The font-family role-collapse note → informational, no gate.

---

## §Band-level obligations & OPEN roll-up

**Coordination handoffs (authored born-RED here → GREEN by siblings):**
- orphan-CSS-partial (W3) → the CSS re-home of glass-chip/glass-atom (`BJ.W-CSS-CLOSURE-RESTORE`,
  MATERIAL W7), with the dist rule-count + live accent-flood re-verify.
- token-hygiene radius/blur (W3) → the ladder repoints (MATERIAL W1 radii incl. the corner-k dead-pair
  delete, MATERIAL W2 drawer blur).
- prop-granularity Card gold+grain → FOLDED to Family C's overfitting audit (constellation-scoped
  re-derivation mandatory, RF-1 §B) + `BAND-REDUCTION` W2 owns the born-RED.
- type-hygiene + ramp-reset (W4) → the 234-site codemod + coupled reset flip + paint π (`BAND-MATERIAL`
  W6), same-cut law.
- pixel floor (W2) → the `:148` pin re-lands at `GF-AURORA` W5's preset cut (the sourced walk is the
  invariant; the pin is the staleness witness).
- W1 keep-list census ← inbound newcomers: `BAND-A11Y` W3-C contrast-floors table gate, `BAND-COLOCATION`
  W3 hygiene fence (if Form B), `BAND-PERF`'s four `tests/gates/` standing gates (APOTHEOSIS
  MECH-06/D-08 — the full enumerated set lives in the W1 keep-list bullet).

**OPEN roll-up (post-union):**
1. Gate substrate — **RULED: vitest-fs** (parsimony + the abrogation mandate). [band-wide]
2. springProjection — **DISSOLVED**: the kill premise was refuted (RF-1 A3); the sync gate is KEPT. [W1]
3. `canon-doc.mjs` — **RULED: retire** (orphan-CSS-partial covers the role; OPEN-7 folded). [W1]
4. Collapse count-guard — **RULED: adopt**, counting base pinned in the test. [W1]
5. Pixel-floor CI-runner GPU risk — **AMENDED (ruling 5)**: fail-on-SKIP + force the WebGL floor path +
   keep coarse + empirical acceptance; the infra-vs-pretag fallback is a CONDITIONAL ASK row. [W2]
6. token-hygiene allowlist — OPEN (wave-time Fable ruling). [W3]
7. orphan-CSS-partial vs canon-doc overlap — **RULED with 3**: folded. [W3]
8. prop-granularity form — **RULED (FINDING-5)**: folded to Family C. [W3]
9. Residual-canon tokenization ownership — **RULED (APOTHEOSIS MECH-10): stays in W4** (MATERIAL W6's
   disclaim ratifies the lean). [W4]
10. Ramp-reset landing — **RULED (ruling 2)**: gate + residual tokenization here; reset+codemod in
    `BAND-MATERIAL` W6; same cut, never RED-at-tag. [W4]

**In-scope count (APOTHEOSIS-corrected arithmetic, MECH-06/D-08):** the invariant-gate census after W1
= keeps (**pinned ≤52**; ≤51 under COLOCATION Form B) + 2 static gates (W3) + 1 type-hygiene gate (W4)
+ the inbound A11Y W3-C contrast gate + `BAND-PERF`'s 4 standing `tests/gates/` gates (+ the COLOCATION
fence if Form B) ≤ 60 by construction; the 2 CI-wired pixel floors (W2) are Playwright, outside the
vitest base but inside the enforced surface. The enforced surface lands in the mandated 40-60 band
with, for the first time, gates that CAN fail on a real regression rather than on a legitimate retune.

**Lead rider (STAB2, 2026-07-17) — the slider interaction-test discipline.** R3b's
interaction-robustness finding: the slider's `role=slider` node is NOT the hittable pointer target
(zero-width thumb span; synthetic pointers no-op; only trusted CDP keyboard moved it). The suite
reformation (W1/W2) adopts the discipline as a standing rule: slider interaction tests target the
track element or use keyboard — never the role node. Binding on every future slider spec.

---

## APOTHEOSIS amendments (RU-04 third judge, 2026-07-18)

Applied per `../formation/refable/REFABLE-RU-04-JUDGE.md`; the capstone is `APOTHEOSIS.md`.

- **MECH-01 (BLOCKER):** the W1 stale-comment kill row cedes its `subpath-policy.mjs` member to
  `BAND-DOC-TRUTH` T26 — one owner on one file; the row keeps `pi-runner-manifest.mjs:31` +
  `regen-spring-tokens.mjs:200`.
- **MECH-06/D-08:** the W1 inbound-newcomer roster now enumerates the COMPLETE standing set (PERF ×4
  + A11Y W3-C + own W3/W4 + COLOCATION-if-Form-B); keeps pinned ≤52 so the ≤60 guard holds by
  arithmetic; the count-guard's base defined as the invariant-gate census (keep-list files +
  `tests/gates/**`), sibling ordinary regression tests out-of-base by stated method.
  **[LEAD 2026-07-19, ledger E4 — the judge's design cure is ADOPTED; the veto lane (RU-04-JUDGE
  §5.6) is CLOSED un-exercised.** Basis: the base-as-invariant-census reading is the mandate's own
  language ("~40-60 invariant gates"), and the alternative (count every `it()` in `tests/`) makes
  any lawful sibling regression test a false-RED — the latent defect MECH-06 named. The veto path,
  recorded for the record: had it been exercised, the keep-list would pin far lower or the ceiling
  rise against declared sibling regression tests; any FUTURE widening of the counting base is a new
  lead ruling, never a drift.]
- **MECH-09/D-11:** the inbound contrast gate re-cited A11Y W1 → **W3-C** (both locations).
- **MECH-10:** OPEN-9 CLOSED — residual-canon tokenization stays in W4 (MATERIAL W6's disclaim
  ratifies the lean).
- **MECH-11:** W3(B) "19 SFCs" corrected to "19 references / 18 SFCs".
- **MECH-02/D-12:** the W4 §Obligations born-RED sentence now names BOTH arms' scopes and the four
  CSS-declaration repoints W6 lands (one figure governs both bands).
- **D-10:** the `regen-spring-tokens.mjs` REPAIR-or-retire is assigned HERE as a W1 rider (the
  "RU-33 r5 infra row" had no carrier anywhere in the corpus).
