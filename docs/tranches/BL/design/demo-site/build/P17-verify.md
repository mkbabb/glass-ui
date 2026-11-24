# P17, the verify

Seat: claude-opus-5-5 (asserted from the seat's own identity; Fable is out of quota until 2026-11-21, so this verify runs on Opus by the owner's standing ruling). 2026-11-17. Read only: no browser ran and nothing in the repo changed except this file. The pixel diffs, side-by-sides and leg tables below were made here with Pillow and Python over banked files and the worktree's kept crops, into the session scratchpad; none is banked.

Read: `P16.md` with its Close, `P16-close-verify.md`, `P17.md`, the P17 driver (`driver/demo-p17.js`), `git log --stat 1a423c80d..` on `bl/demo` and the diffs of the three demo commits after the fast-forward to `44c07aab6` (`b0278c1e1`, `1ca26d20f`, `d7fb1d1f2`), the tip `StageSwap.vue` whole, the tip `index.html` and the built `dist-demo/index.html` and `_headers`, every file under `shots/P17/` (the bite and tip sweeps in their cells, the checker in three cells, `leave-extra.txt`, the tone films and root reads on the P16 build, `faces-l1440.txt`, `variants.txt`, the Dialog lift, the run logs, the typecheck), the probes in `.p17/` that the record cites (`tip.sh`, `glass-survey.mjs` and its two outputs), the sweep's P17 lines in `driver/demo-site/sweep.mjs`, and `shots/P16/close/contact/` beside the crops. Judged against `OWNER-ORDER.md`, FORM line 123 ("every switch, disclosure and state change the page authors is tweened") and the owner's law that nothing changes instantly.

**`shots/P17/` holds no PNG.** No contact sheet and no crop was banked (the chain stopped before `contact`). The sweep's crops are kept in the worktree, untracked: 197 of the tip (`.p17/out/tip-crops`: every route at 1440 in both themes, the first 32 routes at 390) and 243 of the P16 build, taken by the same session's sweep 30 minutes earlier (`.p17/out/p16-crops`). Each tip crop was diffed against the P16 build's same crop, and the nine closed crops against `shots/P16/close/tip/`. The P16 contact sheets are built from crops of this kind, one first-screen crop per route.

## Verdict

**Merge.** No page is broken, empty or worse than P16. Every stage swap's leave is now one curve, 120 ms on `cubic-bezier(0.25, 0, 0.75, 1)`, that lands at most 0.185 of the fade in a 60 Hz frame, and the measured leave legs fall from 0.19–0.39 to 0.09–0.15 in every cell read. The head loads the two Latin faces without a preload, and WebKit's font warning is gone on the six routes read. Every tip crop matches the P16 build's within 24/255 except the four live pages that differ between any two captures. Nothing under `src/` changed.

What the merge leaves unwitnessed: the tip's StageSwap has not run in WebKit at all (the WebKit sweep cells were refused), the tone cure has no banked film of the tip in either engine, and the 390 sweep stopped at route 32. Deploy after the WebKit cells over the swaps run, which is the first step of the owed chain.

## `src/`

Untouched. `git diff --name-only master...bl/demo` lists `demo/chassis/variants/StageSwap.vue`, `demo/demo.css` and `index.html`; `-- src` lists nothing. `git merge-tree --write-tree master bl/demo` is clean against master `a8e8b9d44`. `bl/demo` and `origin/bl/demo` are both at `d7fb1d1f2`, the SHA `tip/TIP.txt` names.

`index.html` sits at the repo root, outside the `demo/` the order allowed. It is the demo's entry document (`demo/vite.demo-dist.config.ts:23`); the library's lib-mode build never reads it, and the preload item 2 names lives only there. The tests that read it (`layout-canon`: the viewport meta; `boot-graph`: the built modulepreload count) read nothing P17 changed. No test names StageSwap, and the one test that reads `demo.css` (`picker-lane` G1) reads its `@source` line, untouched.

## 1. Every leave a tween

**The code.** `b0278c1e1` moved the leave curve; `d7fb1d1f2` moved both fades from Vue's CSS classes to `el.animate`, with `LEAVE = { duration: 120, easing: "cubic-bezier(0.25, 0, 0.75, 1)" }` the one leave timing for every target of every swap. There is no other leave: every swap is StageSwap's (`rg StageSwap demo` lists 20 stories), and none sets a curve of its own. Stepped here by hand, the curve's steepest slope is 4/3 at its middle, so one 16.7 ms frame of 120 ms lands at most 0.185: the sweep's figure.

