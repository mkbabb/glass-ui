export { useScrollTracker } from "./useScrollTracker";
export { useSidebarFollow } from "./useSidebarFollow";
export type { SidebarFollowOptions } from "./useSidebarFollow";
export { useSidebarState } from "./useSidebarState";
export type { UseSidebarStateOptions, GenericSidebarState } from "./useSidebarState";
export { useTreeIndex, buildTreeIndex, isActive, isInActiveChain } from "./useTreeIndex";
// The three latex-paper-only leaves reconciled HOME: the
// rAF-retry scroll-to-id + treeIndex-aware partial-load, the delegated
// scroll-target click, and the progressive batch-render count.
export { useScrollTo } from "./useScrollTo";
export { useClickDelegate } from "./useClickDelegate";
export { useLazyLoader } from "./useLazyLoader";
export type {
    TreeNode,
    TreeIndexEntry,
    SidebarSection,
    SidebarIndexEntry,
    SidebarState,
    ScrollTrackerOptions,
    ScrollToOptions,
    ClickDelegateOptions,
    LazyLoaderOptions,
} from "./types";
