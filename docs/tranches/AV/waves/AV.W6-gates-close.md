# AV.W6 — the derived-fact gate fleet + close

## 2. State

**Name**: W6 — the derived-fact gate fleet + close
**Opens after**: AV.W4 + AV.W5 + **AV.W7 + AV.W8** (this is the LAST AV wave — it cannot author the derived-fact gates until the supply surface (W4) + the transposition (W5) + the SOTA-crosswalk perf/procedural waves (W7 offscreen-pause, W8 constellation — added by the SOTA fold per `AV.md §2.5`) are committed, because the gates DERIVE their facts from the post-transposition `dist/`/`exports`/consumer surface AND the `proof:av-final` MATRIX-COHERENT assertion + the overfitting audit must see the W7/W8 gates (`proof:offscreen-pause`, `proof:canvas2d-substrate-consumer`) registered). All prior AV waves (W0–W5, W7, W8) green before W6 opens.
**Agents**: 3 parallel — three file-disjoint lanes (§4a): (A) `proof:api-export-count` (the mechanical derived-fact gate replacing the W9 hand-curated tally), (B) `proof:dock-css-split` upgrade (string-grep → module-graph assertion), (C) the overfitting audit + the changeset stage + `proof:av-final` (release-only close meta-gate). No two lanes share a `modify` path.
**Hard gate**: `proof:api-export-count` GREEN (mechanically derived) + `proof:dock-css-split` upgraded GREEN (module-graph) + `proof:av-final` GREEN (release-only; clean-tree + matrix-coherent + zero-orphans + staged-not-published); the overfitting audit shows ZERO orphans; the AV changeset is STAGED (not published — USER-DOMAIN).
**Status**: planned

**Type:** GATE-FLEET + CLOSE (the AV tranche-close meta-wave; non-publish — the publish is USER-DOMAIN per E1). `proof:av-final` is DEV-meta (release-only, no born-RED@HEAD). The AV execution order is **W0→W1→W2→W3→W4→W5→W7→W8→W6** (per `AV.md §2`): W6 is the LAST wave, opening only after W7 (perf) + W8 (constellation) so the close DERIVES from the post-perf/post-constellation surface and the registry resync sees the W7/W8 gates registered.
**Scope source:** `docs/tranches/AV/audit/AUDIT-DIGEST.md` Stream A gate-fleet seeds (`proof:api-export-count` mechanizes the W9 hand-curated tally; the `proof:dock-css-split` module-graph upgrade; `proof:webgl-golden` stays DEFERRED with its named trigger) + the overfitting-audit precept + the staged-not-published USER-DOMAIN clause. This file is the FULLY-formed, execute-without-re-deriving spec for W6.

**Precepts in force.** No legacy / no back-compat aliases. KISS — derive facts mechanically, do not hand-curate. Overfitting-audit (J inv 10) — every `src/` artefact has ≥2 sites OR is exported OR is a private demo helper; the audit runs at tranche close. Staged-not-published (E1, USER-DOMAIN) — W6 STAGES the changeset; `changeset version` + the `v3.3.0` push + the gated provenance publish are USER-DOMAIN. Derived-fact-over-hand-curation — the consumer tally moves from a hand-edited JSON to a MECHANICALLY-grepped derivation.

## 2a. Goal criterion