**The curve line** (the sweep reads the curve off the animation the swap starts, steps it at 60 Hz from every phase of the first frame):

| | 1440 dark | 1440 light | 390 dark touch |
|---|---|---|---|
| P16 build (`bite/tip/`) | 18 routes FAIL, 0.388 | 18 FAIL, 0.388 | 18 FAIL, 0.388 |
| tip (`tip/`) | 18 ok, 0.185 | 18 ok, 0.185 | 11 ok, 0.185; 7 not reached |

Settings' tabs and Constellation's presets, which no variant row drives, read 0.388 on the P16 build in three cells (`bite/leave/leave-extra.txt`) and were not read on the tip. They run the same function and constant.

**The frames.** The sampled leave legs, real frames at the headless rate, largest per cell: P16 0.277 (Timeline), 0.261 (Card), 0.388 (Music Staff); tip 0.150 (Paper Glass), 0.103 (Empty States), 0.103 (Dialog). Empty States at 390, P16's red row, reads 0.096 to 0.099 on all four switches, 15 frames each. A fade that ends mid-leave is handled: a press during an enter reads each part's opacity where it stands and leaves from there.

Holds.

## 2. The font warning, and a fallback flash

**The code.** The head declares the Latin text face (`optional`) and the Latin mono face (`swap`) in an inline `<style>`, then calls `document.fonts.load` for each; `demo.css` keeps the two Latin-ext faces. The inline script runs before any external stylesheet in the built HTML (Vite puts the entry and its 56 modulepreloads after it), so nothing blocks it. The built `<style>` points at the hashed woff2 (`/assets/plus-jakarta-sans-latin-eXO_dkmS.woff2`, `/assets/fira-code-latin-CHoedHDv.woff2`).

