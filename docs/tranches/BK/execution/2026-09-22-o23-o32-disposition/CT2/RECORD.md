# Lane CT2—the ruled CT/AC2 residue (O-23/O-32 disposition, 2026-09-22)

Lane CT2 (Opus, `claude-opus-5-5[1m]`). Rows: the RULINGS "Driver items raised by the lane adjudicators" CT-residue item (use-accent-tone fixture, dark-arm comment, PresetEditor alpha text) and AC2's routed residue (offsets.css:26-32, overview.vue:578, tests-visual spec:8). Datum: master `e853b327`, clean at lane start. Nothing staged or committed; the driver commits by pathspec.

## Row 1—`use-accent-tone.test.ts` reads the shipped card bytes

- Before `tests/composables/color/use-accent-tone.test.ts:45-46`:
  `const LIGHT_CARD = "hsl(36 48% 97%)";` / `const DARK_CARD = "hsl(24 8% 16%)";`—the struck grounds.
- After `:46-55` (plus `import { readFileSync } from "node:fs";` at `:6`): a dated bracket and a `shippedCard(path)` reader that takes the one `^\s*--card:` declaration out of `src/styles/tokens/color-radius.css` (light) and `src/styles/tokens/dark-arm.css` (dark). It throws if the declaration is missing, so the fixture cannot fall back to a literal. Resolved values at HEAD: `hsl(30 85% 96%)` / `hsl(26 22% 17%)` (probed with the same regex in node).
- The fixture now reads the token files instead of restating them, so it cannot drift again. That shape was the round-1 CT adjudicator's note ("reading the token files would end the drift").

Runs (`npx vitest run tests/composables/color/use-accent-tone.test.ts --reporter=verbose`):

- Before (struck fixture): `Test Files 1 passed (1) · Tests 10 passed (10)`.
- After (shipped bytes): `Test Files 1 passed (1) · Tests 10 passed (10)`. The rows are the same 10, all GREEN, including "over the LIGHT card … resolves DARK", "over the DARK card … resolves LIGHT", "the resolved ink ALWAYS clears 4.5:1 over the band—every tone, both modes" and "a tighter inkContrast target is honored".

**No assertion flipped on the corrected fixture.** There is nothing to retune and nothing is left for the driver. This is a fixture correction, not a cure, so it has no born-RED arm: the contract held on both the struck grounds and the shipped ones.

## Row 2—`dark-arm.css:91-93` dated bracket

- Before: `--card's dark hsl(24 8% 16%) nudged … Re-anchored L12→L18 to stay ABOVE the lifted L16 card (LOCKSTEP light-dark.css:82). */`
- After `:91-96`: `~~hsl(24 8% 16%)~~` and `~~L16~~` are struck in place, followed by `[2026-09-22 · O-32 CT2: the dark --card ships hsl(26 22% 17%) (:87)—the L17 card; the panel's L18 still sits one step above it.]`. No declaration changed.
- Seen outside the fence, not touched: `dark-arm.css:84` "The --card plate LIFTS L10→L16" has the same stale L16. The fence names :91-93 only, so this is for the driver. [2026-09-22 · adjudication r1: :84 joined the fence at 713d48ce and the whole stale-L16 comment class at ef0e88ae; cured in-lane (cures 2-8), see the Cure section.]

## Row 3—PresetEditor alpha-muted text drops the alpha

- `demo/shell/configurator/PresetEditor.vue:224`: `<p class="text-micro leading-snug text-muted-foreground/80">` (the preset description) → `text-muted-foreground`.
- `:366`: `<Label class="text-micro font-mono text-muted-foreground/70">` (the footer `glass-ui-demo-config` label) → `text-muted-foreground`.
- Nothing else in the file carries a `text-muted-foreground/NN` class (checked with `grep -n "muted-foreground/"` before the edit: two hits).

**Contrast.** No test row exists for the demo shell: the §8 L-4 census in `tests/styles/contrast-computed.test.ts` reads only `src/components/configurator/*`, and that file is outside this fence. So this is a one-off probe recorded here, using the same arithmetic as the contrast-computed idiom. It takes the WCAG relative luminance of the shipped `--neutral-5` (= `--muted-foreground`) and composites the alpha ink over the ground in sRGB (a mix toward `transparent` is the same in oklab and sRGB). The grounds are `--card` (the ground CT used for the Configurator rows in this same `SheetContent`) and `--background`:

| arm | ground | `/80` (before, :224) | `/70` (before, :366) | full (after) |
| --- | --- | --- | --- | --- |
| light | `--card` hsl(30 85% 96%) | 3.38 | 2.82 | **5.01** |
| light | `--background` hsl(40 30% 98%) | 3.47 | 2.88 | **5.21** |
| dark | `--card` hsl(26 22% 17%) | 4.04 | 3.45 | **5.43** |
| dark | `--background` hsl(24 9% 4%) | 5.23 | 4.24 | **7.70** |

After the cure, every cell clears 4.5:1. The figures match CT's measured 2.82/3.38 → 5.01 (light) and 3.45 → 5.43 (dark) for the same inks on `--card`, and they match the `dark-arm.css:59` / `color-radius.css:45` token comments (7.70 / 5.21 vs page). The sheet is `glass-resting`, a translucent plate. A paint composite of that plate is not measured here: it is the same LIVE-DEFER register the §8 headnote names, and CT measured the Configurator rows in this sheet on `--card` too.

Probe (node, run from the repo root):

```
hsl→sRGB (CSS algorithm) · WCAG relL · over(f, g, α) = f·α + g·(1−α)
light card /80 3.38 /70 2.82 full 5.01
light bg   /80 3.47 /70 2.88 full 5.21
dark  card /80 4.04 /70 3.45 full 5.43
dark  bg   /80 5.23 /70 4.24 full 7.70
```

## Row 4—the `--dock-max-inline-size` prose, truthed at HEAD

Truth at HEAD, taken from AC2/RECORD "AC-D-1" and `src/components/dock/styles/shell.css:59-73, :359-366`. `--dock-max-inline-size` is deleted: its last reader went at BK #47 W3 LATTICE, and the declaration went at 10.0.0 (AC2). `--dock-max-block-size` is the one surviving token, and it bounds the vertical dock only. No edge mask ships on either axis, and the column's scroll is scrollbar-hidden, not feathered. `/dock/overflow` sets no cap (AC2 deleted its `:style`).

