# Dock cluster · A/B measurement (O-195)

| field | value |
|---|---|
| seat | MEASURER, O-195 design loop. I wrote neither proposal |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | master `0778c4090`. Two scratch worktrees, `.claude/worktrees/bl/cluster/measure-{A,B}`: each patch passed `git apply --check` and applied clean. Both were removed after the records were written |
| harness | ONE fixture (`AB/fixture/`), copied byte-identical into both worktrees and built by `AB/tools/build.mjs`. ONE driver (`AB/tools/measure.mjs`). Summaries via `AB/tools/summarize.mjs` |
| engines | headless Chromium 149.0.7827.55 (Playwright headless shell) and Playwright WebKit 26.5 (not Safari). Each run was guarded; WebKit ran under `--exclusive webkit`. Guard log `AB/logs/guard.log`: all rc=0, 0 leftovers killed |
| records | `AB/data/{chromium,webkit}.json` (raw), `AB/data/*-summary.txt`, `AB/logs/`, `AB/png/` (34 contact sheets) |
| load | 1-min load 13.9–17.5 for the Chromium run and 6.2–8.6 for the WebKit run (per cell in the records). The kernel zone leak was ARMED, at about 0.5M elements, far below the 8M heavy stop |

## Verdict

**Neither prototype passes.** Each one fails at least one hard constraint, and they fail different ones.

| | A · per-plate shape springs | B · one shared silhouette |
|---|---|---|
| (a) Safari-safe | pass | pass |
| (b) each plate keeps its backdrop | pass | **partial**: one backdrop layer per plate, but GlassDock's own plate is set to `backdrop-filter: none` and its material is re-authored |
| (c) dock spring; PRM is a cross-fade | pass | **FAIL**: the reduced-motion fade has 0 intermediate frames, so it is a 125 ms blink |
| (d) r1 law | pass | pass |
| (e) paints in both engines | shape in both. Blur witnessed in Chromium only; in WebKit it cannot be witnessed | same |
| (f) KISS, composes the dock | pass (CSS over an untouched GlassDock; re-states the rim/shadow stack in `::before`) | **FAIL**: forks the plate material (veil, grain, rim, shadow, blur tokens) into `cluster.css`. It drops the luminance darken, ink tier and grasp register, and draws a full stadium (r = h/2) instead of the dock's 1rem corner |
| (g) one material, no doubled edge or shadow | **FAIL over content**: each plate's blur ends at its own box, so every join shows a line and less-blurred stripes (join residue 17–34 at rest, 40–65 mid-morph, against ≤ 10.4 in the plate interior). On a flat field it is clean (≤ 2.8), with one 7.7 notch in the bottom rim | **FAIL in light mode**: each later share's backdrop blurs the earlier share's ink, which leaves a soft dark band about 16 px wide right of every cut (tone 6.6, line 5.4 on a flat field; 0 in dark). Over content it is clean (join residue 2–6) |
| (h) accessibility | pass in both engines | pass in both engines |
| control-set change | the outer plates glide 24 px, but the middle plate's width steps 48 px in one frame and overlaps the theme plate by up to 48 px for about 30 frames | the plates jump 24 px in one frame (no glide, no overlap) |
| frame cost (Chromium, 1 s fuse + fission) | rAF p95 9.0 ms. Per window: 0.136 s style recalc and 205 ms raster | rAF p95 9.4 ms. Per window: 0.012 s style recalc and 75 ms raster |

On the hard part the owner named, the seam over real content, B is nearer: its blur never ends at a join, so no line forms there. A is nearer on composition (f) and has the only working reduced-motion path. Each failure is narrow and named below, so the spec seat can take the parts that measured clean from each. The real Safari cell is owed by both (§6).

## 1 · The harness, and why it is one

- **One fixture.** `AB/fixture/App.vue` renders three `GlassDock fit-content :collapse="false"` plates in a `DockCluster`: Pages, Page controls (Text size, plus Bookmark at 1440) and Theme. The fused vector reaches the cluster through both props, `:fused` (A) and `:joins` (B), and each component ignores the other's (the stray attribute lands on its root `div`). Pages carries 3 tabs at 390 and 4 at 1440. No plate overflowed in any cell (`scrollWidth − clientWidth = 0`).
- **Three fields.**
  - `design`: a warm/cool gradient with text lines under the dock, used for the design bar.
  - `stripes`: an 80 px band of 6 px black and white stripes under the cluster, used for the backdrop probe and seam visibility over content. The control faces are `visibility: hidden` (layout kept).
  - `flat`: one uniform colour, so any step at a join is the seam itself.

  A top band in every page carries the engine controls: a bare `backdrop-filter: blur(16px)` div and a `filter: blur(16px)` div over stripes.
