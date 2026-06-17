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
} from "../../../src/components/ui/sheet";
import { Button } from "../../../src/components/ui/button";
import { Input } from "../../../src/components/ui/input";
import { Label } from "../../../src/components/ui/label";
import { Textarea } from "../../../src/components/ui/textarea";
import { IconChip } from "../../../src/components/custom/icon-chip";
import { PanelRight } from "@lucide/vue";
// BA.W-SUFFUSE2 — the containers band's ONE coherent --section-color-2 blue identity.
const CONTAINERS_STOP = 2;

type Side = "top" | "right" | "bottom" | "left";
const sides: readonly Side[] = ["top", "right", "bottom", "left"] as const;
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
            <IconChip :icon="PanelRight" :section="CONTAINERS_STOP" />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Containers · Sheet
                </span>
                <p class="text-small text-muted-foreground">
                    Side drawer from any edge — the sheet body stays ink; the
                    section identity is the ONE color event.
                </p>
            </div>
        </header>

        <div class="grid gap-12">
            <div class="grid gap-4">
                <h2 class="text-subheading">Four sides</h2>
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
                <h2 class="text-subheading">When to use</h2>
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
    </StoryPage>
</template>
