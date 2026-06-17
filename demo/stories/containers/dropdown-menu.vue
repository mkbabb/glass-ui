<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref } from "vue";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "../../../src/components/ui/dropdown-menu";
import { Button } from "../../../src/components/ui/button";
import { IconChip } from "../../../src/components/custom/icon-chip";
import { Menu } from "@lucide/vue";
// BA.W-SUFFUSE2 — the containers band's ONE coherent --section-color-2 blue identity.
const CONTAINERS_STOP = 2;

const panelLayout = ref<"grid" | "list" | "board">("grid");
const flags = ref({ minimap: true, overlays: false, rulers: true });
</script>

<template>
    <StoryPage>
        <!-- BA.W-SUFFUSE2 — the containers-band identity event family on --section-color-2. -->
        <header
            class="flex items-center gap-4 border-l-[3px] pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${CONTAINERS_STOP})`,
                borderColor:
                    'color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="Menu" :section="CONTAINERS_STOP" />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Containers · Dropdown menu
                </span>
                <p class="text-small text-muted-foreground">
                    Triggered menu with groups and checks — the items stay ink; the
                    section identity is the ONE color event.
                </p>
            </div>
        </header>

        <div class="grid gap-12">
            <div class="grid gap-4">
                <h2 class="text-subheading">Composed menu</h2>
                <p class="text-sm text-muted-foreground">
                    One trigger, every subcomponent.
                </p>
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button variant="outline">Open menu</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent class="w-64">
                        <DropdownMenuLabel>Workspace</DropdownMenuLabel>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                New file
                                <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                New folder
                                <DropdownMenuShortcut>⇧⌘N</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    Open recent…
                                </DropdownMenuSubTrigger>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem>atlas.ts</DropdownMenuItem>
                                    <DropdownMenuItem>colors.css</DropdownMenuItem>
                                    <DropdownMenuItem>spec.md</DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>
                        </DropdownMenuGroup>

                        <!-- BA.W-MENU-GLASS — the in-repo 2nd consumer of the
                             `.glass-menu-section` recipe (the library menu defaults
                             are consumer #1; the slides DeckSettings is the named
                             foreign downstream consumer). The section caption reads
                             the mono small-caps register; the hairline divides the
                             row group above. -->
                        <DropdownMenuLabel
                            class="glass-menu-section glass-menu-section-label"
                        >
                            Layout
                        </DropdownMenuLabel>
                        <DropdownMenuRadioGroup v-model="panelLayout">
                            <DropdownMenuRadioItem value="grid">
                                Grid
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="list">
                                List
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="board">
                                Board
                            </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>

                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Overlays</DropdownMenuLabel>
                        <DropdownMenuCheckboxItem v-model="flags.minimap">
                            Minimap
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem v-model="flags.overlays">
                            Paper overlay
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem v-model="flags.rulers">
                            Rulers
                        </DropdownMenuCheckboxItem>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem class="text-destructive">
                            Delete workspace
                            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <div
                    class="rounded-lg border border-border bg-card/50 px-3 py-2 font-mono text-xs"
                >
                    layout = {{ panelLayout }} · minimap = {{ flags.minimap }} ·
                    overlays = {{ flags.overlays }} · rulers = {{ flags.rulers }}
                </div>
            </div>
        </div>
    </StoryPage>
</template>
