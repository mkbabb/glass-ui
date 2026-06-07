# AW.W1 - Dock simple-collapse regression fix

## State

**Name**: W1 - Dock simple-collapse regression fix
**Opens after**: AW tranche open (AW.W0 formalize + spot-verify)
**Agents**: 1 serial
**Hard gate**: `proof:dock-animation-live` rAF-samples the GlassDock OWN collapse↔expand width morph (the `summary`↔`full` outer pair) over ≥3 rising frames on a START-COLLAPSED two-layer dock (the slides config), on both the FLIP and VT paths — a frozen-at-collapsed-width timeline (≈19px stuck) is RED.
**Status**: planned

## Goal criterion

This wave succeeds if a bare `<GlassDock>` that STARTS collapsed with a default
slot + a `#collapsed` slot MORPHS its width when it first toggles expanded — the
box grows from the collapsed summary floor to the full content width over a
visible spring, on every engine — and a behavioral gate FAILS on the
frozen-at-collapsed-width timeline (state toggles but width stuck ≈19px) that
shipped in 3.3.0. The regression is the GlassDock's OWN start-collapsed first
expand, not the `DockLayerGroup` multi-pane switch (which AV.W9 fixed) and not the
already-mounted-wide demo dock the existing gate samples (which DOES animate).

## Scope

1. Diagnose why the outer `useLayerTransition` pair in `GlassDock.vue`
   (`outerActiveLayer` = `"summary" | "full"`, `containerEl: layersEl`,
   `axis: "horizontal"`) freezes the `.dock-layers` width on the FIRST expand of
   a dock that STARTS collapsed (the slides two-layer config), while the
   already-expanded-once demo dock (mounted wide, hover-collapse-then-expand)
   morphs fine. NOT the prior "stacked-grid MAX" cause — that is FALSIFIED: the
   inactive layer is `position:absolute; inset:0` (`dock.css:589-592`), so it is
   OUT of flow and the grid's intrinsic width is the ACTIVE layer's, never a max
   of both. The real seam is the start-collapsed `getSize` measurement: on the
   first `summary→full` swap, `useLayerTransition` measures `toSize` (line 278,
   `el.style.transition = "none"; clearDim(el); getSize(el)`) WHILE the
   `.glass-dock.collapsed` class still applies — so the `min-width` summary floor
   (`dock.css:378-379`, `--dock-collapsed-summary-min-size`, default 2.5rem ≈
   40px; ≈19px under the slides density override) and the collapsed-state width
   rules clamp `toSize ≈ fromSize`. With `toSize ≈ fromSize` the spring has no
   span to morph and the box stays frozen at the summary floor. The demo dock
   does not trip it because it first mounts/expands wide (its `from` is already
   the full width). Confirm this empirically against HEAD before writing the fix
   (Playwright at `http://localhost:5174/til-briefing`, the slides start-collapsed
   two-layer dock) — see §11 Archaeology.
2. Restore the width morph on the GlassDock start-collapsed first expand by
   measuring `toSize` against the EXPANDED-state class context (the
   `.glass-dock.expanded` width rules), not the residual collapsed-state floor —
   i.e. the natural-size measurement must read the box as it will be AFTER the
   `visualExpanded` flip the swap encodes, so `toSize` is the full content width
   and the spring has a real span. Keep exactly ONE authority per engine: the
   `SpringProgress` FLIP path or the View-Transitions group, never a CSS-native
   intrinsic-width destination second-driving the same property (the AV.W9.0
   one-driver-per-concern invariant is preserved).
3. Widen `proof:dock-animation-live` so its FLIP and VT timelines sample a
   START-COLLAPSED two-layer dock's FIRST expand (mount collapsed, toggle
   `visualExpanded` from `false`), not only the demo's already-wide
   hover-collapse-then-expand the existing probe samples. The existing gate's
   `.glass-dock.collapsed` + `.dock-layers`-width selectors are CORRECT (the prior
   wave's "the gate samples the DockLayerGroup switch" premise was INVERTED — the
   demo route has zero `DockLayerGroup`); the miss is the CONFIG, not the
   selector. The freeze assert (rising-frame COUNT) must bite on a dock stuck at
   the ≈19px summary floor through a first expand.
