<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@glass/components/button";
import {
    StatusDot,
    type StatusDotSize,
    type StatusDotState,
} from "@glass/components/status-dot";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";

const states: StatusDotState[] = [
    "active",
    "idle",
    "online",
    "success",
    "warning",
    "error",
    "unknown",
];
const sizes: StatusDotSize[] = ["sm", "md", "lg"];
const announced = ref<StatusDotState>("online");
</script>

<template>
    <StoryPage>
        <StorySection
            heading="State silhouettes"
            blurb="Tone reinforces the state; fill, outline, check, diamond, and cross keep it legible without color."
        >
            <ShowcaseFrame class="status-matrix">
                <div v-for="state in states" :key="state" class="status-cell">
                    <StatusDot :state="state" size="md" />
                    <span>{{ state }}</span>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            heading="Decorative or labelled"
            blurb="A dot paired with visible status text is decorative. A solitary dot names itself."
        >
            <ShowcaseFrame class="status-identities">
                <p><StatusDot state="online" /> Service available</p>
                <StatusDot state="error" label="Service unavailable" size="md" />
            </ShowcaseFrame>
        </StorySection>

        <StorySection heading="Three earned sizes">
            <ShowcaseFrame class="status-sizes">
                <div v-for="size in sizes" :key="size" class="status-cell">
                    <StatusDot state="warning" :size="size" />
                    <span>{{ size }}</span>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            heading="Liveness — the motion axis"
            blurb="Only the active state breathes (motion full — the liquid-weight default); every settled state is still. Opt down with motion=off; reduced motion always wins."
        >
            <ShowcaseFrame class="status-liveness">
                <div class="status-cell">
                    <StatusDot state="active" size="lg" />
                    <span>active · full</span>
                </div>
                <div class="status-cell">
                    <StatusDot state="active" size="lg" motion="off" />
                    <span>active · off</span>
                </div>
                <div class="status-cell">
                    <StatusDot state="success" size="lg" />
                    <span>success</span>
                </div>
            </ShowcaseFrame>
            <ShowcaseFrame class="status-mode status-mode--dark" data-probe="prm">
                <StatusDot state="active" />
                <StatusDot state="success" />
                <StatusDot state="warning" />
                <span>Dark · reduced motion (active keeps a quiet static orbit)</span>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            heading="Parent-owned announcement"
            blurb="StatusDot remains static and silent while the enclosing status line announces the change once."
        >
            <ShowcaseFrame class="status-announcer">
                <div class="status-actions">
                    <Button
                        v-for="state in states"
                        :key="state"
                        size="sm"
                        :emphasis="announced === state ? 'primary' : 'quiet'"
                        @click="announced = state"
                    >
                        {{ state }}
                    </Button>
                </div>
                <p role="status" aria-live="polite" aria-atomic="true">
                    <StatusDot :state="announced" />
                    Service is {{ announced }}
                </p>
            </ShowcaseFrame>
        </StorySection>

        <StorySection heading="Light, dark, narrow, forced colors">
            <div class="status-modes">
                <ShowcaseFrame class="status-mode">
                    <StatusDot v-for="state in states" :key="state" :state="state" />
                    <span>Light</span>
                </ShowcaseFrame>
                <ShowcaseFrame class="status-mode status-mode--dark" data-probe="forced-colors">
                    <StatusDot v-for="state in states" :key="state" :state="state" />
                    <span>Dark · forced-color probe</span>
                </ShowcaseFrame>
            </div>
        </StorySection>
    </StoryPage>
</template>

<style scoped>
.status-matrix,
.status-identities,
.status-sizes,
.status-liveness,
.status-announcer,
.status-mode {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.status-matrix,
.status-sizes,
.status-liveness,
.status-actions,
.status-modes {
    flex-wrap: wrap;
}

.status-cell,
.status-identities p,
.status-announcer p {
    display: inline-flex;
    align-items: center;
    gap: 0.625rem;
    margin: 0;
}

.status-cell span,
.status-mode span {
    color: var(--muted-foreground);
    font-family: var(--font-mono);
    font-size: var(--type-caption);
}

.status-identities {
    justify-content: space-between;
}

.status-actions,
.status-modes {
    display: flex;
    gap: 0.5rem;
}

.status-announcer {
    align-items: flex-start;
    flex-direction: column;
}

.status-mode {
    min-inline-size: min(100%, 14rem);
    flex: 1;
}

.status-mode--dark {
    color-scheme: dark;
    background: var(--card);
    color: var(--foreground);
}

@media (max-width: 36rem) {
    .status-identities {
        align-items: flex-start;
        flex-direction: column;
    }
}
</style>