- `src/styles/tokens/offsets.css:26-32` before: "…container scrolls with a `.scroll-fade-{x,y}` mask-fade so the boundary feathers rather than cliffs. Defaults clamp to 80vw / 80vh … consumers override per-dock by setting either token directly on a `.glass-dock` instance." After `:26-36`: `~~with a … than cliffs~~`, `~~80vw /~~` and `~~either token~~` are struck in place, followed by `[2026-09-22 · O-32 CT2: at HEAD no edge mask ships on either axis—the column's scroll is scrollbar-hidden, not feathered (shell.css)—and the one settable token is `--dock-max-block-size`; `--dock-max-inline-size` is gone (the bracket below).]`. AC2's `:37-41` bracket and the declaration are untouched.
- `demo/stories/dock/overview.vue:578` before: "The `--dock-max-inline-size` cap it demonstrated is a token, still consumer-settable, still exercised by the /dock/overflow story. -->". After `:578-582`: `~~is a token, still consumer-settable, still exercised by the /dock/overflow story~~.` followed by `[2026-09-22 · O-32 CT2: is gone—its last reader went at BK #47 W3 LATTICE and the declaration at 10.0.0 (O-32 AC-D-1); /dock/overflow sets no cap, and an over-long run scrolls natively.]` inside the same HTML comment.
- `tests-visual/dock-wrap-content-driven.spec.ts:8` before: "the dock inline-size caps at `min(max-content, --dock-max-inline-size)`…". After, a bracket at `:10-12`: `[2026-09-22 · O-32 CT2: neither half holds at HEAD—`overflow="wrap"` was struck at BK #47 W1 SURFACE and `--dock-max-inline-size` is gone (its last reader at W3 LATTICE, the declaration at 10.0.0, O-32 AC-D-1); no token caps the dock's inline size.]`. The spec's code is untouched. ~~Whether a spec over a struck prop should itself go is outside this lane's rows.~~ [2026-09-22 · adjudication r1: RETIRED at 713d48ce—the spec asserts the struck `overflow="wrap"` against the deleted token; removed from the tree with `rm` (`git rm` is the driver's), the bracket above is moot. Binding census, measured: 0 references outside the file in package.json, .github, scripts, tests and tests-visual/*.ts (pi-manifest.ts has no row for it; `PI_TARGETS.dock` keeps six other readers); no gate seat; ci.yml's pixel-floor jobs run `substrate-paints-color.spec.ts` only; the one collector was tests-visual/playwright.config.ts `testDir: "."` + `testMatch: "*.spec.ts"`, which the deletion resolves. Gates stay 60.]

The "1.28:1" history prose (`sortable-list/styles.css:11`, `proportion-register.test.ts:335/:404`) stands as ruled and was not touched.

## Verification

- `npx vitest run tests/composables/color/use-accent-tone.test.ts tests/styles/contrast-computed.test.ts tests/components/custom/dock/g-dock-lattice.test.ts tests/gates/comment-ratio.test.ts tests/gates/token-hygiene.test.ts tests/styles/proportion-register.test.ts` → `Test Files 6 passed (6) · Tests 184 passed | 2 expected fail (186)`. These are the files that read `offsets.css` / `dark-arm.css` or hold the dock cap absent. contrast-computed's `declarations()` regex also reads comments, and no bracket writes a `--token: value;` shape.
- `npx vitest run tests/demo/skip-link.a11y.test.ts tests/styles/layout-canon.test.ts tests/gates/gate-register.test.ts` (the PresetEditor readers + the gate register) → `Test Files 3 passed (3) · Tests 55 passed | 3 expected fail (58)`.
- `npx vue-tsc --noEmit` → exit 0. `npx vue-tsc --noEmit -p tsconfig.test.json` → exit 0.
- No build ran and `dist/` was not touched. No gate seat was minted (gates stay 60). `.published-roster`, `.bundle-ratchet` and `package.json` were not touched. Roster delta: none.

## Footprint

`git status --porcelain` at return [2026-09-22 · cure: replaced with the post-cure porcelain]:

```
 M CHANGELOG.md
 M DESIGN.md
 M MIGRATION.md
 M demo/chassis/hero/story-hero.css
 M demo/shell/configurator/PresetEditor.vue
 M demo/stories/data/metric.vue
 M demo/stories/dock/overview.vue
 M docs/tranches/BK/execution/2026-09-17-o20-disposition/LEDGER.md
 M src/composables/color/accent-tone-solve.ts
 M src/styles/tokens/dark-arm.css
 M src/styles/tokens/light-dark.css
 M src/styles/tokens/offsets.css
 M src/styles/tokens/sizing-config.css
 D tests-visual/dock-wrap-content-driven.spec.ts
 M tests-visual/glass-identity.spec.ts
 M tests-visual/no-gray.spec.ts
 M tests/composables/color/use-accent-tone.test.ts
?? docs/tranches/BK/execution/2026-09-22-o23-o32-disposition/CT2/
?? docs/tranches/BK/execution/2026-09-22-o23-o32-disposition/R2/
```

MIGRATION.md, CHANGELOG.md, DESIGN.md, demo/stories/data/metric.vue, the O-20 LEDGER and R2/ are lane R2's rows in flight in the shared tree, not this footprint.

## FOR THE DRIVER

- ~~`src/styles/tokens/dark-arm.css:84` "The --card plate LIFTS L10→L16" carries the same stale L16 as :91-93 (the card is L17). It is out of this fence, and a one-line dated bracket would cure it.~~
- ~~`tests-visual/dock-wrap-content-driven.spec.ts` asserts against a struck prop (`overflow="wrap"`, BK #47 W1). Its comment is now truthed; whether the spec itself retires is a separate call.~~
- ~~CHANGELOG (R2, optional): "Demo configurator: the preset description and footer label drop their alpha (`/80`, `/70`): 3.38/2.82 → 5.01:1 on `--card` (O-23 L-4 class, demo shell)."~~

[2026-09-22 · adjudication r1: all three ruled at 713d48ce—:84 cured in-lane; the demo CHANGELOG line DECLINED (the demo does not ship in the package); the spec RETIRED, see Row 4.]

- ~~`src/composables/color/accent-tone-solve.ts:27` `DEFAULT_SURFACE = "hsl(36 48% 97%)"` is a RUNTIME default seeded from the struck light card (the JS-side band-solve seed when no `surface` is passed); its :21 docblock names that figure as `tokens/color-radius.css`'s value. The shipped card is hsl(30 85% 96%); every use-accent-tone row passes `surface` explicitly, so no test row exercises the default. A code literal, outside the comments-only widening (ef0e88ae): the driver rules whether it rides 10.0.0.~~
- ~~`tests-visual/no-gray.spec.ts:287` the failure-message literal `(over the L16 card)`—one word, a string not a comment; not touched under the comments-only fence.~~
- ~~Stale LOCKSTEP line pointers (`dark-arm.css:32/:51/:60/:82`, `light-dark.css:70/80/92`, `story-hero.css:52-54/:85-87`) are a pre-existing class outside the ruled figure class; listed, not cured.~~

[2026-09-22 · adjudication r2: all three ruled CURE in CT2 at 7f1aebc9 (a)/(b)/(c)—the default reads the shipped card with a born-RED row binding it to the token file; the failure-message literal reads L17; the ten pointers name their twin by token name. The DEFAULT_SURFACE CHANGELOG Fixed line is R2's (7f1aebc9 (a), 9a584214 (c)). See Cure round 2.]

## Adjudication round 1 [2026-09-22]

Adjudicator: Fable (`claude-fable-5-1`), read-only over the tree; this section is the one write. Datum at adjudication: master `ef0e88ae` (two driver rulings landed after the implement return and bind this lane: `713d48ce`—:84 joins the fence, the demo CHANGELOG line DECLINED, `dock-wrap-content-driven.spec.ts` RETIRED; `ef0e88ae`—the whole stale-L16 comment class joins the fence, re-measured by the adjudicator with one grep). Read in full: RULINGS.md, the CT/DA/AC1/AC2 RECORDs, this RECORD, the live diff of every CT2 path.

Re-measured: `npx vitest run use-accent-tone + gates/gate-register + gates/comment-ratio` → 3 files, 45 passed | 1 expected fail; the fixture's `^\s*--card:` regex hits exactly the two declarations (`color-radius.css:78` hsl(30 85% 96%), `dark-arm.css:87` hsl(26 22% 17%)), which equal `light-dark.css:109`'s arms; the PresetEditor table recomputed independently (CSS hsl→sRGB, WCAG relL, α over ground): light card 3.38 / 2.82 → 5.01, light bg 3.47 / 2.88 → 5.21, dark card 4.04 / 3.45 → 5.43, dark bg 5.23 / 4.24 → 7.70—every cell matches; `.published-roster`, `.bundle-ratchet`, `package.json`, `tests/gates/` untouched by this lane; gates stay 60. The porcelain now also carries `MIGRATION.md`, `CHANGELOG.md` and `DESIGN.md`—lane R2's rows in flight in the same tree, not CT2's footprint.

The one grep (`grep -rnE 'L16|36 48% 97%|24 8% 16%' src demo tests tests-visual scripts`) re-measures Challenger A's ten sites and finds five more comment sites plus two non-comment sites:

| site | text | class |
| --- | --- | --- |
| `src/styles/tokens/dark-arm.css:45` | `LIFTS (L10→L16, below)` … `card/page relL ≈ 5×` | comment—CURE |
| `dark-arm.css:84` | `LIFTS L10→L16` … `~5× the deepened L4 page relL` | comment—CURE (ruled at 713d48ce) |
| `dark-arm.css:91-92` | `(24→36) + +1 sat + +2 L`, a delta off the struck card | comment—CURE (CT2-A-2) |
| `dark-arm.css:166`, `:282`, `:314` | `the L16 glass plate` / `the L16 card` ×2 | comment—CURE |
| `src/styles/tokens/light-dark.css:83`, `:104`, `:107` | `lifted L16 --card sits ~5×` / `LIFTS L10→L16` (the LOCKSTEP twin) / `hsl(36 48% 97%)` | comment—CURE |
| `src/styles/tokens/sizing-config.css:64`, `:73` | `--card L16` / `over the L16 plate` | comment—CURE |
| `demo/chassis/hero/story-hero.css:10` | `LIFTED L16 surface` | comment—CURE (found by the re-measure) |
| `tests-visual/no-gray.spec.ts:239`, `:260` | `the dark L16 card` / `the L16 plate` | comment—CURE (found by the re-measure) |
| `tests-visual/glass-identity.spec.ts:125` | `` dark `--card` hsl(24 8% 16%) `` (the L window [0.1, 0.55] still holds at L17—no retune) | comment—CURE (found by the re-measure) |
| `tests-visual/no-gray.spec.ts:287` | `(over the L16 card)` inside an `expect` failure-message string | literal, not a comment—DRIVER |
| `src/composables/color/accent-tone-solve.ts:21` + `:27` | docblock states the struck figure as the token file's value; `DEFAULT_SURFACE = "hsl(36 48% 97%)"` is a RUNTIME default (the JS-side band-solve seed when no `surface` is passed) | code literal—DRIVER |

Measured while bracketing: the shipped dark card hsl(26 22% 17%) over the L4 page hsl(24 9% 4%) is a card/page relL of ≈ 8.2× (the struck hsl(24 8% 16%) was ≈ 7.1×; the "~5×" in three comments was never the shipped figure), so the brackets at dark-arm.css:45/:84 and light-dark.css:83 carry the measured multiplier beside L17.

| finding | verdict | reason |
| --- | --- | --- |
| CT2-A-1 (census of the stale card figure incomplete; the LOCKSTEP twin disagrees with the new bracket) | CURE | Ruled at `ef0e88ae`: the whole comment class is CT2's, dated brackets, including the twin. Re-measured with one grep: the ten sites hold and five more comment sites join (story-hero.css:10, no-gray.spec.ts:239/:260, glass-identity.spec.ts:125). Cures 4-8. |
| CT2-A-2 (the unstruck `(24→36) + +1 sat + +2 L` is a delta off a struck value) | CURE | Same class: a figure derived from the struck card, standing unstruck beside its bracket. From the shipped card the panel is H 26→36, S −13, L +1. Comment only; cure 3. |
| CT2-A-3 (every figure checks out) | DISMISS | Confirmation; the contrast table re-derived here matches cell for cell. |
| CT2-A-4 (no born-RED arm; RECORD says so) | DISMISS | The ruling's conditional ("only if its assertions still hold … if a row flips, record it") is met: 10/10 on both grounds, nothing retuned. |
| CT2-B-1 (the retired spec is still in the tree with the moot bracket) | CURE | Ruled at `713d48ce`: `rm` by the lane, `git rm` by the driver, RECORD notes the retirement with the measured census. Cure 1. Binding census re-measured: 0 references outside the file in package.json, .github, scripts, tests, tests-visual/*.ts; no gate seat; ci.yml's pixel-floor jobs run `substrate-paints-color.spec.ts` only; the sole collector is playwright.config.ts `testDir: "."` + `testMatch: "*.spec.ts"`, resolved by the deletion; `PI_TARGETS.dock` keeps six other readers. |
| CT2-B-2 (:84 unbracketed; the lane's own `(:87)` pointer breaks once :84 gains a line) | CURE | Ruled at `713d48ce` (dated bracket, L17). The `(:87)` pointer is CT2's own new prose and would be false after its own next edit; it becomes a name pointer. Cures 2-3. |
| CT2-B-3 (FOR THE DRIVER poses three ruled questions; the zero-binding census misses the glob) | CURE | The three are ruled (:84 in-lane, CHANGELOG line DECLINED, spec RETIRED); the record must be true at the close. Cure 10 rewrites it with the glob named and the two driver items the re-measure found. |
| CT2-B-4 (concur A-1; `LOCKSTEP light-dark.css:82` is a stale pointer, the twin is :104) | CURE for the twin's L16 (cure 5); DISMISS the pointer re-point | The twin's figure is in the ruled class and gets its bracket. Stale LOCKSTEP line pointers are a pre-existing class across the token files (dark-arm.css:32/:51/:60/:82, light-dark.css:70/80/92, story-hero.css:52-54/:85-87), not the ruled figure class; re-pointing one would be an ad-hoc addendum. Listed for the driver. |
| CT2-B-5 (offsets.css strikes leave "setting ~~either token~~ directly on" without an object and "desktop widths" describing a block cap) | CURE | In fence (the routed :26-32 residue). The amended prose must scan and be true: the cap is `min(80vh, 48rem)`, the token `--dock-max-block-size`. Cure 9, comment only. |
| CT2-B-6 (brackets say `O-32 CT2` where others cite a row id) | DISMISS | No house law names the label; `CT2 residue` and `Stale-L16 class (at CT2 …)` are the RULINGS items' own names, and one label over the whole class keeps it greppable. The new brackets keep `O-32 CT2`. |
| CT2-B-7 (rows 1-3 landed; MIGRATION/CHANGELOG untouched) | DISMISS | Confirmation. |
| Implement's porcelain claim ("only the six fenced modifications plus CT2/") | DISMISS | True at the implement return; R2's MIGRATION/CHANGELOG/DESIGN rows have since appeared in the shared tree. RECORD's Footprint states whose they are (cure 10c). |

Dictated cures are the numbered list in the adjudication return (the workflow's structured output): the spec `rm`, the :84 and panel brackets, the twelve-site bracket pass (short form `~~L16~~ [2026-09-22 · O-32 CT2: L17, hsl(26 22% 17%)]`, comments only, no `--card:` shape inside any comment), the offsets.css rewrap, and this RECORD's Row 2 / Row 4 / Footprint / FOR THE DRIVER truing. An Opus seat applies them in order and appends `## Cure [2026-09-22]` with the per-site census and the runs. `clean=false`.

Driver items (outside CT2's fence): (1) `src/composables/color/accent-tone-solve.ts:27` `DEFAULT_SURFACE = "hsl(36 48% 97%)"`—a runtime default seeded from the struck light card, its :21 docblock naming that figure as `tokens/color-radius.css`'s value; the shipped card is hsl(30 85% 96%); every `use-accent-tone` row passes `surface` explicitly, so no test row exercises the default. A code literal, so outside the comments-only widening; the driver rules whether it rides 10.0.0 (one literal + one docblock line, or a read of the token bytes). (2) `tests-visual/no-gray.spec.ts:287`—the failure-message literal `(over the L16 card)`, one word, not a comment. (3) The stale LOCKSTEP line-pointer class above—pre-existing, unruled, listed only.

## Cure [2026-09-22]

Opus seat (`claude-opus-5-5[1m]`). Applied the eleven dictated cures from adjudication round 1, in order; nothing else changed. Comments only in every source file: no declaration, assertion, window or string literal moved. Line numbers are the working tree before the cures → after. The short bracket `B` below is `[2026-09-22 · O-32 CT2: L17, hsl(26 22% 17%)]`.

| # | site (before → after) | before | after |
| --- | --- | --- | --- |
| 1 | `src/styles/tokens/dark-arm.css:45` → `:45-46` | `LIFTS (L10→L16, below) so the` | `LIFTS (L10→~~L16~~` / `[2026-09-22 · O-32 CT2: L17, hsl(26 22% 17%); card/page relL ≈ 8×, measured], below)` / `so the page↔card …` (`:47-49` untouched) |
| 2 | `dark-arm.css:84-86` → `:85-89` | `LIFTS L10→L16 … LOCKSTEP light-dark.css:80. */` | `LIFTS L10→~~L16~~ …` + `[2026-09-22 · O-32 CT2: L17—the card ships hsl(26 22% 17%); card/page relL ≈ 8×, not ~5× (measured over the L4 page hsl(24 9% 4%)).] */` |
| 3 | `dark-arm.css:90-96` → `:93-99` (panel) | `(24→36) + +1 sat + +2 L` … `(:87)—the L17 card; the panel's L18 still sits one step above it.]` | `~~(24→36) + +1 sat + +2 L~~` … `(the `--card` declaration above)—the L17 card; from it the panel hsl(36 9% 18%) is H 26→36, S −13, L +1, one step above.]` |
| 4 | `dark-arm.css:166` → `:169-170` | `(too close to the L16` / `glass plate)` | `(too close to the ~~L16~~` / `B glass plate) …` (the paragraph's remaining lines rewrapped to its width, text unchanged) |
| 5 | `dark-arm.css:282` → `:285-286` | `lifted luminous-dark plate (the L16 card` | `lifted luminous-dark plate` / `(the ~~L16~~ B card` |
| 6 | `dark-arm.css:314` → `:318-319` | `lift off the L16 card is preserved) — the ink …` | `lift off the ~~L16~~ B card is` / `preserved) — the ink …` |
| 7 | `src/styles/tokens/light-dark.css:83` → `:83-84` | `lifted L16 --card sits ~5× its relL — a real dark elevation step.` | `lifted ~~L16 --card sits ~5× its relL~~ [2026-09-22 · O-32 CT2: L17 --card, hsl(26 22% 17%), sits ≈8× its relL (measured)] — a real dark elevation step.` |
| 8 | `light-dark.css:104` → `:105-106` | `/* The dark --card plate LIFTS L10→L16 (LOCKSTEP` | `/* The dark --card plate LIFTS L10→~~L16~~` / `B (LOCKSTEP` |
| 9 | `light-dark.css:107-108` → `:109-112` | `warm-cream plate hsl(36 48% 97%) (LOCKSTEP color-radius.css --card)` | `warm-cream plate ~~hsl(36 48% 97%)~~ [2026-09-22 · O-32 CT2: hsl(30 85% 96%), the light arm of the `--card` declaration below and color-radius.css] (LOCKSTEP color-radius.css --card)` |
| 10 | `src/styles/tokens/sizing-config.css:64` → `:64-65` | `--card L16): those` | `--card ~~L16~~` / `B): those` |
| 11 | `sizing-config.css:73` → `:74-75` | `(L34 over the L16 plate` | `(L34 over the ~~L16~~` / `B plate` |
| 12 | `demo/chassis/hero/story-hero.css:10` → `:10-11` | `LIFTED L16 surface and the page is the deepened L4 floor` | `LIFTED ~~L16~~ B surface and the` / `page is the deepened L4 floor` |
| 13 | `tests-visual/no-gray.spec.ts:239` → `:239-240` | `over the dark L16 card carries` | `over the dark ~~L16~~ B` / `// card carries` |
| 14 | `no-gray.spec.ts:260` → `:261-262` | `over the dark --card (the L16 plate the` | `(the ~~L16~~` / `// B plate the` |
| 15 | `tests-visual/glass-identity.spec.ts:125` → `:125-126` | ``dark `--card` hsl(24 8% 16%), the luminous-dark lift)`` | ``dark `--card` ~~hsl(24 8% 16%)~~ [2026-09-22 · O-32 CT2: hsl(26 22% 17%); the [0.1, 0.55] window holds], the luminous-dark lift)`` |

Rows 1 and 4-15 are the stale-L16 class the adjudicator's grep measured (cures 4-8: thirteen sites); rows 2-3 are cures 2-3. Every touched comment line sits within its block's existing width. The `no-gray.spec.ts` failure-message literal moved `:287` → `:289` with the two comment lines above it; it is untouched (driver item). [2026-09-22 · adjudication r2: cured, `L16` → `L17`, cure round 2.]

- **Cure 1—the retired spec.** `rm tests-visual/dock-wrap-content-driven.spec.ts` (no git command; the porcelain row is ` D`). `ls` → `No such file or directory`; `grep -rn dock-wrap-content-driven package.json .github scripts tests tests-visual/*.ts` → 0 hits.
- **Cure 9—`src/styles/tokens/offsets.css:29-31` → `:30-33`.** `capped at ~~sensible` / `desktop widths~~ 48rem; consumers override per-dock by setting ~~either` / ``token~~ `--dock-max-block-size` directly on a `.glass-dock` instance.`` / `User findings 1 + 5a.` The CT2 bracket after it, AC2's `[2026-09-22 · O-32 AC-D-1]` bracket and the declaration are untouched; the touched lines run 76/78/76/28 columns in a block whose widest line is 79.
- **Cure 10—this RECORD.** Row 2 and Row 4 carry the adjudication brackets (Row 4's closing sentence struck); Footprint is the post-cure porcelain plus the R2 sentence; FOR THE DRIVER's three bullets are struck, the ruling bracket follows them, and the three driver items are added.

Runs (cure 11):

- `timeout 600 npx vitest run tests/composables/color/use-accent-tone.test.ts tests/styles/contrast-computed.test.ts tests/components/custom/dock/g-dock-lattice.test.ts tests/gates/comment-ratio.test.ts tests/gates/token-hygiene.test.ts tests/gates/gate-register.test.ts tests/styles/proportion-register.test.ts tests/styles/layout-canon.test.ts tests/demo/skip-link.a11y.test.ts --testTimeout=60000` → `Test Files 9 passed (9) · Tests 239 passed | 5 expected fail (244)`. gate-register green: gates stay 60.
- `grep -nE '^\s*--card:' src/styles/tokens/color-radius.css src/styles/tokens/dark-arm.css src/styles/tokens/light-dark.css` → three hits, the declarations only: `color-radius.css:78` hsl(30 85% 96%), `dark-arm.css:90` hsl(26 22% 17%), `light-dark.css:113` `light-dark(hsl(30 85% 96%), hsl(26 22% 17%))`. No bracket wrote a `--card:` shape.
- `grep -c '(:87)' src/styles/tokens/dark-arm.css` → 0.
- `grep -rnE 'L16|36 48% 97%|24 8% 16%' src demo tests tests-visual scripts` → 23 hits; every one sits inside `~~…~~` or a dated bracket (the CT2 brackets, CT's `color-radius.css:67/:75` §2.2 strikes, the `use-accent-tone.test.ts:46-47` fixture bracket), except the three driver-routed sites: `accent-tone-solve.ts:21`, `:27` and `no-gray.spec.ts:289` (was `:287`).
- `grep -rn ' — \[2026-09-22 · O-32 CT2' src demo tests tests-visual` → 0.
- No build ran; `dist/`, `.published-roster`, `.bundle-ratchet`, `package.json` and `tests/gates/` untouched. No git add/commit/stash/checkout/reset/clean. The post-cure porcelain is the Footprint block above.

## Adjudication round 2 [2026-09-22]

Adjudicator: Fable (`claude-fable-5-1`), read-only over the tree; this section is the one write. Datum at adjudication: master `7f1aebc9`—the driver's "CT2 round-2 rulings" landed AFTER the cure seat returned and bind this lane: (a) `accent-tone-solve.ts:27` `DEFAULT_SURFACE` CURE in CT2 (the constant + its :21 docblock join the fence; the default reads the shipped card hsl(30 85% 96%); a born-RED test row binds it to the token file's `--card` light value, parsed, never a second literal; the CHANGELOG Fixed line is R2's while R2 is in a cure round); (b) `no-gray.spec.ts` failure-message literal "L16" → "L17" CURE in CT2 (a string is not exempt from the figure class); (c) the stale `LOCKSTEP <file>:<line>` pointer class CURE in CT2, comments only, each pointer naming its twin by TOKEN NAME, never a line number; (d) the "~5×" multiplier is measured 8.2×—DESIGN.md and the LEDGER carry 8× (R2 / AUTHOR); (e) `git rm` of the retired spec is the driver's at CT2's commit. Read in full: RULINGS.md, the CT/DA/AC1/AC2 RECORDs, this RECORD through the Cure section, the live diff of every CT2 path. The four sibling RECORDs were re-read from the repo with `sed` after the harness persisted their first read outside the repo; nothing under `~/.claude` was opened.

Re-measured: the eleven round-1 cures are on disk as dictated (the spec is ` D` in the porcelain; `(:87)` → 0 hits; the fifteen bracketed comment sites match the Cure table; the offsets.css block scans and its widest touched line is 78 columns; no `--card:` shape inside any comment—the declaration grep returns the three declarations only). `npx vitest run use-accent-tone + gate-register + comment-ratio + token-hygiene + contrast-computed` → 5 files, 148 passed | 1 expected fail; gates stay 60. The card/page relL from the shipped bytes: page hsl(24 9% 4%) 0.00310, card hsl(26 22% 17%) 0.02530, ratio 8.17× (the struck card 7.11×). The stale-figure census (`grep -rnE 'L16|36 48% 97%|24 8% 16%' src demo tests tests-visual scripts`) → 23 hits, every one struck or bracketed except the three sites ruled at 7f1aebc9: `accent-tone-solve.ts:21/:27` and `no-gray.spec.ts:289`. The pointer census (`grep -nE '(dark-arm|light-dark)\.css:[0-9]'` over the token files + story-hero.css) → ten pointer sites, none by token name: dark-arm.css:49 (`light-dark.css:70/80`), :82 (`:92`), :87 (`:80`), :97 (`:82`), :109 (`:84`); light-dark.css:82 (`dark-arm.css:32`), :102 (`:60`), :107 (`:51`), :118 (`:59`); story-hero.css:12 (`tokens/dark-arm.css:52-54, :85-87`). No test asserts a pointer's text (`grep LOCKSTEP tests tests-visual` hits only titles and unrelated dock prose). R2's RECORD is at its implement return (no adjudication section), so R2 is in a cure round and the DEFAULT_SURFACE CHANGELOG line is R2's.

Found while re-reading the lane's own amended blocks: `dark-arm.css:48` `(card/page relL ≈ 5×, the five glass` and `:86` `so it sits ~5× the deepened L4 page relL` stand unstruck two lines from the lane's own brackets that say ≈ 8×. The same class as CT-A-04 (a bracket that contradicts the prose it sits in); in fence; comment only.

| finding | verdict | reason |
| --- | --- | --- |
| Round-1 cures 1-11 as applied | DISMISS | Landed as dictated and re-measured above; nothing to cure. |
| CT2-A-1 / CT2-B-4 (the stale card-figure census; the twin) | DISMISS | Cured in round 1 (cures 4-8); the census grep confirms every comment site struck and bracketed. |
| CT2-A-2 (the `(24→36) + +1 sat + +2 L` delta) | DISMISS | Cured (cure 3); the panel's delta is stated from the shipped card. |
| CT2-B-1 (the retired spec in the tree) | DISMISS | Cured (cure 1); the porcelain row is ` D`; `git rm` is the driver's at the commit (ruling (e)). |
| CT2-B-2 (:84 unbracketed; the `(:87)` pointer) | DISMISS | Cured (cures 2-3); the pointer is by name. |
| CT2-B-3 (RECORD stale against the rulings) | CURE | Cured for the 713d48ce rulings in round 1, but the three FOR THE DRIVER items the round-1 cure added are now ruled CURE at 7f1aebc9 and the record must be true at the close. Cure 6. |
| CT2-B-4, the pointer re-point (`LOCKSTEP light-dark.css:82` → the twin) | CURE | My round-1 DISMISS is overturned by the driver at 7f1aebc9 (c): the pointer-rot class is CT2's, comments only, by token name, no deferral. Ten sites measured. Cure 4. |
| CT2-B-5 (the offsets.css strikes) | DISMISS | Cured (cure 9); the sentence scans and names `--dock-max-block-size` and 48rem. |
| CT2-B-6 (the `O-32 CT2` label) | DISMISS | Stands from round 1; no house law names the label. |
| Ruling (a): `DEFAULT_SURFACE` seeded from the struck light card | CURE | Ruled at 7f1aebc9; not on disk (the cure seat ran before the ruling). Witness first, born-RED against the literal; the constant and the :19-21 docblock follow. Cures 1-2. |
| Ruling (b): `no-gray.spec.ts:289` `(over the L16 card)` | CURE | Ruled at 7f1aebc9; one word in a string, no strike or bracket inside a failure message. Cure 3. |
| Ruling (d): the ~5× multiplier | CURE in fence + DRIVER | The lane's own unstruck `5×` at dark-arm.css:48/:86 is cured (cure 5); DESIGN.md and the LEDGER are R2's / AUTHOR's (DESIGN.md quotes no 5× at HEAD; the LEDGER is AUTHOR's bracket pass). |
| Cure-seat note: "10 M rows plus the D, not the twelve" | DISMISS | The seat's count is right; my "twelve" counted bracketed sites across files, not porcelain rows. Recorded here; the Footprint is the measured porcelain. |
| Cure-seat note: the `:287` → `:289` move | DISMISS | Correct and recorded; the ruling's `:287` is the pre-cure line and cure 3 names the text, not the line. |
| Cure-seat note: persisted read outputs under `~/.claude` not opened | DISMISS | The harness wrote them; the seat re-read from the repo, as did this round. Not a defect. |
| The DEFAULT_SURFACE CHANGELOG Fixed line | DRIVER | Ruling (a): R2's while R2 is in a cure round—R2's RECORD has no adjudication section yet. The sentence is in the driver items. |

Dictated cures are the numbered list in the adjudication return (the workflow's structured output): the DEFAULT_SURFACE witness (born-RED) then the literal + docblock; the one-word string; the ten pointer re-points by token name (comments only, dated brackets); the two `5×` strikes; this RECORD's truing (FOR THE DRIVER, Cure table, Footprint) and a `## Cure round 2 [2026-09-22]` section with the RED/GREEN and the runs. `clean=false`.

Driver items: (1) the CHANGELOG `## 10.0.0` Fixed line for R2's cure round—"`useAccentTone` / `solveAccentInk`: with no `surface` passed, the JS-side band solve seeds from the shipped light `--card` hsl(30 85% 96%) (it read the retired hsl(36 48% 97%)); an ink solved over the default band may shift by a hair. `use-accent-tone.test.ts` binds the default to the token file."; (2) the 8× multiplier in the LEDGER / DESIGN.md palette block where quoted (ruling (d); DESIGN.md quotes no 5× at HEAD); (3) `git rm tests-visual/dock-wrap-content-driven.spec.ts` at CT2's commit; CT2's pathspec is the porcelain's eleven M rows (the ten above plus `src/composables/color/accent-tone-solve.ts`) and the D row; MIGRATION.md, CHANGELOG.md, DESIGN.md, `demo/stories/data/metric.vue`, the O-20 LEDGER and `R2/` are R2's.

## Cure round 2 [2026-09-22]

Opus seat (`claude-opus-5-5[1m]`). Applied the seven dictated cures from adjudication round 2, in order; nothing else changed. The short bracket `P` below is `[2026-09-22 · O-32 CT2: twin by token name]`. Heading per dictated cure 6(d) (the more specific form; the round-1 section keeps `## Cure`).

**Cure 1—the DEFAULT_SURFACE witness, born-RED.** `tests/composables/color/use-accent-tone.test.ts:234-247`: the dictated `it("the JS-side default surface is the shipped light --card (read from the token file)")` with its three-line BORN-RED comment, directly before `it("an unparseable concrete tone fails explicitly")`. It parses `DEFAULT_SURFACE` out of `accent-tone-solve.ts`, compares it to `LIGHT_CARD` (the fixture's `shippedCard()` read of `color-radius.css`'s `--card`, never a second literal), and checks that `solveAccentInk(tone)` equals `solveAccentInk(tone, { surface: LIGHT_CARD })`. RED with `accent-tone-solve.ts` at HEAD bytes (`git diff --quiet` → clean), `timeout 600 npx vitest run tests/composables/color/use-accent-tone.test.ts`:

```
     × the JS-side default surface is the shipped light --card (read from the token file) 3ms
AssertionError: expected 'hsl(36 48% 97%)' to be 'hsl(30 85% 96%)' // Object.is equality
      Tests  1 failed | 10 passed (11)
```

**Cure 2—`src/composables/color/accent-tone-solve.ts`.** (a) `:27` → `:29` `const DEFAULT_SURFACE = "hsl(30 85% 96%)";`. (b) The docblock `:20-21` → `:20-23`: ``* ~~`hsl(36 48% 97%)`~~ `hsl(30 85% 96%)` [2026-09-22 · O-32 CT2: the shipped light card;`` / ``* `use-accent-tone.test.ts` binds this literal to the token file's `--card` declaration]).`` / `* DOM-free + deterministic (SSR-safe): the leaf cannot read the`; the `live `--card` token without a DOM …` lines untouched. No export added; nothing else moved (`git diff`: 6 lines, +4/−2). GREEN:

```
 Test Files  1 passed (1)
      Tests  11 passed (11)
```

`grep -n '36 48% 97%' src/composables/color/accent-tone-solve.ts` → one hit, `:21`, inside `~~…~~`; `grep -c 'DEFAULT_SURFACE = "hsl(30 85% 96%)"'` → 1.

**Cure 3—`tests-visual/no-gray.spec.ts:289`.** In the `expect(chipOk.H, …)` failure-message template literal, `(over the L16 card)` → `(over the L17 card)`. One word; no strike or bracket inside the string. `grep -c 'L16 card'` → 0; `grep -c 'over the L17 card'` → 1.

**Cure 4—the ten LOCKSTEP pointers, by token name.** Comments only; each touched line rewrapped to its comment block's width (the widest untouched line in the block, or the original line's width where that was wider), with `P` and the struck `` ~~`:52-54, :85-87`~~ `` kept whole on one line. Declarations untouched. Line numbers are the working tree before → after.

| # | site (before → after) | before pointer | token name |
| --- | --- | --- | --- |
| a | `src/styles/tokens/dark-arm.css:49` → `:49-50` | `LOCKSTEP with light-dark.css:70/80` | `LOCKSTEP light-dark.css ~~:70/80~~ --neutral-0 / --card P` |
| b | `dark-arm.css:82` → `:83-84` | `LOCKSTEP light-dark.css:92` | `~~:92~~ --foreground P` |
| c | `dark-arm.css:87` → `:89-90` | `LOCKSTEP light-dark.css:80` | `~~:80~~ --card P` |
| d | `dark-arm.css:97` → `:100-104` | `(LOCKSTEP light-dark.css:82)` | `~~:82~~ --surface-public-data-panel P` |
| e | `dark-arm.css:109` → `:114-115` | `LOCKSTEP light-dark.css:84` | `~~:84~~ --primary P` |
| f | `src/styles/tokens/light-dark.css:82` → `:82-83` | `(LOCKSTEP dark-arm.css:32)` | `~~:32~~ --neutral-0 P` |
| g | `light-dark.css:102` → `:103-104` | `(dark-arm.css:60)` | `~~:60~~ --foreground P` |
| h | `light-dark.css:106-107` → `:108-110` | `(LOCKSTEP` / `dark-arm.css:51)` | `~~:51~~ --card P` |
| i | `light-dark.css:118` → `:121-122` | `LOCKSTEP dark-arm.css:59` | `~~:59~~ --primary P` |
| j | `demo/chassis/hero/story-hero.css:12` → `:12-16` | ``(`tokens/dark-arm.css:52-54, :85-87`)`` | `` (`tokens/dark-arm.css` ~~`:52-54, :85-87`~~ `--neutral-0` / `--card` P) `` |

Two rewraps carried into the rest of their paragraph, text unchanged, because a one-line split left a one-word orphan: (d) the CT2 panel bracket after it reflows to the block's 82 columns (`:101-104`); (j) the paragraph tail through `byte for byte. */` reflows to 88 columns (`:13-16`). `grep -rnE '(dark-arm|light-dark)\.css:[0-9]' src/styles/tokens demo/chassis/hero` → 0 (every pointer's line number now sits in `~~:NN~~` after a space); `grep -rnE 'LOCKSTEP (with )?[a-z-]+\.css:[0-9]' src demo` → 0.

**Cure 5—the two `5×` strikes, `src/styles/tokens/dark-arm.css`.** Comment only, in place, not rewrapped (the dictation names an in-place strike, so the two lines run 103/104 columns). (a) `:48` `(card/page relL ≈ 5×, the five glass` → `(card/page relL ≈ ~~5×~~ 8×, the five glass`. (b) `:86` → `:88` `so it sits ~5× the deepened L4 page relL` → `so it ~~sits ~5×~~ sits ≈ 8× the deepened L4 page relL`. `grep -nE '5×' src/styles/tokens/dark-arm.css src/styles/tokens/light-dark.css` → five hits: `dark-arm.css:48` and `:88` (inside `~~…~~`), `dark-arm.css:92` (the bracket's `not ~5×` clause), `light-dark.css:84` (inside `~~L16 --card sits ~5× its relL~~`), and `light-dark.css:8` `~1.5×` / `1.5×` (the touch-scale figure, not the relL multiplier—a regex false hit).

**Cure 6—this RECORD.** (a) FOR THE DRIVER: the three round-1-added bullets struck, the r2 ruling bracket after them. (b) Footprint: ` M src/composables/color/accent-tone-solve.ts` in sorted position; the trailing sentence unchanged. (c) The Cure table's `:287` → `:289` note gains the r2 bracket. (d) This section.

Runs (cure 7):

- `timeout 600 npx vitest run tests/composables/color/use-accent-tone.test.ts tests/styles/contrast-computed.test.ts tests/components/custom/dock/g-dock-lattice.test.ts tests/gates/comment-ratio.test.ts tests/gates/token-hygiene.test.ts tests/gates/gate-register.test.ts tests/styles/proportion-register.test.ts tests/styles/layout-canon.test.ts tests/demo/skip-link.a11y.test.ts --testTimeout=60000` → `Test Files  9 passed (9)` · `Tests  240 passed | 5 expected fail (245)` (round 1: 239 | 5; the +1 is the DEFAULT_SURFACE row; use-accent-tone 11). `node scripts/gate-register.mjs` → `seats:60 … drift:0 … violations:0`.
- `timeout 600 npx vue-tsc --noEmit` → exit 0; `timeout 600 npx vue-tsc --noEmit -p tsconfig.test.json` → exit 0.
- `grep -nE '^\s*--card:' src/styles/tokens/color-radius.css src/styles/tokens/dark-arm.css src/styles/tokens/light-dark.css` → the three declarations only: `color-radius.css:78` hsl(30 85% 96%), `dark-arm.css:93` hsl(26 22% 17%), `light-dark.css:116` `light-dark(hsl(30 85% 96%), hsl(26 22% 17%))`.
- `grep -rnE 'L16|36 48% 97%|24 8% 16%' src demo tests tests-visual scripts` → 22 hits, every one inside `~~…~~` or a dated bracket (`accent-tone-solve.ts:21`; `color-radius.css:67/:75`; `light-dark.css:84/:107/:112`; `dark-arm.css:45/:87/:97/:99/:175/:292/:324`; `sizing-config.css:64/:74`; `story-hero.css:10`; `use-accent-tone.test.ts:46/:47`; `no-gray.spec.ts:239/:261`; `glass-identity.spec.ts:125`). Zero driver-routed sites remain (round 1's 23 less the `no-gray.spec.ts:289` literal; `:27`'s code literal left the census and `:21` is now struck).
- The two pointer greps from cure 4 → 0 and 0. `grep -rn ' — \[2026-09-22 · O-32 CT2' src demo tests tests-visual` → 0.
- No build ran; `dist/`, `.published-roster`, `.bundle-ratchet`, `package.json` and `tests/gates/` untouched. No git add/commit/stash/checkout/reset/clean. Nothing under `~/.claude` opened.

`git status --porcelain` at return:

```
 M CHANGELOG.md
 M DESIGN.md
 M MIGRATION.md
 M demo/chassis/hero/story-hero.css
 M demo/shell/configurator/PresetEditor.vue
 M demo/stories/data/metric.vue
 M demo/stories/dock/overview.vue
 M docs/tranches/BK/execution/2026-09-17-o20-disposition/LEDGER.md
 M src/composables/color/accent-tone-solve.ts
 M src/styles/tokens/dark-arm.css
 M src/styles/tokens/light-dark.css
 M src/styles/tokens/offsets.css
 M src/styles/tokens/sizing-config.css
 D tests-visual/dock-wrap-content-driven.spec.ts
 M tests-visual/glass-identity.spec.ts
 M tests-visual/no-gray.spec.ts
 M tests/composables/color/use-accent-tone.test.ts
?? docs/tranches/BK/execution/2026-09-22-o23-o32-disposition/CT2/
?? docs/tranches/BK/execution/2026-09-22-o23-o32-disposition/R2/
```

CT2's pathspec: the eleven M rows (`demo/chassis/hero/story-hero.css`, `demo/shell/configurator/PresetEditor.vue`, `demo/stories/dock/overview.vue`, `src/composables/color/accent-tone-solve.ts`, `src/styles/tokens/{dark-arm,light-dark,offsets,sizing-config}.css`, `tests-visual/{glass-identity,no-gray}.spec.ts`, `tests/composables/color/use-accent-tone.test.ts`), the D row (`git rm` is the driver's) and `CT2/`. `MIGRATION.md`, `CHANGELOG.md`, `DESIGN.md`, `demo/stories/data/metric.vue`, the O-20 LEDGER and `R2/` are R2's.

## Adjudication round 3 [2026-09-22]

Adjudicator: Fable (`claude-fable-5-1`), read-only over the tree; this section is the one write. Datum at adjudication: master `9a584214` (HEAD `e853b327` + the driver's ruling commits `713d48ce`, `ef0e88ae`, `7f1aebc9`, `9a584214`; no new ruling has landed since the round-2 cure returned). Read in full: RULINGS.md, the CT/DA/AC1/AC2 RECORDs (re-read from the repo with `sed`; nothing under `~/.claude` opened), this RECORD through Cure round 2, the live diff of every CT2 path.

Re-measured, every figure this round's own: the nine-file run (`use-accent-tone`, `contrast-computed`, `g-dock-lattice`, `comment-ratio`, `token-hygiene`, `gate-register`, `proportion-register`, `layout-canon`, `skip-link.a11y`, `--testTimeout=60000`) → `Test Files 9 passed (9)` · `Tests 240 passed | 5 expected fail (245)`; `node scripts/gate-register.mjs` → `seats:60 … drift:0 … violations:0`; `vue-tsc --noEmit` exit 0 and `-p tsconfig.test.json` exit 0. `accent-tone-solve.ts:29` reads `const DEFAULT_SURFACE = "hsl(30 85% 96%)";`, the :21 docblock strikes the retired literal with the dated bracket, no export added; the witness's regex `/^const DEFAULT_SURFACE = "([^"]+)";$/m` matches that one line and compares it to `LIGHT_CARD` parsed from `color-radius.css`, so at HEAD's literal the row is RED by construction (the pasted `expected 'hsl(36 48% 97%)' to be 'hsl(30 85% 96%)'`) and it is GREEN now (11/11). `no-gray.spec.ts:289` reads `(over the L17 card)`; `L16 card` → 0 hits. The stale-figure census (`grep -rnE 'L16|36 48% 97%|24 8% 16%' src demo tests tests-visual scripts`) → 22 hits, every one inside `~~…~~` or a dated bracket, the same 22 sites Cure round 2 lists; the `^\s*--card:` grep → the three declarations only (`color-radius.css:78`, `dark-arm.css:93`, `light-dark.css:116`); `(:87)` → 0; the two pointer greps (`(dark-arm|light-dark)\.css:[0-9]` over the token files + `story-hero.css`; `LOCKSTEP (with )?[a-z-]+\.css:[0-9]` over `src demo`) → 0 and 0; the ten re-pointed twins name the token the docblock discusses (`--neutral-0`/`--card`, `--foreground`, `--card`, `--surface-public-data-panel`, `--primary` ×2, `--neutral-0`, `--foreground`, `--card`); ` — [2026-09-22 · O-32 CT2` → 0. The card/page relL from the shipped bytes: page hsl(24 9% 4%) 0.00310, card hsl(26 22% 17%) 0.02530, 8.17× (the struck card 7.11×); `dark-arm.css:48/:88` carry `~~5×~~ 8×` / `~~sits ~5×~~ sits ≈ 8×`, the `5×` grep's only other hits are `dark-arm.css:92` (the bracket's `not ~5×` clause), `light-dark.css:84` (inside the strike) and `light-dark.css:8` `1.5×` (the touch-scale figure, a regex false hit). `offsets.css:26-40` scans (48rem, `--dock-max-block-size`) with AC2's bracket and the declaration untouched. `PresetEditor.vue` carries no `muted-foreground/`. `tests-visual/dock-wrap-content-driven.spec.ts` is absent from the tree (` D` in the porcelain) and a repo-wide grep over `*.ts|*.mjs|*.js|*.json|*.yml` finds the name only in `docs/tranches/AX|BI` ledgers (historical JSON, not bindings). `.published-roster`, `.bundle-ratchet`, `package.json`, `tests/gates/`, `dist/` untouched by the lane; gates stay 60. The porcelain is the block Cure round 2 prints (hash `762f661f…` before and after this seat, the RECORD being untracked under `CT2/`).

Formatting, measured because AC1's round 2 ruled on it: `prettier --check` on the six CT2 code files finds `accent-tone-solve.ts` and `PresetEditor.vue` clean (clean at HEAD too); `use-accent-tone.test.ts` (36 dirty lines at HEAD → 48 now: the two dictated statements over printWidth 88, the `throw` and the two-call `expect`), `no-gray.spec.ts` (104 → 104), `glass-identity.spec.ts` (46 → 46) and `overview.vue` (959 → 959) were prettier-dirty at HEAD. AC1's rule bound a HEAD-clean file ("a HEAD-clean file may not leave the lane dirty"); none of these was.

| finding | verdict | reason |
| --- | --- | --- |
| Round-2 cures 1-7 as applied (the born-RED `DEFAULT_SURFACE` row; the literal + docblock; the no-gray string; the ten pointers by token name; the two `5×` strikes; the RECORD truing) | DISMISS | On disk as dictated and re-measured above; RED reproduces by construction against HEAD's literal, GREEN 11/11 now. Nothing to cure. |
| CT2-A-1 / CT2-B-4 (the stale card-figure census; the LOCKSTEP twin's figure) | DISMISS | Cured in round 1; the census grep holds at 22 struck-or-bracketed sites, zero driver-routed. |
| CT2-A-2 (the `(24→36) + +1 sat + +2 L` delta) | DISMISS | Cured in round 1 (`dark-arm.css:98-104`). |
| CT2-A-3 / CT2-A-4 (confirmations) | DISMISS | Stand. |
| CT2-B-1 (the retired spec in the tree) | DISMISS | Cured in round 1; `git rm` is the driver's at the commit (ruling (e)). |
| CT2-B-2 (:84 unbracketed; the `(:87)` pointer) | DISMISS | Cured in round 1 (`dark-arm.css:87-92`; the pointer is by name). |
| CT2-B-3 (RECORD stale against the rulings) | DISMISS | Cured in rounds 1 and 2: every FOR THE DRIVER bullet is struck under the ruling that resolved it, the Footprint is the measured porcelain with R2's rows attributed, Cure round 2 carries RED/GREEN and the runs. |
| CT2-B-4, the pointer re-point | DISMISS | Cured in round 2 (ruling (c) at 7f1aebc9): ten sites, both greps 0. |
| CT2-B-5 (the offsets.css strikes) | DISMISS | Cured in round 1; scans and is true against `--dock-max-block-size: min(80vh, 48rem)`. |
| CT2-B-6 (the `O-32 CT2` label) | DISMISS | Stands from round 1; no house law names the label. |
| CT2-B-7 (confirmation) | DISMISS | Re-verified. |
| Ruling (a) `DEFAULT_SURFACE` | DISMISS | Cured in round 2 as ruled: the default reads the shipped card, the row binds it to the token file's `--card` (parsed, never a second literal), the docblock carries the dated bracket. |
| Ruling (b) the no-gray failure-message literal | DISMISS | Cured in round 2; one word, no strike inside the string. |
| Ruling (d) the `~5×` multiplier | DISMISS in fence; DRIVER beyond it | The lane's own `dark-arm.css:48/:88` are struck to the measured 8×; the LEDGER quotes no multiplier and no `L16` (grep), and the reply letter lives in the sibling coordination tree, not this repo—AUTHOR's post-R2 bracket pass carries 8× only where it quotes the figure. |
| Ruling (e) `git rm` of the retired spec | DRIVER | The lane's `rm` is done; the driver's act at CT2's commit. |
| The `DEFAULT_SURFACE` CHANGELOG Fixed line | DRIVER | R2's (7f1aebc9 (a), 9a584214 (c)); R2's adjudication round 1 rules it CURE at R2-B-F2 and CHANGELOG carries no such line yet—R2's cure round writes it. |
| Cure-seat judgement call: the `## Cure round 2` heading | DISMISS | The dictated heading (cure 6(d)); the round-1 section keeps `## Cure`. |
| Cure-seat judgement call: cure 5 in place, `dark-arm.css:48/:88` at 103/104 columns | DISMISS | In place was the dictation; an existing file, comment only, no width law, and the block already ran 96-97 columns at :47/:91. |
| Cure-seat judgement calls: the rewrap width rule; the paragraph reflows at `dark-arm.css:100-104` and `story-hero.css:12-16` | DISMISS | Text unchanged (the diff reads as a reflow of the same words); widths 82-83 and ≤ 88 respectively. |
| Cure-seat note: `light-dark.css:8` `1.5×` in the `5×` grep | DISMISS | A regex false hit on the touch-scale figure; correctly recorded. |
| Own: `use-accent-tone.test.ts` gains two statements over printWidth 88 | DISMISS | The file was prettier-dirty at HEAD (36 lines), so AC1's HEAD-clean rule does not bind and formatting the whole file would touch HEAD bytes outside any ruling; no gate or CI checks formatting. Recorded for the driver, who may `prettier --write` it at the close as housekeeping. |
| Own: `MIGRATION.md:4093` quotes `36 48% 97%` / dark `24 8% 16%` for `--card` | DRIVER | A palette table under `## Recommended new surfaces (best-practice, not strict migration)` › `### The warm-chroma floor — the neutral ladder + glass plate off gray (BA.W-NO-GRAY)`: the values as they stood at the BA cut, history like the 1.28:1 prose; R2's file, not CT2's. Stands as history unless the driver rules a bracket. |
| Own: `docs/tranches/AX|BI` JSON ledgers name `dock-wrap-content-driven.spec.ts` | DISMISS | Historical tranche records, not bindings; no script, gate, workflow or manifest reads them for the name (the ruled census over package.json/.github/scripts/tests/tests-visual holds at 0). |

Dictated cures: none. `clean=true`. Lane CT2 is CLEAN at round 3.

Driver items: (1) `git rm tests-visual/dock-wrap-content-driven.spec.ts` at CT2's commit; CT2's pathspec is the eleven M rows (`demo/chassis/hero/story-hero.css`, `demo/shell/configurator/PresetEditor.vue`, `demo/stories/dock/overview.vue`, `src/composables/color/accent-tone-solve.ts`, `src/styles/tokens/{dark-arm,light-dark,offsets,sizing-config}.css`, `tests-visual/{glass-identity,no-gray}.spec.ts`, `tests/composables/color/use-accent-tone.test.ts`), the D row and `CT2/`; `MIGRATION.md`, `CHANGELOG.md`, `DESIGN.md`, `demo/stories/data/metric.vue`, the O-20 LEDGER and `R2/` are R2's. (2) The CHANGELOG `## 10.0.0` Fixed line for `useAccentTone` / `solveAccentInk` (the sentence in Adjudication round 2's driver items)—R2's cure round (R2-B-F2). (3) Ruling (d): the LEDGER quotes no multiplier; the reply letter (sibling coordination tree) carries 8× only where it quotes one—AUTHOR's bracket pass. (4) `MIGRATION.md:4093` is history under the BA.W-NO-GRAY heading; R2's file if the driver wants a bracket. (5) The ratchet rebind at the close absorbs `accent-tone-solve.ts` (a same-length literal, no export, no roster delta) with the rest (§B-3). (6) Optional housekeeping at the commit: `prettier --write tests/composables/color/use-accent-tone.test.ts` (HEAD-dirty already; two of the lane's statements over 88 columns).
