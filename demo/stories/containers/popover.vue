<script setup lang="ts">
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Side = "top" | "right" | "bottom" | "left";
const sides: readonly Side[] = ["top", "right", "bottom", "left"] as const;
</script>

<template>
    <section class="mx-auto max-w-5xl px-8 py-16">
        <header class="mb-12 grid gap-3">
            <p class="font-mono text-2xs uppercase tracking-[0.2em] text-muted-foreground">
                Containers · Popover
            </p>
            <h1 class="font-display text-5xl leading-tight">Popover</h1>
            <p class="max-w-2xl text-lg text-muted-foreground">
                Click-anchored floating panel. Lightweight container for small
                forms, settings pods, and contextual tooltips that exceed what a
                <code class="font-mono text-sm">Tooltip</code> should carry.
            </p>
        </header>

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
    </section>
</template>
