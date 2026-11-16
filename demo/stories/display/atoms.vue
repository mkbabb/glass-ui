<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import AtomsStage from "./atoms.stage.vue";

const snippet = `<script setup lang="ts">
import { Avatar, AvatarFallback } from "@mkbabb/glass-ui";
import { StatusDot } from "@mkbabb/glass-ui/status-dot";
<\/script>

<template>
    <Avatar label="Grace Hopper">
        <AvatarFallback>GH</AvatarFallback>
        <template #status>
            <StatusDot state="online" label="Online" />
        </template>
    </Avatar>
</template>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="fit">
                <AtomsStage />
            </StoryStage>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
