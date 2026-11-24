# P17, the cure verify

Seat: claude-opus-5-5 (asserted from the seat's own identity). 2026-11-22. Read only. No browser ran, and nothing in the repo changed except this file. Figures marked "computed here" were worked out with Python, from the curves in the source or from the banked files and the worktree's kept JSONL. None of them is banked.

Read:

- `P17.md`, its Close and Cure; `P17-close-verify.md`; the cure driver (`driver/demo-p17-cure.js`).
- `git log --stat 15863894f..` on `bl/demo`: four commits, `d91764978` at the tip, which is also `origin/bl/demo`. I read each diff.
- The tip's `StageSwap.vue`, `StoryCode.vue`, `CodeBlock.vue`, `useCodeHighlight.ts`, `code-face.ts`, `hljs-house-theme.css`, `router.ts` and `index.html`, each whole. P16's `StoryCode.vue`. The library's `disclosure.css`, its spring and motion tokens, and the two mono utilities. All 60 StoryCode snippets.
- Every file under `shots/P17/cure/`: `item1` (first paint), `item2` (the press films and the slow-face films), `item3` (the 60 Hz mid-fade films), `webkit` (sweep, legs, checker, route read, page errors), `tone`, `font`, `leave`, `lift`, `tip` (`TIP.txt` reads `d917649783ae…`, plus the run log, build, checker and sweep), the typechecks, vitest and the gate.
- The worktree's `.p17/cure/out/late-*.txt` and the WebKit sweep's JSONL.

`shots/P17/cure/` holds no sheet and no crop. `contact/` is empty under both `cure/` and `tip-de5c40be2/`, because the driver's measure list left out contact sheets.

## Verdict

**Merge.** No page is broken or empty, and no first paint waits on a font.

- The router and the code disclosure no longer wait for the code face or the highlighter. Under emulation, first contentful paint comes 70 to 112 ms before P16's build on all nine loads, and the code face's glyphs never change after they paint.
- A "Code" press starts the chevron on the engine's first moving frame on every press, in both engines.
- Nothing inside the code block changes face, and the colours tween in at half the open's rate per 60 Hz frame.
- The enter lands 0.111 and the leave 0.185 per 60 Hz frame. I computed both from the curve here, and both read the same in the held 60 Hz films in both engines.
- StageSwap is two code lines shorter than at `15863894f`. Nothing under `src/` changed.

Four things measure worse than P16, and none holds the merge:

1. Music Staff's frost step in Chromium is 0.6/255 larger.
2. Under emulation, Chromium's first-paint entry, the frame before any content, comes 40 to 56 ms later. `15863894f` has the same delay.
3. The code face is now `optional`, so in WebKit text set in it can be hidden for up to 100 ms while it loads.
4. Mono text that appears only on interaction keeps the fallback face for its first showing. Typography's Mono register is the case to look at.

Items 3 and 4 were not observed and need a read on the live site.

## The seven questions

| Question | Answer |
|---|---|
| Does any first paint wait on a font, on any route, cold? | No. No code awaits a font: the router awaits only chunks, the disclosure awaits nothing, and both Latin faces are `optional`. Under emulation, first contentful paint comes before P16's on all nine loads. Two engine behaviours remain, both bounded: the first-paint entry under emulation, and WebKit's `optional` window (section 1) |
| Does a "Code" press answer on its own frame in both engines? | Yes. The chevron starts on the reference's frame on 24 of 24 cold presses and 6 of 6 slow-face presses. The panel does the same on 22 of 24 and 3 of 6, and one frame later on the rest, all in WebKit (section 2) |
| Does any change inside the code block happen instantly? | Not from this round. The face is fixed for each open, and no glyph's ink changes while the code shows on any of the 30 presses. The colours tween at 0.087 per 60 Hz frame. Since before P16, the copy button's icon and its status text still swap without a tween (section 3) |
| Do the first enter and the leave each meet 0.2 per 60 Hz frame, by the curve and in the films? | Yes. By the curve, computed here: enter 0.111, leave 0.185. The held 60 Hz film shows the same frames on eight switches in both engines (section 4) |
| Is StageSwap no larger than at `15863894f`? | Yes: 89 code lines against 91, 129 lines against 130, and 5,126 bytes against 5,244 (section 5) |
| Is anything worse than P16 or than `15863894f`? | Against P16, four measured items, none a page defect. Against `15863894f`, the trades the order chose and the enter curve's tail (section 6) |
| Did anything touch `src/`? | No (section 7) |

## 1. Fonts and first paint

**The code.**

- `router.ts`: `beforeResolve` awaits only the route's chunks, each with its own catch. `beforeEach` calls `loadCodeFace()` on `codeFace` routes with `void`.
- `StoryCode.vue`: `setOpen` is synchronous.
- `main.ts`: the app mounts after `router.isReady()`, which waits on those guards alone.
- No other file in `demo/` waits on `document.fonts`. In `src/`, `dockMorphMeasure.ts` measures again after `fonts.ready`, and that gates no paint.
- The head declares both Latin faces `font-display: optional`. The Fira Code Latin-ext face in `demo.css` stays `swap`. No first screen uses it, and the head comment's "Both faces" means the Latin pair.

**Chromium under CDP emulation** (`item1/paint-chromium-emulated.txt`, 1440 light, three reads each, tabulated here):

| Route | FCP: P16 / `15863894f` / tip | First-paint entry: P16 / `15863894f` / tip | Text face response ends |
|---|---|---|---|
| `/` | 5684–5696 / 6172–6200 / 5584–5600 | 1680–1684 / 1724–1732 / 1724–1732 | 1344–1353 / 1545–1569 / 1568–1578 |
| `/data/metric` | 8540–8568 / 9032–9056 / 8472–8496 | 1680–1688 / 1724–1732 / 1724–1736 | 1351–1353 / 1563–1578 / 1560–1561 |
| `/forms/number-field` | 8964–8980 / 9476–9492 / 8900–8908 | 1680–1688 / 1724–1732 / 1724–1736 | 1350–1360 / 1569–1577 / 1560–1575 |

On the tip, the code face is loaded at the first frame that shows mono on all nine loads, and the glyphs read the same 2 s later. P16's build paints the fallback first and swaps on all nine.

The first-paint entry (`fp`) is the background before any content, about 4 s before FCP. On P17's head it comes 40 to 56 ms after P16's on every load, on `15863894f` as on the tip, so this round did not cause it.

- It is not a wait on the text face: on every build it lands 146 to 344 ms after the text face's response ends.
- The text face's download ends 210 to 230 ms later than under P16's preload. With 1.6 Mbps shared, that is the likely cause of the delay, but nothing banked separates it.
- The record calls FCP "first paint" throughout (Record corrections).

**WebKit** (`item1/paint-webkit*.txt`), first contentful paint pooled per route, computed here:

| Route | `15863894f` median (mean) | Tip median (mean) | Reads |
|---|---|---|---|
| `/` | 157 (167) | 136 (142) | 5 each |
| `/display/card` | 187 (185) | 166 (169) | 5 |
| `/data/metric` | 168 (174.4) | 170 (174.5) | 35 |
| `/forms/number-field` | 195 (212) | 193 (198) | 15 |

On `/data/metric`, the three batches' medians give −17, +11 and +5 ms against `15863894f`. That is within the spread, so the tip equals `15863894f` there and is earlier on the other three. On localhost, `15863894f`'s face wait cost nothing: the face lands at 45 to 117 ms, before the chunks. On every WebKit load of the tip, the face is loaded at the first frame that shows mono.

**What the engines still do, judged in Blocking candidates 1 and 2:**

- In Chromium, an `optional` face that has not arrived when text first needs it is not swapped in. That text keeps the fallback, and a later layout takes the face. The record's own late-face read shows both: `.p17/cure/out/late-c3-chromium.txt`, code painted while the face loaded, stays SF Mono after it loads, and the next page's figures paint in Fira Code.
- In WebKit, `optional` hides text set in a face that is still loading for up to 100 ms, then shows the face or, after 100 ms, the fallback for the rest of the page. The text face has worked this way since P16. The code face was `swap` at P16 and is `optional` now.

## 2. The press

`setOpen` sets `open` in the press's own handler. The library Collapsible's tween takes its start on that frame, the same path as P16's uncontrolled `StoryCode`. The press films (`item2/press-summary.txt`, `press-slowface-summary.txt`) measure frames after a reference transition that the probe's own click listener starts:

| Cell | Chevron: `15863894f` → tip | Panel: `15863894f` → tip |
|---|---|---|
| WebKit 1440 click | 0,0,0,1,1,1 → 0 on all six | 2,2,2,3,3,3 → 0,0,0,0,1,1 |
| WebKit 390 tap | 0,0,0,0,0,1 → 0 | 1,2,2,2,2,2 → 0 |
| Chromium 1440 click | 2,2,2,3,3,3 → 0 | 2,2,2,2,3,3 → 0 |
| Chromium 390 tap | 1,2,2,2,2,3 → 0 | 2,2,2,2,2,3 → 0 |
| Slow face, WebKit 1440 | 26,26,29 → 0,0,0 | 28,28,30 → 1,1,1 |
| Slow face, Chromium 1440 | 40,40,41 → 0,0,0 | 40,40,41 → 0,0,0 |

The raw lines agree. Chromium 390 Card on the tip: reference, chevron and panel all at frame 1 (+20 ms). WebKit 390 Card: all three at frame 0 (+16 ms), with the chevron at 23° and the panel at 6 px. The driver's bound is the press's frame or the next, and every press meets it.

The open's curve is `--spring-present` over 200 ms, 0.173 per 60 Hz frame (computed here). In WebKit at 1440 the open lands 0.222 to 0.283 of its travel in one film frame on three of six presses: Empty States 0.283, Card 0.255 and Select 0.222. In each case the frame after the press runs 23 to 28 ms and mounts the code. `15863894f` read 0.115 to 0.135, because it held the open for two frames. The WebKit sweep's code line reads 0.222 at 1440 and 0.136 at 390, against two fifths (`15863894f`: 0.194 and 0.16). Per 60 Hz frame the open is its curve's figure in every cell, 0.168 to 0.179.

## 3. Inside the code block

**Face.** An open sets `--font-mono` to the fallback stack on the content when the face had not loaded by the press. Both mono utilities, `fira-code` and `text-mono-caption`, read `var(--font-mono)`, so the code and the toolbar's language label follow it. The stack is the library's `--font-stack-mono` without "Fira Code", copied as a literal. The face is chosen at the press and does not change while the panel shows. The films read 0 glyph-ink changes while shown, and 0 frames of code in a face still loading, on all 24 cold and 6 slow-face presses. At 390 by tap, `pointerenter` arrives with the press, so a first open shows the fallback, and the next open takes the face.

**Colours.**

- When the highlighter had not loaded by the press, the spans come in at the open's `animationend` (`.self`, so the spans' own animations do not set it).
- Each `hljs-*` span starts at `var(--foreground)`, the `<pre>`'s own colour, so the swap itself changes no pixel. After a 100 ms hold, each tweens to its crayon over 400 ms on `--spring-present`: 0.087 per 60 Hz frame, computed here and read in the films. The largest share of the open's step is 0.50 to 0.52 per 60 Hz frame and 0.52 to 0.93 per film frame (bound: 1.00).
- None of the 60 snippets has a comment, so the theme's italic `hljs-comment` rule never changes a glyph's style when the spans arrive. `hljs-strong` and `hljs-emphasis` do not occur in the grammars used.
- Under reduced motion the disclosure runs for 0.01 ms, so `animationend` still fires.

