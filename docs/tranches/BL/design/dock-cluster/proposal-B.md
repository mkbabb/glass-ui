# Proposal B: one shared silhouette (O-195, the fission dock)

Seat: proposer B, model claude-opus-5-5, 2026-11-09. Prototype at master `0778c4090`, saved as
`proposal-B/prototype.patch`. Captures, harness and logs are under `proposal-B/`.

## Verdict

The shared silhouette works if the cluster OWNS the outline but never CLIPS AN ANCESTOR of a
plate. Each plate's own backdrop layer carries its own `clip-path: path()`, cut to that plate's
share of one outline. If one cluster element clipped the plates instead (the literal reading of
this angle), the blur would die in Chromium. That is measured below: an ancestor `clip-path` makes
a backdrop root, and the plate under it blurs nothing (row std 102 against 0). Done per plate, it
holds:

- **Chromium (headless shell), all 8 cells:** blur intact under every share (bridge-row std 0.6–2.9
  against 26–52 outside). No seam column at the fused cut. No `%` in any clip or radius. Zero layouts
  forced over a 1 s fuse-and-fission (`LayoutCount` 0). `paint()` takes 0.16–0.22 ms a frame.
- **Playwright WebKit, all 8 cells:** the silhouette, the rim, the shadow and the waist paint exactly
  as in Chromium, the tab order and focus hold, and nothing resolves to `%`. The blur cannot be
  judged in this harness: Playwright's WebKit paints no backdrop blur even under the bare reference
  plate, the one with no clip anywhere (std 38.1 inside, 41.2 outside). The §3 table shows it: the reference plate is unblurred too. So the WebKit blur half of (e) is **not witnessed** here. It needs the
  Safari app (safaridriver), and AB.md should bank that cell, never infer it (MEMORY: Playwright
  WebKit ≠ Safari).

## 1. API

One new component, `DockCluster`, exported from `@mkbabb/glass-ui/dock`, plus one prop.

```vue
<DockCluster :joins="[fusePagesControls, false]" class="site-dock" aria-label="Site dock">
    <GlassDock fit-content :collapse="false" aria-label="Pages">…tabs…</GlassDock>
    <GlassDock fit-content :collapse="false" aria-label="Controls"><div id="dock-page" class="contents" /></GlassDock>
    <GlassDock fit-content :collapse="false" aria-label="Theme"><ThemeControl /></GlassDock>
</DockCluster>
```

- `joins: readonly boolean[]` has one entry per gap. `joins[i]` fuses child dock `i` with child
  `i + 1`, and a missing entry means split. Three plates take two joins:
  - `[true, true]` is one capsule;
  - `[true, false]` is pages and controls fused, with the theme as its own small plate;
  - `[false, false]` is three plates.
- The children are ordinary `GlassDock`s, discovered as `:scope > .glass-dock`. Each keeps:
  - its slots (`#persistent`, `#persistent-end`, default, collapsed);
  - its collapse state machine and morph;
  - its `role="toolbar"`, roving tabindex and live region;
  - its `aria-label`.

  The cluster adds no role. The consumer's `aria-label` on the cluster lands on a plain `div` and
  should become `role="group"` in the wave.
- **Triggers.** The consumer decides the topology, and the cluster plays every change of `joins` on
  the dock spring. Daraksha's three asks map like this:
  - **Collapse and expand.** `joins` follows the collapsed state, for example fused while collapsed.
    The cluster also tracks a child's own collapse morph per frame (below), so the outline follows
    the plate as it shrinks.
  - **Page change.** The page swaps what it teleports into `#dock-page`. That plate changes width,
    and the cluster re-shapes on the ResizeObserver hit. A page with no controls can set
    `joins[0] = true`, and that change animates.
  - **Control set change.** Same path: the box changes, and the outline follows in the same frame.
- **One limit.** A child dock's own width change is instant today (`fit-content`, no morph), so the
  outline follows a jump, not a glide. Gliding the width is the dock's business (the O-188 glide
  family), not the cluster's.

