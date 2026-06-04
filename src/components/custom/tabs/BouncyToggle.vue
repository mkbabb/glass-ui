<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted, nextTick, type HTMLAttributes } from "vue";
import { cn } from "../../../utils";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "../../ui/tooltip";

// WAAPI keyframes can't dereference custom properties — resolve literals at
// runtime via the cascade root. Inlined per K.W3.A.4 (cssVar() retire);
// `useTokenColor` is reactive (subscribes to dark-mode flips) which is
// overhead the click-time WAAPI press read does not need.
function readToken(name: string, fallback: string): string {
    if (typeof document === "undefined") return fallback;
    return (
        getComputedStyle(document.documentElement).getPropertyValue(name).trim() ||
        fallback
    );
}

export interface ToggleOption {
    label: string;
    value: string;
    icon?: string;
    disabled?: boolean;
    tooltip?: string;
}

export interface BouncyToggleProps {
    options: ToggleOption[];
    modelValue: string | string[];
    multiSelect?: boolean;
    /** "default" = subtle muted slider; "pill" = solid foreground pill */
    variant?: "default" | "pill";
    /**
     * Tab-row overflow handling.
     * - `"none"` (default) — inline-grid with `1fr` tracks; tabs share width
     *   and clip when content exceeds the parent.
     * - `"scroll"` — flex row with intrinsic-width tracks + `.scroll-fade-mask`
     *   + `.scrollbar-hidden`; tab text never truncates and overflowing tabs
     *   scroll horizontally with edge fades.
     * - `"auto"` — flex row with intrinsic widths and a horizontal scroll
     *   fallback (no fade); useful when the parent already owns the affordance.
     */
    overflow?: "none" | "scroll" | "auto";
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<BouncyToggleProps>(), {
    multiSelect: false,
    variant: "default",
    overflow: "none",
});

const emit = defineEmits<{
    "update:modelValue": [value: string | string[]];
}>();

const containerRef = ref<HTMLElement | null>(null);
const buttonRefs = ref<HTMLElement[]>([]);

// AQ.W6 §Design 4b — the single-select slider is CSS anchor-positioned where
// supported; the active button carries `anchor-name: --gl-toggle-active` and
// `.bouncy-slider` tethers to it via `position-anchor` + `inset: anchor(...)`,
// so the browser interpolates the slider between buttons with ZERO measure JS.
//
// `anchor-name` is single-target, so the MULTI-select path (N simultaneous
// sliders) cannot be anchor-positioned — it KEEPS the JS measure path
// (`updateMultiSliders` + the `ResizeObserver`) as its sole writer. Likewise a
// non-anchor engine falls back to the JS single-slider writer. So the JS path
// runs only on the multi-select OR `@supports not (anchor)` branch — never
// double-running alongside the CSS anchor on the same element.
const ANCHOR_SUPPORTED =
    typeof CSS !== "undefined" &&
    typeof CSS.supports === "function" &&
    CSS.supports("position-anchor", "--x");

// ── Computed state ──

const isPill = computed(() => props.variant === "pill");
const isScroll = computed(() => props.overflow === "scroll");
const isAuto = computed(() => props.overflow === "auto");

const activeValues = computed<string[]>(() => {
    if (props.multiSelect) {
        return Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue];
    }
    return [props.modelValue as string];
});

const isActive = (value: string) => activeValues.value.includes(value);

// True when the JS single-slider writer is the active path: single-select on a
// non-anchor engine. (Single-select on an anchor engine → CSS owns it.)
const jsSingleSlider = computed(() => !props.multiSelect && !ANCHOR_SUPPORTED);
// True when ANY JS slider writer is live (so the RO/watchers attach at all).
const jsSliderActive = computed(() => props.multiSelect || !ANCHOR_SUPPORTED);

// ── Single-select slider style (JS fallback path only) ──

const singleSliderStyle = ref<Record<string, string>>({
    width: "0px",
    transform: "translateX(0px)",
    opacity: "0",
});

function updateSingleSlider() {
    if (props.multiSelect || ANCHOR_SUPPORTED) return;
    const idx = props.options.findIndex((o) => o.value === (props.modelValue as string));
    if (idx < 0 || !buttonRefs.value[idx]) return;
    const btn = buttonRefs.value[idx];
    singleSliderStyle.value = {
        width: `${btn.offsetWidth}px`,
        transform: `translateX(${btn.offsetLeft}px)`,
        opacity: "1",
    };
}

