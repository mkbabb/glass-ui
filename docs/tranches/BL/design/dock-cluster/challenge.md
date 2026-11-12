# Dock cluster · adversarial challenge of W-I.8

| field | value |
|---|---|
| seat | fresh challenger, O-195 design loop. I wrote none of the proposals, AB.md or W-I.8 |
| model | `claude-opus-5-5`, asserted from own system identity |
| subject | `docs/tranches/BL/waves/W-I.8.md`, against the graft it cites (`spec-graft/prototype.patch`, the r5 build) |
| base | master `2fec9b726` (its `src/` is byte-identical to `0778c4090`: `git diff --stat 0778c4090 master -- src` is empty). Scratch worktree `.claude/worktrees/bl/cluster/challenge`, which was removed after this record was written. `prototype.patch` applied clean. One read-only hook was added (`window.__clusterNow`, the painted join vector), plus one plant build (`challenge/tools/instrument-and-plants.md`) |
| harness | `challenge/fixture/` is AB's fixture plus vertical, RTL, a member toggle, a tab-count setter and §5's router logic. `challenge/tools/probe.mjs` reuses AB's virtual rAF clock and AB §1's line and tone metrics, at any DSF. `challenge/tools/build.mjs` is AB's build tool with the fixture directory swapped |
| engines | headless Chromium (Playwright headless shell) and Playwright WebKit 26.5, guarded. WebKit ran under `--exclusive webkit`. Every run exited rc=0 with 0 leftovers (`challenge/logs/guard.log`) |
| records | `challenge/data/{chromium,webkit}-{base,goo,router,narrow,zoom}.json`, `challenge/logs/`, `challenge/png/` (74 captures) |
| note on guard | The heavy pool stayed full of other sessions' long-lived servers for 23 min. I stopped my own queued build (PID 11475) and ran the two one-shot vite builds (about 0.5 s each) with `--light`. Every browser run used the browser pool, never `--light` |

## Verdict

**The spec does not hold as written.** I demonstrated 12 findings below, and every one of them reproduces in both engines where an engine is involved.

- **4 gates cannot catch the defect they name:**
  - G5 grep: on the owner's Mac it does not even catch its own planted literal.
  - G8 grep: blind to `filter: url(#…)` on macOS, and it misses JS-written or out-of-path goo.
  - G8 runtime half: GREEN with an SVG goo filter painting on every member's ink.
  - G6: the PRM carve neutralises its own plants. Read the other way, it is RED on the clean branch.
- **4 hard-constraint breaks AB never measured:**
  - a seam at every fractional DPR;
  - a ratchet in `min-inline-size` that leaves up to 223 px of empty glass;
  - a joint that reverses when the targets are mixed;
  - a page change that lands mid-fuse and jumps the plates 61 px.
- **The §5 consumer design never paints a fuse beat.** Daraksha's page change therefore shows the 61 px jump that R-7 says the beat hides.
- **Vertical, RTL and a 320 px row each mispaint silently, with 0 console errors.** That breaks (e) "fails loud". At 320 px it also hides a control and puts it out of pointer reach, which breaks (h).

Cells that came back clean: a coarse pointer at DSF 3, 390 × 844 (pointer: coarse matched; seam 0/0 in both engines and both themes), and integer DSF 1, 2 and 3 (seam ≤ 0.2).

## 1 · G5's grep cannot bite on macOS, and misses three literal spellings anywhere (constraint c)

The gate is ``git grep -nE '(response|dampingFraction|stiffness|damping)\s*:\s*[0-9]' -- src/components/dock``. Apple Git 2.50.1 uses BSD ERE, where `\s` matches nothing:

| pattern on a one-line file `const a = { response: 0.3 };` | `-E` | `-P` |
|---|---|---|
| `response\s*:\s*[0-9]` (as written) | **no hit** | hit |
| `response[[:space:]]*:[[:space:]]*[0-9]` | hit | hit |

