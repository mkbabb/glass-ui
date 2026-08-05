<script setup lang="ts">
import {
    computed,
    nextTick,
    onBeforeUnmount,
    onMounted,
    ref,
    useAttrs,
    useTemplateRef,
    watch,
} from "vue";
import {
    SliderRange,
    SliderRoot,
    SliderThumb,
    SliderTrack,
    useForwardPropsEmits,
} from "reka-ui";
import { useTouchGate } from "../../composables/dom/useTouchGate";
import { useDragVelocity } from "../../composables/dom/useDragVelocity";
import { useDockHold } from "../dock/composables/useDockHold";
import { resolveValueMarks } from "../_shared/field/valueDomain";
import { useMotionAxis } from "../_shared/useMotionAxis";
import type { SliderProps, SliderSize, SliderVariant } from "./types";

const props = withDefaults(defineProps<SliderProps>(), {
    variant: "standard",
    size: "md",
    invalid: false,
});
const emits = defineEmits<{
    "update:modelValue": [value: number[] | undefined];
    valueCommit: [value: number[]];
}>();

const v = computed<SliderVariant>(() => props.variant);
const s = computed<SliderSize>(() => props.size);
const marks = computed(() =>
    resolveValueMarks(props.marks, props.min ?? 0, props.max ?? 100),
);

