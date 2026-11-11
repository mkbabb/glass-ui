# glass-ui 11.1.0 · fix 4

The fix seat before critic 4, run by claude-opus-5-5 on `release/11.1.0` in
`.claude/worktrees/release-11.1.0`, from `ae46ed477` (critique 3). It cures critique 3's two
low findings. Every browser run went through `~/.claude/guard/guarded`, every WebKit run under
`--exclusive webkit`, one run at a time. **The guard refused nothing.** WebKit is Playwright's
build 2287 throughout.

Commits: `14b272327` (the cure), `f5b2b15d2` (CHANGELOG), `d8ac429b3` (ratchet rebind), and
this record.

## 1. Collapsible: a top padding declared in an earlier cascade layer is dropped

**Root.** `:where(.disclosure-content[data-disclosure="collapsible"]) { padding-block-start:
var(--collapsible-gap, 0px) }` ships in `@layer components`. `:where()` yields to a consumer's
padding only within the same layer or a later one; a padding in `@layer base` loses on layer
order, so with the gap unset the library wrote `0px` over it. 11.0.0 declared no padding there.

**Cure** (`src/components/_shared/disclosure/disclosure.css`): the unset fallback is the
CSS-wide keyword `revert-layer`, so an unset gap hands the property back to the layers beneath
instead of writing zero.

```css
:where(.disclosure-content[data-disclosure="collapsible"]) {
    padding-block-start: var(--collapsible-gap, revert-layer);
}
```

A set gap still outranks a padding in an earlier layer (the consumer chose both); a padding
that is unlayered, in `components`, or a utility such as `p-4` still outranks the gap. The
CHANGELOG sentence now says exactly that.

**Witness** `fix-4/witness/` (`harness/`, `witness.mjs`, `run.sh`; readings in `out/`, crops in
`out/png/`). 17 cells, each a pass or fail against an expected value:

- `padding 390-light <cls> gap{0,12}` for `none`, `pad-plain` (unlayered), `pad-base`
  (`@layer base`), `pad-components`, `p-4`: the content's computed top padding and the first
  child's offset equal the expected value (none 0/12; base 16/12; every other 16/16).
- `padding {390-dark,1440-light,1440-dark} pad-base gap0`: 16 px.
- `frames {390,1440} {pad-base gap0, none gap12}`: a plain open and close returns the root to
  its closed height; the held first open frame and last close frame sit at the closed height
  (the padding rides the height from zero); open, the top padding is the expected value.

| tree | Chromium | WebKit 2287 |
| --- | --- | --- |
| branch (cure) | **17/17** | **17/17** |
| pre-fix `ae46ed477` (`.cache/f4-pre`, `src/` diffed identical to HEAD before the edit) | 11/17: the four `pad-base gap0` padding cells (0 px, first child at y 0, content 55.2 / 61.9 px) and both `pad-base gap0` frames cells (open padding 0) | 11/17, the same six |
| v11.0.0 (`.cache/c1-v1100`) | 11/17: `none gap12` and `pad-base gap12` (no gap exists), and all four frames cells (padding appears whole: first frame 56 px against a closed 24) | 11/17, the same six |

Paint: `fix-4/witness/out/png/{pre,green,v1100}-{chromium,webkit}-pad-base-gap0-{390,1440}-{light,dark}.png`.
On the pre-fix tree the first line of the content sits against the trigger; on the branch and
on v11.0.0 it sits 16 px below, light and dark, 390 and 1440, both engines.

`out/chain.log` holds a first Chromium pass whose frames cell read its closed height after a
held seek, which leaves the region present on every tree (critic 3's probe read the same:
`closedAfter` equal to the open height on both trees); the witness now reads it from a plain
cycle before the seek, and the table above is the second pass.

## 2. CHANGELOG headline

The headline is now a list, and it is complete against the entries below it: critique 3's four
(`lateral` swaps cards, `SegmentedTabs` at least 44 px on a touch screen, `Blob` paints past its
box, a vertical dock's space after a `#persistent` control halved) are added, and so are two
the critique did not name but whose entries change a page's look with no opt-in: a
`#persistent-end` control's spacing in every dock, and the dock grain as a dot field. A closing
sentence names the fixes that also change what a consumer sees (a wide `Select` trigger, a
`Select` opened with the mouse, `Configurator` on the left, the dock under reduced motion,
HandMark's draw timing), so the headline no longer reads as complete while leaving any out.
The Collapsible entry's last sentence now says where a set gap gives way. A scan of the 11.1.0
entry for row and wave ids, lane, seat, critic, witness, tranche and record paths finds none.

## Gates (committed tree `d8ac429b3`, one guarded heavy run, `fix-4/gates/`)

build 0, typecheck 0, demo:dist:build 0, vitest 0 (279 files; 2574 passed, 10 expected fail,
1 skipped), verify:package 0 (terminal CLEAN). The first gates pass on `f5b2b15d2` read
verify:package red on the ratchet, `3014787 > 3014778`: the +9 B is `revert-layer` in place of
`0px`, rebound deliberately in `d8ac429b3`. That pass's `chain.log` exit codes were captured
after a `$(date)` substitution and are void (the logs themselves stand); the driver was fixed
and the rerun's codes are the ones above.

## e2e (branch, `fix-4/e2e/`)

The specs fix 3 ran for the disclosure, tabs and Slider work (`disclosure-rotate`,
`SegmentedTabs.glide`, `tabs-std`, `a11y-slider`, `aria-orientation`): Chromium 19 passed,
2 skipped, 1 failed; WebKit 2287 the same. The one failure is `a11y-slider` `aurora — no
nameless thumb`, which fails identically on v11.0.0 in both engines (fix 3's
`fix-3/e2e/{chromium,webkit}-v1100.log`); the title set matches fix 3's branch and v11.0.0
runs.
