# Dock cluster · pass 2 build (O-200, O-202, O-199, F5)

| field | value |
|---|---|
| seat | the PASS-2 BUILD seat, O-195 design loop |
| model | `claude-opus-5-5`, asserted from own system identity |
| inputs | `orchestrator-note-one-dock.md` (O-199, O-200, O-202, daraksha's live SiteDock), `orchestrator-note-prm.md` (O-198), `fold.md`, W-I.8 as the fold left it, `docs/precepts/restraint.md` |
| base | master `a1573a54e` (its `src/` equals `0778c4090`), scratch worktree `.claude/worktrees/bl/cluster/pass2-build`, `fold/fold-build.patch` applied, then this pass. The whole build is `pass2/prototype.patch` (against master). The worktree was removed after this record was written |
| rounds | r4 (one-dock, swap, PRM, a11y, rest), r5 (one ink, one tone, phantoms, the PRM seat), r6 (the lens overhang, the flat rim), r7 (the 1 px kernel overlap). Each round names its site copy in its runner |
| harness | `pass2/tools/probe.mjs`: the fold probe's helpers (server, virtual rAF clock, seam metrics) plus the pass-2 parts: `onedock`, `swap`, `rest`, `prm`, `a11y`, `iso`. The fixture is `pass2/fixture/` (one collapsible dock plus the theme member; value's Tools → tool view; `nocluster=1` is the 11.0.0 composition). Each frame on the virtual clock is read after its microtasks and after one rendering update (a fresh ResizeObserver's first delivery), so the read is the state that paints. Runners: `tools/run-webkit.sh`, `run-webkit2.sh`, `run-r6.sh`, `run-r7.sh` |
| A/B | one bundle. `fold` cells pass `follow=0&glide=0&cede=0&scalemap=0&ink=share&tone=share`, which turns every pass-2 mechanism off and leaves the fold build's (its arriver is pass 2's, see §2). `v1100` cells are `nocluster=1`, GlassDock alone as 11.0.0 ships it |
| engines | headless Chromium (Playwright headless shell) and Playwright WebKit 26.5, guarded, one browser per run, a new context per cell, WebKit under `--exclusive webkit`. The unit test under `guarded --light`, vitest `--maxWorkers=2` |
| records | `pass2/data/*.json`, `pass2/logs/`, `pass2/png/` |

## Verdict

All four asks are built and measured in both engines at 390 and 1440, light and dark.

1. **R-8 is ruled against the one-dock shape: a member may carry GlassDock's own collapse.** The cluster draws its silhouette from each member's painted extent, maps a scaled member's plate clip through its own scale, and paints the row as a chain from the member that moves. Through an expand with the theme fissioning out, and a collapse with it fusing back, the theme's glass moves at most 5.0 px in its first frame and at most 6.25 px in any 8.33 ms frame, over 73 px of travel, in both engines. The fold mechanism with the same collapsing member jumps the theme 72–73 px in one frame (at the start of an expand, at the settle of a collapse) and paints the bridge as bare field (27.5–33.1 against the ink in light).
2. **The face swap is a first-class case.** 11.0.0 steps the dock 78 px on each side in one frame and, on the way back, leaves the leaving face's controls 40 px outside the plate at opacity 0.95. The cluster glides the silhouette on the dock spring, cross-fades the content inside it, and fissions the tool's own run in and out on the same spring (numbers in §2, r6).
3. **The capsule rest (O-199).** The corner is half the cross extent, read from the box: 28 px on a 56 px member in all 168 rest cells, both engines. No `%` radius and no elliptical radius in any frame of any motion cell.
4. **F5 is closed at its root.** The column is the conflation of two anti-aliased edges, one from each member's plate, in the same device column. WebKit anti-aliases both plates' box edges even where the cut lands on a device-pixel boundary. One member's plate now inks the whole silhouette and one tone lens tones it, so neither the ink nor the tone has a cut. Chromium's last residue was the kernel lenses' own cut near the shadow's edge, which the lenses now overlap by 1 px across each contacted neck. Flat seam at DSF 1, 1.25, 1.5, 2, 2.2, 2.625 and 3 (r7): WebKit 0 / 0 in all 84 cells, Chromium ≤ 1.5 / ≤ 0.1 in all 84 cells, with the worst at the bound (DSF 1.25 dark collapsed; the next cell is 0.9). Fold ink and tone: WebKit 6.1–27.6, Chromium up to 4.8. I8-G1 is GREEN in both engines at every ratio.