const delegatedProps = computed(() => {
    const {
        class: _,
        variant: __,
        size: ___,
        marks: ____,
        invalid: _____,
        motion: ______,
        ...delegated
    } = props;
    // BOTH recipes inscribe the thumb within the capsule so it never overshoots the
    // rounded ends — reka-ui's `contain` alignment enforces the containment law. The
    // standard slider paints NO VISIBLE THUMB at all (the filled glass track's leading
    // edge IS the handle); the invisible thumb element rides `contain` so its
    // value-follow centre clamps to the fill edge and never overhangs the capsule. The
    // spectrum squircle spans the tall gradient track; neither floats past the capsule.
    return { ...delegated, thumbAlignment: "contain" as const };
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);

/* The host-native drag hold (one owner, one acquire path).
   The Slider reflects ITS OWN live pointer hold on the root via `data-held` — the
   flag `useDockHold` returns, which flips on the native `pointerdown`/`touchstart`
   acquire and clears on the window-scoped release. It is NOT the dock's posture
   count: read that way, every slider in a dock lit up whenever any sibling held the
   dock open (a popover, an armed search field), and a slider outside a dock could
   never light at all. The grasp register answers THIS hand.

   The acquire/release of that hold is owned ENTIRELY by `useDockHold`,
   which attaches NATIVE `pointerdown`/`touchstart` listeners on the
   slider's RESOLVED host element. This is the device-proven fix: reka's
   `<SliderRoot>` is a forwarding component (CollectionSlot +
   resolveDynamicComponent + forwardRef), so a Vue `@pointerdown` template
   binding arrives as `$attrs.onPointerdown` and is DROPPED across the
   Slot/forwardRef boundary — reka's own cached `onPointerdown` shadows
   it. vue-tsc + units pass; only a real drag catches it (the canonical
   binding-verification class). A native listener on the resolved host is
   immune. There are no duplicated acquire/release booleans, no
   window-`pointerup` re-implementation, and no parallel
   `watch(touchGate.isActive)` acquire path — the one `useDockHold` owner
   holds it all. */
const sliderRootRef = useTemplateRef<{ $el: HTMLElement } | HTMLElement | null>(
    "sliderRootRef",
);

function getRootEl(): HTMLElement | null {
    const ref = sliderRootRef.value;
    if (!ref) return null;
    if (ref instanceof HTMLElement) return ref;
    return (ref.$el as HTMLElement | undefined) ?? null;
}

// The native hold resolves the reka forwardRef host at its own `onMounted`
// (template refs are live by then). A resolver getter — not a ref Slider
// populates in a sibling `onMounted` — sidesteps the onMounted-ordering trap.
// The DOCK half is context-driven and always-on inside a dock (no consumer-facing
// opt-out knob) and a no-op outside one; the HAND half — `isHeld` — is this
// slider's own drag either way.
const { isHeld } = useDockHold(getRootEl);

/* The weight-train velocity bridge. Writes the BOUNDED
   `--atom-drag-v` (0..1, saturating `tanh`) on the resolved host during the drag
   window only; the rAF tears DOWN on `pointerup` (the no-idle-cost contract). The
   `.slider-range` smear + the cel cast lag read the var in scoped CSS. The bridge
   honors PRM (pins the var at 0, never opens the rAF) and is gated off when the
   resolved `motion` is not `full` (the host resolver returns the same element as the
   hold). The same resolver getter sidesteps the onMounted-ordering trap.
   `motion.armed` is the PROP door (full → armed), the bridge's own
   PRM pin is the OS door; both close to the plain-squish floor. */
const motionAxis = useMotionAxis(() => props.motion);
useDragVelocity({
    host: () => (motionAxis.armed.value ? getRootEl() : null),
    axis: () => (props.orientation === "vertical" ? "y" : "x"),
});

/* UseTouchGate scroll-vs-drag arbitration (a SEPARATE
   concern from the hold: it decides whether a touch is a drag or a
   scroll, swallowing the initial tap so reka's SliderRoot doesn't treat
   a scroll as a drag). On touch devices the first tap activates the
   slider; off-control taps deactivate via the shared global listener.
   Desktop pointers are unaffected — the gate is a no-op when
   `isTouchDevice` is false. The arbitration handlers are attached
   NATIVELY (alongside the hold) — the template `@touchstart` chain is
   dropped across the same reka forwarding boundary as `@pointerdown`,
   so a template binding never fired. It FEEDS the one hold (the native
   `touchstart` in `useDockHold` acquires); it no longer races it. */
const touchGate = useTouchGate();

function onTouchStart(event: TouchEvent): void {
    const root = getRootEl();
    const touch = event.touches[0];
    if (!root || !touch) return;

    if (!touchGate.handleTouchStart(root, touch.clientY)) {
        // Gate is pending activation — swallow this initial tap so the
        // SliderRoot doesn't treat it as a drag while the gate decides
        // (matches the canonical GlassDock pattern).
        event.preventDefault();
        event.stopPropagation();
    }
}

function onTouchMove(event: TouchEvent): void {
    touchGate.handleScrollCheck(event);
}

function onTouchEnd(): void {
    touchGate.handleTouchEnd();
}

onMounted(() => {
    const root = getRootEl();
    if (!root) return;
    // Native touch-arbitration listeners on the resolved host — same reason
    // as the hold: the template chain is dropped across reka's forwarding.
    // `touchstart` is NON-passive (the arbitration calls preventDefault on a
    // pending tap); move/end are passive reads.
    root.addEventListener("touchstart", onTouchStart, { passive: false });
    root.addEventListener("touchmove", onTouchMove, { passive: true });
    root.addEventListener("touchend", onTouchEnd, { passive: true });
});

onBeforeUnmount(() => {
    const root = getRootEl();
    if (!root) return;
    root.removeEventListener("touchstart", onTouchStart);
    root.removeEventListener("touchmove", onTouchMove);
    root.removeEventListener("touchend", onTouchEnd);
});

const isTouchActive = computed(() => touchGate.isActive.value);

// ── The GRASP mount (glass/grasp.css) ────────────────────────────────────────────
// The carriers exist exactly as long as the gesture's optic does: mounted the frame
// the hold begins, unmounted on the release fade's OWN `transitionend` — never a
// timer, which drifts against the paint. The register reads their presence, so
// "releasing" needs no flag: carriers mounted + `data-held` gone IS the release. The
// `isHeld` guard keeps a re-grab mid-release from unmounting under the finger (that
// fade reverses, and its `transitionend` still fires).
//
// NOT ON THE SPECTRUM VARIANT. That recipe DE-GLASSES its range on purpose — no
// background, no `backdrop-filter`, no rim (the gradient track IS the fill and the
// squircle thumb is the handle) — so mounting the carriers there would frost a
// surface deliberately made not-glass, and the register would paint a hold on a
// range that has no material to open. The spectrum's held read is its thumb halo,
// which it already carries.
const graspable = computed(() => v.value !== "spectrum");
const grasping = ref(false);
watch(isHeld, (held) => {
    if (held && graspable.value) grasping.value = true;
});
function onGraspReleaseEnd(event: TransitionEvent): void {
    if (event.propertyName === "opacity" && !isHeld.value) grasping.value = false;
}

// ── The FOCUS VEIL mount (glass/focus-veil.css) ──────────────────────────────────
// The headline consumer of the gradient-blur focus primitive: while this slider is
// held, the world behind it frosts and the slider stays crisp. The veil rides the
// SAME lifecycle as the grasp carriers above — mounted the frame the hold begins,
// unmounted on the release fade's own `transitionend` — because a resident
// full-viewport `backdrop-filter` at rest is not acceptable on any engine. It is the
// grasp register's outward half: the carriers open the material under the finger, the
// veil quiets everything that is not.
//
// The centre is VIEWPORT-space, so it is written whenever the control moves against
// the viewport — never per frame. One `getBoundingClientRect` gives the centre
// (`--veil-x`/`--veil-y`, registered percentages) and the control's own half-extents
// (`--glass-focus-veil-core-x/-y`), which is what §5 means by "JS-written from the
// control's half-extent". A slider does not move under its OWN drag, so the drag loop
// stays layout-read-free; a PAGE SCROLL during a live hold does move it, and a centre
// taken once would leave the pool burning a hole where the control no longer is. The
// re-take rides a capture-phase `scroll` listener on `window` — `scroll` does not
// bubble from a scroller, capture still reaches it, so one listener covers every
// scroller — passive because the write never cancels the scroll, and alive exactly as
// long as the grasp. `--veil-x`/`--veil-y` are registered `<percentage>` props, so the
// pool interpolates with the page instead of snapping.
const focusVeilRef = useTemplateRef<HTMLElement>("focusVeilRef");

function writeVeilCentre(): void {
    const host = getRootEl();
    const veil = focusVeilRef.value;
    if (!host || !veil) return;
    const rect = host.getBoundingClientRect();
    veil.style.setProperty(
        "--veil-x",
        `${((rect.left + rect.width / 2) / window.innerWidth) * 100}%`,
    );
    veil.style.setProperty(
        "--veil-y",
        `${((rect.top + rect.height / 2) / window.innerHeight) * 100}%`,
    );
    veil.style.setProperty("--glass-focus-veil-core-x", `${rect.width / 2}px`);
    veil.style.setProperty("--glass-focus-veil-core-y", `${rect.height / 2}px`);
}

function trackViewport(on: boolean): void {
    if (typeof window === "undefined") return;
    // Remove-then-add is idempotent: a re-grab mid-release must not leave two.
    window.removeEventListener("scroll", writeVeilCentre, true);
    if (on)
        window.addEventListener("scroll", writeVeilCentre, {
            passive: true,
            capture: true,
        });
}

watch(grasping, async (open) => {
    if (!open) {
        trackViewport(false);
        return;
    }
    await nextTick();
    writeVeilCentre();
    trackViewport(true);
});
onBeforeUnmount(() => trackViewport(false));

// The ENGAGED RAISE, inline. The veil is a `<body>` child, so the crisp control has to
// clear it in the ROOT stacking context: the root takes `--z-overlay` (50) for exactly
// as long as the plate is mounted, one rung over the plate's own
// `calc(var(--z-overlay) - 1)`. It is an INLINE declaration and not a
// `[data-focus-veil]` rule because a scoped `.glass-slider[data-focus-veil]` selector
// ties on specificity with any single-class descendant rule a host writes over its own
// children — a host that stacks its specimens is exactly that — and source order then
// decides the raise away silently. Inline has no tie to lose. `data-focus-veil` stays
// on the root as the state marker a consumer can style from. Both drop with the grasp,
// so a slider at rest is byte-identical to before.
const hostStyle = computed<Record<string, string> | undefined>(() => {
    const raised = grasping.value && graspable.value;
    if (!raised) return motionAxis.hostStyle.value;
    return { ...(motionAxis.hostStyle.value ?? {}), zIndex: "var(--z-overlay)" };
});

/* The never-nameless floor's DX signal. reka's
   SliderThumbImpl names the thumb `$attrs['aria-label'] || getLabel(index, count)`,
   and getLabel returns UNDEFINED for a single-thumb slider (it only mints
   "Minimum"/"Maximum"/"Value N of M" for ≥2 thumbs). So a bare single-thumb
   <Slider> with no `aria-label`/`aria-labelledby` yields a role="slider" thumb that
   is nameless to a screen reader (the axe `aria-input-field-name` class). Warn in
   DEV only — no runtime name is invented (that would be a lie); the fix is to wrap in
   <LabeledField> or pass an explicit `aria-label`. No-op in production. */
const attrs = useAttrs();
onMounted(() => {
    if (!import.meta.env.DEV) return;
    const named = attrs["aria-label"] != null || attrs["aria-labelledby"] != null;
    const values = props.modelValue ?? props.defaultValue ?? [0];
    const singleThumb = values.length <= 1;
    if (!named && singleThumb) {
        console.warn(
            "[Slider] no accessible name: a single-thumb <Slider> has no `aria-label` " +
                'or `aria-labelledby`, so its role="slider" thumb is nameless to a screen ' +
                "reader (reka mints no fallback name for one thumb). Wrap it in " +
                "<LabeledField>, or pass an explicit `aria-label`.",
        );
    }
});
</script>

<template>
    <SliderRoot
        v-slot="{ modelValue: values }"
        data-slot="slider"
        ref="sliderRootRef"
        class="glass-slider"
        data-control-target
        :class="props.class"
        :data-variant="v"
        :data-size="s"
        :data-invalid="props.invalid || undefined"
        :data-held="isHeld || undefined"
        :data-touch-active="isTouchActive || undefined"
        :data-inverted="props.inverted || undefined"
        :data-focus-veil="(grasping && graspable) || undefined"
        :data-motion="motionAxis.dataMotion.value"
        :style="hostStyle"
        v-bind="forwarded"
    >
        <!--
            The focus veil — the world's half of the grasp, TELEPORTED to `<body>`.
            `position: fixed` resolves against the viewport only while no ancestor
            carries `backdrop-filter`/`transform`/`filter`/`contain: paint`, and a
            slider's ordinary home is a glass plate that carries exactly those — left
            nested, the plate collapses to that ancestor's box and frosts the slider's
            own siblings instead of the world. As a body child it always covers the
            page, one rung under `--z-overlay`, which this root takes INLINE while the
            grasp is live so the control stays crisp above it. `data-engaged` carries
            the §5 clock: it drops on release, the veil fades out with the geometry, and
            the SAME `transitionend` that unmounts the grasp carriers unmounts it.
        -->
        <Teleport to="body">
            <span
                v-if="grasping && graspable"
                ref="focusVeilRef"
                class="glass-focus-veil"
                :data-engaged="isHeld || undefined"
                aria-hidden="true"
            />
        </Teleport>
        <SliderTrack class="slider-track glass-track-well">
            <span
                v-if="marks.length"
                class="glass-value-marks"
                aria-hidden="true"
                :data-orientation="props.orientation === 'vertical' ? 'vertical' : undefined"
                :data-inverted="props.inverted || undefined"
            >
                <span
                    v-for="mark in marks"
                    :key="mark.value"
                    class="glass-value-mark"
                    :style="{ '--value-mark-position': `${mark.position * 100}%` }"
                />
            </span>
            <!--
                The range is the GRASP register's host (glass/grasp.css): `data-held`
                and the two filter-only carriers ride the FILL — the surface that
                actually carries the glass — not the root. The carriers mount only
                while THIS slider's drag is live and unmount on the release's own
                `transitionend`; the register reads their presence, so no releasing
                flag exists to fall out of step. The spectrum variant is excluded —
                its range carries no glass to open.
            -->
            <SliderRange
                class="slider-range glass-liquid-fill"
                :data-held="isHeld || undefined"
            >
                <template v-if="grasping && graspable">
                    <span class="glass-grasp-carrier" data-grasp="rest"></span>
                    <span
                        class="glass-grasp-carrier"
                        data-grasp="grasp"
                        @transitionend="onGraspReleaseEnd"
                    ></span>
                </template>
            </SliderRange>
        </SliderTrack>
        <SliderThumb
            v-for="(_, key) in values"
            :key="key"
            :aria-label="($attrs['aria-label'] as string) ?? undefined"
            :aria-labelledby="($attrs['aria-labelledby'] as string) ?? undefined"
            :aria-describedby="($attrs['aria-describedby'] as string) ?? undefined"
            :aria-errormessage="($attrs['aria-errormessage'] as string) ?? undefined"
            :aria-invalid="props.invalid || undefined"
            class="slider-thumb glass-specular-track"
        />
    </SliderRoot>
</template>

<style scoped>
.glass-slider {
    --slider-range-origin: left center;
    position: relative;
    display: flex;
    inline-size: 100%;
    align-items: center;
    touch-action: none;
    user-select: none;
    transition: color var(--duration-fast) var(--ease-standard);
}

.glass-slider[data-inverted],
.glass-slider:dir(rtl) {
    --slider-range-origin: right center;
}

.glass-slider:dir(rtl)[data-inverted] {
    --slider-range-origin: left center;
}

/* ── The SIZE GEOMETRY axis — [data-size]-scoped, SHIPPED CSS ──
   NOT a DEAD arbitrary-property CVA
   (`[--slider-track-height:1.25rem]` &c. in slider/index.ts) that compiled only
   into a `dist/*.js` chunk no consumer content-scan reaches — so the `size` prop
   was INERT in every consumer and `size=md` fell back to the 6px track. The
   geometry now rides these `[data-size]`-scoped rules (the same proven in-file
   pattern the spectrum `[data-variant]` recipes use, :321+) so the size tokens
   SHIP in dist/glass-ui.css. `--slider-track-height` drives the standard thick
   capsule; `--slider-thumb-size` sizes the spectrum's VISIBLE thin thumb (× 0.75,
   the slim value.js bar — re-verified slim at md: 1rem × 0.75 = 12px over the
   1.5rem track = 0.5×) and the standard's invisible-thumb value-follow inset.
   thumb ≤ track at every rung (the inscription law). */
.glass-slider[data-size="sm"] {
    --slider-track-height: 0.75rem;
    --slider-thumb-size: 0.5rem;
}
.glass-slider[data-size="md"] {
    --slider-track-height: 1.25rem;
    --slider-thumb-size: 1rem;
}
.glass-slider[data-size="lg"] {
    --slider-track-height: 1.75rem;
    --slider-thumb-size: 1.5rem;
}

/* ── Shared geometry — size axis lifts via CSS vars set by the [data-size] rules ──
   The recessed GROOVE (position/overflow/pill-radius/recessed-bg) is COMPOSED
   from the shared `.glass-track-well` register (template class); the track owns
   only its SIZING (grown flex child + the [data-size] height axis) + its OWN
   typed background here. The retired `--slider-track-bg` consumer knob is
   replaced (clean break, no alias) by the v8 typed input
   `--glass-slider-track-background` (a valid CSS `background` grammar — color,
   `transparent`, gradient, or comma-layered checkerboard); a standard slider
   falls back to `--muted-medium`, the spectrum gradient falls back to
   `--secondary` below. The property inherits so a wrapper can style a Slider
   population; the namespace limits that inheritance to the Glass Slider family
   (no generic inheriting well knob). */
.slider-track {
    width: 100%;
    flex-grow: 1;
    height: var(--slider-track-height, 0.375rem);
    background: var(--glass-slider-track-background, var(--muted-medium));
    transition:
        background var(--duration-fast) var(--ease-standard),
        border-color var(--duration-fast) var(--ease-standard);
}

/* The value MARKS (`.glass-value-marks`/`.glass-value-mark`) are COMPOSED from the
   shared value-marks register — the horizontal/vertical/RTL/inverted dot geometry
   lives ONCE there; the Slider forwards its orientation/inverted flags as data attrs
   on the marks container. No scoped mark rules survive here (the twin was folded). */

/* ── The continuous GLASS fill (standard) — the shared liquid-fill register ──
   The fill is ONE continuous glass rounded-pill spanning the FULL thick-track
   height, pulled left/right; the inscribed round knob is seated INSIDE it so the
   fill flows straight under the knob (the value point) — ONE continuous cylinder,
   not a detached disc on a bar. The reka SliderThumb is styled below as the
   inscribed knob (a11y/keyboard/focus stay native on it).

   The glass-cylinder recipe (warm tint + backdrop blur + the
   unified edge rim + under-shadow) is EXTRACTED into the shared `.glass-liquid-fill`
   register (`src/styles/glass/liquid-fill.css`) the range COMPOSES via the template
   class — the SAME register `<Progress variant="liquid">` reads (fewer-sharper-
   primitives: ONE liquid-fill recipe, N surfaces). The Slider owns ONLY its layout
   (position/height) + the token BRIDGE below — the glass mechanics live ONCE in the
   register. The consumer-override tokens `--slider-range-bg`/`-blur`/`-shadow` are
   PRESERVED, mapped onto the register's `--liquid-fill-*` knobs (the lib default is
   the warm `--glass-capsule-warm` material, the brand color is the consumer's
   choice — presets-in-consumers). The state legs (hover/held/active/release/spectrum
   below) are unchanged; they override the composed base as before. */
.slider-range {
    position: absolute;
    height: 100%;
    /* The token bridge — the Slider's own consumer-override API mapped onto the
       shared liquid-fill knobs. Each keeps the SAME default the shared recipe
       uses, so the composed paint matches the shared liquid fill. */
    --liquid-fill-tint: var(--slider-range-bg, var(--glass-capsule-warm));
    --liquid-fill-blur: var(--slider-range-blur, var(--glass-blur-quiet));
    --liquid-fill-shadow: var(--slider-range-shadow, var(--glass-under-shadow-quiet));
}

/* ── The INVISIBLE thumb (standard) — you pull the TRACK itself ──
   The design constraint: NO VISIBLE THUMB AT ALL.
   The standard slider is ONE continuous glass segment — the filled `.slider-range`
   cylinder's leading EDGE is the only handle, the grab affordance the cursor/touch
   response. The reka `<SliderThumb>` element STAYS MOUNTED (a11y/keyboard/drag/
   value-follow all stay native on it) but paints INVISIBLE: zero width, zero
   opacity, transparent fill — its geometry collapses into the fill edge so there
   is no distinct disc/cap/ring paint over the continuous cylinder. Keyboard focus
   does NOT ring the (invisible) thumb — it ribbons the TRACK (the focus-visible
   block below the track rules), the focus register. */
.slider-thumb {
    display: block;
    /* INVISIBLE: the thumb has no own paint — width collapses to 0 and opacity to
       0 so nothing renders over the fill edge. The value-follow inset still
       positions this zero-box at the value point (reka owns the inline inset).
       The grab IS the track. */
    width: 0;
    height: var(--slider-track-height, 0.375rem);
    opacity: 0;
    background: transparent;
    border: none;
    box-shadow: none;
    /* The press-give still rides the transform channel (the `:active` scale below
       gives the WHOLE track a felt squish via the focus ring + range, not a visible
       knob). Per §6 the transform leg rides `--spring-smooth`. */
    transition: transform var(--duration-fast)
        var(--slider-thumb-spring, var(--spring-smooth));
}

/* Hover brightens the TRACK FILL (there is no knob to halo) — the continuous
   glass cylinder lifts its edge rim so the grab affordance reads on the track.
   Standard-only: the spectrum recipe halos its own VISIBLE thumb (below). */
.glass-slider:not([data-variant="spectrum"]):hover .slider-range {
    box-shadow:
        var(--glass-material-rim),
        var(--slider-range-shadow, var(--glass-under-shadow-quiet)),
        0 0 0 1px var(--surface-tint-8);
}

/* D5 — keyboard focus rings the TRACK, not the invisible thumb.
   The reka `<SliderRoot>` (the `.glass-slider` root) receives focus-within when
   its mounted-but-invisible `<SliderThumb>` takes keyboard focus; the ring rises
   on the .slider-track (the visible surface the user pulls) via the ONE button
   focus register (`--focus-ring-shadow`, the token-first focus axis). Standard-
   only: the spectrum recipe focus-rings its own VISIBLE thumb (below). */
.glass-slider:not([data-variant="spectrum"]):focus-within .slider-track {
    box-shadow: var(--focus-ring-shadow);
}

/* The WEIGHT-TRAIN (the headline). The fill is a column
   of warm tinted glass you PULL — it loads when you grab it, smears toward where you
   drag, and overshoots when you let go. The track does NOT move (box-INVIOLATE) —
   only the fill + cast deform on the compositor. `useDragVelocity` writes
   `--atom-drag-v` (0..1, BOUNDED/saturating) on the root during the drag window
   (no-idle-rAF). PRM zeroes `--motion-weight` → the train collapses to the plain
   squish floor; the warm tint + rim persist.

   ANTICIPATION + PRESS-SQUASH (grab): the fill compresses Y + widens X — a
   NON-uniform squash, NOT the live uniform `scale(0.97)` shrink. The range stays
   anchored at its logical value origin across direction and inversion. */
.glass-slider:active .slider-range {
    transform: scale(1.02, 0.94);
    transform-origin: var(--slider-range-origin);
    transition: transform var(--duration-fast)
        var(--slider-thumb-spring, var(--spring-smooth));
}

/* OVERLAPPING-ACTION SMEAR (pull): while dragging fast, the fill STRETCHES along
   the drag axis by the live `--atom-drag-v` (the leading edge LEADS). The X stretch
   is volume-preserving (Y compresses as X grows). The smear SATURATES — `--atom-drag-v`
   is already bounded ≤0.7 by `useDragVelocity`'s `tanh` clamp, so a faster pull
   does not rubber-band (challenge #3 R3). The cel cast (the inert child) LAGS this
   leading edge. `--motion-weight` couples the amplitude (PRM → 0 → no smear). */
.glass-slider[data-held] .slider-range,
.glass-slider:active .slider-range {
    --smear: calc(var(--atom-drag-v, 0) * var(--motion-weight, 0.618));
    transform: scale(
        calc(1.02 + 0.16 * var(--smear)),
        calc(0.94 - 0.06 * var(--smear))
    );
    transform-origin: var(--slider-range-origin);
}

/* FOLLOW-THROUGH (release): the `--ease-cartoon-punch` curve on the transform
   channel carries the >1.0 overshoot-and-settle knot as the squash returns to rest —
   a monotonic settle would be a dead spring. The cast recoils LATE (the caster's
   1.15× lag). The transition swaps to the punch curve on release (no `:active`).

   IT ALSO CARRIES THE GRASP REGISTER'S INK CHANNEL, and must. This rule governs the
   RELEASE WINDOW (`:not([data-held])`) on the very element the register releases on,
   and an SFC-scoped block is UNLAYERED — it outranks every `@layer components` rule
   whatever the specificity, which is the one exception to the register's
   outrank-by-specificity doctrine (glass/grasp.css). So the register's own
   `transition: --glass-veil-rung …` loses here, and a `transition` shorthand that
   omitted the channel would strand the ink: it would step 0.6 → 1 in one frame under
   a blur still fading over the dock spring's settle. The clock is READ from the
   register (`--spring-dock-duration`/`--ease-standard`), never re-typed as a literal
   — one clock, two declarations, and the arm in tests/styles/glass-subtlety.test.ts
   reds if this channel is dropped.

   And the `background` channel LEAVES this list, for the same reason. The fill's
   background is now a function of that rung (glass/liquid-fill.css), so transitioning
   both would chase one change down two clocks — the dependent `background` restarts a
   `--duration-fast` fade on every frame the rung advances, landing the ink late
   behind its own blur. One animated channel, one clock. Every other liquid-fill
   consumer already resolves this way (the register's release rule replaces the fill's
   own shorthand there); this rule now says the same thing where it outranks it. */
.glass-slider:not(:active):not([data-held]) .slider-range {
    transition:
        transform var(--duration-normal) var(--ease-cartoon-punch),
        --glass-veil-rung var(--spring-dock-duration) var(--ease-standard),
        box-shadow var(--duration-fast) var(--ease-standard);
}

@media (prefers-reduced-motion: reduce) {
    /* PRM — the train collapses to the plain non-uniform squish floor; no smear,
       no overshoot. The warm tint + rim stay (the legibility floor, a still frame). */
    .glass-slider:active .slider-range,
    .glass-slider[data-held] .slider-range {
        --motion-weight: 0;
        transform: scale(1, 0.97);
    }
}

.glass-slider[data-disabled] .slider-range {
    opacity: var(--opacity-disabled);
}

.glass-slider[data-invalid] .slider-track {
    box-shadow: inset 0 0 0 1px var(--destructive);
}

.glass-slider[data-invalid]:focus-within .slider-track {
    box-shadow:
        var(--focus-ring-shadow),
        inset 0 0 0 1px var(--destructive);
}

/* Held-state: THIS slider's own live pointer hold, and only its own — the edge
   `useDockHold` returns, never a sibling's drag and never the dock's posture count
   (a popover open inside the dock is not a hand). The STANDARD recipe (no visible
   thumb) intensifies the TRACK FILL's edge rim; the SPECTRUM recipe (visible thumb)
   intensifies its thumb halo (its range is transparent, so the held register rides
   the handle). A dock the finger is inside answers the same hand on its own plate. */
.glass-slider:not([data-variant="spectrum"])[data-held] .slider-range {
    box-shadow:
        var(--glass-material-rim),
        var(--slider-range-shadow, var(--glass-under-shadow-quiet)),
        0 0 0 2px var(--surface-tint-15);
}

.glass-slider[data-variant="spectrum"][data-held] .slider-thumb {
    box-shadow:
        0 0 0 6px var(--surface-tint-15),
        var(--shadow-sm);
}

/* ── The gradient-track color slider (spectrum) ──
   A tall capsule track whose background is a consumer-supplied
   `--glass-slider-track-background: linear-gradient(...)` (the value.js LCH/hue
   ramp — the Slider's OWN typed background input). The range is transparent —
   the gradient itself IS the fill — and the thumb is a SQUIRCLE the HEIGHT of the
   track (the iOS color-picker idiom), spanning the full track height rather than
   floating as a circle. The spectrum fallback is `--secondary` (not the standard
   `--muted-medium`), so this rule keeps its own fallback override. */
.glass-slider[data-variant="spectrum"] .slider-track {
    height: calc(var(--slider-thumb-size, 1rem) * 1.5);
    background: var(--glass-slider-track-background, var(--secondary));
}

.glass-slider[data-variant="spectrum"] .slider-range {
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    box-shadow: none;
}

.glass-slider[data-variant="spectrum"] .slider-thumb {
    /* The spectrum thumb is the VISIBLE color-picker
       handle (unlike the standard slider's invisible thumb): it must paint. It
       re-establishes the geometry the standard base collapses (opacity:1, an
       explicit width) and spans the FULL track height — but THIN, matching the
       value.js color-picker reference EXACTLY: there the thumb is `w-3` (12px)
       over an `h-6` (24px) track — a slim vertical bar HALF the track height in
       width. The spectrum track here is `--slider-thumb-size * 1.5`, so a width
       of `--slider-thumb-size * 0.75` lands the same 0.5×-track ratio (the
       value.js bar, not a chunky 1.1× squircle nor a too-thin
       0.6×). The width is the ONE geometry leg the user named. */
    width: calc(var(--slider-thumb-size, 1rem) * 0.75);
    height: 100%;
    opacity: 1;
    background: var(--slider-thumb-bg, transparent);
    /* (value.js L6) — the thumb border WIDTH joins the
       consumer-retunable token surface alongside `--slider-thumb-border-color`, so a
       consumer can retune the spectrum handle's rim weight without forking the recipe
       (one slider owner). Default 2px. */
    border: var(--slider-thumb-border-w, 2px) solid
        var(--slider-thumb-border-color, var(--background));
    /* The cross-engine CONTRACT: a GENEROUS radius proportional to the box reads
       squircle-adjacent on Safari/Firefox/old-Chrome — NOT a bare `--radius-lg`
       rounded RECT on the ~35% without `corner-shape`. The superellipse is the
       @supports-gated PE tier that REFINES this curve, never its base. Scaled to
       the thinner box so the curve still reads. */
    border-radius: calc(var(--slider-thumb-size, 1rem) * 0.4);
    box-shadow: var(--slider-thumb-shadow, var(--shadow-sm));
}

/* The squircle PE tier (Chrome 139+; ~65% global) — `corner-shape` only
   changes the CURVE within the --radius box, so the round fallback above
   stays honest cross-engine. `var()` is not @supports-evaluable, so the gate
   tests the LITERAL `superellipse(2)` feature (the same Chrome-139 query the
   big-dock squircle rides). */
@supports (corner-shape: superellipse(2)) {
    .glass-slider[data-variant="spectrum"] .slider-thumb {
        corner-shape: var(--corner-shape-thumb);
    }
}

/* (value.js L6) — the spectrum hover recipe joins the
   consumer-retunable token surface: the hover halo's ring WIDTH + COLOR are tokens a
   consumer can retune (the value.js color-picker hover tune) without forking. Defaults
   (4px / --surface-tint-8) match the plain hover ring. */
.glass-slider[data-variant="spectrum"]:hover .slider-thumb {
    box-shadow:
        0 0 0 var(--slider-thumb-hover-ring-w, 4px)
            var(--slider-thumb-hover-ring-color, var(--surface-tint-8)),
        var(--shadow-sm);
}

/* D5 — the spectrum thumb keyboard focus rides the SAME button focus register
   (`--focus-ring-shadow`) as the standard knob, over the squircle's drop-shadow.
   P1-R3 (value.js §1.8) — the house ring is the ONE focus mark, so the UA
   outline MUST be suppressed IN THE SAME RULE: Chromium otherwise paints its
   `outline: auto 1px` accent OVER the accent-aware ring (a keyboard-visible
   double-paint). Never a bare `outline: none` without the ring beside it. */
.glass-slider[data-variant="spectrum"] .slider-thumb:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring-shadow), var(--shadow-sm);
}

