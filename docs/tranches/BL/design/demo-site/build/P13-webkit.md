# P13, the WebKit read

Seat: claude-opus-5-5, an independent check before deploy. Worktree `.claude/worktrees/bl/demo`, branch `bl/demo`, tip `e7c0be688`. Nothing tracked was changed, staged or committed.

The close swept 78 routes in Chromium. This reads the same 78 routes in WebKit, in two cells: 1440×900 light, and 390×844 dark with touch.

## How it was read

- **Build.** `vite build --config vite.local-cache.config.ts` (the demo-dist config, cache in the worktree), through `guarded --light`. It is a 1.7 s cached build, the same call the close made; my first heavy-queued attempt waited 10 minutes behind five other sessions' probes and was withdrawn before it started.
- **Serve.** `vite preview` on 127.0.0.1:5461 through `guarded --timeout 90`, stopped by PID at the end.
- **Engine.** Playwright 1.61.1 WebKit (build 2311), headless. It reports itself as `Version/26.5 Safari/605.1.15`. It has no `navigator.gpu`; WebGL2 is on, renderer "Apple GPU". This is the Playwright engine build, not Safari.app: the two have disagreed on this repo before, so every fault below is a WebKit fault to be confirmed in Safari, not a Safari verdict.
- **Runs.** Every browser run went through `guarded --exclusive webkit`: one browser per run, a new context per route, both closed in `finally`. There were lock waits behind other sessions' WebKit runs and no refusals. Pixels come from `page.screenshot`, decoded in Node; no page canvas was ever read.
- **Script.** `.p13/webkit.mjs` (untracked), reusing the close checker's text-run, clip and canvas-owner logic from `check.mjs`. Per route it records:
  - console errors and page errors (warnings counted apart);
  - the first frames after navigation: up to 10 captures in 1.8 s from commit;
  - sideways overflow: `scrollWidth > clientWidth` on `#demo-main` and on the document;
  - live canvases and their owners: shell, stage, card or other;
  - text runs cut by a box that is not a scroller, text that ellipsizes, and text runs overlapping in the same layer;
  - whether each stage, and each landing card's preview, painted.
- **Planted proof.** Every line can fail. A planted run on `/display/buttons` and `/substrates/aurora` in both cells (`shots/P13/webkit/webkit-planted.jsonl`) caught all of these:
  - a console error and a page error;
  - a black cover 250 ms after first paint;
  - two overlapping runs and a clipped run;
  - a 4000 px box;
  - a second black canvas, caught both as a second canvas and as a black field.

  The one miss is the 4000 px box at 390 on `/substrates/aurora`: neither `main` nor the document grew. Something on that editor page clips its content sideways; it was not traced further.

Files: `shots/P13/webkit/webkit-l1440.jsonl`, `webkit-m390.jsonl` (one row per route), the fault frames, and the crash logs `crash-0` to `crash-5`.

## Verdict

**Two faults to settle before deploy, both on the Substrates pages, and one small demo fault.**

| # | Fault | Routes, cells | Owner | Blocks deploy? |
|---|---|---|---|---|
| W1 | The page crashes in dark mode | `/substrates`, `/substrates/blob`; dark at 390 and at 1440 | library token (`shadow.css:108-109` with `dark-arm.css:92`) | **Yes, if Safari 26 shares it.** Confirm in Safari.app first |
| W2 | The Fourier field paints nothing where WebGPU is absent | `/substrates/fourier-field` (both cells), its card on `/substrates` | library by design; the demo shows a blank stage with no word | Not in a Safari with WebGPU; a blank stage in one without |
| W3 | The Fourier Field lede is cut with an ellipsis at 390 | `/substrates/fourier-field`, 390 | demo (the lede is too long for one line) | No |

Everything else reads clean in both cells:

- 76 of 78 routes render at 390 dark (the other two are W1), and 78 of 78 at 1440 light;
- 0 console errors and 0 page errors;
- 0 sideways overflow;
- the live canvases match Chromium's C1 counts on every route that rendered;
- 0 overlapping text runs;
- 1 clipped run (W3);
- no black or blank frame after the first paint.

## W1. `/substrates` and `/substrates/blob` crash the WebKit page in dark

