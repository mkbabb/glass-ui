<script setup lang="ts">
// ShowcaseFrame — demo-side showcase host for primitive demos.
//
// Replaces the `rounded-card border border-border bg-card shadow-cartoon`
// idiom across ~25-30 sites (5 verbatim + close-variants once `pad` knob
// lands). Per B4 §2.3 the `pad` knob covers the close-variant tail
// (xs=p-3, sm=p-4, md=p-5, lg=p-6, xl=p-10).
//
// # The surface-tier axis (BA.W-STAGE scope 5 — the field-backed mode)
//
// Three tiers:
//   - resting (default) — an opaque `bg-card` plate + border. The OPAQUE-ATOM
//     specimen host (badges, tables, swatches) — the W54 legibility allowlist
//     surface. BYTE-IDENTICAL to HEAD.
//   - quiet   — `bg-card/40` + a faint border. The half-opaque specimen host.
//     BYTE-IDENTICAL to HEAD.
//   - field   — NO opaque plate (border-transparent + bg-transparent). The
//     GLASS-DEMO host: the glass surfaces the frame hosts float DIRECTLY over
//     whatever live/static backdrop the page declares, with NO `bg-card` plate
//     occluding the field (the BG-2 black-plate kill). A glassiness demo
//     (glass-material, the card tiers) uses `tier="field"` so the glass reads
//     against the page substrate, not against a same-tone near-black plate.
//
// # The captioned-frame footer band (BA.W-STAGE scope 6 — the PAD-1/PAD-2 rhythm)
//
// A `caption?` prop / `#caption` slot renders a footer band BELOW the frame body,
// separated by the `--showcase-caption-gap` rhythm token (a demo-local knob owning
// the canvas→caption→edge bottom-padding rhythm). The band reads the mono-caption
// register. W-DEMO-AFFORDANCES wires its curve-picker + demo-container consumers to
// this band; it never edits ShowcaseFrame (the single-writer coordination seam).
//
// Long-term target: extend `<Card>` to accept `shadow="cartoon"` as a
// literal so every showcase frame is morally `<Card tier="resting"
// shadow="cartoon">`. The Card-extension follow-up rides under v0.8.7+;
// for v0.9.0, this demo-side wrapper is the canonical home.
import { computed, useSlots, type HTMLAttributes } from "vue";
import { cn } from "@glass/components/_shared/class-names";

interface ShowcaseFrameProps {
    /** Inner padding rung. xs=p-3 / sm=p-4 / md=p-5 (default) / lg=p-6 / xl=p-10. */
    pad?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
    /**
     * Surface tier — resting (default) reads bg-card; quiet reads bg-card/40;
     * field carries NO opaque plate (the glass-demo host floats glass over the
     * page field, BG-2 fix).
     */
    tier?: "resting" | "quiet" | "field";
    /** Layer the paper-grain-overlay utility on top. */
    grain?: boolean;
    /** The footer caption (mono-caption register). The `#caption` slot wins. */
    caption?: string;
    /** Forwarded class string (merged via `cn`). */
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<ShowcaseFrameProps>(), {
    pad: "md",
    tier: "resting",
    grain: false,
});

const slots = useSlots();

const padClass = computed(() => {
    switch (props.pad) {
        case "none":
            return "p-0";
        case "xs":
            return "p-3";
        case "sm":
            return "p-4";
        case "lg":
            return "p-6";
        case "xl":
            return "p-10";
        case "md":
        default:
            return "p-5";
    }
});

// The surface tier → plate class. `resting`/`quiet` stay BYTE-IDENTICAL to HEAD
// (the opaque-atom specimen host — the W54 legibility allowlist). `field` drops
// the plate ENTIRELY (border-transparent + bg-transparent) so the glass it hosts
// floats over the page substrate (the BG-2 fix at the chassis).
const tierClass = computed(() => {
    switch (props.tier) {
        case "field":
            return "border-transparent bg-transparent shadow-none";
        case "quiet":
            return "bg-card/40 border-border/40";
        case "resting":
        default:
            return "bg-card border-border";
    }
});

// The footer band renders when a caption prop OR the #caption slot is present.
const hasCaption = computed(() => Boolean(props.caption) || Boolean(slots.caption));
</script>

<template>
    <div
        :class="
            cn(
                'rounded-card border shadow-cartoon',
                tierClass,
                hasCaption ? 'showcase-frame--captioned' : padClass,
                grain && 'paper-grain-overlay',
                props.class,
            )
        "
    >
        <!-- The frame body. When a caption band is present the outer box owns no
             padding (the band owns the canvas→caption→edge rhythm); the body
             carries the pad rung. -->
        <div v-if="hasCaption" :class="padClass">
            <slot />
        </div>
        <slot v-else />

        <!-- The captioned-frame footer band (BA.W-STAGE scope 6). Separated from
             the body by the --showcase-caption-gap rhythm token; reads the
             mono-caption register. -->
        <div v-if="hasCaption" class="showcase-frame-caption">
            <slot name="caption">{{ caption }}</slot>
        </div>
    </div>
</template>

<style scoped>
/* The captioned-frame rhythm (BA.W-STAGE scope 6 — the PAD-1/PAD-2 band W-DEMO-
   AFFORDANCES consumes). ONE token owns the canvas→caption→edge bottom-padding
   rhythm. The band sits below the frame body, divided by a hairline, in the
   mono-caption register. */
.showcase-frame--captioned {
    --showcase-caption-gap: 0.75rem;
    padding-block-end: var(--showcase-caption-gap);
}

.showcase-frame-caption {
    margin-block-start: var(--showcase-caption-gap);
    padding-block-start: var(--showcase-caption-gap);
    padding-inline: 1.25rem;
    border-block-start: 1px solid var(--border);
    font-family: var(--font-mono, ui-monospace, monospace);
    font-size: var(--type-mono-caption, 0.75rem);
    line-height: 1.4;
    color: var(--muted-foreground);
}
</style>
