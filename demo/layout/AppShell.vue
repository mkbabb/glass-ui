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
import { PaperBackdrop } from "@glass/components/custom/paper-backdrop";
import { Button } from "@glass/components/ui/button";
import { Switch } from "@glass/components/ui/switch";
import { Card } from "@glass/components/ui/card";
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
import { Skeleton } from "@glass/components/ui/skeleton";
import { useBloomUp } from "@glass/composables/motion/useBloomUp";
import { startViewTransition } from "@glass/composables/motion/useViewTransition";
import {
    formatCombo,
    formatComboParts,
    registerShortcut,
    useRegisteredShortcuts,
} from "@glass/composables/keyboard";
import { useStoryNavigation } from "../composables/useStoryNavigation";
import { warmFieldHue } from "../stories/warm-field";
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
// prior offset.
const route = useRoute();
const mainEl = ref<HTMLElement | null>(null);

watch(
    () => route.fullPath,
    () => {
        mainEl.value?.scrollTo({ top: 0 });
    },
);

// ── W-NAV-DOCK-FIX F9 / GOLDEN M3-c — the category-change facet-set swap rides a
// view-transition. When the CATEGORY itself changes (not just a sibling story), the
// whole dock facet set + the section landing swap; wrap the DOM update in the SHIPPED
// `startViewTransition` keyed on `categoryId` so Chrome crossfades the before/after
// snapshots (the iOS-27 contextual crossfade). Safari (no VT API) degrades gracefully:
// `startViewTransition` no-ops the wrapper and the calm `.fade-slide` page-enter +
// the dock's own reactive swap carry the change — ONE code path, per-engine degrade.
// The `dataset` flag lets the dock-nav.css `@supports (view-transition-name:x)` arm
// name the facet rail as a VT-participating element only where the API exists.
const lastCategoryId = ref<string | undefined>(undefined);
watch(
    () => route.meta?.categoryId as string | undefined,
    (categoryId) => {
        const prev = lastCategoryId.value;
        lastCategoryId.value = categoryId;
        // First resolve (prev undefined) is the cold-load entrance, not a switch —
        // the shell-entrance bloom owns it; no crossfade snapshot needed.
        if (prev === undefined || prev === categoryId) return;
        startViewTransition(() => {
            // The reactive route already advanced; this tick is the snapshot boundary
            // Chrome crossfades across (the facet set + landing re-render between the
            // before/after capture). The body is intentionally a no-op write — the
            // route reactivity IS the DOM delta the VT captures.
            document.documentElement.dataset.categorySwitch = categoryId ?? "";
        });
    },
);

// BD.W-PAGE-FIELD / BD.W-FIELD-SCRIPT — the per-route WARM COLORFUL FIELD hue.
// The chassis writes ONE warm number per route into the mounted <PaperBackdrop>;
// `warmFieldHue` derives it from the route's category via the ONE documented
// `categoryHue` source (NO third color registry), warm-projected into [25,95]
// (paint-clamped again in paper.css, so cool is unrepresentable). Every category
// route is enrolled; the field is the calm CSS floor behind every glass surface.
const fieldHue = computed(() =>
    warmFieldHue(String(route.meta?.categoryId ?? "foundations")),
);

// ── BD.W-SHELL-ROUTE-BLOOM (M2 / V-b) — the route-bloom skeleton + the bloom-through ──
// iOS-27 never shows empty chrome. During the async route-CHUNK resolve window (a
// MATCHED-but-pending route — both `<Transition>` content branches false), the shell
// painted a BLANK `<main>` void. The 3rd `<Transition>` branch fills that rect with a
// glass `<SectionLandingSkeleton>` (a demo-local LAYOUT — eyebrow bar + √φ title block +
// bento shimmer grid — that COMPOSES the SHIPPED `<Skeleton surface="glass">` primitive
// + the warm-field-over-glass register, NOT a 2nd skeleton engine). It is keyed to the
// matched-but-pending case ONLY (`route.matched.length > 0 && !Component`), so the
// "Pick a story" no-match `<Card>` guard (defect-7) stays BYTE-UNTOUCHED.
//
// When `Component` resolves, the real page BLOOMS THROUGH the skeleton rect via the
// SHIPPED `useBloomUp` (preset "snappy") — the content squish-grows out of the placeholder
// rather than a hard `fade-slide` pop. Compositor-only (transform/opacity/filter on the
// content surface); PRM snaps it (the leaf's own reduce arm). No `backdrop-filter:url`, no
// goo — Safari-safe by construction.
const skeletonEl = ref<HTMLElement | null>(null);
const routeContentEl = ref<HTMLElement | null>(null);
const { bloom: bloomRouteContent } = useBloomUp(skeletonEl, routeContentEl, {
    preset: "snappy",
    // The content blooms out of the skeleton's OWN rect (the placeholder it replaces),
    // not a warm field re-tint here (the field hue is owned per-route by `fieldHue`).
    fieldStrength: 0,
});

