# Lane CT—contrast-tokens cures (O-23/O-32 disposition, 2026-09-22)

Lane CT (Opus, `claude-opus-5-5[1m]`). Rows: A-1, A-3, §2.1 residue (Metric delta), §2.2 comment figures, L-4 residue (Configurator alpha text). Fence: RULINGS §C row "CT". Nothing committed: the driver commits by pathspec.

## Datum

master `e5ac97f2` (the 10.0.0 tree, clean at lane start). Sibling lanes DA/AC1/AC2/AUTHOR were editing the same working tree at the same time. Their paths appear in `git status` and are not part of this footprint.

## Rows → what changed

### A-1—`.glass-capsule-track` joins the -strong binding
- `src/styles/glass/ladder.css:234` → `:236`: `:where(.feedback-tone, .glass-capsule) {` → `:where(.feedback-tone, .glass-capsule, .glass-capsule-track) {`.
- `ladder.css:224` docblock: a dated bracket names the track, with the measured 3.48→5.34:1.
- Paint: inactive pill label, light, over the quiet track on --card: 3.48 → 5.34. Dark: 5.03 → 8.05. The active label is unchanged.

### A-3—underline inactive label takes `--muted-foreground`, guarded
- `src/components/tabs/styles/segmented.css:396-405` (new; the rule itself at `:403`, placed before the underline `:hover` rule, now at `:407`): `.segmented-tabs--underline .segmented-tab:not([data-active]) { color: var(--muted-foreground); }` plus a docblock that states why the guard is needed and why it goes before `:hover`.
- Paint: light 4.36/4.20 → 5.22/5.02 (bg/card). Dark 6.75/4.76 → 7.71/5.44. Active and hover inks are unchanged (probe below).

