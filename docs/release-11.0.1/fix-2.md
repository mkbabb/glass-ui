# 11.0.1 fix 2

Seat: claude-opus-5-5, fix seat before critic 2. Tree: `release/11.0.1`, from `03e55f02c`
(critique 1). Gated on critique 1's A1 to A3 and the orchestrator's ruling
(`orchestrator-note-critique-1.md`). Every browser, build and test run went through
`~/.claude/guard/guarded` (WebKit 2287 under `--exclusive webkit`), one at a time; none was
refused. Paths are relative to this directory unless they start with `src`, `tests` or
`/`. Runs and logs: `fix-2/runs/` (`runs.txt` has every row), gates `fix-2/logs/`.

## Verdict: A1, A2 and A3 cured; every witness RED before and GREEN after, both engines

| | cure | where |
|---|---|---|
| **A1** | The stadium's corner resolves without the script: `--dock-cross` is the measured `--dock-plate-cross-px`, or the same extent from the density tokens when it is unpublished. | `src/components/dock/styles/run.css` (the `.glass-dock` and `.glass-dock.vertical` blocks above the shape rules) |
| **A2** | One rule: while `[data-morphing]`, the stadium's morph-axis radius is the rest corner divided by `--dock-size-scale`, so the box's scale paints it as a circle. Kept: one rule, first attempt, every gate GREEN (the ruling's condition). | `run.css`, after `.glass-dock.shape-pill` |
| **A3** | "half the dock's thickness (its height when horizontal, its width when vertical)" in the header and in the first entry; the entry also names the two behaviours A1 and A2 change. | `CHANGELOG.md` 11.0.1 |

## A1. The corner before the script runs

Root cause as critique 1 reads it: `--dock-cap-rest: calc(var(--dock-plate-cross-px) / 2)`
had no value until the mounted hook wrote the property, so `border-radius` fell to `0px`
on the box and the plate.

Cure: one private property, the cross extent, with the measure first and the CSS extent
as the `var()` fallback, read by both of its readers (`--dock-cap-rest` and
`--dock-run-cross-half`), so there is one source for it:

```css
.glass-dock {
    --dock-cross: var(--dock-plate-cross-px, calc(var(--dock-layer-height) + 2 * var(--dock-padding-block)));
    --dock-cap-rest: calc(var(--dock-cross) / 2);
}
.glass-dock.vertical {
    --dock-cross: var(--dock-plate-cross-px, calc(var(--dock-control-size) + 2 * var(--dock-padding-inline)));
}
```

This is not a masking fallback: the measure stays primary and is still published; the
fallback is the extent the dock is laid out by, and the hand-over cells show the measure
lands on the same length. Where a dock's content is thicker than one control (a labelled
vertical column, a horizontal dock holding a column switcher), the pre-hydration corner
is the nominal one and the measure corrects it after mount; it is a round corner either
way, never 0 px.

### Witnesses (`tests-visual/release-11-0-1-fix-2.spec.ts`, 1440 fine and 390 coarse)

