<script setup lang="ts">
import {
    type HTMLAttributes,
    computed,
    type CSSProperties,
    watch,
    onScopeDispose,
} from "vue";
import {
    DialogClose as RekaDialogClose,
    DialogContent as RekaDialogContent,
    DialogPortal as RekaDialogPortal,
    injectDialogRootContext,
    useForwardPropsEmits,
} from "reka-ui";
import { X } from "@lucide/vue";
import { cn } from "../_shared/class-names";
import {
    useSpringMount,
    type SpringPreset,
} from "../../composables/motion/useSpringMount";
import ModalOverlay from "./ModalOverlay.vue";
// BH.W-MOTION-AXIS — the `spring` boolean dies onto the ONE `motion` axis (the preset
// carves off onto the distinct `springPreset` prop; motion gates the JS entrance).
import type { Motion, Placement, Surface } from "../_shared/axes";
import { useMotionAxis } from "../_shared/useMotionAxis";
// BA.W-SURFACE-AXIS — Dialog's binary `variant: glass|opaque` string RETIRES onto
// the SHARED {glass·veil·opaque} `surface` axis (clean break, no alias — the prior
// `variant` was Dialog-local and never matched the Card grammar; MIGRATION.md row).
// BI.W-DIALOG-PLACEMENT — attribute-driven veil/opaque decoration rides
// the placement != center slide path (the folded Sheet composes glass-floating in its
// slide base; the decoration layers the same shared W55 seam).
import { resolveSurfaceClass } from "../_shared/resolveSurfaceClass";
import { useOptionalDialogStageContext } from "./dialogStageContext";
import type { DismissableContentEmits } from "../_shared/interaction";

export interface DialogContentProps {
    forceMount?: boolean;
    disableOutsidePointerEvents?: boolean;
    class?: HTMLAttributes["class"];
    surface?: Surface;
    placement?: Placement;
    motion?: Motion;
    springPreset?: SpringPreset;
    showClose?: boolean;
    scroll?: boolean;
    stage?: "none" | "dim" | "scale" | "immersive";
}

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<DialogContentProps>(), {
    surface: "glass",
    placement: "center",
    showClose: true,
    scroll: false,
    stage: "none",
});
const emits = defineEmits<DismissableContentEmits>();

const delegatedProps = computed(() => {
    const {
        class: _,
        surface: _su,
        placement: _pl,
        motion: _mo,
        springPreset: _spp,
        showClose: _sc,
        scroll: _sl,
        stage: _st,
        ...delegated
    } = props;
    return delegated;
});

// BI.W-DIALOG-PLACEMENT — center vs the folded Sheet side-slide.
const placement = computed<Placement>(() => props.placement ?? "center");
const isCenter = computed(() => placement.value === "center");

// BH.W-MOTION-AXIS — the resolved motion state. The JS spring entrance arms iff a
// `springPreset` is named AND the resolved motion is not `off` (a preset-less dialog
// keeps the `.glass-reveal` CSS bloom — byte-identical to HEAD's unset `spring`).
const motionAxis = useMotionAxis(() => props.motion);
// The JS spring entrance is the CENTERED scale-bloom ONLY (BI.W-DIALOG-PLACEMENT). A
// placement != center Dialog slides via the CSS `sheet-animate` register (byte-identical
// to the retired Sheet); the JS slide-spring + drag-dismiss gesture are Drawer's
// mechanism (the N3 disambiguation), never smuggled into this paint axis.
const springActive = computed(
    () =>
        props.springPreset != null &&
        motionAxis.resolved.value !== "off" &&
        (props.placement ?? "center") === "center",
);

