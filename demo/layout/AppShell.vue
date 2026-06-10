<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../../src/components/ui/dialog";
import { PaperBackdrop } from "../../src/components/custom/paper-backdrop";
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

    <!-- Live token preset editor — opened by FAB or `,` shortcut -->
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
