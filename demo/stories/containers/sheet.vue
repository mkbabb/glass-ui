<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
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


type Side = "top" | "right" | "bottom" | "left";
const sides: readonly Side[] = ["top", "right", "bottom", "left"] as const;
</script>

<template>
    <StoryPage>
        
            <StorySection heading="Four sides" gap="lg">
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
            </StorySection>

            <StorySection heading="When to use" gap="lg">
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
            </StorySection>
        
    </StoryPage>
</template>
