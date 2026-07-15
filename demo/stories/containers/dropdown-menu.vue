<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
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
} from "@glass/components/dropdown-menu";
import { Button } from "@glass/components/button";
import { Badge } from "@glass/components/badge";
import { Card } from "@glass/components/card";
import { IconChip } from "@glass/components/icon-chip";
import { Menu, MoreHorizontal } from "@lucide/vue";

// BC.W-SUFFUSE-reconcile — the containers band's ONE coherent --section-color-2
// blue identity. PH3-safe (inline borderLeft, not the border-l-[3px] +
// <IconChip> double-header shape).
const CONTAINERS_STOP = 2;

const panelLayout = ref<"grid" | "list" | "board">("grid");
const flags = ref({ minimap: true, overlays: false, rulers: true });
</script>

<template>
    <StoryPage>
        <header
            class="flex items-center gap-4 pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${CONTAINERS_STOP})`,
                borderLeft:
                    '3px solid color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="Menu" :section="CONTAINERS_STOP" bloom reveal />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Containers · Dropdown menu
                </span>
                <p class="text-small text-muted-foreground">
                    Trigger-anchored action menus — the container identity is the
                    ONE color event.
                </p>
            </div>
        </header>

            <StorySection heading="Composed menu" gap="lg">
                <p class="text-sm text-muted-foreground">
                    One trigger, every subcomponent.
                </p>
                <!-- The lone trigger is wrapped in the `flex flex-wrap` idiom so it
                     sizes to its content, never balloons to the article width (the
                     StorySection body is align-items:stretch — CBA-1/CBA-7). -->
                <div class="flex flex-wrap gap-3">
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
                </div>

                <!-- CBA-3: the menu's bound state is a VISIBLE teaching canvas, not a
                     mono debug line. The workspace mock re-lays itself to the chosen
                     layout and lights the active overlays — the menu's effect is the
                     affordance. -->
                <Card surface="veil" class="flex flex-col gap-3 p-5">
                    <div class="flex items-center justify-between">
                        <span class="text-admin-label capitalize">{{ panelLayout }} layout</span>
                        <div class="flex flex-wrap gap-1.5">
                            <Badge v-if="flags.minimap" variant="secondary">Minimap</Badge>
                            <Badge v-if="flags.overlays" variant="secondary">Paper overlay</Badge>
                            <Badge v-if="flags.rulers" variant="secondary">Rulers</Badge>
                        </div>
                    </div>
                    <div
                        class="relative grid gap-2 rounded-md p-3"
                        :class="{
                            'grid-cols-3': panelLayout === 'grid',
                            'grid-cols-1': panelLayout === 'list',
                            'grid-flow-col auto-cols-fr': panelLayout === 'board',
                            'bg-section-2/8': flags.overlays,
                        }"
                        :style="flags.rulers ? { outline: '1px dashed color-mix(in srgb, var(--section-color-2) 45%, transparent)', outlineOffset: '2px' } : {}"
                    >
                        <div
                            v-for="cell in panelLayout === 'grid' ? 6 : panelLayout === 'board' ? 3 : 4"
                            :key="cell"
                            class="h-10 rounded bg-section-2/15"
                            :class="panelLayout === 'board' ? 'min-h-24' : ''"
                        />
                        <span
                            v-if="flags.minimap"
                            class="pointer-events-none absolute bottom-3 right-3 h-8 w-12 rounded border border-section-2/40 bg-section-2/20"
                        />
                    </div>
                </Card>
            </StorySection>

            <StorySection heading="Trigger variants + states" gap="lg">
                <p class="text-sm text-muted-foreground">
                    The trigger is any <code class="font-mono text-xs">Button</code>;
                    items carry their own <code class="font-mono text-xs">disabled</code>
                    edge, and a disabled trigger never opens.
                </p>
                <Card surface="veil" class="flex flex-wrap items-center gap-3 p-5">
                    <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                            <Button variant="ghost" iconOnly aria-label="Row actions">
                                <MoreHorizontal aria-hidden="true" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent class="w-48">
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem>Share…</DropdownMenuItem>
                            <DropdownMenuItem disabled>
                                Archive (no access)
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem class="text-destructive">
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                            <Button variant="outline" size="sm">Compact menu</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent class="w-40">
                            <DropdownMenuItem>Rename</DropdownMenuItem>
                            <DropdownMenuItem>Move…</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                            <Button variant="outline" disabled>Disabled trigger</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Never reached</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </Card>
            </StorySection>

    </StoryPage>
</template>
