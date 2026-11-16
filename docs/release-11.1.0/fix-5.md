# glass-ui 11.1.0 · fix 5

The fix seat before critic 5, run by claude-opus-5-5 on `release/11.1.0` in
`.claude/worktrees/release-11.1.0`, from `f5db152c9` (critique 4). It cures critique 4's three
findings on the dock's run mark. Every browser run went through `~/.claude/guard/guarded`,
every WebKit run under `--exclusive webkit`, one run at a time. **The guard refused nothing.**
WebKit is Playwright's build 2287 throughout.

Commits: `bd16cb097` (the cure and its unit test), `f67c51a94` (CHANGELOG), `5e7a72f2d`
(ratchet rebind), and this record.

Three trees: the branch; the pre-fix tree `.cache/f5-pre` (`git archive f5db152c9`, both
touched source files checked byte-identical to that commit before the run); v11.0.0 at
`.cache/c1-v1100` (critique 4's tree).

## 1. On a glyph seat the run mark kept a hovered seat's box (medium)

**Root.** A glyph seat paints its plate inside the face's inset (`background-clip:
content-box`, `glass-capsule.css`). The hover and press rules in
`src/components/dock/styles/controls/icon-button.css` set the fill with the `background`
shorthand, which resets `background-clip` to `border-box`, so a hovered or pressed glyph
seat filled its whole cell. `plateOf` reads the seat's clip box, so a mark measured under a
resting pointer (after a click or tap) took the full cell, and nothing measures again when
the pointer leaves.

**Cure.** The hover and press rules set `background-color`. The clip stays the face's, so a
glyph seat's plate box is one box hovered, pressed or at rest, and the run mark reads it.
The hover and press fills now sit inside the same inset plate as the selected fill, which is
what the face's own comment says the hover register does. Both token values are colours
(`--glass-plate-resting`, a `color-mix`); a consumer who set `--dock-icon-hover-bg` to an
image would lose it, and no surface in the library does. `plateOf` is unchanged: it reads the painted clip box, which
is now stable, rather than guessing a padding inset.

Out of scope and unchanged: the `active` rung (`[data-active]`, and the consumer
`--dock-active-*` cohort) also paints with the shorthand. It does not depend on hover, so it
cannot make the mark change size, and changing it would change what an `active` glyph seat
paints on 11.0.0.

## 2. The mark's first measure forced the new dock's layout in the mount task (low)

**Cure** (`src/components/dock/composables/useDockRunMark.ts`). The first `sync()` runs in
one `requestAnimationFrame` queued from `onMounted`, cancelled on unmount. The first frame's
callbacks run before its paint, so the mark is on its seat in the first frame painted. The
mutation and resize observers are installed in `onMounted` as before; the resize observer
observes seats only once `sync()` has chosen one.

As critique 4 qualified, the mount task still forces one layout without the mark
(`dockMorphMeasure.ts: getSize ← capture`, on both trees); the cure takes the mark's four
reads out of it, not that one.

Unit: `tests/components/custom/dock/GlassDock.run-mark.test.ts` gains "takes its first
measure in the next frame, not in the mount task" (no `data-run-mark` after the mount tick,
present after one frame); the existing cases wait one frame in `settle()`.

## 3. CHANGELOG: a glyph control with `aria-current` gains a selected plate (low)

The headline list of changed defaults gains two lines: a dock control marked with
`aria-current` always shows the selected plate, glyph controls included, and glides; a dock
glyph control's hover and press fills sit inside the same rounded plate as its selected
fill. The nav-mark entry gains a paragraph tail saying a glyph `DockControl` with
`aria-current` now shows the selected plate where before only `active` did (so a row of
glyph `RouterLink`s gains one after upgrading), and that the plate is the same size however
the control became current, because the hover and press fills now sit inside it. A scan of
the 11.1.0 entry for row and wave ids, lane, seat, critic, witness, tranche, "build" and
record paths finds none.

## Witness

`fix-5/witness/` (`harness/`, `witness.mjs`, `run.sh`; readings and logs in `out/`, crops in
`out/png/`). Each cell is a pass or a fail:

- `size-*` (24): the run's plate painted magenta and its box read from the screenshot,
  glyph seats. After a keyboard Enter, a 90 ms click or a tap with the pointer staying, the
  same then leaving (2 s), and a route change under a resting pointer that then leaves, the
  mark's box equals its rest box ±1 px. 1440 fine and 390 coarse in light and dark, 390
  fine and 1440 coarse in light. This is critique 4's amended witness.
- `hover-*` (4): the library's colours, fine pointer, 390 and 1440, light and dark. A pixel
  2 px inside a glyph seat's edge is the same hovered and not hovered (the fill sits inside
  the inset plate), while a pixel 14 px in changes (the hover is drawn).
- `natural-*` (4): the library's colours; the current glyph seat, `aria-current` only, paints
  a plate: its pixel 14 px in differs from its pixel 2 px inside the edge (the dock's own
  plate). This backs the CHANGELOG sentence.
- `mount-*` (8 judged, 4 reference): a dock mounted on demand, tab and glyph seats, 390 and
  1440. Pass: no `getBoundingClientRect`, `getClientRects` or `getComputedStyle` call owned
  by `useDockRunMark.ts` between the state change and the end of Vue's flush, and in an
  animation frame queued after the mount the run carries `data-run-mark` with its box on the
  seat's plate ±1 px. Chromium runs at 4x CPU and traces the first marked run per cell.

| tree | Chromium | WebKit 2287 |
| --- | --- | --- |
| branch | **40/40** | **40/40** |
| pre-fix `f5db152c9` | 13/40: 15 `size` cells (136 × 40 for 128 × 32 fine, 148 × 44 for 138 × 34 coarse, after a click or tap staying or leaving and after a hovered route change on a fine pointer), 4 `hover` (the fill reaches the edge: 224,215,206 for 253,245,236 light, 47,36,28 for 53,42,34 dark), 8 `mount` (4 reads by `useDockRunMark.ts`; trace: the first Layout forced by `destinationOf`) | 13/40, the same 27 cells |
| v11.0.0 | 0/40 (no mark, no plate on an `aria-current` glyph seat, the hover reaches the edge) | 0/40 |

The first pass of the `natural` cells compared the current seat with a neighbour and passed
on v11.0.0 (the neighbour's pixel fell on its glyph); the verdict was corrected to compare
with the current seat's own edge, and the `natural` and `hover` cells were rerun alone
(`ONLY=natural`): branch 8/8 Chromium and 8/8 WebKit, pre-fix 4/8 (the four `hover` cells),
v11.0.0 0/8 (`out/*-natural-*.log`). The corrected verdict also ran inside the full pre-fix
and v11.0.0 WebKit passes above. On the branch the current glyph seat reads 216,208,197
light and 46,36,27 dark against the dock's 253,245,236 and 53,42,34, the same in both
engines at 390 and 1440, as critique 4 read.

Branch, Chromium trace at 4x: the only Layout in the mount task is the dock's own
(`dockMorphMeasure.ts: getSize`, 0.5 to 1.6 ms); the only read is `motionTempo.ts`'s one.
WebKit: the same single read, tasks 12 to 15 ms marked and unmarked.

Paint: `out/png/{green,pre,v1100}-{chromium,webkit}-size-1440-fine-{light,dark}-click-leave-after.png`
and `...-size-390-coarse-{light,dark}-click-leave-after.png` (the mark after a click that
leaves); `out/png/*-natural-{390,1440}-{light,dark}.png` and `*-hover-*.png` (the library's
colours, current seat and a hovered seat).

**Lane L1's witness on the branch** (`fix-5/l1/`, a copy of the lane's runner with its own
`out/`): O-164 4/4, O-188 6/6, O-169 17/17 in Chromium and in WebKit 2287.

## Gates

`fix-5/chain.sh`, committed tree `f67c51a94` (dirty src 0), one guarded heavy run: build 0,
typecheck 0, demo:dist:build 0, vitest 0 (279 files; 2575 passed, 10 expected fail,
1 skipped: the one new unit case), verify:package 1 on the ratchet, `3014881 > 3014787`.
The +94 B is the cure (the first-frame request and its cancel, and `background-color` in two
rules), rebound deliberately in `5e7a72f2d`; verify:package then exits 0 and CLEAN at
`5e7a72f2d` (`gates/verify-package-rebound.log`).

**e2e**, the dock specs the hover-fill change can reach (`nav-dock-fix`, `liquid-hover`,
`dock-plate-clearance`, `register-ios`, `dock-morph-family`), one worker, branch and v11.0.0,
reports in `fix-5/e2e/`: 9 passed and 19 failed of 28 on each tree in each engine; the
failed title sets are identical between the branch and v11.0.0 in Chromium and in WebKit
(`e2e-compare.py`). Those 19 fail on 11.0.0 too, so they cannot go red here; the witness
above is what reads the change. The runs rewrote
`docs/tranches/BA/audit/visual/dock-plate-clearance/readback.json` and dropped three
`W-LIQUIDHOVER-*.png` under `docs/tranches/BB/`; this seat restored the first and deleted the
three.
