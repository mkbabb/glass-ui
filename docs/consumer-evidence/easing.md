# EasingPicker / EasingConfigurator

## Artefact path

`src/components/custom/easing/` (the published subpath `@mkbabb/glass-ui/easing`).
The value.js-BEARING leaf of the motion system — `<EasingPicker>` (the bare curve
editor) + `<EasingConfigurator>` (the SAME picker seated in a `<ConfiguratorLayer>`
shell), sharing the `useEasingPicker` composable. It carves OFF the value.js-free
root barrel as its own subpath (the SCC-trap discipline; the `/motion-curves`
precedent).

## Verdict

`keep-current` — **user-directed wave (BB.W-EASING-PRIMITIVE), booked with a named
cross-repo consumer.** `<EasingPicker>` is the platform's ONE published
curve-authoring primitive — a curve editor over the REAL value.js twin
(`CSSCubicBezier` / `steppedEase` / `bezierPresets` / `jumpTerms`) that reads a
re-parseable CSS literal back. It is a deliberate published primitive (the C-3 fold:
the curve-gallery's `BezierEditor`/`StepsEditor` re-home onto it). The honest
component-orphan census (source files only, library publication machinery + demo
own-story excluded) measures it at exactly **1 real in-repo call-site** — below the
bare ≥2 bar, but a load-bearing published primitive with a NAMED, non-phantom
cross-repo consume booked. Booked here per the evidence-doc escape.

## Consumer proof (re-runnable)

**Internal consumers — 1 (real, NOT the own-story).** The curve-gallery binds the
picker in BOTH modes (bezier + steps):

```bash
grep -rln 'components/custom/easing|@mkbabb/glass-ui/easing' demo/ src/ \
  | grep -v '/components/custom/easing/' | grep -v 'src/subpaths/'
#   → demo/stories/motion/curve-gallery.vue
```

`demo/stories/motion/curve-gallery.vue` imports `EasingPicker` + `EasingConfigurator`
from the family and binds both modes — two live in-repo bindings inside one file (the
file is the unit the census counts). This is NOT the own-story: the easing family's
own story id is `curve-gallery`, a consuming demonstration of the family, not the
package's `easing.vue` self-story (there is none — the family ships under the
curve-gallery surface).

**External consumers — 0 at HEAD (the booked cross-repo consume).** value.js's
`GradientPane` is the named second consumer — it composes `<EasingPicker>` for the
ease-along-the-ramp axis on its next `@mkbabb/glass-ui` pin bump (the cross-repo
CONSUME contract, recorded by name in `src/components/custom/easing/README.md` and
`docs/precepts/design-idioms.md §11`). The foreign-tree fence holds — this primitive
does NOT edit value.js.

## The named ≥2-consumer TRIGGER

The binding close-criterion is value.js's `GradientPane` re-pointing its
ease-along-the-ramp picker onto `@mkbabb/glass-ui/easing` on the next pin bump. When
that lands (a `grep -rln 'glass-ui/easing' ~/Programming/value.js/src` hit), record
the call-site here; the component clears the ≥2-consumer bar on its own (curve-gallery
+ value.js GradientPane) and this evidence-doc escape is no longer load-bearing.

## Re-audit proof

Satisfies the `proof:component-orphan` `keep-current` verdict for `easing` while the
curve-gallery binding stays present AND the value.js GradientPane consume is booked.
If the curve-gallery binding is removed with no external consumer arriving, the verdict
returns to `library-orphan` (formally retire the `/easing` subpath + export).

**Re-audit date: 2026-09-01.** By then either (a) value.js's `GradientPane` has
re-pointed onto `@mkbabb/glass-ui/easing` (record the call-site; the ≥2-consumer bar
clears) OR (b) the consume has not landed → re-grade.

## Cross-references

- `src/components/custom/easing/README.md` (the boundary law + the ≥2-consumer bar).
- `demo/stories/motion/curve-gallery.vue` (consumer #1 — both modes).
- `docs/precepts/design-idioms.md §11` (the picker-on-Configurator idiom home).
