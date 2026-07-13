<script setup lang="ts">
// Toaster — wrap-around <ToastProvider> consumer that the speedtest
// (and any non-glass-ui app) drops into the layout root. Composes
// useToast for the ToastViewport rendering loop.
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";
import CodeBlock from "../../chassis/code/CodeBlock.vue";
import { Button } from "@glass/components/ui/button";
import { Play } from "@lucide/vue";
import { Toaster, useToast } from "@glass/components/ui/toast";

const { toast } = useToast();

// The drop-in usage, rendered through the ONE <CodeBlock> register (real,
// copy-able, syntax-highlighted) — not a hand-rolled raw <pre>.
const usageSnippet = `// App.vue
<template>
  <router-view />
  <Toaster />
</template>

// Anywhere downstream
const { toast } = useToast();
toast({ title: "Saved", description: "..." });`;

function fireToast() {
    toast({
        title: "Toaster fired",
        description: "Lives at the layout root via <Toaster /> drop-in; no manual ToastProvider wiring.",
    });
}
</script>

<template>
    <StoryPage>
        <StorySection
            label="canonical drop-in"
            blurb="The Toaster primitive is the wrap-around <ToastProvider> consumer that consumers (the speedtest, glass-ui demo itself) drop into the layout root. Composes useToast() internally to render the ToastViewport loop."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-col gap-4">
                    <Toaster />
                    <!-- BA.W-DEMO-AFFORDANCES — the lone trigger sits content-width
                         on its own self-start row, never stretched by the column's
                         implicit align-items:stretch (R8-13a). -->
                    <div class="flex items-center gap-3">
                        <Button variant="default" @click="fireToast">
                            <Play />
                            Fire a toast
                        </Button>
                    </div>
                    <p class="text-mono-caption text-muted-foreground">
                        The Toaster lives mounted above; clicking the button calls useToast().toast(...) and the
                        viewport paints in the bottom-right (top on small screens).
                    </p>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="usage"
            blurb="Drop a single <Toaster /> at your layout root. Anywhere in the tree, useToast() returns { toast, dismiss, toasts }. The Toaster itself manages the ToastProvider context + viewport."
        >
            <ShowcaseFrame pad="md" tier="quiet">
                <CodeBlock lang="vue" :code="usageSnippet" />
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
