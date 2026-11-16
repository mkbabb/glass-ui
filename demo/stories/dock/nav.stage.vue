<script setup lang="ts">
// Site navigation: page tabs, a separator, then the theme and Find at the end. Under
// 30rem of stage the tabs become one menu naming the current page.
import { ref } from "vue";
import { BarChart3, ChevronDown, Home, Search, Settings, Users } from "@lucide/vue";
import { DockControl, DockSeparator, GlassDock } from "@glass/components/dock";
import { DockTrigger } from "@glass/components/dock/trigger";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@glass/components/menu";
import { DarkModeToggle } from "@glass/components/dark-mode-toggle";
import DockScene from "./_parts/DockScene.vue";
import ScenePane from "./_parts/ScenePane.vue";

withDefaults(defineProps<{ icons?: boolean }>(), { icons: false });

const PAGES = [
    { id: "home", label: "Home", icon: Home },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "people", label: "People", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
] as const;

const page = ref<string>("reports");
const label = (id: string) => PAGES.find((p) => p.id === id)?.label ?? "";
</script>

<template>
    <DockScene place="bottom">
        <template #context>
            <ScenePane shape="column" />
        </template>
        <template #default="{ narrow }">
            <Transition name="fade" mode="out-in">
                <div :key="`${narrow}-${icons}`" class="scene-swap">
                    <GlassDock
                        :collapse="false"
                        fit-content
                        aria-label="Site"
                    >
                        <DropdownMenu v-if="narrow">
                            <DockTrigger for="dropdown" aria-label="Pages">
                                <span class="text-small">{{ label(page) }}</span>
                                <ChevronDown class="h-3 w-3" aria-hidden="true" />
                            </DockTrigger>
                            <DropdownMenuContent align="center" class="w-40">
                                <DropdownMenuRadioGroup v-model="page">
                                    <DropdownMenuRadioItem v-for="p in PAGES" :key="p.id" :value="p.id">
                                        {{ p.label }}
                                    </DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <div v-else class="contents" role="group" aria-label="Pages">
                            <DockControl
                                v-for="p in PAGES"
                                :key="p.id"
                                shape="tab"
                                :aria-current="page === p.id ? 'page' : undefined"
                                @click="page = p.id"
                            >
                                <span class="seat-face">
                                    <component :is="p.icon" v-if="icons" class="h-4 w-4" aria-hidden="true" />
                                    {{ p.label }}
                                </span>
                            </DockControl>
                        </div>

                        <template #persistent-end>
                            <DockSeparator />
                            <DarkModeToggle size="dock" />
                            <DockControl aria-label="Find">
                                <Search class="h-4 w-4" aria-hidden="true" />
                            </DockControl>
                        </template>

    <style scoped>
    /* An icon and a word in one seat, a small gap between them. */
    .seat-face {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
    }
    </style>
                    </GlassDock>
                </div>
            </Transition>
        </template>
    </DockScene>
</template>

<style scoped>
/* An icon and a word in one seat, a small gap between them. */
.seat-face {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
}
</style>
