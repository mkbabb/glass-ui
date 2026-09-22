# AC2—L-23, AC-D-1 dead token, L-3, L-1 (2026-09-22, Opus)

Datum: master `e5ac97f2` (the RULINGS commit); the tree moved under the lane to `91c65f89` as sibling lanes landed; of AC2's paths only `src/styles/tokens/offsets.css` moved (lane DA, `fafc9737`, at :63 and :93-96—disjoint from AC2's :33-40), and AC2's diff sits on top of it. Rulings: `../RULINGS.md` §A (api-cascade, infinite-scroll-strikes), fence §C row AC2. Evidence: `../seats/{investigate,verify}__api-cascade.json`, `../seats/{investigate,verify}__infinite-scroll-strikes.json`; the verifier's figures govern. Nothing staged or committed; the driver commits by pathspec.

## The witness engine

happy-dom drops every `@layer` block (probed: a rule inside `@layer glass-overrides { … }` is absent from `styleSheets[0].cssRules`), and `layers.css` sits inside `@layer components`. So the L-23 and L-3 witnesses run in a real engine: the installed Chrome (`chromium.launch({ channel: "chrome" })`, Chrome 153.0.8010.53 here), driven by the repo's `playwright` 1.61.1 from inside the ordinary vitest tree, over the SOURCE bytes of the files under test (no `dist/`, no build). `channel: "chrome"` is the one path—no bundled-browser branch, no skip—and it is the Chrome the GitHub `ubuntu-latest` image ships, so `npm test` in the `verify` job needs no `playwright install` step. Both files are test rows (§B-2); no gate seat minted, gates stay 60.

[2026-09-22 · ruled at 9454b4a9] ~~the installed Chrome (`chromium.launch({ channel: "chrome" })`) … needs no `playwright install` step~~—the witnesses launch Playwright's bundled Chromium (`chromium.launch()`, no channel; 149.0.7827.55 here) and ci.yml's verify job gains `npx playwright install --with-deps chromium` after `npm ci`, the step its pixel-floor job already carries. ~~release.yml is the driver's (fence).~~ [2026-09-22 · adjudication 2] the fence was widened by the one release.yml step (RULINGS "AC2 witness engine", made explicit at 1f1ef004, ratified at b1af20e8); the driver applied it—release.yml:41, the identical line after `npm ci`—and it commits with lane AC2. Bundled-engine GREEN: `GlassDock.stagger.test.ts`—`      Tests  9 passed (9)`; `slider.size-tokens.test.ts`—`      Tests  3 passed (3)`.

## L-23—the dock reveal stagger (CURE)

`src/components/dock/styles/layers.css`
- before :280-298—two docblocks: "Each successive control starts `step` later … capped at the 6th child (`nth-child(n + 6)` holds at `step × 5`)" and "The SYMMETRIC center-out stagger … center pair = onset 0"; :299-314—ring ±1 `> *:nth-child(2 of *)` / `nth-last-child(2 of *)`, ring ±2 `(3 of *)`, deep middle `> *:nth-child(n + 4):nth-child(-n + 5)`.
- after :280-305—one docblock: both stale sentences struck in place with dated brackets; the painted edge-in ladder stated as the intent (`step × min(distance from the nearer edge, 3)` over controls only, separators hold onset 0); :306-329—every rung counts `of :not(.dock-separator)` and every rung is bounded from BOTH ends:
  - ±1 `:nth-child(2 of S):nth-last-child(n + 2 of S)` , `:nth-last-child(2 of S):nth-child(n + 2 of S)`
  - ±2 the same at 3
  - deep middle `:nth-child(n + 4 of S):nth-last-child(n + 4 of S)` (the ruled both-ended rung)

Lane note on the ±1/±2 bound: the ruled shape bounds only the deep middle. Measured in Chrome, that leaves the short rows off the ruled direction—`cc` → `1 1`, `ccc` → `2 1 2` (center-out, the edges delayed two beats), `cccc` → `0 2 2 0`—because an unbounded `nth-last-child(3)` reaches the FIRST control of a 3-row. The direction ruling ("the painted edge-in ladder is the intent") and the rewritten docblock are false on those rows unless ±1/±2 carry the same both-ended bound. With it, every figure the verifier tabled is unchanged and the short rows join the ladder. Same file, same selectors, no new rule.

Chrome rung table (`--dock-stagger-step: 1`, `--dock-stagger-onset` registered `<number>`; `|` marks a separator; HEAD = `git show HEAD:…/layers.css`, cured = the tree):

| row | HEAD | cured |
| --- | --- | --- |
| c s c c c c s c | `0 \|1 2 3 3 2 \|1 0` | `0 \|0 1 2 2 1 \|0 0` |
| c c s c c c s c c | `0 1 \|2 3 3 0 \|2 1 0` | `0 1 \|0 2 3 2 \|0 1 0` |
| 2 controls | `1 1` | `0 0` |
| 3 | `2 1 2` | `0 1 0` |
| 4 | `0 2 2 3` | `0 1 1 0` |
| 5 | `0 1 2 3 3` | `0 1 2 1 0` |
| 7 | `0 1 2 3 3 1 0` | `0 1 2 3 2 1 0` |
| 8 | `0 1 2 3 3 2 1 0` | `0 1 2 3 3 2 1 0` |
| 10 | `0 1 2 3 3 0 0 2 1 0` | `0 1 2 3 3 3 3 2 1 0` |

HEAD reproduces both seat tables exactly (verify__api-cascade rows[5] measurements[4]); the cured 5/7/8/10 and separator rows equal the verifier's cured table.

Witness—`tests/components/custom/dock/GlassDock.stagger.test.ts` (new): mounts real GlassDock/DockControl/DockSeparator rows in happy-dom, marks the dock `data-morphing`, resolves `layers.css` over that markup in Chrome, asserts controls = `min(i, n−1−i, 3)` and separators = 0 for eight rows.

