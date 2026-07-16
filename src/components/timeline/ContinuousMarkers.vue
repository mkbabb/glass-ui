<script setup lang="ts">
// Marker geometry, hover-popover payload mapping, and per-segment rendering stay
// together because they form one continuous-rail concern.
// The retired HoverPopover folds onto the sealed
// `<Popover trigger="hover">` union (hover-open timer on the HoverCardRoot branch).
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { popoverPayloadFor } from "./geometry";
import type { TimelineSegment } from "./types";

/**
 * <ContinuousMarkers> — the interactive marker overlay of the
 * continuous-variant timeline. DECK-PRIVATE child of <ContinuousTimeline>
 * (not a public export). Renders the sibling `<ul role="list">` overlay
 * carrying one focusable button per segment boundary, each (by default)
 * wrapped in <HoverPopover>. Lives OUTSIDE the rail's `overflow: hidden`
 * clip and is a SIBLING of the progressbar rail (Option C structural
 * split).
 *
 * The split is a pure transposition out of the prior monolithic
 * ContinuousTimeline.vue: same DOM, same class names, same data
 * attributes, same scoped CSS rules. The orchestrator owns the hovered-key
 * state + the `#detail` resolution; this child emits the raw
 * hover/hoverEnd/click signals (popover-open-change drives hover/hoverEnd
 * on the default path; raw mouseenter/leave on the bare-fallback path) and
 * forwards the consumer's `#popoverContent` slot through the
 * `popoverContent` slot.
 */
defineProps<{
    segments: TimelineSegment[];
    markersAriaLabel: string;
    currentSegmentKey?: string;
    disablePopover?: boolean;
    boundaryX: (i: number) => number;
}>();

const emit = defineEmits<{
    hover: [seg: TimelineSegment];
    hoverEnd: [seg: TimelineSegment];
    click: [seg: TimelineSegment];
}>();

/**
 * HoverPopover-driven hover state. The popover's debounced
 * `v-model:open` state is the authoritative hover signal: it inherits
 * reka-ui's `hoverOpenDelay`/`closeDelay` cadence, so the pointer skim
 * across the trigger edge (and the popover content overlapping the dot)
 * does not flicker `hover`/`hoverEnd` events.
 */
function onPopoverOpenChange(seg: TimelineSegment, open: boolean) {
    if (open) emit("hover", seg);
    else emit("hoverEnd", seg);
}
</script>

<template>
    <!-- Marker list — sibling of the progressbar rail. Lives
         outside the rail's clip mask so the dots' outer 16px
         box paints in full. Each marker is `position: absolute`
         over the wrap, anchored at `boundaryX(i) * 100%`. -->
    <ul
        v-if="segments.length > 0"
        class="continuous-markers"
        role="list"
        :aria-label="`${markersAriaLabel} — phase markers`"
    >
        <li
            v-for="(seg, i) in segments"
            :key="`dot-li-${seg.key}`"
            class="continuous-marker"
            role="listitem"
            :style="{ left: `${boundaryX(i) * 100}%` }"
        >
            <Popover
                v-if="!disablePopover"
                trigger="hover"
                :open-delay="120"
                :close-delay="160"
                @update:open="(open?: boolean) => onPopoverOpenChange(seg, open ?? false)"
            >
                <PopoverTrigger as-child>
                    <button
                        type="button"
                        class="continuous-dot segmented-dot"
                        :aria-label="`${seg.label}: ${seg.state}`"
                        :aria-current="seg.key === currentSegmentKey ? 'step' : undefined"
                        :data-state="seg.state"
                        :data-current="seg.key === currentSegmentKey || undefined"
                        :data-completed="seg.state === 'completed' || undefined"
                        @click="emit('click', seg)"
                    >
                        <span class="sr-only">{{ seg.label }}</span>
                        <svg
                            v-if="seg.state === 'completed'"
                            class="continuous-dot-check"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                        >
                            <path d="M5 13l4 4L19 7" />
                        </svg>
                    </button>
                </PopoverTrigger>
                <PopoverContent
                    side="top"
                    :side-offset="10"
                    :class="`timeline-popover timeline-popover-${seg.key}`"
                >
                    <slot name="popoverContent" :segment="seg">
                        <!-- Default color-coded body: reads
                             gradient.from as the tint so the
                             accent matches the segment's hue. -->
                        <div
                            class="timeline-popover-body"
                            :style="{
                                '--popover-tint':
                                    typeof seg.gradient === 'object' && seg.gradient
                                        ? seg.gradient.to
                                        : 'var(--foreground)',
                            }"
                        >
                            <span class="timeline-popover-label">
                                {{ popoverPayloadFor(seg).label }}
                            </span>
                            <span
                                v-if="popoverPayloadFor(seg).value != null"
                                class="timeline-popover-value tabular-nums"
                            >
                                {{ popoverPayloadFor(seg).value }}
                            </span>
                            <span
                                v-if="popoverPayloadFor(seg).description"
                                class="timeline-popover-description"
                            >
                                {{ popoverPayloadFor(seg).description }}
                            </span>
                            <span class="timeline-popover-state">
                                {{ popoverPayloadFor(seg).state }}
                            </span>
                        </div>
                    </slot>
                </PopoverContent>
            </Popover>
            <!-- Popover-disabled fallback: bare button, same
                 contract minus the Popover wrap. -->
            <button
                v-else
                type="button"
                class="continuous-dot segmented-dot"
                :aria-label="`${seg.label}: ${seg.state}`"
                :aria-current="seg.key === currentSegmentKey ? 'step' : undefined"
                :data-state="seg.state"
                :data-current="seg.key === currentSegmentKey || undefined"
                :data-completed="seg.state === 'completed' || undefined"
                @mouseenter="emit('hover', seg)"
                @mouseleave="emit('hoverEnd', seg)"
                @focus="emit('hover', seg)"
                @blur="emit('hoverEnd', seg)"
                @click="emit('click', seg)"
            >
                <span class="sr-only">{{ seg.label }}</span>
                <svg
                    v-if="seg.state === 'completed'"
                    class="continuous-dot-check"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                >
                    <path d="M5 13l4 4L19 7" />
                </svg>
            </button>
        </li>
    </ul>
