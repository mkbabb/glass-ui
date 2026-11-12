# 11.0.1 critique, round 1

Critic: claude-fable-5-2, fresh; built nothing on this branch. Tree: `release/11.0.1` at
`cd3c588ca` (the merge is `81486dbd2`, parents `993c93d08` and `ada7d8a8b`). Gated on the
six-item list and nothing else. Every build, test and browser run went through
`~/.claude/guard/guarded` (WebKit 2287 under `--exclusive webkit`), one at a time; none
was refused. Paths are relative to `docs/release-11.0.1/` unless they start with `src`,
`tests` or `/`.

## Verdict: NOT CLEAN. Two findings in the owner's named cell, one prose finding

| | finding | list item | status |
|---|---|---|---|
| **A1** | A stadium dock paints **square corners (0 px)** until its script has published `--dock-plate-cross-px`: a server-rendered page before hydration. daraksha prerenders its dock. v11.0.0 paints 16 px (or its circle) there. | 2, 3 | introduced by the merge's resolution |
| **A2** | Through a morph the dock's end is **not a circular arc in paint**: the box is scaled on the morph axis, so the 28 px corner paints 13.2 x 28. The collapse holds that barrel for ~500 ms, then snaps to the capsule at the settle. The computed-corner witness o3 cannot see it. | 2 | not a regression (the same rule is on v11.0.0, 10.1.5 and v10.1.4) |
| **A3** | The CHANGELOG says the corner is half the dock's "height"; on a vertical dock it is half its width. | 6 | prose |

Everything else on the list holds, in both engines: the release spec 107/107 and 107/107,
the owner's seat plate a capsule in paint in all eight cells, the dock's ends round at
rest, collapsed and on the narrow face in paint in all eight cells, the gates exit 0, the
public surface equal to the 11.0.0 tarball.

## A1. Before the script publishes its measure, the stadium dock is a rectangle

`src/components/dock/styles/run.css:641` sets
`--dock-cap-rest: calc(var(--dock-plate-cross-px) / 2)` and `:757-759` sets
`.glass-dock.shape-pill { border-radius: var(--dock-cap-rest) }`.
`--dock-plate-cross-px` is not registered, has no fallback, and is written only by
`root.style.setProperty` inside a mounted hook
(`src/components/dock/composables/dockMorphMeasure.ts:375`). Until that runs, the
`calc()` is invalid at computed-value time, so `border-radius` falls to its initial
value, `0px`, on the box and on the plate that inherits it. The merge also took the
stadium out of 11.0.0's two collapsed rules (`morph.css:176, 188`, `:not(.shape-pill)`),
so nothing else rounds the collapsed box either.

Measured (cell e of `tests-visual/release-11-0-1-critic-1.spec.ts`: the mounted dock with
the inline property removed, which is the cascade a server-rendered dock has before
hydration):

| engine | published | not yet published |
|---|---|---|
| Chromium | root 28px, plate 28px | **root 0px, plate 0px**, open and collapsed |
| WebKit 2287 | root 28px, plate 28px | **root 0px, plate 0px**, open and collapsed |

Capture: `critic-1/sheets/e-ch-unpublished.png` (a hard rectangle, open and collapsed),
`e-wk-unpublished.png`.

Read twice. (1) The property has one writer, the mounted hook; nothing renders it on the
server. (2) daraksha builds with `vite-ssg`, and its prerendered
`~/Programming/daraksha-wt/o1110-finish/dist/index.html` carries
`class="dock glass-dock horizontal shape-pill collapsed fit-content"` with no inline
`--dock-plate-cross-px`. So on the owner's own site the dock's first paint, from the HTML
and CSS and before the script hydrates, is a square-cornered box. (3) v11.0.0 needs no
script for this: `.glass-dock { border-radius: var(--radius-dock) }`, `--dock-cap-rest:
var(--radius-dock)`, and the collapsed rules' `--radius-circle`. So this is a state
11.0.0 painted round (16 px, or a circle) and 11.0.1 paints square: the owner's "squared
end", on every load, for as long as hydration takes. A client-only mount is not affected:
the ResizeObserver delivers before the first paint, and the release spec, the owner spec
and the daraksha repro pages (all client-mounted) read 28 px.

10.1.5 has half of this (its plate reads the same token; its box kept `--radius-dock`).
The merge moved the rule to the box, which is right for the rim, and so made it whole.

What a cure must do (the fix seat chooses the form): `--dock-cap-rest` resolves to a
length without the script, and that length is the dock's CSS cross size halved, so the
measured value changes nothing when it lands. The dock's cross size is already in CSS
(`--dock-layer-height` plus twice `--dock-padding-block`, `styles/density.css`), which
makes that a value from the same source rather than a second mechanism. Witness: cell e
goes GREEN in both engines (it asserts neither corner is `0px`; tighten it to the 28 px
the measure gives).

