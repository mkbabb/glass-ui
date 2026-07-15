<script setup lang="ts">
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
 * <DockCrossfade :active> — the THIN controlled face-swap core (BI.W-DOCK-CROSSFADE,
 * PASS-1 §2.6 / PASS-4B ruling 3).
 *
 * The content layer hosts ONE active face; a switch is a two-child OPACITY OVERLAP on
 * the per-face `--dock-t` scalar — driven by the ONE dock spring (`useDockSpring`,
 * velocity-continuous + interruptible), NOT a UA-eased View Transition. G6 CLOSED:
 * `startViewTransition` is non-interruptible (a hard cut on rapid re-toggle — a direct
 * violation of the liquid-weight edict) and its snapshot of a live `backdrop-filter`
 * plate over aurora is unproven (blur ghost / edge pop); the two-child crossfade needs
 * no VT and stays spring-driven. The reserved box is sized to the PEAK face as a
 * MEASURE-ONCE `min-block-size` (a running max — NOT a per-swap FLIP). A dissolving
 * focus-holding face transfers focus to its successor, else the body
 * (un-inert-before-focus is load-bearing).
 *
 * Faces register through the crossfade context (`<DockLayer>` children). Where a rail
 * exists, `useSelectionGroup` (the switcher run) drives `:active` — the composing
 * `<DockLayerGroup>` case. The controlled-no-rail 5-pane case (speedtest) consumes this
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
//    `faces` computed (the rail source) + a peak re-measure. ──
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
//    (the iOS interruptible-physics continuity), seeded from the entering face's CURRENT
//    painted opacity so the crossfade never hard-cuts (the VT arm's failure). ──
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

function prefersReducedMotion(): boolean {
    return (
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
}

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
            return;
        }

        // Snap any STALE leaving face (a rapid third swap) to idle so at most two faces
        // ever animate — the two-child invariant.
        const stale = leavingId.value;
        if (stale && stale !== next && stale !== prev) clearT(stale);

        leavingId.value = prev;

        // Seed the spring from the entering face's CURRENT painted opacity so a
        // mid-flight re-toggle continues from where the pixels are (no hard cut). A
        // fresh swap seeds 0 (the idle face is invisible); a ping-pong seeds the live
        // opacity. The leaving face reads `calc(1 - --dock-t)`, so writing the same seed
        // to both keeps the pair complementary + continuous.
        const seed =
            typeof getComputedStyle === "function"
                ? clamp01(parseFloat(getComputedStyle(enterHost).opacity) || 0)
                : 0;
        writeT(next, seed);
        writeT(prev, seed);

        void transferFocusOnDissolve(prev, next);

        // Arm the two-child opacity overlap ([data-crossfading] gates the `--dock-t`
        // opacity rules; at rest the active face is a plain `opacity: 1`).
        rootEl.value?.setAttribute("data-crossfading", "");

        const settle = (): void => {
            clearT(next);
            clearT(prev);
            rootEl.value?.removeAttribute("data-crossfading");
            leavingId.value = null;
        };

        // PRM — snap: entering full, leaving gone, zero in-between frames (fade-keeps/
        // transform-drops; there is no transform here, so PRM is an instant swap).
        if (prefersReducedMotion()) {
            settle();
            return;
        }

        spring.playTo(seed, 1, {
            onFrame: (t: number) => {
                // Clamp the opacity drive to [0,1]: the spring's ζ<1 overshoot is a box-
                // morph affordance, meaningless for a cross-dissolve (opacity must reach 1
                // and hold — an overshoot would flicker the leaving face back at
                // `1 - 1.03 → 0` clamp boundaries during the ring-down).
                const c = clamp01(t);
                writeT(next, c);
                writeT(prev, c);
            },
            onSettle: settle,
        });
    },
);

onBeforeUnmount(() => spring.dispose());

// The switcher rail (a composing `<DockLayerGroup>`) reads the registered face
// descriptors off this expose; the controlled-no-rail case ignores it.
defineExpose({ faces });
</script>

<template>
    <div ref="rootEl" class="dock-crossfade" :style="reserveStyle">
        <slot />
    </div>
</template>
