# BB.W-BORDER-PROGRESS — progress IS the element's border: a @property-animated masked CONIC ring, the brand-spectrum fill via the OKLCH/shorter-hue helper, coverage + milestone register

**Name**: W-BORDER-PROGRESS - the living-chrome border ring (the speedtest C2 verbatim)
**Opens after**: the Batch-0 integrity floor (W-CI-GREEN green, the harness trustworthy) + the Batch-1 gestalt hardening (every primitive's verdict rides the HARDENED `proof:ba-gestalt`). Runs in the PRIMITIVES band (Batch P, the §A1 cross-repo addition), PARALLEL with Batches 2-4. The registry single-owner rule: this wave OWNS `package.json` + `scripts/gates.mjs` for its parallel group; the sibling primitive waves emit rows.
**Agents**: 2 serial (`.1` mints the component + the local spectrum interim + the `@property` ring registration; `.2` wires the coverage/milestone consumers + the colocation/subpath/api/CLAUDE.md surface + the born-RED gate — `.2` reads the seam `.1` declares, so they sequence within the wave)
**Hard gate**: `proof:border-progress` (born-RED) — the masked-conic ring is the element's BORDER (a `@property`-animated `<percentage>` ring over a `padding-box`/`border-box` mask-composite, NOT a corner-squaring `border-image` and NOT a floating bar child), the fill is the brand spectrum walked via the OKLCH/shorter-hue helper (no OKLab chroma trough), the `coverage` axis (`full-ring`|`bottom-edge`) resolves, the 6-8px envelope holds, the phase-edge milestone fires; + the π readback (the ring paints ON the border radius-following over a busy backdrop, the backdrop reads THROUGH the card interior, both modes) + the `proof:ba-gestalt` verdict (BA inv-4).
**Status**: SPEC

## The charge (speedtest C2 — the user verbatim, file:line evidence)

The speedtest AW v2.1 ask-brief (`speedtest/docs/tranches/AW/coordination/glass-ui-BB-ask-brief.md §P0.1`) names this the headline of "The Living Instrument", quoting the user directly: *"the bottom progressbar should serve as a thicker, dynamic BORDER of the card… INTEGRATED into the border of the element and thicker… a spectrum of our colors."* Today speedtest paints progress as a FLOATING bar — `PhaseTimeline.vue` (`speedtest/src/features/speedtest/ui/PhaseTimeline.vue`) is a chassis-floor `<GlassTimeline variant="continuous">` rail seated as a detached child, not the card's own edge. glass-ui has THREE progress variants (`src/components/ui/progress/{ProgressDefault,ProgressGradient,ProgressSectioned}.vue`, dispatched by `Progress.vue:106-121`) and NONE of them is a border — every one is a horizontal track-and-fill RECT, the floating-bar register the user is rejecting.

The miss is structural: the library has no primitive where the progress IS the chrome. The donor reality is settled (ask-brief §"Slides donor reality"): there is NO slides donor — slides' progress is a flat bottom bar, no conic/masked-border anywhere. **Build FRESH** in glass-ui on `@property` + the OKLCH/shorter-hue spectrum.

The mechanism the ask measured as superior:
- a **masked CONIC ring** (`conic-gradient` painted into the border band via a `padding-box`/`border-box` mask-composite cut-out) FOLLOWS the element's `border-radius` — a `border-image` SQUARES the corners (measured inferior), and a floating bar child re-introduces the allocation/relayout the C3 dock-morph defect is about. The conic ring is **allocation-free** (it paints in the existing border box, the card's content box is untouched) and **backdrop-intact** (the ring is a border-band cut-out, so the glass interior still transmits the backdrop — the glass-first identity is preserved, not occluded by an opaque overlay).
- a **`@property`-animated `<percentage>`** drives the conic sweep angle so the fill INTERPOLATES (a bare unregistered `var()` snaps; the registered typed property lets the engine animate the angle stop) — the exact idiom `property-regs.css §18` already runs for `--progress-crescendo`/`--specular-x`/`--dock-morph-t`.
- the **brand-spectrum fill** walks the section/viz palette via OKLCH/shorter-hue interpolation (no chroma trough — OKLab greys the midpoint of a warm→cool pair; the shorter-hue arc stays saturated). glass-ui's `/color` leaf ALREADY has the engine: `deriveHue(anchorHue, harmony, hueSpread, t)` (`src/composables/color/index.ts:191-214`) wraps value.js `interpolateHue(..., "shorter")` in the normalized-turns domain — the spectrum walk is a thin consumer of the existing leaf, NOT a re-roll.

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