**Still instant, standing.** In `CodeBlock.vue` the copy button swaps `Copy` for `Check` by `v-if`, and the status line's text changes without a tween. Both are the same at P16 (`1a423c80d`), and no film reads them.

**Unfilmed edge.** A close during a first open fires `animationend` on the close. The colours then come in during the close's travel, and in WebKit their long layout frame can land in it.

## 4. The fades

Per 60 Hz frame, computed here by stepping each curve from every phase:

| Leg | Curve | Duration | Largest step per 60 Hz frame |
|---|---|---|---|
| Enter, tip | `cubic-bezier(0.25, 0, 0.75, 1)` | 200 ms | 0.111 |
| Leave, tip and `15863894f` | the same | 120 ms | 0.185 |
| Enter, `15863894f` and P16 | `cubic-bezier(0, 0, 0.2, 1)` | 200 ms | 0.264 |
| Code open (library) | `--spring-present` | 200 ms | 0.173 |
| Code colours | `--spring-present` | 400 ms after 100 ms | 0.087 |

The held 60 Hz film (`item3/midfade-*-d91764978.txt`) reads the same frames on all eight switches in both engines.

- Leave: 1.00 0.93 0.79 0.61 0.43 0.25 0.10 0.00. The largest step is 0.18.
- Enter: 0.00 0.03 0.10 0.18 0.28 0.39 0.50 0.61 0.72 0.82 0.90 0.97 1.00. The largest step is 0.11.
- My own sampling of the curve at 60 Hz gives those enter frames to two places.
- `15863894f`'s enter reads 0.00 0.26 0.44.

