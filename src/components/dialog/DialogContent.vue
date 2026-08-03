<script setup lang="ts">
import {
    type HTMLAttributes,
    computed,
    type CSSProperties,
    ref,
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
} from "../../composables/motion/spring/useSpringMount";
import ModalOverlay from "./ModalOverlay.vue";
// The former `spring` boolean folds into the shared `motion` axis (the preset
// carves off onto the distinct `springPreset` prop; motion gates the JS entrance).
import type { Backdrop, Motion, Placement, Surface } from "../_shared/axes";
import { useMotionAxis } from "../_shared/useMotionAxis";
// Dialog rides the SHARED {glass·veil·opaque} `surface` axis — the same grammar
// as Card (clean break, no alias, no Dialog-local `variant`).
// Attribute-driven veil/opaque decoration rides
// the placement != center slide path (the folded Sheet composes glass-floating in its
// slide base; the decoration layers the same shared seam).
import { resolveSurfaceClass } from "../_shared/resolveSurfaceClass";
import { useOptionalDialogStageContext } from "./dialogStageContext";
import { sheetSlideTransform, type SidePlacement } from "./sheet-motion";
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
    /**
     * The scrim backdrop axis. `scrim` (default) is byte-identical to today; `graded`
     * swaps the flat scrim for the box-following halo. Applies to a centred dialog
     * (the immersive stage opts in first); side sheets keep their own per-edge graded
     * edge and ignore it.
     */
    backdrop?: Backdrop;
}

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<DialogContentProps>(), {
    surface: "glass",
    placement: "center",
    showClose: true,
    scroll: false,
    stage: "none",
    backdrop: "scrim",
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
        backdrop: _bd,
        // `forceMount` is bound explicitly onto BOTH the Portal and the Content
        // (D4) so the spring's mount-hold survives reka's logical close — never
        // forwarded, or the passthrough would clobber the hold.
        forceMount: _fm,
        ...delegated
    } = props;
    return delegated;
});

// Center placement versus the side-slide placement.
const placement = computed<Placement>(() => props.placement ?? "center");
const isCenter = computed(() => placement.value === "center");

// The resolved motion state. The JS spring entrance arms iff a
// `springPreset` is named AND the resolved motion is not `off` (a preset-less dialog
// keeps the `.glass-reveal` CSS bloom).
const motionAxis = useMotionAxis(() => props.motion);
// The centered scale bloom arms iff a `springPreset` is named AND motion is not
// `off` (a preset-less centered dialog keeps the `.glass-reveal` CSS bloom).
const centerSpringActive = computed(
    () =>
        props.springPreset != null &&
        motionAxis.resolved.value !== "off" &&
        isCenter.value,
);
// Every side sheet rides the JS slide-spring — the interruptible reverse the CSS
// `slide-*` keyframe could not do (it snapped to fully-open then slid out). Armed on
// PLACEMENT ALONE (static per instance, no setup-flip): `off` is handled INSIDE the
// armed path (`sideSpringLive` false → render at rest, no translate, no mount-hold, so
// reka Presence unmounts instantly). The drag-dismiss gesture + detents stay Drawer's
// mechanism (the N3 disambiguation), never smuggled onto this paint axis.
const sideSpringActive = computed(() => !isCenter.value);
const sideSpringLive = computed(
    () => sideSpringActive.value && motionAxis.resolved.value !== "off",
);
const springActive = computed(
    () => centerSpringActive.value || sideSpringActive.value,
);

// The centered modal flips `--stage-t` 0→1 on open (the
// drawer drives it per-frame; a dialog has no detent, so it transitions the ONE scalar
// on `--spring-snappy`, scoped to the reader roots). The
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
// Flip `--stage-t` 0→1, scoped to the reader roots (the page wrapper
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
// no `shadow-xl` literal clobbers it.
// The overlay-band golden padding ladder. The overlay anchor is
// `--overlay-pad-inline` (--spacing(6) = 24px for the modal band); the block axis
// lifts by sqrt-phi (`*1.272`) so the heading clears the top edge against a 24px
// side. `gap-4` between header/body/footer sections STAYS (the overlay-band rhythm).
const baseClasses =
    "fixed left-1/2 top-1/2 z-modal grid w-full max-w-lg gap-4 [--overlay-pad-inline:--spacing(6)] [--overlay-pad-block:calc(var(--overlay-pad-inline)*1.272)] px-(--overlay-pad-inline) py-(--overlay-pad-block)";
