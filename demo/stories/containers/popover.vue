<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@glass/components/ui/popover";
import { Button } from "@glass/components/ui/button";
import { Input } from "@glass/components/ui/input";
import { Label } from "@glass/components/ui/label";
import { IconChip } from "@glass/components/custom/icon-chip";
import { MessageCircle } from "@lucide/vue";

// BC.W-SUFFUSE-reconcile — the containers band's ONE coherent --section-color-2
// blue identity. PH3-safe (inline borderLeft, not the border-l-[3px] +
// <IconChip> double-header shape).
const CONTAINERS_STOP = 2;

type Side = "top" | "right" | "bottom" | "left";
const sides: readonly Side[] = ["top", "right", "bottom", "left"] as const;
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
            <IconChip :icon="MessageCircle" :section="CONTAINERS_STOP" bloom reveal />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Containers · Popover
                </span>
                <p class="text-small text-muted-foreground">
                    Click-anchored floating panels — the container identity is the
                    ONE color event.
                </p>
            </div>
        </header>

        <div class="grid gap-12">
            <StorySection heading="Form pod" gap="lg">
                <p class="text-sm text-muted-foreground">
                    A typical two-field editor anchored to a button.
                </p>
                <Popover>
                    <PopoverTrigger as-child>
                        <Button variant="outline">Dimensions</Button>
                    </PopoverTrigger>
                    <PopoverContent class="w-80">
                        <div class="grid gap-3">
                            <div>
                                <h4 class="font-display text-base">Dimensions</h4>
                                <p class="text-xs text-muted-foreground">
                                    Set width and height in grid cells.
                                </p>
                            </div>
                            <div class="grid grid-cols-[1fr_auto] items-center gap-3">
                                <Label for="w">Width</Label>
                                <Input id="w" default-value="8" class="w-20" />
                                <Label for="h">Height</Label>
                                <Input id="h" default-value="4" class="w-20" />
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </StorySection>

            <StorySection heading="Placement" gap="lg">
                <p class="text-sm text-muted-foreground">
                    <code class="font-mono text-xs">side</code> controls the
                    preferred edge; Floating UI flips if there's not enough room.
                </p>
                <div class="grid place-items-center py-12">
                    <div class="grid grid-cols-3 gap-6">
                        <div />
                        <Popover>
                            <PopoverTrigger as-child>
                                <Button variant="outline">Top</Button>
                            </PopoverTrigger>
                            <PopoverContent side="top">
                                <p class="font-mono text-xs">side=top</p>
                            </PopoverContent>
                        </Popover>
                        <div />
                        <Popover>
                            <PopoverTrigger as-child>
                                <Button variant="outline">Left</Button>
                            </PopoverTrigger>
                            <PopoverContent side="left">
                                <p class="font-mono text-xs">side=left</p>
                            </PopoverContent>
                        </Popover>
                        <div />
                        <Popover>
                            <PopoverTrigger as-child>
                                <Button variant="outline">Right</Button>
                            </PopoverTrigger>
                            <PopoverContent side="right">
                                <p class="font-mono text-xs">side=right</p>
                            </PopoverContent>
                        </Popover>
                        <div />
                        <Popover>
                            <PopoverTrigger as-child>
                                <Button variant="outline">Bottom</Button>
                            </PopoverTrigger>
                            <PopoverContent side="bottom">
                                <p class="font-mono text-xs">side=bottom</p>
                            </PopoverContent>
                        </Popover>
                        <div />
                    </div>
                </div>
                <div class="flex flex-wrap items-center gap-3 pt-4 border-t border-border">
                    <span class="text-xs text-muted-foreground font-mono">
                        align:
                    </span>
                    <Popover v-for="side in sides" :key="side">
                        <PopoverTrigger as-child>
                            <Button variant="ghost" size="sm" class="capitalize">
                                {{ side }}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent :align="side === 'left' ? 'start' : side === 'right' ? 'end' : 'center'" class="w-auto">
                            <p class="font-mono text-xs">align variant</p>
                        </PopoverContent>
                    </Popover>
                </div>
            </StorySection>
        </div>
    </StoryPage>
</template>
