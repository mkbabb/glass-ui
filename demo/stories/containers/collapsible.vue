<script setup lang="ts">
import { ref } from "vue";
import { ChevronDown } from "@lucide/vue";
import { Button } from "@glass/components/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@glass/components/collapsible";
import StoryPage from "../../chassis/page/StoryPage.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";
import StorySection from "../../chassis/section/StorySection.vue";

const controlledOpen = ref(true);
const keyboardOpen = ref(false);
</script>

<template>
    <StoryPage>
        <StorySection
            heading="Disclosure state"
            blurb="One trigger controls one linked region. Uncontrolled state is concise; v-model:open makes the same contract externally controlled."
        >
            <div class="grid gap-4 sm:grid-cols-2">
                <ShowcaseFrame caption="Closed" pad="sm">
                    <Collapsible data-scenario="collapsible-closed" class="grid gap-3">
                        <CollapsibleTrigger as-child>
                            <Button emphasis="quiet">Show release notes</Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent class="text-small">
                            The region opens from its measured block size.
                        </CollapsibleContent>
                    </Collapsible>
                </ShowcaseFrame>

                <ShowcaseFrame caption="Open" pad="sm">
                    <Collapsible
                        data-scenario="collapsible-open"
                        default-open
                        class="grid gap-3"
                    >
                        <CollapsibleTrigger as-child>
                            <Button emphasis="quiet">Hide release notes</Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent class="text-small">
                            Trigger and content remain linked throughout the transition.
                        </CollapsibleContent>
                    </Collapsible>
                </ShowcaseFrame>
            </div>
        </StorySection>

        <StorySection
            heading="Controlled"
            blurb="The slot and aria-expanded state reflect the same controlled boolean; no parallel visual state is maintained."
        >
            <ShowcaseFrame tier="quiet" pad="md">
                <Collapsible
                    v-model:open="controlledOpen"
                    data-scenario="collapsible-controlled"
                    class="grid gap-3"
                >
                    <div class="flex items-center justify-between gap-3">
                        <div>
                            <p class="font-medium">Build artifacts</p>
                            <p class="text-small text-muted-foreground">
                                Open · {{ controlledOpen }}
                            </p>
                        </div>
                        <CollapsibleTrigger as-child>
                            <Button
                                emphasis="quiet"
                                icon-only
                                :aria-label="controlledOpen ? 'Hide artifacts' : 'Show artifacts'"
                            >
                                <ChevronDown
                                    aria-hidden="true"
                                    class="size-4 transition-disclosure"
                                    :class="controlledOpen && 'rotate-180'"
                                />
                            </Button>
                        </CollapsibleTrigger>
                    </div>
                    <p class="font-mono text-micro text-muted-foreground">
                        dist/glass-ui.js · 142.3 kB
                    </p>
                    <CollapsibleContent class="grid gap-2">
                        <p class="font-mono text-micro text-muted-foreground">
                            dist/glass-ui.css · 38.9 kB
                        </p>
                        <p class="font-mono text-micro text-muted-foreground">
                            dist/index.d.ts · 12.4 kB
                        </p>
                    </CollapsibleContent>
                </Collapsible>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            heading="Input and motion modes"
            blurb="Native button semantics cover pointer, Enter, and Space. Disabled state is inert; reduced motion preserves the state change while collapsing travel."
        >
            <div class="grid gap-4 sm:grid-cols-3">
                <ShowcaseFrame caption="Disabled" pad="sm">
                    <Collapsible data-scenario="collapsible-disabled" disabled>
                        <CollapsibleTrigger as-child>
                            <Button disabled emphasis="quiet">Unavailable details</Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent>Unavailable body</CollapsibleContent>
                    </Collapsible>
                </ShowcaseFrame>

                <ShowcaseFrame caption="Keyboard" pad="sm">
                    <Collapsible
                        v-model:open="keyboardOpen"
                        data-scenario="collapsible-keyboard"
                        class="grid gap-3"
                    >
                        <CollapsibleTrigger as-child>
                            <Button emphasis="quiet">Press Enter or Space</Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent class="text-small">
                            Keyboard activation uses the native button path.
                        </CollapsibleContent>
                    </Collapsible>
                </ShowcaseFrame>

                <ShowcaseFrame caption="Reduced motion" pad="sm">
                    <Collapsible
                        data-scenario="collapsible-prm"
                        default-open
                        class="grid gap-3"
                    >
                        <CollapsibleTrigger as-child>
                            <Button emphasis="quiet">Motion-aware region</Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent class="text-small">
                            Reduced motion makes the measured-size transition effectively immediate.
                        </CollapsibleContent>
                    </Collapsible>
                </ShowcaseFrame>
            </div>
        </StorySection>
    </StoryPage>
</template>
