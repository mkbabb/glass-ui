# BH Coherence Re-Spec — PASS 1 SYNTHESIS (agglomeration)

**Date:** 2026-06-30 · **HEAD:** `f7dd6146` (branch `tranche/BG`, BH shares it) · **siblings-intact:** exit 0 (before + after).

This agglomerates the PASS-1 research + synth (`pass-1-spec.md`, 88%) + the six prototype/critique pairs (T1–T6) into ONE reconciled position, re-verified on disk this pass. It feeds the living master `COHERENCE.md`.

---

## §0 What PASS 1 established (the convergent floor)

BH is **structurally sound and the most friction-aware infrastructure tranche in the corpus**. The band-DAG is acyclic (B4f the unique sink, every `[WSn]`/`[WS12]` tag resolves to a position-unchanged BG WS by NUMBER, insulated from G1's re-sequence). The design is not a bug-hunt. Every coherence defect is ONE class: **cross-tranche INCOMPLETE-PAIRING** — an obligation BG's just-folded coherence audit (`e550f1b0`) placed ON BH that did not propagate to BH's own executable plan (`PLAN.md` + `EXECUTION-PROGRESS.md` cursor rows). The fix for the whole dominant class is **bounded plan-text + gate-wiring amendment — zero feasibility restart** (every prototype returned FEASIBLE).

Re-verified on disk this pass (agglomeration re-check, not taken from prose):

| Fact | Disk anchor (HEAD f7dd6146) | Status |
|---|---|---|
| kf peer floor stays `^5.0.0` while `snap:` ships | `package.json:1078` peer `^5.0.0`; devDep :1116 `^5.1.0`; `useDragMorph.ts:325 snap: targetsOf().map(t=>t.center)` | **C1 LIVE** — re-confirmed |
| `proof:peer-conformance` GREEN over broken floor | no kf floor-vs-API clause in `proof-peer-conformance.mjs`; only value floor + PINNED admits-latest | **confirmed absent** |
| 16 CLAUDE hard fs-readers (not 12, not 15) | `grep -lE '(readFileSync\|safeRead\|readRel\|rd\|read\|readCanon)\([^)]*CLAUDE' scripts/proof-*.mjs` → **exactly 16 distinct files** | **census = 16, RESOLVED** |
| 2 crashers bare, 14 guarded | structure-sync:74 + doc-consistency:197 bare `readFileSync`; the other 14 use `safeRead`/`rd`/`read`/`readRel` (return `""`/null → silent false-fail) | confirmed |
| `proof:crossrepo-asks` is BB-scoped | `:43 RELAY="docs/tranches/BB/coordination/asks-and-consumes.md"`, BB-era `EXPECTED_ASKS`, `A3_COVERAGE_ANCHORS` auto-scan present | **T2 core insight confirmed** |
| 3 gates unbuilt | `proof-retired-token-consumers.mjs`, `proof-binding-sweep.mjs`, `proof-claude-deletable.mjs` all ABSENT | confirmed |
| god-module RED | `proof:no-god-module` exit 1 — ladder.css 527, shell.css 510; api/index.ts 505 baseline-grandfathered | confirmed |
| value.js floor `^1.0.0` (PLAN says `^1.2.0`) | `package.json:1080/1118` `^1.0.0`; canonical CUT floor `^1.1.1` | **C6-A1 confirmed** |
| atlas ACTION-for-BH exists | `GU-3-TRIAGE.md` ASK-B: "→ ACTION for the BH agent: add the atlas `--ring` re-point as a B7 row" (12 bare sites / 11 files) | **C2 confirmed** |
| bbnf live consumer | `~/Programming/bbnf-buddy/src/styles/preset.css:230 --glass-blur-dock: var(--glass-blur-cartoon)` | **C2 confirmed, sibling present** |
| W-GATE-FIELD-AURORA owns the kf clause | `bg-build-map.md:717-719` names `proof-peer-conformance.mjs` "SINGLE owner of the floor-vs-API clause: ADD kf floor ≥ 5.1.0 WHEN useDragMorph references snap:, born-RED on ^5.0.0" | **MR-4 split settled in build-map** |
| EXEC row 12.5 silent on the kf clause | row 12.5 lists proof:field-aurora-aa + value reconcile ONLY — NOT the kf clause | **crit-T1 O3 confirmed** |
| EXEC row 19.1 lists value floor edit AT the cut | "mechanical CONSUMEs fire here: value.js `^1.0.0`→`^1.1.1` · kf 5.1.0 DragOptions.snap · DROP perfect-freehand (WS9)" | **crit-T4 single-writer open confirmed** |
| interleave-map:101 fifth "+2 siri" site | `vite.library.ts` row `(+2 siri subpath entries)` | **crit-T6 A3-incomplete confirmed** |
| siri-island PUBLISHED, siri-waveform INTERNAL | build-map:396 siri-island has `src/subpaths/siri-island.ts`+`api/index.ts`; :402 siri-waveform has NO subpaths line | **C6 "+1 not +2" confirmed** |
| B2.4a carves landed <500 | usePagerWorm 142, useBloomUp 449, PagerDots 433 (all <500); `useCarouselWorm.ts`/`CarouselContent.vue` NOT at proto's cited paths | **mostly confirmed; carousel-worm path = PASS-2 re-verify** |
| exempt-unrecorded orphans | fission-bridge.css 552, property-regs.css 548 | **C7 drift-3 confirmed** |

---

## §1 The T1 census dispute — DECISIVELY RESOLVED to 16

The single most-consequential disagreement across the pairs was crit-T5's **B-1 blocking defect**: it graded the reader count as "12 not 16 = 2 bare + 10 guarded." This is **WRONG**, and the agglomeration re-verify settles it:

- My grep with the correct reader-alias set (`readFileSync|safeRead|readRel|rd|read|readCanon` receiving a CLAUDE arg) over `scripts/proof-*.mjs` returns **exactly 16 distinct files** — accent-tone, claude-structure-sync, close-battery-parity, doc-consistency, doc-override-idiom, dock-rail-realize, dock-unify, dropdown-fix, easing-primitive, handmark, on-glass-fg, readme-meta-clean, phase-palette, spa-view, split-chars, surface-axis.
- crit-T5's "12" dropped the 4 `read()`-form readers (close-battery-parity:149, on-glass-fg:399, doc-override-idiom:113, readme-meta-clean:221) — the exact 4 that BG's own **EXEC-PROGRESS row 18.10 already names verbatim** ("16 CLAUDE-readers, not 12 … the 4 MISSED hard readers: close-battery-parity · doc-override-idiom · on-glass-fg · readme-meta-clean").
- Handmark's `rd("CLAUDE.md")` (proof-handmark:249) is a genuine hard reader (`const rd = (p) => existsSync(...) ? readFileSync(...) : ""` — a guarded reader that returns `""` on ENOENT → silent false-fail).

**CENSUS = 16.** BG's execution ledger (row 18.10) and the spec/proto-T3/proto-T5 are correct; crit-T5's B-1 is a grading error. The `proof:claude-deletable` C2 detector must enumerate ALL 6 reader-alias forms (`readFileSync/safeRead/readRel/rd/read/readCanon`) matched by the CLAUDE-bearing ARGUMENT, not a fixed 4-pattern whitelist. This dissolves crit-T3's Gap-1/Gap-2 too: BG's fold (row 18.10, bg-build-map G5) ALREADY owns the 16-pin + the DE-BLINDED C2 detector + the 2-crasher guard, so T3's A1/A2 are VERIFICATION-and-cross-reference of the existing BG fold, NOT independent re-authors.

---

## §2 The reconciled position per issue (all six protos FEASIBLE)

### C1 [HIGH · LIVE] kf-peer bump + floor-vs-API gate — the #1 defect

**Reconciled resolution (T1 mechanics + crit-T1 opens folded):**
- The kf floor-vs-API clause is **REAL, non-vacuous, born-RED on `^5.0.0`, flips GREEN at `^5.1.0`** (T1 proto re-ran it; agglomeration re-confirmed the disk defect). It backstops the bump.
- **Ownership is settled in the build-map (MR-4), do NOT soften it:** the CLAUSE is owned by **BG.W-GATE-FIELD-AURORA** (bg-build-map:717-719, "SINGLE owner of the floor-vs-API clause"); the BUMP is owned by **BH-B2.1-swap** (a package.json edit). crit-T1's must-resolve #3 is binding: drop the "BH echoes the gate" framing — BH echoes only the BUMP + a cross-reference NOTE to the gate.
- **THREE silent sides, not two** (crit-T1 O2/O3): (a) BH `PLAN.md:68` W-regen-swap — silent on the bump; (b) `bh-interleave-map.md:40` W-regen-swap row — silent on the bump; (c) **BG `EXECUTION-PROGRESS` row 12.5 — silent on the clause deliverable** (the clause is in bg-build-map:717 but the cursor row lists only proof:field-aurora-aa + value reconcile). The amendment must reach all three.
- **The born-RED red-window is EXPECTED** (crit-T1 must-resolve #4): the clause lands at BG-WS7 on the still-`^5.0.0` tree and reds `proof:peer-conformance` (ci+release) until BH-B2.1-swap's bump lands at WS12; the joint cut is gated on BOTH landing; a mid-window `--run release` RED is not a regression.
- **The value pin reconciles in the SAME owner-wave** (crit-T1 O5): W-GATE-FIELD-AURORA also fixes the stale `PINNED_LATEST.value=1.2.0`/`PINNED_KEYFRAMES_VALUE_DEP=^1.2.0` → `1.1.1` (same file, same owner). Do not split the kf clause and the value pin across tranches.

### C2 [HIGH] B7 consumer-ask roster — 2 of 4 rows

**Reconciled resolution (T2 + crit-T2 OPEN-1/2/3):**
- The 4 canonical rows: (1) muster→/aurora (present), (2) speedtest→/timeline (present), (3) **atlas migrate-ring-to-focus-ring-color** (GU-3-TRIAGE ASK-B, explicit BH ACTION; 12 bare / 11 files), (4) **bbnf `--glass-blur-dock` retired-token** (bg-build-map §2.U1; preset.css:230 live).
- **T2's core insight is the real fix, not a count-bump:** `proof:crossrepo-asks` is BB-scoped (RELAY hardcodes `docs/tranches/BB/…`), so BH's gate line is vacuous at ANY count. The fix is a **BH-scoped arm** (`proof:crossrepo-asks:bh`) reading BH's roster.
- **crit-T2 OPEN-1 is binding:** the anti-hardcode property must live in an **auto-scan of the source docs** (a `CONSTELLATION_COVERAGE_ANCHORS`-equivalent that reds on any source-named B7 ask the relay omits), mirroring the BB gate's TWO-layer design (hand-curated `EXPECTED_ASKS` + `A3_COVERAGE_ANCHORS` auto-scan). Otherwise "count can never be hand-frozen" degrades to "exactly-4 can never be hand-frozen."
- **crit-T2 OPEN-2 is binding (the row-filter):** `consumer-constellation.md`'s ask ledger has 6 rows across 4.4.0 + 5.0.0; only aurora/timeline/ring are 5.0.0-BH-B7. The gate must filter to `lands==5.0.0-BH-B7 AND is-a-by-name-migration-ask`, self-tested, so it does not over-demand the 4.4.0 GU-1/GU-3-ASK-A rows.
- **crit-T2 OPEN-3 is binding (source asymmetry):** the bbnf row is NOT in the ledger table (0 grep hits) — it lives as prose in bg-build-map §2.U1 and is a token-retire, not a /api ask. **`proof:retired-token-consumers` (not crossrepo-asks:bh) is the bbnf row's PRIMARY born-RED witness** (the live preset.css:230 consumer); crossrepo-asks:bh only asserts the roster records the id.
- **Cross-tranche-gate hazard is LOW:** BG.W-CLOSEFIX-9SITE (G7) DOES carry `proof:retired-token-consumers` in its Gate set (FINAL.md, bg-build-map:1276-1284) — BH's B7 reference locks against a real build.

### C3 [MED] B5c 16-reader re-home vs BG's amended count

**Reconciled resolution (T3 + crit-T3 — REFRAMED by §1):**
- Census = 16, `proof-handmark:249 rd()` the 16th (confirmed). BG's fold (**EXEC row 18.10 + bg-build-map G5**) ALREADY pins 16 + names the DE-BLINDED C2 detector + the 4 missed readers + the 2-crasher guard. The stale 15 survives only in the superseded intermediate `pass-3-resolve-G6.md` prose.
- **crit-T3 Gap-1 (fold-ownership) is binding:** `AMENDED-COHERENCE-PLAN.md:214-215` already OWNS the BH-doc edits (bh-interleave-map §2+§4, PLAN:93+B5c). T3's A1/A2 must **DEFER to that BG fold** (become VERIFY-and-cross-reference), NOT re-author — avoiding a two-fold race on the same BH lines. The write-fence forbids a BH pass writing the BG-tree `bh-interleave-map.md` anyway, which STRENGTHENS the defer resolution.
- **crit-T3 Gap-2 (wrong anchor) is binding:** the bare-`rg -l` B4f gate is at `bh-interleave-map.md:151`, NOT :186 (:186 is prose). BG's MR-5 already caught this drift and pins 151-152. Re-anchor at HEAD.
- **T3's genuinely-additive contributions (KEEP):** A3 (the `15 BG-append` vs `16 reader` numeral-collision disambiguation — live on PLAN:42, interleave:98) + A4 (the 2-crash / 14-silent-false-fail ENOENT taxonomy — NOT covered by the AMENDED plan). These are net-new value.

### C4 [MED] L15 budget-rebaseline one-sided fold (same shape as C1)

**Reconciled resolution (T4 + crit-T4):**
- The L15 net-budget-rebaseline, the FINAL ci.yml emit, `proof:binding-sweep`, and the kf-peer bump are ALL one-sidedly folded onto BH-B2.1-swap by BG's G4. The single-writer B2.1-swap block absorbs BG's bg-build-map G4 obligations verbatim into BH PLAN.md:68 + EXEC row 18.1 + the interleave-map:40 row (both sides agree).
- **crit-T4 single-writer symmetry (the primary open) is binding:** bg-build-map:1184 declares B2.1-swap the "FINAL pre-cut package.json single-writer," but **EXEC row 19.1 still lists value.js `^1.0.0`→`^1.1.1` at the cut** (a second package.json floor-write AFTER B2.1-swap). Resolution: EITHER absorb the value.js-floor edit into the SAME B2.1-swap block (making single-writer TRUE + symmetric with kf), OR record that BG.W-CUT re-touches package.json and downgrade "FINAL single-writer." **perfect-freehand is NOT a contradiction** — it drops at **BG-WS9** (bg-build-map:1262 "(WS9)"), BEFORE B2.1-swap. Only value.js is the genuine second cut-writer.
- **crit-T4 row-19.1 dangling reference (secondary) is binding:** annotate EXEC row 19.1 + bg-build-map:1261 that "mechanical CONSUMEs fire here" means asserted-true-by-the-cut (API present), NOT a second package.json floor-write — the "both sides agree post-fold" rule applies to these BG-side sites too.
- **T4/T2 seam declaration:** the value.js/pf floor-EDIT wave-homing is **T4's concern** (single-writer); T2 owns only the stale-LITERAL `1.2.0`→`1.1.1` string reconcile + the B7 roster. Record the split so the coherence does not fall through the seam.

### C5 [MED] 2 ENOENT-crashers crash the cut battery if CLAUDE.md is touched before B5c

**Reconciled resolution (T5 + crit-T5 — census correction applied):**
- doc-consistency:197 is RELEASE-tagged → it THROWS mid-cut-battery (aborts `git tag`), not a red gate. The B5c→B4f edge is HARD, not advisory. Make it gate-enforced via the born-RED `proof:claude-deletable` on B4f's condition; a resumed exec that runs B4f before B5c hits the born-RED gate.
- **crit-T5 B-1 (count=12) is REJECTED** (§1 above — census is 16; the census gate must count REAL fs-readers matched by the CLAUDE argument, never `grep -l 'CLAUDE'` mention hits).
- **crit-T5 B-2 (C-HOMES over-claim) is binding:** `auditCanonHomes()` as built checks `existsSync` ONLY, and `docs/canon/dependencies.md` is a live skeleton at HEAD. Re-homing doc-consistency's dependency-arm to `readCanon("dependencies","strict")` before B4b-content lands would green over an empty scaffold — the close-class lie. Add a content-token audit OR a hard `B4b-content → B5c-dependency-arm` edge.
- **crit-T5 B-3 (all-facts re-home) is binding:** confirm doc-consistency re-homes EVERY CLAUDE-sourced fact in `detectConsistency` (it also reads PACKAGE_JSON) — B4f's rg=0 floor requires ZERO surviving CLAUDE_MD reference.
- **crit-T5 B-4/B-5 (born-state + detector generality) are binding:** gen-structure-fresh is born-GREEN at HEAD (structure.md just generated) — its soundness rides a planted-stale bite, not a born-RED framing; the C-CRASH detector matches the ARGUMENT (a CLAUDE-resolving path into any readFileSync-descended call), not a fixed alias whitelist (safeRead is redefined locally in 8 gates).
- **The accent-tone dual-arm (F7) is TWO obligations:** (i) CLAUDE arm (safeRead, soft) → DROP in B5c; (ii) `src/subpaths/selectable-chip.ts` arm (HARD A6) → B2.1-swap DELETES that file, so it must RE-POINT onto `src/components/custom/selectable-chip/index.ts` (verified present, exports the family), landing WITH/AFTER B2.1-swap.

### C6/C7 [LOW] stale-target references + census drift

**Reconciled resolution (T6 + crit-T6):**
- A1 value.js `^1.2.0`→landed `^1.0.0`/canonical `^1.1.1` (a `^1.2.0` peer would RED proof:peer-conformance). A2 B1-W3 "all met" → point at C1/T1's peer-floor obligation (do NOT re-author). A3 "+2 siri"→"+1 /siri-island (siri-waveform INTERNAL; /api rises above 203)". A4 B2.4a mark LANDED (stale-by-success). A5 record the exempt-unrecorded orphans (fission-bridge.css 552, property-regs.css 548 — point at BG P5's IRREDUCIBLE verdict; api/index.ts 505 self-resolves when B2.2 fold-deletes src/api). A6 re-baseline the 16/8/12/3 god-module snapshot to the 18-file disk census.
- **crit-T6 A3-INCOMPLETE is binding:** `bh-interleave-map.md:101` (`vite.library.ts` WS6 row `(+2 siri subpath entries)`) is a FIFTH "+2 siri" site the proto's list (40/168/112) MISSES — T6's own verifying grep `+2 siri → 0` would FAIL post-fold. Add :101.
- **crit-T6 A2/A1-coupling opens are binding:** A2 names 2 of 3 kf-silent sides (defer the third to C1/T1); A2 ownership phrasing must not re-admit the two-owner crack MR-4 closed; A1 must NAME the gate-file PINNED-pin coupling (the value pin is BG.W-GATE-FIELD-AURORA's same-file same-wave edit).

---

## §3 The convergence gaps that remain (feed nextFocus)

The mechanics of every prototype are FEASIBLE. The residual is **coherence-completeness**, concentrated in six PASS-2 confirmations:

1. **[C1] The three-sided fold must be authored** — BH PLAN:68 + interleave:40 (bump) + BG EXEC row 12.5 (clause deliverable). The kf-peer bump still has no unambiguous cursor home on the BH side. **LOAD-BEARING.**
2. **[C2] The BH crossrepo-asks arm's auto-scan + row-filter must be specified** against `consumer-constellation.md`'s 6-row ledger (3 B7 rows) + the bbnf prose anchor, so the 4-row roster cannot re-freeze at 4 (crit-T2 OPEN-1/2/3).
3. **[C3] T3's A1/A2 must be re-labeled DEFER-to-BG-fold** (not independent re-author) + the :186→:151 anchor corrected; A3/A4 stay as net-new.
4. **[C4] The single-writer symmetry must be closed** — value.js floor edit either absorbed into B2.1-swap or "FINAL single-writer" downgraded, and row 19.1 annotated.
5. **[C5] The C-HOMES content-audit + the B4b-content→B5c-dep edge** must be specified so no arm re-homes onto the empty `dependencies.md` skeleton; the census gate counts real fs-readers (16), never grep-l hits.
6. **[C6] The 5th "+2 siri" site (interleave:101)** + the carousel-worm carve path re-verify (`useCarouselWorm.ts`/`CarouselContent.vue` not at proto-T6's cited paths).

**T1 artifact residual (crit-T1 O1):** the claimed `pass-1-proto-t1-kf-peer-floor-gate.md` is ABSENT on disk. The mechanics were re-run this pass (born-RED→GREEN + the alias-set census), so the FEASIBLE verdict is auditable via THIS synthesis + COHERENCE.md; PASS 2 may re-persist the spike artifact if a standalone trace is wanted.

**No feasibility restart. No new friction class introduced.** The dominant class (cross-tranche incomplete-pairing) is closed by bounded plan-text + gate-wiring amendment across BOTH interleave sides.

siblings-intact exit 0 (after).
