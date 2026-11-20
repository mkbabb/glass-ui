<script setup lang="ts">
import { Compass } from "@lucide/vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import IconsStage from "./icons.stage.vue";

const SIZES = [16, 20, 24, 32] as const;

const snippet = `<script setup lang="ts">
import { Compass } from "@lucide/vue";
<\/script>

<template>
    <Compass :size="24" :stroke-width="1.75" />
</template>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="fit">
                <IconsStage />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow label="Sizes">
                    <template v-for="s in SIZES" :key="s">
                        <Compass
                            :size="s"
                            :stroke-width="1.75"
                            class="text-foreground"
                            role="img"
                            :aria-label="`Compass, ${s} pixels`"
                        />
                    </template>
                </StoryVariantRow>
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
