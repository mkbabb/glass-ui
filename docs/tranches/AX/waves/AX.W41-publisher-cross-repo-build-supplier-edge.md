# AX.W41 — Publisher-side cross-repo build + supplier-edge hardening

**Band** N · CROSS-REPO · **Severity** major · **dependsOn** AX.W00 · *(glass-ui-OWNED, in-repo — a real `src`/`package.json` edit, NOT a sibling annex)*

> Meta-terms glossed on first use (per `precepts/instructions/style/meta-terms.md`):
> **wave** = one dispatchable unit of the tranche; **gate** = the machine-checkable
> close artefact (`proof:*`); **born-RED** = the gate FAILS at HEAD before the wave and
> is driven GREEN by it; **dts** = the emitted `.d.ts` type-declaration set; **contract-v2**
> = the `cross-repo-dev-resolution.md` invariant-30 redefinition under which every consumer
> dev-resolves the BUILT `dist/` and the publisher's `build:watch` keeps it fresh;
> **supplier-edge** = a packaging/version obligation glass-ui (the supplier) owes the
> consumer cohort; **handoff** = a cross-repo obligation glass-ui authors but a sibling
> session executes.

---

## State (born-RED — the gate must fail at HEAD before the wave)

Four falsifiable RED witnesses at HEAD (`eaba94f`, branch `at-dock-convergence`). LIVE
re-diagnose each per the W00 wave-open ritual before the fix — do NOT trust the audit's word.

1. **`build:watch` leaves dts STALE (the keystone witness).** `package.json:537`
   `"build:watch": "vite build --watch"` is JS-ONLY — it has no `emit-types` arm, contrast
   `package.json:536` `"build": "vite build && npm run emit-types"`. RED WITNESS (deterministic,
   no flake): start `npm run build:watch`, let `dist/` settle, then add an exported symbol to a
   `src/` entry (or change a public signature) and save; the watch re-emits `dist/*.js` but
   `dist/*.d.ts` does NOT change — the new symbol's declaration is absent / a stale signature
   survives. `proof:build-watch-dts` (NEW) asserts the dts is fresh after a watched `src/` edit;
   it does NOT exist at HEAD (born-RED by absence + by the JS-only watch).

2. **devDep floor DRIFTS below the peer range it claims to support.** `package.json:658-659`
   declares peers `@mkbabb/keyframes.js: ^2.2.0 || ^3.0.0 || ^4.0.0` + `@mkbabb/value.js:
   ^0.10.0 || ^0.11.0`, while `package.json:689-690` pins devDeps `@mkbabb/keyframes.js: ^2.2.0`
   + `@mkbabb/value.js: ^0.10.0` — so the library BUILDS/TESTS against the NARROW floor while
   PUBLISHING a WIDE peer claim. RED WITNESS: `proof:peer-devdep-parity` (NEW) does not exist;
   when authored it asserts each devDep floor sits WITHIN its peer range AND lands on a
   representative point — it is born-RED against the current floor-only pins (no parity gate
   guards the drift).

3. **`proof:peer-conformance` is an UNTAGGED orphan + two live supplier-edge debts dangle.**
   `proof:peer-conformance` exists (`package.json:556`, `scripts/proof-peer-conformance.mjs`)
   but is NOT registered in `scripts/gates.mjs` with ci/release tags (a hand-registered orphan
   from the AW.W27 wave that itself had NO row in the AW charter §2 table). RED WITNESS: grep
   `scripts/gates.mjs` for `proof:peer-conformance` → ZERO hits (verified). The two cross-repo
   debts AW.W27 forward-noted are undeclared in any AX coordination doc: (a) keyframes-4's
   published tarball ships a stray `@mkbabb/glass-ui: file:../glass-ui` dep that breaks `npm ci`
   (`AW.W27-peer-conformance.md:37-52`); (b) the E2 knot — when AW.W5 aurora forces value 0.11
   (`interpolateHue`), a consumer wanting W5 + keyframes-4 hits keyframes-4's `value<0.11`
   hard-cap (`AW.W27-peer-conformance.md:75-78`). Neither is a named handoff in
   `coordination/CONSTELLATION.md` (which W28 opens; the band-N supplier-edge section does not
   yet exist).

4. **A peer-range bump can silently DROP a downstream-relied keyframes export.** glass-ui's
   keyframes peer range admits majors whose export surface differs; the 3.6.0 cut's keyframes
   2.2.0 dropped `getTimingFunction` from its public export, forcing bbnf-buddy to reimplement
   the resolver locally (`bbnf-buddy commit cc7dd5a`; `src/animation/easing.ts:1-30`). RED
   WITNESS: no export-surface-stability check exists that flags a glass-ui keyframes-peer-range
   bump dropping a downstream-relied API — the constellation export-stability gate the
   keyframes-collaboration clause (REQUIREMENTS §0) asks for is absent.

Born-RED, not over-claimed: this is a STRUCTURAL / PACKAGING wave with NO visual surface. The
visual-truth obligation is discharged through the deferred-π re-verify clause below (the
publish hinge the consumer legs resolve through), NOT a glass-ui live-paint audit.

---

## Goal

`build:watch` keeps `dist/*.d.ts` fresh alongside the JS (the contract-v2 freshness keystone
every consumer dev-resolves through), the devDep floor is gated to sit within the published
peer range, `proof:peer-conformance` is ci/release-registered, the keyframes export-surface is
stability-checked, and the two orphan AW.W27 supplier-edge debts are declared as named cross-repo
handoffs in `coordination/CONSTELLATION.md`.

---

## Scope (the gestalt fix from the audit — no workaround, no legacy)

