<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import TextMotionStage from "./text-motion.stage.vue";

const snippet = `<script setup lang="ts">
import { ref } from "vue";
import { TypewriterText } from "@mkbabb/glass-ui/typewriter";
import { useAnimatedNumber } from "@mkbabb/glass-ui/motion";

const target = ref(0);
const { current } = useAnimatedNumber(target);
<\/script>

<template>
    <p>Built on <TypewriterText :words="[{ text: 'warm cream' }]" /></p>
    <button @click="target = 1280">{{ Math.round(current) }}</button>
</template>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="fit">
                <TextMotionStage />
            </StoryStage>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
