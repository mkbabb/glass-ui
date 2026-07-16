<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useSpring } from "../../composables/motion/useSpring";
import { useLiquidFlex } from "../../composables/motion/useLiquidFlex";
import { useLiquidPress } from "../../composables/motion/useLiquidPress";
import { vSpecular } from "../../composables/glass";

// BG.W-SPRING-REGISTER-TIDY — the head/fill/press clocks are ScrubberTimeline-LOCAL
// per-primitive spring defaults (presets-in-consumers). They are JS-only registers
// (no CSS `--spring-*` token) that serve THIS ONE surface, so
// they live HERE, not in the global SPRING_PRESETS vocabulary (which drained back to
// the canonical 6 — the register-sprawl fix). Each (response, ζ) pair is byte-preserved
// off the retired `timeline-*` rows (no motion delta) and is a sanctioned per-primitive
// default on the proof:motion-one-clock SPRING_DEFAULTS_ALLOWLIST (TIMELINE_HEAD/FILL/
// PRESS) + motion-canon.md §P7 — the canon's per-primitive seam, NOT a second table.
const HEAD_SPRING = { response: 0.34, dampingFraction: 0.74 }; // head travel — fast clock the fill trails; whisper of fling-overshoot
const FILL_SPRING = { response: 0.46, dampingFraction: 0.82 }; // lane fill — slower clock, TRAILS the bead (liquid trailing)
const PRESS_SPRING = { response: 0.22, dampingFraction: 0.7 }; // grab-anticipation — pointerdown squash feeding --scale-press

/**
 * <ScrubberTimeline> — single-track normalized 0..1 scrubber.
 *
 * Internal variant SFC dispatched from <GlassTimeline variant="scrubber">.
 * Owns the pre-Z.W2 single-track contract: pointer-capture drag, keyboard
 * a11y (role=slider + arrow-key step + shift-step), `label` tooltip caret.
 *
 * AA.A4 §S-16 — the `aria-valuenow` binding coerces `Number(modelValue ?? 0)`
 * so a numeric attribute always renders (axe `aria-required-attr` regression).
 *
 * BD.W-TIMELINE-RAIL-UNIFY (LEG 2) — the head is RE-INVENTED as a warm-glass
 * liquid lozenge. The four cartoon beats COMPOSE shipped engines only (no new
 * motion engine): travel rides a `useSpring`/SpringProgress position written
 * to `transform: translateX()` (NEVER `style.left` — Safari composites
 * transform, not left); `useLiquidFlex` `"tanh"` velocity-squish multiplies
 * into the SAME matrix (vol-preserving, cap ≤1.12); `useLiquidPress` grab
 * anticipation; the velocity term is the head spring's own derivative (the
 * self-extinguishing per-frame velocity SpringProgress already computes — the
 * GOLDEN §0 "drive off the spring derivative" path, no free-running rAF); the
 * fill LAGS the head on a slower spring clock; release settles ζ<1 on the
 * cartoon-punch clock; a one-shot accent-flood ripples on landing. Always
 * visible (the
 * `opacity:0`-until-hover is RETIRED — the affordance must be present during
 * keyboard/touch scrub). The bead seats φ-INSIDE the channel; the 44px touch
 * target is an invisible `::before` halo, decoupled from the visible bead.
 */
const props = withDefaults(
    defineProps<{
        /** 0..1 scrubber position. */
        modelValue?: number;
        /** Tooltip caret text. */
        label?: string;
    }>(),
    {
        modelValue: 0,
    },
);

const emit = defineEmits<{
    "update:modelValue": [v: number];
    scrubStart: [];
    scrubEnd: [];
}>();

const trackRef = ref<HTMLElement>();
const scrubbing = ref(false);

