// k2.mjs · H5-5 · the one K2 transcription every route's migrated arm uses (REGISTRY §P4-6.2 H5-5; P-3).
// K2 is keyframes.js's EasingCatalogue specimen tile: a stage (the curve's sparkline and a ball on it), the curve's name,
// and a screen-reader description, in family sections inside a FadingScroll. Pass 4's two routes transcribed it twice,
// and the copies drifted: D′'s carried `.tile-name { color: var(--selection-ink) }` (consumer paint on a tile, T-7's
// class) and F's did not, so the selected name moved its ink on D′ and read 1.00:1 on F (`Fp` N-4). Here it is written
// once, and the declaration is the only parameter:
//   "shape"    D′: `shape="cell"` on the group; the stage is a default-slot row
//   "anatomy"  F: no group declaration; the stage fills `#media`
// The consumer keeps its content and its group layout: the family sections, the grid, the group's bottom pad (the ring's
// reach on the other three sides is the library's), the tiles' paint containment (X-3), the stage stroke reading the
// library's ink through `currentColor` (X-2), and the name stretched across the column. Nothing paints the tile or
// the name: no colour, fill, border, outline, shadow or corner, and no `[data-state]` rule. Whether the selected name
// takes the selection ink is the library's answer, and REPORT `name-ink` reads it on each route (H5-5).
export const K2_DECLARATIONS = ["shape", "anatomy"];
export function K2_SPECIMEN(declaration) {
  if (!K2_DECLARATIONS.includes(declaration)) throw new Error(`K2_SPECIMEN: declaration is one of ${K2_DECLARATIONS.join(", ")}`);
  const shape = declaration === "shape" ? ' shape="cell"' : "";
  const stage = `<span data-ink class="tile-stage" aria-hidden="true"><span class="tile-plot"><svg class="tile-sparkline" viewBox="0 0 1 1" preserveAspectRatio="none"><path :d="c.path" vector-effect="non-scaling-stroke" /></svg><span class="curve-carriage tile-carriage" style="--curve-rest: translate(0%, 100%)"><span class="curve-ball tile-ball"></span></span></span></span>`;
  return {
    group: `<ToggleGroup type="single"${shape} size="sm" data-group aria-label="Easing curve specimens" class="specimen-grid-group" v-model="model">
        <section v-for="g in CURVE_GROUPS" :key="g.family" class="catalogue-section">
          <h3 class="catalogue-family text-subheading">{{ g.family }}</h3>
          <div class="specimen-grid">
            <ToggleGroupItem v-for="c in g.items" :key="c.name" :value="c.name" :aria-describedby="'desc-' + c.name" data-item data-surface="opaque">
              ${declaration === "anatomy" ? `<template #media>${stage}</template>` : stage}
              <span data-ink data-line-slot class="tile-name text-mono-caption" data-register="code">{{ c.name }}</span>
              <span :id="'desc-' + c.name" class="sr-only" aria-hidden="true">{{ c.description }}</span>
            </ToggleGroupItem>
          </div>
        </section>
      </ToggleGroup>`,
    css: `.specimen-grid-group { padding: var(--focus-ring-reach) var(--focus-ring-reach) 1rem; }
      [data-item] { content-visibility: auto; contain-intrinsic-size: auto 104px; }
      .tile-sparkline path { stroke: currentColor; }
      .tile-name { align-self: stretch; }`,
  };
}
