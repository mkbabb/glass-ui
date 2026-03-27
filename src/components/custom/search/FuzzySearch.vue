<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import { Search, X, Maximize2, Minimize2 } from "lucide-vue-next";
import { fuzzyMatch } from "./composables/fuzzySearchIndex";
import type { FuzzySearchState, SearchableItem, SearchResult } from "./composables/types";

const props = withDefaults(
    defineProps<{
        state: FuzzySearchState;
        variant?: "sidebar" | "floating";
        placeholder?: string;
        typeLabel?: (item: SearchableItem) => string;
    }>(),
    {
        variant: "sidebar",
        placeholder: "Search\u2026",
    },
);

const inputRef = ref<HTMLInputElement | null>(null);
const resultsRef = ref<HTMLElement | null>(null);
const modalInputRef = ref<HTMLInputElement | null>(null);

// Scroll selected result into view
watch(
    () => props.state.selectedIndex.value,
    () => {
        nextTick(() => {
            const container = props.state.isExpanded.value
                ? document.querySelector(".fuzzy-search-modal-results")
                : resultsRef.value;
            const el = container?.querySelector(".is-selected");
            el?.scrollIntoView({ block: "nearest" });
        });
    },
);

// Auto-focus input when opened
watch(
    () => props.state.isOpen.value,
    (open) => {
        if (open) nextTick(() => inputRef.value?.focus());
    },
);

// Focus modal input when expanded
watch(
    () => props.state.isExpanded.value,
    (expanded) => {
        if (expanded) nextTick(() => modalInputRef.value?.focus());
    },
);

function focus() {
    inputRef.value?.focus();
}

defineExpose({ focus });

function resultLabel(r: SearchResult): string {
    return r.item.label || r.item.text.slice(0, 120);
}

function getTypeLabel(r: SearchResult): string {
    if (props.typeLabel) return props.typeLabel(r.item);
    return r.item.type ?? "";
}

/**
 * Highlight matched characters using fuzzy match indices.
 * Re-runs fuzzyMatch on the display label for precise positions.
 */
function highlightFuzzy(text: string, query: string): string {
    if (!query.trim() || !text) return escapeHtml(text);

    const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const textLc = text.toLowerCase();
    const matchSet = new Set<number>();

    for (const token of tokens) {
        const m = fuzzyMatch(token, textLc);
        if (m) {
            for (const idx of m.matches) matchSet.add(idx);
        }
    }

    if (matchSet.size === 0) return escapeHtml(text);

    const chars = [...text];
    const parts: string[] = [];
    let i = 0;

    while (i < chars.length) {
        if (matchSet.has(i)) {
            let j = i;
            while (j < chars.length && matchSet.has(j)) j++;
            parts.push(`<mark>${escapeHtml(chars.slice(i, j).join(""))}</mark>`);
            i = j;
        } else {
            parts.push(escapeHtml(chars[i]));
            i++;
        }
    }

    return parts.join("");
}