The other readings:

- The Chromium sweep's curve line reads enter 0.111 and leave 0.185 on every swap row in all three cells. Settings' tabs and Constellation's presets read the same in all three cells.
- The WebKit sweep's sampled legs, at headless frame times (`webkit/sweep-webkit-legs.txt`):
  - Enter: none over 0.2 of 57 in either cell. The largest is 0.183, Surface at 1440.
  - Leave at 1440: 3 of 57 over 0.2. Surface's first switch is 0.203 and its fourth 0.286. Paper & Glass's fourth is 0.265.
  - Leave at 390: none.
  - `15863894f`: leave 7 at 1440, six of them first switches; enter 18 and 12.

The leave now takes `afterPaint`, as the driver allowed. So the stage starts fading two frames after the press, as Vue's `nextFrame` gave it at P16. `15863894f` started it at the hook.

Not this round's, and standing since P16: the "Code" chevron turns on `--duration-fast` (200 ms) with `--ease-out`, the 0.264-per-frame curve this round removed from the enter.

## 5. StageSwap

Code lines exclude comments and blank lines:

| File | P16 `1a423c80d` | `15863894f` | tip |
|---|---|---|---|
| `chassis/variants/StageSwap.vue` | 63 | 91 | 89 |
| `chassis/code/StoryCode.vue` | 38 | 51 | 55 |
| `chassis/code/code-face.ts` | none | 7 | 9 |
| `chassis/code/useCodeHighlight.ts` | 84 | 84 | 88 |
| `chassis/code/CodeBlock.vue` | 139 | 139 | 141 |
| `chassis/code/hljs-house-theme.css` | 65 | 65 | 73 |
| `router.ts` | 76 | 83 | 84 |

