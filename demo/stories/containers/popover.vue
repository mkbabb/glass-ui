<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";

type Side = "top" | "right" | "bottom" | "left";
const sides: readonly Side[] = ["top", "right", "bottom", "left"] as const;
</script>

<template>
    <StoryPage>
        <CreamSurface tone="warm" class="relative overflow-hidden">
            <p
                class="section-label"
                :style="{ color: 'var(--section-color-10)' }"
            >
                § 10 · Form pods
            </p>
            <DisplayHero
                size="display-3"
                variation="wonk"
                class="mt-[var(--space-phi-1)] mb-[var(--space-phi-2)]"
                :style="{ color: 'var(--section-color-10)' }"
            >
                Anchored editors
            </DisplayHero>
            <p class="text-prose max-w-2xl text-foreground/80">
                Popover floats a small, click-anchored panel — typical use is a two-or-three-field
                editor that doesn't deserve a dialog. Side prop sets the preferred edge;
                Floating UI flips when the viewport is tight.
            </p>
            <FlourishDivider
                tone="section-10"
                class="my-[var(--space-phi-3)]"
            />

            <div class="grid gap-12">
                <div class="grid gap-4">
                    <h2 class="font-display text-xl">Form pod</h2>
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
            </div>

            <div class="grid gap-4">
                <h2 class="font-display text-xl">Placement</h2>
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
            </div>
            </div>
        </CreamSurface>
    </StoryPage>
</template>