Restraint (O-203) binds the build: the rim ring is flat (its lit gradient is struck), the cluster keeps one shadow layer and one blur value, and overshoot stays on the join spring and the dock's own morph. Reduced motion (O-198) holds in geometry, with one change per episode in both engines; the opacity response is 250–320 ms, because master's `--spring-dock-exit-duration` is the pre-L5 value. The 144 ms bound reads L5's token, so it holds only once 11.1.0 L5 lands (§5).

## 1 · One dock plus the theme member (O-200; R-8 ruled)

The fixture is daraksha's live composition (`o1109-dock`, `src/shell/SiteDock.vue`, read-only): one GlassDock, `fit-content`, `collapse="closed"`, a DockLayerGroup of faces "pages" (four icon seats, the open page labelled) and "page" (the back seat and two controls), `#collapsed` holding the page icon. The theme leaves `#persistent` and becomes the second member. The episode is the owner's trigger: the reader reaches for the dock, which expands while the theme fissions out (`fused: [true] → [false]` and `expand()` in the same tick), and leaves it, which collapses it while the theme fuses back.

### What the fold mechanism does with a collapsing member (measured, `fold` cells)

GlassDock's collapse morph reserves the expanded footprint in layout for the whole morph and paints the visible size as `scale: k 1` about `--dock-morph-origin` (`layers.css`, `shape.css`); its box clips its content on the morph axis while `[data-morphing]` is set (`shell.css`). The fold build's cluster reads layout boxes, so:

| | Chromium | WebKit |
|---|---|---|
| theme glass, first frame of an expand | 73.4 px | 72.4 px |
| theme glass, the frame the collapse settles | 73 px | 73 px |
| bridge at j ≥ 0.45, light (ink − bridge) | 27.5–29.9 | 27.6–33.1 |
| bridge at j ≥ 0.45, dark | 1.7–2.9 | 2.8 |

The bridge reads the bare field because the dock's own morph clip cuts its plate at its painted box edge, and the shares are drawn from the reserved box. Its plate clip is also drawn in unscaled px inside a box scaled by k, so its corners paint as ellipses (rx = k·r). A second defect sat under both: a collapsing member lerps its ink from the dock tier to the wash tier (`shell.css` `--dock-plate-collapsed-tier`), so a collapsed dock fused to the expanded theme read as two tones (210 against 203 at the cut, Chromium light; capture in the smoke run, superseded).

### The mechanism (pass 2)

- **Painted extent.** A member's painted extent is its scaled rect while `[data-morphing]` is set (`getBoundingClientRect` includes the scale), a glide while its width changes with no morph (§2), and its layout box otherwise. Its layout box is recovered as `rect.left − translate − origin·(1 − k)`, with `k = rect.width / offsetWidth`.
- **The chain.** While any member moves, the row is painted from the first mover's extent outward: each member at its painted width, each gap at its layout gap. Each other member is moved there by `translate` alone. Layout never animates (P5). At settle every extent equals its layout box, so every translate is 0.
- **Scale mapping.** A scaled member paints its plate in its own unscaled px, so the cluster maps its clip path through `x → (x − X0) / k`. The share is drawn in painted px and stays circular.
- **The kernel overlap (r7).** The kernel lenses overlap by 1 px across each contacted neck (§4).
- **One ink.** Every member paints the same ink: one tint (R-6, the shared luminance observer) and, new here, one tier (`cluster.css` sets `--dock-plate-collapsed-tier` to the expanded tier inside a cluster). So one member's own `.dock-plate` inks the whole silhouette, and the others' plates stand their ink down (`visibility: hidden`; box, controls and lens untouched). The painter is the first member not under its own morph, because a morphing member's box clips its plate. It sits at `z-index: 0`, under every other member's controls, and its grain is anchored to the cluster origin, so a change of painter moves no grain.
- **The frame.** The member's morph writes `--dock-morph-t` on its root in its spring's rAF callback. The cluster paints in a MutationObserver on the members' `style` that reacts only to a change of that scalar. Its microtask runs right after that callback, so the silhouette is never painted from the previous frame's scale, whatever the rAF order. The wave makes this a `dockClusterContext` hook from the member's morph `onFrame`. The prototype's first observer re-entered on the cluster's own writes and hung a page; the scalar filter is the cure.

