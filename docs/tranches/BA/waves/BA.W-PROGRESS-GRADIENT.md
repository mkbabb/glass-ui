# BA.W-PROGRESS-GRADIENT — the sectioned Progress rebuilt on a single-fill gradient paint model

**Name**: W-PROGRESS-GRADIENT - one-gradient fill, no per-cell pills, no screen seam, the glass meter register
**Opens after**: BA Batch 4 (runs ‖ W-SURFACE-AXIS ‖ W-FEEDBACK-TONE ‖ W-MENU-GLASS ‖ W-GLASS-CAL — disjoint file bounds; gated behind Batch 1 W-DARK-MATERIAL per BG-6, the dark register is the substrate this paints over)
**Agents**: 1
**Hard gate**: `proof:progress-gradient` (born-RED) — four falsifiable source witnesses (one-fill-not-N-cells, no `mix-blend-mode:screen` seam band, no internal pill cap, glass track routes `--glass-bg-quiet`) + the π `/feedback/progress` readback DELTA (the rail paints ONE continuous gradient with NO bright seam stripe and NO dead notch, both modes) + the `proof:ba-gestalt` whole-page verdict (BA inv-4).
**Status**: SPEC

## Goal criterion

`<Progress variant="sectioned">` reads as ONE continuous blended liquid filling a frosted recessed channel — segment colors hold their identity across their span and blend over short transition zones at the boundaries, the active front carries the single pill cap + catch-light, and pending phases keep their real hue as a faint ghost on the track. A user opening `/feedback/progress` sees a glass phase-bus meter with distinct-yet-blended segments, in BOTH modes, with NO hard internal step, NO bright screen-seam stripe, and NO dead notch — the R8-14 "totally broken … should be a proper blended gradient with distinct segments" mandate met by a paint re-architecture, the published segment/prop API untouched.

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

This wave starts from the `progress-sectioned.md` lane's FOUR root causes, not a blind re-diagnose (BA invariant 3 — re-opened ≠ rebuilt-blind). Before touching a byte, the impl agent re-greps each anchor below at HEAD and confirms the four mechanisms still hold; if any cite has drifted, the agent records the drift in PROGRESS and re-locates the mechanism before proceeding — it does NOT re-invent the diagnosis.

Grounding findings (`audit/fleet/progress-sectioned.md` + `audit/fleet/idiom-gaps.md`): **RC-1** (per-cell pill-capped fill → hard internal steps, S1), **RC-2** (the `mix-blend-mode:screen` seam band → bright stripes + the dead notch, S1), **RC-3** (the pending cell is a desaturated `--surface-tint-40` grey wash → dead 4th segment, S2), **RC-4** (no continuous track-fill relationship — cells are absolutely-positioned siblings, S2/design), **IG-C1** (the missing glass segmented-meter register — `<ProgressSectioned>` is the natural home, S2). Evidence: `audit/ground/R8-14-rail-crop.png` (the dark-mode rail band isolated from the ground capture — the orange/blue/purple cells, the seam stripes, the dead notch); the live DOM/computed-style probe on `:5199` (dark) recorded in the lane (four discrete 271.5px cells, `fillRectW` 272/272/157/0, seam[2] `from oklch(0.739 0.134 318.1) → to color-mix(... 40%, transparent)` opacity 0.5 blend screen).

The four stacked root causes (each independently confirmed at HEAD this authoring):

