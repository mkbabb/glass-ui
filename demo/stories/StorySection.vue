<script setup lang="ts">
// StorySection — canonical "label + body" host across the storybook.
//
// The dominant idiom in `demo/stories/**` is:
//   <section class="flex flex-col gap-3">
//     <p class="section-label">{label}</p>
//     <p class="text-prose text-muted-foreground">{blurb}</p>
//     ... content ...
//   </section>
//
// 129 hosts ship the `flex flex-col gap-3` wrapper; 104 ship the
// section-label paragraph as their first child. The duplication collapses
// behind this SFC. Replaces the wrapper + label + (optional) blurb with
// a single declarative element.
//
// # Canonical section-heading rung (AZ.W-HIERARCHY — D1-1)
//
// There are TWO distinct section-organizing registers, and they are NOT the
// same rung:
//   - `heading` → a SEMANTIC section <h2> at the canonical `text-subheading`
//     rung (√φ, 20.4px / 600). This is THE canonical section-heading register
//     — a story that organizes its body into named sections reaches for this,
//     NOT a hand-rolled `text-sm font-semibold text-muted-foreground` (14px,
//     BELOW body — reads as a caption) or a `text-heading` (25.9px — duplicates
//     the page title). The three incompatible patterns the stories used to
//     hand-roll collapse onto this ONE rung at the chassis.
//   - `label`   → the mono-caption EYEBROW (`.section-label`, --type-caption).
//     A supporting tag ABOVE/beside a section, NOT a heading. Stays as-is.
//
// A story may compose `heading` alone, `label` alone, both, or neither (a
// bare body section). When both are present the eyebrow caption sits above
// the semantic <h2>.
import { computed, type HTMLAttributes } from "vue";
import { cn } from "../../src/utils/cn";

interface StorySectionProps {
    /**
     * The canonical SECTION HEADING — renders as a semantic `<h2 class="text-subheading">`
     * (√φ, 20.4px / 600). THE single section-heading rung; use it for a named
     * section's organizing heading (not a hand-rolled `text-sm`/`text-heading`).
     */
    heading?: string;
    /** Renders as `<p class="section-label">` — the mono-caption EYEBROW (not a heading). */
    label?: string;
    /** Optional muted prose under the heading/label, before the slot content. */
    blurb?: string;
    /** Gap between heading, label, blurb, and slot content. */
    gap?: "sm" | "md" | "lg";
    /** Forwarded class string (merged via `cn`). */
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<StorySectionProps>(), {
    gap: "md",
});

const gapClass = computed(() => {
    switch (props.gap) {
        case "sm":
            return "gap-2";
        case "lg":
            return "gap-6";
        case "md":
        default:
            return "gap-3";
    }
});
</script>

<template>
    <section :class="cn('flex flex-col', gapClass, props.class)">
        <!-- The eyebrow caption (mono, supporting) sits ABOVE the semantic heading. -->
        <slot v-if="$slots.label" name="label" />
        <p v-else-if="label" class="section-label">{{ label }}</p>
        <!-- The canonical section heading — a semantic <h2> at the text-subheading
             rung. The `#heading` slot escape lets a story pass richer heading
             markup while keeping the canonical rung on its root <h2>. -->
        <slot v-if="$slots.heading" name="heading" />
        <h2 v-else-if="heading" class="text-subheading">{{ heading }}</h2>
        <!-- The blurb is SUPPORTING demo chrome, not long-form prose — the
             `text-small` workhorse rung (W-SB-TYPE: bias the story chrome DOWN to
             the documented ladder; `text-prose` read WAY too large for a caption). -->
        <p v-if="blurb" class="text-small text-muted-foreground max-w-prose">
            {{ blurb }}
        </p>
        <slot />
    </section>
</template>