</template>

<style scoped>
/* Marker list overlay. Sibling of the rail; lives outside
   the rail's `overflow: hidden` clip so the dots paint in full. */
.continuous-markers {
    position: absolute;
    inset: 0;
    margin: 0;
    padding: 0;
    list-style: none;
    pointer-events: none;
}

.continuous-marker {
    position: absolute;
    top: 50%;
    /* `left` from inline style (anchored to boundaryX(i) * 100%). */
    transform: translate(-50%, -50%);
    /* The marker container itself is non-interactive; only the inner
       button receives pointer events. `display: flex`
       collapses the default `list-item` line-box metrics (which added
       a 1px vertical drift between the dot's geometric centre and the
       li's translate anchor); flex sizes the marker box exactly to the
       inner button so the translate centres on the dot's geometric
       middle. `line-height: 0` belt-and-braces the inline-box collapse
       in case the dot ever gains text content beyond the .sr-only span. */
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
    pointer-events: none;
}

.continuous-marker > * {
    pointer-events: auto;
}

/* The marker dot recipe — duplicates the segmented-dot base recipe
   inside this SFC's scope because the continuous-dot OVERRIDES the
   layout-coupled positioning (no flex-cell parent anymore). The dot
   class on the rendered element is `continuous-dot segmented-dot` so
   the override styles below apply over a base segmented-dot block. */
.segmented-dot {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(50%, -50%);
    box-sizing: border-box;
    width: var(--timeline-dot-size, 14px);
    height: var(--timeline-dot-size, 14px);
    border-radius: 50%;
    background: var(--surface-tint-15);
    border: 2px solid var(--background, white);
    box-shadow: 0 1px 2px color-mix(in srgb, var(--shadow-color) 12%, transparent);
    padding: 0;
    cursor: pointer;
    z-index: 1;
    transition:
        background var(--duration-fast) var(--ease-standard),
        transform var(--duration-fast) var(--ease-standard),
        box-shadow var(--duration-fast) var(--ease-standard);
}

.segmented-dot:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring-shadow);
}

/* Boundary dot — the marker button. Inherits the dot recipe from
   `.segmented-dot` above (radius, border, transition) but overrides the
   layout-coupled positioning (no flex-cell parent anymore).

   The dot is a glass primitive: a translucent tinted fill
   over a backdrop blur with a hairline ring, not an opaque puck. The
   glass treatment is the resting recipe; the per-state rules below only
   re-tint the same glass (they no longer paint an opaque solid). All
   knobs are CSS custom properties declared in tokens.css §16 TIMELINE
   so consumers can tune the tint / blur / ring without reaching into
   this scope. */
.continuous-dot {
    position: relative;
    right: auto;
    /* Layout flow inside the marker `<li>` (the marker handles
       positioning via its own `transform`). The dot is intrinsically
       sized; we drop the segmented-dot's translate transform. */
    transform: none;
    /* Glass fill: a translucent tint (NOT opaque) so the rail's hue
       reads faintly through the dot — the glass-design idiom. The 2px
       border becomes a hairline glass ring. The unprefixed
       backdrop-filter is authored alone — Lightning CSS emits the
       -webkit- form per the glass.css single-source policy. */
    background: var(--timeline-dot-fill);
    backdrop-filter: var(--timeline-dot-blur);
    border-color: var(--timeline-dot-ring);
    /* The continuous dot is a flush rivet
       (the inverse of the segmented float-dot): an INNER keyed shadow reads it
       as PRESSED-IN at the phase joint of the one bar. Lit top-inset +
       shaded bottom-inset = the one key-light, sunk. A faint outer rim keeps
       the perceived centre on the math centre. build-trap-(d): 0-alpha arms
       are oklch(.../0), never bare transparent. */
    box-shadow:
        var(--glass-material-rim),
        inset 0 1px 1.5px color-mix(in oklab, var(--cartoon-ink, black) 16%, oklch(0 0 0 / 0)),
        inset 0 -1px 1px color-mix(in oklab, white 22%, oklch(0 0 0 / 0));
}

