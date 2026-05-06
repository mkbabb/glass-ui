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
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";

const panelLayout = ref<"grid" | "list" | "board">("grid");
const flags = ref({ minimap: true, overlays: false, rulers: true });
</script>

<template>
    <StoryPage>
        <CreamSurface tone="warm" class="relative overflow-hidden">
            <p
                class="section-label"
                :style="{ color: 'var(--section-color-8)' }"
            >
                § 8 · Anchored menus
            </p>
            <DisplayHero
                size="display-3"
                variation="wonk"
                class="mt-[var(--space-phi-1)] mb-[var(--space-phi-2)]"
                :style="{ color: 'var(--section-color-8)' }"
            >
                Trigger and panel
            </DisplayHero>
            <p class="text-prose max-w-2xl text-foreground/80">
                Dropdown menu anchors to a button — radio groups, checkbox items,
                shortcuts, separators, sub-menus. The full reka-ui menu vocabulary in
                one trigger, glass-tier surface, kebab text on destructive items.
            </p>
            <FlourishDivider
                tone="section-8"
                class="my-[var(--space-phi-3)]"
            />

            <div class="grid gap-12">
                <div class="grid gap-4">
                    <h2 class="font-display text-xl">Composed menu</h2>
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

                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Layout</DropdownMenuLabel>
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
        </CreamSurface>
    </StoryPage>
</template>