- **One clock.** Mid-morph frames come from the real dock spring, not each proposal's scrub hook. An init script replaces `requestAnimationFrame` with a virtual clock (`window.__vc`). After `set(true)`, the harness steps it in 8.333 ms frames. `SpringProgress` integrates on the rAF timestamp, so frame *k* is the same spring time in A, in B and in both engines. Frames are taken at 40, 80 and 140 ms and at rest (1.7 s).
- **WebKit shim.** Playwright WebKit 26.5 kills the page on the plate border's nested `color-mix()` (`docs/tranches/BL/design/dock/harness/adapter-head.mjs`). The shim pins that colour and is scoped to `.glass-dock-cluster .dock-plate, .naive-row .dock-plate`: A and the naive reference. B sets that border `transparent` itself, so B needs no shim and gets none.
- **The naive reference.** The same three GlassDocks abutting in a flex row, with no gap and squared facing corners. It is what a doubled edge measures in the same metric.
- **Metrics.** Luminance is Rec.709 on 8-bit sRGB (0–255), read on DSF 2 captures:
  - *line*: max |L(x) − mean(L(x−4), L(x+4))| within ±3 css px of the join;
  - *tone*: |mean L over (jx, jx+8] − mean L over [jx−8, jx)|;
  - *join residue*: stripe stdev within ±3 px of the join on the plate's centre row.

  The join is at the midpoint between the two plates' boxes.

## 2 · Seam

### 2.1 Flat field, rest fused: line / tone / halo (max over interior rows rimTop, inTop, mid, inBot; halo 5 px above and below), per join

| cell | naive | A | B |
|---|---|---|---|
| Chromium 390 light | 23.7/3.1/1.1 ; 20.0/6.6/0.9 | 1.6/1.5/0.9 ; 1.6/1.5/1.2 | **5.4/6.6**/0 ; **5.4/6.6**/0 |
| Chromium 390 dark | 18.1/4.1/1.4 ; 20.0/6.1/1.6 | 2.5/2.3/1.2 ; 2.8/2.2/1.5 | 0/0/0 ; 0/0/0 |
| Chromium 1440 light | 19.7/5.0/1.3 ; 20.0/2.7/0.9 | **7.7**/1.5/1.0 ; 1.6/1.5/1.2 | **5.4/6.6**/0 ; **5.4/6.6**/0 |
| Chromium 1440 dark | 19.5/4.9/1.3 ; 20.0/2.2/1.6 | 2.3/2.3/1.0 ; 2.8/2.3/1.5 | 0/0/0 ; 0/0/0 |
| WebKit 390 light | 24.3/1.6/1.4 ×2 | 0/0/1.6 ×2 | 0/0/0 ×2 |
| WebKit 390 dark | 24.1/2.5/1.5 ×2 | 0/0/1.6 ×2 | 0/0/0 ×2 |
| WebKit 1440 light | 24.3/1.6/1.4 ×2 | 0/0/1.6 ×2 | 0.7/0/0 ×2 |
| WebKit 1440 dark | 24.1/2.5/1.5 ×2 | 0/0/1.6 ×2 | 0.1/0/0 ×2 |

Both remove the doubled border and rim: the naive line of 18–24 drops to ≤ 2.8 for A (one 7.7) and ≤ 6.6 for B. Neither shows a doubled halo (halo ≤ 1.6, at the naive level).

- **A's 7.7** is a dark notch in the bottom rim at the Pages|Controls join at 1440 light (`AB/png/seam-zoom-chromium-1440-light.png`, middle). A faint 1 px vertical line also shows at that join at 6× contrast.
- **B's 5.4/6.6** is not a line. It is a band: the profile at the mid row is 211 left of the cut and 203 right of it, recovering to 209 over about 16 px (`data/chromium.json`, `seam.joins[].profileMid`). The likely cause is that the shares are siblings, so each later share's `backdrop-filter` samples, and blurs, the earlier share's veil. Two observations agree:
  - it is 0 in dark mode, where the veil sits near the field's tone;
  - it is 0 in Playwright WebKit, which renders no backdrop at all (§3).

  At 6× contrast both are plain to see:

![seam, contrast 6x, Chromium 1440 light: A above, B below](AB/png/seam-contrast6x-chromium-1440-light.png)

Zoomed joins at 4× (naive | A | B), Chromium 1440 light:

<img src="AB/png/seam-zoom-chromium-1440-light.png" width="480">

### 2.2 Over content (striped field)

| cell | A join residue at rest (per join) | A mid-80 ms | B at rest | B mid-80 ms | plate interior (both) |
|---|---|---|---|---|---|
| Chromium 390 light | 33.5, 25.5 | 43.5, 42.4 | 3.2, 4.4 | 2.8, 3.6 | 3.2–10.4 |
| Chromium 390 dark | 31.0, 26.8 | 46.2, 39.7 | 4.6, 6.1 | 4.4, 5.5 | |
| Chromium 1440 light | 21.8, 29.5 | 57.4, 64.5 | 3.5, 2.7 | 3.3, 2.6 | |
| Chromium 1440 dark | 17.4, 25.7 | 63.1, 57.8 | 2.2, 3.6 | 2.0, 3.5 | |

This is A's failure, and it is the one the owner called the hard part. Each A plate's `backdrop-filter` blurs only its own box, so at the join each blur runs out of input and the stripes come back. The capture shows it as a light 1–2 px line and a column of sharper stripes at each join, at rest and mid-morph (`AB/png/probe-chromium-1440-light.png`: A 80 ms, A fused, B 80 ms, B fused). This is proposal A's own R-2, and it does not stay below visibility: on any page with type or imagery under the dock, the fused pill shows its joins. B's shares each span the whole cluster box, so no blur edge falls at a cut.

![stripe probe, Chromium 1440 light: A 80 ms, A fused, B 80 ms, B fused](AB/png/probe-chromium-1440-light.png)

## 3 · Backdrop live under each plate mid-morph

| | split | 40 ms | 80 ms | 140 ms | fused | bare band | control: backdrop div / filter div / bare |
|---|---|---|---|---|---|---|---|
| Chromium A, max plate stdev (4 cells) | 9.3–10.1 | 9.5–10.2 | 9.7–10.4 | 9.7–10.0 | 9.5–10.0 | 104.3–105.9 | 15.2 / 26.8 / 104.8 |
| Chromium B | 9.4–10.4 | 9.4–10.3 | 9.4–10.2 | 9.4–10.2 | 9.4–10.2 | 102.8–105.9 | same |
| WebKit A | 91.0–95.1 every frame | | | | | 103.3–106.0 | **105.9** / 27.4 / 104.9 |
| WebKit B | 91.0–95.1 every frame | | | | | 102.8–106.0 | same |

- **Chromium.** The backdrop is live under every plate in every frame, in both prototypes. Read at the plate's centre row, the stripes go from about 105 bare to ≤ 10.4 under glass.
- **WebKit.** It cannot be witnessed. The control decides it: a bare `div` with `backdrop-filter: blur(16px)` reads 105.9, the same as no div, while a plain `filter: blur(16px)` div blurs (27.4). Playwright WebKit's headless capture renders no backdrop-filter at all, which both proposers also found. Both prototypes read the same 91–95 as the plain-plate case, so neither one makes this worse. The cell is not a pass and not a fail. It is owed to the Safari app (safaridriver).

## 4 · Radius (r1 law)

| | frames | computed-radius reads | % on a non-square box | elliptical radius |
|---|---|---|---|---|
| A, each of 4 cells × 2 engines | 181 (rest + 60 frames each of fuse, partial, fission) | 30,408–34,752 | **0** | **0** |
| B, same | 181 | 35,476–39,820 | **0** | **0** |

Every element in the cluster and its `::before`/`::after` was read on every frame. The only `%` radii in the tree are master's square icon buttons at 50% (2,896–4,344 reads per cell, all on square boxes). B's layers compute `0px` everywhere; its corners live in px `path()` strings. A's facing corners are `calc(<length> × number)` px.

## 5 · Frame cost over a 1 s morph

Each window fuses at 0 ms and fissions at 500 ms. Values are the median of 3 windows, with a quiet window as the idle baseline.

