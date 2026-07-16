<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@glass/components/button";
import { Pulse, type PulseState } from "@glass/components/pulse";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";

const states: PulseState[] = ["active", "idle", "success", "warning"];
const announced = ref<PulseState>("active");
</script>

<template>
    <StoryPage>
        <StorySection
            heading="Truthful liveness"
            blurb="One mark, four earned states. Only active work moves; every settled state is still."
        >
            <ShowcaseFrame class="pulse-states">
                <div v-for="state in states" :key="state" class="pulse-state">
                    <Pulse :state="state" />
                    <span>{{ state }}</span>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            heading="Identity policy"
            blurb="Adjacent text names the decorative mark. A solitary mark takes one explicit accessible label."
        >
            <ShowcaseFrame class="pulse-identities">
                <p><Pulse state="active" /> Synchronizing catalogue</p>
                <Pulse state="warning" label="Catalogue synchronization needs attention" />
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            heading="Announcements belong to the parent"
            blurb="Changing paint never creates a second live region. The status line owns the single announcement."
        >
            <ShowcaseFrame class="pulse-announcer">
                <div class="pulse-actions">
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
                    <Pulse :state="announced" />
                    Catalogue is {{ announced }}
                </p>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            heading="Light, dark, narrow, reduced motion"
            blurb="The state silhouettes survive either scheme and wrap at narrow widths. With reduced motion, active keeps a quiet static orbit."
        >
            <div class="pulse-modes">
                <ShowcaseFrame class="pulse-mode">
                    <Pulse state="active" />
                    <Pulse state="success" />
                    <Pulse state="warning" />
                    <span>Light</span>
                </ShowcaseFrame>
                <ShowcaseFrame class="pulse-mode pulse-mode--dark" data-probe="prm">
                    <Pulse state="active" />
                    <Pulse state="success" />
                    <Pulse state="warning" />
                    <span>Dark · PRM probe</span>
                </ShowcaseFrame>
            </div>
        </StorySection>
    </StoryPage>
</template>

<style scoped>
.pulse-states,
.pulse-identities,
.pulse-announcer,
.pulse-mode {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.pulse-states,
.pulse-actions,
.pulse-modes {
    flex-wrap: wrap;
}

.pulse-state,
.pulse-identities p,
.pulse-announcer p {
    display: inline-flex;
    align-items: center;
    gap: 0.625rem;
    margin: 0;
}

.pulse-state span,
.pulse-mode span {
    color: var(--muted-foreground);
    font-family: var(--font-mono);
    font-size: var(--type-caption);
}

.pulse-identities {
    justify-content: space-between;
}

.pulse-actions,
.pulse-modes {
    display: flex;
    gap: 0.5rem;
}

.pulse-announcer {
    align-items: flex-start;
    flex-direction: column;
}

.pulse-mode {
    min-inline-size: min(100%, 14rem);
    flex: 1;
}

.pulse-mode--dark {
    color-scheme: dark;
    background: var(--card);
    color: var(--foreground);
}

@media (max-width: 36rem) {
    .pulse-identities {
        align-items: flex-start;
        flex-direction: column;
    }
}
</style>
