<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { ref } from "vue";
import {
    Bold,
    Italic,
    Underline,
    AlignLeft,
    AlignCenter,
    AlignRight,
} from "@lucide/vue";
import { ToggleGroup, ToggleGroupItem } from "@glass/components/toggle-group";

const marks = ref<string[]>(["bold"]);
const align = ref<string>("left");
const density = ref<string>("comfortable");
const densityOptions = ["Compact", "Comfortable", "Spacious", "Touch", "Presentation"];
const region = ref<string>("");
const frozen = ref<string>("balanced");
</script>

<template>
    <StoryPage>
        <StorySection
            heading="Many of N"
            blurb="N independent toggles: role=group, each item aria-pressed. Arrows move focus; Space and Enter commit."
        >
            <ToggleGroup v-model="marks" type="multiple" aria-label="Text styles">
                <ToggleGroupItem value="bold" aria-label="Bold">
                    <Bold class="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Italic">
                    <Italic class="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Underline">
                    <Underline class="h-4 w-4" />
                </ToggleGroupItem>
            </ToggleGroup>
            <p class="text-mono-small text-muted-foreground">
                marks · [{{ marks.join(", ") }}]
            </p>
        </StorySection>

        <StorySection
            heading="One of N"
            blurb="A chooser, so it announces as one: role=radiogroup, items role=radio with aria-checked, and arrows move AND select the way a native radio does."
        >
            <ToggleGroup v-model="align" type="single" aria-label="Text alignment">
                <ToggleGroupItem value="left" aria-label="Align left">
                    <AlignLeft class="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Align center">
                    <AlignCenter class="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Align right">
                    <AlignRight class="h-4 w-4" />
                </ToggleGroupItem>
            </ToggleGroup>
            <p class="text-mono-small text-muted-foreground">align · {{ align }}</p>
        </StorySection>

        <StorySection
            heading="The row wraps"
            blurb="Constrained to 14rem, which no single row of these five fits. The row wraps; nothing is hidden and nothing scrolls. This specimen used to clip 59% of itself under copy claiming both edges stayed reachable."
        >
            <ToggleGroup
                v-model="density"
                type="single"
                class="w-56"
                aria-label="Interface density"
            >
                <ToggleGroupItem
                    v-for="option in densityOptions"
                    :key="option"
                    :value="option.toLowerCase()"
                >
                    {{ option }}
                </ToggleGroupItem>
            </ToggleGroup>
            <p class="text-mono-small text-muted-foreground">density · {{ density }}</p>
        </StorySection>

        <StorySection
            heading="Invalid and disabled"
            blurb="One invalid grammar (data-invalid + aria-invalid on the group) and the disabled axis, at the group and at a single item."
        >
            <ToggleGroup
                v-model="region"
                type="single"
                invalid
                aria-label="Deployment region"
            >
                <ToggleGroupItem value="us">US</ToggleGroupItem>
                <ToggleGroupItem value="eu">EU</ToggleGroupItem>
                <ToggleGroupItem value="apac" disabled>APAC</ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup v-model="frozen" type="single" disabled aria-label="Frozen">
                <ToggleGroupItem value="balanced">Balanced</ToggleGroupItem>
                <ToggleGroupItem value="fast">Fast</ToggleGroupItem>
            </ToggleGroup>
            <p class="text-mono-small text-muted-foreground">
                region · {{ region || "—" }}
            </p>
        </StorySection>
    </StoryPage>
</template>