function escapeHtml(s: string): string {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
</script>

<template>
    <div class="fuzzy-search" :class="`fuzzy-search--${variant}`">
        <!-- Inline input -->
        <div class="fuzzy-search-input-wrap">
            <Search class="fuzzy-search-icon" />
            <input
                ref="inputRef"
                type="text"
                class="fuzzy-search-input"
                :placeholder="placeholder"
                :value="state.query.value"
                @input="state.query.value = ($event.target as HTMLInputElement).value"
                @keydown="state.onKeydown"
                @focus="state.isOpen.value = true"
            />
            <button
                v-if="state.query.value && state.results.value.length > 0"
                class="fuzzy-search-action-btn"
                @click="state.toggleExpanded()"
                :title="state.isExpanded.value ? 'Collapse' : 'Expand'"
            >
                <Maximize2 v-if="!state.isExpanded.value" class="h-3 w-3" />
                <Minimize2 v-else class="h-3 w-3" />
            </button>
            <button
                v-if="state.query.value"
                class="fuzzy-search-action-btn"
                @click="state.close()"
                title="Clear search"
            >
                <X class="h-3 w-3" />
            </button>
        </div>

        <!-- Inline dropdown (non-expanded) -->
        <Transition name="fuzzy-search-dropdown">
            <div
                v-if="state.isOpen.value && !state.isExpanded.value && state.results.value.length > 0"
                ref="resultsRef"
                class="fuzzy-search-results"
            >
                <button
                    v-for="(r, i) in state.results.value"
                    :key="`${r.item.id}-${r.item.type}-${i}`"
                    class="fuzzy-search-result"
                    :class="{ 'is-selected': i === state.selectedIndex.value }"
                    @click="state.selectResult(r)"
                    @mouseenter="state.selectedIndex.value = i"
                >
                    <span v-if="getTypeLabel(r)" class="fuzzy-search-badge" :data-type="r.item.type">
                        {{ getTypeLabel(r) }}
                    </span>
                    <span
                        class="fuzzy-search-label"
                        v-html="highlightFuzzy(resultLabel(r), state.query.value)"
                    />
                </button>
            </div>
        </Transition>

        <!-- Backdrop for inline dropdown (floating variant only) -->
        <div
            v-if="variant === 'floating' && state.isOpen.value && !state.isExpanded.value && state.results.value.length > 0"
            class="fuzzy-search-backdrop"
            @click="state.close()"
        />

        <!-- Expanded modal -->
        <Teleport to="body">
            <Transition name="fuzzy-search-modal">
                <div
                    v-if="state.isExpanded.value"
                    class="fuzzy-search-modal-overlay"
                    @click.self="state.toggleExpanded()"
                >
                    <div class="fuzzy-search-modal" @click.stop>
                        <!-- Modal header -->
                        <div class="fuzzy-search-modal-header">
                            <Search class="fuzzy-search-modal-icon" />
                            <input
                                ref="modalInputRef"
                                type="text"
                                class="fuzzy-search-modal-input"
                                :placeholder="placeholder"
                                :value="state.query.value"
                                @input="state.query.value = ($event.target as HTMLInputElement).value"
                                @keydown="state.onKeydown"
                            />
                            <button
                                class="fuzzy-search-action-btn"
                                @click="state.toggleExpanded()"
                                title="Collapse"
                            >
                                <Minimize2 class="h-3.5 w-3.5" />
                            </button>
                            <button
                                class="fuzzy-search-action-btn"
                                @click="state.close()"
                                title="Close"
                            >
                                <X class="h-3.5 w-3.5" />
                            </button>
                        </div>

                        <!-- Modal results -->
                        <div class="fuzzy-search-modal-results" v-if="state.results.value.length > 0">
                            <button
                                v-for="(r, i) in state.results.value"
                                :key="`modal-${r.item.id}-${r.item.type}-${i}`"
                                class="fuzzy-search-result fuzzy-search-modal-result"
                                :class="{ 'is-selected': i === state.selectedIndex.value }"
                                @click="state.selectResult(r)"
                                @mouseenter="state.selectedIndex.value = i"
                            >
                                <span v-if="getTypeLabel(r)" class="fuzzy-search-badge" :data-type="r.item.type">
                                    {{ getTypeLabel(r) }}
                                </span>
                                <span
                                    class="fuzzy-search-label"
                                    v-html="highlightFuzzy(resultLabel(r), state.query.value)"
                                />
                            </button>
                        </div>
                        <div v-else class="fuzzy-search-modal-empty">
                            No results
                        </div>

                        <!-- Modal footer -->
                        <div class="fuzzy-search-modal-footer">
                            <span class="fuzzy-search-modal-hint">
                                <kbd>&uarr;</kbd><kbd>&darr;</kbd> navigate
                            </span>
                            <span class="fuzzy-search-modal-hint">
                                <kbd>&crarr;</kbd> select
                            </span>
                            <span class="fuzzy-search-modal-hint">
                                <kbd>esc</kbd> close
                            </span>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<style scoped>
.fuzzy-search {
    position: relative;
}

.fuzzy-search-input-wrap {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    border: 1.5px solid hsl(var(--border) / 0.6);
    border-radius: var(--radius-pill);
    background: hsl(var(--muted) / 0.3);
    padding: 0.35rem 0.625rem;
    transition:
        border-color var(--duration-fast) var(--ease-standard),
        background var(--duration-fast) var(--ease-standard),
        box-shadow var(--duration-fast) var(--ease-standard);
}

.fuzzy-search-input-wrap:focus-within {
    border-color: hsl(var(--ring) / 0.4);
    background: hsl(var(--background));
    box-shadow: var(--focus-ring-shadow);
}

.fuzzy-search-icon {
    width: 0.8rem;
    height: 0.8rem;
    flex-shrink: 0;
    color: hsl(var(--muted-foreground) / 0.5);
}

.fuzzy-search-input {
    flex: 1;
    min-width: 0;
    border: none;
    outline: none;
    background: transparent;
    font-size: 0.78rem;
    color: hsl(var(--foreground));
    font-family: inherit;
}

.fuzzy-search-input::placeholder {
    color: hsl(var(--muted-foreground) / 0.45);
}

.fuzzy-search-action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.15rem;
    border: none;
    background: none;
    color: hsl(var(--muted-foreground) / 0.45);
    cursor: pointer;
    border-radius: var(--radius-sm);
    transition: color var(--duration-fast), background var(--duration-fast);
}