## A2. Mid-morph the end is a squashed arc, and the collapse holds it until the settle

`src/components/dock/styles/shape.css:104-106`:
`.glass-dock[data-morphing]:not(.vertical) { scale: var(--dock-size-scale, 1) 1 }`. The
whole box, its rim and its plate are scaled on the morph axis; the two control regions
carry the inverse scale, the corner does not. So a computed 28 px corner paints
`28 * scale` wide by 28 tall.

Measured per animation frame (cell d; the painted width of the corner is the computed
corner times the box's painted width over its layout width):

| cell | expand | collapse |
|---|---|---|
| Chromium 1440 fine, light and dark | 18 of 65 morph frames off, first 13.2 x 28, round again by 182-188 ms | **64-65 of 66-67 frames off, ending at 13.2 x 28 at 547-555 ms** |
| Chromium 390 coarse, light and dark | 20 of 66-67, first 14.8 x 30, round by 191-195 ms | 64-65 of 66-67, ending 14.8 x 30 at 557-564 ms |
| WebKit 1440 fine | 13-15 of 49-54, first 13.3 x 28, round by 204-223 ms | 42-45 of 44-47, ending 13.3 x 28 at 568-577 ms |
| WebKit 390 coarse | 14-17 of 52-55, first 14.9 x 30 | 44-47 of 46-49, ending 14.9 x 30 at 568-578 ms |

In paint: `critic-1/frames/c-light-1440f-ch-collapse-4.png` (174 ms) and
`c-light-1440f-ch-collapse-8.png` (311 ms: the folded dock at its final width, still
`data-morphing`, a barrel with flat ends), `c-light-1440f-wk-collapse-8.png`, the
enlarged left end `critic-1/sheets/zoom-collapse-4-left.png`, and the frame sheets
`critic-1/sheets/c-*-{ch,wk}.png` (bottom two rows are the collapse). Against the rest
capture of the same dock (`critic-1/sheets/b-light-1440f-ch-house.png`, a true capsule)
the difference is plain. The collapse is the worse half: the box reaches its folded width
by about 250 ms and then sits as a barrel for another 300 ms before the settle swaps in
the 28 px circle in one frame. The expand starts with the same one-frame swap the other
way and is round again within 200 ms.

Read twice. The release's own o3 ("every frame of the expand and of the collapse paints
a round end") passes, and so does my cell c's computed reading (28px on every frame): it
reads `border-radius`, which the `scale` never touches. The paint is what the owner sees.

This is not the square end he reported (that was the 4 px cut, and it is gone on every
frame), and the merge did not introduce it: the scale rule is byte-equal on v11.0.0,
on 10.1.5's tip and on v10.1.4, where a 16 px corner paints 7.5 x 16 by the same
arithmetic. It is on the list because the list says every morph frame, in paint. The
honest choices are two, and the orchestrator picks: cure it here in one rule (while
`[data-morphing]`, the stadium's corner on the morph axis is the rest corner divided by
`--dock-size-scale`, so the scale paints it circular; o3 then reads the painted corner
as cell d does), or record it as a bound for the owner with the two frames above and
restate o3's title so it no longer claims paint. Not a third form.

## A3. CHANGELOG: "height" on a vertical dock

The 11.0.1 header says `--dock-cap-rest` goes "to half the dock's measured height" and
the first entry "half the dock's own height". `publishCross`
(`dockMorphMeasure.ts:373-376`) publishes the plate's inline size on a vertical dock, so
there it is half the width. One clause fixes it ("half its thickness: its height when
horizontal, its width when vertical"). Otherwise the entry is accurate against the
source, complete against the token diff below, and carries no internal term.

## The list, item by item

### 1. The 10.1.5 invariants, by their witnesses, both engines: HOLD

`tests-visual/release-10-1-5.spec.ts` on `cd3c588ca`, two processes per engine:
Chromium 84 + 23 = **107/107**, WebKit 2287 84 + 23 = **107/107**
(`critic-1/runs/merged-part{A,B}-{ch,wk}.log`). g6: `release-10-1-4` 23/23 Chromium, 15 +
8 skips WebKit; `release-10-1-3` **60/60** Chromium (D-1 passed at load 15; the build
seat's one failure did not recur), 58 + 2 skips WebKit. 11.0.0's own `u-b7` witnesses 21
+ 1 skip Chromium. Invariant 11: no line the merge adds in `src` over v11.0.0 carries a
row, round or seat id (grep of `git diff -U0 v11.0.0 HEAD -- src`: none).

The two restatements in the spec are sound against 11.0's contract: `expectHoverScale`
now asserts no hover scale on any pointer (11.0.0 removed it), and e4/k3 assert the fit
law where 10.1.5 asserted no scroll (the reserve is the 4 px ring alone). One of them
deserves a line, below under INBOUND: k3's early return.

### 2. The owner's named cells, in paint

**The wide label seat's plate is a capsule: HOLDS, all eight cells, both engines.** The
plate's ink is isolated by diffing the seat against itself with the plate stripped, and
the row a twelfth of the way under its top edge is measured (3x device pixels):

| cell | plate | row | a stadium's | an ellipse's |
|---|---|---|---|---|
| Chromium 1440 fine light: "Name" active, rest and hover | 276 x 108 | 230 | 228 | 153 |
| Chromium 1440 fine light: "Focus" hover / press | 243 x 108 / 241 x 102 | 197 / 193 | 195 / 194 | 134 / 130 |
| Chromium 1440 fine dark: the same four | same boxes | 230, 228, 195, 193 | 228, 228, 195, 194 | 153, 153, 134, 130 |
| Chromium 390 coarse light and dark: "Name" active, "Focus" press | 258 x 96, 229 x 93 | 216-218, 185 | 215, 185 | 143, 121 |
| WebKit 1440 fine light and dark | 268 x 108, 246 x 108, 244 x 100-102 | 220-224, 198-202, 196-198 | 220, 198, 197-198 | 148, 136, 131-132 |
| WebKit 390 coarse light and dark | 250 x 98, 230 x 92 | 208-210, 186 | 206, 187 | 137, 122 |

Every row is within 4 device pixels of the stadium and 60 or more from the ellipse.
Captures `critic-1/sheets/a-*.png` (for example `a-light-390c-wk.png`: "Focus" and
"Name ›", both capsules). A coarse pointer has no hover, so those cells read the active
and the pressed plate.

**The dock's end at rest, collapsed, open on a narrow face: HOLDS in paint, all eight
cells, both engines,** with the house tokens and with `--radius-dock: 1.875rem`, six
scenes each (open, open with an end seat, collapsed, collapsed with an end seat, the
narrow face with and without an end seat). Sheets `critic-1/sheets/b-*.png`. Every
painted box of the dock (root, plate, their pseudo-elements, the first two levels of
children) computes four corners of half the height, 28 px fine and 30 px coarse; none
is off. **Except before the script publishes: A1.**

**Every morph frame: computed, yes; painted, no: A2.**

### 3. Nothing 11.0.0 shipped is lost: HOLDS, with A1 as the exception

Against the published `@mkbabb/glass-ui@11.0.0` tarball and the build of `cd3c588ca`:
`package.json` equal but for the version (exports, files, peers); the `dist` file list
equal with hashes stripped; every `.d.ts` byte-equal except two. `slider/types.d.ts`
differs by a comment. `dock/composables/useDockClickIntegrity.d.ts` loses
`onPointerEnter`/`onPointerLeave` from `DockClickIntegrity`: that composable is exported
from no entry and no subpath reaches it, so no public name moved. Custom properties
declared anywhere in `src` (css and vue): none removed; added `--field-text-floor`,
`--icon-label-gap`, `--value-mark-inset` (named in the CHANGELOG) and the dock's and
Slider's private `--dock-run-*`, `--slider-fill-ink`, `--slider-lane-cut`; values changed
`--dock-cap-rest`, `--dock-cap-cut` (stadium), `--control-text`, `--control-text-sm`
(coarse), `--shadow-color` (dark), `--liquid-fill-tint`'s default, `--glass-level` on the
static plate: the seven the CHANGELOG names, with the control's default corner.

11.0.0's own changes, in source: the `DockTrigger` subpath and `ContextMenu` untouched
(the `menu` and `dock-trigger` declarations are byte-equal); no hover scale anywhere (the
merge kept 10.1.5's `(hover: hover)` gates and dropped its scale, in `icon-button.css`,
`tab-button.css` and `glass-capsule.css`); `--radius-pill`, `--radius-circle`,
`--radius-bar` untouched; the rounded and card docks keep 11.0.0's collapsed corners
(`:not(.shape-pill)`); the mount without a forced layout kept (the cross extent rides the
observer). Two 11.0.0 behaviours are deliberately restated, both recorded in `merge.md`
and both in the CHANGELOG: the stadium dock's corner (16 px to half the cross extent,
`--radius-dock` no longer read by it), and the mid-morph press guard (one mechanism, the
re-aim arm critique 16 gates; see INBOUND for its stale-pointer residual).

### 4. No name 11.0.0 removed survives: HOLDS

`DockBackdropMode`, `SelectionDeform`, `squishOnTravel`, `DEFAULT_INDICATOR_MAX_STRETCH`,
`INDICATOR_RELEASE_AT_ARRIVAL`, `--eyeglass-span-max`, `data-eyeglass-*`,
`--scrollbar-width`, 10.1.5's `--dock-seat-max-*`: none in `src` or `demo`.
`--scale-hover-dock`, `--tab-indicator-max-stretch`, `activeValues`, `glass-ui.css`: only
in the same comment lines v11.0.0 carries, and in tests that assert their absence.
`MenuTrigger` in `src/components/menu/context.ts` is the internal context type, byte-equal
to v11.0.0's. No `var(--scale-hover-dock)` anywhere.

### 5. The gates on the committed tree: ALL EXIT 0

`scripts/critic-1-gates.sh` on `cd3c588ca`, clean tree (`critic-1/logs/gates.txt`):
build 0, typecheck 0, demo:dist:build 0, vitest 0 (270 files, 2511 passed, 10 expected
fail, 1 skipped), verify:package 0 (`CLEAN`, ratchet 2910925).

### 6. The CHANGELOG entry: accurate and complete but for A3

No internal id, record path or seat vocabulary. Every moved value in the token diff
above is named with its old and new value. The 11.0.0 and 10.1.5 sections are byte-equal
to their parents'.

## For INBOUND (outside the list; none counts against clean)

- **k3 in WebKit at 320 coarse takes its early return.** The restated k3 returns after
  `expectHonestReach` when the seats' span passes the port. In WebKit 2287 coarse it
  does: span 305 against a 304 px port, the flag off, 9 px of scroll, the plate resting
  `30px 27.58px 27.58px 30px` (`critic-1/runs/merged-k3-wk.log`;
  `tests-visual/release-11-0-1-critic-1b.spec.ts`). The last seat really is 5 px past the
  port, so the cut is honest, but on that path the cell no longer reads the rest corner
  or the end rings, and a four-seat dock at 320 on an iPhone-class engine rests a little
  lopsided where 10.1.5's wider reserve let it fit. Chromium fine and coarse and WebKit
  fine take the fitting path.
- **The re-aim guard never forgets a pointer.** `pointerAt`
  (`useDockClickIntegrity.ts:110-126`) is set on every move and press inside the dock and
  never cleared. A mouse that crossed the dock and left, then an owner `expand()`, then a
  press within 6 px of where the mouse last stood: deferred to the settle. The build seat
  recorded the touch form; the mouse form is the same. 11.0.0 passed every owner-opened
  press. Clearing it on `pointerleave` closes it.
- **The dark active plate is nearly invisible.** In dark the active "Name" seat's plate
  differs from the dock by 3 to 6 of 765 (`critic-1/runs/shots/a-dark-1440f-ch-name-active.png`):
  a capsule, but one nobody can see. Not compared against v11.0.0.
- **The 10.1.5 section of the CHANGELOG** carries row ids and record paths
  (`O-129`, `docs/release-10.1.5/implement.md`). It is 10.1.5's own entry, unchanged here.
- **10.1.5 shares A2 and the plate half of A1.**
- Carried from `merge.md`, unchanged: the dev server's failed dependency scan over the
  10.1.5 critic harnesses' missing `./v1014/` copy; real Safari not measured.

## What ran

All on `cd3c588ca`; rows in `critic-1/runs/runs.txt`, logs beside it.

| run | Chromium | WebKit 2287 |
|---|---|---|
| gates (build, typecheck, demo:dist:build, vitest, verify:package) | all exit 0 | |
| owner cells `release-11-0-1.spec.ts` | 9/9 | 9/9 |
| daraksha pages | 2/2 | 2/2 |
| 10.1.5 release spec, parts A and B | 84/84, 23/23 | 84/84, 23/23 |
| g6 `release-10-1-4`, `release-10-1-3` | 23/23, 60/60 | 15 + 8 skips, 58 + 2 skips |
| `u-b7` | 21 + 1 skip | no WebKit project |
| critic paint spec (22 cells) | 16 pass; 6 RED: e x2 (A1), d x4 (A2) | 16 pass; the same 6 RED |
| k3 path probe | 2/2 (a reading) | 2/2 (a reading) |

The critic spec's first Chromium pass (`merged-critic-ch-pass1.log`) failed two dark
seat cells on my own diff threshold (6 of 765, above the dark plate's 3 to 6); at 2 they
read as the table shows. That was the witness, not the tree.

Not run: the same specs on a v11.0.0 tree (the build seat's rows stand; A1's and A2's
v11.0.0 side is read from source, `git show v11.0.0:src/components/dock/styles/shape.css`
and `run.css`); real Safari.
