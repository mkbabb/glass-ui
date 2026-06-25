# BD viz fold — OPEN ORCHESTRATOR DECISIONS

The six decisions the 15-critique fleet flagged as un-resolvable at the planning altitude — each needs an orchestrator call **at enrollment** (when the ~22 V-waves enroll into `../union/UNIFIED-ROSTER.md` Bands 11-15 + `../union/EXECUTION-DAG.md` + `../union/DEFERRED-CENSUS.md`). Sourced from `VIZ-FINAL-ROSTER.md §"the real fold — next"` + the per-wave critique folds in `VIZ-BAND-PLAN.md`. Each row is a genuine open call, not a closed disposition — record the decision here (and in `W-FOLD-LEDGER` when minted) so it is never silently dropped.

---

## OD-1 — GPU-less headless cert: the cross-repo TIMING

**The decision.** `W-GPU-ONLY-SPINE` PURGES `auroraFallbackGround`/the swraster CSS-ground/`renderMode.ts` — but that raster ground is what served the **headless AA-contrast certification** (the SwiftShader/CI π path is a software-adapter host; under the selector's `"none"` verdict it captures the inert placeholder, LOSING the headless contrast cert). The palette-derived AA floor that replaces it is a **cross-repo coordination ASK** (speedtest's headless-AA cert).

**The open call.** WHEN does the palette-derived AA floor land relative to the purge?
- It MUST land **WITH** the purge (coordinated), NEVER before and never after-with-a-gap — a purge that lands first leaves the headless cert dark.
- The cross-repo ASK (speedtest: real-GPU capture OR palette-derived floor) is foreign-tree-fenced — glass-ui authors the floor + the ASK; the speedtest edit is THEIR repo on THEIR republish.
- **Decide:** the exact sequencing window + whether glass-ui ships the palette-derived floor as the interim (so the cert never goes dark) vs. blocking the purge on the speedtest real-GPU capture.

**Fences.** Keep the software-WebGL page-hang circuit-breaker as the selector's `"none"` verdict (don't arm a software loop). Name the Lockdown-Mode-Safari `"none"` tail. The G2 `getContext` census allowlists the 3 negation-comment files.

---

## OD-2 — the dock enum-migration WINDOW (the published-API break)

**The decision.** `W-DOCK-LINK-API` (D9) DEMOTES the hardcoded app-name enums (`DockSplitContext = search|media|nav`, `DockSilhouetteKind = bar|bar+pill|split|search`) to a generic `vector`-keyed SHAPE (radial/lateral/inward) + consumer DATA. These types are **PUBLISHED** (`/dock` + `composables` barrels, 2 live demo call-sites) and `proof:dock-context` C1 ASSERTS the four literal silhouette kinds — so the demotion REDs C1 unless the SAME wave AMENDS C1 (a recorded precept-inversion) AND carries the published-API MIGRATION.

**The open call.** WHEN does the breaking published-API migration land, and HOW is it coordinated?
- The C1 amendment is a recorded precept-inversion (the gate currently enforces the literal enums it is about to retire).
- The 2 live demo call-sites re-point in-wave; any external consumer rides the MIGRATION row.
- **Decide:** is the enum-demotion a clean break at the union close (no alias, per no-legacy) — or does it need a deprecation window for any registry consumer of `DockSplitContext`? Confirm the published-API census (the `/dock` + `composables` barrel exports) before the break.

---

## OD-3 — the metallic SLOT-NUMBER coordination with satin/burst (a CONFIRMED COLLISION)

**The decision.** `W-AUR-METAL` (VIZ-FINAL-ROSTER) claims aurora medium **slots 8/9**. But the union's Band-6 aurora waves ALREADY own those slots: **`W-AUR-SATIN` = `uMedium==8`** and **`W-AUR-PRISM` = `uMedium==9`** (`../union/UNIFIED-ROSTER.md:77-78`, `../union/EXECUTION-DAG.md:67-68`). This is a **direct slot collision** — two waves cannot both bind `uMedium==8`.

**The open call.** Re-number the metal media to a collision-free range.
- The pre-critique `VIZ-DAG.md` draft had metal at **`uMedium 10/11`** (collision-free) — VIZ-FINAL-ROSTER's "8/9" is the critique-fold REGRESSION introducing the clash.
- **DECIDED (applied 2026-06-22):** `W-AUR-METAL` = uMedium **10/11** (monotonic above satin=8/prism=9), applied across UNIFIED-ROSTER/DEFERRED-CENSUS/EXECUTION-DAG — and confirm no other BD viz-tail (`W-AURORA-WGSL-*`, kuwahara `uMedium==7`) claims them. The medium-slot ladder must extend monotonically.
- Record the final slot map in `W-AUR-METAL`'s wave-spec + the `W-FOLD-LEDGER` row so the metal/satin/burst trio never re-collides.

