# AV.W0 — formalize + doc-currency + manifest-harmonize

## 2. State

**Name**: W0 — formalize + doc-currency + manifest-harmonize
**Opens after**: the AV tranche open (the FIRST wave; AT-disjoint, opens before the 3.3.0 publish — it touches no published-surface contract).
**Agents**: 1 serial (the formalize wave is one coherent doc-and-manifest pass; no parallel file-disjoint lanes are warranted — the four units share `CLAUDE.md` + `package.json` + the gate registration, so one agent owns the whole pass and avoids an index race).
**Hard gate**: `proof:av-w0-reground` green — `AV.md` + `PROGRESS.md` exist under `tranches/AV/`; HEAD `5f869b5` is ancestor-reachable; every deferred-fold ledger row carries a disposition (P-Inv 28, zero silent punts); `src/api.ts` resolves as the flat `/api` barrel; the `/api` header tally matches the literal export count (32 types + 1 const block); the 3 omitted CSS rungs (`fonts.css`, `instrument-rail.css`, `drawer.css`) are listed in the CLAUDE.md styles block; the keyframes devDep range equals the peer range; the staged value.js peer-bump line is recorded READY-TO-LAND with its gate condition.
**Status**: planned

**Type:** DEV (formalize + doc-currency + manifest-harmonize). Writes no `src` runtime; the only `src` touch is `src/api.ts` (a new flat re-export barrel, import-shape parity with the other 60+ flat subpaths) + the `src/api/index.ts` header-tally comment re-sync. AT-disjoint, non-publish-blocking.
**Scope source:** `docs/tranches/AV/AV.md` §2 W0 row + §3 the deferred-fold ledger; `docs/tranches/AV/audit/conjoint-perfection-digest.md` §4 (AV.W0 manifest+harmonize: D8 keyframes devDep parity + the value.js 0.11.0 peer-bump stage) + §6 (the publish spine); `docs/tranches/AV/audit/union-digest.md` D8 + the E-valuepeer knot; `docs/tranches/AV/audit/AUDIT-DIGEST.md` (the doc-currency items — `src/api.ts` missing, the `/api` header tally drift, the CLAUDE.md styles-block omissions). This file is the FULLY-formed, execute-without-re-deriving spec for W0.

**Precepts in force.** No legacy / no back-compat aliases (clean breaks). KISS — re-sync the docs to FACT, harmonize the manifest range; do NOT re-architect. Derived-fact-over-narration — the `/api` header tally becomes the LITERAL export count, not the inherited 70/67+3 claim. Zero deferral at tranche open (P-Inv 28) — every ledger row LANDS, RETIRES, or KEEP-BOOKs with a named trigger; "deferred to next tranche" is not a close-state. Staged-not-published (E1, USER-DOMAIN) — the value.js peer-bump is STAGED as a READY-TO-LAND line gated on value.js 0.11.0 publishing FIRST; W0 does NOT bump an install-breaking range.

## 2a. Goal criterion

This wave succeeds if the AV CHARTER is formalized into `tranches/AV/` (the `AV.md` charter + `PROGRESS.md` exist and re-ground every fact against the true HEAD), the three doc-currency drifts the audit named are corrected to FACT, the keyframes devDep range is harmonized to its peer range, and the value.js peer-bump is staged as a gated READY-TO-LAND line — so every LATER AV wave gates on the current doc-and-manifest surface, not the inherited narration. The reader's test: `src/api.ts` resolves as a flat barrel exactly like `src/header-ribbon.ts`; the `/api` header comment names the literal count (32 types + 1 const block) not the stale 70/67+3; the CLAUDE.md styles block lists all 22 `src/styles/*.css` rungs (the three omissions restored); `package.json` devDep `@mkbabb/keyframes.js` equals its peer range; the value.js bump is recorded as STAGED with the value.js-0.11.0-publishes-first condition, NOT applied to an install-breaking `^0.10.0` range; and every deferred-fold ledger row carries a FOLD-AV / AV-GATED / KEEP-BOOK / FOLD-G / DEFERRED disposition with a named trigger.

## 3. Scope

