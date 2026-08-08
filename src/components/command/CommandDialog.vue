<script setup lang="ts">
import { computed } from "vue";
import Command from "./Command.vue";
import Dialog from "../dialog/Dialog.vue";
import DialogContent from "../dialog/DialogContent.vue";
import type { CommandDialogEmits, CommandDialogProps } from "./types";

defineOptions({ name: "CommandDialog", inheritAttrs: false });

/* THE SAME LATCH AS `Command.vue`'s, ONE LEVEL UP — and this half is the one that
 * pinned the palette shut from OUTSIDE. `CommandDialogProps extends DialogProps`,
 * so `open` / `defaultOpen` / `modal` / `unmountOnHide` are four bare optional
 * booleans; each compiles to `{ type: Boolean }`, and Vue casts an ABSENT Boolean
 * prop to `false`. The spread below then hands those casts to `<Dialog>` as
 * EXPLICIT values — measured at the cure seat, an uncontrolled `<CommandDialog>`
 * forwarded `{open: false, modal: false, unmountOnHide: false}` to `DialogRoot`
 * and `open: false` to `Command`, so reka read *controlled-and-shut* on every
 * axis and the dialog rendered zero options. Declaring the defaults `undefined`
 * gives each option an own `default` key, which is what suppresses the cast.
 *
 * `<Dialog>` itself does not carry this fault, and the reason is worth stating so
 * nobody "fixes" it: reka's `useForwardProps` forwards only the keys ASSIGNED on
 * the vnode plus non-undefined defaults, so a prop absent from `<Dialog>`'s own
 * tag never reaches `DialogRoot` at all. The fault appears here, where the props
 * object is spread wholesale, because a spread cannot tell an absent prop from a
 * false one. */
const props = withDefaults(defineProps<CommandDialogProps>(), {
    surface: "glass",
    open: undefined,
    defaultOpen: undefined,
    modal: undefined,
    unmountOnHide: undefined,
});
const emit = defineEmits<CommandDialogEmits>();

/* OMITTED WHEN UNSET, not bound as `undefined` — the same shape `Command.vue`
 * uses for the same reason: the key's absence is the signal reka's passive
 * `useVModel` checks, and only an absent key survives the round trip intact. */
const dialogProps = computed(() => {
    const {
        surface: _,
        modelValue: __,
        open,
        defaultOpen,
        modal,
        unmountOnHide,
        ...delegated
    } = props;
    return {
        ...delegated,
        ...(open === undefined ? {} : { open }),
        ...(defaultOpen === undefined ? {} : { defaultOpen }),
        ...(modal === undefined ? {} : { modal }),
        ...(unmountOnHide === undefined ? {} : { unmountOnHide }),
    };
});

/* The palette's own `open` axis, controlled by the dialog when the dialog has an
 * owner and left to reka when it does not. */
const commandProps = computed(() => ({
    modelValue: props.modelValue,
    ...(props.open === undefined ? {} : { open: props.open }),
}));
</script>

<template>
    <Dialog v-bind="dialogProps" @update:open="emit('update:open', $event)">
        <!-- `deliberate` — no built-in ✕. The palette's own search field owns the top-right
             of the plate, and the shipped ✕ painted 27px INSIDE it; no padding axis can fix
             that, because the ✕ is positioned off the plate's pad and the field's pad is
             already 0. Dropping the ✕ is the only remedy the geometry allows, and it hands
             initial focus to the input where a palette wants it. Esc and outside-press
             still dismiss. -->
        <DialogContent
            :surface="props.surface"
            dismiss="deliberate"
            class="command-dialog__content"
        >
            <!-- No plate class here, and none inside `Command` either — DialogContent
                 above IS the plate. The struck `command-dialog__command` hook never
                 had a rule to begin with.

                 ONE DISCLOSURE, and the palette is CONTROLLED BY IT. Inside a dialog
                 the palette has no disclosure of its own worth the name, and the
                 nesting is what makes that structural rather than stylistic: reka
                 mounts a dismissable layer for the combobox content INSIDE the one
                 the dialog mounts, and the inner layer handles Escape first — so an
                 uncontrolled palette closed its own list and left the dialog standing
                 open around an empty plate. Forwarding `open` here — WHEN THE HOST
                 SETS IT, and never as the boolean cast of an absent prop — routes that
                 inner layer's dismissal REQUEST to the single owner through the
                 component's own declared emit. (The provide/inject `dismiss()` bridge
                 this replaces was a side channel racing the same layer; it is deleted
                 with `dialogContext.ts`.) On the uncontrolled arm nobody holds the axis
                 by definition, so the palette starts from its own `defaultOpen` and the
                 dialog from its own — `v-model:open` is the shape that gets one owner. -->
            <Command
                v-bind="commandProps"
                @update:open="emit('update:open', $event)"
                @update:model-value="emit('update:modelValue', $event)"
            >
                <slot />
            </Command>
        </DialogContent>
    </Dialog>
</template>
