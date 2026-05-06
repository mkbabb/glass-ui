<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";

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
        <CreamSurface tone="warm" class="relative overflow-hidden">
            <p
                class="section-label"
                :style="{ color: 'var(--section-color-1)' }"
            >
                § 1 · Disclosure
            </p>
            <DisplayHero
                size="display-3"
                variation="wonk"
                class="mt-[var(--space-phi-1)] mb-[var(--space-phi-2)]"
                :style="{ color: 'var(--section-color-1)' }"
            >
                Folded answers
            </DisplayHero>
            <p class="text-prose max-w-2xl text-foreground/80">
                Accordion — single or multiple — exposes folded prose with a hairline
                row rule. The trigger rotates its caret on open, the content reveals
                with a tuned cubic-bezier, and the keyboard model is reka-ui canon.
            </p>
            <FlourishDivider
                tone="section-1"
                class="my-[var(--space-phi-3)]"
            />

            <div class="grid gap-12">
                <div class="grid gap-4">
                    <h2 class="font-display text-xl">Single</h2>
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
                <h2 class="font-display text-xl">Multiple</h2>
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
        </CreamSurface>
    </StoryPage>
</template>
