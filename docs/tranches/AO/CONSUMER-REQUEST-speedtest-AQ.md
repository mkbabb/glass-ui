# Consumer request — speedtest tranche AQ → glass-ui AO

**Date**: 2026-05-29. **Status**: HANDOFF artifact (uncommitted; glass-ui AO's owner incorporates + commits). **Authoritative spec**: `speedtest/docs/tranches/AQ/R0-GLASS-COORDINATION.md` (read it for full WHAT/WHY/shape/acceptance per item).

---

## Why this lands in AO

AO.W0 concluded *"0 unaddressed requests, no consumer-surfaced primitive gap, no ≥2-consumer pattern clears the substrate gate."* That audit ran **before speedtest AQ existed**. speedtest's AQ 10-lane cohort (perf + design + arch) surfaced **five consumer-driven items** — two are perf/correctness defects in *existing* glass-ui primitives (Aurora, InstrumentChassis); one (`useIdleReady`) has **5 speedtest consumer sites and clears the J inv 10 / L inv 8 ≥2-consumer gate** AO read as empty. They extend AO's internal-first thesis without contradicting it: four of five are pure elegance/simplicity/performance transpositions of existing surface (the AO ethos); none invents an unjustified primitive. All are additive and compatible with AO's planned 3.0.0 alias-removal break — they can ride AO.W4's changeset release.

**AO owns the disposition** (fold into a wave / defer to a successor / decline with rationale). This is a request + spec, not a mandate.

## The seven (summary — full spec + acceptance gates in the speedtest doc)

R0G-1..5 were surfaced at AQ-open; R0G-6..7 were surfaced during AQ R2 **implementation** (measured on the real built dist / real edge — they are confirmed, not speculative).

| # | Item | Kind | Surface | Acceptance signal |
|---|---|---|---|---|
| R0G-1 | **Aurora demand-driven / visibility-paused render loop** | perf, existing primitive | Aurora canvas | idle-fps recovers toward the reduced-motion ceiling (~4fps→~ceiling); GREEN = reduced-motion-delta A/B, NOT Lighthouse TBT; π canon unregressed |
| R0G-2 | **InstrumentChassis breakpoint-correct child-geometry reserve** | CLS correctness, existing primitive | InstrumentChassis | mobile 390px CLS < 0.05 on a chassis-hosting route; dial paints final box from frame 0 at every breakpoint; recentre transform-only; no post-paint child reflow |
| R0G-3 | **`useIdleReady` composable** (rIC sibling of `useViewportReady`) | substrate promotion (clears ≥2-consumer gate; 5 sites) | composables barrel | exported; scope-aware signature; sibling-consistent with `useViewportReady` |
| R0G-4 | **`Toaster` `position` prop** | API completeness | Toaster | `<Toaster position="top-center">` anchors viewport top; default unchanged |
| R0G-5 | **`--surface-public-data-panel` token** | theme token | theme cascade | token present; `proof:theme` byte-clean |
| R0G-6 | **`DockIconButton` coarse-pointer 44px floor** | a11y/touch, existing primitive | DockIconButton | ≥44×44 on coarse pointer; fine-pointer desktop unchanged. **Measured at 40×40 on the real edge — disproves the prior "dock already has a 44px floor" assumption** |
| R0G-7 | **split the `motion` barrel (keyframes eager-pull)** | perf/bundle-shape, existing barrel | `@mkbabb/glass-ui/motion` | a consumer importing only cheap motion utils builds a dist with keyframes (~125KB) OFF the entry/eager graph (sourcemap-verified); animation primitives stay available on their own lazy path |

## Release / cross-repo

Additive; compatible with the 3.0.0 break — ride AO.W4's changeset release (or a 2.2.0 minor first — AO's call). `npm publish` stays user-domain (AO.md §Cross-repo OMEGA). After publish, speedtest bumps its `^semver` pin + consumes (consumer-adoption per item is speedtest-side; the acceptance gates are the contract). Per the speedtest-side [[feedback_published_dep_drift]] lesson, speedtest re-typechecks against the newly published version.

Note: glass-ui 2.1.0 already shipped typed `Toast.duration` (speedtest's SP-1) — speedtest's `dismiss()` timer reverts to the prop on its side (no glass-ui action needed for that one).

— Handoff from speedtest AQ, 2026-05-29.
