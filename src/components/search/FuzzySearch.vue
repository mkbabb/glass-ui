<script setup lang="ts">
import { ref, watch, nextTick, computed, useId } from "vue";
import { Search, X, Maximize2, Minimize2 } from "@lucide/vue";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../dialog";
import { Button } from "../button";
import { Badge } from "../badge";
import { cn } from "../_shared/class-names";
import type { Surface } from "../_shared/axes";
import {
    type ControlSize,
    type SearchVariant,
    controlSizeClass,
    searchFieldVariants,
} from "./searchVariants";
import type { FuzzySearchState, SearchableItem, SearchResult } from "./composables/types";

const props = withDefaults(
    defineProps<{
        state: FuzzySearchState;
        // The field-chrome variant axis on the shared
        // search register (clean break, no `sidebar` rung — `inline` is the boxed
        // pill, `floating` keeps its chromeless overlay reading).
        //   inline   — the boxed glass search pill (the default).
        //   bare     — the chromeless field seated inside another surface.
        // floating — the chromeless overlay/morph aperture (consumes it).
        variant?: SearchVariant;
        // The shared control-size rung (sm quieter, default the golden pill, lg taller)
        // + the shared {glass·veil·opaque} decoration axis (`glass` default → the
        // glassy expand modal, the user's "glassy dynamic search"). The magnitudes
        // stay the `--control-*`/`--search-*` cohort — a `:root` override retunes them.
        size?: ControlSize;
        surface?: Surface;
        placeholder?: string;
        ariaLabel?: string;
        typeLabel?: (item: SearchableItem) => string;
    }>(),
    {
        variant: "inline",
        size: "md",
        surface: "glass",
        placeholder: "Search…",
        ariaLabel: "Search",
    },
);

const searchId = useId();
const inlineListId = `${searchId}-inline-results`;
const modalListId = `${searchId}-modal-results`;
const optionId = (listId: string, index: number) => `${listId}-${index}`;

const inputRef = ref<HTMLInputElement | null>(null);
const modalInputRef = ref<HTMLInputElement | null>(null);
const inlineListRef = ref<HTMLElement | null>(null);
const modalListRef = ref<HTMLElement | null>(null);
const resultAnnouncement = ref("");

const inlineOpen = computed({
    get: () =>
        props.state.isOpen.value &&
        !props.state.isExpanded.value &&
        props.state.results.value.length > 0,
    set: (open: boolean) => { if (!open) props.state.close(); },
});

watch(() => props.state.selectedIndex.value, () => {
    nextTick(() => (props.state.isExpanded.value ? modalListRef.value : inlineListRef.value)
        ?.querySelector(".fuzzy-search-result.is-selected")
        ?.scrollIntoView({ block: "nearest" }));
});
watch(() => props.state.isOpen.value, (open) => {
    if (open) nextTick(() => inputRef.value?.focus());
});
watch(() => props.state.isExpanded.value, (expanded) => {
    if (expanded) nextTick(() => modalInputRef.value?.focus());
});
watch(
    [() => props.state.query.value.trim(), () => props.state.results.value],
    ([query, results]) => {
        if (!query) resultAnnouncement.value = "";
        else {
            const count = results.length === 0
                ? "No results"
                : `${results.length} ${results.length === 1 ? "result" : "results"}`;
            resultAnnouncement.value = `${count} for “${query}”`;
        }
    },
    { immediate: true },
);

function focus() { inputRef.value?.focus(); }
defineExpose({ focus });

function resultLabel(r: SearchResult) { return r.item.label || r.item.text.slice(0, 120); }
function getTypeLabel(r: SearchResult) { return props.typeLabel ? props.typeLabel(r.item) : (r.item.type ?? ""); }

// The index already reports UTF-16 offsets into the exact label string. Slice
// on that same index model so astral graphemes remain intact when the matcher
// returns their adjacent surrogate offsets; never reinterpret offsets through
// code-point iteration.
function labelParts(r: SearchResult) {
    const text = resultLabel(r);
    const matches = new Set(r.matchIndices);
    const parts: Array<{ text: string; matched: boolean }> = [];
    let start = 0;
    let matched = matches.has(0);
    for (let i = 1; i <= text.length; i++) {
        const next = i < text.length && matches.has(i);
        if (i === text.length || next !== matched) {
            parts.push({ text: text.slice(start, i), matched });
            start = i;
            matched = next;
        }
    }
    return parts;
}
</script>