// BD.W-OVERLAY-STAGE-COUPLE — the centered modal flips `--stage-t` 0→1 on open (the
// drawer drives it per-frame; a dialog has no detent, so it transitions the ONE scalar
// on `--spring-snappy`, scoped to the reader roots — BI.W-DRAWER-PERF). The honest
// `stage` enum gates the page-wrapper recede; PRM degrades `scale`/`immersive` → `dim`.
const resolvedStage = computed(() => {
    const base = props.stage;
    if (
        motionAxis.prefersReducedMotion.value &&
        (base === "scale" || base === "immersive")
    )
        return "dim";
    return base;
});
const dialogRoot = injectDialogRootContext();
const stageContext = useOptionalDialogStageContext();
// BI.W-DRAWER-PERF — flip `--stage-t` 0→1 SCOPED to the reader roots (the page-wrapper
// + the scrim), NOT `document.documentElement`. `--stage-t` is `inherits: false`
// (drawer.css), so a write on the app-root wrapper recalcs ONLY the wrapper — a whole-
// document `:root` write invalidated the inherited-property cache for the entire app
// subtree (the storm the drawer's per-frame writer paid at 120×; the modal flip is
// one-shot but shares the retired lever). The reader roots resolve AFTER the portal
// commits (this watch runs pre-flush; one rAF lands post-commit so the freshly-portaled
// scrim exists), and the CSS flip transition catches the 0→1 delta via a two-frame
// seat-0 → flip-1 (both the persistent wrapper AND the fresh scrim gain a before-change
// style, so both GLIDE rather than snap). On close each root reverts to the registered
// `initial-value: 0` (no stale full-staged latch on re-open).
let seatFrame = 0;
let flipFrame = 0;
let ownedWrapper: HTMLElement | null = null;
let ownedScrim: HTMLElement | null = null;

function cancelStageFrames() {
    if (typeof cancelAnimationFrame === "undefined") return;
    if (seatFrame) cancelAnimationFrame(seatFrame);
    if (flipFrame) cancelAnimationFrame(flipFrame);
    seatFrame = 0;
    flipFrame = 0;
}

function releaseStage() {
    cancelStageFrames();
    for (const el of [ownedWrapper, ownedScrim]) {
        if (!el) continue;
        el.removeAttribute("data-stage-flip");
        el.style.removeProperty("--stage-t");
    }
    ownedWrapper?.removeAttribute("data-stage-scale");
    ownedScrim?.removeAttribute("data-stage-immersive");
    ownedWrapper = null;
    ownedScrim = null;
}

function syncStage(open: boolean) {
    cancelStageFrames();
    if (
        typeof requestAnimationFrame === "undefined" ||
        !open ||
        props.stage === "none"
    ) {
        releaseStage();
        return;
    }

    // Resolve only the roots registered by this Dialog instance. A delayed portal
    // mount re-runs the watcher when its scrim ref arrives; no document-wide fallback
    // can capture a sibling or nested overlay.
    seatFrame = requestAnimationFrame(() => {
        ownedWrapper = stageContext?.wrapperEl.value ?? null;
        ownedScrim = stageContext?.scrimEl.value ?? null;
        const wantScale =
            resolvedStage.value === "scale" || resolvedStage.value === "immersive";
        const wantImmersive = resolvedStage.value === "immersive";
        for (const el of [ownedWrapper, ownedScrim]) {
            if (!el) continue;
            el.setAttribute("data-stage-flip", "");
            el.style.setProperty("--stage-t", "0");
        }
        ownedWrapper?.toggleAttribute("data-stage-scale", wantScale);
        ownedScrim?.toggleAttribute("data-stage-immersive", wantImmersive);
        flipFrame = requestAnimationFrame(() => {
            for (const el of [ownedWrapper, ownedScrim]) {
                if (el?.isConnected) el.style.setProperty("--stage-t", "1");
            }
        });
    });
}
watch(
    [
        () => dialogRoot?.open.value,
        () => stageContext?.wrapperEl.value,
        () => stageContext?.scrimEl.value,
        resolvedStage,
    ],
    ([open]) => syncStage(!!open),
    { immediate: true, flush: "post" },
);
onScopeDispose(releaseStage);

