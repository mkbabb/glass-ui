<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { Popover, PopoverContent, PopoverTrigger } from "@glass/components/popover";
import { Button } from "@glass/components/button";
import { Surface } from "@glass/components/surface";
import { Input } from "@glass/components/input";
import { Label } from "@glass/components/label";

// BC.W-SUFFUSE-reconcile — the containers band's ONE coherent --section-color-2
// blue identity. PH3-safe (inline borderLeft, not the border-l-[3px] +

type Side = "top" | "right" | "bottom" | "left";
const sides: readonly Side[] = ["top", "right", "bottom", "left"] as const;
</script>

<template>
    <StoryPage>

        <div class="grid gap-12">
            <StorySection heading="Form pod" gap="lg">
                <p class="text-sm text-muted-foreground">
                    A typical two-field editor anchored to a button.
                </p>
                <!-- The lone trigger is wrapped in the `flex flex-wrap` idiom so it
                     sizes to its content, never balloons to the article width (the
                     StorySection body is align-items:stretch — CBA-1/CBA-7). -->
                <div class="flex flex-wrap gap-3">
                    <Popover>
                        <PopoverTrigger as-child>
                            <Button>Dimensions</Button>
                        </PopoverTrigger>
                        <PopoverContent class="w-80">
                            <div class="grid gap-3">
                                <div>
                                    <h4 class="font-display text-base">Dimensions</h4>
                                    <p class="text-xs text-muted-foreground">
                                        Set width and height in grid cells.
                                    </p>
                                </div>
                                <div
                                    class="grid grid-cols-[1fr_auto] items-center gap-3"
                                >
                                    <Label for="w">Width</Label>
                                    <Input id="w" default-value="8" class="w-20" />
                                    <Label for="h">Height</Label>
                                    <Input id="h" default-value="4" class="w-20" />
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </StorySection>

            <StorySection heading="Pointer-adaptive preview" gap="lg">
                <p class="text-sm text-muted-foreground">
                    Hover or focus on a fine pointer; tap on a coarse pointer. The
                    same public trigger promotes to a tap-toggle surface when hover
                    is unavailable, so the content never becomes pointer-exclusive.
                </p>
                <Surface
                    material="content"
                    surface="veil"
                    class="flex min-h-40 items-center justify-center p-5"
                >
                    <Popover trigger="hover" :open-delay="120" :close-delay="120">
                        <PopoverTrigger as-child>
                            <Button>Inspect Fourier profile</Button>
                        </PopoverTrigger>
                        <PopoverContent
                            aria-label="Fourier profile"
                            class="w-72"
                        >
                            <div class="grid gap-3">
                                <div>
                                    <h4 class="font-display text-base">
                                        Fourier profile
                                    </h4>
                                    <p class="text-xs text-muted-foreground">
                                        A stable harmonic blend for quiet motion.
                                    </p>
                                </div>
                                <dl class="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                                    <dt class="text-muted-foreground">Terms</dt>
                                    <dd class="font-mono text-right">8</dd>
                                    <dt class="text-muted-foreground">Falloff</dt>
                                    <dd class="font-mono text-right">1.62</dd>
                                    <dt class="text-muted-foreground">Loop</dt>
                                    <dd class="font-mono text-right">24 s</dd>
                                </dl>
                            </div>
                        </PopoverContent>
                    </Popover>
                </Surface>
            </StorySection>

            <StorySection heading="Placement" gap="lg">
                <p class="text-sm text-muted-foreground">
                    <code class="font-mono text-xs">side</code> controls the preferred
                    edge; Floating UI flips if there's not enough room.
                </p>
                <div class="grid place-items-center py-12">
                    <div class="grid grid-cols-3 gap-6">
                        <div />
                        <Popover>
                            <PopoverTrigger as-child>
                                <Button>Top</Button>
                            </PopoverTrigger>
                            <PopoverContent side="top">
                                <p class="font-mono text-xs">side=top</p>
                            </PopoverContent>
                        </Popover>
                        <div />
                        <Popover>
                            <PopoverTrigger as-child>
                                <Button>Left</Button>
                            </PopoverTrigger>
                            <PopoverContent side="left">
                                <p class="font-mono text-xs">side=left</p>
                            </PopoverContent>
                        </Popover>
                        <div />
                        <Popover>
                            <PopoverTrigger as-child>
                                <Button>Right</Button>
                            </PopoverTrigger>
                            <PopoverContent side="right">
                                <p class="font-mono text-xs">side=right</p>
                            </PopoverContent>
                        </Popover>
                        <div />
                        <Popover>
                            <PopoverTrigger as-child>
                                <Button>Bottom</Button>
                            </PopoverTrigger>
                            <PopoverContent side="bottom">
                                <p class="font-mono text-xs">side=bottom</p>
                            </PopoverContent>
                        </Popover>
                        <div />
                    </div>
                </div>
                <div
                    class="flex flex-wrap items-center gap-3 pt-4 border-t border-border"
                >
                    <span class="text-xs text-muted-foreground font-mono">
                        align:
                    </span>
                    <Popover v-for="side in sides" :key="side">
                        <PopoverTrigger as-child>
                            <Button emphasis="quiet" size="sm" class="capitalize">
                                {{ side }}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            :align="
                                side === 'left'
                                    ? 'start'
                                    : side === 'right'
                                      ? 'end'
                                      : 'center'
                            "
                            class="w-auto"
                        >
                            <p class="font-mono text-xs">align variant</p>
                        </PopoverContent>
                    </Popover>
                </div>
            </StorySection>

            <StorySection heading="Trigger states" gap="lg">
                <p class="text-sm text-muted-foreground">
                    The trigger is an ordinary
                    <code class="font-mono text-xs">Button</code> — any variant, size,
                    or the disabled edge. A disabled trigger never opens and drops out
                    of the tab order.
                </p>
                <Surface
                    material="content"
                    surface="veil"
                    class="flex flex-wrap items-center gap-3 p-5"
                >
                    <Popover>
                        <PopoverTrigger as-child>
                            <Button>Primary</Button>
                        </PopoverTrigger>
                        <PopoverContent class="w-auto">
                            <p class="text-small">Solid trigger.</p>
                        </PopoverContent>
                    </Popover>
                    <Popover>
                        <PopoverTrigger as-child>
                            <Button size="sm">Outline · sm</Button>
                        </PopoverTrigger>
                        <PopoverContent class="w-auto">
                            <p class="text-small">Compact outline trigger.</p>
                        </PopoverContent>
                    </Popover>
                    <Popover>
                        <PopoverTrigger as-child>
                            <Button emphasis="quiet">Ghost</Button>
                        </PopoverTrigger>
                        <PopoverContent class="w-auto">
                            <p class="text-small">Ghost trigger.</p>
                        </PopoverContent>
                    </Popover>
                    <Popover>
                        <PopoverTrigger as-child>
                            <Button disabled>Disabled</Button>
                        </PopoverTrigger>
                        <PopoverContent class="w-auto">
                            <p class="text-small">Never reached.</p>
                        </PopoverContent>
                    </Popover>
                </Surface>
            </StorySection>
        </div>
    </StoryPage>
</template>
