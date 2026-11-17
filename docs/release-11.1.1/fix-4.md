# 11.1.1 fix seat 4 (before critic 4)

Seat: claude-opus-5-5. Worktree `.claude/worktrees/release-11.1.1`, branch `release/11.1.1`, from
`0aa062575` (critique 3). Every orchestrator note in this directory was read. Two bind this
seat's work beyond the defect list: the note after critique 2 (the press ruling and its cell, the
five close paths, the fill read on every exit frame) and the dock-size note (no change may grow the
dock entry; a CHANGELOG line for every entry past 0.5 KB gzipped). Nothing outside the four
defects was built. No tolerance was widened.

Runs: `fix-4/run.sh <branch|red|pre> <project> <log> <grep> [playwright args]`; verdicts and
attached readings by `fix-4/att.py`, the form films by `fix-4/form.py`. Three trees: the branch
on port 5351, v11.1.0 at `.cache/red-v11.1.0/tree` on 5352, and the tree before fix seat 3
(`235b80e4c`) at `.cache/tip-235b80e/tree` on 5353. A red or pre run copies the 11.1.1 specs,
config and harnesses into that tree first. Every run went through `guarded`, WebKit under
`--exclusive webkit`. **The guard refused nothing** and logged no lock wait. The 1-minute load
was 7 to 21 through the readings.

Cells: chromium-phone (390 × 844, touch), chromium-desktop (1440 × 900, mouse), webkit-phone and
webkit-desktop (Playwright WebKit 2287). R = red, G = green.

## Commits

| defect | commit | what |
|---|---|---|
| 1 | 21d5bbe1d | the `still` cell judges the fill's film by the order of its values, with no mark on the input |
| 3 | ea6954738 | the `form` cells drive the trigger and the chosen item as well, and the Select's reads the fill on every exit frame |
| 2 | 8e2ee71f2 | `useLiquidPress` writes no scale under reduced motion; a dock's icon seat (its unarmed floor) and tab seat do not shrink there; the `press` cell, a Button and a small dock in `reduce-harness`, `press` in the gate's fourth part |
| — | 366701140 | `.bundle-ratchet` 3054556 to 3054566 (+10 B), once, after the last source commit |
| 2, 4 | b6c609bd2 | CHANGELOG: the press line in the note's words; the dock entry at 40,533; the seven entries past 0.5 KB |

## 1. The Slider's witness failed by chance

