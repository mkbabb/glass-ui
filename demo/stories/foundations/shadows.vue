<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import ShadowsStage from "./shadows.stage.vue";

const snippet = `<script setup lang="ts">
import { Card } from "@mkbabb/glass-ui/card";
<\/script>

<template>
    <Card tier="floating">
        <slot />
    </Card>
</template>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="fit">
                <ShadowsStage />
            </StoryStage>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
