<script setup lang="ts">
// `<EasingCurve>` — the ADDRESSABLE curve plot. Zero state, zero composables, zero
// interactive descendants: it takes paths and draws them inside the constant frame.
//
// It exists because three downstream repositories re-rolled it. `@mkbabb/glass-ui/easing`
// published only EDITORS, so anyone who wanted to SHOW a curve had to fork one — a
// 98-line name-colliding copy plus a 41-line preview in one repo alone. The editor is
// now a composition of this unit and a handle overlay, and the display half is the
// thing consumers actually asked for.
//
// The frame is `VIEW_BOX` and nothing here may make it a function of its contents.
// Every stroke weight is a whole CSS pixel carried by `vector-effect`, so the plot
// scales without the ink scaling with it — the defect that made two plots on one page
// 9% apart while the page invited you to compare them.
import type { HTMLAttributes } from "vue";
import { cn } from "../_shared/class-names";
import { FRAME_MAX, FRAME_MIN, SVG_FLIP, VIEW_BOX } from "./constants";

/** `ink` is the subject; `ghost` is the same plot's other reading, held back. */
export type EasingStrokeTone = "ink" | "ghost";

/**
 * One plotted curve.
 *
 * `d` is a PATH, not a callable, and that is deliberate: a staircase's shape is its
 * exact riser positions, and a display unit handed a callable can only sample — which
 * is precisely how the previous plot spent 241 commands failing to draw a crisp
 * riser. The owner of the curve knows whether it is smooth or stepped and hands over
 * the exact path; `usePicker` publishes both.
 *
 * There is no `css` field, and its absence is load-bearing: a stroke that renders its
 * own literal is a SECOND print of the thing the editor prints exactly once. The plot
 * takes a `label`; the literal has one home.
 */
export interface EasingStroke {
    /** The path `d`, in the plot's SVG space (x rightwards, y downwards). */
    d: string;
    tone?: EasingStrokeTone;
}

const props = withDefaults(
    defineProps<{
        /** The plotted curves, drawn in order. */
        strokes: EasingStroke[];
        /** Normalized travel position; the dot rides the FIRST `ink` stroke's curve. */
        progress?: number;
        /** The travelling dot's value at `progress`, in curve space (0 bottom). */
        travel?: number | null;
        /** Marks the plot as leaving the frame — the crossed edges take the accent. */
        clipped?: boolean;
        /**
         * Whether the ink stroke is DRAWN. Flip it to `false` and back a frame later
         * and the ink wipes itself on. Owned by the caller — this unit keeps no state
         * — and it defaults to `true`, so a plot that is merely shown is shown
         * finished.
         */
        drawn?: boolean;
        /** The plot's accessible name. */
        label?: string;
        class?: HTMLAttributes["class"];
    }>(),
    {
        progress: 0,
        travel: null,
        clipped: false,
        drawn: true,
        label: "Easing curve",
        class: undefined,
    },
);

const GRID = [0.25, 0.5, 0.75];

/**
 * The SUBJECT's wipe, as one class string per state.
 *
 * The ghost is the plot's other reading held back; it never sweeps, so it never
 * carries the clock either — a `transition-property` on an element with nothing to
 * interpolate is a declaration with no reader, and this lane has already refused one
 * of those. Both states are written out whole so a scanner can see them.
 *
 * The UN-draw is `duration-0` and only the draw is `duration-slow`: one duration for
 * both directions would wipe the curve away before wiping it back, which is a flicker,
 * not a reveal.
 */
function wipe(tone: EasingStrokeTone | undefined): string | false {
    if (tone === "ghost") return false;
    return props.drawn
        ? "transition-[clip-path] ease-out-expo duration-slow motion-reduce:transition-none [clip-path:inset(-60%_-2%_-60%_-2%)]"
        : "transition-[clip-path] ease-out-expo duration-0 motion-reduce:transition-none [clip-path:inset(-60%_104%_-60%_-2%)]";
}
</script>