1. **The fill is per-cell with a pill cap on EVERY trailing edge → hard internal steps (RC-1, S1).** `ProgressSectioned.vue:166-192` (`.progress-sectioned-fill`): each completed/active cell paints its OWN `linear-gradient(180deg, …var(--cell-color)…)` (:175-180) and rounds BOTH trailing corners with `border-start-end-radius / border-end-end-radius: var(--radius-pill)` (:173-174). A *completed* cell (fill width 100%) ends in a pill cap; the next cell's fill starts square against it. There is NO continuous fill across the bar — N separate pills end-to-end. The internal pill cap is the structural source of the hard step; a blended gradient cannot exist while each cell owns an independently-capped fill.
2. **The seam overlay is a `mix-blend-mode:screen` band → bright stripes + the dead notch (RC-2, S1).** `ProgressSectioned.vue:236-252` (`.progress-sectioned-seam`): a `clamp(0.5rem,6%,1.5rem)`-wide overlay at each boundary, `opacity:0.5`, `mix-blend-mode:screen` (:250-251), painting `seam-from → white → seam-to` (:242-249). `screen` over a saturated cell BRIGHTENS (the boundary reads as a light vertical stripe, not a blend); and at the active→pending boundary the `--seam-to` is a near-transparent grey, so a `screen` of near-transparent grey contributes ≈nothing — the seam VANISHES and the recessed dark track shows through as the dead notch. The seam-overlay primitive is structurally wrong: a fixed-width screen band cannot reconcile two arbitrary cell colors over a recessed track — the blend belongs IN the fill paint, not a separate compositing band.
3. **The pending cell is a desaturated grey wash → the 4th segment reads dead before the notch (RC-3, S2).** `ProgressSectioned.vue:152` paints the pending base `background: color-mix(in srgb, var(--cell-color) 12%, transparent)` — a flat 12% wash. The demo passes `color: "var(--surface-tint-40)"` for `upload` (`demo/stories/feedback/progress.vue:17`), a `color-mix(in srgb, var(--foreground) 40%, transparent)` neutral. In dark mode `--foreground` is near-white → a dull grey-purple slab; the 4th phase has no phase identity. This is a demo-data smell (pending should carry its real hue at low saturation) AND a component-recipe gap (the flat 12% wash gives pending no shape/edge, compounding RC-2's notch).
4. **No continuous track-fill relationship; cells are absolutely-positioned siblings (RC-4, S2/design).** `ProgressSectioned.vue:78-103`: each `.progress-sectioned-cell` is `position:absolute; left:startPct%; width:widthPct%` with its own `overflow:hidden`. NO element spans the whole filled extent — nothing to draw ONE gradient across, so the seam band was bolted on to fake continuity between independent boxes. The geometry model (`useProgressGeometry.ts cells[]`) is SOUND for measurement; the PAINT model derived from it is per-cell-rectangle — the architectural mismatch with "one continuous blended gradient that still reads distinct segments."

Plus the idiom-gap framing (IG-C1, S2): the library has NO glass segmented-meter register — `<ProgressSectioned>` is the natural home for one (a frosted `--glass-bg-quiet` track + a continuous gradient fill + hairline segment ticks), and it folds onto this re-paint rather than a separate wave.

RE-GROUND command set (run all; confirm each mechanism):

```
sed -n '166,192p' src/components/ui/progress/ProgressSectioned.vue     # the per-cell pill-capped fill (RC-1)
sed -n '236,252p' src/components/ui/progress/ProgressSectioned.vue     # the screen seam band (RC-2)
sed -n '146,164p' src/components/ui/progress/ProgressSectioned.vue     # the pending 12% wash (RC-3)
sed -n '77,116p'  src/components/ui/progress/ProgressSectioned.vue     # the absolutely-positioned cell siblings (RC-4)
grep -n 'surface-tint-40' demo/stories/feedback/progress.vue          # the neutral pending demo color (RC-3 demo half)
sed -n '64,121p'  src/components/ui/progress/useProgressGeometry.ts    # the cells[] measurement layer — PRESERVE
sed -n '60,103p'  src/components/ui/progress/Progress.vue              # the modelValue-refusal prop boundary — PRESERVE
grep -n 'glass-bg-quiet' src/styles/glass/ladder.css                  # the glass track register (IG-C1)
```

## Defect table (file:line — RE-GREP at HEAD)

| # | finding | file:line | the mechanism |
|---|---|---|---|
| 1 | RC-1 per-cell pill-cap [S1] | `ProgressSectioned.vue:166-192` (`.progress-sectioned-fill`; trailing pill at :173-174, per-cell gradient at :175-180) | each cell paints its own capped fill → hard internal step; N pills end-to-end, no continuous fill |
| 2 | RC-2 screen seam band [S1] | `ProgressSectioned.vue:236-252` (`.progress-sectioned-seam`; `mix-blend-mode:screen` at :251, `seam-from→white→seam-to` at :242-249); template render :104-116 | fixed-width screen band brightens (stripes) and vanishes at active→pending (dead notch) |
| 3 | RC-3 pending grey wash [S2] | `ProgressSectioned.vue:152` (`color-mix(--cell-color 12%, transparent)`); `demo/stories/feedback/progress.vue:17` (`--surface-tint-40`) | flat 12% wash of a neutral tint → the 4th phase has no hue identity, no edge |
| 4 | RC-4 sibling-cell geometry [S2] | `ProgressSectioned.vue:78-103` (absolutely-positioned cells, per-cell `overflow:hidden`) | no element spans the filled extent → nothing for one gradient; seam band is the fake-continuity hack |
| 5 | IG-C1 missing glass meter [S2] | `idiom-gaps.md:230-244`; `ProgressSectioned.vue:129-144` (the recessed-channel rail — GOOD, stays); `src/styles/glass/ladder.css:58` (`--glass-bg-quiet`) | no glass segmented-meter register; the track is opaque, never frosted-over-substrate |

## Scope

1. **Collapse the paint to ONE filled element spanning the cumulative filled extent (RC-1 + RC-4).** Retire the N `.progress-sectioned-cell` + `.progress-sectioned-fill` per-cell rectangle stack; render a SINGLE fill element whose inline width is the cumulative filled extent (the completed run + the active fraction), computed from the existing `useProgressGeometry` `cells[]` data — no new geometry math, a derived `filledExtentPct` read off the same cells. The `--spring-snappy` grow animates that ONE fill front's width, not per-cell widths.
2. **The single fill is ONE `linear-gradient` whose stops are the segment colors (RC-1 + RC-2).** Build a `linear-gradient(90deg, …)` from `cells[]`: each segment contributes a hard stop-PAIR (`colorA X%, colorA Y%`) holding its hue as a crisp band across its span, with a SHORT soft transition zone (`colorA Y%, colorB Z%`) at each boundary giving the blend. Distinct segments AND a continuous blend, both at once — zero seam overlays, zero internal pill caps. The stop positions map off the per-cell `startPct/endPct` already in `cells[]` (re-normalized to the filled extent so the gradient spans the fill element, not the whole rail).
3. **Retire `.progress-sectioned-seam` + its `mix-blend-mode:screen` entirely (RC-2).** Delete the seam `<template v-for>` render (`ProgressSectioned.vue:104-116`) and the `.progress-sectioned-seam` + `@keyframes`-free style block (:236-252). The boundary blend lives in scope-2's gradient stops; the bright stripes and the dead notch both die with the band.
4. **ONE leading-edge cap only (RC-1).** The pill cap belongs at the single FRONT of the whole fill (the active leading edge), never at internal completed-cell boundaries. The fill element rounds only its trailing (front) corners; the leading edge of the rail keeps its `rounded-pill` clip. The catch-light sweep rides ONLY the active front, not every cell.
5. **Pending phases keep their real hue as a faint ghost (RC-3).** The empty/pending remainder of the track carries faint phase-tinted ghost stops at low alpha (built from the pending `cells[]` colors) so a pending phase keeps its identity on the recessed track — replacing the flat 12% wash recipe. The demo data fix: `demo/stories/feedback/progress.vue:17` re-points the `upload` segment off `--surface-tint-40` to its real phase hue (the `--viz-*`/`--chart-*` family the other three use, e.g. `--viz-hermite` or the next coherent viz stop) — presets-in-consumers for the demo, a component-recipe refinement for the ghost.
6. **The glass meter register lands (IG-C1).** The recessed-channel rail routes through `--glass-bg-quiet` (the frosted track that reads over a rich substrate) + `--glass-blur-quiet`, and the segment boundaries read as `--border-hairline` ticks where a crisp division is wanted — the glass segmented-meter the IG-C1 gap names. The existing recessed-channel box-shadow chrome (`ProgressSectioned.vue:129-144`, the inner-shadow groove + low outer drop) is GOOD and PRESERVED; it composes ON the glass track. The `--progress-sectioned-track`/`--cell-color`/`--cell-fill` token seam stays consumer-tunable (re-keyed where the paint model demands but never removed).
7. **PRESERVE the measurement + prop boundary (the binding non-touch).** `useProgressGeometry.ts` (the `cells[]` geometry + `aggregateValue`), the `ProgressSegment`/`TimelineSegment` mirror (`useProgressGeometry.ts:7-31`), the `modelValue`-refusal prop boundary (`Progress.vue:60-103` — the dev-throw on a non-zero `modelValue` to sectioned), the `--spring-snappy` register, the recessed-channel rail chrome, and the PRM gate (`ProgressSectioned.vue:254-264`) all stay. The re-shape is confined to the `ProgressSectioned.vue` template + `<style>` and the one-line demo data fix; the published prop/segment API is untouched.

## Triumvirate Dispatch

- **File-bounds expansion that invalidates the wave**: if the single-gradient paint cannot derive the segment stop positions from the existing `useProgressGeometry` `cells[]` data WITHOUT changing the `SectionedCell` shape or the `aggregateValue`/`ProgressSegment` contract (the published API + the timeline mirror) — that is a scope-reveal; triumvirate (research the gradient-from-cells derivation + plan-augment the bound + redress), do NOT re-key segments or widen into `useProgressGeometry.ts` unilaterally.
- **Hard-gate failures not local-edit-recoverable**: if the π readback shows the rebuilt gradient cannot hold BOTH a crisp segment identity AND a clean boundary blend (the hard/soft stop-pair tuning either washes the segments into one mush OR re-introduces a hard step) after three stop-position iterations, that is a register-design miss — triumvirate, do not loop on gradient stop percentages.
- **Diagnostic loop halt**: if the glass `--glass-bg-quiet` track (scope 6) makes the fill gradient illegible over the dark register (the W-DARK-MATERIAL substrate) and three iterations have not reconciled the frosted track against the saturated fill, halt and triumvirate (the track-vs-fill contrast over the dark elevation ladder is the suspect — coordinate with the W-DARK-MATERIAL register, see Dependencies).

## File Bounds

| File | Access |
|---|---|
| `src/components/ui/progress/ProgressSectioned.vue` | modify (template: collapse N cells → one fill element + retire the seam render; `<style>`: one-gradient fill, glass track, retire `.progress-sectioned-seam`, one leading cap, pending ghost) |
| `demo/stories/feedback/progress.vue` | modify-carve (the ONE-line `upload` segment color re-point off `--surface-tint-40` to its real phase hue — line 17 only) |
| `scripts/proof-progress-gradient.mjs` | create (the born-RED gate) |
| `package.json` | modify (register `proof:progress-gradient` + add to `proof:all`/parity) |
| `scripts/gates.mjs` | modify (register the gate row in the gate registry) |
| `tests-visual/progress-gradient.spec.ts` | create (the π `/feedback/progress` readback DELTA spec) |
| `CLAUDE.md` | modify (record the single-fill-gradient paint model + the glass meter register in the Progress note) |

Do NOT touch:
- `src/components/ui/progress/useProgressGeometry.ts` (the measurement layer + the `ProgressSegment`/`TimelineSegment` mirror — PRESERVE, scope-7; reading the `cells[]` data is allowed, editing the shape fires the triumvirate above).
- `src/components/ui/progress/Progress.vue` (the dispatcher + the `modelValue`-refusal prop boundary — PRESERVE, scope-7).
- `src/components/ui/progress/ProgressDefault.vue` / `ProgressGradient.vue` (the other two variants — out of scope).
- The shared `surface` mixin/prop that **W-SURFACE-AXIS** mints this batch — the glass meter register here uses the EXISTING `--glass-bg-quiet`/`--glass-blur-quiet` ladder tokens directly (scope 6), NOT a net-new `surface="glass"` prop on Progress; if a shared-axis `surface` prop on Progress is later wanted it is a W-SURFACE-AXIS consumer edit, not this wave's (coordination note: do not fork a second surface axis — IG-C1's `surface="glass"` Progress register is BOOKED to a W-SURFACE-AXIS consumer follow, this wave lands the frosted track via the raw ladder tokens).
- `src/styles/glass/*` (the glass ladder + the W-DARK-MATERIAL dark arm — W-DARK-MATERIAL (Batch 1) + W-GLASS-CAL (this batch, the blur dial-back) own those; this wave READS `--glass-bg-quiet`/`--glass-blur-quiet`, never redefines a glass token).
- `src/styles/utilities/btn.css` + the disco/toggle-chip surfaces (W-GLASS-CAL owns those).
- The GL shader internals (aurora.frag, metaball.frag — fence-locked); ppmycota purple (never a library token — the demo viz hues stay the existing `--viz-*` family, not a minted purple); the slides repo `docs/tranches/M/` (foreign).

