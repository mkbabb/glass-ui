// D4-G block test · the three glance arms on K1 and K2, built on HEAD+floor+g-body.patch.
// Each arm is the library arm's markup (scenes.mjs presetGroup / specimenGroup, no consumer paint) with the
// floor's cell corner (TF-1, Q-1 (a)) and flush tiles (Q-2 (b), the pass-2 default). They differ in the carrier:
//   glide  <ToggleGroup travel="glide">  the body travels between tile rects on the overshooting panel spring
//   land   <ToggleGroup travel="land">   the body lifts off the old tile and lands on the new one (no path)
//   edge   no body; the floor's per-tile perimeter switched on (--selection-perimeter: 1), FLOOR.md item 2
// The tile rule is staging for the glance (a route owns it), written in the library's own layer so the
// library's hover (the plate layer, TF-8) still outranks it.
export function arm(travel) {
  const t = travel ? ` travel="${travel}"` : "";
  const tile = `@layer components {
    & :where(.toggle-group__item) {
      border-radius: var(--radius-field); white-space: normal; overflow: visible; justify-content: flex-start;
      --glass-defined-plate: transparent; --glass-floor-fill: transparent; backdrop-filter: none;
      ${travel ? "" : "--selection-perimeter: 1;"}
    }
    & :where(.toggle-group__item > *) { overflow: visible; padding-block: 0; }
  }`;
  return {
    preset: {
      group: `<ToggleGroup type="single"${t} data-group aria-label="Spring presets" class="preset-grid grid w-auto max-w-none grid-cols-2 gap-2" v-model="model">
        <ToggleGroupItem v-for="p in orderedPresets" :key="p.name" :value="p.name" :title="p.blurb" data-item class="preset-cell w-full min-w-0 flex-col items-start gap-0.5 px-3 py-2 font-medium leading-normal">
          <span data-ink class="text-small text-foreground capitalize">{{ p.name }}</span>
          <span data-ink data-line-slot class="text-mono-caption text-muted-foreground tabular-nums whitespace-nowrap">{{ p.response }} s · ζ {{ p.damping }}</span>
        </ToggleGroupItem>
      </ToggleGroup>`,
      css: tile,
    },
    specimen: {
      group: `<ToggleGroup type="single" size="sm"${t} data-group aria-label="Easing curve specimens" class="specimen-grid-group" v-model="model">
        <section v-for="g in CURVE_GROUPS" :key="g.family" class="catalogue-section">
          <h3 class="catalogue-family text-subheading">{{ g.family }}</h3>
          <div class="specimen-grid">
            <ToggleGroupItem v-for="c in g.items" :key="c.name" :value="c.name" :aria-describedby="'desc-' + c.name" data-item data-surface="opaque" class="specimen-tile flex-col gap-1.5 px-2 py-2.5">
              <span data-ink class="tile-stage" aria-hidden="true"><span class="tile-plot"><svg class="tile-sparkline" viewBox="0 0 1 1" preserveAspectRatio="none"><path :d="c.path" vector-effect="non-scaling-stroke" /></svg><span class="curve-carriage tile-carriage" style="--curve-rest: translate(0%, 100%)"><span class="curve-ball tile-ball"></span></span></span></span>
              <span data-ink data-line-slot class="tile-name text-mono-caption" data-register="code">{{ c.name }}</span>
              <span :id="'desc-' + c.name" class="sr-only" aria-hidden="true">{{ c.description }}</span>
            </ToggleGroupItem>
          </div>
        </section>
      </ToggleGroup>`,
      css: tile,
    },
  };
}
