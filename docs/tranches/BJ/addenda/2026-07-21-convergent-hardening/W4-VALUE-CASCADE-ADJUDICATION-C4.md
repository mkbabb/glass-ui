# W4 Value spectrum reset adjudication C4

Date: 2026-07-22  
Scope: omitted Value receiver/cascade obligation under MATERIAL W4  
Disposition: **producer/package/consumer RED; existing local shim held only until atomic retirement**

## Exact reciprocal authority

Value's current bounded carry ledger is
`docs/tranches/V/reformation/CARRY-LEDGER.md`
(`9e88f9e23a64cf26d123c91cdd3595b8348039afb3671fb33840557fe2b983f9`). Historical
`33d33d88…` was the W4-only receipt identity; the only later change appended the separately acknowledged
W8 hold row. The source witness is `demo/styles/foundation.css`
(`118dbe9c7fd1ff58c36b8b4fae7aecf78c96da41325ac11e3eecfaa294f33478`), lines 559–574; the exact
LF line slice hashes `f210fb6b…`.

The finding survived a local cascade inspection and an independent Sol x-high source/build/package
challenge. No Value or Glass product byte was edited.

## Reproduced defect

Value lines 571–574 restate both reset declarations on Glass's private
`.glass-slider[data-variant="spectrum"] .slider-range` selector. Whatever its comment calls it, this is a
consumer compatibility shim: it copies producer declarations onto producer internals to mask missing
public artifact bytes.

Glass source `src/components/slider/Slider.vue:501-505` (`fec904b6…`) authors both
`backdrop-filter:none` and `-webkit-backdrop-filter:none`; the range composes the actively blurred
`.glass-liquid-fill`. Fresh current `dist/glass-ui.css` (`17d88d73…`) retains only the prefixed reset.
Both current public entry graphs inherit those broken bytes:

- `/styles` → `dist/styles/index.css` (`c64e1d3e…`) → `../glass-ui.css`;
- `/styles.css` → `dist/component-styles.css` (`77da06a0…`) → `./glass-ui.css`.

The current build post-processing seam in `vite.style-assets.ts:47-70` (`28f152d1…`) processes the two
aggregate outputs but excludes root `dist/glass-ui.css`, contradicting the source fold policy. Value's
actually installed Glass 7.0.0 artifact is also broken and lacks the new component manifest. Therefore
source text, mutable local dist and the Value page with its shim grant zero W4 credit.

## Atomic retirement condition

Do not edit Value before the producer cut. The local rule is deleted only in the post-cut consumer
transaction, before receiver proof, after all of the following are true:

1. one unique immutable Glass 8 candidate has exact source→built→packed→installed→served identity;
2. isolated consumers import `/styles` only and `/styles.css` only;
3. each effective installed entry retains both unprefixed and prefixed `none` declarations;
4. an active upstream blur sentinel prevents the CSS initial `none` value from false-greening the test;
5. Chromium computes the unprefixed channel as `none`, actual Safari computes the WebKit channel as
   `none`, and both accessors are asserted where exposed, separately for both entries; and
6. after deleting Value's private-selector rule, all four spectrum receivers preserve alpha checker,
   transparent underlay, certified `trackInk`, orientation, RTL/inversion and pixels.

If any producer or installed-entry arm fails, Glass remains RED. Value neither retains nor adds a masking
rule to make candidate paint appear green.

## Additional born-RED arms

Extend the existing W4 gate/browser battery without creating a new tranche row:

1. preserve both source declarations but drop unprefixed `none` from built/packed SFC CSS; both entry
   graph diagnostics and Chromium blur-sentinel cells fail;
2. symmetrically drop prefixed `none`; both entry diagnostics and actual-Safari cells fail;
3. replace either reset or add a later winning blur; computed-cascade proof fails even if raw text exists;
4. restore/retain Value's private-selector rule after migration; consumer-shim census fails;
5. combine producer reset loss with the restored Value shim; producer acceptance still fails despite the
   visually masked Value page; and
6. explicitly account for `/styles × {unprefixed,prefixed}` and
   `/styles.css × {unprefixed,prefixed}`, retaining G18/V20 fixture-omission failures.

This C4 obligation deepens W4 V8 and the no-shim boundary. It does not authorize a new property, selector,
compatibility layer, early Value edit, package pin or browser claim.
