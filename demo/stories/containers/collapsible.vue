<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref } from "vue";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";
import { ChevronDown } from "lucide-vue-next";

const open = ref(true);
</script>

<template>
    <StoryPage>
        <CreamSurface tone="warm" class="relative overflow-hidden">
            <p
                class="section-label"
                :style="{ color: 'var(--section-color-4)' }"
            >
                § 4 · Reveal
            </p>
            <DisplayHero
                size="display-3"
                variation="wonk"
                class="mt-[var(--space-phi-1)] mb-[var(--space-phi-2)]"
                :style="{ color: 'var(--section-color-4)' }"
            >
                Show more
            </DisplayHero>
            <p class="text-prose max-w-2xl text-foreground/80">
                Collapsible — a single trigger + a single content panel. No
                accordion grouping; just an inline overflow primitive that toggles
                its child without re-mount.
            </p>
            <FlourishDivider
                tone="section-4"
                class="my-[var(--space-phi-3)]"
            />

            <div class="grid gap-12">
                <div class="grid gap-4">
                    <h2 class="font-display text-xl">Basic</h2>
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
                            <Button variant="ghost" size="icon">
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
            </div>

            <div class="grid gap-4">
                <h2 class="font-display text-xl">Inline "show more"</h2>
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
            </div>
            </div>
        </CreamSurface>
    </StoryPage>
</template>
