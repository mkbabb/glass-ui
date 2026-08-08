<script setup lang="ts">
import { ref } from "vue";
import { MoreHorizontal, Save, Trash2 } from "@lucide/vue";
import { Button, type ButtonEmphasis, type ButtonTone } from "@glass/components/button";
import StoryPage from "../../chassis/page/StoryPage.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";
import StorySection from "../../chassis/section/StorySection.vue";

const activations = ref(0);
const saving = ref(false);

const EMPHASES: readonly ButtonEmphasis[] = ["primary", "secondary", "quiet", "text"];
const TONES: readonly ButtonTone[] = ["neutral", "destructive"];

function save(): void {
    saving.value = true;
    window.setTimeout(() => (saving.value = false), 2400);
}
</script>

<template>
    <StoryPage>
        <StorySection
            heading="Emphasis × tone"
            blurb="Emphasis owns the plate, tone owns the hue. Every cell of the product is mounted, because a matrix is the only honest way to show that two axes stay independent."
        >
            <ShowcaseFrame tier="field" pad="lg">
                <div class="grid gap-3" style="grid-template-columns: auto repeat(4, minmax(0, 1fr))">
                    <span aria-hidden="true" />
                    <span
                        v-for="emphasis in EMPHASES"
                        :key="`head-${emphasis}`"
                        class="text-small text-muted-foreground"
                    >
                        {{ emphasis }}
                    </span>
                    <template v-for="tone in TONES" :key="tone">
                        <span class="text-small text-muted-foreground self-center">
                            {{ tone }}
                        </span>
                        <Button
                            v-for="emphasis in EMPHASES"
                            :key="`${tone}-${emphasis}`"
                            :data-scenario="`button-${tone}-${emphasis}`"
                            :emphasis="emphasis"
                            :tone="tone"
                        >
                            <Trash2 v-if="tone === 'destructive'" aria-hidden="true" />
                            {{ tone === "destructive" ? "Delete" : "Save" }}
                        </Button>
                    </template>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            heading="In flight, and out of service"
            blurb="Loading and disabled are different facts and paint differently. A loading command keeps its focus seat, reports aria-busy, and shows the library's one work-in-flight mark; a disabled command keeps its full-alpha silhouette and recedes in ink alone."
        >
            <div class="flex flex-wrap items-center gap-3">
                <Button data-scenario="button-disabled" disabled>Disabled</Button>
                <Button
                    data-scenario="button-disabled-destructive"
                    tone="destructive"
                    disabled
                >
                    Disabled delete
                </Button>
                <Button
                    data-scenario="button-loading"
                    emphasis="primary"
                    :loading="saving"
                    @click="save"
                >
                    {{ saving ? "Saving" : "Save with a delay" }}
                </Button>
                <Button
                    data-scenario="button-icon"
                    emphasis="quiet"
                    icon-only
                    aria-label="More actions"
                >
                    <MoreHorizontal aria-hidden="true" />
                </Button>
            </div>
        </StorySection>

        <StorySection
            heading="Keyboard, touch, and the linked command"
            blurb="One native button accepts Enter, Space, click, and coarse taps. `as-child` hands the whole command contract to another element without giving up the material."
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
                <ShowcaseFrame caption="As-child" pad="sm">
                    <div class="flex flex-wrap items-center gap-3">
                        <Button data-scenario="button-as-child" as-child>
                            <a href="#emphasis-tone">A link that commands</a>
                        </Button>
                        <Button
                            data-scenario="button-as-child-disabled"
                            as-child
                            disabled
                        >
                            <a href="#emphasis-tone">Suppressed</a>
                        </Button>
                    </div>
                </ShowcaseFrame>
            </div>
        </StorySection>

        <StorySection
            heading="Size"
            blurb="One ordinal scale, four rungs, three type faces; icon geometry is separate."
        >
            <div class="flex flex-wrap items-center gap-3">
                <Button size="xs">Extra small</Button>
                <Button size="sm">
                    <Save aria-hidden="true" />
                    Small
                </Button>
                <Button>Medium</Button>
                <Button size="lg">Large</Button>
            </div>
        </StorySection>
    </StoryPage>
</template>
