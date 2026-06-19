// The re-homed virtualized-section-windowing leaf (BC.W-VIRTUAL-WINDOW — the
// homecoming: v0.9.4 → retired v1.0 → returned BC). Published OFF the root
// barrel via `@mkbabb/glass-ui/virtual` (a heavy DOM-measure leaf with a
// module-global height cache; the spa-view / expandable-container off-root
// precedent). `useVirtualGrid` (the `@tanstack/vue-virtual`-bearing word-list
// grid) STAYS words-local — one consumer + a hard 3rd-party dep, the
// >=2-consumer bar fails for glass-ui; it is NOT re-minted here.

export {
    useVirtualSectionWindow,
    clearSessionHeightCache,
} from "./useVirtualSectionWindow";
export { useWindowedStore } from "./useWindowedStore";
export {
    buildSectionLayout,
    findSectionOffset,
    resolveActiveSection,
    resolveSectionWindow,
} from "./virtualSectionLayout";
export type {
    FlatSection,
    SectionLayout,
    SectionWindowRange,
    ForcedSectionWindowRange,
} from "./virtualSectionLayout";