StageSwap shrank. Two constants became one curve, and the timing argument and the enter's read of `--ease-out` are gone. One `afterPaint` serves the leave, the enter and the travel. The code chassis grew by 20 lines, and each addition answers one of the press's measured steps:

- the face flag and the fallback pin;
- the highlighter flag and the colour hold;
- the colour tween.

Two KISS points remain:

- The fallback stack is a demo literal of the library's `--font-stack-mono`.
- The colour tween replays on every open, because the content remounts.

## 6. Against P16 and `15863894f`

**Pages at rest.**

- The Chromium checker reads 1,517 / 1,517 / 1,504 pass and 0 fail, the same as the close.
- The Chromium sweep reads 77 of 78 in each cell. The one failure is Command's height snap, and no row has a console error.
- The lift reads 267 reads, 27 of them with a change outside the swap, each line as the close's.
- The WebKit route read, on 23 routes in two cells, is ok everywhere.
- The WebKit checker reads 86 pass and 1 fail per cell, the fail being `/dock/rail`'s ResizeObserver error (O-391).
- The WebKit page errors read 0, and the text face loaded on all eight loads.
- vitest reads 531 pass and 1 expected fail; the failed file is `FourierField.smoke`'s `fourier-math` import. The gate reads 15 of 15.
- The typechecks read as P16.

