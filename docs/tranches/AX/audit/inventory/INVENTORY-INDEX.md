# AX tranche — deep inventory (2026-06-08, step-back audit)

Orchestrator scaffold for the 32-lane inventory (`inventory/<id>.md`). This is the
step-back the user requested: what's been done, what remains, the constellation + slides,
the precept/prompt recap, the deferred-fold, the path forward. PLANNING only — no
implementation this phase.

## Snapshot (HEAD c72d2ac, on at-dock-convergence == master)

- **glass-ui 3.8.0 PUBLISHED** to npm (provenance). master consolidated (195+ commits FF).
- **63 wave rows**: 19 complete · 9 live-verified · 5 live-pending · 35 planned.
- **Two convergence rounds landed**: conv-1 (17 defects → W44-W52, W52 DEVELOPED+live-verified);
  conv-2 (pass-2 → W53-W59 + dock band; W53/W56/W57/W58/W59/W19 DEVELOPED+live-verified,
  the dock band in dev now, W54/W55 planned).
- **The cardinal lesson is institutionalized**: `live-pending` status (W09/W05 were marked
  complete on headless-green; the live audit contradicted them). Every "complete" re-verifies
  on the real device via chrome-devtools-mcp.

## The constellation (cross-repo state at audit time)

| Repo | Branch / HEAD | Role | Note |
|---|---|---|---|
| glass-ui | at-dock-convergence c72d2ac | publisher + consumer | 3.8.0 published; AX in flight |
| speedtest | master 0751905 | consumer (reader-only, inv-16) | on 3.6.0; R-CONSUME bump to 3.8.0 pending; routed asks (vt.ready, demandPark, CompletionSeal, a11y) |
| **slides** | **deck/feedback-coder 1461683** | consumer + /deck | tranches A-J; til-briefing + Tranche K; deployed slides.friday.institute — CRITICAL audit lane |
| words | master d11640d | consumer | proof:consumers:static scanned |
| fourier-analysis | master 0167268 | consumer | proof:consumers:static scanned |
| keyframes.js | tranche-i-dev f7f1725 | publisher dep | spring/keyframe runtime; CI publish-local; W35 prune |
| value.js | tranche-f-handoff b4defb0 | publisher dep (transitive) | color normalization; W34/W35 edge |
| bbnf-lang | master f4633d46 | consumer (playground) | proof:consumers:static scanned |

## What the 32 lanes resolve (consolidated on harvest)

1. **Wave-status truth** (W-* lanes) — the real DONE/PARTIAL/PLANNED per band.
2. **Session soundness** (S-* lanes) — what's live-verified vs headless-only; the cardinal re-verify list; gate/CI health.
3. **The constellation** (C-* lanes) — the 8 sibling repos, the consume/publish edges, slides specifically.
4. **Recap + deferred + path** (R-* lanes) — the prompt/precept recap (ADDRESSED matrix), the deferred-fold, the needs-user-decision list, the master path-forward synthesis.

## The orchestrator will, on harvest

- Consolidate the 32 findings into a single PATH-FORWARD plan (the convergent-optimum roadmap:
  execution order, batching, the cardinal re-verify list, the publish cadence, the slides+
  constellation edges).
- Fold every surfaced DEFERRED item into the AX wave set (per the user directive).
- Surface the NEEDS-USER-DECISION list for adjudication.
- Update PROGRESS.md + the wave table.
- Hand the user the recap matrix (every prompt ADDRESSED/PARTIAL/UNADDRESSED).
