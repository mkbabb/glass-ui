<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
import { computed, nextTick, onBeforeUnmount, ref, watch } from "vue";
import { useResizeObserver } from "../../composables/dom/useResizeObserver";
import { useDockSpring } from "./composables/useDockSpring";
import { DOCK_SPRING } from "./constants";
import {
    provideDockCrossfadeContext,
    type DockFaceDescriptor,
    type DockFaceRegistration,
} from "./composables/dockCrossfadeContext";

/**
 * <DockCrossfade:active> is the thin controlled face-swap core.
 *
 * The content layer hosts ONE active face; a switch is a two-child OPACITY OVERLAP on
 * the per-face `--dock-t` scalar — driven by the ONE dock spring (`useDockSpring`,
 * velocity-continuous + interruptible), not a UA-eased View Transition. The reserved
 * box is sized to the peak face as a
 * MEASURE-ONCE `min-block-size` (a running max — NOT a per-swap FLIP). A dissolving
 * focus-holding face transfers focus to its successor, else the body
 * (un-inert-before-focus is load-bearing).
 *
 * Faces register through the crossfade context (`<DockLayer>` children). Where a switcher
 * exists, `useSelectionGroup` (the switcher run) drives `:active` — the composing
 * `<DockLayerGroup>` case. The controlled-no-switcher 5-pane case (a consumer) consumes this
 * DIRECTLY: a no-selection face-swap does NOT route through a selection engine (the
 * roving machine + indicator + selection model are all inert in that mode; don't
 * abstract them over a case that never selects).
 */

const props = withDefaults(
    defineProps<{
        /** The active face id — the caller-owned model (the ONE registry, no shadow state). */
        active: string;
        /**
         * The reserve axis. `block` (default) reserves the peak face HEIGHT; `inline`
         * reserves the peak WIDTH (a horizontal control run). The opacity crossfade is
         * axis-agnostic — only the peak reserve axis differs.
         */
        reserve?: "block" | "inline";
    }>(),
    { reserve: "block" },
);

const rootEl = ref<HTMLElement | null>(null);

// ── The face registry — the crossfade slot OWNS it (the FOLD destination for the
//    retired DockLayerGroup register/unregister machinery). A Map keyed by id keeps
//    registration idempotent; the reactive re-assign on every mutation triggers the
//    `faces` computed (the switcher source) + a peak re-measure. ──
const registry = ref<Map<string, DockFaceRegistration>>(new Map());

const faces = computed<DockFaceDescriptor[]>(() =>
    [...registry.value.values()].map(({ id, label, icon }) => ({ id, label, icon })),
);

function register(reg: DockFaceRegistration): void {
    const next = new Map(registry.value);
    next.set(reg.id, reg);
    registry.value = next;
    measurePeak();
}

function unregister(id: string): void {
    if (!registry.value.has(id)) return;
    const next = new Map(registry.value);
    next.delete(id);
    registry.value = next;
    measurePeak();
}

const activeId = computed(() => props.active);
const leavingId = ref<string | null>(null);

provideDockCrossfadeContext({ register, unregister, activeId, leavingId, faces });

// ── Peak-reserve: MEASURE-ONCE (a running max), never a per-swap FLIP. The reserved
//    box holds the PEAK face extent from frame 0, so switching to a shorter face never
//    shrinks the box (nor does the box jump when the plate collapses over it — the
//    compound: idle-EMPTY → running holds under a simultaneous collapse). Reads each
//    registered host's `scrollHeight`/`scrollWidth` (the intrinsic content extent —
//    robust for the inactive absolute-stretched panes a `getBoundingClientRect` would
//    read circularly). Only WIDENS (never shrinks below the tallest face seen). ──
const peak = ref(0);
const reserveProp = computed(() =>
    props.reserve === "inline" ? "min-inline-size" : "min-block-size",
);

function measurePeak(): void {
    let max = 0;
    for (const { el } of registry.value.values()) {
        const size = props.reserve === "inline" ? el.scrollWidth : el.scrollHeight;
        if (size > max) max = size;
    }
    if (max > peak.value) peak.value = max;
}

const reserveStyle = computed<Record<string, string> | undefined>(() =>
    peak.value > 0
        ? {
              [reserveProp.value]: `${peak.value}px`,
              "--dock-crossfade-peak": `${peak.value}px`,
          }
        : undefined,
);

useResizeObserver(rootEl, () => measurePeak());

// ── The interruptible crossfade spring. Composes the ONE `useDockSpring` factory (the
//    band's sole `new SpringProgress` site — NO second engine, the dock-single-engine
//    fence). A re-toggle mid-flight re-bases the fresh episode onto the live velocity
//    (the iOS interruptible-physics continuity), preserving each face's current painted
//    opacity so ping-pong and distinct-third switches never hard-cut. ──
const spring = useDockSpring({
    response: DOCK_SPRING.response,
    dampingFraction: DOCK_SPRING.dampingFraction,
});

