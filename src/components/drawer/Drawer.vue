<script lang="ts" setup>
import { DialogRoot } from "reka-ui";
import { computed, onBeforeUnmount, ref, toRef, watch } from "vue";
import type { DrawerDirection, DrawerMode, DrawerStage } from "./index";
import { resolveDefaultSnapPoints } from "./constants";
import { provideDrawerSnapContext } from "./composables/drawerSnapContext";
import { useMotionAxis } from "../_shared/useMotionAxis";

/**
 * BB.W-DRAWER-ABROGATE — the Drawer root on the HOUSE reka `DialogRoot` substrate
 * (the SAME shape `Dialog.vue` binds). vaul-vue is gone: reka owns the open-control,
 * the portal, the focus management (trap when `modal`, free when `live-behind`) and
 * the scrim; the house `useDrawerSnap` engine (provided here, bound in DrawerContent)
 * owns the snap math vaul used to own.
 *
 * `mode` — additive shorthand (AN.W3). `"modal"` (default) keeps the iOS scale-down
 * look: `modal: true` (reka focus-traps + page-occludes) + `stage: "scale"` (the page
 * recedes). `"live-behind"` is the non-modal peek/half/full bottom sheet — `modal:
 * false` (no focus trap, no page `aria-hidden`, page-behind stays interactive — reka
 * delivers this natively), `stage: "none"`, and the direction-derived snap ladder.
 * Every prop the mode sets is still overridable by an explicit prop — `mode` only
 * supplies defaults.
 *
 * The snap props (`snapPoints`/`activeSnapPoint`/`direction`) are HOUSE props now
 * (they were vaul's `DrawerRootProps` surface — preserved by shape so the consumer
 * binding is byte-identical, but resolved by the house engine, not forwarded to reka,
 * which knows only `open`/`defaultOpen`/`modal`).
 *
 * BD.W-OVERLAY-STAGE-COUPLE — `stage` is the honest scene-staging enum — the page
 * recede is a real `--stage-t` scale/radius drive, not a boolean that moves no pixels:
 *   • `none`      — no staging (the live-behind peek sheet leaves the page untouched).
 *   • `dim`       — the scrim deepens with the detent; the page does NOT transform
 *                   (the PRM-safe luminance-only depth cue; also the `scale` degrade).
 *   • `scale`     — `dim` + the page RECEDES + SCALES (the iOS card-recede depth cue).
 *   • `immersive` — `scale` + one fixed-radius scrim backdrop sample (the spotlight;
 *                   its radius never reads the per-frame scalar).
 * Under `prefers-reduced-motion: reduce`, `scale`/`immersive` degrade to `dim` (no
 * page transform — a full-page snap-scale IS perceived motion, fold C1·R6). The enum
 * toggles `data-stage-scale` / `data-stage-immersive` on the page-wrapper marker
 * (`[data-stage-wrapper]`, mounted by the consumer/demo shell) through the spring's
 * open and close settle; the `--stage-t` scalar drives the couplings.
 */
const props = withDefaults(
    defineProps<{
        /** The controlled open state (`v-model:open`). */
        open?: boolean;
        /** Initial open state for the uncontrolled case. */
        defaultOpen?: boolean;
        /** reka modality — defaulted by `mode`; an explicit value overrides. */
        modal?: boolean;
        /** Presentation mode shorthand. */
        mode?: DrawerMode;
        /** The detent ladder (fractions 0..1). Live-behind resolves a default ladder. */
        snapPoints?: (number | string)[];
        /** The active detent fraction (`v-model:active-snap-point`). */
        activeSnapPoint?: number | string | null;
        /** Drag/slide axis (BB-2 default-ladder source). */
        direction?: DrawerDirection;
        /**
         * BD.W-OVERLAY-STAGE-COUPLE — the honest scene-staging enum. `none` leaves the
         * page untouched (the live-behind default); `dim` deepens the scrim only; `scale`
         * recedes + scales the page;
         * `immersive` adds one fixed-radius scrim backdrop sample. Defaulted by `mode`.
         */
        stage?: DrawerStage;
    }>(),
    {
        mode: "modal",
        open: undefined,
        defaultOpen: false,
        modal: undefined,
        snapPoints: undefined,
        activeSnapPoint: undefined,
        direction: "bottom",
        stage: undefined,
    },
);

const emits = defineEmits<{
    "update:open": [value: boolean];
    "update:activeSnapPoint": [value: number | string | null];
}>();

