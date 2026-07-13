# W-CONSTELLATION-DEDUPE — the constellation demo census + the retire/keep decision

Band B5 (substrates). Wave `BI.W-CONSTELLATION-DEDUPE`. Discharges **UF-E5** ("/substrates/constellation
is good, but several demos are duplicative. And the core background constellation must be
interactive—all background visualizations in any demo page should be."), **UF-F10** (constellation
half — "several demos are duplicative"; "prune so many of these superfluous components"), and
**D-VIZ §5 G10** (the constellation demo dedup — UNOWNED by every design family; a decision
artifact, not a prototype).

This is the pass-2 CENSUS the D-VIZ PASS-1 §3.6 (line 106) owed: enumerate the constellation demo
surfaces in `demo/stories/`, name the duplicative set, record the collapse/retire plan.

## 1. The demo surface

There is ONE constellation demo route — `substrates/constellation` (`demo/stories/substrates/constellation.vue`),
one `manifest.ts` row. The story's exhibits are **StorySections within that one file** (NOT separate
routes), so the collapse retires SECTIONS, not manifest rows — there are **no folded manifest rows and
no deep-link 404s** (nothing to redirect; the B6 story-band IA coordinate note resolves trivially — no
folded member has its own route). The route also drives the page's OWN full-bleed constellation
BACKGROUND (via `StoryHero`, `background: "constellation"` + `hero: true`).

The pre-dedup story carried **8 exhibits**. Every focal-mark exhibit paints a variant of the SAME
"ring on a node" visual (a pulse ring + halo + core dot), which is the "duplicative" perception the
user read. The census distinguishes a **distinct engine mechanism** (KEEP — each teaches a real,
gate-π-covered facility) from a **redundant/superfluous** exhibit (RETIRE).

## 2. The retire/keep decision

| # | Exhibit | Engine mechanism | π / gate binding | Verdict |
|---|---------|------------------|------------------|---------|
| 1 | proximity-graph lattice + `interactive` toggle | the CORE: drift + `pointerReactive` steer + tap ripples + PRM freeze | `constellation.spec.ts` (the hero lattice canvas) · `proof:viz-configurator-suite` S4 toggle | **KEEP** |
| 2 | click-to-warp focal node | `warpOnClick` — the critically-damped warp spring | `constellation-warp-live.spec.ts` (`__constellationWarp`) | **KEEP** |
| 3 | resize re-fit + auto-drift wander | `refitField` proportional re-fit + `wander` auto-cadence | `constellation-refit-live.spec.ts` (`__constellationRefit`) | **KEEP** |
| 4 | pointer-held gravity-well | `gravityWell` — the inverse-square held force + cool-back | `constellation-egg-live.spec.ts` (`__constellationEgg`) | **KEEP** |
| 5 | recession envelope (`opacityCeiling`) | the ONE recession contract the 4 live substrates share | `substrate-cohesion.spec.ts` (recession testids) | **KEEP** |
| 6 | pinned anomaly (generalized) | `pinned` + `accentEdges` + `pinnedDrift` + `warpSettled` + the anomaly `drawOverlay` recipe | `constellation-gen-live.spec.ts` (`__constellationGen`) | **KEEP** |
| 7 | double-tap supernova | **none** — a demo-only radial-impulse flourish over the public `field` seam | none (`novaRef`, no `__constellation*` hook, no gate/π) | **RETIRE** |
| 8 | anomaly `drawOverlay` recipe + `?freeze` | the anomaly overlay recipe (DUPLICATES #6) + the `freeze` capture prop | none live (`__constellationFreeze` read only by retired workflow scripts; the `proof:constellation-freeze-live` *gate* already retired at the WebGPU migration) | **RETIRE** |

### RETIRE #7 — double-tap supernova (superfluous)
A "double-tap to detonate" radial-impulse party trick built entirely from the public `field` expose —
**no engine mechanism** and **no binding coverage**. The public `field` seam it demonstrates is
already shown by every `drawOverlay` recipe (#1/#6). This is exactly the "superfluous component"
UF-F10 names. `novaRef` / `novaHostRef` / the `supernova()` `onMounted` block go with it; **no
`__constellation*` window hook, no gate, no π depends on it** — a clean, dependency-free cut.

### RETIRE #8 — anomaly `drawOverlay` recipe + `?freeze` (duplicative + capture-only)
The section's `drawAnomaly` painter (pulse ring + inner ring + soft halo + core dot + dashed callout +
monospace `"anomaly"` label) is **byte-near-identical** to #6's `drawPinnedAnomaly` — the SAME anomaly
overlay skin shown twice. #6 is the RICHER host (it pins the recipe to the engine-held pinned node +
carries `accentEdges` + `pinnedDrift` + the `warpSettled` badge), so it is the KEEP; #8's second copy
of the recipe is the duplication.

