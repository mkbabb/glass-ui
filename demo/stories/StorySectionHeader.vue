<script setup lang="ts">
// StorySectionHeader — the IconChip-led section header, composed ONCE
// (BC.W-STORYBOOK-META, the dogfood axis-7 GAP-2 mint — the 42nd-paste preventer).
//
// THE DOGFOOD GAP IT CLOSES. The `border-l-[3px]` accent-rail + <IconChip> +
// mono-eyebrow + text-small-blurb section header was pasted across the storybook
// with NO chassis home (storybook-dogfood.md GAP-2). BC.W-PAGE-HIERARCHY PH3
// DELETES the REDUNDANT page-DUPLICATE headers (folding the page identity UP into
// the chassis hero icon) — correct for the redundancy. But where a section
// LEGITIMATELY wants an IconChip-led header (a NAMED section inside the body, NOT
// a re-statement of the page title), there was no primitive to compose, so it got
// pasted again. This unit is that home: the accent rail + the chip + the eyebrow +
// the blurb composed ONCE. The surviving genuine section headers (after PH3's
// fold) compose THIS — no 42nd paste.
//
// IT COMPOSES, IT DOES NOT RE-PASTE. The IconChip POP is the
// shipped <IconChip> primitive — NOT an inline `:style` chip backplate re-paste.
// The `--section-label-accent` inline style is BAKED IN here (the `.section-label
// --tinted` eyebrow-accent register, keyed off the section ramp index), so a
// consumer passes `:section` and gets the coherent eyebrow + rail + chip in ONE
// hue — never a four-hue rainbow.
//
// A demo-private chassis primitive — NOT a library export (zero src/ paint).
import { computed } from "vue";
import { cn } from "@glass/utils/cn";
import { IconChip } from "@glass/components/custom/icon-chip";
import type { IconChipIcon } from "@glass/components/custom/icon-chip";

interface StorySectionHeaderProps {
    /** The IconChip POP glyph (a lucide functional component). */
    icon: IconChipIcon;
    /**
     * The `--section-color-N` ramp index (0..12) — drives the IconChip POP, the
     * accent rail, AND the eyebrow tint in ONE coherent hue. XOR `tone`.
     */
    section?: number;
    /** A complete token colour for the POP + rail + eyebrow (XOR `section`). */
    tone?: string;
    /** The section heading text — renders as the semantic `<h2 text-subheading>`. */
    heading: string;
    /** The mono-caption eyebrow above the heading (optional). */
    eyebrow?: string | null;
    /** The supporting blurb under the heading (the text-small rung). */
    blurb?: string | null;
    /** Forwarded class string for the header root. */
    class?: string;
}

const props = defineProps<StorySectionHeaderProps>();

// The ONE accent hue — the section arm resolves the ramp index, the tone arm a
// complete token. Baked into `--section-label-accent` so the eyebrow + the rail
// read the SAME hue the IconChip POP carries (the one-color-event coherence).
const accent = computed(() => {
    if (props.tone != null) return props.tone;
    if (props.section != null)
        return `var(--section-color-${props.section}, var(--section-color-7))`;
    return "var(--section-color-7)";
});
</script>

<template>
    <!-- The accent-rail section header: a 3px section-hue rail on the leading edge,
         the IconChip POP, the mono eyebrow + semantic <h2>, the subordinate blurb.
         The `--section-label-accent` baked here drives the `.section-label--tinted`
         eyebrow off the SAME hue (no four-hue rainbow). -->
    <header
        :class="
            cn(
                'story-section-header flex flex-col gap-2 border-l-[3px] pl-6',
                props.class,
            )
        "
        :style="{
            '--section-label-accent': accent,
            borderColor: 'color-mix(in oklab, ' + accent + ', transparent 35%)',
        }"
    >
        <div class="flex items-center gap-3">
            <IconChip
                :icon="icon"
                :section="section"
                :tone="tone"
                reveal
                :size="40"
                :glyph-size="20"
            />
            <div class="flex min-w-0 flex-col gap-1">
                <p
                    v-if="eyebrow"
                    class="section-label section-label--tinted"
                >
                    {{ eyebrow }}
                </p>
                <h2 class="text-subheading text-foreground">{{ heading }}</h2>
            </div>
        </div>
        <p
            v-if="blurb"
            class="text-small max-w-prose text-muted-foreground"
        >
            {{ blurb }}
        </p>
    </header>
</template>