**The CSP** (Pages applies it; `vite preview` does not, so no browser reading in P17 ran under it). Recomputed here from the built `index.html`: the two inline scripts hash to `MOGEZdbx…` and `ThMflufT…`, the two `script-src` hashes in `dist-demo/_headers`. `style-src` carries `'unsafe-inline'` (reka-ui's Select needs it), so the new `<style>` is allowed; `font-src 'self'` covers `/assets/`. The live site will load it.

**The warning.** `font/variants.txt`, cold loads in WebKit on the item 2 build: P16's build warns on `/dock/rail`, Dialog, Sheet and Menu, and fetches the text face twice (`pjs<link> pjs<css>`); the head load fetches each face once (`pjs<css> fira<css>`) and warns on none of the six routes read but `/`, whose one warning names the entry chunk's modulepreload, as on P16. `d7fb1d1f2` changes only `StageSwap.vue`, so these are the tip's head and stylesheet bytes. The WebKit checker's line 12 on the tip was a refused step.

**A fallback flash.** The text face is `optional`, so it cannot swap: a page paints it from the first frame or never. Chromium paints it on every first screen: no tip crop differs from the P16 build's (which preloaded it) in any text, over 150 crops at 1440 and 35 at 390, and the `no preload` row of `variants.txt` shows what a miss looks like (the fallback, on every route read). The mono face is `swap` and could flash; on the head-load build it is loaded at the first text frame on `/`, `/display/card`, `/dock/rail`, `/dock` and `/data/metric` in Chromium and on six routes in WebKit, where P16's build painted 15 mono figures on `/data/metric` and 3 on `/dock/rail` in the fallback first (`bite/font/font-chromium-l1440.txt`). So P17 removes a mono flash P16 had. These are localhost reads; the live site's latency was not read on either build.

The cost: the mono face is now fetched on every route, including the 67 whose first screen paints no mono (`/containers/dialog` reads `pjs<css> fira<css>`). One request, no paint change.

Holds in Chromium as read and in WebKit on the item 2 build.

## 3. A card's tone at a travel's end

**The cause, read on the P16 build** (`bite/tone/root-*.txt`, the card's foot band over one held frame): in Chromium the pane at opacity 0.999 changes the band 5.56 to 10.22, a `clip-path` on the swap box 5.81 to 10.41, the card's own opacity 0.33 to 0.43, an overflow clip 0. WebKit stays under 0.4 in every hold. The P16 films (`bite/tone/tone-*.txt`) step 5.84 to 6.29 at the lift in Chromium and 0.24 at most in WebKit, so the line bites.

**The cure** applies those two reads and nothing else: each glass element fades by its own opacity, each part with no glass fades whole, and the bare wrappers between pass through; the travel clips with `overflow: clip` and `overflow-clip-margin: 3rem` where `@supports` finds it (Chromium), and keeps P16's `clip-path: inset(-3rem)` elsewhere (WebKit, whose glass samples through it). A pane with no glass, or with text of its own, still fades whole by the same animation. The survey (`.p17/out/glass-survey*.jsonl`, 20 swaps, every option, 1440 light) finds no wrapper between a pane and its glass that paints anything. In 13 of the 21 distinct glass-holding pane shapes it lists, the pane's only child is the glass element, so the fade moves one element, as P16's moved the pane; the other eight (Settings, Command's In a dialog, the Menu stage, Music Staff, Select, Paper Glass's two, Scroll) pass through one or more bare wrappers.

**The witness is not banked.** P17's tip column (0.32 to 0.43 after the fade, 0 at the lift) comes from a film of a build made before `d7fb1d1f2` was committed, with the same `StageSwap.vue`; its frames were not kept, and the banked tip films in both engines were refused. The mechanism is witnessed and the code applies it, so I expect the film to pass; until the film is banked, item 3 is built, not verified.

## 4. What the clip used to hide

Nothing new shows. At rest no swap clips, on P16 or the tip. The checker reads the same 1,517 / 1,517 / 1,504 passes and 22 / 22 / 35 n/a with no failure, line for line in structure as P16's close, and the nine closed crops (Dialog, Sheet, Menu in three cells) match `shots/P16/close/tip/` with no pixel over 24/255. During a travel the Chromium clip is the same rectangle 3rem out: an overflow clip with that margin and no border radius cuts where `inset(-3rem)` did. It differs in one case, a descendant positioned against an ancestor outside the swap, which an overflow clip does not cut; the survey finds one positioned part (Constellation's `div.constellation.absolute`), and there the swap box and its pane are themselves `position: absolute; inset: 0` (`constellation.stage.vue:96-100`), so the part sits against its own pane and the box's height is the stage's, with nothing to travel. The shadow-edge film was not rerun on the tip.

## 5. The measure on `d7fb1d1f2`

| Run | Tip | Against P16 |
|---|---|---|
| Build | rc 0, `404.html` written | as P16 |
| Typecheck | `tsconfig.json` clean; `tsconfig.test.json` the two `fourier-math` errors | as P16 |
| Checker, 78 routes, Chromium | 1,517 / 1,517 / 1,504 pass, 0 fail | as P16 |
| Sweep 1440 dark and light | 77 pass, Command's height snap | P16 build: 18 swap routes FAIL on the curve line; else the same |
| Sweep 390 | 32 of 78 routes: 30 pass, Command, `/dock/chrome` cut by the zone stop (rc 143) | P16 build: Command and the 11 swap routes read FAIL on the curve line |
| Crops | 8 of 197 differ over 24/255 (below) | |
| WebKit sweep, WebKit checker, tone films, lift over every swap, contact sheets, vitest, export gate | not run: refused | |

The crops that differ: `/feedback` and `/feedback/progress` at 1440 in both themes (the progress indicator's moving end, a box about 20 px across, up to 191/255), Blob at 1440 (1 px dark, 746 px light up to 66) and Constellation at 1440 (the drifting field, 1,085 and 1,098 px). These move on their own between any two captures; P16-close-verify found the same set. Dialog's 1440-light arrival matches the P16 build's on this pair: both show the dark veil rectangle, so its two states (O-390 e) are the library's, as P16-close-verify judged. Empty States at 390 and Dialog's arrival, looked at side by side, are the same page in the same face.

## Anything worse than P16

1. **The enter's first frame at 390.** On the first switch of five routes at 390 (Empty States, Dialog, Data Table, Card, Music Staff) the sampled enter's largest step is 0.258 to 0.265, where the P16 build read 0.111 to 0.144; every later switch reads 0.137 to 0.164, as before. 0.264 is the enter curve's own 60 Hz first-frame share, so on the tip that first enter's first frame lands a whole 60 Hz frame late at the headless rate. On P16 the same first switch lost its frame in the leave (0.25 to 0.39). The largest step of any first switch fell from 0.39 to 0.27, under FORM's 0.40. A small regression on one leg, inside a net gain; P17 reports the enter's 0.264 but not this move.
2. **Parts fade one by one.** Where faded parts overlap, mid-fade the lower one shows through the upper (P17 says so). It can only arise where the walk passes through a wrapper with more than one child: Settings, Select, the Menu stage, Command's In a dialog, Paper Glass, and Music Staff's figure. Not read in pixels.
3. **The fade's targets are chosen once, from computed styles.** A part that mounts after the enter starts inside a wrapper the walk passed through would not fade; a bare wrapper's outline or scrollbar does not fade; text directly inside a `display: contents` element would not fade. A code read finds none of these on the 20 swaps (`display: contents` sits only on dock stories and Expandable Container, none a StageSwap route), so this is a future stage's trap, not a page today. About 50 lines of DOM heuristics now carry a Chromium backdrop rule in the chassis.

None holds the merge.

## Blocking candidates, each judged twice

None holds.

1. **The tip's StageSwap never ran in WebKit.**
   - First, against the hold rule: no evidence of a broken page. WebKit takes the same standard calls as Chromium (`el.animate` with an implicit end keyframe, `getComputedStyle`, Vue's JS hooks), and its CSS is P16's `clip-path` unchanged; a WebKit without unprefixed `backdropFilter` would fade each pane whole, P16's way.
   - Second, as the owner (Chrome and Safari both, and Playwright's WebKit is not Safari): a gap in the witness, not a defect. It is the first step owed; deploy waits on it.
2. **The tone cure has no banked film of the tip.**
   - First: the P16 build's root reads witness the mechanism, and the cure applies exactly the two holds that read 0.43 and 0.
   - Second, against the owner's rule that a claim needs a captured artefact: item 3 stands as built, not verified. The film is owed; a page is not worse for it.
3. **The enter's first frame at 390 rose to 0.26 on five routes.**
   - First: under 0.40, and the same first switch's leave fell from up to 0.39 to 0.10.
   - Second, against "nothing changes instantly": 0.26 is over the 0.2 the order set for leaves, and it is the enter curve itself (`--ease-out`, 200 ms), standing since before P16. The next pass's item, not this merge's.
4. **The 390 sweep stopped at route 32.**
   - First: the checker read all 78 routes at 390 with no failure, and all 35 of the 390 crops taken match P16's.
   - Second: the seven swap routes not reached at 390 run the same function and constant that read 0.185 on them at 1440 in both themes.
5. **`index.html` is outside `demo/`.**
   - First: not `src/`, and not read by the library build or by any test that P17's change could move.
   - Second: item 2 cannot be done anywhere else.

## Copy

P17 paints no new word: the three commits add no template text, and StageSwap's targets are elements. `rg -P -i -f driver/register-lint.pattern` over the 134 added lines of `git diff 44c07aab6..d7fb1d1f2 -- demo index.html`, the three commit messages and `P17.md`: no hits.

## Record corrections

- `1ca26d20f`'s message says twelve first screens paint the mono face; the survey reads eleven (`P17.md` says so).
- `index.html` lines 24 to 29 still say the brand faces are "loaded by demo.css's @font-face rules"; the Latin pair is now declared in the head (the next comment block says so). `demo/_headers` lines 2 to 4 and `demo/vite.demo-dist.config.ts` lines 47 to 49 still name one inline script, the dark-mode stamp; there are two. The code hashes every inline script, so the CSP is right.
- `P17.md` section 3, the "tip Chromium" column: a film of an uncommitted build with its frames not kept.
- `P17.md` does not say the tip's crops exist (`.p17/out/tip-crops`, 197) or that the first enter at 390 now reads 0.26 (above).

## Owed, after the reboot

In this order, on one build of the tip: the WebKit sweep cells over every swap, `/`, `/dock` and `/containers`, before any deploy; the tip's tone films in Chromium and WebKit, banked with their frames; the 390 sweep over all 78 routes; Settings' and Constellation's leave; the WebKit checker on the four font routes; the shadow-edge film on the tip in Chromium (the clip changed kind); the lift over every swap in three cells; contact sheets, read against P16's; vitest and the export gate. Then for the next pass: the enter's first frame (0.264 at 60 Hz), and the fade's targets chosen at runtime (above). Standing from P16-close-verify: Command's height snap, Navigation's blank lower quarter at 1440, Pager's bare "2", WebKit's modulepreload warning on `/`, Safari.app not run, O-390 e and O-391 as booked.