const forwarded = useForwardPropsEmits(delegatedProps, emits);

// Center fade + zoom only — no slide animation. The glass-floating tier
// (composed via `variantClasses` below) paints `--glass-shadow-floating`;
// the prior `shadow-xl` literal clobbered it (audit U.W0.C-a §5.2).
// BB.W-CARD-PAD — the overlay-band golden padding ladder. The overlay anchor is
// `--overlay-pad-inline` (--spacing(6) = 24px for the modal band); the block axis
// lifts by sqrt-phi (`*1.272`) so the heading clears the top edge against a 24px
// side. `gap-4` between header/body/footer sections STAYS (the overlay-band rhythm).
const baseClasses =
    "fixed left-1/2 top-1/2 z-modal grid w-full max-w-lg gap-4 [--overlay-pad-inline:--spacing(6)] [--overlay-pad-block:calc(var(--overlay-pad-inline)*1.272)] px-(--overlay-pad-inline) py-(--overlay-pad-block)";
// BB.W-LIQUID-REVEAL — the default (non-spring) path composes the spring-clocked
// `.glass-reveal` LIQUID-ENTER recipe (off the retired `popover-animate` bezier
// zoom-95, clean break). The `-translate-x-1/2 -translate-y-1/2` centering stays
// (unlayered utilities; `.glass-reveal` never writes the BASE `translate` — only its
// `data-side` variants do, and a center Dialog has no `data-side`, so the centering
// is never clobbered). The recipe owns the clock, so `duration-normal` is dropped.
const defaultMotionClasses = "-translate-x-1/2 -translate-y-1/2 glass-reveal";

// BA.W-SURFACE-AXIS — the surface decoration rides the SHARED resolver on the
// `floating` tier. The resolver emits `glass-floating`; the veil/opaque attribute
// owns decoration and Dialog appends its own `rounded-dialog` radius. The opaque rung
// rides the SAME glass-floating tier (edge, rim, under-shadow preserved) + adds
// `.glass-opaque` (`--glass-level:0` through the ONE knob, NOT a parallel solid
// recipe); the `veil` rung overlays the borderless text-legibility plate — the
// byte-identical `glass`/`opaque` output the prior binary string emitted, now
// reached through the ONE axis with the `veil` rung gained for free.
const variantClasses = computed(() =>
    cn(resolveSurfaceClass("floating"), "rounded-dialog"),
);

// BI.W-DIALOG-PLACEMENT — the folded Sheet side-slide (the retired `sheetVariants`
// side arms, verbatim). Each `placement != center` value rounds its INNER corners on
// the dialog rung, borders the inner edge, and slides in via the shared `sheet-animate`
// CSS register (byte-identical frame-series to the retired Sheet — the slide is PAINT,
// not a distinct mechanism; N3: snap-detent physics stays Drawer's). The STRUCTURAL
// positioning (fixed/inset/size/z) ships PRECOMPILED off
// `[data-slot="dialog-content"][data-placement]` (src/styles/dialog-placement.css) — a
// load-bearing geometry utility dies in a consumer's Tailwind content-scan (the D7
// emission inverse), so it is an attribute-selector rule, never a CVA class.
const PLACEMENT_SLIDE: Record<Exclude<Placement, "center">, string> = {
    top: "rounded-b-dialog border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
    bottom: "rounded-t-dialog border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
    left: "rounded-r-dialog border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
    right: "rounded-l-dialog border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
};
// The side base (the retired `sheetVariants` base with the STRUCTURAL utilities stripped):
// the overlay padding ladder + the `sheet-animate` data-state slide pair + `transition
// ease-in-out`. `glass-floating` rides the private tier resolver below (no double-name).
const sideBaseClasses =
    "[--overlay-pad-inline:--spacing(6)] [--overlay-pad-block:calc(var(--overlay-pad-inline)*1.272)] px-(--overlay-pad-inline) py-(--overlay-pad-block) transition ease-in-out sheet-animate";

