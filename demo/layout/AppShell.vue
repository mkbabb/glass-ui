<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, provide, ref, useTemplateRef, watch } from "vue";
import { useRoute } from "vue-router";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@glass/components/ui/dialog";
import { Aurora } from "@glass/components/custom/aurora";
import {
    GooFilter,
    useDockOrientationMorph,
} from "@glass/components/custom/dock";
import {
    formatCombo,
    formatComboParts,
    registerShortcut,
    useRegisteredShortcuts,
} from "@glass/composables/keyboard";
import { useStoryNavigation } from "../composables/useStoryNavigation";
import {
    SHELL_DOCK_ORIENTATION,
    SHELL_SCROLL_PROGRESS,
} from "../shell/useShellScrollProgress";
import { warmFieldHue } from "../stories/warm-field";
import {
    shellAuroraConfig as buildShellAuroraConfig,
    shellAuroraConfigDark as buildShellAuroraConfigDark,
} from "../stories/aurora-hero";
import { useGlobalDark } from "@glass/composables/dark/useGlobalDark";
import { shellFieldActive } from "../router";
import { PresetEditor } from "../configurator";
import SidebarDock from "./SidebarDock.vue";
import BottomDock from "./BottomDock.vue";
import CommandPalette from "../eggs/CommandPalette.vue";
import KonamiAurora from "../eggs/KonamiAurora.vue";
import { useKonami } from "../eggs/useKonami";
import "./dock-nav.css";

const { next, prev, nextCategory, prevCategory } = useStoryNavigation();

const showHelp = ref(false);
const shortcuts = useRegisteredShortcuts();

// ── Easter eggs (each PRM-fenced; each a composition of shipped machinery) ──
// E3 — the ⌘K command palette (first-class fuzzy story nav, the shipped Command).
const showPalette = ref(false);
// E2 — the konami full-bleed aurora reveal.
const showKonami = ref(false);
useKonami(() => {
    showKonami.value = true;
});

// ── BG.W-DOCK-INPLACE-MORPH — the in-dock button flips the REAL nav dock V↔H IN
// PLACE via the liquid teardrop (D13, THE HEADLINE). The modal stage + the synthetic
// two-dock View-Transitions crossfade are DELETED (no `role="dialog"`, esc moot). The
// in-dock `ArrowLeftRight` control (SidebarDock/BottomDock, dispatching the ONE
// `glass-ui-demo:toggle-dock-morph` window event) drives the SAME `useDockOrientationMorph`
// driver bound to the REAL `<aside>` shell-dock box (the shell is its binary consumer
// #2). The vertical left-column dock reshapes into a fixed-floating TOP-LEADING
// horizontal bar (the corner the two orientations SHARE, so the goo occludes minimal
// travel — F-ARM-3), the topology flip hidden under the dock-anchored goo teardrop
// (`#dock-morph-goo`, F-ARM-2). ONE scalar, ONE spring (the DOCK_SPRING clock the
// driver owns), both directions, interruptible, PRM-snap. NO second engine, NO parallel
// clock (the driver's raw-spring→useDockSpring drain is booked to its own wave).
const asideEl = useTemplateRef<HTMLElement>("asideEl");

// The dock footprints (px) — the morph spans the liquid teardrop reshapes across.
const V_FULL_H = 296;
const H_FULL_W = 332;

const morph = useDockOrientationMorph({
    rootEl: asideEl,
    verticalSize: V_FULL_H,
    horizontalSize: H_FULL_W,
});

// The SETTLED orientation — committed at the spring SETTLE, NOT the live 0.5 crossing
// (F-ARM-3.4): the `<main>` gutter reflow + the aside's fixed-floating position toggle
// once per full cycle, so a rapid mid-flight V→H→V wiggle nets ZERO reflow. During the
// flight the real dock dissolves under the goo (the Dynamic-Island merge-then-reshape),
// re-materializing in the settled orientation as the neck fades. It is a STATIC reserve
// toggle (a data-attr), never an animated height (`proof:no-layout-animation` holds).
const settledOrientation = ref<"vertical" | "horizontal">("vertical");
watch(
    () => morph.morphing.value,
    (isMorphing) => {
        if (!isMorphing) settledOrientation.value = morph.boundOrientation.value;
    },
);