.continuous-dot:hover,
.continuous-dot:focus-visible {
    /* No translate compensation — pure scale around the marker's centre. */
    transform: scale(1.2);
}

/* WCAG 2.5.5 target-size hit-area at the continuous
   variant. The dot is 14px (default) painted at the inner centre of the
   marker `<li>`. A `::before` pseudo extends the pointer-receptive area
   to 44×44 (14 + 15 + 15) without enlarging the visible dot. The pseudo
   inherits the button's pointer-events so taps within the halo register.
   Coarse-pointer devices promote the visible dot via
   --timeline-dot-size-touch + recompute the inset so the halo stays at
   44×44 across the lifted geometry. */
.continuous-dot::before {
    content: "";
    position: absolute;
    inset: -15px;
    border-radius: inherit;
}

@media (pointer: coarse) {
    .continuous-dot {
        width: var(--timeline-dot-size-touch, var(--timeline-dot-size, 20px));
        height: var(--timeline-dot-size-touch, var(--timeline-dot-size, 20px));
    }
    .continuous-dot::before {
        inset: calc((var(--timeline-touch-target, 44px) - var(--timeline-dot-size-touch, 20px)) / -2);
    }
}

/* `data-current` marks the active phase regardless of hover
   state. The per-state rules re-tint the same glass dot;
   they no longer paint an opaque solid. The tint is a translucent wash
   over the glass fill so the dot stays glassy (backdrop blur + ring
   intact) while still reading its lifecycle state. Consumers override
   the tint colour via `--timeline-dot-tint-current` /
   `--timeline-dot-tint-completed`. */
.continuous-dot[data-current] {
    background: color-mix(
        in srgb,
        var(--timeline-dot-tint-current) 22%,
        var(--surface-tint-12)
    );
    border-color: color-mix(
        in srgb,
        var(--timeline-dot-tint-current) 40%,
        var(--glass-border-floating)
    );
}

.continuous-dot[data-state="completed"] {
    background: color-mix(
        in srgb,
        var(--timeline-dot-tint-completed) 22%,
        var(--surface-tint-12)
    );
    border-color: color-mix(
        in srgb,
        var(--timeline-dot-tint-completed) 40%,
        var(--glass-border-floating)
    );
}

/* Completion-tick affordance. When a segment reaches
   `state === "completed"` the dot draws a self-drawing check: the path
   sweeps in via `stroke-dashoffset` while the dot punches a one-beat
   overshoot pop. This is the badge grammar (staged, self-drawing, one
   overshoot, reduced-motion end-state) at miniature scale, built into
   the primitive so consumers get the affordance for free. The stroke
   colour reads `--timeline-dot-check-color` (default the completed
   tint) so a consumer can retint without a `:deep()` reach. */
.continuous-dot-check {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: visible;
}

.continuous-dot-check path {
    fill: none;
    stroke: var(--timeline-dot-check-color);
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    /* Path length of `M5 13l4 4L19 7` ≈ 28 units; a 32-unit dash fully
       covers it. The mark starts fully hidden (offset = dash) and the
       keyframe sweeps the offset to 0 so the check writes itself on. */
    stroke-dasharray: 32;
    stroke-dashoffset: 32;
    animation:
        continuous-dot-check-draw var(--duration-slow, 0.45s)
            var(--ease-out, ease-out) var(--duration-fast, 0.2s) forwards;
}

/* The dot itself plays a one-beat overshoot pop as the check lands —
   the single overshoot of the badge grammar. No fill mode: once the
   pop settles the dot releases the transform so the hover scale (and
   any future transform) is unobstructed. */
.continuous-dot[data-completed] {
    /* The check-lands pop is a crisp one-beat morph,
       so it rides --spring-snappy (~+6.8% overshoot gives the single pop). The
       inline cubic-bezier fallback is excised — no hand-rolled spring literal. */
    animation: continuous-dot-pop var(--duration-normal, 0.3s)
        var(--spring-snappy);
}

@keyframes continuous-dot-check-draw {
    from {
        stroke-dashoffset: 32;
    }
    to {
        stroke-dashoffset: 0;
    }
}

@keyframes continuous-dot-pop {
    0% {
        transform: scale(0.82);
    }
    60% {
        transform: scale(1.12);
    }
    100% {
        transform: scale(1);
    }
}

/* Screen-reader-only span baked into the dot button. */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

@media (prefers-reduced-motion: reduce) {
    .continuous-dot {
        transition-duration: 0.01ms;
    }
    /* Completion tick collapses to its drawn end-state — the check is
       fully present, the pop is retired. The affirmation survives
       motion-off; only the motion goes. */
    .continuous-dot[data-completed] {
        animation: none;
    }
    .continuous-dot-check path {
        animation: none;
        stroke-dashoffset: 0;
    }
}
</style>