## Disjointness

Single agent; no intra-wave path contention. Across Batch 4: W-SURFACE-AXIS writes the card/dialog/sheet/drawer/popover/command/expandable-container/skeleton families + the shared surface mixin (this wave does not — it uses the raw ladder tokens, see the coordination note); W-FEEDBACK-TONE writes toast/notification/alert + `proof-glass-cohesion.mjs` (this wave does not); W-MENU-GLASS writes `_shared/menuItemVariants.ts` + dropdown/context-menu styles (this wave does not); W-GLASS-CAL writes the `--glass-blur-*` primitives + `utilities/btn.css` + the dock-tab/toggle-chip surfaces (this wave does not — it consumes the blur token, does not edit it). `ProgressSectioned.vue`, `demo/stories/feedback/progress.vue`, and the progress gate/spec files are touched by NO other Batch-4 wave. The DAG (§5) confirms the Batch-4 bounds are component-family-disjoint by construction; the one declared batch seam (W-SURFACE-AXIS's shared surface mixin consumed by W-FEEDBACK-TONE/W-MENU-GLASS) does NOT reach this wave (Progress's glass track is the raw ladder token, not the shared mixin).

## Hard Gate

`proof:progress-gradient` (born-RED at HEAD, driven GREEN by the wave) — four falsifiable SOURCE witnesses (the comment-strip + pure-detector house pattern, mirroring `proof-dock-rail-hairline.mjs`/`proof-suffuse.mjs`), each red at HEAD pre-wave:

1. **W1 — one fill, not N per-cell pills.** `ProgressSectioned.vue`'s template renders a SINGLE fill element spanning the cumulative filled extent (the `v-for` over `cells` that emitted N `.progress-sectioned-cell` + `.progress-sectioned-fill` spans is GONE), and the `<style>` carries NO `border-start-end-radius`/`border-end-end-radius: var(--radius-pill)` on an internal cell-fill selector. RED at HEAD: `ProgressSectioned.vue:78-103` renders the `v-for` cell stack; `:173-174` rounds every fill's trailing corners. **Bite-tightening (anti-evasion)**: the source half asserts the POSITIVE — exactly one fill-paint element (the filled extent) carries the leading cap, and NO selector matching an internal segment boundary carries a `--radius-pill` corner; it does NOT merely count `v-for`s (a future refactor that keeps N elements but un-caps them still fails the "one continuous fill" intent — the assert is "one fill element, one cap").
2. **W2 — no screen-seam band.** `ProgressSectioned.vue` carries NO `mix-blend-mode: screen` anywhere and NO `.progress-sectioned-seam` selector/render. RED at HEAD: `:251` is `mix-blend-mode: screen`; `:236-252` is the seam block; `:104-116` is the seam render. The boundary blend is asserted to live in a `linear-gradient` whose stops reference the segment colors (the POSITIVE — a multi-stop gradient is present on the single fill), not a separate overlay.
3. **W3 — the glass meter track.** The `.progress-sectioned-rail` track routes through `--glass-bg-quiet` (+ `--glass-blur-quiet` backdrop) — the frosted register, not the opaque `--secondary`/`--progress-sectioned-track`-only fill. RED at HEAD: `:138` paints `var(--progress-sectioned-track, var(--secondary, …))` with no glass-tier route and no `backdrop-filter`. The assert is POSITIVE (`--glass-bg-quiet` is referenced on the rail background) AND the recessed-channel `box-shadow` chrome (the inner-shadow groove) is PRESERVED (the chrome is not deleted in the glass re-route).
4. **W4 — pending keeps its hue (no neutral wash).** The pending recipe references the segment's own `--cell-color` as a low-alpha ghost on the track (no flat `--surface-tint-40` neutral in the demo segment data, no flat 12%-wash-of-neutral as the only pending paint). RED at HEAD: `demo/stories/feedback/progress.vue:17` is `--surface-tint-40`; `ProgressSectioned.vue:152` is the flat 12% wash. Source-asserted on BOTH the demo data (the `upload` color is a `--viz-*`/`--chart-*` hue) and the component pending recipe (the ghost reads `--cell-color`).

