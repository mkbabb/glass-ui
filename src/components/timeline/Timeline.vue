<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { springPreset } from "../../composables/motion/spring/springPresets";
import { useLiquidFlex } from "../../composables/motion/spring/useLiquidFlex";
import { useLiquidPress } from "../../composables/motion/spring/useLiquidPress";
import { useSpring } from "../../composables/motion/spring/useSpring";
import { accentFor, aggregate, fillFor, layout } from "./geometry";
import type { TimelineProps, TimelineSegment } from "./types";

/**
 * <Timeline> — ONE normalized reporting axis.
 *
 * N ordered spans on the unit interval; each carries a lifecycle state, a fill
 * fraction and an ordinal jewel hue, and each span's END boundary is an
 * addressable mark. The whole is one number published three ways.
 *
 * It is `role="progressbar"` and NEVER `role="slider"` — a timeline reports, it
 * does not command. The commanding surface is `<Slider :marks>`, which already
 * serves the playhead-with-ticks case; stacking a scrubber on this axis would
 * mint a second coordinate system for one job.
 *
 * The groove COMPOSES `.glass-track-well` (the register's third consumer) and
 * authors its own background, which is the register's own written invitation:
 * "a direct future track-well consumer authors its own `background`; the
 * register mints no shared generic paint knob" (`track-well.css:21-22`).
 *
 * ZERO `backdrop-filter` is authored in this directory — not as a value, not as
 * a reset. The rail's former veil was engine-forked paint (live in Safari via
 * the `-webkit-` alias, `none` in Chromium), and an engine-forked primary is
 * not a primary.
 */
const props = defineProps<TimelineProps>();

const emit = defineEmits<{
    select: [payload: { key: string; segment: TimelineSegment }];
    hover: [payload: { key: string; segment: TimelineSegment } | null];
}>();

const list = computed<TimelineSegment[]>(() => props.segments ?? []);
const spans = computed(() => layout(list.value));

/**
 * The span-weighted aggregate — the ONE number, and the spring's target.
 * Exposed three ways (§ `defineExpose`, the `#detail` scope, `--timeline-value`)
 * because each door serves a reader the others cannot reach: a slot prop is
 * unreachable from a consumer's script, and a CSS variable is only reachable by
 * polling `getComputedStyle`.
 */
const value = computed<number>(() => aggregate(list.value));

// ── THE ONE SPRING ────────────────────────────────────────────────────────────
//
// Everything that travels rides `springPreset("dock")` — read BY NAME, never as
// a literal pair, so a canon retune moves this surface with it.
const DOCK = springPreset("dock");

/**
 * The cap for ALL THREE motion expressions — the meniscus stretch, the mark
 * swell, and the hover scale — is the existing `--scale-hover` token, read from
 * the live cascade per frame rather than typed in.
 *
 * `NO_TOKEN_CAP` is the no-token floor, not a second authority: it is held in
 * lockstep with the token by a unit case that reads the declared value out of
 * `tokens/scale-paper.css`. Same shape as `DEFAULT_INDICATOR_MAX_STRETCH` in
 * `useSelectionIndicator.ts`.
 */
const NO_TOKEN_CAP = 1.08;

const rootRef = ref<HTMLElement>();

function scaleHover(): number {
    const el = rootRef.value;
    if (!el) return NO_TOKEN_CAP;
    const raw = getComputedStyle(el).getPropertyValue("--scale-hover").trim();
    return Number(raw) || NO_TOKEN_CAP;
}

/**
 * THE MENISCUS — the cap at the fill front stretches off the travel spring's OWN
 * per-frame derivative through `useLiquidFlex`, all required params supplied.
 * `squish(0)` on settle is MANDATORY: under `prefers-reduced-motion` the spring
 * snaps, the subscriber fires exactly once, and without the release the cap
 * parks stretched forever.
 */
const flex = useLiquidFlex({
    from: 0,
    to: 1,
    axis: "width",
    squishLaw: "tanh",
    maxStretch: () => scaleHover(),
});

/** The mark the front is crossing right now — the swell's subject. */
const crossing = ref<number | null>(null);
let lastFront = 0;

const ownedWidth = computed<number>(() =>
    spans.value.reduce((acc, s) => acc + s.width, 0),
);

