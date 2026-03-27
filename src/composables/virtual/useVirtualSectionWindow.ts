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
import type { FlatSection } from "./virtualSectionLayout";
import {
    buildSectionLayout,
    findSectionOffset,
    resolveActiveSection,
    resolveSectionWindow,
    type ForcedSectionWindowRange,
    type SectionLayout,
    type SectionWindowRange,
} from "./virtualSectionLayout";

export interface VirtualSectionWindowOptions<T extends FlatSection = FlatSection> {
    /** The flat list of section items to virtualize. */
    items: MaybeRefOrGetter<readonly T[]>;
    /**
     * The element whose scroll position drives the window.
     * `null` = use `window` / document scroll.
     */
    scrollContainer: Ref<HTMLElement | null>;
    /**
     * The wrapper element around the virtualized content.
     * When provided, scroll offset is computed relative to this element's
     * position in the page, so content above it (headers, images, etc.)
     * is correctly excluded from the layout calculation.
     */
    contentEl?: Ref<HTMLElement | null>;
    /** Overscan before the viewport in pixels. Default: viewport height. */
    overscanBeforePx?: number;
    /** Overscan after the viewport in pixels. Default: 2x viewport height. */
    overscanAfterPx?: number;
    /** Number of items to warm before a target when using `ensureTargetWindow`. Default: 2. */
    warmTargetBefore?: number;
    /** Number of items to warm after a target when using `ensureTargetWindow`. Default: 3. */
    warmTargetAfter?: number;
}

/** Session-level height cache shared across all instances. */
const SESSION_HEIGHT_CACHE = new Map<string, number>();

/**
 * Scroll-based virtual windowing composable for section lists.
 *
 * Renders only the items visible in (or near) the scroll viewport,
 * using spacer divs to maintain correct scroll height. Supports:
 *
 * - Measured heights: call `measureSection(id, el)` from a template ref
 *   to replace estimated heights with real DOM measurements.
 * - Warm targeting: call `ensureTargetWindow(id)` to force an item into
 *   the render window before scrolling to it.
 * - Active tracking: `activeId` / `activeRootId` report which section
 *   is currently at the 20% viewport mark.
 * - Content offset: provide `contentEl` to correctly handle non-virtualized
 *   content (headers, banners) above the virtual list.
 */
