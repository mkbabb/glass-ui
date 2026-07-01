# BH Coherence Re-Spec — PASS 1 (baseline)

**Scope.** The BH tranche (repo cleanup · de-indirection · 5.0.0 export restructure) INTERLEAVED with the live BG tranche. BH is the most friction-aware infrastructure tranche in the corpus; its three seed tests (the 2 ENOENT-crashers, the kf-peer incomplete-pairing, the god-module split) resolve favourably IN DIRECTION — the design is sound, not a bug-hunt. The coherence defects are NOT topological (the band-DAG is acyclic, B4f the unique sink) and NOT feasibility blockers; they are **cross-tranche one-sided-reference drift** — obligations BG's just-folded audit (`e550f1b0`) placed ON BH but that BH's own executable plan does not carry.

**On-disk verification (HEAD, this pass).** siblings-intact exit 0 (before). Verified: `package.json:1078` peer `@mkbabb/keyframes.js: "^5.0.0"` (broken floor) vs `useDragMorph.ts:325 snap: targetsOf().map(t=>t.center)` (kf 5.1.0 API) — LIVE defect. 16 distinct `proof-*.mjs` CLAUDE content-readers (incl. `proof-handmark.mjs:249 rd("CLAUDE.md")` — the genuine 16th). `ladder.css` 527L + `shell.css` 510L >500 un-ratcheted (proof:no-god-module RED). `api/index.ts` 505L (>500 — a NEW re-growth not in the 4.2.0 census). `proof-peer-conformance.mjs` asserts only the value.js floor + a PINNED_LATEST 5.1.0 admits-latest snapshot — NO kf floor-vs-API clause. `proof:claude-deletable` + `proof:retired-token-consumers` NOT on disk. BH's B2.4a carves ALREADY landed (CarouselContent/PagerDots/useBloomUp all <500). No standalone `bh-interleave-map.md` file exists (it is the projection embedded in the interleave research report).

---

## §1 Friction taxonomy + repeat-risk verdicts

The six lenses converge on ONE dominant class: **incomplete-pairing across the tranche seam** — a surface/consumer change lands on one side without its dependent obligation propagating to the executable plan on the other side. This is the SEED-CONTEXT-named class, now recurring one cross-tranche-handoff level up from BG's own intra-band L×S near-misses (G2, G5).

