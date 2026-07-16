<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@glass/components/dialog";
import { Aurora } from "@glass/components/aurora";
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
import { shellFieldActive } from "../router";
import { PresetEditor } from "./configurator";
import SidebarDock from "./SidebarDock.vue";
import BottomDock from "./BottomDock.vue";
import "./dock-nav.css";

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
         surface that wants tactile paper composes `paper-grain-overlay` or mounts its
         own <PaperBackdrop>). No universal grain plane rides over the whole page. -->

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
        <aside class="demo-sidebar-rail" data-shell-region="category-navigation">
            <SidebarDock />
        </aside>

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

<!-- the in-situ V↔H dock-morph scoped CSS (the `[data-dock-morphing]`
     dissolve + the `[data-shell-dock-orientation="horizontal"]` fixed-floating reshape) is
     DEFINITION-ABSENT (the morph retired decided-terminal; the shell dock is a static
     vertical sidebar rail styled by dock-nav.css). -->
