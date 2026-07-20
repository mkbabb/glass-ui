# BJ + IOS27-MICRO — EXECUTION-PROGRESS (the execution cursor)

**Authority (owner orders 2026-07-20):** "Prepare for compaction and tranche execution" →
"Begin and continue the current tranche… adhere exactly to the plan… complete the plan IN
TOTALITY… maximal parallelism and workflow usage… authorized to publish, push, and pull…
deploy… core model for orchestration, design, synthesis; defer to Opus or Sonnet for workflow
fanout." Plus: "sci-report/atlas is in active tranche execution currently: coordinate
accordingly" and "Be very careful to ensure that these workflow fanout agents are actually
Opus, and not Fable."

**Spec of record:** `PLAN.md` (§1 DAG + ordering laws · §3 completion model · §4 cadence ·
§7 close definition) under the SUPERSESSION LAW — each `waves/BAND-*.md` roster IS its spec.
The micro-tranche set is `../IOS27-MICRO/FINAL/FINAL.md`; its `W0-PAINT-LEDGER.md` stamps
rows 1–6 verified at 2026-07-20 (6 PASS / 1 DEFER / 0 FAIL). This file is the CURSOR — status
only, never a second spec.

## The model-enforcement law (owner 2026-07-20; binds every execution workflow)

An `agent()` call with NO `model:` option inherits the orchestrator's model — **Fable** — so
an omitted `model:` in a fanout stage is a DEFECT, not a default. Every call declares its
model explicitly; every seat's schema REQUIRES `modelId` and the script asserts
`String(modelId).startsWith(expected)` (prefix, never equality — the `[1m]` suffix lesson).
Tier map: **Fable** = design, judgment, audit, critique, paint-taste, greenfield design loops,
wave challenge passes (A08/J11), orchestration/synthesis (the lead). **Opus** = mechanical
fanout: codemods, moves, gate authoring to a written spec, fix application, test/π running.
**Sonnet** permitted only for bulk trivial fanout, same assertion discipline.

## Standing cadence laws (PLAN §3/§4 — cited, not restated)

≤3 concurrent seats · browser-owning seats strictly serialized (singleton) · hallmark
surfaces (the four greenfields, STORY W4/W5, MATERIAL W2/W3) run the DesignSync + Fable
design lane · every wave closes with a two-critic challenge pass before its gates count ·
live-π discipline (captured DELTA, no `getContext`, localhost, per-band π, pipe-trap rule) ·
liquid-weight + breath-of-life bind every motion/at-rest wave · no legacy, no masking
fallbacks · salvage-first wall protocol; EXEC-STATE (`~/.claude/...bi-addenda/EXEC-STATE.md`)
is the crash bootstrap.

## Sibling coordination (ACTIVE, owner mark 2026-07-20)

sci-report and atlas are executing their own tranches NOW: their trees are moving snapshots —
every consumer census is FRESH-AT-SHIP (re-run immediately before the breaking wave lands,
never trusted from formation time) · siblings READ-ONLY, never parked · `coordination/` drops
may arrive any tick and are verify-before-accept · the Q mailbox is MARKED-HELD (no G-row
execution) · the G-CLOSE veto STANDS (the relayed lift failed verification) · Q060/G1 relay
content pins OUR commit hashes and states their in-flight status.

## Phase ledger

| phase | content | status |
|---|---|---|
| P-CLOSE | The formation close chain `wf_ade2264c-488`: STAB rounds 7+ (two-consecutive-clean) → RU-01 capstone → G1 draft (DRAFT-HELD). ON LANDING protocol in EXEC-STATE. | **WALLED — WALL #14** (session limit, resets 03:00 ET; one-shot resume cron `49b50150` fires 03:04) |
| P-EX1 | `BAND-GATES` W1→W4 FIRST (the truth substrate; PLAN §1 law 1). W4's flip is owed by MATERIAL W6 (same cut). | QUEUED (launches when P-CLOSE lands) |
| P-EX2 | The wide band program as a rolling pipeline: DOC-TRUTH W1 · COLOCATION W1→W3 (W2 = the 8.0.0 `./sidebar` break + G-CONSUMER-ADDENDUM) · REDUCTION W1/W2 + W3's non-ASK slices + W5 · STORY W1–W6 · PERF W1–W4 · MATERIAL W1–W7 (W3 = the DesignSync judgment; W6⇄GATES-W4 coupled cut) · A11Y W1–W2 · FEEDBACK-MOTION W1/W2/W3/W6 (W4 after MATERIAL W1/W2) · BI.W-ENGAGE-AFFORD (re-based off HEAD, RU-25 R3 conditions) | QUEUED |
| P-EX3 | IOS27-MICRO FINAL: W-1 registers/tokens (early, unblocked) · W-2 SPINE-CONDUCTOR (GF-DOCK first consumer) · W-3 F4-R1..12 · W-4 F5-R1..11 · W-6 engagement/breath · W-7 remainders + the W-0 row-7 re-drain when its preconditions land | QUEUED |
| P-EX4 | The four greenfields (hallmark lane, pass-4 paint owed): GF-DOCK (W7 PARKED→ASK-14) · GF-HANDMARK · GF-AURORA (W3 sized by ASK-20; W6 = V-A95 re-repro-or-close, after mode waves) · GF-BLOB (default register per ASK-21; W-DELETE-TWIN per ASK-22) | QUEUED |
| P-EX5 | Cross-repo: fresh sibling census per breaking wave · the Q060 outbound relays · the G1 send | QUEUED (G1 content lands at P-CLOSE) |
| P-CLOSE-BATTERY | PLAN §7 whole: collapsed gate battery GREEN · challenge passes complete · π/DELTA captured · overfitting audit · ASK resolved (owner) · `--run release` not `--run local` (the 7.0.0 lesson) · the 8.0.0 cut + tag-push provenance publish (authorized) | QUEUED |