// Whether a skeleton was holding the <main> rect on the PREVIOUS tick — the bloom only
// fires on a skeleton→content swap (a route whose chunk was pending long enough to paint
// the placeholder). An already-resolved chunk (no skeleton shown) keeps the calm
// `fade-slide` page-enter — the bloom is the void-fill follow-through, not every nav.
const skeletonWasShowing = ref(false);
watch(skeletonEl, (el) => {
    if (el) skeletonWasShowing.value = true;
});

// When the route component resolves, bloom it up from where the skeleton sat. We capture
// the content element off `<main>`'s first non-skeleton child (the route component root),
// avoiding a JS `@enter` Transition hook (which fires the "non-element root" warning for a
// fragment-root page + cannot reliably hold the element). The bloom measures the skeleton
// rect as source, the content rect as dest — squish-grow out of the placeholder. Guarded
// to the skeleton→content swap; PRM-snapped by the leaf.
watch(
    () => route.fullPath,
    () => {
        if (!skeletonWasShowing.value) return;
        // The route just changed AND a skeleton was showing — wait for the content to
        // mount, then bloom it from the (still-present, leaving) skeleton's rect.
        void nextTick(() => {
            const main = mainEl.value;
            // The entering content is `<main>`'s child that is NOT the leaving skeleton.
            // During the transition both coexist; take the first non-skeleton element.
            const content = main
                ? ([...main.children].find(
                      (c) =>
                          c instanceof HTMLElement &&
                          !c.classList.contains("section-landing-skeleton"),
                  ) as HTMLElement | undefined)
                : undefined;
            if (content && skeletonEl.value) {
                routeContentEl.value = content;
                bloomRouteContent();
            }
            skeletonWasShowing.value = false;
        });
    },
);

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
    <!-- The grain wrapper drops `bg-background`: the warm `.paper-field` plane
         now owns the opaque floor (it ends in --neutral-0), so the grain must
         stay transparent or it would occlude the field. -->
    <PaperBackdrop field :field-hue="fieldHue" class="fixed inset-0 -z-10" />

    <!-- BD.W-MORPH-FIELD-WELD (M1) — the ONE library goo `<filter>` mount, ONCE at the
         shell root. It exposes EVERY library metaball id off one byte-identical sRGB graph
         (`#glass-goo` carousel/deck · `#pager-goo` worm · `#dock-fission-goo` fission ·
         `#dock-morph-goo` V↔H teardrop · `#morph-goo` generic) — the DRY union of the
         prior four byte-near-identical mounts. A global `<defs>` referenced by id; mounting
         twice dups the ids, so it lives HERE once and every route's morph reaches it. -->
    <GooFilter />

    <div class="relative flex h-screen overflow-hidden text-foreground">
        <!-- Fixed vertical sidebar rail dock (off-canvas below the mobile
             breakpoint — see dock-nav.css; the BottomDock owns the off-canvas
             Sheet trigger). -->
        <aside class="demo-sidebar-rail">
            <SidebarDock />
        </aside>

        <div class="flex min-h-0 min-w-0 flex-1 flex-col">
            <!-- `<main>` owns route scroll. The extra bottom padding clears the
                 viewport-anchored BottomDock that floats over this region. -->
            <main
                ref="mainEl"
                class="demo-main-scroller smooth-scroll relative flex-1 min-h-0 min-w-0 overflow-y-auto px-4 pt-6 pb-28 md:px-8 md:pt-10 md:pb-32"
            >
                <!-- BA.W-ANIMATE Tier B — the route-scroller scroll-progress bar.
                     The `.scroll-progress` recipe (scroll-driven.css) drives a 0..1
                     scaleX fill off a native scroll() timeline on the compositor;
                     `.demo-scroll-progress` pins it to the top of the content column
                     and points `--scroll-progress-scroller` at the `--demo-main-progress`
                     scroll-timeline named on this `.demo-main-scroller` (the ROUTE owns
                     scroll, not `root`). PRM-safe + zero-JS by construction (the recipe
                     sits under the PRM + @supports(animation-timeline) gate). -->
                <div class="demo-scroll-progress scroll-progress" aria-hidden="true" />
                <!-- BA.W-ANIMATE Tier A — the route page-enter. The
                     `<RouterView>` mount is wrapped in a <Transition> keyed on the
                     route so each navigation fires ONE coherent page-enter: the
                     `fade-slide` recipe (transitions.css), opacity on `--ease-out`
                     + transform on `--spring-smooth` (the SETTLE/body register),
                     exit on `--ease-in` (no overshoot past gone). DEFAULT mode (no
                     out-in) so the entrance does not race the scroll-to-top reset
                     watcher; ONE event per route, not a per-element cascade. The
                     recipe's @media (prefers-reduced-motion: reduce) block keeps
                     only the opacity leg under PRM (transform removed). -->
                <RouterView v-slot="{ Component }">
                    <Transition name="fade-slide">
                        <component
                            :is="Component"
                            v-if="Component"
                            :key="route.fullPath"
                        />
                        <!-- BD.W-SHELL-ROUTE-BLOOM (V-b) — the route-bloom skeleton.
                             During the async route-CHUNK resolve window of a MATCHED route
                             (`route.matched.length > 0` AND no resolved `Component`) the
                             shell painted a BLANK <main> void. This 3rd branch fills the
                             rect with a glass placeholder LAYOUT (eyebrow bar + √φ title +
                             bento shimmer grid) that COMPOSES the SHIPPED <Skeleton
                             surface="glass"> over the warm field — zero void, never empty
                             chrome. It is keyed STRICTLY to the matched-but-pending case so
                             the no-match "Pick a story" <Card> (defect-7) is byte-untouched.
                             `aria-busy` announces the pending resolve; the shimmer is
                             decorative (aria-hidden via the Skeleton block). When the page
                             resolves it BLOOMS THROUGH this rect (useBloomUp, snappy). -->
                        <div
                            v-else-if="route.matched.length > 0"
                            ref="skeletonEl"
                            class="section-landing-skeleton mx-auto w-full max-w-6xl"
                            aria-busy="true"
                            aria-label="Loading story"
                            data-testid="section-landing-skeleton"
                        >
                            <div class="section-landing-skeleton__hero">
                                <Skeleton
                                    surface="glass"
                                    variant="shimmer"
                                    class="section-landing-skeleton__eyebrow"
                                />
                                <Skeleton
                                    surface="glass"
                                    variant="shimmer"
                                    class="section-landing-skeleton__title"
                                />
                                <Skeleton
                                    surface="glass"
                                    variant="shimmer"
                                    class="section-landing-skeleton__chip"
                                />
                            </div>
                            <div class="section-landing-skeleton__bento">
                                <Skeleton
                                    v-for="n in 6"
                                    :key="n"
                                    surface="glass"
                                    variant="breath"
                                    class="section-landing-skeleton__card"
                                />
                            </div>
                        </div>
                        <!-- W-NAV-DOCK-FIX (defect 7) — the "Pick a story" placeholder is
                             reachable ONLY for a literal no-matched-route. BYTE-UNTOUCHED:
                             the route-bloom skeleton above intercepts the matched-but-pending
                             window, never this no-match branch. The empty-state composes the
                             shipped <Card> (BC.W-STORYBOOK-META dogfood GAP-5). -->
                        <Card
                            v-else-if="route.matched.length === 0"
                            class="mx-auto max-w-xl p-8 text-center"
                        >
                            <p class="font-display text-2xl text-foreground">
                                Pick a story
                            </p>
                            <p class="mt-2 text-sm text-muted-foreground">
                                Choose a category from the rail on the left, then
                                a story from the bar below.
                            </p>
                        </Card>
                    </Transition>
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
   shell: the dim is light enough that the real shell backdrop (the PaperBackdrop +
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
