# D2 · pass 1 · D2-D · CRITIQUE: the drawn silhouette

| field | value |
|---|---|
| seat | D2 pass 1, adversarial critic for family D2-D. I did not author the spec, the research or the prototype |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | checkout at `59298021`. `git diff --quiet v10.0.1 59298021 -- src` holds, so the base is the v10.0.1 dock |
| read | `PORTFOLIO.md` §0-2 and `harness/HARNESS.md` first (STEP 1, below), then `SPECS.md` §0, §D2-D, the totals and the shared facts; `D2-D.md`; `D2-D-proto.md`; the patch as applied; the prototype's adapter and probes (`scratchpad/D2/p1/D2-D-proto/{adapter-d,probe-d,rimfill}.mjs`); the harness sources the witnesses run through (`lib.mjs`, `w3-morph.mjs`, `w5-rim.mjs`) |
| engines | headless Chromium 149 and **Playwright WebKit** (Playwright 1.61.1), from node, with Playwright imported from `glass-ui/node_modules`. Real Safari: **UNMEASURED (owner's safaridriver checkbox)** in every row |
| scratch | `C = /private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D2/p1/D2-D-crit/`. Runs `C/run-d.txt`, `C/p{A..E}-*.txt`, `C/pC-w3-*.txt`, `C/d-w3-honest.txt`; probes `C/probe-{d,pD,pE}/probe-d.json`; filmstrips `C/film-{chromium,webkit}.png` (`C/film.mjs`); planted builds `C/out/builds/p{A..E}`; the stricter adapter `C/adapter-d-honest.mjs` |
| writes | this file only. The worktree `C/wt` (patch applied cleanly; `cmp` against the scratch copy was identical) was removed with `git worktree remove --force`. The only git writes were that `worktree add` and `worktree remove` |
| verdict | **BANK**: sound on P1 at rest and on P5's containment, dominated on the whole problem, and its named primitive (a `shape()` fill) is refuted in Chromium. Convergence **40%**. The re-triggers are in §8 |

## 1 · STEP 1: the failures I expected a dock design to hide (written before reading D)

1. **An adapter that measures the design's intent instead of its paint.** The harness reads the dock only through `__dockProbe`. A family that moves the DOM writes its own adapter. If `extent()` or `paintingSeats()` is derived from the design's inputs, W3 checks the inputs and not the pixels.
2. **Containment by clip.** "Faces never outside the plate" and "rim inside the silhouette" both turn green when an ancestor clip cuts whatever is outside. A clip hides a misdrawn part rather than fixing it: the face or rim is invisible, not correct.
3. **A dead primary behind a still frame.** A morph whose painted plate holds at one endpoint and snaps at settle is a stadium in every sampled frame. W1 passes it. The window check reads a flag.
4. **An engine-conditional primitive.** One engine paints the new primitive wrongly under a condition the shipped page happens to avoid (here, the backdrop filter), so it works only while an unrelated property is present.
5. **Symmetric rests as the whole gestalt.** Clean rest captures, with the motion (overlap, double exposure, wipes) never looked at frame by frame.
6. **"One source" satisfied on the inputs while the text forks** into several syntaxes, and a fallback shape for the one state that drops the clip.
7. **Borrowed sub-choices as a remainder.** "W2, W4 and three W3 rows belong to other families" leaves the family green only on the rows it chose.

Items 1, 2, 3, 5 and 6 all occur in D (§3-§5).

## 2 · Reproduction (my own runs)

`node harness/run.mjs --build C/out/builds/d --adapter C/adapter-d.mjs` (`C/run-d.txt`):

| witness | prototype claims | my rerun | Chromium | Playwright WebKit (no shim) |
|---|---|---|---|---|
| W1 | 26/32 | **26/32** | 13/16 | 13/16 |
| W2 | 0/10 | **0/10** | 0/5 | 0/5 |
| W3 | 0/14 | **0/14** | 0/7 | 0/7 |
| W4 | 4/16 | **4/16** | 2/8 | 2/8 |
| W5 | 8/10 | **8/10** | 4/5 | 4/5 |

- The per-cell numbers match the prototype's report:
  - W1 reds: rails 3.228 / 3.241 px (Chromium) and 3.108 px (Playwright WebKit); the short-viewport sidebar 5.831 / 5.836 px.
  - W3: continuity ×0.64-0.66; window 541.7-552 ms against 252.6-282 ms allowed; content and swap steps 179.33 / 244.98 px (Chromium) and 179.39 / 245.06 px (Playwright WebKit), with no window.
  - W5: 888-2,158 device px of ink, 0 outside.
- Rim fill (`rimfill.mjs` on my build), strong-ink device px at progress 0 / .25 / .5 / .75 / 1:
  - Chromium horizontal: 36 / 572 / 1,104 / 1,634 / 2,177.
  - Playwright WebKit horizontal: 0 / 568 / 1,100 / 1,634 / 2,168.
  - Identical to the report. Probe-d's own "any ink" metric stays at 2,158-2,294 at every progress, because it counts the track, so it cannot see progress. `rimfill.mjs` is the valid evidence.
- Family probe (`probe-d.mjs` on my build), both engines:
  - Presses: the rest corner at +1.5 and +4 px lands on the page; a seat on the seat; the glass between seats on `.dock-plate`; the mid-collapse footprint on the page. **GREEN.**
  - An end-anchored silhouette holds its end edge at **1320.0** through expand and collapse.
  - The κ rim radii match the frame's radii.
  - Incoming expanded face: its minimum fraction inside the silhouette is 0.33 / 0.32 (Chromium) and 0.39 / 0.37 (Playwright WebKit). It is fully inside in 46/64 and 50/63 frames (Chromium).
- I did not re-run typecheck, the library build or the unit suites. Those rows are the prototype's (`D2-D-proto.md` §5), cited and not reproduced.

## 3 · Planted violations: can each claimed-green reading fail?

Each plant is a one-rule edit on the prototype's `silhouette.css`, built with `harness/build.mjs` into `C/out/builds/p*`.

| plant | what it breaks | witness run | result | reading |
|---|---|---|---|---|
| **pA** `--dock-sil` fill back to `shape(from …, cmds)` (the spec's own center) | Chromium C-4 | W1, both engines (`C/pA-w1.txt`) | **CAUGHT**: 20/32; Chromium morph and vmorph frames 6.265 / 6.975 px; Playwright WebKit unaffected | W1 can fail. It also shows **the family's named primitive is broken on the real dock in Chromium**, not just in the probe paint (§4.4) |
| **pB** `.glass-dock[data-morphing] { --dock-e: 100% !important }`: the silhouette never morphs. It holds the reserved box and snaps at settle | the whole P3 primary | W1 + W3, both engines (`C/pB-w1.txt`, `C/pB-w3.txt`) | **NOT CAUGHT.** W1 26/32, identical to the prototype: every morph cell passes, with "1 distinct extent sampled" or 2. W3 continuity ×0.64-0.66 and faces out 0 px, identical to the prototype | **A gate that cannot fail.** The adapter's `extent()` reads `--dock-live` while morphing, not paint, so W3's continuity row reads the spring, not the plate. W1 samples paint but only judges shape, never motion. A dead extent morph is green on both |
| **pC** `.dock-controls { clip-path: none }` while morphing (no aperture) | faces paint outside the plate (W-7) | W3 Chromium, prototype adapter (`C/pC-w3-adapter-d.txt`) | **NOT CAUGHT**: faces out 0 px in all three morph cells | `paintingSeats()` intersects each seat with the computed extent before the overhang read (`adapter-d.mjs`), so overhang ≡ 0 while morphing |
| pC again | same | W3 Chromium, `adapter-d-honest.mjs`, which intersects only when the aperture's computed `clip-path` is not `none` (`C/pC-w3-adapter-d-honest.txt`) | **CAUGHT**: 164.92 / 148.6 / 164.71 px | the same honest adapter on the unplanted prototype reads **0 px** (`C/d-w3-honest.txt`). So the claim is true, but the shipped adapter could not have shown it |
| **pD** `.dock-rim { translate: 0 12px }` | the rim is misdrawn, and 95% of it is cut away | W5, both engines (`C/pD-w5.txt`) | **NOT CAUGHT**: 8/10. Horizontal ink falls from 2,158 to **113** device px (Chromium) and 104 (Playwright WebKit); 0 outside | W5 cannot fail on this DOM: the rim is a descendant of the clipped plate, so W5 tests the clip, not the rim |
| pD again | same | the family probe's clip-lifted rim check (`C/probe-pD/probe-d.json`) | **CAUGHT**: 2,060 / 2,008 (Chromium) and 2,055 / 2,007 (Playwright WebKit) px outside S | the rim geometry is gated only by a family probe, not by W5 |
| **pE** `.glass-dock > .dock-controls { pointer-events: auto }` (a rectangular wrapper) | the corner hit region | family probe (`C/probe-pE/probe-d.json`) | **CAUGHT**: the rest corners at +1.5 and +4 px land on `dock:dock-controls` in both engines | the hit-region witness can fail |

W2 and W4 are claimed green in no cell D owns. The 4 passing W4 cells (reduced-motion posture morph, menu holds) are HEAD's, so I planted nothing there.

## 4 · The checklist

### 4.1 Vacuous convergence: **present**
- W3 "faces out 0 px in all 14 cells", the prototype's headline P3 win, holds by construction under its adapter (pC). It is true on the prototype only under my stricter adapter.
- W3 "continuity ×0.64-0.66" is continuity of `--dock-live`, the spring's number, which HEAD already had. The paint can be dead and the row stays green (pB).
- W5 8/10 is containment by the plate clip; a rim moved 12 px off still passes (pD).
- W1's green morph frames are real paint and do separate a wrong radius (pA). But they pass a morph that does not move (pB).

### 4.2 Spec cites itself: **partial**
- `SPECS.md` D.3 cites the prototype's own adapter for W3 and W5 without saying that the adapter derives `extent()` from `--dock-live` and pre-clips the faces.
- `D2-D.md` §7.1 lists the adapter's six differences but not what they do to W3.
- The κ-rim check compares the TypeScript path's radii with the CSS-resolved radii (`probe-d.mjs` `radiiMatch`), one derivation against another. It is backed by the clip-lifted pixel read, which does fail (pD), so it stands.

### 4.3 Gates that cannot fail: **three, named**
- (a) W3 faces under `adapter-d` (pC).
- (b) W3 continuity under any adapter that reads the extent from the spring's input (pB).
- (c) W5 on any DOM where the rim is a descendant of the clipped plate (pD).

The cure for all three is a harness row, not a D row: while morphing, W1's sampler should compare the painted silhouette with `extent()` at every sample, as it already does at rest. W5 needs a ratio of rim ink to the rim's own length, or a run with the clip lifted.

### 4.4 The elegant-reduction trap: **present twice**
- **The center did not survive.** The spec's center is "one `shape()` command template … is the plate's clip, hit region, edge, shadow source and rim track". As built:
  - the fill (clip, hit region, shadow fill, aperture) is `inset(… round …)`, because a `shape()` fill paints the plate at 6.265 / 6.975 px off the arc in Chromium (pA, my run);
  - the command list survives only in the `evenodd` complement (edge, shadow cut);
  - the rim is a third derivation, in TypeScript;
  - the plate's `border-*-radius` is a fourth, for the grasp state.

  An `inset(round)` clip on the plate is HEAD's own mechanism (`dock.css` extent clip). What D adds on top is the clamp and κ radii, the sibling shadow, the `evenodd` edge, the clip-based hit region and the path-based rim. Each of these is a sub-choice any family could take. The distinctive primitive is the complement.
- **"And then the layout rule" (C-1).** The load-bearing step is laying content out about the live silhouette, and it is not solved.
  - The collapse is clean: the incoming summary is fully inside in 65/65 frames (Chromium).
  - The expand is a clip wipe over a row already laid out at its final place: the incoming face is at worst 33% visible (Chromium), 39% (Playwright WebKit).
  - My filmstrips (`C/film-chromium.png`, `C/film-webkit.png`, the scene's warm expand) show three defects no witness gates:
    - the persistent "H" rides the live edge and **collides with the incoming "1"/"2"** for 2-3 frames in both engines;
    - the summary's "P" **double-exposes over "Play"** for about 4 frames;
    - the trailing seats are **cut mid-glyph at the aperture** ("Set", "S", "Squar").
  - W3 has no face-to-face overlap or double-exposure row for a posture morph (W-9's double-exposure row exists only for swaps).

### 4.5 Legacy aliases, shims, dual paths: **present**
- `@property --dock-t` stays because DockCrossfade writes it (`D2-D-proto.md` §1). The discrete swap path is untouched: W3 swap 244.98 px in one step. That is a second morph path alongside the new one.
- `shell.css` root `border-radius` shape rules and the card `corner-shape` now paint nothing and are unstruck (proto §6 item 15). That is dead code under E-1.
- The grasp state drops the clip, and the plate's `border-*-radius` then paints the shape: two shape paths for one plate (C-6). It is wrong mid-morph.
- The edge crossfades two pseudo layers at 1 − t and t to dodge the nested `color-mix()`. That is a working replacement, not a shim, and it does cure the Playwright WebKit mount crash on all 32 demo pages (prototype's reading; my harness runs used `webkitShim = ""` and mounted in every cell).

### 4.6 Masked fallbacks: **one live, one latent**
- **Live: C-4.** A `shape()` clip on this plate paints wrongly in Chromium whenever the plate has no `backdrop-filter`. The prototype routes around it with `inset(round)`, which is honest and not a mask. But the root cause is not isolated, and the complement `shape()` on `.dock-edge` and `.dock-shadow` stays in the same DOM without a backdrop filter. It reads 0.084 px today (proto §3), so nothing gates it against regression except W1, and only in Chromium.
- **Latent: `--dock-cross-px` has one writer, `dockMorphMeasure.ts`, which returns early when `rootSize <= 0`.** Until that write, `clamp(0px, rest, calc(var(--dock-cross-px) / 2))` is invalid at computed-value time, so `clip-path` computes `none` and the four `border-*-radius` fall to 0. The plate would paint a square box. Nothing paints a wrong-but-plausible shape, so this fails loud, which is E-2-compliant. But no witness covers the first paint or a mount inside a `display: none` ancestor. **Unmeasured.**

### 4.7 Unverified gestalt: **mixed, and not iOS-27 grade in motion**
- **At rest it is a clear win.** In the prototype's zooms (`shots2/cmp/zoom-head-{chromium,webkit-shim}-layers-1440-light-1_2_3.png`, which I looked at), HEAD's pointed lens on the Assets/Layers/Libraries dock and the oval card become clean stadiums in both engines.
- **The drawn edge is visibly darker in Playwright WebKit** on the tall dock, a taste call still owed (C-8).
- **In motion it reads as a wipe, not a liquid dock.**
  - The plate grows as a clean stadium with no overshoot: the ring is 0.34 px on ζ 0.88, a spring with no designed bounce.
  - The seats do not move with the plate. The row is uncovered in place by the aperture, with the collisions and the ghost glyph above.
  - Nothing deforms or carries weight, so D-1 (inertia, weight, bounce) is not met by the family's own mechanism, and D-2/D-3 ("bests iOS 27") is not approached.
- **The extent is a main-thread clip in both engines** (S-17: 1,160-1,200 ms freeze under a 1.2 s block). HEAD's box `scale` was at least compositor-carried for the plate.

### 4.8 Consumer-less substrate: **mostly consumed, two strays**
- `anchor` has a consumer (fourier's right-anchored CanvasControlsDock, K-11). `progressSource` has the O-55 R-2 ask (value.js).
- The four σ/ink tokens have one reader (the dock), and `--shadow-dock-override` loses its successor, so consumers that set it break with nothing to move to.
- `--dock-sil-rs` / `--dock-sil-re` are registered only so that TypeScript can read resolved pixels, a registration for one internal reader.
- DockProps grows from 6 to 8 members, which fails the "surface is six" gate. Owner ruling owed.

## 5 · Named counterexamples

1. **The dead morph** (pB): W1 26/32 and W3 continuity ×0.64-0.66 with a plate that never moves.
2. **The unclipped faces** (pC): W3 faces 0 px under `adapter-d` with no aperture at all; 148.6-164.9 px under a stricter adapter.
3. **The misplaced rim** (pD): W5 8/10 with 95% of the rim cut away (2,158 → 113 device px).
4. **C-4 is live in the named primitive** (pA): the spec's `shape()` fill is 6.265 / 6.975 px off the arc in Chromium on every morph frame.
5. **The expand collision** (filmstrips): persistent "H" over incoming "1"/"2", ghost "P" over "Play", trailing seats cut mid-glyph, in both engines.
6. **The shape grammar in four syntaxes**: `inset(round)`, `evenodd shape()`, a TypeScript `d` string and a `border-radius` fallback for the grasp. P-3 is met on the inputs only.
7. **The swap is still discrete**: 244.98 px in one frame, no window. D's aperture does nothing for DockLayerGroup.
8. **A 12 px rim offset reads as a thin 7 px line** (rim box `[3,38.5,154,7]`) and is green. A rim that lies about progress is not caught by W5.

## 6 · What is sound (kept for the bank)

- **The corner at rest and in every morph frame**: 0.126-0.196 px in both engines on every non-cut cell, including the lens-reproducing fit hover and the SidebarDock at 1440×900. It is caught when broken (pA).
- **The hit region = silhouette ∪ seats**: corners and the mid-morph footprint reach the page, in both engines. It is caught when broken (pE). Portable to any family whose plate carries a clip.
- **The rim as the leading half of S**: live fill, κ-aware radii, 0 px outside with the clip lifted, and caught when broken (pD, probe). Portable.
- **The Playwright WebKit crash is cured**: HEAD's nested translucent `color-mix()` leaves the plate. The prototype mounts all 32 demo pages without the shim.
- **The end anchor**: the edge holds at 1320.0 through expand and collapse.

## 7 · Open gaps (the exact list; convergence 40%)

1. **G-1 · P3's paint is ungated.** No witness reads the painted silhouette extent frame by frame while morphing (pB). Harness row owed: at every W1 morph sample, painted extent vs `extent()`.
2. **G-2 · The W3 faces row is unproven under the shipped adapter** (pC). The adapter must read the aperture, not assume it.
3. **G-3 · W5 is a clip test on this DOM** (pD). It needs rim wholeness: ink against the rim's own length, or a run with the clip lifted.
4. **G-4 · C-1 on expand**: a wipe; face collisions and a ghost glyph for 2-4 frames. No witness row, no design.
5. **G-5 · D-1 not met by D's own mechanism**: no weight or bounce; the seats are uncovered, not carried.
6. **G-6 · The `shape()` center is refuted in Chromium** (C-4 live, root cause unisolated). The family's unification now rests on custom-property inputs, which any family can share.
7. **G-7 · P-3 at the text**: four syntaxes for one shape, and a grasp fallback that is wrong mid-morph (C-6).
8. **G-8 · E-1 debt**: the `@property --dock-t` retention for DockCrossfade; the unstruck `shell.css` radius and `corner-shape` rules.
9. **G-9 · Borrowed and unbuilt**: W2 0/10, W4 floor row 3 plus the compact rung (4/16), and W3 window, ring, content and swap (R-2/3/4).
10. **G-10 · The cut cap**: 6 W1 cells red by design; owner ruling owed (S-13).
11. **G-11 · The main-thread extent**, both engines (C-3/S-17), not re-measured on the prototype.
12. **G-12 · The first paint before `--dock-cross-px`** is written: unmeasured (§4.6).
13. **G-13 · Gate and API conflicts**: `g-dock-lattice` ×6, `stacked-url-filter`, DockProps 8 members, no successor for `--shadow-dock-override`.
14. **G-14 · Every real-Safari cell**: UNMEASURED (owner's safaridriver checkbox), including the C-4 cure, the edge crossfade and whether the mount crashes.

**Convergence 40%.** Four of the family's own claims survive planting: the corner, the hit region, the rim geometry by probe, and the anchor. Three of its headline greens are vacuous under its instruments, its named primitive is refuted in one engine, and its motion gestalt fails D-1.

## 8 · Verdict: **BANK**

- **Why not ADVANCE.** On the table of record D is dominated: D2-B reads 32/10/14/16/10 against D's 26/0/0/4/8. D's P3 win is not demonstrated in paint (G-1, G-2), and its expand reads as a wipe with collisions.
- **Why not RETIRE.** Nothing D claims about the rest corner, the hit region, the rim or the anchor was refuted; each fails when planted. These are the best-evidenced P1 and P5 mechanisms in the pass.
- **Why not BLOCK.** No missing primitive stops it. The layout rule is a design gap, not a platform wall.
- **Keep:** the clamp and κ radii grammar, the clip-based hit-region contract, the leading-half rim on S, the `evenodd` complement for the edge and shadow, the anchor parameter, and the WebKit-crash-free edge. Offer each as a sub-choice to the winner.
- **Re-triggers:**
  - (i) the owner rules the cut cap kept (S-13), which makes κ-exact cuts load-bearing and D's radius grammar the reference;
  - (ii) the winning family's plate cannot express the hit region or the rim track by its own clip;
  - (iii) C-4 is root-caused and a `shape()` fill paints correctly in Chromium without a backdrop filter, which restores the one-template center;
  - (iv) a harness revision closes G-1 through G-3, and D is re-measured under it.
