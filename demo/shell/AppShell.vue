<script setup lang="ts">
import {
    computed,
    defineAsyncComponent,
    h,
    nextTick,
    onMounted,
    ref,
    watch,
} from "vue";
import { useRoute } from "vue-router";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@glass/components/dialog";
import {
    formatCombo,
    formatComboParts,
    registerShortcut,
    useRegisteredShortcuts,
} from "@glass/composables/keyboard";
import { useStoryNavigation } from "../chassis/useStoryNavigation";
import { warmFieldHue } from "../chassis/hero/warm-field";
import {
    shellAuroraConfig as buildShellAuroraConfig,
    shellAuroraConfigDark as buildShellAuroraConfigDark,
} from "../chassis/hero/aurora-hero";
import { useGlobalDark } from "@glass/composables/dark/useGlobalDark";
// The palette-derived ground is the shell field's FRAME-0 surface and, on the
// `renderMode:"auto"` -> "css" substrate (low-power / reduced-motion / save-data), its
// PERMANENT one. It must not ride the async chunk: an empty `-z-10` plane until that
// chunk resolves is a first-paint regression, not a diet. Its deps
// (`composables/color`, the type-only `aurora/constants/presets`) are already eager.
import { auroraFallbackGround } from "@glass/components/aurora/composables/auroraFallbackGround";
import { shellFieldActive } from "../router";
// The docks stay EAGER: they are the always-visible nav chrome, and their bytes are
// small next to the two deferred surfaces below (deferring them trades KB for a
// flash of missing navigation on the first frame).
import SidebarDock from "./SidebarDock.vue";
import BottomDock from "./BottomDock.vue";
import "./dock-nav.css";

// The two async boundaries that keep the eager boot graph to what first paint needs.
//
// The configurator is a right-side Sheet opened ONLY by the dock gear or the `,`
// shortcut, so it is never visible at first paint; its reka
// dropdown/select/tooltip/floating stack has no business in the boot graph.
const PresetEditor = defineAsyncComponent(
    () => import("./configurator/PresetEditor.vue"),
);

// The shell field already defers ARMING its GL path past first paint
// (`useAurora` scheduleAfterFirstPaint), but the chunk carrying the runtime and both
// shader sets was still eager. The direct component path is imported rather than the
// aurora barrel so the async chunk carries the component, not the whole export surface.
//
// The boundary ships an EAGER wash, and that wash is the PRIMARY first paint — not a
// fallback hiding a dead Aurora. It renders the SAME `auroraFallbackGround` surface
// `Aurora.vue` itself renders, from the already-eager `shellAuroraConfig`, under the same
// `opacityCeiling` envelope, so the resolved component replaces it with the identical
// ground and the cross-fade is a same-palette dissolve. `delay: 0` because the default
// 200ms would leave the field blank for exactly the window this wave exists to fill.
const Aurora = defineAsyncComponent({
    loader: () => import("@glass/components/aurora/Aurora.vue"),
    delay: 0,
    loadingComponent: {
        setup: () => () => {
            const ground = auroraFallbackGround(shellAuroraConfig.value);
            return h("div", {
                class: "shell-aurora fixed inset-0 -z-10",
                "aria-hidden": "true",
                style: {
                    backgroundImage: ground.backgroundImage,
                    backgroundColor: ground.backgroundColor,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.5,
                },
            });
        },
    },
});

const { next, prev, nextCategory, prevCategory } = useStoryNavigation();

const showHelp = ref(false);
const shortcuts = useRegisteredShortcuts();

// The shell uses a static vertical sidebar rail. Crossfading layers is the supported
// orientation-change model; the platform cannot continuously interpolate row/column topology.

// `<main>` owns route scroll now (the shell itself is a fixed viewport frame),
// so the router's window-targeted scrollBehavior can't reset it. Reset the
// container to the top on every navigation so a new route never inherits the
// prior offset. This is the single scroll-reset owner, keyed off `route.path` (a query/hash
// change is not a page swap and must not re-scroll). Under the bare keyed
// `<component>` swap there is no <Transition> leave window to race.
const route = useRoute();
const mainEl = ref<HTMLElement | null>(null);
const showRouteFocus = ref(false);
let pendingRouteInput: "keyboard" | "pointer" | null = null;

function markKeyboardInput(): void {
    pendingRouteInput = "keyboard";
}

function markPointerInput(): void {
    pendingRouteInput = "pointer";
}

// The SR route-change announce. The atomic keyed swap
// has no skeleton `aria-busy`, so the live region is the only route-change signal AT
// receives; it also strands focus at <body>, so on settle we move focus into <main
// tabindex="-1"> (the new page's top).
const routeAnnounce = ref("");

watch(
    () => route.path,
    () => {
        mainEl.value?.scrollTo({ top: 0 });
        routeAnnounce.value = String(route.meta?.title ?? "");
        showRouteFocus.value = pendingRouteInput === "keyboard";
        pendingRouteInput = null;
        void nextTick(() => {
            mainEl.value?.focus({ preventScroll: true });
        });
    },
);

