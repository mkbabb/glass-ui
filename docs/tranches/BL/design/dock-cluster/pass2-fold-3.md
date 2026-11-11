# Dock cluster · pass 2 fold, round 3

| field | value |
|---|---|
| seat | the PASS-2 FOLD seat, round 3. I wrote none of pass 2's build, its challenges or W-I.8 |
| model | `claude-opus-5-5`, asserted from own system identity |
| subject | the three findings, the cure sketch and the harness note of `pass2-challenge-3.md`, folded into the mechanism, the prototype and W-I.8's gates |
| base | master `8c2d7768c`. Scratch worktree `.claude/worktrees/bl/cluster/pass2-fold-3`: `pass2/prototype.patch` (fold 2's build), then this fold. The whole build replaces `pass2/prototype.patch` (against master; it applies clean). Fold 2's patch is kept as `pass2-fold-3/prototype-fold2.patch`. The worktree was removed after this record was written |
| W-I.8 | the amendments are `pass2-fold-3/W-I.8.patch`, against `waves/W-I.8.md` with `pass2-fold-1/W-I.8-resume.patch` and then `pass2-fold-2/W-I.8.patch` applied first (both still pending on disk; the three apply in that order, checked). This seat writes only under `design/dock-cluster/`, so the orchestrator applies them |
| fixture | challenge 3's (`menu=1`, `tip=1`, the `TooltipProvider` wrapper), copied to `pass2-fold-3/fixture/`, plus one switch, `noprov=1` (no `TooltipProvider`; for the crash isolation only, every default unchanged). `tools/build-fx.mjs` builds another fixture directory (fold 2's, as `.f2fx`) |
| harness | `tools/f3.mjs` is challenge 3's `c3.mjs` plus the overlay tail (off the overlay onto the bare page for 6 s, then a press there) and `kbmenu2` (the keyboard menu cell, walked from the summary). `tools/forced.mjs` is the forced-colors arm (I8-G22). `tools/probe-f2.mjs` is fold 2's probe, run unchanged for the regressions. `tools/run-f3.sh` runs the forced, Chromium and first WebKit stages, and `tools/wk-batch.sh` runs the rest of WebKit under one lock. `f3.mjs` carries the dock harness's WebKit colour shim on the 11.0.0 row (§W) |
| builds | `.f3` the fold-3 build; `.f3p2` fold 2's build (the bites); `.f3plant` the fold-3 build without the forced-colors box-border stand-down (a plant); `.f3iso` the fold-3 build with the `noprov` switch; `.f2fx` the fold-3 build on fold 2's fixture |
| engines | headless Chromium 149 (Playwright headless shell) and Playwright WebKit 26.5, guarded, one browser per run and a new context per cell; WebKit under `--exclusive webkit`. The typecheck (`vue-tsc -p tsconfig.src.json`, rc 0), the I8-G5 unit test (1 passed, `logs/g5-f3.log`) and the builds under `guarded --light`, vitest `--maxWorkers=2` |
| records | `pass2-fold-3/data/`, `logs/`, `png/` |

## Verdict

All three findings are cured in the mechanism, and each cure is gated with its bite. Chromium and WebKit agree in every hold cell. **C3-1:** a leave into a member's own portalled overlay is not a leave. The dock stays expanded and the menu or tooltip open through 8 s under a resting pointer, as 11.0.0. **C3-2:** while the cluster holds, a press outside it and its members' overlays ends the hold before any member's click-away runs, so the tap away after a tap on the theme collapses the dock at 500 ms, as 11.0.0. **C3-3:** under forced colors the member boxes draw no border and the painter's ring draws the silhouette in CanvasText: one closed outline fused, two split, in all 16 cluster cells. The cure sketch is taken, with two changes: the overlay test is scoped to the members' own dock ids, and the outside press listens in the window's capture phase, so it never depends on listener install order. The regressions read on the fold-3 build are unchanged: D1's click-and-leave collapses at 4.0 s, the Tab cell holds, the reach and walk cells hold, and the census is the same fused and split. No gate was weakened. I8-G19 gains an overlay arm and a touch arm, and I8-G22 (forced colors) is new.

The harness note is closed. WebKit's 11.0.0 pages crashed because challenge 3's probe left out the dock harness's colour shim. Playwright WebKit 26.5 kills the page on the lone plate border's nested `color-mix()` (AB.md §1). Cluster pages never resolve that mix, which is why only the control crashed. With the shim, every WebKit control ran (§W).

## Dispositions

