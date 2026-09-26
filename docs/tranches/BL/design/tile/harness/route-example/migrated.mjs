// route-example · the H-7 route contract on a real build, not a route. Two migrated sites:
//   preset    the K1 markup with every consumer paint class and rule deleted: T-7's migrated arm must PASS;
//   specimen  the K2 markup carrying one consumer rule on the tile (its own corner): T-7's migrated arm must FAIL.
// `node build.mjs <wt> --label route-example --route <this dir>` then `node t7-no-consumer-paint.mjs --build …`.
export default {
  preset: {
    group: `<ToggleGroup type="single" data-group aria-label="Spring presets" class="preset-grid grid w-auto max-w-none grid-cols-2 gap-2" v-model="model">
        <ToggleGroupItem v-for="p in orderedPresets" :key="p.name" :value="p.name" :title="p.blurb" data-item class="preset-cell w-full min-w-0 flex-col items-start gap-0.5 px-3 py-2 font-medium leading-normal">
          <span data-ink class="text-small text-foreground capitalize">{{ p.name }}</span>
          <span data-ink data-line-slot class="text-mono-caption text-muted-foreground tabular-nums whitespace-nowrap">{{ p.response }} s · ζ {{ p.damping }}</span>
        </ToggleGroupItem>
      </ToggleGroup>`,
  },
  specimen: {
    group: `<ToggleGroup type="single" size="sm" data-group aria-label="Easing curve specimens" class="specimen-grid-group" v-model="model">
        <section v-for="g in CURVE_GROUPS" :key="g.family" class="catalogue-section">
          <h3 class="catalogue-family text-subheading">{{ g.family }}</h3>
          <div class="specimen-grid">
            <ToggleGroupItem v-for="c in g.items" :key="c.name" :value="c.name" data-item data-surface="opaque" class="specimen-tile mig-tile flex-col gap-1.5 px-2 py-2.5">
              <span data-ink class="tile-stage" aria-hidden="true"><span class="tile-plot"><svg class="tile-sparkline" viewBox="0 0 1 1" preserveAspectRatio="none"><path :d="c.path" vector-effect="non-scaling-stroke" /></svg></span></span>
              <span data-ink data-line-slot class="tile-name text-mono-caption">{{ c.name }}</span>
            </ToggleGroupItem>
          </div>
        </section>
      </ToggleGroup>`,
    css: `.mig-tile { border-radius: 14px; }`,
  },
};
