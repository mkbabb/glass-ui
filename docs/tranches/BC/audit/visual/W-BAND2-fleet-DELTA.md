# BC Band 2 dock fleet — DELTA (the dock fleet on the verified engine)

**Binding paint proof:** `proof:dock-animation-live` PASS (the buttery morph holds after the fleet) +
all BC dock gates GREEN + the collapse confirmed live. The dock — BB's most-destroyed surface — now
morphs, collapses, and clicks.

## Live verification
- **Morph** (`proof:dock-animation-live`) PASS — the smooth ~18-frame ramp from DOCK-ENGINE holds after
  ARBITRARY/SHRINK-BLUR/LIQUID-MORPH (the silhouette token-lerp, the floored reserve, the never-white guard).
- **Collapse** confirmed live on /dock/overview: the SidebarDock reads `glass-dock vertical shape-pill
  ... collapsed` (w=58 vertical pill) at rest — the collapsed state works.
- **Gates** (device-free + live, all GREEN): proof:dock-arbitrary · dock-shrink-blur · liquid-morph ·
  dock-vertical-clickable · dock-collapsed-both · dock-stack-rail · dock-cockpit · dock-engine ·
  dock-morph-family · no-layout-animation (LOCKED) · spring-tokens-synced · dock-css-carve.

## What the fleet landed (on the byte-frozen engine)
- **DOCK-ARBITRARY** — arbitrary silhouettes via the `--dock-shape-from/to` token lerp (dock/shape.css,
  the single radius authority; default no-op = circle↔pill; the teardrop/blob is consumer-opt-in) +
  useLiquidFlex `--stretch` (capped 1.08, PRM-zeroed); the V↔H teardrop bridge compositor-only (clip-path
  neck, not per-frame width).
- **DOCK-SHRINK-BLUR** — the resting self-blur gated to `[data-morphing]` → the collapsed pill reads CRISP
  (filter:blur(0) at rest), the 3px decongest bloom transient-only.
- **LIQUID-MORPH** — the reserve+scale floors (`max(...,--dock-morph-min)`, `max(...,0.06)`) + the
  measure-failure guard → the morph plate is NEVER white/invisible (a to:0 worst-case seats at a glass sliver).
- **DOCK-VERTICAL-FIX** — the vertical dock is CLICKABLE (the two-line root fix, engine byte-untouched).
- **DOCK-COLLAPSED-BOTH** — vertical AND bottom collapsed states + persistent controls (demo-shell
  composition over the unchanged library collapse engine).
- **DOCK-STACK-RAIL** — the macOS hover-expand stack, a CLEAN-BREAK rebuild (DockRail/divider-carousel
  RETIRED → DockStack; reuses HOVER_INTENT_MS, compositor-only fan on --spring-dock, PRM-carved).
- **AX-DOCK-COCKPIT** — the `[data-preset=cockpit]` 2.75rem control floor + `--dock-label-ratio`.
- **AX-DOCK-CTA-SEAT** — the `[data-cta-pending]` landing seat + setPending/clearPending on useDockCtaReceive
  + the additive /dock re-export (box-inviolate, ran parallel + disjoint from the morph chain).

## The clean-break rail retire (reconciled)
DockRail/divider-carousel was RETIRED for DockStack (no legacy). The gate surface was reconciled:
proof:rail3 retired (wholly superseded by proof:dock-stack-rail), proof:dock-sections split (rail clauses
retired, section-grouping kept), proof:dock-contextual-layers W2 widened to recognize <DockStack :items>,
tests/public-surface DockRail→DockStack.

## Pre-existing (not a BC regression)
`proof:dock-tap-integrity`'s live W3 arm times out — it expects the MAIN dock to hover-expand
(collapsed→hover→expanded), but the new architecture implements hover-expand via the STACK rail (the
SidebarDock collapse is click-toggle). Failing at HEAD too; local-only (CI-skipped); its W1/W2 source GREEN;
NOT in the BC Band-2 battery (proof:dock-vertical-clickable is the BC tap gate, GREEN). An AY-harness chronic.