- **f4, the prerendered page, no script.** The figure dock serialized from the mounted
  harness, every script-written root attribute and inline property stripped, the root
  given daraksha's prerendered class set (`dock glass-dock horizontal shape-pill
  collapsed fit-content`, and the same without `collapsed` for the open face), set into a
  context with `javaScriptEnabled: false` and the tree's served stylesheets inlined
  (`document.scripts.length` is asserted 0). Computed corners, and the end in paint: the
  plate filled opaque on a dark page, the first ink on the row 4 px under the top edge,
  against a stadium's arc (13.6 px in at 28 px, 15 px at 30 px) and a square end's (0 px).
- **f1 to f3, the hand-over.** The mounted dock read with its measure and again with the
  measure removed; every corner within 0.5 px of half the cross extent both ways: the
  figure dock open and collapsed, a horizontal dock at the house density and the cockpit
  preset, and a vertical dock.
- Critique 1's cell e, tightened: the unpublished corner equals the published one, and the
  published one is half the height.

| cell | before (`cd3c588ca` for f4, `03e55f02c` for f1-f3 and e), Chromium / WebKit | after (`8f4a5eb47`), Chromium / WebKit |
|---|---|---|
| f4 1440 open / closed | root 0px, plate 0px, first ink 0 px both ends / the same | 28px, 28px, first ink 13 px both ends / 28px, ink 13 and 12.5 px |
| f4 390 open / closed | 0px, ink 0 to -0.1 px / the same | 30px, ink 13.9 to 14 px / the same |
| f1 figure open, closed (1440 / 390) | unpublished 0px / 0px | 28 / 30 px, equal to the measure |
| f2 house, cockpit | unpublished 0px | 28 (30 coarse), 26 px, equal to the measure |
| f3 vertical | unpublished 0px | 32 (34 coarse) px, equal to the measured width |
| critic 1 e | 0px / 0px | 28px / 28px |

Logs: `fix-2/runs/before-tree-fix2-{ch,wk}.log`, `before-fix2-ch.log`,
`before-critic-ch.log`, `after-fix2-{ch,wk}.log`, `after-critic-{ch,wk}.log`. Captures:
`fix-2/runs/shots-before-tree/f4-*.png` and `fix-2/runs/shots-after/f4-*.png` (square
blocks before, capsules after).

## A2. The end through the morph

Root cause as critique 1 reads it: `shape.css` scales the whole box on the morph axis by
`--dock-size-scale`; the corner is not counter-scaled, so 28 px paints 13.2 x 28 at the
start of the expand and holds that barrel through the collapse until the settle.

Cure, one rule in `run.css`, beside the stadium's rest corner:

```css
.glass-dock.shape-pill[data-morphing]:not(.vertical) {
    border-radius: calc(var(--dock-cap-rest) / max(var(--dock-size-scale, 1), 0.06)) / var(--dock-cap-rest);
}
.glass-dock.shape-pill[data-morphing].vertical {
    border-radius: var(--dock-cap-rest) / calc(var(--dock-cap-rest) / max(var(--dock-size-scale, 1), 0.06));
}
```

The divisor is the same factor and floor the layers' counter-scale already uses, so no
new state and no second clock. The plate inherits the root's corner, so the plate and
the rim follow. At the settle the scale and this rule leave together, so the corner does
not step. The border-radius clamp cannot bite: the morph-axis radius exceeds half the
layout box only when the painted box is narrower than its own height, which no stadium
endpoint is.

o3 (`tests-visual/release-11-0-1.spec.ts`) is restated to read the corner **in paint**
(each corner's computed radii times the box's painted scale on that axis), as critique 1
asked; it is RED on the pre-fix tree in both engines and GREEN after.

| witness | before, Chromium | before, WebKit | after, both engines |
|---|---|---|---|
| critic 1 d, 1440 light/dark, expand | 19-20 frames off, first 13.2 x 28 | 15-16 off, 13.3 x 28 | 0 off, painted 28 |
| critic 1 d, 1440 collapse | 64 of 66 off, last 13.2 x 28 at 547 ms | 50-52 of 52-54 off | 0 off |
| critic 1 d, 390 coarse, expand / collapse | 20-21 / 65 off, 14.8 x 30 | 16 / 49-52 off, 14.9 x 30 | 0 off, painted 30 |
| o3 restated (paint) | RED (13.2 x 28 at 41 ms) | RED (13.3 x 28 at 35 ms) | GREEN |

Paint: `fix-2/runs/shots-before-tree/c-light-1440f-ch-collapse-6.png` (284 ms into the
collapse: flat-ended barrel) against `fix-2/runs/shots-after/c-light-1440f-ch-collapse-6.png`
(the same frame: a capsule).

Bounds, recorded (not cured, the ruling allows one rule): (1) the vertical rule is the
same arithmetic on the other axis but no harness collapses a vertical dock, so it is
read from source only; (2) on a run that overflows while it morphs, the plate's cut-cap
keyframes set the plate's own corners and are not counter-scaled, so a cut end (16 px)
can still flatten mid-morph there. Neither is the owner's figure dock.

## A3. The CHANGELOG

The header now reads "half the dock's thickness (its height when horizontal, its width
when vertical)", and the first entry "half the dock's own thickness, its height when
horizontal and its width when vertical". The same entry gains two sentences, in the
entry's outward voice: before the script has measured (a server-rendered page) the
corner comes from the density tokens so the first paint is round, and during the open
and close animation the corner cancels the box's stretch so the end stays a circle. No
token value moves in this fix (`--dock-cap-rest` is still half the cross extent).

## Gates and regression witnesses

| run | Chromium | WebKit 2287 |
|---|---|---|
| fix 2 spec (f1-f4) | before 14 failed; after **14/14** | before 14 failed; after **14/14** |
| critic 1 d and e | before 6 failed; after **6/6** | before 6 failed; after **6/6** |
| owner cells `release-11-0-1.spec.ts` (o3 restated) | before-tree 1 failed (o3); after **9/9** | before-tree 1 failed (o3); after **9/9** |
| 10.1.5 release spec, parts A and B | **84/84, 23/23** | **84/84, 23/23** |
| g6 `release-10-1-4`, `release-10-1-3` | **23/23, 60/60** | 15 + 8 skips, 58 + 2 skips (as critique 1) |

Gates on the committed `8f4a5eb47` (`fix-2/logs/gates.txt`): build 0, typecheck 0,
demo:dist:build 0, vitest 0 (270 files, 2511 passed, 10 expected fail, 1 skipped; the two
unit tests that pin the cap-rest declaration now pin `--dock-cross`, its fallback and the
morph rule), verify:package 1 on the ratchet (2911439 > 2910925, +514 B: the two rules and
their comment), then `.bundle-ratchet` rebound to **2911439** and verify:package 0,
`CLEAN` (`fix-2/logs/verify-rebound.log`).

The pre-fix arms ran on `git archive` trees inside this worktree (`./fix2-before`, of
`03e55f02c` for the first WebKit arm and of `cd3c588ca` for f4), with the fix seat's specs
copied in; the tree was deleted when done.

## Notes

- The second WebKit chain call logged `parse error near ';;'` after it had finished every
  step: the chain script was edited while zsh was still reading it. No step was lost
  (`runs.txt` has every row); the script is syntax-clean now.
- Not touched: critique 1's INBOUND items (k3's early return, the re-aim guard's stale
  pointer, the dark active plate). They stay for 11.0.2.
