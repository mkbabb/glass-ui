# BH COHERENCE — the living master

**Purpose.** The single source of truth for the BH tranche's cross-wave/cross-band coherence: the friction taxonomy, every coherence issue + its resolution status, and the reconciled band-DAG / export-surface / CLAUDE-readiness / BG-interleave / carve-ownership / consumer tables. BH interleaves with BG (shared branch `tranche/BG`); the joint cut is **5.0.0**. The seed rule is binding: **BOTH sides of the interleave must agree post-fold** (BH `PLAN.md` + BG `execution/bh-interleave-map.md`).

**State.** PASS 1 agglomerated · HEAD `f7dd6146` · siblings-intact exit 0. **Overall convergence: 90%.** Not develop-ready — six coherence-completeness confirmations owed to PASS 2 (§ Convergence gaps). The tranche is STRUCTURALLY SOUND (band-DAG acyclic, no feasibility blocker); the residual is one-sided-fold text + gate-wiring, entirely bounded.

---

## §1 The dominant friction class

Every high/medium coherence defect is ONE class: **cross-tranche INCOMPLETE-PAIRING** — an obligation BG's just-folded audit (`e550f1b0`) placed ON BH that did not propagate to BH's own executable plan/cursor. This is the SEED-CONTEXT-named class, recurring one cross-tranche-handoff level up from BG's intra-band L×S near-misses. The fix is bounded plan-text + gate-wiring amendment across both interleave sides — **zero feasibility restart**.

### Friction taxonomy (re-verified on disk this pass)

| # | Class | Recurs? | Risk | Anchor (HEAD f7dd6146) | Status |
|---|---|---|---|---|---|
| F1 | Incomplete-pairing — kf-peer binding no-op | YES | **HIGH** | `useDragMorph.ts:325 snap:` ships; `package.json:1078` peer `^5.0.0`; DragOptions.snap first ships kf 5.1.0 | **OPEN → C1** |
| F2 | Consumer-ask incomplete-pairing (2 of 4 rows) | YES | **HIGH** | atlas `--ring` (GU-3-TRIAGE ASK-B, 12 bare/11 files) + bbnf `--glass-blur-dock` (preset.css:230 live) ABSENT from B7 | **OPEN → C2** |
| F3 | ENOENT-crasher in a RELEASE-tagged gate | YES | **LOW** (sequenced) | structure-sync:74 (ci) + doc-consistency:197 (release) bare `readFileSync` | **OPEN → C5** |
| F4 | Gate-vacuity via incomplete detector | YES | **MED** | census=16; C2 detector must enumerate all 6 reader-alias forms | **OPEN → C3** |
| F5 | 4.2.0-snapshot census drift | YES | **MED** | 18 files >500; api/index.ts 505 new; "+2 siri" stale; B2.4a carves landed | **OPEN → C6/C7** |
| F6 | Orphan god-module re-grown | YES | **HIGH** (close-adjacent) | ladder.css 527 + shell.css 510 (proof:no-god-module RED); fission-bridge 552 + property-regs 548 exempt-unrecorded | **BG-owned + C7 record** |
| F7 | Clean-break-rename misses deleted-wiring consumer | YES | **MED** | accent-tone reads `src/subpaths/selectable-chip.ts` (B2.1-swap deletes) | **OPEN → C5 (dual-arm)** |
| F8 | Goo-morph worm-carve prop-drop (deferred paint) | YES | **MED** | B2.4a worm-carve family; π must exercise BETWEEN-states worm | **deferred to BG WS11/12** |
| F9 | SOTA convention shift after plan basis | NO (net-new) | LOW-MED | Vite-8 recipe / publint-attw / TS6 dts order-sensitivity | recorded, low |
| F10 | Session-limit null-crash (inherited) | YES | MED | BH rides bg-paint.wf.js exposure; [WS12] tail longest | BG G1/G3 co-fix |
| F11 | Foreign-tree (B0 scratch-sweep) | YES | LOW | B0 git rm/clean/mv under-repo; deny-backstop + tripwire durable | contained |

---

## §2 Coherence issues + resolution status (most-severe first)

