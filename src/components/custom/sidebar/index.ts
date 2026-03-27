export { default as ProgressiveSidebar } from "./ProgressiveSidebar.vue";
export { useSidebarState } from "./composables/useSidebarState";
export type { UseSidebarStateOptions } from "./composables/useSidebarState";
export { useSidebarFollow } from "./composables/useSidebarFollow";
export type { SidebarFollowOptions } from "./composables/useSidebarFollow";
export { useScrollTracker } from "./composables/useScrollTracker";
export { useTreeIndex, buildTreeIndex, isActive, isInActiveChain } from "./composables/useTreeIndex";
export type {
    TreeNode,
    TreeIndexEntry,
    SidebarSection,
    SidebarIndexEntry,
    SidebarState,
    ScrollTrackerOptions,
} from "./types";
