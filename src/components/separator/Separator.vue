<script setup lang="ts">
import { computed, type HTMLAttributes, useAttrs, useId } from "vue";
import { Separator as RekaSeparator } from "reka-ui";
import type { Orientation } from "../_shared/axes";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";

defineOptions({ inheritAttrs: false });

export interface SeparatorProps {
    orientation?: Orientation;
    decorative?: boolean;
    class?: HTMLAttributes["class"];
    label?: string;
}

const props = withDefaults(defineProps<SeparatorProps>(), {
    orientation: "horizontal",
    decorative: false,
});

const attrs = useAttrs();
const labelId = `${useId()}-label`;
const visibleLabel = computed(() => props.label?.trim());
const forwardedAttrs = computed(() => fixedHostAttrs(attrs));

const delegatedProps = computed(() => {
    const { class: _class, label: _label, ...delegated } = props;
    return delegated;
});

const labelledAttrs = computed(() => {
    const {
        role: _role,
        "aria-orientation": _orientation,
        "aria-label": rawAriaLabel,
        "aria-labelledby": rawAriaLabelledby,
        ...rest
    } = forwardedAttrs.value;

    if (props.decorative) {
        return {
            ...rest,
            role: "none",
            "data-orientation": props.orientation,
        };
    }

    const ariaLabel =
        typeof rawAriaLabel === "string" && rawAriaLabel.trim()
            ? rawAriaLabel
            : undefined;
    const ariaLabelledby =
        typeof rawAriaLabelledby === "string" && rawAriaLabelledby.trim()
            ? rawAriaLabelledby
            : ariaLabel
              ? undefined
              : labelId;

    return {
        ...rest,
        role: "separator",
        "data-orientation": props.orientation,
        "aria-orientation":
            props.orientation === "vertical" ? ("vertical" as const) : undefined,
        "aria-label": ariaLabelledby ? undefined : ariaLabel,
        "aria-labelledby": ariaLabelledby,
    };
});
</script>

<template>
    <div
        v-if="visibleLabel"
        v-bind="labelledAttrs"
        data-slot="separator"
        :class="cn('separator separator-labelled', props.class)"
    >
        <span class="separator-segment" aria-hidden="true" />
        <span :id="labelId" class="separator-label">{{ visibleLabel }}</span>
        <span class="separator-segment" aria-hidden="true" />
    </div>

    <RekaSeparator
        v-else
        v-bind="{ ...forwardedAttrs, ...delegatedProps }"
        data-slot="separator"
        :class="cn('separator', props.class)"
    />
</template>

<style scoped>
/* THE ONE DIVIDER INK (BK #87 W-MARKS §3.2). A separator is an IN-CONTENT rule
   between two subjects, and the library has exactly one figure for that:
   `--ink-seam` (0.08, color-radius.css §ink — break-even 0.0705, so it reads and
   does not shout). The `--separator-ink` token it used to paint (0.22, chosen by
   adjective) is DELETED: it was the fifth of five divider implementations wearing
   five different inks, none of them on the ladder. */
.separator,
.separator-segment {
    background: color-mix(
        in oklab,
        var(--foreground) calc(var(--ink-seam) * 100%),
        transparent
    );
}

.separator[data-orientation="horizontal"] {
    inline-size: 100%;
    block-size: 1px;
}

/* D3 — `block-size: 100%` on a flex child of an INDEFINITE-height parent resolves
   to `auto`, and `auto` on an empty div is 0. Both live vertical separators painted
   1.00 × 0.00 in BOTH engines: the declaration meant "match my siblings" and
   percentage-of-indefinite cannot say that. `align-self: stretch` is the property
   that does say it, and it is the flex box model's own answer rather than a
   percentage hoping for a definite containing block. Measured 1×0 → 1×22.97. */
.separator[data-orientation="vertical"] {
    inline-size: 1px;
    align-self: stretch;
}

/* D2 — the labelled arm is a REAL BLOCK BOX, not a hairline. The `block-size: 1px`
   above is (0,2,0) and this class was (0,1,0), so the horizontal clamp reached the
   labelled host and pinned the whole three-part row to 1246 × 1.00 while its own
   18.70px label overflowed its role-bearing a11y box by 8.84/8.85px. It carries
   `role="separator"` and `aria-labelledby`; a box an assistive tree points at may
   not be 1px tall with its name hanging outside it. */
.separator-labelled {
    display: flex;
    align-items: center;
    background: transparent;
}

/* The un-clamp is spelled at (0,2,0) on each orientation arm, NOT at (0,1,0) on
   the bare class — that specificity gap IS D2. A (0,1,0) `block-size: auto` loses
   to the (0,2,0) hairline clamp above it and the labelled host stays 1px tall. */
.separator-labelled[data-orientation="horizontal"] {
    block-size: auto;
    gap: 0.75rem;
}

.separator-labelled[data-orientation="vertical"] {
    flex-direction: column;
    inline-size: max-content;
    align-self: auto;
    gap: 0.5rem;
}

.separator-segment {
    flex: 1 1 auto;
}

/* The segment floor is 12px, not 16px: 16 was a control-sized minimum on a line
   that is not a control, and it forced a visible stub beside a long label in a
   narrow cel. 12 is the series rung below it. */
[data-orientation="horizontal"] > .separator-segment {
    min-inline-size: 0.75rem;
    block-size: 1px;
}

[data-orientation="vertical"] > .separator-segment {
    inline-size: 1px;
    min-block-size: 0.75rem;
}

/* The label leaves the mono face. A separator label is a SECTION LABEL — "or",
   "more" — not a value, and mono is the library's numeric/value face; it read as
   a code token sitting in prose. The sans section-label rung is what it is. */
.separator-label {
    flex: none;
    color: var(--muted-foreground);
    font-family: var(--font-text);
    font-size: var(--control-label);
    line-height: var(--type-leading-caption);
}
</style>