const centerScrollClasses = computed(() =>
    props.scroll && isCenter.value ? "max-h-[calc(100dvh-2rem)] overflow-y-auto" : "",
);

// The resolved content class — center (the `.glass-reveal` bloom or the JS spring) vs the
// folded side-slide. A side placement never arms the JS spring (springActive gates to
// center) and never composes the center `-translate-x/y-1/2 glass-reveal` recipe.
const contentClass = computed(() =>
    isCenter.value
        ? cn(
              baseClasses,
              springActive.value ? "" : defaultMotionClasses,
              variantClasses.value,
              centerScrollClasses.value,
              props.class,
          )
        : cn(
              sideBaseClasses,
              PLACEMENT_SLIDE[placement.value as Exclude<Placement, "center">],
              resolveSurfaceClass("floating"),
              props.class,
          ),
);

// BI.W-DIALOG-PLACEMENT / W-CONFIG-IN-SHEET — the folded side sheet is the Law-1
// concentric-radius RELAY PARENT (the retired SheetContent published this for the
// gear-sheet Configurator's nested cards): it PUBLISHES its resolved corner
// (--radius-dialog) as --radius-ctx + its content pad (--overlay-pad-inline) as
// --radius-inset, so a nested card-class surface DERIVES its own corner concentric with
// the outer. Center dialogs need no relay (they are terminal, not a nesting host).
const radiusCtxStyle: CSSProperties = {
    "--radius-ctx": "var(--radius-dialog)",
    "--radius-inset": "var(--overlay-pad-inline)",
};

// W13 spring entrance. Inject reka-ui's open ref and wire a useSpringMount
// (without dragHandlers — Dialog has no drag-dismiss gesture). The position
// 0→1 drives an inverse-scale + opacity so the dialog grows-in from 95% with
// a soft bouncy overshoot when preset = 'bouncy'.
const rootContext = springActive.value ? injectDialogRootContext() : null;
const springMount =
    springActive.value && rootContext
        ? useSpringMount({
              open: rootContext.open,
              preset: props.springPreset ?? "smooth",
          })
        : null;

const springStyle = computed<CSSProperties | undefined>(() => {
    if (!springMount) return undefined;
    const p = springMount.position.value; // 0 = mounted, 1 = dismissed
    // BD.W-OVERLAY-STAGE-COUPLE — the centered-dialog SQUISH via `scale:`/`translate:`
    // LONGHANDS, never `transform: translate() scale()` (build-trap (e): a
    // `transform:scale()` over a centering translate composes ONE matrix, so the squish
    // would re-derive the -50% offset off the scaled box and drift the dialog off
    // center mid-bloom). The centering rides `translate: -50% -50%` (its OWN channel);
    // the entrance squishes `scale: 0.95 → 1` as p slides 1 → 0 (independent channels,
    // no cross-talk). `transform: none` clears any utility-class matrix so the longhands
    // are the sole source.
    const scale = 1 - 0.05 * p;
    return {
        transform: "none",
        translate: "-50% -50%",
        scale: String(scale),
        opacity: String(1 - p),
        // `animation: none` overrides tw-animate-css's enter/exit keyframes; the
        // spring-driven inline longhands / opacity must be the sole source.
        animation: "none",
        transition: "none",
    };
});

