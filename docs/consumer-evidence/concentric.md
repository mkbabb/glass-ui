# Concentric

## Artefact path

`src/components/custom/concentric/` (the published subpath
`@mkbabb/glass-ui/concentric`). The radial Fourier ring-interference viz — the LAST new
WebGPU-first member of the procedural-animation suite (BB.W-VIZ-SUITE / W-CONCENTRIC). A
`concentric.wgsl.ts` WebGPU primary + a `concentric.glsl.ts` WebGL2 fallback over
`useGpuSubstrate`, ONE math source (`ringField.ts.sampleRingField`) transcribed
JS↔WGSL↔GLSL, the warm-cream identity default.

## Verdict

`keep-current` — **a born-WebGPU-first suite member (BB.W-VIZ-SUITE), the suite's
documented FAMILY surface, booked with a named second consumer.** Concentric is one of
the two NET-NEW viz the WebGPU-first procedural-animation suite mints (alongside
`dot-flow-field`), each a first-class published substrate with its own subpath + story.
The honest component-orphan census (source files only, the demo own-story + the library
publication machinery excluded) measures it at exactly **1 real in-repo call-site** —
below the bare ≥2 bar, but a load-bearing published viz documented in the suite family
doc with a NAMED second-consumer trigger booked.

## Consumer proof (re-runnable)

**Internal consumers — 1 (real, NOT the own-story).** The substrates story demonstrates
the field as a configurator-toggle studio over a calm grid wash:

```bash
grep -rln 'components/custom/concentric|@mkbabb/glass-ui/concentric' demo/ src/ \
  | grep -v '/components/custom/concentric/' | grep -v 'src/subpaths/'
#   → demo/stories/substrates/concentric.vue
```

It is documented as a first-class member of the procedural-animation FAMILY at
`src/components/custom/PROCEDURAL-SUITE.md` (all seven members + the per-viz substrate
verdict).

## The named ≥2-consumer TRIGGER

The binding close-criterion is a second binary consumer of `<Concentric>` — a consumer
app or demo composition mounting the radial-Fourier field as a page background or hero
substrate. When that lands (a `grep -rln 'glass-ui/concentric'` hit outside the demo
own-story), record the call-site here; the viz clears the ≥2-consumer bar on its own and
this evidence-doc escape is no longer load-bearing.

## Re-audit proof

Satisfies the `proof:component-orphan` `keep-current` verdict for `concentric` while the
named second consumer is in flight.