| ID | Sev | Issue | Verified anchor | Resolution | Status |
|---|---|---|---|---|---|
| **C1** | HIGH·LIVE | kf-peer bump `^5.0.0→^5.1.0` + floor-vs-API gate BG-owned but BH-absent | `package.json:1078`; `useDragMorph.ts:325`; `proof-peer-conformance.mjs` no kf clause; `bg-build-map:717-719` names the clause owner; EXEC row 12.5 silent on it; row 18.1 silent on the bump | Three-sided fold: BH PLAN:68 + interleave:40 carry the BUMP; BG EXEC row 12.5 carries the CLAUSE deliverable. Clause=BG.W-GATE-FIELD-AURORA (single owner, MR-4 — do NOT soften), bump=BH-B2.1-swap. Red-window WS7→WS12 EXPECTED. Value pin reconciles same owner-wave. | **OPEN** (author the 3 sides) |
| **C2** | HIGH | B7 captures 2 of 4 consumer-migration rows | `GU-3-TRIAGE` ASK-B "ACTION for BH agent"; `preset.css:230` live; `proof-crossrepo-asks.mjs:43` BB-scoped; `consumer-constellation.md` ledger | Add rows 3 (atlas `--ring`) + 4 (bbnf `--glass-blur-dock`). Mint BH-scoped `proof:crossrepo-asks:bh` with a source-doc AUTO-SCAN (not a count). bbnf's primary witness = `proof:retired-token-consumers` (born-RED on preset.css:230). Row-filter = `lands==5.0.0-BH-B7 AND by-name-migration-ask` (excludes 4.4.0 GU-1/GU-3-ASK-A). | **OPEN** (author roster + gate arm) |
| **C3** | MED | B5c 16-reader re-home vs BG's amended-but-superseded 15 | census = 16 (grep confirmed); handmark:249 the 16th; EXEC row 18.10 already pins 16 + names the DE-BLINDED C2 detector | T3's A1/A2 DEFER to the AMENDED-COHERENCE-PLAN:214-215 fold (verify-and-cross-reference, not re-author — write-fence forbids BH writing the BG-tree interleave anyway). Anchor B4f gate at interleave:151 (not :186). KEEP A3 (15-append vs 16-reader numeral disambiguation) + A4 (2-crash/14-silent taxonomy) as net-new. | **RESOLVED-IN-DIRECTION** (defer + keep-A3/A4) |
| **C4** | MED | L15 budget-rebaseline one-sided fold (C1 shape) | `bg-build-map:1182-1208` G4 block; `profile-bundle.mjs:210-229` walks 6 chunks, no un-walked-chunk assert; EXEC row 19.1 lists value at cut | Single-writer B2.1-swap block absorbs G4 verbatim (budget + ci.yml + binding-sweep). **Close single-writer symmetry**: absorb value.js floor edit into B2.1-swap OR downgrade "FINAL single-writer" + annotate row 19.1. pf drops at WS9 (no contradiction). AUX-EXCLUSION keys off post-swap dist-name allowlist (src/subpaths/ is deleted). | **OPEN** (absorb + symmetry) |
| **C5** | MED | 2 ENOENT-crashers crash `--run full` cut battery if CLAUDE.md touched before B5c | structure-sync:74 (ci) + doc-consistency:197 (release, THROWS mid-battery); B5c→B4f edge advisory in PLAN | Make B5c→B4f HARD (gate-enforced via born-RED proof:claude-deletable on B4f). Guard both crashers → readCanon strict. **C-HOMES content-audit** (not existsSync-only) OR hard `B4b-content→B5c-dep` edge (dependencies.md is a live skeleton). Confirm doc-consistency re-homes EVERY CLAUDE fact. accent-tone dual-arm: DROP CLAUDE arm + RE-POINT subpath arm → `src/components/custom/selectable-chip/index.ts`. | **OPEN** (hard edge + content-audit + dual-arm) |
| **C6** | LOW | Stale-target references misdirect a verbatim re-read | PLAN:62 `^1.2.0` vs disk `^1.0.0`; PLAN:63 "all met" vs C1; PLAN:68/116 + interleave:40/101/112/168 "+2 siri"; §1-#4 lucide LANDED | A1 value `→^1.0.0`landed/`^1.1.1`canonical. A2 B1-W3 point at C1 (no re-author). A3 "+1 /siri-island (waveform INTERNAL; /api>203)" — **incl. interleave:101** (the 5th site). A4 mark B2.4a LANDED. A5 record orphans. A6 re-baseline census. | **RESOLVED-IN-DIRECTION** (6 corrections + :101) |
| **C7** | LOW | God-module census drift (split HOLDS) | 18 files >500; no double-claimed carve; BH-3 are cohesion relocations not 500-splits; fission-bridge 552 + property-regs 548 exempt-unrecorded | Split SOUND (BH dodges BG src write-set). Record: BH residual god-module carve ownership at HEAD = ZERO (its 3 landed as proof:colocation cohesion relocations). Point orphans at BG P5 IRREDUCIBLE verdict. api/index.ts 505 self-resolves at B2.2 fold-delete of src/api. | **RESOLVED-IN-DIRECTION** (record drift) |