// ── The HEAD position spring (compositor translateX travel, 0..1 fraction).
// SpringProgress tracks the live model target with inertia + follow-through;
// the head LAGS the pointer a hair, never a `style.left` teleport. The fill
// LAGS the head on a slightly slower spring clock (the lane reads as liquid
// trailing the bead).
const headSpring = useSpring(() => props.modelValue, {
    response: HEAD_SPRING.response, // 0.34 — ζ<1 a hair of fling-overshoot then settle to 1.0
    dampingFraction: HEAD_SPRING.dampingFraction,
});
const fillSpring = useSpring(() => props.modelValue, {
    response: FILL_SPRING.response, // slower clock — the fill trails the head
    dampingFraction: FILL_SPRING.dampingFraction,
});

// ── The velocity-squish (`useLiquidFlex` "tanh", vol-preserving, LOW cap).
// Fed the head spring's per-frame velocity MAGNITUDE via `squish` (the tanh
// law's velocity input), so a fast drag visibly STRETCHES the lozenge along X
// + thins on Y, capped LOW. The spring owns the position; this is the
// orthogonal squish channel off the SAME spring's derivative — 0 at rest,
// swells on a fast travel, self-extinguishes as the spring settles (the same
// per-frame value carries the release). `axis: "x"` (travel axis).
const flex = useLiquidFlex({
    from: 0,
    to: 1,
    axis: "width",
    maxStretch: 1.12, // swells, never taffy
    squishLaw: "tanh",
});
watch(
    () => headSpring.velocity.value,
    (v) => flex.squish(Math.abs(v)),
);
// the resolved squish scalar (≥1) — paired reciprocally in the matrix.
const headStretch = computed(() => flex.stretch.value);

// ── Beat 1 · ANTICIPATION — the public uniform `useLiquidPress` register.
const press = useLiquidPress({
    response: PRESS_SPRING.response,
    dampingFraction: PRESS_SPRING.dampingFraction,
    shrinkDepth: 0.04,
    squish: false,
    pressVar: "--timeline-press-t",
});

// ── Beat 4 · ACCENT-FLOOD — a one-shot wash that ripples down the fill from
// the landed position then clears (PRM-static; the gesture still lands).
const flooding = ref(false);
let floodTimer: ReturnType<typeof setTimeout> | undefined;

function fireFlood() {
    flooding.value = false;
    // re-trigger the keyframe on the next frame (toggle off→on).
    requestAnimationFrame(() => {
        flooding.value = true;
        if (floodTimer) clearTimeout(floodTimer);
        floodTimer = setTimeout(() => {
            flooding.value = false;
        }, 520);
    });
}

function tFromPointer(e: PointerEvent): number {
    const rect = trackRef.value!.getBoundingClientRect();
    return Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
}

function onTrackDown(e: PointerEvent) {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    scrubbing.value = true;
    press.press();
    emit("scrubStart");
    emit("update:modelValue", tFromPointer(e));
}

function onTrackMove(e: PointerEvent) {
    if (!scrubbing.value) return;
    emit("update:modelValue", tFromPointer(e));
}

function onTrackUp() {
    if (!scrubbing.value) return;
    scrubbing.value = false;
    press.release();
    // Beat 4 — the landing flood.
    fireFlood();
    emit("scrubEnd");
}

function onTrackKeydown(e: KeyboardEvent) {
    const step = e.shiftKey ? 0.1 : 0.01;
    if (e.key === "Home" || e.key === "End") {
        e.preventDefault();
        emit("update:modelValue", e.key === "Home" ? 0 : 1);
        fireFlood();
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        emit("update:modelValue", Math.min(1, props.modelValue + step));
        fireFlood();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        emit("update:modelValue", Math.max(0, props.modelValue - step));
        fireFlood();
    }
}