const travel = useSpring(value, {
    response: DOCK.response,
    dampingFraction: DOCK.dampingFraction,
    onValue: (v) => {
        flex.drive(v);
        // Absolute axis position of the fill front, so a crossing is measured in
        // the same units the marks are placed in.
        const front = v * ownedWidth.value;
        for (let i = 0; i < spans.value.length; i += 1) {
            const at = (spans.value[i] as { at: number }).at;
            if (lastFront < at && front >= at) crossing.value = i;
        }
        lastFront = front;
    },
});

/**
 * THE RELEASE, watched on the settled STATE and never on the flag's EDGE.
 *
 * Under `prefers-reduced-motion` the engine snaps inside the target setter, so
 * the subscription fires with `settled` ALREADY true: `isSettled` goes
 * true-over-true and an edge watch never runs — while that same subscription's
 * `onValue` has just stretched the meniscus and latched the crossing. Taking the
 * travelling VALUE as a second source is what makes the release reachable on
 * that path: the value always moves, the flag does not.
 *
 * The sprung path is unchanged — every frame runs this and returns at the guard;
 * the final frame settles and releases exactly as before.
 */
watch(
    [travel.value, travel.isSettled],
    ([, settled]) => {
        if (!settled) return;
        // Without it the tanh channel keeps the last travel value.
        flex.squish(0);
        crossing.value = null;
    },
    { immediate: true },
);

const advancing = computed<boolean>(() => !travel.isSettled.value);

/**
 * Per-span fill fractions, distributed from the springing front in axis order.
 * A span absorbs at most its OWN effective progress, so the paint never claims
 * more than the data does — the travel is smooth, the rest state is exact.
 */
const fills = computed<number[]>(() => {
    let remaining = travel.value.value * ownedWidth.value;
    return spans.value.map((span, i) => {
        const eff = fillFor(list.value[i] as TimelineSegment) ?? 0;
        const own = span.width * eff;
        const taken = remaining <= 0 ? 0 : Math.min(remaining, own);
        remaining -= taken;
        return span.width > 0 ? taken / span.width : 0;
    });
});

function stateOf(seg: TimelineSegment): "pending" | "active" | "completed" {
    return seg.state ?? "pending";
}

/** A span is INDETERMINATE when it is active and reports no progress. */
function isIndeterminate(seg: TimelineSegment): boolean {
    return stateOf(seg) === "active" && fillFor(seg) === null;
}

function accentOf(seg: TimelineSegment, i: number): string {
    return seg.accent ?? accentFor(i);
}

const spanStyles = computed(() =>
    spans.value.map((span, i) => {
        const seg = list.value[i] as TimelineSegment;
        return {
            "--tl-l": String(span.left),
            "--tl-w": String(span.width),
            "--tl-f": String(fills.value[i] ?? 0),
            "--tl-accent": accentOf(seg, i),
        };
    }),
);

// ── NAMES ─────────────────────────────────────────────────────────────────────
//
// The indeterminate state has no number, so it surfaces as prose in
// `aria-valuetext` — the same string the `#detail` scope reads.
const valueText = computed<string>(() => {
    const pct = `${Math.round(value.value * 100)}%`;
    const running = list.value.find((seg) => isIndeterminate(seg));
    return running ? `${pct} — ${running.label} underway` : pct;
});

// ── MARKS: roving tabindex, one stop ──────────────────────────────────────────
const roving = ref(0);
const markRefs = ref<HTMLButtonElement[]>([]);

watch(
    () => [props.current, list.value.length] as const,
    () => {
        const idx = list.value.findIndex((seg) => seg.key === props.current);
        roving.value = idx >= 0 ? idx : Math.min(roving.value, Math.max(0, list.value.length - 1));
    },
    { immediate: true },
);

function focusMark(i: number): void {
    const bounded = Math.max(0, Math.min(list.value.length - 1, i));
    roving.value = bounded;
    markRefs.value[bounded]?.focus();
}

function onMarkKeydown(event: KeyboardEvent, i: number): void {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") focusMark(i + 1);
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") focusMark(i - 1);
    else if (event.key === "Home") focusMark(0);
    else if (event.key === "End") focusMark(list.value.length - 1);
    else return;
    event.preventDefault();
}

function onSelect(seg: TimelineSegment): void {
    emit("select", { key: seg.key, segment: seg });
}

