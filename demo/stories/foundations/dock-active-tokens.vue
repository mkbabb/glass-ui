<script setup lang="ts">
// dock-icon-button token ladder — the active-state vocabulary.
//
// Five `--dock-active-{bg,color,scale,border,shadow}` tokens collapse the
// hardcoded active recipe at `.dock-icon-button:is(.is-active, ...)`. The
// demo shows each token's default plus 2 override scopes — the canonical
// "default + override at parent scope" cascade from O11/c R1.
import { ref } from "vue";
import { Home, Layers, Search, Settings, Star } from "@lucide/vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import {
    DockIconButton,
    GlassDock,
} from "../../../src/components/custom/dock";

const activeRung = ref<"default" | "audacious" | "boomed" | "outlined" | "shadowed">("default");

const rungs: { id: typeof activeRung.value; label: string; hint: string }[] = [
    { id: "default", label: "default", hint: "--dock-active-bg = var(--muted); shadow=none" },
    { id: "audacious", label: "audacious", hint: "primary bg + foreground color" },
    { id: "boomed", label: "boomed", hint: "scale 1.12 — emphatic active pop" },
    { id: "outlined", label: "outlined", hint: "border ring instead of bg fill" },
    { id: "shadowed", label: "shadowed", hint: "cartoon shadow on active rung" },
];
</script>

<template>
    <StoryPage>
        <StorySection
            label="--dock-active-* token cohort"
            blurb="Five tokens absorb the hardcoded `.dock-icon-button` active recipe. Consumers override at a parent scope (e.g. `.tools-layer { --dock-active-scale: 1.2; }`) — no :deep() escapes."
        >
            <ShowcaseFrame pad="md" tier="quiet">
                <div class="grid grid-cols-[auto_1fr_auto] items-center gap-x-6 gap-y-2">
                    <code class="fira-code text-mono-caption text-foreground">--dock-active-bg</code>
                    <span class="text-mono-caption text-muted-foreground">background paint on .is-active</span>
                    <code class="fira-code text-mono-caption text-foreground">var(--muted)</code>

                    <code class="fira-code text-mono-caption text-foreground">--dock-active-color</code>
                    <span class="text-mono-caption text-muted-foreground">text/icon color on .is-active</span>
                    <code class="fira-code text-mono-caption text-foreground">var(--foreground)</code>

                    <code class="fira-code text-mono-caption text-foreground">--dock-active-scale</code>
                    <span class="text-mono-caption text-muted-foreground">transform scale on .is-active</span>
                    <code class="fira-code text-mono-caption text-foreground">1</code>

                    <code class="fira-code text-mono-caption text-foreground">--dock-active-border</code>
                    <span class="text-mono-caption text-muted-foreground">border on .is-active</span>
                    <code class="fira-code text-mono-caption text-foreground">none</code>

                    <code class="fira-code text-mono-caption text-foreground">--dock-active-shadow</code>
                    <span class="text-mono-caption text-muted-foreground">box-shadow on .is-active</span>
                    <code class="fira-code text-mono-caption text-foreground">none</code>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="active rung swatches"
            blurb="Five scoped overrides of the ladder demonstrate the token-only override pattern. Each swatch redefines a subset of the cohort and applies it to a single dock-icon-button in active state."
        >
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                <div
                    v-for="rung in rungs"
                    :key="rung.id"
                    class="ladder-cell flex flex-col items-center gap-2 rounded-card border border-border/40 bg-card/60 p-4"
                    :class="`ladder-${rung.id}`"
                >
                    <button
                        class="dock-icon-button is-active"
                        :aria-label="rung.label"
                    >
                        <Star class="h-4 w-4" />
                    </button>
                    <code class="fira-code text-mono-caption text-foreground">{{ rung.label }}</code>
                    <span class="text-mono-caption text-muted-foreground text-center">
                        {{ rung.hint }}
                    </span>
                </div>
            </div>
        </StorySection>

        <StorySection
            label="live dock — active selection"
            blurb="A working `<GlassDock>` whose active button picks up the selected rung override. Click a rung pill above; the dock's active state repaints without per-instance class fork."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-col items-center gap-4">
                    <div class="flex flex-wrap gap-2">
                        <button
                            v-for="rung in rungs"
                            :key="rung.id"
                            class="rounded-full border border-border/40 px-3 py-1 text-xs font-medium scale-on-hover"
                            :class="activeRung === rung.id ? 'bg-primary text-primary-foreground' : 'bg-card'"
                            @click="activeRung = rung.id"
                        >
                            {{ rung.label }}
                        </button>
                    </div>

                    <div :class="`ladder-${activeRung}`">
                        <GlassDock always-expanded>
                            <DockIconButton aria-label="Home"><Home class="h-4 w-4" /></DockIconButton>
                            <DockIconButton aria-label="Search"><Search class="h-4 w-4" /></DockIconButton>
                            <DockIconButton class="is-active" aria-label="Layers (active)">
                                <Layers class="h-4 w-4" />
                            </DockIconButton>
                            <DockIconButton aria-label="Settings"><Settings class="h-4 w-4" /></DockIconButton>
                        </GlassDock>
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>

<style scoped>
/* Five rung override scopes. Each redefines a subset of the
   --dock-active-* cohort. Demonstrates the canonical
   "parent-scope-only" override pattern; no :deep() escapes. */
.ladder-default {
    /* Inherits the tokens.css defaults — no overrides. */
}

.ladder-audacious {
    --dock-active-bg: var(--primary);
    --dock-active-color: var(--primary-foreground);
}

.ladder-boomed {
    --dock-active-scale: 1.12;
}

.ladder-outlined {
    --dock-active-bg: transparent;
    --dock-active-border: 1px solid var(--primary);
    --dock-active-color: var(--primary);
}

.ladder-shadowed {
    --dock-active-bg: var(--card);
    --dock-active-shadow: var(--shadow-cartoon);
    --dock-active-color: var(--foreground);
}
</style>