| | rAF p50/p95/max ms | frames > 17.5 ms | LayoutCount | RecalcStyle count / time | Task time | trace: RasterTask / UpdateLayoutTree / Paint / DrawAndSwap ms |
|---|---|---|---|---|---|---|
| Chromium A 1440 idle | 7.9 / 9.8 / 15.0 | 0 | 0 | 0 | 0.012 s | |
| Chromium A 1440 morph | 7.8 / 9.0 / 19.0 | 1 | 6 | 143 / 0.136 s | 0.180 s | 204.9 / 151.2 / 26.9 / 193.8 |
| Chromium B 1440 idle | 7.7 / 9.4 / 12.5 | 0 | 0 | 0 | 0.012 s | |
| Chromium B 1440 morph | 7.8 / 9.4 / 14.1 | 0 | 0 | 138 / 0.012 s | 0.049 s | 74.8 / 13.4 / 4.3 / 140.3 |
| Chromium A 390 morph | 7.7 / 9.3 / 11.8 | 0 | 4 | 143 / 0.140 s | 0.186 s | |
| Chromium B 390 morph | 7.7 / 9.5 / 14.8 | 0 | 0 | 136 / 0.011 s | 0.046 s | |
| WebKit A 390 / 1440 morph | 10 / 12 / 23 · 10 / 12 / 22 | 1 · 1 | – | – | – | |
| WebKit B 390 / 1440 morph | 10 / 12 / 17 · 10 / 12 / 22 | 0 · 1 | – | – | – | |

Neither drops frames that matter on the headless pacing: the rAF series sit on the idle baseline. A's inheriting `--dock-fuse-*` restyle the plates' subtrees every frame, so A costs 11× B's style time and 2.7× its raster. B writes N + 3 `clip-path` strings a frame and forces no layout. The headless shell rasterises in software, so these are relative figures, not device figures.

## 6 · Reduced motion

| | min / end material opacity | frames with 0.05 < opacity < 0.95 | controls' min opacity | geometry states | `translate` written | swap at |
|---|---|---|---|---|---|---|
| Chromium A (1440 light / dark) | 0 / 1 | **20 / 21** | 0 | 2 | no | 131 / 129 ms |
| WebKit A | 0 / 1 | **14 / 15** | 0 | 2 | no | 136 / 141 ms |
| Chromium B | 0 / 1 | **0 / 0** | 1 | 2 | no | 125 / 122 ms |
| WebKit B | 0 / 1 | **0 / 0** | 1 | 2 | no | 131 / 124 ms |

- **A** plays a real fade-through. A WAAPI animation on a registered `--dock-cluster-fade` dips the plates, `::before` and controls 1 → 0, swaps the geometry at the floor, and rises back over about 270 ms. WAAPI is outside the PRM carve.
- **B** blinks. Its fade is a CSS `transition: opacity 120ms`, and the library's PRM carve (`src/styles/utilities/a11y-overrides.css`: `transition-duration: 0s !important` in `@layer components`) zeroes it. The material therefore vanishes at once, stays gone for about 125 ms, then snaps back. That is not a cross-fade (constraint c). The cure is A's, WAAPI, but it is not in B.

Neither is a literal cross-fade: both go through zero. A also takes the controls to opacity 0 for about 100 ms. The spec seat should rule whether a dip-through-zero satisfies "plain cross-fade", and whether the controls may dip.

## 7 · Accessibility

Both prototypes give the same result in both engines at 390 and 1440 (light):

| check | A | B |
|---|---|---|
| `ariaSnapshot` of the cluster: split = mid-fuse (80 ms) = fused | identical | identical |
| census of every button and `[role]`/`[tabindex]` (role, name, tabIndex, inert, aria-hidden, disabled) | identical | identical |
| tab order from a sentinel, split and fused | Read › Text size › Dark theme, both | same |
| focus on "Text size": mid-fuse, after the fuse, after the fission | kept, kept, kept | kept, kept, kept |

In WebKit the Tab walk runs on past the cluster into the page body. The in-cluster prefix is identical split and fused (`data/webkit.json`).

## 8 · A change in the control set

The case: a control is added to the middle plate of a fused cluster, read frame by frame on the virtual clock after the ResizeObserver frame.

| | outer plates' shift | first-frame jump of any plate edge | max per frame | frames moving | extra overlap between plates |
|---|---|---|---|---|---|
| A | 24 px | 48 px | 48 px | 30 | **48 px** |
| B | 24 px | 24 px | 24 px | 1 | 0 |

