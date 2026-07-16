import {
    computed,
    onMounted,
    onUnmounted,
    ref,
    shallowRef,
    toValue,
    watch,
    type MaybeRefOrGetter,
    type Ref,
} from "vue";
import { useResizeObserver } from "@glass/composables/dom/useResizeObserver";
import type { FlatSection } from "./virtualSectionLayout";
import {
    buildSectionLayout,
    findSectionOffset,
    resolveActiveSection,
    resolveSectionWindow,
    type SectionLayout,
    type SectionWindowRange,
} from "./virtualSectionLayout";

/**
 * Demo-local continuation of the retired section-windowing primitive. Observers
 * route through the house `useResizeObserver`; far targets seat their estimated
 * coordinate, then reconcile only measurements that can move that coordinate.
 */

interface VirtualWindowConfig<T extends FlatSection = FlatSection> {
    /** The flat list of section items to virtualize. */
    items: MaybeRefOrGetter<readonly T[]>;
    /** The element whose scroll position drives the window. */
    scrollContainer: Ref<HTMLElement | null>;
}

/**
 * Scroll-based virtual windowing composable for section lists.
 *
 * Renders only the items visible in (or near) the scroll viewport,
 * using spacer divs to maintain correct scroll height. Supports:
 *
 * - Measured heights: call `measureSection(id, el)` from a template ref
 *   to replace estimated heights with real DOM measurements.
 * - Targeting: call `ensureTargetWindow(id)` to seat the target in the ordinary
 *   viewport + overscan range. Measurements before that target preserve its
 *   screen position until every rendered ref through it has reported.
 * - Active tracking: `activeId` reports which section is currently at the 20%
 *   viewport mark for the rendered-window readout.
 */
