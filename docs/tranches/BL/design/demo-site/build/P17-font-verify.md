# P17, the font verify

Seat: claude-opus-5-5 (asserted from the seat's own identity). 2026-11-22. Read only. No browser ran, and nothing in the repo changed except this file. I re-ran one check, the demo typecheck (`vue-tsc --noEmit -p tsconfig.json` under `guarded --light`): rc 0, no output.

Read:

- `P17.md`, its Live and Font sections, with its Cure for the claims the Font section revisits; `P17-cure-verify.md`; the cure driver's bar for item 1 (`driver/demo-p17-cure.js`).
- `git log --stat d91764978..` on `bl/demo`: one commit, `8eefeb6dc`, which is also `origin/bl/demo`. Its diff touches `demo/chassis/code/code-face.ts`, `index.html` and a comment in `demo/demo.css`.
- The tip's `code-face.ts`, `router.ts`, `main.ts` (imports and mount), `StoryCode.vue`, `index.html` and `demo.css`'s two `@font-face` rules, each whole.
- Every reading under `shots/P17/font/`: `cause-*`, `isolate-*`, `paint-*` (text and JSONL), `latefilm-held.txt` and its crops (I viewed the Metric pair and the cure's crop), `tip/font/*`, the three sweep cells (tallied with `sweepsum.py`), `typecheck.txt` and `vitest-code.txt`. For comparison, `shots/P17/live/paint-webkit*.txt` and `shots/P17/cure/item1/paint-chromium-emulated.txt`, `cure/font/faces-*.txt` and `cure/tip/sweep-*.txt`.
- The worktree's `.p17/font/dist-tip` (the commit's build) against `dist-f1` (the build the readings ran on): they differ only in `index.html`, by the line wrap of one comment. The entry chunk `index-Ch5OBke8.js` holds the `new FontFace("Fira Code", "url(/assets/fira-code-latin-CHoedHDv.woff2) …")` call. That woff2 is byte-identical to `dist-demo`'s.

## Verdict

**Merge.** Nothing blocks.

- The root is shown: reproduced, isolated and cured, in that order, on readings that pair the builds.
- The cure is the smallest at that root.
- No first paint waits on a font. The face is fetched only where it paints. No text changes face in view on any route read of this commit. Nothing under `src/` changed.

**Not met, carried from `d91764978`:** under emulation, first contentful paint on `/data/metric` and `/forms/number-field` is 30 and 34 ms after P16's at the median. This commit does not move it. The cure driver set "no later than P16's build" as item 1's bar, and `P17-cure-verify.md` passed it on a table this pass could not reproduce. It needs an owner ruling and a record correction, not a fix in this commit (section 5).

**Corrections and small fixes, none blocking:**

1. The `index.html` comment says of both Latin faces that "one that arrives later is never swapped in … no text changes face once painted". The text face is still a CSS face and is remade by the same rebuild, as the Font section's own Standing says. Narrow the clause to the code face, or say what holds for the text face.
2. P17.md's Cure table (the `d91764978` column) and `P17-cure-verify.md` ("70 to 112 ms before P16's") still state a paint lead that the Font pass measured as a 28 to 40 ms lag. Each needs a line pointing to the Font section.
3. P17.md's Cure says, of an `optional` face that missed the first layout in Chromium, "later layouts take the face". With this commit that very likely no longer holds within the same document (section 6). It should be read and the line corrected.

## The eight questions

| Question | Answer |
|---|---|
| Is the named root shown: RED reproduced, isolated, GREEN after? | Yes. RED on `d91764978` 16 of 19 held loads, GREEN 0 of 20. A single forced `@layer` insert remakes the face and narrows Metric's figures from 560 to 542 px on `d91764978`, and does neither on `8eefeb6dc` (section 1) |
| Is the cure the smallest at that root? | Yes. One face moves from a CSS rule to a script `FontFace` with the same descriptors, and `loadCodeFace()` calls that face's own `load()` (section 2) |
| Does any first paint now wait on a font? | No. No code awaits the face. With the face's response held off the wire, Chromium paints within 12 ms of P16 under the same hold (section 3) |
| Is the face still fetched only where it paints? | Yes, in both engines, as on `d91764978` (section 4) |
| Is a cold first paint under emulation no later than P16's? | No on two routes: 30 and 34 ms later at the median, as on `d91764978`. On `/` it is at or before P16's (section 5) |
| Does the Code press still move on its own frame? | Yes by the code: nothing between the press and the open changed. Not filmed on this commit (section 6) |
| Does any text change face in view on any route read? | No, on all 64 reads of this commit that track glyphs, in both engines (section 7) |
| Did anything touch `src/`? | No (section 8) |

## 1. The root

**RED, reproduced.** Chromium, emulated, 1440, the code face's response held 3100 ms on `/data/metric` and 3500 ms on `/forms/number-field` so it lands after the content mounts, as on the live site. Ten reads per build, the builds alternating (`paint-chromium-emulated-held-*.txt`). Port 5481 is `d91764978`, 5482 is `8eefeb6dc` and 5483 is P16.

- `d91764978`: the ink box changes from 404.96 to 392.54 px on 9 of 9 Metric loads (the tenth timed out waiting for content) and from 201.36 to 195.21 px on 7 of 10 Number Field loads, and ends in Fira Code Light.
- `8eefeb6dc`: no change on 20 of 20, and CDP reports SF Mono at the end.
- The Metric crops show it: on `d91764978`, "482.7" goes from the thin fallback at 8609 ms to the heavier Fira Code at 9448 ms. On the cure the crop at 9433 ms is still the fallback.

**The natural trigger.** `cause-d91764978.txt`, unheld: PresetEditor's sheet joins the active sheets at the end (9402 ms), and ConfiguratorLayer's joins ahead of it 8 ms later. In that frame all nine CSS faces get new objects (the code face goes from #2 to #11), and a `loadingdone` lists the text face, the code face and a fallback. On `/` no face is remade.

**Isolated.** `isolate-*.txt`: `/data/metric`, no emulation, face held 2.5 s, two reads per build, one forced event every 600 ms after the face has loaded.

- On `d91764978`, the six events before the `@layer` insert leave the face at #1 and the figures at 560 px: none, an appended `@font-face` style, an appended plain style, and plain, `@keyframes`, `@container` and `@media` inserts ahead of the entry sheet. The `@layer` insert makes #2 and 542 px, and removing the inserts makes #3. Both reads agree.
- On `8eefeb6dc`, the face stays #1 and the figures stay at 560 px through every event, on both reads.

**GREEN, mechanism.** `cause-cure-held.txt`: the same out-of-order join still remakes every CSS face (9405 and 9851 ms), and the script face keeps its object (#9) across both. The cure's crops match their final pixels from the second film frame to the film's end, past the face's arrival and the rebuild.

Judged twice. First: the records tie the change to one frame, and in that frame the join comes out of order and the face objects are new. Second: the forced test reproduces that frame in isolation, and the cure flips it. The four plain inserts, which force a style recalc, rule out a recalc as the cause.

## 2. The cure's size

- In `code-face.ts`, about a dozen lines of logic: the import of the woff2 `?url`, the `FontFace` with the rule's weight range, `display: "optional"` and unicode range, `document.fonts.add`, and `face.load()` in place of `document.fonts.load('1em "Fira Code"')`. The rest is a comment that names the cause.
- `index.html` loses the eleven-line `@font-face` rule, and two comments are updated.
- Nothing else changes: the router, StoryCode, CodeBlock and the CSS.

What else could act at the root. Loading lazy sheets in order would mean serial fetches. Dropping `@layer` from chunk sheets would mean changing the library's cascade. Starting the face earlier only narrows the window. None is smaller. The last is the only local one, and it does not close the window.

Two side effects of the move, both harmless:

- **Face order.** The script face sits after the CSS faces in the set, so for the four code points both Fira ranges share (U+0304, U+0308, U+0329, U+2020), the Latin `optional` face now wins over the Latin-ext `swap` face. Before, the Latin-ext face won. The `faces-*` rows show only the reordered face list (I diffed them against `d91764978`'s with the timings stripped).
- **Test DOMs.** The guard is `"fonts" in document`, so a DOM without a font set gets no face.

## 3. First paint and fonts

**The code.**

- `router.ts`: `beforeEach` calls `loadCodeFace()` with `void`, and `beforeResolve` awaits only the route's chunks.
- `main.ts` mounts after `router.isReady()`.
- The face is added while the entry chunk evaluates: `main.ts` imports `router.ts`, which imports `code-face.ts`. That is before the app mounts, so no mono text is laid out before the face exists. The built entry chunk confirms it.

**Held, Chromium, emulated** (the same files as section 1), first contentful paint, median:

- `/data/metric`: P16 8548, `d91764978` 8560, `8eefeb6dc` 8558.
- `/forms/number-field`: P16 8986, `d91764978` 8996, `8eefeb6dc` 8990.

With the face's bytes off the wire, the cure paints with P16. So no first paint waits for the face.

**WebKit.** Unheld, the medians of `d91764978` and the cure are equal or the cure's is earlier. The held WebKit reads (208 to 268 ms) are later than the unheld ones (133 to 225 ms). Those reads run with Playwright's request interception on and the unheld ones do not, and the live `d91764978` showed the same held-versus-unheld shift on `/` (first content frame 279 and 282 against 200 to 294 ms). No held WebKit read of `d91764978` was banked in this pass, so these reads compare no builds, and the Font section does not use them to.

## 4. Where the face is fetched

- **`paint-webkit.txt`**: the code face was fetched on all 15 loads of `/`, `/data/metric` and `/forms/number-field` per build, and loaded by the first mono frame. `/display/card` fetched no code face on any of its ten loads.
- **Tip font step** (`tip/font/`):
  - WebKit fetches the face on `/` and `/dock/rail` only, not on `/display/card`, Dialog, Sheet or the Dropdown Menu.
  - Chromium fetches it on `/`, `/data/metric`, `/dock` and `/dock/rail`. `/dock`'s first mono frame comes at 240 ms with the face loaded, so it paints there.
- **Held WebKit reads**: they also fetch the Latin-ext code face once the Latin one fails. The live `d91764978` did the same (`live/paint-webkit-face1500.txt`), and the glyphs stay the same on every load.

## 5. Against P16

Unheld, Chromium, emulated, ten reads of each route per build, alternating in one run (`paint-chromium-emulated.txt`, `-home.txt`):

| Route | P16 | `d91764978` | `8eefeb6dc` |
|---|---|---|---|
| `/` (3 reads) | 5672 to 5692 (5684) | 5680 to 5696 (5680) | 5672 to 5684 (5672) |
| `/data/metric` | 8536 to 8576 (8558) | 8576 to 8612 (8590) | 8572 to 8616 (8588) |
| `/forms/number-field` | 8964 to 9004 (8980) | 8996 to 9048 (9020) | 9000 to 9036 (9014) |

The cure's ranges touch P16's only at their edges (8572 to 8576 and 9000 to 9004). The lag holds across ten alternating reads, and it is `d91764978`'s: the two builds' medians differ by 2 and 6 ms. P16 swaps the code face in view on 23 of 23 of these loads, and the cure on none.

Judged twice. First, against the driver's bar for item 1 ("no later than P16's build under the same emulation"): the bar is not met on two of three routes, and the record says the opposite in two places (correction 2). Second, against this commit: the commit does not cause the lag or change it, and `d91764978`, already on `master` and live, has the same lag and the face swap. Holding this commit would keep the live fault without moving first paint. The bar can be met only by starting the face after first paint. With this commit, a code face that misses the first screen probably stays missed for the whole document in Chromium (section 6), so that start would put every cold `codeFace` first screen in the fallback for the session, for 30 ms on an 8.6 s load. That is a trade for the owner to rule on, not a fix this commit owes.

## 6. The Code press, and what follows a miss

**The press.**

- `StoryCode.vue` is unchanged: `setOpen` sets `faceIn` from `codeFaceLoaded()` and `open` in the same handler, and the press awaits nothing.
- `codeFaceLoaded()` reads the same flag.
- `loadCodeFace()` keeps its one promise per page. `face.load()` resolves at once for a face that layout already loaded, and on an error it rejects into the same catch, so `loaded` stays false, as `document.fonts.load` behaved.
- Nothing on the path from the press to the open changed. The tip sweep's Code check passes on 60 of 60 routes in all three cells, with the largest open step at 0.154, 0.116 and 0.14, against `d91764978`'s 0.151, 0.13 and 0.126.
- No press film ran on this commit. The Font section's Not run says so.

**After a miss (inference, not filmed).** In the isolation, the rebuild makes Chromium resolve every face again, and the kept script face still gives the fallback, though its file has loaded. On `d91764978`, the new CSS object was taken at that point. So after the code face misses a painted layout, Chromium very likely gives the fallback to later mono text in the same document too: the next Code open with `faceIn` true, or an in-app visit to another `codeFace` route. That is what WebKit already does, since it counts the late face as `error`. It changes nothing in view, so it meets the law. It does replace the Cure section's "later layouts take the face" (correction 3), which was likely the rebuild at work. To read it: a Code open after a held first screen, on the next press film.

## 7. Face changes on route reads

These are the reads of `8eefeb6dc` that compare the mono glyphs at the first mono frame and again 2 s later, 64 in all. No glyph changed on any of them:

- Chromium, emulated, unheld: 23 loads.
- Chromium, emulated, held: 20 loads.
- WebKit, unheld: 15 loads.
- WebKit, held: 6 loads.

The films show nothing changing past the face's arrival and the rebuild. Two more checks do not compare glyphs but agree:

- The tip's `faces-*` rows, 78 routes in two cells, read the face loaded at the first screen and the mono text in Fira Code Light.
- The sweep reads as `d91764978`'s in all three cells: 77 of 78 rows pass, and the one fail, Command's second switch, is the same on `d91764978`.

The text face is not cured by this commit and stays exposed to the same rebuild. Under this emulation it lands 4 s before any text (1.36 s against first contentful paint at 5.7 s and later), so no read can show it. It is named in the Font section's Standing.

## 8. `src/`

`git diff --name-only d91764978..8eefeb6dc` lists two files under `demo/` and `index.html`. The commit reads `src/fonts/fira-code/fira-code-latin.woff2` through a `?url` import and changes nothing under `src/`.

## Considered for blocking, each judged twice

1. **First paint against P16** (section 5). Not met, but not this commit's, and holding the commit leaves the live fault. Not blocking. It is carried to the owner.
2. **No live read of this commit.** First: the fault was found live over HTTP/2, and the cure's earlier local measure missed it. Second: the held runs recreate the live order (the content mounts, the face arrives, then the out-of-order join) and reproduce the fault on 16 of 19 loads. The forced test pins the mechanism apart from timing. Not blocking. The live read is owed after the deploy, with the live read's own probe.
3. **No press film.** First: the open's timing is the P17 cure's main claim. Second: no file on the press path changed, and the one changed call keeps its contract. Not blocking. It is owed with the next film, together with the after-a-miss read in section 6.
4. **The text face's exposure.** First: it is the same root on another face, and the commit's comment overclaims for it. Second: no read can trigger it under the emulation the bar names, and a script face cannot start at parse with the hashed URL. Not blocking. Fix the comment (correction 1) and keep it in Standing.

## Owed

- The live read of this commit on glass.babb.dev after the deploy, Chromium under the same emulation, `/data/metric` and `/forms/number-field`, ten cold loads each.
- A cold press film, with one held-face case: a Code open on a `codeFace` page whose first screen missed the face.
- An owner ruling on first paint against P16 (section 5), and the record corrections 1 to 3.