W41 is the ONLY genuinely-new wave the CONVERGE digest surfaced (§4 note 22 dedup ledger): the
glass-ui-OWNED cross-repo obligations the consumer cohort is OWED but that no other AX wave homes.
It is in-repo — a real `src`-adjacent (`package.json`/`scripts/`) edit, NOT a sibling annex (the
distinction that separates W41 from W34/W35, which write only annexes + coordination sections).

**(1) The `build:watch` dts-emit arm — the keystone, the gestalt fix.** Re-derive `build:watch`
so it keeps `dist/*.d.ts` fresh alongside the JS, not as a bolt-on but as the structural
satisfaction of the contract-v2 freshness obligation. The cold `build` runs two sequential arms —
`vite build` (JS) then `emit-types` (`vue-tsc --project tsconfig.build.json` +
`flatten-subpath-types.mjs`). The watch must run BOTH arms incrementally: the existing
`vite build --watch` JS arm PLUS a co-running `emit-types --watch` arm (`vue-tsc
--project tsconfig.build.json --watch --emitDeclarationOnly`, with the flatten step re-running on
each dts re-emit). The two arms run CONCURRENTLY (one terminal — a small `scripts/build-watch.mjs`
orchestrator spawning both child watchers, or a parallel npm-script form) so a single `src/` edit
re-emits BOTH `dist/<name>.js` AND `dist/<name>.d.ts` before the consumer's Vite `server.watch`
observes the change. This is a LIBRARY-INTERNAL contract violation being fixed (the fail-explicit
class per `instructions/README.md:82`), NOT a befitting-silent browser degradation — a stale dts
that a consumer typechecks against is a glass-ui defect, never a graceful fallback. It is the ROOT
CAUSE of value.js's stale-dist-typecheck class (the 75 TS7016 errors K.W2 fought), flagged unmet
at 3.2.0/3.1.1 and STILL unmet at 3.6.0 HEAD.