// ── Multi-select slider styles ──

const multiSliderStyles = ref<Record<string, Record<string, string>>>({});

function updateMultiSliders() {
    if (!props.multiSelect) return;
    const styles: Record<string, Record<string, string>> = {};
    for (const value of activeValues.value) {
        const optionIdx = props.options.findIndex((o) => o.value === value);
        const btn = buttonRefs.value[optionIdx];
        if (!btn) continue;
        styles[value] = {
            width: `${btn.offsetWidth}px`,
            transform: `translateX(${btn.offsetLeft}px)`,
            opacity: "1",
        };
    }
    multiSliderStyles.value = styles;
}

// ── Unified update ──

function updateSliders() {
    if (props.multiSelect) {
        updateMultiSliders();
    } else {
        updateSingleSlider();
    }
}

// ── Button press animation (Web Animations API) ──

function animatePress(btn: HTMLElement) {
    // Honor reduced-motion preference — skip the bounce entirely.
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    // Cancel any in-flight press animations on this button
    btn.getAnimations().forEach((a) => a.cancel());

    // WAAPI keyframes can't dereference custom properties; resolve at runtime.
    const easing = readToken("--ease-apple-spring", "cubic-bezier(0.175, 0.885, 0.32, 1.275)");
    const press = readToken("--scale-press", "0.95");
    const hover = readToken("--scale-hover", "1.08");

    btn.animate(
        [
            { transform: "scale(1)" },
            { transform: `scale(${press})`, offset: 0.25 },
            { transform: `scale(${hover})`, offset: 0.7 },
            { transform: "scale(1)" },
        ],
        {
            duration: 200,
            easing,
        },
    );
}

// ── Scroll-active-into-view (overflow scroller only) ──
//
// In the `scroll`/`auto` overflow variants the container is a horizontal
// scroller with an edge fade mask; the rightmost tab can sit under the fade
// with no visible affordance. Bring the just-selected (or initially-active)
// button into the solid band so it is never born clipped. No-op for the
// default `none` variant (no scroller). Honors reduced-motion.
function scrollButtonIntoView(idx: number) {
    if (!isScroll.value && !isAuto.value) return;
    const btn = buttonRefs.value[idx];
    if (!btn) return;
    const reduceMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    btn.scrollIntoView({
        inline: "nearest",
        block: "nearest",
        behavior: reduceMotion ? "auto" : "smooth",
    });
}

// ── Selection handler ──

function select(value: string, idx: number) {
    const option = props.options[idx];
    if (option?.disabled) return;

    const btn = buttonRefs.value[idx];
    if (btn) {
        animatePress(btn);
    }

    if (props.multiSelect) {
        const current = [...activeValues.value];
        const existingIdx = current.indexOf(value);
        if (existingIdx > -1) {
            // Don't deselect the last remaining value
            if (current.length > 1) {
                current.splice(existingIdx, 1);
            }
        } else {
            current.push(value);
        }
        emit("update:modelValue", current);
    } else {
        emit("update:modelValue", value);
    }

    scrollButtonIntoView(idx);
}

// ── Watchers (JS slider path only) ──
// On the anchor path the CSS `anchor-name` follows `aria-pressed` reactively,
// so no watcher-driven re-measure is needed.

watch(
    () => props.modelValue,
    () => {
        if (jsSliderActive.value) nextTick(updateSliders);
    },
    { deep: true },
);
watch(
    () => props.options,
    () => {
        if (jsSliderActive.value) nextTick(updateSliders);
    },
    { deep: true },
);

// ── Lifecycle ──
//
// The `ResizeObserver` + the initial measure attach ONLY when a JS slider
// writer is live (multi-select, or single-select on a non-anchor engine). On an
// anchor-supporting single-select engine the CSS owns the slider position, so
// no RO is constructed and no measure runs — the AQ.W6 listener-count win.

let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
    // Bring the initially-active button on-screen when the overflow scroller is
    // live — independent of the slider path, so an anchor-engine single-select
    // (no JS slider) that opens with a clipped active tab is not born clipped.
    nextTick(() => {
        const activeIdx = props.options.findIndex((o) =>
            isActive(o.value),
        );
        if (activeIdx >= 0) scrollButtonIntoView(activeIdx);
    });

    if (!jsSliderActive.value) return;
    nextTick(updateSliders);
    if (containerRef.value) {
        resizeObserver = new ResizeObserver(() => updateSliders());
        resizeObserver.observe(containerRef.value);
    }
});

