# Dock state changes that jump today (glass 11.0.0, daraksha prod 8741c0a)

For the orchestrator to send glass (GLASS REPLY 5: 11.0.1 squared end; 11.2.0 every dock state change animates plate width and height on the dock spring, eased ends, round on every frame). Measured by `~/.dev-logs/owner-1111/shell/shell-probe.mjs` (legs `collapse`, `geometry`), served from https://daraksha.babb.dev, Chromium headless, rAF samples of `.dock-plate` (rect + four computed corner radii) and of `::view-transition-group(site-dock)`. Two runs: `runs/prod-red1/report.json`, `runs/prod-red2/report.json`. Per-frame strips: the `seriesExpand` / `seriesCollapse` arrays in those reports ([ms, width, height, [tl,tr,br,bl], dock-run overflow]); frames `runs/prod-red1/collapse-*-rest.png` / `-open.png`.

Targets (PLAN G-1/G-2): four equal corners = half the height on every frame; largest per-frame step <= 12 % of travel; first step <= 4 %, last <= 2 %.

## 1. Resting collapsed plate: squared right end (G-1, 11.0.1)

| run | width | scheme | page | collapsed size | corners [tl,tr,br,bl] | .dock-run overflow |
|---|---|---|---|---|---|---|
| red1 | 1440 | light | / | 102x56 | [30, 4, 4, 30] | 210 |
| red1 | 1440 | light | /scripture/93 | 102x56 | [30, 4, 4, 30] | 438 |
| red1 | 1440 | dark | / | 102x56 | [30, 4, 4, 30] | 210 |
| red1 | 1440 | dark | /scripture/93 | 102x56 | [30, 4, 4, 30] | 438 |
| red1 | 390 | light | / | 102x56 | [30, 4, 4, 30] | 203 |
| red1 | 390 | light | /scripture/93 | 102x56 | [30, 4, 4, 30] | 200 |
| red1 | 390 | dark | / | 102x56 | [30, 4, 4, 30] | 203 |
| red1 | 390 | dark | /scripture/93 | 102x56 | [30, 4, 4, 30] | 200 |
| red2 | 1440 | light | / | 102x56 | [30, 4, 4, 30] | 210 |
| red2 | 1440 | light | /scripture/93 | 102x56 | [30, 4, 4, 30] | 438 |
| red2 | 1440 | dark | / | 102x56 | [30, 4, 4, 30] | 210 |
| red2 | 1440 | dark | /scripture/93 | 102x56 | [30, 4, 4, 30] | 438 |
| red2 | 390 | light | / | 102x56 | [30, 4, 4, 30] | 203 |
| red2 | 390 | light | /scripture/93 | 102x56 | [30, 4, 4, 30] | 200 |
| red2 | 390 | dark | / | 102x56 | [30, 4, 4, 30] | 203 |
| red2 | 390 | dark | /scripture/93 | 102x56 | [30, 4, 4, 30] | 200 |

Every collapsed rest reads [30, 4, 4, 30] with the hidden run still overflowing: the cut cap (O-205). At 390 the OPEN plate on the pages layer is squared too (`openAt.round` false, `squaredFramesExpand` 105-109 of the expand's frames).

## 2. Collapse and expand (G-2, 11.1.0 / 11.2.0)

| run | width | scheme | page | expand W max/first/last | collapse W max/first/last | height | squared frames (expand / collapse) |
|---|---|---|---|---|---|---|---|
| red1 | 1440 | light | / | 0.075/0.05/0.001 | 0.132/0.001/0.001 | constant | 5 / 283 |
| red1 | 1440 | light | /scripture/93 | 0.082/0.05/0.001 | 0.113/0.001/0.001 | snaps 56<->60 in ONE frame both ways | 7 / 282 |
| red1 | 1440 | dark | / | 0.078/0.05/0.001 | 0.081/0.001/0.001 | constant | 5 / 282 |
| red1 | 1440 | dark | /scripture/93 | 0.078/0.05/0.001 | 0.113/0.001/0.001 | snaps 56<->60 in ONE frame both ways | 7 / 283 |
| red1 | 390 | light | / | 0.075/0.05/0.001 | 0.133/0.05/0.001 | constant | 109 / 779 |
| red1 | 390 | light | /scripture/93 | 0.074/0.05/0.001 | 0.129/0.001/0.002 | snaps 56<->60 in ONE frame both ways | 109 / 781 |
| red1 | 390 | dark | / | 0.132/0.05/0.002 | 0.137/0.05/0.001 | constant | 105 / 776 |
| red1 | 390 | dark | /scripture/93 | 0.072/0.05/0.001 | 0.074/0.001/0.001 | snaps 56<->60 in ONE frame both ways | 109 / 781 |
| red2 | 1440 | light | / | 0.075/0.05/0.001 | 0.127/0.001/0.004 | constant | 5 / 283 |
| red2 | 1440 | light | /scripture/93 | 0.078/0.05/0.001 | 0.115/0.001/0.001 | snaps 56<->60 in ONE frame both ways | 7 / 284 |
| red2 | 1440 | dark | / | 0.069/0.05/0.001 | 0.128/0.001/0.001 | constant | 4 / 283 |
| red2 | 1440 | dark | /scripture/93 | 0.139/0.05/0.001 | 0.131/0.001/0.002 | snaps 56<->60 in ONE frame both ways | 7 / 283 |
| red2 | 390 | light | / | 0.14/0.05/0.001 | 0.255/0.05/0.003 | constant | 97 / 753 |
| red2 | 390 | light | /scripture/93 | 0.112/0.05/0.001 | 0.191/0.001/0.001 | snaps 56<->60 in ONE frame both ways | 106 / 779 |
| red2 | 390 | dark | / | 0.074/0.05/0.001 | 0.074/0.05/0.002 | constant | 109 / 781 |
| red2 | 390 | dark | /scripture/93 | 0.079/0.05/0.001 | 0.07/0.001/0.001 | snaps 56<->60 in ONE frame both ways | 109 / 781 |

Jumps: (a) the expand's first moving frame is 5 % of travel (target <= 4 %), after a frame where the corners flip from [30,4,4,30] to round at once; (b) collapse peaks at 13 % per frame at 390 and 1440 (target <= 12 %); (c) on /scripture/93 the plate's height changes 56 -> 60 px (expand) and 60 -> 56 px (collapse) in a single frame, no interpolation; (d) the right end is squared for the whole collapse and at rest.

## 3. Layer swap (pages <-> controls) and page change (G-3 / G-4)

Page change, prod: the dock's group carries its rect on 210 ms (`--route-lateral-clock`): largest per-frame width step 0.27-0.46 of travel at 1440 (frames 9-17). Cold name -> portraits: the group's width is non-monotone (largest step 1.16-1.49 of the net travel), i.e. the plate re-fits inside the transition when PortraitsDock arrives late. daraksha's side is cured on branch o1111-shell (controls load with the page; the group rides the page clock); the native resize when a live layer's content changes is G-4.

Rows 9 (reader seat set), 7 (Motion's persistent-end seat by v-if) and 3/4 (layer in/out size morph) have no daraksha-side transition: each re-fits at once outside a view transition. G-4 / G-5 / 11.2.0.

