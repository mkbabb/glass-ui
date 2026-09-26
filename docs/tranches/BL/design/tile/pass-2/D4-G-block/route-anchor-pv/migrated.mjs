// D4-G block test · the ANCHOR probe with `position-visibility: anchors-valid`: the body is not painted while its
// anchor is not acceptable (in Chromium, an anchor inside content-visibility-skipped contents; the tile is then far
// offscreen, so there is nothing on screen to register to).
import base from "../route-anchor/migrated.mjs";
for (const site of Object.keys(base)) base[site].css += `\n  & .toggle-group__body { position-visibility: anchors-valid; }`;
export default base;