The `?freeze` deterministic-capture is a **CAPTURE-pipeline contract**, not a storybook teaching
section: the `freeze` prop stays a documented `ConstellationProps` prop, the `?export`/`?print`/`?freeze`
URL auto-derive stays live, and its dedicated live gate (`proof:constellation-freeze-live`) was ALREADY
retired at the WebGPU migration (recorded in `proof:no-retired-survivor`). Retiring the DEMO section
removes the duplication while the FEATURE persists. `freezeRef` / `drawAnomaly` / `lastPaintedNow` /
`ANOMALY_LABEL` / `ANOMALY_RESOLVED` / the `__constellationFreeze` hook go with it; **no live π spec
reads `__constellationFreeze`** (only the retired `scripts/wf-ay-*.js` workflow files + the unrelated
`proof:no-retired-survivor` doc-marker) — a clean cut.

### The surviving set (6)
The six kept exhibits each teach a **distinct engine mechanism** with **binding π/gate coverage** —
retiring any of them would delete real mechanism coverage (a regression, not a dedup). The dedup is
**exactly the 2 redundant/superfluous exhibits**; the honest "several" is #7 + #8.

## 3. The interactive-background STANDARD (the UF-E5 second half)

"The core background constellation must be interactive—all background visualizations in any demo page
should be." Answered as a **STANDARD**, not a per-viz opt-in — via `useRoutePointer` (W-FIELD-CORE's
Layer-0.5 broadcaster). `StoryHero` (the ROUTE chassis) installs the ONE capture-phase window
`pointermove` broadcaster per route and PROVIDES it; every full-bleed `pointer-events:none` background
viz reads it and feeds its own field. The canvases stay `pointer-events:none` (a background is not a
click target — the broadcaster is the source), so the response is **SUBTLE** (background influence
~2–6%, longer half-life).

| Background viz | Interactive-background wire | Owner |
|----------------|-----------------------------|-------|
| Fourier field | `FourierField.vue` self-injects `useRoutePointer` → the ambient field lean | W-FIELD-CORE (landed) |
| Constellation | reads the route broadcaster (`backgroundInteractive`) → a SUBTLE pointer WELL over the KEPT per-node integrator via `constellationWellMapping` (longer-half-life field) | **this wave** |
| Aurora | `StoryHero` threads the route pointer → `Aurora.setCursor` (the cursor-swirl attractor) | **this wave** |

- The constellation background sets `:background-interactive` in `StoryHero`; the component reads the
  route broadcaster internally (the FourierField pattern — self-contained, not a per-story fork) and
  feeds a subtle well over its **kept per-node integrators** (`constellationWell.ts` /
  `constellationInteraction.ts` — **BYTE-FROZEN**; the pointer FEEDS them, it does not replace them —
  the D-VIZ §4 KEEP list). The well config is a subtle route-register (lower gain / wider reach) and
  the well target is engagement-scaled (a 2–6% background lean, not the foreground gravity-well pull).
- Aurora is threaded via `setCursor` in `StoryHero` (no aurora-component edit; the aurora cursor
  mechanism is W-FIELD-CORE's).
- Terminal: a future background viz inherits the standard by construction (it reads the same route
  broadcaster the chassis provides).

## 4. Cross-repo confirm (recorded)

The `/constellation` subpath has **TWO** consumers — **slides** AND the **atlas** (the BG note omitted
atlas). This wave touches DEMO surfaces only (no `/constellation` subpath API change — the added
`backgroundInteractive` prop is additive default-off, no break), so **no consumer relay is owed**. The
`dis:constellation-carry-confirm` seam stands: BG-WS5's viz-subpath migration must enroll BOTH
constellation consumers (slides + atlas), not slides-only.

## 5. Machine lock

`proof:constellation-dedup` (`scripts/proof-constellation-dedup.mjs`, `["local","ci"]`, device-free):
- **CD1** — this census exists on disk; the RETIRED exhibits (`#collapsed`/nova + freeze markers) are
  DEFINITION-ABSENT in `constellation.vue`; the surviving distinct exhibits are present.
- **CD2** — every full-bleed background viz reads `useRoutePointer` (Fourier self-injects, Constellation
  `background-interactive` + reads the broadcaster, Aurora threaded via `setCursor`); the background
  canvases stay `pointer-events:none`.
- **CD3** — the per-node integrators (`constellationWell.ts` / `constellationInteraction.ts`) are
  byte-frozen (no `useRoutePointer`/`backgroundInteractive`/`routePointer` edit; the `stepWell` + the
  well constants intact).
- Self-test bites: a planted duplicate constellation exhibit REDs (CD1); a planted background viz with
  no broadcaster wire REDs (CD2).

The binding paint rides `tests-visual/constellation.spec.ts` (extended — the interactive-bg well-lean
arm + the deduped-distinct arm) + the `proof:ba-gestalt` substrate verdict at W-REFLECT3 (W-PI-IN-CLOSE
/ W-GESTALT-LEDGER-FILE).
