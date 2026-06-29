<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from "vue";
import { useRoute } from "vue-router";
import { ArrowLeftRight, X } from "@lucide/vue";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@glass/components/ui/dialog";
import { Aurora } from "@glass/components/custom/aurora";
import { Button } from "@glass/components/ui/button";
import { Switch } from "@glass/components/ui/switch";
import {
    Compass,
    Shapes,
    Boxes,
    Database,
    Bell,
} from "@lucide/vue";
import {
    GooFilter,
    DockIconButton,
    GlassDock,
    useDockOrientationMorph,
} from "@glass/components/custom/dock";
import { startViewTransition } from "@glass/composables/motion/useViewTransition";
import {
    formatCombo,
    formatComboParts,
    registerShortcut,
    useRegisteredShortcuts,
} from "@glass/composables/keyboard";
import { useStoryNavigation } from "../composables/useStoryNavigation";
import { warmFieldHue } from "../stories/warm-field";
import { shellAuroraConfig as buildShellAuroraConfig } from "../stories/aurora-hero";
import { shellFieldActive } from "../router";
import { PresetEditor } from "../configurator";
import SidebarDock from "./SidebarDock.vue";
import BottomDock from "./BottomDock.vue";
import CommandPalette from "../eggs/CommandPalette.vue";
import KonamiAurora from "../eggs/KonamiAurora.vue";
import FRedrawOverlay from "../eggs/FRedrawOverlay.vue";
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
// E1 — the ℱ-wordmark Fourier redraw (the wordmark dispatches this event).
const showFRedraw = ref(false);
function onFRedraw() {
    showFRedraw.value = true;
}

// ── BA.W-DOCK-MORPH-INSITU — the in-situ V↔H orientation morph demonstration ──
// R8-2: the shell docks must DEMONSTRATE the dock's liquid-glass V↔H morph
// in-situ, over the real shell backdrop (BA-DSM-3: not the showcase's flat plate).
// The shell is fixed nav chrome — physically morphing the SidebarDock into the
// BottomDock would break navigation on every route — so the in-situ demonstration
// is a focused morph stage that OPENS over the live shell: the morph control in each
// shell dock's trailing utility group toggles this stage, the SAME `useDockOrientationMorph`
// AZ driver (the shell is its binary consumer #2) drives the ONE `--dock-morph-t`
// scalar, and the §7-shipped VIEW-TRANSITION crossfade is the default register. The
// perf-gated liquid teardrop (the existing morph-bridge.css SVG-goo) is the optional
// register, gated on the recorded perf number (scope 5). NO second morph engine, NO
// parallel clock, NO orientation `ref` shadow of the driver's `orientation`.
const morphStageOpen = ref(false);
const morphStageEl = useTemplateRef<HTMLElement>("morphStageEl");

// The synthetic stage docks the driver morphs (the two-dock contract the shell's
// one-dock-per-orientation topology cannot host directly — the showcase's two-dock
// pattern transplanted into the shell stage, the §Triumvirate named-successor path).
const morphEntries = [
    { id: "foundations", label: "Foundations", icon: Compass },
    { id: "primitives", label: "Primitives", icon: Shapes },
    { id: "containers", label: "Containers", icon: Boxes },
    { id: "data", label: "Data", icon: Database },
    { id: "feedback", label: "Feedback", icon: Bell },
];

// The dock footprints (px) — the morph spans for the liquid size morph.
const V_FULL_H = 296;
const H_FULL_W = 332;

const morph = useDockOrientationMorph({
    rootEl: morphStageEl,
    verticalSize: V_FULL_H,
    horizontalSize: H_FULL_W,
});

// ── The SHIPPED default — the §7 arm-c View-Transitions crossfade ──
// The orientation state the VT crossfade swaps. The synthetic-dock swap (vertical ↔
// horizontal) is wrapped in `startViewTransition`, so the compositor crossfades the
// before/after snapshots — budget-clearing, deterministic, bidirectional.
const vtOrientation = ref<"vertical" | "horizontal">("vertical");