### Measured (pass 2, Chromium r5, WebKit r5-onedock)

| | Chromium | WebKit |
|---|---|---|
| theme glass, first frame (expand / collapse) | 3.0–3.99 / 4.0–4.62 px | 3.0 / 4.0–4.62 px |
| theme glass, largest frame step, either episode (travel 73 px) | 5.02 px, 6.25 at the neck | 5.02 px, 6.25 at the neck |
| dock glass, largest frame step | 5.5 px | 5.5 px |
| bridge at j ≥ 0.45 (light and dark) | 0–1.0 | 0 |
| share overlap | 0 | 0 |
| `%` radius / elliptical radius, every frame | 0 / 0 | 0 / 0 |
| controls outside the glass (px × opacity) | 0.01 | 0.01 |

The largest step is 6.9 % of the travel, which is the dock spring's own peak frame (6.98 %, fold F7). Captures: `png/chromium-r5-onedock-{p2,fold}-{390,1440}-{light,dark}-{expand,collapse}-t{50,117,250}.png`. At `t117` of the collapse, the fold cell paints the bare band and the p2 cell one capsule run with its neck.

**R-8, ruled.** A member may carry GlassDock's own collapse. The cluster composes the dock's collapse morph and its own join spring, both on `springPreset("dock")`. A cluster holds at most one collapsible member, and the wave asserts it, throwing and naming both. With two members morphing at once there is no member left to paint the ink without its box clip, so the rule fails loud (e) instead of painting a band.

### Accessibility (h)

`partA11y`, both engines, 390 and 1440. At collapsed and at expanded, the census (role, name, tabIndex, inert, aria-hidden, disabled) and the ARIA snapshot read the same fused as split. Focus held on the theme control stays there through a fission (20 reads at 25 ms). Changing the painter hides only a plate, which is `aria-hidden` and never in the tree. The collapse's own inert swap is GlassDock's and is unchanged (`GlassDock.vue`, the summary/full panes).

## 2 · The DockLayerGroup face swap (O-202)

The fixture is value's Tools → tool view on color.babb.dev (read from `value.js` `demo/shell/dock/Dock.vue`, read-only). One `fit-content` GlassDock holds a DockLayerGroup with `show-switcher="false"`, a narrow "tools" face (a palette seat and "Tools →") and a wide "tool" face (back, a separator and five stops; two at 390). The tool's own run, Undo and Apply, is a member that arrives with the tool face. The theme member sits last. The run is fused.

### What 11.0.0 does today (measured, `v1100` cells, GlassDock alone)

DockCrossfade owns the swap (`DockCrossfade.vue`): two faces cross-fade on one `useDockSpring` and the box reserves the peak face's block size. Inline, the active face is in flow and the leaving one is absolute at `inset: 0`, so:

- **The width steps in one frame.** At 1440 the plate goes 156 → 313 px, 78.4 px on each side, in the first frame of "in", and back in the first frame of "out". At 390 it goes 147 → 175 px, 14 px a side. The silhouette never grows on the spring.
- **The leaving face hangs outside the glass.** On the way back, the tool face's controls lie up to 40 px outside the narrow plate at opacity 0.95 (38 px × opacity at 1440; 15.9 px at 390).
- **The content cross-fades on the dock spring.** This part is already right.

So 11.0.0 has silhouette continuity in neither direction. The dock spring reaches only the content.

### What the cluster adds

