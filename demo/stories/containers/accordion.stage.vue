<script setup lang="ts">
// Accordion's stage: one set of questions, with one answer open at a time, several
// at once, or a single panel (Collapsible).
import { ChevronDown } from "@lucide/vue";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@glass/components/accordion";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@glass/components/collapsible";
import { Button } from "@glass/components/button";
import StageSwap from "../../chassis/variants/StageSwap.vue";

type Mode = "single" | "multiple" | "one";

withDefaults(defineProps<{ mode?: Mode }>(), { mode: "single" });

const FAQ = [
    {
        id: "ship",
        q: "When will my order arrive?",
        a: "Most orders arrive in three to five working days.",
    },
    {
        id: "return",
        q: "Can I return an item?",
        a: "Yes, within thirty days, in its original packaging.",
    },
    {
        id: "track",
        q: "How do I track a parcel?",
        a: "The confirmation email carries a tracking link.",
    },
];
</script>

<template>
    <div class="accordion-stage">
        <StageSwap :swap-key="mode" class="accordion-stage-swap">
            <Accordion v-if="mode === 'single'" type="single" collapsible default-value="ship">
                <AccordionItem v-for="item in FAQ" :key="item.id" :value="item.id">
                    <AccordionTrigger>{{ item.q }}</AccordionTrigger>
                    <AccordionContent>{{ item.a }}</AccordionContent>
                </AccordionItem>
            </Accordion>
            <Accordion v-else-if="mode === 'multiple'" type="multiple" :default-value="['ship', 'return']">
                <AccordionItem v-for="item in FAQ" :key="item.id" :value="item.id">
                    <AccordionTrigger>{{ item.q }}</AccordionTrigger>
                    <AccordionContent>{{ item.a }}</AccordionContent>
                </AccordionItem>
            </Accordion>
            <Collapsible v-else v-slot="{ open }" default-open class="accordion-stage-one">
                <CollapsibleTrigger as-child>
                    <Button emphasis="quiet">
                        {{ FAQ[0]!.q }}
                        <ChevronDown
                            class="accordion-stage-chevron"
                            :class="{ 'is-open': open }"
                            aria-hidden="true"
                        />
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>{{ FAQ[0]!.a }}</CollapsibleContent>
            </Collapsible>
        </StageSwap>
    </div>
</template>

<style scoped>
.accordion-stage {
    display: flex;
    justify-content: center;
    block-size: 100%;
    padding: var(--sp-6) var(--sp-4);
}
.accordion-stage-swap {
    inline-size: min(100%, 34rem);
    align-self: flex-start;
}
.accordion-stage-one {
    --collapsible-gap: var(--sp-3);
}
.accordion-stage-chevron {
    transition: rotate var(--duration-fast) var(--ease-out);
}
.accordion-stage-chevron.is-open {
    rotate: 180deg;
}
</style>
