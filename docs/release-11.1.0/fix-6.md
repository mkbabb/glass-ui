# glass-ui 11.1.0 · fix 6

The fix seat before critic 6, run by claude-opus-5-5 on `release/11.1.0` in
`.claude/worktrees/release-11.1.0`, from `9b339a599` (critique 5). It cures critique 5's four
findings on the dock's run mark and glyph controls. Every browser run went through
`~/.claude/guard/guarded`, every WebKit run under `--exclusive webkit`, one run at a time.
**The guard refused nothing.** WebKit is Playwright's build 2287 throughout.

Commits: `55c5dc48d` (the cure and its unit test), `d0023b4d6` (CHANGELOG), `0bd1539f6`
(ratchet rebind), and this record. The merge of `master` the orchestrator's
`orchestrator-note-merge-master.md` orders is its own record, `merge-master.md`.

Three trees: the branch; the pre-fix tree `.cache/f6-pre` (`git archive 9b339a599`);
v11.0.0 at `.cache/c1-v1100`. Driver `fix-6/chain.sh`, every run and exit in `fix-6/chain.log`.

## 1. `active` with `aria-current` on a glyph control: a larger plate and two shapes (medium)

**Root, two halves.** (a) Every state rule that paints an icon control's face with the
`background` shorthand (the `[data-active]` rung and the `--dock-active-*` cohort in
`controls/icon-button.css`) resets `background-clip` to `border-box`, and both sit at the same
specificity as the face's one clip rule (`glass/glass-capsule.css`) and later in the cascade,
so an `active` control's plate filled its whole cell (40 x 40 for a 32 x 32 face; 136 x 40
for 128 x 32 on the open seat). (b) Under a marked run the current seat cleared only its
`background-color`, so an `active` seat's capsule rim, lift and backdrop still drew an oval
inside the gliding stadium (Chromium) and the mark measured the full cell (both engines).

**Cure.** (a) The face's clip rule gains a second selector,
`.glass-dock .dock-icon-button.glass-capsule-hover`, which outranks every state shorthand on
the icon shape, so an icon control's plate is one inset box at rest, hovered, pressed and
selected. It stays the one home of the inset (`glass-capsule.css`). (b) A seat the run marks
paints no selected plate of its own: `run.css` clears `background-color`, `box-shadow` and
`backdrop-filter` on it. The mark is then one shape on the face's box, whatever props the
consumer set.

## 2. A runtime change of direction stranded the mark (low)

**Root.** `useDockRunMark` wrote a physical offset from the run's left edge and the
stylesheet painted it with `translate`; a flip of `dir` mirrors the seats and resizes nothing,
so nothing measured again.

**Cure.** The mark's inline offset is logical. `plateOf` measures it from the run's
inline-start edge (the padding box's right edge, with `scrollLeft` from 0 toward negative
values, right to left), and `run.css` paints the mark at `inset-inline-start` /
`inset-block-start` instead of `translate`. A flip mirrors the mark with its seats with no
measure, and a page loaded right to left reads the same box as before. The width and height
were already written per frame, so the offsets cost no new kind of work.

## 3. A hovered glyph control's plate was smaller than an `active` one's (low)

Cured by 1(a): `active`, hovered, `active`-and-hovered and pressed share the face's clip box,
32 x 32 at rest size, and the mark lies on the current control's clip box. The CHANGELOG
headline now names the `active` fill with hover and press, and is true of the paint.

## 4. An image in `--dock-icon-hover-bg` no longer painted, silently (low)