| # | Friction class | Recurs? | Repeat-risk | Evidence anchor |
|---|---|---|---|---|
| F1 | **Incomplete-pairing — kf-peer binding no-op** (consumer adaptation landed without its surface-declaration floor bump) | YES | **HIGH** until BH's plan echoes the bump | `useDragMorph.ts:325` ships `snap:` (landed `ba23c086`); `package.json:1078` peer STILL `^5.0.0`; `DragOptions.snap` first ships kf 5.1.0 → ^5.0.0 consumer never snaps. BG's §2.C1 FOUND it + routed the fix onto BH-B2.1-swap + BG.W-GATE-FIELD-AURORA; BH PLAN.md:68 carries NEITHER the bump NOR the gate. `proof:peer-conformance` GREEN over the broken floor. |
| F2 | **Consumer-ask incomplete-pairing** (the 5.0.0 cut lands /api-fold + `--ring` rename + `--glass-blur-dock` retire; BH's B7 enrolls only the /api-fold) | YES | **HIGH** — 2 of 4 consumer-migration rows missing | atlas `--ring→--focus-ring-color` THIRD by-name ask (BG GU-3-TRIAGE.md:16 assigns to BH agent) ABSENT; bbnf-buddy `--glass-blur-dock` retired-token row ABSENT (`preset.css:230` live on disk). BH hardcodes "exactly 2 by-name asks". |
| F3 | **ENOENT-crasher** (unguarded `readFileSync(CLAUDE.md)` in a RELEASE-tagged gate) | YES | **LOW** given the B5c→B4f order | `proof-claude-structure-sync.mjs:74` (ci) + `proof-doc-consistency.mjs:197` (RELEASE) both unguarded. Named exactly. Correct-by-design SEQUENCED (B5c re-homes → B4f deletes-last, gated on rg-count==0 + born-RED proof:claude-deletable). NOT yet fixed; both PENDING [WS12]. |
| F4 | **Gate-vacuity via incomplete detector** (BG's G6 receiver-grep mis-bucketed the 16th reader) | YES | **MEDIUM** — the C2 detector is unbuilt | BG-G6 §B5 re-litigated the census DOWN to 15, mis-classing `proof-handmark:249`'s `rd()` as a soft mention (its 4-pattern grep missed the `rd/readRel` helper aliases). Ground truth = 16. If `proof:claude-deletable` C2 is built to G6's 15/4-pattern set, handmark false-fails W6 silently on delete. |
| F5 | **Orphaned-wave-claim / 4.2.0-snapshot census drift** | YES | **MEDIUM** — grows as BG builds | "203 /api symbols · 79 subpaths · 16 god-modules BG-8/BH-3 · 200/203 path-swaps" are all 4.2.0 snapshots. Disk is now 18 files >500 (incl. NEW `api/index.ts` 505), B2.4a's 3 carves landed, `api/index.ts` re-grew, siri-island bumps /api >203. Plan §5-1 acknowledges the re-baseline residual; the constants nonetheless mislead a verbatim re-read. |
| F6 | **Orphan god-module — re-grown, no active drain owner** | YES | **HIGH** for close-adjacent bands | `ladder.css` 527 + `shell.css` 510 >500 un-ratcheted → proof:no-god-module RED at HEAD; BG-owned (WS9 grain-carve + WS12-CENSUS re-CHECK, both build-last). `fission-bridge.css` 552 + `property-regs.css` 548 exempt-but-UN-RECORDED in either plan. |
| F7 | **Clean-break-rename-misses-consumer** (export reshape × deleted-wiring cross-reference) | YES | **MEDIUM** | `proof:accent-tone` reads BOTH CLAUDE.md AND `src/subpaths/selectable-chip.ts` (deleted by B2.1-swap). B5c row (line 99) NAMES the dual-arm re-point — good — but the obligation must survive the fold. |
| F8 | **Goo-morph worm-carve gate-blind prop-drop** (deferred paint) | YES | **MEDIUM** | BG §2.5: B2.4a integrator dropped stray `centerOf/restSize/tokenPrefix/neckGap` props on `useCarouselWorm` — caught by human, NO gate. BH B2.4a is the same worm-carve family; the byte-identical render π must exercise the BETWEEN-states worm, not static dots. |
| F9 | **SOTA convention shift after plan basis** (Vite-8 recipe / publint-attw / TS6 dts) | NO (net-new) | LOW-MED | Published Vite-8 `manualChunks` recipe stale (rolldownOptions/codeSplitting); no publint/attw on the largest exports edit in tranche history; TS6 order-sensitive dts emit means B2.1 must gate type-SET not byte-equality. |
| F10 | **Session-limit null-crash (inherited)** | YES | MEDIUM | BH rides bg-paint.wf.js's 4-unguarded-agent-deref exposure; the [WS12] tail is the longest, most session-wall-exposed stretch. BG G1/G3 fix co-applied at execution — a BG fix BH inherits. |
| F11 | **Foreign-tree (B0 scratch-sweep is most-mutating BH wave)** | YES | LOW | B0: `git rm --cached` / `git clean -ndX` / `rm -rf .playwright .tmp` / `git mv` — all under-repo; deny-backstop + verify-siblings tripwire durable. Watch: git clean preview-then-force, never `-x` over-broad. |

**Taxonomy verdict.** The friction surface is dominated by the incomplete-pairing family (F1, F2, F4, F7) — every high/medium item is a variant of "a change landed but its dependent obligation did not propagate to the plan on the other side of the seam." F3/F6 are known-and-sequenced (design-sound); F5 is a gate-forced re-baseline (mechanically self-correcting); F8-F11 are inherited or net-new. The fix for the whole dominant family is bounded plan-text amendment — NO feasibility restart.

---

## §2 Cross-band / cross-tranche COHERENCE ISSUES

The highest-value category — the **BG-interleave one-sided-reference class**, since BG just changed under BH (`e550f1b0` fold: 7 gap-waves + 7 cluster-amendments). Each issue is an obligation BG's fold placed ON BH that BH's own executable spec does not reciprocate. Ordered most-severe first.

### C1 — [HIGH] The kf-peer bump ^5.0.0→^5.1.0 + the floor-vs-API gate are BG-owned but BH-absent (the #1 coherence defect)

- **Bands/waves:** BH.B2.1-swap (W-regen-swap) · BH.B1-W3 (dragmorph-snap-excise, landed `ba23c086`) · BG.W-GATE-FIELD-AURORA · BG.W-CUT.
- **The defect.** BG's G4 fold placed THREE obligations on the wave it names *BH-B2.1-swap* (`bg-build-map.md:1182-1208`, `FINAL.md:553/658`, `AMENDED-COHERENCE-PLAN.md §5.3`): (a) the kf-peer bump `^5.0.0→^5.1.0`; (b) the L15 budget net-rebaseline; (c) the FINAL ci.yml emit + `proof:binding-sweep`. And it routed the floor-vs-API gate-hardening onto BG.W-GATE-FIELD-AURORA. But **BH PLAN.md:68 (W-regen-swap) carries none of it** — it describes B2.1-swap as a pure subpaths-delete/regen wave. The LIVE defect persists on disk: `package.json:1078` peer `^5.0.0` (verified) + `useDragMorph.ts:325 snap:` (verified) → a kf-5.0.0 consumer's drag never snaps to a detent, a CLASS-L binding no-op ONE rung up (surface-declaration floor, not a call). No commit ever bumped the peer floor (`git log -S` finds only the BD devDep bump).
- **Why it evades every net.** `proof:peer-conformance` runs GREEN over the broken floor — it checks "admits latest" (PINNED_LATEST 5.1.0 snapshot at `:40`) + the value.js floor (`:69`), NOT "floor ≥ first-snap-version." The floor-vs-API gate-hardening that WOULD catch it is UNLANDED at HEAD (no useDragMorph/first-snap clause in `proof-peer-conformance.mjs`). The cut env resolves 5.1.0 (devDep), so no device-free gate catches the ^5.0.0 consumer break.
- **Owner-coupling risk.** The bump is BH-owned (B2.1-swap); the gate is BG-owned (W-GATE-FIELD-AURORA) — DIFFERENT tranches, no cross-reference in BH's docs. If the clause and the bump don't BOTH land, the gate reds-forever (clause without bump) OR the defect ships silently (bump without gate). EXEC-PROGRESS row 19.1 lists the value lift + the kf `DragOptions.snap` API *consume* but NOT the kf PEER-FLOOR bump — the peer-floor bump has no unambiguous cursor home.
- **The seed's rule VIOLATED:** "BOTH sides of the interleave must agree post-fold." BG points at BH; BH does not know.

### C2 — [HIGH] BH's B7 consumer-migration band captures 2 of 4 required rows

- **Bands/waves:** BH.B7 (W-api-ask-roster) · BG-WS10 (W-DESHADCN-TOKEN-REPLACE) · BG.G4 (W-CLOSEFIX-9SITE) · BG.G7.
- **The defect.** BG's authoritative folded 6-consumer table (`BG/execution/consumer-constellation.md`) names 3 by-name asks landing "5.0.0 (BH B7)" + 1 retired-token row; BH's B7 (PLAN.md:106, `asks-and-consumes.md`) carries only 2 and hardcodes "exactly 2 by-name asks."
  - **MISSING ROW — atlas `migrate-ring-to-focus-ring-color` (the BIGGER gap).** BG's `GU-3-TRIAGE.md:16` carries an EXPLICIT "→ ACTION for the BH agent: add the atlas --ring re-point as a B7 row" (lands "BH B7" at :34). The `--ring→--focus-ring-color` rename (BG-WS10, no alias) breaks 12 live bare `var(--ring)` sites across 11 atlas files + 8 fallback-degrading sites. atlas is ENTIRELY absent from BH's B7 census.
  - **MISSING ROW — bbnf-buddy `--glass-blur-dock` retired-token (the prompt's target).** BG G7 §2.U1 (`bg-build-map.md:1272`) names a B7 migration row. Live on disk: `bbnf-buddy/src/styles/preset.css:230` still reads `--glass-blur-dock: var(--glass-blur-cartoon)` — it silently reverts to the 8px default when G4/CLOSEFIX-9SITE retires the token; the 3 sibling overrides survive (asymmetric partial no-op). ABSENT from BOTH BH PLAN.md AND `asks-and-consumes.md`.
- **Gate-vacuity risk.** BG minted TWO born-RED gates BH's B7 gate line does not reference: `proof:retired-token-consumers` ([local,ci,release] after G7 MR-2 — born-RED on bbnf:230, a LIVE close-battery blocker; NOT on disk yet) and `proof:crossrepo-asks` widened to 3 asks (BH specs it for 2 → vacuous-green). BH's "exactly 2" hardcode risks certifying an incomplete roster.
- **The inv-11 break this re-introduces:** a published-but-unmigrated `--ring` rename across 11 atlas files with no recorded migration line is exactly the "named fold, never a silent prune" break the whole BH tranche exists to close.

### C3 — [MEDIUM] The B5c 16-reader re-home must reconcile against the CORRECT 16, not BG's amended-but-WRONG 15

- **Bands/waves:** BG.G6 · BH.B5c-gate-rehome · BH.B4f-claude-delete.
- **The defect.** Ground truth = 16 hard CLAUDE content-readers (verified fresh: 16 distinct `proof-*.mjs` files, the 16th `proof-handmark.mjs:249 rd("CLAUDE.md")` — its W6 clause regex-tests the content + pushes a HARD violation on miss). BH's B5c row (PLAN.md:99) already says "16 CLAUDE-readers" — CORRECT. But BG's JUST-FOLDED G6 §B5 re-litigated it DOWN to 15, mis-bucketing handmark as a "soft mention" (BG's receiver-grep enumerated `readFileSync/safeRead/read/const CLAUDE=` but NOT the `rd/readRel` short-helper aliases; `rd("CLAUDE.md")` matched none). Corroborating: `scripts/lib/canon-doc.mjs` header comment says "the ~16 CLAUDE-reading gates re-point THROUGH it" — the resolver author counted 16.
- **The load-bearing conflict.** BG-G6 §B3-a makes B4f's gate-condition `proof:claude-deletable` (unbuilt) GREEN and specs its C2 detector to measure "the 15 content-readers." If C2 is built to G6's 15/4-pattern receiver-set, handmark is excluded from BOTH the detector AND the B5c re-home roster → on delete it silently FALSE-FAILS W6 with no gate catching it — the exact silent-loss B4f exists to prevent, re-introduced by the off-by-one.
- **Taxonomy correction (both prior counts understate):** only 2 of 16 readers ENOENT-CRASH (the bare-readFileSync structure-sync:74 + doc-consistency:197); the other 14 use guarded helpers returning ''/null and SILENTLY FALSE-FAIL their CLAUDE-asserting clause — a quieter, greener-looking loss. PLAN.md:16's "they ENOENT-break on deletion" describes only 2 of 16.
- **Number-collision hazard:** PLAN.md:42 uses "15" for BG's wave-APPEND count (BG specs that WRITE into CLAUDE.md) while G6 uses "15" for the reader census — two distinct axes sharing a numeral invites conflation. Keep reader-census=16, BG-append=15 disjoint.

### C4 — [MEDIUM] The L15 budget-rebaseline is ALSO one-sidedly folded onto B2.1-swap (same shape as C1)

- **Bands/waves:** BH.B2.1-swap · BG G4.
- **The defect.** BG's G4 homes the L15 net-budget-rebaseline-as-ONE-number on BH-B2.1-swap (same single-writer as the kf-peer bump), with the same one-sided-fold risk. BH's plan carries the export re-baseline (§5-1) but not the profile:budget net-rebaseline obligation explicitly. Confirm BH's plan carries the budget obligation, not just BG's build-map.

### C5 — [MEDIUM] The 2 ENOENT-crashers crash the `--run full` cut battery LIVE TODAY if CLAUDE.md is touched before B5c lands

- **Bands/waves:** BH.B5c-gate-rehome · BH.B4f-claude-delete.
- **The defect.** `proof-claude-structure-sync.mjs:74` (ci) + `proof-doc-consistency.mjs:197` (RELEASE — so it crashes the cut battery). Both PENDING [WS12]; correct-by-design (delete gated on rg-count==0 + born-RED proof:claude-deletable) BUT a deep-tail un-run exposure — the B5c→B4f edge is the ONLY thing keeping the premature-delete crash impossible. The re-home of these two crashers to a generated `structure.md` / a guarded read MUST land before B4f, else the cut battery itself crashes (not a silent fail) — the B5c→B4f ordering is HARD, not advisory.

### C6 — [LOW] Stale-target one-sided references (misdirect a verbatim re-read)

- **B1-W2 value-destraddle:** PLAN.md:62 names `→^1.2.0` against a CLOSED wave (landed `^1.0.0`, on disk `package.json:1080/1118`); BG §2.C2 dropped `^1.2.0` as MOOT (would exclude npm-latest 1.1.1 + RED proof:peer-conformance). BG-canonical CUT floor is `^1.1.1` (EXEC row 19.1). The wave landed correctly; only the plan-text is wrong and actively misdirects toward re-pushing `^1.2.0`.
- **B1-W3 "all met" note:** PLAN.md:63 "the 3 CONSUME interims carry ZERO upstream asks — all met at the pinned 5.1.0/1.2.0" CONTRADICTS BG §2.C1's re-grade to a LIVE broken-gesture defect (the floor is NOT met at ^5.0.0). Two sides disagree on whether the kf consume is discharged.
- **WS6 "+2 siri subpaths":** PLAN.md:68 + :116 say "+2 siri subpaths" but the amended BG (`bg-build-map.md:1173-1174`) froze `siri-waveform` = INTERNAL — real delta is +1 published subpath (`/siri-island`), and siri-island additively bumps /api ABOVE 203 (its Files list includes `api/index.ts`).
- **Plan-vs-disk staleness (expected mid-flight):** §1-#4 describes the lucide bug as open though LANDED (`7813a695`, `vite.library.ts:84`); §9/§3 frame the [C] band as "awaits greenlight" though all 12 [C] arms (rows 1.1-1.12) are DONE. EXEC-PROGRESS is the authoritative cursor; the PLAN lags.

### C7 — [LOW] God-module census drift (split HOLDS, justification drifted)

- **Bands/waves:** BH.B2.4a · BG-WS2/WS8/WS9.
- **Split integrity: SOUND.** No double-claimed carve target (BH dodges BG's src write-set by construction). The one historical double-owner (liquid-morph.css) was already adjudicated by BG §2.P1.
- **Drift 1 — stale-by-success:** BH's 3 owned carves (CarouselContent/PagerDots/useBloomUp, B2.4a) ALREADY LANDED (all <500, rows DELETED from RATCHET); PLAN.md §4/§6/P5 still describe them as pending — re-running would be no-op carves.
- **Drift 2 — cohesion-not-god-module:** the BH-3 are cohesion relocations (~180L/~170L worm-extractions), NOT god-module splits — proof:no-god-module cannot FORCE them (GREEN-by-construction). The carve is justified by proof:colocation, not the 500 bound.
- **Drift 3 — exempt-unrecorded orphans:** `fission-bridge.css` 552 + `property-regs.css` 548 are >500 gate-IRREDUCIBLE cascade-partials with NO exemption verdict in either plan (fission-bridge NEW since P5; property-regs re-grows from BG WS8/WS9 mints). `api/index.ts` re-grew to 505 (NEW, not in census).

---

## §3 Convergence GAPS

1. **The kf-peer bump has no unambiguous cursor home on the BH side (C1).** BG names BH-B2.1-swap as owner but B2.1-swap's PLAN row + EXEC-PROGRESS gate cell (18.1) don't carry it. Until BH's plan echoes the bump, a resumed BH execution reading ONLY BH docs would NOT bump the floor — shipping a 5.0.0 whose snap binding is dead on every ^5.0.0 consumer, with NO device-free gate (the cut env masks it). **This is the load-bearing convergence gap.**

2. **The floor-vs-API gate is unlanded AND cross-tranche-owned (C1).** `proof:peer-conformance` has no useDragMorph/first-snap clause at HEAD; the hardening that would catch C1 lives only in BG.W-GATE-FIELD-AURORA (a WS7 build — lands before the post-WS12 BH-B2.1-swap, so it CAN backstop the bump IF it lands as specced). No double-ownership exists (verified: the clause is genuinely absent, not double-homed). PASS-2 residual: confirm W-GATE-FIELD-AURORA is a real WS7 build so C1's amendment locks against a real gate.

3. **B7 is scoped to the /api-export axis only; the token-axis breaks are unenrolled (C2).** BH runs ONE break vector (/api drop); BG's audit runs THREE (/api drop, `--ring` rename, viz-demigrate). atlas + slides are under-enrolled; the reconciled 4-row consumer-ask table is the amend-ready target. `proof:retired-token-consumers` + the widened `proof:crossrepo-asks` are unbuilt/unreferenced by BH.

4. **`proof:claude-deletable` C2 detector breadth is unspecified against the correct 16 (C3, C4).** The gate is unbuilt; if its receiver-grep inherits BG-G6's 4-pattern set it re-makes the handmark blind spot. The detector MUST enumerate the `rd/readRel` helper aliases (any local wrapper of readFileSync receiving a CLAUDE-bearing arg). Requirement specced here; verification owed to B5c/B4f execution.

5. **The post-WS12 re-baseline carries one un-mechanizable human step (C5-adjacent, F5).** The fail-closed gate FORCES classification of each BG-added dir but cannot pre-judge PUBLISH-vs-INTERNAL for a NOVEL dir (e.g. siri-island). A wrong human call mis-publishes or mis-hides a 5.0.0 subpath. The stale "+2 siri" literal would over-classify by one INTERNAL leaf at re-baseline (caught fail-closed, but costs a re-run cycle).

6. **The B2.4a worm-carve paint re-verify is DEFERRED to BG WS11/WS12 (F8).** A subtler carve break than the (already-repaired) prop-drop near-miss — e.g. a worm parameter silently defaulting that does not surface as a typecheck error — would only paint-fail late in the close, on the "remember this always" liquid-weight directive. The byte-identical render π must exercise the BETWEEN-states worm.

---

## §4 Prototype tasks

Chosen to target the highest-severity issues (C1, C2, C3, C4, C5). All are `mode:'spec'` corrected-approach specs — the amendments are bounded plan-text/gate-wiring edits, NOT feasibility spikes; a worktree implement spike would prematurely author into BH's plan (write-fence: PASS 1 records, the fold applies). The single exception where an implement spike adds real signal is the kf-peer gate clause (T1) — a device-free gate that CAN be prototyped without touching BH's plan.

---

## Appendix — negative findings (record so PASS 2 skips)

- **Band-DAG: STRUCTURALLY SOUND.** Acyclic, B4f unique sink, no back-edge. Every [WSn]/[WS12] tag resolves to a real position-unchanged BG WS (BH references BG only by WS-NUMBER, insulated from G1's CLOSEFIX-9SITE 12.0→0.7 re-sequence + the WS2 dock-wave renames).
- **G1 axis CLEAN.** CLOSEFIX-9SITE→row-0.7 does NOT change any BH [C] start edge (no precond, file-disjoint from every [C] band, empirically all [C] bands DONE while 0.7 PENDING).
- **200/203 path-swaps + ONE dropped key + 3 orphan re-homes: RE-VERIFIED ACCURATE at HEAD** (re-derived twice, proof:subpath-classify EXACT_REPRODUCTION GREEN). No export-surface src change since the BG anchor. WS5 (zero key change) + WS8 (CSS-only) don't touch the 203 set. Drift is only the "+2 siri" prose constant.
- **The 3 /api orphans verified** (Surface→/card, MenuItemVariants→/command, ControlSize→/forms — all export from `_shared` which has no published subpath, all absent from src/subpaths/, all re-home targets real).
- **Non-ask consumers reconcile correctly:** words/frontend/glass-ui (inv-11 vendored fork, no row), keyframes.js/value.js (dev-peer zero-import, no ask), slides-K (census present, 4.0.0 break is consumer's own).
- **No 17th CLAUDE reader** (exhaustive identifier scan surfaced exactly 16 call-sites; no hard reader outside scripts/proof-*.mjs).
- **All version floors current** (vite 8.0.13, ts 6.0.3, vue-tsc 3.3.5, vitest 4.1.9, tailwind 4.3.1). No floor bump owed; exports condition order correct; sideEffects:['*.css'] correct.

siblings-intact exit 0 (after). Only file written: this report.