// ── The head transform: travel = translateX (compositor, % of channel),
// squish = scale(sx, 1/sx) (vol-preserving, center-pinned); the individual
// `scale` property from useLiquidPress composes the uniform anticipation dip.
// translateX is expressed in % of the head's own box so it tracks the
// channel; the channel-relative offset is the spring fraction × 100%.
const headStyle = computed(() => {
    const t = headSpring.value.value;
    const sx = headStretch.value;
    return {
        ...press.pressStyle.value,
        // travel rides translateX (NEVER left) — the channel offset is the
        // spring fraction; `calc` keeps the bead centred on its own width.
        transform:
            `translateX(calc(${(t * 100).toFixed(3)}cqw - 50%)) ` +
            `scale(${sx.toFixed(4)}, ${(1 / sx).toFixed(4)})`,
        "--flex-vel": flex.flexVel.value.toFixed(4),
    };
});

// the fill width tracks the LAGGING fill spring (the one non-compositor
// channel — `will-change` gated to [data-scrubbing], dropped at rest).
const fillStyle = computed(() => ({
    width: `${(fillSpring.value.value * 100).toFixed(3)}%`,
}));
</script>

<template>
    <div class="timeline-row">
        <div
            v-if="label"
            class="timeline-caret"
            :style="{ left: modelValue * 100 + '%' }"
        >
            <span class="caret-value fira-code">{{ label }}</span>
        </div>
        <div
            ref="trackRef"
            class="glass-track timeline-rail"
            :class="{ 'is-flooding': flooding }"
            :data-scrubbing="scrubbing ? '' : undefined"
            role="slider"
            tabindex="0"
            :aria-valuenow="Number(modelValue ?? 0)"
            :aria-valuetext="label || undefined"
            aria-valuemin="0"
            aria-valuemax="1"
            aria-label="Timeline"
            @pointerdown="onTrackDown"
            @pointermove="onTrackMove"
            @pointerup="onTrackUp"
            @pointercancel="onTrackUp"
            @keydown="onTrackKeydown"
        >
            <div class="glass-fill" :style="fillStyle" />
            <!-- the warm-glass liquid lozenge — always visible, vSpecular
                 catch, a `.shadow-cartoon-sm` cast, riding translateX. -->
            <div class="glass-thumb-seat" :style="headStyle">
                <div v-specular class="glass-thumb" aria-hidden="true" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.timeline-row {
    flex: 1 1 0;
    min-width: 0;
    padding: 0 0.25rem;
    position: relative;
    display: flex;
    align-items: center;
}

.timeline-caret {
    position: absolute;
    bottom: calc(100% + 6px);
    transform: translateX(-50%);
    pointer-events: none;
    opacity: 0;
    transition: opacity var(--duration-fast) var(--ease-standard);
    z-index: var(--z-popover);
    user-select: none;
    -webkit-user-select: none;
}

.timeline-row:hover .timeline-caret,
.timeline-row:has(.glass-track:active) .timeline-caret {
    opacity: 1;
}

.caret-value {
    display: block;
    padding: 0.125rem 0.375rem;
    font-size: var(--type-small);
    font-weight: 500;
    color: var(--popover-foreground);
    background: var(--popover);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    box-shadow: var(--shadow-sm);
    white-space: nowrap;
}

/* The scrub channel COMPOSES `.timeline-rail` (warm-glass, from the
   dispatcher's shared register) — this scoped block carries ONLY the
   scrubber-local layout/interaction deltas. Height rides the √φ ladder's
   tallest rung (the a11y scrub surface bears the 44px touch target).
   `container-type: inline-size` so the head's translateX can read `cqw`
   (channel-width %) for a compositor-only travel. */
.glass-track {
    width: 100%;
    height: var(--timeline-h-scrubber, 0.625rem);
    container-type: inline-size;
    cursor: pointer;
    touch-action: none;
    /* NO `overflow: hidden` — the liquid head (LEG 2) reads as lifted ABOVE
       the rail with its `.shadow-cartoon-sm` cast + the 44px `::before` halo,
       both of which must escape the channel. The FILL clips itself. */
    outline: none;
}

.glass-track:focus-visible {
    box-shadow:
        var(--glass-material-rim), var(--glass-under-shadow-default),
        var(--focus-ring-shadow);
}