| # | finding | disposition | where in W-I.8 | measured |
|---|---|---|---|---|
| C3-1 | a leave into the dock's own overlay releases the hold | **Mechanism amended: R-13.** Each member registers its dock id. A `pointerleave` or `focusout` whose `relatedTarget` sits in an overlay owned by a member (`isTeleportedTarget(t, member.id)`) keeps the hold. **Gate sharpened: I8-G19's overlay arm**, with challenge 3's pass-2 cells as its bite | R-13, I8-G19, §2 Files | both engines: expanded, overlay open, pointer on "Share" or on the tooltip, through 8 s in 8 of 8 cluster cells (control 4 of 4). Pass-2 build (challenge 3): collapsed at 3.5–4.0 s, menu closed at 4.0 s |
| C3-2 | on touch, after a tap on the theme, a tap away never closes the dock | **Mechanism amended: R-13.** While it holds, the cluster takes a window-capture `pointerdown`. A press outside the root and the members' overlays clears both halves of the hold before the members' document-capture click-away runs. **Gate sharpened: I8-G19's touch arm** | R-13, I8-G19 | both engines: collapsed at 500 ms in 8 of 8 touch cells (control 500 ms, 4 of 4). Pass-2 build (challenge 3): expanded through 7 s |
| C3-3 | under forced colors the fused plate has no edge, and the member boxes show as two plates | **Mechanism amended: R-1.** Under `forced-colors: active`, inside a cluster: the member box takes `border-width: 0`, and the painter's ring `::before` paints `CanvasText` with `forced-color-adjust: none` on that pseudo only. **Gate added: I8-G22** | R-1, I8-G22 | Chromium: 0 bordered elements, 2 edge runs fused, 4 split, top and bottom edges at every member and at every fused cut, 16 of 16 cluster cells. Bites: the pass-2 build RED 16 of 16, the plant RED 16 of 16 |
| sketch | the challenger's cure | **Taken, scoped and ordered.** The sketch's unscoped `isTeleportedTarget(target)` would read any dock's overlay as inside. The sketch's `document` capture listener ran before the members' only because the cluster mounts first. The window phase precedes every document listener by the event path, so order no longer matters | R-13 | as C3-1 and C3-2 |
| W | WebKit's 11.0.0 controls crashed at `goto` | **Attributed and closed.** The crash survived the reboot and followed the probe, not the fixture, the build or the `TooltipProvider`. The cause was the missing colour shim. `f3.mjs` now carries it, and every WebKit control runs | I8-G19 (the harness note) | §W |

## C3-1 · A member's own overlay is inside the cluster

`DockCluster.vue`:

```ts
function inOwnOverlay(t: EventTarget | null): boolean {
    for (const m of registered) if (isTeleportedTarget(t, m.id)) return true;
    return false;
}
function inside(t: EventTarget | null): boolean {
    return (t instanceof Node && !!root.value?.contains(t)) || inOwnOverlay(t);
}
function onPointerLeave(e: PointerEvent): void {
    if (inOwnOverlay(e.relatedTarget)) return;
    pointerIn = false; focusIn = false; syncHold();
}
function onFocusOut(e: FocusEvent): void {
    if (inside(e.relatedTarget)) return;
    focusIn = false;
    syncHold();
}
```

