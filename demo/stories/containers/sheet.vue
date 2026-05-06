<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
                :style="{ color: 'var(--section-color-11)' }"
            >
                § 11 · Edge panels
            </p>
            <DisplayHero
                size="display-3"
                variation="wonk"
                class="mt-[var(--space-phi-1)] mb-[var(--space-phi-2)]"
                :style="{ color: 'var(--section-color-11)' }"
            >
                Slides from the side
            </DisplayHero>
            <p class="text-prose max-w-2xl text-foreground/80">
                Sheet enters from any of four edges — top / right / bottom / left. The
                canonical detail-pane: multi-field inspector, configurator, side editor.
                Hosts the demo configurator on the right rail behind the comma shortcut.
            </p>
            <FlourishDivider
                tone="section-11"
                class="my-[var(--space-phi-3)]"
            />

            <div class="grid gap-12">
                <div class="grid gap-4">
                    <h2 class="font-display text-xl">Four sides</h2>
                <p class="text-sm text-muted-foreground">
                    Each trigger opens its own sheet — identical body, different
                    <code class="font-mono text-xs">side</code> prop.
                </p>
                <div class="flex flex-wrap gap-3">
                    <Sheet v-for="side in sides" :key="side">
                        <SheetTrigger as-child>
                            <Button variant="outline" class="capitalize">
                                Open {{ side }}
                            </Button>
                        </SheetTrigger>
                        <SheetContent :side="side">
                            <SheetHeader>
                                <SheetTitle class="capitalize">
                                    {{ side }} sheet
                                </SheetTitle>
                                <SheetDescription>
                                    Slides in from the {{ side }} edge. Esc or
                                    overlay-click dismisses.
                                </SheetDescription>
                            </SheetHeader>
                            <div class="grid gap-4 py-4">
                                <div class="grid gap-2">
                                    <Label for="name">Name</Label>
                                    <Input id="name" placeholder="workspace-01" />
                                </div>
                                <div class="grid gap-2">
                                    <Label for="notes">Notes</Label>
                                    <Textarea
                                        id="notes"
                                        placeholder="Free-form text…"
                                        class="min-h-24"
                                    />
                                </div>
                            </div>
                            <SheetFooter>
                                <SheetClose as-child>
                                    <Button variant="outline">Cancel</Button>
                                </SheetClose>
                                <SheetClose as-child>
                                    <Button>Save changes</Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            <div class="grid gap-4">
                <h2 class="font-display text-xl">When to use</h2>
                <ul class="list-disc pl-6 text-sm text-muted-foreground grid gap-1">
                    <li>
                        Detail / inspector panels that reveal alongside the primary
                        view rather than replacing it.
                    </li>
                    <li>
                        Multi-field forms where a <code class="font-mono">Dialog</code>
                        would feel cramped.
                    </li>
                    <li>
                        Host for the demo configurator on the right edge — toggled
                        from the <code class="font-mono">,</code> shortcut.
                    </li>
                </ul>
            </div>
            </div>
        </CreamSurface>
    </StoryPage>
</template>
