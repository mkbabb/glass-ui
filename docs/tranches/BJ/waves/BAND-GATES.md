# BJ BAND-GATES — the gate reformation (Family A, the 40-60 collapse)

Registry **Family A** — gate-reformation (`docs/tranches/BJ/formation/REGISTRY.md:32-45`). This band
discharges the user-mandated collapse to ~40-60 invariant gates and, in the same motion, mints the small
set of gates that CAN actually fail — the sound pixel floor wired into CI plus three NEW static-hygiene
gates authored **born-RED** against shipped violations.

**DRAFT for the Fable two-challenge pass.** Every unsettled judgment is an `OPEN` marker, not a guess.
This band writes NO source; the fix flips (the CSS re-home, the codemod, the ladder retune) are named as
coordination obligations to sibling waves (Family C/F) per the BI `W-AXES-GATES` "authored born-RED here,
GREEN by the sibling waves" idiom.

## §Band framing — what this band is and is not

The census verdict (`round-1/gate-soundness.md`, confirmed independently in
`round-2b-confirm/adversarial-on-disk-verification-of-the-8-remaining-round-1.md`): the enforced surface is
**1055 it/test blocks across 180 files / 248 describes** (round-2b independent count; round-1 counted 1032
across 193) — ~20x the mandate — and it is dominated by exact-literal mirror gates that red on a legitimate
design retune, while the ONE sound pixel gate (`tests-visual/substrate-paints-color.spec.ts`) and the whole
557-test π suite run in **no automated gate** (`grep -rn 'tests-visual\|playwright' .github/workflows/` = 0;
CI runs only `typecheck; npm test (=vitest); build`, `.github/workflows/ci.yml:22-24`).

Two motions, four waves:

| Wave | Name | Motion | Born-RED? |
|------|------|--------|-----------|
| 1 | `BJ.W-GATE-COLLAPSE` | Reduce the vitest battery to ~45-55 invariant keeps | No — deletions; acceptance is the census delta |
| 2 | `BJ.W-PIXEL-FLOOR-CI` | Wire the sound pixel floor (substrate-paints-color) into CI | Yes — CI-wiring-absent probe + planted black-render self-test |
| 3 | `BJ.W-STATIC-HYGIENE` | Three NEW static gates: token-hygiene · orphan-CSS-partial · prop-granularity | Yes — shipped violations red each at HEAD |
| 4 | `BJ.W-RAMP-RESET` | The Tailwind default-ramp reset as the typography-lint precondition | Yes — 218 ramp-bypass sites red the class-ban probe |