.fuzzy-search-action-btn:hover {
    color: hsl(var(--foreground));
    background: hsl(var(--muted) / 0.5);
}

/* ── Inline dropdown ───────────────────────────────────── */
.fuzzy-search-results {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    z-index: var(--z-popover);
    max-height: 50vh;
    overflow-y: auto;
    overscroll-behavior: contain;
    background: hsl(var(--background) / 0.97);
    backdrop-filter: blur(12px);
    border: 1.5px solid hsl(var(--border));
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
    padding: 0.25rem;
}

.fuzzy-search-result {
    display: flex;
    align-items: baseline;
    gap: 0.375rem;
    width: 100%;
    padding: 0.35rem 0.5rem;
    border: none;
    background: none;
    cursor: pointer;
    text-align: left;
    border-radius: var(--radius-sm);
    transition: background var(--duration-instant) var(--ease-standard);
}

.fuzzy-search-result:hover,
.fuzzy-search-result.is-selected {
    background: hsl(var(--muted) / 0.5);
}

.fuzzy-search-badge {
    flex-shrink: 0;
    font-size: 0.6rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    padding: 0.1rem 0.3rem;
    border-radius: var(--radius-sm);
    background: hsl(var(--muted));
    color: hsl(var(--muted-foreground) / 0.7);
    line-height: 1;
}

.fuzzy-search-label {
    flex: 1;
    min-width: 0;
    font-size: 0.875rem;
    color: hsl(var(--foreground) / 0.85);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.4;
}

.fuzzy-search-label :deep(mark) {
    background: hsl(50 100% 60% / 0.35);
    color: inherit;
    border-radius: var(--radius-sm);
    padding: 0 1px;
}

.fuzzy-search-backdrop {
    position: fixed;
    inset: 0;
    z-index: calc(var(--z-popover) - 5);
}

/* ── Sidebar variant ───────────────────────────────────── */
.fuzzy-search--sidebar {
    margin-bottom: 0.5rem;
}

/* ── Floating variant ──────────────────────────────────── */
.fuzzy-search--floating .fuzzy-search-input-wrap {
    border: none;
    border-radius: 0;
    background: transparent;
    padding: 0;
}

.fuzzy-search--floating .fuzzy-search-input {
    font-size: 1rem;
}

.fuzzy-search--floating .fuzzy-search-results {
    border-radius: 0;
    border-left: none;
    border-right: none;
    top: 100%;
    max-height: 60vh;
}

