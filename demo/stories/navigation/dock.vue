<script setup lang="ts">
import { ref } from "vue";
import {
    Home, Search, Bell, Settings, Plus, Share2, Download,
    ChevronDown, Play, Pause, SkipBack, SkipForward,
} from "lucide-vue-next";
import { GlassDock, DockPopover } from "@/components/custom/dock";

const playing = ref(false);
const track = ref("The Garden");
const tracks = ["The Garden", "Morning Weft", "Carmine Drift", "Salt & Slate"];

function togglePlay() {
    playing.value = !playing.value;
}
</script>

<template>
    <div class="flex flex-col gap-12 p-8 max-w-5xl mx-auto">
        <header class="flex flex-col gap-1">
            <p class="text-xs uppercase tracking-widest text-muted-foreground">Navigation · GlassDock</p>
            <h1 class="text-3xl font-display">Glass Dock</h1>
            <p class="text-sm text-muted-foreground max-w-prose">
                Collapsible glass pill. Default slot is the expanded row; <code class="rounded bg-muted px-1">#collapsed</code>
                slot is the compact summary. Hover or focus expands; click the collapsed pill toggles.
                <code class="rounded bg-muted px-1">DockPopover</code> hosts a trigger button with a portaled panel.
            </p>
        </header>

        <section class="flex flex-col gap-3">
            <h2 class="text-sm font-semibold text-muted-foreground">Collapsible (hover to expand)</h2>
            <div class="flex justify-center rounded-[var(--radius-card)] border border-border/40 bg-card/40 p-8">
                <GlassDock>
                    <button class="dock-icon-btn" aria-label="Home"><Home class="h-4 w-4" /></button>
                    <button class="dock-icon-btn" aria-label="Search"><Search class="h-4 w-4" /></button>
                    <div class="dock-separator" />
                    <button class="dock-icon-btn" aria-label="Notifications"><Bell class="h-4 w-4" /></button>
                    <button class="dock-icon-btn" aria-label="Settings"><Settings class="h-4 w-4" /></button>
                    <template #collapsed>
                        <Home class="h-4 w-4" />
                    </template>
                </GlassDock>
            </div>
        </section>

        <section class="flex flex-col gap-3">
            <h2 class="text-sm font-semibold text-muted-foreground">Always expanded — media transport</h2>
            <div class="flex justify-center rounded-[var(--radius-card)] border border-border/40 bg-card/40 p-8">
                <GlassDock always-expanded>
                    <button class="dock-icon-btn" aria-label="Previous"><SkipBack class="h-4 w-4" /></button>
                    <button
                        class="dock-icon-btn"
                        :aria-pressed="playing"
                        :aria-label="playing ? 'Pause' : 'Play'"
                        @click="togglePlay"
                    >
                        <Pause v-if="playing" class="h-4 w-4" />
                        <Play v-else class="h-4 w-4" />
                    </button>
                    <button class="dock-icon-btn" aria-label="Next"><SkipForward class="h-4 w-4" /></button>
                    <div class="dock-separator" />
                    <span class="px-2 text-xs text-muted-foreground tabular-nums max-w-36 truncate">
                        {{ track }}
                    </span>
                </GlassDock>
            </div>
        </section>

        <section class="flex flex-col gap-3">
            <h2 class="text-sm font-semibold text-muted-foreground">With popover triggers</h2>
            <p class="text-sm text-muted-foreground">
                DockPopover pins the parent dock open while active, auto-flips direction, and click-closes.
            </p>
            <div class="flex justify-center rounded-[var(--radius-card)] border border-border/40 bg-card/40 p-8">
                <GlassDock always-expanded>
                    <button class="dock-icon-btn" aria-label="New"><Plus class="h-4 w-4" /></button>

                    <DockPopover direction="down">
                        <template #trigger>
                            <Share2 class="h-4 w-4" />
                        </template>
                        <div class="flex min-w-44 flex-col gap-1 p-1">
                            <p class="px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">Share</p>
                            <button class="rounded px-2 py-1.5 text-left text-sm hover:bg-muted">Copy link</button>
                            <button class="rounded px-2 py-1.5 text-left text-sm hover:bg-muted">Email</button>
                            <button class="rounded px-2 py-1.5 text-left text-sm hover:bg-muted">Embed</button>
                        </div>
                    </DockPopover>

                    <DockPopover direction="down" align="end">
                        <template #trigger>
                            <Download class="h-4 w-4" />
                        </template>
                        <div class="flex min-w-44 flex-col gap-1 p-1">
                            <p class="px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">Export</p>
                            <button class="rounded px-2 py-1.5 text-left text-sm hover:bg-muted">PNG</button>
                            <button class="rounded px-2 py-1.5 text-left text-sm hover:bg-muted">SVG</button>
                            <button class="rounded px-2 py-1.5 text-left text-sm hover:bg-muted">PDF</button>
                        </div>
                    </DockPopover>

                    <div class="dock-separator" />

                    <DockPopover direction="down">
                        <template #trigger>
                            <div class="flex items-center gap-1">
                                <span class="text-xs">Track</span>
                                <ChevronDown class="h-3 w-3 opacity-60" />
                            </div>
                        </template>
                        <div class="flex min-w-44 flex-col gap-1 p-1">
                            <button
                                v-for="t in tracks"
                                :key="t"
                                :class="['rounded px-2 py-1.5 text-left text-sm hover:bg-muted', track === t && 'bg-muted font-medium']"
                                @click="track = t"
                            >
                                {{ t }}
                            </button>
                        </div>
                    </DockPopover>
                </GlassDock>
            </div>
        </section>

        <section class="flex flex-col gap-2 text-sm text-muted-foreground">
            <h2 class="text-sm font-semibold text-foreground">Notes</h2>
            <ul class="list-disc pl-5 space-y-1">
                <li>Collapse delay is ref-counted — any popover or nested keep-open source pins it.</li>
                <li>The collapsed pill renders via the named <code class="rounded bg-muted px-1">#collapsed</code> slot.</li>
                <li>Use <code class="rounded bg-muted px-1">dock-icon-btn</code> utility for flush-fit buttons inside.</li>
            </ul>
        </section>
    </div>
</template>
