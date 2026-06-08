<script setup lang="ts">
import { type HTMLAttributes } from "vue";
import { cn } from "../../../utils";

export interface TabOption {
    label: string;
    value: string;
}

const props = defineProps<{
    options: TabOption[];
    modelValue: string;
    class?: HTMLAttributes["class"];
}>();

const emit = defineEmits<{
    "update:modelValue": [value: string];
}>();

// AQ.W6 §Design 4a — the underline is CSS anchor-positioned, not JS-measured.
// The active tab is `anchor-name: --gl-tab-active`; the `.underline-tabs::before`
// pseudo tethers to it via `position-anchor` + `anchor()`, and the browser
// interpolates `inset` between anchors on selection. The prior per-frame
// offset-FLIP (`updateUnderline` + a `ResizeObserver` + two watchers +
// `onMounted`/`onUnmounted` + `nextTick`) is RETIRED — the static
// `border-bottom` under `@supports not (position-anchor: --x)` is the sole
// feature-detected fallback (never both live). No JS, no reflow, no nextTick.
function select(value: string) {
    emit("update:modelValue", value);
}
</script>

<template>
    <div role="tablist" :class="cn('underline-tabs', props.class)">
        <button
            v-for="option in options"
            :key="option.value"
            class="underline-tab"
            role="tab"
            :aria-selected="modelValue === option.value ? 'true' : 'false'"
            @click="select(option.value)"
        >
            {{ option.label }}
        </button>
    </div>
</template>

<style scoped>
.underline-tabs {
    position: relative;
    display: flex;
    gap: 0.25rem;
}

/* The active tab is the anchor the indicator tethers to. */
.underline-tab[aria-selected="true"] {
    anchor-name: --gl-tab-active;
}

/* Indicator pseudo-element, position-anchored to the active tab. The browser
   interpolates `inset` between anchors on selection — no JS measure path. */
.underline-tabs::before {
    content: "";
    position: absolute;
    position-anchor: --gl-tab-active;
    inset-block-start: calc(anchor(bottom) - 2px);
    inset-inline-start: anchor(left);
    inset-inline-end: anchor(right);
    block-size: 2px;
    background: var(--foreground);
    border-radius: var(--radius-sm);
}

@media (prefers-reduced-motion: no-preference) {
    .underline-tabs::before {
        transition: inset var(--duration-normal) var(--spring-snappy);
    }
}

/* Fallback ladder — static underline when anchor positioning is absent. The
   indicator pseudo is suppressed and the active tab grows a plain bottom border
   (the sole fallback; the JS FLIP path is retired, not kept-as-dead). */
@supports not (position-anchor: --x) {
    .underline-tabs::before {
        display: none;
    }
    .underline-tab[aria-selected="true"] {
        border-bottom: 2px solid var(--foreground);
    }
}

.underline-tab {
    position: relative;
    border: none;
    background: none;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    padding: 0.375rem 0.75rem;
    font: inherit;
    color: var(--muted-foreground);
    transition: color var(--duration-normal) var(--ease-standard);
    border-radius: 0.25rem;
    /* AQ.W3 identity base — a hover-minted stacking context would break
       `anchor()` resolution for the indicator. Keep `scale:1; translate:0` so a
       transformed hover never severs the anchor tether. */
    scale: 1;
    translate: 0;
}

.underline-tab:hover {
    color: var(--surface-tint-70);
}

.underline-tab[aria-selected="true"] {
    color: var(--foreground);
}
</style>