function faceEl(id: string | null): HTMLElement | undefined {
    return id ? registry.value.get(id)?.el : undefined;
}

function writeT(id: string | null, t: number): void {
    faceEl(id)?.style.setProperty("--dock-t", `${t}`);
}

function clearT(id: string | null): void {
    faceEl(id)?.style.removeProperty("--dock-t");
}

function clamp01(v: number): number {
    return v < 0 ? 0 : v > 1 ? 1 : v;
}

const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
let settleCrossfade: (() => void) | null = null;
let activeSlope = 1;

watch(prefersReducedMotion, (reduced) => {
    if (!reduced) return;
    spring.dispose();
    settleCrossfade?.();
});

/**
 * X4 — a dissolving focus-holding face transfers focus to its SUCCESSOR (the entering
 * face host, a `tabindex="-1"` landing pad), else the body. Runs AFTER the entering face
 * is un-inert (a `nextTick` past the reactive `is-active` flip) so the routed focus lands
 * on a reachable node — the un-inert-before-focus ordering is load-bearing (focusing an
 * `[inert]` host is a no-op). Only fires when the leaving face actually holds focus (a
 * mouse-driven swap leaves focus where it is). The face host is the landing pad, not the
 * first control inside it, so a keyboard/AT user lands at the top of the revealed pane.
 */
async function transferFocusOnDissolve(fromId: string, toId: string): Promise<void> {
    if (typeof document === "undefined") return;
    const fromHost = faceEl(fromId);
    const held = document.activeElement;
    if (!fromHost || !held || !fromHost.contains(held)) return;
    await nextTick();
    (faceEl(toId) ?? document.body).focus?.();
}

watch(
    activeId,
    (next, prev) => {
        if (next === prev) return;
        measurePeak();

        const enterHost = faceEl(next);
        const leaveHost = faceEl(prev);

        // No overlap partner (a face not yet mounted, or a first controlled paint):
        // land the new active flush, no crossfade.
        if (!enterHost || !leaveHost) {
            leavingId.value = null;
            clearT(next);
            activeSlope = 1;
            return;
        }

        // Snap any STALE leaving face (a rapid third swap) to idle so at most two faces
        // ever animate — the two-child invariant.
        const stale = leavingId.value;
        const enterT = Number.parseFloat(enterHost.style.getPropertyValue("--dock-t"));
        const leaveT = Number.parseFloat(leaveHost.style.getPropertyValue("--dock-t"));
        const enterStart =
            stale === next && Number.isFinite(enterT) ? 1 - clamp01(enterT) : 0;
        const leaveStart = Number.isFinite(leaveT) ? clamp01(leaveT) : 1;
        if (stale && stale !== next && stale !== prev) clearT(stale);

        leavingId.value = prev;

        // Preserve each face's own painted opacity. A ping-pong face enters from its
        // live leaving opacity; on a distinct third switch, the partially-entered face
        // leaves from that partial value instead of jumping back to fully opaque.
        writeT(next, enterStart);
        writeT(prev, 1 - leaveStart);

        void transferFocusOnDissolve(prev, next);

        // Arm the two-child opacity overlap ([data-crossfading] gates the `--dock-t`
        // opacity rules; at rest the active face is a plain `opacity: 1`).
        rootEl.value?.setAttribute("data-crossfading", "");

        const settle = (): void => {
            clearT(next);
            clearT(prev);
            rootEl.value?.removeAttribute("data-crossfading");
            leavingId.value = null;
            activeSlope = 1;
            if (settleCrossfade === settle) settleCrossfade = null;
        };
        settleCrossfade = settle;

        // PRM — snap: entering full, leaving gone, zero in-between frames (fade-keeps/
        // transform-drops; there is no transform here, so PRM is an instant swap).
        if (prefersReducedMotion.value) {
            settle();
            return;
        }

        const inheritedVelocityScale =
            leaveStart > 0.001 ? -activeSlope / leaveStart : 0;
        activeSlope = 1 - enterStart;
        spring.playTo(0, 1, {
            inheritVelocityScale: inheritedVelocityScale,
            onFrame: (progress: number) => {
                // Clamp the opacity drive to [0,1]: the spring's ζ<1 overshoot is a box-
                // morph affordance, meaningless for a cross-dissolve (opacity must reach 1
                // and hold — an overshoot would flicker the leaving face back at
                // `1 - 1.03 → 0` clamp boundaries during the ring-down).
                writeT(
                    next,
                    clamp01(enterStart + (1 - enterStart) * progress),
                );
                writeT(prev, clamp01(1 - leaveStart * (1 - progress)));
            },
            onSettle: settle,
        });
    },
);

onBeforeUnmount(() => {
    spring.dispose();
    settleCrossfade = null;
});

// The switcher (a composing `<DockLayerGroup>`) reads the registered face
// descriptors off this expose; the controlled-no-switcher case ignores it.
defineExpose({ faces });
</script>

<template>
    <div ref="rootEl" class="dock-crossfade" :style="reserveStyle">
        <slot />
    </div>
</template>