## 2. Mechanism

**Layers.** These are all absolute, all span the cluster box, and all sit under the docks.

| layer | paints | shaped by |
|---|---|---|
| `.dock-cluster-shadow` (inset −40px) | nothing itself | `clip-path: path(evenodd, frame + silhouette)`: keeps only the outside |
| `  .dock-cluster-shadow-blur` | `filter: blur(10px)` (the `--shadow-dock` 20px radius) | none |
| `    .dock-cluster-shadow-fill` | 14% `--shadow-color` | `clip-path: path(silhouette)` |
| `.dock-cluster-plate` × N | `backdrop-filter: var(--dock-surface-blur)` + `@apply glass-plate` at `--glass-veil-dock` + grain `::after` | `clip-path: path(share i)` |
| `.dock-cluster-rim` | the `--glass-border-dock` hue, top-lit | `clip-path: path(evenodd, silhouette + silhouette inset 1.5px)` |
| `.glass-dock` × N (z 1) | controls only: their plate stands down (`background: none; backdrop-filter: none; border-color: transparent; ::after none`, `box-shadow: none`) | none |

**What animates.** The spring drives ONE thing: the inline `clip-path` string on N + 3 elements,
rewritten in px each frame. The elements are N plates, the rim, the shadow fill and the shadow
frame. Nothing else moves:

- no `width`, no `inset` and no `transform` animate;
- no dock moves;
- no `border-radius` exists on any layer (all compute `0px`).

The CSS `transition: opacity 120ms` on the three material layer kinds is used only under reduced
motion.

**The spring.** `useDockSpring({ response: DOCK_SPRING.response, dampingFraction:
DOCK_SPRING.dampingFraction })`, with `DOCK_SPRING` read from `springPreset("dock")` in `constants.ts`.
That is the same factory and the same preset as the collapse morph, with no literal. One episode
drives the scalar `s` 0→1. Each join is `j_i = from_i + (to_i − from_i)·s`.

An interruption re-bases from the painted join vector and carries the live velocity. The carry
uses `inheritVelocityScale = oldSpan / newSpan` along the join that moves most, so a reversal
mid-fuse is C¹. That is the same re-base the collapse morph uses.

**Reduced motion.** `prefers-reduced-motion: reduce` routes to a fade-through:

1. The three material layers go to `opacity: 0` over 120 ms.
2. The new outline is seated.
3. They fade back in over 120 ms.

The opacity sits on each painting layer, never on an ancestor of a backdrop-filter. I chose a
fade-through over a literal two-layer cross-fade. Two overlapping glass layers composite their ink
as `a + b − ab` and sag mid-fade (the dock.css finding), and a doubled backdrop-filter costs a
second blur pass. The spec seat can rule which reading of "cross-fade" it wants.

**The shape** (`composables/dockClusterShape.ts`, pure, px only). A share is the plate's capsule
plus its half of the bridge, cut at the gap midpoint `cx`. The join runs in two phases, after the
honest-goo spec (DOCK-LADDER §3):

- **j ∈ [0, 0.4]: lobe bulge.** Each facing cap's tip travels from the plate edge to `cx` as a
  stretched quarter-cubic. They meet at a point.
- **j ∈ (0.4, 1]: the waist.** The neck opens from that point to full height, with
  `v = √((j−0.4)/0.6)`. The end tangent turns from vertical to horizontal, so the two shares meet
  C¹ at `cx`, until the top and bottom edges run straight.

No taffy thread ever forms. Plates of unequal height meet at the mean of the two.

On the dock spring (ω₀ = 2π/0.3, ζ 0.88):

- point contact lands at about 63 ms;
- the waist is deeper than 2px from about 63 to 167 ms, roughly 6 frames at 60 Hz;
- by 200 ms j is 0.968.

