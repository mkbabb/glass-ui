<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
// Gallery of the Vue <Transition> class-sets shipped in `src/styles/transitions.css`.
// Each card hosts one v-if toggle + a sample element wearing that transition's classes.
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";
import { cn } from "@/utils/cn";

interface Demo {
    id: string;
    name: string;
    blurb: string;
    cssClass: string; // Transition name prop → matches .<name>-enter-active etc.
}

const demos: Demo[] = [
    {
        id: "fade",
        name: "fade",
        blurb: "Symmetric, fast opacity — the plainest tool in the box.",
        cssClass: "fade",
    },
    {
        id: "fade-slide",
        name: "fade-slide",
        blurb: "Spring-entered, accelerate-out translateY — menus, hints, floaters.",
        cssClass: "fade-slide",
    },
    {
        id: "pop",
        name: "pop",
        blurb: "Bouncy scale-up, brisk ease-out exit — popovers, badges.",
        cssClass: "pop",
    },
    {
        id: "dialog-scale",
        name: "dialog-scale",
        blurb: "Dialog-appropriate: slow bouncy entry, measured exit.",
        cssClass: "dialog-scale",
    },
    {
        id: "dropdown",
        name: "dropdown",
        blurb: "Instant opacity, snappy spring transform — menus.",
        cssClass: "dropdown",
    },
    {
        id: "tab-fade",
        name: "tab-fade",
        blurb: "Fast opacity-only swap — tab panels, pane crossfades.",
        cssClass: "tab-fade",
    },
];

const visible = ref<Record<string, boolean>>(
    Object.fromEntries(demos.map((d) => [d.id, true])),
);

function toggle(id: string): void {
    visible.value[id] = !visible.value[id];
}
</script>

<template>
    <StoryPage>
        <CreamSurface tone="warm" class="relative overflow-hidden">
            <header class="flex flex-col items-center gap-[var(--space-phi-2)] text-center">
                <p
                    class="section-label"
                    :style="{ color: 'var(--section-color-4)' }"
                >
                    § 4 · enter and leave
                </p>
                <DisplayHero
                    size="display-3"
                    variation="wonk"
                    :style="{ color: 'var(--section-color-4)' }"
                >
                    Transitions
                </DisplayHero>
                <p class="text-prose max-w-prose text-foreground/80">
                    Six named Vue <code class="fira-code">&lt;Transition&gt;</code> class-sets
                    shipped in <code class="fira-code">styles/transitions.css</code> — fade,
                    fade-slide, pop, dialog-scale, dropdown, tab-fade. Toggle each card to
                    feel the entry/exit shape.
                </p>
            </header>

            <FlourishDivider tone="section-4" class="my-[var(--space-phi-3)]" />

            <section class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                <div
                    v-for="demo in demos"
                    :key="demo.id"
                    :class="
                        cn(
                            'flex flex-col gap-4 rounded-card border border-border bg-card p-5',
                            'shadow-cartoon',
                        )
                    "
                >
                    <div class="flex flex-col gap-1">
                        <code class="fira-code text-small text-foreground">
                            {{ demo.name }}
                        </code>
                        <p class="text-small text-muted-foreground">{{ demo.blurb }}</p>
                    </div>

                    <div
                        :class="
                            cn(
                                'relative flex h-28 items-center justify-center',
                                'rounded-panel border border-border/60 bg-background/40',
                                'overflow-hidden',
                            )
                        "
                    >
                        <Transition :name="demo.cssClass">
                            <div
                                v-if="visible[demo.id]"
                                :class="
                                    cn(
                                        'flex h-16 w-40 items-center justify-center rounded-panel',
                                        'text-small font-medium text-white',
                                        'shadow-cartoon-sm',
                                    )
                                "
                                :style="{ backgroundColor: 'var(--section-color-4)' }"
                            >
                                hello
                            </div>
                        </Transition>
                    </div>

                    <div class="flex items-center justify-between">
                        <span class="text-mono-caption text-muted-foreground">
                            v-if · {{ visible[demo.id] ? "true" : "false" }}
                        </span>
                        <Button size="sm" variant="secondary" @click="toggle(demo.id)">
                            Toggle
                        </Button>
                    </div>
                </div>
            </section>
        </CreamSurface>
    </StoryPage>
</template>