// BC.W-DIALOG-GLASS / BI.W-GLASS-TOKEN-PRUNE — the dialog reads as ACTUAL iOS-27
// liquid glass: drop the modal plate from the floating tier (0.80 — "NOT glassy at
// all") to the SEE-THROUGH `--glass-bg-dialog` register (0.68). The α-band probe
// (BI.W-GLASS-TOKEN-PRUNE, the arbiter) DECIDED the rung is genuinely-distinct
// physics — Δ plate-α 0.12 vs floating, ΔL 0.06–0.10 over a busy/dark page (>> 2%)
// → KEEP the rung — and this reads it through ONE DOOR. The floating rung composes
// its plate from an internal `--glass-bg-rung` slot (glass/ladder.css: `.glass-
// floating { --glass-bg-rung: var(--glass-bg-floating) } → --glass-plate-tinted →
// background`), so the dialog scope re-points that slot onto the NAMED `--glass-bg-
// dialog` rung directly — NO `--glass-bg-floating: var(--glass-bg-dialog)` double-
// name re-declaration (the named-duplicate wart the prune kills; `--glass-bg-
// floating` keeps meaning `floating` on this scope). Byte-identical plate α to the
// retired re-declaration (both resolve `--glass-bg-rung` → the dialog bg). The
// floating tier's edge/rim/under-shadow LIFT survives (the private tier resolver
// below keeps the class). Rides the DEFAULT `glass` surface; `surface="opaque"`
// still reaches `--glass-level:0` (the dialog rung's own calc zeroes through
// unchanged). The `--glass-bg-dialog` token carries the BC.W-ADAPTIVE-RECONCILE
// oklab tint wrapper, so the bright-bucket darken reaches the modal for AA over a
// busy page.
const plateStyle: CSSProperties = {
    "--glass-bg-rung": "var(--glass-bg-dialog)",
} as CSSProperties;

const contentStyle = computed<CSSProperties>(() => ({
    ...plateStyle,
    // BI.W-DIALOG-PLACEMENT — the concentric-radius relay rides the folded side sheets only.
    ...(isCenter.value ? {} : radiusCtxStyle),
    // BH.W-MOTION-AXIS — the `--motion-weight: 0` off-write (undefined at full/reduced).
    ...((motionAxis.hostStyle.value as CSSProperties | undefined) ?? {}),
    ...(springStyle.value ?? {}),
}));
</script>

<template>
    <RekaDialogPortal>
        <ModalOverlay :data-stage-scrim="props.stage !== 'none' ? '' : undefined" />
        <RekaDialogContent
            v-bind="{ ...forwarded, ...$attrs }"
            :class="contentClass"
            :style="contentStyle"
            :data-surface="props.surface"
            data-slot="dialog-content"
            data-material="overlay"
            :data-placement="isCenter ? undefined : placement"
            :data-scroll="props.scroll ? '' : undefined"
            :data-reveal="isCenter ? 'overlay' : undefined"
            :data-motion="motionAxis.dataMotion.value"
            :data-spring="springActive ? (props.springPreset ?? 'smooth') : undefined"
        >
            <!-- BI.W-Q023 — a side sheet owns one noninteractive, mask-graded
           backdrop sample. The host's flat blur is disabled for this glass-only
           arm in placement.css, so this is not a nested second plate. -->
            <span
                v-if="!isCenter && props.surface === 'glass'"
                data-slot="dialog-graded-edge"
                aria-hidden="true"
            />
            <!-- Every side sheet owns one stable inner region: it packs its content at
           intrinsic height, and `scroll` only changes that region's overflow. The plate
           and sampler remain stationary siblings. Center dialogs retain direct slots. -->
            <div v-if="!isCenter" data-slot="dialog-content-region">
                <slot />
            </div>
            <slot v-else />

            <!-- BC.W-DIALOG-GLASS — the dismiss tracks the overlay golden padding ladder
           (DG4). At the floating tier's `right-4 top-4` (16px) the close jammed
           inside the 24px inline / ~30.5px block overlay pad; re-pointed onto the
           same `--overlay-pad-inline`/`--overlay-pad-block` tokens the content body
           reads so the X clears the heading and breathes with the pad. -->
            <RekaDialogClose
                v-if="props.showClose"
                class="focus-ring absolute right-(--overlay-pad-inline) top-(--overlay-pad-block) rounded-sm opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
                <X class="w-4 h-4" />
                <span class="sr-only">Close</span>
            </RekaDialogClose>
        </RekaDialogContent>
    </RekaDialogPortal>
</template>
