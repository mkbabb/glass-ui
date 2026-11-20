# glass-ui 11.1.0 · fix 3

The fix seat before critic 3, run by claude-opus-5-5 on `release/11.1.0`, curing the five
findings of critique 2 under the binding orchestrator notes. Every browser run went
through `~/.claude/guard/guarded`, every WebKit run under `--exclusive webkit`, one at a
time. **The guard refused nothing** (the WebKit lock was held by another repository's run
for about 15 minutes; a wait, not a refusal). WebKit is Playwright's build 2287
throughout. Records are under `fix-3/`; `fix-3/chain.log` lists every run and its exit
code in order.

## The cures

Read from `git log` after committing:

| finding | commit | what changed |
| --- | --- | --- |
| 1, the Collapsible gap box | `caf0ac7f6` | The `::before` block is gone. `--collapsible-gap` is the content's own top padding, under `:where()` (zero specificity, so a padding the consumer gives the content sets that space instead). The shared `disclosure-open`/`-close` keyframes take `padding-block` from 0 on the open's first frame and to 0 on the close's last, the other end resolving to the element's own padding; `.disclosure-content` is `box-sizing: border-box`, so the measured size (reka's border box) includes the padding and the padding never outgrows the height. No box joins a grid or flex content; the region is its closed height on the first open frame and the last close frame. Accordion shares the keyframes and so its padded content no longer snaps either. |
| 2, the Slider and its model | `2a3eff751` | Outside a grab, a key step writes `own`, emits, then `followModel()` returns `own` to `modelValue` on the next tick (the same helper `onLetGo` now calls). A consumer who declines the step keeps the thumb and `aria-valuenow` on the model. |
| 3, the shared tempo | `f23d862f0`, then `6d5dcab1c` | The `<head>` child-list observer and the two media listeners are gone. The `:root` value is held for one synchronous run and let go at the next microtask (`queueMicrotask`), so a scene mounting in one render flush shares one read and the next batch reads the cascade again; the `<html>` attribute observer stays for a change earlier in the same run. The first build let go with `setTimeout(0)`; the full vitest run showed it leaves a library timer pending (two `EasingPicker` cases assert none after unmount), so `6d5dcab1c` moved it to a microtask. |
| 4, the coarse strip | `214619589` | `--bouncy-slider-radius: max(var(--radius-tab), calc(var(--control-floor) / 2))` on the horizontal arm: on a fine pointer the floor is 0 and the radius is `--radius-tab` as before; under a coarse pointer the tab, the indicator (22 px at 44 px) and the concentric track (25 px at 50 px) are capsules. The bar shape and the vertical arm keep their own rebinds. |
| 5, the CHANGELOG | `b8ca3e5dd`, `6d5dcab1c` | Below. |
| ratchet | `0da77576b` | `.bundle-ratchet` 3014836 → 3014778 (−58 B: the gap box and the tempo's head and media watchers gone, the coarse radius and the Slider's model return added). |

`docs/release-11.1.0/orchestrator-note-fable-review.md` and `-table-nested.md` were
committed by the orchestrator during this seat (`330cf0d31`), not by it.

## CHANGELOG

Read in full again and scanned for row and wave ids, lane, seat, critic, witness,
tranche and record paths: none.

- The headline no longer says "Nothing is removed". It says no API changes shape and names
  the two undocumented route variables that went with the slide they tuned,
  `--route-slide` and `--route-world-slide`. The `lateral` bullet says the travel is
  `--route-card-travel` (default `min(6rem, 24vw)`), which takes the place of `--route-slide`.
- The Collapsible bullet: content laid out as a grid or a flex row keeps its items where
  they were; padding on the content now grows with the height; the gap is the content's
  top padding, and a consumer's own top padding sets that space instead.
- "Mounting a page full of controls is lighter": the value is read by the first control
  of a batch that mounts together, shared by the rest, and read afresh by the next batch.
- The Segmented tabs bullet: the tabs, the selected plate and the strip keep their round
  ends at the 44 px height.
- The Slider clock bullet gains critique 2's corollary (it was in its INBOUND list): a
  value the handler declines during a drag leaves the thumb with the hand until release,
  then on the model; a declined key press leaves it on the model.

## Witness (`fix-3/witness/`)

`harness/` (four scenes), `probe.mjs` (readings), `judge.mjs` (verdicts),
`chain.sh`; readings in `out/{green,pre,red}-{chromium,webkit}.json`, verdicts in
`out/verdict-*.json`, crops in `out/png/`. Three trees: the branch (`green`), the
pre-fix tree `git archive 2174a3aef` at `.cache/f3-pre` (`pre`), and v11.0.0 at
`.cache/c1-v1100` (`red`, its `src/` checked byte-identical to the tag with `diff -rq`
before any run). For findings 1 (gap unset), 2 and 3 the GREEN condition is equality to
v11.0.0, so their RED tree is the pre-fix one; findings 1 (gap set) and 4 are RED on both.

| item | cells | branch Chromium | branch WebKit | pre-fix Chromium | pre-fix WebKit | v11.0.0 Chromium | v11.0.0 WebKit |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Collapsible layout, gap unset: children and height equal to v11.0.0 (block, grid, two-column grid, flex column, flex row) | 390 × 5 | 5/5 | 5/5 | 1/5 | 1/5 | 5/5 | 5/5 |
| Collapsible gap 12 px: first child 12 px down at x 0; in a two-column grid the first row aligned and the first cell filled | 390 light × block/grid/flex/grid2, grid2 at 390 dark and 1440 light/dark | 7/7 | 7/7 | 1/7 | 1/7 | 0/7 | 0/7 |
| Collapsible frames, gap 12 px, grid content: root at its closed height (±2 px) on the first open frame and the last close frame (hold) | 390, 1440 | 2/2 | 2/2 | 2/2 | 2/2 | 2/2 | 2/2 |
| Slider controlled: model, `aria-valuenow` and thumb agree after ArrowRight ×3 and End | 390 reject, 1440 reject, 390 clamp | 3/3 | 3/3 | 1/3 (clamp) | 1/3 (clamp) | 3/3 | 3/3 |
| Root tempo: `motionTempo()` equals the root's computed value after an inline style, `insertRule`, a width query on resize, and a `<link>` sheet that loads after a read | 1440 | 1/1 | 1/1 | 0/1 | 0/1 | 1/1 | 1/1 |
| Tabs radius: coarse, tab ≥ 44 px and tab, indicator and strip radius ≥ half their height, on the page and in a dock; fine, equal to v11.0.0 | 390, 1440 × fine/coarse × light/dark | 8/8 | 8/8 | 4/8 (coarse) | 4/8 (coarse) | 4/8 (coarse) | 4/8 (coarse) |

That table is the first pass (06:23 to 06:53, branch at `b8ca3e5dd`, the tempo on its
`setTimeout` bound). The final pass on the committed tree is under "Final pass".

Readings behind the table (`out/verdict-*.json`):

- **Layout, gap unset.** Two-column grid: branch and v11.0.0 First, Second / Third,
  Fourth at 47.2 px; pre-fix (empty), First / Second, Third / Fourth at 74.8 px. Grid and
  flex column: branch and v11.0.0 first child at 0 px, 102.4 px; pre-fix 8 px, 110.4 px.
- **Gap 12 px.** Branch: first child at (0, 12) in every layout, the two-column grid's
  Second at (191.2, 12) beside First. Pre-fix: two-column grid First at (191.2, 20) with
  the first cell empty. v11.0.0 has no gap hook (0 px). With the story's construction
  (gap 12 px, grid `gap: 8px`) the content now starts 12 px under the trigger, not 20.
  Paint: `out/png/green-chromium-collapsible-gap-390-light-grid2.png` against
  `pre-chromium-collapsible-gap-390-light-grid2.png`.
- **Frames.** Branch, 390: closed 24 px, first open frame 24 px (content 0 px, padding
  0 px), open 138.4 px, last close frame 24.3 px. The padding rides the height; nothing
  snaps.
- **Slider, reject.** Branch: 50/50/0.5, then 60/60/0.6 at every step, in both engines,
  as v11.0.0. Pre-fix: 60/70/0.7, 60/80/0.8, 60/100/1.0. Paint:
  `out/png/green-chromium-slider-390-reject.png` (60 %) against
  `pre-chromium-slider-390-reject.png` (full).
- **Tempo.** Branch: insertRule 0.6/0.6, after resize 0.7/0.7, after the link loads
  0.8/0.8. Pre-fix: 1/0.6, 1/0.7, 1/0.8. The link is served by the dev server
  (`harness/late.css`), so its sheet arrives after the append in both engines
  (`sheetAtAppend: false`): the row critique 2 could exercise only in WebKit now runs in
  Chromium too.
- **Tabs.** Coarse, branch: tab 44/22, indicator 44/22, strip 50/25 at 390 (52/26 at
  1440), on the page and in the dock. Pre-fix: 44/16, 44/16, 50/19. v11.0.0: 26.3 px tall
  under a coarse pointer (no floor). Fine: 26.3/16 and 32.3/19 at 390, 34.6/16 and
  42.6/20 at 1440, equal on all three trees. The 1440 fine strip has been a rounded
  rectangle since v11.0.0 (the stylesheet's "a taller strip takes 16px corners"); that is
  not this finding and is unchanged. Paint: `out/png/green-chromium-tabs-dock-390-coarse-light.png`
  against `pre-chromium-tabs-dock-390-coarse-light.png`.

## Reruns on the branch

- **fix-2 witness** (`fix-3/rerun/fix-2/`, unchanged but for the output path): 80/80 in
  Chromium and 80/80 in WebKit, including the Collapsible's 11.0.0 contract (4/4), the gap
  inside the region (4/4), G14 (4/4) and the nested table (4/4).
- **Lane L2** (`fix-3/rerun/lane-L2/`): first pass at `330cf0d31`, every item green in
  Chromium but O-180 0/2, and in WebKit the same plus the O-171 `1440-light` threshold
  cell critique 2 described (a 42 px first strip against a 38.4 px pressed anchor, 2 px
  allowance). O-180 failed on one count: `gcsRoot: 1` in the mount task, every other read
  zero (`gcs − gcsRoot = 0`, rect 0, `elementsFromPoint` 0, 4 sampled, 0 reads across 12
  press frames).

**The O-180 amendment.** The lane's cell asks for zero computed-style reads in the mount
task. A tempo that cannot outlive a change has to read the cascade once when a scene mounts
after the page may have changed; critique 2's own bound ("which keeps a mounting scene at
one read") says the same. v11.0.0 also made exactly one root read per mount
(`critic-2/rerun/lane-L2/out/red-*.json`: `gcsRoot: 1`), beside 13 to 16 other
computed-style reads, 8 rect reads, 4 `elementsFromPoint` calls and 12 reads across the
press frames, which is what the lane cured. The rerun copy's cell is amended to
`gcs − gcsRoot = 0, gcsRoot ≤ 1`, every other count still zero (commented in
`fix-3/rerun/lane-L2/probe.mjs`); v11.0.0 stays RED on it (14 and 17 other reads).

## Final pass (committed tree)

On `0da77576b` (07:06 to 07:10). The first pass's branch readings are kept in
`witness/out/first/` and `rerun/lane-L2/out/first/`.

| run | Chromium | WebKit |
| --- | --- | --- |
| fix-3 witness, branch | 26/26 (layout 5/5, gap 7/7, frames 2/2, Slider 3/3, tempo 1/1, tabs 8/8) | 26/26, the same |
| lane L2, branch, O-180 amended | 33/33, exit 0 (O-180 2/2: `gcsRoot` 1, every other count 0) | 32/33 + 4 unmeasurable, exit 1 |

The WebKit miss is lane L2's O-171 `1440-light`, the threshold cell critique 2 read the
same way and put in its INBOUND list: the first painted strip 42 px against an anchor read
at 38.4 px while the trigger is pressed (40 px at rest), 2 px allowance. Nothing in this
seat touches the menu. The 4 unmeasurable are the lateral swap's WebKit paint, as fix 2
recorded.

## Gates (committed tree)

`fix-3/gates.sh`, one guarded heavy run each time; logs and exit codes in `fix-3/gates/`.

| run | tree | build | typecheck | demo:dist:build | vitest | verify:package |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `330cf0d31` | 0 | 0 | 0 | 1: two `EasingPicker` cases saw one pending timer (the tempo's `setTimeout`) | 1: ratchet shrink 3014774 < 3014836 |
| 2 | `6d5dcab1c` (microtask) | 0 | 0 | 0 | 0 (2574 passed, 10 expected fail, 1 skipped) | 1: ratchet shrink 3014778 < 3014836 |
| 2b | `0da77576b` (ratchet rebound down) | | | | | 0, CLEAN |

New and changed unit cases: `slider.stream.test.ts` "returns to the model after a key step
the consumer declines"; `press.test.ts` "reads the root tempo again in the next run,
leaving no timer" (and the later-scene case now allows one fresh read);
`radius-role-canon.test.ts` asserts the new seam.

**e2e**, the specs these cures touch (`disclosure-rotate`, `SegmentedTabs.glide`,
`tabs-std`, `a11y-slider`, `aria-orientation`), one worker, reports in `fix-3/e2e/`:
19 passed, 1 failed, 2 skipped on each tree in each engine. The one failure is the same
title on both trees in both engines (`a11y-slider`, "aurora (light): 56 of 79 slider
thumb(s) resolve NO accessible name"), older than this release. The branch runs served
the working tree while the microtask edit landed (Chromium on the `setTimeout` build, WebKit
on the microtask build); nothing in those specs reads the tempo. `tabs-std` rewrote four tracked PNGs under
`docs/tranches/BA/audit/visual/` and `disclosure-rotate` dropped two under
`docs/tranches/BG/audit/visual/`; this seat restored the four and deleted the two.

## For INBOUND (not cured here)

- `tabs-std.spec.ts` joins the specs that write into tranche records (it overwrites four
  tracked PNGs on every run).
- The O-180 cell in `lane-L2/probe.mjs` (the lane's own copy) still asks for zero root
  reads; the amended copy is `fix-3/rerun/lane-L2/probe.mjs`.
- A consumer who pads the top of a `Collapsible`'s content and also sets
  `--collapsible-gap` gets their padding, not the sum (documented in the CHANGELOG).