That is longer than iOS's ≤2-frame neck. The neck lifetime is the one design knob: `JC` and the
exponent on `v`. Raising `JC` to 0.7 and squaring `v` puts it at about 2 frames. I left it
readable for the review.

**Tracking a child's own morph.** A MutationObserver on `data-morphing` runs the cluster's rAF loop
while any child morphs. The loop reads each dock's `getBoundingClientRect()`, so it sees the dock's
`scale`. Its callback is registered after the dock spring's, so it reads the same frame's
geometry. A ResizeObserver on the cluster and each dock covers the rest.

## 3. The angle's two questions, answered

**WebKit support for `path()`/`shape()` interpolation.** I don't ask for any. The spring runs in JS,
as the dock's own does, and writes a complete static `path()` each frame. What this needs:

- static `clip-path: path()` (Chromium 88, Safari 13.1);
- `path(evenodd, …)` (same releases).

What it doesn't need:

- `path()`↔`path()` interpolation, which needs identical command lists, and the topology here
  changes from two subpaths to one share-pair;
- `shape()`, which arrived in Safari 18.4 and Chromium 135;
- `d:` as a CSS property, which Safari lacks.

WebKit painted every frame's path correctly: see the `webkit/*-mid-*.png` captures.

**The backdrop-filter under a morphing clip.** Measured with the static control
`scripts/wk-control.mjs`. It uses a 6px stripe field and records luma std along a row through the
plate. Blurred glass reads about 0, raw stripes about 100.

| case | Chromium (static control) | WebKit (Playwright), in-fixture: plate / outside |
|---|---|---|
| plain plate, `backdrop-filter: blur(16px)` | **0** (outside 102) | reference variant: **38.1 / 41.2** light, 21.8 / 21.2 dark (no blur) |
| `clip-path: path()` on the plate ITSELF (this proposal) | **0** | cluster bridge: 42.7 / 38.2 light, 23.7 / 19.8 dark (no blur) |
| `clip-path: path()` on the plate's ANCESTOR (the naive shared silhouette) | **102**: blurs nothing | ancestor variant: 38.1 / 41.2 light, 21.8 / 21.2 dark (no blur) |

In this Playwright WebKit build, the bare reference plate already blurs nothing, so the WebKit column
can't separate the three cases. The static WebKit control (`scripts/wk-control.mjs webkit`) queued
50 minutes on the machine-wide `webkit` lock, which another lane's chain held, and was withdrawn
unrun (`logs/wk-control.log`). The measurer should run it, plus the same three cases in the Safari
app.

In-fixture, at full styling, the same split shows. The bridge row of the cluster reads 2.93 light
and 0.60 dark. The ancestor-clip variant reads 38.41 and 22.26, the reference plate 0.65 and 0.61.

So a single cluster element CANNOT own the clip. In Chromium, `clip-path` on an ancestor is a
backdrop root (Filter Effects 2), and the plates beneath it sample an empty backdrop. That is the
same mechanism `dock.css` documents for the grasp carriers under the plate's own clip.

The proposal therefore puts the shared outline in ONE computation (`clusterShape`) and hands each
plate its share. Every plate's box spans the whole cluster, so all N plates blur the identical
field, and at the cut their pixels agree.

## 4. The seam (constraint g)

- **Backdrop.** Every share layer is `inset: 0` of the cluster, so all N blur the same input with
  the same edge mode. At the cut they sample identical pixels.
- **Anti-aliasing.** The cut `cx` is snapped to a device pixel in page space. Both shares then end
  on a pixel boundary, and no column is half-covered twice.
- **Rim and shadow.** Both are drawn ONCE, from the whole silhouette. The abutting shares are
  subpaths of one path, so the rasterizer cancels the shared edge. There is no rim line at the
  cut, and no second shadow paints under the neighbouring plate. The plates' own `box-shadow` and
  border stand down.

**Measured** (Chromium, rest-fused, 24 css px centred on the cut). The value is the max |column −
row median| in luma:

| row | 390 light | 390 dark | 1440 light | 1440 dark |
|---|---|---|---|---|
| top rim (t+0.5) | 4 | 1 | 3 | 1 |
| body (t+5) | 5 | 1 | 6 | 2 |
| body mid | 5 | 2 | 5 | 2 |

These are the residual of the 6px stripes through a 16px blur, the same everywhere along the row,
not a seam (`chromium/chromium-1440-{light,dark}-n3-seam-zoom4x.png`: no column at the cut).

The rim-bottom and shadow-below rows (36–93) run through the unblurred stripe field just outside
the plate's edge, so they measure the backdrop, not the seam. The WebKit seam rows (26–92) carry
the unblurred stripes under the glass and are not a seam measurement.

## 5. Captures

`proposal-B/{chromium,webkit}/<engine>-<390|1440>-<light|dark>-n<2|3>-<frame>.png`. Each is
cropped to the cluster plus 28px at DPR 2. There are 5 frames per cell:

- `rest-split` (j 0);
- `mid-j0.25`, the lobe bulge, about 45 ms on the dock spring;
- `mid-j0.55`, the waist, about 82 ms;
- `mid-j0.80`, about 127 ms;
- `rest-fused` (j 1).

The mid frames are seated with `seat()` at a join value, so they are deterministic. Their times on
the real spring are given for reading. That makes 8 cells × 5 frames × 2 engines = 80 PNGs.

The probes are `*-probe-{cluster,ancestor,reference}-{light,dark}.png`. The static controls are
`controls/chromium-control-*.png` (the WebKit one was not run).

At 390 the pages plate carries two tabs. With three, the 390 row overflowed, and the dock's own run
cap scrolled "About" (fixture constraint, not cluster).

## 6. Frame cost (a 1 s run: fuse 450 ms, then fission 550 ms, 3 plates)

| | frames | mean / p95 / max interval | >20 ms | `paint()` mean / max | layout | style recalc |
|---|---|---|---|---|---|---|
| Chromium 390 | 126 | 7.8 / 10.4 / 10.9 ms | 0 | 0.155 / 0.4 ms | **0** | 132 (one per frame) |
| Chromium 1440 | 132 | 7.4 / 8.8 / 9.9 ms | 0 | 0.209 / 0.4 ms | **0** | 140 |
| WebKit 390 | 96 | 10.2 / 12 / 13 ms | 0 | 0.22 / 1 ms | n/a | n/a |
| WebKit 1440 | 96 | 10.2 / 13 / 13 ms | 0 | 0.31 / 1 ms | n/a | n/a |

The Chromium figures come from CDP `Performance.getMetrics` across the run. Total style-recalc time
was 11–14 ms over the second, and total script 12–19 ms.

**What the morph forces:**

- one style recalc a frame;
- no layout (the `getBoundingClientRect` reads land on a clean layout);
- a repaint of the N + 3 clipped layers;
- a re-raster of the 10px shadow blur, which is the biggest paint item. Headless CDP doesn't break
  out raster time.

The frame intervals are headless-shell frame pacing and do not stand in for a device.

## 7. Accessibility (constraint h), both engines

From the harness's `a11y()`:

- **Tab order.** Split and fused are identical: Home → Search → Dark theme (one stop per toolbar,
  roving).
- **Tree.** The role, name and inert census of every control is identical (`sameTree: true`).
- **Focus.** With focus on "Bookmark", a fuse leaves focus on "Bookmark" at 90 ms and again after
  settle.

The cluster never touches focus, `inert`, DOM order or roles. Its layers are `aria-hidden` and
`pointer-events: none`. Presses between controls are still absorbed by each dock's own (now
paintless) `.dock-plate`.

## 8. Hard constraints

