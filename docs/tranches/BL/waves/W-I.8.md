# W-I.8: the dock cluster (fuse and fission)

The source is INBOUND O-195, value-js-63 for daraksha, owner order 2026-11-09 12:20, with O-198 (the reduced-motion bar, same thread, afternoon) folded in through `design/dock-cluster/orchestrator-note-prm.md`. The design loop is `driver/bl-design-dock-cluster.js`: two proposals, one A/B under one harness (`design/dock-cluster/AB.md`), and this spec. The release is **11.2.0**, for the reason in §8.

The owner likes daraksha's "fission dock". Today its site dock is two GlassDock plates side by side: the page tabs, and the page's controls with the theme toggle. The owner wants the dock to FUSE into one plate and FISSION back into two as its state changes: collapse and expand, a page change, and a change in the page's control set. The theme toggle fissions out as its own small plate. Daraksha composes this in its site dock and nowhere else; the primitive lives in glass and is general.

The A/B found that neither proposal passes alone. A (per-plate shape springs) shows its joins over any content, because each plate's blur ends at its own box. B (one shared silhouette) is clean over content, but in light mode a later plate blurs the earlier plate's ink into a band, its reduced-motion fade is zeroed by the PRM carve, and it forks the dock's material. This spec takes B's geometry and A's reduced-motion path, and adds three cures. Each cure was measured on a prototype at master `0778c4090` (`design/dock-cluster/spec-graft/`, §7) before it was written here.

## 1 · Rulings (spec seat, 2026-11-09)