### §2.1 residue—the Metric delta stops painting in a status tone
- Markup measured (`Metric.vue`): the delta is one `<span class="metric__delta" :data-polarity>` holding `{{ deltaReading.display }}`. There is no glyph, sign mark or plate. `coalesceMetric` returns `String(value)`, so a rise rendered as an unsigned `3` and green was its only polarity. **Shape chosen (the ruling's second branch):** the number and its sign carry polarity, and no tone rides the text.
  - `src/components/metric/styles.css:85-102` (`.metric__delta` at `:95`): `.metric__delta` `color: var(--muted-foreground)` → `color: var(--foreground)`. The two rules `.metric__delta[data-polarity="up"] { color: var(--success) }` and `[data-polarity="down"] { color: var(--destructive) }` (`:99-105` at the datum) are **deleted**. The docblock gets a dated bracket. `data-polarity` stays on the node so a consumer can compose a mark beside it.
  - `src/components/metric/Metric.vue:31-44` (`deltaReading` at `:34`): `deltaReading` now signs a numeric rise: a number > 0 that is not empty displays `+${display}`. Compact keeps the sign (`+12.4K`). A string delta passes through untouched. `-3` and `0` are unchanged. [2026-09-22 · adjudication r1: the sign is shaped by the seam (`CoalesceMetricOptions.signed`); `Metric.vue` passes `signed: true`]
  - `src/components/metric/README.md:31-37`: the "status ink" sentence gets a dated bracket.
- Paint: up-delta 3.30 (`--success`) → `--foreground` on --card. Down-delta 4.53 (`--destructive`) → `--foreground`. Flat moves from `--muted-foreground` to `--foreground` (the ruling says "the delta text takes `--foreground`").

### §2.2—stale figures in the `color-radius.css` comments (comments only)
- `src/styles/tokens/color-radius.css:67-68` → `:67-72`: `hsl 36 48% 97% → OKLab C 0.0062 at warm H 75°, L kept ~98` is struck. The dated bracket reads: hsl(30 85% 96%) → OKLab C 0.0148 at H 67.7°, L 0.974 within 0.013 of the page's L 0.987 (C 0.0029); split by warmth, not lightness; a plate is set off by its edge rung and cast.
- `:71` → `:75-76`: the dark `hsl(24 8% 16%)` is struck, and the bracket gives `hsl(26 22% 17%)`.
- `:127-129` → `:132-137`: `contrast 1.28:1` is struck. The bracket says that figure reproduces on no token ground, and that as a token pair `--border` computes 1.87:1 on --card and 1.94:1 on --background. The two new figures are enrolled as §5 claims. The struck 1.28 names no literal it could be held against, so it is struck and not enrolled.
- No declaration changed. No `--token: value;` shape was written into a comment (the test's `declarations()` regex reads comments too).

### L-4 residue—Configurator alpha-muted text drops the alpha
- `src/components/configurator/ConfiguratorRow.vue:149`: `text-muted-foreground/70` → `text-muted-foreground` (the mono `name`).
- `ConfiguratorRow.vue:169`: `text-muted-foreground/80` → `text-muted-foreground` (the description).
- `src/components/configurator/ConfiguratorLayer.vue:136`: `text-muted-foreground/70` → `text-muted-foreground` (the layer `sub`).
- The `/60` reset button (`ConfiguratorRow.vue:158`, content is an aria-hidden icon) is kept, as ruled. The EasingCurve aria-hidden numerals are outside the fence and untouched.
- Paint on --card: /70 2.82 → 5.01 (light), 3.45 → 5.43 (dark). /80 3.38 → 5.01 (light).

## Witnesses (born-RED → GREEN)

All witnesses are test rows in the ordinary `npm test` tree. None is under `tests/gates`, and no seat or receipt changed (B-2; gates stay 60).

**Engine note (in-fence, `tests/styles/contrast-computed.test.ts:124-152, :239-262`).** The file's resolver mixed every `color-mix()` in gamma sRGB. The segmented recipe is `color-mix(in oklab, …)` of two opaque inks, and read in sRGB it came out 0.04-0.05 low against Chromium (3.44 vs 3.48; 4.31 vs 4.36). The resolver now interpolates `in oklab` in OKLab. A mix toward `transparent` is identical in both spaces, and all 92 pre-existing rows stayed green across the change.

RED at the datum (un-cured code, witnesses written first):

```
 × A-1 · the inactive pill label clears 4.5:1 over the quiet track on --card [light]
AssertionError: inactive pill ink color-mix(in oklab, var(--muted-foreground), var(--glass-capsule-warm) 12%) over the quiet track on --card [light] computed 3.48:1: expected 3.4799230567040724 to be greater than or equal to 4.5
 × A-3 · the inactive underline label clears 4.5:1 on --background and --card [light]
AssertionError: inactive underline ink over --background [light] computed 4.36:1: expected 4.359697353138859 to be greater than or equal to 4.5
 × A-3 · the underline inactive rule is guarded and precedes the underline :hover
AssertionError: the guarded underline rule is declared: expected -1 to be greater than -1
 × L-4 · every Configurator muted text site clears 4.5:1 on --card [light]
AssertionError: ConfiguratorRow.vue color-mix(in oklab, var(--muted-foreground) 70%, transparent) over --card [light] computed 2.82:1: expected 2.815944407812485 to be greater than or equal to 4.5
 × L-4 · every Configurator muted text site clears 4.5:1 on --card [dark]
AssertionError: ConfiguratorRow.vue color-mix(in oklab, var(--muted-foreground) 70%, transparent) over --card [dark] computed 3.45:1: expected 3.446022215055976 to be greater than or equal to 4.5
 × "computes 1.87:1 on --card" (color-radius.css, light)
AssertionError: the claim string is still in src/styles/tokens/color-radius.css: expected '/* tokens/color-radius.css\n   §4 rad…' to contain 'computes 1.87:1 on --card'
 × "and 1.94:1 on --background" (color-radius.css, light)
AssertionError: the claim string is still in src/styles/tokens/color-radius.css: expected '/* tokens/color-radius.css\n   §4 rad…' to contain 'and 1.94:1 on --background'
 × carries a delta whose polarity it derives, and accepts an override
AssertionError: expected '3' to be '+3' // Object.is equality
 × paints the delta in --foreground and lets the number and its sign carry polarity (C-1)
AssertionError: expected '\n        flex: none;\n        color:…' to match /\bcolor:\s*var\(--foreground\);/
```

[2026-09-22 · adjudication r1: the seam witness, written first and run against the un-cured `coalesceMetric`:]

```
 × signs a positive NUMBER through the one seam, on both paths, and nothing else 6ms
 FAIL  tests/components/metric.contract.test.ts > metric value truth > signs a positive NUMBER through the one seam, on both paths, and nothing else
AssertionError: expected '3' to be '+3' // Object.is equality
```

The A-1 and A-3 dark arms already cleared at the datum (5.03; 6.75/4.76), so each row is RED on its light arm. The structural row "L-4 · the Configurator carries four muted text sites" pins the census and passes at both ends. It is not counted as a witness.

GREEN after the cures (`npx vitest run tests/styles/contrast-computed.test.ts tests/components/metric.contract.test.ts --reporter=verbose`):

```
 ✓ … §5 … > "computes 1.87:1 on --card" (color-radius.css, light) 0ms
 ✓ … §5 … > "and 1.94:1 on --background" (color-radius.css, light) 0ms
 ✓ … §8 … > A-1 · the inactive pill label clears 4.5:1 over the quiet track on --card [light] 12ms
 ✓ … §8 … > A-1 · the inactive pill label clears 4.5:1 over the quiet track on --card [dark] 8ms
 ✓ … §8 … > A-3 · the inactive underline label clears 4.5:1 on --background and --card [light] 1ms
 ✓ … §8 … > A-3 · the inactive underline label clears 4.5:1 on --background and --card [dark] 1ms
 ✓ … §8 … > A-3 · the underline inactive rule is guarded and precedes the underline :hover 1ms
 ✓ … §8 … > L-4 · the Configurator carries four muted text sites (sub, name, description, layer sub) 1ms
 ✓ … §8 … > L-4 · every Configurator muted text site clears 4.5:1 on --card [light] 1ms
 ✓ … §8 … > L-4 · every Configurator muted text site clears 4.5:1 on --card [dark] 1ms
 ✓ tests/components/metric.contract.test.ts > metric family contract > carries a delta whose polarity it derives, and accepts an override 29ms
 ✓ tests/components/metric.contract.test.ts > metric family contract > paints the delta in --foreground and lets the number and its sign carry polarity (C-1) 38ms
```

[2026-09-22 · adjudication r1: the seam witness after cures 2b-2e, `npx vitest run tests/components/metric.contract.test.ts tests/styles/contrast-computed.test.ts --reporter=verbose` → `Test Files 2 passed (2) · Tests 121 passed (121)`:]

```
 ✓ tests/components/metric.contract.test.ts > metric value truth > signs a positive NUMBER through the one seam, on both paths, and nothing else 1ms
```

Relevant files together (contrast-computed, metric contract, story-preview-card, proportion-register, mark-register): `Test Files 5 passed (5) · Tests 219 passed | 2 expected fail (221)`.

A full `vitest run` also ran once, unintentionally: a zsh glob error left the file filter empty. Result: 232/235 files, 2279 passed, 3 failed, none in this lane's surfaces:
- `gates/boot-graph` "dist-demo NEWER than every source": dist is stale against the edited sources. It is shared, and rebuilding is the driver's.
- `styles/glass-subtlety` and `components/custom/aurora/atoms`: `Test timed out in 5000ms` under sibling load. Run again in isolation, both timed out once more, on a different `it` in glass-subtlety.

## Typecheck

`npx vue-tsc --noEmit` → exit 0. `npx vue-tsc --noEmit -p tsconfig.test.json` → exit 0. This is the repo's `typecheck` script, run over the shared working tree with the sibling lanes' edits in it.

## Chromium paint probe (A-1 + A-3 guard)

Playwright Chromium, `getComputedStyle`. The fixture is the real token files (property-regs, color-radius, glass, glass-fx, on-glass-fg, then dark-arm last so `.dark` wins), glass-capsule.css, and ladder.css + segmented.css taken at the datum (`git show HEAD:`) and from the cured tree. DOM: a `.glass-capsule-track` pill strip on a `--card` block, and an underline strip. Script at `scratchpad/ct/probe.mjs`. Ratios were computed from the returned `oklab()`/`rgb()` values, with the track's `color(srgb … / α)` composited over the computed --card.

| arm | pill inactive / track-on-card | underline inactive bg / card | active (UA = PA) | underline hover / bg |
| --- | --- | --- | --- | --- |
| datum light | `oklab(0.568607 0.0185344 0.0472392)` 3.481 | same ink, 4.344 / 4.197 | `rgb(28, 25, 23)` | 6.325 |
| datum dark | `oklab(0.676245 0.0078846 0.0288509)` 5.029 | 6.748 / 4.758 | `rgb(233, 230, 226)` | 7.941 |
| cured light | `oklab(0.468183 0.0199744 0.0439275)` 5.341 | `rgb(124, 102, 80)` 5.197 / 5.021 | `rgb(28, 25, 23)` | 6.325 |
| cured dark | `oklab(0.806233 0.00399937 0.0170853)` 8.050 | `rgb(172, 160, 145)` 7.716 / 5.440 | `rgb(233, 230, 226)` | 7.941 |

The probe's page ground is `rgb(251, 250, 248)`, rounded to 8 bits, so its underline-on-bg figure sits about 0.02 under the unrounded 5.22.

**Guard check.** With the rule unguarded (`.segmented-tabs--underline .segmented-tab { color: var(--muted-foreground) }`), the ACTIVE underline tab computes `rgb(124, 102, 80)` light and `rgb(172, 160, 145)` dark: it is repainted muted. With the guarded rule it stays `rgb(28, 25, 23)` / `rgb(233, 230, 226)`, and hover is unchanged. The guard is load-bearing, which matches the verifier's probe.

## Roster delta

None. No export, subpath, utility, token or class name was added or removed. `data-polarity` still ships. ~~`coalesceMetric`'s signature and behaviour are unchanged: signing happens in `Metric.vue`'s delta reading only.~~ [2026-09-22 · adjudication r1: `CoalesceMetricOptions` gains `signed?: boolean`; option fields are not roster rows, so no roster delta; the driver's CHANGELOG names the addition] The bundle bytes of `metric/styles.css` (two rules deleted), `Metric.vue` and `segmented.css` (one rule added) move by a few dozen bytes. Rebinding `.bundle-ratchet` is the driver's job (B-3).

## Path corrections

None. Every ruled path exists at the datum. Line anchors moved as follows: the A-3 rule was ruled "before the underline `:hover` rule (:396)", and `:hover` was at `:396` at the datum. After the insert it is at `:407`.

## Out-of-fence residue (seen, not touched)

- `demo/stories/data/metric.vue:40` blurb: "paints as status ink on the neutral material". It is false after the §2.1 cure.
- `src/styles/tokens/dark-arm.css:91`: "--card's dark hsl(24 8% 16%)". This is the same stale figure as `color-radius.css:71`, but dark-arm.css is outside CT's fence (color-radius.css comments only).
- `src/components/metric/**` has no other reader of `--success` or `--destructive`.

## FOR THE DRIVER (R2 rows, MIGRATION-ready)

1. **MIGRATION `## 10.0.0` → `_`--success` and `--warning` darken in the light arm_` (MIGRATION.md:186-203)**: amend the reader list at `:200`. `Metric`'s up delta no longer reads `--success`, so strike it from "Everything that reads them goes darker". Suggested bracket: "`Metric`'s delta paints `--foreground` from 10.0.0 (see _`Metric`'s delta paints the one ink_ below)".
2. **MIGRATION `## 10.0.0`, new paint row `_`Metric`'s delta paints the one ink_`**: "`<Metric>`'s delta no longer paints its text in a status tone. `up` was `--success` (3.30:1 on `--card`, under 1.4.3's 4.5:1), `down` was `--destructive`, and `flat` was `--muted-foreground`. Every polarity now paints `--foreground`. A numeric rise is signed (`:delta="3"` renders `+3`, compact `+12.4K`). A string delta is still passed through as written. `data-polarity` stays on `.metric__delta`: to show the tone, compose a mark beside the number and key it on `[data-polarity]`. Do not recolour the text. Recipe: `.metric__delta[data-polarity="up"]::before { content: ""; … background: var(--success) }` in your own layer." `coalesceMetric` gains `signed?: boolean`, the option `<Metric>` uses for its delta. Also amend the 7.0.0 entry at MIGRATION.md:897 ("`delta` + `polarity` (status ink on the neutral material …)") with a dated bracket pointing at this row.
3. **CHANGELOG 10.0.0 (paint, non-breaking)** [2026-09-22 · adjudication r1: the Metric row (item 4) is rendered text + paint, non-breaking]: "`SegmentedTabs` pill: the inactive label on the `.glass-capsule-track` reads `--on-glass-muted-strong` (`.glass-capsule-track` joins the ladder's -strong `:where()`), 3.48 → 5.34:1 light on the quiet track over `--card` (O-32 A-1; fourier's `f45901e` local binding is redundant after the bump)." Then: "`SegmentedTabs variant="underline"`: the inactive label paints plain `--muted-foreground` and no longer carries the capsule's 12% warm, 4.36/4.20 → 5.22/5.02:1 light on `--background`/`--card` (O-32 A-3). The active and hover inks are unchanged." Then: "`ConfiguratorRow` name + description and `ConfiguratorLayer` sub drop their alpha (`/70`, `/80`): 2.82/3.38 → 5.01:1 on `--card` (O-23 L-4 residue)."
4. **CHANGELOG 10.0.0**: the Metric row from item 2, in short form, framed as rendered text + paint, non-breaking. [2026-09-22 · adjudication r1]
5. **Demo residue** (driver or the owning lane): `demo/stories/data/metric.vue:40` blurb → "A numeric delta carries its own polarity in its number and sign, painted in the one ink — never a tone on the text, never a coloured plate."
6. **dark-arm.css:91 comment**: the stale `hsl(24 8% 16%)` figure is outside this fence. It needs a dated bracket → `hsl(26 22% 17%)` (the same correction as color-radius.css:75).
7. **Reply letter (AUTHOR)**: A-1, A-3 and the L-4 residue landed as ruled. The Metric residue took the second branch (no glyph exists; number and sign carry polarity; positive deltas now render `+N`). The L-4 reply may say "three alpha-muted text labels, now cured". Do not say "the one".

## Adjudication round 1 [2026-09-22]

Adjudicator: Fable (`claude-fable-5-1`). Read: RULINGS.md in full (§A CT rows, §B, §C), the contrast-tokens investigator + verifier seats (the verifier's figures govern), both inbound letters on the five rows, the live diff of the CT fence, the two witness files (120/120 GREEN at the working tree, `b13a792e` on the `e5ac97f2` datum). Counted the ladder docblock's parens myself: HEAD 11/11, working tree 12/13. Verdict: NOT CLEAN—two cures, both inside the fence; nothing a challenger minted is adopted beyond what the rulings already dictate.

| finding | verdict | reason |
| --- | --- | --- |
| CT-A-01 (cures match rulings byte for byte) | DISMISS | Confirmation; verified against §A A-1/A-3/§2.1/§2.2/L-4 and the live diff. No defect. |
| CT-A-02 (mutation: every witness RED on revert) | DISMISS | Confirmation. No defect. |
| CT-A-03 (A-1/A-3 dark arms never RED) | DISMISS | The ruling asks for a row asserting both arms; born-RED is owed on the arm where the defect lived (light, 3.48 / 4.36) and was delivered. The dark `it`s are regression rows and RECORD says so. |
| CT-A-04 (ladder docblock contradicts itself) | CURE | The lane's own bracket breaks the prose it amends: the track IS the quiet plate (`glass-capsule.css:79-80`), so "These plates composite BRIGHTER than the calm quiet plate" can no longer cover it. Cure 1, merged with CT-B-02. |
| CT-A-05 (`+` follows the number's sign; reversed metric shows `+3` with polarity down) | DRIVER | Within the ruling: "the number and sign carry polarity"; `polarity` is the override for the mark a consumer composes on `data-polarity`, not a sign flip. No cure. The rendered-text point rides driver item 1. |
| CT-A-06 (resolver now interpolates `in oklab`) | DISMISS | In-fence engine correction; matches the Chromium probe to 0.002 (3.480/3.481, 5.339/5.341); all 92 pre-existing rows unchanged. No defect. |
| CT-A-07 (fence, gates 60, typecheck) | DISMISS | Confirmation. No defect. |
| CT-B-01 (census: every sub-clause cured or stated) | DISMISS | Confirmation. No defect. |
| CT-B-02 (stray `)` + the same contradiction + line width) | CURE | Counted: HEAD 11/11, working tree 12/13; the bracketed line runs 104 columns in a ~95-column block. Cure 1. |
| CT-B-03 (the `+` is shaped outside `coalesceMetric`; the seam's "nothing else" docblock is now false) | CURE | The ruling dictates the outcome (number and sign carry polarity), not the mechanism; the lane's mechanism forks the family's one shaping seam at the call site and leaves a public docblock false—an ad-hoc addendum against the file's own stated law and the KISS/one-source precept. The cure stays in `src/components/metric/**`, mints no roster row (option fields are not roster rows; `.published-roster` names neither `coalesceMetric`'s options nor `MetricPolarity`), and gets a born-RED witness. Cure 2. |
| CT-B-04 (RECORD residue list incomplete) | DRIVER | All six sites verified on disk (below). Every one is outside the CT fence and none is ruled by §A; the lane could not touch them and the challenger cannot mint the ruling. Listed for the driver in item 2. |
| CT-B-05 (the `+` is a rendered-text change, not paint-only) | DRIVER | Correct: `3` → `+3`, `12.4K` → `+12.4K` in DOM text. R2's MIGRATION/CHANGELOG Metric row says so, and the AUTHOR letter carries the sentence. Driver item 1. |
| CT-B-06 (segmented recipe docblock :285-298 needs a pointer bracket) | DISMISS | Beyond the ruling. After A-1/A-3 the docblock's outcome claim holds in paint on both variants (pill via the track's -strong rung, underline via plain `--muted-foreground`), and the lane's comment at :396-402 states the underline exception locally. Not a house-law breach. |
| CT-B-07 (fence, gates, tree as found) | DISMISS | Confirmation. No defect. |
| CT-B-08 (one spaced em dash at RECORD :133) | DISMISS | It is quoted text bound for `demo/stories/data/metric.vue:40`, whose house form is the spaced dash; RECORD's own prose is tight. |

### Dictated cures (Opus seat; exact, in order)

**Cure 1—`src/styles/glass/ladder.css`, the A-1 bracket (working-tree lines 224-227).** Replace the four lines from `       ink) [2026-09-22 · O-32 A-1: and the pill` through `       quiet plate (the quiet content plate lands L≈0.28; a tone-tinted / selected chip plate` with:

```
       ink). [2026-09-22 · O-32 A-1: the pill `SegmentedTabs` TRACK
       (`.glass-capsule-track`) joins for its own reason: it IS the quiet plate, over
       `--card`, and the recipe's 12% capsule warm left its inactive label at 3.48:1
       there; the -strong rung lifts it to 5.34:1.] The chip and tone plates composite
       BRIGHTER than the calm quiet plate (the quiet content plate lands L≈0.28; a
       tone-tinted / selected chip plate
```

Line 228 (`       lands L≈0.30-0.35), so a subordinate light ink …`) and everything else stays. Verify: over the docblock from `The on-glass MUTED lift` to the `:where(` line, `(` count equals `)` count; no line in 211-236 exceeds 95 columns; `npx vitest run tests/styles/contrast-computed.test.ts` stays 108/108.

**Cure 2—the delta's sign moves into the seam (`src/components/metric/**` + the metric witness).** Witness FIRST, run it RED, then (b)-(e), then GREEN.

(a) `tests/components/metric.contract.test.ts`: after the `it("compacts a NUMBER through the one seam, and leaves a string alone", …)` block (it closes at line 62) and before `it("reads polarity off a numeric delta, and off nothing else"`, insert:

```
    // BORN-RED (O-32 §2.1 residue, adjudication round 1). The delta's `+` is shaped by
    // the seam, never prefixed at a call site, so a consumer filling the delta slot
    // through the documented seam gets the reading <Metric> renders.
    it("signs a positive NUMBER through the one seam, on both paths, and nothing else", () => {
        expect(coalesceMetric(3, { signed: true }).display).toBe("+3");
        expect(coalesceMetric(-3, { signed: true }).display).toBe("-3");
        expect(coalesceMetric(0, { signed: true }).display).toBe("0");
        expect(coalesceMetric(3).display).toBe("3");
        expect(
            coalesceMetric(12400, { signed: true, compact: true, locale: "en-US" }).display,
        ).toBe("+12.4K");
        expect(coalesceMetric("+2%", { signed: true }).display).toBe("+2%");
        expect(coalesceMetric("3", { signed: true }).display).toBe("3");
        expect(coalesceMetric(Number.NaN, { signed: true, placeholder: "n/a" }).display).toBe("n/a");
    });
```

Run `npx vitest run tests/components/metric.contract.test.ts` and paste the RED line (expected `'3'` to be `'+3'`) into RECORD's Witnesses block.

(b) `src/components/metric/coalesce-metric.ts:14`, after `    locale?: string;`, add:

```
    /** A positive number takes a leading `+`—the delta, whose number and sign carry
        its polarity (O-32 §2.1). A negative already carries its sign; zero takes none. */
    signed?: boolean;
```

(c) same file, docblock lines 17-19. Before:

```
 * The family's ONE data-shaping seam. Every readout in the family — the atom's
 * value, its unit-bearing reading, its delta — passes through this and nothing
 * else, which is why "what counts as empty" has exactly one answer.
```

After:

```
 * The family's ONE data-shaping seam. Every readout in the family — the atom's
 * value, its unit-bearing reading, its delta — passes through this and nothing
 * else, which is why "what counts as empty" has exactly one answer. [2026-09-22 ·
 * O-32 §2.1: the delta's `+` is part of its reading, so `signed` is shaped here on
 * both the compact and the plain path—never a prefix at the call site.]
```

(d) same file, the `display` expression (lines ~55-60 after (b)). Before:

```
    const display =
        options.compact && typeof value === "number"
            ? new Intl.NumberFormat(options.locale, {
                  notation: "compact",
                  maximumFractionDigits: 1,
              }).format(value)
            : String(value);
```

After:

```
    const signed = options.signed === true && typeof value === "number" && value > 0;
    const display =
        options.compact && typeof value === "number"
            ? new Intl.NumberFormat(options.locale, {
                  notation: "compact",
                  maximumFractionDigits: 1,
                  signDisplay: signed ? "exceptZero" : "auto",
              }).format(value)
            : signed
              ? `+${String(value)}`
              : String(value);
```

(e) `src/components/metric/Metric.vue:31-44`: replace the comment + `deltaReading` block (from `// The delta's number and sign carry its polarity` through the closing `});`) with:

```
// The delta's number and sign carry its polarity (C-1: no tone rides the text), so a
// numeric rise is signed through the family's one seam—"+3", not an unsigned "3"
// whose only polarity was a green. A string delta is the author's own shape and
// passes through untouched.
const deltaReading = computed(() =>
    props.delta == null || props.delta === ""
        ? undefined
        : coalesceMetric(props.delta, {
              placeholder: props.placeholder,
              compact: props.compact,
              locale: props.locale,
              signed: true,
          }),
);
```

Verify: `grep -c '`+${' src/components/metric/Metric.vue` → 0; `npx vitest run tests/components/metric.contract.test.ts tests/styles/contrast-computed.test.ts` → 121/121 (the two existing `+3` rows stay GREEN); `npx vue-tsc --noEmit` and `-p tsconfig.test.json` → exit 0.

**Cure 3—this RECORD, the prose the cures make stale (dated brackets).** (i) §2.1 residue bullet "`src/components/metric/Metric.vue:31-44` … `deltaReading` now signs a numeric rise …": bracket `[2026-09-22 · adjudication r1: the sign is shaped by the seam (`CoalesceMetricOptions.signed`), `Metric.vue` passes `signed: true`]`. (ii) Roster delta: strike "`coalesceMetric`'s signature and behaviour are unchanged: signing happens in `Metric.vue`'s delta reading only." with `~~…~~` and bracket `[2026-09-22 · adjudication r1: `CoalesceMetricOptions` gains `signed?: boolean`; option fields are not roster rows, so no roster delta; the driver's CHANGELOG names the addition]`. (iii) Witnesses: add the new `it`'s RED and GREEN lines. (iv) FOR THE DRIVER item 2: append "`coalesceMetric` gains `signed?: boolean`, the option `<Metric>` uses for its delta." and change items 3-4's "paint, non-breaking" framing for the Metric row to "rendered text + paint, non-breaking".

### For the driver (no lane cure; the driver rules)

1. **R2 + AUTHOR.** The Metric row is a rendered-text change, not paint-only: `:delta="3"` renders `+3`, compact `+12.4K`; consumer text assertions on `<Metric>` (fourier's GalleryAdminBanner renders it) may need to follow. The CHANGELOG also names `coalesceMetric`'s new `signed` option. The reply letter carries the one sentence.
2. **Out-of-fence stale sites, verified on disk, none ruled by §A** (the driver decides whether any rides 10.0.0): `tests/composables/color/use-accent-tone.test.ts:45-46` hard-codes the struck grounds `hsl(36 48% 97%)` / `hsl(24 8% 16%)` as `LIGHT_CARD`/`DARK_CARD` and asserts contrast against them (the shipped bytes are `hsl(30 85% 96%)` / `hsl(26 22% 17%)`; reading the token files would end the drift); `src/styles/tokens/dark-arm.css:91-93` carries both the stale `hsl(24 8% 16%)` and "the lifted L16 card" (the card is L17); `demo/shell/configurator/PresetEditor.vue:224` (`/80`) and `:366` (`/70`) are the same alpha-muted text band L-4 called a defect, in the demo shell; the "1.28:1" in `src/components/sortable-list/styles.css:11` and `tests/styles/proportion-register.test.ts:335, :404` is history prose about the retired tan divider (the `color-radius.css` bracket says the figure reproduces on no token ground)—likely stands as history; `demo/stories/data/metric.vue:40` and `MIGRATION.md:200/:897` as RECORD already lists.
3. The `gates/boot-graph` stale-dist failure and the ratchet rebind stay the driver's (B-3), as RECORD says.

## Cure [2026-09-22]

Opus seat (`claude-opus-5-5[1m]`). Applied the three dictated cures from adjudication round 1, in order. Nothing else changed.

- **Cure 1—`src/styles/glass/ladder.css:224-229`.** The A-1 bracket is rewritten as dictated: `ink).` now closes the chip clause, the track is named as the quiet plate over `--card` (3.48 → 5.34:1), and "The chip and tone plates composite BRIGHTER…" replaces "These plates…". Parens over the docblock from `The on-glass MUTED lift` to the `:where(` line: 12/12, previously 12/13. No line the cure wrote exceeds 95 columns. Two lines in the range, "auto-flips per mode…" (96) and "surfaces already read the on-glass register…" (98), are HEAD's own bytes (`:231-232` at `e5ac97f2`, now `:235-236`) and were not touched.
- **Cure 2a—witness.** `tests/components/metric.contract.test.ts`: the `it("signs a positive NUMBER through the one seam, on both paths, and nothing else")` row sits after the compact row. It went RED against the un-cured seam (`expected '3' to be '+3'`).
- **Cure 2b-2d—`src/components/metric/coalesce-metric.ts`.** `CoalesceMetricOptions.signed?: boolean` is added with its docblock. The seam's docblock gets the dated bracket. `display` computes `signed` once: `signDisplay: "exceptZero"` on the compact path, and a `+` prefix on the plain path.
- **Cure 2e—`src/components/metric/Metric.vue:31-44`.** `deltaReading` is now one `coalesceMetric(…, { …, signed: true })` call, with the dictated comment. `grep -cF '`+${' Metric.vue` → 0.
- **Cure 3—this RECORD.** The §2.1 bullet and Roster delta each get a bracket (the roster sentence is struck). Witnesses gain the new RED and GREEN lines. FOR THE DRIVER item 2 gains the `signed` sentence, and items 3-4 now frame the Metric row as rendered text + paint, non-breaking.

Verify: `npx vitest run tests/components/metric.contract.test.ts tests/styles/contrast-computed.test.ts` → `Tests 121 passed (121)` (metric 22 and contrast-computed 99; the dictated "108/108" for contrast-computed alone does not match the file's count, which was 99 before and after cure 1, a comment-only change; the dictated 121 total holds). The two existing `+3` rows stay GREEN. `npx vue-tsc --noEmit` → exit 0. `npx vue-tsc --noEmit -p tsconfig.test.json` → exit 0.

## Adjudication round 2 [2026-09-22]

Adjudicator: Fable (`claude-fable-5-1`). Read: RULINGS.md in full (§A CT rows, the driver-items section at `f3011618`, §B, §C), the contrast-tokens investigator + verifier seats on the five rows, both inbound letters on those rows, the round-1 dictation, the cure seat's return and the live diff of every CT path. Re-measured myself: the ladder docblock (`The on-glass MUTED lift` → `:where(`, lines 211-238) balances 12/12 parens (HEAD 211-234: 11/11); the six cure-1 lines are byte-equal to the dictation and run ≤ 86 columns; the only over-95 lines in the block are HEAD's own four (`:230/:233/:235/:236`, 96/96/96/98). `coalesceMetric` is called from `Metric.vue` only (value + delta); `grep -F '`+${' src` hits nothing but the seam's own plain path. `npx vitest run` on the two witness files → `Test Files 2 passed · Tests 121 passed (121)`, every A-1/A-3/L-4/§5/§2.1 row and the seam witness GREEN; `tests/gates/gate-register.test.ts` 21/21; `npx vue-tsc --noEmit` and `-p tsconfig.test.json` both exit 0; `.published-roster`, `.bundle-ratchet`, `package.json`, MIGRATION/CHANGELOG/DESIGN/README and `tests/gates/` (10 files) untouched. Verdict: CLEAN—zero cures.

| finding | verdict | reason |
| --- | --- | --- |
| Cure 1 as applied (`ladder.css:224-229`) | DISMISS | Applied byte-for-byte; parens balance; the contradiction is gone (the track is named as the quiet plate, "The chip and tone plates composite BRIGHTER…" scopes the next sentence). No defect. |
| Cure seat note 1 (dictated "108/108" for contrast-computed alone) | DISMISS | My round-1 figure was a miscount; the file has 99 rows before and after cure 1 (a comment-only change) and the dictated 121 total holds (22 + 99). Corrected here; nothing to cure. |
| Cure seat note 2 ("no line in 211-236 exceeds 95 columns" does not hold) | DISMISS | The check was scoped too wide. The four over-width lines are HEAD's own bytes and outside the ruling; re-wrapping them would widen the cure beyond A-1. The lines the cure wrote are ≤ 86. |
| Cure seat note 3 (FOR THE DRIVER item 3 has no Metric row) | DISMISS | Correct execution of the intent: the rendered-text framing sits on item 4 where the Metric row is, and item 3 carries a dated pointer bracket. The driver has since ruled the same framing at `f3011618`. |
| Cure seat note 4 (a first splice left four orphan lines, removed before any run) | DISMISS | Verified: `Metric.vue`'s diff against HEAD is the four-line comment plus `signed: true`; no orphan, no second `deltaReading`. |
| Cure 2a-2e as applied (`coalesce-metric.ts`, `Metric.vue`, the seam witness) | DISMISS | The sign is shaped in the seam on both paths (`signDisplay: "exceptZero"` compact, `+` plain), `Metric.vue` passes `signed: true`, the seam docblock and `types.ts:22-26` ("never through a second formatter at a call site") are true again; witness recorded RED (`expected '3' to be '+3'`) then GREEN. Option fields are not roster rows (B-3 rebinds the ratchet). No defect. |
| Cure 3 as applied (RECORD brackets) | DISMISS | The §2.1 bullet and Roster-delta brackets, the struck sentence, the new RED/GREEN lines and the item-2 `signed` sentence are all present; the round-1 section is untouched. |
| Round-1 driver items (CT-A-05, CT-B-04, CT-B-05) | DRIVER | Already ruled by the driver at `f3011618`: the out-of-fence residue rides 10.0.0 in lane CT2 (use-accent-tone fixture, dark-arm comment, PresetEditor alpha; the 1.28:1 history prose stands), and the Metric row is a rendered-text change for R2 + the letter. Nothing for this lane. |

Dictated cures: none. Footprint of this round: this file only.