RED (HEAD layers.css):
```
 ✓ … > mounts every child of the row into the active layer 12ms
 × … > row csccccsc: controls ladder edge-in, symmetric; separators take no rung 4ms
 × … > row ccscccscc … × row ccc … × row cccc … × row ccccc … × row ccccccc … × row cccccccccc …
AssertionError: expected [ +0, 2, 3, 3, 2, +0 ] to deeply equal [ +0, 1, 2, 2, 1, +0 ]
AssertionError: expected [ +0, 1, 3, 3, +0, 1, +0 ] to deeply equal [ +0, 1, 2, 3, 2, 1, +0 ]
AssertionError: expected [ 2, 1, 2 ] to deeply equal [ +0, 1, +0 ]
AssertionError: expected [ +0, 2, 2, 3 ] to deeply equal [ +0, 1, 1, +0 ]
AssertionError: expected [ +0, 1, 2, 3, 3 ] to deeply equal [ +0, 1, 2, 1, +0 ]
AssertionError: expected [ +0, 1, 2, 3, 3, 1, +0 ] to deeply equal [ +0, 1, 2, 3, 2, 1, +0 ]
AssertionError: expected [ +0, 1, 2, 3, 3, +0, +0, 2, 1, +0 ] to deeply equal [ +0, 1, 2, 3, 3, 3, 3, 2, 1, +0 ]
      Tests  7 failed | 1 passed (8)
```
GREEN (cured):
```
 ✓ … > row csccccsc: controls ladder edge-in, symmetric; separators take no rung 3ms
 ✓ … > row ccscccscc … ✓ row ccc … ✓ row cccc … ✓ row ccccc … ✓ row ccccccc … ✓ row cccccccccc …
      Tests  8 passed (8)
```

## AC-D-1—the dead token `--dock-max-inline-size` (CURE)

Readers checked before deleting: `grep -rn dock-max-inline-size src demo tests scripts tests-visual` → 0 `var()` readers. Remaining hits are struck comments (`dock/styles/shell.css:62/65/195`, `layers.css:29`), a detector that holds the cap ABSENT on comment-stripped CSS (`tests/components/custom/dock/g-dock-lattice.test.ts:212/224`, unchanged and still green), `demo/stories/dock/overview.vue:578` (prose, out of fence—see FOR THE DRIVER), `tests-visual/dock-wrap-content-driven.spec.ts:8` (a comment in a spec over a deleted prop), and MIGRATION.md:2139/2149 (R2).

- `src/styles/tokens/offsets.css` before :33-40—the docblock "the canonical inline cap EVERY overflow strategy reads …" and `--dock-max-inline-size: min(80vw, 64rem);`. After :33-37—a dated bracket amending the preceding :26-32 note in place (one cap not two, no mask-fade, the inline cap deleted at LATTICE, the block cap the survivor); no declaration.
- `demo/stories/dock/overflow.vue` before :67 `:style="{ '--dock-max-inline-size': '22rem' }"`; after—the line is gone. Paint unchanged: the property had no reader.
- [2026-09-22 · cure 9] `demo/stories/dock/overflow.vue` :23-26—the script comment teaching a narrow cap and a FadingScroll edge mask is struck in place with a dated bracket (`O-32 AC-D-1`): the inline cap and the edge mask both died at BK #47 W3 LATTICE; the run outgrows the stage, the active full layer is the native inline scroll port with no edge fade, the truncation cue is the plate's terminal cap. :91-96—the visible caption reads "The row outgrows the stage, so the active layer is a native scroll port with no edge fade (the truncation cue is the plate's terminal cap), and clicking a control past the fold recenters it into view", with an HTML comment above the `<p>` striking the old caption ("no cap is set and no edge mask ships").

No witness (a deletion of a 0-reader declaration; the lattice test already holds the cap absent). Tests that read `offsets.css`/`sizing.css` re-run green: proportion-register, typography, forms-seam, dialog-room, picker-lane, g-dock-lattice (95 passed, 1 expected fail).

## L-3—the slider size seam (CURE)

- `src/styles/tokens/sizing.css` after :289-302—in the unlayered `:root`, beside `--slider-touch-target`: a docblock (the rungs read these; `min()` holds the inscription law; this root is unlayered and beats a layered `:root`—override on an element below it in any layer, or in an unlayered `:root`) and six tokens: `--slider-track-height-sm: 0.75rem` · `--slider-thumb-size-sm: 0.5rem` · `-md: 1.25rem` · `1rem` · `-lg: 1.75rem` · `1.5rem`.
- `src/components/slider/styles.css` before :66-80—literal rungs; after :66-84—each rung `--slider-track-height: var(--slider-track-height-z); --slider-thumb-size: min(var(--slider-thumb-size-z), var(--slider-track-height-z));` with a dated bracket on the docblock. No `var()` fallback (the declared-nowhere shape is DECLINED, §B-1). The spectrum rule untouched; the file stays unlayered.
- `tests/components/a11y/coarse-target.test.ts` :46-62—`rungHeights()` read the rung literals out of `slider/styles.css`; it now reads them from `sizing.css` and counts a rung only where the slider rule reads its own size's token. Dated bracket. Figures unchanged (`{ sm: 12, md: 20, lg: 28 }`); 13/13 green. See path corrections.

Witness—`tests/components/slider.size-tokens.test.ts` (new): Chrome over the source bytes of `sizing.css` + `slider/styles.css` and a `@layer glass-overrides` block with three wrappers.