.glass-fill {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    /* the warm accent lane — a translucent flood (the field bleeds through),
       NOT the gray --surface-tint. build-trap-(d): 0-alpha is oklch(.../0). */
    background: color-mix(
        in oklab,
        var(--cel-accent, var(--accent, var(--foreground))) 30%,
        oklch(0 0 0 / 0)
    );
    border-radius: var(--radius-pill);
    /* clip the accent-flood `::after` to the fill's own pill. */
    overflow: hidden;
    pointer-events: none;
}

/* Beat 4 · ACCENT-FLOOD — a one-shot `plus-lighter` wash that sweeps the fill
   from the landed position then clears. PRM-static (the keyframe is gated). */
.glass-track.is-flooding .glass-fill::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    mix-blend-mode: plus-lighter;
    background: linear-gradient(
        90deg,
        oklch(0 0 0 / 0),
        color-mix(in oklab, var(--cel-accent, var(--accent)) 40%, oklch(0 0 0 / 0)),
        oklch(0 0 0 / 0)
    );
    pointer-events: none;
    animation: timeline-flood 0.5s var(--ease-out, ease-out) 1;
}

@keyframes timeline-flood {
    from {
        opacity: 0;
        translate: -40% 0;
    }
    40% {
        opacity: 1;
    }
    to {
        opacity: 0;
        translate: 40% 0;
    }
}

/* the head SEAT carries the compositor travel (translateX) + the
   vol-preserving squish matrix; the visible bead is its child. `will-change`
   is gated to the active scrub only, dropped at rest (the Safari-safe paint
   fence). */
.glass-thumb-seat {
    position: absolute;
    top: 50%;
    left: 0;
    width: var(--timeline-head, 0.875rem);
    height: var(--timeline-head, 0.875rem);
    margin-top: calc(var(--timeline-head, 0.875rem) / -2);
    pointer-events: none;
    /* the head LAGS via the spring — no CSS transition on transform (the
       spring owns the per-frame value). */
}

.glass-track[data-scrubbing] .glass-thumb-seat {
    will-change: transform;
}

.glass-track[data-scrubbing] .glass-fill {
    will-change: width;
}

/* the warm-glass liquid lozenge — the brightest tier (reads forward of the
   rail) with the keyed rim + a `.shadow-cartoon-sm` cast. ALWAYS visible. */
.glass-thumb {
    position: absolute;
    inset: 0;
    border-radius: var(--radius-pill);
    background: var(--glass-bg-floating);
    backdrop-filter: var(--glass-blur-floating);
    -webkit-backdrop-filter: var(--glass-blur-floating);
    /* the keyed rim + the bold layered-offset cartoon cast (the cast offsets
       OPPOSITE the keyed rim so it coheres with the one key-light). Plain
       box-shadow fallback if the cartoon token is absent. */
    box-shadow:
        var(--glass-material-rim),
        var(--shadow-cartoon-sm, 0 2px 4px oklch(0 0 0 / 0.18));
    border: 0.5px solid var(--glass-border-accent);
}

/* the 44px touch-target halo — an invisible `::before`, decoupled from the
   visible bead (the bead seats φ-INSIDE the channel; the hit area extends to
   the WCAG-2.5.5 floor without growing the glyph). */
.glass-thumb::before {
    content: "";
    position: absolute;
    inset: calc((44px - var(--timeline-head, 0.875rem)) / -2);
    border-radius: inherit;
}

/* PRM — the squish/spring/flood collapse to an instant position set (the
   springs already honour PRM via `respectReducedMotion`); kill the flood
   keyframe + the caret transition. The bead still MOVES (the gesture works),
   just without deformation. */
@media (prefers-reduced-motion: reduce) {
    .glass-track.is-flooding .glass-fill::after {
        animation: none;
    }
    .timeline-caret {
        transition-duration: 0.01ms;
    }
}
</style>
