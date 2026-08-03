# W4 `abb1eba2` Sol contract / detector critic C2

Date: 2026-07-22  
Existing owner: MATERIAL W4 `BJ.W-TRACK-DRY` / `R-TRACK-PUBLIC-BREAK`  
Inspected candidate: commit `abb1eba22cf9429c8c5ccf3a8b13fe032ca4404b`, tree `a4a56b4b31e3bf659c609758b4e1ca7c3943c7ea`  
Disposition: **bank the typed source shape; detector, package and receiver contract remain RED**

## Exact-byte boundary

The candidate changes 17 paths from parent `5a8da7800e2a776b9017b72129241ef4384ffa26`.
Its parent-diff SHA-256 is `f1b27a9655499ea1602f8065d787671300f3326bbf806d43f9fce57e710554dd`.
The independent critic made no repository edit.

Key candidate identities:

| path | SHA-256 |
| --- | --- |
| `package.json` | `3a0618a72dc56c18589546b84960140d42fe6c548757499e4e967ede743b8e61` |
| `scripts/gen-component-styles.mjs` | `0992957ec97fdd78d95b91cded6269e26f356457014cf9b1b8cda6c42172a13e` |
| `tests/styles/typed-track-seam.test.ts` | `7bf51b7c768d8a7ef6630b4ae66754de0ecf77eb55a943ac7890fcd3bf774b7b` |
| `src/styles/glass/track-well.css` | `e7f6e835cc4aefbc9ecf8f6d1a09baf9a73852393bc66522e7842d4ef5e2596d` |
| `src/styles/glass/value-marks.css` | `aa07fd878af16aeb5fad4c78d8170cbdbba2a3346d51fed86edfc935d4964e8a` |
| `src/components/slider/Slider.vue` | `fec904b6134d13fd7487ecb0cec6f510819cf7ee30d4aa09f923732771d21a51` |
| `src/components/progress/Progress.vue` | `78330692a87b3be09e13a03b86bd2ba2f6d053b03828e370600d7913fbe84e83` |

## Bankable source direction

The source narrowly follows the third adjudication:

- `.glass-track-well` retains structure without the rejected generic `--track-bg` paint axis;
- `.glass-value-marks` / `.glass-value-mark` replace the generic candidate hooks;
- Slider reads inheriting `--glass-slider-track-background` with background grammar;
- Progress reads inheriting `--glass-progress-track-color` with color grammar and no local mask;
- the retained `./styles.css` export points to a generated component manifest;
- the canonical `./styles` graph remains distinct and does not intentionally duplicate the W4 partials.

This is useful producer-source progress. It is not a release cut.

## P1: the new export is absent in supported build modes

`package.json` invokes `scripts/gen-component-styles.mjs` only in the one-shot `build` script:

```text
build       vite build && npm run emit-types && node scripts/gen-component-styles.mjs
build:watch vite build --watch
iter-build  vite build --config vite.iter.config.ts
```

Fresh isolated executions of both `build:watch` and `iter-build` produced `dist/glass-ui.css` but no
`dist/component-styles.css`. The latter is the exact target declared by `exports["./styles.css"]`.
The export therefore dangles during ordinary iterative and watched development. The repository's own
`vite.style-assets.ts` / style-fold prose says the SFC public artifact belongs to the Vite build graph;
a post-build script on only one command contradicts that ownership.

The KISS correction is one shared Vite emission hook used by every supported build config, with an exact
fresh-artifact gate. Do not create three command-specific generators.

## P1: the standing gate passes without the artifact

From a clean archive with `dist/` absent:

```text
npx vitest run tests/styles/typed-track-seam.test.ts --reporter=verbose
15/15 GREEN
```

The test conditionally inspects `dist/component-styles.css` only when it already exists. The artifact it
claims to protect can be missing and the gate still passes. A source-only test cannot prove a generated
public subpath.

The replacement gate must build into an empty output directory, require the file, pack the artifact,
install it into a fresh consumer, resolve both CSS subpaths there, and compare source→built→packed→installed
identity. Missing or stale output must be RED.

## P1: three direct false-green mutations

The exact candidate test remained 15/15 GREEN after each of these contract-breaking mutations:

1. append `.value-mark::before { content: ""; }` to a governed source;
2. add `--glass-progress-track-color: linear-gradient(red, blue)` outside `Progress.vue`;
3. import the W4 partials directly into canonical `src/styles/index.css`, duplicating their existing
   transitive reach.

The generic selector regex misses pseudo-elements and pseudo-classes, the color-grammar check scans only
one SFC, and the canonical non-duplication check proves an expected label rather than the import graph.
These are not exotic attacks; they are the exact public contract.

## Detector scope is not the repository scope

The generic-property census names only four files. It does not prove all runtime CSS, Vue styles, demos,
generated CSS or package entries. The DOM test mounts only synthetic component wrappers. It does not prove
computed paint, inheritance, fractional geometry, directionality, clipping or forced-color behavior.

The final detector should use one allowlisted repository-wide runtime-source census, a parsed CSS import
graph for both public entries, exact built-selector/property counts, and production computed-style probes.

## Stale canon remains

The cut leaves old SFC-only ownership prose in `scripts/gen-component-styles.mjs`, `src/styles/index.css`
and `vite.style-fold.ts`, while the new component entry also requires shared W4 partials. `MIGRATION.md`
still names `--progress-track` as a supported local rail treatment after declaring it removed. Those
contradictions make the new public contract non-self-describing.

The existing `value-marks` / `track-well` tests also retain pixel-identical language without pixel proof.
Only one synthetic Progress visual was added; the adjudicated Slider/Progress production matrix remains
absent.

## Binding contract continuation

Luna x-high owns one bounded forward correction:

1. move component-manifest emission into a shared build lifecycle used by `build`, `build:watch` and
   `iter-build`;
2. make clean absence, stale output and missing/reordered/duplicated partials fail closed;
3. replace file-list/regex claims with an allowlisted runtime-source census and parsed public import graph;
4. cover pseudo selectors, every writer of both typed properties, grammar, local masking and canonical
   duplication;
5. correct generator/style-fold/migration prose;
6. run production Slider and Progress computed-style/pixel probes at the adjudicated fractional,
   DPR, direction, inversion, clipping, PRM and forced-color states;
7. then build, pack, install and serve one unique 8.0 candidate for consumer proof.

No consumer shim, generic alias, third paint axis, mutable local `dist`, source substitution, 7.0 repin,
or W4 closure follows from `abb1eba2`.