RED (HEAD rungs):
```
 ✓ … > keeps the default md rung at 20px track (spectrum 24px track, 12px bar) 7ms
 × … > follows a wrapper override set inside @layer glass-overrides 5ms
 × … > clamps the thumb to the track (the inscription law) when either token moves 4ms
AssertionError: expected 20 to be 32 // Object.is equality
AssertionError: expected { track: 24, thumbWidth: 12 } to deeply equal { track: 18, thumbWidth: 9 }
      Tests  2 failed | 1 passed (3)
```
GREEN (cured):
```
 ✓ … > keeps the default md rung at 20px track (spectrum 24px track, 12px bar) 15ms
 ✓ … > follows a wrapper override set inside @layer glass-overrides 4ms
 ✓ … > clamps the thumb to the track (the inscription law) when either token moves 22ms
      Tests  10 passed (10)   [with slider.contract.test.ts, 7/7 unchanged]
```
Probe values (Chrome, md): default track 20 / spectrum 24 track, 12 bar (unchanged from HEAD); wrapper `--slider-track-height-md: 2rem` in `@layer glass-overrides` → track 32; wrapper track 0.75rem → thumb clamps 16→12 (spectrum 18 track, 9 bar); wrapper thumb 2rem → thumb clamps 32→20 (spectrum 30 track, 15 bar). The verifier's layered-`:root` trap (a `:root` inside `@layer glass-overrides` or `@layer theme` leaves the track at 20) is the B-1 contract and is not re-asserted here.

## L-1—the infinite-scroll observer root (CURE, not breaking)

Justification of record (verify__infinite-scroll-strikes rows L-1): on the PUBLISHED 8.0.0/9.0.0 `dist/infinite-scroll.js` (sha1 a79d718a at both), in Chromium, WebKit and Firefox, the component's own root as the observer root drains 10/10 pages with zero scroll in the ancestor-port layout (fourier's GalleryView.vue:306) AND the plain window layout; the demo layout (component root is the port) loads 1, then 2 near the end. The patched bytes (root → viewport, `scrollMargin` = threshold) load 1 on mount and 2 near the end in all three layouts, all three engines; root null WITHOUT `scrollMargin` loses the demo's prefetch. `scrollMargin` is on `IntersectionObserver.prototype` in Playwright chromium 149 / webkit 26.5 / firefox 151 and typed in TS 6.0.3 `lib.dom.d.ts:1343`. No Safari cell (ruled): an engine without `scrollMargin` degrades to load-when-visible inside a nested port—later, never a drain—which is not a masking fallback.

- `src/components/infinite-scroll/InfiniteScroll.vue` before :2 `import { computed, ref, toRef }`, :24 `const scrollContainer = ref<HTMLElement | null>(null);`, :27 `scrollContainer,` in the options, :50 `<div ref="scrollContainer">`. After :2 `import { computed, toRef }`, :24-27 a four-line comment (root null clips by every ancestor port; why the own-root was wrong), :28 the call without `scrollContainer`, :51 `<div>`.
- `src/components/infinite-scroll/composables/useInfiniteScroll.ts` before :32-35 `root: …, rootMargin: \`0px 0px ${threshold}px 0px\``. After :32-41—a comment (`rootMargin` grows the root; `scrollMargin` grows every port between; the no-`scrollMargin` engine degrades to load-when-visible), `const margin`, `rootMargin: margin, scrollMargin: margin`. The composable's `scrollContainer` option STAYS (a caller with a real port keeps it as root).
- `demo/stories/data/infinite-scroll.vue` before :76-77 "The component sets the scroll container internally; …"; after :76-79—the observer watches against the viewport clipped by every port above; here the component itself is the port and the threshold reaches in as a scroll margin (160px).

Witness—one `it` in `tests/components/infinite-scroll.contract.test.ts` :33-49 (threshold 160: `options.root ?? null` is null; `rootMargin` and `scrollMargin` are `"0px 0px 160px 0px"`).

RED (HEAD):
```
     × observes against the viewport with the threshold carried into nested scroll ports 6ms
 FAIL  tests/components/infinite-scroll.contract.test.ts > InfiniteScroll > observes against the viewport with the threshold carried into nested scroll ports
AssertionError: expected <div><div …(2)></div>
…(1)</div> to be null
      Tests  1 failed | 1 passed (2)
```
The expected value is the component's own root <div>, HEAD's observer root.
GREEN (cured):
```
 ✓ … > re-observes after loading without eagerly requesting another page 13ms
 ✓ … > observes against the viewport with the threshold carried into nested scroll ports 1ms
      Tests  2 passed (2)
```
`infinite-scroll.announce.test.ts` unchanged and green (5/5 across both files).

## Runs

- Relevant files together: `tests/components/custom/dock/` (all 14 files incl. the new stagger file) + slider size-tokens + slider contract + infinite-scroll contract + announce + a11y coarse-target → 20 files, 154 passed, 1 expected fail.
- Typecheck: `vue-tsc --noEmit` exit 0. `vue-tsc --noEmit -p tsconfig.test.json` exit 2 with exactly two errors, both in `tests/components/custom/tabs/segmented-tabs-generic.fixture.vue` (:23, :25)—lane AC1's born-RED SegmentedTabs fixture, in flight in the shared tree; no error in any AC2 file. [2026-09-22 · adjudication 2] both configs exit 0 now; AC1's fixture landed.
- No build, no `dist/` read or written.

## Roster delta

None. `.published-roster` carries `theme`/`utility` rows only; `:root` tokens are not rostered (the six slider tokens and the deleted dock token move nothing there). Ratchet: no build run; the CSS delta is +6 declarations in the token root and +~40 selector bytes in the dock ladder, −1 declaration in offsets—the driver rebinds on the committed tree (§B-3).

## Path corrections