**Cause** (critique 3's reading, which this seat takes as it stands). The cell stamped each sample
with its frame's start time and each mark with the clock at the call. Chromium dispatches input
before the frame's animation callbacks, so a frame whose start preceded the mark read the state
after the input and was filed before it.

**Cure** (21d5bbe1d). The cell no longer marks the input. With the mouse already on the slider, it
films the fill's computed transform from rest, through a 500 ms held press and its release, to
rest, and groups the frames into runs of one value. A still press is exactly three runs, rest,
pressed, rest: the press must reach the fill, the release must return the first value, and any
value between the two ends is a fourth run. The clock read (root, track, fill, thumb at `0s`)
is unchanged, and remains the whole read at 390.

| tree | ch-desktop | wk-desktop |
|---|---|---|
| branch | **G 20 of 20** (`still20F-branch-chromium-desktop`): each film `none` ×10-11, `matrix(1, 0, 0, 0.97, 0, 0)` ×60-62, `none` ×72-73 | **G 5 of 5** (`still5F-branch-webkit-desktop`) |
| before fix 3 (`235b80e4c`) | **R**: clocks 0.2 s to 0.3 s, and the film breaks into 54 runs | **R**: the same clocks, 44 runs |
| v11.1.0 | G (by design: the cell guards 11.1.0's still slider) | — |

An earlier twenty-run read (`still20-branch-chromium-desktop`) was also 20 of 20; it overlapped
this seat's edit of the harness, so the read that counts is the one after the last edit.

## 2. The press ruling, for every control that scales on press

**Cause**, confirmed. `useLiquidPress` snaps its value to 1 under reduced motion and wrote the full
reciprocal `scale` at once (a Button `1.0328 0.911`, a dock icon seat `1.0066 0.9156`). A dock
tab seat's press is CSS alone (`tab-button.css`), `scale: var(--scale-press-dock)` on `:active`,
which reduced motion lands at once at 0.96. The icon seat's unarmed floor (before hydration) did
the same. Segmented options do not scale on press in this tree (`tabs/styles/segmented.css`:
"the tabs never scale"; `toggle-group/styles.css`: "nothing scales on press"), so nothing was
built there.

**Cure** (8e2ee71f2).
- `useLiquidPress` reads `prefers-reduced-motion` as each press begins, while the press respects
  reduced motion (`respectReducedMotion` not `false`), and then emits no `scale`. Its press var
  still steps 0 to 1, so the control's darken and gleam carry the press. The header and the
  `pressStyle` doc say so. Without reduced motion nothing changes. A Button, a dock icon seat,
  `DarkModeToggle` and `Timeline` press through it, so all four keep their size under reduced
  motion.
- `icon-button.css` (the unarmed floor) and `tab-button.css` take `scale: 1` on `:active` under
  reduced motion, keeping the press fill, as fix seat 3 did for `.dock-trigger`.

**The dock entry's size.** The first cut read the preference through the shared
`useReducedMotion`. It grew the dock entry by 35 B, and `motion` by 581 B (`motion` did not import
that chunk before). Reading the query inline, as `useSpringMount` does, left the dock entry 33 B
over 11.1.0, because the query string is new to the press chunk. The dock-size note forbids any
growth, so the dock seat's own press call drops three arguments that only restated defaults:
`squish: true`, and `response` and `dampingFraction` from `springPreset("press")`, which is the
row `useSpringPress` reads by default. It also returns `pressStyle` without a spread copy, and
`useLiquidPress` hands its options object to `useSpringPress`, which reads only its own eight
fields, instead of copying them one by one. Behaviour is unchanged. The dock entry is now
**40,533 B gzipped, 8 B under 11.1.0** (`logs/sizes-table.txt`).

**Witness**: `press · a pressed Button and dock seat keep their size under reduced motion` (reduce
spec, gate part four). A Button, a dock icon seat and a dock tab seat are each held pressed for
300 ms. Every frame of the hold records the computed `scale` and `transform`, the painted width
and whether the control matches `:active`. The cell needs at least one `:active` frame per
control, so a press that never landed cannot pass, and then requires scale 1, transform `none`
and the rest width (within 0.5 px) on every frame. That covers the ruled frame, pointerdown plus
one. At 390 the finger is held 500 ms through Chromium's gesture pipeline
(`Input.synthesizeTapGesture`, touch source). The first reading used raw CDP touch events
(`press-*-chromium-phone`): `:active` never matched on any control, and the tab seat neither
darkened nor shrank. WebKit at 390 is skipped because Playwright's WebKit touchscreen can tap but
cannot hold.

| tree | ch-phone | ch-desktop | wk-desktop |
|---|---|---|---|
| v11.1.0 | **R**: Button `1.0328 0.911`, 88.53 to 91.44 px; icon `1.0066 0.9156`, 44 to 44.29; tab `0.96`, 47.69 to 45.78 | **R**: Button 69.41 to 71.68; icon 40 to 40.26; tab `0.96`, 51.75 to 49.68 | **R**: Button 71.64 to 73.99; icon 40 to 40.26; tab `0.96`, 51.73 to 49.67 |
| branch | **G**: all three `1`, width unchanged, `:active` on 15 to 17 frames | **G**: `1`, unchanged, 36 frames | **G**: `1`, unchanged, 29 to 30 frames |

Logs: `press-red-chromium-phone-2`, `press-red-chromium-desktop`, `press-red-webkit-desktop`,
`pressF-branch-*` (the final source).

## 3. Row 1's close paths and the Select's fill

**Cure** (ea6954738). The `form` routes are now pick (another item), outside, Escape, trigger and
current (the item already chosen). The trigger's centre is read at rest, before the Select opens,
and the second tap lands there. The Select cell reads the fill (`background-color`) on every exit
frame beside the form, material attribute, backdrop, place and width. The DropdownMenu cell drives
the trigger too; a menu has no chosen item, so its `current` is skipped. In WebKit at 390 the
Select's trigger route is skipped with its outside route. A read with the skip lifted
(`form-trigger-try-webkit-phone`) left the Select mounted, because a Select's trigger is outside
its content and Playwright's WebKit tap reaches no outside-press listener. The menu's trigger
closes it there and is driven.

| tree | ch-phone | ch-desktop | wk-phone | wk-desktop |
|---|---|---|---|---|
| v11.1.0 | **R** on all five Select paths (trigger and current included) and all four menu paths: the opaque sheet turns into the anchored plate, `blur(20px)` over a fill at alpha 0.22, by +11 to +35 ms (by the first exit frame on Escape); the menu's plate takes the blur by +1 to +29 ms | G (the anchored form is the desktop form) | **R** on Select pick, Escape and current (the plate by +20 to +42 ms) and menu pick, Escape and trigger (+11 to +35 ms) | G |
| branch | G: 27 to 31 frames, last at +220 to +251 ms, one form, one backdrop, one fill on every film | G: 27 to 29 frames | G: 22 to 27 frames | G: 22 to 27 frames |

Logs: `form-{branch,red}-*`.

## 4. The CHANGELOG's size lines

Measured with `critic-1/closure.mjs` on the branch's fresh `dist`, against fix seat 3's
`sizes-all-v11.1.0.txt` (equal to critique 3's published 11.1.0 column):
`logs/sizes-all-branch.txt`, `logs/sizes-table.txt`. Seven entries grew past 0.5 KB with no
line. They now have one: the root 104,776 to 108,713, `command` 16,804 to 18,864, `sheet` 14,306
to 16,337, `tabs` 19,091 to 20,154, `easing` 36,889 to 37,983, `motion` 12,599 to 13,509, `toast`
5,093 to 5,879. The root, `easing` and `motion` are 32 B above critique 3's figures, from defect
2's cure. The dock line reads 40,533. The five surface figures (dialog, select, popover, tooltip,
menu) are unchanged and exact. The next largest growths are under the bar: `collapsible` +463,
`configurator` +448, `expandable-container` +436.

## Gates on the committed tree

| command | exit |
|---|---|
| `npm run typecheck` | 0 (`logs/typecheck-2.log`) |
| `npm run build` | 0 (`logs/build-3.log`, the final source) |
| `npm run demo:dist:build` | 0 (`logs/demo-dist-build-1.log`); the first full unit run before it failed only on `boot-graph`'s stale `dist-demo` (`logs/vitest-1.log`) |
| `CI=true npx vitest run --maxWorkers=2` | 0 on the committed tree: 285 files, 2,600 passed, 10 expected fail, 1 skipped (`logs/vitest-3.log`) |
| `npm run verify:package` | 1 before the rebind (`3054566 > 3054556`), 0 after 366701140: `CLEAN` (`logs/verify-package-{1,2}.log`) |
| `npm -w tests-visual run gate:exits` (as `scripts/release.sh` runs it) | **0**, all sixteen parts (`logs/gate-1.log`): chromium-phone 127 passed, 18 skipped; chromium-desktop 134, 11; webkit-phone 101, 44; webkit-desktop 134, 11. Against critique 3's tip (123/17, 129/10 with one failure, 99/41, 130/10) the difference is the new paths (Select trigger and current, menu trigger), the `press` cell, and their skips. WebKit 1440's standing part logs the three ResizeObserver loop errors that fix seat 3's and critique 3's gate logs also hold (row 13 (b), for 11.1.2) |

**Without reduced motion the press is unchanged.** Critique 3's probe
(`critic-3/probe/paths.probe.ts`, `press · (dock seat|Button) held · no-preference`) on the
branch: the spring tweens a dock seat over 41 values in Chromium and 35 in WebKit to
`1.006 0.921`, and a Button to `1.029 0.921`, as on critique 3's tip and on v11.1.0
(`logs/nopref-*.log`).

## Open, for critic 4 and the close

- The ruling names "every control that scales on press". Outside the list's three, CSS `:active`
  scales remain under reduced motion on `.interactive-item` (`utilities/base.css`), a pressable
  `Card` (`card/styles.css`) and a lifted sortable row (`sortable-list/styles.css`). They were not
  built here: the defect names a Button, the dock's seats and segmented options.
- The icon seat's unarmed floor (`icon-button.css`) applies only before hydration, and no cell
  reads it; the `press` cell reads the armed seat, the scripted press.
- WebKit at 390 holds no press and drives no Select trigger in Playwright. Real Safari is
  unmeasured for both.
- Critique 3's open gap F (every other film in `film.ts` is cut by the frame-start stamp and the
  call-time mark) stands for the cells that carry tolerance.

No tag, no push, no publish.
