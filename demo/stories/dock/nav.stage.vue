<script setup lang="ts">
// Site navigation: page tabs, a separator, then the theme and Find at the end. Under
// 30rem of stage the tabs become one menu naming the current page. The page above the
// dock is the current tab's: a press cross-fades its title and its rows together.
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
import { Avatar, AvatarFallback } from "@glass/components/avatar";
import { Badge } from "@glass/components/badge";
import { StatusDot } from "@glass/components/status-dot";
import DockScene from "./_parts/DockScene.vue";
import ScenePage from "./_parts/ScenePage.vue";

withDefaults(defineProps<{ icons?: boolean }>(), { icons: false });

const PAGES = [
    { id: "home", label: "Home", icon: Home },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "people", label: "People", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
] as const;

// Each page's own rows.
const HOME = [
    { name: "Inbox", count: 12 },
    { name: "Tasks", count: 4 },
    { name: "Mentions", count: 2 },
] as const;
const REPORTS = [
    { name: "Q2", figure: "41.2k" },
    { name: "Q3", figure: "48.0k" },
    { name: "Q4", figure: "55.6k" },
] as const;
const PEOPLE = ["Ada", "Grace", "Emmy", "Katherine"] as const;
const SETTINGS = [
    { name: "Sync", on: true },
    { name: "Backups", on: true },
    { name: "Alerts", on: false },
] as const;

const page = ref<string>("people");
const label = (id: string) => PAGES.find((p) => p.id === id)?.label ?? "";
</script>

<template>
    <DockScene place="bottom">
        <template #context>
            <ScenePage shape="column" :title="label(page)">
                <Transition name="fade" mode="out-in">
                    <ul :key="page" class="nav-rows">
                        <template v-if="page === 'people'">
                            <li v-for="name in PEOPLE" :key="name" class="nav-row nav-row--person">
                                <Avatar decorative size="sm">
                                    <AvatarFallback>{{ name[0] }}</AvatarFallback>
                                </Avatar>
                                {{ name }}
                            </li>
                        </template>
                        <template v-else-if="page === 'home'">
                            <li v-for="row in HOME" :key="row.name" class="nav-row">
                                {{ row.name }}
                                <Badge variant="secondary" size="sm" class="tabular-nums">{{ row.count }}</Badge>
                            </li>
                        </template>
                        <template v-else-if="page === 'reports'">
                            <li v-for="row in REPORTS" :key="row.name" class="nav-row">
                                {{ row.name }}
                                <span class="tabular-nums">{{ row.figure }}</span>
                            </li>
                        </template>
                        <template v-else>
                            <li v-for="row in SETTINGS" :key="row.name" class="nav-row">
                                {{ row.name }}
                                <StatusDot :state="row.on ? 'online' : 'idle'" size="md" motion="off" :label="row.on ? 'On' : 'Off'" />
                            </li>
                        </template>
                    </ul>
                </Transition>
            </ScenePage>
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
                    </GlassDock>
                </div>
            </Transition>
        </template>
    </DockScene>
</template>

<style scoped>
/* The page's rows sit on a gap, with no rules between them. */
.nav-rows {
    display: grid;
    gap: var(--sp-3);
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: var(--type-body);
    line-height: var(--type-leading-body);
    color: var(--foreground);
}

.nav-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--sp-3);
}

.nav-row--person {
    justify-content: flex-start;
}

/* An icon and a word in one seat, a small gap between them. */
.seat-face {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
}
</style>
