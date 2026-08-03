# W4 Luna gate and package design C3

Date: 2026-07-22  
Existing owner: MATERIAL W4 `BJ.W-TRACK-DRY` / `R-TRACK-PUBLIC-BREAK`  
Disposition: **normative Luna implementation packet; detector, package and consumer acceptance remain RED**

## Binding failure law

The exact `abb1eba2` gate is not an acceptance substrate. It passes 15/15 when `dist/` is absent and also
passes after each of these independent defects:

1. a generic `.value-mark::before` hook;
2. a first-party gradient writer into `--glass-progress-track-color`; and
3. direct duplicate canonical imports that make the shared structure occur more than once.

Its four-file regex census, visited-set import traversal and generated-file presence checks do not prove
the repository/runtime closure, effective public graph, or actual packed bytes. The one-shot 7.0 dry pack
(`22aa42c…`, 889 entries) is discovery only. This design binds the exact boundary acknowledged by the Q
consumer task: six default Slider receiver families remain post-cut; no live Q/Atlas Progress receiver is
invented; canonical `./styles` is structurally complete at the source candidate while retained
`./styles.css` is the broken/export-risk arm.

## Selected contract

### One parsed source census

Replace the four-file regex with a repository-wide, syntax-aware census over governed production inputs:

- Vue SFCs through `@vue/compiler-sfc`, including template classes and scoped/unscoped style blocks;
- CSS through PostCSS, including nested at-rules, selectors, declarations and forbidden property
  registrations;
- TS/JS through the repository parser, including static style objects and string/template writers; and
- a raw-sentinel escape scan that fails on governed vocabulary the parsers could not classify.

Allowances are keyed by semantic owner and contract, never by line number. Test/demo/docs fixtures are
separate declared domains; an undeclared production **match** is a failure. The census covers selectors,
attribute hooks, property registrations, declarations, `var()` readers and programmatic writers. Retired
vocabulary is forbidden in live runtime domains; migration ledgers and historical addenda remain permitted
only in explicit removal/negative contexts. Token boundaries are exact, so retained
`--progress-track-on-glass` never matches retired `--progress-track`.

The exact W4 law is:

- structure: one public `.glass-track-well` definition;
- marks: only `.glass-value-marks` and `.glass-value-mark`, with the zero-line mechanic owned once;
- Slider paint: inheriting ordinary custom property `--glass-slider-track-background`, accepting valid CSS
  `background` values including colors and gradients, with the adjudicated writers;
- Progress paint: inheriting ordinary custom property `--glass-progress-track-color`, with zero production
  writers and no local masking declaration;
- rejected vocabulary: generic `--track-bg`, `.value-mark(s)`, retired properties and aliases remain absent.

The Progress rule is a **first-party writer law**. Current production allowlist count is zero. A declared
test/package fixture may supply one color writer so the classifier and inheritance are executable. Its
finite allowlisted AST grammar accepts only named/hex/functional colors, `currentColor`, governed
color-valued tokens and explicitly classified color functions; unknown/dynamic constructs fail closed and a
gradient fails. External substitution retains ordinary unregistered custom-property behavior. Adding a W4
`@property` registration is forbidden unless separately adjudicated—especially `inherits:false`, which
would break the wrapper inheritance contract. This avoids inventing a second runtime axis.

### One occurrence-aware public CSS graph

Create one small parsed graph helper reused by the W4 gate, orphan-CSS gate and package verifier. It:

1. recursively derives CSS roots from the actual package exports/subpath policy, then applies the strict W4
   component contract to the two component-bearing entries `./styles` and `./styles.css`;
2. resolves every local `@import` occurrence with its media/layer/supports envelope and source order;
3. retains parallel occurrences—no global visited set may erase duplicate reach;
4. uses only the current recursion stack to detect a cycle;
5. fails on missing, escaping, empty, unsupported or non-file edges; and
6. returns both the ordered occurrence graph and parsed effective declarations/selectors.

Canonical `./styles` and retained `./styles.css` are separate graphs. Parsing may be cached, but every
incoming occurrence is traversed. The required W4 structure occurs once per selected public entry; a second
occurrence is rejected even under a different conditional envelope because W4 has no adjudicated
mutually-exclusive duplicate branch. The report still retains media/layer/supports envelopes rather than
naively flattening them. Direct duplicate imports, transitive duplicate imports, reorder, omission and a
cycle are distinct failures with stable diagnostic IDs.

