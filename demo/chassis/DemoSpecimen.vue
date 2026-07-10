<script setup lang="ts">
// DemoSpecimen — the BASE demo KIND (BG.W-STORY-PAGE-API §4-D taxonomy).
//
// ONE glassy sub-card hosting a single demo specimen. This is the conformity
// FLOOR every other sub-type extends: a `glass-<tier>` plate (the "one product"
// glassy-card uniformity — every demo reads as glass over the shared warm
// field), an OPTIONAL header (eyebrow · title · blurb) delimited by a hairline
// rule on the dark-adaptive `--configurator-divider` token, and a real `<slot/>`
// so the CONTENT varies while the shape conforms.
//
// A demo-private chassis primitive — NOT a library export.
import { computed, type HTMLAttributes } from "vue";
import { cn } from "@glass/utils/cn";

type GlassTier = "wash" | "quiet" | "resting" | "floating" | "overlay";

const props = withDefaults(
    defineProps<{
        /** The specimen card title — a semantic <h3> at the canonical `text-subheading` rung. */
        heading?: string;
        /** The mono-caption EYEBROW above the title (`.section-label`). */
        label?: string;
        /** Muted prose under the header, before the specimen. */
        blurb?: string;
        /** The glass ladder rung the plate composes — the field-transmitting material. */
        tier?: GlassTier;
        /** Inner padding rung. */
        pad?: "sm" | "md" | "lg";
        /** Forwarded class string (merged via cn). */
        class?: HTMLAttributes["class"];
    }>(),
    { tier: "resting", pad: "md" },
);

const hasHeader = computed(() =>
    Boolean(props.heading || props.label || props.blurb),
);

const padClass = computed(() =>
    props.pad === "sm" ? "p-4" : props.pad === "lg" ? "p-8" : "p-6",
);
</script>

<template>
    <!-- ONE card per specimen (PC3-friendly — a glass tier, never a nested
         `bg-card`). The glass plate transmits the page field the StoryPage chassis
         mounts globally, so the specimen reads as liquid glass, not a flat slab. -->
    <section
        :class="
            cn(
                'demo-specimen glass-' + tier,
                'rounded-card shadow-cartoon flex flex-col gap-4',
                padClass,
                props.class,
            )
        "
    >
        <!-- The header + hairline rule (the delimiting conformity leg). The card
             title is an <h3> (a card/claim rung, not the page section <h2>) at the
             canonical `text-subheading` size. -->
        <header
            v-if="hasHeader"
            class="demo-specimen__header flex flex-col gap-1"
            :style="{ borderColor: 'var(--configurator-divider)' }"
        >
            <p v-if="label" class="section-label">{{ label }}</p>
            <h3 v-if="heading" class="text-subheading">{{ heading }}</h3>
            <p v-if="blurb" class="text-small text-muted-foreground max-w-prose">
                {{ blurb }}
            </p>
        </header>

        <!-- The specimen body — the content varies. -->
        <div class="demo-specimen__body flex flex-col gap-3">
            <slot />
        </div>
    </section>
</template>

<style scoped>
/* The header→body rule: a hairline whisper on the dark-adaptive divider token
   (it survives the dark glass plate — CLAUDE.md §BA.W-CONFIG-CHASSIS), NOT an
   inline `border-border/N` alpha. Only present when the header is. */
.demo-specimen__header {
    padding-block-end: 0.75rem;
    border-block-end: 1px solid var(--configurator-divider);
}
</style>
