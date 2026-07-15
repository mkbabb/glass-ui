<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { ref } from "vue";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@glass/components/collapsible";
import { Button } from "@glass/components/button";
import { IconChip } from "@glass/components/icon-chip";
import { ChevronDown } from "@lucide/vue";

// BC.W-SUFFUSE-reconcile — the containers band's ONE coherent --section-color-2
// blue identity. PH3-safe (inline borderLeft, not the border-l-[3px] +
// <IconChip> double-header shape).
const CONTAINERS_STOP = 2;

const open = ref(true);
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
            <IconChip :icon="ChevronDown" :section="CONTAINERS_STOP" bloom reveal />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Containers · Collapsible
                </span>
                <p class="text-small text-muted-foreground">
                    A single show/hide region — the container identity is the ONE
                    color event.
                </p>
            </div>
        </header>

            <StorySection heading="Basic" gap="lg">
                <p class="text-sm text-muted-foreground">
                    Open — <code class="font-mono text-xs">{{ open }}</code>.
                </p>
                <Collapsible
                    v-model:open="open"
                    class="grid gap-2 rounded-xl border border-border bg-card/50 p-4"
                >
                    <div class="flex items-center justify-between">
                        <p class="font-display text-base">Build artifacts</p>
                        <CollapsibleTrigger as-child>
                            <Button variant="ghost" iconOnly>
                                <ChevronDown
                                    class="size-4 transition-transform"
                                    :class="open ? 'rotate-180' : ''"
                                />
                                <span class="sr-only">Toggle</span>
                            </Button>
                        </CollapsibleTrigger>
                    </div>
                    <div
                        class="font-mono text-xs text-muted-foreground rounded-md border border-border bg-background/50 px-3 py-2"
                    >
                        dist/glass-ui.js — 142.3 kB
                    </div>
                    <CollapsibleContent class="grid gap-2">
                        <div
                            class="font-mono text-xs text-muted-foreground rounded-md border border-border bg-background/50 px-3 py-2"
                        >
                            dist/glass-ui.css — 38.9 kB
                        </div>
                        <div
                            class="font-mono text-xs text-muted-foreground rounded-md border border-border bg-background/50 px-3 py-2"
                        >
                            dist/index.d.ts — 12.4 kB
                        </div>
                        <div
                            class="font-mono text-xs text-muted-foreground rounded-md border border-border bg-background/50 px-3 py-2"
                        >
                            dist/assets/paper-clean.svg — 1.1 kB
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </StorySection>

            <StorySection heading="Inline &quot;show more&quot;" gap="lg">
                <p class="text-sm text-muted-foreground">
                    Wrap an overflow paragraph in
                    <code class="font-mono text-xs">CollapsibleContent</code>;
                    the trigger toggles it.
                </p>
                <Collapsible class="grid gap-3">
                    <p class="text-sm leading-relaxed">
                        Fourier's series represents any periodic function on the
                        circle as an infinite sum of harmonically related sines
                        and cosines.
                    </p>
                    <CollapsibleContent class="grid gap-2 text-sm leading-relaxed text-muted-foreground">
                        <p>
                            The coefficients are inner products against the
                            basis — projection onto an orthonormal family.
                        </p>
                        <p>
                            Convergence is subtle. Pointwise convergence fails
                            in general; L² convergence succeeds for every
                            square-integrable function.
                        </p>
                    </CollapsibleContent>
                    <CollapsibleTrigger as-child>
                        <Button variant="link" class="justify-self-start px-0">
                            Toggle details
                        </Button>
                    </CollapsibleTrigger>
                </Collapsible>
            </StorySection>
        
    </StoryPage>
</template>
