<template>
    <div class="labeled-field">
        <IconTooltip v-if="tooltip" :text="tooltip">
            <label :class="cn('labeled-field-label', labelClass)"
                >{{ label
                }}<span v-if="required" class="text-destructive" aria-hidden="true">
                    *</span
                ></label
            >
        </IconTooltip>
        <label v-else :class="cn('labeled-field-label', labelClass)"
            >{{ label
            }}<span v-if="required" class="text-destructive" aria-hidden="true">
                *</span
            ></label
        >
        <slot :error-id="errorId" />
        <div
            v-if="$slots.error"
            :id="errorId"
            class="labeled-field-error"
            aria-live="polite"
        >
            <slot name="error" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { type HTMLAttributes, useId } from "vue";
import { IconTooltip } from "../icon-tooltip";
import { cn } from "../../../utils";

/**
 * LabeledField — parent SFC for the labeled-field family (V.W3.T5 / A5 §5.5).
 *
 * Owns the IconTooltip + label layer that the four sibling primitives
 * (LabeledInput, LabeledSelect, LabeledSlider, LabeledSwitch) used to repeat
 * across their templates. The form control composes via `<slot />`.
 *
 * The four wrappers stay intact for API ergonomics (per the B5 §5.5 keep-wrappers
 * path) but now compose `<LabeledField>` internally — the canonical recipe
 * lives in one place. Consumers may also import `<LabeledField>` directly
 * if they want full control of the slot.
 *
 * The `.labeled-field-label` utility class lives at `utilities.css` and
 * paints the canonical typography (font-display + body-size + muted-fg +
 * cursor-help). The previous mixed `text-base` / `text-lg` literals
 * harmonise on a single body-size token.
 *
 * AQ.W4 §W4.5 — `required` threads a `aria-hidden` asterisk onto the label
 * (the `required` attr on the slotted control is the semantic carrier). The
 * `error` slot renders an error-message region that the W3.1c
 * `:has(:user-invalid)` group rule reveals; it carries `aria-live="polite"`
 * so the message is announced when shown. The region's id is exposed as the
 * default slot's `errorId` slot-prop so the slotted control can bind
 * `aria-errormessage="errorId"` (the four wrappers auto-wire it; a raw
 * `<LabeledField>` slot binds it manually).
 */
defineProps<{
    label: string;
    tooltip?: string;
    labelClass?: HTMLAttributes["class"];
    required?: boolean;
}>();

const errorId = useId();
</script>
