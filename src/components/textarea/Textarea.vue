<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { cn } from "../_shared/class-names";
import { useFieldControlState } from "../_shared/field/control";
import type { TextareaProps } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<TextareaProps>(), {
    invalid: false,
    resize: "vertical",
    size: "md",
});

// `cols`, `rows`, `wrap`, `form`, `maxlength`, `minlength`, `name`, `placeholder`
// and `required` are UNDECLARED and ride `$attrs` — see Input.vue.
// `default: ""` is not decoration: an empty text control's value IS the empty
// string, and declaring it keeps the emitted type narrow (`string | number`)
// for every wrapper that re-emits it. `useVModel` + a hand-written
// `defineEmits` + a `defaultValue` prop delivered the same thing in three
// pieces, one of which (`defaultValue`) had three demo callers and no other.
const modelValue = defineModel<string | number>({ default: "" });
const attrs = useAttrs();
const { ariaInvalid, forwardedAttrs, state } = useFieldControlState(props, attrs);

// `rows` IS the growth floor — and the attribute alone cannot deliver it. Under
// `field-sizing: content` (the register's unconditional default) the engine sizes
// to the content box and never reads `rows`: measured, `rows` 1 / 3 / 8 all render
// a single line. So the value is stamped into `--field-rows`, which the register's
// `min-block-size` resolves. The attribute still rides `$attrs` to the element —
// it is what a non-`field-sizing` engine, a form serialiser and assistive tech
// read — and this is the CSS half of the same fact, not a second source for it.
// Typed `attr()` would let the sheet read the attribute with no stamp at all and
// is refused: Safari does not support it. Absent `rows`, nothing is stamped and
// the register's own default (2, the HTML default) rules.
const rowsStyle = computed(() => {
    const rows = attrs.rows;
    if (rows === undefined || rows === null || rows === "") return undefined;
    return { "--field-rows": String(rows) };
});
</script>

<template>
    <textarea
        v-bind="forwardedAttrs"
        v-model="modelValue"
        :disabled="props.disabled"
        :readonly="props.readonly"
        data-slot="textarea"
        data-kind="textarea"
        :data-size="size"
        :data-state="state"
        :data-resize="resize"
        :aria-invalid="ariaInvalid"
        :style="rowsStyle"
        :class="cn('field-control glass-control-edge', props.class)"
    />
</template>

<style src="../_shared/field/control.css"></style>