// The default non-spring path composes the spring-clocked
// `.glass-reveal` LIQUID-ENTER recipe (off the retired `popover-animate` bezier
// zoom-95, clean break). The `-translate-x-1/2 -translate-y-1/2` centering stays
// (unlayered utilities; `.glass-reveal` never writes the BASE `translate` — only its
// `data-side` variants do, and a center Dialog has no `data-side`, so the centering
// is never clobbered). The recipe owns the clock, so `duration-normal` is dropped.
const defaultMotionClasses = "-translate-x-1/2 -translate-y-1/2 glass-reveal";

// Surface decoration rides the shared resolver on the
// `floating` tier. The resolver emits `glass-floating`; the veil/opaque attribute
// owns decoration and Dialog appends its own `rounded-dialog` radius. The opaque rung
// rides the SAME glass-floating tier (edge, rim, under-shadow preserved) + adds
// `.glass-opaque` (`--glass-level:0` through the ONE knob, NOT a parallel solid
// recipe); the `veil` rung overlays the borderless text-legibility plate — the
// `glass`/`opaque` output reached through the ONE axis, with the `veil` rung
// gained for free.
const variantClasses = computed(() =>
    cn(resolveSurfaceClass("floating"), "rounded-dialog"),
);

// Side-slide placement preserves the retired `sheetVariants`
// side arms, verbatim). Each `placement != center` value rounds its INNER corners on
// the dialog rung, borders the inner edge, and slides in via the shared `sheet-animate`
// CSS register (byte-identical frame-series to the retired Sheet — the slide is PAINT,
// not a distinct mechanism; N3: snap-detent physics stays Drawer's). The STRUCTURAL
// positioning (fixed/inset/size/z) ships PRECOMPILED off
// `[data-slot="dialog-content"][data-placement]` (src/styles/dialog-placement.css) — a
// load-bearing geometry utility dies in a consumer's Tailwind content-scan (the D7
// emission inverse), so it is an attribute-selector rule, never a CVA class.
// The side sheet keeps ONLY its decoration (inner rounding + inner-edge border). The
// slide is the JS spring's `translate` longhand now, so the `slide-in/out-*` keyframes
// are gone — an interrupted keyframe restarted from the resting-open origin and snapped
// the sheet to fully-open.
const PLACEMENT_SLIDE: Record<Exclude<Placement, "center">, string> = {
    top: "rounded-b-dialog border-b",
    bottom: "rounded-t-dialog border-t",
    left: "rounded-r-dialog border-r",
    right: "rounded-l-dialog border-l",
};
// The side base — the overlay padding ladder only. `sheet-animate` + `transition
// ease-in-out` are stripped: the JS spring owns the surface motion (a keyframe fade/slide
// exit from the resting-open origin IS the snap). `glass-floating` rides the private tier
// resolver below (no double-name).
const sideBaseClasses =
    "[--overlay-pad-inline:--spacing(6)] [--overlay-pad-block:calc(var(--overlay-pad-inline)*1.272)] px-(--overlay-pad-inline) py-(--overlay-pad-block)";

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
              centerSpringActive.value ? "" : defaultMotionClasses,
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

// The side sheet relays the concentric-radius context
// (for the gear-sheet Configurator's nested cards): it PUBLISHES its resolved corner
// (--radius-dialog) as --radius-ctx + its content pad (--overlay-pad-inline) as
// --radius-inset, so a nested card-class surface DERIVES its own corner concentric with
// the outer. Center dialogs need no relay (they are terminal, not a nesting host).
const radiusCtxStyle: CSSProperties = {
    "--radius-ctx": "var(--radius-dialog)",
    "--radius-inset": "var(--overlay-pad-inline)",
};