.glass-slider[data-orientation="vertical"] {
    flex-direction: column;
    width: var(--slider-track-height, 0.375rem);
    height: var(--slider-vertical-size, 12rem);
}

.glass-slider[data-orientation="vertical"] .slider-track {
    width: var(--slider-track-height, 0.375rem);
    height: 100%;
}

.glass-slider[data-orientation="vertical"] .slider-range {
    width: 100%;
    height: auto;
}

.glass-slider[data-orientation="vertical"]:active .slider-range,
.glass-slider[data-orientation="vertical"][data-held] .slider-range {
    --smear: calc(var(--atom-drag-v, 0) * var(--motion-weight, 0.618));
    transform: scale(
        calc(0.94 - 0.06 * var(--smear)),
        calc(1.02 + 0.16 * var(--smear))
    );
    transform-origin: center bottom;
}

.glass-slider[data-orientation="vertical"][data-inverted] .slider-range {
    transform-origin: center top;
}

.glass-slider[data-orientation="vertical"][data-variant="spectrum"] {
    width: calc(var(--slider-thumb-size, 1rem) * 1.5);
}

.glass-slider[data-orientation="vertical"][data-variant="spectrum"] .slider-track {
    width: 100%;
    height: 100%;
}

.glass-slider[data-orientation="vertical"][data-variant="spectrum"] .slider-thumb {
    width: 100%;
    height: calc(var(--slider-thumb-size, 1rem) * 0.75);
}

@media (prefers-reduced-motion: reduce) {
    .glass-slider[data-orientation="vertical"]:active .slider-range,
    .glass-slider[data-orientation="vertical"][data-held] .slider-range {
        transform: scale(0.97, 1);
    }
}
</style>
