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
} from "../../src/components/ui/dialog";
import { PaperBackdrop } from "../../src/components/custom/paper-backdrop";
import {
    Compass,
    Shapes,
    Boxes,
    Database,
    Bell,
} from "@lucide/vue";
import {
    DockIconButton,
    GlassDock,
    useDockOrientationMorph,
} from "../../src/components/custom/dock";
import { startViewTransition } from "../../src/composables/motion/useViewTransition";
import {
    formatCombo,
    formatComboParts,
    registerShortcut,
    useRegisteredShortcuts,
} from "../../src/composables/keyboard";
import { useStoryNavigation } from "../composables/useStoryNavigation";
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
    <PaperBackdrop class="fixed inset-0 -z-10 bg-background" />

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
                class="relative flex-1 min-h-0 min-w-0 overflow-y-auto px-4 pt-6 pb-28 md:px-8 md:pt-10 md:pb-32"
            >
                <RouterView v-slot="{ Component }">
                    <component :is="Component" v-if="Component" />
                    <div
                        v-else
                        class="mx-auto max-w-xl rounded-[var(--radius)] border border-border/60 bg-background/40 p-8 text-center"
                    >
                        <p class="font-display text-2xl text-foreground">
                            Pick a story
                        </p>
                        <p class="mt-2 text-sm text-muted-foreground">
                            Choose a category from the rail on the left, then
                            a story from the bar below.
                        </p>
                    </div>
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
                    <button
                        type="button"
                        class="btn-pill btn-interactive focus-ring inline-flex items-center gap-2 rounded-pill border border-border/40 bg-card/60 px-4 py-2 text-small font-medium"
                        data-testid="shell-morph-toggle"
                        @click="toggleShellMorph"
                    >
                        <ArrowLeftRight class="size-4" aria-hidden="true" />
                        Morph to {{ morphFacing }}
                    </button>
                    <label class="flex items-center gap-2 text-small">
                        <input
                            type="checkbox"
                            v-model="liquidPreview"
                            data-testid="shell-liquid-preview-toggle"
                            class="focus-ring size-4 rounded"
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