onUnmounted(() => {
    resizeObserver?.disconnect();
});
</script>

<template>
    <div
        ref="containerRef"
        :class="cn(
            isPill ? 'bouncy-toggle bouncy-toggle--pill' : 'bouncy-toggle',
            isScroll && 'bouncy-toggle--scroll scroll-fade-mask scrollbar-hidden',
            isAuto && 'bouncy-toggle--auto scrollbar-hidden',
            props.class,
        )"
    >
        <!-- Single-select slider.
             Anchor path → no inline `:style` (CSS `position-anchor` + `inset`
             govern position, keyed off the active button's `anchor-name`).
             Fallback path → the JS-measured `singleSliderStyle`. -->
        <div
            v-if="!multiSelect"
            :class="[
                isPill ? 'bouncy-slider bouncy-slider--pill' : 'bouncy-slider',
                jsSingleSlider ? 'bouncy-slider--js' : 'bouncy-slider--anchor',
            ]"
            :style="jsSingleSlider ? singleSliderStyle : undefined"
        />

        <!-- Multi-select sliders (one per active value) -->
        <template v-if="multiSelect">
            <div
                v-for="value in activeValues"
                :key="'slider-' + value"
                :class="[
                    isPill ? 'bouncy-slider bouncy-slider--pill' : 'bouncy-slider',
                    'bouncy-slider--js',
                ]"
                :style="multiSliderStyles[value] ?? { opacity: '0' }"
            />
        </template>

        <!-- Buttons -->
        <template v-for="(option, idx) in options" :key="option.value">
            <!-- With tooltip -->
            <TooltipProvider v-if="option.tooltip" :delay-duration="200">
                <Tooltip>
                    <TooltipTrigger as-child>
                        <button
                            :ref="(el) => { if (el) buttonRefs[idx] = el as HTMLElement }"
                            :class="[
                                isPill ? 'bouncy-btn bouncy-btn--pill' : 'bouncy-btn',
                                option.disabled && 'is-disabled',
                            ]"
                            :aria-pressed="isActive(option.value) ? 'true' : 'false'"
                            :disabled="option.disabled"
                            @click="select(option.value, idx)"
                        >
                            <slot name="option" :option="option" :active="isActive(option.value)">
                                {{ option.label }}
                            </slot>
                        </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" :side-offset="8">
                        {{ option.tooltip }}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <!-- Without tooltip -->
            <button
                v-else
                :ref="(el) => { if (el) buttonRefs[idx] = el as HTMLElement }"
                :class="[
                    isPill ? 'bouncy-btn bouncy-btn--pill' : 'bouncy-btn',
                    option.disabled && 'is-disabled',
                ]"
                :aria-pressed="isActive(option.value) ? 'true' : 'false'"
                :disabled="option.disabled"
                @click="select(option.value, idx)"
            >
                <slot name="option" :option="option" :active="isActive(option.value)">
                    {{ option.label }}
                </slot>
            </button>
        </template>
    </div>
</template>

<style scoped>
/* ── Default variant ── */
.bouncy-toggle {
    position: relative;
    display: inline-grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    padding: 0.1875rem;
    border-radius: 0.4375rem;
    background: var(--muted-medium);
}

@media (min-width: 640px) {
    .bouncy-toggle {
        padding: 0.25rem;
        border-radius: 0.5rem;
    }
}

.bouncy-slider {
    position: absolute;
    background: var(--background);
    z-index: 0;
    inset-block: 0.1875rem;
    border-radius: 0.3125rem;
    box-shadow:
        0 1px 3px rgba(0, 0, 0, 0.08),
        0 0 0 1px color-mix(in srgb, var(--border) 30%, transparent);
}

/* Fallback (JS-measured) path — the slider is moved by inline `transform`/
   `width` writes; animate those. */
.bouncy-slider--js {
    transition:
        transform var(--duration-normal) var(--spring-snappy),
        width var(--duration-normal) var(--spring-snappy),
        opacity var(--duration-fast) ease;
}

