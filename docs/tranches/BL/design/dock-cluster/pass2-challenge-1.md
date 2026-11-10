# Dock cluster · pass 2 challenge, round 1

| field | value |
|---|---|
| seat | a fresh adversarial challenger, pass 2 round 1. I wrote nothing else in `design/dock-cluster/` |
| model | `claude-opus-5-5`, asserted from own system identity |
| read | W-I.8 as it stands, `pass2-build.md`, `fold.md`, `orchestrator-note-one-dock.md`, `orchestrator-note-prm.md`, `docs/precepts/restraint.md`, `pass2/prototype.patch`, the pass-2 fixture and probe; daraksha `o1109-dock` `src/shell/SiteDock.vue` and `src/scripture/ReaderDock.vue` (read-only) |
| base | master `09fa848bf` (its `src/` equals `a1573a54e`'s). Scratch worktree `.claude/worktrees/bl/cluster/challenge2-r1` with `pass2/prototype.patch` applied, removed after this record was written |
| harness | `pass2-challenge-1/tools/probe.mjs` is the pass-2 probe, unchanged, plus seven parts: `interrupt`, `trigger`, `g8glide`, `restraint`, `sitedock`, `reader`, `mseam`. The fixture `pass2-challenge-1/fixture/` is pass 2's plus three switches: `bind=1` (the §5 trigger `fused = !dock.expanded`, nothing set by hand), `sitedock=1` (daraksha's `.site-dock` rule on the cluster root, as §5's "after" puts it), `reader=1` (daraksha's real reader row in the "page" face) |
| engines | headless Chromium (Playwright headless shell) and Playwright WebKit 26.5, guarded, one browser per run, a new context per cell; WebKit under `--exclusive webkit`. The unit test under `guarded --light`, vitest `--maxWorkers=2` |
| records | `pass2-challenge-1/data/`, `logs/`, `png/`. Runners `tools/run-chromium-1.sh` (c1) and `tools/run-2.sh` (c2) |

## Verdict

Seven findings stand, each demonstrated below in both engines unless a row says otherwise. Three block the wave: the §5 trigger moves the theme out from under the reader's pointer (C1); an interrupted swap jumps the silhouette's end 105 px in one frame (C2); and daraksha's real placement is broken by the cluster's own grid write (C4). The rest are a momentum loss on every glide interrupt (C3), daraksha's real reader row overflowing at 612–660 px (C5), I8-G8 going RED over a daraksha page change (C6), and an I8-G5 unit test that cannot bite on three of the five spring sites (C7). Two gate-wording drifts follow as notes. I could not refute the rest. The seam during motion at fractional ratios, the capsule in every frame, share overlap and the Tab walk all hold (§ Not refuted).

## Findings

### C1 · The §5 trigger slides the theme out from under the reader's pointer

`fused = !dock.expanded` fissions the theme out when the reader reaches the dock. The theme is a separate member, though, so a pointer resting on it has left the dock. GlassDock schedules its collapse (`useDockState` `onMouseLeave` → `scheduleCollapse`), the join fuses, and the theme glides 73 px back while the pointer rests.

Cell `trigger`, real clock, real pointer, `bind=1`. The pointer goes to the collapsed dock, waits 1.3 s, moves onto the theme button and rests there. Every 400 ms the cell reads what lies under the pointer:

| | theme button left: rest → reached | under the pointer, 0.4 – 2.8 s | under the pointer, 3.2 s | 3.6 – 4.8 s |
|---|---|---|---|---|
| after (cluster), 1440, Chromium | 733 → 806 | "Dark theme" | `dock-cluster` (theme at 779, collapsing) | `dock-cluster`, `stage`; theme at 733 |
| after, 1440, WebKit | 733 → 806 | "Dark theme" | `dock-cluster` (theme at 802) | theme at 733 |
| after, 390, both | 208 → 281 | "Dark theme" | `dock-cluster` (Chromium) / still the theme at 277 (WebKit) | `stage`; theme at 208 |
| before (11.0.0, the theme in `#persistent`), 1440 and 390, both | 677 → 608 | "Dark theme" | "Dark theme" | "Dark theme" through 4.8 s; the dock stays expanded |

