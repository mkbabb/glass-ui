// D4-G block test · the ANCHOR probe (not a glance arm). The land arm with the body registered by CSS anchor
// positioning instead of the engine's rect writer: the selected item is the anchor, the body is laid out from it in
// the same layout pass (`anchor()` / `anchor-size()`), and the writer's inline geometry is overridden. It measures
// whether the platform primitive closes the cells the one-ResizeObserver writer leaves open. A stylesheet
// `!important` outranks the writer's inline style; the body's opacity stays the writer's.
import { arm } from "../route-common.mjs";
const base = arm("land");
const anchored = `
  & .toggle-group[data-travel] { anchor-scope: --tg-on; }
  & .toggle-group[data-travel] .toggle-group__item[data-state="on"] { anchor-name: --tg-on; }
  & .toggle-group__body { position-anchor: --tg-on; translate: none !important; left: anchor(left) !important; top: anchor(top) !important;
    width: anchor-size(width) !important; height: anchor-size(height) !important; }`;
for (const site of Object.keys(base)) base[site].css += anchored;
export default base;
