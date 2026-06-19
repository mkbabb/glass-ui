<template>
    <div :class="cn('labeled-field', horizontal && 'labeled-field--horizontal')">
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
        <!-- BC.W-CONTROL-SMOOTH move C (kf-G3) — the horizontal action-slot. ADDITIVE +
             default-OFF: with NO `#action` slot the control renders BARE (byte-identical
             to HEAD — `$slots.action` is falsy, the `v-if` arm below never renders, the
             `v-else` bare `<slot/>` is the HEAD markup). With an `#action` slot the control
             + the trailing action cell sit in a flex row (`labeled-field-row`), so a labeled
             control carries a TRAILING affordance (clear / reveal / copy / edit) beside the
             field. The `horizontal` axis lays the WHOLE field (label beside control) when a
             dense inline form wants it. The action button is a SIBLING cell — it is NOT the
             field's labelling element (the `<label for>`→`controlId` association above is
             untouched, the AM.W0 label-binding contract). The action button inherits the
             wave's lag-kill + rounded register by construction: it composes
             `transition-control` (the quick 0.12s surface clock, move A) + `tap-squish` +
             `focus-ring` + the pill radius (move B), so no per-button fork. -->
        <div v-if="$slots.action" class="labeled-field-row">
            <slot :error-id="errorId" :control-id="controlId" :labelled-by="labelId" />
            <div class="labeled-field-action">
                <slot name="action" :control-id="controlId" />
            </div>
        </div>
        <slot v-else :error-id="errorId" :control-id="controlId" :labelled-by="labelId" />
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
    /**
     * BC.W-CONTROL-SMOOTH move C (kf-G3) — lay the field on the HORIZONTAL axis
     * (label beside control, not above) for dense inline forms. ADDITIVE +
     * default `false`: a bare `<LabeledField>` is byte-identical to HEAD (the
     * stacked label-over-control layout). Pairs with the `#action` slot — a
     * horizontal labeled control carrying a trailing action affordance is the
     * REQ-sec20 horizontal-action case the kf-G3 row booked.
     */
    horizontal?: boolean;
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

<style scoped>
/* BC.W-CONTROL-SMOOTH move C (kf-G3) — the horizontal action-slot layout. These are
   NEW local elements this component renders, so scoped styling applies directly (no
   `:global()` — the Vue-scoped-:global-drop trap, MEMORY). The default stacked layout
   (`.labeled-field { flex-direction: column }`, utilities/base.css) is UNTOUCHED — a bare
   `<LabeledField>` with no `#action` slot and `horizontal=false` renders byte-identical. */

/* The control + trailing action cell sit on the inline axis when an `#action` slot is
   present. The control flexes to fill, the action cell is intrinsic-width (the affordance
   button), top-aligned so a tall control (Textarea) keeps the action at the field top. */
.labeled-field-row {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    inline-size: 100%;
    min-inline-size: 0;
}
.labeled-field-row > :first-child {
    flex: 1 1 auto;
    min-inline-size: 0;
}
.labeled-field-action {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
}

/* The HORIZONTAL axis — label beside control (not above). Overrides the column default
   on the component's OWN root, so scoped applies with no global leak. The label takes
   intrinsic width, the control/action row fills the rest. Default-OFF (`horizontal=false`
   never adds the modifier class → the column layout holds). */
.labeled-field--horizontal {
    flex-direction: row;
    align-items: center;
    gap: 0.75rem;
}
.labeled-field--horizontal :deep(.labeled-field-label) {
    flex: 0 0 auto;
    margin-block-end: 0;
}
</style>