**(2) The devDep↔peer range-parity gate.** Ship `proof:peer-devdep-parity` — asserts each devDep
floor (`keyframes.js`, `value.js`) sits WITHIN its declared peer range and flags a drift (a devDep
narrower than the floor of the peer range it publishes is a false-coverage smell: the library
tests a narrower set than it claims to support). Then bump the devDeps to a representative point in
the peer range. **RATIFY-BEFORE-IMPL (the devDep bump path).** The keyframes devDep CANNOT simply
bump to `^4.0.0`: keyframes-4's published tarball carries the stray `@mkbabb/glass-ui:
file:../glass-ui` dep that breaks `npm ci` (AW.W27 §What-landed bullet — the devDep deliberately
STAYED `^2.2.0` for exactly this reason). RECOMMENDED PATH: (a) the value devDep bumps to a
representative point of its peer range NOW (`^0.10.0` → `^0.11.0` — value.js published 0.11.1, the
`/color` leaf glass-ui consumes is stable across 0.10→0.11 per AW.W27, so the bump is source-safe
and the spine-gate enforcer the value.js K.W2 / cohort-glassui W-A asked for); (b) the keyframes
devDep bump to `^4` is GATED behind the keyframes-4 republish handoff (item 3) and recorded as a
born-RED handoff in `coordination/CONSTELLATION.md` — `proof:peer-devdep-parity` admits the current
keyframes `^2.2.0` floor as IN-RANGE (it is within `^2.2.0 || ^3.0.0 || ^4.0.0`) so the gate is
GREEN-honest now, and flips its expected-floor only when keyframes 4.0.1 lands. The gate does NOT
force an unresolvable `npm ci`-breaking bump. Drop the `@mkbabb/value.js` phantom-devDep concern
per the contract-v2 §2.4 prohibition only IF the test runner does not load it directly (LIVE
re-diagnose — if glass-ui's vitest loads value.js transitively through keyframes, the canonical fix
is real nested-graph resolution, NOT a phantom devDep; if glass-ui loads value.js directly, the
devDep is legitimate and stays, bumped to the representative point).

**(3) The orphan AW.W27 supplier-edge reconcile.** Register `proof:peer-conformance` in
`scripts/gates.mjs` with the at-LEAST-ci tag model (per W27a §4 note 21 — `['local','ci','release']`
as a named exception, matching its supplier-edge release-criticality). Author the two live debts as
NAMED cross-repo handoffs in `coordination/CONSTELLATION.md` (the band-N supplier-edge section,
disjoint from W28's band-K / W34's §16 / W35's band-N migration sections): (a) the keyframes-4
`file:`-link republish — keyframes must cut 4.0.1 stripping the stray `@mkbabb/glass-ui:
file:../glass-ui` dep; THEN glass-ui bumps its keyframes devDep to `^4` for CI coverage (the item-2
gated bump); (b) the E2 value-cap — when value 0.11 (`interpolateHue`) ships in glass-ui's aurora
source (AX.W11/W07 aurora band), keyframes-4's `value<0.11` hard-cap fires for any consumer wanting
both, requiring a keyframes-side value-dep widen to `^0.11`. Both are born-RED handoffs (the
keyframes session executes them under its own tranche) — a PAIRED born-RED gate, never a bare
"handed off" tag (the chronic-closure meta-invariant, §2b band-N).

**(4) The keyframes peer-range-bump export-surface-stability check.** Author an
export-surface-stability check (`scripts/proof-keyframes-export-stability.mjs` →
`proof:keyframes-export-stability`) that records the keyframes public-export symbols glass-ui's
SOURCE relies on (the `keyframes.js` named imports across `src/`) and the symbols downstream
consumers rely on through glass-ui (the census from the W34 idiom ledger — bbnf-buddy's
`getTimingFunction` is the canonical witness), and FLAGS when a glass-ui keyframes-peer-range bump
would drop one. The check reads the resolved keyframes export surface at the declared peer floor
and asserts every relied symbol survives — so a future range bump that silently drops a
downstream-relied API reds the gate BEFORE publish, not in a consumer's broken build. This is the
constellation export-stability gate the keyframes-collaboration clause (REQUIREMENTS §0) asks for.

**Architectural note (no workaround).** None of the four legs is a patch over a symptom: leg 1
re-derives the watch pipeline to honor the contract-v2 obligation it structurally violated; leg 2
makes the build-vs-publish range coherence a gated invariant; leg 3 closes the AW.W27 orphan onto
the AX gate-fleet + coordination doc; leg 4 makes the cross-repo export contract machine-checkable.

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

W41 is glass-ui-OWNED: a real `package.json` + `scripts/` edit (the dts-watch arm + the three
gates) + the coordination-doc band-N supplier-edge section. It writes NO `src/` runtime code and NO
sibling source.

| File | Edit |
|------|------|
| `package.json` | **EDIT** — (a) the `build:watch` script → run BOTH the JS-watch + the `emit-types --watch` arm (point it at the new orchestrator script OR a parallel-script form); (b) the value devDep `^0.10.0` → `^0.11.0` (the representative-point bump; the keyframes devDep bump is GATED, item-2 RATIFY); (c) add the three new `proof:*` script entries (`proof:build-watch-dts`, `proof:peer-devdep-parity`, `proof:keyframes-export-stability`). NO peer-range edit (the peers already admit ^4/^0.11 per AW.W27 — do NOT re-narrow). |
| `scripts/build-watch.mjs` | **NEW** — the combined-watch orchestrator: spawns `vite build --watch` (JS) + `vue-tsc --project tsconfig.build.json --watch --emitDeclarationOnly` (dts) concurrently in one terminal, re-running `flatten-subpath-types.mjs` on each dts re-emit. (If a parallel-npm-script form is cleaner than a node orchestrator, the script is omitted and the form lives in `package.json` `build:watch` — RATIFY at impl per the local toolchain.) |
| `scripts/proof-build-watch-dts.mjs` | **NEW** — the born-RED dts-freshness gate: spawn `build:watch`, settle, write a tracked exported-symbol delta into a `src/` entry, wait for the watch, assert `dist/<entry>.d.ts` reflects the delta (fresh), revert the delta, kill the watch. Fail-CLOSED. |
| `scripts/proof-peer-devdep-parity.mjs` | **NEW** — asserts each devDep floor (`keyframes.js`/`value.js`) intersects its peer range AND lands on a representative point; admits the gated keyframes `^2.2.0` floor as in-range until the 4.0.1 handoff lands. |
| `scripts/proof-keyframes-export-stability.mjs` | **NEW** — the export-surface-stability check: the relied-symbol census (glass-ui source + downstream-via-glass-ui per W34) survives at the declared keyframes peer floor. |
| `scripts/gates.mjs` | **EDIT** — register the three new gates + add the missing `proof:peer-conformance` entry with the at-LEAST-ci tag model (`['local','ci','release']` for the supplier-edge gates; the dts-watch gate `['local','ci']` — it spawns a watch, release-impractical, RATIFY at impl). DISJOINT from every other wave's gate registration: append ONLY the W41 entries; the FINAL fleet-registration consolidation is W33. |
| `coordination/CONSTELLATION.md` | **EDIT** (band-N supplier-edge section ONLY) — the keyframes-4 `file:`-link republish handoff (born-RED until keyframes cuts 4.0.1), the E2 value-cap handoff (born-RED until value-0.11 ships in aurora + keyframes widens its value dep), the devDep-bump ordering record, the sibling-baseline capture of keyframes + value HEAD/branch/status at coordination time. **W28 OPENS this doc (band-K + gate-0); W34 authors the §16-receiver body; W35 appends the band-N keyframes-MIGRATION section; W41 appends the band-N SUPPLIER-EDGE subsection.** Write the W41 subsection ONLY — do not rewrite W28's/W34's/W35's sections. |
| `docs/tranches/AX/audit/W41-publisher-cross-repo-build.json` | **NEW** — the born-RED ledger (the four RED witnesses with their live measurements), the dts-watch re-derivation record, the devDep-parity decision (the value bump + the gated keyframes bump), the gate-registration record, the export-stability census, and the W33/W34/W35 routing. |
| `docs/tranches/AX/waves/AX.W41-publisher-cross-repo-build-supplier-edge.md` | This spec (the wave doc). |

**OUT of bounds:** any `src/` runtime code (W41 touches NO component/composable/style source);
the `peerDependencies` ranges (already correct per AW.W27 — re-narrowing them is forbidden); the
keyframes/value/consumer sibling source (handoffs SPECIFY, the sibling session WRITES under its own
tranche); the FINAL gate-fleet consolidation + `proof:ax-final` (W33); the W34/W35 coordination-doc
sections (disjoint authorship).

---

## Disjointness (sibling waves it must NOT overlap)

- **vs W35 (keyframes-prune consumer-migration DAG) — the publish hinge it hardens.** W35's
  dock-spring CONSUME leg (keyframes `^3.4.0` → the AX cut) resolves THROUGH the W41 publish hinge
  (the `build:watch` dts-freshness keystone + contract-v2). **Disjoint by stage + file:** W35 writes
  ONLY annexes + the band-N keyframes-MIGRATION coordination section; W41 writes `package.json` +
  `scripts/` + the band-N SUPPLIER-EDGE coordination subsection. They share ZERO `src`/`package.json`
  edit. W35 routes its consume-bump TO W41 (W35 FileBounds explicitly names W41 as "the publish
  hinge — OUT of bounds"). W41 must NOT author the keyframes prune-migration legs (off-headerribbon
  / off-glasspanel) — those are W35-owned.

- **vs W34 (§16 cross-constellation idiom + consumer-adoption ledger) — the export-census source +
  the coordination co-author.** W34 authors the per-consumer idiom census (incl. the bbnf-buddy
  `getTimingFunction` reimplementation finding); W41's export-stability check CONSUMES that census as
  its relied-symbol list. **Disjoint by section + role:** W34 = the §16-receiver coordination body +
  the per-consumer idiom-adoption legs (read-only / annex); W41 = the in-repo publisher-build +
  supplier-edge gates + the band-N supplier-edge subsection. W41 must NOT re-author the W34 idiom
  census; it CITES it as the export-stability input. The shared file is `coordination/CONSTELLATION.md`
  (disjoint subsections — W41 appends ONLY the supplier-edge subsection).

- **vs W28 (speedtest native-first receive) — the coordination-doc OPENER.** W28 OPENS
  `coordination/CONSTELLATION.md` (band-K + gate-0). W41 APPENDS its band-N supplier-edge subsection;
  it does NOT rewrite W28's band-K metric-receive DAG. Coordinate so W28 lands the file scaffold
  first; W41 appends.

- **vs W27a (legacy gate-hardening — the gate-tag MODEL).** W27a establishes the at-LEAST-ci
  tag-parity model + promotes the 2 mis-tagged legacy gates to release; W41 USES that model to tag
  `proof:peer-conformance`. **Disjoint by gate:** W27a owns the legacy-lane gates + the tag-parity
  meta-assert; W41 owns the three NEW supplier-edge gates + the `proof:peer-conformance` registration.
  Both edit `scripts/gates.mjs` — DISJOINT ROWS (W27a touches the legacy gates' tags; W41 APPENDS the
  W41 gate rows + the missing `proof:peer-conformance` row). The tag-MODEL decision is W27a's (shared
  with W25a); W41 inherits it, does not re-decide it.

- **vs W33 (AX close — gate-fleet registration + `proof:ax-final`).** W33 CONSOLIDATES the full
  gate-fleet registration + the tag-parity meta-assert + the meta-gate (every `proof-*.mjs` has a
  package.json entry). W41 registers ONLY its own three gates + `proof:peer-conformance`; W33's
  meta-gate then VERIFIES W41's gates are registered. **Disjoint by scope:** W41 = its own gate rows;
  W33 = the fleet-wide consolidation + the meta-assertion that catches any unregistered gate (so a W41
  miss is caught at close). W41 must NOT author `proof:ax-final`.

**`package.json` shared-file note:** W41 edits `build:watch` + the value devDep + appends three
`proof:*` script rows. Several waves edit `package.json` (W24 subpath exports, W29 subpath strikes,
the gate registrations). W41's edits are DISJOINT LINES — the `scripts.build:watch` value, the
`devDependencies."@mkbabb/value.js"` value, and three appended `scripts."proof:*"` rows. It touches
NO `exports` / `typesVersions` / `peerDependencies` entry, so it does not collide with the
subpath-export waves. Dispatch after the subpath waves settle to keep the `scripts` block merge
trivial, or accept a clean line-level merge.

---

## Triumvirate (the implement / adversarially-verify / gate-author split)

Actual glass-ui-side count: **3** (1 implement + 1 adversarial-verify + 1 gate-author), under the
AX ≤6-implementation / ≤7-read-only ceiling (per §0 agent-ceiling; the keyframes-side republish +
the value-side widen are the sibling sessions' own waves, out of glass-ui's dispatch).

- **Implement (≤1 agent).** Re-derives `build:watch` (the combined JS + `emit-types --watch`
  orchestrator); bumps the value devDep to the representative point; authors the band-N supplier-edge
  subsection of `coordination/CONSTELLATION.md` (the two born-RED handoffs + the sibling-baseline
  capture). Does NOT touch `src/` runtime, the peer ranges, or any sibling source.

- **Adversarially-verify (≤1 read-only agent).** Confirms each RED witness is real BEFORE the fix
  (LIVE — actually runs the JS-only `build:watch`, edits an export, observes the stale dts; runs the
  devDep-parity drift; greps `gates.mjs` for the missing `proof:peer-conformance`). After the fix:
  confirms the dts goes fresh under the watch (a deliberately-introduced symbol appears in
  `dist/*.d.ts`), confirms `proof:peer-devdep-parity` reds if a devDep is narrowed below its peer
  floor (born-RED behavior), confirms the export-stability check reds on a simulated relied-symbol
  drop, and confirms the value-devDep bump leaves `npm ci` + `npm run build` + `typecheck` GREEN. The
  ADVERSARIAL job is to prove the dts-watch fix is REAL (the watch actually re-emits dts on a
  mid-session edit, not just on the cold pass) — the keystone witness.

- **Gate-author (≤1 agent).** Writes the three `proof:*` scripts (`proof-build-watch-dts.mjs`,
  `proof-peer-devdep-parity.mjs`, `proof-keyframes-export-stability.mjs`) in precept-valid form
  (build/test/runtime artefacts — NOT grep-only for runtime behaviour: the dts-watch gate is a
  runtime-observation gate, it SPAWNS the watch and reads the emitted dts, never a static grep);
  registers all four (incl. `proof:peer-conformance`) in `scripts/gates.mjs` with the at-LEAST-ci tag
  model; authors `W41-publisher-cross-repo-build.json`.

**Autonomous-resilience clause + triumvirate auto-triggers (per WAVE_SPEC §3a; AX REQUIREMENTS §22.4b — mandatory):**

The wave-agnostic authorization grant is AX.md §6.1 (the canonical clause — work AROUND a roadblock with an idiomatic in-FileBounds gestalt fix rather than stall; spawn a tangent triumvirate on a scope-reveal / non-local gate failure / 3rd-iteration loop; escalate ONLY on a genuine §21 user-gate) + §6.2 (the 4-class halt-vs-work-around decision tree). The orchestrator may NOT redispatch the failing unit alone. This wave's §3a auto-triggers (authored from its FileBounds + HardGate):

- **FileBounds expansion / scope-reveal → triumvirate (Class 2).** If re-deriving `build:watch` to emit dts reveals a needed `tsconfig.build.json` / `vite.library.ts` / `flatten-subpath-types.mjs` edit beyond `package.json` + `scripts/build-watch.mjs` (it must NOT — the dts arm reuses the cold-build `emit-types` toolchain unchanged), or the value-devDep bump reveals a needed `peerDependencies` re-narrow (forbidden — the peers already admit `^0.11`/`^4` per AW.W27) or a real nested-graph value.js resolution edit, or any `src/` runtime touch surfaces, the reveal is NEVER absorbed in-line → HALT + triumvirate (a packaging-toolchain gap the FileBounds did not home).
- **Non-local hard-gate failure → triumvirate (Class 2).** If `proof:build-watch-dts` reds because the combined-watch dts arm cannot stay fresh without a toolchain change outside W41's FileBounds, or `proof:keyframes-export-stability` reds on a relied-symbol the W34 idiom census has NOT yet enumerated (the export-census source is upstream-incomplete), or `proof:peer-conformance` reds against a peer/devDep state another wave owns, the gate fails outside W41's FileBounds → triumvirate (a supplier-edge break with no in-wave owner).
- **3rd diagnostic-loop iteration → triumvirate (Class 2).** If the dts-watch re-derivation fails to keep `dist/*.d.ts` fresh on a mid-session `src/` edit (the keystone witness) for a third re-author pass — the combined JS + `emit-types --watch` arm still leaves the dts stale — HALT + triumvirate (the watch-pipeline re-derivation did not actually close the contract-v2 freshness obligation it exists to fix).
- **§5.3 ratify reached un-ratified → HALT-AND-RATIFY (Class 3).** If the devDep-bump path (the value `^0.11` representative-point bump vs the keyframes `^4` bump GATED on the 4.0.1 republish handoff; the phantom-devDep drop-vs-keep adjudicated by the LIVE value.js-load re-diagnosis) cannot be ratified from the live evidence — the keyframes-4 `file:`-link state or the value-load path is ambiguous when the bump runs — do NOT self-ratify an `npm ci`-breaking bump → surface to the orchestrator for the recorded default (keyframes stays `^2.2.0`, gated).

---

## HardGate (born-RED → GREEN + the MANDATORY visual-truth clause)

Born-RED → GREEN gate set (all four witnesses from §State):

1. **`proof:build-watch-dts`** (NEW, runtime-observation, fail-CLOSED) — spawns `npm run
   build:watch`, lets `dist/` settle, writes a tracked exported-symbol delta into a `src/` entry,
   waits for the watch to re-emit, asserts the corresponding `dist/<entry>.d.ts` reflects the delta
   (FRESH), reverts the delta, kills the watch. Born-RED against the JS-only watch at HEAD (the dts
   never changes mid-session); GREEN after the combined-watch arm lands. This is a RUNTIME gate (it
   drives the watch and reads the artefact), not a grep — precept-valid per `SPEC.md:94` (build/test/
   runtime output) and explicitly NOT the invalid "grep found a source string" form.

2. **`proof:peer-devdep-parity`** (NEW, build/static-manifest) — each devDep floor intersects its
   peer range + lands on the representative point; admits the gated keyframes `^2.2.0` floor as
   in-range until the 4.0.1 handoff. Born-RED if a devDep is narrowed below its peer floor.

3. **`proof:keyframes-export-stability`** (NEW, build/resolution) — every keyframes export glass-ui
   source + downstream-via-glass-ui (W34 census) relies on survives at the declared peer floor; reds
   on a simulated relied-symbol drop.

4. **`proof:peer-conformance` registered ci/release** — the existing gate (`package.json:556`)
   appears in `scripts/gates.mjs` with the at-LEAST-ci tag model (born-RED witness: ZERO `gates.mjs`
   hits at HEAD → GREEN after registration). The tag-parity meta-assert (W27a/W33) then verifies it.

5. **The two born-RED cross-repo handoffs declared** in `coordination/CONSTELLATION.md` band-N
   supplier-edge subsection (the keyframes-4 `file:`-republish + the E2 value-cap) — each PAIRED with
   the gate that flips GREEN when the sibling lands it (the devDep-`^4` bump gated on 4.0.1; the
   keyframes value-dep widen gated on value-0.11 in aurora). Never a bare "handed off" tag.

**VISUAL-TRUTH (the NON-NEGOTIABLE AX.W00 close discipline).** W41 has NO glass-ui visual surface —
it is a packaging/build wave, so there is NO appearance/interaction axis to live-audit IN THIS REPO,
and the charter §gate states "NO visual surface — structural / packaging wave." But the AX.W00 visual-truth
gate is NOT waived; it is DISCHARGED at the publish hinge W41 EXISTS to harden: **W41's correctness is
proven by a live cross-repo dts-resolution + paint re-verify on a CONSUMER, run as part of the W35
consume-bump and the W34 adoption legs.** Concretely, the W41 close criterion's visual-truth half is:
a consumer (the value.js demo or keyframes EditorShell, file-linked or AX-cut-pinned) is brought up on
glass-ui under the combined `build:watch`, a mid-session `src/` edit to a PUBLIC TYPE is made, and the
consumer's editor/typecheck picks up the fresh dts AND the consumer's live page re-paints the rebuilt
component (a Playwright + frontend-design pass on the consumer's surface, NOT a headless dts-diff
alone) — proving the freshness keystone delivers the rebuilt visual artefact end-to-end. The one-liner:
**a consumer dev-server, under W41's combined build:watch, picks up a glass-ui public-type edit's
fresh dts AND live-repaints the rebuilt component on a real device — the dts-watch keystone proven
against a real consumer paint, not a headless type-diff.** This is paired-π BEFORE/AFTER + DELTA per
the W00 protocol, run on the consumer repo (cross-repo π is binding on the consumer too, §2b band-N).
The wave does NOT close on the four headless gates alone.

---

## Cadence (sub-step order)

1. **Live re-diagnose the four RED witnesses (the W00 wave-open ritual).** Actually run the JS-only
   `build:watch` + edit-an-export → observe the stale dts; run the devDep-parity drift; grep
   `gates.mjs` for `proof:peer-conformance`; confirm the export-surface drop class against the W34
   `getTimingFunction` finding. Record each measurement in `W41-publisher-cross-repo-build.json`. Do
   NOT trust the audit's word.
2. **Re-derive `build:watch` with the dts arm.** Author `scripts/build-watch.mjs` (the combined JS +
   `emit-types --watch` orchestrator) OR the parallel-npm-script form; point `package.json`
   `build:watch` at it. Confirm a cold `build:watch` produces a complete `dist/` (JS + dts) and a
   mid-session `src/` edit re-emits both.
3. **Author + register `proof:build-watch-dts`.** The born-RED runtime gate; verify it reds against
   the OLD JS-only watch (git-stash the new arm, run it RED, restore) and greens against the new arm.
4. **Author the devDep-parity gate + the value-devDep bump.** Ship `proof:peer-devdep-parity`; bump
   value devDep `^0.10.0` → `^0.11.0`; confirm `npm ci` + `npm run build` + `npm run typecheck` stay
   GREEN. RATIFY the keyframes-devDep-bump GATING (stays `^2.2.0` until the 4.0.1 handoff; the gate
   admits it in-range).
5. **Register `proof:peer-conformance` + author the export-stability check.** Add the
   `proof:peer-conformance` row to `gates.mjs` (at-LEAST-ci tag model); author + register
   `proof:keyframes-export-stability` against the W34 relied-symbol census.
6. **Append the band-N supplier-edge subsection to `coordination/CONSTELLATION.md`.** The two
   born-RED handoffs (keyframes-4 `file:`-republish; the E2 value-cap), the sibling-baseline capture
   (keyframes + value HEAD/branch/status), the devDep-bump ordering record. Disjoint from W28/W34/W35
   sections.
7. **Visual-truth cross-repo re-verify + close.** Run the consumer-side dts-resolution + live-repaint
   re-verify (the VISUAL-TRUTH clause; paired with W35's consume-bump). Record the close in the audit
   json + route the keyframes-4 republish + the E2 value-cap to their sibling sessions; route the
   devDep-`^4` bump completion to W33's close-time re-check.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W41-publisher-cross-repo-build.json` — the born-RED ledger: the four RED
  witnesses + their live measurements (the stale-dts mid-session capture; the devDep-vs-peer drift;
  the `gates.mjs` missing-row grep; the export-drop class); the dts-watch re-derivation record (the
  combined-arm form chosen); the devDep-parity decision (value bumped, keyframes gated); the
  gate-registration record (the four gates + tags); the export-stability census; the two handoff
  routings; the W33/W34/W35 routing.
- The `proof:build-watch-dts` born-RED → GREEN transcript (the stale-dts capture against the old
  watch + the fresh-dts capture against the new arm) — the keystone evidence.
- The `proof:peer-devdep-parity` + `proof:keyframes-export-stability` GREEN transcripts +
  `proof:peer-conformance` ci/release-tagged registration.
- The `coordination/CONSTELLATION.md` band-N supplier-edge subsection (the two born-RED handoffs +
  the sibling-baseline capture).
- The cross-repo VISUAL-TRUTH evidence (the paired BEFORE/AFTER consumer dts-resolution + live-repaint
  re-verify) — the appearance-axis half of the close, run on the consumer repo.

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `docs(AX.W41): born-RED ledger — live-confirm stale-dts watch + devDep-peer drift + untagged peer-conformance + export-drop class`
2. `build(AX.W41): build:watch emits dts — combined vite-watch + emit-types --watch arm (the contract-v2 dts-freshness keystone; value.js C-DTS root cause)`
3. `test(AX.W41): proof:build-watch-dts — fail-CLOSED runtime gate that a watched src edit leaves dist dts fresh`
4. `chore(AX.W41): proof:peer-devdep-parity + bump value devDep to ^0.11.0 (representative-point; keyframes ^4 bump gated on the 4.0.1 republish)`
5. `chore(AX.W41): register proof:peer-conformance ci/release + proof:keyframes-export-stability (the getTimingFunction-drop guard)`
6. `docs(AX.W41): coordination/CONSTELLATION.md band-N supplier-edge — keyframes-4 file:-republish + E2 value-cap as born-RED handoffs`
7. `docs(AX.W41): audit ledger — cross-repo VISUAL-TRUTH dts-resolution + live-repaint re-verify on consumer; devDep-^4 → W33, republish + value-cap → sibling sessions`

---

## Dependencies (dependsOn from the charter + why)

- **dependsOn AX.W00** (the charter §3 W41 block + §1 row). W00 stands up the fail-CLOSED π
  visual-runtime lane + the paired-π BEFORE/AFTER + DELTA protocol + the "live re-diagnosis BEFORE the
  fix" wave-open ritual. W41's VISUAL-TRUTH cross-repo re-verify (the consumer dts-resolution +
  live-repaint) RUNS the W00 paired-π protocol on the consumer repo, and W41's §State RED witnesses are
  live-re-diagnosed per the W00 ritual. W00 is the only HARD predecessor (W41 is otherwise
  independent of the dock/graphics/encapsulation bands — it is a packaging wave).
- **SOFT-coupled (not dependsOn, but inverse-ordering aware):** W34 (the export-stability check
  consumes W34's idiom census — author the check against a placeholder census if W34 lands later, then
  reconcile); W27a (the gate-tag MODEL W41 inherits — if W27a lands first, W41 uses its model; if
  concurrent, both use the at-LEAST-ci form §4 note 21); W28 (opens the coordination doc W41 appends
  to — W41 appends after the scaffold exists). W35 DEPENDS ON W41 (its consume-bump resolves through
  the W41 publish hinge), so W41 lands BEFORE the W35 consume leg + the W19/W20 prune PUBLISH.

---

## Archaeology (the git commits / prior-tranche lineage the audit cited as evidence)

- **`package.json:536-537`** (HEAD) — `"build": "vite build && npm run emit-types"` vs `"build:watch":
  "vite build --watch"` (JS-only): the keystone witness. The `emit-types` arm
  (`package.json:547` — `vue-tsc --project tsconfig.build.json && flatten-subpath-types.mjs`) runs in
  the cold build but NOT the watch.
- **`package.json:658-659` (peers) vs `:689-690` (devDeps)** — the range-drift witness (peers
  `^2.2.0||^3.0.0||^4.0.0` + `^0.10.0||^0.11.0`; devDeps `^2.2.0` + `^0.10.0`).
- **AW.W27 (`docs/tranches/AW/waves/AW.W27-peer-conformance.md`, Status CLOSED 2026-06-07)** — the
  orphan/hidden wave (no AW charter §2 row; AW.md:135 mentions "W27" only as a renumber artefact). Its
  §What-landed records the value peer widen `^0.10.0`→`^0.10.0||^0.11.0` (E0a) + the keyframes peer
  widen to `^4` (E0b) + the `useNumericTransition` callable-TimingFunction narrowing, and explicitly
  KEPT the keyframes devDep at `^2.2.0` because keyframes-4's tarball ships the stray
  `@mkbabb/glass-ui: file:../glass-ui` dep that breaks `npm ci` (lines 37-52). Its §"Forward note for
  E2" (lines 75-78) is the E2 value-cap handoff W41 declares.
- **`scripts/proof-peer-conformance.mjs`** (header — "AW.W27 — the peer-conformance gate") + its
  dual-instance value-intersection logic (keyframes-4 caps value `<0.11`; glass-ui's value peer
  intersects at 0.10.x). The gate exists; the gates.mjs registration does not.
- **bbnf-buddy `cc7dd5a`** (2026-06-07) — the keyframes `getTimingFunction` local reimplementation
  (`src/animation/easing.ts:1-30`): the export-surface-drop witness (the constellation peer-dependency
  break a glass-ui peer-range bump cascaded).
- **value.js Tranche M fold-ledger §1 (C-DTS / E4 / K.W2.5)** + `value.js
  coordination/cohort-glassui-3.2.0-keyframes-3.0.0.md:27-29 (W-A: "make build:watch emit dts")` +
  `:21-26 (W-A: drop the value devDep, keep peer only)` — the cross-repo provenance: the dts-watch gap
  is the root cause of value.js's 75 TS7016 stale-dist-typecheck errors, flagged unmet at glass-ui
  3.2.0/3.1.1, STILL unmet at 3.6.0 HEAD.
- **`cross-repo-dev-resolution.md`** (AG glass-ui-core wave, contract-v2 supersession; §2.3 lines
  118-144, §3 lines 184-206, §4 invariant-30 lines 219-241) — the precept the dts-watch gap violates:
  contract-v2 makes freshness a structural obligation of `build:watch`, and the §3 gate asserts
  `build:watch` is PRESENT but does NOT assert it emits dts — exactly the hole W41 closes.
- **MEMORY `project_glassui_340_published`** ("keyframes-4 publish bug") + **`project_publish_ci_broken`**
  (the keyframes.js + glass-ui tag-release CI history) — the supplier-edge cross-references.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Per §2b the band-N binding precepts (pinned `docs/precepts/` @ `63240e6`):

- **cross-repo-dev-resolution contract-v2 — the dts-watch gap is the invariant-30 violation W41
  closes** (`docs/precepts/cross-repo-dev-resolution.md` §2.3:118-144 "Every `@mkbabb/*` publisher
  package MUST declare a `build:watch` script … rebuilds `dist/` incrementally on every `src/` edit";
  §3:184-206 the enforcement gate; §4:219-241 invariant 30 contract-v2; §2b band-N). The PRECEPT
  obligates `build:watch` to keep `dist/` fresh so every consumer dev-resolving the built `dist/`
  resolves the CURRENT artefact; a JS-only watch leaves the dts STALE, breaking the freshness
  guarantee for the TYPE half of every consumer's typecheck. W41 re-derives `build:watch` to emit dts.
  MUST NOT satisfy the §3 gate's existing "build:watch PRESENT" check while leaving the dts arm absent
  (the present-but-incomplete loophole — W41 EXTENDS the freshness obligation to the dts). MUST NOT
  re-introduce a `dist/` alias, a self-alias, or a phantom transitive devDep (§2.4 prohibitions —
  LIVE re-diagnose the value devDep against this before bumping vs dropping it).

- **fail-explicit on library-internal contract violations vs befitting-silent browser-API degradation**
  (`docs/precepts/instructions/README.md:82-93`; `tranche/SPEC.md:106-116` the invalid-gate "silent
  `console.warn` + return in a library-owned failure mode"). A stale dts a consumer typechecks against
  is a LIBRARY-OWNED contract violation — the fix is the structural dts-watch arm (a loud, gated
  freshness guarantee), NOT a graceful degradation. This is explicitly NOT a befitting-silent
  browser-API case (no WebGL/network/PRM axis); the two are never collapsed. MUST NOT treat the
  stale-dist class as a tolerable silent fallback.

- **no-silent-deferrals + the chronic-closure meta-invariant + P-inv-28 zero-deferral close**
  (`instructions/README.md:25` "No silent deferrals … lands, is formally retired with rationale";
  `tranche/SPEC.md:191` P invariant 28 — "every item LANDS, RETIRES with rationale, or ARCHIVES …
  'deferred to next tranche' is not an acceptable close-state"; §2b band-N chronic-closure
  meta-invariant). The two AW.W27 supplier-edge debts (the keyframes-4 republish + the E2 value-cap)
  LAND as born-RED PAIRED handoffs in `coordination/CONSTELLATION.md` — a bare "handed off" tag is NOT
  a terminal (the M3 column-migrate anti-pattern). The dts-watch gap, unmet since 3.2.0, is closed
  HERE, not re-deferred. MUST NOT phantom-owner re-defer any of the four legs to a future tranche.

- **substrate-with-consumer / wire-before-retire — the named consumers** (`instructions/README.md:28`
  "Substrate with consumer … land with a runtime caller"; `:33` "Wire before retire"; J inv 10 / L
  inv 8). Every W41 leg has named cross-repo consumers: the dts-watch arm serves value.js (C-DTS) +
  keyframes (consume-bump) + every contract-v2 consumer; the export-stability check serves bbnf-buddy
  (the `getTimingFunction` witness) + the W34 census; the devDep bump serves the published value.js
  0.11.1 spine. The three new gates are not speculative substrate — each guards a real, witnessed
  cross-repo failure. MUST NOT ship a gate with no consumer-grounded failure (no-overfitting).

- **cross-repo coordination doc + sibling-baseline-capture ritual** (`tranche/SPEC.md:19,38`
  "`coordination/<peer-letter>.md` … required when the tranche has a … deferred cross-repo handoff …
  names the other repo's HEAD at coordination time, the surfaces both tranches may write, the
  writer-vs-reader boundaries, and the conflict-resolution protocol"; `coordination/CONSTELLATION.md`
  if cross-repo origin; the bbnf sibling-baseline-capture ritual per the charter §0). W41 APPENDS the
  band-N supplier-edge subsection + captures keyframes' + value's HEAD/branch/status BEFORE the
  handoffs are declared. MUST NOT rewrite W28's band-K / W34's §16 / W35's band-N migration sections
  (disjoint-subsection authorship).

- **the hardened agent git clause + cross-repo commit policy** (`instructions/ORCHESTRATION.md`
  cross-repo commit policy; `tranche/AGENT_DISPATCH_TEMPLATE.md`; CLAUDE.md §Design Axes 5). glass-ui
  writes NO keyframes/value source — it authors the in-repo `package.json`/`scripts` edits + ADDITIVE
  coordination handoffs; the keyframes 4.0.1 republish + the value-dep widen execute under the sibling
  sessions' own tranches; cross-repo PUSH is ALWAYS orchestrator-authored. MUST NOT have a glass-ui
  agent stage/commit/checkout in a sibling repo.

- **gates close on evidence — no grep-only runtime gate** (`tranche/SPEC.md:94-117` accepted hard-gate
  forms: build/test/runtime/benchmark/diff/deletion/doc-reconciliation; the invalid "grep found a
  source string for runtime behaviour" + "API exists" + "consumer will be wired later" forms). The
  dts-watch gate is a RUNTIME-observation gate (it spawns the watch + reads the emitted dist artefact),
  the parity + export-stability gates are build/resolution gates over the manifests — never grep-only.
  MUST NOT author `proof:build-watch-dts` as a grep for the `emit-types` string in `build:watch` (that
  proves the script SHAPE, not the runtime FRESHNESS); it must drive the watch and observe the dts.

- **the keyframes.js-collaboration clause + the keyframes-export-stability ask** (REQUIREMENTS §0
  keyframes-collaboration; §2b band-N "the keyframes.js-collaboration clause"; the charter §3 W41 leg
  4). The export-stability check is the constellation gate the collaboration clause asks for — a
  glass-ui peer-range bump cannot silently drop a downstream-relied keyframes export. MUST NOT bump
  the keyframes peer range without the export-stability check guarding the downstream cascade.

- **the π visual-runtime lane — cross-repo binding on the consumer** (`tranche/SPEC.md:118-133,191`;
  AX.W00; §2b band-N "cross-repo π is binding on slides too" generalized to every consumer). W41's
  VISUAL-TRUTH half runs the paired-π BEFORE/AFTER + DELTA on a CONSUMER repo (the dts-resolution +
  live-repaint re-verify) — the packaging fix is proven by a real consumer paint, not a headless
  dts-diff. MUST NOT close W41 on the four headless gates alone without the consumer-side live
  re-verify (the cardinal AW lesson).