// ── PRESS: the public register, ONE instance ──────────────────────────────────
//
// One pointer presses one mark, so one spring serves the whole list; the style
// binds only on the mark that owns the live press. N instances would be N
// springs idling for one gesture.
const press = useLiquidPress({ shrinkDepth: 0.04, squish: false });
const pressed = ref<number | null>(null);

function onMarkDown(event: PointerEvent, i: number): void {
    pressed.value = i;
    press.handlers.onPointerdown(event);
}

function endPress(): void {
    pressed.value = null;
    press.handlers.onPointerup();
}

// ── #detail: the effective span, direction-aware ──────────────────────────────
const hovered = ref<string | null>(null);

const effective = computed<TimelineSegment | null>(() => {
    const key = hovered.value ?? props.current ?? null;
    if (key == null) return null;
    return list.value.find((seg) => seg.key === key) ?? null;
});

const source = computed<"hovered" | "current" | "idle">(() => {
    if (hovered.value != null) return "hovered";
    if (props.current != null) return "current";
    return "idle";
});

/** +1 when the detail advances along the axis, −1 when it retreats. */
const direction = ref(1);
let lastDetail = -1;

watch(effective, (seg) => {
    const idx = seg ? list.value.findIndex((s) => s.key === seg.key) : -1;
    if (idx >= 0 && lastDetail >= 0) direction.value = idx >= lastDetail ? 1 : -1;
    lastDetail = idx;
});

function onMarkEnter(seg: TimelineSegment): void {
    hovered.value = seg.key;
    emit("hover", { key: seg.key, segment: seg });
}

function onMarkLeave(seg: TimelineSegment): void {
    // Only the mark that OWNS the hover clears it. A leave arriving from a mark
    // the pointer has already left — a `blur` racing the neighbour's
    // `pointerenter` — must not null a hover that now belongs to someone else.
    // The emit lives INSIDE the guard for the same reason the assignment does.
    if (hovered.value !== seg.key) return;
    hovered.value = null;
    emit("hover", null);
}

defineExpose({ value });
</script>

<template>
    <div
        ref="rootRef"
        class="tl"
        role="group"
        :style="{ '--timeline-value': String(value), '--tl-dir': String(direction) }"
    >
        <div
            class="tl__track glass-track-well"
            role="progressbar"
            :aria-label="props.label"
            :aria-valuemin="0"
            :aria-valuemax="1"
            :aria-valuenow="value"
            :aria-valuetext="valueText"
            :data-advancing="advancing || undefined"
        >
            <div
                v-for="(seg, i) in list"
                :key="seg.key"
                class="tl__span"
                aria-hidden="true"
                :data-state="stateOf(seg)"
                :data-indeterminate="isIndeterminate(seg) || undefined"
                :style="spanStyles[i]"
            >
                <div v-if="!isIndeterminate(seg)" class="tl__fill">
                    <span
                        v-if="stateOf(seg) === 'active'"
                        class="tl__cap"
                        :style="flex.stretchStyle.value"
                    />
                </div>
            </div>
        </div>

        <ul class="tl__marks" role="list">
            <li
                v-for="(seg, i) in list"
                :key="seg.key"
                class="tl__mark-seat"
                :style="{ '--tl-at': String(spans[i]?.at ?? 0), '--tl-accent': accentOf(seg, i) }"
            >
                <button
                    :ref="(el) => { if (el) markRefs[i] = el as HTMLButtonElement; }"
                    type="button"
                    class="tl__mark"
                    data-control-target
                    :data-state="stateOf(seg)"
                    :data-crossing="crossing === i || undefined"
                    :aria-label="`${seg.label}: ${stateOf(seg)}`"
                    :aria-current="seg.key === props.current ? 'step' : undefined"
                    :tabindex="i === roving ? 0 : -1"
                    :style="pressed === i ? press.pressStyle.value : undefined"
                    @click="onSelect(seg)"
                    @keydown="onMarkKeydown($event, i)"
                    @focus="roving = i; onMarkEnter(seg)"
                    @blur="onMarkLeave(seg)"
                    @pointerenter="onMarkEnter(seg)"
                    @pointerleave="onMarkLeave(seg); endPress()"
                    @pointerdown="onMarkDown($event, i)"
                    @pointerup="endPress()"
                    @pointercancel="endPress()"
                >
                    <span
                        class="tl__disc"
                        :style="crossing === i ? flex.stretchStyle.value : undefined"
                    >
                        <svg
                            v-if="stateOf(seg) === 'completed'"
                            class="tl__check"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                        >
                            <path d="M5 13l4 4L19 7" />
                        </svg>
                    </span>
                </button>
            </li>
        </ul>

        <div v-if="$slots.detail" class="tl__detail" :key="effective?.key ?? 'idle'">
            <slot
                name="detail"
                :segment="effective"
                :source="source"
                :current="props.current ?? null"
                :hovered="hovered"
                :value="value"
                :progress="valueText"
            />
        </div>
    </div>
