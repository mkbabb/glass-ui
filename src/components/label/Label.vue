<script setup lang="ts">
import { computed, type HTMLAttributes, useAttrs } from "vue";
import { Label as RekaLabel } from "reka-ui";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";

export type LabelRequirement = "required" | "optional";

export interface LabelProps {
    for?: string;
    class?: HTMLAttributes["class"];
    requirement?: LabelRequirement;
    disabled?: boolean;
}

defineOptions({ inheritAttrs: false });

const props = defineProps<LabelProps>();
const attrs = useAttrs();

const forwardedAttrs = computed(() => fixedHostAttrs(attrs));

const delegatedProps = computed(() => {
    const {
        class: _class,
        requirement: _requirement,
        disabled: _disabled,
        ...delegated
    } = props;

    return delegated;
});

const annotation = computed(() => {
    if (props.requirement === "required") return "*";
    if (props.requirement === "optional") return "optional";
    return undefined;
});
</script>

<template>
    <RekaLabel
        v-bind="{ ...forwardedAttrs, ...delegatedProps }"
        data-slot="label"
        :data-requirement="requirement"
        :data-disabled="disabled || undefined"
        :class="cn('label', props.class)"
    >
        <slot />
        <!--
          THE ASTERISK IS HIDDEN; "OPTIONAL" IS ANNOUNCED (S13).

          Announcing the glyph reads "star" or "asterisk" into the accessibility
          tree — documented AT noise, and it says nothing a user can act on.
          REQUIREDNESS IS THE CONTROL'S CHANNEL: `required` / `aria-required` on the
          input itself, which is where a screen reader already looks for it, and
          which a Label cannot supply for a control it does not own. So the `*` is
          decoration for the sighted reader only.

          "optional" is the opposite case and takes the opposite treatment: there is
          no control-side attribute that means optional (the ABSENCE of `required`
          is not announced by anything), so if this word is hidden the information
          is unavailable to AT entirely. It is a real word, it reads correctly, and
          it stays in the tree.
        -->
        <span
            v-if="annotation"
            class="label-requirement"
            :aria-hidden="requirement === 'required' || undefined"
            >{{ annotation }}</span
        >
    </RekaLabel>
</template>

<style scoped>
/* THE CONTROL-VALUE PAIR (BK #87 W-MARKS §3.2). A label is the ANNOTATION on a
   control's value, and PROPORTION §6 budgets exactly one ratio for that pair:
   `--control-label` = `--control-text` × 0.886653 (sizing.css). Label is its first
   consumer.

   What it replaces: `--type-small`, which is the SAME source `--control-text`
   derives from — so the label and the value it annotates rendered at ratio 1.000 on
   desktop and 0.667 at coarse pointer (the value takes `--ui-scale`, the label did
   not). One reads as a heading over its own field; the other reads as a caption
   under it. Reading the budgeted rung lands 0.887 at EVERY viewport and pointer
   class by construction — there is no viewport arm to keep in sync.

   The class is `.label`, not `.glass-label`. It carries font and colour rules and
   nothing else — zero glass, no `backdrop-filter`, no plate — and D29's law is that
   a `glass-` prefix promising a material the component does not have is a lie in
   the stylesheet. Clean break; `.glass-avatar` went the same way in the same cut. */
.label {
    color: var(--foreground);
    font-family: var(--font-text);
    font-size: var(--control-label);
    font-weight: 500;
    line-height: var(--type-leading-small);
}

/* DISABLED IS AN INK CHANGE, NOT A BLANKET FADE. `opacity` on the host faded the
   label AND its annotation AND every glyph in it as one layer, so a disabled
   "optional" sat at α 0.5 × α 0.5 against the plate — the compounding a blanket
   opacity always causes on nested muted content. Ink at full geometry alpha keeps
   the annotation's own contrast independent of the host's. */
.label[data-disabled] {
    cursor: not-allowed;
    color: oklch(from var(--foreground) l 0 h / 0.45);
}

.label-requirement {
    margin-inline-start: 4px;
    color: var(--muted-foreground);
    font-size: var(--type-caption);
    font-weight: 400;
}
</style>