// The dock-anchored goo teardrop references the canonical `#dock-morph-goo` mount
// (`GooFilter`, blur 16 / slope 14 / offset −7, mounted ONCE at the shell root — F6).
// Gated to the occluded MIDPOINT window: a pure `f(--dock-morph-t)`, no clock (M5).
const morphGooFilter = computed(() =>
    morph.t.value > 0.18 && morph.t.value < 0.82 ? "url(#dock-morph-goo)" : "none",
);

// The in-dock control fires the ONE window event → the REAL dock flips in place.
function onToggleShellMorph(): void {
    morph.toggle();
}

// DETERMINISTIC CAPTURE SEAM — the π/Playwright arm pins EXACT t values (the
// frame-series) + drives toggle/morphTo (both directions) on the REAL shell dock. The
// scalar is the ONE source; pinning yields a frame-reproducible silhouette (no
// wall-clock). Re-pointed off the deleted modal (open/close/setPreview are no-ops —
// there is no stage to open; the flip is in place).
onMounted(() => {
    (
        window as unknown as {
            __shellDockMorph?: {
                open: () => void;
                close: () => void;
                setPreview: (on: boolean) => void;
                setMorphT: (t: number) => void;
                toggle: () => void;
                morphTo: (o: "vertical" | "horizontal") => void;
            };
        }
    ).__shellDockMorph = {
        open: () => {},
        close: () => {},
        setPreview: () => {},
        setMorphT: (value) => {
            void nextTick(() => morph.pin(value));
            settledOrientation.value = value >= 0.5 ? "horizontal" : "vertical";
        },
        toggle: () => {
            void nextTick(() => morph.toggle());
        },
        morphTo: (o) => {
            void nextTick(() => morph.morphTo(o));
        },
    };
    window.addEventListener("glass-ui-demo:toggle-dock-morph", onToggleShellMorph);
});

// `<main>` owns route scroll now (the shell itself is a fixed viewport frame),
// so the router's window-targeted scrollBehavior can't reset it. Reset the
// container to the top on every navigation so a new route never inherits the
// prior offset. BG.W-ROUTE-TRANSITION — the ONE scroll-reset owner (the router's
// redundant window scrollBehavior is deleted); keyed off `route.path` (a query/hash
// change is not a page swap and must not re-scroll). Under the bare keyed
// `<component>` swap there is no <Transition> leave window to race.
const route = useRoute();
const mainEl = ref<HTMLElement | null>(null);

// ── BG.W-DOCK-SCROLL-PROGRESS — the scroll fraction the dock ring wears ──────
// The standalone `.demo-scroll-progress` bar is RETIRED (clean break); the page
// scroll position is now a BORDER ITEM on the leftside dock (SidebarDock mounts
// `<BorderProgress>` reading this fraction). ONE writer: a rAF-coalesced passive
// scroll listener on the route scroller + a route-settle recompute (the scroller
// persists across the keyed route swap, so the listener attaches once).
const shellScrollProgress = ref(0);
provide(SHELL_SCROLL_PROGRESS, shellScrollProgress);
provide(SHELL_DOCK_ORIENTATION, settledOrientation);

let scrollRafId = 0;
function computeShellScrollProgress(): void {
    const el = mainEl.value;
    if (!el) return;
    const span = el.scrollHeight - el.clientHeight;
    shellScrollProgress.value =
        span > 0 ? Math.min(1, Math.max(0, el.scrollTop / span)) : 0;
}
function onShellScroll(): void {
    if (scrollRafId) return;
    scrollRafId = requestAnimationFrame(() => {
        scrollRafId = 0;
        computeShellScrollProgress();
    });
}
watch(
    mainEl,
    (el, _prev, onCleanup) => {
        if (!el) return;
        el.addEventListener("scroll", onShellScroll, { passive: true });
        window.addEventListener("resize", onShellScroll, { passive: true });
        computeShellScrollProgress();
        onCleanup(() => {
            el.removeEventListener("scroll", onShellScroll);
            window.removeEventListener("resize", onShellScroll);
            if (scrollRafId) cancelAnimationFrame(scrollRafId);
            scrollRafId = 0;
        });
    },
    { immediate: true },
);

// BG.W-ROUTE-TRANSITION (P4-F) — the SR route-change announce. The atomic keyed swap
// has no skeleton `aria-busy`, so the live region is the only route-change signal AT
// receives; it also strands focus at <body>, so on settle we move focus into <main
// tabindex="-1"> (the new page's top).
const routeAnnounce = ref("");

