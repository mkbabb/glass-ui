<script setup lang="ts">
// Alert's stage: one alert, in the tone the page's switch picks.
import { computed, type Component } from "vue";
import { CircleAlert, CircleCheck, Info, Sparkles, TriangleAlert } from "@lucide/vue";
import { Alert, AlertDescription, AlertTitle } from "@glass/components/alert";
import StageSwap from "../../chassis/variants/StageSwap.vue";

export type AlertTone = "neutral" | "info" | "success" | "warning" | "destructive";

const props = withDefaults(defineProps<{ tone?: AlertTone }>(), { tone: "warning" });

const CONTENT: Record<AlertTone, { icon: Component; title: string; text: string }> = {
    neutral: { icon: Sparkles, title: "Workspace created", text: "Your work saves here until you switch." },
    info: { icon: Info, title: "This preview is read-only", text: "Open the editor to make changes." },
    success: { icon: CircleCheck, title: "Published", text: "The new version is live for everyone." },
    warning: { icon: TriangleAlert, title: "Nearing your limit", text: "You have used most of this hour's quota." },
    destructive: { icon: CircleAlert, title: "Session expired", text: "Sign in again to keep editing." },
};

const content = computed(() => CONTENT[props.tone]);
</script>

<template>
    <StageSwap :swap-key="tone" class="alert-stage">
        <Alert :tone="tone">
            <component :is="content.icon" />
            <AlertTitle>{{ content.title }}</AlertTitle>
            <AlertDescription>{{ content.text }}</AlertDescription>
        </Alert>
    </StageSwap>
</template>

<style scoped>
.alert-stage {
    inline-size: min(40rem, 100cqi);
}
</style>
