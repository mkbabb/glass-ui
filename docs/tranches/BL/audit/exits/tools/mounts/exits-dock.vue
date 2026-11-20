<script setup lang="ts">
// Exit audit (docs/tranches/BL/audit/exits): the owner's case, a Select seated in a
// GlassDock through DockTrigger, its open state driven by v-model:open from the parent
// (value.js's DockViewSelect pattern), plus the dock's other popups.
//   xd-pinned  collapse=false: xd-select (controlled), xd-dropdown, xd-popover
//   xd-coll    collapse="open" (collapsible, mounts expanded): xd-select2 (uncontrolled)
import { ref } from "vue";
import { GlassDock, DockControl } from "@glass/components/dock";
import { DockTrigger } from "@glass/components/dock/trigger";
import { Select, SelectContent, SelectGroup, SelectItem, SelectValue } from "@glass/components/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@glass/components/menu";
import { Popover, PopoverContent } from "@glass/components/popover";
import { Home, Settings, Palette, Layers, Droplet, Grid, Image as ImageIcon } from "@lucide/vue";

const view = ref("picker");
const open = ref(false);
const view2 = ref("picker");
const pages = [
    { id: "picker", label: "Picker", icon: Palette },
    { id: "palettes", label: "Palettes", icon: Layers },
    { id: "gradient", label: "Gradient", icon: Droplet },
    { id: "mix", label: "Mix", icon: Grid },
    { id: "extract", label: "Extract", icon: ImageIcon },
];
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 40px; padding: 24px 8px 600px">
        <GlassDock data-testid="xd-pinned" aria-label="pinned" :collapse="false">
            <DockControl aria-label="Home"><Home /></DockControl>
            <Select :model-value="view" :open="open" @update:open="open = $event" @update:model-value="(v) => (view = v as string)">
                <DockTrigger for="select" aria-label="Select view" data-testid="xd-select">
                    <span class="text-small">{{ view }}</span>
                    <SelectValue class="sr-only" />
                </DockTrigger>
                <SelectContent class="min-w-[12rem]" data-testid="xd-select-content">
                    <SelectGroup>
                        <SelectItem v-for="p in pages" :key="p.id" :value="p.id" :data-testid="`xd-opt-${p.id}`">
                            <span class="flex items-center gap-2"><component :is="p.icon" class="w-4 h-4" />{{ p.label }}</span>
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <DropdownMenu>
                <DockTrigger for="dropdown" aria-label="Actions" data-testid="xd-dropdown"><Settings class="h-4 w-4" /></DockTrigger>
                <DropdownMenuContent align="center" class="w-52" data-testid="xd-dropdown-content">
                    <DropdownMenuItem data-testid="xd-dd-1">Copy</DropdownMenuItem>
                    <DropdownMenuItem>Share</DropdownMenuItem>
                    <DropdownMenuItem>Archive</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Popover>
                <DockTrigger for="popover" aria-label="Info" data-testid="xd-popover"><Layers class="h-4 w-4" /></DockTrigger>
                <PopoverContent class="w-64" data-testid="xd-popover-content">
                    <p class="text-small">A popover seated in the dock.</p>
                </PopoverContent>
            </Popover>
        </GlassDock>
        <GlassDock data-testid="xd-coll" aria-label="collapsible" collapse="open">
            <DockControl aria-label="Home"><Home /></DockControl>
            <Select v-model="view2">
                <DockTrigger for="select" aria-label="Select view 2" data-testid="xd-select2">
                    <span class="text-small">{{ view2 }}</span>
                    <SelectValue class="sr-only" />
                </DockTrigger>
                <SelectContent class="min-w-[12rem]" data-testid="xd-select2-content">
                    <SelectItem v-for="p in pages" :key="p.id" :value="p.id" :data-testid="`xd2-opt-${p.id}`">{{ p.label }}</SelectItem>
                </SelectContent>
            </Select>
            <DockControl aria-label="Settings"><Settings /></DockControl>
        </GlassDock>
    </div>
</template>