</template>

<style scoped>
/* ── LAYOUT ────────────────────────────────────────────────────────────────────
   The track and the mark list are SIBLINGS sharing one grid cell, never
   parent/child: `role="progressbar"` must carry no focusable descendant (axe
   `nested-interactive`), and the marks must paint OUTSIDE the well's clip. One
   grid cell gives both without a wrapper element.

   Every length here is a rank-series member, an external floor, or a stated
   product of two series members. The series steps down one rung at ≤768px from
   the ONE width-conditional declaration in `tokens/sizing.css`, so the whole
   plate transposes for free — the track 12→8, the mark 20→12, and the clearance
   between them (their half-difference) 4→2. */
.tl {
    display: grid;
    grid-template-columns: 100%;
    row-gap: var(--space-body);
    position: relative;
}

.tl__track,
.tl__marks {
    grid-row: 1;
    grid-column: 1;
    align-self: center;
}

.tl__track {
    block-size: var(--timeline-track-h);
    /* THE A10 RECESS. The register carries only a muted fallback; a direct
       consumer authors its own paint (`track-well.css:21-22`). A bare wash
       measured 4.58 ΔRGB against the card — an invisible groove whose only
       boundary would be a hairline. Host − 4% L is the field-recess law, and
       `oklch(from …)` is the house relative-colour idiom, so the one expression
       serves both modes off the mode-armed host. */
    background: oklch(from var(--card) calc(l - 0.04) c h);
    /* One top-only inset ink edge — the ONE ink register at its EDGE rung
       (`--ink-edge` 0.16), composed rather than re-typed. `--cartoon-ink` is the
       warm near-black in BOTH modes (its `l` is clamped), so a recess reads
       shadowed at the top without a per-mode fork and without any `light-dark()`
       near an inset fragment. The 0-alpha arm is `oklch(0 0 0 / 0)`, never bare
       `transparent` (the WebKit black-premultiply hole). */
    box-shadow: inset 0 1px 0
        color-mix(in oklab, var(--cartoon-ink) calc(var(--ink-edge) * 100%), oklch(0 0 0 / 0));
}

.tl__marks {
    position: relative;
    margin: 0;
    padding: 0;
    list-style: none;
    pointer-events: none;
    /* The axis reserves the tallest REAL target, not a decorative floor: WCAG
       2.5.8's 24px at fine. The 44px coarse reservation is one rule below, in
       this component's own `(pointer: coarse)` arm — an unconditional 44 would
       bank 20px of dead vertical on every desktop. */
    min-block-size: 1.5rem;
}

.tl__mark-seat {
    position: absolute;
    top: 50%;
    left: calc(var(--tl-at) * 100%);
    translate: -50% -50%;
    display: flex;
    line-height: 0;
    pointer-events: none;
}

.tl__mark-seat > * {
    pointer-events: auto;
}

/* ── SPANS — the second clip box ───────────────────────────────────────────────
   `.glass-track-well` clips the TRACK's ends; it cannot clip a span. Without
   this one declaration the fill translates straight into its neighbours (both
   engines measured it: 100px into the completed side, 200px from the pending
   side), and TL-1's whole claim — "the bar reads" — is void. */
.tl__span {
    position: absolute;
    inset-block: 0;
    left: calc(var(--tl-l) * 100%);
    width: calc(var(--tl-w) * 100%);
    overflow: hidden;
}

/* TRAVEL. The fill is 100% of its span box and rides `translateX` inside the
   two clip boxes — no `width` animation (off the compositor, and it was the
   `will-change: width` that never came off), no `scaleX` (which would distort
   the cap), and no division anywhere (so no `matrix(infinity)`). */
.tl__fill {
    position: absolute;
    inset: 0;
    background: var(--tl-accent);
    transform: translateX(calc((var(--tl-f) - 1) * 100%));
}

.tl__track[data-advancing] .tl__fill {
    will-change: transform;
}