// The liquid-teardrop preview — OFF by default (the VT crossfade ships). ON shows the
// perf-gated metaball-bridge morph. The ship decision rides the recorded §7 number.
const liquidPreview = ref(false);

const morphFacing = computed(() => {
    const cur = liquidPreview.value ? morph.orientation.value : vtOrientation.value;
    return cur === "vertical" ? "horizontal" : "vertical";
});

// The goo filter is gated to the occluded MIDPOINT window — a pure f(--dock-morph-t),
// no clock (M5 scalar-binding).
const morphGooFilter = computed(() =>
    morph.t.value > 0.18 && morph.t.value < 0.82
        ? "url(#shell-dock-morph-goo)"
        : "none",
);

function toggleShellMorph(): void {
    if (liquidPreview.value) {
        morph.toggle();
    } else {
        startViewTransition(() => {
            vtOrientation.value =
                vtOrientation.value === "vertical" ? "horizontal" : "vertical";
        });
    }
}

function openMorphStage(): void {
    morphStageOpen.value = true;
}
function closeMorphStage(): void {
    morphStageOpen.value = false;
}
function onToggleMorphStage(): void {
    morphStageOpen.value = !morphStageOpen.value;
}

// DETERMINISTIC CAPTURE SEAM — the π/Playwright arm pins EXACT t values (the
// frame-series) + drives toggle/morphTo (both directions). The scalar is the ONE
// source; pinning yields a frame-reproducible silhouette (no wall-clock).
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
        open: openMorphStage,
        close: closeMorphStage,
        setPreview: (on) => {
            liquidPreview.value = on;
        },
        setMorphT: (value) => {
            morphStageOpen.value = true;
            if (!liquidPreview.value) liquidPreview.value = true;
            void nextTick(() => morph.pin(value));
        },
        toggle: () => {
            morphStageOpen.value = true;
            if (!liquidPreview.value) liquidPreview.value = true;
            void nextTick(() => morph.toggle());
        },
        morphTo: (o) => {
            morphStageOpen.value = true;
            if (!liquidPreview.value) liquidPreview.value = true;
            void nextTick(() => morph.morphTo(o));
        },
    };
    window.addEventListener("glass-ui-demo:toggle-dock-morph", onToggleMorphStage);
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
        });
    },
);

// BG.W-ROUTE-TRANSITION — the categoryId no-op `startViewTransition` watch + its dead
// `document.documentElement.dataset.categorySwitch` write are DELETED (the dataset flag
// had ZERO readers, and the VT body was an intentional no-op — a confounding mechanism
// the bare keyed atomic swap makes redundant). The functional `toggleShellMorph` VT
// (the dock-morph crossfade) is KEPT.

// BG.W-FIELD-AURORA (M2) — the per-route WARM FIELD hue feeds the ONE shell
// `<Aurora>` (the retired `.paper-field` CSS plane's successor). `warmFieldHue`
// derives the number from the route's category via the ONE documented `categoryHue`
// source (NO third color registry), warm-projected into [25,95] (cool is
// unrepresentable). `shellAuroraConfig` is a recessive vividness:0 aurora on that
// hue; it re-uploads on the persisted shell node per non-focal nav (no re-mount).
const fieldHue = computed(() =>
    warmFieldHue(String(route.meta?.categoryId ?? "foundations")),
);
const shellAuroraConfig = computed(() => buildShellAuroraConfig(fieldHue.value));

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

    // E1 — the wordmark dispatches this when long-pressed / double-clicked.
    window.addEventListener("glass-ui-demo:f-redraw", onFRedraw);
});

