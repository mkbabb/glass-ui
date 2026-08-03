# MATERIAL W1 `d7588514` exact-byte critic — Candidate 2

Date: 2026-07-22 EDT

Seat: independent Sol x-high source/canon/gate critic

Target commit: `d75885144cf1c975b27467851d9511c88f855d2c`

Target tree: `ee20c0a065ccd15d54737c98ed7cd0c7b0856597`

Parent: `abf46592642fdf04f4210865a61914db8bb58b9f`

Binding input: `W1-31C-ADJUDICATION-C2.md`

Builder provenance: Opus, `claude-opus-4-8` (truthfully recorded; not Luna)

Verdict: **DEFECT / BANK USEFUL PRODUCER DIRECTIONS / SOURCE-CANON-GATE, MODEL-LAW, PACKAGE, CONSUMER, PAINT, AND FREEZE RED.**

This review reads the immutable commit archive, not the moving checkout. At the final observation the
shared checkout had advanced to HEAD `c0a8981486e37d60fad9fd74b441ad4b2d39e417` / tree
`a2c062f39f838bdbf6dacfb3bd727a5b8cc6dca3`; C-locale porcelain-v1 status hashed
`2f49672c97d972956d7230824591efb4bc0f2566bbccb417bdf811ff7271cab9`, the unstaged
full-index binary patch hashed `c86953104ccbba04bbfc33ccc4f142084e9192563e8afdbc2fdd28d3029a1803`,
and the cached patch was empty (`e3b0c442…`). Those moving product bytes are excluded. The later
`c0a89814` receipt is considered only as a provenance/mutation claim about the exact commit; it does
not change `d7588514`.

## Ranked disposition

| Rank | Surface | Ruling |
| --- | --- | --- |
| C0-1 | ordinary gate / mutation truth | **DEFECT.** Both new ordinary gates false-green mechanisms their comments and receipt claim to forbid. Two isolated mutation bundles leave all 23 W1 tests GREEN. The recorded “16 mutations bite / zero vacuous” result proves only those exact textual edits, not the semantic contract. |
| C0-2 | live first-party clean break | **DEFECT.** `demo/stories/foundations/radii.vue` still renders `rounded-input`; the exact demo build retains that class in JS but emits zero `.rounded-input` and zero `--radius-input` CSS rules. Its “input” specimen therefore loses its radius. The same story still tells users `xs = 2px` while source and `DESIGN.md` say 4px. |
| C1-1 | token-hygiene invariant | **DEFECT.** The line-regex scanner misses multiline declarations, later same-line overrides, whole-directory theme/token violations, raw fallbacks behind any `var()`, and JS/TS writers. Exact source already contains a hardcoded `34px` backdrop blur formula that passes only because some unrelated `var()` text is present. |
| C1-2 | role-canon/source parser | **DEFECT.** The gate reads the first token declaration and first selector rule, deduplicates declaration names, and checks only token presence in `DESIGN.md`. Later effective overrides, duplicate wrong-role selectors, wrong table values/roles, restored Skeleton ownership, and F12 clipping all pass. It is not an executable source↔human-table equality check. |
| C1-3 | canon/prose truth | **DEFECT.** `radius.css` still names Command as a live `--radius-media` consumer twice after deleting its radius, and `SearchBar.vue` still documents `floating` as chromeless after changing it to component-owned chrome. The gate strips/ignores both contradictions. |
| C2-1 | bounded source directions | **BANK, non-accepting.** Command no-inner-radius, layered Skeleton default, contextual SegmentedTabs seam, floating/inline plate with bare-only chromeless, `--radius-control` input-bar, and the corrected F12 boundary-sharing law match the Sol ruling at source. |
| C2-2 | Skeleton cascade mechanics | **BANK STRUCTURAL PROOF ONLY.** The exact demo compiler preserves the scoped selector inside `@layer components`, and generated `rounded-full`/`rounded-card` live in `@layer utilities`. This supports the mechanism but is not the required computed Chrome/Safari receiver proof. |
| C2-3 | atomicity/provenance | **COHESIVE BOUNDED CUT; NO COMPLETION CREDIT.** The ten-file commit is one related producer source/test/truth cut and honestly declares Opus. It is not full-W1 atomic closure: its own live demo is broken and all immutable-8.0/value.js/browser tails remain routed. Opus cannot be relabeled Luna or satisfy the prospective model law. |

## 1. The clean-break source census is false-green on a live Glass receiver

The exact gate says dead names are absent from “source/manifest/live docs,” but it searches only:

- `radius.css`, the token manifest, and five named source files; and
- `DESIGN.md`, with historical names permitted after the first `8.0 CSS-token ledger` marker.