- **The silhouette glides.** A member whose width changes with no morph glides its painted extent from where it was painted to its new box, on its own `useDockSpring(DOCK_SPRING)`. Its content cross-fades inside it (DockCrossfade, unchanged). A gliding member's face content (`.dock-face-content`, the G12 element) is clipped to its silhouette while it glides, by an inline px inset that may be negative.
- **The tool's own run fissions in and out on the same spring.** An arriver opens from zero width at its place in the chain: a droplet, a circle while narrower than tall, its gaps opening with it, its opacity equal to its open fraction. A leaver leaves a closing phantom in the chain, so a mover's neighbours never jump into its place. A pure leave, with no other mover, keeps R-7's survivor glide.
- **The lenses overhang the root.** A shrinking glide paints wider than the row's layout box, and r5's lenses, at `inset: 0` of the root, were cut square at the root's edge (`png/chromium-r5-swap-p2-1440-light-design-out-t33.png`, the square left end). The lenses, the tone lens and the shadow now overhang the root by the painted excess, and their paths shift by the same amount. Measured in r6.

### Measured (r6; `swap-{p2,fold,v1100}`)

Each cell's travel is read from its first traced frame to the last (glass = the member's share; 11.0.0 = its plate). The two engines read alike to 0.05 px, so one figure stands for both. Light and dark are identical in geometry.

| 1440 (390) | 11.0.0 (`v1100`) | fold mechanism | pass 2 |
|---|---|---|---|
| dock glass, first frame of "in" | **−78.4 / +78.4 px** (±14.0) | 0 / +123.5 | 0 / −5.5 (the cut moving as the run opens) |
| dock glass, largest frame step, in / out | 0, all of it in one frame | 9.65 / 9.65 | **9.65 / 9.65** over 139 px (6.9 %); 5.21 over 75 px at 390 |
| tool run (arriver) and theme glass, largest frame step | – | 4 / 9.65 | **10.0 / 10.4** over 145–150 px (6.9 %) |
| share overlap, any frame | 0 (one plate) | **73** (9 at 390) | **0.17–0.2** |
| a leaving face's controls outside the glass, "out" | **40 px at opacity 0.95** (15.9 px at 390) | 40 px, px × opacity 25.3 | **0** (the gliding member's content is clipped to its silhouette) |
| an arriving member's controls outside its droplet, "in" | – | 16 px × 1.0 | 34.3 px at opacity 0.16, 21.5 at 0.37, 9.8 at 0.56, 0.5 at 0.72 (px × opacity ≤ 7.9) |
| geometry under PRM (§5) | – | – | one change, both engines |

- **What the cluster adds over 11.0.0** is the silhouette: in 11.0.0 only the content rides the dock spring, and the glass jumps. In the cluster the glass grows and shrinks on the same spring, and the theme and the tool's run ride it.
- **The arriver's controls** are not yet inside its droplet while it opens. They ride its opacity, but at opacity 0.37 a control still sits 21.5 px outside. I8-G18's arm for this is RED on this build. The clip that would hold them is an ancestor clip over the arriver's controls, which I8-G8 forbids while a control carries its own `backdrop-filter`. O-203 strikes that nested blur in GlassDock, and the arriver's clip lands with it (§8).
- **r5's square end.** r5's lenses were `inset: 0` of the root, so on the way out the shrinking glass was cut square at the root's edge (`png/chromium-r5-swap-p2-1440-light-design-out-t33.png`). r6 overhangs them (R-12; `png/chromium-r6-swap-p2-1440-light-design-out-t33.png`). The frame metrics above read the share paths and are the same in r5 and r6. Only the paint differed.
- Captures: `png/{chromium,webkit}-r6-swap-{p2,fold,v1100}-1440-{light,dark}-design-{in,out}-t{33,83,167}.png`, cropped to the painted glass from r7.

## 3 · The capsule rest (O-199)

R-4 now reads the corner as half the member's cross extent, from its painted box, in px: `r = h / 2`. The token is not read and no literal is written. The silhouette is a capsule run, and the theme member at rest split is a circle of its height. An arriving droplet is a circle of its width. Measured at rest, fused (`partRest`; the lens's first `M` against the member's left edge): **r = 28.00 against h/2 = 28.00 in all 84 cells per engine** (3 states × 7 ratios × 2 widths × 2 themes), Chromium r5 and WebKit r5. The `%` and elliptical-radius arms read 0 in every frame of every motion cell.