export function useVirtualSectionWindow<T extends FlatSection>(
    options: VirtualSectionWindowOptions<T>,
) {
    const items = computed(() => Array.from(toValue(options.items)));
    const measuredHeights = new Map<string, number>();
    const itemIndex = new Map<string, number>();
    const layout = shallowRef<SectionLayout<T>>({
        entries: [],
        totalHeight: 0,
    });
    const range = ref<SectionWindowRange>({
        startIndex: 0,
        endIndex: -1,
        topSpacerPx: 0,
        bottomSpacerPx: 0,
    });
    const activeItem = ref<T | null>(null);
    const warmRange = ref<ForcedSectionWindowRange | null>(null);

    const elementMap = new Map<string, HTMLElement>();
    let scrollRaf = 0;
    let recalcRaf = 0;
    let warmTimer = 0;
    let containerResizeObserver: ResizeObserver | null = null;

    function getViewportHeight(): number {
        return Math.max(
            1,
            options.scrollContainer.value?.clientHeight ?? window.innerHeight ?? 900,
        );
    }

    /**
     * Compute how far the user has scrolled into the virtualized content.
     * When `contentEl` is provided, we measure relative to the content
     * wrapper's position — so headers/images above it are excluded.
     */
    function getContentScrollTop(): number {
        const contentEl = options.contentEl?.value;
        if (contentEl) {
            // Negative rect.top = user has scrolled past the content's top edge
            return Math.max(0, -contentEl.getBoundingClientRect().top);
        }
        const container = options.scrollContainer.value;
        return container
            ? container.scrollTop
            : (document.documentElement.scrollTop || document.body.scrollTop || 0);
    }

    function getHeight(item: T): number {
        return (
            measuredHeights.get(item.id) ??
            SESSION_HEIGHT_CACHE.get(item.id) ??
            item.estimatedHeight
        );
    }

    function rebuildLayout() {
        layout.value = buildSectionLayout(items.value, getHeight);
    }

    function computeWindowState() {
        const viewportHeight = getViewportHeight();
        const overscanBeforePx = options.overscanBeforePx ?? viewportHeight;
        const overscanAfterPx = options.overscanAfterPx ?? viewportHeight * 2;
        const normalizedScrollTop = getContentScrollTop();

        range.value = resolveSectionWindow(
            layout.value,
            normalizedScrollTop,
            viewportHeight,
            overscanBeforePx,
            overscanAfterPx,
            warmRange.value,
        );
        activeItem.value = resolveActiveSection(
            layout.value,
            normalizedScrollTop + viewportHeight * 0.2,
        );
    }

    /** Force a full layout rebuild and window recomputation. */
    function recalculate() {
        rebuildLayout();
        computeWindowState();
    }

    function scheduleRecalculate() {
        if (recalcRaf) return;
        recalcRaf = requestAnimationFrame(() => {
            recalcRaf = 0;
            recalculate();
        });
    }

    function scheduleWarmRangeRelease() {
        if (warmTimer) window.clearTimeout(warmTimer);
        warmTimer = window.setTimeout(() => {
            warmRange.value = null;
            scheduleRecalculate();
        }, 320);
    }

    function syncMeasuredHeight(id: string, height: number) {
        const normalized = Math.max(1, Math.round(height));
        if (measuredHeights.get(id) === normalized) return;
        measuredHeights.set(id, normalized);
        SESSION_HEIGHT_CACHE.set(id, normalized);
        scheduleRecalculate();
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

    /**
     * Force an item into the render window so it can be scrolled to.
     * The warm range auto-releases after 320ms.
     */
    function ensureTargetWindow(id: string) {
        const index = itemIndex.get(id);
        if (index == null) return;
        const warmBefore = options.warmTargetBefore ?? 2;
        const warmAfter = options.warmTargetAfter ?? 3;
        warmRange.value = {
            startIndex: Math.max(0, index - warmBefore),
            endIndex: Math.min(items.value.length - 1, index + warmAfter),
        };
        scheduleWarmRangeRelease();
        recalculate();
    }

    /** Get the pixel offset of a section by id, or `null` if not found. */
    function getOffsetFor(id: string): number | null {
        return findSectionOffset(layout.value, id);
    }

    function attachContainerObserver(container: HTMLElement | null) {
        containerResizeObserver?.disconnect();
        containerResizeObserver = null;
        if (!container || typeof ResizeObserver === "undefined") return;
        containerResizeObserver = new ResizeObserver(() => {
            scheduleRecalculate();
        });
        containerResizeObserver.observe(container);
    }

    function handleScroll() {
        if (scrollRaf) return;
        scrollRaf = requestAnimationFrame(() => {
            scrollRaf = 0;
            computeWindowState();
        });
    }

    let currentContainer: EventTarget | null = null;
    function bindContainer(container: HTMLElement | null) {
        const scrollTarget: EventTarget = container ?? window;
        if (currentContainer === scrollTarget) return;
        if (currentContainer) {
            currentContainer.removeEventListener("scroll", handleScroll);
        }
        currentContainer = scrollTarget;
        currentContainer.addEventListener("scroll", handleScroll, { passive: true });
        attachContainerObserver(container);
        scheduleRecalculate();
    }

    watch(
        items,
        (nextItems) => {
            itemIndex.clear();
            for (const item of nextItems) {
                itemIndex.set(item.id, item.index);
                const cached = SESSION_HEIGHT_CACHE.get(item.id);
                if (cached != null) measuredHeights.set(item.id, cached);
            }
            for (const id of [...measuredHeights.keys()]) {
                if (!itemIndex.has(id)) measuredHeights.delete(id);
            }
            recalculate();
        },
        { immediate: true },
    );

    watch(
        options.scrollContainer,
        (container) => bindContainer(container),
        { immediate: true },
    );

    // Also observe the content element for resize (e.g. images loading above)
    let contentResizeObserver: ResizeObserver | null = null;
    if (options.contentEl) {
        watch(
            options.contentEl,
            (el) => {
                contentResizeObserver?.disconnect();
                contentResizeObserver = null;
                if (el && typeof ResizeObserver !== "undefined") {
                    contentResizeObserver = new ResizeObserver(() => scheduleRecalculate());
                    contentResizeObserver.observe(el);
                }
            },
            { immediate: true },
        );
    }

    onMounted(() => {
        // Ensure initial calculation after DOM is ready
        scheduleRecalculate();
    });

    onUnmounted(() => {
        if (scrollRaf) cancelAnimationFrame(scrollRaf);
        if (recalcRaf) cancelAnimationFrame(recalcRaf);
        if (warmTimer) window.clearTimeout(warmTimer);
        if (currentContainer) {
            currentContainer.removeEventListener("scroll", handleScroll);
        }
        containerResizeObserver?.disconnect();
        contentResizeObserver?.disconnect();
        elementMap.clear();
    });

    /** The subset of items currently in the render window. */
    const visibleItems = computed(() => {
        if (range.value.endIndex < range.value.startIndex) return [] as T[];
        return items.value.slice(range.value.startIndex, range.value.endIndex + 1);
    });

    /** The `id` of the currently active (at 20% viewport) section. */
    const activeId = computed(() => activeItem.value?.id ?? null);
    /** The `rootId` of the currently active section. */
    const activeRootId = computed(() => activeItem.value?.rootId ?? null);

    return {
        visibleItems,
        topSpacerPx: computed(() => range.value.topSpacerPx),
        bottomSpacerPx: computed(() => range.value.bottomSpacerPx),
        measureSection,
        ensureTargetWindow,
        getOffsetFor,
        activeId,
        activeRootId,
        recalculate,
    };
}