**What.** In dark mode the WebKit content process dies 175 to 310 ms after the navigation commits, before the cards or the Blob paint. The page never renders. The sweep's settled screenshot threw `Target crashed` on both routes at 390 dark, and both render at 1440 light.

**Where it holds** (`crash-1-cells.txt`, two attempts per variant: one taking screenshots, one only waiting):

| Variant | `/substrates/blob` | `/substrates` |
|---|---|---|
| 390 dark, touch | crash at 194 / 184 ms | crash at 241 / 220 ms |
| 390 dark, no touch | crash at 194 / 182 ms | crash at 216 / 232 ms |
| 390 light, touch | renders | renders |
| 1440 dark | crash at 200 / 183 ms | crash at 241 / 183 ms |
| 1440 light | renders | renders |

So the trigger is the colour scheme, not the phone cell, and screenshots don't cause it. Both pages draw the Blob. The dark pages that draw aurora, constellation and the Fourier field do not crash.

**What it is not** (`crash-2-webgl-refused.txt`): with WebGL refused before any page code runs (a `getContext` stub, no live canvas touched), the crash stays (183 to 192 ms). With reduced motion it also stays. The Blob's renderer and its animation are cleared.

**What it is** (`crash-3-css.txt`, dark at 390, two attempts each):

| Change | Result |
|---|---|
| none | crash |
| the Blob's CSS chunk (`blob-Bu_Rhk7a.css`) aborted | renders |
| `.goo-blob-wrapper { filter: none }` | renders |
| the same two `drop-shadow()`s with literal colours | renders |
| `--blob-shadow-color` set to one literal colour | renders |

The live value is read off the wrapper with its filter switched off (`crash-4-exact-strings.txt`):

```
--shadow-color:      color-mix(in oklab, #0b0a09, black 50%)
--blob-shadow-color: color-mix(in srgb, color-mix(in oklab, #0b0a09, black 50%) 22%,
                                        color-mix(in oklab, #0b0a09, black 50%))
--blob-color:        #352a22   (set inline on the wrapper)
```

Put verbatim on one `div` of a blank page with no demo code, the ambient shadow string crashes WebKit within 10 ms. It crashes as a `filter` or as a `box-shadow`, in either colour scheme.

**The smallest crashing value** (`crash-5-smallest-value.txt`, as `color:` on a blank page):

| Value | Result |
|---|---|
| `X = color-mix(in oklab, #0b0a09, black 50%)` | renders |
| `color-mix(in srgb, X 20%, transparent)` | renders |
| `color-mix(in srgb, X 22%, X)` | **crash** |
| the same with `hsl()` in place of the hex | **crash** |
| the same with the inner mixes `in srgb` | **crash** |
| `color-mix(in srgb, #352a22 22%, X)` (one arm plain) | renders |

A `color-mix()` whose two arms are both `color-mix()` expressions kills this WebKit build. A composed page (`crash-0-composed-chain-renders.txt`) renders when the inner arms differ, so the case is two nested-mix arms.

**Why only dark, and why only the Blob.**

- In light, `--shadow-color` is `var(--foreground)`, a plain `hsl()`.
- The dark arm sets it to `color-mix(in oklab, var(--neutral-0), black 50%)` (`src/styles/tokens/dark-arm.css:92`).
- `--blob-shadow-color` is declared on `:root` as `color-mix(in srgb, var(--blob-color, var(--shadow-color)) 22%, var(--shadow-color))` (`src/styles/tokens/shadow.css:108-109`). `--blob-color` is unset at `:root`, so both arms become the same nested mix: the crashing shape.
- The Blob is the only consumer whose filter uses it, through `--blob-shadow-ambient` and `--blob-shadow-contact`.

**Frames.**

- `shots/P13/webkit/substrates-m390-last-frame-before-crash.png`: the last capture, at 229 ms. The page is laid out (title, lede, empty card plates) when it dies.
- `substrates_blob-m390-last-frame-before-crash.png`: the Blob page's last capture, ground only.

**Cure (library; listed, not made).** Either cure removes the crashing shape:

- Make dark `--shadow-color` a plain colour (it computes to near-black, about `rgb(1 1 1)`), so no token mixes two nested mixes.
- Or declare `--blob-shadow-color` where `--blob-color` is set (on `.goo-blob-wrapper`). That also cures L-W1 below, but a Blob with no `color` would still mix two copies of the shadow colour, so the first cure is the sound one.