/**
 * AY.W-ANIM1 (W-ANIM-FIX) — the self-controlled open (the DialogTrigger silent-no-op
 * fix, preserved through the abrogation — it was never a vaul artefact). When the
 * consumer binds `v-model:open` it mirrors `props.open`; uncontrolled, `localOpen`
 * is the wrapper's own state. reka's `DialogTrigger` toggles via the root's
 * `onOpenChange`; binding `:open`/`@update:open` on `DialogRoot` round-trips both the
 * controlled bind and the uncontrolled trigger.
 */
const isControlled = computed(() => props.open !== undefined);
const localOpen = ref(props.open ?? props.defaultOpen);
watch(
    () => props.open,
    (v) => {
        if (v !== undefined) localOpen.value = v;
    },
);
function onUpdateOpen(open: boolean) {
    localOpen.value = open;
    emits("update:open", open);
}

const resolvedOpen = computed(() =>
    isControlled.value ? props.open! : localOpen.value,
);

// `mode` defaults — every value is still overridable by an explicit prop.
const live = computed(() => props.mode === "live-behind");
const resolvedModal = computed(() => props.modal ?? (live.value ? false : true));

// BD.W-OVERLAY-STAGE-COUPLE — the resolved stage. `modal` defaults to `scale` (the
// iOS card-recede look — a real `--stage-t` page transform);
// `live-behind` defaults to `none` (the peek sheet leaves the page interactive +
// untouched). An explicit `stage` always wins. Under PRM, `scale`/`immersive`
// degrade to `dim` — a full-page snap-scale is perceived motion (fold C1·R6).
const motionAxis = useMotionAxis();
const resolvedStage = computed<DrawerStage>(() => {
    const base = props.stage ?? (live.value ? "none" : "scale");
    if (
        motionAxis.prefersReducedMotion.value &&
        (base === "scale" || base === "immersive")
    )
        return "dim";
    return base;
});

// A consumer-supplied ladder (including `[]`) always wins. Only live-behind owns
// the direction-derived peek/half/full default; an ordinary modal/content-sized
// drawer has one full resting position and no implicit detents.
const resolvedSnapPoints = computed<readonly number[]>(() => {
    if (props.snapPoints !== undefined) {
        return props.snapPoints.map((p) =>
            typeof p === "number" ? p : Number.parseFloat(p),
        );
    }
    return live.value ? resolveDefaultSnapPoints(props.direction) : [];
});

// The active-snap-point round-trip (`v-model:active-snap-point`). The house snap
// engine writes the resolved detent back through this ref; a consumer external write
// re-snaps the open sheet (the house engine owns the snap math — no vaul
// controllable-shadowing limitation).
const activeSnapModel = ref<number | string | null>(props.activeSnapPoint ?? null);
watch(
    () => props.activeSnapPoint,
    (v) => {
        if (v !== undefined) activeSnapModel.value = v;
    },
);
watch(activeSnapModel, (v) => emits("update:activeSnapPoint", v));

// The local open ref the snap engine binds (the content reads it to seat the scalar).
const openRef = ref(resolvedOpen.value);
watch(resolvedOpen, (v) => (openRef.value = v));
watch(openRef, (v) => {
    // The engine never directly closes the sheet except a dismiss-flick; route it
    // through the same open-control so a bound v-model:open round-trips.
    if (v !== resolvedOpen.value) onUpdateOpen(v);
});

// The root anchor stays at the Drawer's declaration site while its content and scrim
// portal. This resolves the owning wrapper by ancestry and gives the spring stable,
// instance-local reader roots instead of a global first-match lookup.
const stageAnchorEl = ref<HTMLElement | null>(null);
const stageWrapperEl = ref<HTMLElement | null>(null);
const stageScrimEl = ref<HTMLElement | null>(null);
watch(
    stageAnchorEl,
    (anchor) => {
        stageWrapperEl.value =
            (anchor?.closest("[data-stage-wrapper]") as HTMLElement | null) ?? null;
    },
    { immediate: true, flush: "post" },
);
onBeforeUnmount(() => {
    stageWrapperEl.value = null;
    stageScrimEl.value = null;
});

provideDrawerSnapContext({
    open: openRef,
    snapPoints: resolvedSnapPoints,
    direction: toRef(props, "direction"),
    mode: toRef(props, "mode"),
    stage: resolvedStage,
    wrapperEl: stageWrapperEl,
    scrimEl: stageScrimEl,
    activeSnapPoint: activeSnapModel,
});
</script>

<template>
    <DialogRoot
        data-slot="drawer"
        :open="resolvedOpen"
        :modal="resolvedModal"
        @update:open="onUpdateOpen"
    >
        <span ref="stageAnchorEl" hidden />
        <slot />
    </DialogRoot>
</template>