watch(
    () => route.path,
    () => {
        mainEl.value?.scrollTo({ top: 0 });
        routeAnnounce.value = String(route.meta?.title ?? "");
        void nextTick(() => {
            mainEl.value?.focus({ preventScroll: true });
            // BG.W-DOCK-SCROLL-PROGRESS — the new page's scroll span settles
            // post-swap; recompute so the dock ring reads 0 at the new top.
            computeShellScrollProgress();
        });
    },
);

// BG.W-ROUTE-TRANSITION — the categoryId no-op `startViewTransition` watch + its dead
// `document.documentElement.dataset.categorySwitch` write are DELETED (the dataset flag
// had ZERO readers, and the VT body was an intentional no-op — a confounding mechanism
// the bare keyed atomic swap makes redundant). BG.W-DOCK-INPLACE-MORPH then deleted the
// LAST `startViewTransition` in this shell (the dock-morph crossfade) — the V↔H flip is
// now the in-place liquid teardrop, so AppShell imports no `startViewTransition` at all.

// BG.W-FIELD-AURORA (M2) — the per-route WARM FIELD hue feeds the ONE shell
// `<Aurora>` (the retired `.paper-field` CSS plane's successor). `warmFieldHue`
// derives the number from the route's category via the ONE documented `categoryHue`
// source (NO third color registry), warm-projected into [25,95] (cool is
// unrepresentable). `shellAuroraConfig` is a recessive vividness:0 aurora on that
// hue; it re-uploads on the persisted shell node per non-focal nav (no re-mount).
const fieldHue = computed(() =>
    warmFieldHue(String(route.meta?.categoryId ?? "foundations")),
);

// BG.W-FIELD-AURORA (re-paint #1) — the shell field is DARK-MODE-AWARE. The light
// palette over the near-black W-DARK-MATERIAL page composited to a mid-light
// warm-brown wash that dropped hero/body text below AA in both engines; in dark mode
// the field swaps to the LOW-L warm-EMBER `shellAuroraConfigDark` (the luminous-dark
// model) so it composites DARK (composite L ≈ 0.12–0.16 at the kept opacityCeiling
// 0.5) and the light hero h1 / muted body clear AA, while still reading WARM-ember.
// The persisted shell node re-uploads on the dark flip (no re-mount).
const { isDark } = useGlobalDark();
const shellAuroraConfig = computed(() =>
    isDark.value
        ? buildShellAuroraConfigDark(fieldHue.value)
        : buildShellAuroraConfig(fieldHue.value),
);

// The shell field is a recessive enhancement, NEVER a legibility dependency — a GL
// init failure leaves the placeholder/cream floor, logged but non-fatal (the M0
// onInitError contract threaded onto every Aurora mount).
function onShellAuroraError(err: Error): void {
    console.error("[demo] shell aurora init failed", err);
}

// BG.W-ROUTE-TRANSITION — the BD.W-SHELL-ROUTE-BLOOM skeleton + bloom-find-child watch
// are DELETED. vue-router awaits each lazy `component: () => import()` DURING navigation,
// so the OLD page stays mounted until the new one resolves — there is no in-shell
// matched-but-pending void to fill, the skeleton branch was dead. Under the bare keyed
// `<component>` atomic swap there is also no leaving-skeleton rect to bloom THROUGH (no
// leave window). The `useBloomUp` LEAF stays published (AppleMusic consumer); only the
// AppShell route-bloom USAGE dies.

onMounted(() => {
    registerShortcut("]", () => next(), {
        label: "Next story",
        group: "Navigation",
    });
    registerShortcut("[", () => prev(), {
        label: "Previous story",
        group: "Navigation",
    });
    registerShortcut("}", () => nextCategory(), {
        label: "Next category",
        group: "Navigation",
    });
    registerShortcut("{", () => prevCategory(), {
        label: "Previous category",
        group: "Navigation",
    });
    registerShortcut(
        ",",
        () =>
            window.dispatchEvent(
                new CustomEvent("glass-ui-demo:toggle-configurator"),
            ),
        { label: "Toggle configurator", group: "UI" },
    );
    registerShortcut("?", () => (showHelp.value = !showHelp.value), {
        label: "Toggle keyboard help",
        group: "UI",
    });
    // E3 — ⌘K / Ctrl+K opens the command palette (fuzzy story navigation).
    registerShortcut(
        "mod+k",
        () => (showPalette.value = !showPalette.value),
        {
            label: "Command palette",
            group: "Navigation",
            allowInInput: true,
            preventDefault: true,
        },
    );
});

