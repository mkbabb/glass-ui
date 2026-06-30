# PASS 3 — RESOLVE G6 (§2.I1/L12/L13/L14): the canon-home reconcile + the BG↔BH interleave shared-write edges

**Cluster:** `G6-canonhome-interleave` · **Mode:** spec · **PASS 3** · **HEAD:** `6c1f5386` (`tranche/BG`) · **Date:** 2026-06-30
**Owns:** §2.I1 (HIGH — G3 canon-home `docs/tranches/BG/canon/` split from the realized `docs/canon/` + `canon-doc.mjs` resolver) + §2.L12 (`.githooks/commit-msg` shared B0→G3 writer) + §2.L13 (B4f naive-grep delete-gate scope ≠ B5c hard-reader cleanup scope; `crossrepo-asks` double-touched) + §2.L14 (`proof:claude-deletable` absent from the BH-side B4f wave specs).
**Convergence in:** §2.I1 DIAGNOSED + routed (no PT — never prototyped); the BH-interleave research (pass-1 F1/F4/F8 + pass-2 re-verify) carries the live-disk facts. **This pass:** resolve all three approach sub-parts to amend-ready, with the EXACT edits + the new edges registered.
**Write-fence:** RESPEC-COHERENCE doc only. No src/demo/scripts/CLAUDE.md edits (the drafted edits are a spec, not a merge). Siblings verified intact (exit 0) before + after.