The 11.0.0 composition keeps the theme under the pointer, because the theme sits inside the dock's hover region. The cluster loses it at both widths in both engines, about 3.2 s after the reader reaches for the theme, the one control the fission exists to present. A tap that lands then hits bare page. Data: `data/chromium-c2.json` and `data/webkit-c2.json`, `cells.trigger`.

The keyboard path does not show this. A Tab onto the collapsed summary does not expand the dock, and the next Tab reaches the theme with no motion, in both engines (the Tab walk below).

**What it needs.** The trigger has to hold while the pointer or focus is anywhere in the cluster, not only in the dock: the cluster's hover and focus keep the dock open, or the theme member's hover calls the dock's `keepOpen`. W-I.8 §5 states the trigger and the fixture never ran it, because every pass-2 cell sets `fused` by hand.

### C2 · An interrupted swap jumps the silhouette's end 105 px in one frame

The swap goes out (the tool run leaves, so a closing phantom holds its place), and 42 ms later it comes back in (the run arrives again). On every membership change `observe()` disposes every live phantom (`phantoms.forEach((ph) => ph.spring.dispose()); phantoms = [];`). The part of the gap still closing vanishes in one frame, and the arriver opens from zero.

Cell `interrupt`, virtual clock, 1440 light, glass read from the lens shares only and tracked by member label, so a member-count change cannot misalign it (no frame had a lens-count mismatch):

| episode | the silhouette's right end (the theme's outer edge), velocity px/frame around the interrupt | largest step |
|---|---|---|
| out, then in at 42 ms | −8.56, −9.36, **−104.88**, +7.18, +7.10 | 104.9 px, 76.6 % of its travel; Chromium and WebKit to 0.04 px |

I8-G18 requires every member's glass to move ≤ 8 % of its travel per frame. Pass 2 never ran an interrupted swap. Captures: `png/chromium-c2-interrupt-swap-out-then-in@42-1440-f{4,5,6}.png` (each crop is fitted to its own frame, so compare the numbers, not the crops).

### C3 · Every interrupted glide drops its momentum: a one-frame stall, then full speed the other way

