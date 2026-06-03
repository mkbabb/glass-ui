<script setup lang="ts">
import { ref, watch, nextTick, computed } from "vue";
import { Search, X, Maximize2, Minimize2 } from "@lucide/vue";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Dialog, DialogContent } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { fuzzyMatch } from "./composables/fuzzySearchIndex";
import { useTextHighlight } from "../../../composables/dom/useTextHighlight";
import type { FuzzySearchState, SearchableItem, SearchResult } from "./composables/types";

const props = withDefaults(
    defineProps<{
        state: FuzzySearchState;
        variant?: "sidebar" | "floating";
        placeholder?: string;
        typeLabel?: (item: SearchableItem) => string;
    }>(),
    { variant: "sidebar", placeholder: "Search…" },
);

const inputRef = ref<HTMLInputElement | null>(null);
const modalInputRef = ref<HTMLInputElement | null>(null);

const inlineOpen = computed({
    get: () =>
        props.state.isOpen.value &&
        !props.state.isExpanded.value &&
        props.state.results.value.length > 0,
    set: (open: boolean) => { if (!open) props.state.close(); },
});

watch(() => props.state.selectedIndex.value, () => {
    nextTick(() => document.querySelector(".fuzzy-search-result.is-selected")
        ?.scrollIntoView({ block: "nearest" }));
});
watch(() => props.state.isOpen.value, (open) => {
    if (open) nextTick(() => inputRef.value?.focus());
});
watch(() => props.state.isExpanded.value, (expanded) => {
    if (expanded) nextTick(() => modalInputRef.value?.focus());
});

// Repaint the match highlight whenever the query/result set/open-state changes,
// against whichever list is currently mounted (dialog when expanded, else popover).
// When both surfaces are closed there's no list to paint, so the highlight clears.
watch(
    [
        () => props.state.query.value,
        () => props.state.results.value,
        () => props.state.isExpanded.value,
        inlineOpen,
    ],
    () => {
        const container = props.state.isExpanded.value
            ? modalListRef.value
            : inlineOpen.value
                ? inlineListRef.value
                : null;
        repaintHighlight(container);
    },
    { flush: "post" },
);

function focus() { inputRef.value?.focus(); }
defineExpose({ focus });

function resultLabel(r: SearchResult) { return r.item.label || r.item.text.slice(0, 120); }
function getTypeLabel(r: SearchResult) { return props.typeLabel ? props.typeLabel(r.item) : (r.item.type ?? ""); }

// Match emphasis rides the CSS Custom Highlight API (composables/dom) rather
// than a <mark> splitter — the matched chars paint via ::highlight(glass-search-mark)
// over the rendered label text with no DOM mutation. The popover and dialog each
// own a container ref; after a query/results change we re-scan the visible list's
// `.fuzzy-search-label` text nodes and set the range union. Where the API is
// unsupported the composable no-ops and labels render as plain text.
const inlineListRef = ref<HTMLElement | null>(null);
const modalListRef = ref<HTMLElement | null>(null);
const highlight = useTextHighlight("glass-search-mark");

// Per-label fuzzy matcher — fuzzyMatch's char indices over the label string
// are exactly the text-node spans, so each matched index becomes a 1-char range.
function fuzzySpans(text: string, query: string) {
    const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return [];
    const textLc = text.toLowerCase();
    const set = new Set<number>();
    for (const token of tokens) {
        const m = fuzzyMatch(token, textLc);
        if (m) for (const idx of m.matches) set.add(idx);
    }
    const spans: Array<{ start: number; end: number }> = [];
    for (const idx of [...set].sort((a, b) => a - b)) {
        const last = spans[spans.length - 1];
        if (last && last.end === idx) last.end = idx + 1;
        else spans.push({ start: idx, end: idx + 1 });
    }
    return spans;
}

function repaintHighlight(container: HTMLElement | null) {
    if (!container) { highlight.clear(); return; }
    nextTick(() => highlight.setFromMatches(container, props.state.query.value, fuzzySpans));
}
</script>