The hover rule keeps `background-color` (fix 5's cure, which keeps the clip). The CHANGELOG
now says the token takes a colour, and that an image or gradient there no longer paints.
The same entry tells a consumer who set `active` on a glyph nav control that `aria-current`
alone shows the plate, that keeping both shows the same single plate, that a marked control
draws no fill, rim or shadow of its own (`--dock-active-shadow` included), and that the
plate follows a change of direction without a reload.

## 5. Fix 5's record, corrected

Fix 5's "on its seat in the first frame painted" holds for a dock mounted from a task. A dock
mounted inside an animation-frame callback or a resize-observer step shows no mark in its
first painted frame and has it in the next (critique 5, `mount-*-raf`, `mount-*-ro`).

## Witness

`fix-6/witness/` (`harness/`, critic 5's probe8 harness with a flat press fill; `witness.mjs`;
`run.sh`; logs `out-<tree>-<engine>.txt`, readings in `out/*.json`, crops in `out/png/`). Each
cell is a pass or a fail, 390 and 1440, light and dark:

- `one-*` (4): a current glyph control with `active` and `aria-current` paints what the same
  control with `aria-current` alone paints: the plate's box (magenta, ±1 px) and four pixels
  in the library's colours (14 px in, 7/7 px in, 2 px in, a third along; ±3 per channel).
- `dir-*` (8): glyph and tab controls; the plate (magenta) is on the current control's clip
  box ±1.5 px at load, after `document.documentElement.dir = "rtl"` and 1.5 s, and back to
  `ltr`.
- `plate-*` (4): one plate box on a glyph control: `active` (magenta), a hovered control (flat
  green), the `active` control hovered, all equal ±1 px; the run's mark on an `aria-current`
  control has their height and lies on that control's clip box; a pressed control's computed
  clip is `content-box`.

| tree | Chromium | WebKit 2287 |
| --- | --- | --- |
| branch | **16/16** | **16/16** |
| pre-fix `9b339a599` | 0/16: `one` 136 x 40 for 128 x 32 with pixels 225,213,196 / 216,208,197 / 226,214,197 / 220,208,191 (light; WebKit one colour, the larger box); `dir` plate at x 134 for 182 (glyph, 390), 120 for 131.8 (tab, 390), 1109.9 for 1172.3 (tab, 1440); `plate` active 40 x 40 against a 32 x 32 hover | 0/16, the same 16 cells |
| v11.0.0 | 4/16: the four `dir-tab` cells pass (each tab paints its own plate); `one` has no plate on an `aria-current` glyph control; `plate` 40 x 40 for every state and no mark | 4/16, the same |

The `dir-tab` and `plate` defects are regressions of this release, so their RED tree is the
pre-fix one; on v11.0.0 `plate` fails for want of a mark and an inset.

On the branch, both engines, light: the current glyph control reads 216,208,197 at 14 px in
and a third along and the dock's 253,245,236 at 7/7 and 2 px in, with or without `active`;
dark 46,36,27 and 53,42,34. Paint: `out/png/green-{chromium,webkit}-one-1440-{light,dark}-both{0,1}-{plain,magenta}.png`,
`*-dir-{icon,tab}-{390,1440}-light-1-rtl.png`, `*-plate-1440-light-{active,hover,active-hover,mark}.png`,
and the same names under `pre-` and `v1100-`.

**The CHANGELOG half** (`fix-6/changelog-check.sh <CHANGELOG.md>`): the 11.1.0 entry names the
colour-only hover token, the advice for `active` on a glyph nav control and the `active` fill
in the headline, and carries no internal vocabulary. PASS on the branch, FAIL on the pre-fix
tree and on v11.0.0.

**Lane L1's witness on the branch** (`fix-6/l1/`, fix 5's copy of the lane's runner): its
O-188 cells read the mark's offset from the `::before`'s computed `translate`, which the cure
retires, so the first Chromium pass read no start and failed 6/6 O-188 cells (an instrument
reading a property that no longer carries the offset; `out/fix6-chromium.log`). The copy now
reads the computed `left` (the logical offset on a left-to-right page). With it: O-164 4/4,
O-188 6/6, O-169 17/17 in Chromium (`out/fix6b-chromium.log`) and in WebKit 2287
(`out/fix6-webkit.log`, which loaded the corrected copy). The lane's own runner under
`lane-L1/` still reads `translate` and is left as the lane wrote it.

## Gates

`fix-6/chain.sh after`, committed tree `d0023b4d6` (dirty src 0), one guarded heavy run:
build 0, typecheck 0, demo:dist:build 0, vitest 0 (279 files; 2575 passed, 10 expected fail,
1 skipped), verify:package 1 on the ratchet, `3015106 > 3014881`. The +225 B is the cure
(the right-to-left branch of the offset, the face clip's second selector, two declarations on
the marked seat, the logical insets), rebound deliberately in `0bd1539f6`; verify:package
then exits 0 and CLEAN (`gates/verify-package-rebound.log`).

**e2e**, the dock specs the cure can reach (`nav-dock-fix`, `liquid-hover`,
`dock-plate-clearance`, `register-ios`, `dock-morph-family`, `drag-morph`, `u-b7`,
`release-10-1-1`), one worker, branch and v11.0.0, reports in `fix-6/e2e/`: 46 passed,
23 failed, 1 skipped of 70 on each tree in each engine; the failed title sets are identical
between the branch and v11.0.0 in Chromium and in WebKit (`e2e-compare.py`). The runs
rewrote `docs/tranches/BA/audit/visual/dock-plate-clearance/readback.json` and dropped three
`W-LIQUIDHOVER-*.png` under `docs/tranches/BB/`; this seat restored the first and deleted the
three.

## The merge of `master` (orchestrator-note-merge-master.md): started, read, aborted

The note arrived (09:05) while this seat's runs were under way and binds the first fix seat
that reads it after its cures are committed. This seat read it at 09:30, after `1927ac63f`,
ran `git merge --no-ff --no-commit master` (master at `f7776975d`, 11.0.1 merged at
`f7705c0df`), read the conflicts, and ran `git merge --abort`. The branch is unchanged
from `1927ac63f`. No `merge-master.md` exists yet. The merge is the next fix seat's.

**Conflicts** (eleven files): `.bundle-ratchet`, `CHANGELOG.md`, `GlassDock.vue` (2),
the dock `README.md` (2), `controls/icon-button.css`, `morph.css`, `run.css` (3),
`shell-regions.css`, `Slider.vue`, `dock-hover-corner.test.ts` (2), `g-dock-lattice.test.ts`
(2). `release.yml` and `scripts/dist-tag.mjs` merge to master's bytes on their own.

**Why it was not finished here: the run's `::before` is claimed twice.** 11.0.1's `run.css`
makes a horizontal run's `::before` and `::after` in-flow reserve boxes
(`.glass-dock:not(.vertical) :where(.dock-layers) > .dock-run:has(> *)::before`, with `flex:
0 var(--dock-run-yield) auto`, `inline-size: var(--dock-run-reserve-inline)` and a negative
inline margin), so the two ends' reserves shrink as one flex pair under `data-run-fits`.
This branch's gliding mark is that same `::before`, positioned absolutely
(`.glass-dock .dock-run[data-run-mark]::before`). Both selectors are (0,3,1). On the merged
tree a marked horizontal run would lose its leading reserve box from the flow, and its mark
would take the reserve's negative margins. That is a design choice, not a conflict to
resolve by reading both sides: the mark needs another box. The choices this seat saw:
a library element inside the run (it would then need to be excluded from every
`.dock-run > *` seat rule, the snap targets and the toolbar's roving count), the current
seat painting the plate itself and gliding by a FLIP translate (it collides with the
vertical dock's `::before` accent and the material catch-light `::before`), or 11.0.1's
leading reserve going back to padding (which its own comment rules out for the yield).
Each needs its own witness, and then the note's battery: release-10-1-5 (107), the
release-11-0-1 specs, release-10-1-2/3/4, and every lane and fix witness on the merged tree
in both engines. That runs for hours of WebKit lock time, and this seat stopped short of it
rather than leave a merged tree no witness had read.

**Read on both sides, ready for that seat:**
- `icon-button.css`: master gates the hover on `@media (hover: hover)` (sticky touch hover);
  the branch sets `background-color` (the face's clip). Both hold: the branch's declaration
  inside master's query.
- `Slider.vue`: master adds `@pointerdown="onPointerDown"` (reka's grab offset taken at the
  press); the branch binds `:model-value`, `@update:model-value`, `@value-commit`,
  `@pointerdown.capture="onGrab"` and the three let-go events (the rAF-coalesced emit). They
  are separate handlers (capture and bubble) and both belong.
- `shell-regions.css`: master moves the leading region's gap into `run.css` (THE ROOM FOR
  THE RESERVE, which also owns the layers' scroll-axis margins, and gives a trailing region
  the reserve before it); the branch gives each persistent region its own gap on the side
  facing the morph region. One owner is needed: master's rules cover the leading gap and
  the reserve, so the branch's trailing-region gap has to be folded into master's
  `.dock-layers:has(+ .dock-persistent-end)` rule, not stacked on it.
- `run.css` corner: master's stadium corner is `--dock-cap-rest: calc(var(--dock-cross) / 2)`
  from the measured `--dock-plate-cross-px`, with a token fallback, and cut `--radius-card`;
  the branch's is `--dock-corner` (`shape.css`, half the token cross extent, bounded by
  `--radius-dock`) with cut `--radius-xs`, plus a counter-scaled corner while
  `[data-morphing]`. The note's rule is that master's mechanism is kept unless the branch's is
  the only one covering a posture. Its counter-scaled morph corner covers the morph frames,
  and its unbounded collapsed summary covers a glyph with a reading.