onBeforeUnmount(() => {
    window.removeEventListener("glass-ui-demo:f-redraw", onFRedraw);
    window.removeEventListener("glass-ui-demo:toggle-dock-morph", onToggleMorphStage);
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
             Sheet trigger). -->
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
                <!-- BA.W-ANIMATE Tier B / BG.W-SCROLL-PROGRESS-RAIL — the route-scroller
                     scroll-progress bar. The `.scroll-progress` recipe (scroll-driven.css)
                     drives a 0..1 scaleX fill off a native scroll() timeline on the
                     compositor; `.demo-scroll-progress` is a position:sticky CHILD of this
                     `.demo-main-scroller`, so `--scroll-progress-timeline: scroll(nearest
                     block)` resolves to this scroller (the ROUTE owns scroll, not `root`).
                     PRM-safe + zero-JS by construction (the animated grow sits under the
                     PRM + @supports(animation-timeline) gate; the unconditional scaleX(0)
                     is the invisible rest). -->
                <div class="demo-scroll-progress scroll-progress" aria-hidden="true" />
                <!-- BG.W-ROUTE-TRANSITION (M1) — the route swap is a BARE KEYED ATOMIC
                     SWAP: NO Vue <Transition>, NO Suspense, NO v-if/skeleton/no-match
                     branch chain. A keyed `<component>` unmounts the old + mounts the new
                     in ONE patch — `<main>` carries exactly the new page at every settle
                     (children.length === 2: this component + the sticky scroll-progress
                     bar), exactly one route root, h1 === dest, with NO leave hook to
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

    <!-- Easter eggs (each PRM-fenced; each composes shipped machinery). -->
    <CommandPalette v-model:open="showPalette" />
    <KonamiAurora v-if="showKonami" @done="showKonami = false" />
    <FRedrawOverlay v-if="showFRedraw" @done="showFRedraw = false" />

    <!-- BA.W-DOCK-MORPH-INSITU — the in-situ V↔H orientation-morph demonstration.
         A focused stage that OPENS over the live shell (the real shell backdrop reads
         through the dim — BA-DSM-3, not the showcase's flat plate). The shell docks'
         trailing morph control toggles it; the SAME useDockOrientationMorph AZ driver
         (the shell is consumer #2) writes the ONE --dock-morph-t scalar; the §7 VT
         crossfade is the shipped default, the liquid-teardrop bridge the perf-gated
         register. NO second engine, ONE scalar both directions. -->
    <Transition name="morph-stage-fade">
        <div
            v-if="morphStageOpen"
            class="demo-dock-morph-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Dock vertical-horizontal morph"
            data-testid="shell-dock-morph-overlay"
            @keydown.esc="closeMorphStage"
        >
            <div class="demo-dock-morph-panel">
                <header class="demo-dock-morph-head">
                    <div class="flex flex-col gap-1">
                        <h2 class="text-subheading">Liquid-glass dock morph</h2>
                        <p class="text-small text-muted-foreground max-w-prose">
                            The dock flows from <strong>vertical</strong> to
                            <strong>horizontal</strong> and back — bidirectional and
                            deterministic on the one
                            <code class="rounded bg-muted px-1">--dock-morph-t</code>
                            scalar. The shipped morph is a View-Transitions crossfade;
                            flip <strong>Liquid teardrop</strong> on to preview the
                            metaball-bridge register.
                        </p>
                    </div>
                    <DockIconButton
                        type="button"
                        class="tap-squish"
                        aria-label="Close the dock morph demonstration"
                        @click="closeMorphStage"
                    >
                        <X class="h-4 w-4" aria-hidden="true" />
                    </DockIconButton>
                </header>

                <div class="demo-dock-morph-controls">
                    <!-- BC.W-STORYBOOK-META — the morph toggle composes the shipped
                         glass <Button> (the dogfood SHELL sweep — GAP-5), not a raw
                         `btn-pill` chain. The data-testid is preserved so the
                         in-situ dock-morph wiring stays byte-stable. -->
                    <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        class="gap-2"
                        data-testid="shell-morph-toggle"
                        @click="toggleShellMorph"
                    >
                        <ArrowLeftRight class="size-4" aria-hidden="true" />
                        Morph to {{ morphFacing }}
                    </Button>
                    <!-- The liquid-teardrop toggle composes the shipped <Switch>
                         (the dogfood SHELL sweep — GAP-5), not a raw
                         `<input type="checkbox">`. The data-testid is preserved. -->
                    <label class="flex items-center gap-2 text-small">
                        <Switch
                            v-model="liquidPreview"
                            data-testid="shell-liquid-preview-toggle"
                            aria-label="Liquid teardrop preview"
                        />
                        Liquid teardrop (preview)
                    </label>
                    <span
                        class="text-mono-caption text-muted-foreground"
                        data-testid="shell-morph-readout"
                    >
                        mode = {{ liquidPreview ? "liquid" : "view-transition" }} · t =
                        {{ morph.t.value.toFixed(3) }}
                    </span>
                </div>

                <!-- The morph stage — the ONE root the scalar inherits from. -->
                <div
                    ref="morphStageEl"
                    class="demo-dock-morph-stage"
                    data-testid="shell-dock-morph-stage"
                >
                    <!-- The §7-shipped View-Transitions crossfade (the default). -->
                    <template v-if="!liquidPreview">
                        <GlassDock
                            v-if="vtOrientation === 'vertical'"
                            orientation="vertical"
                            always-expanded
                            class="demo-dock-morph-pane relative z-10"
                            aria-label="Vertical dock"
                            data-testid="shell-dock-morph-vt-vertical"
                        >
                            <DockIconButton
                                v-for="e in morphEntries"
                                :key="e.id"
                                type="button"
                                class="text-muted-foreground"
                                :aria-label="e.label"
                            >
                                <component :is="e.icon" />
                            </DockIconButton>
                        </GlassDock>
                        <GlassDock
                            v-else
                            orientation="horizontal"
                            always-expanded
                            class="demo-dock-morph-pane relative z-10"
                            aria-label="Horizontal dock"
                            data-testid="shell-dock-morph-vt-horizontal"
                        >
                            <DockIconButton
                                v-for="e in morphEntries"
                                :key="e.id"
                                type="button"
                                class="text-muted-foreground"
                                :aria-label="e.label"
                            >
                                <component :is="e.icon" />
                            </DockIconButton>
                        </GlassDock>
                    </template>

                    <!-- The perf-gated liquid-teardrop preview (the existing
                         morph-bridge.css SVG-goo — M5-deterministic). -->
                    <template v-else>
                        <svg class="absolute size-0" aria-hidden="true">
                            <defs>
                                <filter
                                    id="shell-dock-morph-goo"
                                    x="-10%"
                                    y="-10%"
                                    width="120%"
                                    height="120%"
                                >
                                    <feGaussianBlur
                                        in="SourceGraphic"
                                        stdDeviation="7"
                                        result="blur"
                                    />
                                    <feColorMatrix
                                        in="blur"
                                        mode="matrix"
                                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
                                        result="goo"
                                    />
                                    <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                                </filter>
                            </defs>
                        </svg>

                        <div
                            class="dock-morph-bridge"
                            :style="{
                                '--stretch': String(morph.stretch.value),
                                '--dock-bridge-v-h': `${V_FULL_H}px`,
                                '--dock-bridge-h-w': `${H_FULL_W}px`,
                            }"
                            aria-hidden="true"
                            data-testid="shell-dock-morph-bridge"
                        >
                            <div
                                class="dock-morph-bridge-goo"
                                :style="{ '--dock-bridge-goo-filter': morphGooFilter }"
                            >
                                <div
                                    class="dock-morph-bridge-plate dock-morph-bridge-plate--vertical"
                                />
                                <div
                                    class="dock-morph-bridge-plate dock-morph-bridge-plate--horizontal"
                                />
                            </div>
                        </div>

                        <GlassDock
                            orientation="vertical"
                            always-expanded
                            class="demo-dock-morph-pane demo-dock-morph-pane--liquid relative z-10"
                            :style="{
                                ...morph.verticalStyle.value,
                                ...morph.verticalOpacity.value,
                            }"
                            v-bind="{ inert: morph.t.value > 0.5 || undefined }"
                            aria-label="Vertical dock (morph source)"
                            data-testid="shell-dock-morph-vertical"
                        >
                            <DockIconButton
                                v-for="e in morphEntries"
                                :key="e.id"
                                type="button"
                                class="text-muted-foreground"
                                :aria-label="e.label"
                            >
                                <component :is="e.icon" />
                            </DockIconButton>
                        </GlassDock>

                        <GlassDock
                            orientation="horizontal"
                            always-expanded
                            class="demo-dock-morph-pane demo-dock-morph-pane--liquid absolute z-10"
                            :style="{
                                ...morph.horizontalStyle.value,
                                ...morph.horizontalOpacity.value,
                            }"
                            v-bind="{ inert: morph.t.value <= 0.5 || undefined }"
                            aria-label="Horizontal dock (morph target)"
                            data-testid="shell-dock-morph-horizontal"
                        >
                            <DockIconButton
                                v-for="e in morphEntries"
                                :key="e.id"
                                type="button"
                                class="text-muted-foreground"
                                :aria-label="e.label"
                            >
                                <component :is="e.icon" />
                            </DockIconButton>
                        </GlassDock>
                    </template>
                </div>
            </div>
            <button
                type="button"
                class="demo-dock-morph-scrim"
                aria-label="Close"
                tabindex="-1"
                @click="closeMorphStage"
            />
        </div>
    </Transition>

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
/* BA.W-DOCK-MORPH-INSITU — the in-situ morph stage overlay. It opens OVER the live
   shell: the dim is light enough that the real shell backdrop (the shell aurora field +
   the route page + the shell docks) reads THROUGH it (BA-DSM-3 — the morph is staged
   over the real shell, not a flat plate). */
