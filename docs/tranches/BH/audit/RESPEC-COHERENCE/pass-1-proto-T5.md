# PASS 1 · PROTO T5 — B5c→B4f HARD-ordering + ENOENT-crasher re-home spec

**Mode:** `spec` (corrected-approach). **Issue:** C5 [MED] — the 2 unguarded `readFileSync(CLAUDE.md)` crashers CRASH the `--run full` cut battery LIVE if CLAUDE.md is touched/deleted before B5c re-homes them. **Feasible:** YES — the fix holds. The infrastructure it depends on (the B4b-skeleton: `docs/canon/structure.md` generated + `regen-structure.mjs --check/--write` + `canon-doc.mjs` `readCanon(key, mode)`) is ALREADY ON DISK. The amendment is bounded plan-text + gate-wiring; NO feasibility restart. Write-fence honored: PASS 1 records; the fold applies.

---

## §0 On-disk ground truth (verified fresh, HEAD `e550f1b0`)

siblings-intact exit 0 (before). All line numbers re-verified this pass.

### The 2 crashers — BARE `readFileSync`, no try-wrap (WILL crash, not silent-fail)

| # | Gate | Site | Tag set | Cut-battery effect on CLAUDE.md ENOENT |
|---|---|---|---|---|
| X1 | `proof:claude-structure-sync` | `scripts/proof-claude-structure-sync.mjs:74` — `readFileSync(CLAUDE_MD, "utf8").split("\n")` | `["local", "ci"]` (gates.mjs:385) | **CRASH the `ci` arm** — an uncaught `ENOENT` throw; the process exits non-zero mid-battery, no gate artifact. |
| X2 | `proof:doc-consistency` | `scripts/proof-doc-consistency.mjs:197` — `const claudeMd = readFileSync(CLAUDE_MD, "utf8")` | `["local", "ci", "release"]` (gates.mjs:409) | **CRASH the `release` arm** — the `--run full`/`--run release` cut battery THROWS before `git tag`, aborting the publish with a raw stack trace (not a red gate). |

Both resolve `CLAUDE_MD = resolve(ROOT, "CLAUDE.md")` (structure-sync:32; doc-consistency:52). Neither is wrapped in a `try` nor routed through a guarded helper. Contrast the OTHER 14 CLAUDE-readers, which use `safeRead`/`rd`-style helpers returning `''`/`null` and SILENTLY FALSE-FAIL (a quieter, greener-looking loss). **Only X1/X2 hard-CRASH.** This is the C5 severity distinction the current plan text does NOT draw: PLAN.md:16 says the readers "ENOENT-break on deletion" as if all 16 crash — untrue; 2 crash, 14 silently false-fail (C3 taxonomy correction).

### The re-home landing zone — ALREADY BUILT (B4b-skeleton [C], landed)

- `docs/canon/structure.md` EXISTS (1992 B, `## src/components/ui (43 dirs)` / `## src/components/custom (50 dirs)` / `## src/composables (11 dirs)` markdown-list enumeration; header `# Structure (GENERATED — do not hand-edit)`).
- `scripts/regen-structure.mjs` EXISTS with `--write` (regenerates from `readTree()`), `--check` (compare-or-`exit 1` on drift/absence), and `export function generateStructureMd()`. Feeds off the SAME `scripts/lib/subpath-policy.mjs readTree` the export regen uses → the enumeration cannot drift.
- `scripts/lib/canon-doc.mjs` EXISTS with `readCanon(key, mode="strict")` — `strict` THROWS ENOENT (loud RED), `mode:"soft"` returns `''` (the WARN-degrade path, header comment names `accent-tone` as the soft consumer). `CANON_HOMES.structure = "docs/canon/structure.md"` marked GENERATED. `auditCanonHomes()` returns absent-home list for a BH close gate.

### The accent-tone dual-arm — verified precisely

`scripts/proof-accent-tone.mjs` reads TWO wiring sources that a B2 deletion touches:

- **CLAUDE arm** — `claudeMd` (via `safeRead`, `:111`) → line 353 `inClaudeStructure = /│\s+│\s+├──\s+selectable-chip\//.test(claudeMd)`. Already SOFT: recorded as a fact, **NOT a hard violation** (lines 361-363 comment: `proof:claude-structure-sync` owns the hard gate; double-owning barred). On CLAUDE.md ENOENT → `safeRead` returns `''` → `inClaudeStructure=false` → NO violation. **So the CLAUDE arm degrades gracefully already; the B5c task is to DROP the read (dead once CLAUDE.md is gone).**
- **selectable-chip subpath arm** — `subpath` (via `safeRead`, `:56` `SUBPATH: resolve(ROOT, "src/subpaths/selectable-chip.ts")`) → line 346 `subpathMirrors = /export \* from ".../selectable-chip"/.test(subpath)` → line 357-358 **HARD violation A6** `"src/subpaths/selectable-chip.ts does not mirror the component dir"` when false. `src/subpaths/selectable-chip.ts` EXISTS on disk (670 B) TODAY but **B2.1-swap DELETES all of `src/subpaths/` (79 files)**. On delete → `safeRead` returns `''` → `subpathMirrors=false` → **A6 HARD-FAILS**. This is the F7 deleted-wiring ENOENT-break: it does NOT crash (safeRead guards the read) but it FALSE-FAILS a hard clause. **The subpath arm MUST be re-pointed to the colocation dir (`src/components/custom/selectable-chip/index.ts` mirror check) when B2.1-swap deletes the mirror — else the deleted-wiring half reds the close.**

### Current plan state (what's already there vs the C5 gap)