- **R-1, the mechanism: the shared silhouette with the lens under the ink.** Each member keeps its own lens, a `backdrop-filter` that spans the cluster box and is clipped to that member's share of one silhouette (B's geometry). Every lens paints before any ink, so no lens samples a neighbour's veil. The ink is the member GlassDock's own `.dock-plate`: its ink tier, earned darken and grain stay GlassDock's, and only its shape changes. One rim and one shadow are drawn from the whole silhouette. Measured: the flat-field seam is 0 to 0.2 in both engines at every cell (A 0.3 to 7.7, B up to 6.6, the naive abutment 18 to 24), and over content the join residue is 1.7 to 7.2 against a member interior of 9.2 to 10.6 (A 17 to 65, B 2 to 6).
- **R-2, the lens is split in two.** The dock's filter is a kernel (`blur`) and a tone (`saturate`, plus `brightness` in dark). With one lens per member carrying both, a later lens sampled an earlier lens's toned output near a cut and toned it twice. Over stripes in dark that gave a seam tone of 6 to 12.3 (`spec-graft/r2`). The kernel lenses paint first: a second blur of a blurred field moves no mean. The tone lenses paint after every kernel lens, and since a tone is pointwise each one reads only the pixels under its own share. Measured after: dark seam tone 0.4 to 6.9 (`r3`, `r5`). The shell's `--dock-surface-blur` is recomposed from the same two tokens, so a single dock paints the same chain as before.
- **R-3, members sit on whole CSS pixels.** Chromium paints a member's clipped plate at its stacking context's offset rounded to a whole CSS pixel. A member at x.5 painted its share one device pixel late and left a field-coloured column at the cut: line 10 at 1440 light (`r1`), and the isolation in `spec-graft/tools/seam4.log` (with the left plate hidden, the right plate's ink starts at the second device pixel past its path). A's device-pixel grid (proposal A §2.3) was not enough at DPR 2. The cluster rounds each member's inline size up to a whole CSS pixel and takes the first member's sub-pixel remainder on its own inline offset. Both are written on a layout change only.
- **R-4, the corner is the dock's.** The share path draws each member's own computed corner (`--radius-dock`, 16 px), in px, clamped to half the member's height, never a stadium. B's `r = h/2` changed the dock's silhouette and made the theme plate a near-circle. Inside a cluster the member plate's own radius and its run cut cap (`run.css`, the scroll-driven corner) stand down, because the path draws every corner. Planting the cut cap back gives line 27.7 and tone 24 at 390 light (`r4`).
- **R-5, reduced motion (O-198 supersedes the brief's "plain cross-fade").** Geometry never interpolates under PRM. The join scalar rides the dock spring's own reduced-motion snap, the same path as the dock morph. The material (kernel and tone lenses, member plates, shadow) dips its opacity to 0, the outline is seated at the floor, and the opacity comes back. This runs on WAAPI, which the PRM transition carve does not zero (A's path; B's CSS transition fade was zeroed to a 0-frame blink). Each half is half of the PRM opacity duration that 11.1.0 L5 lands for O-198, and the whole response takes at most 144 ms. W-I.8 adds no reduced-motion token and no second path. The controls never fade: under this geometry no control moves, and the measured control opacity stays at 1. A literal two-layer cross-fade is rejected, because it would stack two glass layers (`a + b − ab` sags mid-fade) and double the backdrop.
- **R-6, one tint.** The cluster runs one `useGlassBackdropLuminance(root, { shared: true })`, with the static `GLASS_BACKDROP_SHARED_ATTR` marker in its template (the DockStage precedent), so every member's own observer stands down and every member plate inherits one luma. Measured on the flat field: three members, one value (`tools/seam4.log`). The two-tone field is I8-G10's to read. This closes A's R-1 and B's §9.2, and it uses N − 1 fewer samplers.
- **R-7, membership and size follow layout in the frame they land.** The prototype added a control to a fused member: the outline tracked it in one frame with 0 px of overlap. A's FLIP glide overlapped two plates by 48 px for 30 frames, which is the doubled material (g) forbids. A member's width glide is not this wave. GlassDock has none, and canon P5 forbids animating `width`. The consumer plays a page change as a fuse beat (§5), so the step lands inside one plate.
- **R-8, members do not collapse.** A member must be `:collapse="false"`. In a cluster, the cluster's fuse is the collapse grammar. A member with any other value throws in setup and names itself: it fails loud and is never rendered split as a fallback. B's per-frame `data-morphing` tracking is struck with it.
- **R-9, the grasp register is not composed in a cluster.** Its carriers need a host that forms no backdrop root, and a member plate's share clip is load-bearing, so the dock.css stand-down (`clip-path: none` while held) would paint the plate's ink over its whole band. A member mounts no carriers, and the press ladder is unchanged. A lens-hosted grasp is a design item of its own, booked in §6.
- **R-10, one row.** The cluster is `flex-wrap: nowrap`. A fuse across rows is not a pill, and neither proposal built one. A host that cannot fit one row composes two (§5).

## 2 · Scope

### API

```vue
<DockCluster :fused="fused" :background-canvas="canvas" role="group" aria-label="Site dock">
  <GlassDock fit-content :collapse="false" aria-label="Pages">…</GlassDock>
  <GlassDock fit-content :collapse="false" aria-label="Controls">…</GlassDock>
  <GlassDock fit-content :collapse="false" aria-label="Theme">…</GlassDock>
</DockCluster>
```

| prop | type | default | meaning |
|---|---|---|---|
| `fused` | `boolean \| readonly boolean[]` | `false` | `true` fuses every join. An array fuses join `i`, between member `i` and member `i + 1`, and a missing entry is split. `[true, false]` fuses pages with controls and leaves the theme its own plate |
| `backgroundCanvas` | GlassDock's type | `null` | handed to the cluster's one shared luminance observer (R-6) |

- The members are the cluster's GlassDock children, in DOM order. Each registers its root and its `.dock-plate` through `dockClusterContext` (provide/inject), not through a DOM query.
- The root is one `div.dock-cluster`, and attributes fall through to it. It mints no role or name: the consumer passes `role="group"` and a label.
- The cluster never reorders, re-parents, hides, makes inert or focuses a member or a control.

| token | value | read by |
|---|---|---|
| `--dock-cluster-gap` | `0.625rem` | the gap at a split join |
| `--dock-surface-blur-kernel`, `--dock-surface-blur-tone` | the two halves of today's `--glass-blur-resting` chain, light and dark arms | the lenses (R-2). `--dock-surface-blur` is recomposed as `var(kernel) var(tone)` |
| ring width | `--dock-plate-border-width` (11.1.0 L1) | the rim ring |

### Mechanism

The cluster's own stack, bottom to top. No element here is an ancestor of a lens, and the only `filter` sits on the shadow branch, which holds no backdrop-filter.

| layer | paints | shaped by (written per frame) |
|---|---|---|
| `.dock-cluster-shadow` | `--shadow-dock`'s 14 % at σ 10 px, once, outside the silhouette only (B) | `clip-path: path(evenodd, frame + silhouette)` |
| `.dock-cluster-lens` × N | `backdrop-filter: var(--dock-surface-blur-kernel)`, spanning the cluster box | `clip-path: path(share i)` |
| `.dock-cluster-tone` × N | `backdrop-filter: var(--dock-surface-blur-tone)`, spanning the cluster box | `clip-path: path(share i)` |
| member `.glass-dock` × N (z 1) | its controls, and its own `.dock-plate` ink (tier, luma, grain) over the band from the cut on its left to the cut on its right (whole CSS px; inset written on a layout change only). Its `::before` is the rim ring | plate `clip-path: path(share i)`; ring `--dock-ring-clip: path(evenodd, silhouette + silhouette inset by the border width)`, sliced by the plate's clip |

Inside the cluster, the member plate's `backdrop-filter`, border, radius and cut-cap animation stand down, and so does the member box's `box-shadow` (cluster-scoped selectors in `styles/cluster.css`; GlassDock's own rules are not edited).

- **The shape** is `dockClusterShape.ts`, B's module generalised to the member's corner (R-4). Each join runs in two phases: for j ≤ 0.4 the facing ends bulge to contact at the cut, and past 0.4 the waist opens with `v = √((j − 0.4)/0.6)`. Every value is in px, every cut snaps to a device pixel in page space, and shares of unequal height meet at the mean.
- **The spring** is one `useDockSpring(DOCK_SPRING)`, where `DOCK_SPRING` is `springPreset("dock")`. One scalar `s` runs from 0 to 1 per episode, and each join is `j_i = from_i + (to_i − from_i)·s`. An interruption re-bases from the painted join vector and carries velocity with `inheritVelocityScale` along the join that moves most. Nothing in `src/components/dock` names a spring number.
- **The triggers** are a change of `fused`, and a ResizeObserver hit on the cluster or a member. Nothing else is observed.

### What it composes

- GlassDock: its plate, ink tier, earned darken and grain; its slots, `#persistent` and `#persistent-end` included; its run, roving tabindex, toolbar role and live region; DockControl and DockTrigger. All unchanged inside a member. A member may hold a DockLayerGroup, which the cluster does not touch.
- The one morph engine: `useDockSpring`, `DOCK_SPRING`, SpringProgress's PRM snap.
- The shared luminance seam (`shared: true`).
- The shell token block: its selector widens to `:is(.glass-dock, .dock-cluster)`, so the lens tokens are declared once, not restated.
- 11.1.0 L1's `--dock-plate-border-width` and L5's O-198 PRM duration.

### Files

- Add: `src/components/dock/DockCluster.vue`, `composables/dockClusterShape.ts`, `composables/dockClusterContext.ts`, `styles/cluster.css`, the `dock/index.ts` export, and a "DockCluster" section in `dock/README.md`.
- Edit:
  - `GlassDock.vue`: inject the context, register the member, mount no grasp carriers in a cluster (R-9), throw on collapse (R-8);
  - `styles/shell.css`: the token split and the widened selector;
  - `styles/index.css`: import `cluster.css`.
- Delete: nothing. `useDockFission` stays deleted: 967811e40 (BI.W-DOCK-LUMA-SHARE) removed it with `dockFissionSignatures.ts` and `useDockFissionWiring.ts`, ae71daa05 removed the `fission-bridge.css`/`fission-island.css` goo recipe, and GlassDock.vue records why: "demo-only spectacle + the prime Safari suspect". No SVG `filter: url()`, no goo, no filter over a backdrop.

What the prototype did that the wave does not carry:

- the DOM query for `.dock-plate` (the wave registers members through the context);
- the restated tokens (shell.css widens);
- B's MutationObserver and `data-morphing` follow (R-8);
- `seat()`, and the `__clusterPaintStats` counter (the harness drives the virtual clock instead).

## 3 · Gates

Every gate is RED on master: `DockCluster` does not exist there, so the fixture does not build (exit 1). Where a cell has a meaningful master witness, it is the naive abutment, three GlassDocks squared off in a flex row, and it is given. Every gate is GREEN on the branch.

**Harness.** The A/B harness lands as `tests-visual/dock-cluster/`: the one fixture, `measure.mjs` with its virtual rAF clock, and `summarize.mjs`, plus the new parts named below. It runs in headless Chromium and Playwright WebKit, at 390 and 1440, light and dark, DSF 2. Each engine runs under `guarded`, and WebKit under `--exclusive webkit`.

**Metrics.** Luminance is Rec.709 on 8-bit sRGB (0–255). "Line", "tone", "halo", "join residue" and "seam tone" are AB.md §1's definitions.

**Bites.** Each bite is a planted defect that turns the gate RED; the cell it was measured in is cited. Bites cited from AB are the two proposals as measured.

| id | gate | passes when | bite |
|---|---|---|---|
| I8-G1 · flat seam | rest fused on the flat field, every join, both engines, 8 cells each | line ≤ 1.5, tone ≤ 1.5, halo ≤ 1.6. Branch: ≤ 0.2 / 0 / 0 everywhere (`r5`); master's naive row: 18.1–24.3 / 1.6–6.6 | B's interleaved lens-and-ink order: tone 6.6 at Chromium light (AB §2.1). No CSS-px grid: line 3.7 / 10 at Chromium 390 / 1440 light (`r1`). The cut cap left on the member plate: 27.7 / 24 at 390 light, both engines (`r4`) |
| I8-G2 · seam over content | stripe band, rest fused and at 80 ms on the virtual clock, Chromium | at every join, the residue ≤ the largest member-interior sd in that frame, and the seam tone ≤ 7. Branch: residue 1.65–7.15 against interior 9.2–10.6, tone 0.3–6.9 (`r5`) | A's per-member lens (each lens its own box): 17–65 (AB §2.2). Kernel and tone in one lens: seam tone 6–12.3 in dark (`r2`) |
| I8-G3 · the backdrop is live | stripe sd under every member at split, 40, 80, 140 ms and fused, Chromium | every member ≤ 12 with the bare band ≥ 100. Branch: ≤ 10.6 against 101.5–105.9 (`r5`) | `clip-path` on the cluster root, which makes it a backdrop root: about 102, nothing blurred (proposal B §3 control) |
| I8-G4 · r1 and the corner | every element and pseudo in the cluster, 181 frames (rest, then 60 frames each of fuse, partial, fission), both engines | 0 `%` radius on a non-square box, 0 elliptical radii, 0 `%` in any clip string (branch: 0 in 36,924–41,268 reads per cell, `r5`); and the fused silhouette's outer corner equals the member's computed corner ± 0.25 px | B's stadium `r = h/2`: the corner reads 28 px on a 56 px member, not 16. `border-radius: 50%` on a member plate trips the `%` arm |
| I8-G5 · the dock spring | the join scalar on the virtual clock; an interrupted fuse | each frame's join equals the `springPreset("dock")` step response at that time ± 0.01; reversing at 0.5 lands split with no frame-to-frame jump above 2 px; `git grep -nE '(response\|dampingFraction\|stiffness\|damping)\s*:\s*[0-9]' -- src/components/dock` is empty | `springPreset("snappy")` in the cluster: off by more than 0.01 by 80 ms. A `{ response: 0.3, dampingFraction: 0.88 }` literal trips the grep |
| I8-G6 · reduced motion (O-198) | emulated PRM, through fuse, fission, partial, a member added, a member removed; `getAnimations({ subtree: true })` on the cluster and computed transitions, each frame, both engines | every running animation animates `opacity` alone; nothing in the subtree transitions a non-opacity property; the response from the state change to the last opacity frame is ≤ 144 ms; exactly 2 geometry states, the jump in one frame; material min opacity 0, end 1; control opacity 1 throughout | a planted `transition: clip-path …` on a lens, or a radius transition on a member plate: a non-opacity animation. B's CSS-transition fade: 0 intermediate frames (AB §6). The prototype's own halves at `--spring-dock-exit-duration`: the swap lands at 134–148 ms, so the response runs past 144 (`r5`) |
| I8-G7 · accessibility | `ariaSnapshot` and the census (role, name, tabIndex, inert, aria-hidden, disabled) at split, 80 ms, fused and fissioned; the Tab walk from a sentinel; focus on a member control through a fuse and a fission; both engines, 390 and 1440 | all identical, and focus is kept in every frame. Branch: identical in both engines (`r5`; WebKit's walk runs on into the body, and its in-cluster prefix is identical) | `inert` or `aria-hidden` on a fused member: the census differs |
| I8-G8 · Safari-safe | each sampled frame, both engines; and a source grep | no element with a computed `backdrop-filter` has an ancestor, up to the document, with `filter`, `clip-path`, `mask`, `opacity < 1`, a non-normal `mix-blend-mode` or a `backdrop-filter`; no element that contains a backdrop-filter carries `filter`; `git grep -nE "filter:\s*url\(\s*[\"'#]\|useDockFission\(\|<GooFilter\|feGaussianBlur" -- src/components/dock` is empty (the pattern skips the prose that records the deletion, `composables/index.ts:43-46`, `index.ts:108-112`, `styles/index.css:74`; at `98b526139^` it hits `useDockFission.ts:186`) | the lenses nested inside the shadow's blur branch: a `filter` ancestor. A clip on the cluster root: a clip-path ancestor |
| I8-G9 · a member grows | a control added to a fused member, then removed; a member added and removed by `v-if` | 0 px of overlap between members in every frame, and the outline's edge equals the member's edge within 0.5 px on the first frame after the ResizeObserver. Branch: 0 px, 1 frame, both engines (`r5`) | A's FLIP glide: 48 px of overlap for 30 frames (AB §8) |
| I8-G10 · one tint | the design field (warm left, cool right), all members | every member plate computes the same `--glass-backdrop-luma`, and no member root carries `data-glass-backdrop-sampled` | dropping the cluster's shared observer: each member samples its own box, and the values differ over the two-tone field |
| I8-G11 · cost | a 1 s window that fuses at 0 ms and fissions at 500 ms, at 1440, 3 windows, with the 1-min load recorded | Chromium: `LayoutCount` 0 and rAF p95 within 1 ms of idle (branch: 0, 9.7–9.8 against 9.6–10.1, `r5`). WebKit, at a 1-min load ≤ 8: rAF p95 ≤ 17 ms and at most 3 frames over 17.5 ms per window | A's per-state margin FLIP: `LayoutCount` 6 (AB §5). WebKit has no measured bite yet; see the open item in §6 |
| I8-G12 · grasp in a cluster | a pointer held down on a member control for 500 ms | no `.glass-grasp-carrier` is mounted in the cluster, and the member plate's computed `clip-path` stays its share path the whole time | letting GlassDock mount its carriers in a cluster: dock.css sets the plate's `clip-path: none` while held, and the plate's ink fills its band past the share |
| I8-G13 · the theme fissions out | `fused = [true, false]` at rest, flat field, both engines | the gap at join 2 reads the bare field ± 1, and the theme member's silhouette carries all four corners at the member radius | `fused` read as one boolean (`[true, false]` treated as `true`): join 2 closes |
| I8-G14 · the Safari app | I8-G2 and I8-G3, plus a capture at rest fused and at 80 ms, in the Safari app through safaridriver, 390 and 1440, light and dark | the same thresholds as in Chromium | not plantable here. Playwright WebKit renders no backdrop blur at all (a bare `backdrop-filter: blur(16px)` div reads 105.9 against 104.9 bare, AB §3), so this cell is decided only in Safari. **It blocks the release.** Unmeasured is recorded as unmeasured, never as a pass |

## 4 · π and DELTA

For π, captured at both widths and in both themes:

- the design sheets for each engine: split, 40, 80 and 140 ms, fused, and theme fissioned out;
- the 6× seam contrast at each join;
- the stripe probe at 80 ms and fused.

For DELTA: master's naive row against the branch's cluster, on the same fixture. Captures go under `.cache/evidence/W-I.8/`. The spec's own captures are in `design/dock-cluster/spec-graft/r5/png/`.

## 5 · Consumer half (daraksha)

Daraksha repins from 10.1.4 to 11.2.0. The 11.0.0 changes are its own repin wave's to carry. The site dock is then:

```vue
<DockCluster class="site-dock" :fused="fused" dir="ltr" role="group" aria-label="Site dock"
             @pointerenter="reach = true" @pointerleave="reach = false"
             @focusin="reach = true" @focusout="onFocusOut">
  <GlassDock v-if="!phone" fit-content :collapse="false" aria-label="Pages">
    <DockControl v-for="(p, i) in PAGES" :key="p.path" shape="tab" :active="i === current" @click="go(i)">{{ p.label }}</DockControl>
  </GlassDock>
  <GlassDock v-if="route.meta.dockControls" fit-content :collapse="false" aria-label="Controls">
    <div id="dock-page" class="contents"></div>
  </GlassDock>
  <GlassDock fit-content :collapse="false" aria-label="Theme">
    <ThemeControl />
  </GlassDock>
</DockCluster>
```

```ts
const reading = useScrolledPast(/* the site's existing scroll signal */);
const changing = ref(false);
router.beforeEach(() => { changing.value = true; });
router.afterEach(async () => { await nextTick(); changing.value = false; });
// Collapsed (reading, or a page changing hands): one plate. Expanded (the reader
// reaches for the dock): tabs, controls and the theme as three plates.
const fused = computed(() => changing.value || (reading.value && !reach.value));
```

- **Collapse and expand.** Daraksha's plates never collapse (R-8), so the site dock's collapsed state is the fused plate and its expanded state is the three plates. It is collapsed while the reader reads (scrolled past the top, neither pointer nor focus in the dock) and expanded on reach.
- **A page change** fuses for the length of the route change, so the controls member's content changes hands inside one plate (R-7), then fissions to the new set.
- **A change in the page's control set:**
  - the controls member's width steps, and the outline follows in the same frame;
  - a page that wants the beat sets `changing` around its own change;
  - a page with no controls leaves `route.meta.dockControls` unset, so the controls member leaves and the joins re-index (`[pages|theme]`). NameDock and ReaderDock already teleport with `defer`, and their routes set the meta, so `#dock-page` exists in the same render.
- **The theme plate.** ThemeControl moves out of the Controls GlassDock into its own. It is the third member, and join 2 lets it fission out as the small plate.
- **The phone row** (`max-width: 38.2rem`, `phone = useMediaQuery(…)`). The tabs do not fit one row beside two icon plates (R-10), so the Pages GlassDock renders above, outside the cluster, as today, and the cluster holds Controls and Theme.
- **What goes.** The `.site-dock` grid wrapper and its two-column rule go. `.site-dock`'s fixed, bottom, centred placement and `pointer-events` move onto the cluster root through its class, and the `--site-dock-h` ResizeObserver reads the cluster root.

## 6 · Not in this wave

- **A member's own collapse inside a cluster** (R-8).
- **The run cut cap on an overflowing member.** It stands down in a cluster (R-4). Carrying it means writing the per-side corner into the share path from the same scroll timeline.
- **A lens-hosted grasp register** (R-9).
- **A width glide when a member's control set changes** (R-7). That belongs to GlassDock, as a `scale`-based fit-content morph, and it is not booked.
- **A vertical cluster, a fuse across wrapped rows, RTL** (the share path is written in physical LTR coordinates), and an ancestor CSS `zoom` (the path is px, so it needs `dockMorphMeasure`'s `k`).
- **Open: WebKit frame cost.** Same-run headless WebKit at a 1-min load of 15–18 measured the prototype at a morph rAF p95 of 15–20 ms with 1–11 frames over 17.5 ms per window. Proposal B measured 12–17 ms with 1–4 frames in the same runs (`spec-graft/perf-r4`, `perf-r4b`). The tone lenses are not the cost: without them it is 19 ms (`perf-tone`). The member plate's grain is: without it, 15 ms against 20 ms (`perf-attrib`). I8-G11 is to be read at a quiet load first. If it fails there, the lever is to paint the grain from the kernel lens rather than from the member plate. That is a material change, and it gets its own capture before it lands.

## 7 · The basis: what was measured

All rows below come from one harness (AB.md §1: one fixture, a virtual rAF clock on the real dock spring, the same metrics), run on headless Chromium 149 and Playwright WebKit 26.5, guarded.

- **A and B** are AB.md as measured.
- **The graft** is `design/dock-cluster/spec-graft/`:
  - `prototype.patch`, against `0778c4090`;
  - `graft-over-B.patch`, the delta from proposal B;
  - five rounds `r1`–`r5`, each a full run with `data/*.json`, `*-summary.txt`, `png/` and the run log;
  - the same-run perf comparisons `perf-*`;
  - the seam isolation probe and its logs, under `tools/`.

Each round cured what the one before it showed: `r1` the light band (lens under ink); `r2` the CSS-px column (R-3); `r3` the dark tone (R-2); `r4` the plate band (cost) with the cut cap leaking; `r5` the cut cap (R-4).

| | A | B | graft (`r5`) |
|---|---|---|---|
| flat seam, line / tone, worst cell | 7.7 / 2.3 | 5.4 / 6.6 | 0.2 / 0, both engines |
| join residue over content, rest | 17.4–33.5 | 2.2–6.1 | 1.65–7.15 |
| join residue at 80 ms | 39.7–64.5 | 2.0–5.5 | 1.58–6.49 |
| member under glass, every frame (stripe sd) | ≤ 10.4 | ≤ 10.4 | ≤ 10.6 |
| `%` or elliptical radius | 0 | 0 | 0 |
| reduced motion, intermediate frames / control min opacity | 14–21 / 0 | 0 / 1 | 15–24 / 1 |
| accessibility, both engines | identical | identical | identical |
| a control added: overlap / frames | 48 px / 30 | 0 / 1 | 0 / 1 |
| Chromium layout during the morph | 4–6 | 0 | 0 |
| composes GlassDock's plate (ink tier, luma, grain) | yes, one tint per plate | no, forked | yes, one tint for the cluster |
| the dock's corner | yes | no (stadium) | yes |

## 8 · The release: 11.2.0

W-I.8 is an addition to the API: one new export, and no published name changes. It is still not a contained addition to 11.1.0:

- It builds on two 11.1.0 lanes that are still closing: L1's `--dock-plate-border-width` (the rim ring) and L5's O-198 reduced-motion cure, whose duration it reads (R-5).
- It edits `GlassDock.vue` and `dock/styles/shell.css`, the files L1 just closed its RED/GREEN record on (`docs/release-11.1.0/lane-L1.md`, a9732d236).
- It adds a public export, which needs a `.published-roster` rebind and a `.bundle-ratchet` rebind.
- It owes the Safari-app cell (I8-G14), and that cell blocks it.

It is the next minor's, cut after 11.1.0 ships.

## 9 · MIGRATION rows

None. The only shared name that changes is `--dock-surface-blur`, which is recomposed from two new tokens. Its value on a single dock does not change.

## 10 · Ledger rows

Closes O-195. Takes O-198's cluster half (its single-dock half is 11.1.0 L5).
