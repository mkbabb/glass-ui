# Dock cluster · pass 2 challenge, round 2

| field | value |
|---|---|
| seat | a fresh adversarial challenger, pass 2 round 2. I wrote nothing else in `design/dock-cluster/` |
| model | `claude-opus-5-5`, asserted from own system identity |
| read | W-I.8 as it stands (with `pass2-fold-1/W-I.8.patch` applied, and `W-I.8-resume.patch` read as pending), `pass2-build.md`, `pass2-challenge-1.md`, `pass2-fold-1.md`, `fold.md`, both orchestrator notes, `docs/precepts/restraint.md`, `pass2/prototype.patch` (the one-clock build), the fold-1 fixture and probe; daraksha `o1109-dock` `src/shell/SiteDock.vue` and `ThemeControl.vue`, value.js `demo/shell/dock/Dock.vue` (read-only) |
| base | master `0dbbb383a`. Scratch worktree `.claude/worktrees/bl/cluster/challenge2-r2` with `pass2/prototype.patch` applied (clean), removed after this record was written |
| harness | `pass2-challenge-2/tools/probe.mjs` is the fold-1 probe, unchanged, plus four parts: `clickhold`, `twocol`, `interrupt2` (read in the browser's own "post" order, PF1 §R), `shade`. `tools/continuity.py` is I8-G18's interrupt arm, with one line added so an 11.0.0 control (no lens shares) is skipped. The fixture `pass2-challenge-2/fixture/` is fold-1's plus `twocol=1` (the theme member `collapse="closed"`) and `vcol=1` (value's dock as it ships on desktop, `collapse="open"`) |
| engines | headless Chromium (Playwright headless shell) and Playwright WebKit 26.5, guarded, one browser per run, a new context per cell; WebKit under `--exclusive webkit`. Builds under `guarded --light` |
| records | `pass2-challenge-2/data/`, `logs/`, `png/`. Runners `tools/run-c2.sh` (`c2a`, `c2rest`) and `tools/run-c2b.sh` (`c2b`, `c2v`) |

## Verdict

Four findings stand, each demonstrated in both engines. Two block the wave. After any click inside the cluster, the dock never collapses again until focus leaves it, where 11.0.0 collapses 3.5–4.0 s after the pointer leaves (D1). A collapse that lands while a width glide is live drops the glide at the collapse's start and repaints it stale at the collapse's settle: the collapsed row's glass balloons from 130 px to 249 px in one frame, then glides back over 34 frames (D2). The other two: R-8's "a second collapsible member throws, naming both" is not in the build, and that cluster paints half its silhouette as bare field with no error (D3); and the active seat's specular gleam still paints inside the fused plate (D4, master's, the same class as PF1 C6). One note attributes a momentum break to GlassDock's own morph, not to the cluster. I could not refute the rest: the fractional-ratio seam at rest, the capsule in every frame, the swap and its double reversal, and value's real collapsible dock (§ Not refuted).

## Findings

### D1 · After a click in the cluster, the dock never collapses (R-13)

R-13 holds every member open while "the pointer or focus is anywhere inside" the cluster. A click on a dock control leaves focus on that control: GlassDock's run seats focus on press (`useDockRun.ts:322`), in WebKit as in Chromium. So once the reader has clicked anything in the cluster, `focusIn` stays true after the pointer has gone, and the hold never releases. A lone GlassDock counts only the pointer here: `onMouseLeave` schedules the collapse with focus still inside.

