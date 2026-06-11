<template>
    <div class="labeled-field">
        <IconTooltip v-if="tooltip && !hideLabel" :text="tooltip">
            <label :id="labelId" :for="controlId" :class="cn('labeled-field-label', labelClass)"
                >{{ label
                }}<span v-if="required" class="text-destructive" aria-hidden="true">
                    *</span
                ></label
            >
        </IconTooltip>
        <label
            v-else
            :id="labelId"
            :for="controlId"
            :class="cn(hideLabel ? 'sr-only' : 'labeled-field-label', labelClass)"
            >{{ label
            }}<span v-if="required" class="text-destructive" aria-hidden="true">
                *</span
            ></label
        >
        <slot :error-id="errorId" :control-id="controlId" :labelled-by="labelId" />
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
 * AZ.W-BLOB-REDRESS — `hideLabel` VISUALLY hides the field's own label (it
 * renders `sr-only` instead of `.labeled-field-label`) while KEEPING it in the
 * DOM, so the `for`/`id`/`aria-labelledby` control↔label association — the
 * Slider thumb's `aria-labelledby`, the Select trigger's `for` — stays intact
 * and the control is still accessibly named. The visible human label is then
 * supplied by an enclosing chrome row (a `<ConfiguratorRow label>`). This is
 * the canonical fix for the double-label leak: a `<ConfiguratorRow label="X">`
 * wrapping a `<LabeledSlider label="x">` rendered BOTH labels (the human one +
 * the raw config key); the inner control passes `hide-label` so ONE visible
 * human label remains, the raw key demotes to the row's mono `name` token, and
 * a11y is preserved. The tooltip is suppressed when hidden (the row owns the
 * affordance). NO effect on `LabeledField` used standalone (default `false`).
 *
 * AQ.W4 §W4.5 — `required` threads a `aria-hidden` asterisk onto the label
 * (the `required` attr on the slotted control is the semantic carrier). The
 * `error` slot renders an error-message region that the W3.1c
 * `:has(:user-invalid)` group rule reveals; it carries `aria-live="polite"`
 * so the message is announced when shown. The region's id is exposed as the
 * default slot's `errorId` slot-prop so the slotted control can bind
 * `aria-errormessage="errorId"` (the four wrappers auto-wire it; a raw
 * `<LabeledField>` slot binds it manually).
 *
 * # LabeledField vs ConfiguratorRow — recorded divergence (AZ.W-METRIC-UNIFY §B)
 *
 * Both are "label (+ meta) above/beside a slotted control", but they are NOT
 * interchangeable — they emphasize DIFFERENT features:
 *  - LabeledField (this) — for FORM fields. Carries the `for`/`id` label↔control
 *    a11y wiring (`controlId`/`labelId`/`errorId`), the `tooltip`, the `required`
 *    asterisk, and the `aria-live` `error` region.
 *  - ConfiguratorRow — for TOKEN / PRESET controls. Carries the token-`name`
 *    reference, the opt-in `reset` affordance (`canReset`), and the four-rung
 *    `density` axis. No a11y for/id wiring.
 *
 * Reach for LabeledField for accessible form inputs; reach for ConfiguratorRow
 * inside a `<Configurator>` for token sliders/selects. The divergence is recorded
 * (NOT a forced merge — no ≥2-consumer shared-chassis need surfaced) in
 * `docs/precepts/design-idioms.md §9`, alongside the `cn`/`focus-ring` keeps.
 */
defineProps<{
    label: string;
    tooltip?: string;
    labelClass?: HTMLAttributes["class"];
    required?: boolean;
    /**
     * AZ.W-BLOB-REDRESS — render the field's own label `sr-only` (kept in the
     * DOM for the control↔label a11y association) instead of visibly. Use when
     * an enclosing chrome row already supplies the visible human label (a
     * `<ConfiguratorRow label>`), so the inner control does not leak a second
     * (often raw-config-key) label. Default `false` (standalone behavior).
     */
    hideLabel?: boolean;
}>();

const errorId = useId();
// AU.W3 (a11y B3-1) — the for/id binding. `controlId` is exposed as a slot-prop
// so the slotted form control binds `:id`, and the `<label :for>` points at it
// (a programmatic label↔control association — `forms` "associate <label> with its
// input using for and id"). `labelId` is exposed as `labelled-by` for controls
// that can't take a `for` target (Slider's role=slider thumb) — they bind
// `:aria-labelledby`. The four wrappers auto-wire whichever applies.
const controlId = useId();
const labelId = useId();
</script>