> **PASS-3 method note.** Every load-bearing fact below was RE-GREPPED live at `tranche/BG@6c1f5386` this pass (not inherited from F1/F4/F8). Three numbers SHARPEN the prior pass: the B4f literal-grep flags **27** files (not "27" as a loose count — re-verified exact); the HARD-reader (content-receiving) set is **15** (the G5 census's "16" includes the `instrument-chassis` README owner that does not read `CLAUDE.md`, see §B); the SOFT gap is **12** files, not the pass-1 estimate of "~7" — the B4f bare-literal blocker is BIGGER than first measured.

---

## 0. VERDICT

**FEASIBLE = TRUE. No restart. All three sub-parts reconcile by bounded plan-text edits + three registered edges.** None touches src/scripts behaviour; this cluster is pure plan-coherence — but it is LOAD-BEARING because the execution engine's `interleaveReady` returns `true` unconditionally for BG waves and gates BH waves via PROSE preconds parsed by a DAG-LOADER agent (`bg-bh-execute.wf.js:134`). A drifted canon-home string, an un-registered shared-write edge, or a gate-scope self-disagreement is **invisible to the machine** — it is a prose-coherence gap the loader inherits, and (for §2.L13) a literal gate command that CANNOT reach its own pass condition as written.

**The three reconciliations:**
- **(a) §2.I1 canon-home** — re-home G3's close-disease-sweep canon from the fold's chosen `docs/tranches/BG/canon/` to the realized **`docs/canon/`** scaffold (the BH B4b-skeleton home + the `canon-doc.mjs` resolver), and register the **G3(WS7)→B4b-content(WS12)** shared-write edge on `docs/canon/build-and-gates.md`.
- **(b) §2.L13/L14** — reconcile the B4f delete-gate from a bare string-grep (`rg -l 'CLAUDE\.md' = 0`, which CANNOT reach 0 at HEAD — 12 soft mentions block it) to the **receiver-scope** form (`proof:claude-deletable` C2 de-blinded), name `proof:claude-deletable` in BOTH BH-side specs, and own the soft-mention cleanup explicitly (the `crossrepo-asks` `WAVE_BOUNDS "CLAUDE.md"` entry is the standout).
- **(c) §2.L12** — name `.githooks/commit-msg` as a shared **B0(done, [C])→G3(WS7)** EXTEND-not-clobber writer, register it in the §2 hard-collision table, and pin the sequencing + the C4 self-test bound (G3 EXTENDS the env-driven ledger arm, never re-introduces a `--tranche=BB` hardcode).

---

## A. §2.I1 — THE CANON-HOME RECONCILE (G3 `docs/tranches/BG/canon/` → `docs/canon/`)

### A1. The split, re-verified on disk

| Fact | Verified value | Where |
|---|---|---|
| The realized canon scaffold | `docs/canon/` EXISTS — 9 topic homes + README index (B4b-skeleton, `2846bb25`, parent-tracked, NOT in the submodule) | `ls docs/canon/` |
| `docs/canon/build-and-gates.md` | EXISTS (657B skeleton). Its "Redistributes:" line ALREADY lists "the `--run full` close-battery siblings-absent canon · the sibling-safety foreign-tree fence · the cardinal-ledger parser" | `cat docs/canon/build-and-gates.md` |
| The fold's chosen G3 home | `docs/tranches/BG/canon/close-disease-sweep.md` — **ABSENT** (`ls` → No such file) | EXEC-PROG:232, build-map:483/490/856/924, AMENDED §2.G3:107 |
| The resolver keys | `canon-doc.mjs CANON_HOMES` = structure · dependencies · **build-and-gates** · conventions · design-axes · glass-system · motion-system · **consumer-wiring** · exports-subpaths · readme · 5 component READMEs. **NO `close-disease-sweep`/`close-sweep` key** | `scripts/lib/canon-doc.mjs:24-48` |
| The contradiction | G5's own words: close-battery-parity re-homes "to the build-and-gates canon … **shared with G3's canon home**" — but build-and-gates is at `docs/canon/build-and-gates.md` while G3 specs `docs/tranches/BG/canon/close-disease-sweep.md`. They cannot both be "shared" without reconciliation | AMENDED §2.G5:183, §2.G3:107 |

**The diagnosis (verified TRUE).** The submodule-fix (move the canon OUT of `docs/precepts`, which a fresh `/tmp` worktree does not recurse → the doc would be ABSENT → `proof:close-sweep` C3 reds at the exact siblings-absent close it locks) is CORRECT. But the fold picked the **wrong parent-tracked home** — a brand-new `docs/tranches/BG/canon/` the already-realized BH canon architecture (`docs/canon/` + the `canon-doc.mjs` resolver) does not know about. The submodule hazard is resolved, but the close-machine canon is split across **two** parent-tracked homes that the resolver cannot both reach.

### A2. THE DECISION — home G3's canon at `docs/canon/`, NOT a new `docs/tranches/BG/canon/`

Both candidate homes are parent-tracked (both clear the submodule hazard equally — `docs/tranches/` is NOT a submodule, verified). The decision is **discoverability + resolver-reachability + one-home discipline**:

- **`docs/canon/` is the realized BH B4b architecture** — the resolver (`canon-doc.mjs`) resolves through it, the README index lists it, and B5c re-points the 15 hard CLAUDE-readers THROUGH `readCanon(key)`. A `docs/tranches/BG/canon/` home is invisible to all of that.
- **`docs/canon/build-and-gates.md` ALREADY claims the close-battery canon** as a redistribute item (verified in the skeleton's "Redistributes:" line). G5's `proof:close-battery-parity` re-home (the `--run full` close-battery clause-4 `read("CLAUDE.md")`) ALREADY targets `build-and-gates`. The close-machine canon has ONE home by design; G3 must land in it, not fork a second.

**The exact home:** G3's close-disease-sweep canon prose lands at **`docs/canon/build-and-gates.md`** (the close-machine home), NOT a standalone `docs/tranches/BG/canon/close-disease-sweep.md`. Two sub-options, decision recorded:

- **A2-i (CHOSEN — fold into build-and-gates).** The `proof:close-sweep` `SWEEP_SET`/`SWEEP_SET_FAST` mechanism prose + the commit-hook env-gate + the `closeDisease`-manifest discipline join `docs/canon/build-and-gates.md` (beside the `--run full` close-battery + cardinal-ledger + disposition-restamp prose already redistributed there at B4b-content). The close-machine is ONE topic; one home. **No new resolver key** — `build-and-gates` already exists in `CANON_HOMES`.
- **A2-ii (REJECTED — a `close-disease-sweep` resolver key).** Adding `"close-disease-sweep": "docs/canon/close-disease-sweep.md"` to `CANON_HOMES` + a standalone file is MORE machinery for a sub-topic of the close machine; it re-fragments what A2-i unifies. REJECTED unless the build-and-gates home grows past a readable length at B4b-content (an executor judgement, recorded as the fallback — if so, the file lands at `docs/canon/close-disease-sweep.md` WITH the resolver-key add, never at `docs/tranches/BG/canon/`).

**G3 writes the close-sweep prose into `docs/canon/build-and-gates.md` at WS7** (it is the WS7 wave that mints `proof:close-sweep` + its canon). B4b-content at [WS12] redistributes the REST of CLAUDE.md §Build + Gate-hygiene into the SAME file — so the two co-write it (the edge, §A3).

### A3. THE NEW EDGE — G3(WS7) → B4b-content(WS12) on `docs/canon/build-and-gates.md`

Reconciling G3 to `docs/canon/` CREATES a shared-write edge the §2 hard-collision table does not register:

- **G3 (BG, WS7)** authors the close-disease-sweep canon prose INTO `docs/canon/build-and-gates.md`.
- **B4b-content (BH, [WS12])** redistributes CLAUDE.md §Build + the Gate-hygiene block INTO the SAME `docs/canon/build-and-gates.md`, and its `auditCanonHomes()` "content-complete" assert reads it.

**The ordering HOLDS by construction** (WS7 < [WS12]): B4b-content builds ON TOP of G3's already-landed close-sweep prose. **The load-bearing constraint:** B4b-content's content-fill must **APPEND-not-clobber** — it must NOT overwrite the close-sweep section G3 landed (the `canonAccumulationSound` verbatim-tag preservation lock at `canon-doc.mjs` — confirmed in the build-map's B5c entry "homeBodies.includes(tag)" — is the machine guard; the edge is the prose-coherence half). A B4b-content that re-templates `build-and-gates.md` from a frozen skeleton would DROP G3's WS7 prose.

**Register it** in `bh-interleave-map.md §2` hard-collision table as a new row:

| File | BG writer | BH writer | Resolution |
|---|---|---|---|
| `docs/canon/build-and-gates.md` | **G3 (WS7)** authors close-sweep canon | **B4b-content ([WS12])** redistributes §Build + Gate-hygiene + reads via `auditCanonHomes` | WS7 < [WS12] serializes; B4b-content **APPENDS** to G3's close-sweep section, never re-templates the file (the `canonAccumulationSound` tag-preservation lock is the machine guard). |

### A4. THE EXACT EDITS (§2.I1)

1. **`docs/tranches/BG/execution/EXECUTION-PROGRESS.md:232` (row 12.4b, G3)** — replace `**canon-home PARENT-TRACKED** (`docs/tranches/BG/canon/close-disease-sweep.md`, OUT of the `docs/precepts` submodule …)` with `**canon-home PARENT-TRACKED** in the realized BH scaffold (`docs/canon/build-and-gates.md` — the close-machine home the `canon-doc.mjs` resolver names, OUT of the `docs/precepts` submodule so a fresh /tmp worktree sees it; the close-sweep prose APPENDS to the build-and-gates close-battery section, shared with G5's canon home)`.
2. **`docs/tranches/BG/execution/bg-build-map.md:483, :490, :856, :924** — replace every `docs/tranches/BG/canon/close-disease-sweep.md` with `docs/canon/build-and-gates.md` (the close-sweep prose appends to it). At :490 the *Files:* entry drops the "(NEW, parent-tracked)" qualifier (the file already exists as the B4b-skeleton) → "`docs/canon/build-and-gates.md` (APPEND the close-sweep canon to the existing build-and-gates home)". At :856 the "`docs/tranches/BG/canon/*.md` (the 15 PARENT-TRACKED homes …)" becomes "`docs/canon/*.md` (the realized B4b scaffold homes the readers resolve through `readCanon`)".
3. **`docs/tranches/BG/audit/RESPEC/AMENDED-WAVE-PLAN.md:107** (§2.G3) — replace `docs/tranches/BG/canon/close-disease-sweep.md, parent-repo-tracked` with `docs/canon/build-and-gates.md (the realized B4b-skeleton close-machine home), parent-repo-tracked` and keep the "(This decision is SHARED with G5's canon-home — one home discipline for both.)" sentence (it is now TRUE on disk, not just intended).
4. **`docs/tranches/BG/execution/bh-interleave-map.md §2`** — ADD the §A3 hard-collision row.

**No `canon-doc.mjs` edit** (A2-i uses the existing `build-and-gates` key). The A2-ii fallback (a `close-disease-sweep` key add) is recorded as an executor judgement at B4b-content if the home overgrows, never the default.

---

## B. §2.L13 + §2.L14 — THE B4f DELETE-GATE SCOPE vs THE B5c HARD-READER CLEANUP

### B1. The self-disagreement, re-verified EXACT on disk this pass

The B4f delete-gate text DISAGREES with itself across the two BH docs:
- `bh-interleave-map.md §4:151` + `:155` — **bare literal**: `rg -l 'CLAUDE\.md' scripts/proof-*.mjs = 0`.
- `BH/PLAN.md §4:93` — **qualified**: `rg -l 'CLAUDE\.md' scripts/proof-*.mjs (readFileSync sites) = 0`.

The parenthetical "(readFileSync sites)" is the INTENT (the hard readers B5c re-homes). The LITERAL command is a plain string-grep. **They compute different sets** — and the bare literal CANNOT reach 0 at HEAD:

| Metric | Live count @ `6c1f5386` | Command |
|---|---|---|
| Files containing the STRING `CLAUDE.md` | **27** | `grep -lE 'CLAUDE\.md' scripts/proof-*.mjs \| wc -l` |
| HARD readers (content-receiving: `readFileSync(…CLAUDE`/`safeRead(…CLAUDE`/`read(…CLAUDE`/`const CLAUDE =`) | **15** | the receiver-grep |
| **SOFT mentions** (string present, NO content read — do NOT ENOENT-break on delete) | **12** | `comm -23` of the two |

**The 12 SOFT files** (the bare-literal blocker — none is a B5c hard-reader, so B5c's re-home does NOT touch them, so a bare `rg=0` cannot pass until they are ALSO cleaned):

```
proof-bc-fold-ledger.mjs       proof-page-chassis.mjs         proof-spring-tokens-synced.mjs
proof-crossrepo-asks.mjs       proof-page-hierarchy.mjs       proof-storybook-meta.mjs
proof-expandable-part.mjs      proof-peer-optional.mjs        proof-visual-runner.mjs
proof-handmark.mjs             proof-scroll-trigger.mjs       proof-viz-configurator-suite.mjs
```

> **Pass-3 SHARPEN vs F8.** Pass-1 F8 estimated "~7 soft." The live re-grep finds **12** — the blocker is bigger. (The delta is 5 SFC/page-chassis gates whose header comments cite `CLAUDE.md §…` — `expandable-part`, `page-chassis`, `page-hierarchy`, `storybook-meta`, `viz-configurator-suite`.) All 12 are prose-comment mentions or path-allowlist entries, NONE reads the file content.

### B2. The `crossrepo-asks` double-touch (the standout, re-verified)

`proof-crossrepo-asks.mjs:56` carries `"CLAUDE.md"` in its `WAVE_BOUNDS` path-allowlist (the W4 `../`-escape fence; `:271` `"W4-content-only-fence"`) — it NEVER reads the content (verified: the only `CLAUDE` occurrence is the `:56` allowlist string). It is BOTH:
1. one of the 12 soft strings the bare-literal B4f gate flags (a stale allowlist entry referencing a deleted file after B4f), AND
2. the gate G7's amended `W5-viz-subpath-disposition` clause EXTENDS (build-map:869-877 — G7 adds a FRESH read-path reading `asks-and-consumes.md` + `consumer-constellation.md`; the gate is currently hard-wired to BB paths `:43-57`).

So `crossrepo-asks` is touched by THREE waves: G7 (WS5, adds the W5 clause), B4f/B5c (the soft-string cleanup + the `WAVE_BOUNDS` entry removal), and its own BB-path home. The cleanup must not clobber G7's W5 clause, and G7 must not assume the `WAVE_BOUNDS` `"CLAUDE.md"` entry survives.

### B3. THE DECISION — receiver-scope the B4f gate (option-a) + own the soft-cleanup (option-b's residue) + name `proof:claude-deletable`

The pass-1 F8 offered two options (a: receiver-scope the gate; b: widen B5c to strip the 12 soft mentions). **PASS-3 DECISION: BOTH, layered** — receiver-scope the gate as the PRIMARY (it aligns B4f with the gate G5 already mandates), AND own the soft-cleanup as a small B5c-adjacent sweep (so the repo carries no stale `CLAUDE.md` reference after the delete — a cleanliness floor, not a gate-pass condition):

- **B3-a (PRIMARY — receiver-scope the B4f gate).** Replace the bare-literal B4f gate command in BOTH BH docs with the `proof:claude-deletable` C2 receiver form — the de-blinded "ANY call RECEIVING the `CLAUDE.md` literal/var" detector (the F7 4-missed-reader correction). Concretely the gate condition becomes: **`proof:claude-deletable` GREEN** (C1 content-real homes / C2 zero hard CONTENT-readers / C3 file-is-last-act) + the file is gone — NOT a naive `rg -l 'CLAUDE\.md' = 0`. This measures the 15 hard readers (the intent), not the 27 strings.
- **B3-b (the soft-cleanup, owned by B5c).** B5c's cleanup pass ADDITIONALLY strips the 12 soft string-mentions — rewrite the 11 prose-comment citations off the literal `CLAUDE.md` (they cite a deleted file; re-phrase to the canon home or generic "the project canon"), and REMOVE `crossrepo-asks`'s `WAVE_BOUNDS "CLAUDE.md"` entry (`:56` — stale path-allowlist after B4f). This is a cleanliness sweep, NOT the gate-pass condition (B3-a's receiver-scope is the pass condition); it keeps the repo's `grep -l 'CLAUDE\.md'` honest-clean post-delete without making the gate hostage to comment hygiene.

**Why both:** B3-a alone leaves 12 stale-string mentions in the repo (cosmetically dirty, references-a-deleted-file). B3-b alone (the bare `rg=0` widened to clean all 12) re-makes the gate a naive string-grep that a future comment re-introduction reds spuriously. B3-a is the binding gate; B3-b is the one-time hygiene the same B5c pass performs.

### B4. §2.L14 — `proof:claude-deletable` ABSENT from the BH-side B4f wave specs

`proof:claude-deletable` (G5's net-new born-RED-whole-tranche gate) is named in EXECUTION-PROGRESS:306/314 (rows 18.10/19.2) + AMENDED §2.G5:179 + build-map:855/857, but **NOT in the two BH-side wave specs** the executing agent reads:
- `bh-interleave-map.md §4:151` B4f gate is the bare `rg=0` (no `proof:claude-deletable`).
- `BH/PLAN.md §4:93` B4f gate is the qualified `rg=0` (no `proof:claude-deletable`).

On disk `scripts/proof-claude-deletable.mjs` is ABSENT (expected — B4f/B5c unexecuted). The B4f wave spec MUST reference the gate so the executing agent builds + arms it. **Both the F2 and the B3-a fixes are the SAME edit** (replacing the bare/qualified `rg=0` with the `proof:claude-deletable` GREEN condition names the gate).

### B5. The hard-reader census reconcile (the "15 vs 16" nuance — recorded, not re-litigated)

The G5 census says "16 CLAUDE-readers." The live receiver-grep finds **15** content-readers. The delta is the `instrument-chassis` README home — `auditCanonHomes()` surfaces `component:instrument-chassis` as the ONE README B4b-content [WS12] owns (EXEC-PROG:79), but that is a HOME to AUTHOR, not a `CLAUDE.md` content-READER. The G5 16-count is the redistribute-target set; the 15 is the content-reader set. **This pass does NOT re-open the 12→16 census** (G5 litigated it); it records that the B4f receiver-gate measures the 15 content-readers, and the 16th (instrument-chassis README) is a B4b-content authorship item already tracked. The two ENOENT-crashers row 18.10 names (`proof:claude-structure-sync` `:32 const CLAUDE_MD`, `proof:doc-consistency`) are BOTH in the 15 (verified: structure-sync reads `CLAUDE.md` at `:32`, doc-consistency parses the §Structure tree) — they re-home/guard at B5c as the census already specs.

### B6. THE EXACT EDITS (§2.L13/L14)

1. **`docs/tranches/BG/execution/bh-interleave-map.md:151`** — replace `**Gate:** `rg -l 'CLAUDE\.md' scripts/proof-*.mjs` = 0 · the file is gone · every redistributed contract has a live gate at its new home.` with `**Gate:** `proof:claude-deletable` GREEN (C1 content-real homes / C2 the DE-BLINDED reader-detector — ANY call RECEIVING the `CLAUDE.md` literal/var, the F7 4-missed-reader correction — finds zero hard readers / C3 file-is-last-act) · the file is gone · every redistributed contract has a live gate at its new home. (The bare `rg -l 'CLAUDE\.md' = 0` is RETIRED — at HEAD 27 files carry the STRING but only 15 read CONTENT; B5c's cleanup additionally strips the 12 soft string-mentions incl. `crossrepo-asks`'s `WAVE_BOUNDS "CLAUDE.md"` entry, a cleanliness floor not the gate-pass condition.)`
2. **`docs/tranches/BG/execution/bh-interleave-map.md:155`** (the §4 prose `Then: rm CLAUDE.md … Gate: rg -l …`) — same replacement of the bare-literal Gate clause with the `proof:claude-deletable` form.
3. **`docs/tranches/BH/PLAN.md:93`** (B4f) — replace `**Gate:** `rg -l 'CLAUDE\.md' scripts/proof-*.mjs` (readFileSync sites) = 0; the file is gone; …` with the SAME `proof:claude-deletable` GREEN form (C1/C2-de-blinded/C3).
4. **`docs/tranches/BG/execution/bh-interleave-map.md:72`** (B5c) — append to the B5c note: ` + the soft-mention cleanup (12 prose-comment/allowlist `CLAUDE.md` strings rewritten off the literal — `crossrepo-asks` `WAVE_BOUNDS` entry removed) so the repo carries no stale reference post-delete.`
5. **`docs/tranches/BH/PLAN.md`** B5c — same one-line soft-cleanup note append.

---

## C. §2.L12 — `.githooks/commit-msg` AS A SHARED B0→G3 WRITER

### C1. The shared-write, re-verified on disk

`.githooks/commit-msg` is **already env-driven** (`TRANCHE="${GLASS_UI_ACTIVE_TRANCHE:-}"` at `:15`; runs `node scripts/proof-live-verified-ledger.mjs --tranche="$TRANCHE"` at `:19`; SKIPS when unset or the tranche has no PROGRESS ledger) — **BH.B0-W0 landed this** during BH tranche-dev (EXEC-PROG:71, `7a138008`, H4 "env-driven commit-hook"; the hook header at `:6-13` records the B0-W0 re-target off the stale `--tranche=BB`). It does NOT yet carry a close-sweep arm.

**G3 EXTENDS this same hook** (build-map:477-480, :492; EXEC-PROG:232): G3's *DECIDED:* "(1) the commit-hook is **tranche-env-gated, NOT hot-file-fires** — the `.githooks/commit-msg` sweep arm gates on `GLASS_UI_ACTIVE_TRANCHE`" + *Files:* names `.githooks/commit-msg` (the env-gated sweep-fast arm). C4 asserts the env-gated arm + a self-test bite.

So `.githooks/commit-msg` is written by **B0 (BH, DONE, [C])** AND **G3 (BG, WS7)**.

### C2. The §2 hard-collision table OMITS it

The `bh-interleave-map.md §2` table (re-verified, `:94-101`) lists: `src/index.ts`, `scripts/gates.mjs`, `src/components/ui/**`, `CLAUDE.md`, dock god-modules, viz/glass substrate god-modules, `vite.library.ts`. **`.githooks/commit-msg` is ABSENT.**

The ordering is naturally satisfied (B0 is DONE; G3 runs at WS7 ≫ B0), and B0-W0 also appears in the interleave-map W0-scratch-sweep file-list (`:22` lists `.githooks/commit-msg`). So the RISK is low BECAUSE B0 is done — but the EDGE is undocumented, and the CONSTRAINT is load-bearing for G3's C4 self-test.

### C3. THE DECISION — register the B0→G3 EXTEND-not-clobber edge + pin the ownership

- **Ownership.** B0 OWNS the hook's structural shape (the `GLASS_UI_ACTIVE_TRANCHE` env gate + the `proof:live-verified-ledger` ledger arm). G3 ADDS a SECOND arm (the `proof:close-sweep --run sweep-fast` env-gated arm) — it must **EXTEND, never replace**: G3 keeps B0's `TRANCHE="${GLASS_UI_ACTIVE_TRANCHE:-}"` gate + the ledger arm intact, appending the sweep-fast call under the SAME env gate (so a hot-file-fires hook never blocks the integrator's own P-CLOSE carves while R1–R4 are dirty — the build-map:478-480 rationale).
- **The clobber hazard the C4 self-test must bound.** G3 must NOT re-introduce a `--tranche=BB` hardcode (the exact stale-on-close pattern B0-W0 removed — the hook header `:7-9` records why), and must NOT drop the ledger arm. C4 (G3's self-test bite) exercises the env-gated arm with `GLASS_UI_ACTIVE_TRANCHE` set; PASS-3 adds the constraint that C4 ALSO asserts **the B0 ledger arm survives** (the hook runs BOTH `proof-live-verified-ledger` AND `proof-close-sweep --run sweep-fast` under the one env gate) — so a G3 edit that replaces rather than extends reds its own self-test.

### C4. THE EXACT EDITS (§2.L12)

1. **`docs/tranches/BG/execution/bh-interleave-map.md §2`** hard-collision table — ADD a row:

| File | BG writer | BH writer | Resolution |
|---|---|---|---|
| `.githooks/commit-msg` | **G3 (WS7)** appends the env-gated `proof:close-sweep --run sweep-fast` arm | **B0-W0 (DONE, [C])** landed the env-driven hook (`GLASS_UI_ACTIVE_TRANCHE` gate + `proof:live-verified-ledger` arm) | B0 DONE ≫ G3(WS7) serializes. **G3 EXTENDS, never clobbers** — keeps the env gate + the ledger arm, appends the sweep-fast call under the SAME gate; G3's C4 self-test asserts BOTH arms survive (no `--tranche=BB` re-hardcode, no ledger-arm drop). |

2. **`docs/tranches/BG/execution/bg-build-map.md:480`** (G3 *DECIDED* (1), the C4 clause) — append: ` C4 ALSO asserts B0-W0's `proof:live-verified-ledger` env-driven arm SURVIVES (the hook runs BOTH arms under the ONE `GLASS_UI_ACTIVE_TRANCHE` gate — G3 EXTENDS B0's hook, never replaces it; no `--tranche=BB` re-hardcode).`

3. **`docs/tranches/BG/execution/EXECUTION-PROGRESS.md:232`** (row 12.4b) — in the `commit-hook arm GLASS_UI_ACTIVE_TRANCHE-env-gated` clause, append `(EXTENDS B0-W0's env-driven hook — keeps the ledger arm, adds the sweep-fast arm under the SAME gate)`.

---

## D. THE THREE NEW EDGES (consolidated — the answer to "any BH band waits on a NEW BG gap-wave")

Per the BH-interleave research, this cluster registers **three BG→BH edges + one intra-[WS12] edge** the interleave map's §2 table + post-WS12 DAG do NOT carry. None breaks ordering (all are inside `[WS12]` serialization or behind an already-landed `[C]` wave) — the exposure is PROSE-COHERENCE the DAG-loader inherits, except §2.L13's bare-literal B4f gate which CANNOT pass as written:

| # | Edge | Artifact | Ordering | Why it's owed |
|---|---|---|---|---|
| 1 | **G3 (WS7) → B4b-content ([WS12])** | `docs/canon/build-and-gates.md` | WS7 < [WS12] ✓ | G3 authors close-sweep canon; B4b-content APPENDS §Build+Gate-hygiene + reads via `auditCanonHomes`; must not clobber G3's prose (§A3) |
| 2 | **B0 (DONE, [C]) → G3 (WS7)** | `.githooks/commit-msg` | B0 done ≫ WS7 ✓ | G3 EXTENDS B0's env-driven hook; C4 asserts both arms survive (§C3) |
| 3 | **G7 (WS5) → `proof:crossrepo-asks`** | the gate + `WAVE_BOUNDS` | WS5; net = cut `--run full` ✓ | G7 adds the W5 clause; B5c's soft-cleanup removes the `WAVE_BOUNDS "CLAUDE.md"` entry — must preserve G7's W5 clause (§B2) |
| 4 (intra-[WS12]) | **B4b-content(consumer-wiring) → B5c(doc-override-idiom re-point)** | `docs/canon/consumer-wiring.md` | both [WS12]; B4b-content first | B5c re-points `proof:doc-override-idiom` to compare README↔consumer-wiring; if B5c runs before B4b-content lands the verbatim override block, the re-pointed gate reds on a skeleton home (F3) |

Edge #3 and #4 are NOT this cluster's primary scope (G7 is cluster-distinct, F3 is the doc-override-idiom thread) — they are recorded here because they SHARE the artifacts this cluster reconciles (`crossrepo-asks`'s `WAVE_BOUNDS`, the `docs/canon/` homes). The PASS-3 edits register all four in the §2 table so a single interleave-map read carries the complete edge set.

---

## E. CONVERGENCE — honest aggregate

| Component | Conv | Note |
|---|---|---|
| §2.I1 diagnosis (the canon split + the resolver miss) | **97%** | live-grepped: `docs/canon/` exists with `build-and-gates.md`, `docs/tranches/BG/canon/` absent, `canon-doc.mjs` has no close-sweep key, the "shared with G3" contradiction confirmed |
| §2.I1 decision (home at `docs/canon/build-and-gates.md`, A2-i) | **93%** | the home + the no-resolver-key choice are decided; the A2-ii fallback (overgrow → standalone + key) is a recorded executor judgement at B4b-content, not open feasibility |
| §2.I1 the G3→B4b edge + exact edits (4 sites) | **94%** | every path + line verified; the APPEND-not-clobber constraint is the load-bearing prose half (the `canonAccumulationSound` lock is the machine half) |
| §2.L13 the B4f scope reconcile | **95%** | re-verified EXACT: 27 strings / 15 hard / 12 soft; the receiver-scope (B3-a) + soft-cleanup (B3-b) decision is named; the `crossrepo-asks` standout pinned |
| §2.L14 proof:claude-deletable naming | **96%** | the SAME edit as B3-a; both BH-side specs named; the 15-vs-16 census nuance recorded (not re-opened) |
| §2.L12 the commit-msg B0→G3 edge | **95%** | re-verified: B0-W0 landed the env-driven hook; G3 EXTENDS; the C4-both-arms-survive constraint added; the §2 row + 2 spec edits named |
| The three new edges registered | **93%** | all four (3 BG→BH + 1 intra-[WS12]) named with ordering + artifact; #3/#4 cross-referenced from their owning clusters |
| **Overall ready-to-amend-the-plan** | **94%** | up from §2.I1's DIAGNOSED-only baseline — all three approach sub-parts resolve to exact edits, the four edges register in one §2 read, no feasibility blocker. The residual 6% is two bounded EXECUTOR judgements (the A2-ii overgrow fallback at B4b-content; the exact comment re-phrasing of the 12 soft mentions at B5c) — plan-amendments, NOT feasibility opens |

**readyToAmend = TRUE.** The §A4 / §B6 / §C4 edit lists are drop-in for `EXECUTION-PROGRESS.md` (row 12.4b), `bg-build-map.md` (:480/:483/:490/:856/:924), `AMENDED-WAVE-PLAN.md` (§2.G3:107), `bh-interleave-map.md` (§2 table +2 rows · §4 B4f gate · B5c note), and `BH/PLAN.md` (B4f gate · B5c note). The two executor judgements (A2-ii fallback, soft-mention re-phrasing) are recorded as owed-at-build, not open feasibility.

---

## F. SIBLINGS

`node scripts/verify-siblings-intact.mjs --quiet` → exit **0** at start AND end of pass. Read-only throughout (every fact a live grep/cat/ls); the only write is this report under `docs/tranches/BG/audit/RESPEC-COHERENCE/`. No path outside `/Users/mkbabb/Programming/glass-ui` touched.
