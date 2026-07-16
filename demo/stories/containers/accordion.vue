<script setup lang="ts">
import { ref } from "vue";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@glass/components/accordion";
import StoryPage from "../../chassis/page/StoryPage.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";
import StorySection from "../../chassis/section/StorySection.vue";

const faq = [
    {
        id: "contract",
        question: "What does Accordion own?",
        answer: "The group owns single or multiple selection policy. Each item retains one heading, one native trigger, and one linked region.",
    },
    {
        id: "motion",
        question: "How does content motion work?",
        answer: "Accordion and Collapsible share one measured-size transition. Reduced motion preserves the state change without visible travel.",
    },
    {
        id: "keyboard",
        question: "Which keys are supported?",
        answer: "Enter and Space toggle the focused item. Arrow keys, Home, and End move focus through enabled triggers.",
    },
];

const singleValue = ref<string | undefined>("contract");
</script>

<template>
    <StoryPage>
        <StorySection
            heading="Single and collapsible"
            blurb="Single policy permits one open item; collapsible permits that item to close. The model readout is the controlled source of truth."
        >
            <ShowcaseFrame tier="quiet" pad="md">
                <p class="mb-3 text-small text-muted-foreground" role="status">
                    Value · {{ singleValue ?? "none" }}
                </p>
                <div data-scenario="accordion-collapsible">
                    <Accordion
                        v-model="singleValue"
                        data-scenario="accordion-single"
                        type="single"
                        collapsible
                    >
                        <AccordionItem
                            v-for="item in faq"
                            :key="item.id"
                            :value="item.id"
                        >
                            <AccordionTrigger>{{ item.question }}</AccordionTrigger>
                            <AccordionContent>{{ item.answer }}</AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            heading="Multiple"
            blurb="Multiple policy stores an array and allows any subset of items to remain open."
        >
            <ShowcaseFrame pad="md">
                <Accordion
                    data-scenario="accordion-multiple"
                    type="multiple"
                    :default-value="['contract', 'motion']"
                >
                    <AccordionItem
                        v-for="item in faq"
                        :key="item.id"
                        :value="item.id"
                    >
                        <AccordionTrigger>{{ item.question }}</AccordionTrigger>
                        <AccordionContent>{{ item.answer }}</AccordionContent>
                    </AccordionItem>
                </Accordion>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            heading="Disabled, keyboard, and reduced motion"
            blurb="Disabled items leave the focus sequence. Arrow, Home, and End keys move among the remaining triggers; reduced motion changes only the transition travel."
        >
            <div class="grid gap-4 sm:grid-cols-2">
                <ShowcaseFrame caption="Keyboard and disabled" pad="md">
                    <Accordion
                        data-scenario="accordion-keyboard"
                        type="single"
                        collapsible
                    >
                        <AccordionItem value="enabled">
                            <AccordionTrigger>Focusable item</AccordionTrigger>
                            <AccordionContent>
                                Use Arrow Down to move to the next enabled trigger.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem
                            data-scenario="accordion-disabled"
                            value="disabled"
                            disabled
                        >
                            <AccordionTrigger>Disabled item</AccordionTrigger>
                            <AccordionContent>This region cannot open.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="last">
                            <AccordionTrigger>Last enabled item</AccordionTrigger>
                            <AccordionContent>Home returns focus to the first trigger.</AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </ShowcaseFrame>

                <ShowcaseFrame caption="Reduced motion" pad="md">
                    <Accordion
                        data-scenario="accordion-prm"
                        type="single"
                        collapsible
                        default-value="motion"
                    >
                        <AccordionItem value="motion">
                            <AccordionTrigger>Motion-aware disclosure</AccordionTrigger>
                            <AccordionContent>
                                With reduced motion, the measured-size transition completes immediately.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </ShowcaseFrame>
            </div>
        </StorySection>
    </StoryPage>
</template>
