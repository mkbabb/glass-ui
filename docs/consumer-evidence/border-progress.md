# BorderProgress

## Artefact path

`src/components/custom/border-progress/` (the published subpath
`@mkbabb/glass-ui/border-progress`). The masked-conic border-ring primitive where
progress IS the element's border — a `@property`-animated `<percentage>` conic-gradient
mask-composited into the border band (radius-following), the brand spectrum walked
OKLCH/shorter-hue via the `/color` leaf, coverage `full-ring|bottom-edge`, the
phase-edge milestone register, the 10-14px envelope.

## Verdict

`keep-current` — **user-directed wave (BB.W-BORDER-PROGRESS), the speedtest C2 headline
("the bottom progressbar should serve as a thicker, dynamic BORDER of the card… a
spectrum of our colors"), booked with a named cross-repo consumer.** The library had no
primitive where progress IS the chrome — the three `Progress` variants are all floating
track-and-fill rects (the register the user rejected). `<BorderProgress>` is the
first-class answer. The honest component-orphan census (source files only, the demo
own-story + the library publication machinery excluded) measures it at exactly **1 real
in-repo call-site** — below the bare ≥2 bar, but a load-bearing published primitive with
a NAMED, non-phantom cross-repo consume booked.

## Consumer proof (re-runnable)

**Internal consumers — 1 (real).** The feedback/progress story demonstrates the ring
bound to the same `determinate` model as the floating `Progress` variants:

```bash
grep -rln 'components/custom/border-progress|@mkbabb/glass-ui/border-progress' demo/ src/ \
  | grep -v '/components/custom/border-progress/' | grep -v 'src/subpaths/'
#   → demo/stories/feedback/progress.vue
```

**External consumers — 0 at HEAD (the booked cross-repo consume).** speedtest's
`PhaseTimeline.vue` (today a floating `<GlassTimeline>` rail seated as a detached child)
re-points onto `<BorderProgress>` on its `^4.1.0` `@mkbabb/glass-ui` bump (the AW.W7
adopt — the C2 ask). The foreign-tree fence holds — this primitive does NOT edit speedtest.

## The named ≥2-consumer TRIGGER

The binding close-criterion is speedtest's `PhaseTimeline` re-pointing onto
`@mkbabb/glass-ui/border-progress` on the `^4.1.0` bump. When that lands (a
`grep -rln 'glass-ui/border-progress' ~/Programming/speedtest/src` hit), record the
call-site here; the component clears the ≥2-consumer bar on its own and this
evidence-doc escape is no longer load-bearing.

## Re-audit proof

Satisfies the `proof:component-orphan` `keep-current` verdict for `border-progress`
while the named second consumer is in flight.