---

## OD-4 — the texture-parity CAPTURE mechanism (the Safari-divergent upload)

**The decision.** `W-DOT-IMAGE`'s target-coverage `T(uv,t)` includes a **TEXTURE** target (an arbitrary-image upload). A texture upload diverges across GPU backends/engines (sampling, color-space, the Safari texImage path), so the wave declares a **TEXTURE-PARITY sub-wave with a rendered-capture-pair** — but the capture MECHANISM is unspecified.

**The open call.** HOW is the texture-parity capture-pair produced + certified?
- The generative/sdf targets are STATELESS `f(uv,t)` and parity-verify via the existing structural-proxy ΔE path; the TEXTURE target is the one that needs a real rendered-capture-pair (the Safari-divergent upload is not provable device-free).
- **Decide:** does the texture-parity capture ride `W-VIZ-PARITY-METAL`'s real-Metal Chrome-149/Safari-26 dev-box (the existing cross-backend capture rig) — or does it need its own capture harness? Confirm the OKLab ΔE bar (mean≤2.0/p99≤5.0) applies to an uploaded texture the same as to a procedural field.
- This is the texture arm ONLY; the generative/sdf arms are not blocked on it.

---

## OD-5 — the 16px control honest-OPAQUE-HOLD (a real-pixel judgement)

**The decision.** `W-CONTROL-GLASS` mints `.glass-control-track` for switch/checkbox/radio. Checkbox + radio are 16px boxes currently on the AY.W-PRIM-POLISH ARM-B **opaque allowlist** ("below the size where glass reads as glass over a flat substrate"). The wave proposes LIFTING them onto the glass register IFF the small-control glass actually reads.

**The open call.** Does the 16px control go GLASS or stay OPAQUE-HELD — and either way it must be a **PASS, not a miss**.
- The directional rim + a bright top catch-light MAY make even a 16px box read as glass; the wave decides on REAL PIXELS at the π, not a forced uniform glass.
- If the 16px glass does NOT read (the original ARM-B rationale holds), checkbox/radio STAY allowlisted with the rationale **RE-RECORDED** — the honest hold, never a forced glass that reads muddy.
- **Decide:** confirm the gate treats the honest opaque-hold as a PASS (an allowlist entry with a re-recorded rationale) — so a correct 16px-stays-opaque outcome is not a `proof:glass-cohesion`/coverage FAIL. Also watch the destructive-label-over-tint contrast (the sibling legibility risk in the same `glass-ios27` fold).

---

## OD-6 — the FIELD-ENGINE `wave`-layer DEFER (the concentric mid-redesign coupling)

**The decision.** `W-FIELD-ENGINE` mints the shared `field/{noise,wave,flow,color}` chunk family. But the critique scoped it to the ~3 genuine value-noise hosts and DEFERS the **`wave` layer** because concentric is mid-redesign (`W-CONCENTRIC-LEVELSET` overturns the source field to level-sets of a curl-warped fbm terrain — the wave-math the `wave` layer would hoist is in flux).

**The open call.** WHEN does the deferred `wave` layer fold back in?
- `W-FIELD-ENGINE` ships `{noise, flow, color}` (the stable hosts) at its tier; the `wave` (Gerstner/Tessendorf) layer is DEFERRED-with-trigger.
- **Decide:** the trigger — does the `wave` layer hoist land WITH `W-CONCENTRIC-LEVELSET` (once concentric's redesigned field stabilizes), or is it booked to a later successor? Confirm it does NOT gratuitously MOVE `flow.*` and keeps blob's IQ-noise + the painterly `gnoise` DISTINCT (the over-abstraction fence). `procedural-color.wgsl.ts` still moves out of aurora's feature-dir at `W-FIELD-ENGINE` regardless.
- Record the `wave`-layer defer as a `DEFER-with-trigger` row in `../union/DEFERRED-CENSUS.md` (the trigger = concentric-field-stabilized), so it is not silently dropped.

---

## Status

All six are **OPEN at enrollment** — none is dispositioned here. The enrollment step (mint `W-FOLD-LEDGER`, write the V-bands into the three union docs, re-author `VIZ-DAG`) decides each, records the call in the wave-spec + the fold-ledger, and the critique re-runs to 2-consecutive-clean. OD-3 (the slot collision) is the only one with a forced answer (re-number off 8/9); the other five are genuine orchestrator judgement calls.
