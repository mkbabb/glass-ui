<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { ref } from "vue";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "@lucide/vue";
import { ToggleGroup, ToggleGroupItem } from "@glass/components/toggle-group";

const marks = ref<string[]>(["bold"]);
const align = ref<string>("left");
const density = ref<string>("comfortable");
const densityOptions = ["Compact", "Comfortable", "Spacious", "Touch", "Presentation"];
</script>

<template>
    <StoryPage>
        <!-- ToggleGroup type=multiple. -->
        <section class="flex flex-col gap-3">
            <p class="text-small text-muted-foreground">toggle-group · multiple</p>
            <ToggleGroup
                v-model="marks"
                type="multiple"
                variant="outline"
                aria-label="Text styles"
            >
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
        </section>

        <!-- ToggleGroup type=single. -->
        <section class="flex flex-col gap-3">
            <p class="text-small text-muted-foreground">toggle-group · single</p>
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
        </section>

        <StorySection
            heading="Narrow horizontal strip"
            blurb="Safe centering keeps the strip balanced when it fits and leaves both scroll edges reachable when it overflows."
        >
            <ToggleGroup
                v-model="density"
                type="single"
                class="w-56 max-w-full overflow-x-auto"
                aria-label="Interface density"
            >
                <ToggleGroupItem
                    v-for="option in densityOptions"
                    :key="option"
                    :value="option.toLowerCase()"
                    class="shrink-0 whitespace-nowrap"
                >
                    {{ option }}
                </ToggleGroupItem>
            </ToggleGroup>
            <p class="text-mono-small text-muted-foreground">
                density · {{ density }}
            </p>
        </StorySection>

    </StoryPage>
</template>