**Before deploy:** open `/substrates/blob` in Safari.app in dark mode. If Safari 26 shares this build's fault, a dark-mode Safari visitor gets the "problem repeatedly occurred" page on two routes.

## W2. The Fourier field paints nothing in this WebKit

**What.** `/substrates/fourier-field` shows an empty stage in both cells, and the Fourier card on `/substrates` at 1440 is an empty plate. Chromium draws the epicycles in both places. The canvas is mounted but changes 0 px over 800 ms (`fields-two-frames.txt`). The automatic flat-field line missed it: the plate's gradient keeps its deviation at 2.0 to 5.1. It was found by eye against the Chromium crops.

**Why.** The field is WebGPU-only by design (`src/components/fourier-field/README.md`, "WebGPU only": where WebGPU is absent it "paints nothing — a blank stage you can ask about"). This WebKit build has no `navigator.gpu`. Aurora, blob and constellation fall back to WebGL2 and paint.

**What a visitor sees.** A blank stage, the editor beside it, and no word that the field needs WebGPU. Safari 26 on macOS 26 is expected to ship WebGPU, which this build cannot show. An older Safari, or any browser without WebGPU, gets this blank stage.

**Frames.**

- `shots/P13/webkit/substrates_fourier-field-l1440-blank-field.png`
- `substrates_fourier-field-m390-blank-field-and-clipped-lede.png`
- `substrates-l1440-blank-fourier-card.png`
- side by side with Chromium: `cmp-substrates_fourier-field-l1440-webkit-vs-chromium.png`, `cmp-substrates-l1440-webkit-vs-chromium.png`

**Owner.** The library's single renderer is a ruling, not a bug. Whether the demo says something on a blank stage is the owner's call.

## W3. The Fourier Field lede is cut at 390

`p.story-header-lede` ellipsizes its own text: "A curve drawn by summing circles, one term at…". The line needs 398 px and has 358. The Chromium sweep's crop of the same cell shows the same cut (`shots/P13/sweep/substrates_fourier-field-m390.png`), so it is not WebKit's. The close's checker has no truncation line, which is why it passed there.

It is the only clipped run on 154 route-cells. Frame: `substrates_fourier-field-m390-blank-field-and-clipped-lede.png`. Owner: demo. A lede that fits one line at 390 cures it.

## Measured, and not faults

**The black first capture.** On 70 of 78 routes in each cell, the first capture after commit (17 to 53 ms) is pure black (0,0,0, deviation 0). The ground follows at 107 to 726 ms. That black is this WebKit build capturing a view that has not painted yet. The controls (`.p13/webkit-control.mjs`, `.p13/webkit-bisect.mjs`):