// The ONE spring mount, shared by both paths (KISS — one kernel, one exit). It arms
// for a centered `springPreset` bloom OR any side sheet (placement alone). Reuses the
// `dialogRoot` injected above (no re-inject). No `dragHandlers`/`onDismiss` — the
// drag-dismiss gesture stays Drawer's, and reka owns the open state.
const springMount = springActive.value
    ? useSpringMount({
          open: dialogRoot.open,
          preset: props.springPreset ?? "smooth",
      })
    : null;

const springStyle = computed<CSSProperties | undefined>(() => {
    if (!springMount) return undefined;
    const p = springMount.position.value; // 0 = mounted, 1 = dismissed
    // The side sheet slides via the `translate` LONGHAND (the center-branch discipline):
    // an unclamped position drives a placement-keyed off-edge offset, and `p<0` overshoot
    // IS the liquid settle. `transform/animation/transition: none` make the inline
    // longhand the sole source (no keyframe, no utility matrix).
    if (sideSpringLive.value) {
        return {
            translate: sheetSlideTransform(placement.value as SidePlacement, p),
            transform: "none",
            animation: "none",
            transition: "none",
        };
    }
    if (!centerSpringActive.value) return undefined;
    // Centered-dialog squish via `scale:`/`translate:`
    // LONGHANDS, never `transform: translate() scale()` (the centered-squish trap: a
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

// Mount-hold — the spring, not a keyframe, owns unmount timing. A live spring (side
// slide OR centered bloom) keeps the content mounted while `present` (exiting) OR
// logically open; every other path (an `off` side sheet, a preset-less centered
// dialog) falls through to the plain `forceMount` passthrough so reka Presence unmounts
// on its own. Bound onto BOTH the Portal and the Content (D4).
const contentForceMount = computed(() =>
    springMount && (sideSpringLive.value || centerSpringActive.value)
        ? springMount.present.value || dialogRoot.open.value
        : props.forceMount,
);
// A closing springed surface is inert (non-interactive, untabbable, out of the a11y
// tree) while it animates out — a side sheet sliding out OR a center-spring dialog whose
// exit stays mounted (R2), so the brief mounted-but-closing window is never tabbable.
const closingInert = computed(() =>
    (sideSpringLive.value || centerSpringActive.value) && !dialogRoot.open.value
        ? ""
        : undefined,
);
// The scrim reads the SAME live scalar as the surface (position → opacity) so the
// two never desync through an interrupt; `null` on every non-slide path leaves the
// center scrim on its `sheet-animate` fade.
const scrimSlideT = computed(() =>
    springMount && sideSpringLive.value ? springMount.position.value : null,
);
const scrimForceMount = computed(() =>
    springMount && sideSpringLive.value
        ? springMount.present.value || dialogRoot.open.value
        : undefined,
);

// Focus handoff — a closing springed surface keeps a mounted-but-inert Presence
// beyond reka's logical close on BOTH paths: a side sheet sliding out AND a centered
// spring dialog whose exit stays mounted (`closingInert` covers both, so both strand
// focus on `<body>` for the exit window). Move focus to the trigger at the LOGICAL
// close if it would otherwise strand inside the animating-out content (mirror
// DrawerContent; the inert-bounces-to-body → sync-watch-pulls-to-trigger order). The
// anchor is UN-GATED — rendered on both paths — so the center path can resolve the
// same live content root the side path does (a side-only anchor left the widened
// guard unable to test containment for a centered dialog).
const contentAnchorEl = ref<HTMLElement | null>(null);
const resolveContentEl = (): HTMLElement | null =>
    (contentAnchorEl.value?.closest(
        '[data-slot="dialog-content"]',
    ) as HTMLElement | null) ?? null;
watch(
    () => dialogRoot.open.value,
    (open) => {
        if (!(sideSpringLive.value || centerSpringActive.value) || open !== false)
            return;
        const active = document.activeElement;
        if (active && resolveContentEl()?.contains(active))
            dialogRoot.triggerElement.value?.focus({ preventScroll: true });
    },
    { flush: "sync" },
);

// The dialog uses the dedicated see-through glass rung:
// liquid glass: drop the modal plate from the floating tier (0.80 — "NOT glassy at
// all") to the SEE-THROUGH `--glass-bg-dialog` register (0.68). The α-band probe
// the alpha band is distinct
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
// unchanged). `--glass-bg-dialog` is now a plain opacity footprint — the adaptive
// bright-bucket darken reaches the modal through the ladder's element-level tint,
// not through a root-baked oklab wrapper on this token.
const plateStyle: CSSProperties = {
    "--glass-bg-rung": "var(--glass-bg-dialog)",
} as CSSProperties;

const contentStyle = computed<CSSProperties>(() => ({
    ...plateStyle,
    // The concentric-radius relay rides side sheets only.
    ...(isCenter.value ? {} : radiusCtxStyle),
    // The `--motion-weight: 0` off-write is undefined at full or reduced motion.
    ...((motionAxis.hostStyle.value as CSSProperties | undefined) ?? {}),
    ...(springStyle.value ?? {}),
}));
</script>

<template>
    <RekaDialogPortal :force-mount="contentForceMount">
        <ModalOverlay
            :data-stage-scrim="props.stage !== 'none' ? '' : undefined"
            :backdrop="isCenter ? props.backdrop : undefined"
            :slide-t="scrimSlideT"
            :force-mount="scrimForceMount"
        />
        <RekaDialogContent
            v-bind="{ ...forwarded, ...$attrs, inert: closingInert }"
            :force-mount="contentForceMount"
            :class="contentClass"
            :style="contentStyle"
            :data-surface="props.surface"
            data-slot="dialog-content"
            data-material="overlay"
            :data-placement="isCenter ? undefined : placement"
            :data-scroll="props.scroll ? '' : undefined"
            :data-reveal="isCenter ? 'overlay' : undefined"
            :data-motion="motionAxis.dataMotion.value"
            :data-spring="centerSpringActive ? (props.springPreset ?? 'smooth') : undefined"
        >
            <!-- Hidden anchor (BOTH paths) — the focus-handoff watch resolves the
           live content root via `closest`, never a Presence-transient `$el` (the
           DrawerContent discipline). -->
            <span ref="contentAnchorEl" hidden />
            <!-- A side sheet owns one noninteractive, mask-graded
           backdrop sample (the per-edge FORM 1 of the shared `glass-graded-halo`
           slot). The host's flat blur is disabled for this glass-only arm in
           placement.css, so this is not a nested second plate. -->
            <span
                v-if="!isCenter && props.surface === 'glass'"
                data-slot="glass-graded-halo"
                aria-hidden="true"
            />
            <!-- Every side sheet owns one stable inner region: it packs its content at
           intrinsic height, and `scroll` only changes that region's overflow. The plate
           and sampler remain stationary siblings. Center dialogs retain direct slots. -->
            <div v-if="!isCenter" data-slot="dialog-content-region">
                <slot />
            </div>
            <slot v-else />

            <!-- The dismiss tracks the overlay golden padding ladder
           (DG4). At the floating tier's `right-4 top-4` (16px) the close jammed
           inside the 24px inline / ~30.5px block overlay pad; re-pointed onto the
           same `--overlay-pad-inline`/`--overlay-pad-block` tokens the content body
           reads so the X clears the heading and breathes with the pad. -->
            <RekaDialogClose
                v-if="props.showClose"
                class="focus-ring absolute right-(--overlay-pad-inline) top-(--overlay-pad-block) rounded-sm opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
            >
                <X class="w-4 h-4" aria-hidden="true" />
                <span class="sr-only">Close</span>
            </RekaDialogClose>
        </RekaDialogContent>
    </RekaDialogPortal>
</template>