It never scans the first-party demo. Exact `demo/stories/foundations/radii.vue:22-30` still contains:

```ts
{ cls: "rounded-input", label: "input", role: "form fields" }
```

That is not archaeology. It is the live `/foundations/radii` semantic-alias story and therefore a
direct Glass consumer of the removed public utility. The exact archive's `npm run demo:dist:build`
passes, but its output is conclusive:

```text
dist-demo/assets/radii-Bw24eOoo.js: rounded-input occurrences = 1
all dist-demo CSS: .rounded-input occurrences = 0
all dist-demo CSS: --radius-input occurrences = 0
```

The build succeeds because unknown classes are valid HTML, not because the specimen has a radius.
This is a user-visible clean-break failure in the producer repository, separate from the honestly
routed value.js migration. The same story's `scale` table says `rounded-xs` is `2px`; exact
`radius.css` and the new `DESIGN.md` table both define it as 4px. Thus the commit's “complete canon”
posture is contradicted on its own canonical story route even before packaging or browsers enter.

Required bounded repair: migrate the story onto the ruled live vocabulary—at minimum remove
`rounded-input`, represent `media`, `field`, and `control` according to their actual roles instead of
blindly renaming input→media, and true the `xs` value. The ordinary source gate must include active
first-party demo/doc consumers while continuing to exclude explicitly historical archives and the
versioned migration ledger.

## 2. `token-hygiene` does not enforce its stated invariant

`tests/gates/token-hygiene.test.ts:1-23` promises that every source radius and backdrop blur resolves
through the ladder and that **any** new off-ladder literal turns the gate RED. Its mechanics do not
support that claim:

1. It splits text into lines before matching declarations. A property and value on separate lines are
   invisible.
2. It executes one radius/backdrop regex per line. A valid first declaration followed by a raw
   overriding declaration on the same line is certified by the first match.
3. `isOffLadder()` treats any value containing the substring `var(` as on-ladder. It does not resolve
   the referenced custom property, verify that it is a radius/blur rung, or reject a raw fallback.
4. `LADDER_SOURCES` exempts all of `src/styles/theme/**` and `src/styles/tokens/**`, rather than only
   custom-property declarations that mint the applicable rungs. A component-like rule placed in
   either directory is invisible.
5. `sourceFiles()` includes only `.css` and `.vue`; JS/TS inline style writers and arbitrary class
   writers are outside the scan.

An isolated archive mutation added all of the following without modifying a gate:

```css
.a {
    border-radius:
        13px;
}
.b {
    backdrop-filter:
        blur(9px);
}
.c { border-radius: var(--not-a-radius, 12px); }
.d { border-radius: var(--radius-card); border-radius: 17px; }
```

It also added raw `23px`/`blur(21px)` declarations under `src/styles/theme/` and a Vue script writer
with `{ borderRadius: "19px", backdropFilter: "blur(7px)" }`. Both W1 files still passed **23/23**.

The blindness is not merely synthetic. Exact source already contains examples the current broad
invariant cannot adjudicate:

- `src/components/dialog/placement.css:114`:
  `blur(calc(34px * var(--glass-level)))`—a raw 34px backdrop rung accepted because the value contains
  `var(`;
- `src/components/slider/Slider.vue:528`:
  `calc(var(--slider-thumb-size, 1rem) * 0.4)`—a proportional component-geometry radius with a raw
  fallback, not a radius-ladder read; and
- `src/styles/animations.css:269`:
  `blur(var(--top-layer-backdrop-blur, 7px))`—a dedicated token plus raw fallback outside the named
  `--glass-blur-*` ladder described by the gate header.

Some of those may be legitimate, explicit geometry/graded-halo/top-layer exceptions. The gate cannot
tell. It must either narrow its invariant truthfully or parse declarations and resolve a named
allowlisted token graph. “Contains some var” is not ladder resolution.

## 3. The role-canon gate observes first matches, not effective CSS or table equality

`tests/styles/radius-role-canon.test.ts` has three structural blind spots:

- `decl()` returns the first declaration for a token; `declaredRungs()` collapses duplicate names into
  a `Set`. A later effective override is invisible.
- `rule()` returns the first selector body. A later same-specificity/source-order override is
  invisible.
- Canon truth calls `hasToken()` over all pre-ledger `DESIGN.md` text. It never parses table section,
  classification, value, terminal resolution, role prose, uniqueness, or correspondence with the CSS
  declaration value.

One isolated mutation bundle changed the effective contract while the full ordinary W1 pair remained
**23/23 GREEN**:

- appended a later `@theme { --radius-media: var(--radius-pill); }`;
- changed the `DESIGN.md` media row to `var(--radius-pill) / stadium / Command input`;
- restored a second unlayered scoped Skeleton radius after the layered block;
- restored Command's media radius in a later `.command__input` rule;
- overrode `.input-bar` and both SegmentedTabs button families to `--radius-media` later in the
  cascade; and
- appended a later TagsInput rule with `gap:0`, `padding:0`, `overflow:hidden`, and
  `--radius-pill`.

These are not exotic evasions. Later overrides are CSS's ordinary conflict mechanism, and the
Skeleton, Command, Search, SegmentedTabs, and F12 mutations restore the exact defect families the
adjudication requires the detector to bite. The later `c0a89814` receipt truthfully says 16 selected
mutations turned RED, but “zero vacuous” is too broad: semantically equivalent later-override
mutations remain GREEN, and no replayable mutation artifact is committed. The receipt must be
amended rather than used as terminal mutation proof.

Required repair: parse all declarations/rules, fail duplicate owners unless the contract explicitly
allows a scoped override, evaluate effective/source-order ownership for named seams, and parse a
machine-readable canon table or generate the human table from the executable inventory. Every
classified token needs its expected source value/terminal, not merely a name. Each reverse mutation
must run independently, including duplicate-later variants.

## 4. Canon prose still contradicts the landed source

The exact source has three current contradictions:

