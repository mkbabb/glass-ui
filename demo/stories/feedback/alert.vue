<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { Alert, AlertDescription, AlertTitle } from "@glass/components/ui/alert";
import { IconChip } from "@glass/components/custom/icon-chip";
import { Info, CircleAlert, TriangleAlert, CircleCheck, Sparkles, Bell } from "@lucide/vue";
// BB.W-SUFFUSE3 — the feedback band's ONE coherent --section-color-8 ruby
// (warm-status) identity. Distinct from forms-3 / containers-2 / data-9 /
// navigation-12; the warm-status read for a status/notification band.
const FEEDBACK_STOP = 8;
</script>

<template>
    <StoryPage>
        <!-- BB.W-SUFFUSE3 — the feedback-band identity COLOR EVENT (the tinted
             eyebrow + the accent rail + the focal IconChip, all on
             --section-color-8). This is the page-level color identity, DISTINCT
             from the StorySection HEADING below — it carries NO `text-subheading`
             heading rung, so it is not an idiom-B second header (PH3). The left
             accent rail rides an inline `border-left` (the same 3px hairline) so
             it is the suffuse color event, not the section-heading idiom. The tone
             specimens carry their OWN component color; the section identity is the
             ONE page event (the d3 per-surface discipline). -->
        <header
            class="flex items-center gap-4 pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${FEEDBACK_STOP})`,
                borderLeft:
                    '3px solid color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="Bell" :section="FEEDBACK_STOP" bloom reveal />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Feedback · Alerts
                </span>
                <p class="text-small text-muted-foreground">
                    Status surfaces — the alert tones carry their own variant
                    color; the section identity is the ONE page event.
                </p>
            </div>
        </header>

            <StorySection heading="Default" gap="md">
                <Alert>
                    <Sparkles />
                    <AlertTitle>New workspace created</AlertTitle>
                    <AlertDescription>
                        Your analyses will autosave to this workspace until you
                        switch.
                    </AlertDescription>
                </Alert>
            </StorySection>

            <StorySection heading="Destructive" gap="md">
                <Alert tone="destructive">
                    <CircleAlert />
                    <AlertTitle>Session expired</AlertTitle>
                    <AlertDescription>
                        Re-authenticate to continue. Unsaved changes are held
                        locally for five minutes.
                    </AlertDescription>
                </Alert>
            </StorySection>

            <!-- The semantic tones ride the CVA `variant`
                 (success/warning/info), resolving the
                 `--{success,warning,info}` tokens. -->
            <StorySection heading="Warning" gap="md">
                <Alert tone="warning">
                    <TriangleAlert />
                    <AlertTitle>Approaching rate limit</AlertTitle>
                    <AlertDescription>
                        You've used 84% of your hourly quota. The window resets
                        in 17 minutes.
                    </AlertDescription>
                </Alert>
            </StorySection>

            <StorySection heading="Info" gap="md">
                <Alert tone="info">
                    <Info />
                    <AlertTitle>Live preview is read-only</AlertTitle>
                    <AlertDescription>
                        Open the editor pane to make changes — this preview
                        reflects the last committed state.
                    </AlertDescription>
                </Alert>
            </StorySection>

            <StorySection heading="Success" gap="md">
                <Alert tone="success">
                    <CircleCheck />
                    <AlertTitle>Deployed to production</AlertTitle>
                    <AlertDescription>
                        Build #2048 is live. Roll back from the deploys page if
                        anything looks off.
                    </AlertDescription>
                </Alert>
            </StorySection>

            <StorySection heading="Without icon" gap="md">
                <p class="text-sm text-muted-foreground">
                    Omit the SVG — the CVA grid collapses the icon column.
                </p>
                <Alert>
                    <AlertTitle>Heads up</AlertTitle>
                    <AlertDescription>
                        Short form when the title tone does the work.
                    </AlertDescription>
                </Alert>
            </StorySection>
        
    </StoryPage>
</template>