<template>
    <div class="fuzzy-search relative" :class="`fuzzy-search--${variant}`">
        <span class="sr-only" role="status" aria-live="polite" aria-atomic="true">
            {{ resultAnnouncement }}
        </span>
        <Popover v-model:open="inlineOpen">
            <PopoverTrigger as-child>
                <div class="input-bar" :data-surface="surface"
                    :class="cn(controlSizeClass(size), searchFieldVariants({ variant }))">
                    <Search class="size-(--search-icon-size) shrink-0 text-muted-foreground/70" />
                    <input
                        ref="inputRef" type="search" role="combobox" class="input-bar-field" :placeholder="placeholder"
                        :aria-label="ariaLabel" aria-autocomplete="list" :aria-expanded="inlineOpen"
                        :aria-controls="inlineOpen ? inlineListId : undefined"
                        :aria-activedescendant="inlineOpen ? optionId(inlineListId, state.selectedIndex.value) : undefined"
                        :value="state.query.value"
                        @input="state.query.value = ($event.target as HTMLInputElement).value"
                        @keydown="state.onKeydown" @focus="state.isOpen.value = true"
                    />
                    <Button v-if="state.query.value && state.results.value.length > 0"
                        type="button" emphasis="quiet" iconOnly class="size-(--search-button-size)"
                        :aria-label="state.isExpanded.value ? 'Collapse search' : 'Expand search'"
                        :title="state.isExpanded.value ? 'Collapse' : 'Expand'" @click="state.toggleExpanded()">
                        <Maximize2 v-if="!state.isExpanded.value" class="size-(--search-icon-size)" />
                        <Minimize2 v-else class="size-(--search-icon-size)" />
                    </Button>
                    <Button v-if="state.query.value" type="button" emphasis="quiet" iconOnly class="size-(--search-button-size)"
                        aria-label="Clear search" title="Clear search" @click="state.close()">
                        <X class="size-(--search-icon-size)" />
                    </Button>
                </div>
            </PopoverTrigger>
            <PopoverContent align="start" :side-offset="4" :portal="false"
                class="w-(--reka-popover-trigger-width) max-h-[50vh] overflow-y-auto overscroll-contain p-1"
                @open-auto-focus="(e: Event) => e.preventDefault()">
                <div :id="inlineListId" ref="inlineListRef" role="listbox" :aria-label="`${ariaLabel} results`">
                    <button v-for="(r, i) in state.results.value" :id="optionId(inlineListId, i)" :key="`${r.item.id}-${r.item.type}-${i}`" type="button"
                        role="option" tabindex="-1" :aria-selected="i === state.selectedIndex.value"
                        class="fuzzy-search-result glass-menu-row interactive-item flex w-full items-baseline gap-1.5 px-2 py-1.5 text-left text-(length:--search-result-text)"
                        :class="{ 'is-selected': i === state.selectedIndex.value }"
                        :data-highlighted="i === state.selectedIndex.value ? '' : undefined"
                        @click="state.selectResult(r)" @mouseenter="state.selectedIndex.value = i">
                        <Badge v-if="getTypeLabel(r)" variant="secondary" class="shrink-0 text-(length:--search-result-text-secondary) font-bold uppercase tracking-wider">{{ getTypeLabel(r) }}</Badge>
                        <span class="fuzzy-search-label flex-1 min-w-0 truncate text-foreground/85">
                            <template v-for="(part, j) in labelParts(r)" :key="j">
                                <mark v-if="part.matched" class="fuzzy-search-mark">{{ part.text }}</mark>
                                <template v-else>{{ part.text }}</template>
                            </template>
                        </span>
                    </button>
                </div>
            </PopoverContent>
        </Popover>

        <Dialog v-model:open="state.isExpanded.value">
            <!-- The spotlight modal is GLASS (`:surface`, default
                 glass → the warm-cream floating plate, NOT an opaque slab — the
                 user's "glassy dynamic search"). The width reads the `--search-modal-
                 width` knob (cn dedups `max-w-*`, so the token wins over DialogContent's
                 `max-w-lg` with no `!important`). The outer content pad is zeroed by
                 retuning the `--overlay-pad-*` TOKEN the DialogContent recipe reads to 0
                 (the substitution path — NOT an `!p-0` utility fight); each inner section
                 then declares its OWN φ `--overlay-pad-inline/-block` ladder locally (the
                 1rem inline anchor, the √φ ×1.272 block) so the sections breathe on the
                 golden cadence while sitting flush to the modal edge. The modal keeps
                 DialogContent's golden centered position (the clean spotlight read — no
                 `!top-`/`!translate-` cascade fight). -->
            <DialogContent :surface="surface"
                class="max-w-(--search-modal-width) max-h-[70vh] [--overlay-pad-inline:0] [--overlay-pad-block:0] [--search-modal-width:36rem] overflow-hidden flex flex-col gap-0"
                @open-auto-focus="(e: Event) => e.preventDefault()">
                <DialogTitle class="sr-only">{{ ariaLabel }}</DialogTitle>
                <DialogDescription class="sr-only">
                    Search and choose from the available results.
                </DialogDescription>
                <div class="flex items-center gap-2 border-b border-border/50 [--overlay-pad-inline:1rem] [--overlay-pad-block:calc(var(--overlay-pad-inline)*1.272)] px-(--overlay-pad-inline) py-(--overlay-pad-block)">
                    <Search class="size-(--search-icon-size) shrink-0 text-muted-foreground/70" />
                    <input ref="modalInputRef" type="search" role="combobox" class="input-bar-field flex-1 text-(length:--search-result-text)" :placeholder="placeholder"
                        :aria-label="ariaLabel" aria-autocomplete="list" :aria-expanded="state.isExpanded.value"
                        :aria-controls="state.results.value.length ? modalListId : undefined"
                        :aria-activedescendant="state.results.value.length ? optionId(modalListId, state.selectedIndex.value) : undefined"
                        :value="state.query.value"
                        @input="state.query.value = ($event.target as HTMLInputElement).value"
                        @keydown="state.onKeydown" />
                    <Button type="button" emphasis="quiet" iconOnly class="size-(--search-button-size)" aria-label="Collapse search" title="Collapse" @click="state.toggleExpanded()">
                        <Minimize2 class="size-(--search-icon-size)" />
                    </Button>
                </div>
                <div v-if="state.results.value.length > 0" :id="modalListId" ref="modalListRef" role="listbox" :aria-label="`${ariaLabel} results`" class="flex-1 min-h-0 overflow-y-auto overscroll-contain p-1.5">
                    <button v-for="(r, i) in state.results.value" :id="optionId(modalListId, i)" :key="`modal-${r.item.id}-${r.item.type}-${i}`" type="button"
                        role="option" tabindex="-1" :aria-selected="i === state.selectedIndex.value"
                        class="fuzzy-search-result glass-menu-row interactive-item flex w-full items-baseline gap-1.5 px-2.5 py-2 text-left text-(length:--search-result-text)"
                        :class="{ 'is-selected': i === state.selectedIndex.value }"
                        :data-highlighted="i === state.selectedIndex.value ? '' : undefined"
                        @click="state.selectResult(r)" @mouseenter="state.selectedIndex.value = i">
                        <Badge v-if="getTypeLabel(r)" variant="secondary" class="shrink-0 text-(length:--search-result-text-secondary) font-bold uppercase tracking-wider">{{ getTypeLabel(r) }}</Badge>
                        <span class="fuzzy-search-label flex-1 min-w-0 truncate text-foreground/85">
                            <template v-for="(part, j) in labelParts(r)" :key="j">
                                <mark v-if="part.matched" class="fuzzy-search-mark">{{ part.text }}</mark>
                                <template v-else>{{ part.text }}</template>
                            </template>
                        </span>
                    </button>
                </div>
                <div v-else class="px-4 py-8 text-center text-muted-foreground/60">No results</div>
                <div class="flex items-center gap-4 border-t border-border/50 [--overlay-pad-inline:1rem] [--overlay-pad-block:calc(var(--overlay-pad-inline)*1.272)] px-(--overlay-pad-inline) py-(--overlay-pad-block) text-mono-caption text-muted-foreground/60">
                    <span class="flex items-center gap-1"><kbd class="kbd">&uarr;</kbd><kbd class="kbd">&darr;</kbd> navigate</span>
                    <span class="flex items-center gap-1"><kbd class="kbd">&crarr;</kbd> select</span>
                    <span class="flex items-center gap-1"><kbd class="kbd">esc</kbd> close</span>
                </div>
            </DialogContent>
        </Dialog>
    </div>
</template>

<style scoped>
.fuzzy-search-mark {
    background-color: var(--text-highlight-search-bg, color-mix(in srgb, var(--rainbow-pastel-yellow) 55%, transparent));
    color: var(--text-highlight-search-fg, inherit);
}
</style>
