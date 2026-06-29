<script setup lang="ts">
// Code — the inline-code rung of the ONE demo code register (BC.W-CODE-BLOCKS).
//
// A thin `<code class="fira-code">` wrapper + a subtle tint chip so a literal
// POPS out of prose. The chip is the SUFFUSE one-color-event idiom transposed to
// code: a `--surface-tint-8` warm-ink backplate + a small inline padding +
// `rounded-sm`, the warm `--foreground` text. It reads as a calm tinted chip —
// the math-paper register — NOT a second competing color (the proportion fence:
// the DEFAULT chip is the neutral warm event home, never a new hue on a page that
// already has its color event).
//
// The component-name / token / subpath / px / numeric literal that used to spell
// `font-mono text-xs` (or a raw `class="fira-code"`) inline folds onto this ONE
// primitive — three dialects retired onto the chip (clean break, no alias).
// Ligatures live (`fira-code` carries liga/calt).
//
// A demo-private chassis primitive — NOT a library export (the <StorySection> /
// <ShowcaseFrame> precedent). A consumer styling its own code uses the documented
// `fira-code` utility directly.
import { computed, type HTMLAttributes } from "vue";
import { cn } from "@glass/utils/cn";

interface CodeProps {
    /**
     * Optional `--section-color-N` family pop (a token-family tint). DEFAULT
     * unset — the neutral warm chip. When set, the chip backplate tints toward
     * the named ramp index (the one-color-event home stays the chip; this only
     * re-tints the EXISTING event, it never adds a second).
     */
    tone?: number;
    /** Forwarded class string (merged via `cn`). */
    class?: HTMLAttributes["class"];
}

const props = defineProps<CodeProps>();

// The chip backplate. Default → the warm `--surface-tint-8` ink chip (the SUFFUSE
// register, in-srgb the brand-overlay way). A `tone` re-points the SAME backplate
// to a low-α `--section-color-N` mix — the existing one-color event, re-tinted.
const chipStyle = computed(() =>
    props.tone === undefined
        ? undefined
        : {
              background: `color-mix(in srgb, var(--section-color-${props.tone}) 16%, transparent)`,
          },
);
</script>

<template>
    <code :class="cn('story-code', 'fira-code', props.class)" :style="chipStyle"
        ><slot
    /></code>
</template>

<style scoped>
/* The inline code chip — fira-code + a warm tint backplate so a literal pops out
   of prose as "this is code", not as decoration. Composes the SUFFUSE
   `--surface-tint-8` event home + the warm `--foreground` ink; a tight inline
   padding + `rounded-sm` corner. No new token minted — it READS the existing
   --surface-tint / --foreground / --radius family. */
.story-code {
    /* The one-color event home: the warm-ink tint chip (in-srgb, the SUFFUSE
       brand-overlay path). A `tone` prop overrides this inline. */
    background: var(--surface-tint-8);
    color: var(--foreground);
    /* A tight inline chip padding (the --card-pad-title-gap-scale: φ²-tight intra
       rhythm, here a fixed small inline pad so the chip hugs the literal). */
    padding-inline: 0.4em;
    padding-block: 0.12em;
    border-radius: var(--radius-sm, 0.25rem);
    /* Code reads a hair tighter than the prose around it. */
    font-size: 0.92em;
    /* The chip never breaks across a line boundary mid-literal. */
    white-space: nowrap;
}
</style>