.demo-dock-morph-overlay {
    position: fixed;
    inset: 0;
    z-index: 60;
    display: grid;
    place-items: center;
    padding: 1.5rem;
}

/* The dim scrim — light enough the live shell reads through (BA-DSM-3). The house
   modal-scrim recipe (color-mix over the background, NOT hsl(var()/α) — the A5-1
   complete-hsl double-wrap trap). */
.demo-dock-morph-scrim {
    position: absolute;
    inset: 0;
    z-index: 0;
    border: 0;
    cursor: default;
    background: color-mix(in srgb, var(--background) 40%, transparent);
    backdrop-filter: blur(2px);
}

.demo-dock-morph-panel {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    width: min(100%, 44rem);
    max-height: min(100%, 40rem);
    padding: 1.5rem;
    border-radius: var(--radius-card);
    border: 1px solid color-mix(in srgb, var(--border) 60%, transparent);
    /* A glass panel — reads the dim shell behind it (the maximal default register). */
    background: var(--glass-bg-floating, color-mix(in oklab, var(--card), white 6%));
    backdrop-filter: var(--glass-blur-floating, blur(20px));
    box-shadow: var(--shadow-floating, 0 12px 40px color-mix(in srgb, var(--shadow-color) 22%, transparent));
}

.demo-dock-morph-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
}

