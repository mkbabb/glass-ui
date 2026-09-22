# AC1—§4.1, §4.2 + L-2, §4.3 SegmentedTabs (2026-09-22)

Lane AC1 of the O-23/O-32 cure wave, Opus (`claude-opus-5-5[1m]`). Rulings: `../RULINGS.md` §A
(api-cascade), §B-1/B-2/B-3, §C row AC1. Evidence: `../seats/investigate__api-cascade.json` +
`../seats/verify__api-cascade.json` (the verifier's figures govern: §4.1 overturned to the theme-scope
BREAKING shape; §4.2 amended with the fall-through families; §4.3 confirmed on fourier's own
EquationView callsite).

**Datum:** master `e5ac97f2` (the brief's datum; HEAD moved to `9454b4a9` under the lane with the
driver's CT/AUTHOR/AC2 commits, none touching an AC1 path). Uncommitted per the git law; the driver
commits by pathspec.

## Path corrections

- **§4.1—`bridges.css` has no plain `@theme` block.** It holds exactly one block, `@theme inline`
  (`bridges.css:15`). The verifier's "leading plain @theme block (the one :276-279 names)" is
  `theme/radius.css:95` (`@theme static`, radius-only). The plain `@theme` that owns
  directly-authored literals—"the override surface here is the namespaced var itself … so these mint
  their global variable"—is `src/styles/theme/literals.css:12`. `--font-serif-math: serif` is exactly
  that shape (a literal, no tokens.css twin, plain so the utility reads the variable), so it lands
  there; `bridges.css` carries a dated pointer in its font-family docblock. The fence for this row is
  `literals.css` in place of `bridges.css`'s absent plain block.
- **§4.2—cn's file is as ruled:** `src/components/_shared/class-names.ts` (cn at `:32` at HEAD).
- **§4.3—two forced one-line touches outside the fence row**, each a direct consequence of the ruled
  type move, no widening of the cure:
  - `src/components/tabs/composables/useTabDragMorph.ts:13` imported `SegmentedTabOption` from
    `../SegmentedTabs.vue`; a generic `<script setup>` cannot export types (TS1184), so the import
    moves to `../types`. The investigator's cure shape names this file too.
  - `tests/components/custom/tabs/segmented-tabs.test.ts:229`: `findComponent(SegmentedTabs).vm` stopped
    typechecking (`TS2339: Property 'vm' does not exist on type 'DOMWrapper<Node>'`) because a generic
    SFC's default export is a function type, so @vue/test-utils resolves the `FunctionalComponent`
    overload (`baseWrapper.d.ts:26`). The selector becomes `{ name: "SegmentedTabs" }` (the house
    form, `select.contract.test.ts:33`); runtime unchanged, 13/13 pass.

## §4.1—BREAKING: `cm-serif` deleted, `--font-serif-math` declared in theme scope

What changed:
- `src/styles/theme/literals.css:106-118` (new, end of the plain `@theme`): the math-serif section +
  `--font-serif-math: serif;`; header `:8-9` dated bracket names the register.
- `src/styles/typography/utilities.css:72-79` before (`/* .cm-serif—… */ @utility cm-serif {
  font-family: var(--font-serif-math, serif); }`) → `:74-77` a dated comment only; no utility, no alias.
  Header `:5` `(.cm-serif/.fira-code)` → `(.fira-code)`, dated bracket `:10-11`.
- `src/styles/typography.css:13` `(.cm-serif, .fira-code, .fourier-f)` → `(.fira-code, .fourier-f)` +
  dated bracket `:14-16`.
- `src/styles/theme/bridges.css:81-84` dated bracket in the font-family docblock (where the register
  lives and why it is not an inline bridge).
- `demo/stories/foundations/typography.vue:147` `cm-serif` → `font-serif-math`.
- Never the unlayered token root (the verifier's Chromium probe: an unlayered `:root` declaration flips
  fourier's 31 sites across 18 files from Computer Modern to the UA serif).

Witness—`tests/styles/font-serif-math-dist.test.ts` (new; a test row, skips with no `dist/`, as
`emitted-utility-vars.test.ts` does). It compiles the dist's `styles/theme.css` +
`styles/typography/utilities.css` through the `tailwindcss` compiler a consumer build runs, and scans
every shipped `.css`.

RED against the un-cured tree (real `dist/`):

```
     × mints `font-serif-math` reading the theme variable, with `serif` the declared default 16ms
     × ships no `cm-serif` utility and no `cm-serif` byte 6ms
     × declares the register only inside a plain `@theme`, never in a token root 5ms
AssertionError: expected '/*! tailwindcss v4.3.3 | MIT License …' to match /\.font-serif-math\s*\{\s*font-family:…/
AssertionError: expected '/*! tailwindcss v4.3.3 | MIT License …' not to contain '.cm-serif'
      Tests  3 failed (3)
```

GREEN—**not reachable in the shared `dist/` by this lane, by design.** `npm run build` (under the
lock) refuses to publish the generation:

```
.published-roster: 1 published name(s) left the emitted roster with no MIGRATION.md row: utility cm-serif
.published-roster: 1 name(s) in the emitted roster are not in the datum — rebind deliberately: theme --font-serif-math
```

That is the G-NO-ORPHAN-EXPORT roster ratchet (`scripts/verify-export-types.mjs:488-523`) doing its
job: the roster rebind is the driver's (B-3) and the removal row is R2's. The shared `dist/` therefore
still carries `cm-serif`, and this witness stays RED in the working tree until both land and a build
publishes; that RED is expected, not a defect to fix here. GREEN was run on a scratch copy of the tree
(`src/`, `scripts/`, configs, the lockfile; `node_modules` symlinked) whose `.published-roster` had the
two-line delta applied and whose MIGRATION.md had a placeholder removal row—the copy only, the real
files untouched:

```
exit=0   (npx vite build in the scratch copy—every other publish check passed)
font-serif-math: serif   (dist/styles/theme/literals.css)
 RUN  v4.1.10 …/scratchpad/ac1/copy
      Tests  3 passed (3)
```

Paint probe (Playwright Chromium over the compiled scratch dist, `@import "tailwindcss/theme.css"
layer(theme)` first, as a consumer build does):

| consumer | computed `font-family` of `.font-serif-math` |
| --- | --- |
| none | `serif` (paint-identical to today's fallback) |
| `@theme { --font-serif-math: "CMX", Georgia, serif }` (fourier's `style.css:94` shape) | `CMX, Georgia, serif` |
| `@layer glass-overrides { :root { --font-serif-math: "CMX", Georgia, serif } }` | `CMX, Georgia, serif` |

The emitted declaration sits inside `@layer theme { :root, :host { … } }`; a consumer `@theme`
re-declaration replaces the value in that one root (compile probe: both emitted roots read
`"CMX",Georgia,serif`); `.font-serif-math { font-family: var(--font-serif-math); }`, no fallback.

**Roster delta (recorded, not applied):** `− utility cm-serif`, `+ theme --font-serif-math`. The
emitted roster has no separate utility row for a theme-minted utility—the `theme --font-serif-math`
line IS the `font-serif-math` row (as `theme --font-serif` stands for `font-serif`), so "+ the utility
row" in RULINGS §4.1 resolves to that one line. Measured from the build's own refusal above.

## §4.2 + L-2—cn buckets the published vocabulary by its true property

What changed, `src/components/_shared/class-names.ts` [2026-09-22 · adjudication r2: the line references in this list predate cure 6's shadow-size move; at the cured tree the docblock is `:28-39`, the alternation `:135`, the text-shadow pair `:151-152`, the `text-` hint rule `:120`, the `bg-` hint rules `:194-196`, `shadowSize()` `:96-100` (docblock `:88-95`), the shadow pair `:272-273`, `splitToken` `:282-297`]:
- `:84` font-size alternation → `:129` gains `display-1|dropdown|dropdown-secondary|
  proportional-headline|proportional-kicker` (the 12 names' five size members; seats: investigator
  `cnroster.mjs`, verifier `vac/cnv.mjs`, both 12 at 8.0.0/9.0.0/HEAD).
- New before `text-color` (`:145-146`): `["text-shadow", <size>]` then `["text-shadow-color",
  /^text-shadow-/]`—the seven `text-shadow-*` names' true bucket. Split in two for the same reason as
  `shadow` (Tailwind emits `text-shadow-primary` as `--tw-text-shadow-color`, a second property,
  compile-probed); a single text-shadow bucket would have minted the eviction the ruling cures in
  `shadow`. Bare `text-shadow` stays a text colour (it is `--color-shadow`'s `color:` utility,
  compile-probed: `.text-shadow { color: var(--shadow) }`).
- `:205` `["shadow", /^shadow(?:-|$)/]` → `:261-262` `["shadow", <size>]` + `["shadow-color",
  /^shadow-/]`. The size rungs, measured read-only from `.published-roster`: `theme --shadow-{focus-ring,
  glass-floating, glass-overlay, glass-quiet, glass-resting, glass-wash}` (`:163-168`) + `utility
  shadow-{cartoon, cartoon-hover, elevated, modal, soft}` (`:255-259`), plus Tailwind's ladder
  (`2xs … 2xl`, `none`, `inner`, bare `shadow`), each with an optional `/alpha`.
- `shadowSize()` (`:98-108`): arbitrary values follow Tailwind's own inference (compile-probed at
  4.3.3): `shadow-(--x)` / `shadow-[0_0_1px_red]` → size (`--tw-shadow`); `shadow-(color:--x)` /
  `shadow-[#fff]` → colour (`--tw-shadow-color`). [2026-09-22 · adjudication r1: overstated—only a `color:` hint, a `#` literal or a colour function is recognised as a colour; `shadow-[red]` / `shadow-[currentColor]` / `text-shadow-[red]` are colours in Tailwind (compile-probed) but bucket as sizes here, unchanged from HEAD's one-bucket eviction.]
- `splitToken` (`:271-281`): the variant scope splits on the last colon OUTSIDE brackets/parens. At
  HEAD `shadow-(color:--x)` split into scope `shadow-(color:` + core `--x)`, so no arbitrary value with a
  `color:` hint could ever bucket; the shadow split's colour arm needs it. [2026-09-22 · adjudication r1: the depth-0 split alone sent every type-hinted arbitrary value into its family's colour catch-all (Badge sm/md/lg lost `text-primary-foreground`; `badge.contract` RED). Cured by hint-family rules ahead of the catch-alls: `text-[length|percentage|absolute-size|relative-size:…]` → font-size; `bg-[image:…]`/`bg-[url(…)]` → bg-image, `bg-[length|size|bg-size:…]` → bg-size, `bg-[position|percentage:…]` → bg-position; a `color:` hint stays a colour. Tailwind 4.3.3 compile-probed. Witness: the `a type-hinted arbitrary value keeps its hint's family` row, RED→GREEN recorded in the Cure section below.]
- Docblock `:28-40`: (b) stated—an unrecognised token passes through and stylesheet emission order
  decides; the fall-through families named (`font-text` / `font-display` / `font-serif-math`,
  `tracking-*`, `leading-*`, semantic `border-*` / `ring-*` colours). Those are NOT extended (ruling
  (b)).

Witness—`tests/components/_shared/classNames.test.ts` (a new `describe` beside the B-3 unit; a test
row, gates stay 60). Fixture: `.published-roster` read-only—37 `text-*` names, 11 shadow rungs, 7
text-shadow rungs, 93 colours.

RED against the un-cured `class-names.ts`:

```
     × no published text-* size or text-shadow recipe evicts a text colour 6ms
     × the producer's own size rungs still dedupe against each other 1ms
     × a shadow colour never evicts a published shadow size rung 2ms
     × a text-shadow colour never evicts a published text-shadow size rung 0ms
     × sizes dedupe with sizes and colours with colours 1ms
AssertionError: expected [ 'text-display-1', …(11) ] to deeply equal []
+   "text-display-1", "text-dropdown", "text-dropdown-secondary", "text-shadow-2xs",
+   "text-shadow-depth", "text-shadow-engraved", "text-shadow-lg", "text-shadow-md",
+   "text-shadow-sm", "text-shadow-xs", "text-proportional-headline", "text-proportional-kicker"
AssertionError: expected 'text-small text-dropdown' to be 'text-dropdown' // Object.is equality
AssertionError: expected [ 'shadow-focus-ring', …(10) ] to deeply equal []
AssertionError: expected [ 'text-shadow-2xs', …(6) ] to deeply equal []
AssertionError: expected 'shadow-[#fff]' to be 'shadow-lg shadow-[#fff]' // Object.is equality
      Tests  5 failed | 4 passed (9)
```

The 12 evicting names are exactly the seats' 12. GREEN:

```
      Tests  9 passed (9)
```

`tests/utils/cn.test.ts` + the classNames file after formatting: `Tests  39 passed (39)`.

Size: the class-names chunk grows by about +781 B raw / +338 B gzip (esbuild-minified estimate of the
module at HEAD vs cured, 3742/1474 → 4523/1812); the cured shipped chunk measures 5166 B raw / 1978 B
gzip (`dist/class-names-DVV2pIO4.js`). The driver's ratchet rebind measures the tree.

## §4.3—SegmentedTabs is generic over its option values

What changed:
- `src/components/tabs/types.ts` (new, 98 lines): the seven types moved verbatim from
  `SegmentedTabs.vue:44-131`, with `SegmentedTabOption<V extends string = string>` (`value: V`),
  `SegmentedTabsResponsive<V>` (`desktopOptions?: SegmentedTabOption<V>[] | null`),
  `SegmentedTabsProps<V>` (`options: SegmentedTabOption<V>[]`, `responsive?: boolean |
  SegmentedTabsResponsive<V>`).
- `SegmentedTabs.vue:1` `<script setup lang="ts">` → `generic="T extends string = string"`;
  `:43` `defineProps<SegmentedTabsProps<T>>()`; `:145` `defineModel<string>` → `:56` `defineModel<T>`;
  `pillHoverClass(option: SegmentedTabOption<T>)`, `stripModel` `computed<T | undefined>`,
  `useSelectionGroup<SegmentedTabOption<T>>`, `isActive = (value: T)`; `:292-294` `onMobileUpdate`
  `typeof value === "string"` → `:204-207` resolves through `props.options.find(…)` (no cast). The
  now-unused `HTMLAttributes`, `Motion`, `TabActivation` imports leave the SFC for `types.ts`.
- `src/components/tabs/index.ts`: the seven type re-exports read `from "./types"` (the `./tabs` public
  names unchanged).
- `composables/useTabResponsive.ts`: `UseTabResponsiveParams<V>`, `UseTabResponsiveReturn<V>`,
  `useTabResponsive<V extends string = string>` thread `V`.
- `composables/useTabDragMorph.ts:13`: import path only (see Path corrections).

Witness—`tests/components/custom/tabs/segmented-tabs-generic.fixture.vue` (new; type-only, vitest
never mounts it, `npm run typecheck`'s `tsconfig.test.json` leg checks it). Arm 1 is fourier's
`EquationView.vue:348-351` with its `$event as 'controls' | 'canvas'` removed; arm 2 keys an option
(`'other'`) outside the model's union under `@vue-expect-error`; arm 3 is a plain-string callsite.

RED (`npx vue-tsc --noEmit -p tsconfig.test.json`, un-cured tabs, final fixture):

```
tests/components/custom/tabs/segmented-tabs-generic.fixture.vue(23,30): error TS2322: Type 'string' is not assignable to type '"canvas" | "controls"'.
exit=2
```

Arm 2 is a regression guard, not born-RED: at HEAD it errors too (the same `string` model), so the
directive is consumed either way; post-cure it errors because `T` infers `'controls' | 'other'` and the
handler assigns into `'controls' | 'canvas'` [2026-09-22 · adjudication r1: arm 2 cannot tell inferred from widened, since a `string` model errors there too; it is a rejection guard only. Arm 1 is the inference witness.]

GREEN: `npm run typecheck` (both legs, `tsconfig.json` incl. the demo's SegmentedTabs users +
`tsconfig.test.json`) → `exit=0`, 0 errors. Built declaration (scratch copy):
`dist/components/tabs/SegmentedTabs.vue.d.ts:2` `<T extends string = string>(…)`, `:4` `modelValue: T;`,
`:6` `"onUpdate:modelValue"?: ((value: T) => any)`; `dist/components/tabs/index.d.ts:2` re-exports
the seven types from `./types.js`.

## Runs

- Related files: `configurator-recursion`, `public-surface`, `gates/overfit-structure`,
  `gates/tabs-seam`, `useSelectionIndicator`, `layout-canon`, `utils/cn`, `radius-role-canon`,
  `contrast-computed`, `pager-dots/contract`, `_shared/classNames`, `custom/tabs/segmented-tabs`,
  `DockLayerSwitcher.a11y` → `Test Files 13 passed`, `Tests 380 passed | 4 expected fail`, plus
  `font-serif-math-dist` 3 failed—the expected pre-rebind RED above.
- `npm run typecheck` → exit 0.
- Gates: nothing added under `tests/gates`; no roster, receipt, or ratchet file touched. Gates stay 60.

## FOR THE DRIVER

Roster (`.published-roster`, B-3), on the committed tree:
- remove `utility cm-serif`; add `theme --font-serif-math` (sorted position between
  `theme --font-serif` and `theme --font-text`). No other line moves; `build` refuses to publish until
  both land, and `font-serif-math-dist.test.ts` goes GREEN on the first published build after them.

Ratchet (`.bundle-ratchet`): rebind on the committed tree; this lane's JS growth is the class-names
chunk (≈ +338 B gzip estimate above) and the SegmentedTabs types move (type-only, no runtime bytes).

MIGRATION §10.0.0 rows for R2 (the removal row is load-bearing: the roster ratchet excuses
`utility cm-serif` only through a removal-table row whose first cell is `` `cm-serif` ``):
- Removal table: `` | `cm-serif` | `font-serif-math`—the utility read `var(--font-serif-math, serif)`,
  a name nothing declared; `--font-serif-math` is now declared in the package `@theme` (default
  `serif`) and Tailwind mints `font-serif-math` from it. | ``
- Under the §10.0.0 token-root contract (B-1): "Font registers are consumer-settable in the theme layer: re-declare `--font-serif-math` in your own `@theme`, or set it on an element in any layer (the utility reads the variable). `--font-text` / `--font-display` are `@theme inline` bridges (`.font-text` compiles to `var(--font-stack-text)` unless your own `@theme` re-declares `--font-text`), so rebrand them in your own `@theme`, or set `--font-stack-text` / `--font-stack-display` on an unlayered `:root` or on an element.
  A `:root` override of any other glass-ui token must be unlayered, or set on an element below `:root`
  in any layer."
- "`cn()` now buckets every published `text-*` and `shadow-*` name by the property it writes: the
  font-size names `text-display-1`, `text-dropdown`, `text-dropdown-secondary`,
  `text-proportional-headline`, `text-proportional-kicker` no longer evict a text colour; the
  `text-shadow-*` sizes are their own bucket; a shadow or text-shadow COLOUR (`shadow-primary`,
  `text-shadow-primary`, `shadow-(color:--x)`) no longer evicts a shadow SIZE. Output changes only
  where a class was wrongly dropped, or where two colour-hinted arbitrary values (`text-[color:…]`, `shadow-(color:--x)`) were both kept. Families that still fall through to stylesheet order:
  `font-text` / `font-display` / `font-serif-math`, `tracking-*`, `leading-*`, the semantic
  `border-*` / `ring-*` colours."
- "`SegmentedTabs` is generic: `generic=\"T extends string = string\"`, `T` inferred from `options` and
  `v-model`; `SegmentedTabOption`, `SegmentedTabsResponsive`, `SegmentedTabsProps` take a defaulted
  `<V extends string = string>`; names under `./tabs` unchanged. A literal-union model no longer needs
  `$event as …`. Test code: `wrapper.findComponent(SegmentedTabs)` now types as a DOM wrapper (a
  generic SFC's type is a function); use `findComponent({ name: \"SegmentedTabs\" })` for `.vm`."

CHANGELOG `## 10.0.0` lines (R2): BREAKING `cm-serif` removed → `font-serif-math` (`--font-serif-math`
declared in `@theme`); `cn()` text-*/shadow-* buckets; `SegmentedTabs` generic model.

Letter (AUTHOR's bracket pass): fourier's 31 `cm-serif` sites in 18 files become `font-serif-math`;
their `style.css:94` `@theme` declaration keeps winning unchanged (Chromium probe above).

## Adjudication round 1 [2026-09-22]

Adjudicator: Fable (`claude-fable-5-1`), read-only over the live diff; every ruling below is
re-measured, not inherited. Grounds: RULINGS §A api-cascade (§4.1/§4.2+L-2/§4.3), §B-1/B-2/B-3, the
driver's "AC1 path corrections RATIFIED" bullet (the depth-0 colon split is a regression; the cure keeps
the type hint's family; the adjudicator dictates the exact split). Compile probes ran the repo's
`tailwindcss` (4.3.3) with a fresh compiler per candidate; cn probes ran HEAD, the working tree and a
scratch copy carrying the dictated split under `node --experimental-strip-types`.

| finding | verdict | reason |
| --- | --- | --- |
| A1-BLOCK-1 / B-BLOCK-1 (hinted arbitrary values fall into the colour catch-alls) | CURE | Reproduced: `badge.contract` 1 failed / 6 passed (Badge sm/md/lg lose `text-primary-foreground`); HEAD kept `text-[length:…]`, `text-(length:--x)`, `bg-[length:…]`, `bg-[position:…]`, `bg-(image:--x)`, `bg-[url(a:b)]` beside their colour class, the working tree evicts every one. Tailwind (compile-probed) writes `font-size` for `text-[length|percentage|absolute-size|relative-size:…]`, `background-image` for `bg-[image:…]` / `bg-[url(…)]`, `background-size` for `bg-[length|size|bg-size:…]`, `background-position` for `bg-[position|percentage:…]`; a `color:` hint is the colour (so `text-[color:…]` evicting `text-foreground` is correct and stays). The dictated split (cures 1–5) keeps each hint's family; validated on a scratch copy, the Badge recipe keeps all four size tokens and the colour. |
| A1-FIX-1 / B-FIX-3 (arbitrary shadow values "follow Tailwind's inference") | CURE | Overstated in three places. Raw compile: `shadow-[red]`, `shadow-[currentColor]`, `text-shadow-[red]` emit `--tw-shadow-color` / `--tw-text-shadow-color` (colours), the lookahead recognises only `color:`, `#` and colour functions, so they bucket as sizes and evict `shadow-lg`. Not a regression from HEAD's one bucket and beyond the ruling's roster scope, so the cure is the prose (cures 8–10), not a named-colour list. |
| A1-FIX-2 / B-FIX-4 (RULES docblock displaced onto `SHADOW_SIZES`) | CURE | Confirmed at `class-names.ts:64-74`; cure 6 moves the three shadow-size declarations above the docblock. |
| B-FIX-1 (RECORD's B-1 sentence: `--font-text` "on an element in any layer") | CURE | Confirmed over the shipped dist: with no consumer `@theme`, `.font-text { font-family: var(--font-stack-text) }` (the `@theme inline` bridge substitutes the value), so an element-level `--font-text` does nothing; with a consumer `@theme { --font-text }` it reads `var(--font-text)`. The element arm holds for `--font-serif-math` only. Cure 11 rewrites the sentence R2 will copy. |
| B-FIX-2 (spaced em dashes in new files) | CURE | RECORD.md (23 prose lines), the fixture (:2) and the dist test (:5, :11) are new files under the tight-dash law; cure 12. RECORD :72 is the build's verbatim refusal (`scripts/verify-export-types.mjs:519` emits the spaced dash) and stays as quoted. `types.ts`'s five dashes are prose moved verbatim from `SegmentedTabs.vue`, a move not new prose: DISMISS for that file. |
| A1-NOTE-4 / B-NOTE-3 (fixture arm 2 overclaimed) | CURE | Confirmed: arm 2 errors at HEAD too (`string` is not assignable either), so it cannot tell inferred from widened; arm 1 is the inference witness. Prose only (cure 13). |
| A1-NOTE-1 / B-NOTE-2 (three out-of-fence touches) | DISMISS | Already ratified by the driver in RULINGS ("AC1 path corrections RATIFIED"): `literals.css` owns the plain `@theme`; `useTabDragMorph.ts:13` and `segmented-tabs.test.ts:229` are inside the fence by the ruled type move's reach. No action. |
| A1-NOTE-2 (§4.1 path correction holds) | DISMISS | Agreed and ratified; the declaration sits in `literals.css`'s plain `@theme`, no alias, never the unlayered root. |
| A1-NOTE-3 (mutation holds on every cn and tabs arm) | DISMISS | Evidence in the lane's favour; nothing to cure. |
| A1-NOTE-5 (gates stay 60) | DISMISS | Confirmed by the challenger's `gate-register` receipt; nothing under `tests/gates` in the porcelain. |
| B-NOTE-1 (census complete apart from the BLOCK) | DISMISS | Agreed. |
| B-NOTE-4 (`InstanceType<typeof SegmentedTabs>` clause for MIGRATION) | DRIVER | Plausible (a generic SFC's default export is a function type) but unprobed by either challenger and with no in-repo user; beyond the ruling. Handed to R2 to probe with one vue-tsc line when it writes the §4.3 row, and widen the test-code clause only if it errors. |
| B-NOTE-5 (stale-name sweep clean; mixed HEAD/post-cure line numbers) | DISMISS | The sweep is clean; the line references are labelled "at HEAD" where they differ. |
| B-NOTE-6 (tree left as found) | DISMISS | Housekeeping. |

Dictated cures are the numbered list in the adjudication return (the workflow's structured output);
they are applied by an Opus seat, witness-first, and re-challenged in round 2. `clean=false`.

Observed, not ruled: `dist/styles/theme/literals.css` in the shared `dist/` now carries
`font-serif-math` (a sibling `vite build --watch` republished after the driver's roster rebind), so the
dist witness may already read GREEN in the working tree; it stays a round-2 re-run, not a claim.

## Cure [2026-09-22]

Applied by an Opus seat (`claude-opus-5-5[1m]`), the adjudication r1 dictated cures in order, witness-first.

- Cure 1 (witness): `tests/components/_shared/classNames.test.ts` gains `it("a type-hinted arbitrary value keeps its hint's family")` after `sizes dedupe with sizes and colours with colours`. RED against the un-cured `class-names.ts`:
  `AssertionError: expected 'text-[length:var(--type-caption)]' to be 'text-primary-foreground text-[length:…' // Object.is equality`
  `Tests  1 failed | 9 passed (10)`
- Cure 2: `class-names.ts` `["font-size", /^text-[[(](?:length|percentage|absolute-size|relative-size):/]` after the Tailwind font-size ladder.
- Cure 3: `class-names.ts` `bg-image` / `bg-size` / `bg-position` hint rules ahead of `["bg-color", /^bg-/]`.
- Cure 6: `SHADOW_SIZES`, `TEXT_SHADOW_SIZES` and `shadowSize()` moved above the RULES docblock; that docblock now sits directly on `const RULES`.
- Cure 8: `shadowSize()` docblock rewritten (colour by marker only; a named colour buckets as a size).
- Cure 9: the classNames shadow-arbitrary comment rewritten to match.
- Cures 5a, 5b, 7, 10, 11: RECORD prose amended in place (dated brackets where amending).
- Cure 12: fixture arm-2 comment reads "a rejection guard, not born-RED (it errors at HEAD too)".
- Cure 13: spaced em dashes tightened in RECORD.md (all but the `rebind deliberately` build-refusal quote), the fixture and `font-serif-math-dist.test.ts`.

GREEN:
- `timeout 600 npx vitest run tests/components/_shared/classNames.test.ts tests/utils/cn.test.ts tests/components/badge.contract.test.ts` → `Test Files  3 passed (3)` / `Tests  47 passed (47)` (10 + 30 + 7).
- `timeout 600 npm run typecheck` → exit 0 (both legs).
- Cure 14 (final): `timeout 600 npx vitest run tests/components/_shared/classNames.test.ts tests/utils/cn.test.ts tests/components/badge.contract.test.ts tests/components/custom/tabs/segmented-tabs.test.ts tests/styles/font-serif-math-dist.test.ts` → `Test Files  5 passed (5)` / `Tests  63 passed (63)`; typecheck re-run exit 0; porcelain unchanged beyond the AC1 set and the AC2/driver entries already present.

## Adjudication round 2 [2026-09-22]

Adjudicator: Fable (`claude-fable-5-1`), read-only over the live diff at HEAD `e417d82d`; every
figure below is re-measured, not inherited from the cure seat. Grounds unchanged: RULINGS §A
api-cascade, §B-1/B-2/B-3, the ratified path corrections, the round-1 rulings above.

Re-measured: `vitest run` over `classNames`, `utils/cn`, `badge.contract`, `segmented-tabs`,
`font-serif-math-dist` → `Test Files 5 passed (5)`, `Tests 63 passed (63)`; per file 10 / 30 / 7
(measured this round, so the Cure section's "(10 + 30 + 7)" is now a measured figure). `npm run
typecheck` → exit 0 (both legs). Mutation: `class-names.ts` with the four hint-family rules removed
(a scratch copy) evicts every hinted row the witness pins (`text-primary-foreground` lost to
`text-[length:…]`, `bg-card` lost to `bg-[length:…]` / `bg-[url(…)]`, `md:text-foreground` lost under
a variant), the cured table keeps them all: the witness is born-RED. The shared `dist/` carries
`font-serif-math: serif` (`dist/styles/theme/literals.css`) and no `cm-serif` byte; the roster reads
`theme --font-serif-math` at :125 and no `utility cm-serif`. Nothing under `tests/gates` in the
porcelain; the receipt is unchanged; gates stay 60.

| finding | verdict | reason |
| --- | --- | --- |
| Cure 1 (hint-family witness, born-RED) | DISMISS | Landed as dictated (`classNames.test.ts:144-162`); RED reproduced by mutation this round, GREEN 10/10. |
| Cures 2–3 (`text-` font-size hint rule; `bg-image` / `bg-size` / `bg-position` ahead of `bg-color`) | DISMISS | Landed verbatim (`class-names.ts:120`, `:194-196`); `badge.contract` 7/7 (Badge keeps `text-primary-foreground` and its size). |
| Cure 4 (GREEN figures) | DISMISS | 47 = 10 + 30 + 7 measured per file this round. |
| Cure 5a/5b (RECORD cn() MIGRATION sentence; `splitToken` bracket) | CURE | Both landed, but 5b's dictated text reads "RED→GREEN recorded above" and the Cure section that holds the RED/GREEN sits below it; cure 6's move also shifted the §4.2 line references (`shadow` :261-262 → :272-273, `splitToken` :271-281 → :282-297, `shadowSize()` :98-108 → :96-100, `text-shadow` :145-146 → :151-152, the alternation :129 → :135). One RECORD edit, two exact replacements. |
| Cure 6 (RULES docblock restored) | DISMISS | `class-names.ts:102-111` sits directly on `const RULES` at :112; the stray blank line the seat removed is gone. |
| Cures 7, 10, 11 (RECORD brackets: arm 2, `shadowSize()` overstatement, the B-1 font-register sentence) | DISMISS | Landed verbatim; the B-1 sentence R2 copies now scopes the element arm to `--font-serif-math` and names `--font-stack-text` / `--font-stack-display` for the inline bridges. |
| Cures 8–9 (`shadowSize()` docblock; test comment) | DISMISS | Landed verbatim (`class-names.ts:88-95`, `classNames.test.ts:127-129`). |
| Cure 12 (fixture arm-2 comment) | CURE | Landed, but the dictated replacement made `segmented-tabs-generic.fixture.vue:6` 108 characters against printWidth 88 (prettier does not rewrap comments); rewrap lines 6-7. |
| Cure 13 (em dashes) | DISMISS | The three new files carry only RECORD:72 (the build's verbatim refusal); `types.ts`'s five are moved prose, exempt as ruled. |
| Cure 14 (porcelain, final run) | DISMISS | 35 porcelain entries, every one AC1's, AC2's ratified widenings, or the driver's roster rebind; `tests/gates` untouched. |
| NEW: `classNames.test.ts` prettier-dirty | CURE | The file was prettier-clean at HEAD; the cure-1 rows were pasted verbatim from the dictation and five of them exceed printWidth 88 (`npx prettier --check` warns). No CI or gate step checks formatting, so this is house quality, not a CI break, but a HEAD-clean file may not leave the lane dirty. `SegmentedTabs.vue`, `useTabResponsive.ts`, `useTabDragMorph.ts` are prettier-dirty at HEAD already (measured on `git show HEAD:`), so they are not AC1's to format. |
| `text-[12px]` (un-hinted arbitrary text length) buckets as a colour | DISMISS | Same at HEAD (no colon, the `^text-` catch-all), so not a regression and beyond the ruling's roster scope; the `:117-119` comment states it. |
| B-NOTE-4 (`InstanceType<typeof SegmentedTabs>`) | DRIVER | Already the driver's: RULINGS "R2 probe (from AC1's adjudication)" and commit `e417d82d`. No lane action. |
| Roster rebind / dist witness | DRIVER | The shared dist now reads GREEN 3/3 (measured); the G-NO-ORPHAN-EXPORT `cm-serif` arm still awaits R2's removal row, as RULINGS records. |

Dictated cures are the numbered list in the adjudication return; three items, all mechanical. `clean=false`.

## Cure round 2 [2026-09-22]

Applied the three dictated cures from adjudication r2—nothing else.

1. Format—`npx prettier --write tests/components/_shared/classNames.test.ts` (that file only; SegmentedTabs.vue, useTabResponsive.ts and useTabDragMorph.ts left as they are).
   - `npx prettier --check tests/components/_shared/classNames.test.ts` → `All matched files use Prettier code style!`
   - `npx vitest run tests/components/_shared/classNames.test.ts` → `Tests  10 passed (10)`
2. This RECORD—two exact replacements: the §4.2 `splitToken` bracket now points at "the Cure section below"; the `What changed, \`src/components/_shared/class-names.ts\`` line carries the dated r2 bracket with the cured-tree line references.
3. `tests/components/custom/tabs/segmented-tabs-generic.fixture.vue` lines 6-7 rewrapped to the 88-column comment width (text unchanged).
   - `npm run typecheck` → `typecheck exit 0` (vue-tsc --noEmit && vue-tsc --noEmit -p tsconfig.test.json)
4. Lane tests—`npx vitest run` over classNames, cn, badge.contract, segmented-tabs, font-serif-math-dist → `Test Files  5 passed (5)` / `Tests  63 passed (63)`.

Footprint: `git status --porcelain` reads 17 entries at HEAD 9d8cd728 (AC2 committed by the driver since adjudication, hence below the 35 counted then); nothing under tests/gates, no ratchet or version change; `.published-roster` was already modified at session start and is untouched by this lane.

## Adjudication round 3 [2026-09-22]

Adjudicator: Fable (`claude-fable-5-1`), read-only over the live diff at HEAD `9d8cd728` (the driver
committed AC2 since round 2; no AC1 path moved). Every figure below is re-measured this round, not
inherited from the cure seat. Grounds unchanged: RULINGS §A api-cascade (§4.1/§4.2+L-2/§4.3),
§B-1/B-2/B-3, the ratified path corrections, the round-1 and round-2 rulings above.

Re-measured: `vitest run` over `classNames`, `utils/cn`, `badge.contract`, `segmented-tabs`,
`font-serif-math-dist` → `Test Files 5 passed (5)`, `Tests 63 passed (63)`; `npm run typecheck` →
exit 0 (both legs). `prettier --check` over `classNames.test.ts`, the fixture, the dist test,
`class-names.ts`, `tabs/types.ts`, `tabs/index.ts` → all clean. Spaced em dashes survive only at
RECORD:72 (the build's verbatim refusal, ruled to stay) and in `types.ts`'s five moved docblocks
(exempt as ruled in round 1). The r2 line map in the §4.2 "What changed" bracket matches the cured
file exactly (docblock :28-39, `text-` hint rule :120, alternation :135, text-shadow pair :151-152,
`bg-` hint rules :194-196, `shadowSize()` :88-100, shadow pair :272-273, `splitToken` :282-297).
HEAD-vs-cured `cn` probe under `node --experimental-strip-types`: the Badge recipe
(`text-primary-foreground` + `text-[length:var(--type-caption)]`), the AlertTitle shape
(`text-destructive` + `text-[length:…]`), the hinted `bg-` triple, bracket variants
(`[&::after]:`, `md:[&>*]:`, `data-[state=open]:`) and `!`-important all read identically at HEAD
and cured; the shadow / text-shadow colour-vs-size pairs keep the size only when cured; the one
output change beyond a wrongly-dropped class is `hover:text-[color:var(--x)]` + `hover:text-foreground`
(HEAD kept both, cured keeps the colour), which the FOR THE DRIVER cn() sentence already names.
`node scripts/gate-register.mjs` → `seats:60 … drift:0 violations:0`; nothing under `tests/gates` in
the porcelain; `.bundle-ratchet` and `package.json` untouched. `dist/styles/theme/literals.css`
carries `font-serif-math` and no dist stylesheet carries a `cm-serif` byte; `.published-roster:125`
reads `theme --font-serif-math` (289 lines).

| finding | verdict | reason |
| --- | --- | --- |
| Cure r2-1 (`classNames.test.ts` formatted; that file only) | DISMISS | Landed: `prettier --check` clean, the three prettier-dirty-at-HEAD tabs files untouched (their diff is the ruled type move only); 10/10 on my run. |
| Cure r2-2 (RECORD: the `splitToken` bracket points below; the r2 line map) | DISMISS | Landed verbatim; every line reference in the map verified against the cured `class-names.ts` this round. |
| Cure r2-3 (fixture lines 6-7 rewrapped) | DISMISS | Landed; no line in the fixture exceeds 88 columns, `typecheck` exit 0, arm 1 the born-RED inference witness, arm 2 named a rejection guard. |
| Cure r2-4 (porcelain, final run) | DISMISS | 17 porcelain entries at `9d8cd728`: the 16 AC1 paths (incl. the three ratified path corrections and the AC1 RECORD directory) plus the driver's `.published-roster` rebind; nothing else. |
| Cure seat note: `## Cure round 2` heading vs the task's `## Cure` | DISMISS | The dictated heading is the more specific one and is what round 2 asked for; the round-1 section keeps `## Cure`. |
| Observation: `classNames.test.ts`'s new docblock carries spaced em dashes | DISMISS | An existing file (`M`, prettier-clean at HEAD) whose house style already uses the spaced form (`cn — the font-size bucket`); the tight-dash law binds new files. Not a defect. |
| Observation: `types.ts:26` is 102 columns | DISMISS | Moved prose inside a docblock, prettier-clean (comments are not rewrapped); exempt as ruled in round 1. |
| B-NOTE-4 (`InstanceType<typeof SegmentedTabs>` MIGRATION clause) | DRIVER | Already the driver's: RULINGS "R2 probe (from AC1's adjudication)" and commit `e417d82d`. No lane action. |
| Roster rebind and the G-NO-ORPHAN-EXPORT `cm-serif` arm | DRIVER | The roster is rebound in the working tree and commits with AC1's pathspec (RULINGS B-3 bullet); the `cm-serif` removal-table row is R2's, and the build publishes only after it lands. |

Zero CURE items. `clean=true`. Lane AC1 is CLEAN at round 3; the driver commits AC1's paths by
pathspec (`.published-roster` with them), R2 writes the §4.1 removal row, the §4.2 cn() sentence and
the §4.3 test-code clause from FOR THE DRIVER above.
