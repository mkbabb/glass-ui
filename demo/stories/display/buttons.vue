<script setup lang="ts">
import { ref } from "vue";
import { MoreHorizontal, Save, Trash2 } from "@lucide/vue";
import { Button } from "@glass/components/button";
import { StatusDot } from "@glass/components/status-dot";
import StoryPage from "../../chassis/page/StoryPage.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";
import StorySection from "../../chassis/section/StorySection.vue";

const activations = ref(0);
</script>

<template>
    <StoryPage>
        <StorySection
            heading="Command hierarchy"
            blurb="One command contract, ordered by emphasis. Tone describes intent without minting another appearance axis."
        >
            <ShowcaseFrame tier="field" pad="lg">
                <div class="flex flex-wrap items-center gap-3">
                    <Button data-scenario="button-primary" emphasis="primary">
                        Primary action
                    </Button>
                    <Button data-scenario="button-default">Default action</Button>
                    <Button emphasis="quiet">Quiet action</Button>
                    <Button emphasis="text">Text action</Button>
                    <Button data-scenario="button-destructive" tone="destructive">
                        <Trash2 aria-hidden="true" />
                        Delete
                    </Button>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            heading="Native state"
            blurb="Disabled and loading commands suppress native activation. Icon-only commands remain square, named controls."
        >
            <div class="flex flex-wrap items-center gap-3">
                <Button data-scenario="button-disabled" disabled>Disabled</Button>
                <Button data-scenario="button-loading" loading>
                    <StatusDot state="active" size="lg" />
                    Saving
                </Button>
                <Button
                    data-scenario="button-icon"
                    emphasis="quiet"
                    icon-only
                    aria-label="More actions"
                >
                    <MoreHorizontal aria-hidden="true" />
                </Button>
                <Button size="sm">
                    <Save aria-hidden="true" />
                    Save
                </Button>
            </div>
        </StorySection>

        <StorySection
            heading="Keyboard, touch, and reduced motion"
            blurb="The same native button accepts Enter, Space, click, and coarse taps. Reduced motion keeps state feedback while removing travel."
        >
            <div class="grid gap-4 sm:grid-cols-2">
                <ShowcaseFrame caption="Keyboard and touch" pad="sm">
                    <div class="flex flex-col items-start gap-3">
                        <div class="flex flex-wrap gap-3">
                            <Button
                                data-scenario="button-keyboard"
                                @click="activations++"
                            >
                                Keyboard command
                            </Button>
                            <Button
                                data-scenario="button-touch"
                                emphasis="quiet"
                                @click="activations++"
                            >
                                Touch command
                            </Button>
                        </div>
                        <p class="text-small text-muted-foreground" role="status">
                            Activations · {{ activations }}
                        </p>
                    </div>
                </ShowcaseFrame>
                <ShowcaseFrame caption="Reduced-motion contract" pad="sm">
                    <div class="flex flex-col items-start gap-3">
                        <Button data-scenario="button-prm" emphasis="primary">
                            Motion-aware action
                        </Button>
                        <p class="text-small text-muted-foreground">
                            Under reduced motion, focus, tone, and illumination remain;
                            hover and press travel do not.
                        </p>
                    </div>
                </ShowcaseFrame>
            </div>
        </StorySection>

        <StorySection
            heading="Size"
            blurb="One ordinal scale; icon geometry is separate."
        >
            <div class="flex flex-wrap items-center gap-3">
                <Button size="xs">Extra small</Button>
                <Button size="sm">Small</Button>
                <Button>Medium</Button>
                <Button size="lg">Large</Button>
            </div>
        </StorySection>
    </StoryPage>
</template>