- **A** FLIPs each plate's left edge, but the middle plate's width steps (its own R-6). Its right edge therefore jumps 48 px in the first frame while the theme plate glides away over 30 frames. Mid-glide, the new Share icon sits under the theme plate's glass: two plates overlap, which is the doubled material (g) forbids.
- **B** follows the jump in one frame (its stated limit).

![control set: A 50 ms, A end, B 50 ms, B end (Chromium 1440 light)](AB/png/controlset-chromium-1440-light.png)

## 9 · Against the design bar (captures)

Each sheet runs, top to bottom: split, 40 ms, 80 ms, 140 ms, fused, and theme fissioned out (`[true, false]`).

| A, Chromium 1440 light | B, Chromium 1440 light |
|---|---|
| ![](AB/png/design-chromium-A-1440-light.png) | ![](AB/png/design-chromium-B-1440-light.png) |

| A, Chromium 1440 dark | B, Chromium 1440 dark |
|---|---|
| ![](AB/png/design-chromium-A-1440-dark.png) | ![](AB/png/design-chromium-B-1440-dark.png) |

| A, Chromium 390 light | B, Chromium 390 light |
|---|---|
| ![](AB/png/design-chromium-A-390-light.png) | ![](AB/png/design-chromium-B-390-light.png) |

- **A.** The motion is a slide: the plates translate together on the spring and the facing corners square off. It carries weight in position, it is flat, and it adds no ornament. It does not read as fusing; it reads as tiles docking. At rest fused, each plate keeps its own tint (A's R-1, one luminance observer per plate) and the joins show over type. The fused pill reads as three tiles, not one material. Theme fissioning out is clean.
- **B.** The motion is liquid. At 80 ms the facing caps bulge and meet in a pinched neck, and by 140 ms the waist has opened. Of the two, this is the closer reading of "fuse" and "fission". The plates never move, so the inertia lives only in the outline. At rest fused, the controls and theme regions sit a shade darker in light mode (the §2.1 band), so B also reads faintly as tiles, though no line marks the joins. The stadium ends (r = h/2) change the dock's silhouette from its 1rem corner, and the theme plate becomes a near-circle (64 × 56).
- **WebKit sheets** (`AB/png/design-webkit-*`). Both prototypes draw the right silhouettes in every frame. Text shows through both, because this WebKit build renders no backdrop blur (§3). They are shape evidence only.

## 10 · What each would need to pass

The spec seat writes the cure; these are the measured gaps only.

- **A**:
  - (g) the blur must not end at a join. A per-plate box blur ends at the box edge by construction, so meeting this means changing what each plate's backdrop element spans;
  - the control-set glide must not overlap plates;
  - the per-plate tint must become one tint (its own R-1).
- **B**:
  - (c) a reduced-motion fade the PRM carve cannot zero (WAAPI, as A does);
  - (g) light mode: a share must not blur its neighbour's ink;
  - (f) compose GlassDock's plate rather than fork its material, and keep the dock's corner rather than a stadium. Its own §9 items 2–4 (luma, ink tier, grasp) follow from this.
- **Both**:
  - the Safari-app cell for the backdrop, which Playwright WebKit cannot show;
  - the 2-row phone layout, where neither fuses across rows.

## Files

- `AB/fixture/`: the one fixture (`App.vue`, `main.ts`, `h.css`, `index.html`).
- `AB/tools/build.mjs`: copies the fixture into a worktree and vite-builds it.
- `AB/tools/measure.mjs`: the harness (virtual clock, seam, probe, radius, perf + Chromium trace, reduced motion, a11y, control set).
- `AB/tools/summarize.mjs`: the tables above from a record.
- `AB/data/`: `chromium.json` and `webkit.json` (raw), plus their summaries.
- `AB/logs/`: run logs and the guard lines.
- `AB/png/`: `design-<engine>-<A|B>-<w>-<theme>.png`, `seam-zoom-*`, `seam-contrast6x-*`, `probe-*` and `controlset-*`.

Reproduce:

```sh
node docs/tranches/BL/design/dock-cluster/AB/tools/build.mjs <worktree-A> <worktree-A>/.ab-build   # likewise for B
~/.claude/guard/guarded --timeout 40 -- node docs/tranches/BL/design/dock-cluster/AB/tools/measure.mjs --engine chromium --siteA <A>/.ab-build/site --siteB <B>/.ab-build/site --out <dir>
~/.claude/guard/guarded --exclusive webkit --timeout 45 -- node …/measure.mjs --engine webkit …
```
