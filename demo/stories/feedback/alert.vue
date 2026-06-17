<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { Alert, AlertDescription, AlertTitle } from "../../../src/components/ui/alert";
import { IconChip } from "../../../src/components/custom/icon-chip";
import {
    Info,
    CircleAlert,
    TriangleAlert,
    CircleCheck,
    Sparkles,
    Bell,
} from "@lucide/vue";
// BB.W-SUFFUSE3 — the feedback band's ONE coherent --section-color-8 ruby
// (warm-status) identity. Distinct from forms-3 / containers-2 / data-9 /
// navigation-12; the warm-status read for a status/notification band.
const FEEDBACK_STOP = 8;
</script>

<template>
    <StoryPage>
        <!-- BB.W-SUFFUSE3 — the feedback-band identity event family (the tinted
             eyebrow + the accent rail + the focal IconChip, all on --section-color-8).
             The tone specimens carry their OWN component color (the variant content);
             the page identity is the ONE event here (the d3 per-surface discipline). -->
        <header
            class="flex items-center gap-4 border-l-[3px] pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${FEEDBACK_STOP})`,
                borderColor:
                    'color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
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

        <div class="grid gap-8">
            <div class="grid gap-3">
                <h2 class="text-subheading">Default</h2>
                <Alert>
                    <Sparkles />
                    <AlertTitle>New workspace created</AlertTitle>
                    <AlertDescription>
                        Your analyses will autosave to this workspace until you
                        switch.
                    </AlertDescription>
                </Alert>
            </div>

            <div class="grid gap-3">
                <h2 class="text-subheading">Destructive</h2>
                <Alert variant="destructive">
                    <CircleAlert />
                    <AlertTitle>Session expired</AlertTitle>
                    <AlertDescription>
                        Re-authenticate to continue. Unsaved changes are held
                        locally for five minutes.
                    </AlertDescription>
                </Alert>
            </div>

            <!-- The semantic tones ride the CVA `variant`
                 (success/warning/info), resolving the
                 `--{success,warning,info}` tokens. -->
            <div class="grid gap-3">
                <h2 class="text-subheading">Warning</h2>
                <Alert variant="warning">
                    <TriangleAlert />
                    <AlertTitle>Approaching rate limit</AlertTitle>
                    <AlertDescription>
                        You've used 84% of your hourly quota. The window resets
                        in 17 minutes.
                    </AlertDescription>
                </Alert>
            </div>

            <div class="grid gap-3">
                <h2 class="text-subheading">Info</h2>
                <Alert variant="info">
                    <Info />
                    <AlertTitle>Live preview is read-only</AlertTitle>
                    <AlertDescription>
                        Open the editor pane to make changes — this preview
                        reflects the last committed state.
                    </AlertDescription>
                </Alert>
            </div>

            <div class="grid gap-3">
                <h2 class="text-subheading">Success</h2>
                <Alert variant="success">
                    <CircleCheck />
                    <AlertTitle>Deployed to production</AlertTitle>
                    <AlertDescription>
                        Build #2048 is live. Roll back from the deploys page if
                        anything looks off.
                    </AlertDescription>
                </Alert>
            </div>

            <div class="grid gap-3">
                <h2 class="text-subheading">Without icon</h2>
                <p class="text-sm text-muted-foreground">
                    Omit the SVG — the CVA grid collapses the icon column.
                </p>
                <Alert>
                    <AlertTitle>Heads up</AlertTitle>
                    <AlertDescription>
                        Short form when the title tone does the work.
                    </AlertDescription>
                </Alert>
            </div>
        </div>
    </StoryPage>
</template>