- A `data:` page, and an HTTP page with the demo's inline ground and no stylesheet, both capture their ground on the first frame (13 to 47 ms).
- The same ground with **one stylesheet held 200 ms**, and no demo code at all, also captures pure black first in some runs. It did at 25 ms (light, an `h1` body) and at 17 ms (dark, the demo's empty `#app` body), then showed ground at 220 to 236 ms. In other runs the capture waited for the first paint.
- In the bisect of the demo's own `index.html`, removing the stylesheet link makes the first capture ground at 17 to 26 ms. Removing the module script, the preloads or the colour-scheme script does not.

So the black frame is the window in which a render-blocking stylesheet is pending, captured before WebKit's first paint. Safari holds the previous page or shows its blank background then; it does not paint black.

After the first paint, on every route in both cells:

- the first painted frame is the ground (light 70/78, dark 75/76) or the page itself;
- no frame is black or blank.

**Console warnings.** There are 167 warnings over the two cells, all the same kind: WebKit reporting that a preloaded asset was not used within a few seconds of load. It names the Jakarta woff2 on every route, and the entry chunk on the landings. Chromium logged none. Jakarta does paint: on the 108 titles where the width test is conclusive, the laid-out width matches the face (after letter-spacing) and not the fallback. The other 46 wrap or are too short to tell.

**`/` at 390 shows one live card canvas, Chromium counts two.** The second, the Compositions card about 3000 px down, is in the DOM but reads not visible while its card is below the fold. The DOM is the same in both engines; the difference is my liveness filter.

**Landing card fields hold still.** The aurora, blob and constellation card canvases on `/` and `/substrates` change 0 px over 800 ms in WebKit, and the same in Chromium (headless shell with the close's GPU flags). The aurora page's own stage animates in both (WebKit 4.28, Chromium 3.57 mean change). This is the cards' design, not an engine difference.

**Fields at rest, by eye against the Chromium crops:** `/`, `/substrates`, the constellation page at 390, the Navigation dock and Auth Shell at 1440 read the same in both engines, Fourier aside.

**One to look at in Safari: the Surface plate at 390 dark.** WebKit's resting glass plate on `/display/surface` reads greyer and less warm than Chromium's over the same field. The field moves, so one frame from each engine can't separate a backdrop-filter difference from a different moment of the field. It is not counted as a fault. Read it in Safari beside Chrome.

## Library note found on the way

**L-W1. The Blob's colour never reaches its shadow.** `--blob-shadow-color` is meant to tint the shadow with the bead's own `--blob-color` (`shadow.css:98-100`). It is substituted at `:root`, where `--blob-color` is unset. So it is always `color-mix(in srgb, S 22%, S)`, which is just S, while the wrapper sets `--blob-color: #352a22` (the live read above). The tint does nothing in either mode. Owner: library. Declaring the token on the wrapper cures it (see W1's cure).

## Per route

`Live canvases` counts canvases with a visible, non-zero box. `First painted frame` is the first capture after the pre-paint black; "ground" means the page ground, "content" means the page already painted. Stage `sd` is the luma deviation of the stage region at rest.

### 1440×900 light

| Route | Console | First painted frame | Overflow | Live canvases | Text clipped or overlapping | Stage | Fault |
|---|---|---|---|---|---|---|---|
| `/` | 0 | ground at 348 ms | none | card 2 | none | 11 cards | – |
| `/compositions` | 0 | content at 355 ms | none | card 1 | none | 3 cards | – |
| `/compositions/auth-shell` | 0 | ground at 329 ms | none | stage 1 | none | painted (sd 27.85) | – |
| `/compositions/settings` | 0 | ground at 192 ms | none | shell 1 | none | painted (sd 17.61) | – |
| `/compositions/empty-states` | 0 | ground at 298 ms | none | shell 1 | none | painted (sd 18.73) | – |
| `/containers` | 0 | content at 409 ms | none | shell 1 | none | 9 cards | – |
| `/containers/dialog` | 0 | ground at 257 ms | none | shell 1 | none | painted (sd 5.08) | – |
| `/containers/sheet` | 0 | ground at 244 ms | none | shell 1 | none | painted (sd 5.68) | – |
| `/containers/popover` | 0 | ground at 212 ms | none | shell 1 | none | painted (sd 11.3) | – |
| `/containers/dropdown-menu` | 0 | ground at 336 ms | none | shell 1 | none | painted (sd 5.93) | – |
| `/containers/tooltip` | 0 | ground at 190 ms | none | shell 1 | none | painted (sd 6.85) | – |
| `/containers/accordion` | 0 | ground at 212 ms | none | shell 1 | none | painted (sd 13.8) | – |
| `/containers/expandable-container` | 0 | ground at 227 ms | none | shell 1 | none | painted (sd 20.89) | – |
| `/containers/command` | 0 | ground at 179 ms | none | shell 1 | none | painted (sd 21.21) | – |
| `/containers/configurator` | 0 | ground at 302 ms | none | shell 1 | none | painted (sd 10.6) | – |
| `/data` | 0 | content at 319 ms | none | shell 1 | none | 6 cards | – |
| `/data/table` | 0 | ground at 270 ms | none | shell 1 | none | painted (sd 23.95) | – |
| `/data/data-table` | 0 | ground at 232 ms | none | shell 1 | none | painted (sd 21.93) | – |
| `/data/sortable-list` | 0 | ground at 194 ms | none | shell 1 | none | painted (sd 13.99) | – |
| `/data/infinite-scroll` | 0 | ground at 206 ms | none | shell 1 | none | painted (sd 24.03) | – |
| `/data/timeline` | 0 | ground at 199 ms | none | shell 1 | none | painted (sd 15.56) | – |
| `/data/metric` | 0 | ground at 244 ms | none | shell 1 | none | painted (sd 19.66) | – |
| `/display` | 0 | content at 357 ms | none | shell 1 | none | 6 cards | – |
| `/display/buttons` | 0 | ground at 266 ms | none | shell 1 | none | painted (sd 17.44) | – |
| `/display/surface` | 0 | ground at 450 ms | none | stage 1 | none | painted (sd 9.87) | – |
| `/display/card` | 0 | ground at 282 ms | none | shell 1 | none | painted (sd 17.7) | – |
| `/display/badge` | 0 | ground at 197 ms | none | shell 1 | none | painted (sd 29.68) | – |
| `/display/atoms` | 0 | ground at 314 ms | none | shell 1 | none | painted (sd 13.24) | – |
| `/display/music-staff` | 0 | ground at 524 ms | none | shell 1 | none | painted (sd 29.91) | – |
| `/dock` | 0 | content at 437 ms | none | shell 1 | none | 10 cards | – |
| `/dock/nav` | 0 | ground at 303 ms | none | stage 1 | none | painted (sd 17.17) | – |
| `/dock/chrome` | 0 | ground at 647 ms | none | stage 1 | none | painted (sd 16.62) | – |
| `/dock/rail` | 0 | ground at 355 ms | none | stage 1 | none | painted (sd 14.67) | – |
| `/dock/figure-tools` | 0 | ground at 726 ms | none | stage 1 | none | painted (sd 37.48) | – |
| `/dock/dials` | 0 | ground at 375 ms | none | stage 1 | none | painted (sd 41.92) | – |
| `/dock/canvas-tools` | 0 | ground at 485 ms | none | stage 1 | none | painted (sd 6.11) | – |
| `/dock/transport` | 0 | ground at 381 ms | none | stage 1 | none | painted (sd 14.49) | – |
| `/dock/pager` | 0 | ground at 304 ms | none | stage 1 | none | painted (sd 15.04) | – |
| `/dock/corner-controls` | 0 | ground at 351 ms | none | stage 1 | none | painted (sd 15.57) | – |
| `/dock/action-row` | 0 | ground at 284 ms | none | stage 1 | none | painted (sd 15.94) | – |
| `/feedback` | 0 | ground at 340 ms | none | shell 1 | none | 4 cards | – |
| `/feedback/alert` | 0 | ground at 574 ms | none | shell 1 | none | painted (sd 15.43) | – |
| `/feedback/toast` | 0 | ground at 409 ms | none | shell 1 | none | painted (sd 15.52) | – |
| `/feedback/progress` | 0 | ground at 542 ms | none | shell 1 | none | painted (sd 38.98) | – |
| `/feedback/skeleton` | 0 | ground at 499 ms | none | shell 1 | none | painted (sd 10.18) | – |
| `/forms` | 0 | content at 503 ms | none | shell 1 | none | 9 cards | – |
| `/forms/inputs` | 0 | ground at 638 ms | none | shell 1 | none | painted (sd 14.54) | – |
| `/forms/textarea` | 0 | ground at 559 ms | none | shell 1 | none | painted (sd 18.24) | – |
| `/forms/select` | 0 | ground at 335 ms | none | shell 1 | none | painted (sd 7.59) | – |
| `/forms/checks` | 0 | ground at 461 ms | none | shell 1 | none | painted (sd 18.39) | – |
| `/forms/slider` | 0 | ground at 627 ms | none | shell 1 | none | painted (sd 9.83) | – |
| `/forms/number-field` | 0 | ground at 310 ms | none | shell 1 | none | painted (sd 9.98) | – |
| `/forms/toggle` | 0 | ground at 564 ms | none | shell 1 | none | painted (sd 9.29) | – |
| `/forms/chip` | 0 | ground at 425 ms | none | shell 1 | none | painted (sd 11.11) | – |
| `/forms/labeled-field` | 0 | ground at 469 ms | none | shell 1 | none | painted (sd 16.36) | – |
| `/foundations` | 0 | content at 383 ms | none | shell 1 | none | 6 cards | – |
| `/foundations/colors` | 0 | ground at 553 ms | none | shell 1 | none | painted (sd 43.45) | – |
| `/foundations/typography` | 0 | ground at 420 ms | none | shell 1 | none | painted (sd 47.97) | – |
| `/foundations/radii` | 0 | ground at 357 ms | none | shell 1 | none | painted (sd 15.91) | – |
| `/foundations/shadows` | 0 | ground at 323 ms | none | shell 1 | none | painted (sd 22.8) | – |
| `/foundations/paper-glass` | 0 | ground at 263 ms | none | stage 1 | none | painted (sd 17.08) | – |
| `/foundations/icons` | 0 | ground at 317 ms | none | shell 1 | none | painted (sd 13.47) | – |
| `/motion` | 0 | content at 402 ms | none | shell 1 | none | 5 cards | – |
| `/motion/springs` | 0 | ground at 298 ms | none | shell 1 | none | painted (sd 11.24) | – |
| `/motion/scroll` | 0 | ground at 276 ms | none | shell 1 | none | painted (sd 16.22) | – |
| `/motion/deck` | 0 | ground at 362 ms | none | shell 1 | none | painted (sd 22.2) | – |
| `/motion/handmark` | 0 | ground at 221 ms | none | shell 1 | none | painted (sd 42.1) | – |
| `/motion/text-motion` | 0 | ground at 310 ms | none | shell 1 | none | painted (sd 29.5) | – |
| `/navigation` | 0 | ground at 286 ms | none | shell 1 | none | 4 cards | – |
| `/navigation/tabs` | 0 | ground at 277 ms | none | shell 1 | none | painted (sd 9.5) | – |
| `/navigation/carousel` | 0 | ground at 350 ms | none | shell 1 | none | painted (sd 19.87) | – |
| `/navigation/pager-dots` | 0 | ground at 348 ms | none | shell 1 | none | painted (sd 7.92) | – |
| `/navigation/toc-tracking` | 0 | ground at 249 ms | none | shell 1 | none | painted (sd 14.47) | – |
| `/substrates` | 0 | ground at 318 ms | none | card 4 | none | Fourier card blank | **W2** |
| `/substrates/aurora` | 0 | ground at 288 ms | none | stage 1 | none | painted (sd 23.21) | – |
| `/substrates/blob` | 0 | ground at 328 ms | none | stage 1 | none | painted (sd 14.87) | – |
| `/substrates/constellation` | 0 | ground at 288 ms | none | stage 1 | none | painted (sd 11.38) | – |
| `/substrates/fourier-field` | 0 | ground at 250 ms | none | stage 1 | none | Fourier field blank | **W2** |

### 390×844 dark, touch

| Route | Console | First painted frame | Overflow | Live canvases | Text clipped or overlapping | Stage | Fault |
|---|---|---|---|---|---|---|---|
| `/` | 0 | ground at 286 ms | none | card 1 (+1 below the fold) | none | 11 cards | – |
| `/compositions` | 0 | ground at 272 ms | none | card 1 | none | 3 cards | – |
| `/compositions/auth-shell` | 0 | ground at 171 ms | none | stage 1 | none | painted (sd 37.38) | – |
| `/compositions/settings` | 0 | ground at 156 ms | none | shell 1 | none | painted (sd 23.55) | – |
| `/compositions/empty-states` | 0 | ground at 171 ms | none | shell 1 | none | painted (sd 24.49) | – |
| `/containers` | 0 | ground at 239 ms | none | shell 1 | none | 9 cards | – |
| `/containers/dialog` | 0 | ground at 160 ms | none | shell 1 | none | painted (sd 8.49) | – |
| `/containers/sheet` | 0 | ground at 107 ms | none | shell 1 | none | painted (sd 9.66) | – |
| `/containers/popover` | 0 | ground at 118 ms | none | shell 1 | none | painted (sd 14.63) | – |
| `/containers/dropdown-menu` | 0 | ground at 171 ms | none | shell 1 | none | painted (sd 8.26) | – |
| `/containers/tooltip` | 0 | ground at 162 ms | none | shell 1 | none | painted (sd 10.83) | – |
| `/containers/accordion` | 0 | ground at 190 ms | none | shell 1 | none | painted (sd 23.16) | – |
| `/containers/expandable-container` | 0 | ground at 115 ms | none | shell 1 | none | painted (sd 22.48) | – |
| `/containers/command` | 0 | ground at 107 ms | none | shell 1 | none | painted (sd 25.41) | – |
| `/containers/configurator` | 0 | ground at 109 ms | none | shell 1 | none | painted (sd 24.81) | – |
| `/data` | 0 | ground at 254 ms | none | shell 1 | none | 6 cards | – |
| `/data/table` | 0 | ground at 147 ms | none | shell 1 | none | painted (sd 34.77) | – |
| `/data/data-table` | 0 | ground at 171 ms | none | shell 1 | none | painted (sd 31.58) | – |
| `/data/sortable-list` | 0 | ground at 135 ms | none | shell 1 | none | painted (sd 22.99) | – |
| `/data/infinite-scroll` | 0 | ground at 142 ms | none | shell 1 | none | painted (sd 41.33) | – |
| `/data/timeline` | 0 | ground at 164 ms | none | shell 1 | none | painted (sd 13.91) | – |
| `/data/metric` | 0 | ground at 162 ms | none | shell 1 | none | painted (sd 28.04) | – |
| `/display` | 0 | ground at 228 ms | none | shell 1 | none | 6 cards | – |
| `/display/buttons` | 0 | ground at 164 ms | none | shell 1 | none | painted (sd 19.44) | – |
| `/display/surface` | 0 | ground at 173 ms | none | stage 1 | none | painted (sd 11.91) | – |
| `/display/card` | 0 | ground at 175 ms | none | shell 1 | none | painted (sd 22.97) | – |
| `/display/badge` | 0 | ground at 135 ms | none | shell 1 | none | painted (sd 36.35) | – |
| `/display/atoms` | 0 | ground at 143 ms | none | shell 1 | none | painted (sd 20.23) | – |
| `/display/music-staff` | 0 | ground at 183 ms | none | shell 1 | none | painted (sd 13.78) | – |
| `/dock` | 0 | ground at 220 ms | none | shell 1 | none | 10 cards | – |
| `/dock/nav` | 0 | ground at 177 ms | none | stage 1 | none | painted (sd 12.26) | – |
| `/dock/chrome` | 0 | ground at 407 ms | none | stage 1 | none | painted (sd 14.21) | – |
| `/dock/rail` | 0 | ground at 137 ms | none | stage 1 | none | painted (sd 12.94) | – |
| `/dock/figure-tools` | 0 | ground at 169 ms | none | stage 1 | none | painted (sd 18.64) | – |
| `/dock/dials` | 0 | content at 617 ms | none | stage 1 | none | painted (sd 14.92) | – |
| `/dock/canvas-tools` | 0 | ground at 164 ms | none | stage 1 | none | painted (sd 10.47) | – |
| `/dock/transport` | 0 | ground at 176 ms | none | stage 1 | none | painted (sd 12.64) | – |
| `/dock/pager` | 0 | ground at 279 ms | none | stage 1 | none | painted (sd 11.93) | – |
| `/dock/corner-controls` | 0 | ground at 181 ms | none | stage 1 | none | painted (sd 11.6) | – |
| `/dock/action-row` | 0 | ground at 252 ms | none | stage 1 | none | painted (sd 18.35) | – |
| `/feedback` | 0 | ground at 307 ms | none | shell 1 | none | 4 cards | – |
| `/feedback/alert` | 0 | ground at 294 ms | none | shell 1 | none | painted (sd 22.8) | – |
| `/feedback/toast` | 0 | ground at 267 ms | none | shell 1 | none | painted (sd 27.7) | – |
| `/feedback/progress` | 0 | ground at 336 ms | none | shell 1 | none | painted (sd 23.42) | – |
| `/feedback/skeleton` | 0 | ground at 260 ms | none | shell 1 | none | painted (sd 10.71) | – |
| `/forms` | 0 | ground at 244 ms | none | shell 1 | none | 9 cards | – |
| `/forms/inputs` | 0 | ground at 171 ms | none | shell 1 | none | painted (sd 22.8) | – |
| `/forms/textarea` | 0 | ground at 171 ms | none | shell 1 | none | painted (sd 32.55) | – |
| `/forms/select` | 0 | ground at 176 ms | none | shell 1 | none | painted (sd 12.43) | – |
| `/forms/checks` | 0 | ground at 174 ms | none | shell 1 | none | painted (sd 24.94) | – |
| `/forms/slider` | 0 | ground at 218 ms | none | shell 1 | none | painted (sd 17.33) | – |
| `/forms/number-field` | 0 | ground at 248 ms | none | shell 1 | none | painted (sd 19.17) | – |
| `/forms/toggle` | 0 | ground at 199 ms | none | shell 1 | none | painted (sd 13.57) | – |
| `/forms/chip` | 0 | ground at 227 ms | none | shell 1 | none | painted (sd 26.67) | – |
| `/forms/labeled-field` | 0 | ground at 223 ms | none | shell 1 | none | painted (sd 20.84) | – |
| `/foundations` | 0 | ground at 273 ms | none | shell 1 | none | 6 cards | – |
| `/foundations/colors` | 0 | ground at 195 ms | none | shell 1 | none | painted (sd 45.11) | – |
| `/foundations/typography` | 0 | ground at 220 ms | none | shell 1 | none | painted (sd 53.1) | – |
| `/foundations/radii` | 0 | ground at 202 ms | none | shell 1 | none | painted (sd 9.52) | – |
| `/foundations/shadows` | 0 | ground at 199 ms | none | shell 1 | none | painted (sd 19.86) | – |
| `/foundations/paper-glass` | 0 | ground at 208 ms | none | stage 1 | none | painted (sd 12.07) | – |
| `/foundations/icons` | 0 | ground at 175 ms | none | shell 1 | none | painted (sd 21.63) | – |
| `/motion` | 0 | ground at 278 ms | none | shell 1 | none | 5 cards | – |
| `/motion/springs` | 0 | ground at 199 ms | none | shell 1 | none | painted (sd 25.85) | – |
| `/motion/scroll` | 0 | ground at 219 ms | none | shell 1 | none | painted (sd 6.04) | – |
| `/motion/deck` | 0 | ground at 192 ms | none | shell 1 | none | painted (sd 16.21) | – |
| `/motion/handmark` | 0 | ground at 196 ms | none | shell 1 | none | painted (sd 36.7) | – |
| `/motion/text-motion` | 0 | ground at 135 ms | none | shell 1 | none | painted (sd 32.85) | – |
| `/navigation` | 0 | ground at 215 ms | none | shell 1 | none | 4 cards | – |
| `/navigation/tabs` | 0 | ground at 203 ms | none | shell 1 | none | painted (sd 10.48) | – |
| `/navigation/carousel` | 0 | ground at 177 ms | none | shell 1 | none | painted (sd 75.81) | – |
| `/navigation/pager-dots` | 0 | ground at 216 ms | none | shell 1 | none | painted (sd 7.86) | – |
| `/navigation/toc-tracking` | 0 | ground at 160 ms | none | shell 1 | none | painted (sd 24.49) | – |
| `/substrates` | page crashed | – | – | – | – | not rendered | **W1** |
| `/substrates/aurora` | 0 | ground at 178 ms | none | stage 1 | none | painted (sd 75.91) | – |
| `/substrates/blob` | page crashed | – | – | – | – | not rendered | **W1** |
| `/substrates/constellation` | 0 | ground at 203 ms | none | stage 1 | none | painted (sd 23.37) | – |
| `/substrates/fourier-field` | 0 | ground at 156 ms | none | stage 1 | lede ellipsized 398/358 px | Fourier field blank | **W2, W3** |

## Scripts

All in `.claude/worktrees/bl/demo/.p13/` (untracked):

- `webkit.mjs`: the sweep.
- `webkit-control.mjs`, `webkit-bisect.mjs`: the first-frame control and bisect.
- `webkit-crash.mjs`, `webkit-crash-gl.mjs`, `webkit-crash-css.mjs`, `webkit-crash-exact.mjs`, `webkit-crash-color.mjs`, `webkit-crash-min.mjs`: W1.
- `webkit-fields.mjs`: the two-frame field read; `ENGINE=chromium` gives the comparison run.
- `webkit-table.py`: the tables above.
