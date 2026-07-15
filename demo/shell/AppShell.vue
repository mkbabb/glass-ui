<script setup lang="ts">
import { computed, nextTick, onMounted, provide, ref, watch } from "vue";
import { useRoute } from "vue-router";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@glass/components/ui/dialog";
import { Aurora } from "@glass/components/custom/aurora";
import { GooFilter } from "@glass/components/custom/dock";
import {
    formatCombo,
    formatComboParts,
    registerShortcut,
    useRegisteredShortcuts,
} from "@glass/composables/keyboard";
import { useStoryNavigation } from "../chassis/useStoryNavigation";
import { SHELL_SCROLL_PROGRESS } from "./useShellScrollProgress";
import { warmFieldHue } from "../chassis/hero/warm-field";
import {
    shellAuroraConfig as buildShellAuroraConfig,
    shellAuroraConfigDark as buildShellAuroraConfigDark,
} from "../chassis/hero/aurora-hero";
import { useGlobalDark } from "@glass/composables/dark/useGlobalDark";
import { shellFieldActive } from "../router";
import { PresetEditor } from "../configurator";
import SidebarDock from "./SidebarDock.vue";
import BottomDock from "./BottomDock.vue";
import "./dock-nav.css";

const { next, prev, nextCategory, prevCategory } = useStoryNavigation();

const showHelp = ref(false);
const shortcuts = useRegisteredShortcuts();

// The demo/eggs family (Konami aurora + the command-palette egg + the 404
// constellation) is DELETED WHOLE — user order 2026-07-13, clean break.

// BI.W-DOCK-RETIRES — the in-situ V↔H orientation morph (the `useDockOrientationMorph`
// driver bound to the `<aside>` shell-dock box, the dock-anchored goo teardrop, the
// `glass-ui-demo:toggle-dock-morph` window event, and the `__shellDockMorph` capture
// seam) is DEFINITION-ABSENT (decided-terminal, clean break). The platform cannot
// continuously interpolate a flex-column→row topology change; the shell dock is a static
// vertical sidebar rail (the V↔H swap successor is `<DockCrossfade>` for a layer swap).

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
// `<ScrollProgressRim>` reading this fraction). ONE writer: a rAF-coalesced passive
// scroll listener on the route scroller + a route-settle recompute (the scroller
// persists across the keyed route swap, so the listener attaches once).
const shellScrollProgress = ref(0);
provide(SHELL_SCROLL_PROGRESS, shellScrollProgress);

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
// the bare keyed atomic swap makes redundant). AppShell imports no `startViewTransition`
// at all (BI.W-DOCK-RETIRES retired the in-situ V↔H dock morph — the shell dock is a
// static vertical sidebar rail).

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
         (`#glass-goo` carousel/deck · `#pager-goo` / `#pager-worm-goo` worm · `#morph-goo`
         generic) — the DRY union. A global `<defs>` referenced by id; mounting twice dups
         the ids, so it lives HERE once and every route's morph reaches it. -->
    <GooFilter />

    <!-- BG.W-FIELD-AURORA (C7) — `data-paper-field` on the CONTENT ANCESTOR of
         <main> (NOT the fixed Aurora sibling). The `cards.css` opaque-fallback
         suppressor is a DESCENDANT selector reading this attr, so it must sit above
         the cards. Set only while the shell field is active (a focal route's own
         field needs no suppression). -->
    <div
        class="relative flex h-screen overflow-hidden text-foreground"
        :data-paper-field="shellFieldActive ? '' : null"
    >
        <!-- Fixed vertical sidebar rail dock (off-canvas below the mobile breakpoint —
             see dock-nav.css; the BottomDock owns the off-canvas Sheet trigger).
             BI.W-DOCK-RETIRES — the in-situ V↔H orientation morph retired; the shell
             dock is a STATIC vertical sidebar rail (no morph driver, no goo teardrop). -->
        <aside class="demo-sidebar-rail">
            <SidebarDock />
        </aside>

        <div class="flex min-h-0 min-w-0 flex-1 flex-col">
            <!-- `<main>` owns route scroll. The extra bottom padding clears the
                 viewport-anchored BottomDock that floats over this region.
                 `tabindex="-1"` (BG.W-ROUTE-TRANSITION P4-F) lets the route-settle
                 watch move focus here, so the atomic keyed swap doesn't strand focus
                 at <body> + keyboard tab order resets to the new page. -->
            <main
                ref="mainEl"
                tabindex="-1"
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
                     `<ScrollProgressRim>` off the provided shell scroll fraction).
                     The `.scroll-progress` LIBRARY recipe stays (its consumer is the
                     /motion/scroll story, native register). -->
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


    <!-- BI.W-DOCK-RETIRES — the in-situ V↔H dock-morph stage is DEFINITION-ABSENT
         (decided-terminal). No modal, no goo teardrop, no `startViewTransition` on the
         morph path — the shell dock is a static vertical sidebar rail. -->

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

<!-- BI.W-DOCK-RETIRES — the in-situ V↔H dock-morph scoped CSS (the `[data-dock-morphing]`
     dissolve + the `[data-shell-dock-orientation="horizontal"]` fixed-floating reshape) is
     DEFINITION-ABSENT (the morph retired decided-terminal; the shell dock is a static
     vertical sidebar rail styled by dock-nav.css). -->
