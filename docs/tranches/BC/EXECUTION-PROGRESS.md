# BC — EXECUTION PROGRESS (the build cursor; resume anchor for the EXECUTION phase)

> **Phase: EXECUTION (greenlit 2026-06-19).** Tranche-dev is CONVERGED (96 waves, see `FINAL.md`).
> This file is the EXECUTION resume cursor — the BB-style `PROGRESS.md` for BC's build. On any
> revival (cron `f3da0715`, compaction, rate-limit recovery) READ THIS FIRST, then continue the next
> un-built tier per `EXECUTION-DAG.md §4` (the 29-tier topo order).

## Branch + base
- Working branch: **`tranche/BC`** (off master @ `7416a00a` after the BB→master FF-merge, 2026-06-19).
- master is at `7416a00a` (BB+BC-dev fully merged + pushed). BC execution commits land on `tranche/BC`;
  merge to master at `BC.W-CUT` (user-gated).
- Intentional working-tree deletions carried over (CLAUDE.md, .retired-classes.txt, c1-rail2.mjs) — the
  user confirmed; BC's `proof:claude-structure-sync` wave (GLASS-PRUNE, Tier 6) regenerates CLAUDE.md.

## The orchestration model (the team-lead discipline)
- **Per tier:** a Workflow fan-out (opus/sonnet agents, batches of 3-4 — the rate-wall floor). Agents edit
  the SHARED tree, **file-disjoint** (read each wave's `Mechanism/files`), **read-only git, NO commits**,
  and **do NOT touch the hot shared files** (`scripts/gates.mjs`, `package.json`, `src/styles/index.css`
  unless sole owner) — they emit those as structured `gatesRegistration`/`sharedFileRequests`.
- **The orchestrator (core model) owns:** gates.mjs/package.json registration, the LIVE paint verification
  (dev server :5199 + chrome-devtools/playwright capture, both modes × desktop+mobile, LIVE motion), the
  gestalt verdict, the commit. **No source-green close** — every wave closes born-RED→GREEN with a CAPTURED
  paint delta (BC's anti-disease law).
- Models: orchestration/design/synthesis = core (Opus 4.8); fan-out = `opus` (heavy impl) / `sonnet` (mechanical).

## Tier cursor (EXECUTION-DAG §4)
| tier | band | waves | status |
|---|---|---|---|
| 0-1 | F | PM-BB/BA/AZ/SYNTHESIS | **DONE** — forensics confirmed (4 specs consistent, 29 classes, 8 anchor gates present; req→clause traceability appended to SYNTHESIS.md) |
| 2 | 0 | GESTALT-FIRST · PAINT-GATE · FOLD-LEDGER | **DONE** — proof:ba-gestalt re-authored ci-blocking pixel-reader (G5-G8, born-RED 13/13 surfaces until Band 1); proof:bc-fold-ledger 213-fold GREEN; paint-arm.mjs + proof:observer-loop born-RED; gates registered + verified (tag-parity/script-parity GREEN). Commit 3f844432→ |
| 2.5 | 14 | VIRTUAL-WINDOW → TOC-RECONCILE · FUZZY-HARDEN | pending (early primitives, ‖ Band 1) |
| 3-6 | 1 spine | BLACK-BAR → GLASS-IDENTITY → ADAPTIVE-RECONCILE → GLASS-LEGIBILITY-MEASURED | **DONE** — warm-cream floor π-VERIFIED (130/130 both projects, real-GPU); observer loop CLOSED; black-bar retired; grey-slab REDs |
| 6-7 | 1 fan | GLASS-PRUNE · DESHADCN · SELECTION-CARD · GLASS-GLOW-FIX · ACCENT-TONE · AX-METAL-GLOW · DIALOG-GLASS · BUTTON-GLASS-IOS | **DONE** — fan π 43/43 (1 booked press→Band 7) both projects; glass-glow real-defect fixed; CLAUDE.md regenerated; glass-panel retire HELD (live Atlas consumer→ATLAS-ASK); selectable-chip subpath shipped |
| 7′ | 7 | MOTION-ONE-CLOCK → SPRING-EASE → AFFORDANCE-MAP/TUNABLE-ANIM + SPLIT-CHARS/MOTION-PRESETS | pending |
| 7.7 | 12 | CUSTOMIZABILITY-CENSUS → CONTROL-CUSTOM/OVERLAY-UNIFORM/SEARCH-CUSTOM + METRIC-HOVER/FOURIER-DECIDES | pending |
| 8-11 | 2 | DOCK-ENGINE → fan → LIQUID-MORPH/COLLAPSED-BOTH → STACK-RAIL + CTA-SEAT/COCKPIT | pending |
| 11.5 | 13 | SCROLL-TRIGGER → SCROLL-CHROME → DOCK-SEARCH | pending |
| 12-13 | 3 | TABS-IOS → LIQUID-TAB/UNDERLINE-TUNE | pending |
| 14-17 | 4 | WEBGPU-EVERYWHERE/SAFARI-WEBGL → cross-cut → 9 per-viz [‖] → MEATBALL/HYBRID/GRID-SIMPLE | pending |
| 18 | 6 | RADIO-FIX → DROPDOWN-FIX/CONTROL-SMOOTH → CONFIG-RIGHT + COMPLETION-SEAL | pending |
| 19-22.7 | 5 | PAGE-PRUNE → DEMO-COPY-PRUNE → PAGE-CHASSIS → fan → PADDING-CANON → EXPANDABLE-PART | pending |
| 23 | 4 | VIZ-CONFIGURATOR-SUITE | pending |
| 24 | 9 | STORYBOOK-META | pending |
| 25 | 11 | CSS-CRITICAL/PERF-PRODUCER → LIGHTHOUSE + BP-LAZY | pending |
| 26 | 10 | DECK (+ DIST-COMMENT-FIX early) | pending |
| 27 | 10 | **CUT** (terminal, user-gated 4.x publish + slides redeploy) | pending |
| 28 | 10 | SPEEDTEST-ADOPT/FOURIER-ASK/ATLAS-ASK (post-cut adopt sweep [‖]) | pending |

## Per-wave close checklist (the gate every wave passes)
1. src/ gestalt change implemented per the wave's `Target spec` + `Mechanism/files`.
2. `proof:*` gate authored/extended, **born-RED on HEAD's broken paint → GREEN on the fix** (+ self-test bite).
3. `tests-visual/*.spec.ts` π reads PAINT (`gates.mjs --run pi` on a real GPU device).
4. CAPTURED paint delta (fresh `:5199` capture, both modes × desktop+mobile, LIVE motion) + gestalt verdict
   recorded in `docs/tranches/BC/audit/visual/<WAVE>-DELTA.md` + the `bc-gestalt-roster.md` row GREEN.
5. gate registered in gates.mjs/package.json (orchestrator); `--run ci` stays green; commit.

## In-flight / log (append-only)
- 2026-06-19: BB→master FF-merge done + pushed. tranche/BC created + pushed. Revival cron `f3da0715` armed
  (`13,38 * * * *`, durable). Infra recon done (v4.0.1, ~300 proof scripts, gates.mjs 1997L, 119 π specs).
- 2026-06-19: **Band F + Band 0 CLOSED** (workflow wdkviq15n, 4 agents). The verification-transposition floor
  is live: `proof:ba-gestalt` is now a ci-blocking PIXEL reader (G5 pixel-band, G6 grown roster of 13 surfaces,
  G7 auto-revoke on source drift, G8 context-aware no-terminal-reflect with the load-bearing negation pair) —
  born-RED 13/13 surfaces until Band-1 warm-cream. `paint-arm.mjs` (the ONE-color-math shared probe) + the
  bidirectional calm-light arm (kills the grey-scores-better metric) + `proof:observer-loop` (born-RED on the
  write-only luma token) + `proof:gpu-substrate-single` ΔE-0.0 demoted to enrollment + the real-GPU meanLum
  readback machinery. `FOLD-LEDGER.json` 213 folds DECIDED (101 BUILD/44 MET/65 HELD/2 RETIRE/1 SUPERSEDED) +
  `proof:bc-fold-ledger` GREEN. Gates registered centrally (ba-gestalt→["local","ci","release"]; bc-fold-ledger;
  observer-loop). Meta-gates GREEN (tag-parity, gate-script-parity). Stray old-tranche audit detritus discarded.
  docs/precepts submodule committed + pushed (9cad705). The anti-disease law is now ENFORCEABLE.
- NEXT: Band 14 primitives (Tier 2.5) ‖ Band 1 glass spine (Tiers 3-7) — the first LIVE paint captures land at
  Band 1 (dev server :5199, both modes, gestalt verdicts flip the bc-gestalt-roster rows GREEN).
