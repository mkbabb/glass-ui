// AX.W53 — the unified SegmentedTabs family. ONE component, a three-value
// `variant` axis (segmented · pill · underline), ONE shared elastic indicator.
// The former BouncyToggle/BouncyTabs/UnderlineTabs trio + the standalone
// ResponsiveTabs collapse onto this (responsive = a prop). No "Bouncy" prefix.
export { default as SegmentedTabs } from "./SegmentedTabs.vue";
export type {
    SegmentedTabOption,
    SegmentedTabsVariant,
    SegmentedTabsProps,
    SegmentedTabsResponsive,
} from "./SegmentedTabs.vue";
