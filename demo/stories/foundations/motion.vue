<script setup lang="ts">
// Motion — the foundation tour of the Vue <Transition> GRAMMAR (the CSS-half of the
// motion system). The named easing + spring CURVE canon lives on the Curve Gallery
// (Motion ▸ Curve Gallery), which plots each curve off its REAL JS twin grouped by
// family — this page no longer duplicates it with fake hint-SVGs (AZ.W-MOTION-SUITE
// de-dup). Here: the §6 easing-doctrine legend (which easing fits which job) + the
// shipped <Transition> class-sets that compose those curves into enter/leave grammar.
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import { ref } from "vue";
import { Button } from "../../../src/components/ui/button";
import { cn } from "../../../src/utils/cn";

// ── The §6 easing-doctrine legend (the curve canon's "which job" companion) ─────
const doctrine: { kind: string; easing: string }[] = [
    { kind: "Surface (bg / border / color / shadow / opacity)", easing: "--ease-standard (bezier — never a spring on a colour)" },
    { kind: "Transform — hover / press / active", easing: "--spring-smooth (the one interactive scale register)" },
    { kind: "Enter (mount / popover / dialog in)", easing: "--spring-bouncy / --spring-snappy" },
    { kind: "Exit (unmount / close)", easing: "--ease-out / --ease-standard (NO overshoot past gone)" },
    { kind: "Position-tracked (specular pointer follow)", easing: "--ease-standard" },
];

// ── The Vue <Transition> class-sets ─────────────────────────────────────────────
interface TransitionDemo {
    id: string;
    name: string;
    blurb: string;
    cssClass: string; // Transition name prop → matches .<name>-enter-active etc.
}

const transitionDemos: TransitionDemo[] = [
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
    Object.fromEntries(transitionDemos.map((d) => [d.id, true])),
);

function toggle(id: string): void {
    visible.value[id] = !visible.value[id];
}
</script>

<template>
    <StoryPage>
        <StorySection
            label="Easing doctrine"
            blurb="The house rule for which easing fits which job — the legend every <Transition> below composes from. The full curve canon (every spring + bezier + analytic family, plotted off its real JS twin) lives on Motion ▸ Curve Gallery; this is the foundation tour of the grammar those curves build."
        >
            <div class="overflow-hidden rounded-card border border-border">
                <table class="w-full text-sm">
                    <thead>
                        <tr class="bg-[var(--surface-tint-1)] text-left">
                            <th class="px-4 py-2 font-semibold">Transition kind</th>
                            <th class="px-4 py-2 font-semibold">Easing</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="row in doctrine" :key="row.kind" class="border-t border-border/40">
                            <td class="px-4 py-2 text-foreground">{{ row.kind }}</td>
                            <td class="px-4 py-2"><code class="text-xs text-muted-foreground">{{ row.easing }}</code></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </StorySection>

        <StorySection
            label="Transition class-sets"
            blurb="The Vue <Transition> class-sets shipped in the library — each composes the curve canon into an enter/leave grammar for a kind of surface. Toggle a card to watch the sample enter and leave."
        >
            <section class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                <div
                    v-for="demo in transitionDemos"
                    :key="demo.id"
                    :class="cn(
                        'flex flex-col gap-4 rounded-card border border-border bg-card p-5',
                        'shadow-cartoon',
                    )"
                >
                    <div class="flex flex-col gap-1">
                        <code class="fira-code text-small text-foreground">{{ demo.name }}</code>
                        <p class="text-small text-muted-foreground">{{ demo.blurb }}</p>
                    </div>

                    <div
                        :class="cn(
                            'relative flex h-28 items-center justify-center',
                            'rounded-panel border border-border/60 bg-background/40',
                            'overflow-hidden',
                        )"
                    >
                        <Transition :name="demo.cssClass">
                            <div
                                v-if="visible[demo.id]"
                                :class="cn(
                                    'flex h-16 w-40 items-center justify-center rounded-panel',
                                    'bg-[var(--motion-accent)] text-small font-medium text-white',
                                    'shadow-cartoon-sm',
                                )"
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
        </StorySection>
    </StoryPage>
</template>