4. Add a vitest unit over the pure detectors (`risingFrames`, `arrivalTimeMs`,
   `maxInterFrameJump`) feeding the collapse case a synthetic frozen timeline
   (all-equal widths at the summary floor) and asserting it produces a freeze
   violation — so the widened gate's failure path is itself covered and cannot
   regress to a false-GREEN on a flat series.

## Triumvirate Dispatch

A triumvirate (research + plan augment + redress) is mandatory when:

- the file bounds expand beyond the four listed paths — in particular if the fix
  requires editing `useLayerTransition.ts` in a way that touches the
  `DockLayerGroup` inner-pair behavior (a shared-composable change is a
  cross-consumer blast radius and must be re-planned, not patched in place);
- `proof:dock-animation-live` fails on the VT path specifically (a browser-owned
  morph that cannot be forced off is not local-edit-recoverable — it is an
  engine/`view-transition-name` contract question);
- the third diagnostic iteration of "why does the start-collapsed first expand
  measure the collapsed floor as `toSize`" does not localize the root cause to a
  single measurement seam — OR the empirical HEAD re-diagnosis (Playwright on the
  slides start-collapsed config) shows the freeze is NOT the
  measure-under-collapsed-class seam this wave names (a different mechanism than
  diagnosed is a re-plan trigger, not a local patch).

## File Bounds

| File | Access |
|---|---|
| `src/components/custom/dock/GlassDock.vue` | modify |
| `src/components/custom/dock/composables/useLayerTransition.ts` | modify |
| `scripts/proof-dock-animation-live.mjs` | modify |
| `demo/stories/navigation/dock.vue` | modify (add the start-collapsed two-layer showcase the widened probe samples — none of the existing `always-expanded` stories exercise first-expand-from-collapsed) |
| `tests/components/custom/dock/dock-animation-live.detect.test.ts` | create |

Do NOT touch: `src/styles/dock.css` (the lockstep/opacity contract is AW.W2's
surface — W1 is the size-morph regression only), `scripts/regen-spring-tokens.mjs`
or `src/styles/tokens.css` (the spring retune is AW.W2), `DockLayerGroup.vue`
(its inner pair already morphs — the gate proves it does not regress).

## Disjointness

Single agent unit; no shared `modify` paths. W1 owns the start-collapsed
first-expand size-morph regression and its behavioral gate; AW.W2 owns the
opacity/spring re-seat and the token retune; AW.W3 owns the rail/wrap/hover-scale
surface. No two AW dock waves write the same path IN PARALLEL — `useLayerTransition.ts`
is touched by W1 (the measurement re-seat), W2 (the opacity-onto-the-driver fold),
and W3.a (the typed-VT thread); `demo/stories/navigation/dock.vue` is touched by W1
(the start-collapsed showcase) and W3.b (the wrap/hover showcase). All AW dock
waves are SEQUENCED (W2 opens after W1; W3 opens after W2), so these shared paths
are written one wave at a time, never concurrently.

## Agent Units

### AW.W1.a Start-collapsed first-expand morph + behavioral gate

- Goal: a bare two-slot `<GlassDock>` that STARTS collapsed morphs its width on
  its first expand, and a rAF-sampling gate fails on the frozen-at-summary-floor
  (≈19px) timeline.