These plants went into DockCluster.vue in place of `useDockSpring({ response: DOCK_SPRING.response, … })`:

| plant | G5 as written | G5 copied from the table (`\|`) | portable `[[:space:]]` |
|---|---|---|---|
| `{ response: 0.3, dampingFraction: 0.88 }` (**the spec's own bite**) | **empty** | empty | hit |
| `{ response: .3, dampingFraction: .88 }` | empty | empty | **empty** |
| `const R = 0.3, Z = 0.88; … { response: R, dampingFraction: Z }` | empty | empty | **empty** |
| `{ "response": 0.3, "dampingFraction": 0.88 }` | empty | empty | **empty** |

CI runs on `ubuntu-latest`, where glibc ERE does accept `\s`. So the gate goes RED in CI and stays green on the owner's machine. Even with the portable class, a literal equal to the dock preset's own values passes, and so does the step-response arm, because the values are the same. Constraint (c), "never a literal", is therefore enforced for one spelling only. (Note: `git grep` skips untracked files unless given `--untracked`, so a pre-commit run of this gate on a new file is blind as well.)

## 2 · G8's source grep misses the canonical goo spelling on macOS, misses JS and other paths, and its cited bite is wrong (constraint a)

| plant | as written (BSD) | `[[:space:]]` |
|---|---|---|
| P1 `.dock-cluster-shadow-blur { filter: url(#cluster-goo); }` in cluster.css | **empty** | hit |
| P2 `--dock-cluster-ink-filter:url(#cluster-goo)` (no space) | hit | hit |
| P3 `plate.style.filter = "url(#cluster-goo)"` in DockCluster.vue | **empty** | **empty** |
| P4 P1's rule in `src/styles/utilities/cluster-goo.css` | **empty** | **empty** |

- **The cited bite does not reproduce.** §3 says "at `98b526139^` it hits `useDockFission.ts:186`". At that revision the file is `src/components/custom/dock/composables/useDockFission.ts`, which lies outside the gate's pathspec. `git grep … 98b526139^ -- src/components/dock` returns rc=1.
- **The historic recipe also escapes.** At `ae71daa05^`, where the goo recipe still existed, the same grep over `src/components/dock` finds nothing. The recipe lived in `src/styles/dock/fission-bridge.css` (`--dock-fission-goo-filter: url(#dock-fission-goo)`) and `src/components/custom/goo-filter/GooFilter.vue`, and the mount was named `<DockGooFilter>`, which the `<GooFilter` arm does not match.

## 3 · G8's runtime half is GREEN with an SVG goo filter painting on every member (constraint a)

The P3 build writes `filter: url(#cluster-goo)`, a feGaussianBlur and feColorMatrix goo, onto each member's `.dock-plate`. I implemented the runtime check exactly as §3 words it, checking every element with a computed `backdrop-filter` against its ancestors, and checking every element that contains one.

| | ancestor violations | filter over a backdrop | elements in the cluster with `filter: url()` | verdict |
|---|---|---|---|---|
| Chromium base | 0 | 0 | 0 | GREEN |
| Chromium goo | 0 | 0 | **3** | **GREEN** |
| WebKit goo | 0 | 0 | **3** | **GREEN** |

Inside a cluster, the member plate carries `backdrop-filter: none` and has no backdrop descendant. The shadow branch is exempt by design. An SVG goo filter on the ink or the shadow therefore passes both halves of G8 (`png/chromium-goo-g8-fused.png`: the ink's right end is goo-eroded). Constraint (a) forbids the SVG goo outright, not only over a backdrop. The runtime half needs an arm that reads "no computed `filter` containing `url(` anywhere in the cluster subtree".

## 4 · G6's bites are neutralised by the PRM carve; read by property list, G6 is RED on the clean branch (constraint c, O-198)

Emulated PRM, a fuse, and every frame for 600 ms, reading the computed transitions of every element in the cluster and `getAnimations({ subtree: true })`:

| | elements listing a non-opacity `transition-property` | of those with duration > 0 | animations seen |
|---|---|---|---|
| baseline (branch) | **16** (e.g. `glass-dock:all`, `dock-tab-button:inline-size`, `dock-icon-button:inline-size`, `dock-layer:visibility`) | 0 | `Animation:opacity` only |
| plant `transition: clip-path 300ms` on the lenses (the spec's bite) | 16 | **0** | opacity only |
| the same with `!important` | 16 | **0** | opacity only |
| plant `transition: border-radius 300ms, clip-path 300ms` on the member plate (the spec's second bite) | 17 | **0** | opacity only |

The results are the same in both engines (`data/*-base.json` `cells.prm`).

`a11y-overrides.css` sets `transition-duration: 0s !important` inside `@layer components`, and a layered `!important` beats any unlayered rule, `!important` included. The planted CSS transition therefore never runs:

- If "transitions a non-opacity property" is read by duration, the gate cannot see either bite.
- If it is read by property list, it is RED on the branch, because master's own controls list `all` and `inline-size`.

The only geometry animation PRM cannot zero is a WAAPI or inline-`!important` one, and the bite should plant that (for example, `lens.animate([{clipPath: a}, {clipPath: b}], 300)`).

## 5 · The seam returns at every fractional device-pixel ratio (constraints e, g; G1 measures DSF 2 only)

Flat field, rest fused, AB §1 line and tone, worst row per join (join 1 ; join 2):

| DSF | Chromium 390 light | Chromium 1440 light | Chromium 1440 dark | WebKit 390 light | WebKit 1440 light |
|---|---|---|---|---|---|
| 1, 2, 3 | ≤ 0.2 / 0 | ≤ 0.2 / 0 | 0 / 0 | 0 / 0 | 0 / 0 |
| **2.625** (common Android) | **13.4** / 0 ; 3.6 / 0 | 1.1 ; **4.1** | **3.6** ; 0.9 | **9.8 ; 9.8** | **13.6 ; 7.6** |
| **1.25** (Windows 125 %) | **11.7** ; 0.8 | **4.4 ; 3.8** | **2.6** ; 1.9 | – | – |
| **1.5** (Windows 150 %) | **10.4 ; 9.8** | 0.4 ; 0.2 | **2.0** ; 1.6 | – | – |
| **2.2** (110 % zoom on a 2× display) | 0.9 ; 0.9 | **4.0 ; 10.7** | **1.9 ; 3.3** | – | – |

The G1 threshold is line ≤ 1.5. The defect is a real column, not a metric artefact. At Chromium 2.625 / 390 light, the mid-row device pixels across join 1 read `… 204 204 217 211 204 204 …` against an interior of 204: a 2-device-pixel field-coloured gap at the cut.

R-3's grid is "whole CSS px". It lines a cut up with a device pixel only when the DPR is an integer, while the cut itself is snapped to `round(x · dpr) / dpr`. G1 is measured at DSF 2 only, so it cannot see this. Browser zoom alone gives the owner's own Mac a fractional ratio.

## 6 · R-3's `min-inline-size` ratchets, leaving up to 223 px of empty glass (constraint g; G9 passes over it)

`grid()` writes `minInlineSize = ceil(w)` when a member's width is fractional and never clears it. After the Pages member's tabs drop from 4 to 1 (fused, design field):

| | width | natural width | `min-inline-size` | empty glass |
|---|---|---|---|---|
| Chromium 1440 before | 312 | 311.48 | 312px | 0.52 |
| Chromium 1440 after | **312** | 89.16 | 312px | **222.8 px** |
| Chromium 390 after | **212** | 83.13 | 212px | **128.9 px** |
| WebKit 1440 / 390 after | 312 / 212 | 89.17 / 83.14 | same | **222.8 / 128.9 px** |

![one tab, 223 px of empty plate](challenge/png/chromium-base-minsize-1440-after-1tab.png)

G9's "outline edge equals the member's edge" passes, because the member box itself is stale. Daraksha's controls member changes content on every page change (§5), so this fires in the consumer's main path. A control that grows and then shrinks is enough to trip it.

## 7 · A page change that lands mid-collapse jumps the plates 61 px in one frame (R-7, constraint g)

On the virtual clock: a fuse starts, and at 40 ms the controls member leaves, as a page with no controls would make it. The joins are at 0.30, below JC = 0.4, so the shares do not yet touch:

| | joins at the change | outer-edge move in one frame | frames the joins keep moving |
|---|---|---|---|
| leave during fuse, Chromium | 0.30 → 0.37 | **61 px** (Theme 910 → 849, Pages 466 → 527) | 39 |
| arrive during fission, Chromium | 0.70 → 0.63 | **61 px** | 44 |
| both, WebKit | same | **61 px** | 39 / 44 |

R-7 says "the consumer plays a page change as a fuse beat, so the step lands inside one plate". That holds only when the fuse has already completed. With `justify-content: center`, the remaining split plates jump half the departed member's width plus the gap. The cut has no glide (R-7 itself books the width glide as out of scope). The owner listed "a page change during a collapse" as a state change the dock must carry.

## 8 · §5's consumer beat never paints a fuse (R-7, constraint g)

The §5 code is transcribed into the fixture: `router.beforeEach → changing = true`, `afterEach → await nextTick(); changing = false`, and `fused = changing || (reading && !reach)`. The reader has reached for the dock (expanded), then navigates. I sampled every rAF, real clock, for 1.2 s:

| | frames with `fused` true | max painted reach of share 0 past its member (px; touching needs 5) | frames touching | `changing` true on any timer tick | Theme plate's first-frame move |
|---|---|---|---|---|---|
| to a page without controls, Chromium / WebKit | **0 / 0** | **0 / 0** | 0 / 0 | 0 (true at push resolution, 0.6–2 ms; false at the next timer tick, 1–3 ms; both engines, no errors) | **−61 px / −61 px** |
| to a page with controls, Chromium / WebKit | 0 / 0 | 0 / 0 | 0 / 0 | 0 | 0 |

`changing` lives for a few milliseconds between microtasks and never spans a frame, so no frame paints a fused plate. The controls member's content therefore changes hands on split plates, and on a page without controls the Theme plate jumps 61 px. The "fuse beat" of §5 and R-7 does not exist as specified. It would have to be held for at least one dock-spring settle, which is a consumer timing contract the spec does not state and no gate measures.

## 9 · One shared spring scalar reverses or stalls a join whose target did not change (constraint g, motion canon; G5 measures a full reversal only)

Episodes on the virtual clock at 1440. Join velocity is in join units per second, for the frames around the interrupt at 91.7 ms. The results are identical in both engines:

| episode | join | velocity, 3 frames before → at → after | join values around the interrupt |
|---|---|---|---|
| G5's own: `[T,T]` then `[F,F]` at 80 ms | both | 6.72 → 5.76 → −1.16 (a smooth reversal) | 0.617 → 0.665 → 0.655 |
| **theme fissions out mid-fuse:** `[T,T]` then `[T,F]` | **join 0 (target 1 → 1, unchanged)** | **6.72 → −3.58 → 0.73** | **0.6165 → 0.5867** (moves backwards, then resumes) |
| **join 1 joins a fuse in flight:** `[T,F]` then `[T,T]` | **join 0 (target 1 → 1, unchanged)** | **6.72 → 2.29** (loses 66 % of its speed in one frame) | 0.6165 → 0.6356 |

`play()` carries velocity "along the join that moves most". The other joins inherit that join's scalar:

- In the first case, join 1's new span is negative, so `s` takes a negative velocity and join 0, which is still fusing, runs backwards for a frame.
- In the second case, join 1's old span is 0, so `inheritVelocityScale` is 0 and join 0 restarts from rest.

Both violate "motion carries weight and inertia". The theme-fission case is the owner's own example. This is not more machinery: one spring per join removes it. The one-scalar design is less machinery than the ask needs to be correct.

## 10 · A vertical cluster mispaints silently (constraint e)

GlassDock's public `orientation="vertical"` (README §props), in a cluster with `flex-direction: column`. This is the share bbox (from the lens `clip-path`) over each member's box:

| fused | Pages | Page controls | Theme | console errors |
|---|---|---|---|---|
| `[F,F]` | 1 | 1 | 1 | 0 |
| `[T,T]` | **0.828** | **0.50** | **0.75** | **0** |
| `[T,F]` | 0.828 | 0.75 | 1 | 0 |

The results are identical in both engines. The share math cuts along x at the midpoint of stacked boxes, so the glass tears down the middle (`png/chromium-base-vertical-FF.png`: the controls' glass is a ragged sliver, the icons sit on bare page). §6 books vertical as "not in this wave" but adds no guard. Constraint (e) requires a loud failure, the way R-8 throws for `collapse`.

![vertical, fused](challenge/png/chromium-base-vertical-FF.png)

## 11 · RTL mispaints silently (constraint e)

Same cluster with `dir="rtl"`. The flex row reverses, while `clusterShape` reads the members in DOM order as left to right:

| fused | Pages | Page controls | Theme | console errors |
|---|---|---|---|---|
| `[T,T]` | 0.949 | 0.902 | **0.75** | **0** |
| `[T,F]` | 0.949 | **0.857** | 1 | 0 |

The results are identical in both engines. At `[T,F]` the "Page controls" share sits at 551–765 px, while the member itself sits at 540–652. Glass lies under the tabs and the controls are left bare (`png/chromium-base-rtl-Fs.png`). Daraksha passes `dir="ltr"`, but the primitive is general, `dir` inherits from `<html dir="rtl">`, and nothing fails loud.

![rtl, theme fissioned](challenge/png/chromium-base-rtl-Fs.png)

## 12 · At 320 px a control is hidden under the next plate and cannot be hit (constraints e, h; R-10)

The cluster is `nowrap` (R-10), and flex shrinks the Pages member below its content. At 320 wide, fused:

| | Pages box | "Learn" tab | inside its member | `elementFromPoint` at its centre is itself |
|---|---|---|---|---|
| Chromium 320 | 15–178 | 158–219.5 | **no** | **no** |
| WebKit 320 | 15–178 | 158–219.6 | **no** | **no** |
| both 360 | 15–206 | 158–219.5 | no | yes (partly clipped) |

The member reports `scrollWidth 168 > clientWidth 163`, and nothing warns. The tab is visually gone, covered by the Page controls member's z-index and clipped by its own share (`png/chromium-base-narrow320-fused.png`), and a pointer cannot reach it. R-10 says "a host that cannot fit one row composes two", but the cluster neither detects nor reports the overflow. Daraksha avoids it below 611 px by moving Pages out (§5), but a general consumer gets a dropped control in silence.

## What I tried that held

- **Coarse pointer** (touch context, `(pointer: coarse)` true, DSF 3, 390 × 844): seam 0/0 in both engines and both themes, all members the same height.
- **Integer DSF 1 and 3**: seam 0/0 in both engines.
- **G5's own full reversal at 80 ms**: smooth, with no position step.

## Reproduce

```sh
WT=.claude/worktrees/bl/cluster/challenge   # master + spec-graft/prototype.patch + the one-line hook
node docs/tranches/BL/design/dock-cluster/challenge/tools/build.mjs $WT $WT/.chal/base
~/.claude/guard/guarded --timeout 30 -- node …/challenge/tools/probe.mjs --engine chromium --site $WT/.chal/base/site --out …/challenge --tag base
~/.claude/guard/guarded --exclusive webkit --timeout 30 -- node …/challenge/tools/probe.mjs --engine webkit --site $WT/.chal/base/site --out …/challenge --tag base
# fractional ratios: --parts dpr --dsfs 1.25,1.5,2.2 ; goo plant: build with P3, --parts g8
```