The graph helper may live in `scripts/lib/public-css-graph.mjs`. A pure
`scripts/lib/component-style-manifest.mjs` may own deterministic serialization and be invoked by the one
Vite publisher; it is not a second lifecycle owner. Acceptance tests independently assert the adjudicated
literal import order and do not use that shared constant as their only oracle. Do not create another build
plugin or direct manifest writer.

### Tests read explicit fixtures, not ambient `dist`

Ordinary unit tests use explicit temporary graphs and parsed source fixtures. Source-graph proof is reported
separately from built, packed and installed graph proof. A generated-artifact test must
first invoke the exact build function/command into an isolated output and must fail if the output is absent.
No test may opportunistically read a developer's mutable root `dist`, skip when missing, or pass from source
alone while claiming package truth.

## Release transaction: prove the exact tarball

npm's official lifecycle order is load-bearing: `npm pack` runs `prepack`, `prepare`, `postpack`; `npm
publish` additionally runs `prepublishOnly`. `prepare` therefore cannot be left as an unexamined mutating
build after a supposed proof. `npm pack --ignore-scripts` explicitly suppresses package scripts, and npm
publish accepts a prebuilt tarball path.

Primary references:

- <https://docs.npmjs.com/cli/pack/#ignore-scripts>
- <https://docs.npmjs.com/cli/using-npm/scripts/#life-cycle-operation-order>
- <https://docs.npmjs.com/cli/publish/#synopsis>

The terminal candidate transaction is:

1. create pristine archive A at a candidate commit that already contains one unique, non-self-referential
   identity such as the next ledgered `8.0.0-w4.20260722.1`; record the monotonic candidate number, clean
   status, exact version commit, tree and package hash;
2. create pristine archives B and C from the same commit for watch and iterative tests—never reuse A's
   output for either mutation family;
3. run `npm ci --ignore-scripts --workspaces=false` in each archive, then invoke the required commands
   explicitly;
4. in A, run the exact one-shot build, type emission, all source/graph gates and test suite;
5. in B, run the supported watch edit/rebuild/restore matrix; in C, run iterative stale-output replacement;
6. in A only, run `npm pack --ignore-scripts --json --pack-destination <external-temp>` once, so no second
   lifecycle rebuild can alter or overwrite the proved tree;
7. freeze the tarball SHA-256 plus npm shasum/integrity/file manifest;
8. extract it and compare every governed built/public byte to the just-proved build;
9. install that tarball with scripts disabled into two fresh external consumer fixtures, prove the installed
   realpath is inside each fixture and not a workspace/source link, and freeze installed file hashes;
10. compile and serve one consumer importing `@mkbabb/glass-ui/styles` and a separate consumer importing
    `@mkbabb/glass-ui/styles.css` with host token prerequisites; and
11. if publishing is later authorized, publish that exact tarball path with scripts disabled and a
    non-`latest` candidate tag (for example `--tag w4`); verify registry `dist.integrity` and `shasum`,
    download that exact version, and compare its tarball SHA-256 to the frozen input. Do not publish the
    source directory and trigger a second `prepare`/pack.

The release wrapper owns this transaction. Do **not** place a recursive `npm pack` inside `prepack`, and do
not treat `prepublishOnly` proof as terminal while a later `prepare` can mutate bytes. The current
`prepare: npm run build` must either be removed for the immutable-tarball release path or fenced so it cannot
run after the frozen transaction. `verify:package` becomes a verifier of an explicit tarball/install path,
not the ambient root `dist`.

## Born-RED gate matrix

Every mutation is isolated in a fresh archive; pre/mutated/restored source, build and tarball identities are
retained.

| id | isolated mutation | expected detector |
| --- | --- | --- |
| G1 | restore generic `--track-bg` | rejected-vocabulary census |
| G2 | add `.value-mark::before` in a Vue/CSS/TS production path | generic-selector census |
| G3 | mutate the declared fixture's allowed Progress color writer to a gradient | finite Progress writer grammar |
| G4 | add an unauthorized/local Slider declaration that masks inherited background | writer census + inherited behavior |
| G4a | add `.progress-rail { --glass-progress-track-color: red }` | zero-production-writer census + inherited behavior |
| G5 | remove, reorder or duplicate either W4 partial in `./styles` | occurrence graph |
| G6 | remove, reorder or duplicate either W4 partial in `./styles.css` | occurrence graph |
| G7 | add the same partial through a second transitive path | multiplicity graph |
| G8 | create an import cycle | recursion-stack cycle detector |
| G9a | hide a writer in multiline CSS | CSS parser census |
| G9b | hide a writer in a Vue template binding | Vue parser census |
| G9c | hide a writer in a TS style object or `setProperty()` | TS parser census |
| G9d | hide a writer in a template literal | TS/template parser census |
| G9e | place a W4 sentinel in an unparsed extension/runtime root | raw-unclassified/root-coverage failure |
| G10 | place exact retired vocabulary beside retained `--progress-track-on-glass` | exact-boundary retired-vocabulary detector |
| G11 | omit `component-styles.css` from build/pack/install | explicit artifact/package gate |
| G12 | seed stale output separately in each isolated build archive while suppressing emission | fresh-build identity gate |
| G13 | change a byte after build but before pack | built-to-packed equality |
| G14 | install a workspace/source link instead of the tarball | installed-realpath gate |
| G15a | copy a stale W4 partial so source and built bytes differ | source-to-built equality |
| G15b | tamper one governed installed file after installation | packed-to-installed equality |
| G15c | tamper the frozen tarball before installation | frozen SHA-256/npm integrity |
| G16 | restore mutable `7.0.0` or reuse an existing candidate version | unique-version gate |
| G17 | remove `--ignore-scripts` and seed a `prepare` mutation sentinel | lifecycle/immutable-tarball gate |
| G18 | delete either consumer entry fixture | package-consumer completeness |

Stable diagnostic IDs are part of the test contract. A mutation suite that merely observes a non-zero exit
without proving the named detector bit is insufficient.

## Product/browser matrix after package GREEN

This section incorporates the complete binding W4 adjudication §§6–7; the abbreviated C2 draft is not a
substitute. Use the parent-v7 installed artifact and final-v8 tarball in otherwise identical isolated apps.
For each of the two W4-governed CSS entries, separately run current Chromium and actual Safari on macOS at
390×844 and 1440×900, light/dark, DPR 1/2 and normal/PRM. Run the terminal forced-colors arm in Windows
Chromium; Safari forced-colors is recorded N/A, never silently skipped or emulated.

The exact geometry lab uses a `257.5px` horizontal rail and `193.5px` vertical rail with marks at 25%,
33.3%, 50%, 75%, plus 0.5% and 99.5% near-edge clipping marks, at both DPRs.

### Required component postures

| receiver | required cells |
| --- | --- |
| Slider standard | single/range; horizontal LTR, RTL, inverted and RTL+inverted; vertical in LTR/RTL containers, normal/inverted; sm/md/lg; rest, hover, focus-visible, pointer onset, drag-mid, release-settle, disabled and invalid |
| Slider spectrum | Glass gradients plus all four value.js receiver families; horizontal/vertical and supported LTR/RTL/inverted cells; rest, hover, focus, drag-mid and settle; transparent underlay and checkerboard composition |
| Progress determinate | default/gradient/liquid; values 0, 25, 33.3, 40, 50, 75 and 100%; horizontal LTR/RTL and vertical LTR/RTL; default/error plus loading/progressing/complete status cells |
| Progress indeterminate | horizontal/vertical; LTR/RTL containers; default and declared-fixture valid track color; normal motion and PRM static frame |
| cascade sentinels | unrelated `.value-marks`/`.value-mark`; unrelated ancestor `--track-bg:hotpink`; approved direct/ancestor Slider background; approved direct/ancestor Progress color; nested Slider/Progress populations |
| package entries | exact installed `/styles` only and exact installed `/styles.css` only, separately |

There is no Progress inversion cell; adding one is scope growth. Invalid Slider state means the existing
public invalid posture, not an invented API.

### Geometry and paint predicates

For physical rail size `W × H`, fraction `p` and dot diameter `s`, retain rail/mark rects, `::before`
computed style and raster alpha bounds. Expected ordinary `horizontal-tb` centers are:

| posture | expected center |
| --- | --- |
| horizontal LTR / RTL+inverted Slider; horizontal LTR Progress | `(pW, H/2)` |
| horizontal RTL / LTR-inverted Slider; horizontal RTL Progress | `(W-pW, H/2)` |
| vertical normal Slider/Progress | `(W/2, H-pH)` |
| vertical inverted Slider | `(W/2, pH)` |

Direction/inversion shares the fill's value origin. Centers stay within `0.5` device pixel of the equation
and parent artifact. Dot bounds retain parent dimensions and clipping side. Outside a one-device-pixel
antialias fringe, no pixel differs; within it, only pixels with partially transparent parent/candidate alpha
may differ, with at most four differing fringe pixels per dot at DPR1 and eight at DPR2. Any tolerance
change is a separate Sol ruling, never a post-result harness edit.

At determinate 40%, 25%/33.3% marks remain under the fill and 50%/75% ahead. Near-edge masks match the
parent. Full crops preserve track height/radius/background, fill, focus/invalid ring, spectrum
thumb/range stack and surrounding layout. W4 authorizes no brightness, hue, size, radius or motion retune.

### Cascade, PRM and forced-colors predicates

- unrelated ancestor `--track-bg:hotpink` changes neither component;
- unrelated `.value-mark(s)` stays normal-flow with no pseudo-dot;
- Slider background works directly and by ancestor inheritance for colors, transparent underlays,
  gradients and comma-layered checkerboards;
- Progress color works directly and by ancestor inheritance in determinate/indeterminate states, with no
  component-local mask; its declared fixture gradient is rejected by the first-party classifier;
- each public entry supplies one W4 structure and equal geometry/paint once documented prerequisite tokens
  exist;
- under PRM, marks stay fixed through onset/mid/settle, Slider follows its existing no-smear/overshoot law,
  determinate Progress has no fill transition, and indeterminate Progress has one informative static frame;
- under forced colors, marks may be consistently suppressed, but track/fill distinction, current value,
  invalid state and Slider focus remain perceivable in system colors. Suppressing marks cannot hide fill,
  focus or the whole track.

### Browser born-RED battery

Each arm is independently mutated from the same pristine candidate and must fail its named detector:

| id | mutation | required failure |
| --- | --- | --- |
| V1 | omit either component-only manifest import | `/styles.css` geometry/mark paint |
| V2 | omit/duplicate/reorder canonical partial or move SFC rules before structure | `/styles` closure/order |
| V3 | restore `--track-bg` and wrap Slider in hotpink | generic-property collision |
| V4 | route both components through one property or use fixture Progress gradient | split/type + indeterminate background |
| V5 | restore component-local Progress assignment | ancestor inheritance |
| V6 | restore generic `.value-mark*` | unrelated DOM sentinel paint |
| V7 | resurrect retired read/class/unledgered live writer | 8.0 clean-break census |
| V8 | leave any value.js writer old, flatten alpha/checker ramp, lose transparent underlay or `trackInk` | installed value.js receiver |
| V9 | remove keyframes Glass dependency/lock or restore old PlaybackRibbon writer | clean install, `npm ls`, demo build and paint |
| V10 | resolve SCI/Atlas to old/different/duplicate-major bytes or wrong integrity | installed-artifact gate |
| V11 | move pseudo center, remove either `translate(-50%)`, or shift one CSS/device pixel | geometry/pixel per engine/DPR |
| V12 | replace logical inline placement with physical `left` or wrong RTL sign | Slider and Progress RTL independently |
| V13 | remove horizontal/vertical Slider inversion forwarding | mark-versus-fill origin |
| V14 | remove Progress orientation forwarding, reverse block edge or assert node count only | production vertical geometry |
| V15 | remove overflow, pill radius or Progress fill z-order | near-edge/fill-over-mark masks |
| V16 | round 33.3%, use only even rails, or omit DPR2/Safari | completeness + measured center |
| V17 | restore PRM sweep/transition or move marks through settle | PRM state |
| V18 | suppress full track/fill/focus or omit Windows forced-colors without N/A law | accessibility matrix |
| V19 | change a packed byte while retaining candidate identity/consumer lock | artifact digest |
| V20 | substitute synthetic divs/JSDOM, omit either CSS entry, or cite equations as pixels | false-proof evidence schema |

### Ordered consumer transaction

1. producer package GREEN;
2. migrate and lock Glass demo writers, value.js's four writers, and keyframes `PlaybackRibbon` plus its
   declared Glass dependency;
3. repin exact SCI and Atlas lockfiles/integrities;
4. exercise the six natural no-override Slider families: SCI `filter-fy`, `filter-cost`, `filter-peradm`,
   `filter-enroll`, `filter-pop`, plus Atlas `dim-dial-slider` rendered by `PercentileRangeSlider.vue`; and
5. invent no live Progress receiver—Glass's installed fixture owns Progress package proof.

Two fresh Sol x-high critics must read the same frozen tarball and installed identities before the cut can
close.

## Boundary

No consumer shim, copied track CSS, private selector, generic alias, third paint axis, mutable 7.0 artifact,
workspace link, source substitution, Playwright-WebKit-as-Safari claim, Opus-as-Luna credit, or premature
repin is authorized. This design does not itself make W4 GREEN.