/* THE MENISCUS — a track-height pill at the fill front, stretching off the
   travel spring's own velocity through the shared tanh channel, capped at
   `--scale-hover` and paired reciprocally so the swell preserves volume. It is
   never grabbed: a timeline reports. */
.tl__cap {
    position: absolute;
    inset-block: 0;
    right: 0;
    inline-size: var(--timeline-track-h);
    border-radius: var(--radius-pill);
    background: var(--tl-accent);
    /* The library's ONE lit leg, not a second white minted beside it. */
    box-shadow: var(--glass-rim-top);
    transform: scaleX(var(--stretch, 1)) scaleY(calc(1 / var(--stretch, 1)));
    pointer-events: none;
}

/* ── THE ONE IDLE LOOP ─────────────────────────────────────────────────────────
   The host is the TRACK — a non-interactive reporting substrate
   (`role="progressbar"`, `aria-hidden` spans, no pointer events) and therefore
   on the canon's own legal-host list. The marks are interactive members and
   carry ZERO loops, which is the same clause that kills a current-mark halo.

   The loop is LOAD-BEARING, not decoration: in the indeterminate state it is
   the SOLE carrier. Kill it and `{ state: "active" }` paints pixel-identical to
   `pending`. Determinate, it additionally reports liveness across a plateau.

   Honest ledger: exactly ONE live animation while a span is active, ZERO
   otherwise — and zero is lawful, because the canon's rest is a floor, not a
   loop. */
.tl {
    /* One rung under the "both" fill (0.05 + 0.12 = 0.17); the amplitude floor
       is the canon's own ≥0.30-of-peak clamp. Neither number is minted here. */
    --tl-flow-peak: var(--fill-selected);
    --tl-flow-floor: 0.3;
}

.tl__span[data-state="active"] > .tl__fill::after,
.tl__span[data-indeterminate]::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    mix-blend-mode: plus-lighter;
    background-image: linear-gradient(
        90deg,
        oklch(1 0 0 / 0) 0%,
        oklch(1 0 0 / var(--tl-flow-peak)) 50%,
        oklch(1 0 0 / 0) 100%
    );
    background-size: 45% 100%;
    background-repeat: no-repeat;
    animation: tl-flow var(--duration-shimmer-fast) linear infinite;
}

@keyframes tl-flow {
    from {
        background-position: -50% 0;
        opacity: var(--tl-flow-floor);
    }
    50% {
        opacity: 1;
    }
    to {
        background-position: 150% 0;
        opacity: var(--tl-flow-floor);
    }
}

/* ── MARKS ─────────────────────────────────────────────────────────────────────
   The hit box inflates and the paint never does: the `<button>` carries the
   target, an inner `<span>` carries the disc. `[data-control-target]` DECLARES
   the mark a coarse-floor member — it is the census marker every interactive
   face in the library carries — but it cannot deliver the floor here: the shared
   rule in `utilities/responsive.css` is a bare attribute selector (0,1,0) and
   Vue suffixes every scoped selector with `[data-v-*]`, so this rule ships as
   (0,2,0) and out-specifies it on the very two properties it sets. The floor is
   therefore re-declared at this component's own specificity, off the SAME
   `--touch-target` token — see the `(pointer: coarse)` arm below. */
.tl__mark {
    display: grid;
    place-items: center;
    min-inline-size: 1.5rem;
    min-block-size: 1.5rem;
    padding: 0;
    border: 0;
    background: none;
    cursor: pointer;
}

/* WCAG 2.5.5's 44px, where a finger is the pointer. One value read from one
   token at two declaration sites — never a second number typed beside it. The
   row reserves the inflated box too, or a 44px mark overhangs a 24px list by
   10px on both edges. */
@media (pointer: coarse) {
    .tl__marks {
        min-block-size: var(--touch-target);
    }

    .tl__mark {
        min-inline-size: var(--touch-target);
        min-block-size: var(--touch-target);
    }
}

.tl__mark:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring-shadow);
    border-radius: var(--radius-pill);
}