.demo-dock-morph-controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
}

/* The morph stage — the ONE root the scalar inherits from. A static themed wash so
   the glass docks read against a non-flat surface (the rich live substrate is the
   shell behind the panel; this stage is the focused demonstration surface). */
.demo-dock-morph-stage {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 20rem;
    overflow: hidden;
    border-radius: var(--radius-card);
    padding: 2rem;
    background:
        radial-gradient(
            70% 55% at 28% 22%,
            color-mix(in oklab, var(--primary), transparent 82%),
            transparent 70%
        ),
        radial-gradient(
            60% 60% at 78% 80%,
            color-mix(in oklab, var(--accent, var(--primary)), transparent 84%),
            transparent 72%
        ),
        linear-gradient(
            140deg,
            color-mix(in oklab, var(--card), var(--foreground) 4%),
            var(--card)
        );
    view-transition-name: shell-dock-morph-stage;
}

.demo-dock-morph-pane--liquid {
    overflow: hidden;
    transform-origin: center;
}

/* The overlay enter/exit — a gentle fade (PRM-gated by the global motion gate). */
.morph-stage-fade-enter-active,
.morph-stage-fade-leave-active {
    transition: opacity var(--duration-3, 0.2s) var(--ease-standard, ease);
}
.morph-stage-fade-enter-from,
.morph-stage-fade-leave-to {
    opacity: 0;
}
</style>
