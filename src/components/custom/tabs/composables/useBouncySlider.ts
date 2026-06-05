import {
    ref,
    watch,
    onMounted,
    onUnmounted,
    nextTick,
    type Ref,
    type ComputedRef,
} from "vue";
import type { ToggleOption } from "../BouncyToggle.vue";
// `import type` keeps this type-only reference out of the runtime graph, so the
// SFC ↔ composable edge never forms a runtime require cycle.

/**
 * Package-private composable for `BouncyToggle.vue` — owns the JS-measured
 * slider path: the single- and multi-select slider styles, the offset measure,
 * the model/options re-measure watchers, and the ResizeObserver lifecycle.
 *
 * The composable is the SOLE writer of the JS slider styles. It runs only on
 * the multi-select OR `@supports not (anchor)` branch — on an anchor-supporting
 * single-select engine the CSS `anchor-name` owns the slider position and this
 * path stays dormant (no RO is constructed, no measure runs). The split is a
 * KISS transposition of the logic formerly inlined in the SFC; rendered DOM and
 * behavior are unchanged.
 */
export interface UseBouncySliderParams {
    /** The container scroller root (observed by the ResizeObserver). */
    containerRef: Ref<HTMLElement | null>;
    /** Per-option button refs, index-aligned to `options`. */
    buttonRefs: Ref<HTMLElement[]>;
    /** The toggle options (re-measure on change). */
    options: ComputedRef<ToggleOption[]>;
    /** The defineModel value (re-measure on change). */
    model: Ref<string | string[] | undefined>;
    /** True for the multi-select path. */
    multiSelect: ComputedRef<boolean>;
    /** Whether the browser supports CSS anchor positioning. */
    anchorSupported: boolean;
    /** True when ANY JS slider writer is live (gates RO/watcher attach). */
    jsSliderActive: ComputedRef<boolean>;
    /** The active option values (used by the multi-slider measure). */
    activeValues: ComputedRef<string[]>;
}

export interface UseBouncySliderReturn {
    /** Inline style for the single-select JS slider. */
    singleSliderStyle: Ref<Record<string, string>>;
    /** Inline styles for each active multi-select slider, keyed by value. */
    multiSliderStyles: Ref<Record<string, Record<string, string>>>;
}

export function useBouncySlider(
    params: UseBouncySliderParams,
): UseBouncySliderReturn {
    const {
        containerRef,
        buttonRefs,
        options,
        model,
        multiSelect,
        anchorSupported,
        jsSliderActive,
        activeValues,
    } = params;

    // ── Single-select slider style (JS fallback path only) ──

    const singleSliderStyle = ref<Record<string, string>>({
        width: "0px",
        transform: "translateX(0px)",
        opacity: "0",
    });

    function updateSingleSlider() {
        if (multiSelect.value || anchorSupported) return;
        const idx = options.value.findIndex(
            (o) => o.value === (model.value as string),
        );
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
        if (!multiSelect.value) return;
        const styles: Record<string, Record<string, string>> = {};
        for (const value of activeValues.value) {
            const optionIdx = options.value.findIndex((o) => o.value === value);
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
        if (multiSelect.value) {
            updateMultiSliders();
        } else {
            updateSingleSlider();
        }
    }

    // ── Watchers (JS slider path only) ──
    // On the anchor path the CSS `anchor-name` follows `aria-pressed`
    // reactively, so no watcher-driven re-measure is needed.

    watch(
        () => model.value,
        () => {
            if (jsSliderActive.value) nextTick(updateSliders);
        },
        { deep: true },
    );
    watch(
        () => options.value,
        () => {
            if (jsSliderActive.value) nextTick(updateSliders);
        },
        { deep: true },
    );

    // ── Lifecycle ──
    //
    // The `ResizeObserver` + the initial measure attach ONLY when a JS slider
    // writer is live (multi-select, or single-select on a non-anchor engine).
    // On an anchor-supporting single-select engine the CSS owns the slider
    // position, so no RO is constructed and no measure runs — the AQ.W6
    // listener-count win.

    let resizeObserver: ResizeObserver | null = null;

    onMounted(() => {
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

    return {
        singleSliderStyle,
        multiSliderStyles,
    };
}
