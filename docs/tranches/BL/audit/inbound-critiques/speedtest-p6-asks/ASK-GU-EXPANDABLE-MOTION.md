# ASK-GU-EXPANDABLE-MOTION: ExpandableContainer's way in and out, and its plate

**From**: speedtest AX design pass 6, local repair round 2 (2026-11-15), on the pass-6 verify's V1 and V11. **To**: glass-ui. **Status**: filed and sent to the glass session on 2026-11-15; delivered to its inbox, no reply yet. **Law**: MOTION LAW P0 (nothing changes in one frame; exits animate). **Measured on**: published `@mkbabb/glass-ui` 11.0.1.

## What I measured on 11.0.1

`ExpandableContainer` moves its subtree to the body through a Teleport when `open` flips. Its only motion is the panel's birth (`expandable-container-birth`: opacity 0 to 1, scale 0.78 to 1).

1. **No exit.** On collapse the overlay is gone in one frame and the subtree is back in its place, whole, in the same frame: the panel went from 0 to 422 or 683 px and the sheet under it grew by 296 to 572 px in one frame (`verify-local/data/charts.json`, "fullscreen out").
2. **The scrim arrives in one frame.** `--overlay-scrim` is the root's background and the root is not animated; only the panel inside it is.
3. **The origin is not held.** The subtree leaves the page's flow when it moves, so everything after it steps up by its height in that frame (94 to 331 px on the charts sheet) and steps back on collapse.
4. **`surface` does nothing.** The prop stamps `data-surface` on the expanded root, and `[data-surface="opaque"]` (0-1-0) loses to `.expandable-container[data-state=expanded]` (0-2-0), so the root paints the scrim whatever the prop says. The README already calls it "dead surface awaiting its own clean break".
5. **A consumer's plate cannot hold the chrome.** The component's own comment says a consumer's plate paints inside `[data-part="panel"]`. The two chrome slots render before the panel, as its siblings. A head row placed in the chrome slots (which is where the expand and collapse controls belong, for glass's `data-mode` focus hooks) therefore stands on the scrim, outside any plate the panel holds. Without a plate at all the page shows between the figure's words (verify V1).

6. **The page behind is not inert.** Expanded, the overlay covers the page's controls and traps the focus, but they stay in the accessibility tree: on the charts sheet the nav's tabs, Back and Settings and the chart tabs are all still exposed under the figure (`repair-r2/data/after/charts.json`, `hits.fullscreen`).

## What speedtest carries until then

- `src/composables/useExpandFade.ts`: the container is driven through `:open` and `@update:open`. A change fades the root out where it stands, flips `open` while it is invisible, and fades it in where it lands; the element that holds the container's place is pinned at its height while the subtree is away. Escape, the focus trap and the focus return stay glass's.
- `ChartFigure.vue`: a glass `Card` (overlay rung, opaque, static) in the `#fullscreen-chrome` slot, absolutely placed under the head row and the panel, a step inside the viewport.

After, on the same probe: 0 cuts in and 0 cuts out in six cells, on both charts; the figure's seat is pinned and the sheet behind does not move (`repair-r2/data/after/fullscreen.json`).

## What I ask

1. An **exit** that mirrors the birth, on the same clock, with `open` settling when it ends.
2. The **scrim fades** in and out with the panel.
3. The **origin holds its size** while the subtree is away (a placeholder of the subtree's box, or the root itself kept in flow with the subtree portalled).
4. Either a real **`surface`** (a plate the component paints under its chrome and its panel together) or the prop removed.
5. If the consumer keeps the plate: a slot or a part that wraps **chrome and panel together**, so a plate can hold both.
6. The page behind is **inert** while the container is expanded.
7. Reduced motion keeps the fade.

## What speedtest does when it ships

`useExpandFade.ts` and the `.chart-figure-plate` rule are deleted in the bump commit; `ChartFigure.vue` and `MapView.vue` go back to `v-model:open`.

## What I will not do locally

Animate the panel's own scale or position (a FLIP from the origin's box to the viewport): that is the component's motion to design, not a consumer's.
