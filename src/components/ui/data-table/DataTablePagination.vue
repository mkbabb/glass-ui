<script setup lang="ts">
import { computed } from "vue";
import { Button } from "../button";
import { cn } from '../../../utils';

const props = defineProps<{
    page: number;
    pageSize: number;
    total: number;
    class?: string;
}>();

const emit = defineEmits<{
    "update:page": [page: number];
}>();

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)));

const clampedPage = computed(() =>
    Math.min(Math.max(1, props.page), totalPages.value),
);

/** Visible page numbers with ellipsis markers (null = ellipsis). */
const visiblePages = computed(() => {
    const total = totalPages.value;
    const current = clampedPage.value;
    if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }
    const pages: (number | null)[] = [1];
    if (current > 3) pages.push(null);
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (current < total - 2) pages.push(null);
    pages.push(total);
    return pages;
});

function goTo(p: number) {
    const clamped = Math.min(Math.max(1, p), totalPages.value);
    if (clamped !== props.page) emit("update:page", clamped);
}
</script>

<template>
    <div
        :class="
            cn(
                'flex items-center justify-between border-t border-border px-4 py-2 text-sm text-muted-foreground',
                props.class,
            )
        "
    >
        <span class="tabular-nums">
            {{ total.toLocaleString() }} result{{ total === 1 ? "" : "s" }}
        </span>

        <div class="flex items-center gap-1">
            <Button
                variant="ghost"
                iconOnly
                :disabled="clampedPage <= 1"
                @click="goTo(1)"
                aria-label="First page"
            >
                ⟨⟨
            </Button>
            <Button
                variant="ghost"
                iconOnly
                :disabled="clampedPage <= 1"
                @click="goTo(clampedPage - 1)"
                aria-label="Previous page"
            >
                ⟨
            </Button>

            <template v-for="(p, i) in visiblePages" :key="i">
                <span v-if="p === null" class="px-1 select-none">...</span>
                <Button
                    v-else
                    :variant="p === clampedPage ? 'default' : 'ghost'"
                    iconOnly
                    class="tabular-nums"
                    @click="goTo(p)"
                >
                    {{ p }}
                </Button>
            </template>

            <Button
                variant="ghost"
                iconOnly
                :disabled="clampedPage >= totalPages"
                @click="goTo(clampedPage + 1)"
                aria-label="Next page"
            >
                ⟩
            </Button>
            <Button
                variant="ghost"
                iconOnly
                :disabled="clampedPage >= totalPages"
                @click="goTo(totalPages)"
                aria-label="Last page"
            >
                ⟩⟩
            </Button>
        </div>
    </div>
</template>
