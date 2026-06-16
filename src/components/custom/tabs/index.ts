// BA.W-TABS — the standardized SegmentedTabs family. ONE engine, TWO materials
// (`variant`: pill (default, the glass material) · underline (the paper ink-mark)),
// ONE orientation axis (horizontal · vertical), responsive collapse as a prop.
// The retired `segmented`/`overflow`/`:multi-select` axes + the `ui/Tabs` public
// surface are a clean break (no alias — "No legacy code"; see MIGRATION.md).
export { default as SegmentedTabs } from "./SegmentedTabs.vue";
export type {
    SegmentedTabOption,
    SegmentedTabsVariant,
    SegmentedTabsOrientation,
    SegmentedTabsProps,
    SegmentedTabsResponsive,
} from "./SegmentedTabs.vue";