`DockClusterMember` gains `id` (the member's `dockId`, which `overlayContentAttrs()` stamps as `data-glass-dock-owner` on every overlay the member opens), and `GlassDock.vue` passes it in its registration (one field). This is the lone dock's own rule (`useDockState.onMouseLeave`, `onFocusOut`), read across the members. An overlay owned by a dock outside the cluster is outside.

Cell `overlay` (`data/chromium-f3.json`, real clock, `bind=1`). The pointer reaches the dock and waits 1.3 s, opens "More" by click (menu) or rests on "Colour" (tooltip), moves onto the first item or the tooltip, and is sampled every 500 ms for 8 s:

| composition, cell | 1440, Chromium and WebKit | 390, Chromium and WebKit |
|---|---|---|
| cluster, stage, menu | expanded and open through 8 s, pointer on "Share" | the same |
| cluster, `.site-dock`, menu | the same | the same |
| cluster, stage, tooltip | expanded and open through 8 s, pointer on the tooltip | the same |
| cluster, `.site-dock`, tooltip | the same | the same |
| 11.0.0, menu / tooltip | the same | the same |
| pass-2 build (challenge 3, `data/chromium-c3.json`) | collapsed 4.0 s, menu closed 4.0 s | the same |

The tail. The pointer then moves to the bare page for 6 s, then presses there. In both engines, every cell, cluster and 11.0.0 alike, stays expanded through the 6 s and collapses within 500 ms of the press. The lone dock behaves the same way: a pointer that leaves its overlay for the page never crosses the dock's own leave region, so the dock waits for a click-away. The cluster keeps that behaviour, and changing it is not this wave's job.

The keyboard half (`kbmenu2`). The pointer is parked off the cluster. Tab lands on the collapsed summary, Enter opens the dock, focus moves to "More" (the arrow walk did not reach it, so the probe used `focus()`, recorded as `method` in the data), and Enter opens the menu with focus inside it. The menu holds through 8 s in the cluster (4 of 4 per engine) and in 11.0.0 (2 of 2 per engine). It holds on the pass-2 build too (`data/{chromium,webkit}-p2kb.json`, 4 of 4 per engine), so this cell has no bite. The reason is that Enter on the summary pins the dock, and a pinned dock ignores a leave. I keep the `focusout` guard because it is the lone dock's own rule, and I8-G19 carries the keyboard cell as a parity cell, not as a bite. Challenge 3's "not demonstrated" stands as written.

## C3-2 · A press outside ends the hold

```ts
function syncHold(): void {
    …
    if (want) window.addEventListener("pointerdown", onPressOutside, true);
    else window.removeEventListener("pointerdown", onPressOutside, true);
    …
}
function onPressOutside(e: PointerEvent): void {
    if (inside(e.target)) return;
    pointerIn = false;
    focusIn = false;
    syncHold();
}
```

The listener exists only while the cluster holds, and unmount removes it. On release each member runs `release()` and its own leave (R-13, PF2 D1). The member's own click-away then runs on the same event, in document capture, and finds `keepOpenCount` at 0. A pinned dock (a tap pins it) ignores the leave and collapses on that click-away, just as a lone dock does. A press inside the cluster, or in a member's menu, tooltip, select or popover, leaves the hold alone.

Cell `touch` (`hasTouch`; Chromium also sets `isMobile`):

| composition, sequence | 1440, Chromium and WebKit | 390, Chromium and WebKit |
|---|---|---|
| cluster, stage: dock, theme, away | collapsed at 500 ms | 500 ms |
| cluster, `.site-dock`: dock, theme, away | 500 ms | 500 ms |
| cluster: dock, away (stage, `.site-dock`) | 500 ms | 500 ms |
| 11.0.0: dock, theme, away / dock, away | 500 ms | 500 ms |
| pass-2 build (challenge 3) | expanded through 7 s (theme sequence) | the same |

## C3-3 · Forced colors draw one outline

The edge challenge 3 found under forced colors comes from the forced skin, not from GlassDock: `a11y-fallback.css` gives `.hairline-accent, .glass-dock` a `border: 1px solid CanvasText` under `forced-colors: active` (read with a CSSOM walk on the member box). In a cluster that border draws each member's own box, and the ring, which is a `background`, gets repainted to Canvas. I tried three cures and measured each, Chromium, 1440 light, fused:

| try | result |
|---|---|
| `border-color: Canvas` on the member box | the ring draws, but each box's Canvas border paints over it where a box meets the silhouette: a white tick across the top at the theme's corner, and the bottom edge lost |
| `border-color: transparent` | forced to CanvasText by the platform: both boxes draw again, over the ring |
| **`border-width: 0` on the member box, and the ring `::before` in `CanvasText` with `forced-color-adjust: none`** | one closed capsule fused, two capsules split. With the border gone the box is 56 px, the geometry the cluster measures in every other mode, so the share path sits exactly on the plate |

`forced-color-adjust: none` sits on the ring pseudo alone. The controls, their focus rings (`a11y-overrides.css`'s `Highlight` outline) and the summary keep the user's palette. The rule is cluster-scoped in `cluster.css`. GlassDock's forced skin is unchanged.

I8-G22 (`tools/forced.mjs`, `data/chromium-{f3,p2,plant}-forced.json`). The cells are the canonical cluster with the trigger bound, the flat field with the controls hidden, collapsed and expanded, light and dark, 390 and 1440, stage and `.site-dock` (16 cluster cells), plus the 11.0.0 control (8):

| build | bordered elements | edge runs on the middle row | top and bottom edge at the fused cut | verdict |
|---|---|---|---|---|
| fold 3 | 0 | 2 fused, 4 split, 16 of 16 | present, 8 of 8 | GREEN |
| 11.0.0 control | box and plate (one outline, 2 px) | 2 | – | the control |
| pass-2 build (bite) | 2 member boxes, 16 of 16 | 3 in 16 of 16 (the half-arc, a gap, the theme; split, the dock's notch) | absent, 8 of 8 | RED |
| plant: the ring without the box-border stand-down | 2 member boxes, 16 of 16 | 3 in the 8 fused | bottom absent, 8 of 8 | RED |

Captures: `png/chromium-f3-forced-after-light-collapsed-1440.png` and `-expanded-1440.png` (and their dark, `.site-dock` and pass-2 and plant twins).

WebKit has no forced-colors mode, so this is not a Safari risk, and I8-G22 has no WebKit cell. The same holds for the Safari app (I8-G14).

## Regressions read on the fold-3 build

| read | Chromium | WebKit | against |
|---|---|---|---|
| D1 click and leave (`clickhold`, 12 cluster cells) | collapsed at 4.0 s in 8 of 8 click cells (11.0.0: 4.0 s); Tab at 1 s holds through 8 s in 4 of 4 | collapsed at 3.5 s in 8 of 8 (11.0.0: 3.5 s); Tab holds in 4 of 4 (11.0.0: 5.0 s, its Tab leaves for the body, as in fold 2) | fold 2: 3.5–4.0 s, held |
| I8-G19 rest and walk (`trigger`) | "Dark theme" under the resting pointer, its left fixed (806 / 281), expanded, in every sample, stage and `.site-dock`; the focus walk rests on the theme, expanded | the same | fold 2: the same |
| I8-G7 census (`a11y`) | fused = fission, collapsed and expanded, focus kept, 390 and 1440 | the same | fold 2: the same |
| I8-G5 unit test | 1 passed | – | fold 2 |
| typecheck (`tsconfig.src.json`) | rc 0 | – | – |

This fold changes no paint path except the forced-colors one. The cure touches only the hold and a `@media (forced-colors: active)` block. So the seam, the capsule, the swap, the interrupt arms, PRM and restraint were not re-run. Fold 2's reads of them stand.

## §W · WebKit

The WebKit lock was contended all evening, and the WebKit stages waited from about 18:10 to 22:45 in all. The WebKit cells are:

- `webkit-f3` (1440) and `webkit-f3-390` (390, the cluster compositions only): the hold cells on the fold-3 build, identical to Chromium. Overlay held and open through 8 s in 8 of 8, the press on the page collapses at 500 ms in 8 of 8, keyboard held in 4 of 4, touch 500 ms in 8 of 8.
- `webkit-ctl`: the 11.0.0 controls, with the colour shim. Overlay held and open in 4 of 4, the press collapses at 500 ms, keyboard held in 2 of 2, touch 500 ms in 4 of 4.
- `webkit-p2kb`: the keyboard cell on the pass-2 build, held in 4 of 4, so it is not a bite (§C3-1).
- `webkit-f3reg`: fold 2's probe on the fold-3 build, with fold 2's fixture (`.f2fx`). It is the regression table's WebKit column.

**The crash, attributed.** Challenge 3 suspected the `TooltipProvider` wrapper. After the reboot, every 11.0.0 page still crashed at `goto` in `c3.mjs`/`f3.mjs` (`webkit-wksmoke`). It crashed the same way with the wrapper switched off (`noprov=1`, `.f3iso`, `webkit-iso-noprov`) and on fold 2's own fixture (`.f2fx`, `webkit-iso-f2fx`, `webkit-ctl-noprov`). On that same `.f2fx` site, fold 2's probe loaded and ran every 11.0.0 page (`webkit-f3reg`). The difference is fold 2's `WEBKIT_SHIM`, the dock harness's pin on the naive row's plate border colour, which AB.md §1 records: Playwright WebKit 26.5 kills the page on the nested `color-mix()` of the lone plate's border. Cluster pages never match it, because `cluster.css` sets the collapsed border to the expanded one. With the shim in `f3.mjs`, every control ran. So this is a Playwright-WebKit harness fact, not a cluster or fixture defect. The shim is scoped to `.naive-row`, so it touches no cluster cell. The fixture keeps the `noprov` switch, and every default is unchanged.

The Safari app (I8-G14) is still unmeasured, as before, and this fold changes nothing there.

## §6 · Open

- From fold 2, still open: I8-G17's expand-then-page-change cell (RED by 0.02 px, the whole-px shift), GlassDock's own reversal break (N), the survivor offset re-played on a later membership change, R-12's morph frame hook, and O-198's ≤ 144 ms arm (RED until L5).
- The keyboard half of C3-1 has no bite in this composition (§C3-1). If a consumer ever composes a cluster whose dock a keyboard reader can open into `hover` (not `pinned`) with the pointer outside, the `focusout` guard is what holds it. That cell is unbuilt.
- The ring is drawn in normal mode too, at `--glass-border-dock`'s low alpha. I8-G22 shows it traces the whole silhouette exactly once border-width is 0. In normal mode the member box has no border, so it already sits there. No normal-mode change.

## Process

All runs went through `guarded`, the WebKit ones under `--exclusive webkit`. The first runner waited behind another session's WebKit lock with its Chromium stages queued behind it, so I stopped my own runner by PID and reordered it to run Chromium first. The browser pool then held the Chromium hold run for about 30 minutes (it was first in the FIFO queue). Each WebKit stage re-queued for the lock, so I stopped my runner again after `webkit-f3` and ran the remaining WebKit cells as one batch under one lock (`tools/wk-batch.sh`), then the shimmed controls. I stopped only my own processes, by PID, and touched no process outside this seat. Scratch builds and captures that are not cited here (the try-cures for C3-3) live in the session scratchpad and are not records.
