# WORKFLOW RESUME MANIFEST — the wall bootstrap

**Purpose.** Everything needed to recover every workflow after a session wall, a compaction, or a
reboot, without this conversation. Read this + `EXEC-STATE.md` and nothing is lost.

**The three durability layers.**
1. **Scripts** — canonical copies in `./wf/*.wf.js` (committed). The live paths under
   `/private/tmp/claude-504/…/scratchpad/wf/` are working copies; on reboot, re-seed them from here
   (`Workflow` needs an on-disk scriptPath — copy back to any path and pass it).
2. **Journals (the resume cache)** — `~/.claude/projects/-Users-mkbabb-Programming-glass-ui/`
   `f7246310-06bc-4dbe-ba5d-9b…/subagents/workflows/<runId>/journal.jsonl`. Durable across walls and
   reboots. `Workflow({scriptPath, resumeFromRunId})` replays completed `agent()` calls whose
   (prompt, opts) are unchanged — **never edit a cached stage's prompt text if you want its replay.**
   Resume is same-session-scoped: in a NEW session, journals are read-manually-only — harvest results
   from the journal (one `{"type":"result",…}` line per agent) and re-run only what is missing.
3. **Banked results** — every completed run's output is IN THIS CORPUS (committed), listed per run
   below. A run whose output is banked needs no resume at all.

**The wall protocol (standing, from EXEC-STATE):** salvage-first — read the journal before relaunching
(cached results may exist even when the run "failed"); resume with `resumeFromRunId` in-session; only
failed seats re-run. Model law for resumed runs: cached Opus seats stand as the Opus arm of the
tri-fold; only the Fable arm + adjudication are owed on top.

---

## Run ledger (2026-07-25)

