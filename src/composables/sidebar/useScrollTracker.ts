/**
 * Tracks which tree node is currently visible via IntersectionObserver,
 * with a scroll-event fallback for fast scrollbar drags.
 * Deepest visible node wins.
 *
 * Generic over `T extends TreeNode` — pass a custom `getChildren` callback
 * for tree structures whose children are stored under a different property.
 */
import { ref, computed, watch, onMounted, onUnmounted, nextTick, toValue } from "vue";
import type { MaybeRefOrGetter, Ref } from "vue";
import {
    createScrollReader,
    type ScrollReader,
} from "../motion/scrollReader";
import type {
    TreeNode,
    TreeIndexEntry,
    ScrollTrackerOptions,
} from "./types";

export function useScrollTracker<T extends TreeNode>(
    roots: MaybeRefOrGetter<T[]>,
    index: MaybeRefOrGetter<Map<string, TreeIndexEntry<T>>>,
    options?: ScrollTrackerOptions & {
        getChildren?: (node: T) => T[] | undefined;
        scrollContainer?: Ref<HTMLElement | null>;
    },
) {
    const getChildren =
        options?.getChildren ?? ((n: T) => n.children as T[] | undefined);
    const rootMargin = options?.rootMargin ?? "-20% 0px -60% 0px";
    const threshold = options?.threshold ?? 0;

    const activeId = ref<string | null>(null);
    const sectionVisibility = new Map<string, boolean>();
    let observer: IntersectionObserver | null = null;
    const observedIds = new Set<string>();
    let locked = false;
    let mounted = false;

    function lockTracking() {
        locked = true;
    }
    function unlockTracking() {
        locked = false;
    }

    const activeRootId = computed(() => {
        if (!activeId.value) return null;
        return toValue(index).get(activeId.value)?.parentId ?? null;
    });

    function findDeepestVisible(list: T[]): string | null {
        for (const node of list) {
            const children = getChildren(node);
            if (children) {
                const deep = findDeepestVisible(children);
                if (deep) return deep;
            }
            if (sectionVisibility.get(node.id)) return node.id;
        }
        return null;
    }

    function updateActive() {
        const found = findDeepestVisible(toValue(roots));
        if (found) activeId.value = found;
    }

    let cachedIds: string[] | null = null;
    function collectIds(): string[] {
        if (cachedIds) return cachedIds;
        const out: string[] = [];
        function walk(nodes: T[]) {
            for (const node of nodes) {
                out.push(node.id);
                const children = getChildren(node);
                if (children) walk(children);
            }
        }
        walk(toValue(roots));
        cachedIds = out;
        return out;
    }

    function invalidateIdCache() {
        cachedIds = null;
    }

    // The rAF-coalesce + listener is shared via the ONE `createScrollReader` core
    // (BC.W-SCROLL-TRIGGER — the no-fourth-listener fence). The ToC active-section
    // distance-resolution (deepest-visible / closest-to-active-zone) stays HERE; only
    // the listener/coalesce plumbing is shared. `onScroll` is the per-tick callback
    // the reader fires (no longer owns its own `requestAnimationFrame` guard).
    function onScroll() {
        if (locked) return;
        const container = options?.scrollContainer?.value;
        const topPct = parseFloat(rootMargin.split(" ")[0]) / 100;
        const viewportH = container
            ? container.clientHeight
            : window.innerHeight;
        const activeZoneTop = Math.abs(topPct) * viewportH;
        const containerTop = container
            ? container.getBoundingClientRect().top
            : 0;

        const allIds = collectIds();
        let bestId: string | null = null;
        let bestDist = Infinity;
        let closestBelowId: string | null = null;
        let closestBelowDist = Infinity;

        for (const id of allIds) {
            const el = document.getElementById(id);
            if (!el) continue;
            const rect = el.getBoundingClientRect();
            const dist = rect.top - containerTop - activeZoneTop;
            if (dist <= 0 && Math.abs(dist) < bestDist) {
                bestDist = Math.abs(dist);
                bestId = id;
            }
            if (dist > 0 && dist < closestBelowDist) {
                closestBelowDist = dist;
                closestBelowId = id;
            }
        }

        const resolvedId = bestId ?? closestBelowId;
        if (resolvedId && resolvedId !== activeId.value) {
            sectionVisibility.clear();
            sectionVisibility.set(resolvedId, true);
            activeId.value = resolvedId;
        }
    }

    function observeTree(list: T[]) {
        for (const node of list) {
            if (!observedIds.has(node.id)) {
                const el = document.getElementById(node.id);
                if (el) {
                    observer?.observe(el);
                    observedIds.add(node.id);
                }
            }
            const children = getChildren(node);
            if (children) observeTree(children);
        }
    }

    function setupObserver() {
        observer?.disconnect();
        observedIds.clear();
        sectionVisibility.clear();
        invalidateIdCache();

        const container = options?.scrollContainer?.value;
        observer = new IntersectionObserver(
            (entries) => {
                if (locked) return;
                for (const entry of entries) {
                    sectionVisibility.set(
                        (entry.target as HTMLElement).id,
                        entry.isIntersecting,
                    );
                }
                updateActive();
            },
            { root: container ?? undefined, rootMargin, threshold },
        );

        nextTick(() => {
            observeTree(toValue(roots));
            const currentRoots = toValue(roots);
            if (!activeId.value && currentRoots.length > 0) {
                activeId.value = currentRoots[0].id;
            }
        });
    }

    watch(
        () => toValue(roots),
        (newRoots) => {
            if (!mounted) return;
            activeId.value = newRoots[0]?.id ?? null;
            setupObserver();
        },
    );

    // The ONE rAF-coalesced scroll-listener core (BC.W-SCROLL-TRIGGER). The ToC
    // tracker is now a VIEW over `createScrollReader`: it owns no raw
    // `addEventListener("scroll")` + `requestAnimationFrame` pair (that plumbing lives
    // ONCE in the reader leaf). The reader's coalesced tick calls `onScroll`.
    let scrollReader: ScrollReader | null = null;

    onMounted(() => {
        mounted = true;
        setupObserver();

        const container = options?.scrollContainer?.value ?? null;
        scrollReader = createScrollReader(container, () => onScroll());
    });

    onUnmounted(() => {
        mounted = false;
        observer?.disconnect();
        scrollReader?.stop();
        scrollReader = null;
    });

    function forceRecalculate() {
        sectionVisibility.clear();

        const container = options?.scrollContainer?.value;
        const topPct = parseFloat(rootMargin.split(" ")[0]) / 100;
        const viewportH = container
            ? container.clientHeight
            : window.innerHeight;
        const activeZoneTop = Math.abs(topPct) * viewportH;
        const containerTop = container
            ? container.getBoundingClientRect().top
            : 0;

        const allIds = collectIds();
        let bestId: string | null = null;
        let bestDist = Infinity;
        let closestBelowId: string | null = null;
        let closestBelowDist = Infinity;

        for (const id of allIds) {
            const el = document.getElementById(id);
            if (!el) continue;
            const rect = el.getBoundingClientRect();
            const dist = rect.top - containerTop - activeZoneTop;
            if (dist <= 0 && Math.abs(dist) < bestDist) {
                bestDist = Math.abs(dist);
                bestId = id;
            }
            if (dist > 0 && dist < closestBelowDist) {
                closestBelowDist = dist;
                closestBelowId = id;
            }
        }

        const resolvedId = bestId ?? closestBelowId;
        if (resolvedId) {
            sectionVisibility.set(resolvedId, true);
            activeId.value = resolvedId;
        }
    }

    return { activeId, activeRootId, forceRecalculate, lockTracking, unlockTracking };
}
