<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
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


const panelLayout = ref<"grid" | "list" | "board">("grid");
const flags = ref({ minimap: true, overlays: false, rulers: true });
</script>

<template>
    <StoryPage>
        
            <StorySection heading="Composed menu" gap="lg">
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
            </StorySection>
        
    </StoryPage>
</template>
