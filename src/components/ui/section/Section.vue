<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "../../../utils";
import { PaperBackdrop } from "../../custom/paper-backdrop";

/**
 * Section — thin sectioning primitive that consumes the typography ladder
 * (V.W3.T7 / A5 §5.1 + adjacent). Composes a header + description + content
 * triple, each typography-class-keyed against the canonical `.text-*` rungs:
 *
 * - `header` slot — defaults to `.text-heading` (the canonical section
 *   heading rung); titleClass override picks any of the ladder.
 * - `description` slot — `.text-body` (or `.text-prose` for narrative).
 * - default slot — content body.
 *
 * Authors compose: `<Section title="..." description="...">` for the
 * common case; `<Section>` with named slots for richer headers (icons,
 * tags, action buttons).
 *
 * Section is NOT a glass surface — it's a sectioning landmark over the
 * typography ladder. For glass-surface-as-section, wrap inside `<Card>`.
 *
 * Migrates the `.section-label` typography utility (mono-caps caption)
 * into the `tone="label"` variant, keeping the existing class as a
 * back-compat utility.
 *
 * N.W0 Lane A3 — `backdrop` prop wires `<PaperBackdrop>` as an optional
 * scoped layer behind header + description + content. Default `"none"`
 * preserves prior behavior (purely additive). When `backdrop="paper"`,
 * the `<section>` becomes a `relative isolate` stacking context and the
 * paper layer is pinned `!absolute inset-0` (overriding the underpaint's
 * default `position: fixed`); `paper-underpaint`'s own `z-index: -1` plus
 * the `isolation: isolate` boundary keep the grain behind header + content
 * (which paint at the default stacking order) without leaking below the
 * section's own stacking context.
 */

interface Props {
    /** Heading text — short, sentence-case. Renders inside the header slot. */
    title?: string;
    /** Description / lede paragraph below the heading. */
    description?: string;
    /** Typography rung for the title. `heading` (default) | `title` | `subheading` | `label`. */
    tone?: "heading" | "title" | "subheading" | "label";
    /** Stacking gap between header / description / content blocks. */
    gap?: "tight" | "regular" | "loose";
    /**
     * Optional substrate layer behind the section content.
     * - `"none"` (default): no backdrop; section is a layout-only landmark.
     * - `"paper"`: composes `<PaperBackdrop>` absolutely-positioned behind the
     *   content. Section becomes a relative-positioned stacking context.
     */
    backdrop?: "none" | "paper";
    titleClass?: HTMLAttributes["class"];
    descriptionClass?: HTMLAttributes["class"];
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
    tone: "heading",
    gap: "regular",
    backdrop: "none",
});

const toneClass = {
    heading: "text-heading",
    title: "text-title",
    subheading: "text-subheading",
    label: "section-label",
} as const;

const gapClass = {
    tight: "gap-1",
    regular: "gap-2",
    loose: "gap-4",
} as const;
</script>

<template>
    <section
        :class="
            cn(
                'flex flex-col',
                gapClass[props.gap],
                props.backdrop === 'paper' && 'relative isolate',
                props.class,
            )
        "
    >
        <PaperBackdrop
            v-if="props.backdrop === 'paper'"
            class="!absolute inset-0"
        />
        <header v-if="title || $slots.header" class="flex flex-col gap-1">
            <slot name="header">
                <h2 :class="cn(toneClass[props.tone], props.titleClass)">{{ title }}</h2>
            </slot>
            <p v-if="description || $slots.description" :class="cn('section-description', props.descriptionClass)">
                <slot name="description">{{ description }}</slot>
            </p>
        </header>
        <slot />
    </section>
</template>
