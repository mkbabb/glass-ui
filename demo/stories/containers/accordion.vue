<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../../../src/components/ui/accordion";


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
        <!-- BB.W-DEMO-DESIGN — the disclosure demo body pops in on the W-SCROLL-
             MOTION `.scroll-cascade` register. The content-height open/close
             animation rides reka-ui's collapsible-open/-close keyframes, which are
             on W-MOTION-CANON's NAMED CLS-bounded allowlist (a discrete user-
             initiated reflow, NOT a per-scroll-frame storm — sanctioned, not killed:
             the accordion demo HOSTS the correct register, no re-cut needed). -->
        <div class="scroll-cascade grid gap-12">
            <StorySection heading="Single" gap="lg">
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
            </StorySection>

            <StorySection heading="Multiple" gap="lg">
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
            </StorySection>
        </div>
    </StoryPage>
</template>