This wave succeeds if (1) `proof:api-export-count` enumerates the `dist/` surface + the subpath inventory AND derives the per-subpath consumer counts MECHANICALLY (grep `@mkbabb/glass-ui/<subpath>` across the four consumer repos) — moving the W9 hand-curated `W9-consumers.json` tally to a DERIVED FACT; (2) `proof:dock-css-split` upgrades from a string-grep on selector text to a MODULE-GRAPH assertion (the carve is proven by the CSS `@import` graph + the rule-ownership, not a brittle regex); (3) `proof:webgl-golden` stays DEFERRED with its named trigger (a stable headless WebGL2 runner) recorded; (4) the overfitting audit shows zero orphans; (5) the AV changeset is STAGED (not version-bumped, not published); (6) `proof:av-final` (release-only) asserts the close is clean-tree + matrix-coherent + zero-orphans + staged-not-published; (7) the COMPLETE AV gate registry is resynced in `gates.mjs` — every gate the augmented waves named (`proof:av-w0-reground`, `proof:aurora-space-gamma`, `proof:shader-shared-source`, `proof:motion-composables-consumer`, `proof:motion-value-free`, `proof:shadow-contract`, `proof:card-cartoon-consumers`, `proof:subpath-enumeration`, `proof:no-orphan-composable`, `proof:offscreen-pause`, `proof:canvas2d-substrate-consumer` IFF W8 landed, plus W6's own three) is registered with its tag so `gates.mjs --verify-ci` passes and `proof:av-final`'s matrix is not silently short a gate. The reader's test: the consumer count for every subpath is a `grep` result, not a hand-typed number; the dock-css-split gate survives a selector-text reformat that would have false-RED'd the regex; the tree is clean + the changeset stages the minor bump without `changeset version` having run; `gates.mjs --verify-ci` enumerates the full AV gate set with no manifest gap.

## 3. Scope

1. **`proof:api-export-count` (Lane A — derived-fact gate).** Author a gate that (a) ENUMERATES the public surface — every `package.json` `exports` subpath + every `dist/<subpath>.js` + the `/api` type/const tally (32 types + 1 const block at HEAD per `src/api/index.ts`; corrects the `/api` header drift the digest flags — verify the header tally matches the actual export count); (b) DERIVES the per-subpath consumer count MECHANICALLY by grepping `@mkbabb/glass-ui/<subpath>` across the four consumer repos (`~/Programming/{slides,speedtest,muster,feedback-coder}`) — each cited consumer RESOLVES at HEAD (a repo that does not exist is SKIPPED, not failed — mirrors the CI-monorepo-layout-cascade discipline); (c) replaces the AU.W9 hand-curated `W9-consumers.json` static tally with the derived fact (the consumer count is a grep result, not a hand-typed number). The gate is the J-inv-10 ≥2-consumer bar made MECHANICAL.
2. **`proof:dock-css-split` upgrade (Lane B — string-grep → module-graph).** The HEAD `scripts/proof-dock-controls-split.mjs` proves the carve by REGEX on selector text (`@import` regex + top-level selector matching). Upgrade it to a MODULE-GRAPH assertion: parse the CSS `@import` graph (`index.css` → `dock.css` + `dock-controls.css` in `@layer components`) + assert rule-ownership by the COMPILED `dist` CSS rule set (each control family's base rule is sourced from `dock-controls.css`, the shell/contract rules from `dock.css`) rather than a brittle string match on the source. Survives a selector-text reformat that would false-RED the regex.
3. **`proof:webgl-golden` DEFERRED (Lane B — record the trigger).** Keep `proof:webgl-golden` DEFERRED. Record the named trigger in `PROGRESS.md`: a STABLE headless WebGL2 runner (the aurora/blob snapshot-equivalence gate needs a deterministic GPU/SwiftShader context that the CI headless environment does not yet provide reliably). NO gate authored; the BOOK is the deliverable.
4. **Overfitting audit + changeset + `proof:av-final` (Lane C — close).** Run the overfitting audit (the canned prompt at `docs/audits/overfitting-audit.md`) over the AV `src/` deltas (the W4 supply + W5 transposition + the W7 perf seams + the W8 `useCanvas2D`/constellation IFF LANDED + this wave's gates) — every artefact ≥2 sites OR exported OR demo-private; record ZERO orphans. STAGE the AV changeset (`.changeset/*.md`, a MINOR bump for the supply surface — NOT `changeset version`, NOT published). Author `proof:av-final` (release-only DEV-meta) mirroring `proof:au-final`.
5. **Gate-registry resync (Lane C — the `proof:av-final` matrix completeness).** `proof:av-final`'s MATRIX-COHERENT assertion runs `gates.mjs --verify-ci`, which passes ONLY when EVERY AV gate the augmented waves named is REGISTERED in `gates.mjs` with its `{local,ci,release,sibling}` tag (NOT hand-listed in `ci.yml`). W6 confirms the registry holds the COMPLETE AV gate set so the matrix is not silently short a gate. The full AV gate registry the resync must cover (each authored by its owning wave; W6 only CONFIRMS registration — it does not re-author the upstream gates): the W0 meta-gate `proof:av-w0-reground`; the W1 shader gate `proof:aurora-space-gamma`; the W2 convergence gate `proof:shader-shared-source`; the W3 motion gates `proof:motion-composables-consumer` + `proof:motion-value-free`; the W4 supply gates `proof:shadow-contract` + `proof:card-cartoon-consumers` (+ the conditional `proof:drawer-native-consumers` IFF the Drawer-native fold landed); the W5 transposition gates `proof:subpath-enumeration` + `proof:no-orphan-composable`; the W7 perf gate `proof:offscreen-pause`; the W8 procedural gate `proof:canvas2d-substrate-consumer` (IFF the constellation LANDED — GATED-NOT-LANDED carries no gate); and W6's own `proof:api-export-count` + the upgraded `proof:dock-css-split` + the release-only `proof:av-final`. `gates.mjs --verify-ci` is the falsifier — a named gate missing from the manifest reddens it. The W2 gate name is `proof:shader-shared-source` (the AV.md §2 W2 row's `proof:shader-chunk-single` label is superseded by the W2 spec's `proof:shader-shared-source` — W6 reconciles to the AUTHORED name).

## 3a. Triumvirate Dispatch

A triumvirate (research + plan augment + redress) is mandatory — the orchestrator may NOT redispatch the failing unit alone — when:

- **The mechanical consumer-derivation cannot reconcile with the prior hand-curated tally.** If `proof:api-export-count`'s grep-derived consumer counts DIVERGE from the AU.W9 hand-curated `W9-consumers.json` in a way that reveals a REAL overfit (a subpath the hand-tally claimed ≥2 consumers for but the grep finds <2), that is a SUBSTRATE-WITHOUT-CONSUMER finding (J inv 10) — the redress is to RETIRE the subpath or BOOK it with a trigger, which crosses out of the gate-authoring DOCS bounds. Halt and triumvirate.
- **The dock-css-split module-graph upgrade reddens the legitimate shared comma-group.** The `dock.css:36-50` cross-control `:focus-visible`/`:disabled` comma-group LEGITIMATELY names control selectors but stays at the import root (it is shared, not per-control — AU.W8b.3). A module-graph assertion that attributes a shared-group rule to the wrong file is a plan defect, not a local fix.
- **The overfitting audit finds a NON-trivial orphan in the AV deltas.** If the `createDockContext<T>()` factory (W5), a moved subpath barrel, or a W4 supply artefact has <2 consumers and is not exported/demo-private, the redress is to RETIRE or consume it — a scope decision, not a gate edit.
- **`proof:av-final`'s STAGED-NOT-PUBLISHED assertion cannot distinguish staged from published** because `changeset version` was run prematurely (USER-DOMAIN bleed) — halt; the gate must FAIL closed if the version was bumped (the publish is not W6's to do).
- **Any diagnostic loop reaches its third iteration** on the consumer-grep cross-repo resolution — halt, do not iterate a fourth time.

## 4. File Bounds

| File | Access | Lane |
|---|---|---|
| `scripts/proof-api-export-count.mjs` | create | A |
| `docs/tranches/AV/audit/W6-api-export-count.json` | create (the derived tally) | A |
| `src/api/index.ts` | modify (header tally re-sync IF the count drifts — the `/api` doc-currency fix) | A |
| `scripts/proof-dock-controls-split.mjs` | modify (string-grep → module-graph) | B |
| `docs/tranches/AV/audit/W6-dock-split-graph.json` | create (the module-graph tally) | B |
| `scripts/proof-av-final.mjs` | create | C |
| `docs/tranches/AV/audit/W6-overfitting-audit.md` | create (the audit record) | C |
| `.changeset/<av-supply>.md` | create (the STAGED minor bump) | C |
| `docs/tranches/AV/AV.FINAL.md` | create (the close doc) | C |
| `scripts/gates.mjs` | modify (register, orchestrator-merged) | A/B/C |
| `package.json` | modify (scripts only) | A/B/C |
| `CLAUDE.md` | modify (Build block — the new gate names IF surfaced) | A |
| `docs/tranches/AV/PROGRESS.md` | modify (the webgl-golden BOOK + the close record) | all |

Do NOT touch: any `src/` runtime/component path EXCEPT `src/api/index.ts` (and that ONLY for the header tally doc-currency re-sync — never the export set itself) · `package.json` version (`changeset version` is USER-DOMAIN — the changeset STAGES the bump, W6 does not run it) · the AU close artefacts (`proof-au-final.mjs`, `AU.FINAL.md` — `proof-av-final.mjs` MIRRORS but does not edit them) · `docs/precepts/` (NEVER) · the consumer repos (`~/Programming/{slides,speedtest,muster,feedback-coder}` — the grep is READ-ONLY against them).

## 4a. Disjointness

No two agent units share a `modify`/`create` path:

- **Lane A (`proof:api-export-count`)** owns `proof-api-export-count.mjs` + `W6-api-export-count.json` + the `src/api/index.ts` header re-sync (doc-currency only) + the `CLAUDE.md` Build-block gate name. Disjoint.
- **Lane B (dock-css-split upgrade + webgl-golden BOOK)** owns `proof-dock-controls-split.mjs` (modify) + `W6-dock-split-graph.json` + the `PROGRESS.md` webgl-golden BOOK record. Disjoint from Lane A.
- **Lane C (overfitting + changeset + final)** owns `proof-av-final.mjs` + `W6-overfitting-audit.md` + the `.changeset/*.md` + `AV.FINAL.md`. Disjoint.
- `scripts/gates.mjs` + `package.json` (scripts) are touched by all three for gate registration — append-only to disjoint regions. `PROGRESS.md` is touched by Lane B (webgl BOOK) + Lane C (close record) — orchestrator-merged. The orchestrator integrates at close. **Sequencing:** Lane C's `proof:av-final` MATRIX-COHERENT assertion runs `gates.mjs --verify-ci`, so Lane A + Lane B's gate registrations must be MERGED before Lane C's final assertion runs — Lane C runs LAST within the wave.

Net: three parallel lanes — **(A) api-export-count**, **(B) dock-split-upgrade + webgl-BOOK**, **(C) overfitting + changeset + final** (runs last). `gates.mjs`/`package.json`/`CLAUDE.md`/`PROGRESS.md` registration is orchestrator-integrated.

## 4b. Worktree Plan

| Agent unit lane | Sibling worktree absolute path | notes |
|---|---|---|
| Lane A — api-export-count | `/Users/mkbabb/Programming/glass-ui-w6-a` | the mechanical derived-fact gate; reads the consumer repos |
| Lane B — dock-split-upgrade | `/Users/mkbabb/Programming/glass-ui-w6-b` | string-grep → module-graph; webgl-golden BOOK |
| Lane C — overfitting + final | `/Users/mkbabb/Programming/glass-ui-w6-c` | runs LAST; the changeset + AV.FINAL.md + proof:av-final |

No `CARGO_TARGET_DIR` (Node/Vite repo). Each lane runs `npm run typecheck`/`npm run build`/its gates against its own worktree checkout. The orchestrator runs `git worktree add` for the siblings before dispatch and owns the `gates.mjs`/`package.json`/`CLAUDE.md`/`PROGRESS.md` integration at close. All three lanes branch from the same clean main with AV.W0–W5 committed. The consumer-repo grep (Lane A) is READ-ONLY against the four sibling repos.

## 5. Agent Units

### AV.W6.A proof:api-export-count (mechanical derived-fact gate)

- Goal: the public surface inventory + the per-subpath consumer count are DERIVED FACTS (enumeration + grep), replacing the AU.W9 hand-curated tally; the `/api` header tally drift is corrected in lockstep.
- Mechanism:
  - **`scripts/proof-api-export-count.mjs`** — author on the house template (`scripts/proof-au-w9-consumers.mjs` for the consumer-resolution idiom + `scripts/proof-package.mjs` for the exports↔dist enumeration). Three derivations: (1) SURFACE-ENUM — read `package.json` exports → assert each subpath has a `dist/<subpath>.js` (composes with W5's `proof:subpath-enumeration`); count the `/api` type exports (`grep -c '^export type' src/api/index.ts`) + the const block → assert the COUNT matches the `src/api/index.ts` header tally claim (the digest flags the header drift — literal 32 types + 1 const block at HEAD, NOT a stale 70/67+3 claim; the gate makes the header tally a DERIVED assertion). (2) CONSUMER-DERIVE — for each subpath, grep `@mkbabb/glass-ui/<subpath>` across `~/Programming/{slides,speedtest,muster,feedback-coder}` (a repo absent at HEAD is SKIPPED, not failed — the CI-monorepo-layout-cascade discipline); the consumer count is the grep hit count, written to `W6-api-export-count.json`. (3) OVERFIT-FLAG — a subpath with <2 derived consumers that is NOT a root-barrel re-export + NOT demo-private is FLAGGED (informational at first; the bite is a NEW subpath shipped with 0 consumers → RED). The detector is PURE (`deriveSurface(exports, distList, apiHeader)` + `deriveConsumers(subpaths, repoGrep)`); the grep is INJECTED so the gate is unit-testable.
  - **`src/api/index.ts`** — IF the header tally comment drifts from the actual export count (the digest flags it), re-sync the header to the DERIVED count (32 types + the const block). Doc-currency only; never edit the export set.
  - **`CLAUDE.md`** — add `npm run proof:api-export-count` to the Build block IF surfaced.
- Files: `scripts/proof-api-export-count.mjs` (create), `docs/tranches/AV/audit/W6-api-export-count.json` (create), `src/api/index.ts` (modify — header re-sync), `CLAUDE.md` (modify), `scripts/gates.mjs` + `package.json` (register).
- Sub-gate: `proof:api-export-count` (NEW) green + bite-verified. Bite: ship a NEW subpath export with 0 derived consumers + not-demo-private → RED; OR drift the `/api` header tally off the derived count → RED. Register `["local","ci","release"]`. (The CONSUMER-DERIVE arm is informational/skip-tolerant for absent repos; the SURFACE-ENUM + header-tally arms are hard.)

### AV.W6.B proof:dock-css-split upgrade + webgl-golden BOOK

- Goal: the dock-css-split carve is proven by the module/`@import` graph + compiled-rule ownership (not a brittle selector-text regex); `proof:webgl-golden` stays DEFERRED with its named trigger recorded.
- Mechanism:
  - **`scripts/proof-dock-controls-split.mjs`** (modify) — replace the string-grep selector detection with a MODULE-GRAPH assertion: (1) parse the `@import` graph — `index.css` `@import`s BOTH `dock.css` and `dock-controls.css` in `@layer components`, in that order (the AU.W8b.3 contract); (2) build the COMPILED `dist` CSS rule set (`npm run build` first, then read `dist/glass-ui.css` or the `/styles` bundle) and attribute each rule's SOURCE file via the source map OR a re-parse of the two source files; assert each control family's BASE rule (`.dock-icon-button`/`.dock-tab-button`/`.dock-select-trigger`/`.dock-dropdown-trigger`/`.dark-mode-toggle-button`) is sourced from `dock-controls.css` and the shell/density/contract rules from `dock.css`, EXEMPTING the shared `:focus-visible`/`:disabled` comma-group at the import root (allowlisted — it names control selectors but is shared per AU.W8b.3) + the motion `:where(…)` group. The module-graph form survives a selector-text reformat (whitespace, comment, nesting-flatten) that would have false-RED'd the regex. Keep the byte-stable JSON artefact (`W6-dock-split-graph.json`) + the `process.exit(1)` discipline.
  - **`proof:webgl-golden` BOOK** — record in `PROGRESS.md`: "proof:webgl-golden DEFERRED — trigger: a STABLE headless WebGL2 runner (a deterministic SwiftShader/GPU context in CI that produces byte-stable aurora/blob snapshots). The aurora/blob snapshot-equivalence gate needs this; the CI headless environment does not yet provide it reliably. NO gate authored until the runner lands." No gate; the BOOK is the deliverable.
- Files: `scripts/proof-dock-controls-split.mjs` (modify), `docs/tranches/AV/audit/W6-dock-split-graph.json` (create), `docs/tranches/AV/PROGRESS.md` (the webgl-golden BOOK). The gate name `proof:dock-css-split` is UNCHANGED (same manifest row, upgraded impl).
- Sub-gate: `proof:dock-css-split` (UPGRADED — same name, module-graph impl) green + bite-verified. Bite: move a `.dock-icon-button {` base rule back into `dock.css` → RED (the compiled-rule ownership attributes it to the wrong file); ALSO bite: reformat the selector text (add a comment/whitespace) → STILL GREEN (the regression the upgrade fixes). Manifest row + tags unchanged (`["local","ci","release"]`); re-verify `verifyCi()` passes.

### AV.W6.C Overfitting audit + changeset stage + proof:av-final

- Goal: the AV `src/` deltas show zero orphans; the AV changeset is STAGED (not published); the COMPLETE AV gate registry is resynced in `gates.mjs`; `proof:av-final` (release-only) asserts the close is coherent AND the matrix holds every named AV gate.
- Mechanism:
  - **Overfitting audit** — run the canned prompt at `docs/audits/overfitting-audit.md` over the AV `src/` deltas (the W4 supply: shadow-contract doc/gate, Card-cartoon dark-arm, conditional GlassNativeDrawer; the W5 transposition: 60 moved barrels, `createDockContext<T>()`, conditional `platform/`; the W7 perf seams: the `useWebGLCanvas` content-visibility hook, the `--av-dither`/`--av-dpr-max`/budget-cap tokens, the `useLayerTransition` `will-change` lifecycle; the W8 `useCanvas2D` substrate + `Constellation` primitive IFF LANDED; the W6 gates). Every artefact ≥2 sites OR exported OR demo-private. Record the verdict in `W6-overfitting-audit.md` — ZERO orphans (the conditional folds (Drawer-native, platform/, the GATED-NOT-LANDED W8 constellation) that did NOT land carry no artefact, so no orphan). If the `createDockContext<T>()` factory has exactly its 2 dock call sites → meets the bar; if the W8 substrate LANDED, `useCanvas2D` clears the bar via its ≥2 consumers (else it was GATED and carries no artefact).
  - **Changeset stage** — author `.changeset/<av-supply>.md`: a MINOR bump (the W4 supply surface — shadow-contract doc + the conditional new subpath IF landed — plus the W5 transposition is internal so contributes no surface bump; the minor reflects the supply additions). Set the changeset summary to name the AV waves. Do NOT run `changeset version`; do NOT bump `package.json` version (USER-DOMAIN per E1).
  - **`scripts/proof-av-final.mjs`** (create) — mirror `scripts/proof-au-final.mjs` (release-only DEV-meta; no born-RED@HEAD). Assert: (1) FINAL-EXISTS — `docs/tranches/AV/AV.FINAL.md` exists + cites a green run per wave (W0..W6); (2) CLEAN-TREE — `git status --porcelain` carries ONLY the pre-existing USER-DOMAIN dirt allowlist (the `docs/precepts` submodule pointer + the tranche-F aurora-profile snapshot — same allowlist as `proof-au-final.mjs`); any OTHER dirty entry → RED; (3) MATRIX-COHERENT — `gates.mjs --verify-ci` passes (ci==manifest) AND `gatesFor("release")` is non-empty AND the COMPLETE AV gate registry is present in the manifest (the full set named in §3 unit 5: `proof:av-w0-reground`, `proof:aurora-space-gamma`, `proof:shader-shared-source`, `proof:motion-composables-consumer`, `proof:motion-value-free`, `proof:shadow-contract`, `proof:card-cartoon-consumers`, `proof:subpath-enumeration`, `proof:no-orphan-composable`, `proof:offscreen-pause`, `proof:api-export-count`, `proof:dock-css-split`, `proof:av-final` — plus `proof:canvas2d-substrate-consumer` IFF W8 landed and `proof:drawer-native-consumers` IFF the W4 native fold landed; the GATED-NOT-LANDED conditionals carry NO gate and are NOT required). A named AV gate missing from `gates.mjs` reddens this arm — the registry-completeness check is the resync's falsifier; (4) ZERO-ORPHANS — `W6-overfitting-audit.md` exists + records the zero-orphan verdict; (5) STAGED-NOT-PUBLISHED — a `.changeset/*.md` exists AND `package.json` version is UNCHANGED from HEAD (the changeset stages the bump; `changeset version` is USER-DOMAIN — an unbumped manifest proves it is NOT yet cut).
  - **`AV.FINAL.md`** (create) — the close doc citing the per-wave green run ids + the gate fleet + the disposition of the conditional folds (Drawer-native land-or-BOOK, platform/ land-or-keep).
- Files: `scripts/proof-av-final.mjs` (create), `docs/tranches/AV/audit/W6-overfitting-audit.md` (create), `.changeset/<av-supply>.md` (create), `docs/tranches/AV/AV.FINAL.md` (create), `scripts/gates.mjs` + `package.json` (register), `docs/tranches/AV/PROGRESS.md` (close record).
- Sub-gate: `proof:av-final` (NEW, release-only DEV-meta — greens once `AV.FINAL.md` + the changeset exist) green + bite-verified. Bite: drop a wave's "green" from `AV.FINAL.md` → RED (1); dirty a tracked file → RED (2); empty the release set → RED (3); delete the audit → RED (4); bump `package.json` version or remove the changeset → RED (5). Register `["release"]` ONLY (NOT ci — it asserts a clean post-commit tree the in-flight CI does not have).

## 6. Hard Gate

W6 closes when every condition below is evidence-backed:

1. **AV.W6.A** — `proof:api-export-count` GREEN + bite-verified (ship a 0-consumer subpath → RED; drift the `/api` header tally → RED); the consumer counts are DERIVED (grep results in `W6-api-export-count.json`), not hand-typed; the `src/api/index.ts` header tally matches the derived count; absent consumer repos SKIPPED not failed. Registered `["local","ci","release"]`.
2. **AV.W6.B** — `proof:dock-css-split` UPGRADED to a module-graph assertion + GREEN + bite-verified (move a `.dock-icon-button {` base rule into `dock.css` → RED; reformat selector text → STILL GREEN); the shared comma-group + motion `:where()` group allowlisted; `proof:webgl-golden` BOOKed in `PROGRESS.md` with the stable-headless-WebGL2-runner trigger. Manifest row unchanged.
3. **AV.W6.C** — the overfitting audit records ZERO orphans in `W6-overfitting-audit.md`; the AV changeset is STAGED (`.changeset/*.md`, minor bump, `package.json` version UNCHANGED); the COMPLETE AV gate registry is resynced in `gates.mjs` (the full set per §3 unit 5; `gates.mjs --verify-ci` enumerates every named gate with no manifest gap); `proof:av-final` GREEN (clean-tree + matrix-coherent INCLUDING the registry-completeness arm + zero-orphans + staged-not-published); `AV.FINAL.md` cites the per-wave green runs + the conditional-fold dispositions. `proof:av-final` registered `["release"]`.
4. **No regression.** The full gate matrix stays GREEN through W6: every prior `proof:*` (incl. W4's `proof:shadow-contract`/`proof:card-cartoon-consumers` + W5's `proof:subpath-enumeration`/`proof:no-orphan-composable`), `npm run typecheck`, `npm run build`, `npm run verify-export-types`, `npm run proof:resolution`, the unit suites. `PROGRESS.md` records the wave with a green run id.

**Born gate registration (manifest==ci invariant):**

| gate | script | tags | bite-check |
|---|---|---|---|
| `proof:api-export-count` | `scripts/proof-api-export-count.mjs` | `["local","ci","release"]` | ship a 0-consumer subpath / drift the `/api` header tally → RED |
| `proof:dock-css-split` (UPGRADED) | `scripts/proof-dock-controls-split.mjs` | `["local","ci","release"]` (unchanged) | move a control base rule into `dock.css` → RED; reformat selector text → STILL GREEN |
| `proof:av-final` | `scripts/proof-av-final.mjs` | `["release"]` | drop a FINAL green / dirty a tracked file / bump version → RED |

All follow the house gate template (`scripts/proof-au-final.mjs` for the release-only meta form; `scripts/proof-au-w9-consumers.mjs` for the consumer-resolution form): a pure exported detector, an injected resolver/grep, a byte-stable JSON artefact via `scripts/gate-output.mjs`, a human summary, `process.exit(1)`. Register in `package.json` + `gates.mjs` ONLY after their fold is complete (`verifyCi()` enforces manifest==ci). `proof:av-final` is release-only (no born-RED@HEAD — it greens once `AV.FINAL.md` + the changeset exist).

## 7. Format And Lint Cadence

- `npm run build` — before AV.W6.A + AV.W6.B (both DERIVE facts from `dist/` — the build must be current) and at close.
- `npm run typecheck` — after AV.W6.A (the `src/api/index.ts` header re-sync) and at close.
- `node scripts/gates.mjs --verify-ci` — before AV.W6.C's `proof:av-final` MATRIX-COHERENT assertion (Lane C runs LAST so Lane A + B registrations are merged first).
- The three NEW/upgraded gates + the full no-regression existing-gate matrix run at close.
- `git diff --check` (whitespace/conflict-marker) on the DOCS-edited files (`CLAUDE.md`, `PROGRESS.md`, `AV.FINAL.md`, the changeset) at close.

No formatter is intentionally skipped; the gate fleet is the binding evidence. `proof:av-final` is the close meta-gate — run it release-only on the CLEAN post-commit tree.

## 8. Verification Artefacts

- `proof:api-export-count` JSON artefact (`W6-api-export-count.json` — the derived surface + consumer tally) — byte-stable via `scripts/gate-output.mjs`.
- `proof:dock-css-split` JSON artefact (`W6-dock-split-graph.json` — the module-graph rule-ownership tally).
- `W6-overfitting-audit.md` — the AV zero-orphan audit record.
- The staged `.changeset/<av-supply>.md` (minor bump, `package.json` version UNCHANGED).
- `AV.FINAL.md` — the close doc (per-wave green runs + conditional-fold dispositions).
- The `proof:webgl-golden` BOOK record (stable-headless-WebGL2-runner trigger) — `PROGRESS.md`.
- The green CI run id for the wave + the staged-not-published confirmation — `PROGRESS.md`.
- The integration commit hashes (per §9).

### The complete AV gate registry (the resync target — `proof:av-final` MATRIX-COHERENT covers all)

Every gate the augmented AV waves named, with its owning wave + tag. W6 CONFIRMS each is registered in `gates.mjs` (the upstream waves AUTHOR them; W6 only checks completeness). `gates.mjs --verify-ci` reddens if any is missing from the manifest.

| Gate | Owning wave | Tags | Note |
|---|---|---|---|
| `proof:av-w0-reground` | W0 | `["local","ci"]` | the formalize+doc-currency meta-gate |
| `proof:aurora-space-gamma` | W1 | `["local","ci","release"]` | the aurora OETF fix (widened from `proof:blob-space-gamma`) |
| `proof:shader-shared-source` | W2 | `["local","ci","release"]` | one OETF/FBM/matrix source; both shaders inline it (the AV.md §2 `proof:shader-chunk-single` label is superseded by this AUTHORED name) |
| `proof:motion-composables-consumer` | W3 | `["local","ci"]` | each NEW motion composable (useCountup/vReveal) tallies ≥2 resolving consumers |
| `proof:motion-value-free` | W3 | `["local","ci"]` | the adopted tier imports no value.js on the root barrel |
| `proof:shadow-contract` | W4 | `["local","ci","release"]` | the consumer-overridable shadow-cartoon-lg chain lock |
| `proof:card-cartoon-consumers` | W4 | `["local","ci"]` | ≥2 `surface="cartoon"` consumer contexts |
| `proof:drawer-native-consumers` | W4 | `["local","ci"]` | CONDITIONAL — only IF the native fold landed; else NO gate (KEEP-BOOK) |
| `proof:subpath-enumeration` | W5 | `["local","ci","release"]` | exports↔dist enumeration after the metadir collapse |
| `proof:no-orphan-composable` | W5 | `["local","ci"]` | every composable in a named sub-tree |
| `proof:offscreen-pause` | W7 | `["local","ci"]` | the substrate parks RAF when content-hidden/offscreen |
| `proof:canvas2d-substrate-consumer` | W8 | `["local","ci"]` | CONDITIONAL — only IF the constellation LANDED (≥2 consumers); else GATED-NOT-LANDED carries NO gate |
| `proof:api-export-count` | W6 | `["local","ci","release"]` | the mechanical derived-fact surface + consumer tally |
| `proof:dock-css-split` | W6 (upgraded) | `["local","ci","release"]` | string-grep → module-graph (same name, upgraded impl) |
| `proof:av-final` | W6 | `["release"]` | the release-only close meta-gate (asserts the registry completeness above) |

## 9. Commit Plan

- **Lane A (api-export-count) commit** — `feat(tranche-AV): W6 — proof:api-export-count (mechanical derived-fact surface + consumer tally) + /api header re-sync`. (Body required — names the three derivations + the W9 hand-curated-tally replacement + the header doc-currency fix.)
- **Lane B (dock-split upgrade) commit** — `refactor(tranche-AV): W6 — proof:dock-css-split string-grep → module-graph assertion + webgl-golden BOOK`. (Body required — names the module-graph upgrade + the reformat-survival bite + the webgl-golden trigger.)
- **Lane C (overfitting + changeset + final) commits** — `docs(tranche-AV): W6 — overfitting audit (zero orphans) + AV changeset staged (minor, not published)`; `feat(tranche-AV): W6 — proof:av-final (release-only close meta-gate)`. (Body required — names the audit verdict + the staged-not-published USER-DOMAIN clause + the av-final 5 assertions.)
- **Orchestrator gate-registration commit** — `chore(tranche-AV): W6 — register proof:api-export-count + proof:av-final + upgraded dock-css-split (manifest==ci)`. (Body required — names the manifest rows + tags + the unchanged dock-css-split row.)
- **Orchestrator integration + close commit** — `docs(tranche-AV): W6 close — AV.FINAL.md + PROGRESS green run id + changeset staged + webgl-golden BOOK`. (Body required — status/close + the full disposition.)

## 10. Dependencies

- **Depends on**: AV.W4 + AV.W5 + AV.W7 + AV.W8 (this is the LAST AV wave — the derived-fact gates DERIVE from the post-W4 supply surface + the post-W5 transposition `dist`/`exports`, and the `proof:av-final` MATRIX-COHERENT assertion + the overfitting audit must see the W7/W8 gates registered + the W7/W8 src deltas). All AV waves W0–W5, W7, W8 green before W6 opens. The four consumer repos (`~/Programming/{slides,speedtest,muster,feedback-coder}`) for the consumer grep (READ-ONLY; absent ones SKIPPED). `scripts/proof-au-final.mjs` + `scripts/proof-au-w9-consumers.mjs` as the house templates `proof:av-final` + `proof:api-export-count` mirror.
- **Blocks**: the AV tranche FINAL/close IS this wave. The 3.3.0 publish (E1, USER-DOMAIN) is GATED on `proof:av-final` GREEN + the staged changeset — but the publish ITSELF (`changeset version` → push `v3.3.0` → release.yml gated provenance) is USER-DOMAIN, NOT W6's. W6 stages and stops.

## 11. Archaeology

Not a re-attempt of a prior failed wave. Two HEAD-grounding corrections fold into the units:

1. **The `/api` header tally is literal-32-types + 1-const-block at HEAD, NOT 70/67+3.** The digest flags the header DRIFT; the grep against HEAD (`grep -c '^export type' src/api/index.ts` = 32; one `export { … }` const block re-exporting `DEFAULT_AURORA_CONFIG`/`MAX_NUCLEI`/`MAX_STOPS`). `proof:api-export-count`'s SURFACE-ENUM arm makes the header tally a DERIVED assertion (the count is computed, the header is re-synced to match), so the drift cannot recur silently.
2. **`proof:dock-css-split` ships at HEAD as a STRING-GREP gate.** `scripts/proof-dock-controls-split.mjs` (AU.W8b.3) proves the carve by regex on `@import` + selector text. The W6 upgrade is a MODULE-GRAPH assertion (the `@import` graph + compiled-rule ownership), surviving a selector-text reformat the regex would false-RED. The gate NAME + manifest row + tags are unchanged (same `proof:dock-css-split`, upgraded impl) — the AU close already depends on it, so the name must stay stable.