onBeforeUnmount(() => {
    window.removeEventListener("glass-ui-demo:toggle-dock-morph", onToggleShellMorph);
});
</script>

<template>
    <!-- BG.W-FIELD-AURORA (M2) — the ONE shell field: a recessive `<Aurora>` that
         paints behind every NON-focal route (replacing the retired `.paper-field`
         CSS plane). Mounted IFF `shellFieldActive` (false on a focal route whose own
         GL field is the only context — the never-2-contexts law). The per-route hue
         re-uploads on the persisted node; `opacity-ceiling` recedes it behind the
         page glass. The grain rides ON TOP at its multiply/screen opacity — one
         backdrop, two stacked planes (the field below, the grain over). -->
    <Aurora
        v-if="shellFieldActive"
        :config="shellAuroraConfig"
        :opacity-ceiling="0.5"
        :on-init-error="onShellAuroraError"
        class="shell-aurora fixed inset-0 -z-10"
        data-glass-field-canvas
        aria-hidden="true"
    />
    <!-- BG.W-PAPER-GRAIN-OPTIN — the universal 0.22 grain mount is RETIRED. The shell
         field is the recessive <Aurora> above; grain is now a PER-SURFACE opt-in (a
         surface that wants tactile paper composes `paper-grain-overlay` or mounts its
         own <PaperBackdrop>). No universal grain plane rides over the whole page. -->

    <!-- BD.W-MORPH-FIELD-WELD (M1) — the ONE library goo `<filter>` mount, ONCE at the
         shell root. It exposes EVERY library metaball id off one byte-identical sRGB graph
         (`#glass-goo` carousel/deck · `#pager-goo` worm · `#dock-fission-goo` fission ·
         `#dock-morph-goo` V↔H teardrop · `#morph-goo` generic) — the DRY union of the
         prior four byte-near-identical mounts. A global `<defs>` referenced by id; mounting
         twice dups the ids, so it lives HERE once and every route's morph reaches it. -->
    <GooFilter />

    <!-- BG.W-FIELD-AURORA (C7) — `data-paper-field` on the CONTENT ANCESTOR of
         <main> (NOT the fixed Aurora sibling). The `cards.css` opaque-fallback
         suppressor + the `liquid-morph.css` ambient-tint seam are DESCENDANT
         selectors reading this attr, so it must sit above the cards. Set only while
         the shell field is active (a focal route's own field needs no suppression). -->
    <div
        class="relative flex h-screen overflow-hidden text-foreground"
        :data-paper-field="shellFieldActive ? '' : null"
    >
        <!-- Fixed vertical sidebar rail dock (off-canvas below the mobile
             breakpoint — see dock-nav.css; the BottomDock owns the off-canvas
             Sheet trigger).
             BG.W-DOCK-INPLACE-MORPH — this `<aside>` IS the REAL shell-dock box the
             `useDockOrientationMorph` driver reshapes in place. `--dock-morph-t`/
             `--stretch` are written onto it; `[data-shell-dock-orientation]` (settled)
             flips the vertical column ↔ the fixed-floating TOP-LEADING horizontal bar;
             `[data-dock-morphing]` dissolves the real dock under the goo teardrop
             during the flight (the merge-then-reshape). -->
        <aside
            ref="asideEl"
            class="demo-sidebar-rail"
            :data-shell-dock-orientation="settledOrientation"
            :data-dock-morphing="morph.morphing.value ? '' : undefined"
            :style="{
                '--dock-bridge-v-h': `${V_FULL_H}px`,
                '--dock-bridge-h-w': `${H_FULL_W}px`,
            }"
        >
            <SidebarDock />
            <!-- The dock-anchored liquid teardrop that occludes the V↔H topology flip.
                 It overlays the REAL dock box (top-leading-anchored via the `--inplace`
                 modifier), references the canonical `#dock-morph-goo` mount, and paints
                 ONLY in the occluded midpoint window (`--dock-bridge-opacity`, gated by
                 the driver's `bridgeStyle`). No modal, no synthetic dock, no VT. -->
            <div
                v-if="morph.morphing.value"
                class="dock-morph-bridge dock-morph-bridge--inplace"
                :style="{ '--stretch': String(morph.stretch.value), ...morph.bridgeStyle.value }"
                aria-hidden="true"
                data-testid="shell-dock-morph-bridge"
            >
                <div
                    class="dock-morph-bridge-goo"
                    :style="{ '--dock-bridge-goo-filter': morphGooFilter }"
                >
                    <div class="dock-morph-bridge-plate dock-morph-bridge-plate--vertical" />
                    <div class="dock-morph-bridge-plate dock-morph-bridge-plate--horizontal" />
                </div>
            </div>
        </aside>

        <div class="flex min-h-0 min-w-0 flex-1 flex-col">
            <!-- `<main>` owns route scroll. The extra bottom padding clears the
                 viewport-anchored BottomDock that floats over this region.
                 `tabindex="-1"` (BG.W-ROUTE-TRANSITION P4-F) lets the route-settle
                 watch move focus here, so the atomic keyed swap doesn't strand focus
                 at <body> + keyboard tab order resets to the new page. -->
            <!-- BG.W-DOCK-INPLACE-MORPH — when the shell dock settles HORIZONTAL it
                 becomes a fixed-floating TOP-LEADING bar (out of flow); `<main>` reclaims
                 the column automatically (flex) and reserves a top gutter for the floating
                 bar via `[data-shell-dock-orientation]` (a STATIC reserve committed at
                 settle, the `pt` mirror of the existing bottom-dock reserve). -->
            <main
                ref="mainEl"
                tabindex="-1"
                :data-shell-dock-orientation="settledOrientation"
                class="demo-main-scroller smooth-scroll relative flex-1 min-h-0 min-w-0 overflow-y-auto px-4 pt-6 pb-28 md:px-8 md:pt-10 md:pb-32"
            >
                <!-- BG.W-ROUTE-TRANSITION (P4-F) — the SR route-change announce. The
                     atomic keyed swap has no skeleton `aria-busy`, so this polite live
                     region is the only route-change signal AT receives; the route-settle
                     watch writes the new page title. -->
                <p class="sr-only" aria-live="polite" role="status">
                    {{ routeAnnounce }}
                </p>
                <!-- BG.W-DOCK-SCROLL-PROGRESS — the standalone scroll-progress bar is
                     RETIRED (clean break, no alias): the page-scroll position is now a
                     BORDER ITEM on the leftside dock (SidebarDock wears the
                     `<BorderProgress>` ring off the provided shell scroll fraction).
                     The `.scroll-progress` LIBRARY recipe stays (its consumer is the
                     /motion/scroll-vt story). -->
                <!-- BG.W-ROUTE-TRANSITION (M1) — the route swap is a BARE KEYED ATOMIC
                     SWAP: NO Vue <Transition>, NO Suspense, NO v-if/skeleton/no-match
                     branch chain. A keyed `<component>` unmounts the old + mounts the new
                     in ONE patch — `<main>` carries exactly the new page at every settle
                     (the SR announce + this component; the standalone scroll-progress
                     bar retired at BG.W-DOCK-SCROLL-PROGRESS — the dock ring wears the
                     scroll position), exactly one route root, h1 === dest, with NO leave hook to
                     wedge (the `.scroll-build`×<Transition>-leave collision that froze the
                     route is structurally impossible). The liquid enter is the on-mount
                     `.route-enter` @keyframes (transitions.css) — it lands on the keyed
                     component so it reaches EVERY route root. Plain-lazy: vue-router holds
                     the OLD page mounted through the async chunk resolve, so the swap lands
                     on the resolved component, never a void (no skeleton needed). Keyed on
                     `route.path` (a query/hash change is not a page swap). -->
                <RouterView v-slot="{ Component }">
                    <component :is="Component" :key="route.path" class="route-enter" />
                </RouterView>
            </main>
        </div>

        <!-- Viewport-anchored bottom-bar story dock (floats over <main>'s
             bottom inset; not in document flow). -->
        <BottomDock />
    </div>

    <!-- Easter eggs (each PRM-fenced; each composes shipped machinery). The ℱ-wordmark
         Fourier-redraw overlay was RETIRED at BG.W-DOCK-PERSISTENT-CUT with its wordmark
         trigger — the persistent brand egg is gone from both docks. -->
    <CommandPalette v-model:open="showPalette" />
    <KonamiAurora v-if="showKonami" @done="showKonami = false" />

    <!-- BG.W-DOCK-INPLACE-MORPH — the modal stage + the synthetic two-dock
         View-Transitions crossfade are DELETED (D13). The V↔H flip is now the REAL
         `<aside>` shell dock reshaping IN PLACE via the liquid teardrop (see the `<aside
         ref="asideEl">` above + `useDockOrientationMorph`). No `role="dialog"`, esc moot,
         no `startViewTransition` on the morph path. -->

    <!-- The glass-ui demo Configurator — a right-side Sheet, opened by the
         SidebarDock gear control or the `,` shortcut (AZ.W-SHELL-CONFIG: the
         floating FAB is gone; the open is rehomed onto the dock gear + the
         keyboard/event path). It mounts at the shell root so the Sheet portals
         correctly regardless of the active route. -->
    <PresetEditor />

    <!-- Keyboard shortcut help dialog -->
    <Dialog v-model:open="showHelp">
        <DialogContent class="max-w-md">
            <DialogHeader>
                <DialogTitle>Keyboard shortcuts</DialogTitle>
                <DialogDescription>
                    Move around the storybook without the mouse.
                </DialogDescription>
            </DialogHeader>
            <dl class="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                <template v-for="shortcut in shortcuts" :key="shortcut.raw">
                    <dt class="flex gap-1">
                        <kbd
                            v-for="part in formatComboParts(shortcut.raw)"
                            :key="part"
                            :aria-label="formatCombo(shortcut.raw)"
                            class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs"
                        >
                            {{ part }}
                        </kbd>
                    </dt>
                    <dd>{{ shortcut.options.label }}</dd>
                </template>
            </dl>
        </DialogContent>
    </Dialog>
</template>

<style scoped>
/* BG.W-DOCK-INPLACE-MORPH — the REAL shell dock flips V↔H IN PLACE (F-ARM-3). The
   `<aside class="demo-sidebar-rail">` is styled by dock-nav.css as the in-flow vertical
   left column; these rules add the HORIZONTAL settled state + the flight treatment. All
   are static reserves / compositor properties (no animated height — the goo teardrop IS
   the liquid transition; `proof:no-layout-animation` holds). The aside is in THIS
   component's template, so the scoped hash lands on it; `:deep()` reaches the child
   SidebarDock's own dock box. */

/* The morphing aside lifts above <main> so the dock-anchored teardrop can grow rightward
   from the shared top-leading corner into the reclaimed column without being clipped. */
.demo-sidebar-rail[data-dock-morphing] {
    position: relative;
    z-index: 45;
    overflow: visible;
}

/* During the flight the real dock dissolves under the goo (the Dynamic-Island
   merge-then-reshape); the goo bridge (a direct child of the aside, NOT inside the dock
   box) stays painted and carries the visible V→H reshape. */
.demo-sidebar-rail[data-dock-morphing] :deep(.demo-sidebar-dock) {
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--spring-smooth-duration, 0.36s) var(--ease-out, ease);
}

