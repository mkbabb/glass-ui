/**
 * Manages sidebar section expand/collapse state with user overrides.
 * Combines tree indexing, scroll tracking, and manual toggle tracking
 * into a unified SidebarState.
 */
import { reactive, computed } from "vue";
import type { Ref } from "vue";
import type { SidebarSection, SidebarState } from "../types";
import { useTreeIndex } from "./useTreeIndex";

export interface UseSidebarStateOptions {
    sections: SidebarSection[];
    activeId: Ref<string | null>;
    activeRootId: Ref<string | null>;
    scrollTo: (id: string) => void;
    scrollToTop: () => void;
}

export function useSidebarState(options: UseSidebarStateOptions): SidebarState {
    const {
        index: treeIndex,
        isActive: checkActive,
        isInActiveChain: checkChain,
    } = useTreeIndex(options.sections);

    // Tracks user overrides for section expand/collapse state
    const userExpanded = reactive(new Set<string>());
    const userCollapsed = reactive(new Set<string>());

    function isExpanded(sectionId: string): boolean {
        if (userCollapsed.has(sectionId)) return false;
        if (userExpanded.has(sectionId)) return true;
        return options.activeRootId.value === sectionId;
    }

    function toggleSection(sectionId: string) {
        if (isExpanded(sectionId)) {
            userExpanded.delete(sectionId);
            userCollapsed.add(sectionId);
        } else {
            userCollapsed.delete(sectionId);
            userExpanded.add(sectionId);
        }
    }

    function navigateTo(id: string) {
        options.scrollTo(id);
    }

    function isActive(id: string): boolean {
        return checkActive(id, options.activeId.value);
    }

    function isInActiveChain(id: string): boolean {
        return checkChain(id, options.activeId.value);
    }

    const activeRootId = computed(() => options.activeRootId.value);

    return {
        sections: options.sections,
        activeId: options.activeId,
        activeRootId,
        treeIndex,
        isExpanded,
        toggleSection,
        navigateTo,
        scrollToTop: options.scrollToTop,
        isActive,
        isInActiveChain,
    };
}
