<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";
import {
    Info,
    CircleAlert,
    TriangleAlert,
    CircleCheck,
    Sparkles,
} from "lucide-vue-next";
</script>

<template>
    <StoryPage>
        <CreamSurface tone="warm" class="relative overflow-hidden">
            <p
                class="section-label"
                :style="{ color: 'var(--section-color-2)' }"
            >
                § 2 · Banners
            </p>
            <DisplayHero
                size="display-3"
                variation="wonk"
                class="mt-[var(--space-phi-1)] mb-[var(--space-phi-2)]"
                :style="{ color: 'var(--section-color-2)' }"
            >
                Heads-up notices
            </DisplayHero>
            <p class="text-prose max-w-2xl text-foreground/80">
                Alerts thread an icon column, a title rung, and prose copy through a
                CVA grid. Default tone uses muted ink; destructive / warn / info /
                success tint the border, the title, and the icon together so the
                semantic axis collapses to one variant.
            </p>
            <FlourishDivider
                tone="section-2"
                class="my-[var(--space-phi-3)]"
            />

            <div class="grid gap-8">
            <div class="grid gap-3">
                <h2 class="font-display text-xl">Default</h2>
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
                <h2 class="font-display text-xl">Destructive</h2>
                <Alert variant="destructive">
                    <CircleAlert />
                    <AlertTitle>Session expired</AlertTitle>
                    <AlertDescription>
                        Re-authenticate to continue. Unsaved changes are held
                        locally for five minutes.
                    </AlertDescription>
                </Alert>
            </div>

            <div class="grid gap-3">
                <h2 class="font-display text-xl">Warning</h2>
                <Alert
                    class="border-amber-500/50 text-amber-700 dark:text-amber-300 [&>svg]:text-amber-600 dark:[&>svg]:text-amber-400"
                >
                    <TriangleAlert />
                    <AlertTitle>Approaching rate limit</AlertTitle>
                    <AlertDescription>
                        You've used 84% of your hourly quota. The window resets
                        in 17 minutes.
                    </AlertDescription>
                </Alert>
            </div>

            <div class="grid gap-3">
                <h2 class="font-display text-xl">Info</h2>
                <Alert
                    class="border-sky-500/50 text-sky-700 dark:text-sky-300 [&>svg]:text-sky-600 dark:[&>svg]:text-sky-400"
                >
                    <Info />
                    <AlertTitle>Live preview is read-only</AlertTitle>
                    <AlertDescription>
                        Open the editor pane to make changes — this preview
                        reflects the last committed state.
                    </AlertDescription>
                </Alert>
            </div>

            <div class="grid gap-3">
                <h2 class="font-display text-xl">Success</h2>
                <Alert
                    class="border-emerald-500/50 text-emerald-700 dark:text-emerald-300 [&>svg]:text-emerald-600 dark:[&>svg]:text-emerald-400"
                >
                    <CircleCheck />
                    <AlertTitle>Deployed to production</AlertTitle>
                    <AlertDescription>
                        Build #2048 is live. Roll back from the deploys page if
                        anything looks off.
                    </AlertDescription>
                </Alert>
            </div>

            <div class="grid gap-3">
                <h2 class="font-display text-xl">Without icon</h2>
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
        </CreamSurface>
    </StoryPage>
</template>
