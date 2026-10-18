// D4-F pass 5 · CRITIC compositions (not a migration). Built with `build.mjs <worktree> --route <this dir>` and read
// by ../crit-f5.mjs. Route-only sites render as `<site>-migrated` (H5-2, scenes.mjs).
//   stnest  a SegmentedTabs (a `.pill-row` holder that is not a `.toggle-group`, so it resets no fact) inside a tile
//           option's `#meta`, each tab holding two block rows through its `#option` slot; the same strip beside the
//           group is the control. The floor's one-row law ("A one-row option (ToggleGroupItem, SegmentedTabs' tab)
//           composes `.pill-row`", utilities/base.css) reads `@container style(--selection-tile: none)` on the tab's
//           parent, so a tab inside a tile option reads the outer option's `flush`
//   n3deep  F's three-level nesting: a tile group in a tile option in a tile group (MIGRATION: "for two levels of
//           groups (a group three levels deep is pills)"). Reported per level
export default {
  stnest: {
    group: `<div class="grid gap-4" data-cg="stnest">
        <ToggleGroup type="single" data-group aria-label="Tiles with a tab strip" class="grid grid-cols-2 gap-2" model-value="a">
          <ToggleGroupItem value="a" data-item data-ci="st-outer-0"><span data-ink>Outer</span>
            <template #meta><SegmentedTabs data-st="in" :model-value="tabsOptions[0].value" :options="tabsOptions" semantics="radio" aria-label="Inner tabs"><template #option="{ option }"><span class="block">{{ option.label }}</span><span class="block text-micro">two</span></template></SegmentedTabs></template>
          </ToggleGroupItem>
          <ToggleGroupItem value="b" data-item><span data-ink>Other</span><template #meta><span data-ink>0.5 s</span></template></ToggleGroupItem>
        </ToggleGroup>
        <SegmentedTabs data-st="beside" :model-value="tabsOptions[0].value" :options="tabsOptions" semantics="radio" aria-label="Beside tabs"><template #option="{ option }"><span class="block">{{ option.label }}</span><span class="block text-micro">two</span></template></SegmentedTabs>
      </div>`,
  },
  n3deep: {
    group: `<ToggleGroup type="single" data-group data-cg="l1" aria-label="Level one" class="grid grid-cols-2 gap-2" model-value="a">
        <ToggleGroupItem value="a" data-item data-ci="l1-0"><span data-ink>One</span>
          <template #meta><ToggleGroup type="single" data-cg="l2" aria-label="Level two" model-value="a">
            <ToggleGroupItem value="a" data-ci="l2-0"><span data-ink>Two</span>
              <template #meta><ToggleGroup type="single" data-cg="l3" aria-label="Level three" model-value="a">
                <ToggleGroupItem value="a" data-ci="l3-0"><span data-ink>Three</span><template #meta><span data-ink>deep</span></template></ToggleGroupItem>
                <ToggleGroupItem value="b"><span data-ink>Four</span></ToggleGroupItem>
              </ToggleGroup></template>
            </ToggleGroupItem>
            <ToggleGroupItem value="b"><span data-ink>Two b</span></ToggleGroupItem>
          </ToggleGroup></template>
        </ToggleGroupItem>
        <ToggleGroupItem value="b" data-item><span data-ink>One b</span><template #meta><span data-ink>x</span></template></ToggleGroupItem>
      </ToggleGroup>`,
  },
};
