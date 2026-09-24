# D2 · pass 1 · D2-D · PROTOTYPE: the drawn silhouette on the real dock

| field | value |
|---|---|
| seat | D2 pass 1, PROTOTYPE seat for family D2-D. It test-implements `SPECS.md` §D2-D on the real dock source, as far as it goes. This is the post-limit rerun; it replaces the pre-limit bank of this file |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | the brief named `5804d8cc`. The worktree was cut at `99839631`, which is where the checkout was. `git diff --stat 5804d8cc HEAD -- src` is empty, so the base is still the v10.0.1 dock |
| read | `SPECS.md` (§0, §D2-D, the witness totals and the shared facts; no other family's spec), `D2-D.md`, `harness/HARNESS.md` and the harness sources. I also read the pre-limit bank of this file, and reused its prototype diff and probe scripts from scratch |
| engines | headless Chromium 149.0.7827.55 and **Playwright WebKit** (Playwright 1.61.1), from node, with Playwright imported by absolute path from `glass-ui/node_modules`. Real Safari: **UNMEASURED (owner's safaridriver checkbox)** in every row |
| scratch | `S = /private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D2/p1/D2-D-proto/`. This rerun's artefacts are prefixed `r2-` (`S/r2-typecheck.txt`, `S/r2-libbuild.txt`, `S/r2-unit-dock.txt`, `S/r2-run.txt`, `S/r2-run-head.txt`, `S/r2-probe.txt`, `S/r2-rimfill.txt`), plus builds `S/out2/builds/{d,head}`, runs `S/out2/runs/W*-{d,head}/`, probe output `S/probe2/`, and captures `S/shots2/{head-chromium,d-chromium,head-webkit-shim,d-webkit}/` with composites and zooms in `S/shots2/cmp/`. The adapter is `S/adapter-d.mjs`. The probes are `S/probe-d.mjs`, `S/rimfill.mjs`, `S/c4*.mjs`, `S/layers-k.mjs` and `S/smoke.mjs`, and the capture tools are `S/shots2.mjs`, `S/cmp2.mjs` and `S/zoom2.mjs` |
| writes | this file (Write tool), and `D2-D-proto.patch` beside it. The patch was placed with `cp` and checked with `cmp`, because re-typing a 1,473-line diff risks whitespace drift that breaks `git apply`. The only git writes were `worktree add` and `worktree remove --force`, for `S/wt` (the prototype) and `S/wt-head` (a clean HEAD for the "before" build). **Fence disclosure:** my first HEAD harness build pointed `build.mjs` at the checkout path. `build.mjs` writes only under `--out`, and a `find -newer` over the checkout afterwards listed nothing except `.git`'s own mtime. I discarded that build and rebuilt HEAD from `S/wt-head` |
| verdict | **RUNS.** The patch applies cleanly to `99839631`. Typecheck exits 0 and the library build exits 0. The demo and the scene page build and mount in both engines, and Playwright WebKit mounts **without the crash shim** on all 32 demo pages. HEAD crashes Playwright WebKit on the first demo page without the shim |

## 0 · Results in one table

The "HEAD rerun" column is `S/r2-run-head.txt`, the HEAD build from `S/wt-head`. The prototype column is `node harness/run.mjs --build S/out2/builds/d --adapter S/adapter-d.mjs` (`S/r2-run.txt`), split by engine.

| witness | HEAD (`HARNESS.md`) | HEAD rerun | D research probe | **D prototype** | Chromium | Playwright WebKit (no shim) |
|---|---|---|---|---|---|---|
| W1 corner | 9/32 | 10/32 | 12/32 (28 with κ off) | **26/32** | 13/16 | 13/16 |
| W2 run | 0/10 | 0/10 | 0/10 | 0/10 | 0/5 | 0/5 |
| W3 morph | 0/14 | 0/14 | 0/14 | 0/14 | 0/7 | 0/7 |
| W4 state | 4/16 | 4/16 | 4/16 | 4/16 | 2/8 | 2/8 |
| W5 rim | 0/10 | 0/10 | 8/10 | **8/10** | 4/5 | 4/5 |

Every witness stays RED overall in both engines. The pre-limit bank read the same five totals, so this rerun reproduces them. HEAD's W1 reads 10/32 here, the same as the D2-C and D2-E seats' HEAD runs (SPECS §0), not the harness's 9/32.

**Family witness (hit region): GREEN in both engines.** Source: `S/probe2/probe-d.json`. Presses land as follows:
- the rest corner at +1.5 px and at +4 px: the page (`page:div`);
- a seat centre: the seat;
- the glass between seats: `.dock-plate`;
- the reserved footprint mid-collapse: the page;
- inside the silhouette mid-collapse: the dock.

The adapter's `webkitShim` is `""`, so every WebKit number above ran without the shim.

## 1 · What was built

The patch touches 14 files: 12 modified (+136 / −427) and 2 new, `composables/useDockRim.ts` (173 lines) and `styles/silhouette.css` (393 lines). Relative to the research probe (`D2-D.md` §7.1), it closes these:
- the anchor (item 3, K-11);
- the κ-aware rim (items 1 and 7);
- the σ elevation token (item 6);
- a layout rule for the morph (item 4, C-1);
- C-2 on docks that fit;
- C-4, cured, not root-caused;
- the WebKit crash signature.

| area | mechanism as built | where |
|---|---|---|
| **The shape** | S is written once over the inputs e, a, cross, κs and κe. The fill is `inset(y0 (100%−x1) (100%−y1) x0 round tl tr br bl)`. The complement is an `evenodd` `shape()` over the same `--x0 … --bl`. The plate, the shadow fill and the face aperture use the fill; the edge and the shadow's own clip use the complement. Why the fill is not `shape()` is under C-4 in §3 | `styles/silhouette.css` |
| **Radii** | r = clamp(0, rest, cross/2), and cut = min(`--dock-sil-cut`, r). The rest and cut per shape live in `silhouette.css`. `--dock-cap-rest`, `--dock-cap-cut` and the four `gl-dock-cap-*` keyframes are struck with no alias. `--dock-sil-rs` and `--dock-sil-re` are registered `<length>`s, so the rim reads resolved pixels | `silhouette.css`, `run.css` |
| **κ** | Registered `<number>`, `inherits: false`, on `.dock-frame`, driven by the `--dock-run` timeline over `0 P` and `100%−P 100%`. So the cut is proportional to what each end hides and saturates at one pitch. κ is `animation: none` while `[data-morphing]` | `silhouette.css` |
| **Anchor** | Prop `anchor?: "start" \| "center" \| "end"` becomes `data-anchor`, which sets `--dock-a` ∈ {0, ½, 1} and `--dock-align`. x0 = (100% − e)·a | `useDockShellProps.ts`, `GlassDock.vue`, `silhouette.css` |
| **Layout rule (C-1)** | (i) Inactive faces are out of flow at `max-content`, aligned on the anchor. (ii) While morphing, the controls justify on the anchor, and `.dock-layers` is `flex: 0 1 auto`. (iii) The persistent regions translate by (e_target − e)·a at the start end and (e_target − e)·(a − 1) at the end, so they ride the silhouette's live edges | `silhouette.css` |
| **Endpoint side effect** | On a flip, `dockMorphMeasure` measures chrome against the posture the root is still laid out in. Rule (i) had exposed a second way to poison the endpoint: without this change, the first expand overshot to 420 and snapped | `dockMorphMeasure.ts` |
| **Edge** | `.dock-edge` is the complement of S inset by 1.5 px. It is painted by two pseudo layers, the collapsed and expanded border, at opacities 1 − t and t. This replaces the nested translucent `color-mix()` (S-2). The departure from a true lerp is computed, not measured | `silhouette.css` |
| **Elevation** | New tokens: `--shadow-dock-sigma` 10px, `--shadow-dock-sigma-collapsed` 6px, `--shadow-dock-ink` 14% and `--shadow-dock-ink-collapsed` 12%. `--shadow-dock` derives from them with blur = 2σ, and `--shadow-dock-collapsed` is struck. `.dock-shadow` is `drop-shadow(σ(t) ink(t))`. A collapsed pill that is hovered under `(hover: hover)` lifts to t = 1 | `tokens/shadow.css`, `silhouette.css` |
| **Rim** | `useDockRim.ts` draws the leading half of S from the dock box, e, a and the frame's resolved per-end radii, inset 4.5 px. The geometry is written as SVG attributes. It redraws on ResizeObserver, on run scroll, and on seat mutation (the latter two read on the next frame), and on rAF only while morphing | `composables/useDockRim.ts` |
| **Hit region** | The root is `pointer-events: none` and the plate is `auto`. The active layer and the persistent groups are `none`, and their descendants are `auto` | `silhouette.css` |
| **Box** | The root has no padding. `.dock-controls` is a flex box with `padding: var(--dock-pad-b) var(--dock-pad-i)`, and its border box is the dock box | `shell.css`, `morph.css`, `silhouette.css` |
| **Struck** | the box `scale` morph and the counter-scaled faces; `--dock-size-scale`; the plate's `inset()` extent clip, `--dock-t` alias, `border` and PRM pin; `[data-reserve]`; the box `box-shadow` (three sites); the root padding. `@property --dock-t` stays, because DockCrossfade writes it | `dock.css`, `shape.css`, `layers.css`, `morph.css`, `shell.css`, `run.css`, `index.css` |

DOM: `.glass-dock[data-anchor] > (.dock-frame > (.dock-shadow > i, .dock-plate > (.dock-edge, svg.dock-rim?, grasp carriers)), .dock-controls, .dock-run-status)`.

## 2 · Witness readings (`S/r2-run.txt`)

### W1 · 26/32 (Chromium 13/16, Playwright WebKit 13/16)

- **Green in both engines:**
  - `fit` rest and hovered rest: 0.178 px (Chromium), 0.129 px (WebKit);
  - the SidebarDock at 1440×900;
  - every `morph` and `vmorph` rest;
  - every sampled morph frame. First expand, warm collapse and warm expand take 10-21 samples over 6-9 distinct extents per cell. The worst is 0.178 px horizontal and 0.156 px vertical in Chromium.
- **Red in both engines, 6 cells, the cut cap by design (S-13):**
  - SidebarDock at 1440×600: 5.831 px (Chromium), 5.836 px (WebKit); mean r 34.33 against 32;
  - `rail` rest and scrolled end: 3.228 / 3.241 px (Chromium), 3.108 / 3.108 px (WebKit).

  W1 demands cross/2 at every rest. **An owner ruling on the cap is owed.**

### W2 · 0/10 (D owns no run)

| route | reading, both engines |
|---|---|
| 1 | ring cut 2.5 / 2.5 px on both long runs |
| 2 | range 0 px in every frame (HEAD 318 px), so a hidden layer no longer arms κ. It still fails, because the run is a scroll container: 72/72 frames (Chromium), 36/36 (WebKit) |
| 3 | `.dock-run` is statically `auto/hidden` |
| 4 | range max 2 px |

### W3 · 0/14, but the rows D owns are green

| row | Chromium | Playwright WebKit |
|---|---|---|
| first expand, continuity | **×0.64** (26.91 px against 41.88). HEAD: one 387.66 px step | **×0.64** (56.3 against 88.14) |
| warm collapse / expand, continuity | ×0.66 / ×0.66 | ×0.65 / ×0.65 |
| faces out, all 14 cells | **0 px** (HEAD 147-158) | **0 px** |
| landing | dead, except the warm expand's 0.34 px ring (R-3) | 0.28 px ring |
| window | 541.8-549.7 ms against 252.6-259.9 ms allowed (R-4) | 549-550 ms against 262-263 ms |
| content add / remove, swap | 179.33 / 244.98 px in one step, no window (R-2) | 179.39 / 245.06 px |

The failing rows belong to the carrier and content sub-choices D borrows (SPECS D.3).

### W4 · 4/16, unchanged

- Pass in both engines: reduced-motion posture morph (0 intermediate frames) and menu hold (extent 185.47 / 185.5 px).
- Compact rung: absent.
- Floor row 3 is not built:
  - hover latch: `scale` 1 → 1.1 after a coarse tap;
  - tap-pins: 1 click fires on "Play".

### W5 · 8/10

- Every horizontal and vertical rung, expanded and collapsed, in both engines: **0 px outside**, with 888-2,158 device px of ink.
- The two compact cells fail: there is no compact rung.

The fill is live (`S/r2-rimfill.txt`). Strong-ink device px against page progress:

| progress | 0 | 0.25 | 0.5 | 0.75 | 1 |
|---|---|---|---|---|---|
| Chromium, horizontal | 36 | 572 | 1,104 | 1,634 | 2,177 |
| Playwright WebKit, horizontal | 0 | 568 | 1,100 | 1,634 | 2,168 |
| Chromium, vertical | 0 | 551 | 1,075 | 1,597 | 2,122 |
| Playwright WebKit, vertical | 0 | 556 | 1,078 | 1,600 | 2,124 |

## 3 · Family probes (`S/probe2/probe-d.json`)

| probe | Chromium | Playwright WebKit |
|---|---|---|
| C-1, centred warm collapse: incoming summary fully inside the silhouette | **65 / 65** morph frames | **32 / 32** |
| C-1, persistent region fully inside, all four morphs | every frame (0 frames not inside) | every frame |
| C-1, expand: incoming full face | frames fully inside: 46/63 (centred), 50/62 (end). Minimum fraction inside: 0.34 and 0.31. It is laid out at its final place and revealed centre-out by the aperture | 23/32 and 23/31; minimum 0.39 and 0.38 |
| K-11, `data-anchor="end"` on a right-pinned box: silhouette end edge | **1320.0 constant** through expand and collapse (start edge 830 → 1218) | **1320.0 constant** |
| κ-aware rim (overflowing run): rim arc radii against the frame's resolved radii | scroll 0: 23.5 / 11.5, want 23.5 / 11.5; mid: 11.5 / 11.5. **Match** | **Match** |
| rim with the plate clip lifted | 0 px outside S | 0 px |

**Limit.** The frame logs begin at the first frame the morph flag is seen. So the persistent region's jump at start (15-19 px in Chromium, centred) is not resolved against a one-frame discontinuity.

**C-4.** From the pre-limit seat's `S/c4*.mjs`; not re-run here.
- Posed mid-morph under the plate probe with no `backdrop-filter`, Chromium paints a `shape()` clip on `.dock-plate` as its bounding rectangle: 6.265 px (6.975 px vertical). WebKit reads 0.01-0.03 px.
- A minimal page does not reproduce it.
- The cure is to make S's fill `inset(round)`. After the cure the same probe reads 0.084-0.178 px (Chromium) with and without the filter.
- The command list survives only in the complement, which reads 0.084 px on `.dock-edge`.

## 4 · Gestalt: the dock stories before and after

The capture covers 8 routes (`/dock/{overview,layers,vertical,sections,controls,overflow,cta-receive,dock-search}`) × {1440, 430} × {light, dark}. The SidebarDock is on every 1440 page, and the BottomDock (963×56 at 1440, 422×60 at 430) is on every page.

Sets:
- Chromium, HEAD and prototype;
- Playwright WebKit, prototype;
- Playwright WebKit, HEAD. Without the shim this set **crashed on the first page** (`page.waitForTimeout: Page crashed`, `S/r2-shots-head-webkit.txt`), which is S-2 on the real demo. The WebKit "before" set was therefore taken with the harness shim injected (`head-webkit-shim`).

The prototype reported 0 page errors and 0 crashes on all 32 WebKit pages.

**Boxes** (`S/cmp2.mjs`, 184 docks per set):
- Chromium: 0 dock boxes differ.
- Playwright WebKit: 2 differ, both the `/dock/layers` 108×109 dock, which is 26 px taller in one capture.
- HEAD's WebKit set disagrees with itself on the same dock: 135 in light and 109 in dark at 1440; 106 and 132 at 430. So this is Playwright WebKit layout nondeterminism, not the patch.

**Pixel difference > 24/255 per page, Chromium:**
- light: 150-1,631 px;
- dark: 0-62 px.

All of it sits on dock plates and edges.

What the zoomed pairs show (`S/shots2/cmp/zoom-*.png`, left HEAD, right prototype):
- **Overflowing and labelled docks** (`zoom-head-chromium-layers-1440-light-1_2_3.png`, the WebKit twin, and `zoom-head-chromium-controls-430-light-1_3_4_5.png`):
  - HEAD's plate is a lens. On the 313×56 Assets/Layers/Libraries dock it is a pointed ellipse inside the pill, in both engines. On the 260×108 card it is an oval.
  - The prototype paints a clean stadium, with a small end cut only where the run genuinely overflows.
  - This is the largest visible change and the clearest win.
- **The drawn edge.** In Playwright WebKit the prototype's edge on the 260×108 dock reads visibly darker than HEAD's (the 1.5 px `evenodd` ring). In Chromium it is a hairline heavier (C-8). Taste call owed.
- **Collapsed pills and plain rows** (overview, light and dark): unchanged to the eye.
- **Dark mode.** Near identical: 0-62 px differ, invisible at 3× zoom.
- **The BottomDock and the SidebarDock** read the same before and after at both widths. The BottomDock's "Doc…" / "Over…" label clipping is consumer content and identical in both.

## 5 · Checks

| check | result |
|---|---|
| `git apply --check` of the patch on `99839631` | clean |
| `npm run typecheck` (worktree) | **exit 0**, both projects (`S/r2-typecheck.txt`). Before the library build it exited 2 on 2 × TS2307 `@mkbabb/glass-ui/fourier-math`, because a fresh worktree has no `dist/`. That is environmental |
| library build (`S/libbuild.mjs`, the worktree's `vite.config.ts`, cache and outDir in scratch) | **exit 0**, 4.9 s (`S/r2-libbuild.txt`). The glass build plugin also writes `dist/` inside the worktree |
| dock unit tests. The brief names `tests/components/dock`; the repo's path is `tests/components/custom/dock` | **121 pass, 6 fail, 1 expected fail** (`S/r2-unit-dock.txt`). All 6 are source gates in `g-dock-lattice.test.ts`: "DockProps is at most six members" (now 8); "exactly one member flexes, and it is the run" (`.dock-controls` is `flex: 1 1 auto`); "the cap rides a named scoped timeline"; "the cap keyframes only through the rest/cut token pair"; "the ring reserve is stated in the box model"; "the cut cap is the band's only animated radius" |
| wider suites | **not re-run here.** The pre-limit bank read `stacked-url-filter` (the `.dock-shadow` `drop-shadow` falls outside the filter allowlist), `emitted-utility-vars` (cause unverified) and `boot-graph` × 3 (environmental) |
| harness | the same build `S/out2/builds/d` fed every witness, probe and capture here |

## 6 · Breaks and open gaps

1. **Real Safari:** every cell is UNMEASURED (owner's safaridriver checkbox). That includes the C-4 cure, the edge crossfade and the crash-free mount.
2. **The cut cap fails W1 by design:** 6 cells (S-13). Owner ruling owed.
3. **Endpoint residue.** The first expand lands 7.66 px short (horizontal) or 8 px long (vertical), then snaps at settle, inside W3's bound (pre-limit `S/smoke.mjs`). `dockMorphMeasure` assumes the chrome is constant, but the padding morphs. For a budget-capped collapsible dock, the uncapped `max-content` inactive face could overshoot; this is unmeasured.
4. **κ is gated off during the morph.** An overflowing collapsible dock's cut snaps to 0 and back. Unmeasured.
5. **Residual κ on a collapsed dock.** `/dock/layers`: κe 0.104, r_e 26.75 against 28 (pre-limit `S/layers-k.mjs`). That is under W1's bound but not zero.
6. **C-4's root cause is not isolated.** The `inset(round)` fill avoids it.
7. **P-3 is met on the inputs, not the text.** S has two syntaxes (fill `inset`, complement `shape`) plus a third derivation in TypeScript for the rim.
8. **C-6 (grasp) is open.** While held, the plate paints its box at the rest radii, which is wrong mid-morph.
9. **The rim at p = 0.** The Chromium rim paints a 36 device px round-cap dot; WebKit paints nothing (`S/r2-rimfill.txt`).
10. **Rim tuning and cost.** The track's 18 % contrast is judged by eye (C-10). The cost of the rim's per-frame `getComputedStyle` loop is unmeasured.
11. **Main-thread cost (C-3) was not re-measured.**
12. **Gate conflicts:**
    - `g-dock-lattice` × 6;
    - `stacked-url-filter`;
    - DockProps goes from 6 to 8 members, which breaks "the surface is six". Owner ruling owed.
13. **Consumer migration:**
    - `--dock-cap-rest`, `--dock-cap-cut` and `--shadow-dock-collapsed` die with no alias.
    - `--shadow-dock-override` becomes the four σ/ink tokens.
    - Consumer padding on `.glass-dock` stacks on the controls' padding.
    - `.dock-controls` is a box.
    - The root is `pointer-events: none`.
    - fourier takes `anchor="end"`, and its X-4 width is still a second extent owner.
    - chicago's X-2 run override still binds.
    - The 21 test and demo files re-point. Only the 6 gates above were audited.
14. **The anchor is physical and untested in RTL.** The prop wiring is covered only by typecheck; the probes set `data-anchor` directly.
15. **P-3 debt:** `shell.css`'s root `border-radius` shape rules and the card `corner-shape` now paint nothing and are unstruck.
16. **Unbuilt (borrowed sub-choices):**
    - floor row 3, the `(hover: hover)` gate;
    - the compact rung;
    - the run (W2);
    - R-2, R-3 and R-4.
17. **The drawn edge's weight** is heavier than HEAD in Playwright WebKit on the tall card dock (§4). It is judged by eye.
18. **Playwright WebKit layout nondeterminism** on the `/dock/layers` 108-px dock, seen at HEAD as well (§4). It is not the patch, but any box-diff gate on that page will flake.
