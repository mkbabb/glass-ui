<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ComboboxRoot as RekaComboboxRoot } from "reka-ui";
import { cn } from "../_shared/class-names";
import type { ComboboxValue } from "../_shared/selection";
import { isSelectionValue } from "../_shared/selection";
import type { CommandEmits, CommandProps } from "./types";

/* TWO REPAIRS, ONE SHAPE.
 *
 * `open` has NO default, and that is the difference between a default and a LATCH.
 * It used to default `true`, so reka received a literal `true` on every render and
 * could never own the state: `@update:open` reported a close the root immediately
 * overwrote, and `mount(Command)` produced a palette that could not be closed. The
 * product fact — an inline palette shows its list — is true, and it is now said in
 * the place that can hold it: `defaultOpen`, a STARTING value reka may move off.
 * `open` unset means reka owns the axis, which is the uncontrolled arm this
 * component always claimed to have.
 *
 * `v-bind="$attrs"` is the whole attribute forward. `inheritAttrs: false` with no
 * bind is a sink: twelve reka `ComboboxRoot` props (`multiple`, `filterFunction`,
 * `resetSearchTermOnBlur`, `highlightOnHover`, …) were reachable in reka, written
 * by consumers, and silently dropped here. Forwarding them costs zero declared
 * surface — declaring props for consumers we do not have is the opposite fault. */
defineOptions({ name: "Command", inheritAttrs: false });

/* `open: undefined` and `disabled: undefined` are DECLARED defaults, and declaring
 * them is the whole point. A `boolean` prop with no default compiles to
 * `{ type: Boolean }`, and Vue casts an ABSENT Boolean prop to `false` — so
 * `props.open` read `false` on a palette nobody was controlling, and every
 * "is it controlled?" test downstream answered yes. Spelling the default
 * `undefined` gives the option an own `default` key, which is what suppresses the
 * cast. (The second site of the same class; `Collapsible.vue` is the other.) */
const props = withDefaults(defineProps<CommandProps>(), {
    open: undefined,
    defaultOpen: true,
    disabled: undefined,
    surface: "glass",
});
const emit = defineEmits<CommandEmits>();
const attrs = useAttrs();

/* `open` IS OMITTED WHEN UNSET, and it has to be omitted rather than bound to
 * `undefined`. Reka declares `open` as a `Boolean` prop, and Vue's boolean-prop
 * casting resolves an explicitly-bound `undefined` to `false` — so `:open="props
 * .open"` on an uncontrolled palette does not hand reka the axis, it hands reka a
 * hard `false`. That is the same latch as before, pointed the other way: the list
 * simply never opened. Omitting the key is what makes `props.open === undefined`
 * reach reka as "nobody is controlling this", which is the condition its own
 * passive `useVModel` checks. */
const rootProps = computed(() => ({
    ...attrs,
    modelValue: props.modelValue,
    ...(props.open === undefined ? {} : { open: props.open }),
    defaultOpen: props.defaultOpen,
    disabled: props.disabled,
}));

/* The guard widens for the array arm because `multiple` now genuinely reaches
 * reka through the attrs forward: a multi-select root emits an ARRAY, and a throw
 * on a legal, reachable reka state would be a landmine planted by the same cure
 * that made the state reachable. Scalars are still validated one at a time. */
function updateModelValue(value: unknown): void {
    const values = Array.isArray(value) ? value : [value];
    for (const entry of values) {
        if (entry !== null && entry !== undefined && !isSelectionValue(entry)) {
            throw new TypeError("[glass-ui] Command received a non-scalar value.");
        }
    }
    emit("update:modelValue", value as ComboboxValue);
}
</script>

<template>
    <!-- The root is a CHASSIS, not a plate. It used to compose `glass-floating`
       unconditionally, so inside `<CommandDialog>` — whose DialogContent is already
       a glass plate — the palette sampled a backdrop that was itself a backdrop
       sample: a plate nested in a plate, one blur reading the blur beneath it.
       The host owns the material now; a standalone `<Command>` composes a rung
       itself (`class="glass-floating"`), which is one word and one owner. -->
    <RekaComboboxRoot
        v-bind="rootProps"
        data-slot="command"
        :data-surface="props.surface"
        :class="cn('command', props.class)"
        @update:model-value="updateModelValue"
        @update:open="emit('update:open', $event)"
    >
        <slot />
    </RekaComboboxRoot>
</template>

<style src="./styles.css"></style>
