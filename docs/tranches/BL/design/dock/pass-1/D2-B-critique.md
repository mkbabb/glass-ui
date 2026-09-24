# D2 · pass 1 · D2-B · critique (the measured scene)

| field | value |
|---|---|
| seat | D2-B adversarial CRITIC, pass 1. Did not author the spec, the research report or the prototype |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | checkout at `4b589018`. `D2-B-proto.patch` applies clean (`git apply --check`), and is byte-identical to the prototype seat's scratch copy (`cmp`). After the patch, `git diff --stat` reads 24 files, +260 / −1073, plus the two new composables, as the prototype reports |
| scratch | `K = …/scratchpad/D2/p1/D2-B-crit`. The worktree `$K/wt` (node_modules symlinked) is removed. Kept: builds `$K/out/builds/{d2b, plant-*}`, the witness run `$K/out/run-d2b.txt`, plant runs `$K/out/plants/*.txt`, probes `$K/probes.mjs` → `$K/out/probes-{chromium,chromium-2,webkit}.json`, the planting script `$K/plant.mjs`, shots `$K/shots/` |
| engines | headless Chromium and Playwright WebKit from node, with playwright imported by absolute path from the checkout. No browser MCP. **Every WebKit number is Playwright WebKit (+shim). Every real-Safari cell is UNMEASURED (owner's safaridriver checkbox)** |
| load | load average 32-64 during the witness runs (`uptime`) |
| fences | The only write in the checkout is this file. The only git writes were `worktree add` and `worktree remove`. Plants were applied to the worktree with Node and restored from in-memory backups (after each plant, the diff stat read +260 / −1073 again). The checkout's `node_modules/.vite*` mtimes after my stamp belong to IDE `vitest-vscode` processes and other sessions' dev servers, not to these builds: the harness `build.mjs` keeps its caches in scratch |

## 1 · Before reading the family: the failures I expected a dock design to hide

I wrote these from `PORTFOLIO.md` §0-2 and `HARNESS.md` alone, before opening SPECS §D2-B, `D2-B.md` or the prototype.

1. **The seat-level morph.** W3 reads the plate's extent and faces that paint outside the plate. It never asks whether a seat inside the plate jumps. A design can morph the glass continuously while its content teleports inside it.
2. **The harness's scene choices.** The morph scene appends its extra seat at the end of the run, and the compact scene's current seat is the first seat. Neither moves inside the run. An insertion at the start, or a current seat in the middle, would.
3. **Self-reported windows.** W3's window is `data-morphing`, and the family writes that attribute itself. If the same code both lands the extent and clears the attribute, "closes within a frame of landing" holds by construction.
4. **Shared definitions.** If the family's overflow test and the witness's `budget()` share a definition, a wrong budget passes both.
5. **The first rest.** "The first delivery records rest, no mount morph" is correct only when the first delivery is a real layout. A dock mounted hidden (`v-show`, a tab, a closed drawer) has none.
6. **Dual triggers.** A primary trigger with a backstop can hide a dead primary (E-2).
7. **The landing.** "Dead" can mean the spring never overshot, not that the clamp works. Bounce (D-1) can disappear without anyone deciding it should.
8. **Hit against paint.** A plate that animates outside its box's hit region, or a hit region outside the plate.
9. **The crossfade.** Two faces at one origin double-expose during a posture flip.
10. **Consumer widths.** A width on the root below the seats' need, which is fourier's X-4/K-14.
11. **Resizes.** Parent-relative geometry that goes stale when the parent moves without a watched mutation.

## 2 · Reproduction (my own runs)

`node harness/run.mjs --build $K/out/builds/d2b --adapter $K/adapter-d2b.mjs` (the prototype seat's adapter; it differs from `adapter-head.mjs` only in `compactProps`, `rimProps`, `posture()`, `rim()` and `compact()`), exit 0:

| witness | Chromium | Playwright WebKit (+shim) | total |
|---|---|---|---|
| W1 | worst 0.137 px; 4-10 distinct extents per sampled morph | worst 0.011-0.048 px | **32/32** |
| W2 | long cut 0/0 (4.25 = 4.25); fitting runs 0/73, 0/241, 0/211 scroller frames | 0/36, 0/127, 0/118 | **10/10** |
| W3 | step ×0.65-0.66; faces ≤ 0.22 px; windows 233.3-241.9 ms against allowances 253.0-268.4 | windows 233-252 ms against 263-265 | **14/14** |
| W4 | compact 214.13 → 101.59; 88/40, 1 flip; PRM 0 frames; tap pins with 0 clicks | 214.16 → 101.61; the rest the same | **16/16** |
| W5 | ink 1442 / 194 / 1264 / 198 / 751, 0 outside | 1438 / 190 / 1264 / 196 / 744, 0 outside | **10/10** |

The prototype's claim reproduces. The smallest W3 margin in my run was **11.3 ms** (Chromium warm-collapse, 241.7 against 253.0), and **11 ms** in Playwright WebKit (warm-expand, 252 against 263). In every cell, `travel` equals `window`.

## 3 · Can the witnesses fail on this family? (planted faults)

Each plant edits the patched source in the worktree, builds under its own label, and runs only its witness, in both engines (`$K/plant.mjs`, `$K/out/plants/<name>.txt`).

| plant | edit | witness | result |
|---|---|---|---|
| `w1morph` | `.glass-dock[data-morphing] > .dock-plate { border-radius: 12px !important }`: rests stay stadiums | W1 | **FAIL, 12 cells**: every morph-frame cell in both engines (5.78 px horizontal, 6.81 px vertical, Chromium; 5.78 px Playwright WebKit). Every rest cell passes. Frame sampling bites on this plate |
| `w2scroll` | `.glass-dock .dock-run { overflow-x: auto !important }` | W2 | **FAIL, 4/10**: routes 2-4 in both engines (72/72, 238/238, 210/210 scroller frames, Chromium) |
| `w3nocontent` | `check()` retargets only on posture flips | W3 | **FAIL, 6/14**: content and swap cells, one step of 179.33 / 244.98 px (×9.2-10.7), no window; swap-short faces 232.98 px out |
| `w3bounce` | ζ 0.6 and no clamp | W3 | **FAIL, 0/14**: undesigned overshoot 16.9-36.7 px, 2-3 reversals |
| `w3romonly` | the MutationObserver callback is a no-op; ResizeObserver is the only trigger | W3 | **12/14.** Every content and swap cell **passes** in both engines (×0.65). Only two Playwright WebKit window cells fail, by 1-5 ms, which is load noise. See §4.2 |
| `w3tail` | clamp removed; landing moved to \|1 − s\|·D ≤ 0.05 px at v ≈ 1 | W3 | **13/14.** Every cell reads "dead, 0 reversals". The one fail is a Chromium window 5 ms over. See §4.3 |
| `w4band` | `DOCK_COMPACT_EXIT_PX = 86` | W4 | **FAIL**: no-threshold-bounce, 24 flips in 24 moves, both engines |
| `w5rim` | the rim loses its clip and sits 5 px below the plate | W5 | **FAIL, 10/10**: 434-1896 device px outside, 12.9-15.2 px deep |

Each witness can fail on this family. Two of the family's own mechanisms turned out not to be load-bearing (§4.2, §4.3).

## 4 · The checklist

### 4.1 · Vacuous convergence

- **W1, W2, W4 and W5 are not vacuous here**: each fails on a plant (§3).
- **W3's window-close check is vacuous for this family.** `settle()` clears `data-morphing` in the same frame that lands the extent (`useDockScene.ts:321-343`), so "closes within a frame of landing" holds by construction. In every cell of my run, `travel` = `window`. Only the window's *length* can fail. That bound holds only because the allowance adds 2F plus a stall term to a 210 ms clock that a 0.5 px landing can never meet: 233-252 ms against the 210 ms clock. This is C-2, still standing.
- **W5 holds by construction.** The rim is `inset: 0; border-radius: inherit; overflow: clip` inside the plate. That is the right kind of cure, but W5 then proves placement, not behaviour. No witness reads the rim's *value* against its scroll source. The dock-search route shows a rim that reads 0 at the top, and nothing checks it tracks.

### 4.2 · Spec cites itself

- **The budget.** The flag's budget is `min(max-inline-size, parent content box)` (`useDockScene.ts:216-227`). The harness's `budget()` uses the same definition (`adapter-head.mjs:64`, inherited by the D2-B adapter). **Counterexample CX-3 (§5):** a consumer width on the root below the seats' need passes both, while seats paint 148.5 px past the plate.
- **The MutationObserver claim.** `D2-B.md` §2 item 2 says an RO-only build failed W3 content-add with one 179.33 px frame, and that the microtask inversion cured it. SPECS §B.1 carries this as [probed]. **Not reproduced:** the `w3romonly` plant passes all 8 content and swap cells in both engines. The research seat's own `run-d2b-v2.txt` is gone from scratch (the prototype seat found `$R` missing), so the claim now rests on a report citing a vanished artefact. The MutationObserver may still be needed for batches that change no box size, such as a class toggle that only moves seats. W3 does not show it, so the witness does not establish it.
- **The rung.** `rung()` reads `SPRING_PRESETS.dock`, not the spring the scene plays. A family that swapped its spring would be judged against the preset. That is harmless today, because the scene uses `DOCK_SPRING` = the preset.

### 4.3 · Gates that cannot fail

- **The dead-landing clamp is decoration at ζ 0.88.** With the clamp removed, and the landing moved to 0.05 px at v ≈ 1 (`w3tail`), all 14 cells still read "dead, 0 reversals". The spring settles before its 0.3 % overshoot peak, which sits at about 316 ms against a settle of about 215-262 ms (S-14). So SPECS item 5, "the spring's 0.3 % overshoot is never shown", describes the spring, not the clamp. The clamp matters only if the dock spring ever gets a designed bounce. At that point it would silently erase the bounce D-1 asks for (§4.7).

### 4.4 · The elegant-reduction trap

"Regions FLIP by `translate`" is carried out only for `.dock-persistent` and `.dock-layers` (`regionsOf`, `useDockScene.ts:130-136`). **Seats inside the run are never inverted.** Whenever a mutation moves a seat *within* its region, that seat jumps in one painted frame, and the plate lerps around it. The hard part of FLIP is per-seat inversion. It is exactly what the reduction left out, and the harness's scene choices cannot see it (§1 items 1-2).
- **CX-1 insertion (measured).** A label seat inserted before "1" on the expanded morph dock moves "1" from x 533.17 to **668.5 px in one frame (+135.3 px)**, then slides back to 600.84, in both engines (Chromium, Playwright WebKit). Capture `$K/shots/ins-strip.png`: in the first frame the whole row has reflowed inside the old plate, and "Square" is cut off by the aperture.
- **CX-2 compaction (measured).** With the current seat second ("Lots"), compaction moves it from 710.53 to **624.9 px in one frame (−85.6 px)**, then slides it +67 px back, in both engines. Capture `$K/shots/cmp-strip.png`: frame 1 shows "Lots" snapped to the left edge of an empty glass pill, and "Photos" and "T" gone at once (C-4). The harness passes this because its compact scene's current seat is first.
- **The leaving face.** "A leaving face holds a constant a" is in the spec and not in the patch. The prototype seat says so itself, and the double exposure in §4.7 follows from it.

### 4.5 · Legacy aliases, shims, dual paths

- **Clean on E-1.** The scale and counter-scale, `--dock-morph-t`, `useDockMorph.ts`, `dockMorphMeasure.ts` and `useDockSearch`'s scroll options are deleted, not aliased (−1073 lines). The WebKit `+shim` is harness tooling; S-2 is untouched.
- **Dual paths that remain:**
  - `sizeOf` falls back to `offsetWidth` until the first RO delivery (`:186-188`).
  - `useScrollChrome` stays as a second scroll-to-chrome engine beside `useDockScroll` (StoryPage). That is two machines for one idea (P-3), declared in Q6 but not reconciled.
  - The compact rung keys on a list of seat classes, not a `[data-dock-seat]` marker, so floor row 1 is not built.
  - Stale prose in six files still describes the struck scalar, aperture and cut cap. The prototype seat lists this itself.

### 4.6 · Masked fallbacks

- **The ResizeObserver backstop masks a dead MutationObserver.** `w3romonly` shows the witnessed behaviour is identical with the primary disabled (§3), which is E-2's pattern exactly: the primary can be dead while the fallback paints. Either the MutationObserver is load-bearing (show a witness that fails without it: a mutation that moves seats with no box-size change) or it is a second trigger to strike (P-1, and C-9's forced layout per batch). The cost itself is small: **1 scene-observer callback, 0.1 ms of script, across a 41-step hover sweep plus two Tabs** (Chromium, `probes-chromium.json` `moCost`).
- **No masked paint primary** was found in the plate, rim or run CSS. A fitting run is `overflow: visible`, and the plate is the only glass.

### 4.7 · Gestalt (the prototype's 64 shots, plus my own)

- **At rest it reads as one dock, and better than HEAD.** Prototype pairs `controls-430-light.png` and `midmorph.png`: the lens and the rounded square are gone, and mid-morph plates are true stadiums with every face inside.
- **In motion it does not yet read as one liquid, iOS-27-grade dock:**
  1. **Content teleports and the glass catches up** (CX-1, CX-2). A liquid dock moves its seats with the glass.
  2. **Double exposure.** "P" over "1" on expand and "P" over "2 3" on collapse, from both faces sharing `inset-inline-start: 0` (`midmorph.png`, bottom row).
  3. **No bounce.** The landing is dead by construction, and `w3tail` shows it would stay dead without the clamp. D-1 asks for bounce, and this family has no place to put it. Its lerp is bounded by two layout rects. A designed overshoot in box mode is possible (a negative `inset`), but the family chose against it and SPECS does not mention the choice.
  4. **Compaction pops** (C-4). Seats vanish in one frame (`cmp-strip.png` frame 1).
  5. **The truncation cue is lost.** With the cut cap gone, the "A" tab meets the gear on `controls` at 430 (prototype pair).
- **Verdict on gestalt:** the silhouette problem is solved. The motion problem is solved for the glass and not for the content.

### 4.8 · Consumer-less substrate

- `scrollSource` and `compactOnScroll` answer O-55 R-1, which value.js asks for.
- `rim` answers O-55 R-2, but no consumer mounts `ScrollProgressRim` today (PORTFOLIO §1.4). Its consumer is the letter, not a mount.
- `data-posture-morph` is internal.
- `useDockScroll` has one site. It is justified as the family's P4 engine, not as shared substrate.
- No new substrate without a reader was found.

## 5 · Named counterexamples

My measurements, both engines unless one is named.

| id | counterexample | reading | class |
|---|---|---|---|
| CX-1 | a seat inserted at the start of an expanded run | "1" +135.3 px in one frame, then −67.7 px back; plate continuous (max step 4.69 px, Chromium; 9.45 px, Playwright WebKit) | §4.4, D-1 |
| CX-2 | compaction with a non-first current seat | "Lots" −85.6 px in one frame, then +67 px back | §4.4, C-4 |
| CX-3 | consumer `inline-size: 240px` on the fit dock (the K-14 shape, below the need) | flag **false**, run `overflow-x: visible`, seats paint **148.5 px** past the plate's right edge. The harness `budget()` reads 1440, so W2 would call the run fitting too (`shots/width-240.png`: "Filters" and the dot on bare page) | §4.2 |
| CX-4 | the dock's host `display: none`, then shown (v-show, a tab, a drawer) | the plate grows from **2-3 px wide at x = 0**, the viewport's left edge, over 31 frames (Chromium) / 16 (Playwright WebKit) to its 400.5 px rest at x 519.8. The hidden `read()` recorded a zero box as layout | §1 item 5 |
| CX-5 | viewport 1440 → 1000 on a centred fit dock | the whole dock animates after the root: plate and root 214.4 px apart for about 250 ms, 30 morph frames (Chromium). In Playwright WebKit the plate first paints at its new place (305 px at 59 ms), **then jumps back to 488 px** and slides home: a one-frame flash | §1 item 11 |
| CX-6 | hit against paint during a collapse (C-10) | at a point 30 px inside the expanded right edge, the plate absorbs 2/30 frames (Chromium) and 2/16 (Playwright WebKit). The prototype seat measured up to 193.8 px for 241-248 ms at its own points | §1 item 8 |
| CX-7 | the ResizeObserver-only build | passes every W3 content and swap cell: the MutationObserver's necessity is unshown | §4.2, §4.6 |
| CX-8 | the clamp removed | still dead in 14/14 landing checks: the clamp is not what lands the morph | §4.3 |

Carried unmeasured from the family's own list: C-6 (ancestor rotate), C-8 (animated seat size re-flipping the flag), M-4/M-8 wide `#collapsed`, and keyframes' View Transitions (K-18).

## 6 · What the family must change to close (all inside its own model)

1. **Per-seat FLIP.** Extend `regionsOf` to the declared seats (floor row 1, `[data-dock-seat]`), cache their translate-free boxes at the retarget, and lerp their `translate` like the regions. Leaving seats hold at their painted offset and fade (C-4). This also cures the double exposure: the leaving face holds its painted `a`. It raises the per-frame write count, so re-read S-18 against about 10-20 plain `translate` writes.
2. **No rest from a hidden box.** A zero-size `read()` is "no layout". Clear `layout`, so the next real delivery records rest (CX-4).
3. **The budget from the dock's own used size.** Compare the sum against the root's resolved main-axis content box, not only its parent (CX-3), and give W2 a scene with a consumer width so the definition stops certifying itself.
4. **Decide the MutationObserver.** Either write a witness that fails without it, or strike it (CX-7).
5. **Decide the landing.** Strike the clamp, or give the dock a designed bounce the clamp is there to shape (D-1, CX-8), and say which in the spec.
6. **Owner rulings still owed:** the six-member `DockProps` budget, the cut cap and the truncation cue (S-13), hit against paint (C-10), rim semantics (C-11), and the capsule-hover reach (C-12).

## 7 · Convergence and verdict

**Convergence: 58 %.** The harness bar is met and reproduced: 82/82 cells, with every witness shown able to fail. The open gaps are real defects in the problem's own terms (P3, D-1, P2), and none is a missing platform primitive.

**Open gaps (exact):**
1. CX-1 / CX-2: seats are not inverted, so content jumps inside the plate on insertion and compaction.
2. The posture crossfade double exposure ("P" over "1").
3. CX-4: the mount-hidden dock grows from the viewport origin.
4. CX-3: the flag's budget ignores a consumer width, and the harness shares the definition.
5. CX-5: resize animates the dock with a Playwright WebKit one-frame flash.
6. C-10 / CX-6: the plate absorbs clicks outside the root during a collapse.
7. C-4: compaction pops.
8. C-2: the landing cannot meet the 210 ms clock; margins of 11 ms (mine) to 2.4-2.6 ms (theirs).
9. CX-7: the MutationObserver is unproven, and the RO masks it.
10. CX-8 / D-1: no bounce, and the clamp's role is unstated.
11. The truncation cue is lost with the cut cap (S-13 ruling).
12. The `DockProps` budget ruling.
13. Floor row 1 (`[data-dock-seat]`) unbuilt; the compact rung keys on class lists.
14. 9 dock unit tests RED (motion-parity needs layout stubs; lattice asserts struck mechanisms). Carried from the prototype seat, not re-run here.
15. S-2, the Playwright WebKit crash without the shim, inherited.
16. Real Safari: every cell UNMEASURED (owner's safaridriver checkbox).
17. Consumer compositions not run (M-4, M-6, M-8, value.js rotate, K-18).

**Verdict: ADVANCE**, conditional on §6 items 1-3 landing in pass 2 with a witness each. None needs a primitive the family lacks. Its centre (layout owns the endpoints, and one script lerps between painted and layout) is the only one on the witness-totals table that is green on all five problems. The remaining defects are completions of that centre, not refutations of it. If per-seat FLIP (§6.1) proves too costly under S-18, or cannot hold 60 fps in Playwright WebKit, the family drops to BANK. Re-trigger: a per-seat-FLIP cost trace against a 16.7 ms frame in both engines.