- Mechanism: localize why `useLayerTransition`'s natural-size measurement
  (`getSize` after `el.style.transition="none"; clearDim(el)` at
  `useLayerTransition.ts:276-278`) reads the COLLAPSED summary floor as `toSize`
  on the first `summary→full` swap of a start-collapsed dock — the measurement
  runs while `.glass-dock.collapsed` still applies, so the `min-width` summary
  floor (`dock.css:378-379`) and the collapsed width rules clamp the measured
  natural width to ≈ the summary size, collapsing `toSize ≈ fromSize`. The
  `< 0.5` no-op early-return (`useLayerTransition.ts:285`) is `!live`-gated and
  fires on this fresh first swap, so the morph short-circuits and the box stays
  frozen. Fix the measurement so `toSize` reads the box under the EXPANDED-state
  class context the swap encodes (the `.glass-dock.expanded` width rules), not the
  residual collapsed floor — keeping the one-driver-per-concern invariant (no CSS
  intrinsic-width destination, the FLIP spring or the VT group is the sole
  authority). Then widen the gate probe to drive a start-collapsed dock's first
  expand and assert the morph on it.
- Files: `GlassDock.vue`, `useLayerTransition.ts`, `proof-dock-animation-live.mjs`,
  `tests/components/custom/dock/dock-animation-live.detect.test.ts`
- Sub-gate: `npm run proof:dock-animation-live` reports `widthRisingFrames >= 3`
  on the start-collapsed dock's FIRST expand (FLIP path) AND `vtGroupAnimations
  >= 1` on the VT path; the new vitest asserts the pure detector flags a synthetic
  flat-width series (all-equal at the summary floor) as a freeze.

## Hard Gate

1. `npm run proof:dock-animation-live` — the probe mounts a START-COLLAPSED
   two-slot `<GlassDock>` (the slides config: a default slot + `#collapsed`,
   `expanded` initially `false`) and drives its FIRST expand, reporting
   `widthRisingFrames >= 3` on the forced-FLIP timeline and `vtGroupAnimations >=
   1` on the native VT timeline. Add a start-collapsed showcase to
   `demo/stories/navigation/dock.vue` if the existing demo offers no
   start-collapsed two-layer mount (the existing `always-expanded` stories do
   NOT exercise the first-expand-from-collapsed path). The committed 3.3.0 build
   reports `widthRisingFrames == 0` (frozen ≈19px at the summary floor) on this
   start-collapsed probe — capture that born-RED artefact as the regression
   witness before the fix, GREEN after. The gate SKIPs fail-open on a harnessless
   runner (verified: it printed `SKIPPED (no Playwright harness)` on the 3.3.0
   build here), so the born-RED + GREEN timelines are CAPTURED in the MCP/dev env
   with Playwright (`localhost:5174/til-briefing` for the live slides-config
   witness; the demo showcase for the in-repo reproduction) and saved to the W1
   artefact — the harnessless static-structure pre-checks (gate 2) are the only
   bar a CI-without-browser runner enforces.
2. `npm run proof:dock-motion-single-source` + `npm run proof:dock-opacity-lockstep`
   stay GREEN (the structure pre-checks: one rAF origin, one easing token).
3. `npx vitest run tests/components/custom/dock/dock-animation-live.detect.test.ts`
   — the pure detector flags a flat (all-equal) width series as a freeze
   violation and a rising series as clean.
4. `npm run typecheck` clean.
5. `npm run proof:no-test-in-src` GREEN (the new spec lives under `tests/`, not
   `src/`).

## Format And Lint Cadence

`npm run typecheck` after the `GlassDock.vue` + `useLayerTransition.ts` edit and
before close. `git diff --check` for whitespace. Prettier over the `.mjs` gate +
the new `.test.ts`. The four behavioral/structure proof gates above run before
close.

## Verification Artefacts

- `docs/tranches/AW/audit/W1-collapse-live.json` — the gate artefact captured in
  the Playwright env (the born-RED 3.3.0 start-collapsed timeline frozen at the
  ≈19px summary floor + the GREEN post-fix timeline, with `widths`/`times`
  series; the slides-config witness from `localhost:5174/til-briefing` and the
  in-repo demo-showcase reproduction).