export function useVirtualSectionWindow<T extends FlatSection>(
    options: VirtualWindowConfig<T>,
) {
    const items = computed(() => Array.from(toValue(options.items)));
    const measuredHeights = new Map<string, number>();
    const itemIndex = new Map<string, number>();
    const layout = shallowRef<SectionLayout<T>>({
        entries: [],
        totalHeight: 0,
        byId: [],
    });
    const range = ref<SectionWindowRange>({
        startIndex: 0,
        endIndex: -1,
        topSpacerPx: 0,
        bottomSpacerPx: 0,
    });
    const activeItem = ref<T | null>(null);
    const elementMap = new Map<string, HTMLElement>();
    let scrollRaf = 0;
    let recalcRaf = 0;
    let targetReconciliation: {
        id: string;
        pendingIds: Set<string>;
    } | null = null;

    function getViewportHeight(): number {
        return Math.max(1, options.scrollContainer.value?.clientHeight ?? 900);
    }

    function getContentScrollTop(): number {
        return options.scrollContainer.value?.scrollTop ?? 0;
    }

    function getHeight(item: T): number {
        return measuredHeights.get(item.id) ?? item.estimatedHeight;
    }

    function rebuildLayout() {
        layout.value = buildSectionLayout(items.value, getHeight);
    }

    function computeWindowState() {
        const viewportHeight = getViewportHeight();
        const normalizedScrollTop = getContentScrollTop();

        range.value = resolveSectionWindow(
            layout.value,
            normalizedScrollTop,
            viewportHeight,
            viewportHeight,
            viewportHeight * 2,
        );
        activeItem.value = resolveActiveSection(
            layout.value,
            normalizedScrollTop + viewportHeight * 0.2,
        );
    }

    /** Force a full layout rebuild and window recomputation. */
    function recalculate() {
        const target = targetReconciliation;
        const previousTargetTop = target
            ? findSectionOffset(layout.value, target.id)
            : null;
        rebuildLayout();
        if (target) {
            const nextTargetTop = findSectionOffset(layout.value, target.id);
            if (nextTargetTop == null) {
                targetReconciliation = null;
            } else if (
                previousTargetTop != null &&
                nextTargetTop !== previousTargetTop
            ) {
                writeScrollTop(
                    getContentScrollTop() + nextTargetTop - previousTargetTop,
                );
            }
        }
        computeWindowState();
        releaseReconciledTarget();
    }

    function scheduleRecalculate() {
        if (recalcRaf) return;
        recalcRaf = requestAnimationFrame(() => {
            recalcRaf = 0;
            recalculate();
        });
    }

    function releaseReconciledTarget() {
        if (targetReconciliation?.pendingIds.size === 0 && recalcRaf === 0) {
            targetReconciliation = null;
        }
    }

    function syncMeasuredHeight(id: string, height: number) {
        targetReconciliation?.pendingIds.delete(id);
        const normalized = Math.max(1, Math.round(height));
        if (measuredHeights.get(id) !== normalized) {
            measuredHeights.set(id, normalized);
            scheduleRecalculate();
        }
        releaseReconciledTarget();
    }

    function disconnectSection(id: string) {
        elementMap.delete(id);
    }

    /**
     * Register (or update) a section's DOM element for height measurement.
     * Call from a template ref callback: `:ref="(el) => measureSection(item.id, el)"`.
     * Pass `null` to disconnect.
     */
    function measureSection(id: string, el: HTMLElement | null) {
        if (!el) {
            disconnectSection(id);
            return;
        }

        const current = elementMap.get(id);
        if (current === el) {
            syncMeasuredHeight(id, el.offsetHeight);
            return;
        }

        disconnectSection(id);
        elementMap.set(id, el);
        requestAnimationFrame(() => {
            const target = elementMap.get(id);
            if (target) syncMeasuredHeight(id, target.offsetHeight);
        });
    }

    function writeScrollTop(top: number) {
        const container = options.scrollContainer.value;
        if (container) container.scrollTop = top;
    }

    /** Seat a target in the ordinary bounded window and reconcile its new refs. */
    function ensureTargetWindow(id: string) {
        const index = itemIndex.get(id);
        if (index == null) return;

        targetReconciliation = null;
        if (recalcRaf) {
            cancelAnimationFrame(recalcRaf);
            recalcRaf = 0;
        }
        recalculate();

        const offset = findSectionOffset(layout.value, id);
        if (offset == null) return;
        writeScrollTop(offset);
        computeWindowState();

        const pendingIds = new Set(
            layout.value.entries
                .slice(range.value.startIndex, index + 1)
                .map((entry) => entry.item.id),
        );
        targetReconciliation = { id, pendingIds };
        for (const pendingId of pendingIds) {
            const el = elementMap.get(pendingId);
            if (el?.isConnected) syncMeasuredHeight(pendingId, el.offsetHeight);
        }
        releaseReconciledTarget();
    }

    function handleScroll() {
        if (scrollRaf) return;
        scrollRaf = requestAnimationFrame(() => {
            scrollRaf = 0;
            computeWindowState();
        });
    }

    let currentContainer: HTMLElement | null = null;
    function bindContainer(container: HTMLElement | null) {
        if (currentContainer === container) return;
        if (currentContainer) {
            currentContainer.removeEventListener("scroll", handleScroll);
        }
        currentContainer = container;
        currentContainer?.addEventListener("scroll", handleScroll, {
            passive: true,
        });
        scheduleRecalculate();
    }

    watch(
        items,
        (nextItems) => {
            itemIndex.clear();
            for (const [index, item] of nextItems.entries()) {
                itemIndex.set(item.id, index);
            }
            for (const id of [...measuredHeights.keys()]) {
                if (!itemIndex.has(id)) measuredHeights.delete(id);
            }
            recalculate();
        },
        { immediate: true },
    );

    watch(options.scrollContainer, (container) => bindContainer(container), {
        immediate: true,
    });

    // Container resize routes through the house observer, which coalesces
    // through rAF and disconnects with its scope.
    useResizeObserver(options.scrollContainer, () => scheduleRecalculate());

    onMounted(() => {
        // Ensure initial calculation after DOM is ready
        scheduleRecalculate();
    });

    onUnmounted(() => {
        if (scrollRaf) cancelAnimationFrame(scrollRaf);
        if (recalcRaf) cancelAnimationFrame(recalcRaf);
        targetReconciliation = null;
        if (currentContainer) {
            currentContainer.removeEventListener("scroll", handleScroll);
        }
        elementMap.clear();
    });

    /** The subset of items currently in the render window. */
    const visibleItems = computed(() => {
        if (range.value.endIndex < range.value.startIndex) return [] as T[];
        return items.value.slice(range.value.startIndex, range.value.endIndex + 1);
    });

    /** The `id` of the currently active (at 20% viewport) section. */
    const activeId = computed(() => activeItem.value?.id ?? null);

    return {
        visibleItems,
        topSpacerPx: computed(() => range.value.topSpacerPx),
        bottomSpacerPx: computed(() => range.value.bottomSpacerPx),
        measureSection,
        ensureTargetWindow,
        activeId,
    };
}