1. `src/styles/theme/radius.css:28-29` still calls Command a `--radius-media` surface.
2. The alias prose at `radius.css:72-76` again says the former rung's consumers are
   Skeleton/Avatar/**Command input**, despite this commit deleting Command's radius as paint-dead.
3. `src/components/search/SearchBar.vue:53-55` says `bare`/**floating** are chromeless, while
   `searchVariants.ts` now correctly makes `floating` identical to the component-owned inline plate
   and `bare` the sole chromeless variant.

`BAND-MATERIAL.md` also retains earlier “three media consumers: Skeleton, Avatar, Command” prose and
only corrects it in a later close section. Historical chronology may remain, but it must be explicitly
marked superseded; it cannot coexist with “single source” rhetoric as current instruction. The canon
gate cannot find these defects because it strips `radius.css` comments, ignores SearchBar and the band
truth, and checks only token-name presence in `DESIGN.md`.

`DESIGN.md`'s new primary tables are directionally sound: they retain the public Atlas
`--radius-button` exception, distinguish media/control/field, and enumerate the radius/context/shape
families. The defect is the claim that the checked table agrees with all current source truth when the
check does not parse values/roles and current prose still disagrees.

## 5. Source mechanisms worth preserving

The exact changed source follows the written Sol ruling at the principal seams:

- `.command__input` has no painted inner radius; the panel remains `--radius-panel`.
- both SegmentedTabs button rules consume `--bouncy-slider-radius`; the base maps horizontal to
  `--radius-tab` and the vertical host rebinds it to `--radius-strip`.
- `floating: ""` and `inline: ""` retain the `.input-bar` plate; `bare` alone strips it;
  `.input-bar` reads `--radius-control`.
- the F12 prose adopts the boundary-sharing law rather than forbidding every pill inside a near-rect.
- Skeleton's default moves into `@layer components` without changing the caller class seam.

The isolated production demo build supplies useful structural—not visual—Skeleton evidence:

```css
@layer components {
  .skeleton[data-v-ef602d7d] { border-radius: var(--radius-media) }
}
@layer utilities {
  .rounded-full { border-radius: 3.40282e38px }
  .rounded-card { border-radius: var(--radius-card) }
}
```

Thus Vue scoping preserves the layer and the public utilities occupy the higher declared layer. Bank
that mechanism. The adjudicated built receiver still owes computed default/avatar/card radii in the
real tree and both supported engines; source order and generated selectors are not paint acceptance.

## 6. Atomicity, public ledger, and model truth

As a bounded producer redress, the commit is cohesive: its source, truth, and local guards all concern
W1, `git diff --check` passes, and the body explicitly routes rather than conceals immutable-package,
value.js, and browser work. Preserve that discipline.

It is not atomic **full-W1 closure**. The public clean break spans earlier `31c01d2a`, this redress, a
still-broken first-party demo receiver, the unique immutable `8.0.0` artifact, the role-aware value.js
migration/lock, and retained Chromium/Safari proof. The `DESIGN.md` delta is a W1 ledger slice, not the
comprehensive ship ledger or installed artifact.

Provenance is honest and non-accepting. Both commit and later receipt say
`claude-opus-4-8`; the receipt explicitly says “not Luna” and “model-law RED.” Keep those labels. The
fact that Sol had already written the design rulings limits the harm of the unauthorized fallback, but
it does not convert Opus implementation/test judgment into Luna or Sol credit. Any byte-changing gate,
demo, or canon redress needs the declared prospective model and resets exact-byte criticism.

## Required bounded redress before another exact-byte pass

1. Fix the Glass radii story's removed class and false `xs` value; represent the actual media/field/control
   roles rather than mapping input→media.
2. Replace token-hygiene's line regex/`contains var` test with a declaration parser plus an explicit
   resolution/exception contract. Scan CSS, Vue style blocks, arbitrary class values, and JS/TS style
   writers; exempt rung declarations, not entire directories.
3. Add independent RED cases for multiline values, multiple declarations on one line, theme/token
   directory rules, non-radius vars, raw fallbacks, and JS/TS writers.
4. Make the W1 role gate reject duplicate token owners and later wrong-role selector overrides. Parse
   table class/value/role—or generate the table—so CSS and human canon equality is real.
5. Replay each named reverse mutation alone in both original-site and later-override form. Retain a
   machine-readable command/result artifact; amend the `c0a89814` “zero vacuous” receipt.
6. True the two Command references in `radius.css`, the SearchBar variant contract, and superseded
   band prose.
7. Preserve the source directions banked in §5 and do not mint an alias, new radius rung, consumer shim,
   or private selector.
8. Keep the already-routed immutable `8.0.0`, value.js three-reader migration, and real
   Chromium/Safari matrix open. This critic grants none of that terminal credit.

## Reproduction ledger

All tests, mutations, and builds ran in an isolated archive of tree `ee20c0a0…` with the workspace
dependency runtime linked read-only. Temporary mutations were restored byte-for-byte before the
results were compared. No live product/source/test/evidence/workflow/consumer byte was edited.

| Probe | Exact result |
| --- | --- |
| baseline `radius-role-canon` + `token-hygiene` | 2 files, **23/23 PASS** |
| related W1 unit/source set (`radius-dialog`, Search contracts, SegmentedTabs, Skeleton, sortable plus both gates) | 7 files, **63/63 PASS** |
| multiline/theme/non-radius-var/raw-fallback/TS-writer hygiene mutation bundle | both ordinary gates still **23/23 PASS** — detector false-green |
| duplicate-later token/Command/Skeleton/Search/Tabs/F12 + false DESIGN row mutation bundle | both ordinary gates still **23/23 PASS** — detector false-green |
| exact `npm run demo:dist:build` | PASS, 3,514 modules; `rounded-input` remains in story JS but has zero CSS owner |
| exact compiled Skeleton CSS | scoped selector retained inside `@layer components`; public shape utilities emitted in `@layer utilities` |
| exact commit whitespace | `git diff --check d7588514^ d7588514` PASS |

Selected exact-byte SHA-256 witnesses:

```text
4ca8c7ec33f76cf0b2c9c6278bf4c24ea583a1bdbd6f788d1820669aa90d660f  tests/gates/token-hygiene.test.ts
451c527b5a4f5c7cf8cf85b13070d23e38e5ede0eb3f4293ac25d1652d116c0e  tests/styles/radius-role-canon.test.ts
197a283f908c0b2ab3036a0c86c52b4f7f35601b7d782f5da5b6e0f0485789e5  src/styles/theme/radius.css
51597974d48dec914f865a2a3188a1623db321436e37f870c1a3343c7756ac64  DESIGN.md
f0579731d68ad58a8552e692a0fa7433a984f67db6361585e0db6125624da60e  demo/stories/foundations/radii.vue
f96bc1744cce9ed3841837b5bae4e4c1c2e8c608de98d1bd9b55b1d507d785b6  src/components/skeleton/Skeleton.vue
93e2e15916a9d5ff7b77c03aff2a7719dd8cbfbc03897d15dc62c2d9794f4f7a  src/components/tabs/styles/segmented.css
8f08e86bdfea6834618459848dc2a13932cf3900d634f4af600cdafbee947880  exact demo index CSS
ae4aee56353ca3aebe90eece5f317927a96782bcb84fd6623e4a895fe014094b  exact radii story JS
37367845f53ab6f1bcafb1d4e625073647245316268db6faa6c1672447802aac  exact compiled Skeleton CSS
```

Terminal ruling: preserve `d7588514` as an honestly attributed, cohesive Opus-authored producer
candidate whose principal source directions match the Sol adjudication. Do **not** call W1 landed,
DONE, accepted, package-safe, model-law-compliant, or Candidate-2 freeze input. The local gate and
first-party canon/demo defects must be redressed before the already-open package/consumer/paint tails
can even become terminally relevant.