- The vitest run log for `dock-animation-live.detect.test.ts`.
- The diff localizing the natural-size measurement fix in `useLayerTransition.ts`.

## Commit Plan

- `fix(dock): morph GlassDock start-collapsed first expand — measure toSize under
  the expanded-state class, not the collapsed summary floor` — the `GlassDock.vue`
  + `useLayerTransition.ts` fix (body: names the 3.3.0 start-collapsed regression,
  the measure-under-collapsed-class root cause, the falsified stacked-grid-max
  prior diagnosis, the one-driver-per-concern preservation).
- `test(dock): widen proof:dock-animation-live to a start-collapsed first expand +
  start-collapsed demo showcase + detector unit` — the gate config widening, the
  demo story, and the new vitest.
- `docs(AW): W1 close — collapse-live artefact + status` — the audit artefact +
  the wave status flip.

## Dependencies

- **Depends on**: AW.W0 (formalize + spot-verify); the published 3.3.0 baseline
  (the regression witness).
- **Blocks**: AW.W2 (the opacity/spring fold re-seats onto the SAME driver this
  wave restores — the morph must paint before lockstep can be measured on it);
  slides H.W1 (the de-docked progress bar consumes a dock whose collapse works).

## Archaeology

- AU.W8b shipped a native `interpolate-size`/`calc-size` container-morph arm that
  second-drove `.dock-layers` width against the `SpringProgress` FLIP driver — a
  dual-driver race that froze the dock (born-RED only once
  `proof:dock-animation-live` existed). AV.W9.0 retired that arm (`dock.css:460`).
- AV.W9 then fixed the `DockLayerGroup` multi-pane switch (runtime-verified
  40→197 over 12 frames) but the GlassDock OWN START-COLLAPSED two-layer first
  expand REGRESSED — it toggles `visualExpanded` but the width stays frozen at the
  ≈19px summary floor. This shipped in 3.3.0 (RECAP :39).
- EMPIRICAL RE-DIAGNOSIS (this wave, against the 3.3.0 build):
  - `npm run proof:dock-animation-live` SKIPs fail-open on a harnessless runner
    ("SKIPPED (no Playwright harness)") — so the static-structure pre-checks are
    all a CI-without-browser runner enforces; the behavioral truth lives wherever
    Playwright runs.
  - Playwright on the DEMO dock (`localhost:5175/navigation/dock`) ANIMATES — it
    mounts wide / `always-expanded` and the existing probe's hover-collapse-then-
    expand has a real `from` width, so it never trips the freeze. This is why the
    existing gate (which samples `.glass-dock.collapsed` + `.dock-layers` width on
    the demo route — the CORRECT selectors) is GREEN against 3.3.0 and the
    regression shipped unsampled.
  - Playwright on the SLIDES dock (`localhost:5174/til-briefing`, the
    start-collapsed two-layer config) is FROZEN at ≈19px — state toggles but width
    is stuck. THIS is the unsampled path.
- PRIOR DIAGNOSIS FALSIFIED: the earlier "the stacked-grid measures the MAX of the
  two layers, so `toSize == fromSize`" root cause is WRONG — `dock.css:589-592`
  sets `.dock-layer:not(.layer-active){position:absolute; inset:0}`, so the
  inactive layer is OUT of flow and the grid's intrinsic width is the ACTIVE
  layer's, never a max. The real mechanism is the start-collapsed FIRST-EXPAND
  measurement reading the collapsed summary floor (`dock.css:378-379`) as `toSize`
  while `.glass-dock.collapsed` still applies, collapsing the spring's span.
- New guardrail: `proof:dock-animation-live` must sample a START-COLLAPSED
  two-layer dock's FIRST expand (the slides config), not only the demo's
  already-wide hover-collapse-then-expand — the CONFIG was the miss, not the
  selector. The widened probe is the canary that closes this exact miss class.
