# Carousel jitter: the fold (O-421)

Seat: claude-opus-5-5, asserted from its own system identity, 2026-11-23. It folds `critique.md` into `ROOT.md`, `cure.patch` and `near-snap.patch`, re-reading each objection's evidence first.

Engines: **Chromium** is Playwright's headless shell 149.0.7827.55 on the GPU lane (`--use-angle=metal --enable-gpu-rasterization`); frame claims come only from it. **WebKit** is Playwright's WebKit 26.5, not Safari. Builds: `git archive d19e12559` (v11.1.0) into `trees/` with `node_modules` linked to the repo's, one tree each for v11.1.0, the first cure as written, the folded cure and the folded cure with the near-snap patch; served on 5381 to 5384; every run under `guarded`, WebKit under `--exclusive webkit`. The trees are deleted.

## Rulings

| # | Objection | Ruling | Reason |
|---|---|---|---|
| B-1 | The lag is removed without the owner | **Accept** | `restraint.md` says a cure never removes momentum, and `probe-green-lagkept` (16 reversals, 12 px, causes 1 and 2 cured) with the WebKit write table shows a velocity lag needs a per-frame write or loses the wheel; that trade is the owner's, so the removal stays as the default and becomes question 1, with the settle change (flat 1440 swipe 331 → 696 ms) and O-327 marked part-cured (its fade is untouched). |
| M-1 | WebKit's wheel still reverses and the table says 0 | **Accept** | Re-read the rows: every GREEN WebKit travel wheel steps the strip back to 0 once (hero 21 px at 51 → 60 ms, 28 px at 90 → 99 ms; demo 13 and 8 px) between still rows; `analyze.mjs` now skips still rows and §2.2 is re-printed. Three runs per variant at both widths agree: the step needs both the scale's animation and the dimming on the slide, and moving the dimming onto the content (`travel-opc`) trades it for a forward snap mid-wheel at 1440, so no cause is named and `travel-opc` stays out. |
| M-2 | The reconcile divides by a pitch nothing re-measures | **Accept** | Filmed: after 390 → 844 the first cure rests on member 1 with the dots on 3, and after 1440 → 1000 on member 3 with member 2 active (Chromium); the folded cure reads live member offsets in `scrollTo` and the reconcile, re-measures the pitch on a `ResizeObserver`, and holds both cells in both engines. Both stale comments are rewritten. |
| M-3 | Atlas's path onto the cure is not stated | **Accept** | Re-read the line and found more: its deck half is already placed in 11.1.2 by O-372 as `b1bd7d088` (`u/glass-fixes-on-11.1.0`), which collides with `cure.patch`; ROOT §7 now gives each item a side (11.1.2 takes the live offsets, the resize re-measure, the idle floor, the release-once, the reduced-motion jump and the zeroed velocity; the spring turn is question 2; the autoplay is 11.3.0), and O-421 closes only on atlas's deck. |
| M-4 | Three routes never ran; the keyboard claim fails | **Accept in part** | Run on glass's own build in both engines: in Chromium, with a link in each slide, the first ArrowRight turns and focus falls to `body` when the slide goes inert, so later presses do nothing, on v11.1.0 and the cure alike; in WebKit, Tab reaches only the dock's buttons, never the strip or a link; §5's row is corrected and the focus fault is placed as a new row, not cured in 11.1.2 (it predates the cure and is not jitter). Reduced motion is cured, not only listed: v11.1.0 animated 64 rows over 575 ms under `reduce` (the first cure 62 over 601 ms), the folded cure arrives in one frame. Resize ran (M-2). Right-to-left is listed as not run. |
| M-5 | The near-snap witness credits the cure's gains to the API | **Accept** | Filmed the fair cells on the cure: the consumer's own active-only rule, the slot's `moving` with all eight figures mounted, and `moving` with a page-drawn window all run 0 reversals and 0 frames over 25 ms in every touch cell; the mount window adds nothing measurable on this lane, and ROOT §4 now says so. |
| M-6 | The near-snap API is too large and its rest has no floor | **Accept** | Shrunk to one `moving` ref on the context and the item's slot (+16 −6 lines, +36 B); the window stays with the page (`tools/app-extra/mounts/carousel-near.vue` shows it); an engine without `scrollend` now gets one from a 150 ms idle floor, filmed by removing the event: the held cell and the frozen-figure cell hold in both engines. A `scrollend` lost in a hidden document is not covered and is listed. |
| m-1 | RECORD.md still states what ROOT retracts | **Accept** | A correction block heads `RECORD.md` (the commit source, the WebKit swallow, the detector change and its new v11.1.0 counts). |
| m-2 | "One 38 ms gap … alike" is not in the rows | **Accept** | Re-read: the first Next at 1440 runs 17.6 (record), 25.0 (v11.1.0), 26.3 and 33.3 (first cure), 32.6 (first near-snap) and 23.5 ms (folded cure), at different loads; §1.1 now gives those numbers and claims no cause. |
| m-3 | "Rows are 17 ms" does not match | **Accept** | Every WebKit cell in `probe-red`, `probe-green` and `probe-green-fold` has a 10 ms median row; the record's own WebKit runs were 17 and 33 ms; §2.2 says which and makes no WebKit frame claim. |
| m-4 | The glide column misplaces the cold frames and undersells daraksha's keys | **Accept** | The cold-context frames leave the comparison (no script attributed, cold contexts only) and the keys row now says daraksha's window-level arrows work, while the native strip's arrows stop once a focused link's slide goes inert. |
| m-5 | The continuous feed has no reader in glass | **Accept in part** | Named: it is public (the slot's and the expose's `deck`), the study's figure reads it, and ROOT says the near-snap `moving` replaces that reading; stopping the feed is a 12.0.0 change beside the `memberLag` exports, not a patch. |
| m-6 | Firefox loses the travel scale | **Accept** | In the release note (§3). |
| m-7 | The `window` projection switches scale in one frame | **Accept in part** | Recorded as unfilmed and pre-existing; no page in glass or atlas uses `window` (searched v11.1.0's `src` and `demo`), so it is placed with the commit-timing row for 11.3.0, not cured here. |
| m-8 | The owner questions | **Accept** | The dock-entrance question is held until a carousel dock exists; the press question loses Apple's 1 s ease (it outlasts the hold's 900 ms floor); every question now has A, B and a default; the feel questions name the live before-and-after page they need, which this seat does not build. |