/* ── Inline dropdown transition ────────────────────────── */
.fuzzy-search-dropdown-enter-active,
.fuzzy-search-dropdown-leave-active {
    transition:
        opacity var(--duration-fast) var(--ease-standard),
        transform var(--duration-fast) var(--ease-out-expo);
}

.fuzzy-search-dropdown-enter-from,
.fuzzy-search-dropdown-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}

/* ── Modal overlay + panel ─────────────────────────────── */
.fuzzy-search-modal-overlay {
    position: fixed;
    inset: 0;
    z-index: var(--z-modal);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: min(12vh, 6rem);
    background: hsl(var(--background) / 0.55);
    backdrop-filter: blur(6px);
}

.fuzzy-search-modal {
    width: min(36rem, calc(100vw - 2rem));
    max-height: 70vh;
    display: flex;
    flex-direction: column;
    border-radius: var(--radius-xl);
    border: 1.5px solid hsl(var(--border));
    background: hsl(var(--background));
    box-shadow: var(--shadow-xl);
    overflow: hidden;
}

.fuzzy-search-modal-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 0.875rem;
    border-bottom: 1px solid hsl(var(--border) / 0.5);
}

.fuzzy-search-modal-icon {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    color: hsl(var(--muted-foreground) / 0.5);
}

.fuzzy-search-modal-input {
    flex: 1;
    min-width: 0;
    border: none;
    outline: none;
    background: transparent;
    font-size: 1rem;
    color: hsl(var(--foreground));
    font-family: inherit;
}

.fuzzy-search-modal-input::placeholder {
    color: hsl(var(--muted-foreground) / 0.4);
}

.fuzzy-search-modal-results {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: 0.375rem;
}

.fuzzy-search-modal-result {
    padding: 0.5rem 0.625rem;
}

.fuzzy-search-modal-result .fuzzy-search-badge {
    font-size: 0.65rem;
    padding: 0.125rem 0.375rem;
}

.fuzzy-search-modal-result .fuzzy-search-label {
    font-size: 1rem;
}

.fuzzy-search-modal-empty {
    padding: 2rem 1rem;
    text-align: center;
    color: hsl(var(--muted-foreground) / 0.5);
    font-size: 1rem;
}

.fuzzy-search-modal-footer {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 0.875rem;
    border-top: 1px solid hsl(var(--border) / 0.5);
}

.fuzzy-search-modal-hint {
    font-size: 0.875rem;
    font-family: var(--font-mono, monospace);
    color: hsl(var(--muted-foreground) / 0.45);
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.fuzzy-search-modal-hint kbd {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1.25rem;
    height: 1.125rem;
    padding: 0 0.25rem;
    border-radius: var(--radius-sm);
    border: 1px solid hsl(var(--border) / 0.6);
    background: hsl(var(--muted) / 0.4);
    font-size: 0.6rem;
    line-height: 1;
}

/* ── Modal transition ──────────────────────────────────── */
.fuzzy-search-modal-enter-active {
    transition: opacity 0.2s var(--ease-standard);
}

.fuzzy-search-modal-enter-active .fuzzy-search-modal {
    transition:
        opacity 0.2s var(--ease-standard),
        transform 0.25s var(--ease-out-expo);
}

.fuzzy-search-modal-leave-active {
    transition: opacity var(--duration-fast) var(--ease-standard);
}

.fuzzy-search-modal-leave-active .fuzzy-search-modal {
    transition:
        opacity var(--duration-fast) var(--ease-standard),
        transform var(--duration-fast) var(--ease-accelerate);
}

.fuzzy-search-modal-enter-from {
    opacity: 0;
}

.fuzzy-search-modal-enter-from .fuzzy-search-modal {
    opacity: 0;
    transform: scale(0.96) translateY(-8px);
}

.fuzzy-search-modal-leave-to {
    opacity: 0;
}

.fuzzy-search-modal-leave-to .fuzzy-search-modal {
    opacity: 0;
    transform: scale(0.97) translateY(-4px);
}
</style>