No sheet or crop of the tip exists. At rest, this round changed only the code face's `font-display` and a panel that is closed by default.

**Worse than P16, measured:**

1. **Music Staff's frost step in Chromium** reads 6.79 and 6.9/255 in the frame the fade ends, against P16's 6.22 and 6.29 at the lift (`tone/tone-chromium.txt`). It is the same mechanism and one frame each way. The extra 0.6/255 is the new enter's last 60 Hz step, 0.971 to 1.000, landing in that frame; on `--ease-out` the last step was 0.996 to 1.000. Empty States' card reads 1/255 for the same reason, and WebKit reads 1.01/255.
2. **The first-paint entry under emulation** comes 40 to 56 ms after P16's on all nine loads. It shows only the background, before any content. First contentful paint comes 70 to 112 ms before P16's. `15863894f` has the same delay.
3. **The code face is `optional` in WebKit.** On a `codeFace` first screen, if the route's chunks paint before the face arrives and within 100 ms of its load's start, WebKit hides the mono figures until the face arrives or the 100 ms runs out. P16's `swap` face showed the fallback at once and swapped later. It was not observed: on every WebKit load of the tip the face was in hand at the first mono frame, on localhost. The likeliest case is an in-app navigation whose chunk is already warm.
4. **Mono that appears only on interaction** keeps the fallback face for its first showing in Chromium, with no swap. Typography's Mono register on a cold visit is the case: its pane is new on each reveal, so a later reveal takes the face. In WebKit, the same text is hidden for up to 100 ms, then shows the face, or the fallback when the load runs past 100 ms. P16 showed the fallback and swapped Fira Code in mid-view. The owner's rule allows this outcome, "a tween or does not happen", but on a cold first reveal the specimen shows SF Mono under the label Mono. Not filmed. The close verify booked the code face for this register and the shortcut keys.
5. **The chassis is larger than P16's**: StageSwap 89 code lines against 63, StoryCode 55 against 38, and `code-face.ts`, the colour hold and the tween are new.

**Worse than `15863894f`, all chosen or explained:**

- In WebKit at 1440, a cold press's open lands up to 0.283 of its travel in one film frame, against 0.135. Per 60 Hz frame both read the curve's 0.17. Intent first was the order's call.
- The WebKit sweep's code line reads 0.222 at 1440 (0.194 before). At 390 it improved, from 0.16 to 0.136.
- Tone: Empty States 1 (0.41 and 0.42 before); Music Staff 6.79 and 6.9 (5.92 and 6.11); WebKit 1.01 (0.06).
- A first open whose face or highlighter has not loaded by the press shows the fallback face, uncoloured, with the colours tweening in at rest. `15863894f` waited, then showed both. At 390 by tap this is every first open.
- The leave answers two frames later (equal to P16).
- WebKit's first contentful paint on `/data/metric` is equal within the spread.

## 7. `src/`

Untouched. `git diff --name-only 15863894f..d91764978` lists eight files under `demo/` and `index.html`. `git diff --name-only 1a423c80d..d91764978 -- src` and `git diff --name-only $(git merge-base master bl/demo) bl/demo -- src` both list nothing, and master touches none of `demo/`, `index.html` or `src/` since the merge base. The worktree has no tracked change. The measured build is `d91764978` (`tip/TIP.txt`), built by `vite.local-cache.config.ts`, which is the deploy config with only `cacheDir` changed. The register lint (`driver/register-lint.pattern`) finds nothing in the 299 lines it read: the added lines, the four commit messages and the Cure section.

