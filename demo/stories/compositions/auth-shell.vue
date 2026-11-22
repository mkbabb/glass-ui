<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import AuthShellStage from "./auth-shell.stage.vue";

const snippet = `<form @submit.prevent="signIn">
    <LabeledInput v-model="email" label="Email" type="email" autocomplete="email" />
    <LabeledInput
        v-model="password"
        label="Password"
        type="password"
        autocomplete="current-password"
    />
    <Button type="submit" emphasis="primary">Sign in</Button>
</form>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="tall">
                <AuthShellStage />
            </StoryStage>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
