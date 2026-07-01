# BH COHERENCE — the AMENDED (DEVELOPED) plan

**Purpose.** The develop-ready fold target for the BH cross-wave/cross-band coherence audit. For each of the six coherence clusters (C1–C6) plus the two PASS-2 loose ends, this fixes the LOCKED decision and enumerates the EXACT `PLAN.md` / `bh-interleave-map.md` / `EXECUTION-PROGRESS.md` / `bg-build-map.md` edits it implies — ready for a fold-agent to apply. It is the BH twin of BG's `AMENDED-COHERENCE-PLAN.md` and meets the SAME develop-ready bar: every cluster is RESOLVED, or explicitly ACCEPTED-RESIDUAL with a named owner.

**State.** PASS 2 agglomerated · HEAD `eaf2c172` (advanced from the master's `f7dd6146` anchor; every disk anchor below re-verified fresh at `eaf2c172`, not carried from prose) · branch `tranche/BG` (BH shares it) · siblings-intact exit 0 before + after.

**Overall convergence: 92%. Develop-ready: YES.** Every cluster is RESOLVED or ACCEPTED-RESIDUAL with a named owner. The remaining 8% is the fold-agent's mechanical application of the enumerated edits + two BG-execution dependencies (the two BG-owned witness gates that land during BG execution, cross-referenced not authored here) — not a content or feasibility gap. No feasibility restart; no new friction class survives to close.

**The seed rule is binding: BOTH sides of the interleave must agree post-fold** (BH `PLAN.md` + BG `bh-interleave-map.md`). Every edit below is tagged with its tree + its writer.

---

## §0 The write-fence (governs every edit)

Two trees carry BH-coherence text. The absolute write-fence — a BH pass may NOT write the BG-tree — forces the split:

| Tree | Files | Writer | Fold discipline |
|---|---|---|---|
| **BH-tree** | `docs/tranches/BH/PLAN.md`, `docs/tranches/BH/coordination/asks-and-consumes.md`, `docs/tranches/BH/audit/RESPEC-COHERENCE/*` | the BH develop-fold | applied directly at develop |
| **BG-tree** | `docs/tranches/BG/execution/bh-interleave-map.md`, `docs/tranches/BG/execution/EXECUTION-PROGRESS.md`, `docs/tranches/BG/execution/bg-build-map.md`, `docs/tranches/BG/audit/RESPEC-COHERENCE/AMENDED-COHERENCE-PLAN.md` | the BG-side fold owner | recorded here + routed through the existing BG-side fold |

**The C1/C3 BG-tree edges are ALREADY OWNED by `AMENDED-COHERENCE-PLAN.md:214-215`** (verified on disk): that fold-target table already enrolls `bh-interleave-map.md §2 + §4` (the interleave-side C1/C3 edits) AND `PLAN.md:93 (B4f) → proof:claude-deletable GREEN form` (the C3C6 item-b gate-form swap). The BH develop-fold DEFERS every BG-tree edge to that owner and writes only the BH-tree copies + records the reciprocal so the two agree post-fold. **New scripts + `package.json` + `gates.mjs` are repo-root (neither tree's write-fence forbids them)** — the C2 + C5 gate mints land at develop directly.

---

## §1 Cluster-by-cluster LOCKED decisions + exact edits

### C1 — kf-peer bump `^5.0.0 → ^5.1.0` + the floor-vs-API gate [HIGH · LIVE]

**Disk-confirmed defect (HEAD `eaf2c172`):** `package.json:1078` peer `@mkbabb/keyframes.js: ^5.0.0`; `useDragMorph.ts:325` ships `snap: targetsOf().map((t) => t.center)`; `DragOptions.snap` first ships kf 5.1.0; `proof:peer-conformance` is GREEN over the broken floor (no kf floor-vs-API clause — ran it: exit 0). A `^5.0.0` consumer's drag gesture is a LIVE no-op.

**LOCKED decision — the MR-4 split, do NOT soften (three sides, all authored):**
- **The CLAUSE** (`proof:peer-conformance` gains "kf floor ≥ 5.1.0 WHEN `useDragMorph` references `snap:`, born-RED on `^5.0.0`") is `BG.W-GATE-FIELD-AURORA`'s single deliverable (bg-build-map:717-719 names it the SINGLE owner of the floor-vs-API clause). BG-owned.
- **The BUMP** (`package.json` peer `^5.0.0 → ^5.1.0`) is `BH-B2.1-swap`'s (the FINAL pre-cut `package.json` single-writer). BH-owned.
- **The RED-WINDOW WS7→WS12 is EXPECTED / BY DESIGN.** The clause lands at BG-WS7 on the still-`^5.0.0` tree and reds `proof:peer-conformance` (ci+release) until B2.1-swap's bump lands at WS12; the joint 5.0.0 cut is gated on BOTH landing; a mid-window `--run release` RED is not a regression. State this verbatim on every side.

**EXACT edits:**

| # | Tree / File | Edit |
|---|---|---|
| C1-a | BH · `PLAN.md:68` (W-regen-swap / B2.1-swap row) | ADD to the wave body: "bump the kf peer `@mkbabb/keyframes.js` `^5.0.0 → ^5.1.0` in `package.json` peerDependencies — the pairing-debt B1-W3 (`ba23c086`) created by shipping `useDragMorph.ts:325 snap:` against kf-5.1.0's `DragOptions.snap` while the floor stayed `^5.0.0`. This wave is the FINAL single-writer; the floor-vs-API GATE clause is NOT owned here (it is `BG.W-GATE-FIELD-AURORA`'s per MR-4). The WS7→WS12 born-RED window on `proof:peer-conformance` is EXPECTED / BY DESIGN — the joint cut gates on BOTH the clause (WS7) and this bump (WS12) landing." |
| C1-b | BG · `bh-interleave-map.md:40` (B2.1-swap row) — **DEFER to AMENDED-COHERENCE-PLAN:214 fold** | ADD the reciprocal BUMP reference + the MR-4 gate-owner pointer (`→ BG.W-GATE-FIELD-AURORA owns the clause`) + a `→ PLAN.md:68` cross-ref + the red-window-EXPECTED note. |
| C1-c | BG · `EXECUTION-PROGRESS.md:239` (row 12.5, `BG.W-GATE-FIELD-AURORA`) — **DEFER to BG-side fold** | ADD the kf-CLAUSE deliverable to the Gate cell: "`proof:peer-conformance` gains the kf floor-vs-API clause (kf floor ≥ 5.1.0 WHEN `useDragMorph` references `snap:`, born-RED on `^5.0.0`)". The bump itself is NOT this wave's — it is `BH-B2.1-swap`'s. State the red-window EXPECTED. **(Row 12.5 on disk carries only proof:field-aurora-aa + the value pin — the kf clause is the genuine gap here.)** |
| C1-d | BG · `EXECUTION-PROGRESS.md:303` (row 18.1, `BH.B2.1-swap`) — **DEFER to BG-side fold** | WIDEN the wave-name + Gate cell (currently BARE: "proof:subpath-enumeration (landed surface)") to absorb the G4 single-writer obligations: kf-peer bump `^5.0.0→^5.1.0` · value-floor `^1.0.0→^1.1.1` · L15 net-budget re-pin · FINAL `gates:emit-ci` · `proof:binding-sweep` · `proof:peer-conformance` GREEN over the FINAL surface + the red-window pointer. |

**Residual (ACCEPTED, named owner):** the four BG-tree edits (C1-b/c/d + the `bh-interleave-map` reciprocal) route through the BG-side fold owner `AMENDED-COHERENCE-PLAN.md:214-215` (which already enrolls `bh-interleave-map §2+§4` + the census-16 note) — NOT this BH pass, per the write-fence. **Owner: the BG-side fold at develop.**

---

### C2 — the B7 consumer-migration roster [HIGH]

**Disk-confirmed defect:** `PLAN.md:106` says "the roster is **exactly 2 by-name asks**" (muster→/aurora, speedtest→/timeline); `PLAN.md:134` repeats "the exact **2-ask** B7 roster"; the Gate line at `:106` names the BB-scoped `proof:crossrepo-asks` (vacuous for BH — `proof-crossrepo-asks.mjs:43` hardcodes `RELAY="docs/tranches/BB/…"`, never reads a BH doc). The real 5.0.0-BH-B7 by-name migration roster is FOUR rows (rows 3 + 4 missing): atlas `migrate-ring-to-focus-ring-color` (GU-3-TRIAGE ASK-B, explicit BH ACTION) + bbnf `bbnf-glass-blur-dock-retune-no-op` (bg-build-map §G7 U1, `bbnf-buddy/src/styles/preset.css:230` live).

**LOCKED decision — the source-doc AUTO-SCAN gate (built + proven in the C2 spike, born-RED 18/23 → GREEN 23/23):**
- Complete the roster to 4 rows (`docs/tranches/BH/coordination/asks-and-consumes.md`).
- Mint `proof:crossrepo-asks:bh` (`scripts/proof-crossrepo-asks-bh.mjs`) with a SOURCE-DOC AUTO-SCAN, NOT a hand-list count: it derives the expected set from `consumer-constellation.md`'s By-name ask ledger (row-filter `lands == 5.0.0-BH-B7 AND is-a-by-name-migration-ask` → {aurora, timeline, ring}) ∪ the bbnf id auto-scanned from `bg-build-map §G7 U1` = exactly 4, and asserts the roster covers all four. The `>=3` scan-floor + `>=4` covered-floor fail LOUD on source-doc drift (no vacuous-green path). Row-filter EXCLUDES the 4.4.0-line rows (glass-key-fill, GU-DOCK-STATUSDOT-PROPS) + the WS2 `drop-overflow-scroll` consume.
- The bbnf row's PRIMARY born-RED witness is `proof:retired-token-consumers` (BG-owned, wired into `BG.W-CLOSEFIX-9SITE` per bg-build-map:1276-1284); `proof:crossrepo-asks:bh` only asserts the roster RECORDS the id (the two never re-implement each other).

**EXACT edits:**

| # | Tree / File | Edit |
|---|---|---|
| C2-a | BH · `docs/tranches/BH/coordination/asks-and-consumes.md` | Complete the `## Asks` table from 2 → 4 rows: row 3 = atlas `migrate-ring-to-focus-ring-color` (`--ring` rename, 12 bare / 11 files; witness `proof:crossrepo-asks:bh`), row 4 = bbnf `bbnf-glass-blur-dock-retune-no-op` (token-retire; witness `proof:retired-token-consumers`, NOT crossrepo-asks:bh). Add a `Lands` + `Primary witness` column; reconcile the Census section (bbnf carries the row-4 token-retire ask). |
| C2-b | BH · `PLAN.md:106` (W-api-ask-roster / B7 row) | Change "exactly 2 by-name asks" → the **4-row roster** (rows 1-4). Change the Gate line from `proof:crossrepo-asks` (BB-vacuous) → `proof:crossrepo-asks:bh` GREEN (source-doc auto-scan) + name `proof:retired-token-consumers` (BG-owned) as the bbnf row's born-RED witness. |
| C2-c | BH · `PLAN.md:134` | Change "the exact **2-ask** B7 roster" → "the exact **4-ask** B7 roster" (the second stale-count site the C2 crit flagged; the `grep -c "2-ask"` completeness check must return 0 post-fold). |
| C2-d | repo-root | Land `scripts/proof-crossrepo-asks-bh.mjs` (the auto-scan gate) + register in `package.json` scripts + `scripts/gates.mjs` tags `["local","ci","release"]` (mirrors the BB `proof:crossrepo-asks`; device-free/instant so `local` is harmless). Add `proof:crossrepo-asks:bh` to the B7 wave's Gate set — LANDS as part of the existing `W-api-ask-roster` wave (no new B7 wave). |
| C2-e | BH · `PLAN.md:120-121` (the census disposition notes) | Confirm the row-filter's EXCLUDES are recorded: the 4.4.0-line GU-1/GU-3-ASK-A + the WS2 no-engine `drop-overflow-scroll` consume derive-OUT (not over-demanded). |

**Residual (ACCEPTED, named owner):** the bbnf witness `proof:retired-token-consumers` is a BG deliverable minted by `BG.W-CLOSEFIX-9SITE` (bg-build-map:1276 says so; absent on disk at this HEAD). The BH roster's row-4 born-RED enforcement is only real once that BG gate lands — the BH side is cross-reference-only (write-fence). **Owner: track the BG-execution landing of `proof:retired-token-consumers`; no BH edit.**

---

### C3 — B5c 16-reader re-home vs BG's amended count [MED · RESOLVED-IN-DIRECTION]

**Disk-confirmed:** census = 16 hard fs-readers (grep over `scripts/proof-*.mjs`); `proof-handmark:249 rd("CLAUDE.md")` is the 16th; crit-T5's "12" is a grading error (dropped the 4 `read()`-form readers). `AMENDED-COHERENCE-PLAN.md:214-216` ALREADY owns the BH-doc census edits (the 16-pin + the DE-BLINDED C2 detector + the interleave §2/§4 edits + the `PLAN.md:93` gate-form swap). MR-5 already re-anchored the B4f gate at `bh-interleave-map:151-152`.

**LOCKED decision:** RELABEL T3's A1/A2 as **DEFER-to-BG-fold** (verify-and-cross-reference, NOT re-author — the write-fence forbids a BH pass writing the BG-tree interleave anyway); KEEP T3's A3 + A4 as net-new BH-authored value.

**EXACT edits:**

| # | Tree / File | Edit |
|---|---|---|
| C3-a | BH · `PLAN.md` (B5c region) — A1/A2 relabel | Record a one-line cross-reference that the interleave §2/§4 + `PLAN.md:93` census edits are OWNED by `AMENDED-COHERENCE-PLAN.md:214-215` (MR-5-anchored at `:151-152`), 16-pin AGREE both sides. No re-author. |
| C3-b | BH · `PLAN.md:42` + the §1 taxonomy — A3 (net-new, KEEP) | Add the numeral-disambiguation: "PLAN:42's `15 BG specs append` is a WRITE-into-CLAUDE count, DISJOINT from the **16**-hard-reader census — the two are different numbers, keep them from colliding." |
| C3-c | BH · `PLAN.md:16` (§1 taxonomy) — A4 (net-new, KEEP) | Correct "they ENOENT-break" → "of the 16 CLAUDE-readers, exactly **2 BARE-`readFileSync` CRASH** (structure-sync:74 ci + doc-consistency:197 release), **14 guarded-helper readers silently false-fail** (return `""`/null). PLAN:16's original phrasing described only the 2 crashers." |
| C3-d | BG · `bh-interleave-map.md §2/§4` — **DEFER to AMENDED-COHERENCE-PLAN:214 fold** | Already enrolled by the BG-side fold owner; recorded here for the both-sides-agree rule. No BH write. |

**Residual: NONE.** C3 is fully resolved (A1/A2 deferred to a confirmed owner, A3/A4 authored).

---

### C4 — L15 budget-rebaseline one-sided fold + single-writer symmetry [MED]

**Disk-confirmed contradiction:** `bg-build-map.md:1184` declares `BH-B2.1-swap` the "FINAL pre-cut `package.json` single-writer"; `EXECUTION-PROGRESS.md:319` (row 19.1, `BG.W-CUT`) lists a value.js peer-floor EDIT `^1.0.0→^1.1.1` firing AT the cut — a SECOND `package.json` writer past the declared single-writer AND past the `--run ship` gate. `bg-build-map:1236-1238` documents the value floor is `^1.1.1` (not `^1.2.0`): `wcagContrastRatio` first ships value.js 1.1.1 = npm-latest, `^1.2.0` would EXCLUDE latest + red `proof:peer-conformance`'s admits-latest clause, and kf's transitive `^1.2.0` ⊆ `^1.1.1`. perfect-freehand is NOT a third writer (drops at WS9, before B2.1-swap at WS12 — subsumed by B2.1-swap's regen).

**LOCKED decision — ABSORB (preferred over downgrade):** fold the value.js peer-floor edit into the `BH-B2.1-swap` single-writer block so B2.1-swap is the LITERAL sole `package.json` writer between WS9 (pf-drop) and `BG.W-CUT`, symmetric with the kf bump. Re-annotate `EXEC row 19.1` (`BG.W-CUT`) to ASSERT the final floors (a verified precondition), NOT to perform a fresh `package.json` write. Downgrade rejected: it preserves a second writer past `--run ship`.

**THREE precision corrections the C4-spec under-weighted (fold-obligations, NOT cosmetic):**
1. **Drop the imprecise "peer-conformance GREEN over `^1.1.1`, not `^1.0.0`" claim.** Verified on disk: `proof:peer-conformance` greens over BOTH `^1.0.0` and `^1.1.1` (both admit npm-latest 1.1.1); it is a NEGATIVE fence (reds only on `^1.2.0`, which excludes latest). The floor-lift's ACTUAL binding witness is `proof:field-aurora-aa`'s hard-import of `wcagContrastRatio` (first ships value.js 1.1.1, owned by BG row 12.5 `BG.W-GATE-FIELD-AURORA`). Name field-aurora-aa as the floor-lift witness; re-cast peer-conformance as the negative fence.
2. **The `bg-build-map:717` disambiguation is LOAD-BEARING, not "4% fold wording".** Line 717 lists `package.json (value.js ^1.1.1)` in `BG.W-GATE-FIELD-AURORA`'s Files, and that wave is BG/WS7 (precedes WS12). Until the fold rewords :717 to name the GATE FILE + spike (dropping `package.json`), the single-writer claim has a WS7-axis hole. The absorb resolution DEPENDS on this reword landing — a hard fold-obligation.
3. **The value floor must land ONCE at B2.1-swap.** Both `EXEC:319` (BG.W-CUT) AND `bg-build-map:1259-1263` re-annotate to assert-true. Verify no third executable home survives (the BG/WS7-shared-tag means the value edit currently appears in row 12.5 Files AND row 19.1 consumes — both must resolve, not just row 19.1).

**EXACT edits:**

| # | Tree / File | Edit |
|---|---|---|
| C4-a | BH · `PLAN.md:68` (B2.1-swap) | ADD to the absorbed-obligations set (beside the C1 kf bump): "bump the value.js peer `@mkbabb/value.js` `^1.0.0 → ^1.1.1` — the value-floor LIFT to the `wcagContrastRatio`-bearing 1.1.1 = npm-latest; `^1.1.1` admits latest AND contains kf's transitive `^1.2.0` ⊆ `^1.1.1`. This is the SECOND peer-floor edit riding the single-writer pass (with the kf bump) — B2.1-swap is thereby the LITERAL sole `package.json` writer between WS9's pf-drop and `BG.W-CUT`. The floor-lift's binding witness is `proof:field-aurora-aa`'s hard-import of `wcagContrastRatio` (BG-owned row 12.5), NOT `proof:peer-conformance` (a NEGATIVE fence that greens over both `^1.0.0` and `^1.1.1`; reds only on `^1.2.0`). The gate-file value-PIN reconcile (`proof-peer-conformance.mjs:41/46` `1.2.0→1.1.1`) is DISTINCT + BG-owned (`BG.W-GATE-FIELD-AURORA`) — the floor-EDIT is BH's, the gate-LITERAL is BG's (the T4/T2 seam)." |
| C4-b | BG · `EXECUTION-PROGRESS.md:319` (row 19.1, `BG.W-CUT`) — **DEFER to BG-side fold** | RE-ANNOTATE the value line: "mechanical CONSUMEs are ASSERTED-TRUE here (the `--run ship` battery re-confirms them; NONE is a `package.json` edit at this wave): value.js peer floor is `^1.1.1` (LANDED at `BH-B2.1-swap`, NOT re-written here) · kf peer floor `^5.1.0` (LANDED at B2.1-swap) · perfect-freehand dropped (at WS9, NOT here). B2.1-swap is the FINAL `package.json` writer; `BG.W-CUT` only fires the tag over the already-final surface." |
| C4-c | BG · `bg-build-map.md:1182-1208` (G4 single-writer block) — **DEFER** | ADD value.js `^1.0.0→^1.1.1` to the enumerated single-writer adds (currently three: kf-bump + L15-budget + ci.yml → four). Makes `:1184`'s "FINAL single-writer" complete. |
| C4-d | BG · `bg-build-map.md:1259-1263` (Mechanical CONSUMEs block) — **DEFER** | Re-annotate the value line to "asserted-true (LANDED at B2.1-swap), NOT a cut-time `package.json` edit" (mirror C4-b). Keep the kf line + the pf-`(WS9)` line as-is. |
| C4-e | BG · `bg-build-map.md:707/717` (`BG.W-GATE-FIELD-AURORA` Files) — **DEFER · LOAD-BEARING** | RE-WORD `:717`'s Files entry to name the GATE FILE + the G6 spike (dropping `package.json`), so the single-owner split is unambiguous: BH edits `package.json` (the floor), BG edits `proof-peer-conformance.mjs` (the `1.2.0→1.1.1` gate-literal pin). This closes the WS7-axis hole; the absorb resolution DEPENDS on it. |

**Residual (ACCEPTED, named owner):** C4-b/c/d/e are BG-tree; they route through the BG-side fold. C4-e is load-bearing (not cosmetic) — flag it as a hard fold-obligation. **Owner: the BG-side fold at develop.**

---

### C5 — 2 ENOENT-crashers + the B5c→B4f HARD edge + the C-HOMES content-audit [MED]

**Disk-confirmed:** `proof-doc-consistency.mjs:197` bare `readFileSync(CLAUDE_MD)` is RELEASE-tagged (gates.mjs:409 `["local","ci","release"]`) — it THROWS ENOENT mid-`--run full`, aborting `git tag` with a raw stack trace (NOT a red gate). `structure-sync:74` is the second (ci) bare crasher. `auditCanonHomes()` (canon-doc.mjs:84) is `existsSync`-ONLY — it greens over the 8 live `> SKELETON (BH.B4b-skeleton)` scaffolds incl. `dependencies.md` (the C5-B2 close-class lie). The C5 spike BUILT + RAN the fixes device-free (born-RED→GREEN proven).

**LOCKED decision:** (a) re-home doc-consistency's `run()` off the bare `readFileSync(CLAUDE.md)` onto guarded `readCanon` of `structure.md` (dir arm) + `dependencies.md` (dep arm) — a missing home is a clean RED violation, never an ENOENT crash. (b) Mint `proof:claude-deletable` (born-RED) making the B5c→B4f edge HARD (C-CRASH: zero bare CLAUDE readers over all 6 alias forms · C-RGZERO: readFileSync-site count 0 · C-HOMES: `auditCanonHomes("content") == []`). (c) Upgrade `auditCanonHomes(mode="content")` from existsSync-only to content-completeness (the verbatim SKELETON-marker discriminator + a 200-char body floor) so no arm re-homes onto the empty dependencies.md scaffold.

**FIVE fold-obligations (the C5 crit's must-resolves, all confirmed on disk):**
1. **The dep-TABLE requirement (NEW friction-class seam — confirmed).** C-HOMES greens `dependencies.md` the moment its SKELETON marker is stripped + body clears 200 chars, but doc-consistency's dep-citation arm (`citedDeps`, canon-doc.mjs:120) parses only a markdown TABLE (`| \`pkg\` ^x | … |` rows). A B4b-content authoring dependency PROSE (marker stripped, >200 chars, NO table) greens C-HOMES WHILE the dep-rot check parses 0 deps and stays permanently vacuous. **Develop MUST require B4b-content to land the dependency TABLE form specifically** (or give `citedDeps` a bare-name fallback), else the dep-rot gate the re-home preserves silently asserts nothing post-B4b-content.
2. **Wire the self-test arm.** The C5 spike's "4 self-test bites pass" is a one-shot manual run, not a durable in-gate lock. `proof-claude-deletable.mjs` carries NO `--self-test` arm and there is no `__tests__` spec. **Develop MUST add the in-gate `--self-test` arm** (the house `born-RED + N-bite self-test` bar — the sibling `proof-close-battery-parity.mjs` carries 8 self-test refs).
3. **Register the gate.** `proof:claude-deletable` is NOT in `gates.mjs`/`package.json` at HEAD. Until registered `["local","ci"]` + `ci.yml` re-emit, it never runs in `--run full` — the edge it enforces is INERT. Develop MUST land the registration.
4. **Re-home the companion readers in the SAME B5c pass.** The spike scoped only doc-consistency:197 + the gate + the content-audit. `proof:claude-deletable` flags all 15 born-RED (structure-sync:74 + the 14 guarded-alias readers), making the re-home non-optional — but B4f cannot proceed until B5c re-homes structure-sync (ci bare crasher) + every safeRead/rd/read/readRel reader. The accent-tone dual-arm (F7) is the trickiest: DROP the CLAUDE arm + RE-POINT the `src/subpaths/selectable-chip.ts` arm onto `src/components/custom/selectable-chip/index.ts` (B2.1-swap DELETES `src/subpaths/`).
5. **Reconcile the census-count drift.** COHERENCE §5 pins 16 readers; the gate's comment-stripped count is 15; a raw grep on the post-fix tree returns 17 files. Reconcile 15-gate / 16-census / 17-raw-grep in PLAN §1-taxonomy so a verbatim re-read is not misdirected.

**EXACT edits:**

| # | Tree / File | Edit |
|---|---|---|
| C5-a | repo-root · `scripts/lib/canon-doc.mjs` | Add `SKELETON_MARKER` + `canonHomeState(key)`; upgrade `auditCanonHomes(mode="content")` (default content-complete via the marker + 200-char floor; `"present"` = old existsSync floor, back-compat for the B4b-skeleton band gate PLAN:88). |
| C5-b | repo-root · `scripts/proof-doc-consistency.mjs` | DELETE the bare `readFileSync(CLAUDE_MD)` at :197; re-home `run()` onto guarded `readCanon` of `structure`+`dependencies`; add `citedCustomDirsFromStructure`/`citedDepsFromCanon`. Preserve the old ASCII-tree pure detectors byte-unchanged (the 6-test suite passes). |
| C5-c | repo-root · `scripts/proof-claude-deletable.mjs` (NEW) | The born-RED gate (C-CRASH/C-RGZERO/C-HOMES) + **the in-gate `--self-test` arm (fold-obligation 2)**. Register in `gates.mjs` + `package.json` tags `["local","ci"]` + `ci.yml` re-emit (fold-obligation 3). |
| C5-d | BH · `PLAN.md:99` (B5c row) | Name doc-consistency:197 as the SECOND (RELEASE) crasher re-homed FIRST; name `proof:claude-deletable` as B5c-minted (born-RED-at-HEAD→GREEN-at-B5c); state the guarded `readCanon(...,"strict")` catches a missing home as a clean RED. **ADD fold-obligation 4:** structure-sync:74 + the 14 guarded-alias readers re-home in the SAME B5c pass; the accent-tone dual-arm DROPS the CLAUDE arm + RE-POINTS the subpath arm onto `src/components/custom/selectable-chip/index.ts`. |
| C5-e | BH · `PLAN.md:93` (B4f row) | Change the gate line from the bare-rg form to **`proof:claude-deletable` GREEN** (C-CRASH + C-RGZERO + C-HOMES) as the hard precondition (this is the C3C6 item-b gate-FORM swap — see C6-item-b below; the bare `rg -l 'CLAUDE.md' = 0` form CANNOT pass at HEAD). |
| C5-f | BH · `PLAN.md:89` (B4b-content) — **fold-obligation 1** | The "content-complete not skeleton-present" intent is REALIZED by `auditCanonHomes("content")`. **ADD:** B4b-content MUST land the `dependencies.md` **dependency TABLE form** (`\| \`pkg\` ^x \| role \|` rows), not prose-only — else the `citedDeps` dep-rot arm parses 0 deps and asserts nothing (the doc-rot gate the re-home preserves goes silently vacuous). |
| C5-g | BH · `PLAN.md:16` (§1 taxonomy) — **fold-obligation 5** | Reconcile the census counts: 16-reader hard census (the load-bearing number) / the gate's 15 comment-stripped crash-site count / 17 raw-grep files (doc-consistency + claude-deletable both add comment/regex CLAUDE mentions the raw grep counts). State the 16-census is binding; the 15/17 are gate-internal + raw-grep artifacts, not the census. |
| C5-h | BH · `PLAN.md:48` (§3 edge) | Mark `B5c → B4f` HARD (a CUT-BATTERY CRASH edge, gate-enforced by born-RED `proof:claude-deletable`). |
| C5-i | BG · `bh-interleave-map.md` (B5c row :72 + §3.5 :126-128 + §4 :146) — **DEFER to BG-side fold** | Name doc-consistency (RELEASE crasher) → `readCanon(structure)+readCanon(dependencies)`; mark the edge HARD/CRASH-severity + gate-enforced by born-RED `proof:claude-deletable`. |

**Residual (ACCEPTED, named owner):** the dep-citation arm greens vacuously at HEAD (stub dependencies.md has no table) — CORRECT-until-B4b-content, backstopped by C-HOMES + fold-obligation 1's TABLE requirement. **Owner: B4b-content lands the dep TABLE; B5c re-homes the 15 companion readers.** BG-tree edits (C5-i) route through the BG-side fold.

---

### C6 — stale-target references + the "+2 siri" fix set [LOW · RESOLVED-IN-DIRECTION]

**Disk-confirmed:** the complete `"+2 siri"` LITERAL-string census is FIVE sites — `PLAN.md:68`, `PLAN.md:116`, `bh-interleave-map.md:40`, `bh-interleave-map.md:101` (the T6-missed 5th, the `vite.library.ts WS6` row), `bh-interleave-map.md:168`. siri-island = PUBLISHED (bg-build-map:396 lists `src/subpaths/siri-island.ts`); siri-waveform = INTERNAL (:402, no subpaths line) → the correct count is **+1 published `/siri-island`**, not +2, and `/api` rises ABOVE 203. `bh-interleave-map:112` is count-NEUTRAL ("WS6 siri", no literal "+2 siri" — verified) and needs NO count edit.

**LOCKED decisions (three items):**

**Item (a) — C3 DEFER relabel** — covered in C3 above (A1/A2 defer, A3/A4 keep). No additional edit.

**Item (b) — the PLAN.md:93 B4f gate FORM swap (the C3C6 crit's load-bearing correction).** The C3C6 spec mis-scoped item-b as a `:186→:151` line-anchor correction, but PLAN.md carries NO `:186`/`:151` numeral on disk (the `:186` misattribution lives only in T3's proto). PLAN.md:93 is already numeral-free/content-anchored; its ONLY BH-tree defect is the bare-rg gate FORM. `AMENDED-COHERENCE-PLAN:214-215` + `:196` are unambiguous: the develop pass swaps PLAN:93's gate from `rg -l 'CLAUDE\.md' scripts/proof-*.mjs = 0` → `proof:claude-deletable` GREEN (the bare-rg form CANNOT pass at HEAD; leaving it means the BH and BG sides DISAGREE post-fold). **This is edit C5-e above** (the same PLAN:93 line). The `:151-152` interleave anchor is DEFER-to-BG-fold (MR-5-owned).

**Item (c) — the "+2 siri" 5-site fix set.**

**EXACT edits:**

| # | Tree / File | Edit |
|---|---|---|
| C6-a (item c) | BH · `PLAN.md:68` + `PLAN.md:116` | Rewrite both `"+2 siri"` → `"+1 /siri-island subpath (siri-waveform INTERNAL — a WebGL2 leaf composed by SiriIsland; /api rises above 203)"`. |
| C6-b (item c) | BG · `bh-interleave-map.md:40` + `:101` + `:168` — **DEFER to BG-side fold** | The three interleave `"+2 siri"` sites rewrite to `"+1 /siri-island"`; at the `:101` tabular row the cell reads `WS6 (+1 /siri-island published subpath entry)`. `:101` is the ADDED 5th site the proto missed. |
| C6-c (item b) | BH · `PLAN.md:93` | The B4f gate-FORM swap → `proof:claude-deletable` GREEN. **Same line as C5-e** (do not double-apply). |
| C6-d | BH · `PLAN.md:62` — value-floor stale literal | Correct the stale `→ ^1.2.0` to the BINDING cut floor `^1.1.1` (`^1.2.0 ⊆ ^1.1.1`, and a `^1.2.0` peer excludes npm-latest 1.1.1 + reds `proof:peer-conformance`). Note: the destraddle at B1-W2 landed `^1.0.0` on disk (package.json:1080 is a single `^1.0.0`, NOT the `^0.13.0 \|\| ^1.0.0` straddle — the straddle is already gone); the B2.1-swap floor-LIFT to `^1.1.1` is the C4-owned edit. Confirm PLAN:62's verb matches disk reality (do not describe a destraddle that already happened). |
| C6-e | BH · `PLAN.md:63` — B1-W3 stale | Mark B1-W3 (snap-excise) LANDED `ba23c086` + point the "all met" gloss at the C1 pairing-debt (the bump→B2.1-swap, the gate→BG.W-GATE-FIELD-AURORA). Do NOT re-author the C1 obligation here — only NAME the debt. |
| C6-f | BH · verify — the completeness check | The `:112` reconcile: state `bh-interleave-map:112` is count-NEUTRAL ("WS6 siri", no literal "+2 siri") so it needs no count edit — the COHERENCE §6 DISAGREE row listing 112 is a scope over-list; the binding literal-string sites are the FIVE (40/101/168 + PLAN 68/116). Post-joint-fold, `grep -rn "+2 siri"` over both trees must return 0. |

**Residual: NONE.** C6 items (a)+(b)+(c) resolved; the BG-tree "+2 siri" sites (C6-b) route through the BG-side fold; the `:112` scope reconcile is authored.

---

### PASS-2 loose ends (carve-path + T1 artifact) — CONFIRMED CLOSED

- **Carousel-worm carve path: CONFIRMED CORRECT** at HEAD `eaf2c172` (re-verified: CarouselContent.vue 375L → useCarouselWorm.ts 267L; PagerDots.vue 433L → usePagerWorm.ts 142L; useBloomUp.ts 449L → bloomUpField.ts 87L; all <500; RATCHET_BASELINES drained to ∅; matches proof-no-god-module.mjs:143-171). The Pass-1 "NOT at proto's cited paths" flag was a transcription artifact — proto-T6 cited them correctly. B2.4a marks LANDED.
- **T1 gate-spike artifact (`pass-1-proto-t1-kf-peer-floor-gate.md`): GENUINELY ABSENT** (glob = 0 hits). crit-T1 O1's `[BLOCKING for a coherence pass]` tag is DOWNGRADED to **ACCEPTED GAP** — justified because the C1 mechanics are re-verified this pass via a live-disk trace (package.json:1078 `^5.0.0` + useDragMorph.ts:325 `snap:` + no floor-vs-API clause in proof-peer-conformance.mjs); the missing spike is unpersisted process trace, not lost work. **The develop-fold must record this BLOCKING→accepted-gap reclassification explicitly in COHERENCE.md** so a future audit does not read a silently-dropped BLOCKING must-resolve.

**EXACT edits:**

| # | Tree / File | Edit |
|---|---|---|
| PE-a | BH · `PLAN.md` (B2.4a carve region) | Mark B2.4a carves LANDED (all <500, RATCHET ∅); the carve-path re-verify is CLOSED. |
| PE-b | BH · `COHERENCE.md §9-6` | Flip the carve-path re-verify half CONFIRMED-LANDED (375/267 etc.); the C6 "+2 siri :101" half is owned by C6-b above. |
| PE-c | BH · `COHERENCE.md` (C1 residual note) | Record crit-T1 O1's BLOCKING→ACCEPTED-GAP reclassification explicitly, justified by the equivalent live-disk C1 trace. |

---

## §2 The develop-fold action list (mechanical, ordered)

**BH-tree (applied directly at develop):**
1. `docs/tranches/BH/coordination/asks-and-consumes.md` — roster 2 → 4 rows (C2-a).
2. `PLAN.md` — C1-a (`:68` kf bump) · C2-b (`:106` 4-row + gate re-point) · C2-c (`:134` 4-ask) · C3-a/b/c (`:42`/`:16` A3/A4) · C4-a (`:68` value bump + witness precision) · C5-d/e/f/g/h (`:99`/`:93`/`:89`/`:16`/`:48`) · C6-a (`:68`+`:116` +1 siri) · C6-c (`:93` gate-form, same line as C5-e — apply ONCE) · C6-d (`:62` value literal) · C6-e (`:63` B1-W3) · PE-a (B2.4a LANDED).
3. `COHERENCE.md` — flip C1→OPEN-residual-authored, C2/C3/C4/C5/C6 RESOLVED, §9-6 carve CONFIRMED (PE-b), C1 O1 reclassification (PE-c), overall 90→92%, develop-ready TRUE, HEAD stamp → `eaf2c172`.

**repo-root (applied directly at develop):**
4. `scripts/proof-crossrepo-asks-bh.mjs` (NEW, C2-d) + `scripts/lib/canon-doc.mjs` (C5-a) + `scripts/proof-doc-consistency.mjs` (C5-b) + `scripts/proof-claude-deletable.mjs` (NEW + `--self-test`, C5-c) + register all in `package.json` + `scripts/gates.mjs` + `ci.yml` re-emit.

**BG-tree (route through the BG-side fold owner `AMENDED-COHERENCE-PLAN.md:214-215` — recorded, NOT written by a BH pass):**
5. `bh-interleave-map.md` — C1-b (`:40` reciprocal) · C3-d (§2/§4, already enrolled) · C5-i (`:72`/`:126-128`/`:146`) · C6-b (`:40`/`:101`/`:168` +1 siri).
6. `EXECUTION-PROGRESS.md` — C1-c (`:239` row 12.5 kf clause) · C1-d + C4-a-mirror (`:303` row 18.1 wave-name widen) · C4-b (`:319` row 19.1 assert-not-edit).
7. `bg-build-map.md` — C4-c (`:1182-1208` value add) · C4-d (`:1259-1263` assert) · **C4-e (`:707/717` gate-file reword — LOAD-BEARING hard obligation)**.

---

## §3 Convergence + readiness

**Overall convergence: 92%.** developReady: **YES.**

Every cluster is RESOLVED or ACCEPTED-RESIDUAL with a named owner:
- **C1** RESOLVED (three-sided fold authored; BG-tree sides deferred to a confirmed fold owner). Residual: BG-tree edges → BG-side fold.
- **C2** RESOLVED (roster 4 rows + auto-scan gate built + proven born-RED→GREEN). Residual: the BG-owned `proof:retired-token-consumers` witness lands in BG execution (tracked, not blocking the BH fold).
- **C3** RESOLVED (A1/A2 deferred to confirmed owner, A3/A4 authored). No residual.
- **C4** RESOLVED via ABSORB (single-writer symmetry + the three precision corrections — peer-conformance is a negative fence not the floor-witness, `:717` reword is load-bearing, value floor lands once). Residual: BG-tree edges (incl. the load-bearing `:717` reword) → BG-side fold.
- **C5** RESOLVED (fixes built + run device-free; the five fold-obligations enumerated — the dep-TABLE seam, the self-test wiring, the gate registration, the companion-reader re-homes, the census reconcile). Residual: B4b-content lands the dep TABLE; B5c re-homes the 15 readers.
- **C6** RESOLVED (five-site "+2 siri" census incl. `:101`; the PLAN:93 gate-FORM swap named as the load-bearing item-b; `:112` count-neutral reconcile; the value/B1-W3 literals). No residual.
- **PASS-2 loose ends** CLOSED (carve path confirmed; T1 artifact accepted-gap with the reclassification recorded).

The 8% residual is: (a) the fold-agent's mechanical application of the enumerated BH-tree edits, (b) the BG-side fold applying the BG-tree edges (routed through `AMENDED-COHERENCE-PLAN:214-215`), and (c) two BG-execution dependencies (`proof:retired-token-consumers` for C2, `proof:field-aurora-aa`+`proof:peer-conformance` kf-clause for C1/C4) that land during BG execution and are cross-referenced not authored here. None is a content or feasibility gap.

**nextFocus: FOLD INTO THE TRANCHE SET.**

siblings-intact exit 0 (before + after). Only files written this pass: this artifact + the COHERENCE.md update.

---

**Change log.** PASS 2 DEVELOP (2026-06-30, HEAD `eaf2c172`): authored the amended plan. Six clusters resolved; the C4 three precision corrections + the C5 five fold-obligations (incl. the NEW dep-TABLE friction-class seam) + the C6 PLAN:93 gate-FORM swap folded in; the write-fence split (BH-tree direct / BG-tree deferred to `AMENDED-COHERENCE-PLAN:214-215`) recorded per cluster. Overall 90→92%, develop-ready. siblings-intact exit 0.