| | status | evidence |
|---|---|---|
| (a) no SVG `filter: url()`, no filter over a backdrop-filter; useDockFission stays deleted | met | The only `filter` is the shadow blur, on a branch that holds no backdrop-filter. No `url()` filter. No fission file is revived. |
| (b) each plate keeps its own backdrop-filter; shape/position only | met in Chromium; WebKit blur not witnessable in Playwright | N plate layers, each with its own `backdrop-filter` the whole time. Only `clip-path` changes. Probe std 0.6–2.9 under the bridge. |
| (c) `springPreset("dock")`, no literal; PRM cross-fade | met (PRM is a fade-through, see §2) | `DOCK_SPRING` via `useDockSpring` |
| (d) no % radius on a non-square box | met | Every sampled layer computes `border-radius: 0px`, and every clip string is px (`clipHasPct: false`, 16/16 cells) |
| (e) works in paint in Chromium and WebKit, or fails loud | Chromium met. WebKit: the shape is met, the blur is unwitnessed | §3 table. The Safari app cell is owed. |
| (f) KISS, composes the existing dock | one SFC (≈200 lines), one pure shape module (≈150), one CSS partial | GlassDock unchanged: its plate paint stands down by a cluster-scoped selector |
| (g) one material, no doubled edge or shadow | met in Chromium | §4 |
| (h) roles, names, tab order, focus | met in both engines | §7 |

## 9. Open, for the measurer and the spec

1. **The WebKit blur.** Bank the Safari-app cell (safaridriver). Expect the self-clip to hold, since
   WebKit's backdrop-root rules are not Chromium's, but don't assume it.
2. **The earned darken.** Each GlassDock's luminance observer writes `--glass-backdrop-luma` on its
   own root. The cluster's plates are not its descendants, so they sit on the calm floor. A fused
   run should read ONE luma (the run's mean) for all its shares, or the ink steps at the seam. That
   is a few lines: the cluster reads each child's luma and writes the run mean on its shares.
3. **The collapse ink tier.** The dock lerps its ink between its collapsed and expanded rungs. The
   cluster's plates hold `--glass-veil-dock`. A fused run shares one tier, by the same argument.
4. **The grasp register** lives on `.dock-plate`, whose paint stands down. Its carriers still mount,
   but a hold paints over a paintless plate. The register should re-home onto the share layer.
5. **Neck lifetime.** About 6 frames as tuned. Set `JC`/`v` to the 2-frame iOS bound if the spec
   holds to DOCK-LADDER §3.
6. **Not built:**
   - a wrapped layout: daraksha stacks its plates in two rows under 38.2rem, and a join between
     rows is out of scope; render it split;
   - a vertical cluster;
   - ancestor CSS `zoom`: `path()` is px, so a zoomed ancestor needs the `k` factor `dockMorphMeasure`
     already derives.
7. **Collapse tracking is wired but not captured.** It's the `data-morphing` follow. The fixture's
   docks are `:collapse="false"`, as daraksha's are.

## Files

- `proposal-B/prototype.patch`: the diff (worktree at master `0778c4090`). New files:
  - `src/components/dock/DockCluster.vue`
  - `src/components/dock/composables/dockClusterShape.ts`
  - `src/components/dock/styles/cluster.css` (imported from `styles/index.css`, exported from
    `dock/index.ts`)
  - `demo/fixtures/dock-cluster.{html,ts}`
  - `demo/fixtures/DockClusterFixture.vue`

  The `paint()` timing counter in `DockCluster.vue` is harness instrumentation and is struck in the
  wave. `vue-tsc -p tsconfig.src.json` is clean.
- `proposal-B/scripts/`:
  - `capture.mjs`: captures, seam, probe, cost and a11y, starting and stopping its own vite inside
    one guarded browser run;
  - `wk-control.mjs`: the static backdrop-root control;
  - `bisect.mjs` and `look.mjs`: diagnostics.
- `proposal-B/controls/chromium-control-*.png`: the static Chromium control.
- `proposal-B/{chromium,webkit}/*-results.json`: raw numbers. `proposal-B/logs/`: run logs.