The member's own collapsed rest is drawn by GlassDock as `--radius-circle` (`50%`) on its square box (`morph.css`). That is allowed under r1, since the box is square. Inside a cluster the plate's radius stands down and the path draws the corner, so the cluster paints no `%` radius at all. The clip-string arm counts 65 `%` reads per episode, every one GlassDock's own: the G12 content clip `inset(0 calc((1 − t) · 100%) 0 0)` on `.dock-face-content` while `[data-morphing]` (`crossfade.css`), master's. It is an inset, not a radius, so r1 does not apply, and W-I.8's I8-G4 clip arm is scoped to the cluster's own writes.

## 4 · F5: the fractional-ratio seam, its root and its cure

**The root (WebKit isolation, `iso`, `?ink=share&tone=share`, fused at rest).** Each layer is hidden in turn (`png/webkit-f5iso-*-{none,plate0,plate1}.png`, `data/webkit-f5iso-*.json`). The column reproduces in this fixture at DSF 2.2, 1.25 and 2.625, at 390 as well as 1440 (the fold saw 1440 only):

| DSF 2.2, 1440 light, device px across the cut | cut column | either side |
|---|---|---|
| all layers | **218** | 204 |
| left plate hidden | 228 | 232 (bare) / 204 |
| right plate hidden | 222 | 204 / 232 (bare) |
| lenses, rings, grain or shadow hidden | 218 | 204 |
| plates unclipped (`clip-path: none`) | 218 | 204 |
| members, root or plates on their own layers (`will-change: transform`) | 218 | 204 |

The cut column is covered in part by both plates: about 36 % from the left and 14 % from the right at 2.2, and 25 % from each at 1.25. Each plate's box edge is anti-aliased into the same device column, and two partial coverages composite to about half, not to one. At DSF 1.25 the cut sits at device x 986.0, exactly on a device-pixel boundary, and the column is still there. So it is not the cut's position (snapping the cut is already ruled out, fold F5), not the clip path (unclipped plates read the same), not the tone (lenses hidden read the same), and not compositing layers (forcing them changes nothing). It is two painters' abutting edges, which WebKit anti-aliases where Chromium snaps a box edge. Any design with two ink edges meeting at a cut is exposed to it.

**The cure: no cut.** One member's plate inks the whole silhouette (§1, one ink), and one tone lens tones it (the tone is pointwise and the same for every member). Each member keeps its own kernel lens, its backdrop-filter (b). The kernel lenses still meet at cuts. Where the backdrop is not flat, near the shadow's edge, two partial kernel coverages left a line: Chromium 1.6 (r5) and 1.7 (r6), in one cell each, at the `inBot` row of the swap's first join. So in r7 the kernel lenses overlap by 1 px across each contacted neck. A second blur of a blurred field moves no mean (R-2), so the overlap paints nothing, and no column is left to two partial coverages.

| flat seam, line / tone, fused at rest, worst cell | fold ink and tone (`*-rest-share`) | pass 2 (r7; WebKit r5 and r6 read the same) |
|---|---|---|
| WebKit, DSF 1, 2, 3 | 0 / 0 | 0 / 0 |
| WebKit, DSF 1.25 | 9.4–14.4 / 0 (390 swap 0.1–1.6) | **0 / 0** |
| WebKit, DSF 2.2 | light 9.1–13.5, dark 0.9–1.8 | **0 / 0** |
| WebKit, DSF 2.625 | light 6.1–27.6, dark 0.9–2.8 | **0 / 0** |
| Chromium, DSF 1, 2, 3 | ≤ 0.7 | ≤ 0.7 / 0 |
| Chromium, DSF 1.25, 1.5, 2.2, 2.625 | up to 4.8 / 0.5 (dark) | **≤ 1.5 / ≤ 0.1** (r5: one cell 1.6; r6: one cell 1.7; r7: 0 cells over 1.5) |

Every r7 cell is within I8-G1's 1.5. The worst Chromium cell sits at the bound, and below it the cells read ≤ 0.9. On the iso WebKit rows the f5one cut column reads the interior, 204 light and 29 dark, at every ratio and in both widths. Hiding the painter bares the whole row and hiding the other plate changes nothing, which shows one painter. Captures: `png/{chromium,webkit}-r5-rest-dpr{1.25,1.5,2.2,2.625}-*.png` and `*-rest-share-*`.

