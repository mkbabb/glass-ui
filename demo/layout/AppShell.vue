<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { GlassDock, DockLayerGroup } from "@/components/custom/dock";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { registerShortcut } from "@/composables/useKeyboardShortcuts";
import { cn } from "@/utils/cn";
import { CATEGORIES } from "../stories/manifest";
import { useStoryNavigation } from "../composables/useStoryNavigation";
import HeaderBar from "./HeaderBar.vue";

const { current, next, prev, nextCategory, prevCategory, firstOfCategory } =
    useStoryNavigation();

// Dock is driven off the active category id (falls back to the first category's id).
const activeLayer = computed<string>(
    () => current.value?.category.id ?? CATEGORIES[0]!.id,
);

const showHelp = ref(false);

// ── Keyboard shortcuts ──
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
    <div class="paper-underpaint fixed inset-0 -z-10 bg-background" aria-hidden="true" />

    <div class="relative flex min-h-screen flex-col text-foreground">
        <HeaderBar />

        <div class="flex flex-1 min-h-0">
            <!-- Left vertical dock: category rail -->
            <aside
                class="sticky top-14 flex h-[calc(100vh-3.5rem)] shrink-0 items-center px-3 py-4"
                aria-label="Category navigation"
            >
                <GlassDock
                    :always-expanded="true"
                    position="inline"
                    fit-content
                    class="!flex-col"
                >
                    <nav
                        class="flex flex-col items-stretch gap-1"
                        aria-label="Categories"
                    >
                        <button
                            v-for="category in CATEGORIES"
                            :key="category.id"
                            type="button"
                            :aria-current="
                                category.id === activeLayer ? 'page' : undefined
                            "
                            :title="category.title"
                            :class="
                                cn(
                                    'group flex h-10 w-10 items-center justify-center rounded-full transition-colors',
                                    'text-muted-foreground hover:bg-foreground/5 hover:text-foreground',
                                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                                    category.id === activeLayer &&
                                        'bg-foreground/10 text-foreground',
                                )
                            "
                            @click="firstOfCategory(category.id)"
                        >
                            <component
                                :is="category.icon"
                                class="h-4 w-4"
                                aria-hidden="true"
                            />
                            <span class="sr-only">{{ category.title }}</span>
                        </button>
                    </nav>
                </GlassDock>
            </aside>

            <!-- Main column: story pager + content -->
            <div class="flex min-w-0 flex-1 flex-col">
                <!-- Story pager carousel (horizontal) -->
                <nav
                    v-if="(CATEGORIES.find((c) => c.id === activeLayer)?.stories.length ?? 0) > 0"
                    class="border-b border-border/60 px-4 py-2"
                    aria-label="Stories in category"
                >
                    <DockLayerGroup :active="activeLayer">
                        <template #default>
                            <div
                                v-for="category in CATEGORIES"
                                :key="category.id"
                                :hidden="category.id !== activeLayer || undefined"
                                class="w-full"
                            >
                                <Carousel
                                    v-if="category.stories.length > 0"
                                    class="w-full"
                                    :opts="{
                                        align: 'start',
                                        dragFree: true,
                                        containScroll: 'trimSnaps',
                                    }"
                                >
                                    <CarouselContent class="-ml-2">
                                        <CarouselItem
                                            v-for="story in category.stories"
                                            :key="story.id"
                                            class="pl-2 basis-auto"
                                        >
                                            <RouterLink
                                                :to="`/${category.id}/${story.id}`"
                                                :class="
                                                    cn(
                                                        'inline-flex h-8 items-center rounded-full border border-border/60 bg-background/40 px-3 text-xs font-medium text-muted-foreground transition-colors',
                                                        'hover:border-border hover:bg-foreground/5 hover:text-foreground',
                                                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                                                    )
                                                "
                                                :aria-current="
                                                    current?.story.id === story.id &&
                                                    current?.category.id === category.id
                                                        ? 'page'
                                                        : undefined
                                                "
                                            >
                                                <span
                                                    v-if="
                                                        current?.story.id === story.id &&
                                                        current?.category.id === category.id
                                                    "
                                                    class="mr-1.5 h-1.5 w-1.5 rounded-full bg-foreground"
                                                    aria-hidden="true"
                                                />
                                                {{ story.title }}
                                            </RouterLink>
                                        </CarouselItem>
                                    </CarouselContent>
                                </Carousel>
                            </div>
                        </template>
                    </DockLayerGroup>
                </nav>

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
                                Choose a category from the rail on the left, then a
                                story from the pager above.
                            </p>
                        </div>
                    </RouterView>
                </main>
            </div>
        </div>

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
    </div>
</template>