## PARKED rows (named gates; they park their wave only, never the tranche)

- **ASK-gated (owner rulings pending; the explicated register + suggestions were delivered
  2026-07-20):** REDUCTION W4 (ASK-1/ASK-2) · the W3 ASK slices — easing→demo (ASK-11),
  compositions prune + the scene-type stake (ASK-13), confirm-dialog fold (ASK-3) · the
  scroll-family table (ASK-4) · tempo page fold (ASK-5) · carousel delete (ASK-6) · timeline
  collapse shape (ASK-7) · DataTable/Fourier/Constellation/easing/WatercolorDot dispositions
  (ASK-8..12) · FM W4 Alert idiom (ASK-25) · FM W5 idle-breath — HARD-BLOCKED (ASK-27; no band
  pre-decides the axis) · STORY W1's `scene` type (ASK-13) · GF-DOCK W7 fission (ASK-14) ·
  aurora crayon scope sizes GF-AURORA W3 (ASK-20) · blob default (ASK-21) · WGPU-twin
  sequencing (ASK-22) · ASK-26 is a veto WINDOW only (MATERIAL W3 decides at the paint lane).
- **Veto/held:** V-PERCH-PRIMITIVE (FINAL W-5) — the G-CLOSE veto STANDS · the atlas Q G-rows
  — mailbox MARKED-HELD.
- **Conditional:** ASK-24 CI-GPU fallback (fires only if the SwiftShader probe fails) ·
  device-capture lane (D-2 non-goal unless the owner supplies one).

## Early unambiguous rows (first execution content, no ASK dependency)

1. `BJ.W-GATE-COLLAPSE` (GATES W1) — the ~1055→45-55 keep collapse (the abrogation mandate).
2. GATES W2/W3 born-RED authorship; then MATERIAL W7 chip/glass-atom @import restore flips W3
   (the one real shipped defect, trio-confirmed).
3. FINAL W-1 registers/tokens (springPreset 0.35 dock · panel · orb-drop · SPEC §9 cures ·
   scheme-spring regen · engageEnvelope).
4. The rim-retune merge from the engage bank `224024c3` — LIVE-DEFER LIFTED by RU-26 (rides
   BI.W-ENGAGE-AFFORD's re-base, not a cherry-pick).
5. V-A95 retire paperwork (4× non-reproduction; the GF-AURORA W6 row remains the
   re-repro-or-close of record).

## Wall log (execution-era)

- **WALL #14** — 2026-07-20 ~01:52 ET, session limit at STAB round 7 (both Fable critics);
  resets 03:00 ET. Salvage: NONE OWED (critics died pre-write; tree clean). Resume armed:
  one-shot cron `49b50150` at 03:04 + guardian `c0d4ab90` (v6, 11/37 past each hour).
  **RECOVERED 03:04 ET** — the one-shot fired, `wf_ade2264c-488` resumed (task `wpqtbi929`),
  both round-7 critic seats confirmed alive at 03:05. P-CLOSE is LIVE again.

## Bootstrap (fresh context)

Read EXEC-STATE §DURABLE PROCESS → this cursor → `PLAN.md` §1/§4 → the live wave's band file.
Workflows resume via `Workflow{scriptPath, resumeFromRunId}` per the EXEC-STATE manifest.
Exactly ONE guardian cron lives (v6 execution-era); crons are session-only — a NEW session
recreates the guardian from this cursor + EXEC-STATE and re-arms any pending wall resume.