| run | script (`./wf/`) | state | output → banked at |
|---|---|---|---|
| `wf_df5ddb7a-134` apotheosis | `apotheosis.wf.js` | **CLOSED 60/60** | `COMPONENT-WAVES-TERMINAL.md` |
| `wf_5e7dd9f7-18a` dag-triumvirate | `dag-triumvirate.wf.js` | **CLOSED 16/16** | `DAG-RULINGS.md` (the `cluster-dock`/`cluster-pairs` seats are journal-only, SUPERSEDED in substance by its §2/§3/§3a — VALIDATION run 2) |
| `wf_71b65b7b-323` structure | `structure.wf.js` | **CLOSED 22/22** | `DIRECTORY-SHAPE.md` (survey) + **`STRUCTURE-ZONES.md`** (banked 07-28: four zone settlements + the whole-repo fold + §6 src/styles per VALIDATION CURE-1) |
| `wf_6cb9f75f-b6c` proportion | `proportion.wf.js` | **CLOSED 31/31** | `PROPORTION.md` |
| `wf_b5c595d5-e53` reckoning | `reckoning.wf.js` | **CLOSED 14/14** | absorbers-of-record: `RECONCILIATION.md` (:62/:262) + `ARCHAEOLOGY.md` §R-3 + `EXEC-STATE.md` corrections (VALIDATION CURE-7 names them) |
| `wf_6b459be5-e21` reconcile | `reconcile.wf.js` | **CLOSED 17/17** (2nd launch) | `RECONCILIATION.md` |
| `wf_aaa19aee-da2` tier-2 | `tier2.wf.js` | **CLOSED 65/65** (tri-fold resume) | `COMPONENT-WAVES-TERMINAL-2.md` |
| `wf_ab31a195-57f` layout | `layout.wf.js` | **CLOSED 8/8** | `LAYOUT.md` |
| `wf_50bff562-da7` greenfield | `greenfield.wf.js` | **CLOSED 41/42** — the lost seat was the GF-AURORA pass-4 PAINT diverge arm; VALIDATION §3 rules the loss ABSORBED (the bench pair's live re-measurement + `PROCEDURAL-LEDGER.md` §1.2/§3.2 are the absorbers, strictly more than the lost arm) | `GREENFIELD-TERMINAL.md` — boundary duties DISCHARGED (see the dated section below) |
| `wf_51cdb0e0-bdb` procedural | `procedural.wf.js` | **CLOSED 16/16** | `PROCEDURAL-LEDGER.md` — its routing §3 DISCHARGES the boundary duties below |

Historical/superseded scripts kept for archaeology: `components-flat`, `component-apotheosis`,
`component-dag`, `ecoute-dag`, `exemplar-frames`, `parent-components`, `parent-design`, `canon-opus`.
Provenance marks (VALIDATION run table): `ECOUTE.md` is a **single Opus fold, never adjudicated**
(cite accordingly); the canon-opus CROSS-FOLD is under adjudication (CURE-4, cures run); all nine
Jul-24 runs are SUPERSEDED-CLEAN with named successors.
Data snapshots: `dag-deterministic.json`, `dag-clusters.json` (cluster figures CONTESTED — see
EXEC-STATE census row; membership stands, aggregates do not).

## Boundary duties — DISCHARGED 2026-07-27 (lead-verified: PROCEDURAL-LEDGER §3 reconciles GF-BLOB under the senior physics apotheosis and GF-AURORA under the procedural Ecoute; the slides relay is drafted there). Historical record below.

- **`wf_50bff562-da7` GF-BLOB lane** → reconcile against (a) WebGPU-only (WebGL2 arm CUT) and (b) the
  BLOB PHYSICS CHARTER (satellites = recursive Blob instances, chaotic elliptical orbits,
  coordinated-vs-emergent EXPERIMENT) — both in EXEC-STATE. The procedural run's blob-physics
  apotheosis is the senior design; the greenfield lane's output is an input to it, not a peer.
- **`wf_50bff562-da7` GF-AURORA lane** → reconcile against the procedural Ecoute ("parts of aurora").
- **`wf_51cdb0e0-bdb`** → on close, bank the fold as `PROCEDURAL-LEDGER.md`; GF-FOURIER's slides relay
  addendum routes to the slides tranche.

## LIVE RUNS — batch of four, launched 2026-07-27 ~17:45 ET (the closing-formulation batch)

| run | id | script (`./wf/`) | banking target on close |
|---|---|---|---|
| consolidate | `wf_1f04cfd9-089` | `consolidate.wf.js` | **CLOSED 5/5** → banked `TERMINAL-ROSTER.md` (70 rows, critic fold 31-ADOPT/2-REFUTE/0-drops, gate budget rebuilt to exactly 60, Φ0 executable). **OWED on top:** the final folding pass — GESTALT §4 routed deltas + ARCHAEOLOGY §4 plan amendments + the tier-3 fold land in the roster once both close (the roster's foreman predates all three) |
| tier-3 | `wf_c6d8b0c5-fcf` | `tier3.wf.js` | **CLOSED 52/52** (two walls survived; 34 cached + 18 live on resume) → banked `COMPONENT-WAVES-TERMINAL-3.md` COMPLETE — ten tri-fold lanes + the ten-lane fold; supersedes the partial bank in full |
| novelties | `wf_16a39d5d-36b` | `novelties.wf.js` | **CLOSED 8/8** → banked `NOVELTIES.md` — 43 rows ruled 9-BUILD/3-EXPERIMENT/31-AMEND, 13 arms to §REJECTED; cross-cut rulings X-A..X-G (mover/material roles, engagement channel budget, the two engine doctrines) |
| experiments | `wf_edc5c430-3f0` | `experiments.wf.js` | **CLOSED 4/4** → banked `EXPERIMENTS.md` — rows 38+40 **SPEC-CONFIRMED** (construction arm): grasp rung pair enters #22 (with the G-1 monotone-release cure — single-layer crossfade), loupe k-band [1.15,2.60]/V0=900 enters #35; the harness's own inadmissible metrics struck (identity-centering, adjacency-crop π, 25ms-edge perf). Live capture SEQUENCED — owner: lead; trigger: design-now close frees the browser. Device cells ride #67 |
| perfect | `wf_54069001-013` | `perfect.wf.js` | **CLOSED 8/8 → BK CUT-COMPLETE** (committed `99706211`): amended `TERMINAL-ROSTER.md` (90 rows), `docs/tranches/BK/` (PLAN/PORT §1.4 Q-waves/cursor 90-90/gates Σ=60/ASK three-glances), BI+BJ banners; seal cured the critic's 4 misses on disk. Execution blockers live on TR §VERDICT's own rows |
| design-now | `wf_2eec57c9-fb5` | `design-now.wf.js` | **CLOSED 13/13** → banked `DESIGN-NOW.md` — GF-BLOB re-cut with the experiment RUN (both arms' simulators re-reproduced byte-exact by the adjudicator; regime-F integral pump wins; **separation bar R+r+2k₀ — PROCEDURAL-LEDGER's 0.380 overturned as a raw-smin instrument artifact**; drive default 0.90, λ min-seed 0.86 undriven, depth cap 2) · GF-FOURIER (N7 discharged) · W-CHIP (blocker #5 discharged) · canon body. Its close FIRED the sequenced capture (running, owner: lead) |
| validate | `wf_42cc8a9d-9cc` | `validate.wf.js` | **CLOSED 4/4** → banked `VALIDATION.md` — 30-run census (15 COMPLETE · 6 SUPERSEDED-CLEAN · 4 IN-FLIGHT · 5 DEBT), 8 cures. **Lead executed 07-28**: CURE-1 (`STRUCTURE-ZONES.md` §6 + header) · CURE-2 (`PROPORTION-CATEGORIES.md`) · CURE-3 (`PROCEDURAL-APOTHEOSES.md` + the DESIGN-NOW-blob reconcile rider for stage-2) · CURE-6 (ASK.md R-7 footage row) · CURE-7 (this ledger + GRAPH-RULINGS + EXEC-STATE marks) · CURE-8 (PID 2506 killed). CURE-4/5 → the cures run below |
| cures | `wf_8253976f-a84` | `cures.wf.js` | **CLOSED 4/4** → banked `CURES.md` — CROSS-FOLD retired (CF-1/X3 ADOPTED→#26 one clause, X4 ADOPTED→#78; CF-2/CF-5a/CF-6b REFUTED with falsifiers; 15 collisions ALREADY-SEATED with citations) + `W-OVERLAY` terminal spec (#89 discharged). **All debt from VALIDATION.md is now CLEAN** |
| capture (Agent seat) | `a25136de…` | — | **CLOSED** → `EXPERIMENTS.md` §CAPTURE ADDENDUM (`ef0307b2`) — grasp AMEND (G-1 refuted in pixels; frost-thinning the real defect; single-layer cure BLOCKED), loupe CONFIRM (F-5 quotable both arms); 17 screenshots at `scratchpad/experiments/capture-2026-07-28/` |
| stage-2 | `wf_95c36395-9fa` | `stage2.wf.js` | **RELAUNCHED 2026-07-28 (lead, `resumeFromRunId`) — IN-FLIGHT.** First launch walled (2 `started`, 0 `result`; writer/critic/seal never ran). The relaunched brief adds input (f) THE CODEX META-AUDIT (`../../audits/2026-07-28-*/`, owner-directed input, mined under EXEC-STATE §THE CODEX META-AUDIT posture ruling — facts adopted with greps, its Sol/Luna process directives VOID under the dissolution) and input (g) the three salvaged arm drafts `STAGE2-FOLD.arm-fable` / `TERMINAL-ROSTER.stage2-arm-opus` / `TERMINAL-ROSTER.stage2.arm-fable` (material never authority — the opus tail's "NOVELTIES/DESIGN-NOW absent" claim is FALSE; the writer DELETES all three after the fold lands, atomic-state rider honored). Codex evidence pointers stand: `../../audits/2026-07-28-claude-resume/FINDINGS-AND-HANDOFF.md` + `../../../BK/AUDIT-REFRESH-2026-07-28.md`. Banking target: amended `TERMINAL-ROSTER.md` + BK cursor/PORT + the seal's FORMULATION-CLOSED verdict. |
| proof-sweep | `wf_8a75422c-8a1` | `proof-sweep.wf.js` | **LAUNCHED 2026-07-28 evening (lead) — IN-FLIGHT.** The owner-sitting proof sweep, three lanes: (A) every uncommitted codex edit adjudicated ADOPT/REVERT/HOLD (35 tracked M files incl. the `supportsBackdropRefract.ts` src change + the untracked `verify:governed` instrument) · (B) consumer substance proofs for the chopping-block components (instrument-chassis owner condition, carousel owner word, root-barrel resolution, live-major relay split) · (C) the BA–BJ tails inventory (ten tranche seats → union ledger: FOLDED/RETIRED/ORPHANS). 20 Opus digest seats + 3 Fable adjudicators; read-only, sibling repos read-only; banking targets: the codex-edit disposition table, the disposition evidence table, the union tails ledger — all fold into the post-stage-2 perfection pass. |
| deck-relocation | `wf_8ea3a20f-669` | `deck-relocation-sweep.wf.js` | **CLOSED 7/7 (0 errors)** → banked `DECK-RELOCATION.md` — PART I the deck adjudication: the 51-row three-way split table (slides facilities → G/A/S/DEL), atlas prior-art dispositions (`useStageDeck` pattern-absorbed, `useDeckDetent` = the LAW-11 travel arm, "detent" name refused), the shared-substrate ruling (deck home, carousel a register over it, embla DELETES with the **named loop clean break** + words relay), 8 incredulity findings (the adopt-time spring drift §0.1, the three-way `[data-state]` schism §0.6), and the #40 ⊕³ widened wave-amendment BODY for the perfection fold to seat verbatim · PART II the relocation roster: 14 already-ruled annotations, ONE new relocate-candidate (fourier-field→slides, owner word), 20+ STAY verdicts (surface/handmark/scroll-progress-rim substance-overrides-concentration), 5 subpath delete-candidates routed to the fold, the census-instrument false-negative class (§6). 3 OWNER-GLANCE rows carried in the bank header. |
| archaeology | `wf_1a9b1bd8-dad` | `archaeology.wf.js` | **CLOSED 43/43** → banked `ARCHAEOLOGY.md` (44-theme ecoute register over ~1,500 owner messages, recurrence×implementation matrix, lessons ledger, §4 = roster row #70 intake payload) |
| gestalt | `wf_e3eec3a9-c1f` | `gestalt.wf.js` | **CLOSED 9/9** → banked `GESTALT.md` (tri-fold verdict, 8 disk-ruled adjudications; carries the OWED-LIVE cell list for the later browser pass) |

| ios27-exemplars | `wf_a31672c0-e81` | `ios27-exemplars.wf.js` | **CLOSED 16/16** (one wall survived at the apotheosis) → banked `EXEMPLARS-CODEX.md` — phenomenon table + choreography laws (candidate canon for W-DESIGN-CANON) + routed deltas + 10 frame-ruled adjudications; every timing burst-cited, every constant a ratio/delta |
| frost-tabs | `wf_b0b48d79-692` | `frost-tabs.wf.js` | **CLOSED 5/5** → banked `FROST-TABS-REAUDIT.md` (f1/f4/f5 exemplars found IN-REPO at IOS27-MICRO/prototypes; the four authored causes D-1..D-4; blanket-cure-alone lands at f5-poor — the veil/photometry/brightness arms are load-bearing; 8 banked-record corrections incl. the prefix-trap 7→5 re-count; Chrome seat released) |
(the interim QUEUED rows for novelties/perfect were superseded by their live rows below — struck per VALIDATION CURE-7)

**The archaeology corpus** (input to `wf_1a9b1bd8-dad`) lives in the scratchpad at
`…/scratchpad/archaeology/{claude,codex}/` — 697 claude + 839 codex owner messages, 21+4 shards.
It is REBUILDABLE: `./wf/extract-archaeology.sh <outdir>` re-extracts from the raw transcripts
(26 glass-ui sessions + 5 satellite dirs + 106 glass-ui codex rollouts), then shard per the script
header. Rebuild + relaunch is lossless; in-session, `resumeFromRunId` replays cached seats only if
the shard files sit at the SAME absolute paths (prompts embed them).

## If a wall hits during a live run

1. New session reads `EXEC-STATE.md` → this file.
2. Census EVERY run dir's journal (`ls -t <transcript-root>/wf_*/journal.jsonl`), not a remembered
   list. Harvest any `{"type":"result"}` lines into the banking targets named in the run ledger —
   by seat identity, never size-rank (VALIDATION §4 rule 3).
3. Re-seed missing seats: copy the script from `./wf/`, relaunch (same session: `resumeFromRunId`;
   new session: fresh run — the tri-fold law says cached/banked Opus material is the Opus arm, never
   re-run it; author only the missing arms + adjudication).
4. Execute the boundary duties above before citing any lane's output.
