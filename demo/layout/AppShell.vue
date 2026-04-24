<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { PaperBackdrop } from "@/components/custom/paper-backdrop";
import { registerShortcut } from "@/composables/useKeyboardShortcuts";
import { useStoryNavigation } from "../composables/useStoryNavigation";
import { Configurator } from "../configurator";
import CategoryRail from "./CategoryRail.vue";
import StoryPager from "./StoryPager.vue";

const { next, prev, nextCategory, prevCategory } = useStoryNavigation();

const showHelp = ref(false);

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
    <PaperBackdrop class="fixed inset-0 -z-10 bg-background" />

    <div class="relative flex min-h-screen text-foreground">
        <CategoryRail />

        <div class="flex min-w-0 flex-1 flex-col">
            <StoryPager />

            <main class="relative flex-1 min-w-0 px-4 py-6 md:px-8 md:py-10">
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
                            a story from the pager above.
                        </p>
                    </div>
                </RouterView>
            </main>
        </div>
    </div>

    <!-- Live token configurator — opened by FAB or `,` shortcut -->
    <Configurator />

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
                <dt><kbd class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">]</kbd></dt>
                <dd>Next story in category</dd>
                <dt><kbd class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">[</kbd></dt>
                <dd>Previous story in category</dd>
                <dt><kbd class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">}</kbd></dt>
                <dd>Next category (first story)</dd>
                <dt><kbd class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">{</kbd></dt>
                <dd>Previous category (first story)</dd>
                <dt><kbd class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">,</kbd></dt>
                <dd>Toggle the configurator panel</dd>
                <dt><kbd class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">?</kbd></dt>
                <dd>Toggle this help dialog</dd>
            </dl>
        </DialogContent>
    </Dialog>
</template>