<template>
    <!-- THE SINGLE COLOR EVENT, declared once by the unit that strokes with it: the
         curve reads `--motion-accent` — the motion family's one color event — folded
         into the component-local `--easing-curve-accent` over the library's OWN
         `--viz-legendre` violet twin, so the primitive is self-sufficient standalone
         and a consumer still overrides `--motion-accent` from any ancestor. The
         fence holds in the other direction too: a demo hue never enters a
         library token. -->
    <div
        data-slot="easing-curve"
        :data-clipped="props.clipped ? '' : undefined"
        :class="cn('relative isolate', props.class)"
        style="--easing-curve-accent: var(--motion-accent, var(--viz-legendre))"
    >
        <svg
            :class="
                cn(
                    'block aspect-square w-full select-none',
                    // Ink lives on ONE channel so the whole plot re-tones from the root.
                    'text-(--easing-curve-accent)',
                )
            "
            :viewBox="VIEW_BOX"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            :aria-label="label"
        >
            <!-- the unit box + its diagonal reference -->
            <rect x="0" y="0" width="1" height="1" fill="none" class="stroke-border" stroke-width="1" vector-effect="non-scaling-stroke" />
            <line x1="0" y1="1" x2="1" y2="0" class="stroke-muted-foreground/30" stroke-width="1" stroke-dasharray="4 3" vector-effect="non-scaling-stroke" />
            <line v-for="v in GRID" :key="'gx' + v" :x1="v" y1="0" :x2="v" y2="1" class="stroke-border/40" stroke-width="1" vector-effect="non-scaling-stroke" />
            <line v-for="v in GRID" :key="'gy' + v" x1="0" :y1="v" x2="1" :y2="v" class="stroke-border/40" stroke-width="1" vector-effect="non-scaling-stroke" />

            <!-- THE EXCURSION EDGE. The curve leaving the frame is never silent and
                 never moves a dimension: the crossed edges take the accent instead. -->
            <template v-if="props.clipped">
                <line :x1="FRAME_MIN" :y1="FRAME_MIN" :x2="FRAME_MAX" :y2="FRAME_MIN" stroke="currentColor" stroke-width="2" vector-effect="non-scaling-stroke" data-slot="easing-curve-clip-edge" />
                <line :x1="FRAME_MIN" :y1="FRAME_MAX" :x2="FRAME_MAX" :y2="FRAME_MAX" stroke="currentColor" stroke-width="2" vector-effect="non-scaling-stroke" />
            </template>

            <!-- the plotted curves — ghosts first so the subject reads on top.
                 THE DRAW-ON, and the mechanism it is NOT. `<HandMark>` draws by
                 pulling a dash shut inside a MASK over the centreline, where the dash
                 is never gated by the ink's own paint. This lane cannot use that
                 mechanism, and the reason is measured rather than assumed:
                 every stroke here carries `vector-effect: non-scaling-stroke` — the
                 law that makes the ink a whole CSS pixel independent of the frame —
                 and under it Chrome does not gate the paint by `stroke-dashoffset` at
                 all. Rasterized and pixel-counted at this seat: an untouched stroke
                 paints 2998 px, `pathLength="1"` + `dashoffset: 1` paints 2827, the
                 same sweep in real user units 2851. Nothing is revealed; the sweep
                 would have been a mechanism that ran and did nothing. The same
                 measurement puts the wipe at 0 closed / 2107 half / 2998 open, which
                 is a reveal. A wipe is also the truer reading for a curve plot: it
                 travels left to right, which is the axis the curve is a function of.
                 The over-expanded edges (−60% block, −2% inline) keep the stroke's own
                 round cap out of the clip, so the wipe never trims the ink it reveals.
                 Only the SUBJECT draws; the ghost is the other reading held back, and
                 a ghost that swept itself in would be announcing something it is
                 deliberately not saying. PRM leg one of two: the transition retires,
                 so the wipe lands on the frame it changes. (Leg two is the picker's —
                 it never arms the sweep at all under `reduce`.) -->
            <path
                v-for="(stroke, index) in props.strokes"
                :key="index"
                :d="stroke.d"
                fill="none"
                stroke="currentColor"
                :stroke-opacity="stroke.tone === 'ghost' ? 0.3 : 1"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="miter"
                vector-effect="non-scaling-stroke"
                :class="wipe(stroke.tone)"
                :data-tone="stroke.tone ?? 'ink'"
                data-slot="easing-curve-stroke"
            />

            <!-- the fixed endpoints -->
            <circle cx="0" cy="1" r="0.018" class="fill-muted-foreground/50" />
            <circle cx="1" cy="0" r="0.018" class="fill-muted-foreground/50" />

            <!-- the travelling dot + its fading trail (a fade, never a cut) -->
            <template v-if="props.travel !== null">
                <line :x1="0" :y1="SVG_FLIP(0)" :x2="props.progress" :y2="SVG_FLIP(props.travel)" stroke="currentColor" stroke-opacity="0.16" stroke-width="2" vector-effect="non-scaling-stroke" />
                <circle :cx="props.progress" :cy="SVG_FLIP(props.travel)" r="0.03" fill="currentColor" data-slot="easing-curve-travel" />
            </template>
        </svg>

        <!-- Axis type LEAVES SVG user space. As `<text font-size="0.05px">` it was a
             function of the frame; as HTML it sits on the type ladder like every
             other caption in the library. -->
        <span aria-hidden="true" class="pointer-events-none absolute bottom-1 left-1 text-micro text-muted-foreground/60">0</span>
        <span aria-hidden="true" class="pointer-events-none absolute right-1 top-1 text-micro text-muted-foreground/60">1</span>
    </div>
</template>
