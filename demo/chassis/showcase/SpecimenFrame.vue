<script setup lang="ts">
// SpecimenFrame — the ONE specimen host across the storybook.
//
// The fold of the demo-side `ShowcaseFrame` surface plate + the `DemoSpecimen`
// glassy-card base (BI.W-SPECIMEN-FRAME, G9). ONE glassy sub-card that hosts a
// single demo specimen and NEVER lets a lone interactive child balloon to the
// article width — the structural cure for the ss-14 "outrageously sized" trigger
// (CBA-1/CBA-7): StorySection's body is `flex flex-col` (align-items:stretch), so
// a bare `<Button>`/trigger direct child stretched to the full column (live 1357px).
//
// Two complementary governors keep an outrageous full-width specimen UN-EXPRESSIBLE
// by default:
//   1. the `size` cap (`sm|md|prose|fluid`, default `md`) — a max-inline-size on
//      the frame. `fluid` (uncapped) must be DECLARED, so a full-width specimen is
//      an explicit choice, never an accident of the stretch chassis.
//   2. the bounded align-self carve (scoped, `>`-depth-BOUNDED) — a LONE interactive
//      element that is a DIRECT body child sizes to its content, not the column. A
//      nested-flex button inside a composed layout is NOT a direct child, so its
//      intended sizing is untouched (the pass-3 nested-flex over-reach fenced).
//
// The plate maps onto the SHARED surface axis: the glass tier is the field-
// transmitting material (`glass-<tier>`); the borderless legibility register is the
// shared `veil-surface` recipe (surface-axis.css) — pass it via `class`, never fork
// a demo-local veil plate.
//
// A demo-private chassis primitive — NOT a library export.
import { computed, type HTMLAttributes } from "vue";
import { cn } from "@glass/utils/cn";

type GlassTier = "wash" | "quiet" | "resting" | "floating" | "overlay";

const props = withDefaults(
    defineProps<{
        /** The specimen title — a semantic <h3> at the canonical `text-subheading` rung. */
        heading?: string;
        /** The mono-caption EYEBROW above the title (`.section-label`). */
        label?: string;
        /** Muted prose under the header, before the specimen. */
        blurb?: string;
        /** The glass ladder rung the plate composes — the field-transmitting material. */
        tier?: GlassTier;
        /**
         * The reading-measure cap. `md` (default) bounds the specimen well under the
         * article width; `fluid` is UNCAPPED and must be declared explicitly (a grid
         * cell or a full-bleed scene), so an accidental full-width specimen cannot
         * ship (CBA-7).
         */
        size?: "sm" | "md" | "prose" | "fluid";
        /** Inner padding rung. */
        pad?: "sm" | "md" | "lg";
        /** Forwarded class string (merged via cn). */
        class?: HTMLAttributes["class"];
    }>(),
    { tier: "resting", size: "md", pad: "md" },
);

const hasHeader = computed(() =>
    Boolean(props.heading || props.label || props.blurb),
);

const padClass = computed(() =>
    props.pad === "sm" ? "p-4" : props.pad === "lg" ? "p-8" : "p-6",
);

// The reading-measure cap. `fluid` is the only uncapped rung — it must be declared.
const sizeClass = computed(() => {
    switch (props.size) {
        case "sm":
            return "max-w-sm";
        case "prose":
            return "max-w-prose";
        case "fluid":
            return "max-w-none";
        case "md":
        default:
            return "max-w-2xl";
    }
});
</script>

<template>
    <!-- ONE card per specimen (a glass tier, never a nested `bg-card`). The glass
         plate transmits the page field the StoryPage chassis mounts globally, so the
         specimen reads as liquid glass. The `specimen-frame` hook carries the bounded
         align-self carve; `sizeClass` bounds the reading measure (default `md`). -->
    <section
        :class="
            cn(
                'specimen-frame glass-' + tier,
                'w-full rounded-card shadow-cartoon flex flex-col gap-4',
                sizeClass,
                padClass,
                props.class,
            )
        "
    >
        <!-- The header + hairline rule (the delimiting conformity leg). The title is
             an <h3> (a card/claim rung, not the page section <h2>) at the canonical
             `text-subheading` size. -->
        <header
            v-if="hasHeader"
            class="specimen-frame__header flex flex-col gap-1"
        >
            <p v-if="label" class="section-label">{{ label }}</p>
            <h3 v-if="heading" class="text-subheading">{{ heading }}</h3>
            <p v-if="blurb" class="text-small text-muted-foreground max-w-prose">
                {{ blurb }}
            </p>
        </header>

        <!-- The specimen body — the content varies. -->
        <div class="specimen-frame__body flex flex-col gap-3">
            <slot />
        </div>
    </section>
</template>

<style scoped>
/* The header→body rule: a hairline whisper on the dark-adaptive divider token (it
   survives the dark glass plate), NOT an inline `border-border/N` alpha. Only present
   when the header is. */
.specimen-frame__header {
    padding-block-end: 0.75rem;
    border-block-end: 1px solid var(--configurator-divider);
}

/* The bounded w-full carve (CBA-1/CBA-7): a LONE interactive element that is a
   DIRECT body child sizes to its content, never balloons to the article measure (the
   body is `flex flex-col`, i.e. align-items:stretch). Depth-BOUNDED via `>` — a
   nested-flex button inside a composed layout keeps its intended sizing. */
.specimen-frame__body > button,
.specimen-frame__body > [role="button"],
.specimen-frame__body > a[href] {
    align-self: start;
}
</style>
