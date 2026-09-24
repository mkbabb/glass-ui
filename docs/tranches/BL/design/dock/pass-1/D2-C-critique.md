# D2 · pass 1 · D2-C · critique (the physical dock)

| field | value |
|---|---|
| seat | D2-C adversarial CRITIC, pass 1 (rerun after the session limit). I did not author the spec, the research report or the prototype. This file replaces the pre-limit critique. I read that critique's counterexample list only after my own runs, and every number below comes from a command I ran |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | worktree cut at `99839631`. `git diff --quiet 857cb97f 99839631 -- src` holds, so `src/` is the prototype's base. `git apply --check` then `git apply` of `D2-C-proto.patch` succeed. After every plant, `git apply --check -R` of the patch succeeded, so the patched tree was intact |
| engines | Headless Chromium 149 and **Playwright WebKit** 26.5 (+shim, `HARNESS.md` §4), from node, with playwright imported by absolute path from the checkout. No browser MCP. **Every real-Safari cell is UNMEASURED (owner's safaridriver checkbox)** |
| scratch | `K = …/scratchpad/D2/p1/D2-C-crit`. Builds `$K/out/builds/{d2c,head,clock26,p-*}`, witness runs `$K/out/runs/`, full run `$K/d2c-run.txt`, probes and plant scripts `$K/mine/`, captures `$K/shots/`. The pre-limit seat's files moved to `$K/prior/`, untouched |
| fences | My only write in the checkout is this file. My only git writes were `worktree add` and `worktree remove --force`. I also ran `git apply` and `git apply -R` (working tree only, no index) inside my own worktree, which the task's patch step requires. Plants were perl edits restored from a backup copy. I ran no vitest and no typecheck. The checkout's `node_modules/.vite-temp` (empty) has mtime 15:09:28. None of my builds ran then (their `build.json` stamps are 14:47, 14:54-14:55, 15:01, 15:11, and the plant builds that followed), and other seats were running, so I do not attribute it |

## 1 · Before reading the family: the failures I expected a dock design to hide

Written after reading `PORTFOLIO.md` §0-2 and `HARNESS.md`, before the spec or the prototype:

| # | expected hidden failure | found here? |
|---|---|---|
| E1 | The witnesses pass on the harness scenes and break on consumer shapes: wrappers, flexible seats, nested scrollers | **yes**: the BottomDock at 430 (§5 CX-8); floor row 1 unbuilt |
| E2 | The corner is green in the sampled rungs and wrong in an unsampled one (compact, card, a real scrolled end) | partial: `rail·scrolled-end` is vacuous (§3), but the corner holds at the real end. The card rung has no scene |
| E3 | Plate continuity is green while the contents collide or double-expose, because W3 reads seats against the plate, not against each other | **yes** (§5 CX-4) |
| E4 | A terminal snap hides under the continuity bound (about 40 px per frame on a 387 px travel) | **yes**: a 2 % seat passes W3 11/14 (§3) |
| E5 | The window passes by moving the clock rather than the motion | **yes** (§4.2) |
| E6 | The scroll-source contract is met in type and not in reactivity; hover or focus gates get trapped | **yes**, both (§5 CX-2, CX-3) |
| E7 | The coarse floor rows are left to "the floor" and stay RED | yes: W4 4 cells RED |
| E8 | The rim is green because it is clipped, not because it follows the silhouette | partial: it is a 3 px bar along the straight edge, cut by the corners (§4.6) |
| E9 | A scroller-free design drops platform scroller behaviour silently: `scrollIntoView`, AT reach, tap-to-stop, momentum | **yes** (§5 CX-5, CX-6) |
| E10 | Per-frame layout or main-thread cost hides behind a compositor claim | partial: about 1 layout per morph frame, which is cheap; a ticking seat costs 2.6× HEAD's layouts (§4.4) |
| E11 | PRM loses a fade | yes, by code: every lane, the opacity crossfade included, is built `respectReducedMotion: true` (§4.5) |

## 2 · Reproduction (my own run)

`node $H/run.mjs --build $K/out/builds/d2c --adapter $K/adapter-d2c.mjs --out $K/out` (the prototype's adapter, unchanged):

| witness | prototype claims | my run, Chromium / Playwright WebKit (+shim) |
|---|---|---|
| W1 corner | 32/32 | **32/32**; worst 0.146 / 0.239 px |
| W2 run | 10/10 | **10/10**; 0 scroll-container frames on every route; ring cut 0/0 |
| W3 morph | 8/14 | **7/14** (3/7 / 4/7). Every failure is the window, over by 3.3-12.6 ms (Chromium warm-expand 265.1 against 252.5). Continuity ×0.65-0.66, faces ≤ 0.14 px, dead landings, 0 owners in all 14 cells |
| W4 state | 12/16 | **12/16**; the coarse latch and tap-pins fail in both engines |
| W5 rim | 10/10 | **10/10**; 0 device px outside in all five rungs |
| W3 at `--spring-dock-settle: 0.26s` | 14/14 | **14/14**; windows 248-267 ms against allowances of 302.5-318.4 ms |

The prototype's "over by 1-5 ms" understates it: I read up to 12.6 ms over at the shipped clock. The pass/fail split moves between runs, and the margin stays inside frame jitter.

## 3 · Can the witnesses fail on this family? (planted faults)

Each plant is one edit to the patched source, then a build and the target witness in both engines (`$K/mine/plants.sh`, `plantw1.sh`, `plantmo.sh`; diffs `$K/mine/plant-*.diff`).

| plant | witness | result | caught? |
|---|---|---|---|
| `lens`: `border-radius: 50%` on the plate | W1 | **0/32**; worst 14.08 px on `fit`, 15.33 px mid-collapse | yes |
| `scaleswell`: the rejected squish, `scale: 1 (1+σ)` on the plate while moving | W1 | **32/32**, worst 0.46 px | **no**: W1's 1 px bound cannot see the "resize, never scale" rule the family rests its corner claim on |
| `clipboth`: the run `overflow: clip` on both axes | W2 | **6/10**; ring cut 4.25 px (long run) and 4.35 px (hover) in both engines | yes |
| `band2`: seat the extent at 8 px (the spec's option 2, the terminal snap) | W3 | **11/14**, better than the prototype. Final step 8.97 px after 2.88 px (×3.11, `probes.mjs terminal`). The only failures are 3 Chromium windows closing 4 frames late | **no**: W3's continuity bound (41 px here) cannot see a terminal snap |
| `noaperture`: no aperture clip on the outer faces | W3 | faces 75.6-171.6 px out, in 10 of 14 cells | yes |
| `nohyst`: compaction band 0 | W4 | `no-threshold-bounce`: 24 flips in both engines | yes |
| `nogate`: no engagement gate | W4 | `engagement-expands` fails in both engines | yes |
| `rimleak`: the plate does not clip its rim | W5 | **0/10**; 244-432 device px outside, 7.4-11.7 px deep | yes |
| `nomo`: delete the MutationObserver trigger | W3 | continuity ×0.64-0.66 in all 14 cells; only windows fail | the trigger is not load-bearing on these scenes |
| `noro`: delete the ResizeObserver trigger | W3 | continuity ×0.65-0.66 in all 14 cells; only windows fail | the same |

- **Rail end.** The harness drives W1's `rail·scrolled-end` cell with `scrollIntoView`, which leaves a transform track at s = 0, so the cell reads the rest geometry. I re-read it through `focus()` on the last seat (`$K/mine/railend.mjs`): s 168.48, the seat fully visible, corner 0.137 px (Chromium) / 0.011 px (Playwright WebKit). So the corner holds, but the cell as written cannot fail on this family.
- **Triggers.** The prototype's D-4 says an earlier ResizeObserver-only build read Playwright WebKit content-add at ×7.1. My `nomo` build is ResizeObserver-only, and it holds continuity in every cell of both engines. D-4 does not reproduce, and one fact (the natural extent) has two observers (§4.5).

## 4 · The checklist

### 4.1 Vacuous convergence

- W2 on a scroller-free family reduces to "no element has `auto`/`scroll`/`hidden`", which holds by construction. Its paint half is real: `clipboth` fails it at 4.25-4.35 px.
- W1 `rail·scrolled-end` is vacuous here (§3), and W1 cannot tell a resize from a 4 % scale (`scaleswell` 0.46 px).
- W5 is not vacuous: `rimleak` fails every cell.
- So W1, W2 and W5 converge on real properties. The corner-and-rim claims stand. The "resize, not scale" design choice is taste that no witness enforces.

### 4.2 Spec-cites-itself circularity

- **The clock.** R-4 fails at 210 ms, and the remedy is to set the register's clock to 0.26 s: "the 0.5 px horizon for the largest travel", which is this family's own seat rule. The witness then passes because its bound grew from about 253 to about 303-318 ms while the windows stayed at 248-267 (§2). That is redefinition, not cure.
- **The token's reach.** `--spring-dock-settle` feeds `--spring-dock-duration` and `--spring-dock-exit-duration`. `grep` over the worktree's `src/` finds 39 reads of `var(--spring-dock-duration`, 2 of `-exit-duration` and 2 of `-settle`, spread across 27 files that name `--spring-dock*`: tabs, slider, switch, carousel, sheet, menu, pager dots, progress, timeline, among others. The `linear()` curve would not be regenerated. So the dock's W3 would be paid for by the whole register, unmeasured.
- **The spec's own tables** cite the research probe for the W3 margin ("1-6 ms over"). The prototype and my run read up to 12.6 ms.

### 4.3 Gates that cannot fail

- **W3 has no terminal-smoothness check.** `band2` lands with an 8.97 px step after 2.88 px and scores 11/14. The crossing seat avoids that snap by choice, and nothing enforces the choice.
- **W3 has no seat-against-seat check.** Collisions pass (CX-4).
- **W4 reads only the plate.** Compaction scales the seats by 0.706 while the plate scales by 0.84 (CX-1), and every compact cell stays green.
- **W4's engagement cells cover hover and focus, not press-then-scroll** (CX-2).
- **The harness's `"@window"` getter always resolves.** A getter whose element mounts late never binds (CX-3), and W4 and W5 cannot see it.
- **The unit gates.** The patch reports 9 RED `g-dock-lattice` source-grep gates (the prototype's figure, not re-run here). They assert the struck design, so they cannot judge this one either way.

### 4.4 The elegant-reduction trap

- **"An entering face sits at its target; persistent regions lerp between page positions."** One line, and it is where the hard part hides: a region travelling across a face that is already in place must cross its seats. Measured on the warm expand (`$K/mine/collide.mjs`): Home paints over One, Two and Three for **16 of 109 frames (Chromium) and 9 of 55 (Playwright WebKit), up to 36.5 / 37.2 px**. The leaving collapsed "P" stays painting after the posture flips for 23 / 12 frames at opacity up to 1, and it jumps **8 px** up the cross axis on the first frame. HEAD reads the same class: 16 frames, 39.8 px, 8 px. D2-C inherits the choreography defect and does not cure it. `shots/sheet-d2c.png` and `tail-d2c-webkit.png` show "2 H 3", "H2", "1H" and a raised "P" riding over "Play".
- **"Nothing the body writes changes layout."** The plate's insets are layout. CDP counts 34 layouts across a 31-frame warm expand (HEAD 66 across 65; 1.76 ms against 4.87 ms), so the claim is false but cheap.
- **"A ResizeObserver covers content."** The prototype added a MutationObserver on the whole subtree (`childList`, `characterData`, `class` attributes). Every text or class change then forces a layout read in a microtask. A seat whose text ticks every frame (`probes.mjs ticker`, Chromium) costs **618 layouts in 2 s against HEAD's 240**. With proportional digits, `data-morphing` is open on **132 of 243 frames**, and the plate never rests (13 distinct widths).
- **"Retargets carry velocity."** A 600 ms linear CSS width transition on a seat is chased by the extent lane. The window stays open for 92 frames, and the plate lands 726 ms after the change against HEAD's 583 (`probes.mjs seattransition`). That is C-5 as a measured case: two owners of one geometry, invisible to the owners census.

### 4.5 Legacy aliases, shims or dual paths

- **Two observers of one fact** (`useDockExtent.ts:369`, `:428`), with neither load-bearing on the witness scenes (§3). This breaks P-3.
- `const outerCurrentLayer = outerActiveLayer;` (`GlassDock.vue:199`) is an identity alias.
- **The run keeps two reveal paths.** The body's reach is one. The other is the library's own `useSelectionGroup`, which still calls `scrollIntoView` (`useSelectionGroup.ts:235`), and the demo overflow story names it as its recenter path (`demo/stories/dock/overflow.vue:28`). On a transform track that call is a silent no-op.
- **`--dock-plate-t`** has a CSS default (`var(--dock-expand-t)`) plus an inline JS write during flips. That is a sanctioned two-writer shape, and it is flagged only because the census cannot see it.
- **PRM.** Every lane, including the face-crossfade opacity lane (`useDockExtent.ts:86`), is built `respectReducedMotion: true` (`useDockBody.ts:107`), so under reduce the fade seats in one frame. Canon P6 keeps fades under PRM. This is a code read: W4's PRM cells measure extent frames, not opacity.

### 4.6 Masked fallbacks and unverified gestalt

- **Masked: the scroll source.** `useDockScrollSource` watches `[source, compactOnScroll]`, where `source` is `() => props.scrollSource` (`useDockScrollSource.ts:63`). A getter prop is stored, not tracked, so a getter whose element resolves after the dock's setup never binds. There is no compaction, no rim fill and no warning. Measured in happy-dom (`$K/mine/getter.mjs`): an element prop reads `compact true, progress 0.200` after scrolling to 900. The getter `() => ref.value` with a late element reads **`compact false, progress 0.000`**. The same getter with the element ready reads `true`. O-55 asks for exactly the getter form. The primary is dead and nothing fails loud (E-2).
- **Masked: compaction's paint.** `--dock-k` is unregistered, so it inherits. The rule `scale: var(--dock-k)` (`shape.css:105`) matches `.dock-layers`, `.dock-layer` and `.dock-face`, which nest, so the scale compounds. Measured (`compound.mjs`, both engines): plate ×0.84, **seats ×0.706**, seat height 38 → 26.81 px inside a 47.06 px plate. `shots/compact-cmp.png` shows small type afloat in an oversized pill.
- **Gestalt, the morph** (my film strips, `shots/sheet-d2c.png`, `tail-d2c-*.png`). The plate is a true stadium in every frame, and it grows as one body, which HEAD's squashed, face-spilling strip (`sheet-head.png`) is not. But:
  - glyphs collide mid-flight;
  - the leaving face rides raised over "Play";
  - the landing is dead: 0 reversals by design, and the final steps are 1.34, 1.31, 0.91, 1.0 px.
  - The only weight cue is the swell. It is +2.22 px at peak (56 → 58.22), reached in the first frames and decaying through the travel. It is below what reads at a glance, and it puffs the plate rather than stretching it along the motion.
  - It reads as a clean glide, not an iOS-27 liquid morph with bounce (D-1, D-2). The one designed bounce in the family is the track's overpull.
- **Gestalt, overflow at 430** (`shots/cmp-430.png`, rows HEAD / D2-C):
  - The sections dock trades HEAD's lens for a stadium, but the trailing seat is cut flat at the port with no cue that more exist. That is a regression of affordance.
  - The BottomDock's tab strip grows to fill a max-content track (port 360, track 540). «, » and the layers control are pushed off, and "Vertical" is cut.
- **Gestalt, the rim.** It is a 3 px bar along the plate's straight bottom edge, clipped at the corners. It reads as a bottom shelf, not a rim.

### 4.7 Consumer-less substrate

- `rim` and `compactOnScroll` have no consumer yet. O-55 asks for both (value.js), so they are owed, not speculative.
- The body's `fling` and `hold` serve only the track, and the rim lane serves only the rim. Each has one site, which is acceptable inside one composable.
- The spec's consumer table lacks rows for:
  - the nested-scroller seat (BottomDock);
  - `useSelectionGroup`'s `scrollIntoView`;
  - a getter whose element mounts late.

## 5 · Counterexamples (concrete, all measured here unless marked)

| # | input | wrong output | engines |
|---|---|---|---|
| CX-1 | `compact` scene, scroll to 900 | plate ×0.84 but seats ×0.706; seat 38 → 26.81 px in a 47.06 px plate | Chromium, Playwright WebKit |
| CX-2 | `compact`: click (or tap) "Lots", move away, scroll to 900 | stays 214.13 px (205.52 at 430 touch), posture `pinned`; focus stays on the seat, so the engagement gate never releases | both (Playwright WebKit focuses on click; real Safari macOS does not, so this is UNMEASURED there) |
| CX-3 | `scrollSource: () => el.value` with `el` mounted after the dock | never binds: `compact false`, progress 0 at scroll 900; no error | happy-dom |
| CX-4 | `morph` warm expand | Home over One/Two/Three for 16/109 frames, up to 36.5 px; leaving "P" visible after the flip for 23 frames, jumped 8 px | both |
| CX-5 | `long`: drag 84 px, release, then click the track 30 ms later | the track stops (s 126.29 / 157.19) **and** V7's click fires | both |
| CX-6 | `useSelectionGroup` selects a seat past the fold (programmatic) | `scrollIntoView` does nothing on the track; the seat stays hidden | code read (`useSelectionGroup.ts:235`), not run |
| CX-7 | a seat whose text changes each frame (proportional digits) | `data-morphing` open 132/243 frames, 618 layouts in 2 s (HEAD 240) | Chromium |
| CX-8 | demo BottomDock at 430 | track 540 in a 360 port; prev/next-category and layers off the port | Chromium |
| CX-9 | `band2` plant (terminal snap 8.97 px) | W3 11/14, green on continuity | both |
| CX-10 | `--spring-dock-settle: 0.26s` | W3 7/14 → 14/14 with windows unchanged; the dock register's duration token has 39 readers across 27 files, retimed and unmeasured | both |

## 6 · Convergence

The invariant checklist: 17 rows, the five problems, the floor and the checklist above. Closed rows are marked ✓.

| # | row | state |
|---|---|---|
| 1 | P1 stadium in every sampled rung and frame (W1, plant-verified) | ✓ |
| 2 | P2 no scroll container; cross-axis paint whole (W2, plant-verified) | ✓ |
| 3 | P3 continuity, faces within the plate, dead landing, one owner (W3 physics) | ✓ |
| 4 | P5 rim inside the silhouette in every rung (W5, plant-verified) | ✓ |
| 5 | one integrator carries velocity across retargets; the loop parks at rest | ✓ (prototype's reading, not contested) |
| 6 | P3 window on the shipped clock | open |
| 7 | P3 content choreography: no seat collisions, no ghost after the flip (CX-4) | open |
| 8 | P4 compaction paint (CX-1) | open |
| 9 | P4 gate releases after a press (CX-2) | open |
| 10 | P4/P5 getter source binds (CX-3) | open |
| 11 | floor row 3: coarse latch, tap-pins (W4 4 RED) | open |
| 12 | floor row 1 (`[data-dock-seat]` at depth) and row 4 (PRM keeps fades) | open |
| 13 | the gesture's platform contract: tap-to-stop (CX-5), AT reach (C-1), iOS momentum (C-3) | open |
| 14 | an overflow end cue, and the flexible-seat consumer (CX-8) | open |
| 15 | one source per fact: two content observers, the identity alias, two reveal paths (CX-6) | open |
| 16 | gestalt D-1: designed bounce and weight on the extent | open |
| 17 | budget: DockProps 9 against 6, 9 RED lattice gates, about 50 stale comment lines (prototype's figures) | open |

**Convergence: 29 %** (5 of 17 closed).

**Open gaps (exact):**
1. W3 window at 210 ms. The 0.26 s ask is circular and register-wide (CX-10). An owner ruling is owed.
2. Seat collisions and the post-flip ghost (CX-4).
3. Compounded compaction scale (CX-1).
4. The press-then-scroll gate trap (CX-2).
5. The late-getter scroll source (CX-3).
6. Floor row 3 (coarse latch, tap-pins).
7. Floor row 1 and floor row 4 (PRM drops the crossfade).
8. Tap-to-stop activates a seat (CX-5).
9. AT reach (C-1), iOS momentum parity (C-3), and consumer or library `scrollIntoView` (C-2, CX-6).
10. No end cue on an overflowing run.
11. The BottomDock nested-scroller seat (CX-8).
12. Two content observers, one to delete; the `outerCurrentLayer` alias.
13. No designed bounce on the extent; the swell is imperceptible.
14. DockProps 9 against the 6 budget (owner call); 9 lattice gates to rewrite; stale comments.
15. Harness debts that block trust in any transform-track family:
    - W1 `rail·scrolled-end` must reach through focus;
    - W3 needs a terminal-step check and a seat-against-seat check;
    - W4 must read seat scale and press-then-scroll;
    - the scenes need a late-getter binding.
16. Real Safari, iOS Safari, VoiceOver and TalkBack: UNMEASURED (owner's safaridriver checkbox).

## 7 · Verdict

**BANK.**

- **Sound where it claims soundness.** Four witnesses catch their plants, and they read:
  - a true stadium in every frame;
  - no scroll container;
  - a rim inside the plate;
  - dead landings with velocity carried across retargets, which S-16 finds no CSS carrier gives.
- **Not refuted, so not RETIRE.** The center (one integrator, a transform track) stands, and no missing primitive stalls it.
- **Not BLOCK.** Every open gap above is a buildable change.
- **Not ADVANCE.**
  - At the shipped clock it is 7/14 on W3.
  - It reaches green only by retiming the whole dock register.
  - It takes on the platform scroller's full contract (tap-to-stop, AT reach, `scrollIntoView`, momentum) and already fails one piece of it (CX-5).
  - Four defects of its own escape the witnesses: CX-1, CX-2, CX-3, CX-7.
  - The spec's side-by-side table records D2-B at W3 14/14 and W4 16/16 at the shipped clock. On that record D2-C is dominated.

**Re-trigger.** Re-open D2-C if either happens:
- a native-scroller family fails a real-Safari or iOS Safari cell on the run's cross-axis paint or its lattice, which a transform track cures by construction;
- the owner rules the dock register's clock to its 0.5 px horizon for the register as a whole.

On re-entry, gaps 2-5, 7, 8 and 12 close first. Each is a deletion or a small fix:
- register `--dock-k` non-inheriting, or write it on one box;
- make the gate ignore pointer-caused focus;
- read the source through `toValue` inside the watch;
- suppress the click on a catch;
- keep one observer;
- give the face lane a PRM exemption.
