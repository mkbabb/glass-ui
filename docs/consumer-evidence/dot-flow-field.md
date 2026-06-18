# DotFlowField

## Artefact path

`src/components/custom/dot-flow-field/` (the published subpath
`@mkbabb/glass-ui/dot-flow-field`). The FIRST new WebGPU-first viz of the
procedural-animation suite (BB.W-VIZ-SUITE / W-FLOWFIELD) — small dots seeded along
undulating streamlines rippling in waves: a curl-noise flow field traced by advected
particles over a Gerstner/Tessendorf sum-of-sines wave potential. A
`@compute @workgroup_size(64)` WGSL advection kernel + an instanced-billboard render
pass, with a Canvas2D point-cloud fallback stepping the SAME `flowField.ts` evaluator;
the warm-cream identity default.

## Verdict

`keep-current` — **a born-WebGPU-first suite member (BB.W-VIZ-SUITE), the suite's
documented FAMILY surface, booked with a named second consumer.** DotFlowField is one of
the two NET-NEW viz the WebGPU-first procedural-animation suite mints (alongside
`concentric`), each a first-class published substrate with its own subpath + story. The
honest component-orphan census (source files only, the demo own-story + the library
publication machinery excluded) measures it at exactly **1 real in-repo call-site** —
below the bare ≥2 bar, but a load-bearing published viz documented in the suite family
doc with a NAMED second-consumer trigger booked.

## Consumer proof (re-runnable)

**Internal consumers — 1 (real, NOT the own-story).** The substrates story demonstrates
the dot-flow-field over a calm grid wash (its own single GL/compute context):

```bash
grep -rln 'components/custom/dot-flow-field|@mkbabb/glass-ui/dot-flow-field' demo/ src/ \
  | grep -v '/components/custom/dot-flow-field/' | grep -v 'src/subpaths/'
#   → demo/stories/substrates/dot-flow-field.vue
```

It is documented as a first-class member of the procedural-animation FAMILY at
`src/components/custom/PROCEDURAL-SUITE.md` (all seven members + the per-viz substrate
verdict), and it is the named #3 consumer of the shared `curlFBM` flow operator
(`src/composables/glass/webgl/shaders/flow.glsl.ts`).

## The named ≥2-consumer TRIGGER

The binding close-criterion is a second binary consumer of `<DotFlowField>` — a consumer
app or demo composition mounting the dot-flow-field as a page background or hero
substrate. When that lands (a `grep -rln 'glass-ui/dot-flow-field'` hit outside the demo
own-story), record the call-site here; the viz clears the ≥2-consumer bar on its own and
this evidence-doc escape is no longer load-bearing.

## Re-audit proof

Satisfies the `proof:component-orphan` `keep-current` verdict for `dot-flow-field` while
the named second consumer is in flight.
