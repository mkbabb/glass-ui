/**
 * Tracks which section is currently visible via IntersectionObserver,
 * with a scroll-event fallback for fast scrollbar drags.
 * Deepest visible section wins.
 */
import { ref, computed, watch, onMounted, onUnmounted, nextTick, toValue } from "vue";
import type { MaybeRefOrGetter, Ref } from "vue";
import type { SidebarSection, SidebarIndexEntry, ScrollTrackerOptions } from "./types";

export function useScrollTracker(
    roots: MaybeRefOrGetter<SidebarSection[]>,
    index: MaybeRefOrGetter<Map<string, SidebarIndexEntry>>,
    options?: ScrollTrackerOptions & {
        scrollContainer?: Ref<HTMLElement | null>;
    },
) {
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

    function findDeepestVisible(list: SidebarSection[]): string | null {
        for (const node of list) {
            if (node.children) {
                const deep = findDeepestVisible(node.children);
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
        function walk(nodes: SidebarSection[]) {
            for (const node of nodes) {
                out.push(node.id);
                if (node.children) walk(node.children);
            }
        }
        walk(toValue(roots));
        cachedIds = out;
        return out;
    }

    function invalidateIdCache() {
        cachedIds = null;
    }

    let rafId = 0;
    function onScroll() {
        if (locked || rafId) return;
        rafId = requestAnimationFrame(() => {
            rafId = 0;
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
        });
    }

    function observeTree(list: SidebarSection[]) {
        for (const node of list) {
            if (!observedIds.has(node.id)) {
                const el = document.getElementById(node.id);
                if (el) {
                    observer?.observe(el);
                    observedIds.add(node.id);
                }
            }
            if (node.children) observeTree(node.children);
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

    let scrollTarget: EventTarget | null = null;

    onMounted(() => {
        mounted = true;
        setupObserver();

        const container = options?.scrollContainer?.value;
        scrollTarget = container ?? document;
        scrollTarget.addEventListener("scroll", onScroll, { passive: true });
    });

    onUnmounted(() => {
        mounted = false;
        observer?.disconnect();
        if (rafId) cancelAnimationFrame(rafId);
        scrollTarget?.removeEventListener("scroll", onScroll);
    });

    function forceRecalculate() {
        sectionVisibility.clear();
        if (rafId) cancelAnimationFrame(rafId);
        rafId = 0;

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
