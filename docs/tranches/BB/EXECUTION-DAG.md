# BB — EXECUTION DAG

The dependency spine + the parallelism plan. Batches gate left-to-right; waves within a batch run in parallel (the registry single-owner rule: ONE wave per parallel group owns `package.json` + `scripts/gates.mjs`; the others emit rows). Opus fanout, batches of ≤3 concurrent to dodge the rate wall.

```
Batch 0  INTEGRITY FLOOR ─────────────────────────────────────────────► (unblocks all)
  W-CI-GREEN ──┐  (the master-CI-red set, siblings-absent)
  W-CLOSE-BATTERY ─┤  (the full-set close rule + gate)
  W-LEDGER-REPAIR ─┤  (the silent cardinal-ledger gate)
  W-DISPOSITION-RESTAMP ─┘  (the ~28 books + the HELD-prose reconcile)
        │
        ▼
Batch 1  GESTALT-BAR HARDENING        Batch 2  FINISH BA + RETIRE DEAD   (parallel after B0)
  W-GESTALT-GATE2                       W-SCROLL-FADE-RETIRE
  W-VISUAL-RUNNER                       W-SURFACE-AXIS-COMPLETE
  W-CHIP-GRAZE                          W-DEAD-SWEEP
                                        W-DOCK-RAIL-SEAT-FINAL
        │                                      │
        ▼                                      ▼
Batch 3  PERFORMANCE                   Batch 4  ARCHITECTURE TRANSPOSITION (parallel)
  W-LIGHTHOUSE (gate)                    W-CARVE3
  W-CSS-CRITICAL                         W-CANVAS-UNIFY
  W-CARD-COMPOSITE                       W-DARK-INK-WARM
  W-PERF-PRODUCER                        W-INVALID-RING
  W-PAYLOAD-DEFER                        W-EYEBROW-UNION
        │                                      │
        └──────────────┬───────────────────────┘
                       ▼
Batch 5  CROSS-REPO ADOPT              Batch 6  CHRONIC RESIDUALS + DOC SYNC (parallel)
  W-PEER-SPINE (4.0.1 candidate)         W-NDA-DECIDE
  W-ADOPT-RECONCILE                      W-AUR-KUWAHARA
  W-SLIDES-HANDOFF (coordination)        W-PRECEPT-SYNC
  W-EASING-PRIMITIVE (cross-repo)        W-DELTA-RESHOOT
  W-LINEAGE-PROBE (gate)                 W-DOC-FRESHEN
                       │
                       ▼
Batch 7  CLOSE
  W-REFLECT3  (fresh gestalt under the HARDENED proof:ba-gestalt)
  W-CLOSE     (4.1.0 cut; the full-set release battery; the lineage map)
```

## Critical-path rationale

- **Batch 0 is the gate.** Nothing closes honestly until master CI is green (the full set, siblings-absent) AND the close-battery rule exists — every later batch's gate must run under the repaired harness. W-CI-GREEN + W-CLOSE-BATTERY are the literal close-class fix; the rest of the tranche inherits a trustworthy gate floor.
- **Batch 1 hardens the binding-close gate BEFORE the work it must judge.** `proof:ba-gestalt` and the visual-π runner are the close oracle — they must be made real (mobile + content + freshness + executed) before any visual wave's verdict means anything. W-CHIP-GRAZE rides here because it IS the open gestalt FAIL the hardened gate must catch.
- **Batches 2/3/4 fan out** — finishing-BA, performance, and the transpositions are independent surfaces. Within each, the registry single-owner rule holds.
- **Batch 5 is the cross-repo hinge** — sequenced after the library work stabilizes so the adopt targets (peer spine, the EasingPicker, the slides hooks) are final. W-SLIDES-HANDOFF is coordination only (no sibling edit).
- **Batch 6 decides the chronics** — none re-book; each builds, retires, meets, or holds-with-rationale.
- **Batch 7 closes** under the hardened gate, the cut decided by the §4 version strategy.

## The §7-style fences (carried from AZ/BA)

- The hardened-agent git clause: fanout agents NEVER stage/commit/checkout/tag/publish. The orchestrator owns the index + the irreversible legs.
- The GL-shader fence (`aurora.frag`/`metaball.frag` byte-untouched unless a wave explicitly widens it via the triumvirate); the goo `uSatColor` GL-color seam is the ONE wave (W-GOO-COLOR, 4.x) that may widen it.
- ppmycota / demo presets NEVER enter library tokens (presets-in-consumers; the W-DARK-INK-WARM recipe stays on the library legendre identity).
- The cross-repo foreign-tree fence is bidirectional (no edits to value.js / slides / kf / fourier trees; coordination + by-name books only).