## Blocking candidates, each judged twice

None holds.

1. **Can WebKit hide code-face figures on a first screen? (`optional`'s 100 ms window)**
   - First, against the hold rule: the page's first paint does not wait, and no code waits for the face. Its load runs beside the chunks, and in 55 cold WebKit loads of the three `codeFace` routes the face was in hand at the first mono frame.
   - Second, as the owner on a slow phone: the window needs a warm chunk or a fast chunk paired with a slow face, and the engine bounds it at 100 ms. The alternative is `swap`'s instant glyph change, which the law rules out, and the text face has carried the same rule since P16. Read it live.
2. **Under emulation, the first-paint entry comes 40 to 56 ms after P16's.**
   - First: it paints the background only, and the content paints 70 to 112 ms earlier than P16's.
   - Second: it does not wait on a font, since it lands at least 146 ms after the text face's response on every load. `15863894f`, which the close verify passed, has it too. It is a record correction, not a hold.
3. **Music Staff's frost step, 6.79 and 6.9/255 against P16's 6.22 and 6.29.**
   - First: it is one frame either way and the same mechanism, and 0.6/255 is below sight.
   - Second, against the "worse than P16" rule: the page is not worse to a reader. The step is the standing item the close verify booked, now carrying the enter's tail.
4. **In WebKit, a cold press's open lands up to 0.283 in one film frame.**
   - First: per 60 Hz frame it is the curve's 0.17, and the long frame is the engine mounting the code.
   - Second, against intent first: the hold that hid it started the panel two frames late. P16 opened the same way, with two instant swaps inside the travel. The tip removes those swaps.
5. **Mono that appears only on interaction shows the fallback on its first showing.**
   - First: no page breaks, and no glyph changes while shown.
   - Second: Typography's Mono specimen can show SF Mono on a cold first reveal. Starting the face's load as that page opens fixes it, and the close verify booked it. It belongs to the next pass.
6. **No sheet or crop of the tip.**
   - First: what changed at rest is the code face's display mode. The checker, sweep, lift and WebKit route read match the close's, line for line.
   - Second: the close verify looked at all fourteen sheets of `15863894f`. The tip owes a contact sheet against P16's after the deploy.
7. **The leave holds two frames after a variant press.**
   - First: it equals P16's Vue CSS Transition.
   - Second, against intent first: the driver offered the hold. The variant control's own press state is not this hold's.

## Record corrections

- The Cure's "first paint" is first contentful paint. In the same reads, Chromium's first-paint entry comes 40 to 56 ms after P16's on all nine loads, on `15863894f` as on the tip.
- `de5c40be2`'s message says no first switch's leave read over 0.2 in WebKit at 1440. The final measure on the same StageSwap reads Surface's first switch at 0.203. The Cure's Standing says so.
- "Each on one long frame mid-leave": the WebKit sweep's JSONL keeps no frame times for a leg, so the bank cannot show this.
- The Cure's WebKit line, "within 3 ms at the median", is the pooled medians. Per batch, `/data/metric` reads −17, +11 and +5 ms.

## Owed

Right after the deploy, on glass.babb.dev:

- A cold Safari load of `/data/metric` and `/forms/number-field`, and an in-app navigation to `/data/metric`: the figures are never blank, and never change face once shown.
- A cold Chromium load of `/`, `/data/metric` and `/forms/number-field`.
- A cold "Code" tap at 390, in Safari and Chromium.
- Typography's Mono register on a cold first reveal: which face it shows.
- A contact sheet of the tip against P16's close sheets.

For the next pass:

- The code face on Typography's Mono register, the shortcut keys and the dock's key hints: start its load as those surfaces can first appear.
- The copy button's icon and status text: a tween, or no change.
- The "Code" chevron's 0.264 first frame.
- Music Staff's and Paper & Glass's glass inside the faded layer.
- Command's height snap (O-390 d).
- Safari.app.