.tl__disc {
    display: grid;
    place-items: center;
    inline-size: var(--space-family);
    block-size: var(--space-family);
    border-radius: 50%;
    background: var(--card);
    /* The control-perimeter rung — one ink, the α the register names, composed
       exactly as `color-radius.css` §1.2 writes it. The ink is `--foreground`
       and NOT `--cartoon-ink`: the cartoon ink is clamped dark in both modes,
       which is correct under a recess (a groove is shadowed at the top in either
       mode) and wrong on a mark, where a near-black perimeter on a dark card
       leaves a pending mark with no boundary at all. */
    border: 1px solid
        color-mix(in oklab, var(--foreground) calc(var(--ink-perimeter) * 100%), oklch(0 0 0 / 0));
    transform: scaleX(var(--stretch, 1)) scaleY(calc(1 / var(--stretch, 1)));
}

/* The crossing window is the disc's ONLY animated window: the swell rides the
   inline `--stretch` the front hands it, and the compositor hint is gated to
   exactly that window rather than parked on every mark forever — the same shape
   as `[data-advancing]` on the fill. This is what `data-crossing` is FOR; the
   attribute is not a spectator. */
.tl__mark[data-crossing] .tl__disc {
    will-change: transform;
}

/* Active — hollow, ringed in its own span hue. */
.tl__mark[data-state="active"] .tl__disc {
    border-color: var(--tl-accent);
    border-width: 2px;
}

/* Completed — the accent disc, its check drawn in whatever ink reads on it. */
.tl__mark[data-state="completed"] .tl__disc {
    background: var(--tl-accent);
    border-color: var(--tl-accent);
}

/* The current mark: 2px at half the perimeter α — the SAME ink mass spread over
   twice the height, because it must be findable along a long run. Static; the
   halo loop stays dead. */
.tl__mark[aria-current="step"] .tl__disc {
    box-shadow: 0 0 0 2px
        color-mix(
            in oklab,
            var(--foreground) calc(var(--ink-perimeter) / 2 * 100%),
            oklch(0 0 0 / 0)
        );
}

.tl__check {
    inline-size: 100%;
    block-size: 100%;
    overflow: visible;
}

.tl__check path {
    fill: none;
    /* The pre-modern base first so an engine without `contrast-color()` still
       draws a legible check; the modern arm then picks the max-contrast ink for
       whichever ramp stop this span landed on. */
    stroke: white;
    stroke: contrast-color(var(--tl-accent));
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    /* ≈28 path units; a 32-unit dash covers it, and the sweep to 0 writes it on. */
    stroke-dasharray: 32;
    stroke-dashoffset: 0;
    animation: tl-check var(--spring-dock-duration) var(--spring-dock) both;
}

@keyframes tl-check {
    from {
        stroke-dashoffset: 32;
    }
    to {
        stroke-dashoffset: 0;
    }
}

/* Hover exists only where a pointer does. */
@media (hover: hover) {
    .tl__mark:hover .tl__disc {
        scale: var(--scale-hover);
        background: color-mix(
            in oklab,
            var(--tl-accent) calc(var(--fill-hover) * 100%),
            var(--card)
        );
    }

    .tl__mark[data-state="completed"]:hover .tl__disc {
        background: var(--tl-accent);
    }
}

/* ── #detail ───────────────────────────────────────────────────────────────────
   Carried ALONG the axis rather than cross-faded — the entry nudge takes the
   sign of the travel, so the detail arrives from the side the front came from.
   The nudge is one space rung; the clock is the same spring the axis rides. */
.tl__detail {
    grid-row: 2;
    grid-column: 1;
    animation: tl-detail var(--spring-dock-duration) var(--spring-dock) both;
}

@keyframes tl-detail {
    from {
        opacity: 0;
        translate: calc(var(--tl-dir) * var(--space-atom)) 0;
    }
    to {
        opacity: 1;
        translate: 0 0;
    }
}

/* ── PRM ───────────────────────────────────────────────────────────────────────
   The springs already snap (`respectReducedMotion`), and the release returns the
   cap to 1. What is left here is the CSS half: the flow parks mid-sweep at its
   amplitude floor rather than vanishing (the state it carries must survive), the
   check keeps its drawn end-state, and the detail keeps its opacity arrival
   without the lateral carry. */
@media (prefers-reduced-motion: reduce) {
    .tl__span[data-state="active"] > .tl__fill::after,
    .tl__span[data-indeterminate]::after {
        animation: none;
        background-position: 50% 0;
        opacity: var(--tl-flow-floor);
    }

    .tl__check path {
        animation: none;
    }

    .tl__detail {
        animation-duration: 0.01ms;
    }

    .tl__mark:hover .tl__disc {
        scale: 1;
    }
}
</style>