Cell `clickhold`, real clock, real pointer, `bind=1` (§5's trigger). The pointer reaches the collapsed dock and waits 1.3 s (the dock expands), moves onto a control and clicks it, then moves to the bare page at the top of the viewport. Then I sampled `expanded` and `document.activeElement` every 500 ms for 8 s:

| composition | clicked | focus after the click (Chromium / WebKit) | dock collapses after the pointer leaves (Chromium / WebKit) |
|---|---|---|---|
| 11.0.0 (theme in `#persistent`) | the theme | "Dark theme" / body | **4.0 s / 3.5 s** |
| 11.0.0 | "Colour" (turns to the page face) | a dock element / a dock element | **4.0 s / 3.5 s** |
| cluster, stage | the theme | "Dark theme" / "Dark theme" | **never** (expanded at 8.0 s, both) |
| cluster, stage | "Colour" | a dock element / a dock element | **never** |
| cluster, daraksha's `.site-dock` | the theme, "Colour" | as above | **never** |

The same holds at 1440 and at 390 (24 cells; `data/{chromium,webkit}-c2a.json`, `cells.clickhold`). With focus the same as 11.0.0's ("Colour", both engines), 11.0.0 collapses and the cluster does not, so the cause is R-13's focus term. The keyboard cells in PF1 C1 cannot show this, because a keyboard reader really is in the cluster.

On daraksha the theme is the control the fission exists to present, and the most frequent click. After one tap on it the dock stays expanded, with the theme fissioned out, until the reader clicks somewhere else. That leaves the dock open over the page indefinitely. The hold should follow the lone dock's rule: the pointer holds, and focus holds only while the pointer has not left. Or focus holds only when it arrived by keyboard (`:focus-visible`). I8-G19 needs a cell where the pointer clicks and then leaves, gated on the 11.0.0 timing.

### D2 · A collapse during a width glide jumps the silhouette twice, the second time by 59.5 px

The case is a page change, which glides the dock's width (R-7), followed 42 ms later by a collapse, such as Escape or a click-away. While a member is under its own morph, `paint()` skips its glide (`if (… morph[i] …) return`) and draws it from its scaled rect. The glide springs keep stepping in `tick` toward the expanded page face's box, but they are never retargeted. When the morph settles and `data-morphing` clears, the member is drawn from the stale glide again.

Cell `interrupt2`, virtual clock, 1440 light, "post" order, the silhouette's outer ends from the lens shares (`onedock-pagechange-then-collapse@42`):

| frame | silhouette (outer ends) | dock member box | step |
|---|---|---|---|
| 4 (gliding) | 583.41 … 856.69 | – | – |
| 5 (collapse starts, `data-morphing`) | 598.96 … 842.95 | – | **+15.55 / −13.74 px** |
| 69 (collapsed, still morphing) | 655.5 … 785.5 (130 px) | 655.5 … 711.5 | – |
| **70 (morph settles)** | **596 … 845 (249 px)** | 655 … 711 | **−59.5 / +59.5 px** |
| 71 → 104 | glides back to 655 … 785 | 655 … 711 | ≤ 4.1 px |

At frame 70 the collapsed dock's 56 px box sits inside 180 px of glass (its share 596 … 776), and the theme is moved 59.5 px out with it. Then it all glides back for 34 frames (283 ms). Chromium and WebKit read the same to 0.01 px. I8-G18's continuity arm reads RED at the collapse's start by +12.44 (L) / +10.69 (R) in both engines. The jump at frame 70 lies outside that arm's window, k − 1 … k + 6, so the arm as written does not see it. Frame 70's jump is 81 % of the end's travel, against G18's 8 %.

The 11.0.0 control (`v1100-pagechange-then-collapse@42`, `data/chromium-c2b.json`, `webkit-c2a.json`) steps once, at the face swap (13.5 px at frame 0, the known 11.0.0 step), and has no jump at its settle. Both of the cluster's jumps are its own. A member's glide has to be retargeted, or folded into the morph, when a morph starts, and re-based on the morph's last painted extent when it ends. The G18 interrupt list also needs a morph that interrupts a glide, and its arm has to read the whole episode, not only the frames next to the act.

### D3 · Two collapsible members mount silently and paint half the silhouette bare (R-8)

R-8 says: "At most one member of a cluster may be collapsible. The cluster asserts this on mount and on every membership change, and throws an error that names both members." I8-G17 lists the throw as a pass arm. `DockCluster.vue` has no such check. Cell `twocol` (the theme member `collapse="closed"`), 1440, flat field:

| | Chromium | WebKit |
|---|---|---|
| errors on mount | 0 | 0 (one "ResizeObserver loop …" warning, the known pass-2 §8 item) |
| both members expand in one tick, at 83 ms | both `data-morphing`, k = 0.72 / 0.95 | the same |
| ink across the row's midline (luminance, flat field 232) | dock share 203.5; **theme share 231**, bare | dock share 204.4; **theme share 232**, bare |

Capture: `png/{chromium,webkit}-c2a-twocol-both-expand-t83.png`, a square-cut capsule that is half ink and half field. The painter falls back to member 0 (`Math.max(0, morph.findIndex(…))`), whose box clips its plate to its own box, so the second share is never inked. This is the very band R-8 rules out, painted with no error. Constraint (e) asks for paint or a loud failure, and this is neither.

### D4 · The active seat's specular gleam paints inside the fused plate (restraint)

Restraint: "zero `radial-gradient` or gleam layers on controls, cards and docks." Cell `shade` reads every painted element and pseudo in the cluster subtree. In the expanded pages face, the active seat's `::before` (`dock-icon-button.glass-specular-track`) is `radial-gradient(22% 22%, oklch(0.947 0.014 84.4 / 0.5) 0%, transparent 70%)` and paints at rest at opacity 0.16 in light and 0.12 in dark, in both engines. The other seats' gleams sit at opacity 0. 11.0.0 paints the same gleam (`v1100-expanded` cells). PF1 C6 stood down the active seat's nested blur inside a cluster on the same restraint ground, so a cluster that claims one restrained material should stand the seat's gleam down too, or the gleam has to go from GlassDock. It is master's either way; I record it because the fused plate is the surface the owner's bar names. The shadow count is right: inside the cluster the members carry no `box-shadow`, where 11.0.0's lone dock carries 4 layers. The blur values are one kernel, `blur(16px)`, and one tone.

## Note · GlassDock's own morph loses momentum on a reversal (not the cluster's)

Expand interrupted by a collapse at 42 ms or 83 ms, collapse interrupted by an expand at 83 ms, and expand interrupted by a page change at 83 ms: the dock's outer edge goes −5.06, −6.38, −0.96, +0.05 px/frame through the reversal, and I8-G18's continuity bound reads RED by +1.65 to +8.2 in every one-dock cell, in both engines. The 11.0.0 control (`v1100-*`, no cluster) reads the same velocities to 0.01 px: −5.06, −6.38, −0.96 (expand, then collapse at 42 ms), and −4.09 → +5.28 (expand, then page change at 83 ms; the cluster reads +5.77). So the break is GlassDock's own collapse morph, and the theme rides it faithfully. It is not a cluster defect. It matters for the owner's bar on "the one-dock shape collapsing and expanding", though, and I8-G17 runs no reversal, so a gate passes over it. It belongs to the dock's morph, not to W-I.8.

## Not refuted

- **The flat seam at fractional ratios, at rest** (I8-G1's cells, DSF 1.25, 2.2, 2.625; 390 and 1440; light and dark; collapsed, expanded, swap; 36 cells per engine). WebKit 0 / 0 in all 36. Chromium line ≤ 0.9, tone 0. Corner r = 28 = h/2 in all 72 (`data/*-c2rest.json`).
- **The capsule in every frame.** 0 `%` radii, 0 elliptical radii and 0 `%` in the cluster's own clip strings, in every frame of every `interrupt2` cell, both engines (including D2's frames).
- **The swap reversed twice** (in, out at 42 ms, in at 84 ms): the outer ends stay ≤ 8.56 px per frame (6.1 % of 139 px), the continuity arm is GREEN (worst +0.16), overlap 0, and 0 px of a control outside its glass. Both engines.
- **Value's real dock.** value ships its dock as `collapse="open"` on desktop, where the fixture used `:collapse="false"`. With `vcol=1` the swap in, the swap out and in-then-out at 42 ms read identically to the non-collapsible dock, to 0.01 px: outer ends ≤ 9.71 px per frame (6.9 %), continuity GREEN, overlap 0, both engines (`data/{chromium,webkit}-c2v.json`).
- **Daraksha's real geometry** is as PF1 read it: `o1109-dock`'s SiteDock at `1fd1266` is still the "before" template of §5. Its page seats carry `Tooltip`s, whose content is portalled and lies outside the cluster's `backdrop-filter` stand-down.
- **Not re-run:** O-198 (PRM) and the Tab walk. PF1 §R's reads stand, and the ≤ 144 ms arm is RED by their own record until L5. The motion seam (`mseam`) was also not re-run.