**Before and after.** The fold's box-edge cut (R-3's second half), the 2 px neck overrun and the per-share tone lenses are superseded and struck from the wave. The whole-pixel grid margin stays, because the kernel lenses still cut at whole-px member edges in Chromium. The fold's two scratch switches are struck with them.

## 5 · Reduced motion (O-198)

`partPrm`, emulated PRM, real clock. Geometry is read after each frame's ResizeObserver delivery: the lens clip and each member's translate, width and scale.

| episode | Chromium geometry states | WebKit geometry states | non-opacity Animations | last opacity frame |
|---|---|---|---|---|
| expand + fission | 2 (change at 10.8 ms) | 2 (91 ms) | `CSSTransition:visibility` only | 283 / 262 ms |
| collapse + fuse | 2 (23.7 ms) | 2 (154 ms) | `CSSTransition:visibility` only | 291 / 320 ms |
| swap in | 2 | 2 | none | 283 / 250 ms |
| swap out | 2 | 2 | none | 280 / 253 ms |
| plant: WAAPI `clipPath` on the lenses | **4, RED** | **4, RED** | `Animation:clipPath` | – |

- **One geometry change per episode.** A member's own state change snaps its geometry at once (GlassDock's reduced-motion path), and the joins seat in that same frame through the ResizeObserver delivery. A join-only change still seats at the floor of the dip. Without this, r4 seated the joins 150 ms after the dock had snapped: 3 states, `[0, 24.4, 172.7]` ms.
- **`CSSTransition:visibility`** is GlassDock's discrete layer hold (`layers.css`, `transition: visibility 0s linear var(--duration-normal)`, the a11y-006 hit-test anchor). It is not geometry, and it is master's. I8-G6's arm now reads "opacity, or a discrete `visibility`".
- **The last opacity frame lands at 250–320 ms.** The cluster's dip reads `--spring-dock-exit-duration`, which on master is `clamp(0.12s, settle × 0.6, 0.25s)`. R-5 reads the L5 token of 11.1.0, which bounds the whole response at 144 ms. The ≤ 144 ms arm is RED on master and is read again once L5 lands. No reduced-motion path is added.

## 6 · Restraint (O-203), applied to the cluster

| rule | the cluster before | after |
|---|---|---|
| no gleam, no gradient on borders | the rim ring was `linear-gradient(to bottom, white 22 % · level, border 45 %)` | the ring is one flat `var(--glass-border-dock)` |
| one shadow per surface | one cluster shadow; member `box-shadow: none` | unchanged |
| one blur value, no blur in a blur | one kernel blur at `--glass-blur-resting-radius`. The lenses are siblings of the members, never ancestors | unchanged. The active DockControl capsule carries its own `backdrop-filter` inside the dock: a nested blur that is GlassDock's to strike under O-203 (12.0.0), not the cluster's |
| overshoot only on dock fission and fusion | the join spring, the glides and the dock's own morph all ride `springPreset("dock")` | unchanged |
| one material | two tiers: wash while collapsed, dock while expanded | one tier inside a cluster |

The flat rim landed in r6. Its rest seam is in §4's r7 rows (`chromium-r7`, `webkit-r7-rest`), and WebKit r6 read 0 in all 60 of its cells.

## 7 · daraksha's template (before and after)

**Before** (live, `o1109-dock`, glass 11.0.0):

```vue
<div ref="root" class="site-dock" dir="ltr">
  <GlassDock fit-content class="dock" aria-label="Site" :collapsed-label="`${page.label}: open the dock`">
    <template #persistent><ThemeControl /></template>
    <template #collapsed><component :is="ICON[page.name]" class="page-icon" aria-hidden="true" /></template>
    <DockLayerGroup v-model:active="layer" :show-switcher="false" class="layers">
      <DockLayer id="pages" label="Pages">…</DockLayer>
      <DockLayer id="page" :label="`${page.label} controls`">…<div id="dock-page" class="contents"></div></DockLayer>
    </DockLayerGroup>
  </GlassDock>
</div>
```

**After** (glass 11.2.0):

