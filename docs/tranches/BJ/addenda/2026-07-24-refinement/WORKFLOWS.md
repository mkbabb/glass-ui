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
| `wf_5e7dd9f7-18a` dag-triumvirate | `dag-triumvirate.wf.js` | **CLOSED 16/16** | `DAG-RULINGS.md` |
| `wf_71b65b7b-323` structure | `structure.wf.js` | **CLOSED 22/22** | `DIRECTORY-SHAPE.md` (survey); zone adjudications in journal — **fold into the structure settlement wave at R5** |
| `wf_6cb9f75f-b6c` proportion | `proportion.wf.js` | **CLOSED 31/31** | `PROPORTION.md` |
| `wf_b5c595d5-e53` reckoning | `reckoning.wf.js` | **CLOSED 14/14** | folded into `EXEC-STATE.md` corrections + the owner report |
| `wf_6b459be5-e21` reconcile | `reconcile.wf.js` | **CLOSED 17/17** (2nd launch) | `RECONCILIATION.md` |
| `wf_aaa19aee-da2` tier-2 | `tier2.wf.js` | **CLOSED 65/65** (tri-fold resume) | `COMPONENT-WAVES-TERMINAL-2.md` |
| `wf_ab31a195-57f` layout | `layout.wf.js` | **CLOSED 8/8** | `LAYOUT.md` |
| `wf_50bff562-da7` greenfield | `greenfield.wf.js` | **CLOSED 41/42** (one arm to a schema retry cap; duplex absorbed it — all 5 lanes + fold present, every apotheosis Fable-adjudicated) | `GREENFIELD-TERMINAL.md` — **boundary duties still OPEN** (blob/aurora reconcile at procedural close) |
| `wf_51cdb0e0-bdb` procedural | `procedural.wf.js` | **CLOSED 16/16** | `PROCEDURAL-LEDGER.md` — its routing §3 DISCHARGES the boundary duties below |

Historical/superseded scripts kept for archaeology: `components-flat`, `component-apotheosis`,
`component-dag`, `ecoute-dag`, `exemplar-frames`, `parent-components`, `parent-design`, `canon-opus`.
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
| novelties | `wf_16a39d5d-36b` | `novelties.wf.js` | `NOVELTIES.md` — Fable brainstorm ×2 (DesignSync law) → union with the extant census → thrice diverse-lens critique → Fable apotheosis. Interim codex arms at `scratchpad/ios27/codex-arm-{fable,opus}.md` until EXEMPLARS-CODEX banks |
| perfect | `wf_54069001-013` | `perfect.wf.js` | amended `TERMINAL-ROSTER.md` (folds a-f incl. frost verdict + tier-3 complete) + the `docs/tranches/BK/` cut on disk + supersession banners; codex/novelties land via the declared STAGE-2 DELTA row if absent at runtime |
| design-now | `wf_2eec57c9-fb5` | `design-now.wf.js` | `DESIGN-NOW.md` — the Seventh-Ecoute engine: GF-BLOB physics PROTOTYPED (the "Experiment." run; prototype under `scratchpad/design-now/blob-physics/`; owns the browser if paint needed) · GF-FOURIER authored (N7) · W-CHIP authored (blocker #5) · W-DESIGN-CANON body authored — thrice-design per lane, zero deferred-design clauses survive |
| archaeology | `wf_1a9b1bd8-dad` | `archaeology.wf.js` | **CLOSED 43/43** → banked `ARCHAEOLOGY.md` (44-theme ecoute register over ~1,500 owner messages, recurrence×implementation matrix, lessons ledger, §4 = roster row #70 intake payload) |
| gestalt | `wf_e3eec3a9-c1f` | `gestalt.wf.js` | **CLOSED 9/9** → banked `GESTALT.md` (tri-fold verdict, 8 disk-ruled adjudications; carries the OWED-LIVE cell list for the later browser pass) |

| ios27-exemplars | `wf_a31672c0-e81` | `ios27-exemplars.wf.js` | **CLOSED 16/16** (one wall survived at the apotheosis) → banked `EXEMPLARS-CODEX.md` — phenomenon table + choreography laws (candidate canon for W-DESIGN-CANON) + routed deltas + 10 frame-ruled adjudications; every timing burst-cited, every constant a ratio/delta |
| frost-tabs | `wf_b0b48d79-692` | `frost-tabs.wf.js` | **CLOSED 5/5** → banked `FROST-TABS-REAUDIT.md` (f1/f4/f5 exemplars found IN-REPO at IOS27-MICRO/prototypes; the four authored causes D-1..D-4; blanket-cure-alone lands at f5-poor — the veil/photometry/brightness arms are load-bearing; 8 banked-record corrections incl. the prefix-trap 7→5 re-count; Chrome seat released) |
| novelties (QUEUED) | — | authored at launch, after the codex banks | `NOVELTIES.md` — Fable brainstorm → union with extant → thrice critical pass; design authoring via DesignSync per the tri-fold law |
| perfect (QUEUED LAST) | — | `perfect.wf.js` | amended `TERMINAL-ROSTER.md` + the `docs/tranches/BK/` cut — fires only after ALL above bank |

**The archaeology corpus** (input to `wf_1a9b1bd8-dad`) lives in the scratchpad at
`…/scratchpad/archaeology/{claude,codex}/` — 697 claude + 839 codex owner messages, 21+4 shards.
It is REBUILDABLE: `./wf/extract-archaeology.sh <outdir>` re-extracts from the raw transcripts
(26 glass-ui sessions + 5 satellite dirs + 106 glass-ui codex rollouts), then shard per the script
header. Rebuild + relaunch is lossless; in-session, `resumeFromRunId` replays cached seats only if
the shard files sit at the SAME absolute paths (prompts embed them).

## If a wall hits during a live run

1. New session reads `EXEC-STATE.md` → this file.
2. Check both live runs' journals (paths above). Harvest any `{"type":"result"}` lines into the
   banking targets named in the run ledger.
3. Re-seed missing seats: copy the script from `./wf/`, relaunch (same session: `resumeFromRunId`;
   new session: fresh run — the tri-fold law says cached/banked Opus material is the Opus arm, never
   re-run it; author only the missing arms + adjudication).
4. Execute the boundary duties above before citing any lane's output.