**Gate substrate (band-wide decision, `OPEN-1`).** The current tree has **no** `scripts/gates.mjs` and **no**
`scripts/proof-*.mjs` (`find scripts -name 'proof-*.mjs'` = empty; confirmed `round-2b-confirm`: "both exist
ONLY under `.claude/worktrees/*`"). The single CI enforcement is `npm test` = `vitest run`
(`package.json:531`). Per the KISS/parsimony edict, this band authors the NEW static gates (waves 3-4) as
**vitest tests that read the tree via `fs` and grep** — they land in `tests/gates/` and run inside the
existing `npm test` step with **zero new CI wiring**. Re-introducing a standalone `gates.mjs` runner + new
`package.json` scripts + new CI steps would be new machinery against the parsimony edict, so it is NOT
proposed. The ONE exception is wave 2 (the pixel floor is Playwright/browser and cannot run inside vitest).
`OPEN-1`: a reviewer from the BI lineage may prefer the `proof-*.mjs`+`gates.mjs` idiom — Fable rules whether
the vitest-fs substrate is accepted or the standalone-gate machinery is re-erected.

---

## Wave 1 — `BJ.W-GATE-COLLAPSE` — the invariant-set collapse to ~45-55 keeps

### §Mandate

Discharges `gate:gate-count-overshoot` + `gate:pin-implementation-literal` +
`gate:mirror-implementation-self-fixture` + `gate:vacuous-no-assertion` +
`gate:testing-the-tooling-fixture-mirror` + `gate:redundant-surface-snapshot` (Family A roster,
`REGISTRY.md:35-40`). The USER mandate: collapse to ~40-60 invariant gates (MEMORY `gates-abrogation`).

### §Design — the keep-list and the kill classes

**KEEP (~45-55 invariant gates, all verified present on disk):**

- `tests/styles/token-graph.test.ts` — token-graph cycle/resolution invariants.
- `verify:package` = `scripts/verify-export-types.mjs` (`package.json:534`) — packed export resolution.
- `tests/public-surface.spec.ts` — the authoritative root + per-subpath public-surface lock
  (`exactSubpathRuntimeSurfaces` :514-519, exact root :492-494).
- `tests/components/ui/reka-binding-idiom.test.ts` — the reka prop/emit binding render canary (the
  `:pressed`/`v-model:search-term`/`tag=` silent no-op class, MEMORY `glass_ui_binding_verification`).
- the `public-contracts.test-d` cross-package type-parity check.
- the per-component **behavioral contract cores** — the assertion BODIES that exercise real component
  behavior (minus the `Object.keys(Surface)` heads killed below).
- the surviving **style ordering / graph invariants**: `glass-subtlety.test.ts:89-92` (ordering
  floating>quiet), the `radius-dialog-bind` bind-GRAPH checks (:57-62,72-73, NOT the terminal literals),
  the `typography.test.ts` **1/√φ relationship** at :13 (NOT the :15 materialized constant), token-graph
  cycle.
- the **wired-up** `substrate-paints-color` aurora non-black + blob coverage floors (delivered by wave 2).

**KILL (the delta that lands the count in-band):**

| Kill class | Sites / count | Evidence |
|------------|---------------|----------|
| Literal-mirror asserts | 5 named + the broader style/demo class | `glass-subtlety.test.ts:63-66,80-87` (blur px pinned 7/11/1/16/17); `dialog/graded-backdrop.test.ts:126-141` (`--glass-halo-blur:20px`, core 13rem, bloom 7rem, `blur(calc(34px))`); `demo/aurora-stage-affordance.test.ts:100-103` (amplitude===0.45, swirl kept as invariant); `demo/springs-story.test.ts:58-64` (`--preview-start:1.5rem` etc.); `typography.test.ts:15` (`0.7861513777574233`, redundant with the :13 relationship) |
| Self-mirror byte-equality | 1 head | `springProjection.test.ts:24-32` asserts generated CSS === `springProjection()` output — the same fn `regen-spring-tokens.mjs` emits from; cannot fail on a generator bug |
| Demo-fixture pins | ~2 files | `aurora-stage-affordance.test.ts`, `springs-story.test.ts` (demo config mirrors, not library contracts) |
| Zero-assert specs | **6 files** | `tests-visual/{_cohere-capture,_cohere-debug,_cohere-shadow-debug,_fix-glassui-dark-capture,_prim-polish-capture,_wdelta0-capture}.spec.ts` — verified `grep -c 'expect('` = 0 each; green by construction under `testMatch:'*.spec.ts'` (`playwright.config.ts`) |
| Tooling self-test | 1 file | `tests/scripts/profile-bundle-value-js.test.ts:48-80` — validates the `profile:bundle` dev report against its own classification table, not the shipped lib |
| Duplicate surface-lock heads | dozens | the `Object.keys(<X>Surface).toEqual([...])` heads in `*.contract.test.ts` (e.g. `slider.contract.test.ts:8-10`) — redundant with the one `public-surface.spec.ts` lock; keep the behavioral bodies, drop the heads |

### §Work

- Replace each literal-mirror head with the underlying RELATIONSHIP it guards (ordering / bind-graph /
  bounded-range) where a real invariant exists; delete it outright where the value is a free design tunable.
- Retire the `springProjection` byte-equality (:24-32); keep only an independent physical invariant
  (peak ≥ 1, settle within a bound) IF one is derivable without re-calling `springProjection` — else drop.
  `OPEN-2`: is a device-free physical-invariant assert derivable, or is the honest guard a **lint that flags
  hand-edits of generated files**? Fable rules.
- Move the 6 zero-assert `tests-visual/*.spec.ts` OUT of the `*.spec.ts` glob (rename to `*.capture.mjs` or
  relocate to a `scripts/` producer) so they stop registering as un-failable gates. (Coordinate with wave 2,
  which also retires the "fail-CLOSED" framing from these files.)
- Retire `tests/scripts/profile-bundle-value-js.test.ts` from the gate suite.
- Strip the `Object.keys` surface heads from the `*.contract.test.ts` files; leave the behavioral bodies.
- `canon-doc.mjs` disposition (`OPEN-3`): `scripts/lib/canon-doc.mjs` (auditCanonHomes / `CONTENT_MIN_CHARS`)
  is imported by no test and no `package.json` script — `grep 'canon-doc' tests/` = 0. Round-1 verdict:
  "build OR retire." Draft leans **retire** (parsimony; the orphan-CSS gate of wave 3 covers the real
  green-over-stub risk it was built for) — but if a doc-integrity invariant is wanted, wire `auditCanonHomes`
  as ONE vitest gate. Fable rules.

### §Acceptance

- **Not born-RED** — this wave is a DELETION/collapse; there is no live defect a probe reds. Its evidence is
  the census delta: enforced it/test-block count **1055 → 45-55** (the keep-list above), with the kill classes
  executed as enumerated.
- `OPEN-4`: adopt a single count-guard test asserting the enforced it/test-block census ≤ a ceiling (born-RED
  at 1055) so the collapse cannot silently re-inflate — OR omit the meta-gate and verify the collapse by the
  formation ledger diff only. Draft leans a **light count-guard** (it is the only standing lock against
  re-inflation), but a "gate that counts gates" edges toward the meta-machinery the band is trying to shed.
  Fable rules.

### §π/DELTA

None — device-free vitest reshape; zero pixel change.

### §KISS / parsimony

Fewest lines: this wave is net-**negative** LOC. No new abstraction; the keep-list is the existing sound
subset, the kills are enumerated deletions. Gestalt, not patchwork — one collapse, not per-file patches.

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

`tests-visual/substrate-paints-color.spec.ts:135-228` is a REAL non-black + coverage-band pixel gate (aurora
interior `maxChannel > 0`; blob coverage ~0.10-0.70) that mounts the actual component on a real device and
reads back the composited screenshot — it catches the exact CPU-oracle blindspot (a BLACK aurora / FLOODED
blob) that the entire device-free `proof:aurora-*`/`proof:blob-*` fleet passes. It executes in NO CI step
(`.github/workflows/ci.yml` + `release.yml` run vitest+build+verify:package only; the visual workspace is
invoked only by `release.sh` as a manual human pre-tag review). Wire the **sound subset only** — the two
non-black/coverage FLOORS, not the per-preset hue/chroma parity (that is Family G's W10/W11).

### §Work

- Add a CI job (new `.github/workflows/` step or a job in `ci.yml`) that: installs the Playwright browser
  (`npx playwright install --with-deps chromium`), builds + serves the routed demo, and runs
  `playwright test substrate-paints-color.spec.ts` (the existing `tests-visual` `test:substrate` script).
- Retire the "fail-CLOSED" framing (`playwright.config.ts:46-50`) from any spec that no gate runs — and from
  the 6 zero-assert files (coordinate with wave 1, which relocates them out of the glob).

### §Acceptance — born-RED

- **Born-RED probe (wiring-absent):** `grep -rn 'tests-visual\|playwright' .github/workflows/` = **0 at
  HEAD** (verified). GREEN when the CI job invokes the substrate spec.
- **Teeth self-test (the gate is not hollow):** a planted defect — force the aurora canvas to paint black
  (or the blob to flood) — must red the floor. Ship this as a `--planted` self-test bite so the gate proves
  it can fail, not merely pass.

### §π/DELTA

**This wave IS the π obligation.** The pixel floor is the band's only paint gate. The evidence artefact is a
captured CI run showing (a) GREEN on the real render, (b) RED on the planted black-aurora bite — the
born-RED→GREEN differential per MEMORY `live_verify_capture` (a captured DELTA, not a commit-message claim).

### §OPEN — the CI-runner GPU risk (`OPEN-5`, substantive)

`substrate-paints-color.spec.ts:14-18` documents: on a real GPU (Metal) the substrate paints; a **GPU-less CI
runner SwiftShader-degrades and the gate driver SKIPs befitting-silent when no browser binary is installed.**
The `playwright.config.ts` already passes `--enable-unsafe-swiftshader --enable-features=Vulkan`. The
band-critical question Fable must settle: **does SwiftShader paint a non-black aurora inside a standard GitHub
ubuntu runner?** If YES → the floor has real teeth in CI. If NO (it SKIPs or paints black) → wiring it into
`ci.yml` is theater, and the honest disposition is either a self-hosted GPU runner OR keeping the floor as the
pre-tag `release.sh` gate with a captured artefact. This OPEN gates whether wave 2 lands in `ci.yml` at all.
The wave MUST NOT claim CI enforcement until a real CI run demonstrates the planted black-render bite goes RED
on the target runner.

### §Non-goals

- NOT the per-preset hue/chroma/parity gates (Family G).
- NOT adding new pixel assertions to the spec — wire the EXISTING sound floors only.

---

## Wave 3 — `BJ.W-STATIC-HYGIENE` — three NEW born-RED static gates

### §Mandate

Discharges `canon:unenforced-token-system` (`round-1/doc-and-canon-drift.md` finding 1) + the orphan-CSS gate
gap (`round-1/dead-code-and-dual-paths.md` finding 1 / `round-2b` critical
`orphaned-css-import-closure`) + `surface:decorative-flag-proliferation` (Card, Family C seed). These are the
Family A wave-candidate-3 gates: "token-hygiene · orphan-CSS-partial · prop-granularity dead-config"
(`REGISTRY.md:44`). All THREE are authored born-RED against shipped violations.

### §Design — three gates, one wave (all vitest-fs per `OPEN-1`)

**(A) `gate:token-hygiene` — raw radius/blur literals off the ladder.** Grep `src/` for raw
`border-radius`/`backdrop-filter`/`blur()` literals outside the theme/tokens files; every non-exempt literal
reds. (The `font-size` arm of the "radius/blur/font-size" wave-candidate is deferred to wave 4, which owns the
type-ladder precondition — see §Non-goals.)

Born-RED violations shipped at HEAD (verified):
- `src/components/drawer/styles.css:379` — `backdrop-filter: blur(14px)` (off the `--glass-blur-*` ladder).
- `src/components/sortable-list/SortableList.vue:144` — `border-radius: 999px` (raw, should be `--radius-pill`).
- `src/components/tabs/styles/segmented.css:169` — `0.3125rem` / :306 `0.25rem` (raw radius, per doc-canon).

`OPEN-6` (allowlist): what is legitimately exempt? Draft allowlist — true circles `border-radius:50%`,
organic-blob radii, `line-height:1`/`0` inline-box resets. The exempt set is a real ruling: too permissive
and the gate is toothless; too strict and it false-positives on deliberate geometry. Fable rules the allowlist.

**(B) `gate:orphan-CSS-partial` — the @import closure completeness gate.** Assert every `src/styles/**/*.css`
sits in the `src/styles/index.css` @import closure (transitively). Any partial reachable by no @import reds.

Born-RED violations shipped at HEAD (verified — this is the round-2b **critical** finding):
- `src/styles/glass/glass-chip.css` + `src/styles/glass/glass-atom.css` exist but are `@import`-ed by NO
  closure — `grep -rn '@import' src/styles/ | grep -iE 'chip|atom'` = **0**. Shipped-broken proof:
  `grep -c glass-chip dist/glass-ui.css` = **0** (verified). `Chip.vue`/`chipVariants.ts:4-6`/`badge/index.ts:27`
  emit `.glass-chip`/`.glass-atom` whose entire styling (selectable flood, `--chip-flood-t` interactive punch,
  removable `::after`, glass-atom register) is DEAD in the published bundle.

The fix flip (re-home the two `@import`s into `glass.css`) is a **Family C/H coordination obligation** — this
wave authors the GATE born-RED; the CSS re-home flips it GREEN. `OPEN-7`: does the gate fold into the
retired-`canon-doc.mjs` green-over-stub role (wave 1 `OPEN-3`)? If orphan-CSS-partial ships, `canon-doc`'s
retire is safe.

**(C) `gate:prop-granularity-dead-config` — decorative-default with zero override + zero coverage.** A
component prop whose non-trivial default ships on every instance with (a) zero consumer override and (b) zero
test exercising the non-default branch is dead configurability.

Born-RED violation shipped at HEAD (verified — round-2b `unset-prop-default-no-consumer-override`):
- `src/components/card/Card.vue` `withDefaults`: `grain: true` (:33), `metal: "gold"` (:39) — every Card
  ships gold-metal + grained; `grep '<Card' demo/ | grep -iE 'metal|grain'` = **0** overrides (the only
  `metal`/`grain` hits are `data-metal` on `<span>` in `glass-material.vue`, not a Card prop).

`OPEN-8` (the weakest of the three — Fable must settle its FORM): is this a **standing CI gate** (a
repo-wide prop-crawler that flags any default-only prop) or a **one-shot audit line** that folds into the
overfitting audit / Family C surface purge? A repo-wide crawler risks false-positives (a prop legitimately
defaulted for external consumers, e.g. the `useStagger` external-consumer class). Draft leans a **targeted
assertion** naming the Card gold+grain finding (born-RED, narrow) over a general crawler — the general
"is every prop exercised" invariant belongs in Family C's purge, not a Family A standing gate. The design
question (should Card default to gold+grain at all?) is Family C's ruling, not this gate's.

### §Work

- `tests/gates/token-hygiene.test.ts` — fs-read `src/**/*.{css,vue}`, regex the raw radius/blur literals,
  assert none outside the allowlist. Self-test bite: a planted `blur(9px)` reds.
- `tests/gates/orphan-css-partial.test.ts` — parse `src/styles/index.css` @import graph, assert every
  `src/styles/**/*.css` is reachable. Self-test bite: a planted orphan partial reds.
- `tests/gates/prop-granularity.test.ts` (form pending `OPEN-8`) — the Card gold+grain assertion.

### §Acceptance — born-RED

- token-hygiene RED at HEAD: `drawer/styles.css:379` blur(14px) + `SortableList.vue:144` 999px +
  `segmented.css` raw radii. GREEN when the fix waves repoint them (Family C/F coordination).
- orphan-CSS-partial RED at HEAD: glass-chip.css + glass-atom.css absent from the @import closure (0 rules in
  dist). GREEN when the CSS re-home lands.
- prop-granularity RED at HEAD: Card gold+grain default with 0 overrides. GREEN per the Family C ruling.
- Each gate ships a self-test bite proving it reds on a planted violation (not hollow).

### §π/DELTA

None for the gates themselves (device-free static scans). The DOWNSTREAM fix flips (CSS re-home resurrects
the dead chip styling; radius/blur repoint) carry paint obligations, but those land in the sibling FIX waves,
NOT here — this wave only authors the born-RED detectors.

### §KISS / parsimony

Three small fs-grep tests, no runner, no CI wiring (they ride `npm test`). Each is ~20-40 lines. The gate is
the parsimony enforcer: it makes the ladders lintable so future off-ladder literals fail at build, not in a
user's eyes.

### §Non-goals

- The `font-size`/`line-height`/`letter-spacing` literal arm → wave 4 (needs the ramp-reset precondition).
- The blur-LADDER retune (collapse quiet==resting, document the 2dppx arm) → Family F. This wave gates raw
  literals; it does not re-tune the ladder values.
- The CSS re-home, radius repoint, Card default decision → sibling FIX waves (Family C/F/H). Authored
  born-RED here; GREEN by them.

---

## Wave 4 — `BJ.W-RAMP-RESET` — the Tailwind default-ramp reset (typography-lint precondition)

### §Mandate

Discharges `default-ramp-coexists` (round-2 typography **critical** /
`typography-audit-f15-...`) + `default-scale-bypass` + `self-inconsistent-canonical-scale` +
`no-enforcement-infrastructure` (round-2b typography). The √φ ladder is well-formed but **NOT enforceable**:
the @theme bridge only ADDS named rungs and never resets Tailwind v4's built-in ramp, so `text-sm`
(0.875rem STATIC) and `text-xs` (0.75rem STATIC) silently bypass the fluid `--type-small`/`--type-caption`
clamps — a linter cannot tell the scale rung `text-small` from the off-scale `text-sm` until the default ramp
is cleared.

### §Design — the precondition chain (three ordered edits)

The typography lint is unlandable until three things happen IN ORDER (round-2b: "tokenize the residual
canonical literals FIRST or the allowlist rule fails on the source of truth"):

1. **Tokenize the residual canonical literals** (the source-of-truth files must dogfood their own tokens, or
   a no-literal lint false-positives on them). Verified residuals: `src/styles/typography/utilities.css:59`
   `letter-spacing:0.02em` (orphan — no rung), `:66` `0.025em` (== `--type-tracking-wide`, raw), `:65,:93`
   `line-height:1.25`/`1` (unrung); `semantic.css:235,241` `line-height:1.25`/`1`. Repoint the token-equal
   ones; mint or exempt `1.25`/`0.02em`. `OPEN-9`: ownership — is the residual-tokenization MINE (a small
   precondition, tightly bound to landability) or the **Family F typography wave's**? Draft keeps it here as
   the minimal precondition; Fable may reassign to Family F.

2. **The default-ramp reset.** Add `--text-*: initial; --leading-*: initial; --tracking-*: initial` (the
   Tailwind v4 `@theme` clears) in `src/styles/theme/bridges.css` so ONLY the named √φ rungs exist. Verified
   absent at HEAD: `grep -nE '\-\-text-(xs|sm|base|lg|xl)|initial' bridges.css` finds no reset. **This edit
   cannot land standalone** — resetting the ramp makes `text-sm`/`text-xs` inert, so the 218 sites that use
   them lose their font-size → visual regression. It is COUPLED to the codemod (see §Obligations).

3. **The type-literal + utility-class ban lint** — the born-RED gate this wave authors:
   - **CSS-declaration arm:** raw `font-size`/`line-height`/`letter-spacing` literals in `src/`+`demo/`
     outside the (now-tokenized) canon. Born-RED: `segmented.css:171` `0.8125rem`, `:184` `0.875rem`;
     `layer-group.css:205` `0.75rem`; the `0.1em` ×2 (`dropdown-menu/styles.css:94`, `command/styles.css:123`,
     == `--type-tracking-caps`).
   - **Utility-class arm:** ban Tailwind's built-in `text-(xs|sm|base|lg|xl|2xl|…|9xl)`, `leading-[…]`,
     `tracking-[…]`, and arbitrary `text-[…px|rem|em]` in `.vue`. Born-RED: `grep -rhoE '\btext-(xs|sm)\b'
     demo/` = **218** (text-sm ×118 + text-xs ×100, verified) + src ×19 + 9 arbitrary `text-[…]`.

### §Work

- `src/styles/typography/utilities.css` + `semantic.css` — tokenize the residual literals (per `OPEN-9`
   ownership).
- `src/styles/theme/bridges.css` — the `--text/leading/tracking: initial` reset (COUPLED to the codemod;
   see §Obligations).
- `tests/gates/type-hygiene.test.ts` — the CSS-declaration + utility-class ban (vitest-fs). Self-test bites:
   a planted `text-sm` in a `.vue` and a planted raw `font-size:13px` both red.

### §Acceptance — born-RED

- **Utility-class arm RED at HEAD:** 218 `text-sm`/`text-xs` demo sites (verified). GREEN when the codemod
  migrates them onto `text-small`/`text-caption`/`text-micro`.
- **CSS-declaration arm RED at HEAD:** `segmented.css` 0.8125/0.875rem, `layer-group.css` 0.75rem, the two
  `0.1em`. GREEN when repointed to `var(--type-*)`.
- Self-test bites prove teeth.

### §π/DELTA

None for the gate. The ramp-reset FLIP (step 2) carries a real paint obligation — it can regress 218 element
sizes if landed before the codemod — so the reset+codemod pair MUST ship with a paint π (before/after on the
heaviest pages: `springs.vue`, `slider.vue`) captured by the Family F typography wave, NOT here.

### §Obligations — the reset/codemod coupling (the load-bearing coordination)

The default-ramp reset (step 2) and the 251-site codemod (`text-sm`→`text-small`, `text-xs`→`text-caption`/
`text-micro`) are ONE atomic flip — the reset alone regresses. Per the BI `W-AXES-GATES` idiom, this wave
authors the gate **born-RED**; the **Family F typography wave** owns the codemod + the coupled reset flip +
its paint π. `OPEN-10`: confirm the split — does `BJ.W-RAMP-RESET` land JUST the gate (RED, flipped by Family
F), or does it also land the reset+codemod (crossing into Family F's typography retune)? Draft: gate + residual
tokenization here; reset+codemod in Family F. The two waves MUST land in the same tranche cut so the gate is
never RED-at-tag.

### §KISS / parsimony

One fs-grep gate. The reset is a handful of `initial` lines that COLLAPSE the type vocabulary to a single
source — the parsimony payoff: after it, `text-sm` is a build-visible unknown, not a silent bypass.

### §Non-goals

- The 251-site codemod itself → Family F.
- The F10 story-hierarchy pass (StorySection heading level axis) → Family D/F (`story-hierarchy-flattening`).
- The mono-caps caption idiom kill (224 refs across 74 files) → Family D (`mono-caps-caption-idiom`) — a
  sweep + StorySection rework, not a gate.
- The font-family role-collapse note (Plus Jakarta aliasing) → informational, no gate.

---

## §Band-level obligations & OPEN roll-up

**Coordination handoffs (authored born-RED here → GREEN by siblings):**
- orphan-CSS-partial (W3) → the CSS re-home of glass-chip/glass-atom (Family C/H).
- token-hygiene radius/blur (W3) → the ladder repoint (drawer blur, SortableList 999px) (Family F).
- prop-granularity Card gold+grain (W3) → the Card default decision (Family C).
- type-hygiene + ramp-reset (W4) → the 251-site codemod + coupled reset flip + paint π (Family F).

**OPEN markers for the Fable two-challenge pass:**
1. Gate substrate: vitest-fs (drafted) vs re-erecting `gates.mjs`/`proof-*.mjs`. [band-wide]
2. springProjection: derivable device-free physical invariant vs generated-file-edit lint. [W1]
3. `canon-doc.mjs`: retire (drafted) vs wire `auditCanonHomes` as one doc-integrity gate. [W1]
4. Collapse count-guard: light meta-gate (drafted) vs ledger-diff only. [W1]
5. **Pixel-floor CI-runner GPU risk** — does SwiftShader paint non-black in a GitHub ubuntu runner, or does
   the gate SKIP? Gates whether W2 lands in `ci.yml` at all. [W2, substantive]
6. token-hygiene allowlist (true circles / blobs / control resets). [W3]
7. orphan-CSS-partial vs `canon-doc` role overlap. [W3]
8. prop-granularity FORM: targeted Card assertion (drafted) vs repo-wide prop-crawler vs fold into Family C
   overfitting audit. [W3]
9. Residual-canon tokenization ownership: W4 precondition (drafted) vs Family F. [W4]
10. Ramp-reset landing: gate-only here + reset/codemod in Family F (drafted) vs all-in-W4. [W4]

**In-scope count:** ~45-55 keeps after W1; +2 CI-wired pixel floors (W2); +3 static gates (W3); +1
type-hygiene gate (W4) = the band lands the enforced surface in the mandated 40-60 band with, for the first
time, gates that CAN fail on a real regression rather than on a legitimate retune.