```vue
<DockCluster ref="root" class="site-dock" :fused="fused" dir="ltr" role="group" aria-label="Site dock">
  <GlassDock ref="dock" fit-content class="dock" aria-label="Site" :collapsed-label="`${page.label}: open the dock`">
    <template #collapsed><component :is="ICON[page.name]" class="page-icon" aria-hidden="true" /></template>
    <DockLayerGroup v-model:active="layer" :show-switcher="false" class="layers">
      <DockLayer id="pages" label="Pages">…</DockLayer>
      <DockLayer id="page" :label="`${page.label} controls`">…<div id="dock-page" class="contents"></div></DockLayer>
    </DockLayerGroup>
  </GlassDock>
  <GlassDock fit-content :collapse="false" aria-label="Theme">
    <ThemeControl />
  </GlassDock>
</DockCluster>
```

```ts
const dock = useTemplateRef<InstanceType<typeof GlassDock>>("dock");
// One plate at rest and while collapsed; the theme fissions out to the side when the
// reader reaches for the dock (hover, focus or tap: GlassDock's own expand), and fuses
// back when the dock collapses. Both ride the one dock spring.
const fused = computed(() => !dock.value?.expanded);
```

- **What moves.** ThemeControl leaves `#persistent` for its own GlassDock, the second member. The dock keeps its collapse, its `#collapsed` icon and its DockLayerGroup, unchanged. The `#persistent` slot is not used.
- **The page change** needs no consumer timing. A page whose layer is "page" swaps faces, and the silhouette glides (§2). A route that changes the control set changes the "page" face's width, and that glides too.
- **Placement.** `.site-dock`'s fixed, bottom, centred placement moves onto the cluster root through the class. Write the pass-through as `.site-dock > .glass-dock { pointer-events: auto }`, not `.site-dock > *`, which would also catch the cluster's lens and shadow layers. The `--site-dock-h` ResizeObserver reads the cluster root, which is the template ref.
- **The phone row.** Collapsed, the row is the page icon plus the khatam. Expanded, it is the four icon seats (one labelled) plus the khatam, which fits at 390: no one-dock cell at 390 logs an overflow error. The swap's cells at 390 do log one, since value's tool face plus the arriving Tool run do not fit in one row at that width (`errs 1` in every 390 swap cell). The tool face needs its phone row before the swap ships at 390 (§8). A row that does not fit logs R-10's error, naming the width it needs. It does not wrap.
- **No CSS on glass internals and no `filter: url()`.** Unchanged.

## 8 · Not settled here

- **The Safari app (I8-G14)** is still unmeasured. Playwright WebKit renders no backdrop blur, so the kernel lenses' look is decided only in Safari. The one-ink cure is ink and tone, both of which Playwright WebKit does render, and both read 0.
- **The swap at 390 overflows the row.** Every 390 swap cell logs R-10's error. value's tool face needs a phone row (fewer seats, or the run control folded into the tool member) before I8-G18 can pass at 390.
- **WebKit logs "ResizeObserver loop completed with undelivered notifications"** in every one-dock cell, fold and pass 2 alike. The fold build's grid write (`margin-inline-end`, root `left`) inside the RO callback re-triggers observation. It is benign in paint, but it is a console error in a gate that counts errors. The wave writes the grid before it observes, or reads it from the previous frame.
- **An arriver's controls ride its opacity** while its droplet opens: up to 38 px of a control lies outside the droplet at opacity ≤ 0.21 (7.9 px × opacity). The fold's arriver had the same. Clipping the arriver's content needs a clip on an ancestor of its controls, which I8-G8 forbids while a control carries a `backdrop-filter`. O-203 strikes that nested blur, and the clip can follow it.
- **I8-G2, G3, G7's Tab walk, G10, G11 and G12** were not re-run on this build. One ink changes what G2 reads at a join (the ink has no cut; the kernel lenses do) and what G11 costs (N − 1 plates stand down, one plate paints the silhouette). Both are read at landing.
- **The PRM 144 ms bound** waits on 11.1.0 L5 (§5).
- **GlassDock's own face-swap reserve.** A lone GlassDock outside a cluster still steps on a swap (§2). The silhouette glide lives in the cluster, which owns the silhouette in px. A dock that wants it sits in a cluster, even a cluster of one (value's dock is one). Making it GlassDock's own needs its reserved-box morph to take two face widths as endpoints. That is a design item for the dock, not this wave.