- PLAN.md:46/48 + interleave §3.5/§4 ALREADY state `B5c → B4f` and "B4f absolute last." PLAN.md:99 (B5c) ALREADY names `proof:claude-structure-sync→generated structure.md`, `accent-tone DROPS the read`, and the "cross-reference against the B2 deletion set — `accent-tone` reads `src/subpaths/selectable-chip.ts` — re-point BOTH arms."
- **THE C5 GAP (3 residuals the current text does not carry):**
  1. **`proof:doc-consistency` is NOT named in B5c.** PLAN.md:99 re-homes structure-sync but is SILENT on doc-consistency:197 — the RELEASE-tagged crasher that aborts the CUT. B5c re-homes X1 but not X2. If B5c lands as-written, X2 still `readFileSync(CLAUDE.md)`s and B4f's delete crashes the release cut battery.
  2. **The B5c→B4f edge is stated as an ordering, NOT marked HARD-with-a-crash-severity + NOT gate-enforced** with a born-RED precondition. It reads as advisory sequencing prose; the C5 finding is that it is a HARD edge whose violation is a LIVE CUT CRASH (not a silent fail), so it needs a machine gate, not just a DAG arrow.
  3. **The accent-tone selectable-chip subpath re-point is named as a NOTE inside B5c but not spec'd as a concrete edit + not homed on the wave that DELETES the wiring (B2.1-swap).** F7's "re-point BOTH arms" is one clause of a cross-reference note; it needs to be an explicit two-part obligation (CLAUDE arm DROP in B5c + subpath arm RE-POINT that lands WITH/AFTER B2.1-swap's delete), or the deleted-wiring half A6-fails between B2.1-swap and B5c.

---

## §1 The corrected approach (the fix)

Three coupled amendments, all bounded plan-text + one born-RED gate clause. The direction the current plan already points is CORRECT; C5 is the residual that makes the edge HARD, CRASH-severity-explicit, doc-consistency-complete, and the dual-arm concrete.

### Fix A — re-home BOTH crashers off CLAUDE.md through the guarded seam (X1 AND X2)

**X1 — `proof:claude-structure-sync` → generated `structure.md` via `readCanon('structure')`.**
The gate's job (§Structure `custom/` enumeration ≡ `ls src/components/custom/`) MOVES to reading `docs/canon/structure.md`'s `## src/components/custom (N dirs)` markdown-list (the generated enumeration) instead of CLAUDE.md's ASCII-tree. Concrete edit:
- `scripts/proof-claude-structure-sync.mjs:32` — replace `const CLAUDE_MD = resolve(ROOT, "CLAUDE.md")` with `import { readCanon } from "./lib/canon-doc.mjs"` (structure key).
- `:74 parseDoc()` — read `readCanon("structure")` (strict — a re-homed gate REDs loud on an absent home, never passes on a vanished doc) and re-write the parser from the ASCII-tree regex (`/^│\s+│\s+├──\s+([a-z0-9-]*)\/(?:\s|$)/`) to the markdown-list form (`/^- ([a-z0-9][a-z0-9-]*)\/$/` under the `## src/components/custom` header). The set-equality-both-directions + derived-count clauses are UNCHANGED — only the SOURCE FORM (markdown list vs ASCII tree) and the READ (readCanon vs readFileSync) change.
- The png-arm (P-4 fold, the un-ignored `docs/tranches/*/audit/visual/*.png` git-tracked assert) SPLITS OFF to a new `proof:visual-png-tracked` gate (PLAN.md:99 already names this split — it has no CLAUDE dependency, so it survives the delete unchanged). Rename must land in gates.mjs + ci.yml (B5c re-emits ci.yml).
- **The generated structure.md is kept fresh** by a `proof:gen-structure-fresh` gate (runs `regen-structure.mjs --check`; `exit 1` on drift/absence) so a `custom/` dir add that never re-generated the file REDs — the same generated-artifact discipline as `proof:gen-ci-fresh`. If no such gate exists yet, B5c mints it (born-RED on a synthetic stale structure.md; the `--check` teeth are already built).

**X2 — `proof:doc-consistency` → guarded read (the RELEASE crasher — THE CUT-BATTERY FIX).**
The gate asserts CLAUDE.md's `custom/<dir>` + dependency CITATIONS resolve on disk. Two sub-facts, two dispositions:
- **The `custom/<dir>` citation arm** re-homes to `readCanon("structure")` (the SAME generated enumeration X1 reads) — the dir citations live in structure.md's list after the delete.
- **The dependency-citation arm** (CLAUDE.md's §Dependencies table vs package.json peer/dep set) re-homes to `readCanon("dependencies")` (`docs/canon/dependencies.md` — the B4b-content home the §Dependencies prose redistributes into; skeleton present, content lands B4b-content [WS12]).
- **The read is `readCanon(..., "strict")`** — THROWS loud if the home is absent (a half-finished migration REDs explicitly, never a silent green on a vanished doc), NEVER a bare `readFileSync(CLAUDE.md)` that ENOENT-crashes the cut. The critical property: **after B5c, NO `release`-tagged gate `readFileSync`s a file B4f will delete.** doc-consistency:197's bare read is DELETED; X2 no longer crashes the cut.

### Fix B — make `B5c → B4f` a HARD, crash-severity, gate-ENFORCED edge (not advisory)

The edge is not "nice ordering" — its violation is a LIVE CUT-BATTERY CRASH (X2, `release`). Enforce it two ways so a resumed execution reading only the plan cannot mis-order it:

1. **`proof:claude-deletable` is B4f's born-RED GATE-CONDITION and it PROVES the crashers are gone.** The gate (currently unbuilt — spec'd here as B5c-minted, born-RED) asserts, over the WHOLE `scripts/proof-*.mjs` corpus:
   - **C-CRASH (the load-bearing clause):** ZERO gate contains a BARE `readFileSync(<CLAUDE.md-resolving path>)` — a receiver-grep that catches `readFileSync(CLAUDE_MD)`, `readFileSync(resolve(ROOT,"CLAUDE.md"))`, and the `rd/readRel/safeRead(... "CLAUDE.md")` helper-alias forms (the C3/G6 blind-spot fix — the detector MUST enumerate the short-helper aliases `rd`/`readRel`, any local wrapper of `readFileSync` receiving a CLAUDE-bearing arg; NOT BG-G6's 4-pattern receiver set which mis-classed handmark:249). Born-RED TODAY (X1+X2 both bare-read on disk). Turns GREEN only when Fix A re-homes both.
   - **C-RGZERO:** `rg -l 'CLAUDE\.md' scripts/proof-*.mjs` readFileSync-site count == 0 (the PLAN.md:93 B4f gate, promoted into the born-RED gate so it is CHECKABLE before the delete, not only after).
   - **C-HOMES:** `auditCanonHomes()` returns `[]` — every re-homed contract's canon home is present AND content-complete (non-empty + the contract token present), so the re-home did not merely point at an empty scaffold.
   - **The 16-not-15 reconcile (C3):** the C-CRASH receiver-grep enumerates the CORRECT 16 (incl. `proof-handmark:249 rd("CLAUDE.md")`) — the detector breadth is the `rd/readRel` alias set, NOT the BG-G6 15/4-pattern set. Keep reader-census=16 disjoint from BG-append=15 (PLAN.md:42 numeral collision hazard).
2. **B4f's gate line ADDS `proof:claude-deletable` GREEN as a hard precondition** (alongside `rg=0` + file-gone + every-contract-has-a-live-gate). A resumed execution that tries B4f before B5c hits a born-RED `proof:claude-deletable` (X1/X2 still bare-read) and CANNOT proceed — the edge is machine-enforced, not prose.

### Fix C — the accent-tone dual-arm: DROP the CLAUDE arm AND RE-POINT the subpath arm (the deleted-wiring half)

Two arms, two distinct obligations, homed on the two waves that touch each wiring:

- **CLAUDE arm (B5c, DROP).** `proof-accent-tone.mjs` `inClaudeStructure` (line 353) reads `claudeMd` via `safeRead` — already soft (recorded, non-hard). B5c DELETES the read: remove the `CLAUDE_MD` source (`:58`), the `claudeMd` param, the `inClaudeStructure` fact + its comment block (`:349-363`). This arm never crashes (safeRead-guarded) but the dead read is removed so no gate references a deleted doc (the B4f `rg=0`/`proof:gate-manifest-sound` floor).
- **selectable-chip subpath arm (RE-POINT, landing WITH/AFTER B2.1-swap's delete).** `proof-accent-tone.mjs:346` `subpathMirrors` reads `src/subpaths/selectable-chip.ts` (`safeRead`, `:56`) and HARD-fails A6 (`:357-358`) when the mirror is absent. **B2.1-swap deletes `src/subpaths/` → this arm A6-FALSE-FAILS.** Re-point: assert the colocation dir barrel itself (`src/components/custom/selectable-chip/index.ts` — the source-of-truth the deleted mirror mirrored) exports the family, instead of asserting the deleted one-line mirror. Concrete: replace `SUBPATH: resolve(ROOT, "src/subpaths/selectable-chip.ts")` + the `subpathMirrors` regex with a check that `src/components/custom/selectable-chip/index.ts` exports `SelectableChip`/`SelectableChipVariants` (the A6 intent — "the family is reachable" — preserved; the vehicle moves from the retired mirror to the surviving barrel). This obligation is **coupled to B2.1-swap** (the wave that deletes the wiring); route it as a B5c clause GATED ON B2.1-swap having landed (both are [WS12], B2.1-swap is order-free but the accent-tone re-point must not land before the mirror is actually gone, else it asserts a barrel that still has a live mirror sibling — harmless, but the clean order is: B2.1-swap deletes → accent-tone re-points off the survivor).

---

## §2 Exact amendments — BOTH docs

### `docs/tranches/BH/PLAN.md`

**Row B5c-gate-rehome (line 99).** AMEND to name X2 + the HARD edge + the concrete dual-arm. Replace the current sentence run with:

> **B5c-gate-rehome [WS12].** The 16 CLAUDE-readers via `canon-doc.mjs` (`readCanon(key,"strict")`) + the 10 precept-readers via `design-docs.mjs`. **The 2 BARE-readFileSync CRASHERS re-home FIRST (they crash, not silent-fail):** `proof:claude-structure-sync`:74 (`ci`) → `readCanon("structure")` over generated `structure.md` (markdown-list parser; png-arm splits to `proof:visual-png-tracked`; freshness by `proof:gen-structure-fresh` = `regen-structure.mjs --check`); **`proof:doc-consistency`:197 (`release` — crashes the CUT battery) → `readCanon("structure")` (custom-dir arm) + `readCanon("dependencies")` (dep-citation arm), strict**. The 14 guarded-helper readers (safeRead/rd/readRel — silent-false-fail, not crash) re-home in the same pass. `proof:doc-override-idiom`→README.md. **accent-tone DUAL-ARM (F7): (i) DROP the CLAUDE §Structure read (`inClaudeStructure`, already soft); (ii) RE-POINT the `src/subpaths/selectable-chip.ts` mirror check onto the surviving `src/components/custom/selectable-chip/index.ts` barrel** (B2.1-swap deletes `src/subpaths/` → the A6 mirror clause HARD-FALSE-FAILS unless re-pointed; couple this clause to B2.1-swap's delete). **Re-emit `ci.yml`** (`npm run gates:emit-ci`) + `proof:gen-ci-fresh` GREEN. **Gate:** `proof:gate-manifest-sound` GREEN + **no gate BARE-readFileSyncs OR guarded-reads a deleted doc** + `proof:gen-ci-fresh` + `proof:gen-structure-fresh` GREEN + **`proof:claude-deletable` born-RED at HEAD → GREEN after this wave** (the C-CRASH clause proves both crashers gone; receiver-grep enumerates the CORRECT 16 incl. handmark:249 via `rd/readRel` aliases).

**Row B4f-claude-delete (line 93).** AMEND the gate line to add the born-RED precondition:

> **Gate:** `proof:claude-deletable` GREEN (the born-RED gate: C-CRASH zero bare-CLAUDE-readFileSync over the 16-reader corpus + C-RGZERO `rg -l 'CLAUDE\.md' scripts/proof-*.mjs`==0 + C-HOMES `auditCanonHomes()`==[]) · `rg -l 'CLAUDE\.md' scripts/proof-*.mjs` = 0 · the file is gone · every redistributed contract has a live gate at its new home.

**§3 intra-post-WS12 edge (line 48).** AMEND the edge annotation to mark severity:

> The only intra-post-WS12 sequencing edges: **`B5c → B4f` (HARD — a CUT-BATTERY CRASH edge, gate-enforced by `proof:claude-deletable` born-RED; the `release`-tagged `proof:doc-consistency`:197 bare-read aborts the publish if CLAUDE.md is deleted before B5c re-homes it)** and `{B2.6, B4e} → B4f`. The DAG is acyclic.

**§1 reader taxonomy (line 16).** CORRECT the "they ENOENT-break on deletion" overstatement:

> The ~16 CLAUDE-reading gates re-home before the delete. **Of the 16, exactly 2 BARE-`readFileSync` and CRASH on ENOENT (`structure-sync`:74 `ci`, `doc-consistency`:197 `release` — the latter aborts the cut battery); the other 14 use guarded helpers (safeRead/rd/readRel) that return ''/null and SILENTLY FALSE-FAIL their CLAUDE-asserting clause.** Gate becomes `file gone + rg=0 + proof:claude-deletable GREEN`.

**B5c-minted-gate line — ADD to the gate ledger (a new born-RED gate).** Register `proof:claude-deletable` (tags `["local","ci"]` — device-free, no CLAUDE-content dependency once built) + `proof:gen-structure-fresh` (`["local","ci"]`, wraps `regen-structure.mjs --check`) in the B5c wave's gate-mint list, both born-RED-at-HEAD → GREEN-at-B5c, each with a self-test bite (a synthetic bare `readFileSync("CLAUDE.md")` in a fixture MUST flag C-CRASH; a stale structure.md MUST flag `--check`).

### `docs/tranches/BG/execution/bh-interleave-map.md` (BOTH sides must agree)

**Row B5c-gate-rehome (line 72).** AMEND the note to name X2 + the crash severity:

> `16 CLAUDE-readers via canon-doc.mjs · 10 precept-readers via design-docs.mjs · claude-structure-sync→generated structure.md · **doc-consistency (RELEASE crasher)→readCanon(structure)+readCanon(dependencies)** · re-emit ci.yml` | **→ B4f edge (HARD — the readFileSync removal that lets B4f delete without a CUT-BATTERY CRASH; 2 crashers X1/X2 re-home, gate-enforced by born-RED `proof:claude-deletable`).** cross-ref the B2 deletion set (`accent-tone` reads a deleted subpath — DROP the CLAUDE arm AND re-point the selectable-chip arm off the surviving barrel).

**§3.5 `B5c → B4f` bullet (lines 126-128).** AMEND to distinguish crash-vs-silent + name doc-consistency:

> **`B5c → B4f` (HARD — a CUT-BATTERY CRASH edge).** B5c re-homes the ~16 CLAUDE-reading gates (via `canon-doc.mjs`) + the 10 precept-readers (via `design-docs.mjs`). **Of the 16, 2 BARE-`readFileSync` and CRASH on ENOENT: `structure-sync`:74 (`ci`) and `doc-consistency`:197 (`release` — this one THROWS mid-cut-battery, aborting `git tag`).** Until BOTH bare reads are gone (re-homed through `readCanon(...,"strict")`), B4f's delete crashes the cut. B5c MUST precede B4f; the edge is machine-enforced by born-RED `proof:claude-deletable` (C-CRASH: zero bare-CLAUDE-readFileSync). B5c is NOT advisory sequencing — it is a hard precondition.

**§4 B4f preconditions (line 146).** AMEND precondition 3 + the gate:

> 3. **B5c** has re-homed the ~16 reader-gates off CLAUDE.md — critically the 2 BARE-`readFileSync` CRASHERS (`structure-sync`:74, `doc-consistency`:197, the RELEASE cut-battery crasher) → `readCanon(...,"strict")` — and the dual-doc moves (B2.6/B4e) + the accent-tone dual-arm (DROP CLAUDE + re-point selectable-chip barrel) have landed. **Gate:** `proof:claude-deletable` GREEN (born-RED at HEAD) · `rg -l 'CLAUDE\.md' scripts/proof-*.mjs` = 0 · the file is gone · every redistributed contract has a live gate at its new home.

---

## §3 The verifying check (how the fold is proven correct)

**Born-RED-at-HEAD, GREEN-at-B5c** — the standing binding proof of C5's close:

1. **`proof:claude-deletable` (the minted gate) is RED at HEAD** — run it now, it flags X1 (`structure-sync`:74) + X2 (`doc-consistency`:197) as bare-CLAUDE-readFileSync C-CRASH violations. This is the born-RED anchor: if it is GREEN at HEAD, the C-CRASH detector is vacuous (mis-built).
2. **After Fix A+C, `proof:claude-deletable` GREEN** — both crashers re-homed through `readCanon`, accent-tone dropped-and-re-pointed, `rg -l 'CLAUDE\.md' scripts/proof-*.mjs` == 0.
3. **The CUT-BATTERY no-crash proof (the direct C5 verification):** with CLAUDE.md ABSENT (a `/tmp` fresh-worktree at `.claude/worktrees/` per the fence, `mv CLAUDE.md CLAUDE.md.bak` INSIDE the worktree only), run `node scripts/gates.mjs --run full`. Before the fix → THROWS (X2 uncaught ENOENT at doc-consistency:197, non-zero exit, no artifact). After Fix A → every gate produces an artifact (RED or GREEN, never a raw stack trace); the `release` arm does not abort. **The distinguishing bite: a THROW vs a RED.** (Worktree-only; never touch the real CLAUDE.md; restore/discard the worktree after.)
4. **The self-test bites (planted, MUST flag):** (a) a synthetic `readFileSync("CLAUDE.md")` in a fixture → C-CRASH flags; (b) a synthetic `rd("CLAUDE.md")` alias in a fixture → C-CRASH flags (the 16-not-15 handmark blind-spot fix); (c) a stale `structure.md` → `regen-structure.mjs --check` `exit 1`; (d) an absent canon home → `readCanon(...,"strict")` THROWS + `auditCanonHomes()` non-empty.
5. **The accent-tone deleted-wiring proof:** in the worktree, delete `src/subpaths/` (simulating B2.1-swap), run `proof:accent-tone`. Before Fix C → A6 HARD-FAILS (`subpathMirrors=false`). After Fix C → GREEN (asserts the surviving `src/components/custom/selectable-chip/index.ts` barrel; the deleted mirror is no longer read).
6. **Cross-tranche agreement (the seed's rule):** `grep -c "doc-consistency" docs/tranches/BH/PLAN.md docs/tranches/BG/execution/bh-interleave-map.md` — BOTH now name X2 (before the fold, only structure-sync appears in B5c on both sides). `grep "HARD" ...B5c...` — both mark the edge HARD-crash. BOTH sides of the interleave agree post-fold.

---

## §4 Feasibility verdict

**FEASIBLE — the fix holds.**

- The re-home LANDING ZONE is already built (structure.md generated, regen-structure.mjs --check/--write, readCanon strict/soft) — B4b-skeleton [C] landed. Fix A is a source-form + read-source swap over existing infrastructure, not new plumbing.
- The doc-consistency dependency-citation arm's home (`docs/canon/dependencies.md`) is skeleton-present; its content lands B4b-content [WS12] (same wave-band, no new dependency edge — B5c reads the strict home, which auditCanonHomes/C-HOMES proves content-complete before B4f).
- The accent-tone CLAUDE arm is already soft (safeRead) — DROP is subtractive, zero risk. The subpath arm re-point is a vehicle swap (deleted mirror → surviving barrel) preserving the A6 intent verbatim.
- The B5c→B4f edge is already in the DAG (acyclic, PLAN §3 + interleave §3.5/§4); C5 only ELEVATES it from advisory-prose to gate-enforced-HARD and completes it with the second crasher + the crash-vs-silent severity. NO topology change, NO new edge, NO cycle.
- NO src/ paint touched (pure infrastructure/gate/plan-text); the design-language fence is not engaged.
- One residual owed to execution (not a feasibility blocker): `proof:gen-structure-fresh` may need minting if absent — the `--check` teeth are already built in `regen-structure.mjs`, so it is a thin gates.mjs registration + ci.yml re-emit, born-RED on a synthetic stale structure.md.

siblings-intact exit 0 (after). Only file written: this report.