This wave starts from the ask-brief's authoritative WHAT/WHY/CONSUMER/ACCEPTANCE/DONOR (`glass-ui-BB-ask-brief.md §P0.1`) re-verified against glass-ui HEAD (`f3c4170e` at this authoring) + the speedtest sibling at HEAD — NOT a blind re-diagnose (the §0 discipline: a stale cite is re-located, never trusted). The cross-repo CONSUME is the one moving target: the OKLCH/shorter-hue helper is value.js's (lands at 0.13.0, `value.js/board/N.md`); until then a **glass-ui-LOCAL interim** is the consume-and-delete, founded on the EXISTING `/color` leaf's `deriveHue`. The agent re-greps each anchor; if a cite drifted (a sibling BA/BB-Batch edit moved a line), it records the drift in PROGRESS and re-locates the mechanism.

```
# 1. The progress family + the floating-bar register being superseded
sed -n '106,121p' src/components/ui/progress/Progress.vue        # the 3-variant dispatcher (no border variant)
ls src/components/ui/progress/                                    # Default/Gradient/Sectioned + geometry — confirm no border-progress

# 2. The @property registration idiom this wave extends (the conic sweep angle)
sed -n '38,52p'   src/styles/tokens/property-regs.css            # --progress-crescendo: <percentage> inherits:false (the exact playbook)
sed -n '111,127p' src/styles/tokens/property-regs.css            # --glass-level/--ui-scale: <number> inherits:true (the typed-scalar idiom)
sed -n '64,90p'   src/styles/dock.css                            # --dock-morph-t @property — the "interpolates COMPOSITED" precedent

# 3. The OKLCH/shorter-hue spectrum engine (the CONSUME — already in the /color leaf)
sed -n '172,214p' src/composables/color/index.ts                 # deriveHue → value.js interpolateHue("shorter"); HARMONY_METHOD
sed -n '223,310p' src/composables/color/index.ts                 # gamutMapStop + deriveBlobPalette (the spectrum-walk precedent)
grep -n "interpolateHue\|HueInterpolationMethod" src/composables/color/index.ts   # the value.js import already present

# 4. The section/viz brand spectrum (the fill stops — presets-in-consumers boundary)
grep -n "section-color-\|viz-fourier\|viz-legendre" src/styles/tokens/light-dark.css   # the 13-stop ramp + the viz twins
grep -n "section-color-" src/styles/tokens/dark-arm.css          # the .dark fallback floor

# 5. The phase-edge milestone idiom (the chassis --phase-color cascade precedent)
sed -n '7,20p'   src/components/custom/instrument-chassis/InstrumentChassis.vue   # InstrumentChassisPhase union + the --phase-color cascade
grep -n "phase\|milestone" src/components/custom/instrument-chassis/InstrumentChassis.vue | head

# 6. The colocation + subpath + structure surface this wave touches
cat src/components/custom/pager-dots/README.md | head -25        # the colocation README register (the reference shape)
cat src/subpaths/pager-dots.ts                                   # the one-line subpath mirror (batch-resolved by vite.library.ts glob)
sed -n '44,50p'  vite.library.ts                                 # the src/subpaths/*.ts batch-resolve (no hand-add needed)
grep -n "Surface\|InstrumentChassisPhase" src/api/index.ts       # the api discovery-layer type publication shape
grep -n "custom package dirs\|border-progress" CLAUDE.md         # the §Structure custom/ enumeration (proof:claude-structure-sync locks it)

# 7. The cross-repo consumer (read-only — speedtest is foreign-tree)
sed -n '1,80p' ../speedtest/src/features/speedtest/ui/PhaseTimeline.vue   # the floating PhaseTimeline being retired on consume
grep -n "5B8DEF\|9B59B6\|CC2233\|E09030" ../speedtest/src/design/tokens.css   # the phase palette the spectrum must hit (presets-in-consumers — these stay in speedtest)

# 8. The gate house pattern + registration
sed -n '1075,1085p' scripts/gates.mjs                            # the proof:pager-ring/icon-chip rows (the registration shape)
grep -n "proof:icon-chip\|proof:pager-ring" package.json         # the package.json script + proof:all membership
```

Captures / authority cross-references:
- `speedtest/docs/tranches/AW/coordination/glass-ui-BB-ask-brief.md §P0.1` (the authoritative WHAT/WHY/CONSUMER/ACCEPTANCE/DONOR — the binding ask).
- `docs/tranches/BB/BB-AMENDMENT-crossrepo.md §A1.P0` (the BB-side charge + the dep graph: value.js→W-BORDER-PROGRESS) + `§A4` (the consume cadence — glass-ui ships at 4.1.0, speedtest pins `^4.1.0` at AW.W7).
- `docs/tranches/BB/EXECUTION-DAG.md` (the PRIMITIVES band runs PARALLEL with Batches 2-4 after the integrity floor + gestalt hardening — §A5).
- `value.js/board/N.md` (the OKLCH/shorter-hue helper → 0.13.0; the cross-repo CONSUME the local interim deletes onto).