/* AQ.W6 anchor path — the slider tethers to the active button's `anchor-name`.
   `inset` reads the anchor's edges (the `inset-block` trim is preserved by
   adding the trim back onto the top/bottom anchor edges); the browser
   interpolates `inset` between buttons on selection. */
@supports (position-anchor: --x) {
    .bouncy-slider--anchor {
        position-anchor: --gl-toggle-active;
        inset-block-start: calc(anchor(top) + 0.1875rem);
        inset-block-end: calc(anchor(bottom) + 0.1875rem);
        inset-inline-start: anchor(left);
        inset-inline-end: anchor(right);
        inset-block: auto;
        opacity: 1;
    }
    @media (prefers-reduced-motion: no-preference) {
        .bouncy-slider--anchor {
            transition: inset var(--duration-normal) var(--spring-snappy);
        }
    }
    .bouncy-btn[aria-pressed="true"] {
        anchor-name: --gl-toggle-active;
    }
}

@media (min-width: 640px) {
    .bouncy-slider {
        inset-block: 0.25rem;
        border-radius: 0.375rem;
    }
    @supports (position-anchor: --x) {
        .bouncy-slider--anchor {
            inset-block-start: calc(anchor(top) + 0.25rem);
            inset-block-end: calc(anchor(bottom) + 0.25rem);
            inset-block: auto;
        }
    }
}

.bouncy-btn {
    position: relative;
    z-index: 10;
    border: none;
    background: none;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    padding: 0.25rem 0.625rem;
    border-radius: 0.3125rem;
    font: inherit;
    font-size: 0.8125rem;
    color: var(--muted-foreground);
    transition: color var(--duration-fast) ease;
    /* AQ.W3 identity base — keep `scale:1; translate:0` so a hover/press
       transform never mints a stacking context that severs `anchor()`
       resolution for the slider (the WAAPI press bounce writes `transform`
       transiently, which is harmless to the anchor box itself). */
    scale: 1;
    translate: 0;
}

@media (min-width: 640px) {
    .bouncy-btn {
        padding: 0.3125rem 0.75rem;
        font-size: 0.875rem;
    }
}

.bouncy-btn[aria-pressed="true"] {
    color: var(--foreground);
}

.bouncy-btn.is-disabled {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
    filter: blur(0.5px);
}

/* ── Pill variant ── */
.bouncy-toggle--pill {
    border-radius: var(--radius-pill);
    background: var(--surface-tint-6);
    padding: 0.125rem;
    gap: 0.125rem;
}

.bouncy-slider--pill {
    border-radius: var(--radius-pill);
    background: var(--foreground);
    box-shadow: none;
    inset-block: 0.125rem;
}

.bouncy-btn--pill {
    border-radius: var(--radius-pill);
    padding: 0.125rem 0.625rem;
    font-size: 0.75rem;
    font-weight: 500;
}

@media (min-width: 640px) {
    .bouncy-btn--pill {
        padding: 0.125rem 0.625rem;
        font-size: 0.75rem;
    }
}

.bouncy-btn--pill[aria-pressed="true"] {
    color: var(--background);
}

/* ── Overflow variants ──
 * `--scroll` and `--auto` swap the inline-grid (1fr tracks share width and
 * truncate labels) for a flex row with intrinsic-width tracks, so tab text is
 * never clipped. The container scrolls horizontally; the absolute-positioned
 * slider tracks scroll content because it is positioned relative to this root.
 */
.bouncy-toggle--scroll,
.bouncy-toggle--auto {
    display: flex;
    grid-auto-flow: unset;
    grid-auto-columns: unset;
    overflow-x: auto;
    overflow-y: hidden;
    width: 100%;
}

/* The pill rail is a short-label segmented control, not a long content scroll
   — the default 1rem edge fade is heavy enough to swallow the last pill at
   rest. Narrow the fade and pad the inline-end by the same amount so the
   rightmost pill always scrolls fully clear of the fade (the fade must never
   eat the last pill). Token-bridged: re-points the shared `--mask-fade-width`
   that `.scroll-fade-mask` reads. */
.bouncy-toggle--scroll {
    --mask-fade-width: 0.5rem;
    padding-inline-end: calc(0.125rem + var(--mask-fade-width));
    scroll-padding-inline: var(--mask-fade-width);
}
</style>