`startGlide` re-bases an interrupted glide at `p = 0` from its painted extent, then `playTo(0, 1)` carries the old spring's velocity in `p` units (no `inheritVelocityScale`) onto a span that now points the other way. So the edge stops dead for a frame and then leaves at full speed in reverse. The cleanest witness is a face-swap reversal with no membership change (`toolrun=0`), the silhouette's left end (the dock's outer edge), in px per frame:

| engine | before the interrupt | the interrupt | after | the spring's own Δv per frame afterwards |
|---|---|---|---|---|
| Chromium | −4.72, −4.37 | **0, +6.17** | +3.52, +3.59 | ≤ 0.26 |
| WebKit | −4.72, −4.37 | **+6.17, 0** | +3.52, +3.59 | ≤ 0.26 |

An edge travelling outward at 4.4 px/frame is travelling inward at 6.2 px/frame one or two frames later. The spring that then carries it changes speed by at most 0.26 px/frame per frame, so a trajectory that kept its momentum would take about 40 frames to make that turn. With the tool run present the same edge reads −8.41 → 0 → +9.99 (`swap-in-then-out@83`, the dock's left end, both engines).

R-11 requires velocity continuity of the joins (fold F9: 6.72 → 6.16 → 5.56 /s through an interrupt), and the motion canon requires inertia. The glides, which the swap and every page change ride, meet neither. The cure is to keep `p` and retarget, or to carry the edge velocity in px and convert it to the new span.

### C4 · Daraksha's real placement: the cluster's grid write overrides the `.site-dock` gutter, shifts the row and raises a false overflow error

§5's "after" puts `class="site-dock"` on the cluster root. Daraksha's rule is `position: fixed; inset-inline: var(--gutter)` (16 px), unlayered, so it beats `cluster.css`'s `position: relative`. `regrid()` writes the first member's sub-pixel remainder as `el.style.left`. On a fixed root, `left` is the inline-start inset, so it replaces the 16 px gutter with −0.67 px or 0. The root then widens by 16.7 px, and its `justify-content: center` row moves left by half that. The overflow check then compares a root that starts at −0.67 against its host and fires.

Cell `sitedock`, at rest, the fixture's real `.site-dock` rule, Chromium (WebKit identical to 0.02 px):

| | root `left` (computed) | root | row centre − viewport centre | console |
|---|---|---|---|---|
| after, 1440 collapsed | **−0.671875px** | −0.67 … 1424 | **−8.34** | `DockCluster: the row needs 1424.6px and its container gives 1440.0px; compose two rows` |
| after, 1440 expanded | **0px** | 0 … 1424 | **−8.00** | – |
| after, 390 collapsed | 16px | 16 … 374 | 0 | – |
| after, 390 expanded | **−0.671875px** | −0.67 … 374 | **−8.34** | `the row needs 374.6px and its container gives 390.0px` |
| before (div.site-dock), every cell | 16px | 16 … 1424 / 374 | 0 | – |

Three defects follow from that one write. The dock sits 8 px off centre. At 390 it steps 8.3 px sideways when it expands, because the write lands in one state and not the other. And R-10's error fires falsely: the row needs less than it is given, yet the root is marked `data-overflow`. WebKit adds "ResizeObserver loop completed with undelivered notifications" in these cells, the open item of P2 §8.

The grid's sub-pixel offset belongs on something the cluster owns, such as a translate on the members or an inner wrapper, never on an inset of a root that the consumer positions. §5's own placement note says the placement moves onto the cluster root.

### C5 · Daraksha's real reader row overflows from 612 to about 660 px

Pass 2's fixture "page" face holds two icon controls. Daraksha's reader face (`ReaderDock.vue`, `o1109-dock`) shows its full row above its `narrow` query, `max-width: 38.2rem` (611 px): Surah, previous, next, a separator, Focus/Verses/Page, a separator, and Text. Cell `reader` puts that row in the fixture, with the dock expanded, on its "page" face:

| width | before: row / container | after: row / container | after, console |
|---|---|---|---|
| 360, 390 | 260.8 / 328, 358 | 289 / 328, 358 | – |
| **612** | 580 / 580 (fits) | **626 / 580**, glass from x = −7 | R-10 error, `data-overflow` |
| **640** | 598.8 / 608 (fits) | **627 / 608**, glass from x = 6 | R-10 error, `data-overflow` |
| 700, 1440 | 600.9 / 668, 625.2 / 1408 | 629 / 668, 654 / 1408 | – |

Both engines give the same numbers (WebKit within 0.1 px). The theme member costs 26–28 px over the persistent seat (its own plate padding plus the 10 px join gap). Daraksha's full reader row fits from 612 px up today, and on 11.2.0 it would overflow its gutter from 612 to about 660 px. §5 says "it fits at 390 in the fixture", which is true and does not test the reader. Daraksha has to move its `narrow` breakpoint by about 2 rem, or the theme member's cost has to come down. Either way §5 should say so.

### C6 · I8-G8 is RED over a daraksha page change, from the cluster's own glide clip

A gliding member's `.dock-face-content` gets an inline `clip-path: inset(…)` from the cluster. On daraksha's pages face the open page's seat is an active `.glass-capsule` with its own `backdrop-filter: blur(20px) saturate(1.5)`. So during a page change, a backdrop-filtered control has a clip-path ancestor, which I8-G8 forbids.

Cell `g8glide`, virtual clock, 60 frames from the swap, 1440:

| episode | pass 2 | 11.0.0 (`nocluster=1`) |
|---|---|---|
| pages → page (the fixture's page face) | 60 / 60 frames hit: `dock-icon-button.glass-specular-track ← dock-face-content: clip-path inset(-24px -25.3px -24px -24.35px)` | 60 / 60 hit: `← dock-face: opacity 0.950` |
| pages → page, the real reader row | 60 / 60: `← dock-face-content: clip-path inset(-24px 166.89px -24px 167.61px)` | 60 / 60: `← dock-face: opacity 0.950` |
| value's swap in (no active control) | 0 / 60 | 0 / 60 |

Both engines give the same result.

- **The cluster's half.** Pass 2 declines to clip the arriver's controls on exactly this ground ("an ancestor clip over the arriver's controls, which I8-G8 forbids while a control carries its own `backdrop-filter`", P2 §2 and §8), but it writes the same clip on the glider. The swap fixture has no active control, which is why pass 2's reads never saw it.
- **Master's half.** DockCrossfade's face opacity puts the active seat under an `opacity < 1` ancestor on every face swap, so I8-G8's opacity arm as written cannot pass any page change, with or without the cluster. The gate needs a ruling: either it is scoped to the cluster's own writes, or the active seat's nested blur goes first (O-203, which pass 2 books to 12.0.0).

### C7 · The I8-G5 unit test cannot bite on three of the cluster's five spring sites

R-11 says every spring the cluster mints (per join, survivor glide, width glide, arriver and phantom) is handed `DOCK_SPRING` itself, and that the unit test covers it. The test mounts the cluster on three bare divs and waits 20 ms. No membership change and no width change happens, so it sees only the per-join springs. Planting `useDockSpring({ response: 0.3, dampingFraction: 0.88 })` at the glide, the survivor offset and the phantom (`data/g5-plant.diff`) leaves the test green: `logs/g5-plant-literal-in-glide-offset-phantom.log`, 1 passed, rc 0 (clean run `logs/g5-clean.log`, also passing). The test must drive a membership change and a width change before it reads.

## Notes on the gates (measured, not defects in paint)

- **I8-G18 as written reads RED on an uninterrupted swap out.** Its arm reads "every member's glass", which pass 2 takes as the lens shares. At a membership change the cut between two shares moves to the middle of the closing phantom: in the first frame of a swap out, the dock's share right edge moves −61.5 px and the theme's left edge −60.5 px (both engines, `interrupt` cells, frame 0). Paint does not show this, since one ink and equal kernels make the cut invisible. Pass 2's "9.65 px" for "out" comes from a summary that drops the frame where the member count changes (`summarize`'s `glassStep` filters on the last frame's count, and `glassFirst` pairs members by index across the change). The gate should read the silhouette's outer ends and each member's control box, by label.
- **I8-G4's clip arm and the probe disagree.** The gate reads "0 `%` in any clip string" of the cluster's own writes. The build writes `inset(50%)` every frame on N − 1 tone lenses that paint nothing, and each still carries a `backdrop-filter` (`DockCluster.vue`: `i === 0 ? path(silhouette) : "inset(50%)"`). The pass-2 probe exempts exactly that string (`FRAME_READ`: `!/^inset\(50%\)$/`). Mint one tone element, not N (KISS, (f)), and the exemption goes.

## Not refuted

- **The seam during motion at fractional ratios** (`mseam`: collapse, fuse and swap in, frozen at 100, 200 and 400 ms, DSF 1.25, 2.2 and 2.625, light and dark, 1440, every contacted cut, rows top + 8, mid and bottom − 8). WebKit reads 0 in all 53 cells it ran. The 54th, DSF 2.625 dark swap-in at 400 ms, timed out at `page.goto` and has no reading. Chromium reads ≤ 1.4 in 53 of 54 cells. The 54th reads 6.5 (fuse, DSF 2.625 dark, 100 ms, j = 0.714), and the capture (`png/chromium-c2-mseam-fuse-dpr2.625-dark-t100.png`) shows its top row above the opening neck, on the neck's rim, so it is not a seam.
- **The capsule in every frame.** 0 `%` radii and 0 elliptical radii in every frame of every `interrupt` cell, both engines.
- **Share overlap** stays ≤ 0.2 px through every interrupt.
- **Tab order.** With `bind=1` the walk is sentinel → "Name: open the dock" → the theme, in both engines at both widths. The focused control never moved and no control left the tree.
- **The motion of an uninterrupted expand, collapse and swap**, and O-198's one geometry change, I did not re-run. Pass 2's numbers stand unchallenged here. The ≤ 144 ms arm is RED by pass 2's own record (P2 §5).
- **Restraint, measured and already booked.** Inside the fused plate there are two blur values: the lenses' `blur(16px)` and the active seat's `blur(20px) saturate(1.5)`, in both themes, on the pages face and the reader face (`restraint` cells, Chromium). P2 §6 books that capsule to O-203 in 12.0.0, so it is not counted as a finding here. Its specular `::before` radial gradients are present on every icon button, but this read did not establish that they paint at rest.