5. **The π binding readback** (the cardinal-lesson DELTA, captured own-surface — `tests-visual/progress-gradient.spec.ts`): a live `/feedback/progress` capture at `:5199` in BOTH modes with a paired π readback proving (a) the sectioned rail paints ONE continuous fill (a single filled-extent element, NOT four discrete `fillRectW` boxes — the DOM probe counts one fill paint span, not the four-cell stack the lane measured), (b) there is NO bright vertical seam stripe at any segment boundary (a luminance scan across each boundary shows a monotone blend, not a `screen`-brightened spike) and NO dead notch (the active→pending boundary carries the pending phase's ghost hue, not the recessed-track dark), (c) each segment still reads as a distinct band (the per-segment hue is identifiable across its span — the blend did not wash the segments into one mush), and (d) the track reads as a frosted glass channel (the `--glass-bg-quiet` register resolved). Captured to `docs/tranches/BA/audit/visual/W-PROGRESS-GRADIENT-DELTA.md` with before/after frames against the `ground/R8-14-rail-crop.png` baseline (the orange/blue/purple cells + stripes + notch), both modes.

6. **The `proof:ba-gestalt` whole-page verdict (BA inv-4 — the P-1 close-class fix).** Per-mechanism greens (W1-W4 + the π readback) do NOT alone close this visual wave. The `/feedback/progress` surface is captured whole-page, BOTH modes, over its real backdrop (the W-STAGE background map when it lands; the page floor before then), and judged as a gestalt ("does the phase-bus read as a designed glass meter on the page?") — the verdict recorded with the capture per `proof:ba-gestalt` (minted by W-GESTALT-GATE, Batch 0). A source-green/π-green but page-wrong state closes `complete_with_misses`, not `complete`, and is owed to W-REFLECT2 (Batch 7).

W1-W4 are the device-free CI half (`proof:progress-gradient`); the π readback + the `proof:ba-gestalt` verdict are the binding visual truth (a source-green/visually-broken gap is the exact AZ failure class this tranche exists to close). All three layers must hold for a clean close.

## Format And Lint Cadence

`npm run typecheck` after the `ProgressSectioned.vue` template + computed-fill edits; `npm run build` to confirm the SFC `<style scoped>` compiles into `/styles`; `node scripts/proof-progress-gradient.mjs` born-RED before the source edits (proof it fails at HEAD), GREEN at close; `npm run proof:gate-script-parity` after the package.json/scripts/gates.mjs registration; `git diff --check` before close.

## Verification Artefacts

- `docs/tranches/BA/audit/visual/W-PROGRESS-GRADIENT-DELTA.md` — before/after `/feedback/progress` frames (BOTH modes) + the paired π readback (one-fill count, the per-boundary luminance scan proving no stripe/notch, the per-segment hue identifiability, the glass-track register) against the `ground/R8-14-rail-crop.png` baseline.
- The `proof:progress-gradient` JSON artefact (born-RED log + GREEN-at-close log).
- The `proof:ba-gestalt` recorded verdict for the `/feedback/progress` surface.
- The gate-script-parity output post-registration.

## Commit Plan

- impl commit: `fix(progress): sectioned rebuilt on a single-fill gradient — no per-cell pills, no screen seam, glass meter track (BA.W-PROGRESS-GRADIENT)` — names the four mechanisms (one-fill / gradient-stops / glass-track / pending-ghost) in the body; the demo data re-point cited.
- gate commit: `test(progress): proof:progress-gradient born-RED→GREEN + parity registration + the π spec`.
- doc/status commit: the CLAUDE.md single-fill-gradient + glass-meter record + the DELTA doc + PROGRESS row.

## Dependencies

- **Depends on**: **W-DARK-MATERIAL** (Batch 1, the prerequisite per BG-6) — the glass `--glass-bg-quiet` track (scope 6) paints over the dark elevation ladder this wave does NOT author; the fill-vs-frosted-track contrast is verified against the W-DARK-MATERIAL dark register, not the pre-Batch-1 flat near-black floor (capturing over the broken dark register is wasted work). The blur token (`--glass-blur-quiet`) this wave reads is the value W-GLASS-CAL (this batch) dials back ~15-20% — token-first holds, this wave hardcodes no radius, so the cal lands transparently; no ordering constraint within Batch 4 (both read/write disjoint tokens).
- **Blocks**: nothing structurally. The booked `surface="glass"` Progress register (IG-C1's prop form) is a W-SURFACE-AXIS consumer follow — this wave lands the frosted track via the raw ladder tokens, and a future shared-axis prop on Progress consumes that register rather than re-authoring it. **W-REFLECT2** (Batch 7) re-walks `/feedback/progress` under the gestalt bar.

## Named successors (foreseeable misses)

- **The `surface="glass"` Progress prop (IG-C1 prop form).** If a consumer wants the frosted meter as a toggleable `surface` axis (the shared-axis vocabulary W-SURFACE-AXIS mints), that is a W-SURFACE-AXIS consumer edit on Progress, BOOKED — this wave lands the glass track as the sectioned variant's register (the IG-C1 home), not a net-new prop; folding the prop here would fork a second surface axis (the synthesis-warned anti-pattern in `idiom-gaps.md`).
- **The non-sectioned `<Progress variant="default|gradient">` glass register.** IG-C1 also names the plain rail as opaque (`bg-[var(--progress-track)]`); this wave scopes ONLY the sectioned variant (the R8-14 surface). A glass register on the default/gradient variants is a successor, not folded here (the prop boundary + the other two variant files are out of scope).
- **Live re-snap / interruption polish.** If the single-fill `--spring-snappy` grow reveals an interruption-continuity gap (the front re-basing mid-grow when `activeProgress` jumps), that is a motion-register refinement BOOKED to a successor, not this wave's paint re-architecture.
