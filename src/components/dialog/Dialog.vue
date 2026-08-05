<script setup lang="ts">
import { computed } from "vue";
import { DialogRoot, useForwardPropsEmits } from "reka-ui";

export interface DialogProps {
    open?: boolean;
    defaultOpen?: boolean;
    modal?: boolean;
    unmountOnHide?: boolean;
    /**
     * THE ORIGIN RECT — the surface this dialog grew out of, in viewport coordinates.
     *
     * A SEAM, and it is declared as one: the entrance reads it NOWHERE today, and the
     * plate blooms from its own centre exactly as it does without it. It is here so the
     * expandable-container fold lands `origin="element"` by wiring an entrance to a rect
     * the root already accepts, instead of re-cutting the entrance and this signature in
     * the same breath. It is the ONE prop-shaped hole this wave was told to leave.
     *
     * It carries no machinery on purpose. If the fold refuses, this prop leaves with the
     * refusal — a hole that nothing ever fills is a hole, not an API.
     */
    origin?: DOMRectReadOnly | null;
}

const props = defineProps<DialogProps>();
const emits = defineEmits<{ "update:open": [value: boolean] }>();

// `origin` is withheld from the forward set. reka's root does not know the prop, so
// forwarding it would drop it into `$attrs` on a component that renders no element of
// its own — a stray that can only ever be noise, and a rect stringified onto the DOM if
// the root ever grows one.
const rootProps = computed(() => {
    const { origin: _origin, ...forwardable } = props;
    return forwardable;
});

const forwarded = useForwardPropsEmits(rootProps, emits);
</script>

<template>
    <DialogRoot data-slot="dialog" v-bind="forwarded">
        <slot />
    </DialogRoot>
</template>