---

## §3 The reconciled band-DAG (STRUCTURALLY SOUND)

Acyclic. **B4f (CLAUDE.md delete) is the unique sink** — the absolute last act, after WS12 and after B5c re-homes the gates. Every `[WSn]`/`[WS12]` tag resolves to a position-unchanged BG WS by NUMBER (BH is insulated from BG G1's CLOSEFIX-9SITE 12.0→0.7 re-sequence + the WS2 dock-wave renames).

| Band | Waves | Interleave class | Key edges |
|---|---|---|---|
| B0 | scratch-sweep | [C] concurrent-now | most-mutating BH wave; under-repo only |
| B1 | a/b/c (lucide · value-destraddle · snap-excise) | [C] | B1-W3 snap-excise LANDED `ba23c086` (the C1 pairing origin) |
| B2 | 0/1-mech/1-swap/2/3/4a-c/5/6 (largest band) | mixed [C]/[WS12] | B2.1-mech→B2.1-swap; B2.2→B7; **B2.1-swap the FINAL pre-cut package.json single-writer (C4 symmetry owed)** |
| B3 | ~6 waves | [WS12], all after BG-WS4 | δ after WS4 |
| B4 | a/b-skel/b-content/c/d/e/**f** | mixed; **B4f = sink** | b-content→b5c-dep edge (C5); f gated on B5c + rg=0 + born-RED claude-deletable |
| B5 | a/b/c | [WS12] | **B5c → B4f HARD edge (C5)**; B5c re-homes the 16 readers |
| B6 | 3 prompts | [C] | — |
| B7 | api-ask-roster | [WS12] | **4-row roster (C2)**; B2.2→B7 |

**Negative findings (record so PASS 2 skips):** G1 axis CLEAN (CLOSEFIX-9SITE→row-0.7 does not change any BH-[C] start edge — file-disjoint, all [C] bands DONE while 0.7 PENDING). No back-edge. B4f the only sink.

---

## §4 Export-surface (re-verified accurate at HEAD)

| Fact | Value | Status |
|---|---|---|
| 5.0.0 break vectors | THREE: drop `./api` (203-symbol re-home) · `--ring→--focus-ring-color` rename (no alias) · viz-demigrate (internal) | confirmed (consumer-constellation:17) |
| /api dropped keys | exactly ONE (`./api`); 200/203 pure path-swaps; 3 orphans add an export | RE-VERIFIED (proof:subpath-classify EXACT_REPRODUCTION) |
| 3 /api orphans | Surface→/card · MenuItemVariants→/command · ControlSize→/forms (all from `_shared`, no published subpath) | verified real re-home targets |
| subpaths | delete `src/subpaths/` (79 one-line mirror barrels) at B2.1-swap | key-preserving |
| siri delta | **+1 `/siri-island` (PUBLISHED)**; siri-waveform INTERNAL (no subpaths line) — /api rises ABOVE 203 | **C6-A3 correction** (was "+2") |
| version floors | vite 8.0.13 · ts 6.0.3 · vue-tsc 3.3.5 · vitest 4.1.9 · tailwind 4.3.1 — all current | no bump owed |
| peer floors | value.js `^1.0.0` landed → `^1.1.1` at cut; kf `^5.0.0` → **`^5.1.0` at B2.1-swap (C1)** | value stale in PLAN (C6-A1); kf OPEN (C1) |

---

## §5 CLAUDE-readiness (the delete-safety picture)

**Reader census = 16 hard fs-readers** (RESOLVED — grep `(readFileSync|safeRead|readRel|rd|read|readCanon)\([^)]*CLAUDE` over `scripts/proof-*.mjs` = 16 distinct files; the crit-T5 "12" grading error rejected; EXEC row 18.10 independently pins 16 + names the 4 `read()`-form readers).

| Reader | Line | Alias | ENOENT behaviour | Re-home |
|---|---|---|---|---|
| proof-claude-structure-sync | 74 | `readFileSync` (bare) | **CRASH (ci)** | → generated `structure.md` |
| proof-doc-consistency | 197 | `readFileSync` (bare) | **CRASH (release — aborts cut)** | → readCanon strict (structure + **dependencies — content-audit owed, C5-B2**) |
| proof-handmark | 249 | `rd` | silent false-fail | re-home (the 16th — census confirmed) |
| proof-close-battery-parity | 149 | `read` | silent false-fail | → `--run full` canon |
| proof-on-glass-fg | 399 | `read` | silent false-fail | → `--on-glass-muted` |
| proof-doc-override-idiom | 113 | `read` | silent false-fail | → README.md |
| proof-readme-meta-clean | 221 | `read` | silent false-fail | re-home |
| proof-accent-tone | 440 | `safeRead` | silent false-fail | **DROP** CLAUDE arm + RE-POINT subpath arm (C5/F7) |
| proof-dock-unify · dropdown-fix · easing-primitive · phase-palette · spa-view · split-chars · surface-axis | 656·419·365·335·299·447·520 | `safeRead` (×7) | silent false-fail | re-home (8 safeRead gates total incl. accent-tone) |
| proof-dock-rail-realize | 258 | `readRel` | silent false-fail | re-home |

**Taxonomy:** 2 of 16 CRASH (bare readFileSync); 14 silently false-fail (guarded → `""`/null). PLAN:16's "they ENOENT-break" describes only the 2 crashers (C3-A4 correction). **Numeral-collision:** PLAN:42 "15 BG specs append" (WRITE-into-CLAUDE count) ≠ 16-reader census — keep disjoint (C3-A3). **C2 detector** must enumerate ALL 6 alias forms matched by the CLAUDE ARGUMENT, not a fixed 4-pattern whitelist (safeRead is redefined locally in 8 gates). expandable-part:66 `CLAUDE_MD` is a dead const (never passed to a reader) — correct C2 exclusion.

---

## §6 BG-interleave (both sides must agree post-fold)

| BH obligation | BG source | BH side (PLAN/interleave) | Agreement | Owner |
|---|---|---|---|---|
| kf-peer bump `^5.0.0→^5.1.0` | bg-build-map:1188-1191 (B2.1-swap) | PLAN:68 SILENT; interleave:40 SILENT | **DISAGREE (C1)** | BH-B2.1-swap (bump) |
| kf floor-vs-API clause | bg-build-map:717-719 (W-GATE-FIELD-AURORA, single owner) | EXEC row 12.5 SILENT (lists only field-aurora-aa + value) | **DISAGREE (C1)** | BG.W-GATE-FIELD-AURORA (clause) |
| L15 budget + ci.yml + binding-sweep | bg-build-map:1182-1208 G4 | PLAN §5-1 export re-baseline only | **PARTIAL (C4)** | BH-B2.1-swap |
| value.js floor at cut vs single-writer | EXEC row 19.1 lists value at cut; bg-build-map:1184 "FINAL single-writer" | — | **CONTRADICT (C4)** | resolve: absorb OR downgrade |
| 4-row consumer roster | GU-3-TRIAGE ASK-B + bg-build-map §2.U1 | PLAN:106 "exactly 2" | **DISAGREE (C2)** | BH-B7 |
| 16-reader re-home | EXEC row 18.10 (16, DE-BLINDED C2) | PLAN:99 "16 CLAUDE-readers" | **AGREE** (both 16) | BH-B5c (defer to BG fold) |
| "+2 siri" | bg-build-map:1173 waveform INTERNAL | PLAN:68/116 + interleave:40/**101**/112/168 "+2" | **DISAGREE (C6)** | BH-WS6/C6 |

**AMENDED-COHERENCE-PLAN.md:214-215** already owns the BH-doc census edits — the C3 fold DEFERS to it (no two-fold race; the write-fence forbids a BH pass writing the BG-tree `bh-interleave-map.md`).

---

## §7 Carve-ownership (split HOLDS)

| File | Lines | Owner | Verdict |
|---|---|---|---|
| ladder.css | 527 | BG (WS9 grain-carve) | proof:no-god-module RED — build-last |
| shell.css | 510 | BG (WS12-CENSUS re-check) | proof:no-god-module RED — build-last |
| fission-bridge.css | 552 | BG (P5) | IRREDUCIBLE cascade-partial — **exempt-unrecorded in plan (C7-A5)** |
| property-regs.css | 548 | BG (WS8/WS9 mints) | IRREDUCIBLE — **exempt-unrecorded (C7-A5)** |
| api/index.ts | 505 | transient (B2.2 fold-deletes src/api) | grandfathered baseline; self-resolves |
| usePagerWorm.ts | 142 | BH-B2.4a | LANDED <500 |
| useBloomUp.ts | 449 | BH-B2.4a | LANDED <500 |
| PagerDots.vue | 433 | BH-B2.4a | LANDED <500 |
| useCarouselWorm.ts / CarouselContent.vue | — | BH-B2.4a | **PASS-2 re-verify** (not at proto-T6's cited paths) |

No double-claimed carve target (BH dodges BG's src write-set by construction; the one historical double-owner liquid-morph.css adjudicated by BG §2.P1). **BH residual god-module carve ownership at HEAD = ZERO** — its 3 landed as proof:colocation cohesion relocations, not 500-bound splits (proof:no-god-module cannot FORCE them; GREEN-by-construction).

---

## §8 Consumer roster (the reconciled 4-row B7)

| # | Ask id | Consumer | Vector | Source | Primary witness | Present? |
|---|---|---|---|---|---|---|
| 1 | migrate-api-to-aurora | muster | /api drop → /aurora | consumer-constellation §1 | proof:crossrepo-asks:bh | **YES** (PLAN:106) |
| 2 | migrate-api-to-timeline | speedtest | /api drop → /timeline | consumer-constellation | proof:crossrepo-asks:bh | **YES** (PLAN:106) |
| 3 | migrate-ring-to-focus-ring-color | atlas | `--ring` rename (12 bare/11 files) | GU-3-TRIAGE ASK-B (BH ACTION) | proof:crossrepo-asks:bh | **MISSING (C2)** |
| 4 | bbnf-glass-blur-dock-retune-no-op | bbnf-buddy | `--glass-blur-dock` retire (preset.css:230 live) | bg-build-map §2.U1 (prose, not ledger) | **proof:retired-token-consumers** | **MISSING (C2)** |

**Filter (C2 OPEN-2):** the gate reads `lands==5.0.0-BH-B7 AND is-a-by-name-migration-ask` — EXCLUDES the 4.4.0-line GU-1 (`glass-key-fill`) + GU-3-ASK-A (`StatusDot forced-colors`) + the no-engine WS2 `drop-overflow-scroll` consume. Row 4's source is ASYMMETRIC (prose anchor, token-retire not /api) — proof:retired-token-consumers is its born-RED witness; crossrepo-asks:bh only records the id. **Non-ask consumers reconcile correctly:** words/frontend/glass-ui (inv-11 vendored fork, no row), keyframes.js/value.js (dev-peer zero-import, no ask), slides-K (4.0.0 break is consumer's own).

---

## §9 Convergence gaps → PASS 2 focus

1. **[C1 · LOAD-BEARING] Author the three-sided kf fold** — BH PLAN:68 + interleave:40 (bump) + BG EXEC row 12.5 (clause deliverable). Preserve MR-4 split (clause=BG.W-GATE-FIELD-AURORA, bump=BH-B2.1-swap; do not soften). State WS7→WS12 born-RED red-window as EXPECTED.
2. **[C2] Specify the BH crossrepo-asks arm** — source-doc AUTO-SCAN (not a count) + the `lands==5.0.0-BH-B7 AND by-name-ask` row-filter, self-tested against the 6-row ledger; wire proof:retired-token-consumers for the bbnf row.
3. **[C3] Re-label T3's A1/A2 as DEFER-to-BG-fold** + correct :186→:151; keep A3/A4 net-new.
4. **[C4] Close single-writer symmetry** — absorb value.js floor into B2.1-swap OR downgrade "FINAL single-writer" + annotate row 19.1; T4/T2 seam declared (value floor-edit = T4; stale-literal = T2).
5. **[C5] Specify C-HOMES content-audit + B4b-content→B5c-dep edge** — no arm re-homes onto the empty dependencies.md skeleton; census gate counts 16 real fs-readers.
6. **[C6] Add interleave:101 to the "+2 siri" fix set** + re-verify the carousel-worm carve path.

**Readiness bar:** develop-ready when all six are authored across both interleave sides and no unresolved cluster remains. The mechanics are FEASIBLE (every prototype returned FEASIBLE); the residual is purely coherence-completeness. **No feasibility restart. No new friction class.**

---

**Change log.** PASS 1 (2026-06-30): created. Census resolved to 16 (crit-T5 B-1 rejected). MR-4 kf ownership confirmed on disk (bg-build-map:717). Single-writer contradiction confirmed (EXEC row 19.1). Six coherence clusters open, all bounded. siblings-intact exit 0 before + after.
