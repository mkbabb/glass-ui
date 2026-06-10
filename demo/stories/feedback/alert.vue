<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { Alert, AlertDescription, AlertTitle } from "../../../src/components/ui/alert";
import {
    Info,
    CircleAlert,
    TriangleAlert,
    CircleCheck,
    Sparkles,
} from "@lucide/vue";
</script>

<template>
    <StoryPage>
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
