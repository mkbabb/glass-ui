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

## NO RUNS LIVE as of 2026-07-27. If a wall hits during a future run

1. New session reads `EXEC-STATE.md` → this file.
2. Check both live runs' journals (paths above). Harvest any `{"type":"result"}` lines into the
   banking targets named in the run ledger.
3. Re-seed missing seats: copy the script from `./wf/`, relaunch (same session: `resumeFromRunId`;
   new session: fresh run — the tri-fold law says cached/banked Opus material is the Opus arm, never
   re-run it; author only the missing arms + adjudication).
4. Execute the boundary duties above before citing any lane's output.
