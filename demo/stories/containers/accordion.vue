<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../../../src/components/ui/accordion";
import { IconChip } from "../../../src/components/custom/icon-chip";
import { ChevronsDownUp } from "@lucide/vue";
// BA.W-SUFFUSE2 — the containers band's ONE coherent --section-color-2 blue identity.
const CONTAINERS_STOP = 2;

const faq = [
    {
        id: "q-what",
        q: "What is glass-ui?",
        a: "A Vue 3.5 design system built on reka-ui and Tailwind CSS v4 — paper-and-glass forward, warm cream by default, audacious display type.",
    },
    {
        id: "q-how",
        q: "How do I override tokens?",
        a: "Redeclare the CSS custom properties at :root in your consumer stylesheet after importing @mkbabb/glass-ui/styles. Every token is exposed as a Tailwind utility through the @theme block.",
    },
    {
        id: "q-why",
        q: "Why cartoon shadows by default?",
        a: "They read as paper — a literal drop against the warm cream — and they compose beautifully with the translation-based hover lift. Swap to a conventional elevated shadow via the configurator if you prefer.",
    },
    {
        id: "q-when",
        q: "When should I use the pane variant?",
        a: "When a card is nested inside another card and the second drop-shadow would stack. Add flush to drop the surface shadow entirely.",
    },
];
</script>

<template>
    <StoryPage>
        <!-- BA.W-SUFFUSE2 — the containers-band identity event family on
             --section-color-2 (the empty-states model: a leading glyph-chip on
             the lead card header). The --section-label-accent override sits on
             THIS header (the real DOM ancestor of the eyebrow + the rail element
             itself) — StoryPage's root is a renderless TooltipProvider, so a
             :style on <StoryPage> never reaches the slotted eyebrow. -->
        <header
            class="flex items-center gap-4 border-l-[3px] pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${CONTAINERS_STOP})`,
                borderColor:
                    'color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="ChevronsDownUp" :section="CONTAINERS_STOP" />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Containers · Accordion
                </span>
                <p class="text-small text-muted-foreground">
                    Stacked disclosure panels — the content stays ink; the section
                    identity is the ONE color event.
                </p>
            </div>
        </header>

        <div class="grid gap-12">
            <div class="grid gap-4">
                <h2 class="text-subheading">Single</h2>
                <p class="text-sm text-muted-foreground">
                    <code class="font-mono text-xs">type="single"</code> with
                    <code class="font-mono text-xs">collapsible</code> allows
                    closing the open item.
                </p>
                <Accordion type="single" collapsible default-value="q-what">
                    <AccordionItem
                        v-for="item in faq"
                        :key="item.id"
                        :value="item.id"
                    >
                        <AccordionTrigger>{{ item.q }}</AccordionTrigger>
                        <AccordionContent>{{ item.a }}</AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            <div class="grid gap-4">
                <h2 class="text-subheading">Multiple</h2>
                <p class="text-sm text-muted-foreground">
                    <code class="font-mono text-xs">type="multiple"</code> — any
                    subset open simultaneously.
                </p>
                <Accordion
                    type="multiple"
                    :default-value="['q-what', 'q-how']"
                >
                    <AccordionItem
                        v-for="item in faq"
                        :key="item.id"
                        :value="item.id"
                    >
                        <AccordionTrigger>{{ item.q }}</AccordionTrigger>
                        <AccordionContent>{{ item.a }}</AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    </StoryPage>
</template>
