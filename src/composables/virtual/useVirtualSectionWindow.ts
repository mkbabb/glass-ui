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
import { useResizeObserver } from "../dom/useResizeObserver";
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

/**
 * Lineage: a glass-ui primitive at v0.9.4, retired at v1.0 (MIGRATION.md §3.2),
 * carried on as a verbatim transposed copy in the words app, and HOME again at
 * BC (the live words consumer + the dock-search results list overturn the
 * no-consumer retirement verdict). Byte-faithful to the proven words copy save
 * the recorded refinements: the container/content ResizeObservers route through
 * the house `useResizeObserver` leaf (cleanup discipline) instead of raw
 * `new ResizeObserver`, and `findSectionOffset` is the binary-search variant.
 */

interface VirtualWindowConfig<T extends FlatSection = FlatSection> {
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

/**
 * MEMORY — module-level height cache, SHARED across all instances.
 *
 * A section's measured height survives a remount (a definition view that
 * unmounts/remounts on word-change re-uses the prior heights — the proven
 * words behaviour). This is deliberate for a windowing leaf: a per-instance
 * cache would lose the survives-remount property the consumer relies on. The
 * cache keys on the section `id` (consumer-namespaced ids avoid cross-app
 * collision). Use `clearSessionHeightCache()` to evict (the retune escape).
 */
const SESSION_HEIGHT_CACHE = new Map<string, number>();

/**
 * Evict every cached measured section height. The documented escape for a
 * consumer that wants to drop the module-global `SESSION_HEIGHT_CACHE` (a
 * font-size change, a layout reflow that invalidates prior measurements).
 */
export function clearSessionHeightCache(): void {
    SESSION_HEIGHT_CACHE.clear();
}

/**
 * Scroll-based virtual windowing composable for section lists.
 *
 * Renders only the items visible in (or near) the scroll viewport,
 * using spacer divs to maintain correct scroll height. Supports:
 *
 * - Measured heights: call `measureSection(id, el)` from a template ref
 *   to replace estimated heights with real DOM measurements.
 * - Warm targeting: call `ensureTargetWindow(id)` to force an item into
 *   the render window before scrolling to it (auto-releases after 320ms).
 * - Active tracking: `activeId` / `activeRootId` report which section
 *   is currently at the 20% viewport mark. NOTE — this is the windowing-LOCAL
 *   render-active reader; a ToC/sidebar consumer reads `useScrollTracker`'s
 *   `activeId` (the deepest-visible reader) for the binding highlight. The two
 *   serve distinct concerns and are deliberately NOT one function
 *   (BC.W-VIRTUAL-WINDOW active-section reconcile).
 * - Content offset: provide `contentEl` to correctly handle non-virtualized
 *   content (headers, banners) above the virtual list.
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
    const warmRange = ref<ForcedSectionWindowRange | null>(null);

    const elementMap = new Map<string, HTMLElement>();
    let scrollRaf = 0;
    let recalcRaf = 0;
    let warmTimer = 0;

    function getViewportHeight(): number {
        return Math.max(
            1,
            options.scrollContainer.value?.clientHeight ??
                window.innerHeight ??
                900,
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
            : document.documentElement.scrollTop ||
                  document.body.scrollTop ||
                  0;
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
        currentContainer.addEventListener("scroll", handleScroll, {
            passive: true,
        });
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

    watch(options.scrollContainer, (container) => bindContainer(container), {
        immediate: true,
    });

    // Container + content resize route through the house `useResizeObserver`
    // leaf (the cleanup-on-scope-dispose discipline) — the words copy hand-rolled
    // raw `new ResizeObserver` per element; the re-mint composes the house leaf,
    // which watches the ref, coalesces through rAF, and auto-disconnects.
    useResizeObserver(options.scrollContainer, () => scheduleRecalculate());
    if (options.contentEl) {
        useResizeObserver(options.contentEl, () => scheduleRecalculate());
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
        elementMap.clear();
    });

    /** The subset of items currently in the render window. */
    const visibleItems = computed(() => {
        if (range.value.endIndex < range.value.startIndex) return [] as T[];
        return items.value.slice(
            range.value.startIndex,
            range.value.endIndex + 1,
        );
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