## Applied

- `cure.patch` (11.1.2, +167 −90 in five files): live member offsets (`offsetOf`, clamped to the strip's end) for `scrollTo` and the reconcile, which commits the member the strip rests on (`restingOn`); a `ResizeObserver` that re-measures the pitch; the 150 ms idle floor dispatched as `scrollend` where the engine has none; `instant` for a press under reduced motion; the two stale comments rewritten. The rest is the first cure unchanged.
- `near-snap.patch` (11.3.0, +16 −6 in four files): one `moving` ref on `useDeckSnap`, `CarouselContext` and the item's slot. `near`, `live` and `rested` are gone.
- `tools/analyze.mjs`: a reversal is a moving step against the last moving step; still rows are skipped. `record/summary.json`, `record/tables.md` and every `witness/probe-*/summary.json` are regenerated.
- `tools/witness.mjs`: cells `resize`, `keyboard`, `reduce`, `noend`, `frozen`. `tools/snapback.mjs`: `--repeat`, and per-frame backward steps with each `scrollend` classed back or on. `carousel-hero.vue`: `live=moving`, `live=slot` through `carousel-near.vue`, `link=1`. `build-tree.sh` keeps the pictures between trees.
- `ROOT.md` rewritten from these; `STUDY.md` and `SITES.md` written.

## Re-witnessed

- Chromium, folded cure: the full GREEN set (`witness/probe-green-fold/`, 18 cells) and every logic cell (`witness/witness.{red,cure1,green,near}-fold.{chromium,webkit}.json`; run logs `witness/run-fold-*.log`). Every touch, wheel and pager cell runs 0 reversals and rests 0 px off; the carry ratio is bare's (0.99, 0.96).
- Chromium, near-snap: `witness/probe-nearsnap-fold/` (12 cells: consumer active-only on the cure, `moving` with eight mounted, `moving` with the page's window).
- WebKit: the logic cells on v11.1.0 and the folded cure, the frozen-figure cell, the snap-back variants three times at each width, and the GREEN wheel and pager cells (ROOT §2.2, §2.3).
- The first cure as written (Chromium): resize, reduce and no-`scrollend` cells, to show the faults M-2, M-4 and M-6 name.
- Unit: `tests/components/carousel/contract.test.ts` passes on the folded tree; `public-surface.spec.ts` fails the same seven built-`dist/` checks on v11.1.0 and the fold (no library build in a study tree). `vue-tsc --noEmit` is clean on the near-snap tree and, on the folded tree, flags only the study page's use of `moving`.

## 2026-11-24: the second challenge

Seat: claude-opus-5-5, asserted from its own system identity. It answers the second critique's three blocking items and its notes, re-reading each against built pages first.

Builds: `git archive release/11.1.1` (ca61ce5b6) into `trees/red` and `trees/green` (docs left out, `node_modules` linked to the repo's), `cure.patch` applied to green with `patch -p1`, then this fold's edits; both demos built with `tools/build-tree.sh` and served on 5381 and 5382, every run under `guarded`, WebKit under `--exclusive webkit`. **Chromium** is Playwright's headless shell 149.0.7827.55 on the GPU lane; **WebKit** is Playwright's WebKit 26.5, not Safari. The 1-minute load ran 30 to 48 (the machine was shared). The trees are deleted.

### Rulings

| # | Item | Ruling | Reading |
|---|---|---|---|
| 1 | The travel scale no longer rests at 1 on a strip that centres its slides | **Accept** | `tools/scale-stage.mjs` on the built `?c=carousel` (CarouselStage). Chromium: 11.1.1 rests members 0, 1, 2 at 0.965 / 1 / 0.965 at 1440 and 390. The cure without the stage's line rests at 0.9741 / 0.9901 / 0.965 (1440) and 0.9675 / 0.9961 / 0.965 (390), and member 1 leaving forward swells to 0.9999 at +0.28 of a pitch (1440) and 0.9998 at +0.1 (390) before it shrinks. With `scroll-padding-inline` on the strip it rests at 0.965 / 1 / 0.965 at both widths and falls steadily, within 0.0012 of 11.1.1 in flight. WebKit 26.5 reads the same numbers to the fourth decimal. The snap rests at one pitch in every variant (940 px at 1440, 330 at 390), so the scroll-padding moves no snap point. The stage states the offset once (`--inset`) for both properties, and the stylesheet comment states the rule. |
| 2 | Row ids in the src comments the patch adds | **Accept** | "O-421", "(O-327, O-421)" and "I4b —" are gone and the sentences kept. No other added src line carries a row id. "LAW 1" stays: it names the file's own design law, not a row. |
| 3 | SITES.md's sign-off, voice and pointer | **Accept** | Both notes are in Mike's voice ("What I saw", "until I decide", "Tell me when your deck runs 11.1.2"), end "Thanks,\nMike", name the two engines inside each note, and offer the study on request instead of a path. |
| n-1 | race, held and noend cannot rerun on 11.1.1 | **Recorded** | ROOT §11. The library source they read is v11.1.0's. |
| n-2 | A press 60 or 150 ms after a lift ends 3 px short | **Recorded** | ROOT §1.1, as the critique's reading. |
| n-3 | `overflow: hidden` on a member | **Accept** | Read: every member 1.0 at every hold in Chromium and in WebKit; `overflow: clip` keeps the scale. One sentence in the stylesheet comment and the release note. |
| n-4 | Safari before 26 also loses the travel scale | **Accept** | Release note, STUDY and the atlas note. |
| n-5 | Stale comments | **Accept** | `styles.css`'s header, `projection.ts`'s LAW 1 and LAW 3, `index.ts`, and the stage's comment, whose claim cause 7 made false. |
| n-6 | A non-zero starting value | **Accept** | `watch(count, () => deck.go(active.value), { once: true, flush: "sync" })` in `useCarousel`. Sync, so the deck holds `active` before the snap arm's mount seat, which then seats it instantly. The `start` cell (hero, `v-model:active` 2 at mount): Chromium 11.1.1 rests at 0 with member 0 active while the dots and the caption say 3; the cure seats 2072 px (1440) and 844 px (390) in the first sampled frame with member 2 active. WebKit the same, seated in the first sampled frame. The unit test fails without the watch. The mount now emits one `change(2, 0)`. |
| n-7 | SITES item 3's rule fails at a fractional pitch | **Accept** | The atlas note now reads "still" from the strip's own `scroll` and `scrollend` on 11.1.2 (listeners on `CarouselContent` reach the strip; checked in happy-dom) and from `moving` on 11.3.0. ROOT §4 gives the tolerance and the first-frame velocity of 0. |
| n-8 | No unit test; `b1bd7d088`'s test dropped | **Accept** | `tests/components/deck/snap-travel.test.ts` in the patch, 9 tests: the strip's own report never scrolls it (`heading`), a press goes to the member's own offset, the hold releases once, the reconcile, reduced motion, rest velocity 0, the idle floor, the inbound model and the start value. The tree: 9 of 9 pass (with the deck and carousel contract tests, 15 in 3 files). Unpatched 11.1.1: 8 fail (the press offset passes, equal members). The cure without the start watch: only the start test fails. `vue-tsc --noEmit` is clean; `-p tsconfig.test.json` reports only the fourier-math self-import a study tree cannot resolve. |
| n-9 | No stacking context under `projection="none"` | **Refuse a rule; note it** | The containment came from the per-frame scale; glass's one CarouselItem page (the stage) relies on neither a stacking context nor a fixed-position child, and a rule that restores them would have no other job. ROOT §1.1 and the release note say how a page restores either. Unfilmed. |
| n-10 | `scrollend` after an instant press | **Read** | The `reduce` cell now counts the strip's `scrollend`: Chromium fires one, at 90 ms (1440) and 44 ms (390), in the frame the strip arrives. WebKit fires one too, 12 ms (1440) and 18 ms (390) after the strip arrives. So the near-snap `moving` falls after an instant press in both engines, and `near-snap.patch` needs no change for it. |
| n-11 | `trees/` not ignored | **Accept** | `.gitignore` gains `trees/`. |
| n-12 | STUDY's "all ten faults pass in both engines" | **Accept** | Rewritten: every fault's test holds in Chromium; in WebKit the wheel, pager and logic tests hold apart from the one snap-back, and the touch faults have no WebKit test. |
| n-13 | `critique.md` trips the lint | **Accept** | "In short:" became ":". Every .md in the folder passes the register lint. |

### Applied

- `cure.patch` now applies to release/11.1.1: the library in seven files (+188 −101), the stage's scroll-padding and comment (+7 −3), and the new test (+228). It adds 123 B gzip over 11.1.1's Carousel chunks (3459 → 3582 B), 1 B more than the folded cure.
- `near-snap.patch`: only its `useCarousel.ts` hunk header moved (-48 → -51); its lines are unchanged and it applies on the new cure.
- `ROOT.md`: the second fold's note, causes 2 and 7, §1.1 (the press after a lift, the stacking context, `overflow: hidden`), §2.4, §3's bytes and release note, §4's tolerance, §11, §12. `STUDY.md`: the patch, Safari before 26, the centred strip, the start value, the test scope. `SITES.md`: voice, sign-offs, engines, item 3.
- `tools/scale-stage.mjs` (new); `tools/witness.mjs`: the `start` cell and the `scrollend` count in `reduce`; `carousel-hero.vue`: `start=k`.

### Re-witnessed

- Chromium: `scale-stage` on 11.1.1 and the cure (`witness/scale-stage-chromium.log`); the `model`, `start` and `reduce` cells on both (`witness/run-fold2-{red,green}-chromium.log`).
- WebKit, after 70 minutes in the machine-wide WebKit queue: `scale-stage` and the `model`, `start` and `reduce` cells on both builds (`witness/scale-stage-webkit.log`, `witness/run-fold2-{red,green}-webkit.log`).
- Unit and type checks on the green tree, as n-8.
