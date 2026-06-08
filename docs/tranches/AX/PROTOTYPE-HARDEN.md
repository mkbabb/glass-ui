Wrote `/Users/mkbabb/Programming/glass-ui/docs/tranches/AX/PROTOTYPE-HARDEN.md` — the prototype-and-harden backlog synthesized from all 16 assay slices.

Structure:
- **PART 1 — PROTOTYPE BACKLOG**: 17 prioritized PoCs. P0 keystone (W00 real-Metal device + deterministic dock-morph readback — gate the whole tranche), P1 highest-architecture-risk (W42 second-consumer, W01 single-scalar, W17 warp integrator), P2 highest-visual-risk atoms (lensing look+mechanism, aurora WGSL, blob smin+lit, van-Gogh fidelity oracle), P3 bounded novelty. Each carries owning wave, risk retired, minimal spike, effort, GO/NO-GO.
- **PART 2 — HARDENING BACKLOG**, grouped 2A–2G: un-ratified decisions with forcing functions (recommended ratify order), DAG/disjointness fixes, weak-gate/precept fixes, soft-scope sharpenings, cross-repo external blockers (the quantified dirty-tree wall), slides baseline-staleness (the L band's headline — specs authored against a stale snapshot), and the π-lane readback-tier completeness.
- **PART 3 — GROUPING** by surface (glass-ui / slides / cross-constellation) and by phase (prototype-first / harden-first / drive-ready-as-spec).
- **DRIVE-READINESS VERDICT**: which bands drive as-spec, which gate on a prototype, which on a ratification, which on a cross-repo precondition.

Hard-dedup'd findings cross-corroborated across slices:
- **W42 is a charter-orphan** (a full 46KB spec absent from AX.md's §1/§2/§4, excluded from W33's terminal dependsOn) — confirmed `waves/AX.W42-liquid-morph-substrate.md` exists on disk. The distinct-vs-fold ratify is the upstream hinge.
- **W00 is the keystone** — no `playwright`/`workspaces`/`tests-visual/` at HEAD; the WebGPU-Metal device-reproducibility (a software fallback false-GREENs the aurora-black gate) is the sharpest hidden risk, runnable on this box now.
- The **dock morph is net-new** (pixel-space FLIP today, no `--dock-morph-t`), the **§15 warp is net-new** (grep-clean, not a port — `useBlobPointer` is the precedent), and the **lensing map disagrees with its own comment** (crude radialGradient fisheye vs the documented Snell squircle, never device-judged).
- The **slides L-band specs are stale** (H committed, pin already ^3.7.0, HEAD advanced through tranche I) — HARDEN-SLIDES-0 gates all L-band driving.

The load-bearing sequencing law: W00 first (proven on real devices) → the two ratification hinges (W42 distinct-vs-fold, W22 Fraunces) → the device PoCs → the visual bands against a working π-lane; cross-repo + slides waves are publish-currency-gated carries.