- `useInfiniteScroll` lives at `src/components/infinite-scroll/composables/useInfiniteScroll.ts` (inside the `src/components/infinite-scroll/**` fence; the `src/composables/**/useInfiniteScroll*` glob matches nothing at HEAD).
- `tests/components/a11y/coarse-target.test.ts` (the G-COARSE-TARGET seat's rung detector) read the slider rung literals the L-3 cure moves; it is the one slider test outside the named files that the cure turns RED, so it is treated as a slider test under the fence's "their tests (… slider …)". Detector re-pointed, figures and assertions unchanged; no seat minted or rebound.

## FOR THE DRIVER

R2—MIGRATION.md:
- `## 10.0.0` (additions): "The Slider's size rungs read six new tokens in the token `:root`: `--slider-track-height-{sm,md,lg}` (0.75/1.25/1.75rem) and `--slider-thumb-size-{sm,md,lg}` (0.5/1/1.5rem). Set them on a wrapper or on the slider, in any layer; a `:root` override must be unlayered (see the token-root contract). The thumb is `min(thumb, track)`, so the thumb never exceeds the track. Defaults paint unchanged."
- `## 10.0.0` (fixes, not breaking): "`<InfiniteScroll>` observes its sentinel against the viewport instead of its own root element, with the `threshold` applied as both `rootMargin` and `scrollMargin`. A list inside an ancestor scroll port no longer loads every page on mount; a list whose own root is the scroll port behaves as before. Engines without `IntersectionObserver` `scrollMargin` load when the sentinel becomes visible inside a nested port. `useInfiniteScroll`'s `scrollContainer` option is unchanged."
- `## 10.0.0` (fixes): "The dock's reveal stagger counts controls only (`DockSeparator` takes no step) and is symmetric at every row length: a control's onset is `--dock-stagger-step × min(distance from the nearer edge, 3)`, edges first."
- `## 9.0.0` late-row removal: "`--dock-max-inline-size` is removed. 9.0.0 deleted its last reader with the per-instance inline cap (BK #47 W3 LATTICE); the declaration was deleted at 10.0.0. Write `max-inline-size` on the dock's class instead." And the `## 5.0.0` paragraph at MIGRATION.md:2139-2149 that still tells consumers to set `--dock-max-inline-size` per-instance needs its dated bracket.
- CHANGELOG `## 10.0.0`: one line each for the slider tokens (Added), the InfiniteScroll root (Fixed), the dock stagger (Fixed), the `--dock-max-inline-size` removal (Removed, recorded late).

Residue outside AC2's fence (routed, not touched):
- `src/styles/tokens/offsets.css:26-32` (outside the :33-40 fence): the older note still says "the inner `.dock-layers` … scrolls with a `.scroll-fade-{x,y}` mask-fade" and "setting either token". The :33-37 bracket amends it in place; a strike of the stale sentences in :26-32 is the driver's call.
- `demo/stories/dock/overview.vue:578`: "The `--dock-max-inline-size` cap it demonstrated is a token, still consumer-settable, still exercised by the /dock/overflow story"—now false on both counts; wants a dated bracket.
- `tests-visual/dock-wrap-content-driven.spec.ts:8`: a comment citing `min(max-content, --dock-max-inline-size)` in a spec over the deleted `overflow="wrap"` prop.
- ~~[2026-09-22 · ruled at 9454b4a9] the two Chromium-driven rows launch the bundled build (cures 1-5); release.yml:57 runs `npm test` with no install step—driver item, the fence names ci.yml only.~~ [2026-09-22 · adjudication 2] the two Chromium-driven rows launch the bundled build (cures 1-5); release.yml carries the same install step at :41, driver-applied under the widened fence and committing with AC2, so `npm test` at tag-push has the bundled engine. Nothing is left for the driver here.

Reply letter (AUTHOR): L-23—the 10.0.0 ladder skips separators and is bounded at both ends of every step, so a row of 2, 3 or 4 controls is edge-in as well (HEAD's 3-control row painted `2 1 2`). L-3—the verifier's reply line stands. L-1—the investigator's reply line stands; add the degraded-engine sentence above.

## Adjudication round 1 [2026-09-22]

Adjudicator: Fable (claude-fable-5-1), read-only over the tree; this section is the one write. Re-measured: the four lane files pass as they stand (4 files, 26/26); `vue-tsc --noEmit` exit 0; `gate-register` seats:60 drift:0 violations:0; `git diff --stat HEAD -- package.json package-lock.json .github` empty; `chromium.launch()` with no channel starts the bundled Chromium 149.0.7827.55 here; morph.css:64 runs `--dock-expand-t` 1→0 on collapse; the standard `.slider-thumb` is `width: 0` (styles.css:150); the spaced em dashes in new files are stagger:87 and RECORD:108 only. The four cures match RULINGS §A on disk (both challengers' N3/N5 confirmations hold; the ±1/±2 both-ended bound is needed for the ruled direction, mutation-proved by Challenger A).

| finding | verdict | reason |
| --- | --- | --- |
| AC2-B-B1 witness engine | CURE | Ruled at 9454b4a9 (RULINGS "AC2 witness engine"): `chromium.launch()` with no `channel`, the two headers, the ci.yml verify step; RECORD :7/:147 say the opposite. Cures 1-6. |
| AC2-B-B2 + AC2-A-F1 `playwright` declaration | CURE | Ruled at dd4bab9c: root `devDependencies` at the workspace's resolved 1.61.1, `npm install --package-lock-only`. Cure 7. |
| AC2-B-F1 release.yml step | DRIVER | The ruling's parenthetical says release.yml gains the step; its fence sentence names "the one ci.yml step" only. FENCE IS LITERAL, so the lane cannot touch release.yml; once `channel` drops, release.yml:57 `npm test` has no browser and the 10.0.0 tag-push goes RED. The driver widens the fence by one line after release.yml:40 or applies it. |
| AC2-B-F2 collapse-order sentence | CURE | The ruling rewrites the docblock to the painted intent; "collapse fades them back out in the same order" is false (the ramp rewinds: onset 3·step reaches 0 at t = 3·step, an edge at t = 0). Cure 8. |
| AC2-B-F3 overflow.vue stale cap + FadingScroll prose | CURE | AC-D-1 deletes the token "still declared/taught"; the file is in the fence and its :23-26/:91-93 still teach the cap the lane deleted and the mask struck at LATTICE (shell.css:69). Dated brackets. Cure 9. |
| AC2-B-F4 shell.css:87-106 stale ladder docblock | DRIVER | Out of fence; not routed by the lane. Dated bracket for the driver: onset = `step × min(distance from the nearer edge, 3)`, maximum 0.24; the last child finishes at 0.64 with the 0.4 window. |
| AC2-B-F5 InfiniteScroll.vue:26-27 past-tense prose | CURE | New src prose narrating the old code path without a bracket; the rationale stays, stated as the present contract. Cure 10. |
| AC2-B-N1 types.ts "must be a real scroll port" | DISMISS | The ruling keeps the `scrollContainer` option as is and declined ask (1b); the docblock is true. Asks more than the ruling. |
| AC2-B-N2 `cc` unwitnessed; slider title | CURE | RECORD:26 tables `cc` as a cured figure with no witness row; the :72 title claims a thumb the test never measures (standard thumb is `width: 0`). Cures 11-12. |
| AC2-B-N3 annotated RED paste; spaced em dashes | CURE | Born-RED law (paste the failing line verbatim); new files use tight em dashes. Cure 13. |
| AC2-B-N4 DESIGN.md slider paragraph | DRIVER | R2 file: name the six tokens, the unlayered-root rule (B-1) and `min(thumb, track)`. |
| AC2-B-N5 confirmations | DISMISS | No action. |
| AC2-A-N1 ±1/±2 both-ended bound | DRIVER | The extension is inside the direction ruling (without it `ccc` paints `2 1 2`); the LEDGER ratifies it and the letter carries the short-row sentence (RECORD "Reply letter"). |
| AC2-A-N2 coarse-target re-point | DISMISS | Ruled a lawful path correction at dd4bab9c. |
| AC2-A-N3 / AC2-A-N4 | DISMISS | Confirmations; no action. |
| AC2-A-N5 AC1's dirty out-of-fence paths | DRIVER | `literals.css`, `useTabDragMorph.ts`, `segmented-tabs.test.ts` are lane AC1's; AC1's adjudicator checks them against §4.1's `bridges.css` ruling and AC1's fence. |
| AC2-A-N6 routed residue | DISMISS | Already in FOR THE DRIVER (offsets.css:26-32, overview.vue:578, tests-visual spec:8). |

Dictated cures (round 2 applies verbatim; the fence is AC2's §C row + the two widenings ruled at 9454b4a9 and dd4bab9c):

1. `tests/components/custom/dock/GlassDock.stagger.test.ts:61` `browser = await chromium.launch({ channel: "chrome" });` → `browser = await chromium.launch();`
2. `tests/components/slider.size-tokens.test.ts:45` the same line → `browser = await chromium.launch();`
3. `GlassDock.stagger.test.ts:12` `// the markup); the installed Chrome, driven by Playwright, resolves the source bytes of` → `// the markup); Playwright's bundled Chromium resolves the source bytes of`
4. `slider.size-tokens.test.ts:13` `// installed Chrome driven by Playwright; the CSS is the source bytes of the two files.` → `// bundled Chromium Playwright installs; the CSS is the source bytes of the two files.`
5. `.github/workflows/ci.yml` verify job, after :20 `            - run: npm ci` insert one line `            - run: npx playwright install --with-deps chromium` (12-space indent, the pixel-floor job's :53 text). No other workflow line moves.
6. RECORD.md "## The witness engine": after :7 add a paragraph `[2026-09-22 · ruled at 9454b4a9] ~~the installed Chrome (`chromium.launch({ channel: "chrome" })`) … needs no `playwright install` step~~—the witnesses launch Playwright's bundled Chromium (`chromium.launch()`, no channel; 149.0.7827.55 here) and ci.yml's verify job gains `npx playwright install --with-deps chromium` after `npm ci`, the step its pixel-floor job already carries. release.yml is the driver's (fence). Bundled-engine GREEN: <paste the two `Tests N passed` lines>.` and replace the :147 bullet with `- [2026-09-22 · ruled at 9454b4a9] the two Chromium-driven rows launch the bundled build (cures 1-5); release.yml:57 runs `npm test` with no install step—driver item, the fence names ci.yml only.`
7. `package.json:533` after `        "postcss": "^8.5.19",` insert `        "playwright": "1.61.1",`; run `timeout 600 npm install --package-lock-only`; confirm `git diff --stat HEAD -- package.json package-lock.json` lists only those two files, `grep -c '"node_modules/playwright": {' package-lock.json` = 1, `node -e "console.log(require('playwright/package.json').version)"` = 1.61.1, and the `version` field is untouched. Add to RECORD a section `## The playwright declaration [2026-09-22 · ruled at dd4bab9c]` with the package.json hunk and the lockfile `--- +++` line counts.
8. `src/components/dock/styles/layers.css` docblock line `       says, and collapse fades them back out in the same order.` → `       says; collapse rewinds the same ramp, so the middle fades first and the edges last.`
9. `demo/stories/dock/overflow.vue` (a) :23-26 → `// ~~A narrow-capped dock whose control run exceeds the cap → … the FadingScroll edge mask` / `// feathers the clipped edges~~ — [2026-09-22 · O-32 AC-D-1] the per-instance inline cap` / `// (`--dock-max-inline-size`) and the edge mask both died at BK #47 W3 LATTICE. The run` / `// outgrows the stage, so the active full layer is the native inline scroll port` / `// (overflow-x: auto) with no edge fade—the truncation cue is the plate's terminal cap—and` / `// `useSelectionGroup`'s select fires scrollIntoView so a control past the fold recenters` / `// itself (with the scroll-padding-inline gutter).` (b) :91-93 visible text `The row exceeds the cap, so the` / `active layer is a native scroll port — the edges feather (FadingScroll),` / `and clicking a control past the fold recenters it into view` → `The row outgrows the stage, so the` / `active layer is a native scroll port with no edge fade (the truncation cue` / `is the plate's terminal cap), and clicking a control past the fold recenters it into view`, and the line before that `<p …>` gains `<!-- [2026-09-22 · O-32 AC-D-1] ~~The row exceeds the cap … the edges feather (FadingScroll)~~: no cap is set and no edge mask ships (BK #47 W3 LATTICE). -->` at the `<p>`'s indent.
10. `src/components/infinite-scroll/InfiniteScroll.vue:26-27` `// Passing the root <div> here made its own box the root rectangle whenever the port` / `// was an ancestor, so the sentinel always intersected and each reconnect loaded again.` → `// This root <div> is never passed as the observer root: under an ancestor port its own` / `// box would be the root rectangle, the sentinel would always intersect, and every` / `// reconnect would load again.`
11. `GlassDock.stagger.test.ts:34` `const ROWS = ["csccccsc", …` → `const ROWS = ["cc", "csccccsc", …` (eight rows); RECORD:36 `for seven rows` → `for eight rows`.
12. `slider.size-tokens.test.ts:72` title `keeps the default md rung at 20px track, 16px thumb (spectrum 24px track, 12px bar)` → `keeps the default md rung at 20px track (spectrum 24px track, 12px bar)`; RECORD :78 and :87 quote the new title.
13. `GlassDock.stagger.test.ts:87` `"GlassDock reveal stagger — the edge-in ladder over controls"` → `"GlassDock reveal stagger—the edge-in ladder over controls"`. RECORD:108: re-take the RED verbatim (cp the tree's `InfiniteScroll.vue` aside, `git show HEAD:src/components/infinite-scroll/InfiniteScroll.vue >` the tree path, run the contract file, paste the `AssertionError:` line unedited, cp the cured file back, confirm its sha1 matches the aside copy); the annotation "the component's own root was the observer root" moves to prose below the code fence.

After cures 1-13: run `tests/components/custom/dock/GlassDock.stagger.test.ts tests/components/slider.size-tokens.test.ts tests/components/infinite-scroll.contract.test.ts tests/components/a11y/coarse-target.test.ts` GREEN on the bundled engine, `npx vue-tsc --noEmit` once, `node scripts/gate-register.mjs` (seats:60), and list the footprint from `git status --porcelain`: the 13 lane paths + package.json + package-lock.json + .github/workflows/ci.yml.

## The playwright declaration [2026-09-22 · ruled at dd4bab9c]

`package.json` (the `version` field untouched):
```
@@ -531,6 +531,7 @@
         "happy-dom": "^20.9.0",
         "lightningcss": "^1.32.0",
         "postcss": "^8.5.19",
+        "playwright": "1.61.1",
         "reka-ui": "^2.9",
```
`timeout 600 npm install --package-lock-only` → `package-lock.json` diff: `--- a/package-lock.json` / `+++ b/package-lock.json`, 1 line added, 0 removed (`@@ -25,6 +25,7 @@`, the root package's `devDependencies` gains `"playwright": "1.61.1"`, placed by npm between `lightningcss` and `postcss`; the `node_modules/playwright` entry was already locked at 1.61.1). `git diff --stat HEAD -- package.json package-lock.json` → those two files, 2 insertions; `grep -c '"node_modules/playwright": {' package-lock.json` → 1; `require('playwright/package.json').version` → 1.61.1.

## Cure [2026-09-22]

Applied verbatim, the round-1 adjudication's dictated cures 1-13:
1-2. `GlassDock.stagger.test.ts:61`, `slider.size-tokens.test.ts:45`—`chromium.launch()`, no channel (bundled Chromium 149.0.7827.55).
3-4. The two witness headers name Playwright's bundled Chromium.
5. `.github/workflows/ci.yml` verify job—`- run: npx playwright install --with-deps chromium` after `npm ci`; no other workflow line; release.yml untouched (driver).
6. The witness-engine paragraph above and the :147 FOR THE DRIVER bullet replaced.
7. `playwright` 1.61.1 declared in root `devDependencies`; lockfile refreshed lockfile-only (section above).
8. `layers.css` ladder docblock—collapse rewinds the same ramp, so the middle fades first and the edges last.
9. `overflow.vue` script comment and caption struck to the post-LATTICE shape (AC-D-1 section).
10. `InfiniteScroll.vue:26-28`—the rationale stated as the present contract.
11. Stagger witness gains the `cc` row (eight rows, 9 tests).
12. Slider witness title drops the unmeasured thumb.
13. Stagger `describe` title uses a tight em dash; the L-1 RED re-taken verbatim against `git show HEAD:…/InfiniteScroll.vue` (the tree's file set aside and restored; sha1 `02fd476f` before and after).

Runs (bundled engine): the four lane files—`Test Files  4 passed (4)` / `Tests  27 passed (27)`; `vue-tsc --noEmit` exit 0; `node scripts/gate-register.mjs` seats:60 drift:0 violations:0. No build, no `dist/` read or written.

## Adjudication round 2 [2026-09-22]

Adjudicator: Fable (claude-fable-5-1), read-only over the tree; this section is the one write. Re-measured on the cured tree: the four lane files on the bundled engine—`Test Files  4 passed (4)` / `Tests  27 passed (27)`; `vue-tsc --noEmit` exit 0 and `vue-tsc --noEmit -p tsconfig.test.json` exit 0; `gate-register` seats:60 drift:0 violations:0; `grep channel` over both witnesses empty; no spaced em dash in either new file; `require('playwright/package.json').version` 1.61.1 with one `node_modules/playwright` lock entry and the `version` field untouched; release.yml:41 and the shell.css:87-106 bracket are on disk as the driver's acts (`git diff --stat HEAD`: release.yml +1, shell.css +15/−10, comment lines only) and match the ruling made explicit at 1f1ef004 and ratified at b1af20e8. The overflow.vue caption's mechanism holds against the bytes: the staged dock is inline-flex (shrink-to-fit), `.dock-layers` releases its min-content floor (run.css:140-144) and `.dock-run` is `overflow-x: auto` unconditionally (run.css:163), so the run scrolls exactly when it outgrows the stage, and no edge fade ships (shell.css:59-76).

| finding | verdict | reason |
| --- | --- | --- |
| AC2-B-B1 witness engine | DISMISS | Cures 1-6 on disk and verified: `chromium.launch()` at stagger:61 and slider:45, both headers name the bundled Chromium, ci.yml:21 carries the install step, RECORD:9 carries the bracket with the bundled-engine GREEN lines. |
| AC2-B-B2 + AC2-A-F1 `playwright` declaration | DISMISS | Cure 7 on disk and verified: `"playwright": "1.61.1"` in root `devDependencies`, lockfile +1 line, one lock entry, 1.61.1 resolves. |
| AC2-B-F1 release.yml step | DRIVER | Applied by the driver under the widened fence (RULINGS "AC2 witness engine", both workflows one step each): release.yml:41 is the identical line after `npm ci`; it commits with lane AC2's pathspec. The lane's RECORD sentences that still call it absent are cured below. |
| AC2-B-F2 collapse-order sentence | DISMISS | Cure 8 on disk: "collapse rewinds the same ramp, so the middle fades first and the edges last." |
| AC2-B-F3 overflow.vue stale cap + FadingScroll prose | DISMISS | Cure 9 on disk: the :23-29 script comment struck with the dated bracket, the caption rewritten, the dated HTML comment before the `<p>`; the mechanism verified above. |
| AC2-B-F4 shell.css:87-106 stale ladder docblock | DRIVER | Applied by the driver under the widened fence (comment only, dated bracket, `step × min(distance from the nearer edge, 3)`, maximum 0.24, last child at 0.64); commits with lane AC2. |
| AC2-B-F5 InfiniteScroll.vue past-tense prose | DISMISS | Cure 10 on disk: the rationale is stated as the present contract (:26-28). |
| AC2-B-N1 types.ts "must be a real scroll port" | DISMISS | Stands from round 1. fourier's own ask (1) is disjunctive ("the root must default `null` … **or** a real scroll port must be **required**"); the ruling took the first arm and keeps `scrollContainer` as is. |
| AC2-B-N2 `cc` unwitnessed; slider title | DISMISS | Cures 11-12 on disk: ROWS opens with `"cc"` (eight rows, nine tests); the title drops the unmeasured thumb. |
| AC2-B-N3 annotated RED paste; spaced em dashes | DISMISS | Cure 13 on disk: the L-1 RED re-taken verbatim (its assertion message runs over two output lines and both are pasted as printed—verbatim is the law, one line is not), the annotation moved below the fence, stagger:87 tight. |
| AC2-B-N4 DESIGN.md slider paragraph | DRIVER | R2 file; unchanged from round 1. |
| AC2-B-N5, AC2-A-N3, AC2-A-N4, AC2-A-N6 | DISMISS | Confirmations and residue already routed in FOR THE DRIVER. |
| AC2-A-N1 ±1/±2 both-ended bound | DRIVER | Ratified in RULINGS at b1af20e8 ("L-23 both-ended bound RATIFIED"); the post-R2 bracket pass puts RECORD's short-row sentence in the LEDGER and the letter. The code stands. |
| AC2-A-N2 coarse-target re-point | DISMISS | Ruled a lawful path correction at dd4bab9c. |
| AC2-A-N5 AC1's dirty out-of-fence paths | DRIVER | Ratified as AC1 path corrections at e8cd11fa (literals.css owns the plain `@theme`; the two type-move consequences); nothing for AC2. |
| CURE-1 note: release.yml + shell.css written concurrently | DRIVER | Verified above as the driver's acts under the ruling; not the lane's footprint. |
| CURE-1 note: RECORD:9 "release.yml is the driver's (fence)" and RECORD:152 "release.yml:57 runs `npm test` with no install step—… the fence names ci.yml only" | CURE | Both sentences are now false against RULINGS (the fence widened by the one release.yml step, made explicit at 1f1ef004) and against the tree (release.yml:41). The lane's record must be true at the close; dated brackets. RECORD:127's test-config typecheck sentence (exit 2 on AC1's fixture) is stale the same way (exit 0 now) and takes a bracket in the same cure. |
| CURE-1 note: `playwright` placed after `postcss`, not alphabetical | DISMISS | The ruling names the entry and the exact version only. The `devDependencies` block is not alphabetical at HEAD (`highlight.js` sits between `@lucide/vue` and `@mkbabb/keyframes.js`, package.json:521-522) and `npm install --package-lock-only` does not reorder package.json; the lockfile's own map is npm-sorted. No house law names ordering. |

Dictated cure (round 3 applies verbatim; the one file is this RECORD):

1. RECORD.md:9—the sentence `release.yml is the driver's (fence).` → `~~release.yml is the driver's (fence).~~ [2026-09-22 · adjudication 2] the fence was widened by the one release.yml step (RULINGS "AC2 witness engine", made explicit at 1f1ef004, ratified at b1af20e8); the driver applied it—release.yml:41, the identical line after `npm ci`—and it commits with lane AC2.`
2. RECORD.md:152—the whole bullet → `- ~~[2026-09-22 · ruled at 9454b4a9] the two Chromium-driven rows launch the bundled build (cures 1-5); release.yml:57 runs `npm test` with no install step—driver item, the fence names ci.yml only.~~ [2026-09-22 · adjudication 2] the two Chromium-driven rows launch the bundled build (cures 1-5); release.yml carries the same install step at :41, driver-applied under the widened fence and committing with AC2, so `npm test` at tag-push has the bundled engine. Nothing is left for the driver here.`
3. RECORD.md:127—append to the end of the line: ` [2026-09-22 · adjudication 2] both configs exit 0 now; AC1's fixture landed.`
4. After 1-3: `sed -n '9p;127p;152p' docs/tranches/BK/execution/2026-09-22-o23-o32-disposition/AC2/RECORD.md` shows the three brackets; `git status --porcelain` unchanged (the RECORD is untracked under `AC2/`); no test, build or typecheck is needed for a prose cure.

## Cure [2026-09-22]

- :9—struck `release.yml is the driver's (fence).`; adjudication-2 bracket records the widened fence (release.yml:41, driver-applied, commits with AC2).
- :127—adjudication-2 bracket: both typecheck configs exit 0; AC1's fixture landed.
- :152—struck the driver-item bullet; adjudication-2 bracket records release.yml:41 carries the install step. Prose-only; no test, build or typecheck run.

## Adjudication round 3 [2026-09-22]

Adjudicator: Fable (claude-fable-5-1), read-only over the tree; this section is the one write. Re-measured on the tree after cure 2: the four lane files on the bundled engine—`Test Files  4 passed (4)` / `Tests  27 passed (27)`; `vue-tsc --noEmit` exit 0 and `vue-tsc --noEmit -p tsconfig.test.json` exit 0; `gate-register` seats:60 drift:0 violations:0; `git diff HEAD -- .github package.json package-lock.json` is exactly the four ruled lines (ci.yml:21, release.yml:41, `"playwright": "1.61.1"` in root `devDependencies`, the one lockfile line); no `channel` in either witness; the three cure-2 brackets stand at :9, :127 and :152 as dictated; the porcelain hash before and after this seat is `720e8330…` (the RECORD is untracked under `AC2/`). The four cures re-read against the verifier rows of record (verify__api-cascade L-23/AC-D-1/L-3, verify__infinite-scroll-strikes L-1) and the two inbound letters (fourier NWO-1 §3 L-1/L-3, value F.W4 §4.3): every ruled sub-clause is on disk and every tabled figure matches. No finding survives; clean.

| finding | verdict | reason |
| --- | --- | --- |
| AC2-B-B1 witness engine | DISMISS | On disk since cure 1 and re-verified: `chromium.launch()` at stagger:61 and slider:45, the two headers name the bundled Chromium, ci.yml:21 carries the install step, RECORD:9 carries the bracket and the bundled-engine GREEN lines. |
| AC2-B-B2 + AC2-A-F1 `playwright` declaration | DISMISS | On disk since cure 1: `"playwright": "1.61.1"` in root `devDependencies`, one lockfile line, the `version` field untouched (ruled at dd4bab9c). |
| AC2-B-F1 release.yml step | DRIVER | Applied by the driver under the widened fence (release.yml:41, the identical line after `npm ci`; RULINGS "AC2 witness engine", b1af20e8); cure 2 trued RECORD:9/:152 to it. What remains is the driver's own act: it commits with lane AC2's pathspec. |
| AC2-B-F2 collapse-order sentence | DISMISS | Cure 8 on disk (layers.css: "collapse rewinds the same ramp, so the middle fades first and the edges last"). |
| AC2-B-F3 overflow.vue stale cap + FadingScroll prose | DISMISS | Cure 9 on disk: the :23-29 script comment struck with the dated O-32 AC-D-1 bracket, the caption rewritten to the post-LATTICE mechanism, the dated HTML comment before the `<p>`. |
| AC2-B-F4 shell.css:87-106 stale ladder docblock | DRIVER | Applied by the driver under the widened fence (comment only; `step × min(distance from the nearer edge, 3)`, maximum 0.24, last child at 0.64); commits with lane AC2's pathspec. |
| AC2-B-F5 InfiniteScroll.vue past-tense prose | DISMISS | Cure 10 on disk: :24-28 states the present contract. |
| AC2-B-N1 types.ts "must be a real scroll port" | DISMISS | Stands from rounds 1-2. fourier's ask (1) is disjunctive—"the root must default `null` (the viewport), **or** a real scroll port must be **required**"—and the ruling took the first arm; the verifier's grounds say the second arm "would break fourier's unbounded mount"; `scrollContainer` stays as is and its docblock is true. Asks more than the ruling. |
| AC2-B-N2 `cc` unwitnessed; slider title | DISMISS | Cures 11-12 on disk: ROWS opens with `"cc"` (eight rows, nine tests); the slider title names only what the test measures. |
| AC2-B-N3 annotated RED paste; spaced em dashes | DISMISS | Cure 13 on disk: the L-1 RED pasted as printed (two output lines), the annotation in prose below the fence, stagger:87 tight; the only ` — ` left in this RECORD are the two quoted before-strings inside the round-1 dictation (:190, :194), not the RECORD's own prose. |
| AC2-B-N4 DESIGN.md slider paragraph | DRIVER | R2 file (RULINGS: "DESIGN.md's Slider axes paragraph names the six rung tokens — R2"). |
| AC2-B-N5, AC2-A-N3, AC2-A-N4, AC2-A-N6 | DISMISS | Confirmations; the out-of-fence residue is routed in FOR THE DRIVER. |
| AC2-A-N1 ±1/±2 both-ended bound | DRIVER | Ratified in RULINGS at b1af20e8; the post-R2 bracket pass carries the "Reply letter" short-row sentence into the LEDGER and the letter. The code stands. |
| AC2-A-N2 coarse-target re-point | DISMISS | Ruled a lawful path correction at dd4bab9c; gate-register seats:60 drift:0 re-run here. |
| AC2-A-N5 AC1's dirty out-of-fence paths | DRIVER | Ratified as AC1 path corrections at e8cd11fa; not AC2's footprint. |
| CURE-1 notes (release.yml/shell.css concurrent; `playwright` after `postcss`; two-line RED) | DISMISS | Ruled in round 2; nothing changed. |
| CURE-2 return (the three RECORD brackets) | DISMISS | Verified on disk at :9, :127 and :152 exactly as dictated; prose-only, no test or build needed; the porcelain hash matches cure 2's (`720e83302a7d4dbee75d5af2baf83322`). |
| adjudicator's own: two `## Cure [2026-09-22]` headings (:211, :260) | DISMISS | No house law names heading uniqueness; each sits in order under its dated adjudication and no anchor is load-bearing. Not worth a cure round. |

Dictated cures: none. The lane is clean; the driver's close items are listed in the return.
