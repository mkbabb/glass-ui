import { ref, computed, type Ref } from "vue";

export interface OffsetPaginationOptions<T> {
    fetchFn: (limit: number, offset: number) => Promise<{ data: T[]; total: number }>;
    pageSize?: number;
}

/**
 * Composable for offset-based pagination with page navigation.
 * Suitable for admin views that need jump-to-page and stable positions.
 */
export function useOffsetPagination<T>(options: OffsetPaginationOptions<T>) {
    const items = ref<T[]>([]) as Ref<T[]>;
    const total = ref(0);
    const page = ref(1);
    const pageSize = ref(options.pageSize ?? 20);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const pageCount = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)));
    const offset = computed(() => (page.value - 1) * pageSize.value);
    const hasNext = computed(() => page.value < pageCount.value);
    const hasPrev = computed(() => page.value > 1);

    async function loadPage(p?: number) {
        if (p != null) page.value = Math.max(1, Math.min(p, pageCount.value || 1));
        loading.value = true;
        error.value = null;

        try {
            const res = await options.fetchFn(pageSize.value, offset.value);
            items.value = res.data;
            total.value = res.total;
        } catch (e) {
            error.value = e instanceof Error ? e.message : "Failed to load";
        } finally {
            loading.value = false;
        }
    }

    function nextPage() {
        if (hasNext.value) loadPage(page.value + 1);
    }

    function prevPage() {
        if (hasPrev.value) loadPage(page.value - 1);
    }

    function reset() {
        page.value = 1;
        items.value = [];
        total.value = 0;
    }

    return {
        items,
        total,
        page,
        pageSize,
        pageCount,
        loading,
        error,
        hasNext,
        hasPrev,
        loadPage,
        nextPage,
        prevPage,
        reset,
    };
}
