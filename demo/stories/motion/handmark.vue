<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import HandmarkStage from "./handmark.stage.vue";

const snippet = `<script setup lang="ts">
import { HandMark } from "@mkbabb/glass-ui/handmark";
<\/script>

<template>
    <p>Who <HandMark>pays in</HandMark> gets connected</p>
    <p>Up <HandMark shape="circle">threefold</HandMark> since spring</p>
</template>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="fit">
                <HandmarkStage />
            </StoryStage>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