<template>
    <div class="fuzzy-search relative" :class="`fuzzy-search--${variant}`">
        <Popover v-model:open="inlineOpen">
            <PopoverTrigger as-child>
                <div class="input-bar" :class="variant === 'floating' && '!border-none !bg-transparent !p-0 !rounded-none'">
                    <Search class="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
                    <input
                        ref="inputRef" type="text" class="input-bar-field text-sm" :placeholder="placeholder"
                        :value="state.query.value"
                        @input="state.query.value = ($event.target as HTMLInputElement).value"
                        @keydown="state.onKeydown" @focus="state.isOpen.value = true"
                    />
                    <Button v-if="state.query.value && state.results.value.length > 0"
                        type="button" variant="ghost" size="icon" class="!h-6 !w-6"
                        :title="state.isExpanded.value ? 'Collapse' : 'Expand'" @click="state.toggleExpanded()">
                        <Maximize2 v-if="!state.isExpanded.value" class="h-3 w-3" />
                        <Minimize2 v-else class="h-3 w-3" />
                    </Button>
                    <Button v-if="state.query.value" type="button" variant="ghost" size="icon" class="!h-6 !w-6"
                        title="Clear search" @click="state.close()">
                        <X class="h-3 w-3" />
                    </Button>
                </div>
            </PopoverTrigger>
            <PopoverContent align="start" :side-offset="4" :portal="false"
                class="w-[var(--reka-popover-trigger-width)] max-h-[50vh] overflow-y-auto overscroll-contain p-1"
                @open-auto-focus="(e: Event) => e.preventDefault()">
                <div ref="inlineListRef">
                    <button v-for="(r, i) in state.results.value" :key="`${r.item.id}-${r.item.type}-${i}`" type="button"
                        class="fuzzy-search-result interactive-item flex w-full items-baseline gap-1.5 px-2 py-1.5 text-left text-sm"
                        :class="{ 'is-selected bg-muted/50': i === state.selectedIndex.value }"
                        @click="state.selectResult(r)" @mouseenter="state.selectedIndex.value = i">
                        <Badge v-if="getTypeLabel(r)" variant="secondary" class="shrink-0 text-[0.6rem] font-bold uppercase tracking-wider">{{ getTypeLabel(r) }}</Badge>
                        <span class="fuzzy-search-label flex-1 min-w-0 truncate text-foreground/85">{{ resultLabel(r) }}</span>
                    </button>
                </div>
            </PopoverContent>
        </Popover>

        <Dialog v-model:open="state.isExpanded.value">
            <DialogContent variant="opaque"
                class="!max-w-[36rem] !top-[12vh] !translate-y-0 max-h-[70vh] !p-0 overflow-hidden flex flex-col gap-0"
                @open-auto-focus="(e: Event) => e.preventDefault()">
                <div class="flex items-center gap-2 border-b border-border/50 px-3.5 py-3">
                    <Search class="h-4 w-4 shrink-0 text-muted-foreground/70" />
                    <input ref="modalInputRef" type="text" class="input-bar-field flex-1 text-base" :placeholder="placeholder"
                        :value="state.query.value"
                        @input="state.query.value = ($event.target as HTMLInputElement).value"
                        @keydown="state.onKeydown" />
                    <Button type="button" variant="ghost" size="icon" class="!h-7 !w-7" title="Collapse" @click="state.toggleExpanded()">
                        <Minimize2 class="h-3.5 w-3.5" />
                    </Button>
                </div>
                <div v-if="state.results.value.length > 0" ref="modalListRef" class="flex-1 min-h-0 overflow-y-auto overscroll-contain p-1.5">
                    <button v-for="(r, i) in state.results.value" :key="`modal-${r.item.id}-${r.item.type}-${i}`" type="button"
                        class="fuzzy-search-result interactive-item flex w-full items-baseline gap-1.5 px-2.5 py-2 text-left"
                        :class="{ 'is-selected bg-muted/50': i === state.selectedIndex.value }"
                        @click="state.selectResult(r)" @mouseenter="state.selectedIndex.value = i">
                        <Badge v-if="getTypeLabel(r)" variant="secondary" class="shrink-0 text-[0.65rem] font-bold uppercase tracking-wider">{{ getTypeLabel(r) }}</Badge>
                        <span class="fuzzy-search-label flex-1 min-w-0 truncate text-base text-foreground/85">{{ resultLabel(r) }}</span>
                    </button>
                </div>
                <div v-else class="px-4 py-8 text-center text-muted-foreground/60">No results</div>
                <div class="flex items-center gap-4 border-t border-border/50 px-3.5 py-2 text-mono-caption text-muted-foreground/60">
                    <span class="flex items-center gap-1"><kbd class="kbd">&uarr;</kbd><kbd class="kbd">&darr;</kbd> navigate</span>
                    <span class="flex items-center gap-1"><kbd class="kbd">&crarr;</kbd> select</span>
                    <span class="flex items-center gap-1"><kbd class="kbd">esc</kbd> close</span>
                </div>
            </DialogContent>
        </Dialog>
    </div>
</template>
