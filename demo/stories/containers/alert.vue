<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    Info,
    CircleAlert,
    TriangleAlert,
    CircleCheck,
    Sparkles,
} from "lucide-vue-next";
</script>

<template>
    <section class="mx-auto max-w-5xl px-8 py-16">
        <header class="mb-12 grid gap-3">
            <p class="font-mono text-2xs uppercase tracking-[0.2em] text-muted-foreground">
                Containers · Alert
            </p>
            <h1 class="font-display text-5xl leading-tight">Alert</h1>
            <p class="max-w-2xl text-lg text-muted-foreground">
                Inline callout for persistent messages — not to be confused with
                a dialog (modal) or toast (transient). The
                <code class="font-mono text-sm">variant</code> prop ships
                <em>default</em> and <em>destructive</em>; the other tones below
                extend the same base via Tailwind utilities on
                <code class="font-mono text-sm">class</code>.
            </p>
        </header>

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
    </section>
</template>