1. **Formalize the CHARTER.** Confirm `docs/tranches/AV/AV.md` (the charter) + `docs/tranches/AV/PROGRESS.md` (the execution log) exist and re-ground every fact against HEAD. The charter's "re-ground against `d58de1d`" is itself STALE — HEAD is `5f869b5` (the AV-augment commit `docs(tranche-AV): augment AV with the cross-repo union + conjoint-perfection findings`). W0 corrects the re-ground SHA to the true HEAD and asserts it is ancestor-reachable. `PROGRESS.md` opens with the W0 row.
2. **Doc-currency fold (a) — author `src/api.ts`.** Every flat subpath in the library ships a top-level `src/<name>.ts` re-export barrel (e.g. `src/header-ribbon.ts` = `export * from "./components/custom/header-ribbon"`), but `/api` is the lone subpath WITHOUT one — `src/api.ts` is ABSENT at HEAD; the `./api` export resolves through `src/api/index.ts` directly. Author `src/api.ts` as the one-line flat barrel `export * from "./api/index"` for import-shape parity with the other subpaths. (The `package.json` `./api` export TARGET is the BUILT `dist/api.js` chunk, keyed by the entry name — adding the source barrel does not change the published export value; it gives `/api` the same source shape as its siblings.)
3. **Doc-currency fold (b) — reconcile the `/api` header tally.** The `src/api/index.ts` header comment + the CLAUDE.md `api/index.ts` line claim "70 canonical public symbols (67 types + 3 constants)". The LITERAL count at HEAD is **32 `export type` lines + 1 const block** (re-exporting `DEFAULT_AURORA_CONFIG` / `MAX_NUCLEI` / `MAX_STOPS`). Re-sync BOTH the `src/api/index.ts` header comment AND the CLAUDE.md `api/index.ts` line to the literal count (doc-currency only; never edit the export SET).
4. **Doc-currency fold (c) — add the missing CLAUDE.md styles rungs.** The CLAUDE.md `src/styles/` Structure block lists 19 rungs but the actual `src/styles/` dir has **22** `.css` files. Three are omitted from the block: `fonts.css`, `instrument-rail.css`, and `drawer.css` (`drawer.css` is named in the CLAUDE.md drawer prose but absent from the Structure tree block). Add all three rungs with one-line descriptors in cascade position.
5. **D8 — keyframes devDep parity.** `package.json` `devDependencies."@mkbabb/keyframes.js"` is `^2.2.0` (line 622) while `peerDependencies` allows `^2.2.0 || ^3.0.0` (line 591). Dev/test then validate against v2.2.0 while downstream (slides) dedupes to v3. Bump the devDep to `^2.2.0 || ^3.0.0` so dev/test runs the version downstream resolves (`audit/union-digest.md` D8). This is a manifest-range harmonize, not a code change.
6. **E-valuepeer — STAGE the value.js peer+devDep bump.** Record `package.json` `peerDependencies."@mkbabb/value.js"` + `devDependencies."@mkbabb/value.js"` `^0.10.0 → ^0.11.0` as a READY-TO-LAND staged line, GATED on value.js publishing `0.11.0` FIRST (the `^0.10.0` range EXCLUDES 0.11.0; bumping it now would break every install until value.js publishes). The runtime edge is already settled by `proof:blob-color-equivalence` (8/8, ~2e-16), so this is a SemVer-range manifest knot, not a code change. W0 does NOT apply the bump — it records the staged line + its condition in `PROGRESS.md` (the bump rides the 3.3.0 cut per `audit/conjoint-perfection-digest.md` §6 publish spine).
7. **Deferred-fold ledger disposition (P-Inv 28).** Confirm every row in `AV.md §3` (the FOLD-AV / AV-GATED / KEEP-BOOK / FOLD-G / DEFERRED ledger) carries a disposition + a named trigger — zero silent punts. The `proof:av-w0-reground` gate makes this falsifiable (an un-dispositioned ledger row reddens it).

## 3a. Triumvirate Dispatch

A triumvirate (research + plan augment + redress) is mandatory — the orchestrator may NOT redispatch the failing unit alone — when:

- **`src/api.ts` cannot be authored as a pure re-export without a circular or duplicate-export collision.** If `export * from "./api/index"` collides with an already-flat re-export OR introduces a `dist/api.js` chunk that diverges from the HEAD `package.json` `./api` target, the doc-currency fold is not surface-invariant — halt and triumvirate (the barrel must be PROVABLY equivalent to the HEAD `./api` resolution).
- **The `/api` literal count is ambiguous** — if `export type` and `export { … }` lines do not enumerate cleanly (a re-export block spanning multiple lines, a `type`-and-value mixed block), the tally is not a clean derived fact. The redress is to define the counting rule (e.g. distinct exported symbols, not source lines) and encode it in `proof:av-w0-reground`, not to hand-pick a number.
- **The keyframes devDep bump reddens an existing gate.** If harmonizing the devDep to `^2.2.0 || ^3.0.0` causes `npm install` to resolve a v3 that breaks `typecheck`/`build`/the unit suites, the harmonize is not free — halt; the redress is a cross-tranche coordination decision (keyframes' published v3 surface), not a local manifest edit.
- **The value.js 0.11.0 bump is applied (not staged) by mistake.** If `package.json` `^0.10.0` is changed to `^0.11.0` while value.js 0.11.0 is NOT yet published, every install breaks — this is an E1 USER-DOMAIN bleed. Halt; revert to the staged-line record.
- **Any diagnostic loop reaches its third iteration** on the `proof:av-w0-reground` ancestor-reachability or ledger-disposition check — halt, do not iterate a fourth time.

## 4. File Bounds

| File | Access |
|---|---|
| `docs/tranches/AV/AV.md` | modify (re-ground SHA `d58de1d` → `5f869b5`; confirm the ledger dispositions) |
| `docs/tranches/AV/PROGRESS.md` | modify (the W0 row + the staged value.js peer-bump record) |
| `src/api.ts` | create (the flat `/api` re-export barrel — `export * from "./api/index"`) |
| `src/api/index.ts` | modify (header-tally comment re-sync ONLY — never the export set) |
| `CLAUDE.md` | modify (the `/api` line tally + the 3 styles rungs) |
| `package.json` | modify (the keyframes devDep range harmonize; scripts + the gate row) |
| `scripts/proof-av-w0-reground.mjs` | create |
| `scripts/gates.mjs` | modify (register `proof:av-w0-reground`) |
| `docs/tranches/AV/audit/W0-reground.json` | create (the gate artefact tally) |

Do NOT touch: `src/api/index.ts` EXPORT SET (only the header comment) · `package.json` `@mkbabb/value.js` ranges (STAGED, not applied — W0 records the line, it does NOT bump `^0.10.0`) · `package.json` `version` (`changeset version` is USER-DOMAIN) · any other `src/` runtime/component path · `docs/precepts/` (NEVER) · the other AV wave specs (W0 does not edit W1–W8).

## 4a. Disjointness

W0 is a single-agent serial wave — no two units write the same path in parallel because there is one agent. The four scope units (the `src/api.ts` barrel, the `/api` tally re-sync, the CLAUDE.md styles rungs, the manifest harmonize) all touch the shared `CLAUDE.md` + `package.json`, which is precisely why they are NOT split into parallel lanes: one agent owns the whole pass and commits once, avoiding an index race. The `proof:av-w0-reground` registration in `package.json` + `gates.mjs` is the same single-agent commit.

## 4b. Worktree Plan

Single agent, no sibling worktree. W0 runs on a clean checkout of `at-dock-convergence` at HEAD `5f869b5`. No `CARGO_TARGET_DIR` (Node/Vite repo). The agent runs `npm run typecheck` / `npm run build` / `proof:av-w0-reground` against the primary checkout. W0 is the FIRST wave; W1–W8 branch from the same clean main with W0 committed.

## 5. Agent Units

### AV.W0.A Formalize + doc-currency + manifest-harmonize

- Goal: the AV CHARTER is formalized + re-grounded against the true HEAD; the three doc-currency drifts are corrected to FACT; the keyframes devDep is harmonized; the value.js peer-bump is staged READY-TO-LAND; and the deferred-fold ledger carries zero silent punts.
- Mechanism:
  - **`docs/tranches/AV/AV.md`** — correct the re-ground SHA from `d58de1d` to the true HEAD `5f869b5` (the AV-augment commit), assert it is ancestor-reachable, and confirm every `§3` ledger row carries a disposition + a named trigger (P-Inv 28).
  - **`docs/tranches/AV/PROGRESS.md`** — open the W0 row; record the staged value.js peer-bump line (`^0.10.0 → ^0.11.0`, GATED on value.js 0.11.0 publishing first, rides the 3.3.0 cut per `audit/conjoint-perfection-digest.md` §6).
  - **`src/api.ts`** (create) — `export * from "./api/index";` — the flat `/api` re-export barrel, byte-shape parity with `src/header-ribbon.ts` et al. Confirm the built `dist/api.js` is equivalent to the HEAD `./api` resolution (no surface drift).
  - **`src/api/index.ts`** (header comment ONLY) — re-sync the symbol tally from "70 canonical public symbols (67 types + 3 constants)" to the LITERAL count (32 `export type` + 1 const block). Never edit the export set.
  - **`CLAUDE.md`** — (1) re-sync the `api/index.ts` Structure-block line tally to the literal count; (2) add the three omitted styles rungs to the `src/styles/` block: `fonts.css`, `instrument-rail.css`, `drawer.css` — one-line descriptors in cascade position (drawer.css at rung 17 per the CLAUDE.md drawer prose).
  - **`package.json`** — bump `devDependencies."@mkbabb/keyframes.js"` `^2.2.0 → ^2.2.0 || ^3.0.0` (D8 peer parity). Record (do NOT apply) the value.js `^0.10.0 → ^0.11.0` peer+devDep stage. Register the `proof:av-w0-reground` script row.
  - **`scripts/proof-av-w0-reground.mjs`** (create) — author on the `scripts/proof-au-w0-reground.mjs` house template (ESM `.mjs`, lazy memoized paths, a byte-stable JSON artefact via `gate-output.mjs`, a human summary, `process.exit(1)` fail-closed). The assertions are in §6.
- Files: `docs/tranches/AV/AV.md` (modify), `docs/tranches/AV/PROGRESS.md` (modify), `src/api.ts` (create), `src/api/index.ts` (modify — header only), `CLAUDE.md` (modify), `package.json` (modify), `scripts/proof-av-w0-reground.mjs` (create), `scripts/gates.mjs` (register), `docs/tranches/AV/audit/W0-reground.json` (create).
- Sub-gate: `proof:av-w0-reground` (NEW) green + bite-verified (see §6). Register `["local","ci"]` (mirrors `proof:au-w0-reground` — a DEV meta-gate, not release-bearing).

## 6. Hard Gate

W0 closes when every condition below is evidence-backed by `proof:av-w0-reground`:

1. **FORMALIZATION-EXISTS** — `docs/tranches/AV/AV.md` + `docs/tranches/AV/PROGRESS.md` exist under `tranches/AV/`. Bite: rename either → RED.
2. **HEAD-ANCESTOR** — the re-ground SHA in `AV.md` (`5f869b5`) is ancestor-reachable from HEAD (`git merge-base --is-ancestor`). Bite: cite an unreachable SHA → RED.
3. **API-BARREL-RESOLVES** — `src/api.ts` exists AND is a pure `export * from "./api/index"` re-export (the flat-subpath shape); `npm run build` emits a `dist/api.js` equivalent to the HEAD `./api` chunk. Bite: delete `src/api.ts` → RED.
4. **API-TALLY-LITERAL** — the `src/api/index.ts` header comment + the CLAUDE.md `api/index.ts` line name the LITERAL count (32 types + 1 const block), derived by re-counting `export type` + the const block at gate-run time (NOT a hand-typed 70/67+3). Bite: leave the stale 70/67+3 claim → RED.
5. **STYLES-RUNGS-COMPLETE** — the CLAUDE.md `src/styles/` block lists every `src/styles/*.css` file (all 22, the three omissions `fonts.css` / `instrument-rail.css` / `drawer.css` restored), derived by diffing the block against the actual dir. Bite: omit a rung → RED.
6. **KEYFRAMES-DEVDEP-PARITY** — `package.json` `devDependencies."@mkbabb/keyframes.js"` equals `peerDependencies."@mkbabb/keyframes.js"` (`^2.2.0 || ^3.0.0`). Bite: leave the devDep at `^2.2.0` → RED.
7. **VALUEPEER-STAGED** — the value.js `^0.10.0 → ^0.11.0` peer-bump is RECORDED in `PROGRESS.md` as a STAGED READY-TO-LAND line with its gate condition AND `package.json` `@mkbabb/value.js` is STILL `^0.10.0` (not prematurely applied). Bite: apply `^0.11.0` before value.js publishes → RED (install-breaking); OR drop the staged record → RED.
8. **LEDGER-DISPOSITIONED** — every `AV.md §3` deferred-fold row carries a FOLD-AV / AV-GATED / KEEP-BOOK / FOLD-G / DEFERRED disposition + a named trigger (P-Inv 28, zero silent punts). Bite: leave a ledger row un-dispositioned → RED.

`proof:av-w0-reground` is the meta-gate idiom per `proof:au-w0-reground` — it makes the W0 formalization + doc-currency falsifiable as DERIVED facts (the tally is re-counted, the styles block is diffed against the dir, the SHA ancestry is checked), not a narration.

## 7. Format And Lint Cadence

- `npm run typecheck` (`vue-tsc --noEmit`) — after the `src/api.ts` + `src/api/index.ts` touch and at close.
- `npm run build` — after `src/api.ts` lands (confirm `dist/api.js` emits equivalent to HEAD) and at close.
- `npm run proof:av-w0-reground` + `node scripts/gates.mjs --verify-ci` — at close (the manifest==ci registration).
- `npm install` — after the keyframes devDep harmonize (confirm the v3 dedupe does not redden `typecheck`/`build`/the unit suites).
- `git diff --check` (whitespace/conflict-marker) on the DOCS-edited files (`AV.md`, `PROGRESS.md`, `CLAUDE.md`) at close.

No formatter is intentionally skipped; `proof:av-w0-reground` + `typecheck` + `build` are the binding evidence.

## 8. Verification Artefacts

- `proof:av-w0-reground` JSON artefact (`docs/tranches/AV/audit/W0-reground.json`) — the formalization + doc-currency + manifest derived-fact tally, byte-stable via `scripts/gate-output.mjs`.
- The `dist/api.js` build output (equivalent to the HEAD `./api` chunk) — confirmed in `PROGRESS.md`.
- The staged value.js peer-bump record (the line + its value.js-0.11.0-first condition) — `PROGRESS.md`.
- The green CI run id for the wave — `PROGRESS.md`.
- The integration commit hash (per §9).

## 9. Commit Plan

- **Formalize + doc-currency + manifest commit** — `docs(tranche-AV): W0 — formalize + doc-currency (src/api.ts barrel + /api tally + 3 styles rungs) + D8 keyframes devDep parity + value.js peer stage`. (Body required — names the re-ground SHA correction `d58de1d → 5f869b5`, the four doc-currency folds, the D8 harmonize, the staged-not-applied value.js line, and the zero-silent-punt ledger confirmation.)
- **Gate-registration commit** — `chore(tranche-AV): W0 — register proof:av-w0-reground (manifest==ci)`. (Body required — names the manifest row + the `["local","ci"]` tags + the 8 assertions.)
- **W0 close commit** — `docs(tranche-AV): W0 close — PROGRESS green run id + the staged value.js peer-bump record`. (Body required — status/close + the staged-not-published disposition.)

(The orchestrator MAY fold all three into one commit since W0 is single-agent — the split is the expected scope set, not a parallel-lane requirement.)

## 10. Dependencies

- **Depends on**: the AV tranche open. HEAD `5f869b5` (the re-ground base). The `proof:au-w0-reground` gate (`scripts/proof-au-w0-reground.mjs`) as the house template `proof:av-w0-reground` mirrors. value.js publishing `0.11.0` is the EXTERNAL precondition the staged peer-bump waits on (NOT a W0 blocker — W0 stages the line, it does not apply it).
- **Blocks**: every later AV wave. W1–W8 gate on the current doc-and-manifest surface W0 establishes — W4's CLAUDE.md doc edits land on the re-synced styles block; W6's `proof:api-export-count` SURFACE-ENUM arm asserts the `/api` header tally W0 corrected; the 3.3.0 cut applies the value.js peer-bump W0 staged.

## 11. Archaeology

Not a re-attempt of a prior failed wave. Three HEAD-grounding corrections fold into the unit (they correct STALE charter/digest claims against HEAD `5f869b5`, NOT prior-failure archaeology):

1. **The charter's re-ground SHA `d58de1d` is itself STALE.** HEAD is `5f869b5` (the AV-augment commit landed atop `d58de1d`). W0's first act is to correct the re-ground base to the true HEAD — the formalize wave cannot ground later waves on a SHA that is no longer HEAD.
2. **The `/api` tally is literal-32-types + 1-const-block at HEAD, NOT 70/67+3.** The `src/api/index.ts` header + the CLAUDE.md line both carry the stale 70/67+3 claim; the grep (`grep -c '^export type' src/api/index.ts` = 32; one const re-export block) is the derived fact. W0 re-syncs both to the literal count; W6's `proof:api-export-count` then makes the tally a permanently-derived assertion so the drift cannot recur.
3. **`src/api.ts` is the lone missing flat barrel.** Every other flat subpath ships a `src/<name>.ts` re-export (e.g. `src/header-ribbon.ts`); `/api` resolves through `src/api/index.ts` directly with no top-level barrel. W0 authors `src/api.ts` for import-shape parity — the published `./api` export TARGET (the built chunk) is unchanged, so this is a source-shape fix, not a surface change.