/* HORIZONTAL settled state (committed at settle) — the fixed-floating TOP-LEADING bar,
   the mirror of the bottom-center story dock. The vertical left column and this top bar
   SHARE the top-leading corner, so the corner-pinned reshape's travel is minimal. */
.demo-sidebar-rail[data-shell-dock-orientation="horizontal"] {
    position: fixed;
    inset-block-start: var(--demo-nav-top-inset, 1rem);
    inset-inline-start: var(--demo-nav-rail-inset, 1rem);
    inset-inline-end: auto;
    z-index: 40;
}

/* The internal dock flows as a ROW when settled horizontal (the occluded topology flip);
   DockSection is display:contents, so forcing the flex axis lays the icons horizontally. */
.demo-sidebar-rail[data-shell-dock-orientation="horizontal"] :deep(.demo-sidebar-dock) {
    flex-direction: row;
    align-items: center;
}

/* <main> reserves a top gutter for the floating top bar when the dock settled horizontal
   (a static reserve, the pt mirror of the pb-28 bottom-dock reserve; the column reclaim is
   automatic via flex the moment the aside goes fixed). */
.demo-main-scroller[data-shell-dock-orientation="horizontal"] {
    padding-block-start: calc(var(--demo-nav-top-inset, 1rem) + 3.5rem);
}
</style>