**The one moving target — the cross-repo CONSUME (the consume-and-delete interim).** The brand-spectrum fill's OKLCH/shorter-hue interpolation is owned by VALUE.JS (the helper belongs in its color core, ships at 0.13.0 — ask-brief §"≥2-consumer", amendment §A3). glass-ui's `/color` leaf ALREADY consumes value.js's `interpolateHue` and wraps it as `deriveHue`, so the spectrum-walk this wave needs is a thin glass-ui-LOCAL helper (`spectrumStops(stops, t)` walking the brand ramp via `deriveHue`) founded on the EXISTING leaf — NOT a fork, NOT a re-implementation of the color math (`proof:single-color-core` holds: the math source stays value.js). When value.js 0.13.0 ships a named `oklchSpectrum`/`sampleColorRamp` helper, the glass-ui-local `spectrumStops` re-points onto it (the consume-and-delete, a follow in W-ADOPT-RECONCILE / W-PEER-SPINE's spine widen). This wave builds the interim ON the leaf; it does NOT block on the value.js cut.

## The defect table (file:line — RE-GREP at HEAD)

| # | finding | file:line (the cause at HEAD) | the mechanism |
|---|---|---|---|
| 1 | no border-progress register [the headline] | `src/components/ui/progress/Progress.vue:106-121` (3 variants, all RECT) | the library has no primitive where progress IS the chrome — every variant is a floating track-and-fill bar, the register the user is rejecting (C2) |
| 2 | the floating-bar consumer | `speedtest/src/features/speedtest/ui/PhaseTimeline.vue` (chassis-floor detached rail) | speedtest paints progress as a detached `<GlassTimeline>` child — the floating bar the border ring retires |
| 3 | the spectrum engine is present but uncomposed for a ring | `src/composables/color/index.ts:191-214` (`deriveHue` → value.js `interpolateHue("shorter")`) | the OKLCH/shorter-hue walk exists in the `/color` leaf (the blob/aurora consume it); no progress consumer walks the brand ramp |
| 4 | the `@property` conic-sweep angle is unminted | `src/styles/tokens/property-regs.css:38-52` (`--progress-crescendo` is the closest reg) | no registered `<percentage>`/`<angle>` drives a conic sweep — the interpolable border-fill angle does not exist |
| 5 | no coverage / milestone register | — (net-new) | the `coverage` axis (`full-ring`\|`bottom-edge`) + the phase-edge milestone fire are net-new (the `--phase-color`/`InstrumentChassisPhase` cascade is the milestone precedent, `InstrumentChassis.vue:7,58,78`) |

## Scope (gestalt, not workaround — NO legacy, idiomatic transposition)

1. **Mint the `<BorderProgress>` primitive — a colocated custom feature-dir** (`src/components/custom/border-progress/`, the AY.W-COLOCATE shape). The component renders the progress as a MASKED CONIC RING painted into the element's BORDER band — the gestalt the user named, NOT a floating bar bolted to a card edge. The anatomy:
   - **The ring is a `::before`/`::after` border-band cut-out** (or an absolutely-positioned ring layer inside the host), painted by a `conic-gradient` whose sweep stop is the `@property`-animated angle, MASK-COMPOSITED so only the border band paints (`-webkit-mask-composite`/`mask-composite: exclude` of a `padding-box` fill from a `border-box` fill — the house border-ring idiom, NOT a `border-image` that squares the corners). The ring FOLLOWS the host's `border-radius` (the radius-following property the corner-squaring `border-image` fails). The card/host INTERIOR is untouched — the glass tier still transmits the backdrop THROUGH the content box (backdrop-intact — the glass-first identity, AX.W54).
   - **The thickness envelope is 6-8px**, a token (`--border-progress-width`, default within the envelope) so a consumer retunes it; the ring sits in the host's border band (the host reserves the band — the ring is allocation-free, no content-box reflow).
   - **The fill is the brand spectrum walked via the OKLCH/shorter-hue helper** (scope 2) — the conic stops are the section/viz brand ramp interpolated shorter-hue so there is no chroma trough across the sweep. The spectrum is the LIBRARY identity ramp (`--section-color-*`/`--viz-*`); a consumer that wants its own phase palette (speedtest's `#5B8DEF→#9B59B6→#CC2233→#E09030`) passes its stops as a prop — **presets-in-consumers**: no speedtest/ppmycota hue enters a library token (the spectrum DEFAULT is the library ramp, the override is the consumer's).
   - **The `value` is a 0..1 (or 0..100) scalar** driving the registered angle; an indeterminate sweep is out of scope (the determinate ring is the C2 ask).