// The per-route warm-field hue feeds the single shell `<Aurora>`. `warmFieldHue`
// derives the number from the route's category via the ONE documented `categoryHue`
// source (NO third color registry), warm-projected into [25,95] (cool is
// unrepresentable). `shellAuroraConfig` is a recessive vividness:0 aurora on that
// hue; it re-uploads on the persisted shell node per non-focal nav (no re-mount).
const fieldHue = computed(() =>
    warmFieldHue(String(route.meta?.categoryId ?? "foundations")),
);

// The shell field is dark-mode-aware. In dark mode
// the field swaps to the LOW-L warm-EMBER `shellAuroraConfigDark` (the luminous-dark
// model) so it composites DARK (composite L ≈ 0.12–0.16 at the kept opacityCeiling
// 0.5) and the light hero h1, muted body clear AA, while still reading WARM-ember.
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

// Vue Router awaits each lazy `component: () => import()` during navigation, so the
// current page stays mounted until the new one resolves. The keyed component swaps atomically.

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
            window.dispatchEvent(new CustomEvent("glass-ui-demo:toggle-configurator")),
        { label: "Toggle configurator", group: "UI" },
    );
    registerShortcut("?", () => (showHelp.value = !showHelp.value), {
        label: "Toggle keyboard help",
        group: "UI",
    });
});
</script>

<template>
    <!-- The single shell field is a recessive `<Aurora>` that
         paints behind every non-focal route. The
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
    <!-- Grain is a per-surface opt-in. The shell
         field is the recessive <Aurora> above; a
         surface that wants tactile paper composes `paper-grain-overlay` or mounts
         `.paper-underpaint` itself). No universal grain plane rides over the whole page. -->

    <!-- `data-paper-field` belongs on the content ancestor of
         <main> (NOT the fixed Aurora sibling). The `cards.css` opaque-fallback
         suppressor is a DESCENDANT selector reading this attr, so it must sit above
         the cards. Set only while the shell field is active (a focal route's own
         field needs no suppression). -->
    <div
        class="demo-app-shell relative flex h-screen overflow-hidden text-foreground"
        :data-paper-field="shellFieldActive ? '' : null"
        @keydown.capture="markKeyboardInput"
        @pointerdown.capture="markPointerInput"
    >
        <!-- Fixed vertical sidebar rail dock (off-canvas below the mobile breakpoint —
             see dock-nav.css; the BottomDock owns the off-canvas Sheet trigger).
             The shell dock is a static vertical sidebar rail. -->
        <nav
            class="demo-sidebar-rail"
            aria-label="Category navigation"
            data-shell-region="category-navigation"
        >
            <SidebarDock />
        </nav>

        <div class="flex min-h-0 min-w-0 flex-1 flex-col">
            <!-- `<main>` owns route scroll. BottomDock is the adjacent shell footer,
                 so its actual block-size reserves the interaction-safe region without
                 a guessed route spacer.
                 `tabindex="-1"` lets the route-settle
                 watch move focus here, so the atomic keyed swap doesn't strand focus
                 at <body> + keyboard tab order resets to the new page. -->
            <main
                ref="mainEl"
                tabindex="-1"
                :data-route-focus="showRouteFocus ? 'keyboard' : null"
                class="demo-main-scroller smooth-scroll relative flex-1 min-h-0 min-w-0 overflow-y-auto"
            >
                <!-- Screen-reader route-change announcement. The
                     atomic keyed swap has no skeleton `aria-busy`, so this polite live
                     region is the only route-change signal AT receives; the route-settle
                     watch writes the new page title. -->
                <p class="sr-only" aria-live="polite" role="status">
                    {{ routeAnnounce }}
                </p>
                <!-- The route mutation is wrapped by the demo's native View Transition
                     owner. This keyed node carries no local animation, so native snapshots
                     and the immediate unsupported/reduced path never compete. -->
                <RouterView v-slot="{ Component }">
                    <component :is="Component" :key="route.path" />
                </RouterView>
            </main>

            <!-- Shell-anchored story navigation. It remains fixed relative to the
                 viewport because only <main> scrolls, while participating in flex
                 layout keeps route controls outside its hit-test plane. -->
            <BottomDock />
        </div>
    </div>

    <!-- the in-situ V↔H dock-morph stage is DEFINITION-ABSENT
         (decided-terminal). No modal, no goo teardrop, no `startViewTransition` on the
         morph path — the shell dock is a static vertical sidebar rail. -->

    <!-- The glass-ui demo Configurator — a right-side Sheet, opened by the
         SidebarDock gear control or the `,` shortcut (: the
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
            <dl class="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-small">
                <template v-for="shortcut in shortcuts" :key="shortcut.raw">
                    <dt class="flex gap-1" :aria-label="formatCombo(shortcut.raw)">
                        <kbd
                            v-for="part in formatComboParts(shortcut.raw)"
                            :key="part"
                            class="rounded bg-muted px-1.5 py-0.5 font-mono text-micro"
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

<!-- the in-situ V↔H dock-morph scoped CSS (the `[data-dock-morphing]`
     dissolve + the `[data-shell-dock-orientation="horizontal"]` fixed-floating reshape) is
     DEFINITION-ABSENT (the morph retired decided-terminal; the shell dock is a static
     vertical sidebar rail styled by dock-nav.css). -->
