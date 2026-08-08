<script setup lang="ts">
import { computed, ref, shallowRef, triggerRef, type HTMLAttributes } from "vue";
import { cn } from "../_shared/class-names";
import type { Orientation } from "../_shared/axes";
import {
    type ControlProps,
    type ControlSize,
    controlStateAttrs,
} from "../_shared/control";
import type { SelectionMode, SelectionValue } from "../_shared/selection";
import { useSelectionGroup } from "../../composables/motion/morph/useSelectionGroup";
import { provideToggleGroupContext, type ToggleItemEntry } from "./context";

/* THE SELECTION ROW. `<ToggleGroup>` is an unbounded, WRAPPING row of individually
 * bounded pills; `<SegmentedTabs>` is the segmented CONTROL — a bounded strip with a
 * glide mark. The two were confused here for as long as this component existed: it
 * keyed MATERIAL off cardinality, painting a byte-copy of the tabs track for
 * `single` and nothing for `multiple`, so the same widget was two materials for a
 * reason no user can see. The group now paints NOTHING (styles.css) and the seam is
 * where it belongs — a consumer that wants a plate mints a Card around the row.
 *
 * THE GROUP OWNS NO KEYBOARD, NO ARIA AND NO SELECTION OF ITS OWN. All three come
 * from `useSelectionGroup`, the library's ONE selection engine, which this component
 * is the THIRD consumer of (the dock run and SegmentedTabs are the other two). It
 * arrives already carrying what this component announced wrongly for its whole life:
 * role-per-mode ARIA — `radiogroup`/`radio`/`aria-checked` for a one-of-N chooser,
 * `group`/`aria-pressed` for N independent toggles — where before every mount, both
 * cardinalities, said `group` + `aria-pressed`.
 *
 * THE INDICATOR IS DECLINED, DELIBERATELY. `indicatorRef` is omitted, which is the
 * engine's own documented "plain toggle row" contract: a glide mark across a field
 * that wraps to three rows is not a segmented control, it is a mark taking a
 * shortcut through empty space. Consumers that want one paint it themselves —
 * `<ToggleGroupItem>` carries an `#indicator` slot inside the item, so it inherits
 * the item's hover lift and press squish and NO motion authority leaves the library.
 *
 * reka is GONE from this component. With the boundary went the two paint-time
 * `TypeError` round-trip validators (they policed an untyped `unknown` crossing that
 * no longer happens), the emit pair (`defineModel` — the SegmentedTabs idiom), and
 * eight props that had zero non-default callers across six repositories. */

export interface ToggleGroupProps extends ControlProps {
    /** `single` — a one-of-N chooser. `multiple` — N independent toggles. */
    type: SelectionMode;
    orientation?: Orientation;
    size?: ControlSize;
    class?: HTMLAttributes["class"];
}

defineOptions({ name: "ToggleGroup" });

const props = withDefaults(defineProps<ToggleGroupProps>(), {
    orientation: "horizontal",
    size: "md",
});

/* One scalar model for both cardinalities: `single` holds one value, `multiple` an
 * array. The engine writes it and nothing else does. */
const model = defineModel<SelectionValue | SelectionValue[]>();

const containerRef = ref<HTMLElement | null>(null);

/* THE REGISTRY. `shallowRef` over a plain array: the entries are identity-stable
 * objects an item owns, so deep reactivity would track every field of every item to
 * observe a membership change. Registration nudges the ref explicitly. */
const entries = shallowRef<ToggleItemEntry[]>([]);

function domSorted(list: ToggleItemEntry[]): ToggleItemEntry[] {
    return [...list].sort((a, b) => {
        if (!a.el || !b.el) return 0;
        const rel = a.el.compareDocumentPosition(b.el);
        if (rel & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
        if (rel & Node.DOCUMENT_POSITION_PRECEDING) return 1;
        return 0;
    });
}

const ordered = computed(() => domSorted(entries.value));
/* The two index-aligned arrays the engine requires, both derived from ONE registry. */
const options = computed(() =>
    ordered.value.map((entry) => ({ value: entry.value, disabled: entry.disabled() })),
);
const buttonRefs = computed(() =>
    ordered.value.map((entry) => entry.el).filter((el): el is HTMLElement => !!el),
);

const selection = useSelectionGroup<{ value: SelectionValue; disabled: boolean }>({
    options,
    model,
    mode: computed(() => props.type),
    vertical: computed(() => props.orientation === "vertical"),
    /* MODE-DERIVED, never flat. `automatic` activation fires the engine's `select`
     * on every arrow move, and `select` in `multiple` mode TOGGLES membership — so a
     * flat `automatic` would have arrows flip every item they crossed. `single` is
     * the native radio behaviour (arrows move AND choose); `multiple` moves focus
     * only and commits on Space/Enter. */
    activation: computed(() => (props.type === "single" ? "automatic" : "manual")),
    containerRef,
    buttonRefs,
    /* indicatorRef DELIBERATELY OMITTED — see the header. What that omission actually
     * silences is the travel SQUISH: with no element there is nothing to write
     * `--stretch` to. It does NOT silence the measure, and saying so would be the
     * same false-comment class this lane was convicted of — the indicator's
     * `ResizeObserver` attaches unconditionally (that is its Safari-identical
     * guarantee) and `updateSingleSlider` keeps running rect measures into a
     * `singleSliderStyle` this component never reads. Economizing that dead measure
     * is the engine's own file to change, not a caller's: routed RT-84O → #71
     * W-EYEGLASS, which holds 169 of that file's 204 changed lines in flight. */
});

provideToggleGroupContext({
    register(entry) {
        entries.value.push(entry);
        triggerRef(entries);
    },
    unregister(entry) {
        const at = entries.value.indexOf(entry);
        if (at >= 0) entries.value.splice(at, 1);
        triggerRef(entries);
    },
    isSelected: (value) => selection.isSelected(value),
    itemAttrs: (value) => selection.itemAttrs(value),
    tabindex: (entry) => selection.rovingTabindex(ordered.value.indexOf(entry)),
    select: (entry) => selection.select(entry.value, ordered.value.indexOf(entry)),
    disabled: computed(() => props.disabled ?? false),
});
</script>

<template>
    <div
        ref="containerRef"
        data-slot="toggle-group"
        :class="cn('toggle-group', props.class)"
        :role="selection.groupRole.value"
        :data-type="props.type"
        :data-size="props.size"
        :data-orientation="props.orientation"
        v-bind="controlStateAttrs(props.invalid)"
        @keydown="selection.onKeydown"
    >
        <slot />
    </div>
</template>

<style src="./styles.css"></style>