2. **Compose the OKLCH/shorter-hue spectrum walk on the EXISTING `/color` leaf** (the CONSUME, glass-ui-local interim). A thin helper (`spectrumStops(stops: OklchStop[] | string[], samples: number)` or the per-`t` `spectrumAt(stops, t)`) walks the brand ramp through `deriveHue`/`interpolateHue("shorter")` (`src/composables/color/index.ts`) so the conic gradient's color stops carry no chroma trough. The helper lives in `border-progress/composables/` (the colocation home) and IMPORTS the `/color` leaf — it re-implements ZERO color math (`proof:single-color-core` holds: the math source stays value.js). **The consume-and-delete marker**: an inline `// CONSUME(value.js 0.13.0 oklchSpectrum):` comment names the value.js helper this interim re-points onto when 0.13.0 ships (the deletion trigger, the named successor below). The helper is DOM-free + deterministic (SSR-safe; mirrors `deriveBlobPalette`).

3. **The `coverage` prop — `full-ring` | `bottom-edge`** (the ask's axis). `full-ring` (default) sweeps the entire border perimeter; `bottom-edge` paints ONLY the bottom border band (the user's "bottom progressbar should serve as a thicker, dynamic BORDER" — the bottom-edge register is the literal C2 case, the card's bottom edge becoming the living border). The two coverages share the ONE conic-mask mechanism — `bottom-edge` is a `coverage`-scoped mask region, NOT a second recipe (one engine, two coverage masks, the dock-orientation `dim`-idiom discipline: no parallel fork). The axis is a prop threaded to a `data-coverage`/CSS-var seam.

4. **The phase-edge milestone register** (the `--phase-color`/`InstrumentChassisPhase` cascade precedent). A `milestone` emit (or a `data-milestone` edge-state) fires when the value crosses a declared phase edge (the consumer passes phase boundaries; the ring fires a milestone event + optionally pulses the ring at the edge). This reads the chassis `--phase-color` idiom (the bus carries phase IDENTITY; the milestone is the edge event) — it does NOT re-mint a phase palette (presets-in-consumers; the milestone register is the EVENT seam, the consumer owns the phase colors). The pulse is PRM-gated (no edge-pulse under `prefers-reduced-motion: reduce` — the ring snaps to the new value).

5. **Wire the colocation + subpath + api + structure surface** (the AY.W-COLOCATE + BA.W-HYGIENE discipline). `src/components/custom/border-progress/` carries `BorderProgress.vue` at root, the spectrum helper under `composables/`, the constants (the width envelope, the default ramp, the coverage union) in `constants.ts`, and a `README.md` (the colocation register — `proof:colocation` asserts the four clauses). The `@mkbabb/glass-ui/border-progress` subpath is a one-line `src/subpaths/border-progress.ts` mirror (batch-resolved by `vite.library.ts`'s `src/subpaths/*.ts` glob — no hand-add to the bundler). The `BorderProgressCoverage`/`BorderProgressProps` type publishes to `src/api/index.ts` (the discovery layer). CLAUDE.md's §Structure `custom/` enumeration gains the `border-progress/` row + the count bump (`proof:claude-structure-sync` locks the dir-set ≡ disk + the count). The primitive is on the per-package subpath ONLY (its conic/`@property` machinery is a heavy-enough chunk; it does NOT join the vueuse-free root barrel unless a ≥2 root-barrel consumer is named — it is not).

6. **Register the `@property` conic-sweep angle** (`property-regs.css §18`, the exact playbook). The registered typed property (`--border-progress-angle` as `<angle>`, or `--border-progress-fill` as `<percentage>` driving a `calc()` to turn) `inherits: false` (each ring owns its own fill — the per-surface ownership the specular cohort already uses) so the conic sweep INTERPOLATES rather than snapping. The registration rides the existing §18 block; the consumption (the conic + the mask-composite + the var() fallback + the PRM static bracket) lives in the component's scoped CSS or a `src/styles/border-progress.css` partial (the home recorded in PROGRESS — mirror the specular split: registration in `property-regs.css`, consumption in the consuming stylesheet). The unregistered fallback is safe (the `initial-value` paints the resting ring; the cross-fade collapses to it on a non-supporting engine — Chromium 85+/Safari 16.4+, well within the deployment floor).

7. **Record the canon + extend the cohesion awareness.** CLAUDE.md gains a "BorderProgress — progress as the element's border" section under the progress/glass canon naming the masked-conic mechanism, the coverage axis, the spectrum-on-leaf CONSUME, and the milestone register. The progress-gradient gate's awareness note records that `<BorderProgress>` is the border register beside the three track variants (it does not re-route the existing three). The `proof:border-progress` gate is the NEW gate; it does not extend `proof:progress-gradient` (that gate owns the sectioned single-fill, a disjoint surface).

## Triumvirate Dispatch

- **The masked-conic border ring does not paint radius-following on a target engine** — if the `mask-composite` border cut-out fails to follow `border-radius` on a supported engine (the corners square, or the mask leaks into the content box occluding the backdrop), that is a register-design miss, NOT a license to fall to a `border-image` (which the ask MEASURED inferior). Triumvirate: research the `padding-box`/`border-box` mask-composite idiom + the radius-following constraint, plan the correct cut-out, redress. The ring MUST be radius-following + backdrop-intact (the C2 acceptance); a corner-squaring fallback does not close.
- **The cross-repo CONSUME shape blocks the spectrum** — if the `/color` leaf's `deriveHue`/`interpolateHue` cannot carry the brand-ramp spectrum walk (a chroma trough survives, or the shorter-hue arc greys a warm→cool pair the ask forbids), that is a CONSUME scope-reveal. Triumvirate: research whether the gap is the glass-ui-local helper's composition (a `spectrumStops` bug) OR a genuine value.js helper need (the 0.13.0 `oklchSpectrum` is required, not deferrable). Do NOT re-implement the color math in glass-ui (the `proof:single-color-core` fence) — route a genuine math gap to the value.js by-name ask (amendment §A3), book the consume-and-delete, ship the interim that the leaf CAN carry.
- **The colocation/structure surface forces an out-of-bounds edit** — if minting the feature-dir + the subpath + the api publication forces an edit to a shared barrel or the bundler beyond the `src/subpaths/*.ts` glob (a hand-add to `vite.library.ts`, a root-barrel re-export the primitive does not warrant), that is a scope-reveal — triumvirate, do NOT widen into the bundler/root-barrel bound unilaterally (the batch-resolve glob is the no-hand-add contract).
- **Hard-gate failure not local-edit-recoverable** — if the π readback shows the ring paints opaque-over-interior (the backdrop does NOT read through the card content box) AFTER the mask cut-out, the ring is occluding the glass — that is the backdrop-intact contract broken at the mask region; triumvirate to locate the mask leak, do not loop on the ring α.
- **Diagnostic loop halt** — if the conic ring still does not paint the resolved spectrum/coverage after the helper adoption and three iterations have not isolated which cascade layer wins (the `@property` registration vs the unregistered fallback, the mask-composite vs the host border, the scoped-CSS vs the partial), halt and triumvirate (the cascade-win / mask-composite precedence is the suspect).

## Hard Gate

`proof:border-progress` (born-RED at HEAD, driven GREEN by the wave) — the comment-strip pure-detector house pattern (mirroring `proof-icon-chip.mjs`/`proof-pager-ring.mjs`), five falsifiable SOURCE witnesses each red at HEAD pre-wave, AND the binding π readback:

1. **W1 — the ring is the BORDER, masked-conic, not a floating bar.** `BorderProgress.vue` paints a `conic-gradient` masked into the border band via `mask-composite`/`-webkit-mask-composite` of a `padding-box` from a `border-box` fill (the radius-following cut-out) — and carries NO `border-image` (the corner-squaring form the ask forbids) AND NO floating-bar child (no absolutely-positioned track-and-fill RECT). RED at HEAD: no `border-progress` dir exists. **Bite (anti-evasion)**: a `grep` for `border-image` in the component returns ZERO (the measured-inferior path is forbidden); a `border-box`/`padding-box` mask-composite pair is PRESENT (the radius-following idiom is the only path). A wave that paints a bottom RECT and calls it a border fails the mask-composite-present clause.
2. **W2 — the `@property` angle is registered + interpolable.** A registered `@property --border-progress-angle` (or `--border-progress-fill <percentage>`) exists with `inherits: false` + an `initial-value` (the safe unregistered fallback), and the conic sweep reads it (`conic-gradient(from var(--border-progress-angle) …)` or the `calc()` turn). RED at HEAD: no such registration. Source-asserted (the §18 reg + the consuming `conic-gradient` read).
3. **W3 — the spectrum is OKLCH/shorter-hue on the leaf (the CONSUME, no re-roll).** The fill stops are walked through the `/color` leaf's `deriveHue`/`interpolateHue("shorter")` (the spectrum helper IMPORTS `src/composables/color`), and the component re-implements ZERO color math (no inline OKLab→sRGB matrix, no hand-rolled hue lerp). RED at HEAD: no consumer walks the brand ramp. **Bite**: the `// CONSUME(value.js 0.13.0 oklchSpectrum):` marker is PRESENT (the consume-and-delete is recorded, not a silent fork); a `grep` for a re-implemented `oklab`/matrix in the component returns ZERO (`proof:single-color-core`'s mirror — the math stays value.js).
4. **W4 — the coverage axis + the 6-8px envelope.** The `coverage` prop resolves `full-ring` | `bottom-edge` through ONE conic-mask mechanism (a `coverage`-scoped mask region, NOT a second recipe — a `grep` for a parallel `bottom-edge` conic-fill block outside the shared mask returns ZERO), and the thickness token (`--border-progress-width`) defaults within the 6-8px envelope. RED at HEAD: no coverage axis, no width token. Source-asserted.
5. **W5 — the milestone register + the colocation/structure surface.** A phase-edge `milestone` emit/`data-milestone` fires on a declared edge (PRM-gated pulse), AND the feature-dir carries the colocation four (`composables/` + `constants.ts` + `README.md` + the dir), AND the `border-progress` subpath mirror + the `api/index.ts` type publication + the CLAUDE.md §Structure `custom/` row are present. RED at HEAD: none exist. **Bite**: `proof:colocation` + `proof:claude-structure-sync` stay GREEN after the dir mint (the structure-sync count + dir-set ≡ disk must include `border-progress/` — a mint that forgets the CLAUDE.md row reds structure-sync, caught here).

6. **The π binding readback** (the cardinal-lesson DELTA — captured own-surface with AZ-form freshness headers (capture date, HEAD sha, the route/viewport), BOTH modes): a live capture of a `<BorderProgress>` ring on a glass card over a BUSY backdrop (an aurora/grid route) with a paired π `getComputedStyle` readback proving (a) the ring paints in the BORDER band radius-following (the resolved ring layer's geometry tracks the host `border-radius` — the corners are round, not squared); (b) the card INTERIOR transmits the backdrop (the content box's resolved `background`/`backdrop-filter` reads the substrate THROUGH — the ring does NOT occlude the glass interior, the backdrop-intact contract); (c) the conic fill carries the brand spectrum with NO chroma trough across the sweep (a luminance/chroma scan of the ring at sampled angles shows monotone-or-saturated chroma, never a grey midpoint — the OKLab-trough the shorter-hue arc avoids); (d) `coverage="bottom-edge"` paints ONLY the bottom band; (e) the ring width resolves within the 6-8px envelope. Captured to `docs/tranches/BB/audit/visual/W-BORDER-PROGRESS-DELTA.md` with before/after frames against the speedtest `PhaseTimeline` floating-bar baseline (the register being retired), BOTH modes.

7. **The `proof:ba-gestalt` verdict** (BA inv-4 — the P-1 close-class fix; the HARDENED gate from Batch 1). Per-mechanism W1-W5 greens do NOT close this visual wave. The owning surface (the card/dock/data band where the ring lives — the relevant gestalt roster surface) is captured WHOLE-PAGE, BOTH modes, mobile + desktop, over its real backdrop, and judged as a gestalt ("does the progress read as the element's LIVING border — integrated, thick, a spectrum of our colors — not a bar bolted on?"). The verdict is recorded with the capture; a FAIL deploys the research→wave-spec→redress triumvirate (W-REFLECT3, Batch 7). A source-green/visually-broken gap (the AZ failure class — mechanisms green, the ring reads as a bolted-on bar) does NOT close.

W1-W5 are the device-free CI half (`proof:border-progress`); the π readback (W6) + the gestalt verdict (W7) are the binding visual truth. All must hold for a clean close.

## File Bounds

| File | Access |
|---|---|
| `src/components/custom/border-progress/BorderProgress.vue` | create (the masked-conic border-ring component) |
| `src/components/custom/border-progress/composables/useBorderSpectrum.ts` | create (the `spectrumStops`/`spectrumAt` walk on the `/color` leaf — the CONSUME interim) |
| `src/components/custom/border-progress/constants.ts` | create (the width envelope, the default ramp, the `BorderProgressCoverage` union, the milestone types) |
| `src/components/custom/border-progress/index.ts` | create (the package barrel — named exports + the `BorderProgressProps`/`BorderProgressCoverage` types) |
| `src/components/custom/border-progress/README.md` | create (the colocation register — the anatomy + the ≥2-consumer note) |
| `src/components/custom/index.ts` | modify (add the `border-progress` barrel re-export) |
| `src/subpaths/border-progress.ts` | create (the one-line `export * from "../components/custom/border-progress"` mirror — batch-resolved) |
| `src/styles/tokens/property-regs.css` | modify (register the `@property --border-progress-angle`/`-fill` in §18) |
| `src/styles/border-progress.css` | create-IF (the conic + mask-composite + PRM static-bracket consumption, if not scoped in the SFC — the home recorded in PROGRESS) |
| `src/styles/index.css` | modify-IF (the `@import` of the partial in cascade order, if the partial is created) |
| `src/api/index.ts` | modify (publish `BorderProgressCoverage`/`BorderProgressProps` to the discovery layer) |
| `package.json` | modify (register the `./border-progress` export + `typesVersions` entry; register `proof:border-progress` + add to `proof:all`/parity) |
| `scripts/proof-border-progress.mjs` | create (the born-RED gate) |
| `scripts/gates.mjs` | modify (register the gate row in the registry) |
| `CLAUDE.md` | modify (the §Structure `custom/` `border-progress/` row + count bump; the BorderProgress canon section) |
| `tests-visual/border-progress.spec.ts` | create (the π readback — the radius-following ring, the backdrop-intact interior, the no-trough spectrum, both modes) |
| `docs/tranches/BB/audit/visual/W-BORDER-PROGRESS-DELTA.md` | create (the captured DELTA + the gestalt verdict) |
| `docs/tranches/BB/PROGRESS.md` | modify (the discharge rows + the CONSUME-and-delete ledger entry) |

Do NOT touch:
- **The existing progress family** — `src/components/ui/progress/{Progress,ProgressDefault,ProgressGradient,ProgressSectioned}.vue` + `useProgressGeometry.ts`. `<BorderProgress>` is a NET-NEW custom primitive (the border register); it does NOT modify, re-route, or fold into the three track variants. W-PROGRESS-GRADIENT (BA) owns the sectioned single-fill; that surface is disjoint.
- **The `/color` leaf's math** — `src/composables/color/index.ts` is IMPORTED, never edited. The spectrum helper composes `deriveHue`/`interpolateHue` from the leaf; it adds NO color math to the leaf (`proof:single-color-core` + `proof:color-acyclic` hold — the published graph stays a DAG; the component imports the leaf, nothing imports a component back).
- **The value.js / slides / kf / speedtest foreign trees** — the cross-repo fence HOLDS for value.js/kf/speedtest (by-name asks + consume contracts only; the OKLCH helper ask is value.js's, the consume is the glass-ui-local interim that re-points onto 0.13.0). The speedtest `PhaseTimeline` retire + the `^4.1.0` bump happen in speedtest AW.W7 (the consumer's repo), NEVER edited here. The phase palette (`#5B8DEF→#9B59B6→#CC2233→#E09030`) is speedtest's preset — it NEVER enters a library token (presets-in-consumers; the library default spectrum is the `--section-color-*`/`--viz-*` ramp).
- **The GL shader internals** (`aurora.frag`/`metaball.frag`) — this wave paints a CSS conic ring; it touches no shader. The `proof:single-color-core`/`webgl-substrate` fences hold.
- **The root barrel** (`src/index.ts`) — `<BorderProgress>` ships via the per-package subpath only (the conic/`@property` chunk does not warrant a root-barrel re-export; no ≥2 root-barrel consumer is named).

### Disjointness

Two agent units, SERIAL within the wave (`.2` reads the component + the spectrum helper + the `@property` registration that `.1` creates — they sequence, never run parallel):
- **W-BORDER-PROGRESS.1 (the component + spectrum + registration)** writes the `border-progress/` feature-dir SFC + `composables/useBorderSpectrum.ts` + `constants.ts` + `index.ts` + `README.md`, the `property-regs.css` `@property` registration, and the `border-progress.css` consumption partial (+ the `index.css` `@import` if created). It owns NO gate script, NO api/CLAUDE.md, NO subpath registration.
- **W-BORDER-PROGRESS.2 (the surface + gate)** writes the subpath mirror (`src/subpaths/border-progress.ts`), `src/components/custom/index.ts`, `src/api/index.ts`, `package.json` (the export + the gate registration), `scripts/proof-border-progress.mjs`, `scripts/gates.mjs`, `CLAUDE.md`, `tests-visual/border-progress.spec.ts`, and the DELTA. It owns NO `border-progress/` source SFC/helper and NO `property-regs.css`.

Across the PRIMITIVES band (Batch P): W-DECK (`/deck` subpath), W-DOCK-MORPH-FAMILY (dock morph), W-ON-GLASS-FG (the on-glass foreground tokens), W-AURORA-SWRASTER (the headless fallback) — all component-family-disjoint from this wave's bounds by construction. The ONE shared file is `scripts/gates.mjs` + `package.json` (the registry single-owner rule: this wave OWNS them for its parallel group, the sibling primitives emit rows in sequence). The `src/api/index.ts` publication is this wave's `BorderProgressCoverage` line only (no sibling writes it).

## Format And Lint Cadence

`npm run typecheck` (vue-tsc) after the SFC + the spectrum helper + the `constants.ts` union (the `BorderProgressCoverage` type must thread cleanly + the `/color` leaf import must resolve); `npm run build` after the `property-regs.css` registration + the `border-progress.css` partial (confirm the `/styles` bundle compiles + the `border-progress` subpath chunk emits); `npm run verify-export-types` after the `api/index.ts` publication + the `package.json` `./border-progress` export (the subpath dts probe); `node scripts/proof-border-progress.mjs` born-RED before the source edits (proof it fails at HEAD), GREEN at close; `npm run proof:colocation` + `npm run proof:claude-structure-sync` after the feature-dir mint (the structure surface must stay sound); `npm run proof:gate-script-parity` + `npm run proof:gate-manifest-sound` after the package.json/gates.mjs registration; `git diff --check` before close.

## Verification Artefacts

- `docs/tranches/BB/audit/visual/W-BORDER-PROGRESS-DELTA.md` — before/after frames (the masked-conic ring vs the speedtest `PhaseTimeline` floating-bar baseline; the radius-following ring + the backdrop-intact interior + the bottom-edge coverage) + the paired π readback (the ring geometry tracking `border-radius`, the interior backdrop-through, the no-trough chroma scan, both modes) + the freshness header (capture date, HEAD sha, route/viewport).
- The `proof:border-progress` JSON artefact (born-RED log → GREEN-at-close log, the five witnesses named).
- The `tests-visual/border-progress.spec.ts` π output (radius-following / backdrop-intact / no-trough / bottom-edge, both modes).
- The `proof:colocation` + `proof:claude-structure-sync` GREEN-at-close outputs (the structure surface sound).
- The `verify-export-types` output post-`./border-progress` publication (the subpath dts probe).
- The `proof:ba-gestalt` card/dock-band capture + recorded verdict (the W-REFLECT3 binding evidence).

## Commit Plan

- component commit (`.1`): `feat(border-progress): the masked-conic border-ring primitive — progress IS the element's border (BB.W-BORDER-PROGRESS)` — names the feature-dir + the `@property` angle registration + the OKLCH/shorter-hue spectrum walk on the /color leaf + the coverage/milestone register in the body.
- surface commit (`.2`): `feat(border-progress): the /border-progress subpath + api publication + CLAUDE.md structure row (BB.W-BORDER-PROGRESS)` — the subpath mirror + the api type + the structure-sync row + the export registration.
- gate commit: `test(border-progress): proof:border-progress born-RED→GREEN + the π readback + parity registration`.
- doc/status commit: the CLAUDE.md BorderProgress canon + the DELTA doc + the PROGRESS rows (incl. the CONSUME-and-delete ledger entry).

## Dependencies

- **Depends on**: the Batch-0 integrity floor (W-CI-GREEN — the harness is trustworthy before any new gate registers) + the Batch-1 gestalt hardening (W-GESTALT-GATE2 + W-VISUAL-RUNNER — the primitive's `proof:ba-gestalt` verdict + the π runner are real before the close judges the ring). The `/color` leaf's `deriveHue`/`interpolateHue` is present at HEAD (the spectrum CONSUME's interim foundation — no blocking dep on the value.js 0.13.0 cut).
- **Blocks**: speedtest AW.W7 (the R-CONSUME wave — speedtest bumps `^4.1.0` and binds `<BorderProgress coverage :value>` onto `.results-card` + the dock + the survey band, retiring its floating `PhaseTimeline`; the ≥2-consumer trigger — speedtest WC + WV2 — is met on consume). The cross-repo consume is the consumer's repo (speedtest), never edited here.

## Named successors

- **W-PEER-SPINE / W-ADOPT-RECONCILE (Batch 5)** — the cross-repo CONSUME re-point: when value.js 0.13.0 ships the named `oklchSpectrum`/`sampleColorRamp` helper, the glass-ui-local `useBorderSpectrum` interim re-points onto it (the consume-and-delete the `// CONSUME(value.js 0.13.0 oklchSpectrum):` marker books; the peer spine widens to admit `^0.13.0`). The interim is founded on the leaf's existing `deriveHue` so the re-point is a thin swap, not a re-author.
- **speedtest AW.W7** — the consumer's R-CONSUME: binds `<BorderProgress>` onto its three surfaces + retires `PhaseTimeline` + deletes its named-YELLOW floating-bar interim (the deletion trigger is "the ask ships" — this wave at 4.1.0).
- **An indeterminate / continuous-loop coverage** — out of scope here (the C2 ask is the determinate ring); if a consumer surfaces a genuine indeterminate-border need with ≥2 consumers it is a successor scope, NOT a fold into this wave (the determinate ring is the binding ask, no speculative substrate).

## Archaeology

No prior attempt — the border-progress register is net-new (the donor reality is settled: NO slides donor, build fresh; ask-brief §"Slides donor reality"). The guardrails carried from the BA waves: the W1 bite asserts the POSITIVE (the masked-conic mask-composite is PRESENT) AND the negative (no `border-image` corner-squarer, no floating-bar RECT) — because the measured-inferior path (the corner-squaring `border-image`) is exactly the trap a naive "border progress" reaches for; and the W6 π readback is the binding visual truth (the radius-following ring + the backdrop-intact interior + the no-trough spectrum), because the AZ failure class (a green source gate over a still-wrong live render) is what re-opens these. The cardinal lesson holds: the binding evidence is the captured own-surface DELTA with freshness headers + the paired π, not a close-message claim. The CONSUME discipline holds: the color math stays value.js (the `/color` leaf, `proof:single-color-core`), the glass-ui-local helper is the consume-and-delete interim with its named re-point successor — never a silent fork of the spectrum math.
