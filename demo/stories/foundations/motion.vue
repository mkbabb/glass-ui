<script setup lang="ts">
// Motion — the foundation tour of the Vue <Transition> grammar (the CSS half of the
// motion system). Motion ▸ Motion Lab demonstrates the live Glass preset and authoring
// seams; this page holds the easing doctrine plus the shipped <Transition> class sets.
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { ref } from "vue";
import { Button } from "@glass/components/button";
import { cn } from "@glass/components/_shared/class-names";

// ── The §6 easing-doctrine legend (the curve canon's "which job" companion) ─────
const doctrine: { kind: string; easing: string }[] = [
    {
        kind: "Surface (bg / border / color / shadow / opacity)",
        easing: "--ease-standard (bezier — never a spring on a colour)",
    },
    {
        kind: "Transform — hover / press / active",
        easing: "--spring-press (the one interactive scale register)",
    },
    {
        kind: "Enter (mount / popover / dialog in)",
        easing: "--spring-panel (the one row that rebounds) / --spring-present",
    },
    {
        kind: "Exit (unmount / close)",
        easing: "--ease-out / --ease-standard (NO overshoot past gone)",
    },
    { kind: "Position-tracked (specular pointer follow)", easing: "--ease-standard" },
];

// ── The Vue <Transition> class-sets ─────────────────────────────────────────────
interface TransitionDemo {
    id: string;
    name: string;
    blurb: string;
    cssClass: string; // Transition name prop → matches .<name>-enter-active etc.
}

// the `fade-slide`, `pop`, `dialog-scale`, `dropdown`
// Vue-<Transition> recipes are RETIRED (census-dead, 0 src/ consumers); their overlay/
// menu entrances now ride the ONE `.glass-reveal` recipe bound by `data-reveal`
// (enter-overlay, enter-menu, enter-tooltip — see the live overlays
// in Display ▸ Overlays). The showcase keeps the still-live generic swaps.
const transitionDemos: TransitionDemo[] = [
    {
        id: "fade",
        name: "fade",
        blurb: "Symmetric, fast opacity — the plainest tool in the box.",
        cssClass: "fade",
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
            blurb="The house rule for which easing fits which job — the legend every <Transition> below composes from. Motion ▸ Motion Lab exercises the live Glass presets and authoring seam; this is the foundation tour of the grammar they build."
        >
            <div class="overflow-hidden rounded-card border border-border">
                <table class="w-full text-small">
                    <thead>
                        <tr class="bg-[var(--surface-tint-1)] text-left">
                            <th class="px-4 py-2 font-semibold">Transition kind</th>
                            <th class="px-4 py-2 font-semibold">Easing</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="row in doctrine"
                            :key="row.kind"
                            class="border-t border-border/40"
                        >
                            <td class="px-4 py-2 text-foreground">{{ row.kind }}</td>
                            <td class="px-4 py-2">
                                <code class="text-micro text-muted-foreground">{{
                                    row.easing
                                }}</code>
                            </td>
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
                    :class="
                        cn(
                            'flex flex-col gap-4 rounded-card border border-border bg-card p-5',
                            'shadow-cartoon',
                        )
                    "
                >
                    <div class="flex flex-col gap-1">
                        <code class="fira-code text-small text-foreground">{{
                            demo.name
                        }}</code>
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
                            <!--   (paint re-open): white on the
                                 fixed --motion-accent violet collapsed to WCAG ~2.45 in dark.
                                 The native contrast-color() picks the legible ink on the census
                                 engines (Chrome 149 / Safari 26); text-white is the base. -->
                            <div
                                v-if="visible[demo.id]"
                                :class="
                                    cn(
                                        'flex h-16 w-40 items-center justify-center rounded-panel',
                                        'bg-[var(--motion-accent)] text-small font-medium text-white',
                                        'shadow-cartoon-sm',
                                    )
                                "
                                :style="{
                                    color: 'contrast-color(var(--motion-accent))',
                                }"
                            >
                                hello
                            </div>
                        </Transition>
                    </div>

                    <div class="flex items-center justify-between">
                        <span class="text-mono-small text-muted-foreground">
                            v-if · {{ visible[demo.id] ? "true" : "false" }}
                        </span>
                        <Button size="sm" @click="toggle(demo.id)"> Toggle </Button>
                    </div>
                </div>
            </section>
        </StorySection>
    </StoryPage>
</template>
