# BH Coherence Re-Spec — PASS 1 — Prototype T3 (mode: spec)

**Issue.** `proof:claude-deletable` C2 detector-breadth spec against the CORRECT 16 (SEED §3-gap-4; COHERENCE §2 C3 [MED] + C4).

**Verdict: FEASIBLE.** The fix is a bounded plan-text + gate-spec amendment across BOTH tranche docs. No feasibility spike, no restart. The census ground truth is **16 hard readers** (verified fresh on disk this pass); the corrected C2 detector is a receiver-scoped alias-enumerated scan that provably flags every one of the 16 (incl. handmark's `rd`) and provably does NOT flag the one dead-const false-positive. The two documented number axes (reader-census **16** vs BG-append **15**) are kept disjoint.

---

## §0 On-disk ground truth (this pass — the census re-verified, not re-derived from prose)

`node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (before AND after; only file written is this report).

**The 16 hard CLAUDE.md content-readers** (each READS the file content AND asserts a clause on it — verified by inspecting every `scripts/proof-*.mjs` that names the `CLAUDE.md` string, then filtering to those that pass the content to a reader and assert):

| # | Gate | Line | Read helper | ENOENT behaviour | Tag |
|---|---|---|---|---|---|
| 1 | `proof-claude-structure-sync.mjs` | :74 | **bare `readFileSync(CLAUDE_MD,…)`** | **CRASH (throw)** | ci |
| 2 | `proof-doc-consistency.mjs` | :197 | **bare `readFileSync(CLAUDE_MD,…)`** | **CRASH (throw)** | release |
| 3 | `proof-handmark.mjs` | :249 | `rd("CLAUDE.md")` (`:56`, guarded `existsSync?…:''`) | silent false-fail (W6) | local |
| 4 | `proof-close-battery-parity.mjs` | :149 | `read("CLAUDE.md") ?? ""` | silent false-fail (clause 4) | local |
| 5 | `proof-on-glass-fg.mjs` | :399 | `read("CLAUDE.md")` | silent false-fail (W4) | — |
| 6 | `proof-doc-override-idiom.mjs` | :143/166 (via `read`, `:54`) | `read(rel)` byte-parity vs README | silent false-fail (W3/W4) | local, ci |
| 7 | `proof-readme-meta-clean.mjs` | :221 (via `read`, `:18`) | `read(rel)` (guarded `existsSync?…:null`) | silent false-fail | — |
| 8 | `proof-accent-tone.mjs` | :440 | `safeRead(p.CLAUDE_MD)` (`:111`) | silent false-fail (WARN-degrade) | — |
| 9 | `proof-dock-rail-realize.mjs` | :258 | `readRel(CLAUDE_MD)` (`:—`) | silent false-fail (R5) | — |
| 10 | `proof-dock-unify.mjs` | :656 | `safeRead(CLAUDE_MD)` | silent false-fail (F5) | — |
| 11 | `proof-dropdown-fix.mjs` | :419 | `safeRead(P.CLAUDE_MD)` | silent false-fail (D3) | — |
| 12 | `proof-easing-primitive.mjs` | :365 | `safeRead(P.CLAUDE_MD)` | silent false-fail (W5) | — |
| 13 | `proof-phase-palette.mjs` | :335 | `safeRead(resolve(ROOT,"CLAUDE.md"))` | silent false-fail (W4) | — |
| 14 | `proof-spa-view.mjs` | :299 | `safeRead(P.CLAUDE_MD)` | silent false-fail (W5) | — |
| 15 | `proof-split-chars.mjs` | :447 | `safeRead(p.CLAUDE_MD)` | silent false-fail (SP6) | — |
| 16 | `proof-surface-axis.mjs` | :520 | `safeRead(P.CLAUDE_MD)` | silent false-fail (W7) | — |

**Distinct read-helper aliases in play (5):** `readFileSync` (bare, #1/#2), `rd` (#3), `read` (#4/#5/#6/#7), `safeRead` (#8/#10/#11/#12/#13/#14/#15/#16), `readRel` (#9). The shared `scripts/lib/canon-doc.mjs` `readCanon(key)` is the future 6th (B5c re-points the 16 THROUGH it — the detector must count it once it lands).

**The confirmed C2 false-positive to EXCLUDE:** `proof-expandable-part.mjs:66` defines `CLAUDE_MD: resolve(ROOT,"CLAUDE.md")` but NEVER passes it to a reader (verified: no `(read|readFileSync|safeRead|rd|readRel)\([^)]*CLAUDE_MD` in the file) — a dead constant. C2 must not flag it.

**The two ENOENT taxonomies (CORRECTED — both prior counts understate):**
- **2 of 16 CRASH** (bare `readFileSync(CLAUDE_MD)`: #1 structure-sync ci, #2 doc-consistency RELEASE — #2 crashes the `--run full` cut battery mid-run, no JSON artifact, the worst mode).
- **14 of 16 SILENTLY FALSE-FAIL** — their guarded helper returns `''`/`null` on absent, so the CLAUDE-asserting clause evaluates false and pushes a violation WITHOUT crashing (a quieter, greener-looking loss than a crash). `PLAN.md:28`'s "~16 CLAUDE-reading gates re-home" is directionally right but `PLAN.md:16`/the F3 framing that reads "they ENOENT-break on deletion" describes only the 2 crashers.

**`proof-claude-deletable.mjs` — ABSENT on disk** (the gate is unbuilt; it is specced by B4f/B5c and prototyped in `docs/tranches/BG/audit/RESPEC/pass-1-proto-P4.md` + `resolve-G5-claude-delete.md`). This is why the spec, not an implement-spike, is the right artifact: the detector's breadth must be PINNED before the gate is authored, else it inherits a stale narrow allowlist.

---

## §1 The defect precisely stated (what the prompt calls "amended-but-WRONG 15")

The prompt's premise — "BG's G6 census mis-buckets handmark:249 `rd()` as soft → 15 → if C2 is built to the 4-pattern receiver-grep, the 16th reader silently drops from the re-home roster → handmark false-fails W6 on the irreversible delete" — is **directionally correct with one on-disk refinement that MUST be recorded** so PASS 2 does not chase a phantom:

1. **The 15-count is STALE, not live-in-the-fold.** BG's `pass-3-resolve-G6.md` (the intermediate resolve doc) DOES say "the receiver-gate measures the 15 content-readers" and explains the 16th as the instrument-chassis README (a HOME, not a reader — the homes-count-vs-readers-count conflation). **But BG's own coherence audit already CORRECTED this**: `AMENDED-COHERENCE-PLAN.md:201` (MR-1) reads "re-state the census as 16, NOT 15; delete the false 'instrument-chassis README is the 16th reader' explanation," and the FOLDED `bg-build-map.md:1105-1128` carries **COHERENCE FOLD G6 MR-1** naming handmark as a VERIFIED HARD reader counted among the 16, with C2 DE-BLINDED to "flag ANY call receiving the CLAUDE.md literal/var." **So the executable BG build-map is already at 16 with handmark named.** The 15 survives only in the superseded resolve-doc prose.

2. **The LIVE, un-fixed defect is on the BH side + in the detector-spec breadth, NOT the BG count.** Two concrete on-disk holes remain:
   - **`BH/PLAN.md:93` (B4f) + `bh-interleave-map.md:186` define the delete-gate as the bare `rg -l 'CLAUDE\.md' scripts/proof-*.mjs = 0`** — the exact naive string-grep form BG's G6 fold explicitly REJECTED ("the bare `rg -l 'CLAUDE.md' = 0` form CANNOT pass at HEAD"). A bare string-grep over 27 string-hits cannot distinguish a hard reader from a soft comment-mention; a naive "fix" (grep only `readFileSync` sites) re-narrows to a 2-of-16 view. This is the residual that would let a resumed BH execution reading ONLY the BH docs mis-build the gate.
   - **`BH/PLAN.md:99` (B5c) + `bh-interleave-map.md:72` say "16 CLAUDE-readers" but pin NEITHER the helper-alias enumeration NOR the receiver-scoped C2 form.** "16" as a bare number is exactly the kind of hand-count that drifts; without the enumerated alias set, a future author of `proof-claude-deletable.mjs` can build C2 to a narrow `{readFileSync,safeRead,readRel,rd}` allowlist that MISSES the `read()` form used by 4 of the 16 (#4/#5/#6/#7) — a live false-GREEN class inside the delete oracle.

3. **The empirical detector breadth (this pass) — where the 4-pattern grep actually fails.** I ran the narrow receiver-grep `(readFileSync|safeRead|readRel|\brd)\([^)]*CLAUDE` at HEAD. It catches **12** of the 16 — and, contra the prompt's exact wording, it DOES catch handmark's `rd("CLAUDE.md")` (`rd` is in the allowlist). The 4 it MISSES are the `read()`-alias / const-var readers: **#4 close-battery-parity `read("CLAUDE.md")`, #5 on-glass-fg `read("CLAUDE.md")`, #6 doc-override-idiom `read(rel)`, #7 readme-meta-clean `read(rel)`.** So the corrected framing is: the risk is a `read`-alias blind spot (and a future `readCanon` blind spot), and the FIX is the same either way — enumerate the alias set exhaustively rather than hand-list 4 patterns. Recording the exact miss-set (the `read()` form, not `rd`) prevents PASS 2 from "fixing" the already-caught `rd` and re-shipping the `read()` hole.

**Why this matters (the failure mode the fix prevents):** if `proof-claude-deletable.mjs` C2 is authored to a narrow allowlist, it false-GREENs while ≥1 live reader survives (#4-#7 via `read()`, or handmark via a stale 15-set) → B4f's born-RED-→-GREEN precondition oracle green-lights the irreversible `rm CLAUDE.md` while a gate still reads it → the survivor ENOENT-crashes (#2 doc-consistency, RELEASE) or silently false-fails (#3-#16) with no gate catching the drop — the exact silent-loss B4f exists to prevent, re-introduced inside its own oracle (the close-class lie).

---

## §2 The corrected approach — exact amendments (BOTH docs)

Four amendments. All are plan-text / gate-spec edits inside `docs/tranches/BH/audit/RESPEC-COHERENCE/` at PASS 1 (RECORD only); the fold applies them to `PLAN.md` + `bh-interleave-map.md` at develop-ready.

### A1 — Pin the census = 16 with handmark NAMED the 16th (kill the stale-15 re-entry)

**`BH/PLAN.md:99` (B5c row) + `bh-interleave-map.md:72` (B5c row).** Replace the bare "16 CLAUDE-readers" with the enumerated, named census (adopting the FOLDED `bg-build-map.md` MR-1 list so both sides agree post-fold):

> **B5c re-homes the 16 hard CLAUDE.md content-readers** through `canon-doc.mjs` `readCanon(key)`. The census is **16, NOT 15** — the 12 helper-caught (`structure-sync`, `doc-consistency`, `handmark` (`rd`), `accent-tone`, `dock-rail-realize`, `dock-unify`, `dropdown-fix`, `easing-primitive`, `phase-palette`, `spa-view`, `split-chars`, `surface-axis`) + the 4 `read()`-alias readers (`close-battery-parity:149`, `on-glass-fg:399`, `doc-override-idiom` byte-parity, `readme-meta-clean:221`). **`proof-handmark.mjs:249 rd("CLAUDE.md")` (`:252` asserts) is a VERIFIED HARD reader — it re-homes via `readCanon` like the other 15, NEVER a soft mention.** The instrument-chassis README is a B4b-content HOME to author (a homes-count entry), NOT a reader (the homes-count-vs-readers-count conflation — do not re-count it as the 16th).

**Verify:** the amended B5c row lists all 16 gates by name AND names handmark explicitly as a reader; grep the amended text for `handmark` returns a HARD-reader mention (not only the BG.W-HANDMARK-PERFECT build wave).

### A2 — Enumerate the C2 helper-alias set (the load-bearing detector-breadth pin)

**`BH/PLAN.md:93` (B4f gate) + `bh-interleave-map.md:186` (§5 gate line).** REPLACE the bare `rg -l 'CLAUDE\.md' scripts/proof-*.mjs = 0` gate with the receiver-scoped `proof:claude-deletable` C2 form, and PIN the alias set:

> **Gate: `proof:claude-deletable` GREEN** (C1 content-real homes ∧ C2 zero surviving hard readers ∧ C3 file-is-last-act) + the file is gone — NOT a bare string-grep. **C2 is receiver-scoped:** it flags any call whose ARGUMENT resolves to the `CLAUDE.md` path (literal `"CLAUDE.md"` OR an identifier the same file assigns `resolve(ROOT,"CLAUDE.md")` and later passes to a reader). The read-helper allowlist is **exhaustively enumerated, not a fixed 4-pattern list** — every local `readFileSync`/`readFile` AND every same-file `const <h> = (…) => …readFileSync…` helper alias (at HEAD: `rd`, `read`, `safeRead`, `readRel`) AND the shared `readCanon` from `scripts/lib/canon-doc.mjs`; operationally, C2 resolves each `scripts/proof-*.mjs`'s local one-liner read wrappers by definition-scan (a `const X = (p)=>…readFileSync…` line) rather than by a hardcoded name set, so a NOVEL alias is caught. The `proof-expandable-part.mjs:66` dead-constant (defined, never passed to a reader) is EXCLUDED. Born-RED at HEAD (16 hard reads); GREEN only at the delete commit.

**Verify:** the amended gate line (a) does NOT contain the bare-`rg -l` form as the gate condition; (b) names the alias set `{rd, read, safeRead, readRel, readCanon}` OR the definition-scan discipline; (c) names the `expandable-part:66` dead-const exclusion. Empirical backstop: the narrow `(readFileSync|safeRead|readRel|\brd)\([^)]*CLAUDE` grep at HEAD catches 12/16 and MISSES the 4 `read()`-form readers (#4-#7) — the amendment must name this miss so a future author does not re-ship it.

### A3 — Keep reader-census (16) disjoint from BG-append (15) — the numeral-collision fence

**`BH/PLAN.md:42` (Hard-collision files) + `bh-interleave-map.md:98` (the `CLAUDE.md` collision row).** Both currently read **"15 BG specs append"** — the count of BG waves that WRITE INTO CLAUDE.md. This shares an adjacent numeral with the **16-reader** census (PLAN:28/99) — the exact conflation hazard COHERENCE §2 C3 names. Amend BOTH to disambiguate the axis explicitly:

> `CLAUDE.md` — **15 BG waves APPEND** into it (WS1-WS12 + WS2/9/10/12 prose-rewrites) — the WRITE axis, DISTINCT from the **16 hard READER gates** B5c re-homes (the read axis). Keep the two counts disjoint: reader-census = 16, BG-append = 15.

**Verify:** the amended collision row for `CLAUDE.md` carries an explicit "write axis (15) ≠ read axis (16)" disambiguation; a grep of the two docs for `15` on a CLAUDE.md line resolves unambiguously to the append/write count, and every `16` resolves to the reader count.

### A4 — Correct the ENOENT taxonomy in-plan (2 crash · 14 silent-false-fail)

**`BH/PLAN.md` §1 / the F3 framing (PLAN:16-adjacent) + `bh-interleave-map.md` §4 (B4f — currently `readFileSync sites`).** The plan's "they ENOENT-break on deletion" describes only the 2 bare-`readFileSync` crashers; the other 14 silently false-fail. Amend the taxonomy note:

> Of the 16 readers, **2 CRASH on delete** (bare `readFileSync(CLAUDE_MD,…)`: `structure-sync:74` ci, `doc-consistency:197` RELEASE — the latter aborts `--run full` mid-battery, no JSON artifact). The other **14 SILENTLY FALSE-FAIL** — their guarded helper (`rd`/`read`/`safeRead`/`readRel`) returns `''`/`null` on absent, so the CLAUDE-asserting clause pushes a violation without crashing (a quieter, greener-looking loss). B5c re-homes ALL 16 through `readCanon`; the 2 crashers additionally need their bare `readFileSync` fixed FIRST (existsSync-guard or re-home) so a premature touch cannot crash the battery. This is why the **B5c → B4f edge is HARD, not advisory** (C5).

**Verify:** the amended taxonomy states "2 crash / 14 silent-false-fail" (not "~16 ENOENT-break"), names both crashers with their tags (ci / RELEASE), and preserves the B5c→B4f hard-edge rationale.

---

## §3 Cross-tranche reconciliation — both sides agree post-fold

The seed's binding rule: "BOTH sides of the interleave must agree post-fold." The reconciliation state after A1-A4:

| Axis | BG side (folded `bg-build-map.md`) | BH side (amended) | Agree? |
|---|---|---|---|
| Reader census | 16, handmark named (MR-1 :1105-1128) | 16, handmark named (A1) | ✓ |
| C2 detector | de-blinded "flag any receiver" + `read`-form self-test bite (:1116) | alias set enumerated + definition-scan + dead-const exclusion (A2) | ✓ |
| Stale-15 | corrected in build-map; survives only in superseded `pass-3-resolve-G6.md` | census pinned 16 disjoint from BG-append-15 (A1/A3) | ✓ (BH pin closes the re-entry) |
| Delete gate | `proof:claude-deletable` receiver-scoped, not bare-rg (:1124) | `proof:claude-deletable` receiver-scoped, not bare-rg (A2) | ✓ (BH B4f:93 currently bare-rg — A2 fixes) |
| ENOENT taxonomy | "2 ENOENT-crashers fixed FIRST" (:—) | 2 crash / 14 silent-false-fail (A4) | ✓ |

**One-line note for the fold (optional):** BG's superseded `pass-3-resolve-G6.md` still says "15 content-readers"; it is a read-only intermediate resolve-doc, NOT an executable artifact — no BH edit is owed there (the fence forbids writing BG's tree anyway), and the folded `bg-build-map.md` already overrides it. The BH-side pin (A1) is the durable close: it makes BH's own executable plan carry the correct 16 so a BH execution reading only BH docs cannot inherit the stale 15.

---

## §4 Feasibility verdict + PASS-2 residuals

**feasible = TRUE — the fix holds.** All four amendments are bounded plan-text / gate-spec edits with a concrete verifying check each; the census (16) and the exclusion (expandable-part:66 dead-const) are on-disk-verified this pass; the detector-breadth pin is empirically grounded (the 4-pattern grep's exact 4-reader miss is measured, not asserted). No feasibility spike, no restart, no src/demo/gate edit at PASS 1.

**PASS-2 residuals (owed to execution, not to this spec):**
1. The `proof-claude-deletable.mjs` build itself is B4f/B5c-owned (unbuilt at HEAD) — this spec pins its C2 breadth; the actual gate authorship (C1 `auditCanonHomes` + C3 last-act + the 5-6 self-test bites incl. a `read('CLAUDE.md')`-helper-form bite AND a handmark-`rd`-form bite) rides the BG-prototyped P4/G5-resolve spec, now census-reconciled to 16.
2. Confirm the shared `readCanon` (6th alias) is counted by C2's definition-scan once B5c lands the re-points (so the re-homed readers do not become a NEW blind spot — a reader that migrates from `safeRead` to `readCanon` must still be seen until CLAUDE.md is gone; after delete, `readCanon` reads `docs/canon/*`, not CLAUDE.md, so it self-clears).
3. A resumed BH execution must read the AMENDED PLAN (A1-A4), not the pre-fold rows — the fold is the mechanism that lands these into `PLAN.md`/`bh-interleave-map.md`.

**Negative findings (PASS 2 skips):** No 17th hard reader (exhaustive scan surfaced exactly 16 read-and-assert sites; the 27 string-hits include soft comment-mentions + dead-consts + the `crossrepo-asks:56` roster entry). BG's folded build-map is already at 16 (no BG-count amendment owed; the fence forbids one anyway). The instrument-chassis README is a home, not a reader (do not re-count).

siblings-intact exit 0 (after). Only file written: this report.
