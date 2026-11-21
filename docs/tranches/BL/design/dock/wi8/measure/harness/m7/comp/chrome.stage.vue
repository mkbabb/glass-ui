<!-- MEASURE-7 (RU-58): m6/comp/chrome.stage.vue with the size utility off each seat's own glyph (a direct child of a seat or a
     trigger, the trigger's chevron included); folded faces and glyphs inside a site's own wrapper keep theirs. -->
<script setup lang="ts">
// App chrome: a view select, two menus, an about popover and the theme, folded to a
// seal when idle. Each overlay holds the dock open while it is open. The second face
// holds the page's own tools in place of the app's.
import { ref, useTemplateRef, watch } from "vue";
import { Hexagon, Info, Minus, Plus, Redo2, Undo2 } from "@lucide/vue";
import {
    DockControl,
    DockCrossfade,
    DockLayer,
    DockSeparator,
    GlassDock,
} from "@glass/components/dock";
import { DockTrigger } from "@glass/components/dock/trigger";
import { Select, SelectContent, SelectItem, SelectValue } from "@glass/components/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@glass/components/menu";
import { Popover, PopoverContent } from "@glass/components/popover";
import { DarkModeToggle } from "@glass/components/dark-mode-toggle";
import DockScene from "./DockScene.vue";

const props = withDefaults(
    defineProps<{ startsOpen?: boolean; face?: "app" | "page" }>(),
    { startsOpen: true, face: "app" },
);

const dock = useTemplateRef<InstanceType<typeof GlassDock>>("dock");

function hold(open: boolean): void {
    if (open) dock.value?.keepOpen();
    else dock.value?.release();
}

// A face change opens the dock so the new face is seen.
watch(
    () => props.face,
    () => dock.value?.expand(),
);

const view = ref("canvas");
const VIEWS = [
    { value: "canvas", label: "Canvas" },
    { value: "outline", label: "Outline" },
    { value: "split", label: "Split" },
];
const MENUS = [
    { label: "File", items: ["New", "Open", "Export"] },
    { label: "Edit", items: ["Undo", "Redo", "Select all"] },
];
const zoom = ref(100);
</script>

<template>
    <DockScene place="top" class="chrome-scene">
        <Transition name="fade" mode="out-in">
            <div :key="String(startsOpen)" class="scene-swap">
                <GlassDock
                    ref="dock"
                    :collapse="startsOpen ? 'open' : 'closed'"
                    fit-content
                    collapsed-label="Open the app bar"
                    aria-label="App"
                >
                    <template #collapsed>
                        <Hexagon aria-hidden="true" />
                    </template>

                    <DockCrossfade :active="face" reserve="inline">
                        <DockLayer id="app" label="App">
                            <div class="flex items-center">
                                <Select v-model="view" @update:open="hold">
                                    <DockTrigger for="select" aria-label="View">
                                        <SelectValue class="text-small" />
                                    </DockTrigger>
                                    <SelectContent>
                                        <SelectItem v-for="v in VIEWS" :key="v.value" :value="v.value">
                                            {{ v.label }}
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <DockSeparator />
                                <DropdownMenu v-for="m in MENUS" :key="m.label" @update:open="hold">
                                    <DockTrigger for="dropdown">
                                        <span class="text-small">{{ m.label }}</span>
                                    </DockTrigger>
                                    <DropdownMenuContent align="start" class="w-40">
                                        <DropdownMenuItem v-for="item in m.items" :key="item">
                                            {{ item }}
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <DockSeparator />
                                <Popover @update:open="hold">
                                    <DockTrigger for="popover" aria-label="About">
                                        <Info aria-hidden="true" />
                                    </DockTrigger>
                                    <PopoverContent side="bottom" class="w-56 text-small">
                                        A sketchbook for shapes and colour.
                                    </PopoverContent>
                                </Popover>
                                <DarkModeToggle size="dock" />
                            </div>
                        </DockLayer>
                        <DockLayer id="page" label="Page">
                            <div class="flex items-center">
                                <DockControl aria-label="Undo"><Undo2 aria-hidden="true" /></DockControl>
                                <DockControl aria-label="Redo"><Redo2 aria-hidden="true" /></DockControl>
                                <DockSeparator />
                                <DockControl aria-label="Zoom out" @click="zoom = Math.max(25, zoom - 25)">
                                    <Minus aria-hidden="true" />
                                </DockControl>
                                <Transition name="metric-swap" mode="out-in">
                                    <span :key="zoom" class="chrome-zoom text-small tabular-nums">{{ zoom }}%</span>
                                </Transition>
                                <DockControl aria-label="Zoom in" @click="zoom = Math.min(400, zoom + 25)">
                                    <Plus aria-hidden="true" />
                                </DockControl>
                            </div>
                        </DockLayer>
                    </DockCrossfade>
                </GlassDock>
            </div>
        </Transition>
    </DockScene>
</template>

<style scoped>
/* The open bar's width, so a card scales the scene instead of scrolling the run. */
.chrome-scene {
    min-inline-size: 20rem;
}

.chrome-zoom {
    min-inline-size: 3.5rem;
    text-align: center;
}
</style>
